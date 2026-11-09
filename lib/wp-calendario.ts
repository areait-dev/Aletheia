import { CALENDARIO } from '../data/calendario';
import { coursesData } from '../data/coursesRaw';
import { buildCourseFamilies, resolveCourseImage } from '../data/courseFamilies';
import type { CategoriaCorso, CorsoCalendario } from '../data/calendario';
import { decodeEntities, isWpEnabled, wpGetAll } from './wp';
import { descriviErroreFoglio, foglioGoogleConfigurato, leggiScheda } from './google-sheets';
import { righeFoglioToEdizioni } from './calendario-foglio';
import type { VoceCatalogo } from './calendario-foglio';

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
let memo: { at: number; fonte: Fonte; value: Promise<CorsoCalendario[]> } | null = null;

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

// ───────── Fonte del calendario ─────────
// UNICA funzione che alimenta tutte le pagine (calendario, "Corsi in partenza" in home, Formazione obbligatoria, schede corso).
// Ordine: file di prova (solo test) > foglio Google > WordPress > dati locali (data/calendario.ts, sviluppo e test).
// CALENDARIO_FONTE=locale forza i dati locali anche se ci sono le credenziali Google (build e server dei test di regressione).
type Fonte = 'file' | 'google' | 'wp' | 'locale';
function fonte(): Fonte {
  if (process.env.CALENDARIO_FOGLIO_FILE) return 'file';
  if (process.env.CALENDARIO_FONTE === 'locale') return 'locale';
  if (foglioGoogleConfigurato()) return 'google';
  if (isWpEnabled()) return 'wp';
  return 'locale';
}

const NOME_SCHEDA_FOGLIO = 'Corsi';
const MEMO_TTL_FOGLIO_MS = 20_000; // il foglio ha un limite di richieste al minuto: una lettura ogni 20 s al massimo (build e rigenerazioni condividono la copia)
let ultimoFoglioValido: CorsoCalendario[] | null = null;

/** Il catalogo come serve al foglio: famiglie (slug, titolo, categoria del calendario). */
function catalogoPerFoglio(): VoceCatalogo[] {
  return famiglie().map((f) => ({
    slug: f.slug,
    titolo: f.titolo,
    categoria: CATEGORIA_BY_TERM[f.categoryKey as string] ?? 'professionale',
  }));
}

async function loadFoglio(f: 'file' | 'google'): Promise<CorsoCalendario[]> {
  try {
    const righe =
      f === 'file'
        ? (JSON.parse((await import('node:fs')).readFileSync(process.env.CALENDARIO_FOGLIO_FILE as string, 'utf8')) as string[][])
        : await leggiScheda(NOME_SCHEDA_FOGLIO);
    const { edizioni, avvisi } = righeFoglioToEdizioni(righe, catalogoPerFoglio());
    for (const a of avvisi) console.warn(`[calendario] ${a}`);
    ultimoFoglioValido = edizioni;
    return edizioni;
  } catch (err) {
    // Mai date inventate: se il foglio non si legge si tiene l'ultima lettura buona, altrimenti "Nuove date in arrivo". Messaggio senza credenziali.
    const msg = f === 'file' ? (err as Error).message : descriviErroreFoglio(err);
    const seguito = ultimoFoglioValido ? ': uso la lettura valida precedente' : ': nessuna edizione';
    console.warn(`[calendario] foglio non disponibile (${msg})${seguito}`);
    return ultimoFoglioValido ?? [];
  }
}

/** Tutte le edizioni pubblicate (anche passate: il filtro sul futuro è soloFuture, uguale per tutte le pagine). */
export async function getCalendario(): Promise<CorsoCalendario[]> {
  const f = fonte();
  if (f === 'locale') return CALENDARIO;
  const ttl = f === 'wp' ? MEMO_TTL_MS : MEMO_TTL_FOGLIO_MS;
  if (!memo || memo.fonte !== f || Date.now() - memo.at > ttl) {
    memo = { at: Date.now(), fonte: f, value: f === 'wp' ? loadCalendario() : loadFoglio(f) };
  }
  return memo.value;
}

/** Dimentica la copia in memoria del foglio: la prossima lettura è fresca (pulsante "Pubblica aggiornamenti" del foglio, rotta /api/revalidate). */
export function azzeraCacheCalendario(): void {
  memo = null;
}

/** Pagine che mostrano le date dei corsi: home, calendario, Formazione obbligatoria e la scheda di ogni corso del catalogo. */
export function percorsiCalendario(): string[] {
  return ['/', '/calendario-corsi', '/formazione/obbligatoria', ...famiglie().map((f) => `/corsi/${f.slug}`)];
}

/** "Oggi" come data italiana YYYY-MM-DD (non UTC: tra mezzanotte e le 2 il giorno cambia prima). DATA_FISSA_TEST la congela nei test. */
export function oggiItalia(): string {
  return process.env.DATA_FISSA_TEST || new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date());
}

/**
 * Edizioni ancora visibili: un'edizione si vede finché la sua ultima giornata (data_fine, o la data) non è passata. Lo usa il calendario
 * (/calendario-corsi), dove le edizioni già iniziate restano con l'etichetta "In corso" (vedi inCorso). "Corsi in partenza" della home e le righe di
 * Formazione obbligatoria mostrano invece solo quelle che INIZIANO da oggi in poi (upcomingDays, daysByCategory).
 */
export function soloFuture(calendario: CorsoCalendario[], oggi: string = oggiItalia()): CorsoCalendario[] {
  return calendario.filter((c) => (c.dataFine || c.data) >= oggi);
}

/** Edizione già iniziata ma non ancora finita (etichetta "In corso" nel calendario). */
export function inCorso(c: CorsoCalendario, oggi: string = oggiItalia()): boolean {
  return c.data < oggi && (c.dataFine || c.data) >= oggi;
}

/** Scheda corso: la prima edizione che INIZIA da oggi in poi per quel corso (slug della famiglia), oppure null (comportamento di prima). */
export function prossimaEdizione(calendario: CorsoCalendario[], slug: string, oggi: string = oggiItalia()): CorsoCalendario | null {
  const prossime = calendario.filter((c) => c.slug === slug && c.data >= oggi).sort((a, b) => a.data.localeCompare(b.data) || a.id - b.id);
  return prossime[0] ?? null;
}

export type GiornoCalendario = { data: string; corsi: CorsoCalendario[] };

// Famiglie del catalogo locale: servono solo per trovare la foto di ogni corso (immagini fisse in data/courseImages.js), quindi bastano i
// dati locali anche con WordPress attivo; un corso nuovo non presente nel catalogo locale prende la generica della sua categoria.
let famiglieLocali: ReturnType<typeof buildCourseFamilies> | null = null;
function famiglie() {
  if (!famiglieLocali) famiglieLocali = buildCourseFamilies(coursesData, {}, { quiet: true });
  return famiglieLocali;
}

/** Aggiunge a ogni corso `image` e `imageAlt` (stringhe, mai undefined: le props di getStaticProps non lo ammettono). */
function conFoto(c: CorsoCalendario): CorsoCalendario {
  const { src, alt } = resolveCourseImage(c.slug, c.categoria, famiglie());
  return { ...c, image: src, imageAlt: alt || c.titolo };
}

function groupByDay(corsi: CorsoCalendario[], maxDays: number): GiornoCalendario[] {
  return Array.from(new Set(corsi.map((c) => c.data)))
    .slice(0, maxDays)
    .map((data) => ({ data, corsi: corsi.filter((c) => c.data === data).map(conFoto) }));
}

/** Prossimi giorni con corsi a partire da oggi (home "Corsi in partenza"). `oggi` = YYYY-MM-DD. */
export function upcomingDays(calendario: CorsoCalendario[], oggi: string, maxDays = 10): GiornoCalendario[] {
  const ordinati = calendario.filter((c) => c.data >= oggi).sort((a, b) => a.data.localeCompare(b.data)); // solo edizioni che INIZIANO da oggi
  return groupByDay(ordinati, maxDays);
}

/** Giorni con corsi che iniziano da oggi in poi, di una categoria (pagina Formazione obbligatoria). `oggi` = YYYY-MM-DD. */
export function daysByCategory(calendario: CorsoCalendario[], categoria: CategoriaCorso, oggi: string, maxDays = 8): GiornoCalendario[] {
  const ordinati = calendario.filter((c) => c.data >= oggi && c.categoria === categoria).sort((a, b) => a.data.localeCompare(b.data)); // solo edizioni che INIZIANO da oggi
  return groupByDay(ordinati, maxDays);
}
