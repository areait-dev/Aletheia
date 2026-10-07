import { ALL_NEWS } from './newsData';
import { decodeEntities, htmlToText, isWpEnabled, wpGet, wpGetAll } from './wp';
import { verifyPreviewToken } from './wp-auth';
import { styleBodyHtml } from './wp-html';

/**
 * News: sorgente WordPress (CPT `news` + tassonomia `tag_news`) con ripiego sui dati locali.
 * Le pagine ricevono sempre lo stesso formato `NewsItem`, qualunque sia la sorgente.
 * SOLO lato server (getStaticProps / getStaticPaths).
 *
 * Importante: le props di Next devono essere JSON-serializzabili, quindi niente `undefined`.
 */

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  image: string | null;
  tags: string[];
  /** Testo "markdown semplice" dei dati locali (paragrafi, **grassetto**, liste con "- "). */
  body?: string;
  /** HTML già pulito arrivato da WordPress. Ha la precedenza su `body`. */
  bodyHtml?: string;
  fonte?: string;
  tempoLettura?: number;
};

type WpAcf = Record<string, unknown>;

type WpNewsPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  acf?: WpAcf | unknown[]; // WordPress restituisce [] quando non ci sono campi
  _embedded?: {
    'wp:featuredmedia'?: { source_url?: string }[];
    'wp:term'?: { taxonomy: string; slug: string }[][];
  };
};

/** Risposta di GET /aletheia/v1/page (usata per le bozze in anteprima). */
type WpPagePayload = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  content: string;
  image: string | null;
  terms?: Record<string, { slug: string }[]>;
  acf?: WpAcf | unknown[];
};

const LOCAL_NEWS = ALL_NEWS as NewsItem[];

/* ─── Adattatori WordPress → NewsItem ─────────────────────────── */

function acfOf(acf: WpAcf | unknown[] | undefined): WpAcf {
  return acf && !Array.isArray(acf) ? acf : {};
}

function withExtras(item: NewsItem, acf: WpAcf): NewsItem {
  const fonte = typeof acf.fonte === 'string' && acf.fonte.trim() ? acf.fonte.trim() : null;
  const tempo = Number(acf.tempo_lettura);
  return {
    ...item,
    ...(fonte ? { fonte } : {}),
    ...(Number.isFinite(tempo) && tempo > 0 ? { tempoLettura: tempo } : {}),
  };
}

function excerptFrom(excerptHtml: string | undefined, contentHtml: string): string {
  const fromExcerpt = excerptHtml ? htmlToText(excerptHtml) : '';
  if (fromExcerpt) return fromExcerpt;
  const text = htmlToText(contentHtml);
  return text.length > 220 ? `${text.slice(0, 217).trimEnd()}…` : text;
}

export function fromWpPost(p: WpNewsPost): NewsItem {
  const content = p.content?.rendered ?? '';
  const terms = (p._embedded?.['wp:term'] ?? []).flat();
  return withExtras(
    {
      id: p.id,
      slug: p.slug,
      title: decodeEntities(p.title.rendered),
      excerpt: excerptFrom(p.excerpt?.rendered, content),
      date: p.date.slice(0, 10),
      image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
      tags: terms.filter((t) => t.taxonomy === 'tag_news').map((t) => t.slug),
      bodyHtml: styleBodyHtml(content),
    },
    acfOf(p.acf),
  );
}

export function fromWpPayload(p: WpPagePayload): NewsItem {
  return withExtras(
    {
      id: p.id,
      slug: p.slug,
      title: decodeEntities(p.title),
      excerpt: excerptFrom(p.excerpt, p.content),
      date: p.date.slice(0, 10),
      image: p.image ?? null,
      tags: (p.terms?.tag_news ?? []).map((t) => t.slug),
      bodyHtml: styleBodyHtml(p.content),
    },
    acfOf(p.acf),
  );
}

/* ─── Lettura con ripiego locale ──────────────────────────────── */

// Coalesce le chiamate ravvicinate dello stesso build (un getStaticProps per ogni articolo).
// TTL volutamente brevissimo: non deve mai servire dati vecchi dopo un webhook di revalidazione.
const MEMO_TTL_MS = 5000;
let memo: { at: number; value: Promise<NewsItem[]> } | null = null;

async function loadAllNews(): Promise<NewsItem[]> {
  try {
    const posts = await wpGetAll<WpNewsPost>('/wp/v2/news?_embed=1&orderby=date&order=desc');
    const items = posts.map(fromWpPost);
    if (items.length > 0) return items;
    console.warn('[wp] nessuna news pubblicata su WordPress: uso i dati locali');
  } catch (err) {
    console.warn(`[wp] news non disponibili da WordPress, uso i dati locali: ${(err as Error).message}`);
  }
  return LOCAL_NEWS;
}

/** Tutte le news, complete di corpo, dalla più recente. */
export async function getAllNews(): Promise<NewsItem[]> {
  if (!isWpEnabled()) return LOCAL_NEWS;
  if (!memo || Date.now() - memo.at > MEMO_TTL_MS) memo = { at: Date.now(), value: loadAllNews() };
  return memo.value;
}

/** Elenco leggero (senza corpo) per le pagine di listing: riduce il JSON delle props. */
export async function getNewsList(): Promise<NewsItem[]> {
  const all = await getAllNews();
  return all.map(({ body: _b, bodyHtml: _h, ...rest }) => rest);
}

type PreviewData = { id?: number; exp?: number; token?: string } | undefined;

async function getDraft(previewData: PreviewData): Promise<NewsItem | null> {
  const { id, exp, token } = previewData ?? {};
  if (!id || !exp || !token || !verifyPreviewToken(id, exp, token)) return null;
  try {
    const payload = await wpGet<WpPagePayload>(`/aletheia/v1/page?preview_id=${id}&exp=${exp}&token=${encodeURIComponent(token)}`);
    return fromWpPayload(payload);
  } catch (err) {
    console.warn(`[wp] anteprima non disponibile: ${(err as Error).message}`);
    return null;
  }
}

/**
 * Una news per slug; in Preview Mode restituisce la bozza (se il token è valido e lo slug combacia).
 * Le bozze WordPress non hanno ancora uno slug: il plugin le raggiunge come /news/<id>.
 */
export async function getNewsArticle(
  slug: string,
  opts: { preview?: boolean; previewData?: PreviewData } = {},
): Promise<NewsItem | null> {
  if (opts.preview && isWpEnabled()) {
    const draft = await getDraft(opts.previewData);
    if (draft && (draft.slug === slug || String(draft.id) === slug)) return draft;
  }
  const all = await getAllNews();
  return all.find((n) => n.slug === slug) ?? null;
}
