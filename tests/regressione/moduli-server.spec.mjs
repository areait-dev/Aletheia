// Invio dei moduli, lato SERVER (pages/api/moduli/*): validazione, invio a Resend, errore di Resend, modalità senza chiave, antispam.
// NESSUNA email vera: Resend è un server HTTP finto in locale (RESEND_API_URL, ammesso solo fuori da NODE_ENV=production) e,
// nel test sulla produzione, `fetch` è sostituito da una funzione che registra la chiamata senza uscire in rete.
// Le rotte si chiamano direttamente (stessa funzione che usa Next) con richieste multipart reali, come le manda il browser.
import { test, expect } from '@playwright/test';
import http from 'node:http';
import { Readable } from 'node:stream';
import { creaRotta, azzeraLimiti } from '../../lib/moduli-server.ts';
import { TIPI_MODULO, CAMPO_TRAPPOLA, MAX_ALLEGATO, oggettoEmail, costruisciMailto, validaModulo } from '../../lib/moduli.ts';

const EMAIL = 'mario@esempio.it';
const VALIDI = {
  preventivo: { corso: 'Antincendio Livello 2', destinatario: 'Per la mia azienda o ente', tipologia: 'Azienda', azienda: 'Azienda di prova S.r.l.', nome: 'Mario', cognome: 'Rossi', email: EMAIL, telefono: '+39 333 1234567', partecipanti: '8', modalita: 'Presso la mia azienda', messaggio: 'Preferiamo marzo', privacy: 'true' },
  iscrizione: { corso: 'Operatore Socio Sanitario (OSS)', nome: 'Mario Rossi', email: EMAIL, telefono: '333 1234567', privacy: 'true' },
  preiscrizione: { corso: 'Avviso n. 1/2026 POC Sicilia 2014-2020', nome: 'Mario Rossi', email: EMAIL, telefono: '333 1234567', privacy: 'true' },
  contatti: { nome: 'Mario', cognome: 'Rossi', email: EMAIL, telefono: '', motivo: 'Informazioni su un corso', messaggio: 'Buongiorno, vorrei informazioni.', privacy: 'true' },
  candidatura: { nome: 'Mario', cognome: 'Rossi', email: EMAIL, comune: 'Vittoria', servizio: 'Candidatura Spontanea', privacy: 'true' },
  azienda: { ragioneSociale: 'Azienda S.r.l.', nomeReferente: 'Mario', cognomeReferente: 'Rossi', email: EMAIL, telefono: '0932 000000', settore: 'Agricoltura', dipendenti: '1-9', servizio: 'Selezione del personale', privacy: 'true' },
  obbligatoria: { ragioneSociale: 'Azienda S.r.l.', piva: 'IT12345678901', nome: 'Mario', cognome: 'Rossi', telefono: '0932 000000', email: EMAIL, categoriaCorso: 'Fitosanitario', sede: 'Vittoria (RG)', partecipanti: '12', privacy: 'true' },
  'corsi-pa': { ente: 'Comune di Prova', referente: 'Mario Rossi', email: EMAIL, privacy: 'true' },
  reclami: { nome: 'Mario Rossi', email: EMAIL, tipologia: 'Reclamo', parti: 'Clienti', oggetto: 'Ritardo nella consegna', messaggio: 'Testo del reclamo', privacy: 'true' },
};
const OGGETTI = {
  preventivo: '[Sito] Preventivo: Antincendio Livello 2',
  iscrizione: '[Sito] Iscrizione: Operatore Socio Sanitario (OSS)',
  preiscrizione: '[Sito] Pre-iscrizione: Avviso n. 1/2026 POC Sicilia 2014-2020',
  contatti: '[Sito] Contatto: Informazioni su un corso',
  candidatura: '[Sito] Candidatura: Candidatura Spontanea',
  azienda: '[Sito] Azienda: Azienda S.r.l.',
  obbligatoria: '[Sito] Formazione obbligatoria: Azienda S.r.l.',
  'corsi-pa': '[Sito] Corsi PA: Comune di Prova',
  reclami: '[Sito] Reclamo/Proposta: Reclamo',
};
const PDF = Buffer.concat([Buffer.from('%PDF-1.4\n'), Buffer.from('curriculum di prova')]);

// ── Resend finto ────────────────────────────────────────────────────────────────────────────────────
let server; let ricevute = []; let rispostaResend = { status: 200, corpo: { id: 'finto' } };
test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    const pezzi = [];
    req.on('data', (c) => pezzi.push(c));
    req.on('end', () => {
      let corpo = null; try { corpo = JSON.parse(Buffer.concat(pezzi).toString()); } catch {}
      ricevute.push({ metodo: req.method, url: req.url, autorizzazione: req.headers.authorization, corpo });
      res.writeHead(rispostaResend.status, { 'content-type': 'application/json' });
      res.end(JSON.stringify(rispostaResend.corpo));
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  process.env.RESEND_API_URL = `http://127.0.0.1:${server.address().port}`;
});
test.afterAll(async () => { await new Promise((r) => server.close(r)); delete process.env.RESEND_API_URL; });

let contatoreIp = 0;
test.beforeEach(() => {
  ricevute = []; rispostaResend = { status: 200, corpo: { id: 'finto' } };
  azzeraLimiti();
  process.env.RESEND_API_KEY = 're_chiave_finta_di_test'; process.env.MAIL_FROM = 'Alètheia Srl <sito@test.invalid>'; delete process.env.MAIL_TO;
  contatoreIp++;
});
test.afterEach(() => { delete process.env.RESEND_API_KEY; delete process.env.MAIL_FROM; delete process.env.MAIL_TO; });

// ── Chiamata alla rotta con un multipart vero ───────────────────────────────────────────────────────
async function chiama(tipo, campi, { file, nomeFile = 'cv.pdf', ip = `10.0.0.${contatoreIp}`, tempo = '5000', trappola = '', metodo = 'POST', extraByte = 0 } = {}) {
  const fd = new FormData();
  Object.entries(campi).forEach(([k, v]) => fd.append(k, v));
  fd.append('tempo', tempo); fd.append(CAMPO_TRAPPOLA, trappola);
  if (file) fd.append('allegato', new Blob([file]), nomeFile);
  if (extraByte) fd.append('zavorra', 'x'.repeat(extraByte));
  const r = new Request('http://localhost/', { method: 'POST', body: fd });
  const buf = Buffer.from(await r.arrayBuffer());
  const req = Object.assign(Readable.from([buf]), { method: metodo, headers: { 'content-type': r.headers.get('content-type'), 'content-length': String(buf.length), 'x-forwarded-for': ip }, socket: { remoteAddress: ip } });
  const res = { intestazioni: {}, status(n) { this.codice = n; return this; }, json(b) { this.corpo = b; return this; }, setHeader(k, v) { this.intestazioni[k] = v; } };
  await creaRotta(tipo)(req, res);
  return { status: res.codice, corpo: res.corpo, intestazioni: res.intestazioni };
}

test.describe.configure({ mode: 'serial' });

test('i dati di prova sono validi per tutti i moduli e quelli vuoti no @rapido', async () => {
  expect(Object.keys(VALIDI).sort()).toEqual([...TIPI_MODULO].sort());
  for (const t of TIPI_MODULO) {
    expect(validaModulo(t, VALIDI[t]), `${t}: dati di prova non validi`).toEqual({});
    const vuoti = validaModulo(t, {});
    expect(Object.keys(vuoti), `${t}: nessun errore con il modulo vuoto`).toContain('privacy');
    expect(Object.keys(vuoti).length, `${t}: errori a modulo vuoto`).toBeGreaterThanOrEqual(3);
  }
});

test('validazione server: ogni modulo vuoto → 400 con errori per campo, nessuna email @rapido', async () => {
  for (const t of TIPI_MODULO) {
    const r = await chiama(t, {});
    expect(r.status, `${t}`).toBe(400);
    expect(r.corpo.stato).toBe('errori');
    expect(r.corpo.errori.privacy, `${t}: la privacy deve essere obbligatoria`).toBeTruthy();
  }
  expect(ricevute, 'nessuna email deve partire con dati non validi').toHaveLength(0);
});

test('validazione server: email, telefono, numeri, privacy non spuntata e condizionali @rapido', async () => {
  let r = await chiama('preventivo', { ...VALIDI.preventivo, email: 'non-una-email', telefono: 'abc', partecipanti: '0', privacy: 'false' });
  expect(r.status).toBe(400);
  expect(Object.keys(r.corpo.errori).sort()).toEqual(['email', 'partecipanti', 'privacy', 'telefono']);
  // privato: l'azienda non serve; azienda/ente sì
  expect((await chiama('preventivo', { ...VALIDI.preventivo, tipologia: 'Privato', azienda: '' })).status).toBe(200);
  r = await chiama('preventivo', { ...VALIDI.preventivo, tipologia: 'Azienda', azienda: '' });
  expect(r.corpo.errori.azienda).toBeTruthy();
  // reclami: privacy obbligatoria, email facoltativa ma valida se c'è
  r = await chiama('reclami', { ...VALIDI.reclami, privacy: 'false' });
  expect(r.corpo.errori.privacy).toBeTruthy();
  r = await chiama('reclami', { ...VALIDI.reclami, email: 'no' });
  expect(r.corpo.errori.email).toBe('Email non valida');
  expect((await chiama('reclami', { ...VALIDI.reclami, email: '', nome: '' })).status).toBe(200);
  // obbligatoria e corsi-pa: ora validano davvero (prima controllavano solo la privacy)
  r = await chiama('obbligatoria', { ...VALIDI.obbligatoria, email: 'x', partecipanti: '-3' });
  expect(Object.keys(r.corpo.errori).sort()).toEqual(['email', 'partecipanti']);
  r = await chiama('corsi-pa', { ...VALIDI['corsi-pa'], ente: '', referente: '' });
  expect(Object.keys(r.corpo.errori).sort()).toEqual(['ente', 'referente']);
});

test('invio riuscito per tutti i moduli: oggetto, destinatario di default, Reply-To, campi leggibili @rapido', async () => {
  for (const t of TIPI_MODULO) {
    ricevute = [];
    const r = await chiama(t, VALIDI[t], { ip: `10.1.${TIPI_MODULO.indexOf(t)}.1` });
    expect(r.status, `${t}: ${JSON.stringify(r.corpo)}`).toBe(200);
    expect(r.corpo).toEqual({ stato: 'ok' });
    expect(ricevute, `${t}: una sola chiamata a Resend`).toHaveLength(1);
    const c = ricevute[0];
    expect(c.metodo).toBe('POST'); expect(c.url).toBe('/emails');
    expect(c.autorizzazione).toBe('Bearer re_chiave_finta_di_test');
    expect(c.corpo.subject).toBe(OGGETTI[t]);
    expect(c.corpo.to).toEqual(['info@aletheiasrl.it']);
    expect(c.corpo.from).toBe('Alètheia Srl <sito@test.invalid>');
    expect(c.corpo.reply_to, `${t}: Reply-To sull'email di chi scrive`).toBe(EMAIL);
    // ogni valore compilato compare, con la sua etichetta, nel testo e nell'HTML
    for (const [k, v] of Object.entries(VALIDI[t])) {
      if (k === 'privacy' || !v) continue;
      expect(c.corpo.text, `${t}: "${v}" assente dal testo`).toContain(v);
      expect(c.corpo.html, `${t}: "${v}" assente dall'HTML`).toContain(String(v).replace(/&/g, '&amp;'));
    }
    expect(c.corpo.text).toMatch(/Privacy Policy: Accettata/);
    expect(c.corpo.attachments).toBeUndefined();
  }
});

test('MAIL_TO personalizzato (anche più indirizzi) e oggetto su una riga, HTML sempre escapato @rapido', async () => {
  process.env.MAIL_TO = 'uno@test.invalid, due@test.invalid';
  const r = await chiama('azienda', { ...VALIDI.azienda, ragioneSociale: '<script>alert(1)</script>\nBcc: spia@test.invalid' });
  expect(r.status).toBe(200);
  const c = ricevute[0].corpo;
  expect(c.to).toEqual(['uno@test.invalid', 'due@test.invalid']);
  expect(c.subject).not.toMatch(/[\r\n]/);
  expect(c.html).not.toContain('<script>');
  expect(c.html).toContain('&lt;script&gt;');
});

test('candidatura con CV: l\'allegato parte con l\'email (base64) @rapido', async () => {
  const r = await chiama('candidatura', VALIDI.candidatura, { file: PDF, nomeFile: 'CV Mario Rossi.pdf' });
  expect(r.status).toBe(200);
  const a = ricevute[0].corpo.attachments;
  expect(a).toHaveLength(1);
  expect(a[0].filename).toBe('CV Mario Rossi.pdf');
  expect(Buffer.from(a[0].content, 'base64').equals(PDF)).toBe(true);
  expect(ricevute[0].corpo.text).toContain('Allegato: CV Mario Rossi.pdf');
});

test('allegati: formato non ammesso, contenuto falso, oltre 4 MB, troppo grande per la richiesta @rapido', async () => {
  let r = await chiama('candidatura', VALIDI.candidatura, { file: Buffer.from('MZ eseguibile'), nomeFile: 'virus.exe' });
  expect(r.status).toBe(400); expect(r.corpo.errori.allegato).toMatch(/Formato non consentito.*PDF, DOC o DOCX/);
  r = await chiama('candidatura', VALIDI.candidatura, { file: Buffer.from('non sono un pdf'), nomeFile: 'finto.pdf' });
  expect(r.status).toBe(400); expect(r.corpo.errori.allegato).toMatch(/non corrisponde/);
  // immagini: ammesse solo ai reclami
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47]), Buffer.from('xx')]);
  r = await chiama('candidatura', VALIDI.candidatura, { file: png, nomeFile: 'foto.png' });
  expect(r.status).toBe(400);
  r = await chiama('reclami', VALIDI.reclami, { file: png, nomeFile: 'foto.png' });
  expect(r.status).toBe(200); expect(ricevute[0].corpo.attachments).toHaveLength(1);
  // 4 MB + 1 byte
  ricevute = [];
  const grande = Buffer.concat([Buffer.from('%PDF'), Buffer.alloc(MAX_ALLEGATO)]);
  r = await chiama('candidatura', VALIDI.candidatura, { file: grande });
  expect(r.status).toBe(400); expect(r.corpo.errori.allegato).toMatch(/supera il limite di 4 MB.*info@aletheiasrl\.it/);
  // oltre ogni margine → 413 con lo stesso messaggio
  r = await chiama('candidatura', VALIDI.candidatura, { file: Buffer.concat([Buffer.from('%PDF'), Buffer.alloc(MAX_ALLEGATO + 500 * 1024)]) });
  expect(r.status).toBe(413); expect(r.corpo.errori.allegato).toMatch(/4 MB/);
  expect(ricevute, 'nessuna email con allegati rifiutati').toHaveLength(0);
});

test('errore di Resend: nessuna conferma, stato "errore", il limite per IP non viene consumato @rapido', async () => {
  rispostaResend = { status: 422, corpo: { name: 'validation_error', message: 'The domain is not verified' } };
  const avvisi = []; const orig = console.error; console.error = (...a) => avvisi.push(a.join(' '));
  try {
    for (let i = 0; i < 4; i++) {
      const r = await chiama('contatti', VALIDI.contatti, { ip: '10.9.9.9' });
      expect(r.status).toBe(502); expect(r.corpo).toEqual({ stato: 'errore' });
    }
  } finally { console.error = orig; }
  expect(ricevute).toHaveLength(4);
  expect(avvisi[0]).toMatch(/invio NON riuscito.*422.*not verified/i);
  expect(avvisi.join('\n')).not.toContain('re_chiave_finta_di_test');
  // Resend torna a funzionare: lo stesso IP può inviare (4 fallimenti non hanno consumato il limite di 3)
  rispostaResend = { status: 200, corpo: { id: 'ok' } };
  expect((await chiama('contatti', VALIDI.contatti, { ip: '10.9.9.9' })).status).toBe(200);
});

test('Resend irraggiungibile o MAIL_FROM mancante: "errore", mai "ok" @rapido', async () => {
  const orig = console.error; console.error = () => {};
  try {
    const urlOriginale = process.env.RESEND_API_URL;
    process.env.RESEND_API_URL = 'http://127.0.0.1:1';
    let r = await chiama('preventivo', VALIDI.preventivo);
    expect(r.status).toBe(502); expect(r.corpo.stato).toBe('errore');
    process.env.RESEND_API_URL = urlOriginale;
    delete process.env.MAIL_FROM;
    r = await chiama('preventivo', VALIDI.preventivo);
    expect(r.status).toBe(502); expect(r.corpo.stato).toBe('errore');
  } finally { console.error = orig; }
  expect(ricevute).toHaveLength(0);
});

test('senza RESEND_API_KEY: nessun invio simulato, stato "senza-chiave" e riga nei log del server @rapido', async () => {
  delete process.env.RESEND_API_KEY;
  const log = []; const orig = console.warn; console.warn = (...a) => log.push(a.join(' '));
  try {
    for (const t of TIPI_MODULO) {
      const r = await chiama(t, VALIDI[t], { ip: `10.2.${TIPI_MODULO.indexOf(t)}.1` });
      expect(r.status, t).toBe(503); expect(r.corpo).toEqual({ stato: 'senza-chiave' });
    }
  } finally { console.warn = orig; }
  expect(ricevute, 'senza chiave non si chiama Resend').toHaveLength(0);
  expect(log).toHaveLength(TIPI_MODULO.length);
  expect(log[0]).toContain('RESEND_API_KEY non impostata');
  expect(log[0]).toContain('NON inviata');
  expect(log[0]).toContain(OGGETTI.preventivo);
  // dati personali nei log: solo l'oggetto, mai email o telefono di chi scrive
  expect(log.join('\n')).not.toContain(EMAIL);
  // con la chiave vuota (variabile creata ma non compilata) vale lo stesso
  process.env.RESEND_API_KEY = '   ';
  expect((await chiama('contatti', VALIDI.contatti, { ip: '10.3.3.3' })).corpo.stato).toBe('senza-chiave');
});

test('in produzione RESEND_API_URL è ignorata: si usa sempre api.resend.com (fetch sostituito, nessuna rete) @rapido', async () => {
  const fetchOriginale = globalThis.fetch; const chiamate = [];
  globalThis.fetch = async (url) => { chiamate.push(String(url)); return new Response('{}', { status: 200 }); };
  const env = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'production';
    expect((await chiama('contatti', VALIDI.contatti)).status).toBe(200);
    process.env.NODE_ENV = 'test';
    expect((await chiama('contatti', VALIDI.contatti, { ip: '10.7.7.7' })).status).toBe(200);
  } finally { globalThis.fetch = fetchOriginale; process.env.NODE_ENV = env; }
  expect(chiamate[0]).toBe('https://api.resend.com/emails');
  expect(chiamate[1]).toBe(`${process.env.RESEND_API_URL}/emails`);
  expect(ricevute, 'il server finto non deve ricevere la chiamata di produzione').toHaveLength(0);
});

test('antispam: campo-trappola, tempo minimo, limite di 3 invii ogni 10 minuti per IP @rapido', async () => {
  // honeypot: risposta "ok" ma nessuna email
  const log = []; const orig = console.warn; console.warn = (...a) => log.push(a.join(' '));
  try {
    let r = await chiama('contatti', VALIDI.contatti, { trappola: 'http://spam.example' });
    expect(r.status).toBe(200); expect(r.corpo.stato).toBe('ok');
  } finally { console.warn = orig; }
  expect(ricevute).toHaveLength(0); expect(log[0]).toMatch(/campo-trappola/);
  // troppo in fretta (o tempo assente/falsificato): l'utente vero può riprovare
  for (const tempo of ['800', '', 'abc', '-5']) {
    const r = await chiama('contatti', VALIDI.contatti, { tempo });
    expect(r.status, `tempo "${tempo}"`).toBe(429); expect(r.corpo.stato).toBe('limite'); expect(r.corpo.messaggio).toMatch(/troppo in fretta/);
  }
  expect(ricevute).toHaveLength(0);
  // limite per IP: 3 invii, il quarto no; un altro IP sì; correggere un errore di validazione non consuma il limite
  for (let i = 0; i < 3; i++) expect((await chiama('contatti', VALIDI.contatti, { ip: '10.5.5.5' })).status).toBe(200);
  const r4 = await chiama('contatti', VALIDI.contatti, { ip: '10.5.5.5' });
  expect(r4.status).toBe(429); expect(r4.corpo.stato).toBe('limite'); expect(r4.corpo.messaggio).toMatch(/più richieste|qualche minuto/);
  expect(ricevute).toHaveLength(3);
  expect((await chiama('contatti', VALIDI.contatti, { ip: '10.5.5.6' })).status).toBe(200);
  for (let i = 0; i < 5; i++) expect((await chiama('contatti', {}, { ip: '10.5.5.7' })).status).toBe(400);
  expect((await chiama('contatti', VALIDI.contatti, { ip: '10.5.5.7' })).status).toBe(200);
});

test('solo POST e solo multipart @rapido', async () => {
  const r = await chiama('contatti', VALIDI.contatti, { metodo: 'GET' });
  expect(r.status).toBe(405); expect(r.intestazioni.Allow).toBe('POST');
  expect(r.intestazioni['Cache-Control']).toBe('no-store');
  const req = Object.assign(Readable.from([Buffer.from('{"a":1}')]), { method: 'POST', headers: { 'content-type': 'application/json' }, socket: { remoteAddress: '10.8.8.8' } });
  const res = { status(n) { this.codice = n; return this; }, json(b) { this.corpo = b; return this; }, setHeader() {} };
  await creaRotta('contatti')(req, res);
  expect(res.codice).toBe(400);
});

test('oggetto e mailto di ripiego: prefisso fisso, campi leggibili, accorciato se troppo lungo @rapido', async () => {
  expect(oggettoEmail('preventivo', VALIDI.preventivo)).toBe(OGGETTI.preventivo);
  expect(oggettoEmail('contatti', { ...VALIDI.contatti, motivo: 'A'.repeat(300) }).length).toBeLessThanOrEqual(150);
  const m = costruisciMailto('preventivo', VALIDI.preventivo);
  expect(m.startsWith('mailto:info@aletheiasrl.it?subject=')).toBe(true);
  const u = new URL(m);
  expect(u.searchParams.get('subject')).toBe(OGGETTI.preventivo);
  const corpo = u.searchParams.get('body');
  expect(corpo).toContain('Corso: Antincendio Livello 2'); expect(corpo).toContain('Email: mario@esempio.it'); expect(corpo).toContain('Numero di partecipanti: 8');
  expect(decodeURIComponent(costruisciMailto('contatti', { ...VALIDI.contatti, messaggio: 'x'.repeat(5000) }).split('body=')[1]).length).toBeLessThanOrEqual(1500);
});
