/**
 * Liste di card (CPT `scheda`, un termine della tassonomia `lista_schede` per lista) con ripiego sui dati locali
 * (`data/schede.js`). Ogni lista ha un mapping a due vie tra la forma "scheda WordPress" e la forma che la pagina
 * usa già: `fromWp` per leggere, `toWp` per la migrazione (wordpress/migrate-local-to-wp.mjs). Tenerli qui, insieme,
 * evita che lettura e migrazione divergano. Modulo puro (nessun import): lo carica anche lo script di migrazione.
 *
 * Campi della scheda: titolo, contenuto (testo), icona, badge, sottotitolo, link {title,url}, meta_1, meta_2,
 * immagine in evidenza + `immagine_alt`. Quello che non ha un campo (colore dell'accento, numero del passo) si
 * ricava dalla posizione o dalla scheda locale con lo stesso titolo.
 */

export type Scheda = {
  slug: string;
  titolo: string;
  testo: string;
  /** Il testo con soli grassetto e corsivo (`<strong>`, `<em>`): vuoto se la scheda non ha contenuto. */
  testoRicco: string;
  /** Voci di un elenco puntato nel contenuto (`<li>`): bullets delle card. */
  elenco: string[];
  icona: string;
  badge: string;
  sottotitolo: string;
  link: { label: string; href: string };
  meta1: string;
  meta2: string;
  immagine: string;
  immagineAlt: string;
};

/** Forma della scheda scritta in WordPress (payload REST di migrazione). */
export type SchedaWp = Partial<Omit<Scheda, 'slug'>> & { titolo: string };

// Gli elementi delle liste hanno forme diverse (oggetti, ma anche semplici stringhe): qui sono volutamente generici.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = any;

type Mapping = {
  /** Da scheda WP all'oggetto della pagina. `loc` = scheda locale con lo stesso titolo (o assente), `i` = posizione, `all` = lista locale. */
  fromWp: (s: Scheda, loc: Item | undefined, i: number, all: Item[]) => Item;
  /** Dall'oggetto locale ai campi della scheda (usato dalla migrazione). */
  toWp: (item: Item) => SchedaWp;
};

const s = (v: unknown) => (typeof v === 'string' ? v : '');
const ACCENTI = ['#008C95', '#018891']; // accento alternato delle card servizi (stesso criterio del sito)
// Colore decorativo del numero nelle card "Le nostre Expertise" (chi-siamo): alterna per posizione
const ACCENTI_EXPERTISE = ['text-[#018891]/30 dark:text-primary-on-dark/20', 'text-[#018891]/30 dark:text-[#018891]/20'];
/** `Etichetta|URL` → link extra di un certificato; null se incompleto. */
const linkExtra = (v: string) => {
  const [label = '', url = ''] = v.split('|').map((x) => x.trim());
  return label && url ? { label, url } : null;
};

export const LISTE: Record<string, Mapping> = {
  'servizi-persona': {
    fromWp: (c, loc, i) => ({
      icon: c.icona,
      title: c.titolo,
      description: c.testo,
      tag: c.badge,
      color: loc?.color ?? ACCENTI[i % 2],
      image: c.immagine || s(loc?.image),
      imageAlt: c.immagineAlt,
      ...(c.link.href ? { href: c.link.href } : {}),
    }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.description), icona: s(x.icon), badge: s(x.tag), immagine: s(x.image), immagineAlt: s(x.imageAlt), link: x.href ? { label: s(x.title), href: s(x.href) } : undefined }),
  },
  'servizi-imprese': {
    fromWp: (c, loc, i) => ({
      icon: c.icona,
      title: c.titolo,
      description: c.testo,
      tag: c.badge,
      color: loc?.color ?? ACCENTI[i % 2],
      image: c.immagine || s(loc?.image),
      imageAlt: c.immagineAlt,
    }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.description), icona: s(x.icon), badge: s(x.tag), immagine: s(x.image), immagineAlt: s(x.imageAlt) }),
  },
  'perche-noi': {
    fromWp: (c) => ({ icon: c.icona, title: c.titolo, description: c.testo, detail: c.meta1 }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.description), icona: s(x.icon), meta1: s(x.detail) }),
  },
  step: {
    // Il numero del passo è la posizione nella lista.
    fromWp: (c, _loc, i) => ({ n: String(i + 1), icon: c.icona, title: c.titolo }),
    toWp: (x) => ({ titolo: s(x.title), icona: s(x.icon) }),
  },
  'aree-obbligatoria': {
    fromWp: (c, loc) => ({
      badge: c.badge,
      icon: c.icona,
      title: c.titolo,
      text: c.testo,
      cta: c.link.label,
      href: c.link.href,
      image: c.immagine || s(loc?.image),
      imageAlt: c.immagineAlt,
    }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.text), icona: s(x.icon), badge: s(x.badge), link: { label: s(x.cta), href: s(x.href) }, immagine: s(x.image), immagineAlt: s(x.imageAlt) }),
  },
  'avvisi-regionali': {
    // logo → meta_1, modalità → meta_2, durata (facoltativa) → sottotitolo
    fromWp: (c, loc) => ({
      badge: c.badge,
      logo: c.meta1,
      title: c.titolo,
      text: c.testo,
      modalita: c.meta2,
      ...(c.sottotitolo ? { durata: c.sottotitolo } : {}),
      ...(c.link.href ? { href: c.link.href } : {}),
      image: c.immagine || s(loc?.image),
      imageAlt: c.immagineAlt,
    }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.text), badge: s(x.badge), meta1: s(x.logo), meta2: s(x.modalita), sottotitolo: s(x.durata), link: { label: s(x.title), href: s(x.href) }, immagine: s(x.image), immagineAlt: s(x.imageAlt) }),
  },
  'gol-misure': {
    // misura → meta_1, target → meta_2; lo slug è quello del post
    fromWp: (c) => ({ slug: c.slug, title: c.titolo, icon: c.icona, description: c.testo, misura: c.meta1, target: c.meta2 }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.description), icona: s(x.icon), meta1: s(x.misura), meta2: s(x.target) }),
  },
  // ── Altre pagine di formazione e home ──
  'aree-pa': {
    fromWp: (c) => ({ icon: c.icona, title: c.titolo, text: c.testo }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.text), icona: s(x.icon) }),
  },
  'mepa-elenco': {
    fromWp: (c) => ({ icon: c.icona, text: c.titolo }),
    toWp: (x) => ({ titolo: s(x.text), icona: s(x.icon) }),
  },
  'ecm-modalita': {
    fromWp: (c) => ({ title: c.titolo, text: c.testo }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.text) }),
  },
  'fondi-vantaggi': {
    // Elemento = semplice stringa (il titolo della scheda)
    fromWp: (c) => c.titolo,
    toWp: (x) => ({ titolo: String(x) }),
  },
  'fnc-target': {
    fromWp: (c) => ({ icon: c.icona, title: c.titolo, text: c.testo }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.text), icona: s(x.icon) }),
  },
  // Icone SVG del catalogo data/icone-svg.js: nel campo "Icona" della scheda si scrive il NOME (es. `fulmine`).
  'fnc-vantaggi': {
    fromWp: (c) => ({ title: c.titolo, text: c.testo, icon: c.icona }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.text), icona: s(x.icon) }),
  },
  'fnc-servizi': {
    // La parte in grassetto è il titolo della scheda, il resto della frase il contenuto (si antepone lo spazio che
    // il testo di WordPress non conserva). "in evidenza" nel campo "Dato 1" = card in primo piano.
    fromWp: (c) => ({ bold: c.titolo, rest: ` ${c.testo}`, icon: c.icona, ...(/^in evidenza$/i.test(c.meta1.trim()) ? { featured: true } : {}) }),
    toWp: (x) => ({ titolo: s(x.bold), testo: s(x.rest).trim(), icona: s(x.icon), meta1: x.featured ? 'in evidenza' : '' }),
  },
  // ── Chi siamo ──────────────────────────────────────────────────────────────
  'chi-storia': {
    // Tappa: anno (o "Oggi") nel badge, titolo, descrizione nel contenuto
    fromWp: (c) => ({ anno: c.badge, titolo: c.titolo, desc: c.testo }),
    toWp: (x) => ({ badge: s(x.anno), titolo: s(x.titolo), testo: s(x.desc) }),
  },
  'chi-tabs': {
    // Tab Missione/Visione/Valori: nome della tab nel badge, titolo, sottotitolo, testo nel contenuto
    fromWp: (c) => ({ tab: c.badge, titolo: c.titolo, sottotitolo: c.sottotitolo, desc: c.testo }),
    toWp: (x) => ({ badge: s(x.tab), titolo: s(x.titolo), sottotitolo: s(x.sottotitolo), testo: s(x.desc) }),
  },
  'chi-punti-forza': {
    // Il reticolo (larghezza di cella, bordi, dimensione del titolo) dipende dalla POSIZIONE: si prende dalla card locale
    // nella stessa posizione (o con lo stesso titolo); una voce in più è una cella piccola.
    fromWp: (c, loc, i, all) => {
      const base = loc ?? all[i] ?? {};
      return { titolo: c.titolo, span: base.span ?? 'sm:col-span-1', big: base.big ?? false, borders: base.borders ?? 'border-b' };
    },
    toWp: (x) => ({ titolo: s(x.titolo) }),
  },
  'chi-expertise': {
    // Numero (01, 02…) e colore decorativo seguono la posizione
    fromWp: (c, _loc, i) => ({ n: String(i + 1).padStart(2, '0'), accent: ACCENTI_EXPERTISE[i % 2], titolo: c.titolo, desc: c.testo }),
    toWp: (x) => ({ titolo: s(x.titolo), testo: s(x.desc) }),
  },
  'chi-accreditamenti': {
    // Logo = immagine in evidenza (ripiego: file locale di public/); codice/estremi nel badge
    fromWp: (c, loc) => ({ logo: c.immagine || s(loc?.logo), logoAlt: c.immagineAlt || s(loc?.logoAlt), title: c.titolo, code: c.badge }),
    toWp: (x) => ({ titolo: s(x.title), badge: s(x.code), immagine: s(x.logo), immagineAlt: s(x.logoAlt) }),
  },
  'chi-certificazioni': {
    // Descrizione = paragrafo del contenuto, vantaggi = elenco puntato del contenuto, PDF = link; fino a due link extra
    // (es. "Politica Aziendale") in "Dato 1" / "Dato 2", nel formato `Etichetta|URL`.
    fromWp: (c) => ({
      icon: c.icona,
      title: c.titolo,
      subtitle: c.sottotitolo,
      description: c.testo,
      benefits: c.elenco,
      pdfUrl: c.link.href,
      extraLinks: [linkExtra(c.meta1), linkExtra(c.meta2)].filter(Boolean),
    }),
    toWp: (x) => ({
      titolo: s(x.title),
      icona: s(x.icon),
      sottotitolo: s(x.subtitle),
      testo: s(x.description),
      elenco: Array.isArray(x.benefits) ? x.benefits : [],
      ...(x.pdfUrl ? { link: { label: 'Visualizza Certificato', href: s(x.pdfUrl) } } : {}),
      meta1: x.extraLinks?.[0] ? `${x.extraLinks[0].label}|${x.extraLinks[0].url}` : '',
      meta2: x.extraLinks?.[1] ? `${x.extraLinks[1].label}|${x.extraLinks[1].url}` : '',
    }),
  },
  'obbligatoria-punti': {
    // Testo con grassetto: `testoRicco` (solo <strong>/<em>), da disegnare con components/RichText.
    fromWp: (c) => ({ icon: c.icona, title: c.titolo, text: c.testoRicco || c.testo }),
    toWp: (x) => ({ titolo: s(x.title), testoRicco: s(x.text), icona: s(x.icon) }),
  },
  'prof-hero-badges': {
    fromWp: (c) => ({ icon: c.icona, label: c.titolo }),
    toWp: (x) => ({ titolo: s(x.label), icona: s(x.icon) }),
  },
  'prof-verticali': {
    // sopratitolo → badge; bullets → elenco puntato; il gradiente (stile) si ricava dalla scheda locale
    fromWp: (c, loc, _i, all) => ({
      sopratitolo: c.badge,
      title: c.titolo,
      bullets: c.elenco,
      cta: c.link.label,
      href: c.link.href,
      image: c.immagine || s(loc?.image),
      imageAlt: c.immagineAlt,
      gradient: loc?.gradient ?? s(all[0]?.gradient),
    }),
    toWp: (x) => ({ titolo: s(x.title), badge: s(x.sopratitolo), elenco: x.bullets, link: { label: s(x.cta), href: s(x.href) }, immagine: s(x.image), immagineAlt: s(x.imageAlt) }),
  },
  'req-regionale': {
    fromWp: (c) => ({ icon: c.icona, text: c.titolo }),
    toWp: (x) => ({ titolo: s(x.text), icona: s(x.icon) }),
  },
  'punti-regionale': {
    fromWp: (c) => ({ text: c.titolo }),
    toWp: (x) => ({ titolo: s(x.text) }),
  },
  'percorsi-fse': {
    fromWp: (c, loc) => ({
      badge: c.badge,
      icon: c.icona,
      title: c.titolo,
      bullets: c.elenco,
      cta: c.link.label,
      href: c.link.href,
      image: c.immagine || s(loc?.image),
      imageAlt: c.immagineAlt,
    }),
    toWp: (x) => ({ titolo: s(x.title), badge: s(x.badge), icona: s(x.icon), elenco: x.bullets, link: { label: s(x.cta), href: s(x.href) }, immagine: s(x.image), immagineAlt: s(x.imageAlt) }),
  },
  'categorie-home': {
    // I colori (accento e badge) sono stile: si ricavano dalla scheda locale con lo stesso titolo
    fromWp: (c, loc) => ({
      href: c.link.href,
      badge: c.badge,
      badgeColor: loc?.badgeColor ?? '#018891',
      title: c.titolo,
      description: c.testo,
      color: loc?.color ?? '#008C95',
      image: c.immagine || s(loc?.image),
      imageAlt: c.immagineAlt,
    }),
    toWp: (x) => ({ titolo: s(x.title), testo: s(x.description), badge: s(x.badge), link: { label: s(x.title), href: s(x.href) }, immagine: s(x.image), immagineAlt: s(x.imageAlt) }),
  },
};
