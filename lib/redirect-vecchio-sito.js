/**
 * Redirect 301 dal vecchio sito Joomla/K2 (www.aletheiasrl.it/index.php/...) al nuovo sito.
 *
 * FONTE UNICA: docs/mappa-redirect-301.md (251 URL ordinati per visite, con la destinazione approvata). Questo modulo legge quella tabella
 * e ne ricava le regole di next.config.js: per cambiare una destinazione si modifica la tabella, non il codice.
 *
 * Il vecchio sito accettava solo gli URL con "/index.php" (senza rispondeva 404), con o senza slash finale e con qualunque parametro Joomla
 * (?Itemid=, ?start=, ?option=...). Quindi tutte le regole partono da /index.php, accettano lo slash finale `{/}?` e non guardano la query.
 * Le regole sono in ordine, perché Next usa la PRIMA che corrisponde:
 *   1. le righe della mappa, una per una (tranne le offerte di lavoro, vedi 3);
 *   2. le schede K2 per ID numerico ("157-formazione-dei-lavoratori..."): lo stesso ID con uno slug diverso va alla stessa pagina;
 *   3. le offerte di lavoro: UNA regola con parametro (le offerte stanno su aletheia4job.it, nella mappa erano 141 righe);
 *   4. le news vecchie senza equivalente: /index.php/news/item/:slug -> /news;
 *   5. riserva: qualunque altro /index.php/... va alla pagina madre più vicina presente nella mappa, in fondo alla home. Mai 404.
 * Tutte permanenti con statusCode 301 (permanent:true darebbe 308). Un solo salto: nessuna destinazione è a sua volta un redirect.
 */
const fs = require('fs');
const path = require('path');

const FILE_MAPPA = path.join(__dirname, '..', 'docs', 'mappa-redirect-301.md');
const OFFERTE = '/index.php/apl-lavoro/offerte-di-lavoro';
const OFFERTE_DESTINAZIONE = 'https://aletheia4job.it/';

/** Righe { da, a } della prima tabella ("Vecchio URL -> Nuovo URL"); la seconda tabella (elenco del sito nuovo) non serve qui. */
function leggiMappa(testo = fs.readFileSync(FILE_MAPPA, 'utf8')) {
  const righe = [];
  let nellaPrima = false;
  for (const r of testo.split(/\r?\n/)) {
    if (/^## Vecchio URL/.test(r)) nellaPrima = true;
    else if (/^## /.test(r)) nellaPrima = false;
    if (!nellaPrima) continue;
    const m = /^\s{2}(\/\S*)\s{2,}((?:\/|https?:\/\/)\S*)\s*$/.exec(r);
    if (m) righe.push({ da: m[1], a: m[2] });
  }
  return righe;
}

const senzaSlash = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
const segmenti = (p) => p.split('/').filter(Boolean).length;
// Caratteri speciali della sintassi dei source di Next (path-to-regexp): nei vecchi URL non ce ne sono, ma meglio non dipendere dai dati.
const esc = (p) => p.replace(/[()*+?{}:\\]/g, '\\$&');
const R301 = (source, destination) => ({ source, destination, statusCode: 301 });

/** Costruisce le regole di Next a partire dalle righe della mappa. Ritorna { redirects, ids, avvisi }: gli ultimi due servono ai test. */
function costruisciRedirect(righe = leggiMappa()) {
  const avvisi = [];
  const esatte = new Map(); // percorso senza slash finale -> destinazione
  for (const { da, a } of righe) {
    if (da === '/' || da.startsWith(OFFERTE)) continue; // "/" -> "/" non è un redirect; le offerte hanno la loro regola
    const k = senzaSlash(da);
    if (esatte.has(k) && esatte.get(k) !== a) throw new Error(`Mappa incoerente: ${k} ha due destinazioni (${esatte.get(k)} e ${a})`);
    esatte.set(k, a);
  }

  const redirects = [];
  // 1. righe della mappa, una per una (con o senza slash finale)
  for (const [da, a] of esatte) redirects.push(R301(`${esc(da)}{/}?`, a));

  // 2. schede K2 per ID: .../item/<id>-<slug>
  const perId = new Map();
  for (const [da, a] of esatte) {
    const m = /\/item\/(\d+)-[^/]*$/.exec(da);
    if (!m) continue;
    const id = m[1];
    if (perId.has(id) && perId.get(id) !== a) { perId.set(id, null); avvisi.push(`ID K2 ${id} ha destinazioni diverse nella mappa: nessuna regola per ID`); }
    else if (!perId.has(id)) perId.set(id, a);
  }
  for (const [id, a] of perId) if (a) redirects.push(R301(`/index.php/:sezione*/item/:scheda(${id}-[^/]*){/}?`, a));

  // 3. offerte di lavoro: una regola sola (copre anche /offerte-di-lavoro e /offerte-di-lavoro/item/<id>-<slug>)
  redirects.push(R301(`${OFFERTE}/:resto*{/}?`, OFFERTE_DESTINAZIONE));

  // 4. news vecchie senza equivalente (dopo le specifiche)
  redirects.push(R301('/index.php/news/item/:slug{/}?', '/news'));

  // 5. riserva: pagina madre più vicina. Le pagine della mappa (non le schede K2) fanno da "madre" per tutto ciò che sta sotto, dal
  //    percorso più profondo al meno profondo; l'ultima è la home.
  const madri = [...esatte].filter(([da]) => !/\/item\/\d+-/.test(da) && da !== '/index.php').sort((x, y) => segmenti(y[0]) - segmenti(x[0]));
  for (const [da, a] of madri) redirects.push(R301(`${esc(da)}/:resto+{/}?`, a));
  redirects.push(R301('/index.php/:resto+{/}?', '/'));

  return { redirects, ids: perId, avvisi };
}

module.exports = { leggiMappa, costruisciRedirect, FILE_MAPPA, OFFERTE, OFFERTE_DESTINAZIONE };
