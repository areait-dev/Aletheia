// Calendario dal foglio Google: regole di lettura (lib/calendario-foglio.ts), filtro unico sul futuro e "prossima edizione" (lib/wp-calendario.ts),
// e sicurezza delle credenziali (lib/google-sheets.ts). Nessuna rete: il foglio vero non viene mai letto.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { righeFoglioToEdizioni, dataFoglio } from '../../lib/calendario-foglio.ts';
import { soloFuture, prossimaEdizione, daysByCategory, upcomingDays, oggiItalia, inCorso } from '../../lib/wp-calendario.ts';
import { foglioGoogleConfigurato, leggiScheda, descriviErroreFoglio } from '../../lib/google-sheets.ts';

const CATALOGO = [
  { slug: 'antincendio', titolo: 'Antincendio', categoria: 'obbligatoria' },
  { slug: 'personale-alimentarista-osa', titolo: 'Personale Alimentarista OSA', categoria: 'obbligatoria' },
  { slug: 'icdl-base', titolo: 'ICDL Base', categoria: 'professionale' },
];
const INT = ['ente', 'corso', 'variante', 'tipologia', 'modalita', 'data_inizio', 'data_fine', 'giorni', 'orario', 'sede', 'posti', 'note', 'stato'];
const riga = (o) => INT.map((h) => o[h] ?? '');
const base = { ente: 'Aletheia Srl', corso: 'Antincendio', variante: 'Rischio medio Livello 2 (8 ore)', tipologia: 'Multiaziendale', modalita: 'Aula', data_inizio: '12/11/2026', data_fine: '17/11/2026', stato: 'pubblicato' };
const leggi = (...righe) => righeFoglioToEdizioni([INT, ...righe.map((r) => riga({ ...base, ...r }))], CATALOGO);

test('dataFoglio: gg/mm/aaaa valide, impossibili scartate @rapido', () => {
  expect(dataFoglio('17/11/2026')).toBe('2026-11-17');
  expect(dataFoglio('3/9/2026')).toBe('2026-09-03');
  expect(dataFoglio('2026-11-17')).toBe('2026-11-17');
  for (const brutta of ['17/11/206', '31/02/2026', '32/01/2026', '17/13/2026', '', 'domani', '17-11-2026']) expect(dataFoglio(brutta), brutta).toBe('');
});

test('solo "pubblicato" e "Multiaziendale"; bozza e Aziendale non escono @rapido', () => {
  const { edizioni } = leggi({}, { stato: 'bozza' }, { stato: 'Pubblicato ' }, { tipologia: 'Aziendale' }, { tipologia: 'multiaziendale' });
  expect(edizioni).toHaveLength(3); // base, "Pubblicato " (maiuscola e spazio), "multiaziendale" (minuscola)
});

test('corso collegato al catalogo: slug, categoria, titolo con variante, durata; note mai esposte @rapido', () => {
  const { edizioni } = leggi({ note: 'SEGRETO INTERNO', sede: 'Vittoria', posti: '20', giorni: '12/11/2026, 16/11/2026' });
  const e = edizioni[0];
  expect(e).toMatchObject({ slug: 'antincendio', categoria: 'obbligatoria', titolo: 'Antincendio — Rischio medio Livello 2 (8 ore)', data: '2026-11-12', dataFine: '2026-11-17', durata: '8 ore', sede: 'Vittoria', posti: 20, postiDisponibili: 20 });
  expect(JSON.stringify(edizioni)).not.toContain('SEGRETO');
  // nome del corso con maiuscole/accenti diversi e con lo slug: stesso corso
  expect(leggi({ corso: 'ANTINCENDIO' }).edizioni).toHaveLength(1);
  expect(leggi({ corso: 'personale-alimentarista-osa' }).edizioni[0].slug).toBe('personale-alimentarista-osa');
});

test('righe non valide: scartate una per una con avviso, le altre restano @rapido', () => {
  const { edizioni, avvisi } = leggi(
    {},
    { corso: 'Corso Che Non Esiste' },
    { data_inizio: '17/11/206', data_fine: '17/11/206' },
    { data_inizio: '20/11/2026', data_fine: '19/11/2026' },
    { data_fine: 'boh' },
  );
  expect(edizioni).toHaveLength(1);
  expect(avvisi).toHaveLength(4);
  expect(avvisi.join('\n')).toMatch(/non è nel catalogo/);
  expect(avvisi.join('\n')).toMatch(/riga 4/); // numero di riga come nel foglio (intestazione = 1)
});

test('data_fine vuota = data_inizio; posti vuoti o non numerici = non indicati (mai "esaurito"); 0 = esaurito @rapido', () => {
  const { edizioni } = leggi({ data_fine: '', posti: '' }, { posti: 'abc' }, { posti: '0' }, { posti: '7' });
  expect(edizioni[0].dataFine).toBe('2026-11-12');
  expect(edizioni.map((e) => e.postiDisponibili).sort()).toEqual([0, 7, null, null].sort());
  expect(edizioni.filter((e) => e.postiDisponibili === null)).toHaveLength(2);
});

test('intestazione cambiata o colonna mancante: errore, non date sbagliate @rapido', () => {
  expect(() => righeFoglioToEdizioni([['corso', 'data_inizio', 'tipologia'], ['Antincendio', '12/11/2026', 'Multiaziendale']], CATALOGO)).toThrow(/colonne mancanti.*stato/);
  expect(righeFoglioToEdizioni([], CATALOGO).edizioni).toEqual([]);
});

test('visibilità: calendario fino a data_fine ("In corso"), home e Formazione obbligatoria solo da data_inizio; "prossima edizione" solo se INIZIA da oggi @rapido', () => {
  const ed = leggi(
    { data_inizio: '03/11/2026', data_fine: '03/11/2026', variante: 'passata' },
    { data_inizio: '05/11/2026', data_fine: '09/11/2026', variante: 'in corso' },
    { data_inizio: '06/11/2026', data_fine: '06/11/2026', variante: 'oggi' },
    { data_inizio: '20/11/2026', data_fine: '20/11/2026', variante: 'futura' },
  ).edizioni;
  const visibili = soloFuture(ed, '2026-11-06').map((e) => e.variante);
  expect(visibili).toEqual(['in corso', 'oggi', 'futura']); // l'ultima giornata conta: l'edizione di oggi e quella in corso si vedono
  expect(soloFuture(ed, '2026-11-07').map((e) => e.variante)).toEqual(['in corso', 'futura']);
  expect(soloFuture(ed, '2026-12-01')).toEqual([]);
  expect(prossimaEdizione(ed, 'antincendio', '2026-11-06').variante).toBe('oggi');
  expect(prossimaEdizione(ed, 'antincendio', '2026-11-07').variante).toBe('futura');
  expect(prossimaEdizione(ed, 'antincendio', '2026-11-21')).toBeNull();
  expect(prossimaEdizione(ed, 'rls', '2026-11-06')).toBeNull();
  // etichetta "In corso" del calendario: già iniziata e non ancora finita
  expect(ed.filter((e) => inCorso(e, '2026-11-06')).map((e) => e.variante)).toEqual(['in corso']);
  expect(ed.filter((e) => inCorso(e, '2026-11-07')).map((e) => e.variante)).toEqual(['in corso']);
  expect(ed.filter((e) => inCorso(e, '2026-11-10')).map((e) => e.variante)).toEqual([]); // finita il 9: non è più visibile né "in corso"
  // "Corsi in partenza" (home) e righe di Formazione obbligatoria: solo le edizioni che INIZIANO da oggi in poi (le "in corso" restano fuori)
  expect(upcomingDays(ed, '2026-11-07').flatMap((g) => g.corsi.map((c) => c.variante))).toEqual(['futura']);
  expect(upcomingDays(ed, '2026-11-06').flatMap((g) => g.corsi.map((c) => c.variante))).toEqual(['oggi', 'futura']);
  expect(daysByCategory(ed, 'obbligatoria', '2026-11-07').flatMap((g) => g.corsi.map((c) => c.variante))).toEqual(['futura']);
  expect(daysByCategory(ed, 'obbligatoria', '2026-11-06').flatMap((g) => g.corsi.map((c) => c.variante))).toEqual(['oggi', 'futura']);
  expect(daysByCategory(ed, 'professionale', '2026-11-07')).toEqual([]);
});

test('oggiItalia: DATA_FISSA_TEST la congela, altrimenti YYYY-MM-DD @rapido', () => {
  const prima = process.env.DATA_FISSA_TEST;
  process.env.DATA_FISSA_TEST = '2026-08-10';
  expect(oggiItalia()).toBe('2026-08-10');
  delete process.env.DATA_FISSA_TEST;
  expect(oggiItalia()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  if (prima !== undefined) process.env.DATA_FISSA_TEST = prima;
});

test('le fixture dei test hanno l\'intestazione del foglio vero @rapido', () => {
  for (const f of ['foglio-con-edizioni.json', 'foglio-senza-date-pubblicate.json']) {
    const righe = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'riferimenti', 'calendario', f), 'utf8'));
    expect(righe[0]).toEqual(INT);
    expect(() => righeFoglioToEdizioni(righe, CATALOGO)).not.toThrow();
  }
});

test('credenziali Google: nessun dato esce negli errori (chiave non valida, nessuna rete) @rapido', async () => {
  const salvate = { e: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, k: process.env.GOOGLE_PRIVATE_KEY, s: process.env.GOOGLE_SHEET_ID };
  try {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'prova-segreta@progetto-segreto.iam.gserviceaccount.com';
    process.env.GOOGLE_SHEET_ID = 'ID-FOGLIO-SEGRETO-123';
    process.env.GOOGLE_PRIVATE_KEY = '"-----BEGIN PRIVATE KEY-----\\nCHIAVE-FALSA-SEGRETA\\n-----END PRIVATE KEY-----\\n"';
    expect(foglioGoogleConfigurato()).toBe(true);
    let messaggio = '';
    try {
      await leggiScheda('Corsi');
    } catch (err) {
      messaggio = `${err.message} | ${descriviErroreFoglio(err)} | ${err.stack}`;
    }
    expect(messaggio).toContain('chiave privata non valida');
    for (const segreto of ['CHIAVE-FALSA', 'prova-segreta', 'progetto-segreto', 'ID-FOGLIO-SEGRETO', 'BEGIN PRIVATE']) expect(messaggio, segreto).not.toContain(segreto);
    // errore qualsiasi (non nostro): testo generico, mai il messaggio originale
    expect(descriviErroreFoglio(new Error('contiene CHIAVE-FALSA'))).not.toContain('CHIAVE-FALSA');
  } finally {
    for (const [k, v] of [['GOOGLE_SERVICE_ACCOUNT_EMAIL', salvate.e], ['GOOGLE_PRIVATE_KEY', salvate.k], ['GOOGLE_SHEET_ID', salvate.s]]) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
});

test('rotta /api/revalidate con scope "calendario": segreto obbligatorio, rigenera home, calendario, Formazione obbligatoria e le schede @rapido', async () => {
  const modulo = await import('../../pages/api/revalidate.js');
  const handler = typeof modulo.default === 'function' ? modulo.default : modulo.default.default; // interoperabilità ESM/CJS del trasformatore dei test
  const salvato = process.env.WP_SHARED_SECRET;
  const chiama = async (header, body) => {
    const rigenerate = [];
    const res = { code: 0, json: null, setHeader() {}, status(c) { this.code = c; return this; }, json(o) { this.body = o; return this; }, revalidate: async (p) => { rigenerate.push(p); } };
    await handler({ method: 'POST', headers: header ? { 'x-aletheia-secret': header } : {}, body }, res);
    return { codice: res.code, corpo: res.body, rigenerate };
  };
  try {
    delete process.env.WP_SHARED_SECRET;
    expect((await chiama('qualsiasi', { scope: 'calendario' })).codice).toBe(503); // sito senza segreto: il pulsante lo segnala
    process.env.WP_SHARED_SECRET = 'segreto-di-prova-lungo-0123456789';
    expect((await chiama('sbagliato', { scope: 'calendario' })).codice).toBe(401);
    expect((await chiama('', { scope: 'calendario' })).codice).toBe(401);
    const ok = await chiama('segreto-di-prova-lungo-0123456789', { scope: 'calendario' });
    expect(ok.codice).toBe(200);
    expect(ok.corpo.failed).toEqual([]);
    for (const p of ['/', '/calendario-corsi', '/formazione/obbligatoria', '/all-courses/antincendio', '/all-courses/personale-alimentarista-osa']) expect(ok.rigenerate, p).toContain(p);
    expect(ok.rigenerate.filter((p) => p.startsWith('/all-courses/')).length).toBeGreaterThanOrEqual(30); // una per ogni corso del catalogo
    expect(ok.corpo.revalidated).toEqual(ok.rigenerate);
  } finally {
    if (salvato === undefined) delete process.env.WP_SHARED_SECRET;
    else process.env.WP_SHARED_SECRET = salvato;
  }
});
