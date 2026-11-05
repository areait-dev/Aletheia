// Regola della scadenza della pre-iscrizione di un avviso (lib/preiscrizione.ts) e valori di partenza delle schede.
// Pura logica, nessun browser: la scheda mostra "Pre-iscrizioni chiuse" (senza link) quando la scadenza è passata.
import { test, expect } from '@playwright/test';
import { preiscrizioneChiusa, oggiIT } from '../../lib/preiscrizione.ts';
import { SCHEDE_ARCHIVIO } from '../../data/archivio-schede.js';

test('pre-iscrizione: scadenza passata = chiusa, il giorno stesso ancora aperta @rapido', () => {
  const adesso = new Date('2026-11-05T10:00:00Z'); // 5 novembre, ora italiana 11:00
  expect(oggiIT(adesso)).toBe('2026-11-05');
  expect(preiscrizioneChiusa('2026-11-04', adesso)).toBe(true);
  expect(preiscrizioneChiusa('2026-11-05', adesso)).toBe(false); // la scadenza è inclusa
  expect(preiscrizioneChiusa('2026-11-06', adesso)).toBe(false);
  // senza scadenza o con un valore non valido: resta aperta
  for (const v of ['', '   ', null, undefined, '05/11/2026', 'domani']) expect(preiscrizioneChiusa(v, adesso), String(v)).toBe(false);
});

test('pre-iscrizione: il giorno cambia a mezzanotte italiana, non UTC @rapido', () => {
  // 23:30 UTC del 4 novembre = 00:30 del 5 novembre in Italia (CET, UTC+1)
  const dopoMezzanotte = new Date('2026-11-04T23:30:00Z');
  expect(oggiIT(dopoMezzanotte)).toBe('2026-11-05');
  expect(preiscrizioneChiusa('2026-11-04', dopoMezzanotte)).toBe(true);
  // 22:30 UTC del 4 novembre = 23:30 del 4 in Italia: l'ultimo giorno è ancora aperto
  expect(preiscrizioneChiusa('2026-11-04', new Date('2026-11-04T22:30:00Z'))).toBe(false);
});

test('schede degli avvisi: la pre-iscrizione è spenta di default @rapido', () => {
  for (const s of SCHEDE_ARCHIVIO) {
    expect(s.scheda.preiscrizione === true, `${s.slug}: oggi nessun avviso prevede la pre-iscrizione`).toBe(false);
  }
});
