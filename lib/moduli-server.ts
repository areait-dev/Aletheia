// Invio dei moduli del sito (solo server). Una rotta per modulo in pages/api/moduli/<tipo>.ts, tutte con questa logica:
//   1. solo POST, corpo multipart (campi + eventuale allegato), massimo 4 MB di file
//   2. antispam: campo-trappola (honeypot), tempo minimo di compilazione, limite di invii per IP
//   3. validazione completa lato server (stesse regole del browser: lib/moduli.ts)
//   4. senza RESEND_API_KEY NON si simula l'invio: risposta 503 "senza-chiave" e riga nei log del server
//   5. con la chiave: email via API REST di Resend (fetch, nessuna dipendenza), Reply-To sull'email di chi scrive
// Variabili d'ambiente (mai nel codice): RESEND_API_KEY, MAIL_FROM, MAIL_TO (default info@aletheiasrl.it).
// RESEND_API_URL serve solo ai test (server finto) e viene IGNORATA quando NODE_ENV è 'production'.
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CAMPO_TRAPPOLA, DEFINIZIONI, EMAIL_INFO, MAX_ALLEGATO, MSG_ALLEGATO_GRANDE, TEMPO_MINIMO_MS,
  estensione, normalizza, oggettoEmail, riepilogo, validaAllegato, validaModulo,
} from './moduli';
import type { Dati, TipoModulo } from './moduli';

const RESEND_URL_PREDEFINITO = 'https://api.resend.com';
/** Corpo massimo accettato: allegato + testo dei campi. Resta sotto i 4,5 MB che Vercel concede alle funzioni. */
const MAX_CORPO = MAX_ALLEGATO + 400 * 1024;
const FINESTRA_MS = 10 * 60 * 1000;
const MAX_INVII = 3;
const TIMEOUT_RESEND_MS = 10_000;

// ── Limite di invii per IP ───────────────────────────────────────────────────────────────────────────
// In memoria: su Vercel ogni istanza serverless ha il suo registro, quindi il limite è un freno parziale, non una garanzia.
// Se arrivasse spam: Cloudflare Turnstile oppure un limite persistente (vedi MIGRAZIONE.md, "Checklist lancio moduli").
const registro = new Map<string, number[]>();

/** Registra un tentativo di invio. false = IP oltre il limite (3 invii ogni 10 minuti). */
export function consumaInvio(ip: string, adesso: number = Date.now()): boolean {
  const recenti = (registro.get(ip) || []).filter((t) => adesso - t < FINESTRA_MS);
  if (recenti.length >= MAX_INVII) { registro.set(ip, recenti); return false; }
  recenti.push(adesso);
  registro.set(ip, recenti);
  if (registro.size > 2000) registro.forEach((v, k) => { if (v.every((t) => adesso - t >= FINESTRA_MS)) registro.delete(k); });
  return true;
}
/** Un invio non riuscito per colpa nostra (Resend, configurazione) non deve consumare il limite di chi scrive */
function restituisciInvio(ip: string) { const v = registro.get(ip); if (v) v.pop(); }
export function azzeraLimiti() { registro.clear(); }

function ipDi(req: NextApiRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const primo = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim();
  const reale = req.headers['x-real-ip'];
  return primo || (Array.isArray(reale) ? reale[0] : reale) || req.socket?.remoteAddress || 'sconosciuto';
}

// ── Lettura del corpo multipart ──────────────────────────────────────────────────────────────────────
class CorpoTroppoGrande extends Error {}

async function leggiForm(req: NextApiRequest): Promise<FormData> {
  const dichiarata = Number(req.headers['content-length'] || 0);
  if (dichiarata > MAX_CORPO) throw new CorpoTroppoGrande();
  const pezzi: Buffer[] = [];
  await new Promise<void>((ok, ko) => {
    let letti = 0;
    req.on('data', (pezzo: Buffer | string) => {
      const b = typeof pezzo === 'string' ? Buffer.from(pezzo) : pezzo;
      letti += b.length;
      if (letti > MAX_CORPO) { req.removeAllListeners('data'); ko(new CorpoTroppoGrande()); return; }
      pezzi.push(b);
    });
    req.on('end', () => ok());
    req.on('error', ko);
  });
  const tipoContenuto = String(req.headers['content-type'] || '');
  if (!/^multipart\/form-data/i.test(tipoContenuto)) throw new Error('corpo non multipart');
  // Il parser multipart è quello standard (undici) esposto da Request: nessuna libreria da aggiungere.
  return new Request('http://localhost/', { method: 'POST', headers: { 'content-type': tipoContenuto }, body: new Uint8Array(Buffer.concat(pezzi)) }).formData();
}

// ── Allegato ─────────────────────────────────────────────────────────────────────────────────────────
interface Allegato { nome: string; contenuto: Buffer }

/** Firme dei formati ammessi: l'estensione da sola non basta (un .pdf può essere altro) */
function firmaCorrisponde(ext: string, b: Buffer): boolean {
  const inizia = (...byte: number[]) => byte.every((x, i) => b[i] === x);
  if (ext === 'pdf') return inizia(0x25, 0x50, 0x44, 0x46); // %PDF
  if (ext === 'doc') return inizia(0xd0, 0xcf, 0x11, 0xe0); // contenitore OLE
  if (ext === 'docx') return inizia(0x50, 0x4b, 0x03, 0x04); // zip
  if (ext === 'jpg' || ext === 'jpeg') return inizia(0xff, 0xd8, 0xff);
  if (ext === 'png') return inizia(0x89, 0x50, 0x4e, 0x47);
  return false;
}

function nomeFileSicuro(nome: string): string {
  const base = nome.split(/[\\/]/).pop() || 'allegato';
  return base.replace(/[^\w.\- ()àèéìòù]/gi, '_').slice(0, 100) || 'allegato';
}

// ── Email ────────────────────────────────────────────────────────────────────────────────────────────
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function componiEmail(tipo: TipoModulo, dati: Dati, allegato: Allegato | null) {
  const righe = riepilogo(tipo, dati);
  const titolo = DEFINIZIONI[tipo].titolo;
  const quando = new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Rome' }).format(new Date());
  const testo = [titolo, '', ...righe.map((r) => `${r.etichetta}: ${r.valore}`), allegato ? `Allegato: ${allegato.nome}` : '', '', `Ricevuto dal sito il ${quando}. Rispondi a questa email per scrivere a chi ha compilato il modulo.`]
    .filter((r, i, a) => !(r === '' && a[i - 1] === ''))
    .join('\n');
  const celle = righe
    .map((r) => `<tr><td style="padding:6px 14px 6px 0;color:#475569;vertical-align:top;white-space:nowrap">${esc(r.etichetta)}</td><td style="padding:6px 0;color:#0f172a;white-space:pre-wrap">${esc(r.valore)}</td></tr>`)
    .join('');
  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#0f172a">` +
    `<h2 style="margin:0 0 14px;font-size:18px">${esc(titolo)}</h2>` +
    `<table style="border-collapse:collapse">${celle}</table>` +
    (allegato ? `<p style="margin:14px 0 0"><strong>Allegato:</strong> ${esc(allegato.nome)}</p>` : '') +
    `<p style="margin:18px 0 0;color:#64748b;font-size:13px">Ricevuto dal sito il ${esc(quando)}. Rispondi a questa email per scrivere a chi ha compilato il modulo.</p></div>`;
  return { testo, html };
}

interface EsitoResend { ok: boolean; motivo?: string }

async function inviaConResend(p: {
  chiave: string; urlBase: string; da: string; a: string[]; replyTo?: string; oggetto: string; testo: string; html: string; allegato: Allegato | null;
}): Promise<EsitoResend> {
  const corpo: Record<string, unknown> = { from: p.da, to: p.a, subject: p.oggetto, text: p.testo, html: p.html };
  if (p.replyTo) corpo.reply_to = p.replyTo;
  if (p.allegato) corpo.attachments = [{ filename: p.allegato.nome, content: p.allegato.contenuto.toString('base64') }];
  try {
    const r = await fetch(`${p.urlBase}/emails`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${p.chiave}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(TIMEOUT_RESEND_MS),
    });
    if (r.ok) return { ok: true };
    let dettaglio = '';
    try { const j = await r.json(); dettaglio = String(j?.message || j?.name || ''); } catch { /* corpo non JSON */ }
    return { ok: false, motivo: `Resend ha risposto ${r.status}${dettaglio ? `: ${dettaglio}` : ''}` };
  } catch (e) {
    return { ok: false, motivo: `chiamata a Resend non riuscita (${e instanceof Error ? e.name : 'errore'})` };
  }
}

// ── Rotta ────────────────────────────────────────────────────────────────────────────────────────────
type Risposta = { stato: 'ok' } | { stato: 'errori'; errori: Record<string, string> } | { stato: 'senza-chiave' } | { stato: 'errore' } | { stato: 'limite'; messaggio: string };

export function creaRotta(tipo: TipoModulo) {
  const def = DEFINIZIONI[tipo];
  return async function handler(req: NextApiRequest, res: NextApiResponse<Risposta>) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ stato: 'errore' }); }

    const destinatario = process.env.MAIL_TO?.trim() || EMAIL_INFO;
    let form: FormData;
    try {
      form = await leggiForm(req);
    } catch (e) {
      if (e instanceof CorpoTroppoGrande) return res.status(413).json({ stato: 'errori', errori: { allegato: MSG_ALLEGATO_GRANDE(destinatario) } });
      return res.status(400).json({ stato: 'errore' });
    }

    const valori: Record<string, string> = {};
    const caricati: File[] = [];
    form.forEach((v, k) => {
      if (typeof v === 'string') valori[k] = v;
      else if (k === 'allegato' && v.size > 0) caricati.push(v);
    });
    const file: File | undefined = caricati[0];

    // Antispam 1: il campo-trappola è nascosto agli utenti. Se è pieno, risposta di successo finta e nessuna email.
    if (valori[CAMPO_TRAPPOLA]) {
      console.warn(`[moduli] ${tipo}: scartato (campo-trappola compilato)`);
      return res.status(200).json({ stato: 'ok' });
    }
    // Antispam 2: tempo di compilazione (misurato dal browser in millisecondi, indipendente dall'orologio). Un utente vero può riprovare.
    const tempo = Number(valori.tempo);
    if (!Number.isFinite(tempo) || tempo < TEMPO_MINIMO_MS) {
      return res.status(429).json({ stato: 'limite', messaggio: 'Hai inviato il modulo troppo in fretta. Attendi qualche secondo e riprova.' });
    }

    // Validazione completa
    const errori = validaModulo(tipo, valori);
    let allegato: Allegato | null = null;
    if (file && def.allegato) {
      const f: File = file;
      const msg = validaAllegato(tipo, { name: f.name, size: f.size }, destinatario);
      if (msg) errori.allegato = msg;
      else {
        const contenuto = Buffer.from(await f.arrayBuffer());
        if (!firmaCorrisponde(estensione(f.name), contenuto)) errori.allegato = 'Il contenuto del file non corrisponde al formato indicato';
        else allegato = { nome: nomeFileSicuro(f.name), contenuto };
      }
    }
    if (Object.keys(errori).length) return res.status(400).json({ stato: 'errori', errori });

    // Antispam 3: limite di invii per IP (dopo la validazione, così correggere un errore non consuma il limite)
    const ip = ipDi(req);
    if (!consumaInvio(ip)) {
      return res.status(429).json({ stato: 'limite', messaggio: 'Hai già inviato più richieste di recente. Riprova tra qualche minuto oppure contattaci per telefono.' });
    }

    const dati = normalizza(tipo, valori);
    const oggetto = oggettoEmail(tipo, valori);

    // Senza chiave NON si simula nulla: lo dice il server, il browser mostra il mailto di ripiego.
    const chiave = process.env.RESEND_API_KEY?.trim();
    if (!chiave) {
      restituisciInvio(ip);
      console.warn(`[moduli] ${tipo}: RESEND_API_KEY non impostata, richiesta NON inviata (oggetto: "${oggetto}")`);
      return res.status(503).json({ stato: 'senza-chiave' });
    }
    const da = process.env.MAIL_FROM?.trim();
    if (!da) {
      restituisciInvio(ip);
      console.error(`[moduli] ${tipo}: MAIL_FROM non impostata, richiesta NON inviata (oggetto: "${oggetto}")`);
      return res.status(502).json({ stato: 'errore' });
    }
    // RESEND_API_URL è per i test: in produzione si usa sempre l'indirizzo reale di Resend.
    const urlBase = process.env.NODE_ENV !== 'production' && process.env.RESEND_API_URL ? process.env.RESEND_API_URL.replace(/\/+$/, '') : RESEND_URL_PREDEFINITO;

    const { testo, html } = componiEmail(tipo, dati, allegato);
    const esito = await inviaConResend({
      chiave, urlBase, da, a: destinatario.split(',').map((s) => s.trim()).filter(Boolean),
      replyTo: dati.email || undefined, oggetto, testo, html, allegato,
    });
    if (!esito.ok) {
      restituisciInvio(ip);
      console.error(`[moduli] ${tipo}: invio NON riuscito, ${esito.motivo} (oggetto: "${oggetto}")`);
      return res.status(502).json({ stato: 'errore' });
    }
    return res.status(200).json({ stato: 'ok' });
  };
}
