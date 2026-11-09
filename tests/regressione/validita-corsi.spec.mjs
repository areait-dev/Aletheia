// Validità dei corsi Patentino fitosanitario (aggiornamento ogni 5 anni) e Personale alimentarista OSA (aggiornamento ogni 2 anni),
// e niente prezzi nel testo della descrizione dell'aggiornamento OSA (i prezzi non si mostrano nelle schede: "Su richiesta").
import { test, expect } from '@playwright/test';

const CASI = [
  ['/corsi/patentino-fitosanitario', 'Aggiornamento ogni 5 anni', 'Da ripetere ogni 5 anni'],
  ['/corsi/personale-alimentarista-osa', 'Aggiornamento ogni 2 anni', 'Da ripetere ogni 2 anni'],
];

for (const [url, base, agg] of CASI) {
  test(`validità ${url.split('/').pop()}: corso base e aggiornamento, nessun "Da definire" @rapido`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    const scheda = page.locator('.cp-scheda-area');
    await expect(scheda).toContainText(base);
    await expect(page.locator('main')).not.toContainText(/da definire/i);
    await page.getByRole('tab', { name: /Aggiornamento/ }).first().click();
    await expect(scheda).toContainText(agg);
    await expect(page.locator('main')).not.toContainText(/da definire/i);
  });
}

test('personale alimentarista: nessun prezzo nella descrizione dell\'aggiornamento @rapido', async ({ page }) => {
  await page.goto('/corsi/personale-alimentarista-osa', { waitUntil: 'networkidle' });
  await page.getByRole('tab', { name: /Aggiornamento/ }).first().click();
  const main = page.locator('main');
  await expect(main).toContainText('Il corso è disponibile in Aula o in FAD.');
  await expect(main).not.toContainText(/€|\+\s*IVA/);
});
