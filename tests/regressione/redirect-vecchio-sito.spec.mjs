// Redirect 301 dal vecchio sito Joomla (docs/mappa-redirect-301.md -> lib/redirect-vecchio-sito.js -> next.config.js).
// Verifica sul server di test (build di produzione): tutti i 250 URL della mappa, le varianti con slash finale, le schede K2 con slug
// diverso, le riserve ("mai 404"), i parametri Joomla e che ogni destinazione risponda 200 senza altri salti (nessuna catena).
import { test, expect } from '@playwright/test';
import redirectVecchioSito from '../../lib/redirect-vecchio-sito.js';

const { leggiMappa, OFFERTE, OFFERTE_DESTINAZIONE } = redirectVecchioSito;
const righe = leggiMappa();
const atteso = (r) => (r.da.startsWith(OFFERTE) ? OFFERTE_DESTINAZIONE : r.a); // le offerte hanno UNA regola, la destinazione è quella della mappa

/** Una richiesta SENZA seguire i redirect: stato e Location (risolta rispetto all'host del test). */
async function salto(request, baseURL, url) {
  const r = await request.get(url, { maxRedirects: 0 });
  const loc = r.headers()['location'];
  return { stato: r.status(), loc: loc ? new URL(loc, baseURL).toString() : null };
}
const comeAtteso = (baseURL, dest) => (dest.startsWith('http') ? new URL(dest).toString() : new URL(dest, baseURL).toString());

test('la mappa ha 250 righe e nessun ?categoria=icdl (non esiste: si usa certificazioni-informatiche) @rapido', () => {
  expect(righe).toHaveLength(250);
  expect(righe.filter((r) => r.a.includes('categoria=icdl'))).toEqual([]);
  expect(righe.filter((r) => r.a.includes('categoria=certificazioni-informatiche'))).toHaveLength(4);
});

test('i 250 URL della mappa: 301 diretto (un solo salto) alla destinazione della mappa @rapido', async ({ request, baseURL }) => {
  const errori = [];
  for (const r of righe) {
    if (r.da === '/') continue; // "/" -> "/" non è un redirect
    const s = await salto(request, baseURL, r.da);
    if (s.stato !== 301 || s.loc !== comeAtteso(baseURL, atteso(r))) errori.push(`${r.da} -> ${s.stato} ${s.loc} (atteso 301 ${atteso(r)})`);
  }
  expect(errori, errori.join('\n')).toEqual([]);
});

test('gli stessi URL con slash finale (o senza, se la mappa lo ha già): 301 diretto, mai due salti @rapido', async ({ request, baseURL }) => {
  const errori = [];
  for (const r of righe) {
    if (r.da === '/') continue;
    const variante = r.da.endsWith('/') ? r.da.replace(/\/+$/, '') : `${r.da}/`;
    const s = await salto(request, baseURL, variante);
    if (s.stato !== 301 || s.loc !== comeAtteso(baseURL, atteso(r))) errori.push(`${variante} -> ${s.stato} ${s.loc} (atteso 301 ${atteso(r)})`);
  }
  expect(errori, errori.join('\n')).toEqual([]);
});

test('ogni destinazione interna esiste: 200 e nessun altro redirect (niente catene) @rapido', async ({ request, baseURL }) => {
  const destinazioni = [...new Set(righe.map(atteso).filter((d) => d.startsWith('/')))];
  const errori = [];
  for (const d of destinazioni) {
    const s = await salto(request, baseURL, d);
    if (s.stato !== 200) errori.push(`${d} -> ${s.stato} ${s.loc ?? ''}`);
  }
  expect(destinazioni.length).toBeGreaterThan(60);
  expect(errori, errori.join('\n')).toEqual([]);
});

test('le schede K2 con slug diverso (stesso ID) vanno alla pagina giusta; le news senza equivalente vanno a /news @rapido', async ({ request, baseURL }) => {
  const casi = [
    ['/index.php/i-nostri-corsi/formazione-obbligatoria/sicurezza-sul-lavoro/item/157-slug-cambiato', '/all-courses/formazione-dei-lavoratori'],
    ['/index.php/qualunque/sezione/item/153-altro-slug', '/all-courses/antincendio'],
    ['/index.php/news/item/999-articolo-vecchio-senza-equivalente', '/news'],
    ['/index.php/news/item/999-articolo-vecchio-senza-equivalente/', '/news'],
  ];
  for (const [da, a] of casi) {
    const s = await salto(request, baseURL, da);
    expect([s.stato, s.loc], da).toEqual([301, comeAtteso(baseURL, a)]);
  }
});

test('le offerte di lavoro: una regola sola verso aletheia4job.it (anche con slash, parametri e /item/...) @rapido', async ({ request, baseURL }) => {
  for (const da of ['/index.php/apl-lavoro/offerte-di-lavoro', '/index.php/apl-lavoro/offerte-di-lavoro/', '/index.php/apl-lavoro/offerte-di-lavoro/item/460-qualunque-offerta', '/index.php/apl-lavoro/offerte-di-lavoro/item/1-nuova/', '/index.php/apl-lavoro/offerte-di-lavoro/categoria/x/y']) {
    const s = await salto(request, baseURL, da);
    expect([s.stato, s.loc], da).toEqual([301, 'https://aletheia4job.it/']);
  }
});

test('riserva: qualunque altro /index.php/... va alla pagina madre più vicina, mai 404 @rapido', async ({ request, baseURL }) => {
  const casi = [
    ['/index.php/i-nostri-corsi/sezione-nuova/pagina', '/all-courses'],
    ['/index.php/i-nostri-corsi/formazione-obbligatoria/sicurezza-sul-lavoro/qualcosa', '/all-courses?categoria=sicurezza-lavoro'],
    ['/index.php/i-nostri-corsi/ecdl-icdl/nuovo-corso-icdl', '/all-courses?categoria=certificazioni-informatiche'],
    ['/index.php/contattaci/pagina-nuova', '/contatti'],
    ['/index.php/chi-siamo/team', '/chi-siamo'],
    ['/index.php/apl-lavoro/servizio-nuovo', '/agenzia-per-il-lavoro'],
    ['/index.php/pagina-che-non-esiste', '/'],
    ['/index.php/xyz/abc/def/', '/'],
    ['/index.php/', '/'],
  ];
  for (const [da, a] of casi) {
    const s = await salto(request, baseURL, da);
    expect([s.stato, s.loc], da).toEqual([301, comeAtteso(baseURL, a)]);
  }
});

test('parametri Joomla (?Itemid=, ?start=, ?option=) non cambiano la regola; maiuscole indifferenti @rapido', async ({ request, baseURL }) => {
  // NB: Next inoltra la query originale all'URL di arrivo (non si può togliere da next.config.js): qui si controlla solo percorso e stato.
  for (const [da, a] of [['/index.php/chi-siamo?Itemid=101', '/chi-siamo'], ['/index.php/news?start=20&option=com_k2', '/news'], ['/index.php/chi-siamo/?Itemid=3', '/chi-siamo'], ['/INDEX.PHP/Chi-Siamo', '/chi-siamo']]) {
    const s = await salto(request, baseURL, da);
    expect(s.stato, da).toBe(301);
    expect(new URL(s.loc).pathname, da).toBe(a);
  }
});

test('senza /index.php il vecchio sito rispondeva 404: nessun redirect del vecchio sito (301); le pagine del nuovo sito con lo stesso percorso restano 200 @rapido', async ({ request, baseURL }) => {
  const senza = [...new Set(righe.map((r) => r.da).filter((d) => d.startsWith('/index.php/')).map((d) => d.replace(/^\/index\.php/, '').replace(/\/+$/, '')))];
  const errori = [];
  for (const d of senza) {
    if (d.startsWith('/apl-lavoro/offerte-di-lavoro')) continue; // 141 percorsi uguali tra loro: ne basta uno, sotto
    const s = await salto(request, baseURL, d);
    if (s.stato === 301) errori.push(`${d} -> 301 ${s.loc}`);
  }
  expect(senza.length).toBeGreaterThan(100);
  expect(errori, errori.join('\n')).toEqual([]);
  expect((await salto(request, baseURL, '/chi-siamo')).stato).toBe(200); // stessa pagina del nuovo sito: nessun cappio /chi-siamo -> /chi-siamo
  expect((await salto(request, baseURL, '/news')).stato).toBe(200);
});

test('slash finale sul resto del sito: 308 diretto come prima (la regola interna di Next è sostituita, non persa) @rapido', async ({ request, baseURL }) => {
  for (const [da, a] of [['/chi-siamo/', '/chi-siamo'], ['/all-courses/antincendio/', '/all-courses/antincendio'], ['/aiuti-di-stato-2023/', '/aiuti-di-stato/2023']]) {
    const s = await salto(request, baseURL, da);
    expect([s.stato, s.loc], da).toEqual([308, comeAtteso(baseURL, a)]);
  }
});
