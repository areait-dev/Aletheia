// /api/chatbot-unanswered: scrive nei log del server, mai su disco (su Vercel il disco è in sola lettura e la rotta dava 500),
// risponde 200 e oscura email e numeri di telefono eventualmente scritti nella domanda.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import modulo from '../../pages/api/chatbot-unanswered.js';

// La rotta è un .js senza "type":"module": a seconda del caricatore il default arriva incartato un'altra volta
const handler = typeof modulo === 'function' ? modulo : modulo.default;

const cartellaLog = path.resolve(import.meta.dirname, '..', '..', 'data', 'chatbot-log');
const esisteva = fs.existsSync(cartellaLog);
const res = () => ({ intestazioni: {}, status(n) { this.codice = n; return this; }, json(b) { this.corpo = b; return this; }, setHeader(k, v) { this.intestazioni[k] = v; } });

test('chatbot-unanswered: 200, riga nei log del server, nessun file scritto @rapido', async () => {
  const righe = []; const orig = console.log; console.log = (...a) => righe.push(a.join(' '));
  const r = res();
  try { handler({ method: 'POST', body: { question: 'Fate corsi di pasticceria a Vittoria?', page: '/all-courses', reason: 'off-topic' } }, r); }
  finally { console.log = orig; }
  expect(r.codice).toBe(200); expect(r.corpo).toEqual({ ok: true });
  expect(righe).toHaveLength(1);
  expect(righe[0]).toMatch(/^\[chatbot-unanswered\] \{.*\}$/);
  const entry = JSON.parse(righe[0].replace('[chatbot-unanswered] ', ''));
  expect(entry).toMatchObject({ question: 'Fate corsi di pasticceria a Vittoria?', page: '/all-courses', reason: 'off-topic' });
  expect(Date.parse(entry.timestamp)).not.toBeNaN();
  expect(fs.existsSync(cartellaLog), 'la rotta non deve creare data/chatbot-log').toBe(esisteva);
});

test('chatbot-unanswered: oscura email e numeri di telefono scritti nella domanda @rapido', async () => {
  const righe = []; const orig = console.log; console.log = (...a) => righe.push(a.join(' '));
  try {
    handler({ method: 'POST', body: { question: 'Scrivetemi a mario.rossi@esempio.it o chiamatemi al +39 333 123 4567 oppure 0932 862613, grazie', reason: 'ai-error' } }, res());
  } finally { console.log = orig; }
  expect(righe[0]).not.toMatch(/mario\.rossi|esempio\.it|333|862613/);
  expect(righe[0]).toContain('[email]'); expect(righe[0]).toContain('[numero]');
  expect(righe[0]).toContain('"reason":"ai-error"');
});

test('chatbot-unanswered: solo POST, domanda obbligatoria, lunghezza limitata @rapido', async () => {
  let r = res(); handler({ method: 'GET' }, r);
  expect(r.codice).toBe(405); expect(r.intestazioni.Allow).toBe('POST');
  r = res(); handler({ method: 'POST', body: { question: '   ' } }, r); expect(r.codice).toBe(400);
  r = res(); handler({ method: 'POST', body: undefined }, r); expect(r.codice).toBe(400);
  const righe = []; const orig = console.log; console.log = (...a) => righe.push(a.join(' '));
  try { handler({ method: 'POST', body: { question: 'a'.repeat(900), page: 'p'.repeat(900), reason: 'qualsiasi' } }, res()); }
  finally { console.log = orig; }
  const e = JSON.parse(righe[0].replace('[chatbot-unanswered] ', ''));
  expect(e.question.length).toBe(500); expect(e.page.length).toBe(200); expect(e.reason).toBe('off-topic');
});
