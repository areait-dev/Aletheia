// Richiesta di preventivo: ogni pulsante "Richiedi un preventivo" di una scheda corso deve portare alla pagina dedicata
// /richiedi-preventivo?corso=<titolo del corso>, e la pagina deve funzionare (corso precompilato, controlli, conferma).
// Regola del committente (4 novembre 2026): "tutti i corsi, al Richiedi un preventivo, devono portare alla pagina dei preventivi".
// Unica eccezione voluta: i corsi finanziati/gratuiti hanno "Richiedi informazioni" (non un preventivo) e restano su /contatti.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import { urls } from './util.mjs';

const CORSI = urls.map((u) => u.url).filter((u) => /^\/all-courses\/[^?/]+$/.test(u));
const ETICHETTA_PREVENTIVO = /^\s*richiedi (un )?preventivo\s*$/i;
const ETICHETTA_INFO = /^\s*richiedi informazioni\s*$/i;

test('ogni pulsante "Richiedi un preventivo" delle schede corso porta a /richiedi-preventivo @rapido', async ({ request }) => {
  expect(CORSI.length, 'nessuna scheda corso trovata in urls.json').toBeGreaterThan(30);
  const conteggi = { preventivo: 0, informazioni: 0 };
  const problemi = [];
  for (const url of CORSI) {
    const r = await request.get(url);
    expect(r.status(), `${url}: stato HTTP`).toBe(200);
    const $ = cheerio.load(await r.text());
    // Il pulsante principale sta nella colonna "Iscrizione e Tariffe" (aside.cp-info-area).
    const cta = $('.cp-info-area a').filter((_, e) => ETICHETTA_PREVENTIVO.test($(e).text()) || ETICHETTA_INFO.test($(e).text()));
    if (cta.length !== 1) { problemi.push(`${url}: trovati ${cta.length} pulsanti "Richiedi…" nella colonna prezzo (ne serve uno)`); continue; }
    const testo = cta.text().trim(); const href = cta.attr('href') || '';
    if (ETICHETTA_PREVENTIVO.test(testo)) {
      conteggi.preventivo++;
      const m = href.match(/^\/richiedi-preventivo\?corso=(.+)$/);
      if (!m || !decodeURIComponent(m[1]).trim()) problemi.push(`${url}: "${testo}" punta a "${href}" invece che a /richiedi-preventivo?corso=…`);
    } else {
      conteggi.informazioni++; // corsi finanziati/gratuiti: restano su Contatti
      if (!/^\/contatti\?corso=/.test(href)) problemi.push(`${url}: "${testo}" punta a "${href}" (atteso /contatti?corso=…)`);
    }
  }
  test.info().annotations.push({ type: 'riepilogo', description: `${CORSI.length} schede corso: ${conteggi.preventivo} con "Richiedi un preventivo" → /richiedi-preventivo, ${conteggi.informazioni} con "Richiedi informazioni" → /contatti` });
  expect(problemi, 'pulsanti che non portano alla pagina dei preventivi').toEqual([]);
  expect(conteggi.preventivo, 'nessuna scheda con "Richiedi un preventivo"').toBeGreaterThan(20);
});

test('pagina /richiedi-preventivo: corso precompilato, controlli e conferma @rapido', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.setViewportSize({ width: 1280, height: 900 });
  const r = await page.goto('/richiedi-preventivo?corso=Antincendio%20Livello%202', { waitUntil: 'domcontentloaded' });
  expect(r.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText(/Richiedi un preventivo/i);
  // il corso arriva dall'indirizzo
  await expect(page.locator('#corso')).toHaveValue('Antincendio Livello 2');
  // invio vuoto: errori sui campi obbligatori e focus sul primo
  await page.getByRole('button', { name: /Invia la richiesta/i }).click();
  expect(await page.locator('[role="alert"]').count(), 'nessun messaggio di errore con il modulo vuoto').toBeGreaterThanOrEqual(5);
  await expect(page.locator('#tipologia')).toBeFocused();
  // invio valido: conferma con corso ed email
  await page.selectOption('#tipologia', 'Azienda');
  await page.fill('#azienda', 'Azienda di prova S.r.l.');
  await page.fill('#nome', 'Mario'); await page.fill('#cognome', 'Rossi');
  await page.fill('#email', 'mario@esempio.it'); await page.fill('#telefono', '+39 333 1234567');
  await page.fill('#partecipanti', '8'); await page.selectOption('#modalita', 'Presso la mia azienda');
  await page.check('#privacy');
  // L'invio è reale (pages/api/moduli/preventivo): qui la rotta è simulata, nessuna email parte. Il server scarta i moduli
  // compilati in meno di 3 secondi, quindi si attende prima di inviare. I tre stati completi sono in moduli-ui.spec.mjs.
  await page.route('**/api/moduli/preventivo', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"stato":"ok"}' }));
  await page.waitForTimeout(3300);
  await page.getByRole('button', { name: /Invia la richiesta/i }).click();
  await expect(page.getByText('Richiesta inviata!')).toBeVisible();
  await expect(page.getByText('Antincendio Livello 2').first()).toBeVisible();
  await expect(page.getByText('mario@esempio.it').first()).toBeVisible();
});
