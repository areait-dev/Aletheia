// Endpoint server-side che genera una risposta con Gemini quando il matching a
// keyword locale (findBestAnswer, in Chatbot.tsx) non trova nulla. La chiave API
// resta solo lato server (GEMINI_API_KEY), mai esposta al client.
const GEMINI_MODEL = 'gemini-3.5-flash-lite';
const GEMINI_TIMEOUT_MS = 8000;

// Rifiuto esplicito che il modello deve restituire quando la domanda, pur avendo
// superato il filtro keyword lato client, non è realmente in tema col sito.
const OUT_OF_SCOPE_REPLY =
  'Posso aiutarti solo con argomenti relativi a corsi, formazione e lavoro di Alètheia. Per altre richieste contattaci al +39 0932 862613 o info@aletheiasrl.it.';

function buildSystemPrompt(faqs) {
  const faqText = faqs
    .map((f) => `D: ${f.q}\nR: ${f.a}`)
    .join('\n\n');

  return `Sei l'assistente virtuale del sito di Alètheia S.r.l., ente di formazione professionale e agenzia per il lavoro a Vittoria (RG), Sicilia.

Di seguito trovi le FAQ ufficiali del sito, da usare come base di conoscenza:

${faqText}

Regole obbligatorie:
- Rispondi ESCLUSIVAMENTE su argomenti presenti nelle FAQ sopra o strettamente correlati (formazione, corsi, agenzia per il lavoro, servizi Alètheia).
- Non rispondere mai a domande di cultura generale, attualità, meteo, intrattenimento o qualsiasi cosa non attinente al sito, anche se la domanda contiene un termine ambiguo. In quel caso rispondi esattamente con: "${OUT_OF_SCOPE_REPLY}"
- Non inventare mai prezzi, scadenze di bandi, o dati specifici di corso non presenti nelle FAQ fornite.
- Per richieste non coperte dalle FAQ, rimanda sempre a telefono (+39 0932 862613) ed email (info@aletheiasrl.it).
- Rispondi sempre in italiano, con tono professionale e conciso (massimo 3-4 frasi).`;
}

// Sotto carico Gemini risponde spesso con 503 "high demand" per pochi istanti:
// un singolo retry silenzioso, entro il budget di GEMINI_TIMEOUT_MS totale,
// evita di scaricare sul fallback contatti domande che al secondo tentativo
// andrebbero a buon fine.
const GEMINI_RETRY_DELAY_MS = 400;

async function requestGemini(apiKey, systemPrompt, question, signal) {
  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: question }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 300 },
      }),
    }
  );

  if (!resp.ok) {
    const err = new Error(`Gemini API error: ${resp.status}`);
    err.status = resp.status;
    throw err;
  }

  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Risposta Gemini vuota');
  }
  return text.trim();
}

async function callGemini(apiKey, systemPrompt, question) {
  const deadline = Date.now() + GEMINI_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    try {
      return await requestGemini(apiKey, systemPrompt, question, controller.signal);
    } catch (err) {
      const remaining = deadline - Date.now();
      const canRetry = err?.status === 503 && remaining > GEMINI_RETRY_DELAY_MS + 500;
      if (!canRetry) throw err;

      await new Promise((r) => setTimeout(r, GEMINI_RETRY_DELAY_MS));
      return await requestGemini(apiKey, systemPrompt, question, controller.signal);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { question, page, faqs } = req.body || {};
  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Domanda mancante' });
  }
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return res.status(400).json({ error: 'FAQ mancanti' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Nessuna chiave configurata: degrada pulito, il client mostrerà il fallback contatti.
    return res.status(503).json({ error: 'Servizio AI non configurato', reason: 'ai-error' });
  }

  try {
    const systemPrompt = buildSystemPrompt(faqs);
    const answer = await callGemini(apiKey, systemPrompt, question.trim());

    if (answer === OUT_OF_SCOPE_REPLY || answer.includes(OUT_OF_SCOPE_REPLY)) {
      return res.status(200).json({ pertinent: false, reason: 'off-topic' });
    }

    return res.status(200).json({ pertinent: true, answer });
  } catch (err) {
    console.error('chatbot-ai: errore chiamata Gemini', err?.message || err);
    return res.status(502).json({ error: 'Errore nella generazione della risposta', reason: 'ai-error' });
  }
}
