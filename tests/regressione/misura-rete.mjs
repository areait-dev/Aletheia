// Misura le richieste verso l'esterno di ogni pagina (dominio, tipo, tempo) e se le immagini passano da next/image.
// Uso (con il server di test attivo): node tests/regressione/misura-rete.mjs  → tests/riferimenti/rete-misura.json
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { urls, radice } from './util.mjs';

const base = process.env.BASE_URL || 'http://127.0.0.1:3101';
const exe = (() => {
  const d = path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright');
  const c = fs.readdirSync(d).filter((x) => /^chromium-\d+$/.test(x)).sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]));
  return path.join(d, c[0], 'chrome-win64', 'chrome.exe');
})();
const browser = await chromium.launch({ executablePath: exe });
const risultato = [];
for (const { url } of urls.filter((u) => u.visivo)) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const richieste = new Map();
  page.on('request', (r) => richieste.set(r, Date.now()));
  const fatte = [];
  page.on('requestfinished', async (r) => {
    const u = new URL(r.url());
    const t = r.timing();
    const durata = t.responseEnd > 0 ? Math.round(t.responseEnd) : Date.now() - richieste.get(r);
    const viaNextImage = u.pathname === '/_next/image';
    const esterna = u.host !== new URL(base).host;
    const origine = viaNextImage ? new URL(u.searchParams.get('url'), base) : u;
    if (esterna || (viaNextImage && origine.host !== new URL(base).host)) {
      fatte.push({ host: origine.host, tipo: r.resourceType(), viaNextImage, ms: durata, url: origine.href.slice(0, 140) });
    }
  });
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  const t0 = Date.now();
  await page.goto(base + url, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await page.waitForLoadState('load', { timeout: 60_000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
  risultato.push({ url, caricamentoMs: Date.now() - t0, richiesteEsterne: fatte });
  await page.close();
}
await browser.close();
fs.mkdirSync(path.join(radice, 'tests', 'riferimenti'), { recursive: true });
fs.writeFileSync(path.join(radice, 'tests', 'riferimenti', 'rete-misura.json'), JSON.stringify(risultato, null, 2));
const perHost = {};
for (const r of risultato) for (const q of r.richiesteEsterne) { const h = (perHost[`${q.host} (${q.tipo}${q.viaNextImage ? ', next/image' : ', diretta'})`] ||= { n: 0, ms: 0, max: 0, pagine: new Set() }); h.n++; h.ms += q.ms; h.max = Math.max(h.max, q.ms); h.pagine.add(r.url); }
for (const [k, v] of Object.entries(perHost)) console.log(k, `n=${v.n} medio=${Math.round(v.ms / v.n)}ms max=${v.max}ms pagine=${v.pagine.size}`);
console.log('pagine più lente:', risultato.sort((a, b) => b.caricamentoMs - a.caricamentoMs).slice(0, 6).map((r) => `${r.url} ${r.caricamentoMs}ms`).join(' | '));
