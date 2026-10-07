import { SCHEDE_LOCALI } from '../data/schede';
import { decodeEntities, htmlToText, isWpEnabled, wpGetAll } from './wp';
import { acfOf, str } from './wp-cpt';
import { LISTE } from './wp-schede-map';
import type { Scheda } from './wp-schede-map';

/**
 * Liste di card (CPT `scheda`, un termine della tassonomia `lista_schede` per lista) con ripiego sui dati locali
 * (`data/schede.js`). Il mapping tra scheda WordPress e oggetto della pagina è in `wp-schede-map.ts`.
 * SOLO lato server (getStaticProps).
 */

// Gli elementi delle liste hanno forme diverse (oggetti o semplici stringhe): volutamente generici.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = any;

type WpScheda = {
  id: number;
  slug: string;
  title: { rendered: string };
  content?: { rendered: string };
  menu_order?: number;
  acf?: Record<string, unknown> | unknown[];
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
};

const MEMO_TTL_MS = 5000;
const memo = new Map<string, { at: number; value: Promise<Scheda[] | null> }>();
let termsMemo: { at: number; value: Promise<Map<string, number>> } | null = null;

async function termIds(): Promise<Map<string, number>> {
  if (!termsMemo || Date.now() - termsMemo.at > MEMO_TTL_MS) {
    termsMemo = {
      at: Date.now(),
      value: wpGetAll<{ id: number; slug: string }>('/wp/v2/lista_schede?_fields=id,slug').then((t) => new Map(t.map((x) => [x.slug, x.id]))),
    };
  }
  return termsMemo.value;
}

/** Testi dei `<li>` del contenuto (elenchi puntati delle card). */
function listItems(html: string): string[] {
  const out: string[] = [];
  const re = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(htmlToText(m[1]));
  return out.filter(Boolean);
}

/**
 * Contenuto dell'editor ridotto ai soli `<strong>` ed `<em>` (`<b>`/`<i>` normalizzati, attributi tolti, paragrafi uniti
 * da uno spazio, ogni altro tag scartato). Resta una stringa di testo: components/RichText la disegna senza mai
 * interpretare altro HTML.
 */
export function inlineHtml(html: string): string {
  const t = html
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<(\/?)b(?:\s[^>]*)?>/gi, '<$1strong>')
    .replace(/<(\/?)i(?:\s[^>]*)?>/gi, '<$1em>')
    .replace(/<(\/?)(strong|em)\b[^>]*>/gi, '<$1$2>')
    .replace(/<(?!\/?(?:strong|em)>)[^>]*>/gi, '');
  return decodeEntities(t).replace(/\s+/g, ' ').trim();
}

function toScheda(p: WpScheda): Scheda {
  const a = acfOf(p);
  const link = a.link && typeof a.link === 'object' ? (a.link as { title?: unknown; url?: unknown }) : {};
  return {
    slug: p.slug,
    titolo: decodeEntities(p.title.rendered),
    // `testo` = i paragrafi del contenuto, senza gli elenchi (quelli sono in `elenco`): una scheda può avere entrambi
    testo: htmlToText((p.content?.rendered ?? '').replace(/<(ul|ol)\b[\s\S]*?<\/\1>/gi, '')),
    testoRicco: inlineHtml(p.content?.rendered ?? ''),
    elenco: listItems(p.content?.rendered ?? ''),
    icona: str(a.icona),
    badge: str(a.badge),
    sottotitolo: str(a.sottotitolo),
    link: { label: str(link.title), href: str(link.url) },
    meta1: str(a.meta_1),
    meta2: str(a.meta_2),
    immagine: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',
    immagineAlt: str(a.immagine_alt),
  };
}

async function loadLista(lista: string): Promise<Scheda[] | null> {
  try {
    const id = (await termIds()).get(lista);
    if (id) {
      const posts = await wpGetAll<WpScheda>(`/wp/v2/scheda?lista_schede=${id}&orderby=menu_order&order=asc&_embed=wp:featuredmedia&_fields=id,slug,title,content,menu_order,acf,_links,_embedded`);
      if (posts.length > 0) return posts.map(toScheda);
    }
    console.warn(`[wp] nessuna scheda nella lista "${lista}" su WordPress: uso i dati locali`);
  } catch (err) {
    console.warn(`[wp] schede "${lista}" non disponibili da WordPress, uso i dati locali: ${(err as Error).message}`);
  }
  return null;
}

/** Lista di card nella forma usata dalla pagina: da WordPress se disponibile, altrimenti i dati locali. */
export async function getSchede<T = Item>(lista: string): Promise<T[]> {
  const local = ((SCHEDE_LOCALI as Record<string, Item[]>)[lista] ?? []) as Item[];
  if (!isWpEnabled()) return local as T[];
  const hit = memo.get(lista);
  const wp = await (hit && Date.now() - hit.at <= MEMO_TTL_MS ? hit.value : (() => {
    const value = loadLista(lista);
    memo.set(lista, { at: Date.now(), value });
    return value;
  })());
  if (!wp) return local as T[];
  const map = LISTE[lista];
  return wp.map((c, i) => map.fromWp(c, local.find((l) => l.title === c.titolo), i, local)) as T[];
}
