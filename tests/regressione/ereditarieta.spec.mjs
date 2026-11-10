// Le varianti di AGGIORNAMENTO ereditano dal corso base dello stesso livello modalità, attestato, validità e partecipanti quando non li
// indicano (lib/ereditarieta-contenuti.ts). Confermato dal reparto formazione il 5 novembre 2026 per Antincendio Livello 1, 2 e 3.
import { test, expect } from '@playwright/test';
import { ereditaDalBase } from '../../lib/ereditarieta-contenuti.ts';

const BASE = { durataOre: 16, modalita: ['Aula', 'FAD'], validita: 'Aggiornamento ogni 5 anni', attestato: 'Attestato X', partecipantiMax: 30, descrizione: 'testo del base' };

test('ereditarietà: i campi mancanti si prendono dal base, gli altri no @rapido', () => {
  const agg = { durataOre: 4, descrizione: "testo dell'aggiornamento" };
  const r = ereditaDalBase(agg, BASE);
  expect(r.modalita).toEqual(['Aula', 'FAD']);
  expect(r.validita).toBe('Aggiornamento ogni 5 anni');
  expect(r.attestato).toBe('Attestato X');
  expect(r.partecipantiMax).toBe(30);
  // durata, descrizione e il resto restano quelli dell'aggiornamento
  expect(r.durataOre).toBe(4);
  expect(r.descrizione).toBe("testo dell'aggiornamento");
  // gli oggetti ricevuti non vengono modificati
  expect(agg).toEqual({ durataOre: 4, descrizione: "testo dell'aggiornamento" });
});

test('ereditarietà: un valore indicato nell\'aggiornamento ha la precedenza @rapido', () => {
  const r = ereditaDalBase({ durataOre: 4, validita: 'Da ripetere ogni 5 anni', modalita: ['In presenza'] }, BASE);
  expect(r.validita).toBe('Da ripetere ogni 5 anni');
  expect(r.modalita).toEqual(['In presenza']);
  expect(r.attestato).toBe('Attestato X'); // quello che manca si eredita
});

test('ereditarietà: valori vuoti contano come mancanti, nulla da ereditare restituisce lo stesso oggetto @rapido', () => {
  const r = ereditaDalBase({ modalita: [], attestato: '', validita: null }, BASE);
  expect([r.modalita, r.attestato, r.validita]).toEqual([['Aula', 'FAD'], 'Attestato X', 'Aggiornamento ogni 5 anni']);
  const completo = { modalita: ['Aula'], attestato: 'A', validita: 'V', partecipantiMax: 10 };
  expect(ereditaDalBase(completo, BASE)).toBe(completo);
  expect(ereditaDalBase(completo, null)).toBe(completo);
  expect(ereditaDalBase(null, BASE)).toBeNull();
});

test('ereditarietà: partecipanti massimo e minimo sono lo stesso dato, se ne indica uno non si eredita l\'altro @rapido', () => {
  expect(ereditaDalBase({ partecipantiMin: 15 }, BASE).partecipantiMax).toBeUndefined();
  expect(ereditaDalBase({ partecipantiMax: 12 }, { ...BASE, partecipantiMin: 5 }).partecipantiMin).toBeUndefined();
  expect(ereditaDalBase({}, { ...BASE, partecipantiMax: undefined, partecipantiMin: 15 }).partecipantiMin).toBe(15);
});

test('Antincendio: gli aggiornamenti dei tre livelli mostrano i dati del rispettivo base @rapido', async ({ page }) => {
  await page.goto('/corsi/antincendio', { waitUntil: 'networkidle' });
  const scheda = page.locator('.cp-scheda-area');
  for (const [livello, ore] of [['Rischio Basso Livello 1', '2 ore'], ['Rischio Medio Livello 2', '5 ore'], ['Rischio Alto Livello 3', '8 ore']]) {
    await page.getByRole('tab', { name: livello }).click();
    await page.getByRole('tab', { name: /^Aggiornamento/ }).click();
    for (const v of [ore, 'Aula · Aula virtuale (solo teoria)', 'Aggiornamento ogni 5 anni', 'Attestato Antincendio valido in tutta Italia', 'Max 30 persone']) {
      await expect(scheda, `${livello} aggiornamento: ${v}`).toContainText(v);
    }
    // anche la riga sotto il titolo usa la modalità del base (non più "In presenza" generico)
    await expect(page.locator('h1 ~ div').first(), `${livello}: riga sotto il titolo`).toContainText('Aula · Aula virtuale (solo teoria)');
  }
});

test('Carriponte Pensile/Cabina: l\'aggiornamento eredita attestato, validità e partecipanti ma tiene la sua modalità @rapido', async ({ page }) => {
  await page.goto('/corsi/addetti-alla-conduzione-di-carriponti-pensile-cabina', { waitUntil: 'networkidle' });
  await page.getByRole('tab', { name: /^Aggiornamento/ }).click();
  const scheda = page.locator('.cp-scheda-area');
  for (const v of ['4 ore', 'In presenza', 'Attestato valido in tutta Italia', 'Aggiornamento ogni 5 anni', 'Max 25 per la teoria in aula · Max 6 per la pratica']) await expect(scheda).toContainText(v);
  await expect(scheda).not.toContainText('Aula virtuale (solo parte teorica)'); // quella del base: l'aggiornamento ha la sua modalità
});

test('Conduttore d\'Impresa Agricola: certificazione Qualifica 3 EQF, modalità FAD, nessuna variante di aggiornamento @rapido', async ({ page }) => {
  await page.goto('/corsi/conduttore-d-impresa-agricola', { waitUntil: 'networkidle' });
  const scheda = page.locator('.cp-scheda-area');
  await expect(scheda).toContainText('Conduttore d’Impresa Agricola – Qualifica 3 EQF');
  await expect(scheda).toContainText('FAD');
  await expect(scheda).toContainText('200 ore');
  await expect(page.locator('[role="tablist"]')).toHaveCount(0); // un solo corso: niente switch corso/aggiornamento
});
