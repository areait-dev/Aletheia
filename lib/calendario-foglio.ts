import type { CategoriaCorso, CorsoCalendario } from '../data/calendario';

/**
 * Dal foglio "Aletheia_calendario_corsi" (scheda "Corsi") alle edizioni del calendario del sito (`CorsoCalendario`).
 * Funzioni pure, senza rete: la lettura del foglio è in lib/google-sheets.ts, la scelta della fonte in lib/wp-calendario.ts (getCalendario).
 *
 * Colonne del foglio: ente, corso, variante, tipologia, modalita, data_inizio, data_fine, giorni, orario, sede, posti, note, stato.
 * Regole (scritte anche nella scheda "Istruzioni" del foglio):
 *   - stato "pubblicato" = visibile, "bozza" = no;
 *   - tipologia "Multiaziendale" = visibile, "Aziendale" (riservata a un'azienda) = no;
 *   - date gg/mm/aaaa; data_fine vuota = data_inizio; il filtro sul futuro (data_fine >= oggi) è comune a tutte le pagine (soloFuture in lib/wp-calendario.ts);
 *   - "corso" deve essere un corso del catalogo (il menu del foglio è lo stesso elenco): da lì arrivano slug, categoria e immagine. Un corso che non c'è
 *     nel catalogo, una data impossibile ("17/11/206") o data_fine prima di data_inizio scartano SOLO quella riga, con un avviso nel log della build;
 *   - "note" è interna al reparto e non esce mai sul sito.
 */

/** Corso del catalogo come serve qui: la chiave è lo slug della famiglia (/all-courses/[slug]). */
export type VoceCatalogo = { slug: string; titolo: string; categoria: CategoriaCorso };

export type EsitoFoglio = { edizioni: CorsoCalendario[]; avvisi: string[] };

const COLONNE_OBBLIGATORIE = ['corso', 'data_inizio', 'stato', 'tipologia'] as const;

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** gg/mm/aaaa (anche g/m/aaaa) o aaaa-mm-gg → YYYY-MM-DD; '' se non è una data vera (mese 13, 31 febbraio, anno a 3 cifre...). */
export function dataFoglio(valore: string): string {
  const s = String(valore ?? '').trim();
  let g: number, m: number, a: number;
  let r = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (r) [g, m, a] = [Number(r[1]), Number(r[2]), Number(r[3])];
  else if ((r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s))) [a, m, g] = [Number(r[1]), Number(r[2]), Number(r[3])];
  else return '';
  const d = new Date(Date.UTC(a, m - 1, g));
  if (d.getUTCFullYear() !== a || d.getUTCMonth() !== m - 1 || d.getUTCDate() !== g) return '';
  return `${String(a).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(g).padStart(2, '0')}`;
}

/** "Rischio medio Livello 2 (8 ore)" → "8 ore"; '' se la durata non è indicata tra parentesi. */
function durataDa(variante: string): string {
  const m = /\((\d+(?:[.,]\d+)?)\s*ore\b/i.exec(variante);
  return m ? `${m[1]} ${m[1] === '1' ? 'ora' : 'ore'}` : '';
}

export function righeFoglioToEdizioni(righe: string[][], catalogo: VoceCatalogo[]): EsitoFoglio {
  const avvisi: string[] = [];
  if (righe.length === 0) return { edizioni: [], avvisi: ['foglio vuoto'] };

  const intestazione = righe[0].map((h) => norm(h).replace(/ /g, '_'));
  const col = (nome: string) => intestazione.indexOf(nome);
  const mancanti = COLONNE_OBBLIGATORIE.filter((c) => col(c) < 0);
  // Intestazione rinominata o spostata (regola 2 delle istruzioni): meglio fermarsi che pubblicare date sbagliate.
  if (mancanti.length) throw new Error(`colonne mancanti nella scheda Corsi: ${mancanti.join(', ')}`);

  const perNome = new Map<string, VoceCatalogo>();
  for (const v of catalogo) {
    perNome.set(norm(v.titolo), v);
    perNome.set(norm(v.slug), v);
  }

  const edizioni: CorsoCalendario[] = [];
  righe.slice(1).forEach((riga, i) => {
    const n = i + 2; // numero di riga nel foglio
    const v = (nome: string) => String(riga[col(nome)] ?? '').trim();
    if (riga.every((c) => String(c ?? '').trim() === '')) return;

    if (norm(v('stato')) !== 'pubblicato') return; // bozza: nessun avviso, è il caso normale
    if (norm(v('tipologia')) !== 'multiaziendale') return; // aziendale: riservata, non si mostra

    const voce = perNome.get(norm(v('corso')));
    if (!voce) {
      avvisi.push(`riga ${n}: il corso "${v('corso')}" non è nel catalogo, edizione non mostrata`);
      return;
    }
    const data = dataFoglio(v('data_inizio'));
    if (!data) {
      avvisi.push(`riga ${n}: data_inizio "${v('data_inizio')}" non valida, edizione non mostrata`);
      return;
    }
    const fineGrezza = v('data_fine');
    const dataFine = fineGrezza ? dataFoglio(fineGrezza) : data;
    if (!dataFine) {
      avvisi.push(`riga ${n}: data_fine "${fineGrezza}" non valida, edizione non mostrata`);
      return;
    }
    if (dataFine < data) {
      avvisi.push(`riga ${n}: data_fine precedente a data_inizio, edizione non mostrata`);
      return;
    }

    const variante = v('variante');
    const postiN = v('posti') === '' ? NaN : Number(v('posti').replace(',', '.'));
    const posti = Number.isFinite(postiN) && postiN >= 0 ? Math.floor(postiN) : null;

    edizioni.push({
      id: 100000 + n,
      titolo: variante ? `${voce.titolo} — ${variante}` : voce.titolo,
      slug: voce.slug,
      categoria: voce.categoria,
      data,
      dataFine,
      giorni: v('giorni'),
      orario: v('orario'),
      sede: v('sede'),
      durata: durataDa(variante),
      posti,
      postiDisponibili: posti,
      modalita: v('modalita'),
      variante,
      ente: v('ente'),
    });
  });

  edizioni.sort((a, b) => a.data.localeCompare(b.data) || a.id - b.id);
  return { edizioni, avvisi };
}
