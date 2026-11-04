// Controllo dei font in WebKit (Safari/iPad), eseguito come PROCESSO SEPARATO dal test font.spec.mjs.
// Perché separato: dentro il lanciatore di Playwright Test `webkit.launch()` si chiude subito su questa macchina
// ("Target page, context or browser has been closed"), mentre da un processo Node normale parte. Uso:
//   node tests/regressione/font-webkit.mjs <indirizzo-base>      → stampa una riga JSON { ok, risultati } e termina con 0/1.
import { webkit } from '@playwright/test';
import { CONSENSO, MARCA } from './font-comune.mjs';

const base = process.argv[2];
const CASI = [['/', 820, 1180], ['/all-courses', 1024, 768]];
const risultati = [];
let browser;
try {
  browser = await webkit.launch();
  for (const [url, w, h] of CASI) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.addInitScript(CONSENSO);
    await page.goto(base + url, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    if (await page.locator('.hamburger').isVisible()) { await page.locator('.hamburger').tap(); await page.waitForTimeout(500); }
    await page.evaluate(MARCA);
    const r = await page.evaluate(() => {
      const prima = (s) => s.split(',')[0].trim().replace(/["']/g, '');
      const out = { font: {} };
      document.querySelectorAll('[data-font-test]').forEach((e) => { out.font[e.getAttribute('data-font-test')] = prima(getComputedStyle(e).fontFamily); });
      out.font.body = prima(getComputedStyle(document.body).fontFamily);
      out.variabile = getComputedStyle(document.documentElement).getPropertyValue('--font-nunito').trim();
      return out;
    });
    risultati.push({ url, w, ...r });
    await ctx.close();
  }
  console.log(JSON.stringify({ ok: true, risultati }));
  process.exitCode = 0;
} catch (e) {
  console.log(JSON.stringify({ ok: false, errore: String(e.message || e).split('\n').slice(0, 3).join(' ') }));
  process.exitCode = 1;
} finally { if (browser) await browser.close().catch(() => {}); }
