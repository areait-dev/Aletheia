// Pagina temporanea /diagnostica (misure del viewport sull'iPad): noindex, un solo H1, non linkata da nessuna parte, mostra le misure.
// DA TOGLIERE PRIMA DEL PASSAGGIO DEI DNS insieme a pages/diagnostica.js (vedi MIGRAZIONE.md).
import { test, expect } from '@playwright/test';

test('/diagnostica: noindex, un solo H1, mostra larghezze e user agent @rapido', async ({ page }) => {
  const r = await page.goto('/diagnostica');
  expect(r.status()).toBe(200);
  expect(await page.locator('meta[name="robots"]').getAttribute('content')).toContain('noindex');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByText('documentElement.scrollWidth')).toBeVisible();
  await expect(page.getByText('visualViewport.width')).toBeVisible();
  const larghezza = page.getByText('innerWidth', { exact: true }).locator('xpath=following-sibling::div');
  expect(Number(await larghezza.textContent())).toBeGreaterThan(0);
  await expect(page.getByText('userAgent', { exact: true })).toBeVisible();
});

test('/diagnostica non è linkata dalle altre pagine @rapido', async ({ request }) => {
  for (const url of ['/', '/chi-siamo', '/contatti', '/all-courses', '/news', '/privacy-cookie']) {
    const html = await (await request.get(url)).text();
    expect(html, url).not.toContain('diagnostica');
  }
});
