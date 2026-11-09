// "Alètheia in numeri" (home): l'HTML pre-renderizzato ha già i valori finali (10.000+, 20+, 100+, 200+), non "0+";
// l'animazione parte solo nel browser, dopo lo scorrimento, e con prefers-reduced-motion non c'è.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';

const FINALI = ['10.000', '20', '100', '200'];

function valoriVisibili($) {
  return $('.numbers-hero-grid [aria-hidden="true"]').map((_, e) => $(e).text().replace(/\s+/g, '')).get();
}

test('HTML pre-renderizzato: i contatori hanno i valori finali @rapido', async ({ request }) => {
  const $ = cheerio.load(await (await request.get('/')).text());
  expect(valoriVisibili($)).toEqual(FINALI.map((v) => `${v}+`));
});

test('prefers-reduced-motion: valori finali subito e fermi @rapido', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('.numbers-hero-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const t = await page.locator('.numbers-hero-grid [aria-hidden="true"]').allTextContents();
  expect(t.map((x) => x.replace(/\s+/g, ''))).toEqual(FINALI.map((v) => `${v}+`));
  await ctx.close();
});

test('senza riduzione del movimento: parte da zero fuori schermo, anima allo scorrimento e arriva al valore finale @rapido', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const grande = page.locator('.numbers-hero-main [aria-hidden="true"]').first();
  expect((await grande.textContent()).replace(/\s+/g, '')).toBe('0+'); // fuori schermo: si ripartirà da zero (non visibile a nessuno)
  await page.locator('.numbers-hero-grid').scrollIntoViewIfNeeded();
  await expect.poll(async () => (await grande.textContent()).replace(/\s+/g, ''), { timeout: 6000 }).toBe('10.000+');
});
