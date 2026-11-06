import crypto from 'node:crypto';

/**
 * Lettura (solo lettura) di un foglio Google tramite account di servizio. SOLO lato server (getStaticProps): nessuna libreria,
 * il JWT si firma con node:crypto e si scambia per un token OAuth.
 *
 * Variabili d'ambiente (Vercel Production e Preview, e .env.local in locale):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  email dell'account di servizio (il foglio è condiviso con lui come Visualizzatore)
 *   GOOGLE_PRIVATE_KEY            chiave privata del JSON, su una riga con i \n letterali (qui diventano veri a capo); le virgolette esterne si tolgono
 *   GOOGLE_SHEET_ID               ID del foglio (la parte dell'URL tra /d/ e /edit)
 *
 * SICUREZZA: la chiave, il token e l'email non finiscono mai in un messaggio d'errore né in un log. Gli errori riportano solo lo stato HTTP e
 * il codice di errore pubblico di Google (es. 403 PERMISSION_DENIED).
 */

const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const TIMEOUT_MS = 10_000;

function credenziali() {
  const email = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '').trim();
  const sheetId = (process.env.GOOGLE_SHEET_ID || '').trim();
  let chiave = (process.env.GOOGLE_PRIVATE_KEY || '').trim();
  if (chiave.startsWith('"') && chiave.endsWith('"')) chiave = chiave.slice(1, -1);
  chiave = chiave.replace(/\\n/g, '\n'); // i \n letterali del JSON diventano veri a capo
  return { email, sheetId, chiave };
}

/** true se le tre variabili sono impostate (non controlla che siano valide). */
export function foglioGoogleConfigurato(): boolean {
  const { email, sheetId, chiave } = credenziali();
  return Boolean(email && sheetId && chiave);
}

const b64 = (v: string | object) => Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url');

/** Errore "sicuro": il testo non contiene mai dati delle credenziali. */
class ErroreFoglio extends Error {}

let token: { valore: string; scade: number } | null = null;

async function accessToken(): Promise<string> {
  if (token && Date.now() < token.scade) return token.valore;
  const { email, chiave } = credenziali();
  let assertion: string;
  try {
    const ora = Math.floor(Date.now() / 1000);
    const head = b64({ alg: 'RS256', typ: 'JWT' });
    const claim = b64({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: ora, exp: ora + 3000 });
    const firma = crypto.createSign('RSA-SHA256').update(`${head}.${claim}`).sign(chiave, 'base64url');
    assertion = `${head}.${claim}.${firma}`;
  } catch {
    // il messaggio originale di OpenSSL non contiene la chiave, ma meglio non rischiare: testo fisso
    throw new ErroreFoglio('chiave privata non valida (controlla GOOGLE_PRIVATE_KEY: una riga, \\n letterali)');
  }
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const j = (await r.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string };
  if (!r.ok || !j.access_token) throw new ErroreFoglio(`autenticazione Google rifiutata (${r.status} ${typeof j.error === 'string' ? j.error : 'errore'})`);
  token = { valore: j.access_token, scade: Date.now() + Math.max(60, (j.expires_in || 3600) - 120) * 1000 };
  return token.valore;
}

/**
 * Righe di una scheda del foglio, come testo così com'è mostrato (le date arrivano come "17/11/2026"). La prima riga è l'intestazione.
 * Le righe finali vuote vengono tolte; le celle mancanti in fondo a una riga restano assenti (usare `?? ''`).
 */
export async function leggiScheda(nomeScheda: string): Promise<string[][]> {
  const { sheetId } = credenziali();
  const t = await accessToken();
  const range = encodeURIComponent(`'${nomeScheda.replace(/'/g, "''")}'`);
  const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${range}?valueRenderOption=FORMATTED_VALUE`, {
    headers: { authorization: `Bearer ${t}` },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const j = (await r.json().catch(() => ({}))) as { values?: string[][]; error?: { code?: number; status?: string } };
  if (!r.ok) throw new ErroreFoglio(`lettura del foglio rifiutata (${r.status} ${j.error?.status || 'errore'})`);
  const righe = (j.values || []).map((riga) => riga.map((c) => String(c ?? '')));
  while (righe.length && righe[righe.length - 1].every((c) => c.trim() === '')) righe.pop();
  return righe;
}

/** Messaggio da mettere nei log: mai altro che il testo degli errori "sicuri" di questo modulo, o un testo generico. */
export function descriviErroreFoglio(err: unknown): string {
  return err instanceof ErroreFoglio ? err.message : 'errore di rete o risposta non valida';
}
