// Font del sito: Nunito (testo) e Viga (titoli), SERVITI da /_next/static/media come font web, mai un serif di ripiego né un
// font di sistema. Perché esiste: in produzione (build di Vercel) la variabile --font-nunito risultava non definita e navbar,
// sottotitoli e pulsanti uscivano in Times; in locale su Windows la build era diversa e nessun test se ne accorgeva.
//
// Cosa lo rende affidabile:
//  - Chromium: si chiede al motore QUALE FONT è stato davvero usato per disegnare ogni elemento campione
//    (CSS.getPlatformFontsForNode): deve essere un font web (isCustomFont) di nome Nunito/Viga. Un Nunito installato nel sistema
//    operativo non passerebbe: sarebbe isCustomFont = false. Controlla anche che i file arrivino da /_next/static/media.
//  - Si scorrono tutti gli elementi con testo: nessuno deve avere come primo font calcolato un serif o qualcosa di diverso da Nunito/Viga.
//  - WebKit (se installato): stesso controllo sul font calcolato, perché il bug è stato visto su iPad.
//  - Con URL_BASE=https://… si esegue contro l'anteprima o la produzione di Vercel: lì il problema compariva.
import { test, expect } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { CONSENSO, MARCA } from './font-comune.mjs';
const primo = (stack) => stack.split(',')[0].trim().replace(/["']/g, '');
const SERIF = /^(times|times new roman|serif|-webkit-standard|georgia|cambria|ui-serif)$/i;
const ATTESI = new Set(['Nunito', 'Viga']);

// Pagine e larghezze: menu mobile (390, 820), header desktop (1024, 1440); home, catalogo, modulo contatti.
const CASI = [['/', 390, 844], ['/', 1024, 768], ['/all-courses', 820, 1180], ['/contatti', 1440, 900]];

async function apri(page, url, larghezza, altezza) {
  await page.setViewportSize({ width: larghezza, height: altezza });
  await page.addInitScript(CONSENSO);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
  // Si caricano le facce Nunito/Viga dichiarate (i pesi si caricano a richiesta) e si attende che siano pronte.
  await page.evaluate(() =>
    Promise.all(Array.from(document.fonts).filter((f) => /nunito|viga/i.test(f.family) && ['400', '500', '600', '700', '800'].includes(String(f.weight))).map((f) => f.load().catch(() => null))).then(() => document.fonts.ready)
  );
  // Con il menu a hamburger i link stanno nel pannello: si apre per poterli misurare.
  if (await page.locator('.hamburger').isVisible()) { await page.locator('.hamburger').click(); await page.waitForTimeout(500); }
}

for (const [url, w, h] of CASI) {
  test(`font reali (web font Nunito/Viga) su menu, testo, pulsanti e titoli: ${url} a ${w}px @rapido`, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'usa il protocollo di debug di Chromium');
    const richiesteFont = [];
    page.on('response', (r) => { if (/\/_next\/static\/media\/.+\.woff2/.test(r.url())) richiesteFont.push(r.status()); });
    await apri(page, url, w, h);
    const trovati = await page.evaluate(MARCA);
    expect(trovati, `nessun elemento campione trovato su ${url} a ${w}px`).toContain('paragrafo');
    expect(trovati).toContain('titolo');
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
    for (const k of trovati) {
      const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `[data-font-test="${k}"]` });
      const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
      const atteso = k === 'titolo' ? 'Viga' : 'Nunito';
      const quadro = fonts.map((f) => `${f.familyName}${f.isCustomFont ? ' (font web)' : ' (FONT DI SISTEMA)'}`).join(', ') || '(nessun font)';
      expect(fonts.length, `${k} su ${url} a ${w}px: nessun font usato`).toBeGreaterThan(0);
      expect(fonts.every((f) => f.isCustomFont), `${k} su ${url} a ${w}px usa un font di sistema: ${quadro}`).toBe(true);
      // Il motore riporta il nome interno del file variabile (es. "Nunito ExtraLight"): basta che inizi con Nunito/Viga.
      expect(fonts.every((f) => new RegExp(`^${atteso}\\b`).test(f.familyName)), `${k} su ${url} a ${w}px dovrebbe essere ${atteso}, è: ${quadro}`).toBe(true);
    }
    // I file arrivano dal sito stesso (/_next/static/media), non da un font installato.
    const dalSito = await page.evaluate(() => performance.getEntriesByType('resource').filter((r) => /\/_next\/static\/media\/.+\.woff2/.test(r.name)).length);
    expect(dalSito, 'nessun file .woff2 servito da /_next/static/media').toBeGreaterThan(0);
    expect(richiesteFont.every((s) => s < 400), `file di font con errore: ${richiesteFont}`).toBe(true);
  });
}

test('nessun elemento con testo usa un serif o un font diverso da Nunito/Viga @rapido', async ({ page }) => {
  for (const [url, w, h] of [['/', 390, 844], ['/all-courses', 1024, 768], ['/contatti', 820, 1180]]) {
    await apri(page, url, w, h);
    const r = await page.evaluate(() => {
      const ok = new Set(['Nunito', 'Viga']); const bad = {}; let n = 0;
      const prima = (s) => s.split(',')[0].trim().replace(/["']/g, '');
      document.querySelectorAll('body *').forEach((e) => {
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'svg', 'path', 'I'].includes(e.tagName)) return;
        const t = Array.from(e.childNodes).filter((c) => c.nodeType === 3 && c.textContent.trim()).map((c) => c.textContent.trim()).join(' ');
        const rc = e.getBoundingClientRect(); if (!t || rc.width === 0 || rc.height === 0) return; n++;
        const f = prima(getComputedStyle(e).fontFamily);
        if (!ok.has(f)) { const k = `${f} <- ${e.tagName.toLowerCase()}.${(e.className || '').toString().split(' ')[0].slice(0, 24)}${e.closest('header') ? ' [header]' : ''} "${t.slice(0, 18)}"`; bad[k] = (bad[k] || 0) + 1; }
      });
      const b = prima(getComputedStyle(document.body).fontFamily);
      return { n, bad: Object.keys(bad).slice(0, 6), body: b, html: getComputedStyle(document.documentElement).getPropertyValue('--font-nunito').trim() };
    });
    expect(r.n, `nessun elemento con testo su ${url}`).toBeGreaterThan(20);
    expect(SERIF.test(r.body), `body in un serif di ripiego su ${url} a ${w}px: ${r.body}`).toBe(false);
    expect(r.html, `--font-nunito non definita su <html> (${url} a ${w}px)`).not.toBe('');
    expect(r.bad, `elementi con un font diverso da Nunito/Viga su ${url} a ${w}px`).toEqual([]);
  }
});

test('WebKit (iPad): navbar, body, testo e pulsanti in Nunito, titoli in Viga @rapido', async ({ baseURL, browserName }) => {
  test.skip(browserName !== 'chromium', 'si avvia WebKit in un processo separato (il progetto usa Chromium)');
  // Processo separato: dentro il lanciatore di Playwright Test webkit.launch() si chiude subito (vedi font-webkit.mjs).
  const r = spawnSync(process.execPath, [path.join(import.meta.dirname, 'font-webkit.mjs'), baseURL], { encoding: 'utf8', timeout: 150_000 });
  let esito; try { esito = JSON.parse((r.stdout || '').trim().split('\n').pop()); } catch { esito = { ok: false, errore: `uscita non leggibile (codice ${r.status}): ${(r.stderr || r.stdout || '').slice(0, 200)}` }; }
  test.skip(!esito.ok, `WebKit non disponibile su questo computer: ${esito.errore} (npx playwright install webkit)`);
  for (const { url, w, font, variabile } of esito.risultati) {
    expect(variabile, `WebKit ${w}px ${url}: --font-nunito non definita`).not.toBe('');
    for (const [k, f] of Object.entries(font)) { const atteso = k === 'titolo' ? 'Viga' : 'Nunito'; expect(f, `WebKit ${w}px ${url}: ${k} in "${f}" invece di ${atteso}`).toBe(atteso); }
  }
});
