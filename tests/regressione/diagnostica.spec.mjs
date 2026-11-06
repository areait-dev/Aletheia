// Pagine temporanee /diagnostica, /diagnostica-b, /diagnostica-c (misure del viewport sull'iPad): noindex, un solo H1, non linkate da nessuna parte,
// mostrano le misure, ognuna dichiara nel codice HTML il suo meta viewport (il browser lo legge solo al caricamento).
// DA TOGLIERE PRIMA DEL PASSAGGIO DEI DNS insieme a pages/diagnostica*.js e components/DiagnosticaPagina.js (vedi MIGRAZIONE.md).
import { test, expect } from '@playwright/test';

const PAGINE = [
  ['/diagnostica', 'width=device-width, initial-scale=1'],
  ['/diagnostica-b', 'width=device-width'],
  ['/diagnostica-c', 'width=1024'],
];

for (const [url, meta] of PAGINE) {
  test(`${url}: noindex, un solo H1, meta viewport "${meta}" già nell'HTML, mostra le misure @rapido`, async ({ page, request }) => {
    const html = await (await request.get(url)).text();
    const metaNellHtml = [...html.matchAll(/<meta name="viewport" content="([^"]*)"/g)].map((m) => m[1]);
    expect(metaNellHtml, 'un solo meta viewport, quello della variante').toEqual([meta]);
    const r = await page.goto(url);
    expect(r.status()).toBe(200);
    expect(await page.locator('meta[name="robots"]').getAttribute('content')).toContain('noindex');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByText('documentElement.scrollWidth')).toBeVisible();
    await expect(page.getByText('visualViewport.width')).toBeVisible();
    await expect(page.getByText(/scrollX/).first()).toBeVisible();
    const larghezza = page.getByText('innerWidth', { exact: true }).locator('xpath=following-sibling::div');
    expect(Number(await larghezza.textContent())).toBeGreaterThan(0);
    await expect(page.getByText('userAgent', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Prova 1/ })).toBeVisible();
  });
}

test('Prova 1 blocca il trascinamento orizzontale (touch-action: pan-y) e Azzera lo toglie @rapido', async ({ page }) => {
  await page.goto('/diagnostica');
  await page.getByRole('button', { name: /Prova 1/ }).click();
  await expect(page.getByText(/Con blocco del tocco orizzontale/)).toBeVisible();
  expect(await page.evaluate(() => [document.documentElement.style.touchAction, document.body.style.touchAction])).toEqual(['pan-y pinch-zoom', 'pan-y pinch-zoom']);
  await page.getByRole('button', { name: 'Azzera' }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.style.touchAction + document.body.style.touchAction)).toBe('');
});

test('le pagine di diagnostica non sono linkate dalle altre pagine @rapido', async ({ request }) => {
  for (const url of ['/', '/chi-siamo', '/contatti', '/all-courses', '/news', '/privacy-cookie', '/calendario-corsi']) {
    const html = await (await request.get(url)).text();
    expect(html, url).not.toContain('diagnostica');
  }
});
