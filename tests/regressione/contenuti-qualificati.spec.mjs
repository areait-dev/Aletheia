// Contenuti dei corsi qualificati OSS e ASACOM (documenti del reparto formazione, 5 novembre 2026): niente più "Contenuto dettagliato in arrivo",
// durata sotto il titolo solo se sono ore, "Minimo 15 persone", luogo del corso con la mappa, programma con la nota su esercitazioni e tirocinio.
import { test, expect } from '@playwright/test';

test('OSS: contenuto completo, 1000 ore, minimo 15, luogo con mappa @rapido', async ({ page }) => {
  await page.goto('/corsi/oss-operatore-socio-sanitario', { waitUntil: 'networkidle' });
  const main = page.locator('main');
  await expect(main).not.toContainText('Contenuto dettagliato in arrivo');
  await expect(main).not.toContainText('Qualifica Riconosciuta');
  const scheda = page.locator('.cp-scheda-area');
  for (const v of ['1000 ore', 'In presenza', 'Qualifica professionale di Operatore Socio Sanitario (OSS)', 'Minimo 15 persone', 'Vittoria (RG)']) await expect(scheda).toContainText(v);
  await expect(page.locator('h1 ~ div').first()).toContainText('1000 ore'); // durata sotto il titolo
  const mappa = scheda.getByRole('link', { name: /Vittoria \(RG\)/ });
  await expect(mappa).toHaveAttribute('href', /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=.*Vittoria/);
  await expect(mappa).toHaveAttribute('target', '_blank');
  for (const v of ['Per accedere al percorso sono richiesti:', 'Aver compiuto 18 anni alla data di iscrizione', 'Durante il corso acquisirai competenze per:', 'Qual è la differenza tra OSS e OSA?']) await expect(main).toContainText(v);
  await expect(main).toContainText('Il corso parte al raggiungimento di 15 iscritti'); // sidebar a iscrizione, invariata
  await page.getByRole('button', { name: 'Moduli' }).click();
  for (const v of ['Area socioculturale, legislativa e istituzionale', 'Area tecnico-operativa', 'Area relazionale', 'Esercitazioni e tirocinio', 'Esperienze di tirocinio presso strutture e servizi convenzionati']) await expect(main).toContainText(v);
  // le ore dei moduli del documento (4 e 7) non sono credibili su 1000 ore: non pubblicate
  await expect(main.locator('table td').filter({ hasText: /^(4|7) ore$/ })).toHaveCount(0);
});

test('ASACOM: contenuto completo, nessuna durata inventata, minimo 15, 9 moduli @rapido', async ({ page }) => {
  await page.goto('/corsi/asacom-assistente-alla-comunicazione', { waitUntil: 'networkidle' });
  const main = page.locator('main');
  await expect(main).not.toContainText('Contenuto dettagliato in arrivo');
  await expect(main).not.toContainText('Qualifica Riconosciuta');
  const scheda = page.locator('.cp-scheda-area');
  for (const v of ['In presenza', 'Minimo 15 persone', 'Vittoria (RG)']) await expect(scheda).toContainText(v);
  await expect(scheda).not.toContainText('Durata'); // le ore non sono nel documento: da chiedere, non si mostra un dato sbagliato
  await expect(page.locator('h1 ~ div').first()).not.toContainText(/ore|Qualifica/);
  await expect(main).toContainText("L'ASACOM è un insegnante di sostegno?");
  await page.getByRole('button', { name: 'Moduli' }).click();
  await expect(main.locator('tbody tr')).toHaveCount(9);
  await expect(main).toContainText('Modulo 4 – Comunità sorda e lingua dei segni');
});
