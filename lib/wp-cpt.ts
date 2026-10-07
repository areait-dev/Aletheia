import { decodeEntities, isWpEnabled, wpGetAll } from './wp';

/**
 * Lettura generica di un CPT "semplice" (faq, sede, partner, scheda…): elenco ordinato per `menu_order`,
 * con memo di pochi secondi (più pagine nello stesso build non rifanno la richiesta) e avviso `[wp]` se
 * WordPress non risponde o non ha contenuti, così l'adattatore può ripiegare sui dati locali.
 * SOLO lato server (getStaticProps / getStaticPaths).
 */

export type WpPost = {
  id: number;
  slug?: string;
  title: { rendered: string };
  content?: { rendered: string };
  menu_order?: number;
  acf?: Record<string, unknown> | unknown[];
};

const MEMO_TTL_MS = 5000;
const memo = new Map<string, { at: number; value: Promise<WpPost[] | null> }>();

async function load(type: string): Promise<WpPost[] | null> {
  try {
    const posts = await wpGetAll<WpPost>(`/wp/v2/${type}?orderby=menu_order&order=asc&_fields=id,slug,title,content,menu_order,acf`);
    if (posts.length > 0) return posts;
    console.warn(`[wp] nessun contenuto "${type}" su WordPress: uso i dati locali`);
  } catch (err) {
    console.warn(`[wp] "${type}" non disponibile da WordPress, uso i dati locali: ${(err as Error).message}`);
  }
  return null;
}

/** Post del tipo richiesto, o `null` se WordPress è spento / vuoto / irraggiungibile (→ ripiego locale). */
export async function getCptPosts(type: string): Promise<WpPost[] | null> {
  if (!isWpEnabled()) return null;
  const hit = memo.get(type);
  if (hit && Date.now() - hit.at <= MEMO_TTL_MS) return hit.value;
  const value = load(type);
  memo.set(type, { at: Date.now(), value });
  return value;
}

/** Campi ACF come oggetto (WP restituisce `[]` quando non ce ne sono). */
export function acfOf(p: WpPost): Record<string, unknown> {
  return p.acf && !Array.isArray(p.acf) ? p.acf : {};
}

export function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export function titleOf(p: WpPost): string {
  return decodeEntities(p.title.rendered);
}

/** Campo immagine ACF (oggetto con `url`, o URL diretto) → URL, stringa vuota se assente. */
export function imageUrl(v: unknown): string {
  if (typeof v === 'string') return v;
  if (v && typeof v === 'object' && typeof (v as { url?: unknown }).url === 'string') return (v as { url: string }).url;
  return '';
}
