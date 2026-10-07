import { coursesData } from '../data/coursesRaw';
import { decodeEntities, isWpEnabled, wpGetAll } from './wp';

/**
 * Catalogo corsi: sorgente WordPress (CPT `corso` + tassonomia gerarchica `categoria_corso`) con ripiego
 * sui dati locali. Restituisce lo stesso formato di `coursesData` (data/coursesRaw.js), quindi
 * `buildCourseFamilies()` e le pagine del catalogo non cambiano. SOLO lato server.
 *
 * Mappatura:
 *   categoryKey / category = termine RADICE di `categoria_corso` (slug / nome)
 *   subKey                 = termine FOGLIA (slug); coincide con categoryKey se il corso sta solo in radice
 *   badge, provider, status, gradient, meta, price = campi ACF (vedi wordpress/README.md)
 *
 * Limite: il contenuto editoriale del dettaglio (data/content/*, coursesDetails, EDITORIAL_CONTENT in
 * pages/all-courses/[slug].js) resta nel codice, indicizzato per slug di famiglia: un corso nato solo in
 * WordPress compare nel catalogo e ha la sua pagina con il template generico.
 */

export type CourseMeta = { icon: string; text: string };
export type CoursePrice = { label: string; amount: number };
export type CourseRaw = {
  slug: string;
  subKey: string | null;
  title: string;
  category: string;
  categoryKey: string;
  badge: string;
  provider: string;
  meta: CourseMeta[];
  status: string;
  gradient: string;
  image: string | null;
  price: CoursePrice[] | null;
};

type WpAcf = Record<string, unknown>;

type WpCorso = {
  id: number;
  slug: string;
  title: { rendered: string };
  categoria_corso?: number[];
  acf?: WpAcf | unknown[];
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
};

type WpTerm = { id: number; slug: string; name: string; parent: number };

const LOCAL = coursesData as unknown as CourseRaw[];

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

/** Righe "a|b|c" di un campo textarea ACF (una voce per riga, righe vuote ignorate). */
export function parseLines(v: unknown): string[][] {
  return str(v)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.split('|').map((c) => c.trim()));
}

function chain(termId: number, terms: Map<number, WpTerm>): WpTerm[] {
  const out: WpTerm[] = [];
  for (let t = terms.get(termId), guard = 0; t && guard < 6; t = terms.get(t.parent), guard += 1) out.push(t);
  return out; // dalla foglia alla radice
}

export function fromWpCorso(p: WpCorso, terms: Map<number, WpTerm>): CourseRaw | null {
  const acf = p.acf && !Array.isArray(p.acf) ? p.acf : {};

  // Foglia = il termine assegnato con la catena più profonda; radice = ultimo elemento della catena.
  const chains = (p.categoria_corso ?? []).map((id) => chain(id, terms)).filter((c) => c.length > 0);
  if (chains.length === 0) return null; // senza categoria non si può collocare nel catalogo
  const best = chains.reduce((a, b) => (b.length > a.length ? b : a));
  const leaf = best[0];
  const root = best[best.length - 1];

  const meta: CourseMeta[] = parseLines(acf.meta_card)
    .filter((c) => c[1])
    .map(([icon, ...rest]) => ({ icon, text: rest.join('|') }));
  const ore = Number(acf.durata_ore);
  if (meta.length === 0 && Number.isFinite(ore) && ore > 0) {
    meta.push({ icon: str(acf.icona) || '🕒', text: `${ore} ${ore === 1 ? 'ora' : 'ore'}` });
  }

  const variants: CoursePrice[] = parseLines(acf.prezzi_variante)
    .map(([label, amount]) => ({ label, amount: Number(String(amount ?? '').replace(',', '.')) }))
    .filter((v) => v.label && Number.isFinite(v.amount) && v.amount > 0);
  const single = Number(acf.prezzo);
  const price: CoursePrice[] | null =
    variants.length > 0 ? variants : Number.isFinite(single) && single > 0 ? [{ label: 'Corso', amount: single }] : null;

  return {
    slug: p.slug,
    subKey: leaf.slug,
    title: decodeEntities(p.title.rendered),
    category: decodeEntities(root.name),
    categoryKey: root.slug,
    badge: str(acf.badge),
    provider: str(acf.provider),
    meta,
    status: str(acf.stato_card) || 'Attestato Valido Italia',
    gradient: str(acf.gradiente),
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
    price,
  };
}

// Stesso criterio delle altre sorgenti: TTL brevissimo per non servire mai dati vecchi dopo un webhook.
const MEMO_TTL_MS = 5000;
let memo: { at: number; value: Promise<CourseRaw[]> } | null = null;

async function loadCourses(): Promise<CourseRaw[]> {
  try {
    const [posts, termsRaw] = await Promise.all([
      wpGetAll<WpCorso>(
        '/wp/v2/corso?orderby=menu_order&order=asc&_embed=wp:featuredmedia&_fields=id,slug,title,categoria_corso,acf,_links,_embedded',
      ),
      wpGetAll<WpTerm>('/wp/v2/categoria_corso?_fields=id,slug,name,parent'),
    ]);
    const terms = new Map(termsRaw.map((t) => [t.id, t]));
    const items = posts.map((p) => fromWpCorso(p, terms)).filter((x): x is CourseRaw => x !== null);
    if (items.length > 0) return items;
    console.warn('[wp] nessun corso valido su WordPress: uso il catalogo locale');
  } catch (err) {
    console.warn(`[wp] catalogo non disponibile da WordPress, uso i dati locali: ${(err as Error).message}`);
  }
  return LOCAL;
}

/** Catalogo grezzo (WordPress se attivo, altrimenti `coursesData`), da passare a `buildCourseFamilies`. */
export async function getCoursesRaw(): Promise<CourseRaw[]> {
  if (!isWpEnabled()) return LOCAL;
  if (!memo || Date.now() - memo.at > MEMO_TTL_MS) memo = { at: Date.now(), value: loadCourses() };
  return memo.value;
}
