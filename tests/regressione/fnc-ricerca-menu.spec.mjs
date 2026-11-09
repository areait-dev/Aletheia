// Pulsante del Fondo Nuove Competenze, ricerca in homepage, "Scopri tutti i corsi" nel menu hamburger.
import { test, expect } from '@playwright/test';

const consenso = async (page) => page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'all'); } catch {} });

test('FNC: "Verifica se la tua azienda può accedere" porta al form sotto @rapido', async ({ page }) => {
  await consenso(page);
  await page.goto('/formazione/fondo-nuove-competenze', { waitUntil: 'networkidle' });
  const cta = page.getByRole('link', { name: /Verifica se la tua azienda/ });
  await expect(cta).toHaveAttribute('href', '#contatta-azienda');
  await cta.click();
  await expect.poll(async () => page.evaluate(() => Math.round(document.getElementById('contatta-azienda').getBoundingClientRect().top)), { timeout: 8000 }).toBeLessThan(300);
  expect(new URL(page.url()).pathname).toBe('/formazione/fondo-nuove-competenze');
});

test('Home: la ricerca porta al catalogo e filtra @rapido', async ({ page }) => {
  await consenso(page);
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByPlaceholder(/Cerca un corso/).fill('antincendio');
  await page.getByRole('button', { name: 'Cerca', exact: true }).click();
  await page.waitForURL(/\/corsi\?q=antincendio/);
  await expect(page.getByPlaceholder(/cerca/i).first()).toHaveValue('antincendio');
  await expect(page.locator('a[href^="/corsi/antincendio"]').first()).toBeVisible();
  const filtrati = await page.locator('a[href^="/corsi/"]:visible').count();
  await page.goto('/corsi', { waitUntil: 'networkidle' });
  expect(filtrati).toBeLessThan(await page.locator('a[href^="/corsi/"]:visible').count());
});

test('Home: ricerca per categoria senza testo @rapido', async ({ page }) => {
  await consenso(page);
  await page.goto('/corsi?gruppo=fse', { waitUntil: 'networkidle' });
  await expect(page.getByText('in "Formazione Finanziata"')).toBeVisible();
});

test('Menu mobile: "Scopri tutti i corsi" si vede senza scorrere @rapido', async ({ page }) => {
  await consenso(page);
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.click('.hamburger');
  await page.getByRole('link', { name: /^Formazione/ }).first().click();
  const l = page.getByRole('link', { name: /Scopri tutti i corsi/ });
  await expect(l).toBeVisible();
  const b = await l.boundingBox();
  expect(b.y + b.height).toBeLessThanOrEqual(700);
});
