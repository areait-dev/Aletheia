// ASACOM: il titolo della scheda è "ASACOM - Assistente specialistico all'autonomia e alla comunicazione", ma l'indirizzo pubblico
// resta quello storico (SLUG_FAMIGLIE in data/courseFamilies.js). Un ritocco al titolo non deve cambiare l'URL né far
// perdere contenuto e foto (chiavi di data/content, courseImages e coursesDetails sono quelle del vecchio slug).
import { test, expect } from '@playwright/test';

const SLUG = '/corsi/asacom-assistente-alla-comunicazione';
const SLUG_DAL_TITOLO = '/corsi/asacom-assistente-specialistico-all-autonomia-e-alla-comunicazione';

test('ASACOM: l\'indirizzo storico risponde 200 con titolo nuovo, contenuto completo e foto dedicata @rapido', async ({ request }) => {
  const r = await request.get(SLUG, { maxRedirects: 0 });
  expect(r.status()).toBe(200);
  const html = await r.text();
  expect(html).toContain('ASACOM - Assistente specialistico all&#x27;autonomia e alla comunicazione');
  expect(html).not.toContain('Contenuto dettagliato in arrivo');
  expect(html).toContain('ASACOM è un insegnante di sostegno'); // FAQ del documento del reparto formazione (contenuto completo)
  expect(html).toContain('asacom.webp');
});

test('ASACOM: lo slug ricavato dal titolo non è una pagina (nessun secondo indirizzo) @rapido', async ({ request }) => {
  const r = await request.get(SLUG_DAL_TITOLO, { maxRedirects: 0 });
  expect(r.status()).toBe(404);
});
