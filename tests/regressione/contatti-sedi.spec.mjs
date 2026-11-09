// Contatti: "Apri in Maps" su tutte e quattro le sedi, con area cliccabile di almeno 44px di altezza sui telefoni.
import { test, expect } from '@playwright/test';

const SEDI = ['Vittoria', 'Ragusa', 'Pozzallo', 'Acate'];

test('"Apri in Maps" su tutte le sedi, con indirizzo giusto @rapido', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/contatti', { waitUntil: 'networkidle' });
  const link = page.locator('.sede-maps-link');
  await expect(link).toHaveCount(4);
  for (const citta of SEDI) {
    const l = page.getByRole('link', { name: `Apri in Maps: sede di ${citta}` });
    await expect(l).toBeVisible();
    await expect(l).toHaveAttribute('href', /^https:\/\/(www\.|maps\.)?google\.com\/(maps|\?q=)/);
    await expect(l).toHaveAttribute('target', '_blank');
  }
  await expect(page.getByRole('link', { name: 'Apri in Maps: sede di Ragusa' })).toHaveAttribute('href', /Viale\+delle\+Americhe\+141\+Ragusa/);
  await expect(page.getByRole('link', { name: 'Apri in Maps: sede di Pozzallo' })).toHaveAttribute('href', /Via\+Ginevra\+9\+Pozzallo/);
});

test('390px: area cliccabile di ogni "Apri in Maps" alta almeno 44px, senza cambiare le dimensioni del testo @rapido', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/contatti', { waitUntil: 'networkidle' });
  for (const citta of SEDI) {
    const l = page.getByRole('link', { name: `Apri in Maps: sede di ${citta}` });
    await l.scrollIntoViewIfNeeded();
    const b = await l.boundingBox();
    expect(b.height, `${citta}: altezza del testo`).toBeLessThan(30); // l'aspetto non cambia
    const cx = b.x + 20;
    // sopra e sotto il testo, fino a ±21px dal centro, il clic cade ancora sul link
    for (const dy of [-21, -14, 0, 14, 21]) {
      const y = b.y + b.height / 2 + dy;
      const hit = await page.evaluate(([x, yy]) => document.elementFromPoint(x, yy)?.closest('a.sede-maps-link')?.getAttribute('aria-label') ?? null, [cx, y]);
      expect(hit, `${citta}: clic a ${dy}px dal centro`).toBe(`Apri in Maps: sede di ${citta}`);
    }
  }
});
