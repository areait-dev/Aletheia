/**
 * Raggruppamento automatico dei corsi in "famiglie" (es. Antincendio, RLS, ...)
 * con le singole varianti (livello/gruppo/modulo x corso/aggiornamento) annidate.
 *
 * Fonte dati grezza: coursesData in pages/corsi/index.js (passata come
 * argomento a buildCourseFamilies). I prezzi per variante, quando disponibili,
 * sono recuperati da coursesDetails (pages/corsi/[slug].js) tramite
 * matching per parole chiave sulle label di priceVariants - quell'oggetto NON
 * viene duplicato qui, va passato a buildCourseFamilies.
 *
 * ALIAS_TO_DETAILS collega la chiave di famiglia derivata automaticamente dal
 * titolo alla chiave (spesso diversamente nominata) usata storicamente in
 * coursesDetails, per le famiglie che hanno già dati editoriali granulari.
 */

const { COURSE_IMAGES, COURSE_IMAGE_ALT, IMAGE_FALLBACK_BY_CATEGORY, FALLBACK_DEFAULT, CALENDAR_FALLBACK } = require('./courseImages');

const ALIAS_TO_DETAILS = {
  'formazione-dei-lavoratori': 'formazione-lavoratori',
  'formazione-dei-lavoratori-parte-generale': 'formazione-lavoratori',
  'formazione-del-preposto': 'formazione-preposto',
  'rls': 'corso-rls',
  'rspp-datore-di-lavoro': 'corso-rspp-datore-lavoro',
  'spazi-confinati': 'corso-spazi-confinati',
  'pes-pav-lavori-elettrici': 'corso-pes-pav-pei',
  'personale-alimentarista-osa': 'sicurezza-alimentare',
  'carrelli-elevatori-semoventi-con-conduttore-a-bordo': 'carrelli-elevatori',
  'operatore-di-gru-per-autocarro': 'gru-su-autocarro',
  // Il titolo "... Life Support and Defibrillation" dà lo slug con "-and-"; coursesDetails usa la chiave senza (portava via il flag enrollOnly: niente pulsante "Iscriviti").
  'blsd-basic-life-support-and-defibrillation': 'blsd-basic-life-support-defibrillation',
  // Stesso problema: "Conduttore d'Impresa Agricola" dà "conduttore-d-impresa-agricola", i dati usano "conduttore-impresa-agricola".
  'conduttore-d-impresa-agricola': 'conduttore-impresa-agricola',
  // Nessun alias per "ple-piattaforme-di-lavoro-mobili-elevabili": coursesDetails/EDITORIAL_CONTENT usano
  // già quella chiave esatta (famTitle esteso a scopo SEO/UX sulle card, stesso pattern di "trattori-agricoli-o-forestali").
  // Nessun alias per "trattori-agricoli-o-forestali": le 4 varianti (Ruote/Cingoli/Ruote e Cingoli/
  // Aggiornamento) confluiscono già in un'unica famiglia con quello slug (vedi LEVEL_PATTERNS sotto),
  // che coincide con la chiave usata in coursesDetails - nessun alias necessario.
};

// Rumore da rimuovere prima del confronto tra label di priceVariants e descrittori di variante
const NOISE_PATTERN = /\([^)]*\)|\b\d+\s*h\b/gi;

function normalizeForMatch(str) {
  return str
    .toLowerCase()
    .replace(NOISE_PATTERN, ' ')
    .replace(/\bagg\.?\b/g, 'aggiornamento') // "Agg." è sinonimo di "Aggiornamento"
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // rimuove accenti per confronto robusto
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(str) {
  return new Set(normalizeForMatch(str).split(' ').filter(Boolean));
}

// Descrittori di livello/gruppo/modulo riconosciuti nei titoli - l'ordine conta (pattern più specifici prima)
const LEVEL_PATTERNS = [
  /\bmeno\s+di\s+\d+\s+dipendenti\b/i,
  /\bpi(?:u|ù)\s+di\s+\d+\s+dipendenti\b/i,
  /\brischio\s+(?:basso|medio|alto)\b/i,
  /\blivello\s+\d+\b/i,
  /\bgruppo\s+[abc](?:\s*(?:e|\/)\s*[abc])?\b/i,
  /\bmodulo\s+(?:comune|[a-e]\b|\d+\s*-?\s*[a-zàèéìòù,\s]*)/i,
  /\bparte\s+generale\b/i,
  /\bsotto\s+tensione\b/i,
  // NOTA: niente \b finale dopo "à" - in JS regex (senza flag /u su \w) le lettere accentate come "à"
  // non sono "word char", quindi un \b subito dopo non trova mai un confine reale (non-word seguito da
  // non-word, es. lo spazio) e il pattern non avrebbe mai fatto match su "... In Prossimità" con la
  // à accentata (bug scoperto durante la migrazione di pes-pav-lavori-elettrici.js in [slug].js, che
  // impediva a questa variante di raggrupparsi con "... Sotto Tensione" nella stessa famiglia).
  /\bin\s+prossimit(?:a|à)/i,
  /\besterno\b/i,
  // Descrittore tra parentesi (gruppo di cattura 1) usato per raggruppare varianti che altrimenti
  // non condividerebbero un famTitle pulito - es. "Trattori Agricoli o Forestali (Ruote)" / "(Cingoli)" /
  // "(Ruote e Cingoli)". Le parentesi non sono usate altrove nei titoli di coursesData, quindi il
  // pattern è isolato e non rischia di intercettare altre famiglie (es. "... A Cingoli" senza parentesi).
  /\((ruote e cingoli|ruote|cingoli)\)/i,
  // Stesso pattern (parentesi) applicato alla famiglia "PLE" - es. "PLE (Con e Senza Stabilizzatori)" /
  // "(Con Stabilizzatori)" / "(Senza Stabilizzatori)". "con e senza stabilizzatori" va prima di
  // "con stabilizzatori" nell'alternanza per evitare un match parziale che tronchi la label.
  /\((con e senza stabilizzatori|con stabilizzatori|senza stabilizzatori)\)/i,
  // Stesso pattern (parentesi) applicato alla famiglia "Macchine Movimento Terra" - raggruppa le 7
  // varianti raw (5 macchine singole + corso combinato + aggiornamento) in un'unica famiglia/pagina
  // con switch, sullo stesso modello di Trattori Agricoli e PLE - vedi il commento sulle 7 voci raw in
  // data/coursesRaw.js. La famiglia risultante "macchine-movimento-terra" combacia con la pagina
  // standalone pages/corsi/macchine-movimento-terra.js (che ha priorità di routing sul template
  // dinamico [slug].js) e con coursesDetails['macchine-movimento-terra'] in [slug].js per i prezzi.
  /\((escavatori idraulici, caricatori frontali e terne|escavatori idraulici|escavatori a fune|pale caricatrici frontali|autoribaltabili a cingoli|terne)\)/i,
];

// Prefissi di riempimento da rimuovere per far combaciare titolo "corso" e "aggiornamento" della stessa famiglia
const FILLER_PREFIXES = [/^corso\s+per\s+/i, /^corso\s+di\s+/i, /^corso\s+/i];

function stripAggiornamentoPrefix(title) {
  const m = /^aggiornamento\s+(di\s+|del\s+|della\s+)?/i.exec(title.trim());
  if (m) return { isAggiornamento: true, rest: title.trim().slice(m[0].length) };
  return { isAggiornamento: false, rest: title.trim() };
}

// Un titolo può contenere più di un descrittore (es. "Antincendio Rischio Medio Livello 2" ha
// sia "Rischio Medio" che "Livello 2"): vanno rimossi TUTTI per isolare il titolo di famiglia puro.
function extractLevelDescriptor(title) {
  let remaining = title;
  const found = [];
  for (const pattern of LEVEL_PATTERNS) {
    const m = pattern.exec(remaining);
    if (m) {
      // Se il pattern ha un gruppo di cattura (es. il descrittore tra parentesi) si usa quello come
      // label, per non includere le parentesi stesse nell'etichetta mostrata nello switch dei livelli.
      found.push((m[1] !== undefined ? m[1] : m[0]).trim());
      remaining = (remaining.slice(0, m.index) + remaining.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim();
    }
  }
  if (found.length === 0) return { levelLabel: null, famTitle: title.trim() };
  // Se dopo la rimozione non resta nulla (titolo composto solo dal descrittore, es. manca il nome
  // di famiglia nella label originale), ripiego sul titolo originale per non perdere la variante.
  return { levelLabel: found.join(' '), famTitle: remaining || title.trim() };
}

function stripFillerPrefixes(title) {
  let out = title;
  for (const p of FILLER_PREFIXES) out = out.replace(p, '');
  return out.trim();
}

// Titoli in sentence case (data/coursesRaw.js): tolti i prefissi "Corso"/"Aggiornamento" o il descrittore di livello, il primo carattere resta minuscolo: si ripristina la maiuscola
const maiuscolaIniziale = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);

// Slug storici: il titolo è stato corretto ("carriponti" -> "carriponte") ma l'indirizzo pubblico della scheda non cambia (gli slug derivano dal titolo,
// quindi senza questa mappa cambierebbe anche l'URL, e con lui id, contenuti, immagini, redirect e canonical).
const SLUG_STORICI = {
  'addetti-alla-conduzione-di-carriponte-pensile-cabina': 'addetti-alla-conduzione-di-carriponti-pensile-cabina',
  'asacom-assistente-specialistico-all-autonomia-e-alla-comunicazione': 'asacom-assistente-alla-comunicazione', // titolo ASACOM cambiato in e0db6b0: URL e contenuto restavano orfani
};

function slugify(str) {
  return normalizeForMatch(str).replace(/\s+/g, '-');
}

function levelKeyFromLabel(label) {
  return label ? slugify(label) : 'default';
}

/**
 * Cerca, tra le priceVariants di un dettaglio editoriale, quella che meglio
 * corrisponde al descrittore di livello + tipo (corso/aggiornamento) della
 * variante. Ritorna null se non trova un match sufficientemente specifico
 * (in quel caso il chiamante mostra "prezzo su richiesta").
 */
function matchPriceVariant(priceVariants, levelLabel, tipo, familyKey, quiet) {
  if (!Array.isArray(priceVariants) || priceVariants.length === 0) return null;

  const levelTokens = levelLabel ? tokenize(levelLabel) : new Set();
  const tipoToken = tipo === 'aggiornamento' ? 'aggiornamento' : null;

  let best = null;
  let bestScore = 0;
  for (const pv of priceVariants) {
    const pvTokens = tokenize(pv.label);
    const hasTipo = tipoToken ? pvTokens.has(tipoToken) : !pvTokens.has('aggiornamento');
    if (!hasTipo) continue;

    let score = 0;
    for (const t of levelTokens) if (pvTokens.has(t)) score += 1;
    // Se non c'è un descrittore di livello (famiglia a variante unica), basta il match sul tipo
    if (levelTokens.size === 0) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = pv;
    }
  }

  // Richiediamo almeno un token di livello combaciante (o famiglia senza livelli)
  if (best && (levelTokens.size === 0 || bestScore > 0)) return best;

  if (!quiet) {
    // eslint-disable-next-line no-console
    console.warn(
      `[courseFamilies] Nessun prezzo trovato in coursesDetails per famiglia="${familyKey}" livello="${levelLabel || '(nessuno)'}" tipo="${tipo}"`
    );
  }
  return null;
}

/**
 * Raggruppa l'elenco piatto di corsi (coursesData) in famiglie con varianti annidate.
 *
 * @param {Array} rawCourses - coursesData da data/coursesRaw.js
 * @param {Object} coursesDetails - oggetto coursesDetails da pages/corsi/[slug].js (per overview/curriculum/prezzi)
 * @param {Object} [options]
 * @param {boolean} [options.quiet] - se true, non stampa i warning di prezzo mancante (usato da next.config.js, dove i prezzi non servono)
 */
function buildCourseFamilies(rawCourses, coursesDetails = {}, options = {}) {
  const { quiet = false } = options;
  const families = new Map();

  for (const course of rawCourses) {
    const { isAggiornamento, rest } = stripAggiornamentoPrefix(course.title);
    const { levelLabel, famTitle: famTitleRaw } = extractLevelDescriptor(rest);
    const famTitle = stripFillerPrefixes(famTitleRaw) || famTitleRaw;
    const familyKeyTitolo = slugify(famTitle);
    const familyKey = SLUG_STORICI[familyKeyTitolo] || familyKeyTitolo;

    if (!families.has(familyKey)) {
      families.set(familyKey, {
        id: familyKey,
        slug: familyKey,
        titolo: maiuscolaIniziale(famTitle),
        categoria: course.category,
        categoryKey: course.categoryKey,
        subKey: course.subKey,
        badge: course.badge,
        provider: course.provider,
        image: course.image,
        gradient: course.gradient,
        varianti: [],
      });
    }

    const family = families.get(familyKey);
    family.varianti.push({
      id: `${levelKeyFromLabel(levelLabel)}-${isAggiornamento ? 'aggiornamento' : 'corso'}`,
      livelloKey: levelKeyFromLabel(levelLabel),
      label: maiuscolaIniziale(levelLabel || famTitle),
      tipo: isAggiornamento ? 'aggiornamento' : 'corso',
      slug: course.slug, // slug originale per-livello: mantenuto per compatibilità/redirect
      durataOre: course.meta?.[0]?.text || null,
      modalita: course.meta?.find((m) => /online|sede|presenza|distanza|fad/i.test(m.text))?.text || 'In presenza',
      attestato: course.status,
      obbligatoria: course.badge === 'Obbligatoria',
    });
  }

  // Seconda passata: risolvi i prezzi per variante tramite coursesDetails (con alias) + warning di build
  for (const family of families.values()) {
    const detailsKey = ALIAS_TO_DETAILS[family.id] || family.id;
    const details = coursesDetails[detailsKey];
    for (const variante of family.varianti) {
      const match = details?.priceVariants
        ? matchPriceVariant(details.priceVariants, variante.livelloKey === 'default' ? null : variante.label, variante.tipo, family.id, quiet)
        : null;
      variante.prezzo = match ? match.amount : null;
      variante.prezzoLabel = match ? match.label : 'Prezzo su richiesta';
    }
    family.overview = details?.overview || null;
    family.curriculum = details?.curriculum || null;
    family.learningOutcomes = details?.learningOutcomes || null;
    family.target = details?.target || null;
    family.level = details?.level || null;
    family.students = details?.students || null;
    family.priceLabel = details?.price || null; // stringa grezza (es. "Finanziato", "Gratuito") per CTA
    family.enrollOnly = details?.enrollOnly || false;
    family.minimoIscritti = details?.minimoIscritti || null; // solo corsi qualificati (OSS, ASACOM); gli altri usano la frase generica
    if (!family.image && details?.image) family.image = details.image;

    // Famiglia "isolata": una sola variante ma con un descrittore di livello/gruppo/modulo
    // riconosciuto (livelloKey !== 'default') - sintomo tipico di un titolo scritto in modo
    // incoerente rispetto alle altre varianti della stessa famiglia (es. manca il nome della
    // famiglia in un titolo "Aggiornamento ..."), che le impedisce di raggrupparsi insieme.
    // Non riguarda i corsi realmente singoli/senza livelli (quelli hanno livelloKey 'default').
    if (!quiet && family.varianti.length === 1 && family.varianti[0].livelloKey !== 'default') {
      // eslint-disable-next-line no-console
      console.warn(
        `[courseFamilies] Famiglia isolata sospetta: "${family.titolo}" (slug="${family.slug}") ha una sola variante ("${family.varianti[0].label}") - controlla che il titolo del corso in coursesData sia coerente con le altre varianti della stessa famiglia.`
      );
    }
  }

  // Immagine di famiglia da data/courseImages.js (se presente), altrimenti quella della scheda in coursesData
  // Ordine: immagine propria della famiglia (con alt descrittivo se definito) > immagine della scheda > ripiego per categoria (mai il gradiente).
  // imageAlt è sempre null o stringa (getStaticProps non accetta undefined).
  families.forEach((family) => {
    family.imageAlt = null;
    if (COURSE_IMAGES[family.slug]) {
      family.image = COURSE_IMAGES[family.slug];
      family.imageAlt = COURSE_IMAGE_ALT[family.slug] || null;
    } else if (!family.image) {
      const fb = IMAGE_FALLBACK_BY_CATEGORY[family.categoryKey] || FALLBACK_DEFAULT;
      family.image = fb.src;
      family.imageAlt = fb.alt;
    }
  });

  return Array.from(families.values());
}

/** Trova la famiglia che contiene una variante con lo slug per-livello indicato (per redirect da vecchi URL). */
function findFamilyByVariantSlug(families, variantSlug) {
  for (const family of families) {
    const variante = family.varianti.find((v) => v.slug === variantSlug);
    if (variante) return { family, variante };
  }
  return null;
}

/**
 * Risolve uno slug di "corso correlato" (dai contenuti editoriali, es. data/content/*.js)
 * contro le famiglie derivate da coursesData. Gli slug editoriali non sempre coincidono
 * esattamente con family.slug (es. possono riferirsi a un livello specifico con la
 * convenzione "{familySlug}-livello-{n}", oppure usare un nome abbreviato/alternativo),
 * quindi il matching procede per step via via meno strict, con un ultimo fallback a
 * match per token condivisi. Se nessuna famiglia corrisponde, avvisa e ritorna null
 * (il chiamante deve ignorare silenziosamente la voce, senza rompere il render).
 */
function resolveRelatedCourse(rawSlug, families) {
  const livelloMatch = /^(.+)-livello-(\d+)$/.exec(rawSlug);
  if (livelloMatch) {
    const [, famSlug, livelloNum] = livelloMatch;
    const fam = families.find((f) => f.slug === famSlug);
    if (fam) {
      const livelloKeys = Array.from(new Set(fam.varianti.map((v) => v.livelloKey)));
      const idx = parseInt(livelloNum, 10) - 1;
      if (livelloKeys[idx]) {
        const label = fam.varianti.find((v) => v.livelloKey === livelloKeys[idx])?.label;
        return { titolo: `${fam.titolo} - ${label}`, href: `/corsi/${fam.slug}?livello=${idx + 1}` };
      }
    }
  }

  let fam = families.find((f) => f.slug === rawSlug);

  if (!fam) {
    const rawTokens = rawSlug.split('-').filter(Boolean);
    const minOverlap = Math.min(2, rawTokens.length);
    fam = families.find((f) => {
      const famTokens = f.slug.split('-');
      const overlap = rawTokens.filter((t) => famTokens.includes(t)).length;
      return overlap >= minOverlap;
    });
  }

  if (fam) return { titolo: fam.titolo, href: `/corsi/${fam.slug}` };

  // eslint-disable-next-line no-console
  console.warn(`[courseFamilies] corsiCorrelati: impossibile risolvere lo slug "${rawSlug}" contro nessuna famiglia esistente`);
  return null;
}

/**
 * Foto di un corso del calendario (home "Corsi in partenza", /formazione/obbligatoria): quella della sua famiglia nel catalogo
 * (lo slug del calendario è lo slug della famiglia o di una sua variante), altrimenti la generica della categoria del calendario
 * (CALENDAR_FALLBACK in data/courseImages.js). Ritorna sempre { src, alt }; alt è null se vale il titolo del corso.
 */
function resolveCourseImage(slug, categoria, families) {
  const family = families.find((f) => f.slug === slug) || findFamilyByVariantSlug(families, slug)?.family;
  if (family?.image) return { src: family.image, alt: family.imageAlt || null };
  const fb = CALENDAR_FALLBACK[categoria] || FALLBACK_DEFAULT;
  return { src: fb.src, alt: fb.alt };
}

module.exports = { buildCourseFamilies, findFamilyByVariantSlug, resolveRelatedCourse, resolveCourseImage };
