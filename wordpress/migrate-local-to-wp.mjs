#!/usr/bin/env node
/**
 * Migra in WordPress i contenuti che oggi vivono nel codice (data/*, lib/newsData.js):
 *   corsi (CPT corso + categoria_corso), edizioni del calendario, news (+ tag_news), aiuti di Stato,
 *   sedi, FAQ delle pagine di formazione, loghi partner (ecosistema, certificazioni) schede (liste di card), testi delle pagine (hero, sezioni, CTA), bandi dell'archivio e opzioni globali
 *   (identità, menu, footer: pagina `opzioni-globali`).
 *
 * Uso (dalla radice del progetto):
 *   node wordpress/migrate-local-to-wp.mjs                  # SIMULAZIONE: elenca cosa farebbe, non scrive nulla
 *   node wordpress/migrate-local-to-wp.mjs --apply          # scrive su WordPress
 *   opzioni: --only=corsi,edizioni,news,aiuti,sedi,faq,partner,schede,pagine,archivio,opzioni   --limit=5   --with-images
 *
 * Variabili d'ambiente (solo con --apply):
 *   WP_URL            es. https://cms.aletheiasrl.it
 *   WP_USER           utente WordPress con permessi di editor/amministratore
 *   WP_APP_PASSWORD   "Password applicazione" (Utenti → Profilo → Password applicazioni)
 *
 * È idempotente: ogni contenuto si cerca per slug e, se esiste, viene aggiornato invece di duplicato.
 * Ordine obbligato (le edizioni puntano ai corsi): corsi → edizioni → news → aiuti → sedi → faq → partner → schede → pagine → archivio → opzioni.
 */
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { privacyHtml } from './privacy-html.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ─── Argomenti ───────────────────────────────────────────────── */

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => (args.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1];
const APPLY = flag('apply');
const WITH_IMAGES = flag('with-images');
const LIMIT = opt('limit') ? Number(opt('limit')) : Infinity;
const ALL = ['corsi', 'edizioni', 'news', 'aiuti', 'sedi', 'faq', 'partner', 'schede', 'pagine', 'archivio', 'opzioni'];
const ONLY = opt('only') ? opt('only').split(',') : ALL;
for (const o of ONLY) if (!ALL.includes(o)) throw new Error(`--only non valido: ${o} (ammessi: ${ALL.join(', ')})`);

const WP_URL = (process.env.WP_URL || '').replace(/\/+$/, '');
if (APPLY && (!WP_URL || !process.env.WP_USER || !process.env.WP_APP_PASSWORD)) {
  console.error('Con --apply servono WP_URL, WP_USER e WP_APP_PASSWORD.');
  process.exit(2);
}

/* ─── Caricamento dei dati locali (anche TS / ESM dentro .js) ──── */

function loadModule(relPath) {
  const file = join(ROOT, relPath);
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019, esModuleInterop: true },
  });
  const mod = { exports: {} };
  vm.runInNewContext(outputText, { module: mod, exports: mod.exports, require: createRequire(file), console }, { filename: file });
  return mod.exports;
}

const { coursesData } = loadModule('data/coursesRaw.js');
const { buildCourseFamilies } = loadModule('data/courseFamilies.js');
const { CALENDARIO } = loadModule('data/calendario.ts');
const { ALL_NEWS } = loadModule('lib/newsData.js');
const AIUTI = ['2023', '2024'].map((y) => loadModule(`data/content/aiuti-di-stato/${y}.js`));
const { SEDI } = loadModule('data/sedi.js');
const { FAQ_PAGINE: FAQ_DI_PAGINA } = loadModule('data/faq.js');
const { CHATBOT_FAQ } = loadModule('data/chatbot-faq.js');
// Le FAQ del chatbot sono voci `faq` con `pagina` = `chatbot-<gruppo>`.
const FAQ_PAGINE = { ...FAQ_DI_PAGINA, ...Object.fromEntries(Object.entries(CHATBOT_FAQ).map(([g, f]) => [`chatbot-${g}`, f])) };
const { PARTNER } = loadModule('data/partner.js');
const { SITE_OPTIONS } = loadModule('data/site-options.js');
const { SCHEDE_LOCALI } = loadModule('data/schede.js');
const { LISTE: LISTE_SCHEDE } = loadModule('lib/wp-schede-map.ts');
const { PAGINE } = loadModule('data/pagine.js');
const PRIVACY = loadModule('data/privacy.js');
const { FAMIGLIE: FAMIGLIE_ARCHIVIO } = loadModule('data/archivio-famiglie.js');
const { SCHEDE_ARCHIVIO } = loadModule('data/archivio-schede.js');

/* ─── Client WordPress ────────────────────────────────────────── */

const AUTH = APPLY ? `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`).toString('base64')}` : '';

async function wp(method, path, body) {
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    method,
    headers: { Authorization: AUTH, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : null;
}

/** Cerca per slug (anche tra bozze/privati) e aggiorna, altrimenti crea. Restituisce { id, created }. */
async function upsert(type, slug, payload) {
  const found = await wp('GET', `/wp/v2/${type}?slug=${encodeURIComponent(slug)}&status=any&per_page=1`);
  if (Array.isArray(found) && found[0]) {
    const post = await wp('POST', `/wp/v2/${type}/${found[0].id}`, { ...payload, slug });
    return { id: post.id, created: false };
  }
  const post = await wp('POST', `/wp/v2/${type}`, { ...payload, slug, status: 'publish' });
  return { id: post.id, created: true };
}

const termCache = new Map();
/** Trova o crea un termine di tassonomia. */
async function ensureTerm(taxonomy, { slug, name, parent = 0 }) {
  const key = `${taxonomy}:${parent}:${slug}`;
  if (termCache.has(key)) return termCache.get(key);
  const found = await wp('GET', `/wp/v2/${taxonomy}?slug=${encodeURIComponent(slug)}&per_page=100`);
  let term = (found || []).find((t) => (t.parent || 0) === parent);
  if (!term) term = await wp('POST', `/wp/v2/${taxonomy}`, { name, slug, parent });
  termCache.set(key, term.id);
  return term.id;
}

const mediaCache = new Map();
/** Scarica un'immagine e la carica nella libreria media. Errori non fatali: si migra senza immagine. */
async function uploadImage(url) {
  if (!WITH_IMAGES || !url) return null;
  if (mediaCache.has(url)) return mediaCache.get(url);
  try {
    const src = await fetch(url);
    if (!src.ok) throw new Error(`download ${src.status}`);
    const type = src.headers.get('content-type') || 'image/jpeg';
    const name = (new URL(url).pathname.split('/').pop() || 'immagine').replace(/[^a-zA-Z0-9._-]/g, '') || 'immagine.jpg';
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
      method: 'POST',
      headers: { Authorization: AUTH, 'Content-Type': type, 'Content-Disposition': `attachment; filename="${name}"` },
      body: Buffer.from(await src.arrayBuffer()),
    });
    if (!res.ok) throw new Error(`upload ${res.status}`);
    const media = await res.json();
    mediaCache.set(url, media.id);
    return media.id;
  } catch (err) {
    console.warn(`  ! immagine non migrata (${url}): ${err.message}`);
    mediaCache.set(url, null);
    return null;
  }
}

const MIME = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
/** Carica in Media un file di `public/` (es. '/images/gruppo/doses.svg'). Errori non fatali; gli SVG richiedono un plugin tipo Safe SVG. */
async function uploadPublicFile(webPath) {
  if (!WITH_IMAGES || !webPath) return null;
  if (mediaCache.has(webPath)) return mediaCache.get(webPath);
  try {
    const file = join(ROOT, 'public', webPath);
    if (!existsSync(file)) throw new Error('file non trovato');
    const ext = webPath.slice(webPath.lastIndexOf('.')).toLowerCase();
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
      method: 'POST',
      headers: { Authorization: AUTH, 'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Disposition': `attachment; filename="${webPath.split('/').pop()}"` },
      body: readFileSync(file),
    });
    if (!res.ok) throw new Error(`upload ${res.status}`);
    const media = await res.json();
    mediaCache.set(webPath, media.id);
    return media.id;
  } catch (err) {
    console.warn(`  ! logo non migrato (${webPath}): ${err.message}`);
    mediaCache.set(webPath, null);
    return null;
  }
}

/* ─── Conversioni ─────────────────────────────────────────────── */

const SUB_LABELS = {
  'fse-plus': 'FSE+',
  'fondi-interprofessionali': 'Fondi Interprofessionali',
  'fondo-nuove-competenze': 'Fondo Nuove Competenze',
  'sicurezza-lavoro': 'Sicurezza sui luoghi di lavoro',
  icdl: 'ICDL',
  'formazione-continua': 'Formazione continua',
  psr: 'PSR',
  certificazione: 'Corsi Qualificati',
  'corsi-pa': 'Corsi per la PA',
};
const titleCase = (slug) => slug.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());

const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const bold = (s) => escHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/** Stesse regole di renderBody() in pages/news/[slug].js: titoletti, elenchi numerati/puntati, paragrafi. */
function bodyToHtml(text) {
  return text
    .split('\n\n')
    .filter(Boolean)
    .map((para) => {
      const t = para.trim();
      if (/^\*\*[^*]+\*\*$/.test(t)) return `<h2>${escHtml(t.slice(2, -2))}</h2>`;
      if (/^\d+\.\s/m.test(para)) {
        const items = para.split('\n').filter(Boolean).map((i) => `<li>${bold(i.replace(/^\d+\.\s/, ''))}</li>`);
        return `<ol>${items.join('')}</ol>`;
      }
      if (para.includes('\n- ') || para.startsWith('- ')) {
        const items = para.split('\n').filter((l) => l.startsWith('- ')).map((i) => `<li>${bold(i.slice(2))}</li>`);
        return `<ul>${items.join('')}</ul>`;
      }
      return `<p>${bold(para)}</p>`;
    })
    .join('\n');
}

/** Slug del corso WordPress a cui agganciare un'edizione (lo slug locale può essere quello di una famiglia). */
function resolveCorsoSlug(slug, familiesBySlug) {
  if (coursesData.some((c) => c.slug === slug)) return slug;
  const fam = familiesBySlug.get(slug);
  return fam ? fam.varianti[0].slug : null;
}

/* ─── Migrazione per entità ───────────────────────────────────── */

const report = {};
const bump = (entity, key) => {
  report[entity] = report[entity] || { creati: 0, aggiornati: 0, saltati: 0, errori: 0 };
  report[entity][key] += 1;
};
const failures = [];

async function run(entity, items, fn) {
  console.log(`\n▸ ${entity}: ${Math.min(items.length, LIMIT)} elementi${APPLY ? '' : ' (simulazione)'}`);
  for (const item of items.slice(0, LIMIT)) {
    try {
      const outcome = await fn(item);
      bump(entity, outcome);
    } catch (err) {
      bump(entity, 'errori');
      failures.push(`${entity}: ${err.message}`);
      console.error(`  ✗ ${err.message}`);
    }
  }
}

const corsoIds = new Map(); // slug -> id WordPress

async function migrateCorsi() {
  await run('corsi', coursesData, async (c, i = 0) => {
    if (!APPLY) {
      console.log(`  · ${c.slug}  [${c.categoryKey}${c.subKey && c.subKey !== c.categoryKey ? ' / ' + c.subKey : ''}]`);
      return 'saltati';
    }
    const rootId = await ensureTerm('categoria_corso', { slug: c.categoryKey, name: c.category });
    const leafId =
      c.subKey && c.subKey !== c.categoryKey
        ? await ensureTerm('categoria_corso', { slug: c.subKey, name: SUB_LABELS[c.subKey] || titleCase(c.subKey), parent: rootId })
        : rootId;
    const price = Array.isArray(c.price) ? c.price : [];
    const media = await uploadImage(c.image);
    const { id, created } = await upsert('corso', c.slug, {
      title: c.title,
      menu_order: coursesData.indexOf(c) + 1,
      categoria_corso: [leafId],
      ...(media ? { featured_media: media } : {}),
      acf: {
        badge: c.badge || '',
        provider: c.provider || '',
        stato_card: c.status || '',
        gradiente: c.gradient || '',
        meta_card: (c.meta || []).map((m) => `${m.icon}|${m.text}`).join('\n'),
        prezzi_variante: price.map((p) => `${p.label}|${p.amount}`).join('\n'),
      },
    });
    corsoIds.set(c.slug, id);
    return created ? 'creati' : 'aggiornati';
  });
}

async function migrateEdizioni() {
  const families = new Map(buildCourseFamilies(coursesData, {}, { quiet: true }).map((f) => [f.slug, f]));
  await run('edizioni', CALENDARIO, async (e) => {
    const corsoSlug = resolveCorsoSlug(e.slug, families);
    if (!corsoSlug) throw new Error(`edizione ${e.id} (${e.titolo}): nessun corso per lo slug "${e.slug}"`);
    if (!APPLY) {
      console.log(`  · ${e.data}  ${e.titolo}  → corso ${corsoSlug}`);
      return 'saltati';
    }
    let corsoId = corsoIds.get(corsoSlug);
    if (!corsoId) {
      const found = await wp('GET', `/wp/v2/corso?slug=${encodeURIComponent(corsoSlug)}&status=any&per_page=1`);
      corsoId = found?.[0]?.id;
    }
    if (!corsoId) throw new Error(`edizione ${e.id} (${e.titolo}): il corso "${corsoSlug}" non esiste ancora in WordPress (migra prima i corsi)`);
    const { created } = await upsert('edizione_corso', `${corsoSlug}-${e.data}-${e.id}`, {
      title: `${e.titolo} — ${e.data}`,
      acf: {
        corso: corsoId,
        data: e.data,
        categoria: e.categoria,
        orario: e.orario,
        sede: e.sede,
        durata: e.durata,
        posti: e.posti,
        posti_disponibili: e.postiDisponibili,
        relatore: e.relatore || '',
        crediti_ecm: e.creditiEcm || 0,
      },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

async function migrateNews() {
  await run('news', ALL_NEWS, async (n) => {
    if (!APPLY) {
      console.log(`  · ${n.date}  ${n.slug}  [${(n.tags || []).join(', ')}]`);
      return 'saltati';
    }
    const tagIds = [];
    for (const tag of n.tags || []) tagIds.push(await ensureTerm('tag_news', { slug: tag, name: titleCase(tag) }));
    const media = await uploadImage(n.image);
    const { created } = await upsert('news', n.slug, {
      title: n.title,
      excerpt: n.excerpt,
      content: bodyToHtml(n.body),
      date: `${n.date}T09:00:00`,
      tag_news: tagIds,
      ...(media ? { featured_media: media } : {}),
    });
    return created ? 'creati' : 'aggiornati';
  });
}

async function migrateAiuti() {
  const rows = AIUTI.flatMap((a) =>
    a.enti.flatMap((ente) => ente.righe.map((r) => ({ anno: a.anno, ente: ente.ente, ...r }))),
  );
  rows.forEach((r, i) => (r.n = i + 1));
  await run('aiuti', rows, async (r) => {
    const [d, m, y] = r.data.split('/');
    if (!APPLY) {
      console.log(`  · ${r.anno}  ${r.data}  ${r.ente.slice(0, 40)}`);
      return 'saltati';
    }
    const { created } = await upsert('aiuto_stato', `aiuto-${r.anno}-${String(r.n).padStart(3, '0')}`, {
      title: r.titolo,
      menu_order: r.n,
      acf: { anno: r.anno, ente: r.ente, data: `${y}-${m}-${d}`, importo: r.importo, cup: r.cup },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

const slugify = (t) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function migrateSedi() {
  await run('sedi', SEDI, async (sede) => {
    const i = SEDI.indexOf(sede) + 1;
    if (!APPLY) {
      console.log(`  · ${sede.città}  ${sede.indirizzo}`);
      return 'saltati';
    }
    // In locale `cap` è la riga completa ("97019 Vittoria (RG)"): si separa il CAP numerico dalla città.
    const m = sede.cap.match(/^(\d{5})\s+(.*)$/);
    const { created } = await upsert('sede', slugify(sede.città), {
      title: sede.città,
      menu_order: i,
      acf: {
        indirizzo: sede.indirizzo,
        cap: m ? m[1] : '',
        citta: m ? m[2] : sede.cap,
        maps_href: sede.mapsHref,
        mappa_embed: sede.mapsEmbed,
        principale: i === 1,
      },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

async function migrateFaq() {
  const rows = Object.entries(FAQ_PAGINE).flatMap(([pagina, faqs]) => faqs.map((f, i) => ({ pagina, n: i + 1, ...f })));
  await run('faq', rows, async (r) => {
    if (!APPLY) {
      console.log(`  · ${r.pagina}  ${r.domanda.slice(0, 60)}`);
      return 'saltati';
    }
    const { created } = await upsert('faq', `${r.pagina}-${String(r.n).padStart(2, '0')}`, {
      title: r.domanda,
      menu_order: r.n,
      content: `<p>${escHtml(r.risposta)}</p>`,
      acf: { pagina: r.pagina },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

async function migratePartner() {
  const rows = Object.entries(PARTNER).flatMap(([gruppo, list]) => list.map((p, i) => ({ gruppo, n: i + 1, ...p })));
  await run('partner', rows, async (p) => {
    if (!APPLY) {
      console.log(`  · ${p.gruppo}  ${p.name}  ${p.src}`);
      return 'saltati';
    }
    const media = await uploadPublicFile(p.src);
    const mediaDark = p.srcDark ? await uploadPublicFile(p.srcDark) : null;
    const { created } = await upsert('partner', `${p.gruppo}-${slugify(p.name)}`, {
      title: p.name,
      menu_order: p.n,
      acf: { gruppo: p.gruppo, ...(media ? { logo: media } : {}), ...(mediaDark ? { logo_scuro: mediaDark } : {}) },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

const pageCache = new Map();
/** Trova o crea una pagina WordPress (anche gerarchica: `parent` = ID della pagina madre). Restituisce l'ID. */
async function ensurePage(slug, parent, title) {
  const key = `${parent}:${slug}`;
  if (pageCache.has(key)) return pageCache.get(key);
  const found = await wp('GET', `/wp/v2/pages?slug=${encodeURIComponent(slug)}&parent=${parent}&status=any&per_page=1`);
  const page = found?.[0] || (await wp('POST', '/wp/v2/pages', { title, slug, parent, status: 'publish' }));
  pageCache.set(key, page.id);
  return page.id;
}

/** Valore dei testi di pagina → campo ACF: stringa → testo, array → paragrafi HTML, { label, href } → link. */
// Campi che in ACF sono "una riga per voce" in un campo di testo semplice (non wysiwyg): niente <p>
const CAMPI_ELENCO = new Set(['numeri']);

/** Valore locale (data/pagine.js) → valore ACF. Un'immagine `{ src, alt }` va in Media: si scrive l'ID (null = salta il campo). */
async function pageField(key, v) {
  if (Array.isArray(v)) return CAMPI_ELENCO.has(key) ? v.join('\n') : v.map((p) => `<p>${escHtml(p)}</p>`).join('\n');
  if (v && typeof v === 'object' && 'src' in v) {
    const id = await uploadImage(v.src);
    // Il testo alternativo sta nel media: ACF lo restituisce con l'immagine (vedi lib/wp-pagine.ts)
    if (id && v.alt) await wp('POST', `/wp/v2/media/${id}`, { alt_text: v.alt });
    return id;
  }
  if (v && typeof v === 'object') return { title: v.label, url: v.href, target: /^https?:\/\//.test(v.href) ? '_blank' : '' };
  return v;
}

/** Testi delle pagine (hero, sezioni, CTA) → campi ACF delle pagine WP con lo stesso percorso (data/pagine.js). */
async function migratePagine() {
  await run('pagine', Object.entries(PAGINE), async ([path, testi]) => {
    if (!APPLY) {
      console.log(`  · ${path}  (${Object.keys(testi).length} campi)`);
      return 'saltati';
    }
    const parts = path.split('/');
    let parent = 0;
    for (const seg of parts.slice(0, -1)) parent = await ensurePage(seg, parent, titleCase(seg));
    const slug = parts[parts.length - 1];
    const existed = (await wp('GET', `/wp/v2/pages?slug=${encodeURIComponent(slug)}&parent=${parent}&status=any&per_page=1`))?.length > 0;
    const id = await ensurePage(slug, parent, String(testi.hero_titolo || titleCase(slug)).replace(/\*/g, ''));
    // Le immagini si caricano in sequenza (solo con --with-images; senza, il campo resta com'è e il sito usa l'URL locale)
    const acf = {};
    for (const [k, v] of Object.entries(testi)) {
      const val = await pageField(k, v);
      if (val !== null) acf[k] = val;
    }
    await wp('POST', `/wp/v2/pages/${id}`, {
      acf,
      // Il testo lungo della privacy è il contenuto della pagina WP (editor)
      ...(path === 'privacy-cookie' ? { content: privacyHtml(PRIVACY) } : {}),
    });
    return existed ? 'aggiornati' : 'creati';
  });
}

/** Come lib/wp-archivio.ts (titoloFromSlug): "avviso-7-2023" → "Avviso 7 2023". */
const titoloFromSlug = (slug) =>
  slug
    .split('-')
    .map((w) => (/^\d+$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');

/** Campi ACF del layout a scheda di una voce di data/archivio-schede.js. */
function schedaAcf(s) {
  const k = s.scheda;
  return {
    fuori_elenco: s.fuoriElenco,
    meta_titolo: s.metaTitolo,
    meta_descrizione: s.metaDescrizione,
    layout: 'scheda',
    scheda_titolo_breve: k.titoloBreve,
    scheda_badge: k.badge,
    scheda_sottotitolo: k.sottotitolo,
    scheda_requisiti_intro: k.requisitiIntro,
    scheda_requisiti: k.requisiti.join('\n'),
    scheda_extra_titolo: k.extraTitolo,
    scheda_extra_tipo: k.extraTipo,
    scheda_extra: k.extra.join('\n'),
    scheda_avviso: k.avviso,
    scheda_contatti: k.contatti,
  };
}

/** Bandi archiviati (public/pdf/archivio/*.json) → CPT archivio. I PDF restano nel frontend: l'URL è quello locale. */
async function migrateArchivio() {
  const index = JSON.parse(readFileSync(join(ROOT, 'public/pdf/archivio/index.json'), 'utf8'));
  const descr = JSON.parse(readFileSync(join(ROOT, 'public/pdf/archivio/descrizioni.json'), 'utf8'));
  const rows = Object.keys(index).map((slug, i) => {
    const fam = FAMIGLIE_ARCHIVIO.find((f) => slug.startsWith(`${f.chiave}/`));
    const ultimo = fam ? slug.slice(fam.chiave.length + 1) : slug;
    const d = descr[slug] || {};
    const titolo = d.titolo || titoloFromSlug(ultimo);
    const titoloIndice = fam ? titolo : titoloFromSlug(slug);
    const titoloPanoramica = fam?.sottovoci.find((s) => s.slug === ultimo)?.titolo ?? titoloIndice;
    return { n: i + 1, slug, fam: fam?.chiave || '', ultimo, d, titolo, titoloIndice, titoloPanoramica, documenti: index[slug] };
  });
  // Voci con layout a scheda (data/archivio-schede.js): documenti in "altri", campi `scheda_*` e `layout` = scheda.
  SCHEDE_ARCHIVIO.forEach((s, i) => {
    rows.push({
      n: rows.length + 1, slug: s.slug, fam: '', ultimo: s.slug, d: { descrizione: s.descrizione, destinatari: '' },
      titolo: s.titolo, titoloIndice: s.titolo, titoloPanoramica: s.titolo, documenti: { altri: s.documenti }, scheda: s,
    });
  });
  await run('archivio', rows, async (r) => {
    if (!APPLY) {
      console.log(`  · ${r.slug}  [${r.fam || 'singola'}]  ${Object.values(r.documenti).filter(Array.isArray).flat().length} documenti`);
      return 'saltati';
    }
    const documenti = Object.entries(r.documenti)
      // `testo` (metadati dell'estrazione) non è una sezione di documenti: si considerano solo gli array
      .flatMap(([sezione, docs]) => (Array.isArray(docs) ? docs.map((doc) => `${sezione}|${doc.titoloLink}|${doc.percorsoLocale}`) : []))
      .join('\n');
    const { created } = await upsert('archivio', r.ultimo, {
      title: r.titolo,
      menu_order: r.n,
      acf: {
        famiglia: r.fam,
        descrizione: r.d.descrizione || '',
        destinatari: r.d.destinatari || '',
        documenti,
        // Solo quando il titolo nell'elenco / nella panoramica differisce dal titolo del post
        titolo_indice: r.titoloIndice !== r.titolo ? r.titoloIndice : '',
        titolo_panoramica: r.titoloPanoramica !== r.titoloIndice ? r.titoloPanoramica : '',
        ...(r.scheda ? schedaAcf(r.scheda) : {}),
      },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

/** Liste di card → CPT scheda + termine della tassonomia lista_schede (mapping in lib/wp-schede-map.ts). */
/** Testo con soli <strong>/<em> (data/schede.js) → HTML dell'editor: i tag restano, il resto del testo è escapato. */
const htmlGrassetto = (t) => t.split(/(<\/?(?:strong|em)>)/).map((p, i) => (i % 2 ? p : escHtml(p))).join('');

async function migrateSchede() {
  const rows = Object.entries(SCHEDE_LOCALI).flatMap(([lista, items]) => items.map((item, i) => ({ lista, n: i + 1, item })));
  await run('schede', rows, async ({ lista, n, item }) => {
    const w = LISTE_SCHEDE[lista].toWp(item);
    if (!APPLY) {
      console.log(`  · ${lista}  ${w.titolo}`);
      return 'saltati';
    }
    // Le misure GOL conservano lo slug locale (è la chiave della card); le altre schede hanno slug <lista>-NN.
    const termId = await ensureTerm('lista_schede', { slug: lista, name: titleCase(lista) });
    // Immagine con URL → scaricata; percorso di `public/` (es. loghi accreditamenti di chi-siamo) → caricato da file
    const media = w.immagine?.startsWith('/') ? await uploadPublicFile(w.immagine) : await uploadImage(w.immagine);
    const { created } = await upsert('scheda', item.slug || `${lista}-${String(n).padStart(2, '0')}`, {
      title: w.titolo,
      menu_order: n,
      // Elenco puntato (bullets delle card) → <ul>; altrimenti il testo in un paragrafo
      // Paragrafo (testo, anche con grassetto) seguito dall'elenco puntato (bullets): una scheda può avere entrambi
      content:
        (w.testoRicco ? `<p>${htmlGrassetto(w.testoRicco)}</p>` : w.testo ? `<p>${escHtml(w.testo)}</p>` : '') +
        (w.elenco?.length ? `<ul>${w.elenco.map((li) => `<li>${escHtml(li)}</li>`).join('')}</ul>` : ''),
      lista_schede: [termId],
      ...(media ? { featured_media: media } : {}),
      acf: {
        icona: w.icona || '',
        badge: w.badge || '',
        sottotitolo: w.sottotitolo || '',
        ...(w.link ? { link: { title: w.link.label, url: w.link.href, target: '' } } : {}),
        meta_1: w.meta1 || '',
        meta_2: w.meta2 || '',
        immagine_alt: w.immagineAlt || '',
      },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

/** Percorso inverso di lib/wp-lists.ts: dagli oggetti locali ai campi testo a righe di ACF. */
const NL = '\n';
const pair = (l) => `${l.label}|${l.href}`;
const linkField = (l) => ({ title: l.label, url: l.href, target: /^https?:\/\//.test(l.href) ? '_blank' : '' });

async function migrateOpzioni() {
  await run('opzioni', [SITE_OPTIONS], async (o) => {
    if (!APPLY) {
      console.log('  · pagina "opzioni-globali": identità, menu, footer, contatti, moduli, chatbot, cookie');
      return 'saltati';
    }
    const { identita: i, header: h, footer: f } = o;
    const { created } = await upsert('pages', 'opzioni-globali', {
      title: 'Opzioni globali',
      acf: {
        telefono: i.telefono,
        email: i.email,
        orari: i.orari,
        social: i.social.map((s) => `${s.icon}|${s.href}|${s.name}`).join(NL),
        menu_voci: h.links.map(pair).join(NL),
        menu_formazione: h.formazione
          .flatMap((g) => [`# ${g.title}|${g.href}`, ...g.items.map(pair)])
          .join(NL),
        header_cta_lavoro: linkField(h.ctaLavoro),
        header_elearning: linkField(h.elearning),
        mega_calendario_titolo: h.megaCalendario.titolo,
        mega_calendario_testo: h.megaCalendario.testo,
        mega_calendario_btn: linkField(h.megaCalendario.btn),
        mega_corsi_btn: linkField(h.megaCorsiBtn),
        footer_indirizzo: f.indirizzo,
        footer_indirizzo_link: f.indirizzoLink,
        footer_link_legali: f.linkLegali.map(pair).join(NL),
        footer_colonne: f.colonne
          .flatMap((c) => [`# ${c.titolo}`, ...c.gruppi.flatMap((g) => [g.sottotitolo ? `## ${g.sottotitolo}` : '##', ...g.links.map(pair)])])
          .join(NL),
        footer_accreditamenti: f.accreditamenti.join(NL),
        footer_copyright: f.copyright,
        footer_credits_testo: f.creditsTesto,
        footer_credits_link: linkField(f.creditsLink),
        motivi_contatto: o.contatti.motivi.join(NL),
        form_servizi_candidato: o.moduli.serviziCandidato.join(NL),
        form_settori_azienda: o.moduli.settoriAzienda.join(NL),
        form_dipendenti_azienda: o.moduli.dipendentiAzienda.join(NL),
        form_servizi_azienda: o.moduli.serviziAzienda.join(NL),
        form_privacy_testo: o.moduli.privacyTesto,
        // Righe 1-2 = messaggio del modulo candidato (titolo, testo), 3-4 = modulo azienda, 5-6 = reclami e proposte
        form_successo_testo: [o.moduli.successoCandidato.titolo, o.moduli.successoCandidato.testo, o.moduli.successoAzienda.titolo, o.moduli.successoAzienda.testo, o.moduli.successoReclami.titolo, o.moduli.successoReclami.testo].join(NL),
        chatbot_attivo: o.chatbot.attivo,
        chatbot_nome: o.chatbot.nome,
        chatbot_benvenuto: o.chatbot.benvenuto,
        chatbot_placeholder: o.chatbot.placeholder,
        chatbot_fallback: o.chatbot.fallback,
        chatbot_email: o.chatbot.email,
        legale_banner: o.legale.banner,
        legale_btn_accetta: o.legale.btnAccetta,
        legale_btn_rifiuta: o.legale.btnRifiuta,
      },
    });
    return created ? 'creati' : 'aggiornati';
  });
}

/* ─── Esecuzione ──────────────────────────────────────────────── */

{
  console.log(APPLY ? `Migrazione verso ${WP_URL}` : 'SIMULAZIONE (nessuna scrittura). Aggiungi --apply per eseguire.');
  if (ONLY.includes('corsi')) await migrateCorsi();
  if (ONLY.includes('edizioni')) await migrateEdizioni();
  if (ONLY.includes('news')) await migrateNews();
  if (ONLY.includes('aiuti')) await migrateAiuti();
  if (ONLY.includes('sedi')) await migrateSedi();
  if (ONLY.includes('faq')) await migrateFaq();
  if (ONLY.includes('partner')) await migratePartner();
  if (ONLY.includes('schede')) await migrateSchede();
  if (ONLY.includes('pagine')) await migratePagine();
  if (ONLY.includes('archivio')) await migrateArchivio();
  if (ONLY.includes('opzioni')) await migrateOpzioni();

  console.log('\nRiepilogo');
  for (const [entity, r] of Object.entries(report)) {
    console.log(`  ${entity.padEnd(10)} creati ${r.creati}, aggiornati ${r.aggiornati}, in simulazione ${r.saltati}, errori ${r.errori}`);
  }
  if (!APPLY) console.log('\nSimulazione terminata: nessuna modifica è stata fatta.');
  if (failures.length) {
    console.error(`\n${failures.length} errori:\n- ${failures.join('\n- ')}`);
    process.exit(1);
  }
}
