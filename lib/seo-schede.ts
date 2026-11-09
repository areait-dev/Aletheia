// Titolo e descrizione SEO di una scheda corso, generati dai dati del corso: nome, durata (minimo e massimo reali), modalità (le stesse parole della
// scheda tecnica), attestato e "a Vittoria (RG)". Funzioni pure: usate da pages/corsi/[slug].js in getStaticProps (build) e provate da
// tests/regressione/seo.spec.mjs. Regole del committente (9 novembre 2026):
//  - ore: minimo e massimo REALI dei corsi base (l'aggiornamento non entra nell'intervallo); per i corsi a moduli "moduli da X a Y ore";
//  - modalità: sempre le parole della scheda ("Aula", "Aula virtuale", "FAD", "In presenza"...), mai sinonimi;
//  - oltre i 160 caratteri: via "senza impegno", poi si accorcia il nome del corso;
//  - sotto i 140: si aggiungono frasi vere (attestato, accreditamento) finché non ci si arriva.

export type DatiScheda = {
  /** Nome della famiglia come sulla scheda (es. "Antincendio", "RSPP/ASPP"). */
  nome: string;
  /** Ore dei corsi base (senza aggiornamento). Vuoto = non si dice nulla sulle ore. */
  ore: number[];
  /** Il corso è articolato in moduli (Modulo A/B/C, Modulo comune...): "moduli da X a Y ore". */
  aModuli: boolean;
  /** Modalità come scritte nelle schede tecniche (unione dei livelli, nell'ordine di apparizione). */
  modalita: string[];
  /** Attestato come scritto nella scheda ("Attestato valido in tutta Italia"). */
  attestato: string;
  /** Come si arriva al corso: preventivo (la maggioranza), iscrizione (partenza differita) o informazioni (corsi finanziati). */
  cta: 'preventivo' | 'iscrizione' | 'informazioni';
  /** Nome ridotto per i titoli molto lunghi (facoltativo). */
  nomeBreve?: string;
};

const MIN = 140;
const MAX = 160;

/** Frase finale secondo il tipo di corso. La versione "senza impegno" è la prima a cadere se il testo è troppo lungo. */
const CHIUSURA = {
  preventivo: { piena: 'Richiedi quota e date senza impegno.', ridotta: 'Richiedi quota e date.' },
  iscrizione: { piena: 'Iscriviti senza pagamento anticipato.', ridotta: 'Iscriviti subito.' },
  informazioni: { piena: 'Richiedi informazioni senza impegno.', ridotta: 'Richiedi informazioni.' },
} as const;

/** Frasi vere che allungano una descrizione troppo corta (accreditamento dalle FAQ del sito: ente accreditato Regione Siciliana). */
// In ordine dalla più informativa alla più corta: si aggiunge la prima che ci sta, finché si arriva a 140 caratteri.
const RIEMPITIVI = ['Ente di formazione accreditato dalla Regione Siciliana.', 'Ente accreditato dalla Regione Siciliana.', 'Ente accreditato Regione Siciliana.', 'Ente accreditato.'];

function testoOre(ore: number[], aModuli: boolean): string {
  if (!ore.length) return '';
  const min = Math.min(...ore);
  const max = Math.max(...ore);
  if (min === max) return aModuli ? `modulo da ${min} ore` : `${min} ore`;
  return aModuli ? `moduli da ${min} a ${max} ore` : `da ${min} a ${max} ore`;
}

/** Le modalità con le parole della scheda: "Aula · Aula virtuale · FAD" → "in aula, aula virtuale e FAD". Le note tra parentesi si tolgono. */
export function testoModalita(modalita: string[]): string {
  const voci = Array.from(new Set(modalita.map((m) => m.replace(/\s*\([^)]*\)/g, '').trim()).filter(Boolean)));
  if (!voci.length) return '';
  const minuscolo = voci.map((v) => (/^[A-Z]{2,}\b/.test(v) ? v : v.charAt(0).toLowerCase() + v.slice(1)));
  const lista = minuscolo.length > 1 ? `${minuscolo.slice(0, -1).join(', ')} e ${minuscolo[minuscolo.length - 1]}` : minuscolo[0];
  // "in" solo davanti a una lista di aula/aula virtuale/FAD; "in presenza", "in sede" lo contengono già
  return /^(in\s|online)/i.test(lista) ? lista : `in ${lista}`;
}

function costruisci(d: DatiScheda, nome: string, chiusura: string, extra: string[]): string {
  const dettagli = [testoOre(d.ore, d.aModuli), testoModalita(d.modalita)].filter(Boolean).join(', ');
  const attestato = d.attestato ? `${d.attestato.replace(/[.\s]+$/, '')}.` : '';
  const principale = `Corso ${nome} a Vittoria (RG)${dettagli ? `: ${dettagli}` : ''}.`;
  return [principale, attestato, chiusura, ...extra].filter(Boolean).join(' ');
}

/** Descrizione di 140-160 caratteri (se i dati lo consentono). */
export function descrizioneScheda(d: DatiScheda): string {
  const base = d.nome.replace(/^corso\s+/i, '');
  const chiusura = CHIUSURA[d.cta];
  let s = costruisci(d, base, chiusura.piena, []);
  if (s.length > MAX) s = costruisci(d, base, chiusura.ridotta, []); // 1) via "senza impegno"
  if (s.length > MAX && d.nomeBreve) s = costruisci(d, d.nomeBreve, chiusura.ridotta, []); // 2) nome accorciato
  if (s.length > MAX) s = costruisci({ ...d, attestato: '' }, d.nomeBreve || base, chiusura.ridotta, []); // 3) senza l'attestato, ultima risorsa
  // Troppo corta: frasi vere in coda, solo se ci stanno
  for (const r of RIEMPITIVI) {
    if (s.length >= MIN) break;
    if (s.length + 1 + r.length <= MAX) s = `${s} ${r}`;
  }
  return s;
}

const MAX_TITOLO = 65;
/** "Corso <nome> a Vittoria (RG) - Alètheia Srl" se resta entro 65 caratteri, altrimenti senza località. */
export function titoloScheda(nome: string): string {
  const base = /^corso\b/i.test(nome) ? nome : `Corso ${nome}`;
  const conLuogo = `${base} a Vittoria (RG) - Alètheia Srl`;
  return conLuogo.length <= MAX_TITOLO ? conLuogo : `${base} - Alètheia Srl`;
}
