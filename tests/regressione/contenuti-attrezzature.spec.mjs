// Contenuti dei corsi "decreto attrezzature" arrivati dal reparto formazione (5 novembre 2026): Carriponti Pensile/Cabina (corso 11 ore e
// aggiornamento 4 ore), Caricatori CMM (aggiornamento) e Raccogli frutta CRF (aggiornamento). Prima mostravano solo la scheda tecnica
// e «Contenuto dettagliato in arrivo». Vale anche con URL_BASE (anteprima/produzione).
import { test, expect } from '@playwright/test';

const PLACEHOLDER = /Contenuto dettagliato in arrivo/;

test('attrezzature: i corsi con contenuto non mostrano più il segnaposto (HTML) @rapido', async ({ request }) => {
  for (const [u, frasi] of [
    ['/all-courses/addetti-alla-conduzione-di-carriponti-pensile-cabina', ['Il carroponte è la macchina destinata al sollevamento', 'Qual è la differenza tra carroponte e gru a portale?']],
    ['/all-courses/addetti-macchina-raccogli-frutta-aggiornamento', ['Il corso di aggiornamento per lavoratori addetti alla conduzione di Macchine Agricole Raccoglifrutta (CRF)']],
    ['/all-courses/addetti-caricatori-movimentazione-di-materiali-cmm', []],
  ]) {
    const html = await (await request.get(u)).text();
    const testo = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    expect(testo, `${u}: segnaposto`).not.toMatch(PLACEHOLDER);
    expect(testo, `${u}: descrizione`).toContain('Descrizione del corso');
    expect(testo, `${u}: a chi è rivolto`).toContain('A chi è rivolto');
    expect(testo, `${u}: FAQ`).toContain('Domande frequenti');
    for (const f of frasi) expect(testo, `${u}: "${f.slice(0, 50)}"`).toContain(f);
  }
});

test('attrezzature: le varianti Aggiornamento hanno il loro contenuto @rapido', async ({ page }) => {
  const casi = [
    ['/all-courses/addetti-alla-conduzione-di-carriponti-pensile-cabina', 'carriponte, della durata di 4 ore', 'MODULO PRATICO'],
    ['/all-courses/addetti-caricatori-movimentazione-di-materiali-cmm', 'Caricatori per la Movimentazione di Materiali (CMM), della durata di 4 ore', 'MODULO PRATICO'],
  ];
  for (const [u, frase, modulo] of casi) {
    await page.goto(u, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: /Aggiornamento/ }).first().click();
    const main = page.locator('main');
    await expect(main, `${u}: testo dell'aggiornamento`).toContainText(frase);
    await expect(main, `${u}: segnaposto`).not.toContainText(PLACEHOLDER);
    await page.getByRole('button', { name: 'Moduli' }).click();
    await expect(main, `${u}: programma`).toContainText(modulo);
  }
});

test('attrezzature: scheda tecnica del corso Carriponti Pensile/Cabina (11 ore) @rapido', async ({ page }) => {
  await page.goto('/all-courses/addetti-alla-conduzione-di-carriponti-pensile-cabina', { waitUntil: 'networkidle' });
  const scheda = page.locator('.cp-scheda-area');
  for (const v of ['11 ore', 'Aula', 'Videoconferenza (solo parte teorica)', 'Aggiornamento ogni 5 anni', 'Attestato valido in tutta Italia', 'Max 30 persone']) await expect(scheda).toContainText(v);
});
