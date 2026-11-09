// Carosello loghi del gruppo (home): niente copie inutili nel DOM, copie nascoste agli screen reader, loop senza vuoti.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';

const traccia = ($) => $('#gruppo-heading').closest('section').find('.animate-marquee');

test('HTML: due copie del gruppo, solo la prima letta dagli screen reader (le altre aria-hidden con alt vuoto) @rapido', async ({ request }) => {
  const $ = cheerio.load(await (await request.get('/')).text());
  const gruppi = traccia($).children();
  expect(gruppi.length).toBe(2);
  expect(gruppi.eq(0).attr('aria-hidden')).toBeUndefined();
  expect(gruppi.eq(1).attr('aria-hidden')).toBe('true');
  const n = gruppi.eq(0).find('img').length;
  expect(n).toBeGreaterThan(3);
  expect(gruppi.eq(1).find('img').length).toBe(n);
  gruppi.eq(0).find('img').each((_, e) => expect($(e).attr('alt')).toBeTruthy());
  gruppi.eq(1).find('img').each((_, e) => expect($(e).attr('alt')).toBe(''));
});

for (const larghezza of [390, 1440, 1920, 2560, 3440]) {
  test(`loop senza vuoti a ${larghezza}px: ogni metà copre la finestra @rapido`, async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
    await page.setViewportSize({ width: larghezza, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const t = document.querySelector('#gruppo-heading').closest('section').querySelector('.animate-marquee');
      return { copie: t.children.length, meta: t.getBoundingClientRect().width / 2, finestra: window.innerWidth, img: t.querySelectorAll('img').length };
    });
    expect(r.meta, `metà ${r.meta}px, finestra ${r.finestra}px, copie ${r.copie}`).toBeGreaterThanOrEqual(r.finestra);
    expect(r.copie % 2).toBe(0);
    expect(r.img).toBeLessThan(48); // prima erano 48 (6 copie da 8)
  });
}
