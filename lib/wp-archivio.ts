import archivioIndex from '../public/pdf/archivio/index.json';
import descrizioniArchivio from '../public/pdf/archivio/descrizioni.json';
import { FAMIGLIE } from '../data/archivio-famiglie';
import { SCHEDE_ARCHIVIO } from '../data/archivio-schede';
import { lines } from './wp-lists';
import { acfOf, getCptPosts, str, titleOf } from './wp-cpt';
import type { WpPost } from './wp-cpt';

/**
 * Archivio dei bandi (/archivio, /archivio/<slug>, /archivio/<famiglia>/<slug>).
 *
 * Sorgenti: i dati locali storici (`public/pdf/archivio/index.json` = documenti, `descrizioni.json` = testi) e il
 * CPT WordPress `archivio`. Con WP_URL attivo le voci WordPress si aggiungono a quelle locali (a parità di percorso
 * la voce WordPress sostituisce quella locale, mantenendo la posizione); una voce nuova creata in WordPress compare
 * senza toccare il codice. SOLO lato server (getStaticProps / getStaticPaths).
 *
 * Campi della voce WordPress: titolo = titolo del post; ACF `famiglia` (vuota o chiave di una famiglia),
 * `descrizione` e `destinatari` (testo: paragrafi separati da riga vuota, elenchi con "- "),
 * `documenti` (una riga per file: `sezione|Titolo del documento|URL del PDF`), `titolo_indice`, `titolo_panoramica`,
 * `meta_titolo` / `meta_descrizione` (SEO della pagina) e `fuori_elenco` (la voce non compare in /archivio).
 * Layout "a scheda" (pagine come Avviso 1/2026 POC): `layout` = `scheda` più i campi `scheda_*` (vedi `Scheda`);
 * il testo di `descrizione` diventa "Di cosa si tratta" e i documenti si mostrano in un'unica lista.
 */

export type Doc = { titoloLink: string; percorsoLocale: string };
export type Documenti = Record<string, Doc[]>;
/** Contenuti del layout a scheda. `extra`: qualifiche (`chips`), sedi (`sedi`) o corsi con durata (`corsi`, voci "Nome | durata") sotto i requisiti. */
export type Scheda = {
  titoloBreve: string;
  badge: string;
  sottotitolo: string;
  requisitiIntro: string;
  requisiti: string[];
  extraTitolo: string;
  extraTipo: 'chips' | 'sedi' | 'corsi';
  extra: string[];
  /** Riquadro evidenziato (es. scadenza); i link si scrivono [etichetta](URL). */
  avviso: string;
  /** Riga finale con email e telefono del sito. */
  contatti: boolean;
};
export type VoceArchivio = {
  /** Percorso sotto /archivio: `avviso-7-2023` oppure `misura-psr-1-1/conduttore-impresa-agricola`. */
  slug: string;
  famiglia: string;
  /** Ultimo segmento del percorso. */
  ultimo: string;
  titolo: string;
  /** Titolo nell'elenco di /archivio. */
  titoloIndice: string;
  /** Titolo nella panoramica della famiglia. */
  titoloPanoramica: string;
  descrizione: string;
  destinatari: string;
  documenti: Documenti;
  /** SEO della pagina (vuoti = nessun titolo/description propri, come le voci storiche). */
  metaTitolo: string;
  metaDescrizione: string;
  /** true = non compare nell'elenco di /archivio (la pagina esiste comunque). */
  fuoriElenco: boolean;
  /** Layout a scheda; null = layout standard (descrizione, destinatari, documenti per sezione). */
  scheda: Scheda | null;
};
export type Famiglia = { chiave: string; titolo: string; panoramica: string; sezione: string; sottovoci: { slug: string; titolo: string }[] };

/** Voci che non stanno in /archivio ma hanno una pagina propria altrove (avvisi ancora attivi). Il vecchio percorso reindirizza (next.config.js). */
export const VOCI_SPOSTATE: Record<string, string> = {
  'avviso-1-2026-poc': '/formazione/avviso-1-2026-poc',
};

/** Sezioni dei documenti, nell'ordine di visualizzazione. */
export const SEZIONI = [
  { key: 'bandi-docenti', label: 'Bandi Docenti' },
  { key: 'bandi-tutor', label: 'Bandi Tutor' },
  { key: 'bandi-allievi', label: 'Bandi Allievi' },
  { key: 'altri', label: 'Altri Documenti' },
];

export function titoloFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => (/^\d+$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

type Descr = { titolo?: string; descrizione?: string; destinatari?: string };

function locali(): VoceArchivio[] {
  const index = archivioIndex as unknown as Record<string, Documenti>;
  const descr = descrizioniArchivio as unknown as Record<string, Descr>;
  const storiche = Object.keys(index).map((slug) => {
    const fam = (FAMIGLIE as Famiglia[]).find((f) => slug.startsWith(`${f.chiave}/`));
    const ultimo = fam ? slug.slice(fam.chiave.length + 1) : slug;
    const d = descr[slug] ?? {};
    const titolo = d.titolo || titoloFromSlug(ultimo);
    return {
      slug,
      famiglia: fam?.chiave ?? '',
      ultimo,
      titolo,
      // Come nelle pagine originali: le voci singole si elencano col titolo ricavato dallo slug, quelle di una
      // famiglia col titolo del testo; nella panoramica contano i titoli estesi (con le ore).
      titoloIndice: fam ? titolo : titoloFromSlug(slug),
      titoloPanoramica: fam?.sottovoci.find((x) => x.slug === ultimo)?.titolo ?? titolo,
      descrizione: d.descrizione ?? '',
      destinatari: d.destinatari ?? '',
      documenti: index[slug] ?? {},
      metaTitolo: '',
      metaDescrizione: '',
      fuoriElenco: false,
      scheda: null,
    };
  });
  // Voci con layout a scheda (data/archivio-schede.js): documenti in un'unica lista ("altri").
  const schede: VoceArchivio[] = (SCHEDE_ARCHIVIO as unknown as (Omit<VoceArchivio, 'famiglia' | 'ultimo' | 'titoloIndice' | 'titoloPanoramica' | 'destinatari' | 'documenti'> & { documenti: Doc[] })[]).map((s) => ({
    ...s,
    famiglia: '',
    ultimo: s.slug,
    titoloIndice: s.titolo,
    titoloPanoramica: s.titolo,
    destinatari: '',
    documenti: { altri: s.documenti },
  }));
  // Una scheda con lo stesso slug di una voce storica la sostituisce al suo posto (titoli di elenco e panoramica invariati).
  const perSlug = new Map(schede.map((v) => [v.slug, v]));
  const usate = new Set<string>();
  const unite = storiche.map((v) => {
    const sc = perSlug.get(v.slug);
    if (!sc) return v;
    usate.add(v.slug);
    return { ...sc, famiglia: v.famiglia, ultimo: v.ultimo, titoloIndice: v.titoloIndice, titoloPanoramica: v.titoloPanoramica };
  });
  return [...unite, ...schede.filter((v) => !usate.has(v.slug))];
}

/** `sezione|Titolo|URL` per riga → documenti per sezione (una sezione sconosciuta finisce in "altri"). */
export function parseDocumenti(text: unknown): Documenti {
  const out: Documenti = {};
  const chiavi = SEZIONI.map((x) => x.key);
  for (const riga of lines(text)) {
    const [sez = '', titolo = '', url = ''] = riga.split('|').map((c) => c.trim());
    if (!titolo || !url) continue;
    const key = chiavi.includes(sez) ? sez : 'altri';
    (out[key] = out[key] ?? []).push({ titoloLink: titolo, percorsoLocale: url });
  }
  return out;
}

function daPost(p: WpPost): VoceArchivio | null {
  const a = acfOf(p);
  const ultimo = p.slug;
  const titolo = titleOf(p);
  if (!ultimo || !titolo) return null;
  const chiaveFam = str(a.famiglia);
  const famiglia = (FAMIGLIE as Famiglia[]).some((f) => f.chiave === chiaveFam) ? chiaveFam : '';
  const indice = str(a.titolo_indice) || titolo;
  return {
    slug: famiglia ? `${famiglia}/${ultimo}` : ultimo,
    famiglia,
    ultimo,
    titolo,
    titoloIndice: indice,
    titoloPanoramica: str(a.titolo_panoramica) || indice,
    descrizione: str(a.descrizione),
    destinatari: str(a.destinatari),
    documenti: parseDocumenti(a.documenti),
    metaTitolo: str(a.meta_titolo),
    metaDescrizione: str(a.meta_descrizione),
    fuoriElenco: a.fuori_elenco === true,
    scheda: a.layout === 'scheda' ? schedaDaAcf(a) : null,
  };
}

function schedaDaAcf(a: Record<string, unknown>): Scheda {
  return {
    titoloBreve: str(a.scheda_titolo_breve),
    badge: str(a.scheda_badge),
    sottotitolo: str(a.scheda_sottotitolo),
    requisitiIntro: str(a.scheda_requisiti_intro),
    requisiti: lines(a.scheda_requisiti),
    extraTitolo: str(a.scheda_extra_titolo),
    extraTipo: a.scheda_extra_tipo === 'sedi' ? 'sedi' : a.scheda_extra_tipo === 'corsi' ? 'corsi' : 'chips',
    extra: lines(a.scheda_extra),
    avviso: str(a.scheda_avviso),
    contatti: a.scheda_contatti === true,
  };
}

/** Tutte le voci dell'archivio: locali, sostituite o accodate da quelle di WordPress. */
export async function getArchivio(): Promise<VoceArchivio[]> {
  const base = locali();
  const posts = await getCptPosts('archivio');
  if (!posts) return base;
  const mappa = new Map(base.map((v) => [v.slug, v]));
  for (const p of posts) {
    const v = daPost(p);
    if (v) mappa.set(v.slug, v);
  }
  return Array.from(mappa.values());
}

export async function getVoce(slug: string): Promise<VoceArchivio | null> {
  return (await getArchivio()).find((v) => v.slug === slug) ?? null;
}

export function getFamiglia(chiave: string): Famiglia | null {
  return (FAMIGLIE as Famiglia[]).find((f) => f.chiave === chiave) ?? null;
}

/** Voci della panoramica: prima quelle storiche nel loro ordine, poi quelle aggiunte da WordPress. */
export function sottovociPanoramica(f: Famiglia, voci: VoceArchivio[]): { slug: string; titolo: string }[] {
  const della = voci.filter((v) => v.famiglia === f.chiave);
  const storiche = f.sottovoci.map((s) => ({ slug: s.slug, titolo: della.find((v) => v.ultimo === s.slug)?.titoloPanoramica ?? s.titolo }));
  const nuove = della.filter((v) => !f.sottovoci.some((s) => s.slug === v.ultimo)).map((v) => ({ slug: v.ultimo, titolo: v.titoloPanoramica }));
  return [...storiche, ...nuove];
}

/** Testi della panoramica o dell'indice (titolo e descrizione di una famiglia, solo locali). */
export function descrizioneFamiglia(chiave: string): Descr {
  return ((descrizioniArchivio as unknown as Record<string, Descr>)[chiave] ?? {}) as Descr;
}
