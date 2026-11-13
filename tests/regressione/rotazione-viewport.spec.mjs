// Correzione della rotazione su iPad (lib/rotazione-viewport.js; bug WebKit 170595 / Firefox 1509552, vedi MIGRAZIONE.md, sezione iPad).
// Regole: a ogni cambio di orientamento il meta viewport viene riscritto subito, a 500 ms e a 1000 ms; solo su dispositivi touch (pointer: coarse);
// nessun intervento sui resize normali; nessun ciclo; senza effetti visibili su telefoni e desktop.
// In Chromium il difetto vero non si riproduce (il browser ricalcola da solo): qui si verifica la LOGICA (quando scatta e quando no).
// Le riscritture si contano con un MutationObserver sul <head> (il meta tolto), non dal log: quindi vale anche senza ?diagnostica.
import { test, expect } from '@playwright/test';

const IPAD = { viewport: { width: 744, height: 1133 }, isMobile: true, hasTouch: true };
const TELEFONO = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };
const TELEFONO_ORIZZ = { viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true };
const DESKTOP = { viewport: { width: 1440, height: 900 } };

async function apri(browser, opzioni, indirizzo = '/chi-siamo?diagnostica') {
  const ctx = await browser.newContext(opzioni);
  const page = await ctx.newPage();
  const log = [];
  page.on('console', (m) => log.push(m.text()));
  await page.goto(indirizzo);
  await page.waitForTimeout(600); // l'ascolto parte in useEffect
  await page.evaluate(() => {
    window.__riscritture = [];
    new MutationObserver((voci) => {
      for (const v of voci) for (const n of v.removedNodes) if (n.nodeName === 'META' && n.getAttribute('name') === 'viewport') window.__riscritture.push(Math.round(performance.now()));
    }).observe(document.head, { childList: true });
  });
  return { ctx, page, log };
}
const riscritture = (page) => page.evaluate(() => window.__riscritture.slice());
const resize = (page) => page.evaluate(() => window.dispatchEvent(new Event('resize')));
const orientamento = (page) => page.evaluate(() => window.dispatchEvent(new Event('orientationchange')));
const stato = (page) => page.evaluate(() => {
  const de = document.documentElement;
  return {
    iw: innerWidth, ih: innerHeight, sw: de.scrollWidth, sh: de.scrollHeight, cw: de.clientWidth, y: Math.round(scrollY), scala: visualViewport ? visualViewport.scale : 1,
    mq: ['(max-width:1023px)', '(min-width:1024px)', '(max-width:767px)', '(orientation:portrait)'].map((q) => matchMedia(q).matches),
    meta: [...document.querySelectorAll('meta[name="viewport"]')].map((m) => m.content),
    header: (() => { const h = document.querySelector('header'); const r = h && h.getBoundingClientRect(); return r ? [Math.round(r.width), Math.round(r.height)] : null; })(),
  };
});

test('iPad (touch): a ogni cambio di orientamento riscrive il meta subito, a 500 ms e a 1000 ms @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches), 'il contesto di prova deve essere touch').toBe(true);
  const t0 = await page.evaluate(() => Math.round(performance.now()));
  await orientamento(page);
  await page.waitForTimeout(1500);
  const r = (await riscritture(page)).map((t) => t - t0);
  expect(r, `riscritture a ${r} ms`).toHaveLength(3);
  expect(r[0]).toBeLessThan(150);
  expect(r[1]).toBeGreaterThan(450); expect(r[1]).toBeLessThan(800);
  expect(r[2]).toBeGreaterThan(950); expect(r[2]).toBeLessThan(1400);
  await ctx.close();
});

test('anche l\'evento screen.orientation "change" avvia la sequenza (3 riscritture) @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await page.evaluate(() => screen.orientation.dispatchEvent(new Event('change')));
  await page.waitForTimeout(1500);
  expect(await riscritture(page)).toHaveLength(3);
  await ctx.close();
});

test('nessun intervento sui resize normali (tastiera, barra del browser, ridimensionamento) @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  for (let i = 0; i < 20; i++) { await page.evaluate(() => { window.dispatchEvent(new Event('resize')); visualViewport && visualViewport.dispatchEvent(new Event('resize')); }); await page.waitForTimeout(30); }
  // stesso orientamento, altezza diversa (tastiera, barra del browser): nessun evento di orientamento
  await page.setViewportSize({ width: 744, height: 900 });
  await page.setViewportSize({ width: 744, height: 1133 });
  await page.waitForTimeout(1500);
  expect(await riscritture(page)).toEqual([]);
  await ctx.close();
});

test('rotazione emulata davvero (744×1133 → 1133×744): Chromium manda l evento di orientamento, parte UNA sequenza e poi niente @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await page.setViewportSize({ width: 1133, height: 744 });
  await page.waitForTimeout(1800);
  const n = (await riscritture(page)).length;
  expect(n, 'una sola sequenza (3) più i resize della raffica nella finestra').toBeGreaterThanOrEqual(3);
  expect(n).toBeLessThanOrEqual(7);
  await page.waitForTimeout(3000);
  expect((await riscritture(page)).length, 'poi non scrive più').toBe(n);
  const st = await stato(page);
  expect(st.meta).toEqual(['width=device-width']);
  expect(st.iw).toBe(1133);
  await ctx.close();
});

test('desktop (pointer fine): non fa nulla neanche con un cambio di orientamento @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, DESKTOP);
  expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches), 'il desktop non è touch').toBe(false);
  await orientamento(page);
  await page.evaluate(() => screen.orientation.dispatchEvent(new Event('change')));
  await page.waitForTimeout(1500);
  expect(await riscritture(page)).toEqual([]);
  await ctx.close();
});

for (const [nome, opz] of [['telefono 390×844', TELEFONO], ['telefono in orizzontale 844×390', TELEFONO_ORIZZ], ['iPad 744×1133', IPAD]]) {
  test(`senza effetti visibili su ${nome}: stesse misure, stesso scorrimento, stesso meta, un solo meta @rapido`, async ({ browser }) => {
    const { ctx, page } = await apri(browser, opz);
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(800);
    const prima = await stato(page);
    await orientamento(page);
    await page.waitForTimeout(1500);
    expect(await riscritture(page)).toHaveLength(3);
    expect(await stato(page)).toEqual(prima);
    expect(prima.meta).toEqual(['width=device-width']);
    await ctx.close();
  });
}

test('due cambi di orientamento a 400 ms: la sequenza riparte, 4 riscritture e poi niente (nessun ciclo); a 100 ms sono la stessa rotazione (3) @rapido', async ({ browser }) => {
  const { ctx: c0, page: p0 } = await apri(browser, IPAD);
  await orientamento(p0);
  await p0.waitForTimeout(100);
  await orientamento(p0);
  await p0.waitForTimeout(1600);
  expect((await riscritture(p0)).length, 'due eventi a 100 ms = una rotazione').toBe(3);
  await c0.close();
  const { ctx, page } = await apri(browser, IPAD);
  await orientamento(page);
  await page.waitForTimeout(400);
  await orientamento(page);
  await page.waitForTimeout(1600);
  const n = (await riscritture(page)).length;
  expect(n).toBe(4); // 0 ms + 0 ms (il secondo) + 500 + 1000 (solo quelli del secondo)
  await page.waitForTimeout(3000);
  expect((await riscritture(page)).length, 'dopo la sequenza non scrive più').toBe(n);
  await ctx.close();
});

test('dopo le riscritture resta un solo meta anche dopo un cambio di pagina (next/head) @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await orientamento(page);
  await page.waitForTimeout(1300);
  await page.evaluate(() => window.next.router.push('/contatti'));
  await page.waitForURL('**/contatti**');
  await page.waitForTimeout(500);
  await orientamento(page);
  await page.waitForTimeout(1300);
  expect(await page.locator('meta[name="viewport"]').count()).toBe(1);
  expect(await page.locator('meta[name="viewport"]').getAttribute('content')).toBe('width=device-width');
  await ctx.close();
});

test('senza ?diagnostica in produzione non scrive nulla in console @rapido', async ({ browser }) => {
  const { ctx, page, log } = await apri(browser, IPAD, '/chi-siamo');
  await orientamento(page);
  await page.waitForTimeout(1300);
  expect(await riscritture(page)).toHaveLength(3);
  expect(log.filter((t) => t.includes('rotazione-viewport'))).toEqual([]);
  await ctx.close();
});

test('con ?diagnostica scrive in console ogni riscrittura @rapido', async ({ browser }) => {
  const { ctx, page, log } = await apri(browser, IPAD);
  await orientamento(page);
  await page.waitForTimeout(1300);
  expect(log.filter((t) => /^rotazione-viewport: .* · meta riscritto/.test(t))).toHaveLength(3);
  await ctx.close();
});

test('resize con la larghezza cambiata di piu di 50 px (iPad, nessun evento di orientamento): parte la sequenza @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await page.setViewportSize({ width: 900, height: 1133 }); // stesso orientamento: arriva solo un resize
  await page.waitForTimeout(1800);
  const n = (await riscritture(page)).length;
  expect(n, 'sequenza 0/500/1000 ms + il resize nella finestra').toBeGreaterThanOrEqual(3);
  expect(n).toBeLessThanOrEqual(5);
  await page.waitForTimeout(3000);
  expect((await riscritture(page)).length, 'poi non scrive piu').toBe(n);
  await ctx.close();
});

test('resize con la larghezza cambiata di poco (< 50 px): non parte @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await page.setViewportSize({ width: 760, height: 1133 });
  await page.waitForTimeout(1500);
  expect(await riscritture(page)).toEqual([]);
  await ctx.close();
});

test('resize con larghezza cambiata ma pagina zoomata (visualViewport.scale 1,5): non parte @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await page.evaluate(() => Object.defineProperty(window.visualViewport, 'scale', { get: () => 1.5, configurable: true }));
  await page.setViewportSize({ width: 900, height: 1133 });
  await page.waitForTimeout(1500);
  expect(await riscritture(page)).toEqual([]);
  await ctx.close();
});

test('desktop: nemmeno un resize con la larghezza cambiata fa partire la sequenza @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, DESKTOP);
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.waitForTimeout(1500);
  expect(await riscritture(page)).toEqual([]);
  await ctx.close();
});

test('nella finestra dopo la rotazione ogni resize riscrive il meta (~120 ms dopo); fuori dalla finestra no; nessun ciclo @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await orientamento(page); // apre la finestra di 2,5 s: 3 riscritture (0, 500, 1000)
  for (let i = 0; i < 4; i++) { await page.waitForTimeout(250); await resize(page); } // t = 250..1000 ms, stessa larghezza
  await page.waitForTimeout(1500);
  const dentro = (await riscritture(page)).length;
  expect(dentro, '3 della sequenza + resize nella finestra').toBeGreaterThanOrEqual(5);
  expect(dentro).toBeLessThanOrEqual(7);
  await page.waitForTimeout(1500); // ora siamo oltre 2,5 s dall'innesco
  await resize(page); await page.waitForTimeout(600);
  expect((await riscritture(page)).length, 'un resize fuori dalla finestra non scrive').toBe(dentro);
  await ctx.close();
});

test('il registro dello script (window.__rotazioneLog) mostra attivazione, evento e riscritture; su desktop dice "non touch" @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD);
  await orientamento(page);
  await page.waitForTimeout(1300);
  const log = await page.evaluate(() => window.__rotazioneLog);
  expect(log.some((r) => r.includes('script attivo · touch true'))).toBe(true);
  expect(log.some((r) => r.includes('orientationchange: parte la sequenza'))).toBe(true);
  expect(log.filter((r) => r.includes('meta riscritto'))).toHaveLength(3);
  await ctx.close();
  const d = await apri(browser, DESKTOP);
  await orientamento(d.page);
  await d.page.waitForTimeout(500);
  const logD = await d.page.evaluate(() => window.__rotazioneLog);
  expect(logD.some((r) => r.includes('ignorato (non touch)'))).toBe(true);
  expect(logD.some((r) => r.includes('meta riscritto'))).toBe(false);
  await d.ctx.close();
});

test('la pagina /diagnostica-b mostra il registro dello script del sito @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser, IPAD, '/diagnostica-b');
  await expect(page.getByText('Script del sito (lib/rotazione-viewport.js)')).toBeVisible();
  await expect(page.locator('[data-log-sito] li', { hasText: 'script attivo' })).toBeVisible();
  await ctx.close();
});
