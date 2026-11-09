// Corso ICDL Full Standard (nuovo, dal documento del reparto formazione del 5 novembre 2026): pagina, scheda tecnica, programma a 7 moduli
// e presenza nel catalogo ICDL.
import { test, expect } from '@playwright/test';

test('ICDL Full Standard: pagina completa @rapido', async ({ page }) => {
  await page.goto('/corsi/icdl-full-standard', { waitUntil: 'networkidle' });
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('ICDL Full Standard');
  const main = page.locator('main');
  await expect(main).not.toContainText('Contenuto dettagliato in arrivo');
  const scheda = page.locator('.cp-scheda-area');
  for (const v of ['60 ore', 'In presenza', '5 anni', 'ICDL Full Standard', 'Max 12 persone']) await expect(scheda).toContainText(v);
  for (const v of ['Descrizione del corso', 'A chi è rivolto', 'Cosa imparerai', 'Domande frequenti', 'Qual è la differenza tra ICDL Base e ICDL Full Standard?']) await expect(main).toContainText(v);
  await page.getByRole('button', { name: 'Moduli' }).click();
  await expect(main.locator('tbody tr')).toHaveCount(7);
  for (const v of ['Modulo 1 – Computer Essentials', 'Modulo 5 – IT Security', 'Modulo 7 – Online Collaboration', 'Modalità di svolgimento', 'classi a numero limitato, da 10 a 12 allievi']) await expect(main).toContainText(v);
});

test('ICDL Full Standard: compare nel catalogo ICDL @rapido', async ({ page }) => {
  await page.goto('/corsi?categoria=icdl', { waitUntil: 'networkidle' });
  await expect(page.locator('a[href="/corsi/icdl-full-standard"]').first()).toBeVisible();
});
