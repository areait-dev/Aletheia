// Cerca gli elementi che restano INVISIBILI dopo lo scorrimento (opacità effettiva ~0, di solito Reveal o animazioni che non partono)
// su tutte le pagine di urls.json. Scorre ogni pagina fino in fondo, aspetta la fine delle transizioni e poi elenca gli elementi con testo
// o immagini la cui opacità effettiva (prodotto di quella di tutti gli antenati) è sotto 0,05. Esclude ciò che è nascosto di proposito
// (menu chiusi, dialoghi, aria-hidden, chatbot, banner cookie). Non modifica niente.
//   node tests/regressione/audit-reveal.mjs <indirizzo-base> <chromium|webkit> [larghezze separate da virgola] [no-preference|reduce]
//   es.  node tests/regressione/audit-reveal.mjs http://localhost:3101 webkit 390,834,1440
// Script a parte (non un test di Playwright Test: dentro il lanciatore webkit.launch() si chiude subito su questa macchina).
import { chromium, webkit } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { urls } from './util.mjs';

const [base = 'http://localhost:3101', motore = 'chromium', larghezzeArg = '390,834,1440', movimento = 'no-preference'] = process.argv.slice(2);
function trovaChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const dir = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright');
  try {
    const cartelle = fs.readdirSync(dir).filter((d) => /^chromium-\d+$/.test(d)).sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]));
    for (const c of cartelle) { const exe = path.join(dir, c, 'chrome-win64', 'chrome.exe'); if (fs.existsSync(exe)) return exe; }
  } catch { /* usa quello di Playwright */ }
  return undefined;
}
const pagine = [...new Set(urls.map((u) => u.url).filter((u) => !u.includes('?')))];
const larghezze = larghezzeArg.split(',').map(Number);
const browser = motore === 'webkit' ? await webkit.launch() : await chromium.launch({ executablePath: trovaChromium() });

const trovati = new Map(); // firma -> { esempi:Set(pagina@larghezza), testo }
let caricamenti = 0; let errori = 0;
for (const w of larghezze) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w >= 1024 ? 900 : 844 }, hasTouch: w < 1100, reducedMotion: movimento });
  await ctx.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'all'); } catch { /* niente */ } });
  const page = await ctx.newPage();
  for (const u of pagine) {
    const r = await page.goto(base + u, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => null);
    if (!r || r.status() !== 200) { if (r && r.status() !== 200) continue; errori++; continue; }
    caricamenti++;
    await page.waitForLoadState('load').catch(() => {});
    // scorrimento graduale fino in fondo (gli IntersectionObserver di Reveal partono solo se l'elemento entra nel viewport)
    await page.evaluate(async () => {
      const passo = Math.round(innerHeight * 0.6);
      let y = 0;
      while (y < document.documentElement.scrollHeight) { y += passo; scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); }
      scrollTo(0, document.documentElement.scrollHeight);
      await new Promise((r) => setTimeout(r, 1800));
    });
    const lista = await page.evaluate(() => {
      const out = [];
      const op = (e) => { let o = 1; while (e) { o *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; } return o; };
      const escluso = (e) => !!e.closest('[aria-hidden="true"], [inert], [role="dialog"], [role="menu"], [hidden], header, nav, dialog, .sr-only, [class*="chat"], [id*="chat"], [class*="cookie"], [class*="Cookie"], [id*="cookie"], [class*="toast"], noscript, template');
      document.querySelectorAll('body *').forEach((e) => {
        if (e.children.length > 0 && !e.matches('img, svg, picture')) { /* guardiamo i nodi con contenuto proprio: testo diretto o immagine */ }
        const testoProprio = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
        const media = e.matches('img, picture, svg, video');
        if (!testoProprio && !media) return;
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden') return;
        const b = e.getBoundingClientRect();
        if (b.width < 4 || b.height < 4) return;
        if (escluso(e)) return;
        if (op(e) < 0.05) {
          // antenato responsabile: il più alto con opacità < 0.05 (di solito il wrapper Reveal)
          let culprit = e; let a = e;
          while (a) { if (parseFloat(getComputedStyle(a).opacity) < 0.05) culprit = a; a = a.parentElement; }
          const nome = (x) => `${x.tagName.toLowerCase()}${x.id ? '#' + x.id : ''}${x.className && typeof x.className === 'string' ? '.' + x.className.trim().split(/\s+/).slice(0, 3).join('.') : ''}`;
          out.push({ firma: `${nome(culprit)} ⊃ ${nome(e)}`, testo: (e.textContent || e.getAttribute('alt') || '').trim().slice(0, 60), inline: culprit.getAttribute('style')?.slice(0, 60) || '', reveal: /opacity:\s*0/.test(culprit.getAttribute('style') || '') });
        }
      });
      return out;
    });
    for (const x of lista) {
      const k = x.firma;
      if (!trovati.has(k)) trovati.set(k, { esempi: new Set(), testo: x.testo, inline: x.inline });
      trovati.get(k).esempi.add(`${u}@${w}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`${motore} (${movimento}): ${caricamenti} caricamenti (${pagine.length} pagine x ${larghezze.length} larghezze), errori di caricamento: ${errori}`);
if (!trovati.size) console.log('Nessun elemento rimasto a opacità 0.');
for (const [k, v] of trovati) {
  console.log(`\n- ${k}  (${v.esempi.size} pagine/larghezze)  "${v.testo}"  ${v.inline ? 'stile: ' + v.inline : ''}`);
  console.log('    es.', [...v.esempi].slice(0, 4).join('  '));
}
process.exit(trovati.size ? 1 : 0);
