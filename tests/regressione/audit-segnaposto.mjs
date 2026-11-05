// Cerca i testi segnaposto nel sito costruito: "in arrivo", "da definire", "lorem ipsum", "prossimamente"... nel TESTO VISIBILE di
// ogni pagina di urls.json, più i link che portano a "#" (pulsanti senza destinazione). Serve a compilare l'elenco dei blocchi per
// il lancio in MIGRAZIONE.md. Non modifica niente. Uso:  node tests/regressione/audit-segnaposto.mjs <indirizzo-base>
// Esce con 1 se trova qualcosa.
import * as cheerio from 'cheerio';
import { urls } from './util.mjs';

const base = process.argv[2] || 'http://localhost:3101';
const MODELLI = [
  ['in arrivo', /in arrivo/i], ['da definire', /da definire/i], ['lorem/ipsum', /lorem|ipsum/i], ['prossimamente', /prossimamente/i],
  ['coming soon', /coming soon/i], ['in costruzione', /in costruzione|work in progress/i], ['TODO/TBD', /\bTODO\b|\bTBD\b/],
  ['segnaposto', /segnaposto|placeholder/i], ['a definire', /\ba definire\b/i], ['xxx', /\bxxx+\b/i], ['N/D', /\bN\/D\b/],
];
const trovati = new Map(); // etichetta -> Map(pagina -> frase)
let pagine = 0;
for (const { url } of urls) {
  if (url.includes('?')) continue;
  const r = await fetch(base + url).catch(() => null);
  if (!r || r.status !== 200) continue;
  pagine++;
  const $ = cheerio.load(await r.text());
  $('script, style, noscript, template').remove();
  const testo = $('body').text().replace(/\s+/g, ' ');
  for (const [nome, re] of MODELLI) {
    const m = testo.match(re);
    if (m) {
      const i = m.index; const frase = testo.slice(Math.max(0, i - 50), i + m[0].length + 60).trim();
      if (!trovati.has(nome)) trovati.set(nome, new Map());
      trovati.get(nome).set(url, frase);
    }
  }
  const vuoti = $('a[href="#"]').map((_, a) => $(a).text().trim().slice(0, 40) || '(icona)').get();
  if (vuoti.length) {
    if (!trovati.has('link a "#"')) trovati.set('link a "#"', new Map());
    trovati.get('link a "#"').set(url, vuoti.join(' | '));
  }
}
console.log(`${pagine} pagine controllate su ${base}\n`);
let totale = 0;
for (const [nome, mappa] of trovati) {
  console.log(`## ${nome}: ${mappa.size} pagine`);
  for (const [u, f] of mappa) { console.log(`  ${u}  →  …${f}…`); totale++; }
  console.log('');
}
if (!totale) console.log('Nessun segnaposto trovato.');
process.exit(totale ? 1 : 0);
