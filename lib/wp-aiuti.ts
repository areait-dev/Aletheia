import aiuti2023 from '../data/content/aiuti-di-stato/2023';
import aiuti2024 from '../data/content/aiuti-di-stato/2024';
import { decodeEntities, isWpEnabled, wpGetAll } from './wp';
import { normalizeDate } from './wp-calendario';

/**
 * Aiuti di Stato (obblighi di pubblicazione): sorgente WordPress (CPT `aiuto_stato`, una riga = un post)
 * con ripiego sui dati locali. Le righe si raggruppano per ente come prima (`pages/aiuti-di-stato/[anno].js`).
 * SOLO lato server (getStaticProps / getStaticPaths).
 *
 * Limite: i `paragrafiFinali` (testo di chiusura della pagina) non hanno un campo in WordPress e restano
 * nei file locali; per un anno nuovo creato solo in WP la pagina li omette.
 */

export type RigaAiuto = { data: string; importo: string; titolo: string; cup: string };
export type EnteAiuti = { ente: string; righe: RigaAiuto[] };
export type AiutiAnno = { anno: number; enti: EnteAiuti[]; paragrafiFinali: string[] };

type WpRiga = {
  id: number;
  title: { rendered: string };
  menu_order?: number;
  acf?: Record<string, unknown> | unknown[];
};

const LOCAL: Record<string, AiutiAnno> = {
  '2023': aiuti2023 as AiutiAnno,
  '2024': aiuti2024 as AiutiAnno,
};

/** 'YYYY-MM-DD' → 'DD/MM/YYYY' (formato delle pagine); stringa vuota se la data non è valida. */
function toItDate(value: unknown): string {
  const iso = normalizeDate(value);
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

type Parsed = { anno: number; ente: string; order: number; iso: string; riga: RigaAiuto };

function parseRiga(p: WpRiga): Parsed | null {
  const acf = p.acf && !Array.isArray(p.acf) ? p.acf : {};
  const anno = Number(acf.anno);
  const ente = str(acf.ente);
  if (!Number.isInteger(anno) || anno < 2000 || !ente) return null;
  return {
    anno,
    ente,
    order: p.menu_order ?? 0,
    iso: normalizeDate(acf.data),
    riga: { data: toItDate(acf.data), importo: str(acf.importo), titolo: decodeEntities(p.title.rendered), cup: str(acf.cup) },
  };
}

/** Raggruppa per ente mantenendo l'ordine di prima comparsa (ordine pagina, poi data). */
function groupByEnte(rows: Parsed[]): EnteAiuti[] {
  const sorted = [...rows].sort((a, b) => a.order - b.order || a.iso.localeCompare(b.iso));
  const enti: EnteAiuti[] = [];
  for (const r of sorted) {
    const found = enti.find((e) => e.ente === r.ente);
    if (found) found.righe.push(r.riga);
    else enti.push({ ente: r.ente, righe: [r.riga] });
  }
  return enti;
}

const MEMO_TTL_MS = 5000;
let memo: { at: number; value: Promise<Parsed[]> } | null = null;

async function loadRows(): Promise<Parsed[] | null> {
  try {
    const posts = await wpGetAll<WpRiga>('/wp/v2/aiuto_stato?_fields=id,title,menu_order,acf');
    const rows = posts.map(parseRiga).filter((r): r is Parsed => r !== null);
    if (rows.length > 0) return rows;
    console.warn('[wp] nessuna riga di aiuti di Stato su WordPress: uso i dati locali');
  } catch (err) {
    console.warn(`[wp] aiuti di Stato non disponibili da WordPress, uso i dati locali: ${(err as Error).message}`);
  }
  return null;
}

async function getRows(): Promise<Parsed[] | null> {
  if (!isWpEnabled()) return null;
  if (!memo || Date.now() - memo.at > MEMO_TTL_MS) memo = { at: Date.now(), value: loadRows() as Promise<Parsed[]> };
  return memo.value;
}

/** Anni con pagina: quelli presenti su WordPress più i locali, dal più vecchio al più recente. */
export async function getAiutiAnni(): Promise<string[]> {
  const rows = await getRows();
  const anni = new Set(Object.keys(LOCAL));
  (rows ?? []).forEach((r) => anni.add(String(r.anno)));
  return Array.from(anni).sort();
}

export async function getAiutiAnno(anno: string): Promise<AiutiAnno | null> {
  const local = LOCAL[anno] ?? null;
  const rows = (await getRows())?.filter((r) => String(r.anno) === anno) ?? [];
  if (rows.length === 0) return local;
  return { anno: Number(anno), enti: groupByEnte(rows), paragrafiFinali: local?.paragrafiFinali ?? [] };
}
