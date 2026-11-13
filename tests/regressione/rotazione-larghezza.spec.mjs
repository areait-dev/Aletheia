// Rimedio "d" della pagina /diagnostica-b (lib/rotazione-larghezza.js): meta = `width=<outerWidth>` SOLO se clientWidth e outerWidth differiscono di più di
// 20 px e outerWidth coincide con innerWidth. Sul sito non c'è nessuno script: qui si verifica la LOGICA (quando interviene e quando NO) con i valori
// che il browser dell'iPad sbaglia, simulati con Object.defineProperty (in Chromium il difetto vero non si riproduce).
import { test, expect } from '@playwright/test';

const IPAD = { viewport: { width: 744, height: 1133 }, isMobile: true, hasTouch: true };

async function apri(browser, opzioni = IPAD) {
  const ctx = await browser.newContext(opzioni);
  const page = await ctx.newPage();
  await page.goto('/diagnostica-b');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /^d · width/ }).click();
  return { ctx, page };
}
const finto = (page, v) => page.evaluate((v) => {
  const def = (o, k, val) => Object.defineProperty(o, k, { get: () => val, configurable: true });
  if (v.inner !== undefined) def(window, 'innerWidth', v.inner);
  if (v.outer !== undefined) def(window, 'outerWidth', v.outer);
  if (v.client !== undefined) def(document.documentElement, 'clientWidth', v.client);
  if (v.scala !== undefined) def(window.visualViewport, 'scale', v.scala);
}, v);
const evento = (page, nome = 'resize') => page.evaluate((n) => window.dispatchEvent(new Event(n)), nome);
const meta = (page) => page.locator('meta[name="viewport"]').getAttribute('content');
const registro = (page) => page.locator('[data-registro] li').allTextContents();
const attendi = (page) => page.waitForTimeout(2200); // 150 / 650 / 1350 ms + i campioni DOPO (fino a +1,5 s dall'ultimo intervento)

test('verticale rimasto largo (inner 744, outer 744, client 1133): meta width=744, con PRIMA e DOPO nel registro @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await finto(page, { inner: 744, outer: 744, client: 1133 });
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=744');
  const r = (await registro(page)).join('\n');
  expect(r).toMatch(/INTERVENTO n\.1: meta → "width=744" .* PRIMA inner 744 · client 1133 · scroll \d+ · outer 744 · meta "width=device-width"/);
  expect(r).toMatch(/DOPO \+0 ms/); expect(r).toMatch(/DOPO \+400 ms/); expect(r).toMatch(/DOPO \+1500 ms/);
  await ctx.close();
});

test('orizzontale rimasto stretto (inner 1133, outer 1133, client 744): meta width=1133 @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await finto(page, { inner: 1133, outer: 1133, client: 744 });
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=1133');
  await ctx.close();
});

test('layout coerente con la finestra: nessun intervento, meta invariato @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=device-width');
  const r = (await registro(page)).join('\n');
  expect(r).toContain('nessun intervento: layout coerente con la finestra');
  expect(r).not.toContain('INTERVENTO');
  await ctx.close();
});

test('Split View / Stage Manager (outerWidth 1133 = schermo, finestra larga 744): NON interviene @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await finto(page, { inner: 744, outer: 1133, client: 744 }); // layout giusto, outerWidth non è la finestra
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=device-width');
  await finto(page, { inner: 744, outer: 1133, client: 1133 }); // anche con un layout diverso: outerWidth non è affidabile
  await evento(page, 'orientationchange'); await attendi(page);
  expect(await meta(page)).toBe('width=device-width');
  const r = (await registro(page)).join('\n');
  expect(r).toContain('Split View, Stage Manager?');
  expect(r).not.toContain('INTERVENTO');
  await ctx.close();
});

test('outerWidth 0 o pagina zoomata: non interviene @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await finto(page, { inner: 744, outer: 0, client: 1133 });
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=device-width');
  await finto(page, { inner: 744, outer: 744, client: 1133, scala: 1.5 });
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=device-width');
  const r = (await registro(page)).join('\n');
  expect(r).toContain('outerWidth non disponibile');
  expect(r).toContain('pagina zoomata');
  await ctx.close();
});

test('differenza sotto soglia (barra di scorrimento 15 px): non interviene @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await finto(page, { inner: 744, outer: 744, client: 729 });
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=device-width');
  await ctx.close();
});

test('telefono e desktop (valori coerenti): mai intervento, anche con rotazione emulata @rapido', async ({ browser }) => {
  for (const opz of [{ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, { viewport: { width: 1440, height: 900 } }]) {
    const { ctx, page } = await apri(browser, opz);
    await page.setViewportSize({ width: opz.viewport.height, height: opz.viewport.width });
    await attendi(page);
    await page.setViewportSize(opz.viewport);
    await attendi(page);
    expect(await meta(page)).toBe('width=device-width');
    expect((await registro(page)).join('\n')).not.toContain('INTERVENTO');
    await ctx.close();
  }
});

test('mismatch che non si risolve: al massimo 3 interventi per rotazione, poi LIMITE e niente altro @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await finto(page, { inner: 744, outer: 744, client: 1133 }); // resta sbagliato qualunque cosa si faccia
  await evento(page);
  await page.waitForTimeout(1000);
  await evento(page); // secondo evento a 1 s: nuove valutazioni, ma il contatore della rotazione non si azzera (< 3 s)
  await attendi(page);
  const r = await registro(page);
  expect(r.filter((x) => x.includes('INTERVENTO n.')).length).toBe(3);
  expect(r.some((x) => x.includes('LIMITE di 3 interventi'))).toBe(true);
  const n = r.length;
  await page.waitForTimeout(3000);
  expect((await registro(page)).length, 'nessun ciclo: dopo la raffica non scrive più').toBe(n);
  await ctx.close();
});

test('un solo rimedio alla volta: con d non girano a, b, c; lasciando d il meta torna quello della pagina @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await finto(page, { inner: 744, outer: 744, client: 1133 });
  await evento(page); await attendi(page);
  expect(await meta(page)).toBe('width=744');
  expect((await registro(page)).join('\n')).not.toContain('→rimedio');
  await page.getByRole('button', { name: 'Nessun rimedio' }).click();
  expect(await meta(page)).toBe('width=device-width');
  expect(await page.locator('meta[name="viewport"]').count()).toBe(1);
  await ctx.close();
});

test('Rilancia ora con d valuta subito e registra il motivo @rapido', async ({ browser }) => {
  const { ctx, page } = await apri(browser);
  await page.getByRole('button', { name: 'Rilancia ora' }).click();
  await expect(page.locator('[data-registro] li', { hasText: 'manuale · nessun intervento' })).toBeVisible();
  await ctx.close();
});
