// Domande del chatbot senza risposta: vengono scritte nei LOG DEL SERVER (una riga JSON per domanda) e la rotta risponde 200.
// Prima scriveva su data/chatbot-log/unanswered.jsonl con fs.appendFileSync: su Vercel il disco è in sola lettura, quindi
// ogni chiamata in produzione finiva in errore 500.
// I log di Vercel si conservano per poco tempo: NON servono ad analizzare le domande nel tempo. Quando si collegherà il
// foglio Google con l'account di servizio, le domande andranno salvate in una scheda "Domande chatbot" dello stesso foglio
// (vedi MIGRAZIONE.md). Nessun nome né email: la domanda è testo libero, quindi email e numeri di telefono eventualmente
// scritti dall'utente vengono oscurati prima di registrarla.

/** Oscura email e sequenze di cifre lunghe (telefoni, codici fiscali numerici) scritte per errore nella domanda */
function oscuraDatiPersonali(testo) {
  return testo
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[email]')
    .replace(/\+?\d[\d\s().\-/]{5,}\d/g, '[numero]');
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { question, page, reason } = req.body || {};
  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Domanda mancante' });
  }

  const entry = {
    question: oscuraDatiPersonali(question.trim().slice(0, 500)),
    page: typeof page === 'string' ? page.slice(0, 200) : '',
    // 'off-topic': filtro keyword o Gemini ha giudicato la domanda fuori tema.
    // 'ai-error': Gemini non configurato/in errore/timeout (matching locale non trovato).
    reason: reason === 'ai-error' ? 'ai-error' : 'off-topic',
    timestamp: new Date().toISOString(),
  };

  console.log(`[chatbot-unanswered] ${JSON.stringify(entry)}`);
  return res.status(200).json({ ok: true });
}
