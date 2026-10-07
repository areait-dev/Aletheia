/**
 * Client REST per il backend headless WordPress (plugin `wordpress/aletheia-headless`).
 *
 * SOLO lato server (getStaticProps / getStaticPaths / API route): non importarlo da codice client.
 *
 * Interruttore: senza `WP_URL` nell'ambiente `isWpEnabled()` è false e tutte le pagine collegate usano
 * i dati locali (`data/*`, `lib/newsData.js`). Il sito funziona quindi identico a oggi finché WordPress
 * non esiste; quando c'è basta impostare `WP_URL` (vedi `.env.example`), senza toccare il codice.
 */

export const WP_URL = (process.env.WP_URL || '').replace(/\/+$/, '');

export function isWpEnabled(): boolean {
  return WP_URL !== '';
}

/** Secondi di rete di sicurezza per l'ISR: il webhook /api/revalidate è il canale principale. */
export const WP_REVALIDATE_SECONDS = 3600;

/** Da spargere nel risultato di getStaticProps: ISR solo quando WordPress è attivo. */
export function isrOptions(seconds: number = WP_REVALIDATE_SECONDS): { revalidate?: number } {
  return isWpEnabled() ? { revalidate: seconds } : {};
}

export class WpError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = 'WpError';
    this.status = status;
  }
}

type FetchOptions = { timeoutMs?: number };

async function request(path: string, { timeoutMs = 8000 }: FetchOptions = {}): Promise<Response> {
  if (!isWpEnabled()) throw new WpError('WP_URL non impostato');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${WP_URL}/wp-json${path}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) throw new WpError(`WordPress ha risposto ${res.status} su ${path}`, res.status);
    return res;
  } catch (err) {
    if (err instanceof WpError) throw err;
    throw new WpError(`Richiesta a WordPress fallita (${path}): ${(err as Error).message}`);
  } finally {
    clearTimeout(timer);
  }
}

/** GET su `/wp-json<path>` (es. `/wp/v2/news?per_page=100`). */
export async function wpGet<T = unknown>(path: string, options?: FetchOptions): Promise<T> {
  const res = await request(path, options);
  return (await res.json()) as T;
}

/** GET che attraversa tutte le pagine (WP limita per_page a 100): usa l'header X-WP-TotalPages. */
export async function wpGetAll<T = unknown>(path: string, options?: FetchOptions): Promise<T[]> {
  const sep = path.includes('?') ? '&' : '?';
  const out: T[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const res = await request(`${path}${sep}per_page=100&page=${page}`, options);
    out.push(...((await res.json()) as T[]));
    totalPages = Number(res.headers.get('x-wp-totalpages')) || 1;
    page += 1;
  } while (page <= totalPages && page <= 50); // tetto di sicurezza: 5.000 record
  return out;
}

/* ─── Utilità di normalizzazione ─────────────────────────────── */

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', laquo: '«', raquo: '»', euro: '€',
};

/** Decodifica le entità HTML che WordPress mette in title.rendered / excerpt.rendered. */
export function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);
}

/** Da HTML a testo semplice (excerpt, titoli). */
export function htmlToText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** Percorso interno sicuro (niente redirect aperti): accetta solo "/qualcosa", anche se arriva doppiamente codificato. */
export function safeInternalPath(value: unknown): string {
  let path = String(value || '/');
  for (let i = 0; i < 2 && path.includes('%'); i += 1) {
    try {
      path = decodeURIComponent(path);
    } catch {
      break;
    }
  }
  if (!path.startsWith('/') || path.startsWith('//') || /[\\\s]/.test(path) || path.includes('://')) return '/';
  return path;
}
