import fs from 'fs';
import path from 'path';

// Log locale, semplice e persistente delle domande del chatbot senza risposta:
// una riga JSON per domanda, così da poterle rivedere periodicamente e capire
// quali contenuti/FAQ mancano. Nessun servizio email è ancora configurato nel
// progetto (FormAzienda/FormCandidato simulano l'invio lato client), quindi si
// evita di aggiungere una nuova dipendenza solo per questo.
const LOG_DIR = path.join(process.cwd(), 'data', 'chatbot-log');
const LOG_FILE = path.join(LOG_DIR, 'unanswered.jsonl');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { question, page } = req.body || {};
  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Domanda mancante' });
  }

  const entry = {
    question: question.trim().slice(0, 500),
    page: typeof page === 'string' ? page.slice(0, 200) : '',
    timestamp: new Date().toISOString(),
  };

  try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.appendFileSync(LOG_FILE, `${JSON.stringify(entry)}\n`);
  } catch (err) {
    console.error('chatbot-unanswered: impossibile scrivere il log', err);
    return res.status(500).json({ error: 'Impossibile salvare la domanda' });
  }

  return res.status(200).json({ ok: true });
}
