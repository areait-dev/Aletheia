import { CALENDARIO } from '../data/calendario';
import type { CategoriaCorso, CorsoCalendario } from '../data/calendario';
import { decodeEntities, isWpEnabled, wpGetAll } from './wp';

/**
 * Calendario corsi: sorgente WordPress (CPT `edizione_corso`) con ripiego sui dati locali.
 * Restituisce lo stesso formato `CorsoCalendario` di data/calendario.ts, quindi le pagine non cambiano.
 * SOLO lato server (getStaticProps).
 *
 * Mappatura in WordPress: ogni edizione punta a un `corso` (campo ACF `corso`); slug, titolo e categoria
 * (tassonomia `categoria_corso`, anche tramite il termine padre) arrivano dal corso.
 */

type WpAcf = Record<string, unknown>;

type WpEdizione = {
  id: number;
  title?: { rendered: string };
  categoria_corso?: number[];
  acf?: WpAcf | unknown[];
};

type WpCorsoLight = { id: number; slug: string; title: { rendered: string }; categoria_corso?: number[] };
type WpTerm = { id: number; slug: string; parent: number };

/**
 * Slug dei termini di `categoria_corso` → categoria del calendario. Usata solo se l'edizione non ha il campo
 * esplicito `categoria`. Segue la mappatura documentata in data/calendario.ts: le categorie di catalogo della
 * formazione obbligatoria (sicurezza, attrezzature, fitosanitario, alimentare) confluiscono in 'obbligatoria'.
 */
const CATEGORIA_BY_TERM: Record<string, CategoriaCorso> = {
  obbligatoria: 'obbligatoria',
  'sicurezza-lavoro': 'obbligatoria',
  'decreto-attrezzature': 'obbligatoria',
  fitosanitario: 'obbligatoria',
  'sicurezza-alimentare': 'obbligatoria',
  regionale: 'regionale-fse',
  'regionale-fse': 'regionale-fse',
  professionale: 'professionale',
  digitali: 'professionale',
  ecm: 'ecm',
};

const CATEGORIE_VALIDE: CategoriaCorso[] = ['obbligatoria', 'regionale-fse', 'professionale', 'ecm'];

/** Accetta Y-m-d (formato impostato nel campo ACF), YYYYMMDD e d/m/Y. Restituisce '' se non valida. */
export function normalizeDate(value: unknown): string {
  const s = String(value ?? '').trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /^(\d{4})(\d{2})(\d{2})$/.exec(s);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  return '';
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function categoriaFromTerms(termIds: number[], terms: Map<number, WpTerm>): CategoriaCorso | null {
  for (const id of termIds) {
    // si risale ai termini padre: una sotto-categoria eredita la categoria del padre
    for (let t = terms.get(id), guard = 0; t && guard < 5; t = terms.get(t.parent), guard += 1) {
      const found = CATEGORIA_BY_TERM[t.slug];
      if (found) return found;
    }
  }
  return null;
}

export function fromWpEdizione(
  p: WpEdizione,
  corsi: Map<number, WpCorsoLight>,
  terms: Map<number, WpTerm>,
): CorsoCalendario | null {
  const acf = p.acf && !Array.isArray(p.acf) ? p.acf : {};
  const corso = corsi.get(Number(acf.corso));
  const data = normalizeDate(acf.data);
  if (!corso || !data) return null; // edizione senza corso o senza data: non è pubblicabile

  const posti = num(acf.posti);
  const postiDisponibili = acf.posti_disponibili === '' || acf.posti_disponibili == null ? posti : num(acf.posti_disponibili);
  const relatore = str(acf.relatore);
  const crediti = num(acf.crediti_ecm);
  const esplicita = str(acf.categoria) as CategoriaCorso;
  const categoria =
    (CATEGORIE_VALIDE.includes(esplicita) ? esplicita : null) ??
    categoriaFromTerms(p.categoria_corso ?? [], terms) ??
    categoriaFromTerms(corso.categoria_corso ?? [], terms) ??
    'professionale';

  return {
    id: p.id,
    titolo: decodeEntities(corso.title.rendered),
    slug: corso.slug,
    categoria,
    data,
    orario: str(acf.orario),
    sede: str(acf.sede),
    durata: str(acf.durata),
    posti,
    postiDisponibili: Math.min(postiDisponibili, posti || postiDisponibili),
    ...(relatore ? { relatore } : {}),
    ...(crediti > 0 ? { creditiEcm: crediti } : {}),
  };
}

// Stesso criterio delle news: il TTL breve evita di servire dati vecchi dopo un webhook.
const MEMO_TTL_MS = 5000;
let memo: { at: number; value: Promise<CorsoCalendario[]> } | null = null;

async function loadCalendario(): Promise<CorsoCalendario[]> {
  try {
    const [edizioni, corsiRaw, termsRaw] = await Promise.all([
      wpGetAll<WpEdizione>('/wp/v2/edizione_corso?_fields=id,title,categoria_corso,acf'),
      wpGetAll<WpCorsoLight>('/wp/v2/corso?_fields=id,slug,title,categoria_corso'),
      wpGetAll<WpTerm>('/wp/v2/categoria_corso?_fields=id,slug,parent'),
    ]);
    const corsi = new Map(corsiRaw.map((c) => [c.id, c]));
    const terms = new Map(termsRaw.map((t) => [t.id, t]));
    const items = edizioni.map((e) => fromWpEdizione(e, corsi, terms)).filter((x): x is CorsoCalendario => x !== null);
    if (items.length > 0) return items.sort((a, b) => a.data.localeCompare(b.data) || a.id - b.id);
    console.warn('[wp] nessuna edizione di corso valida su WordPress: uso il calendario locale');
  } catch (err) {
    console.warn(`[wp] calendario non disponibile da WordPress, uso i dati locali: ${(err as Error).message}`);
  }
  return CALENDARIO;
}

/** Tutte le edizioni (WordPress se attivo, altrimenti dati locali). */
export async function getCalendario(): Promise<CorsoCalendario[]> {
  if (!isWpEnabled()) return CALENDARIO;
  if (!memo || Date.now() - memo.at > MEMO_TTL_MS) memo = { at: Date.now(), value: loadCalendario() };
  return memo.value;
}

export type GiornoCalendario = { data: string; corsi: CorsoCalendario[] };

function groupByDay(corsi: CorsoCalendario[], maxDays: number): GiornoCalendario[] {
  return Array.from(new Set(corsi.map((c) => c.data)))
    .slice(0, maxDays)
    .map((data) => ({ data, corsi: corsi.filter((c) => c.data === data) }));
}

/** Prossimi giorni con corsi a partire da oggi (home "Corsi in partenza"). `oggi` = YYYY-MM-DD. */
export function upcomingDays(calendario: CorsoCalendario[], oggi: string, maxDays = 10): GiornoCalendario[] {
  const ordinati = calendario.filter((c) => c.data >= oggi).sort((a, b) => a.data.localeCompare(b.data));
  return groupByDay(ordinati, maxDays);
}

/** Giorni con corsi di una categoria (pagina Formazione obbligatoria): come prima, senza filtro sulla data. */
export function daysByCategory(calendario: CorsoCalendario[], categoria: CategoriaCorso, maxDays = 8): GiornoCalendario[] {
  const ordinati = calendario.filter((c) => c.categoria === categoria).sort((a, b) => a.data.localeCompare(b.data));
  return groupByDay(ordinati, maxDays);
}
