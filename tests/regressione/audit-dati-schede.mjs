// Audit dei dati mostrati nelle schede corso: durata, attestato, modalità (e partecipanti/validità) per OGNI combinazione di switch
// (Corso base/Aggiornamento x livello), sia nella scheda tecnica sia nella riga sotto il titolo. Non corregge niente: elenca i valori
// sbagliati, duplicati o mancanti, da girare al reparto formazione. Standalone (Chromium installato in ms-playwright, come la config).
//   node tests/regressione/audit-dati-schede.mjs <indirizzo-base> [file.json]     (es. http://localhost:3101)
// Esce con 1 se trova anomalie "gravi" (durata, attestato o modalità sbagliati/duplicati/mancanti).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { urls } from './util.mjs';

const base = process.argv[2] || 'http://localhost:3101';
const fileJson = process.argv[3];
function trovaChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const dir = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright');
  try {
    const cartelle = fs.readdirSync(dir).filter((d) => /^chromium-\d+$/.test(d)).sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]));
    for (const c of cartelle) { const exe = path.join(dir, c, 'chrome-win64', 'chrome.exe'); if (fs.existsSync(exe)) return exe; }
  } catch { /* usa quello di Playwright */ }
  return undefined;
}
const pagine = urls.map((u) => u.url).filter((u) => /^\/all-courses\/[^?/]+$/.test(u));
const browser = await chromium.launch({ executablePath: trovaChromium() });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
await ctx.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'all'); } catch { /* niente */ } });
const page = await ctx.newPage();

const leggi = () => page.evaluate(() => {
  const h1 = document.querySelector('h1');
  const meta = [...h1.parentElement.querySelectorAll('span')].filter((s) => s.querySelector('i.fa-clock, i.fa-chalkboard-user'))
    .map((s) => ({ icona: s.querySelector('i').className.includes('clock') ? 'durata' : 'modalita', testo: s.textContent.trim() }));
  const items = [...document.querySelectorAll('.cp-scheda-area .cp-scheda-grid > div')].map((d) => { const sp = d.querySelectorAll('span'); return [sp[0]?.textContent.trim(), sp[1]?.textContent.trim()]; });
  const sel = [...document.querySelectorAll('[role="tablist"] button[aria-selected="true"]')].map((x) => x.textContent.trim());
  return { meta, items: Object.fromEntries(items), sel, segnaposto: /Contenuto dettagliato in arrivo/.test(document.body.innerText) };
});

const stati = [];
for (const u of pagine) {
  await page.goto(base + u, { waitUntil: 'networkidle' }).catch(() => {});
  const nLiv = await page.locator('[role="tablist"][aria-label="Livello del corso"] button').count();
  const nTipo = await page.locator('[role="tablist"][aria-label="Corso o aggiornamento"] button').count();
  const combo = [];
  if (nLiv) for (let i = 0; i < nLiv; i++) { if (nTipo) for (let j = 0; j < nTipo; j++) combo.push([i, j]); else combo.push([i, null]); }
  else if (nTipo) for (let j = 0; j < nTipo; j++) combo.push([null, j]); else combo.push([null, null]);
  for (const [i, j] of combo) {
    if (i !== null) await page.locator('[role="tablist"][aria-label="Livello del corso"] button').nth(i).click();
    if (j !== null) await page.locator('[role="tablist"][aria-label="Corso o aggiornamento"] button').nth(j).click();
    await page.waitForTimeout(80);
    stati.push({ u, ...(await leggi()) });
  }
}
await browser.close();
if (fileJson) fs.writeFileSync(fileJson, JSON.stringify(stati, null, 1));

const SEGNAPOSTO = /da definire|in arrivo|lorem|ipsum|tbd|prossimamente/i;
const ore = (t) => /\d/.test(t || '') && /ore/i.test(t || '');
const gravi = []; const note = [];
for (const s of stati) {
  const nome = `${s.u.replace('/all-courses/', '')}${s.sel.length ? ` [${s.sel.join(' > ')}]` : ''}`;
  const d = s.items['Durata']; const m = s.items['Modalità']; const a = s.items['Attestato'];
  const dh = s.meta.find((x) => x.icona === 'durata')?.testo; const mh = s.meta.find((x) => x.icona === 'modalita')?.testo;
  if (!d) gravi.push(`${nome}: Durata MANCANTE nella scheda tecnica (sotto il titolo: "${dh ?? '-'}")`);
  else if (!ore(d)) gravi.push(`${nome}: Durata SBAGLIATA "${d}" (non sono ore)`);
  if (dh && !ore(dh)) gravi.push(`${nome}: Durata SBAGLIATA sotto il titolo "${dh}" (non sono ore)`);
  if (dh && mh && dh === mh) gravi.push(`${nome}: Durata sotto il titolo DUPLICATA con la modalità ("${dh}")`);
  if (d && a && d === a) gravi.push(`${nome}: Attestato DUPLICATO con la durata ("${a}")`);
  if (!a) gravi.push(`${nome}: Attestato MANCANTE`);
  if (!m) gravi.push(`${nome}: Modalità MANCANTE nella scheda tecnica (sotto il titolo: "${mh ?? '-'}")`);
  for (const [k, v] of Object.entries(s.items)) if (SEGNAPOSTO.test(v || '')) note.push(`${nome}: ${k} = "${v}" (segnaposto)`);
  if (!s.items['Partecipanti']) note.push(`${nome}: Partecipanti mancante`);
  else if (/^\d+\+?$/.test(s.items['Partecipanti'])) note.push(`${nome}: Partecipanti = "${s.items['Partecipanti']}" (sembra un conteggio storico, non un massimo)`);
  else if (/su richiesta/i.test(s.items['Partecipanti'])) note.push(`${nome}: Partecipanti = "Su richiesta"`);
}
console.log(`${stati.length} stati letti su ${pagine.length} schede\n`);
console.log(`ANOMALIE GRAVI (${gravi.length}):`); [...new Set(gravi)].forEach((x) => console.log(' -', x));
console.log(`\nNOTE (${note.length}):`); [...new Set(note)].forEach((x) => console.log(' -', x));
process.exit(gravi.length ? 1 : 0);
