import { PAGINE } from '../data/pagine';
import { decodeEntities, htmlToText, isWpEnabled, wpGet } from './wp';

/**
 * Testi delle pagine (hero, intro, sezioni di sole parole, CTA finale, SEO) dalla pagina WordPress con lo stesso
 * percorso (`/aletheia/v1/page?path=formazione/ecm`), con ripiego campo per campo sui valori locali di
 * `data/pagine.js`. Layout, stili e ordine delle sezioni restano nel codice: da WP cambiano solo le parole.
 * SOLO lato server (getStaticProps).
 *
 * Tipi di valore (dedotti dal valore locale):
 *  - stringa            → campo testo (nel titolo `*parola*` = parola evidenziata, vedi components/HeroTitle)
 *  - array di stringhe  → paragrafi (campo wysiwyg: un <p> per voce)
 *  - { label, href }    → campo link ACF ({ title, url })
 *  - { src, alt }       → campo immagine ACF (formato array: { url, alt }); l'alt di WordPress, se c'è, sostituisce
 *                         quello locale. Il valore locale è l'URL di ripiego (anche esterno o di `public/`).
 *  Elenchi in un campo testo semplice (es. `numeri`: una riga `Valore|Suffisso|Etichetta` per voce): array di stringhe
 *  come i paragrafi; `paragrafi()` li legge anche senza `<p>` (una voce per riga).
 */

export type LinkTesto = { label: string; href: string };
export type ImmagineTesto = { src: string; alt: string };
export type Valore = string | string[] | LinkTesto | ImmagineTesto;
export type Testi = Record<string, Valore>;
export type Seo = { titolo: string; descrizione: string; ogImage: string; noindex: boolean };
/** `contenuto` = corpo della pagina WP (editor), HTML già filtrato da WordPress; vuoto se la pagina non ne ha. */
export type Pagina = { testi: Testi; seo: Seo; contenuto: string };

const SEO_VUOTO: Seo = { titolo: '', descrizione: '', ogImage: '', noindex: false };

/** Paragrafi di un campo wysiwyg: un elemento per `<p>`; senza `<p>`, per riga. */
export function paragrafi(html: string): string[] {
  const out: string[] = [];
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(htmlToText(m[1]));
  if (out.length === 0) html.split(/\r?\n/).forEach((l) => out.push(htmlToText(l)));
  return out.filter(Boolean);
}

function unisci(local: Testi, acf: Record<string, unknown>): Testi {
  const out: Testi = {};
  for (const [key, def] of Object.entries(local)) {
    const v = acf[key];
    if (Array.isArray(def)) {
      const p = typeof v === 'string' ? paragrafi(v) : [];
      out[key] = p.length > 0 ? p : def;
    } else if (typeof def === 'object' && 'src' in def) {
      // Immagine: ACF restituisce { url, alt, ... } (o false/'' se il campo è vuoto → resta quella locale)
      const i = v && typeof v === 'object' ? (v as { url?: unknown; alt?: unknown }) : null;
      out[key] = i && typeof i.url === 'string' && i.url ? { src: i.url, alt: typeof i.alt === 'string' && i.alt.trim() ? decodeEntities(i.alt.trim()) : def.alt } : def;
    } else if (typeof def === 'object') {
      const l = v && typeof v === 'object' ? (v as { title?: unknown; url?: unknown }) : null;
      out[key] = l && typeof l.url === 'string' && l.url ? { label: typeof l.title === 'string' && l.title ? decodeEntities(l.title) : (def as LinkTesto).label, href: l.url } : def;
    } else {
      out[key] = typeof v === 'string' && v.trim() ? v.trim() : def;
    }
  }
  return out;
}

const MEMO_TTL_MS = 5000;
const memo = new Map<string, { at: number; value: Promise<Pagina> }>();

async function load(path: string): Promise<Pagina> {
  const local = ((PAGINE as Record<string, Testi>)[path] ?? {}) as Testi;
  if (!isWpEnabled()) return { testi: local, seo: SEO_VUOTO, contenuto: '' };
  try {
    // La home è la pagina con percorso vuoto (`path=`), non "home"
    const query = path === 'home' ? '' : path;
    const p = await wpGet<{ content?: string; acf?: Record<string, unknown> | unknown[] }>(`/aletheia/v1/page?path=${encodeURIComponent(query)}`);
    const acf = p.acf && !Array.isArray(p.acf) ? p.acf : {};
    const og = acf.seo_og_image as { url?: string } | null | undefined;
    return {
      testi: unisci(local, acf),
      contenuto: typeof p.content === 'string' ? p.content.trim() : '',
      seo: {
        titolo: typeof acf.seo_titolo === 'string' ? acf.seo_titolo.trim() : '',
        descrizione: typeof acf.seo_descrizione === 'string' ? acf.seo_descrizione.trim() : '',
        ogImage: og?.url ?? '',
        noindex: acf.seo_noindex === true,
      },
    };
  } catch (err) {
    console.warn(`[wp] pagina "${path}" non disponibile da WordPress, uso i testi locali: ${(err as Error).message}`);
    return { testi: local, seo: SEO_VUOTO, contenuto: '' };
  }
}

/** Testi e SEO della pagina `path` (es. `formazione/ecm`): WordPress se disponibile, altrimenti i valori locali. */
export function getPagina(path: string): Promise<Pagina> {
  const hit = memo.get(path);
  if (hit && Date.now() - hit.at <= MEMO_TTL_MS) return hit.value;
  const value = load(path);
  memo.set(path, { at: Date.now(), value });
  return value;
}
