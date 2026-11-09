// Parametri con cui una riga del calendario apre la scheda del corso già sulla variante giusta (punto 5 delle correzioni tecniche):
//   /corsi/antincendio?livello=2&tipo=aggiornamento&edizione=2026-11-12
// - livello: indice 1-based del livello (lo stesso ?livello= che la scheda già leggeva, vedi pages/corsi/[slug].js);
// - tipo=aggiornamento: l'edizione è un aggiornamento (senza il parametro vale "corso");
// - edizione: data di inizio YYYY-MM-DD, la scheda mostra QUELLA edizione e non solo la prossima.
// Solo funzioni pure (usate in build da lib/wp-calendario.ts e nel browser dalla scheda): nessun accesso a rete o file.

export type VarianteFamiglia = { livelloKey: string; label: string; tipo: string; durataOre?: string | number | null };
export type FamigliaMinima = { slug: string; titolo: string; varianti: VarianteFamiglia[] };
export type EdizioneMinima = { titolo: string; slug: string; data: string; variante?: string };

const norm = (s: string) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const token = (s: string) => norm(s).split(' ').filter(Boolean);

export type Corrispondenza = {
  /** Indice 1-based del livello, solo se la famiglia ne ha più di uno e la riga corrisponde a uno di essi. */
  livello: number | null;
  aggiornamento: boolean;
  /** La variante trovata, null se la riga non indica nulla di riconoscibile. */
  variante: VarianteFamiglia | null;
};

/**
 * Riconosce livello e tipo di un'edizione confrontando titolo+variante della riga con le etichette delle varianti della famiglia.
 * Punteggio: parole che distinguono un livello dagli altri (es. "medio", "2") + le ore tra parentesi. Con parità o zero punti non si indovina:
 * livello null (la scheda si apre sul primo livello, come prima).
 */
export function riconosciVariante(e: EdizioneMinima, fam: FamigliaMinima | undefined | null): Corrispondenza {
  const testo = `${e.titolo} ${e.variante ?? ''}`;
  const tutte = new Set(token(testo));
  const aggiornamento = tutte.has('aggiornamento');
  // Le parole del titolo della famiglia ("formazione", "dirigente"…) stanno in ogni riga e in qualche etichetta: non distinguono nulla.
  const delTitolo = new Set(token(fam?.titolo ?? ''));
  const parole = new Set(Array.from(tutte).filter((t) => !delTitolo.has(t)));
  if (!fam || !fam.varianti?.length) return { livello: null, aggiornamento, variante: null };

  const livelli = Array.from(new Map(fam.varianti.map((v) => [v.livelloKey, v])).keys());
  // Parole presenti in TUTTE le etichette (es. "rischio", "livello") non distinguono nulla.
  const perLivello = livelli.map((k) => new Set(token(fam.varianti.find((v) => v.livelloKey === k)!.label).filter((t) => !delTitolo.has(t))));
  const comuni = new Set(Array.from(perLivello[0] ?? []).filter((p) => perLivello.every((s) => s.has(p))));
  const ore = /(\d+)\s*or[ae]/.exec(norm(e.variante ?? ''))?.[1];

  const punti = livelli.map((k, i) => {
    let p = 0;
    // +10 per ogni parola distintiva dell'etichetta presente nella riga, -4 per ognuna assente: "Con Stabilizzatori" batte "Con e Senza Stabilizzatori".
    perLivello[i].forEach((t) => { if (!comuni.has(t)) p += parole.has(t) ? 10 : -4; });
    if (ore) {
      const match = fam.varianti.some((v) => v.livelloKey === k && String(v.durataOre ?? '').replace(/\D+/g, '') === ore && (v.tipo === 'aggiornamento') === aggiornamento);
      if (match) p += 5;
    }
    return p;
  });
  const max = Math.max(...punti);
  const migliori = punti.flatMap((p, i) => (p === max ? [i] : []));
  if (livelli.length < 2 || max <= 0 || migliori.length !== 1) {
    if (livelli.length === 1) return { livello: null, aggiornamento, variante: fam.varianti.find((v) => (v.tipo === 'aggiornamento') === aggiornamento) ?? fam.varianti[0] };
    // Nessuna parola utile (es. la riga dice solo "Aggiornamento", o solo il nome del corso): se un solo livello ha quel tipo di variante, è quello.
    const candidati = livelli.filter((k) => fam.varianti.some((v) => v.livelloKey === k && (v.tipo === 'aggiornamento') === aggiornamento));
    if (max <= 0 && candidati.length === 1) {
      const k = candidati[0];
      return { livello: livelli.indexOf(k) + 1, aggiornamento, variante: fam.varianti.find((v) => v.livelloKey === k && (v.tipo === 'aggiornamento') === aggiornamento) ?? null };
    }
    return { livello: null, aggiornamento, variante: null };
  }
  const k = livelli[migliori[0]];
  const variante = fam.varianti.find((v) => v.livelloKey === k && (v.tipo === 'aggiornamento') === aggiornamento) ?? fam.varianti.find((v) => v.livelloKey === k) ?? null;
  return { livello: migliori[0] + 1, aggiornamento, variante };
}

/** Indirizzo della scheda con variante, livello ed edizione già selezionati. */
export function hrefEdizione(e: EdizioneMinima, fam: FamigliaMinima | undefined | null): string {
  const { livello, aggiornamento } = riconosciVariante(e, fam);
  const q: string[] = [];
  if (livello) q.push(`livello=${livello}`);
  if (aggiornamento) q.push('tipo=aggiornamento');
  if (e.data) q.push(`edizione=${encodeURIComponent(e.data)}`);
  return `/corsi/${e.slug}${q.length ? `?${q.join('&')}` : ''}`;
}

const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
/** "2026-11-12" → "12 novembre 2026". */
export function dataEstesa(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return y && m && d ? `${d} ${MESI[m - 1]} ${y}` : iso;
}
