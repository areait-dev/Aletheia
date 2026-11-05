// Ereditarietà dei dati tra corso base e aggiornamento (pages/all-courses/[slug].js).
// Regola (confermata dal reparto formazione, 5 novembre 2026): una variante di AGGIORNAMENTO eredita dal corso base dello STESSO livello
// modalità, attestato, validità e numero di partecipanti, quando la sua scheda in data/content/ non li indica. Così non si copiano a mano in
// ogni scheda e vale anche per i corsi futuri. Un valore indicato nell'aggiornamento ha sempre la precedenza (es. validità "Da ripetere
// ogni 5 anni"). Durata, descrizione, destinatari, obiettivi, FAQ e programma NON si ereditano: sono propri dell'aggiornamento.
// Non c'è ereditarietà tra famiglie diverse (es. "Raccogli frutta aggiornamento" è una famiglia separata dalla CRF da 8 ore).

type Contenuto = Record<string, unknown>;

/** Campi ereditati dal corso base. `partecipantiMax` e `partecipantiMin` sono due modi di dire lo stesso dato: vedi `ereditaDalBase`. */
export const CAMPI_EREDITATI = ['modalita', 'attestato', 'validita'] as const;
const CAMPI_PARTECIPANTI = ['partecipantiMax', 'partecipantiMin'] as const;

const vuoto = (v: unknown) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);

/**
 * Restituisce il contenuto dell'aggiornamento completato con i campi del corso base che mancano. Non modifica gli oggetti ricevuti.
 * Se l'aggiornamento indica già i partecipanti (massimo O minimo) non si eredita nessuno dei due: il dato è suo.
 * Se non c'è niente da ereditare restituisce lo stesso oggetto.
 */
export function ereditaDalBase<T extends Contenuto>(aggiornamento: T | null | undefined, base: Contenuto | null | undefined): T | null | undefined {
  if (!aggiornamento || !base) return aggiornamento;
  const ereditati: Contenuto = {};
  for (const campo of CAMPI_EREDITATI) {
    if (vuoto(aggiornamento[campo]) && !vuoto(base[campo])) ereditati[campo] = base[campo];
  }
  if (CAMPI_PARTECIPANTI.every((c) => vuoto(aggiornamento[c]))) {
    for (const campo of CAMPI_PARTECIPANTI) if (!vuoto(base[campo])) ereditati[campo] = base[campo];
  }
  return Object.keys(ereditati).length ? { ...aggiornamento, ...ereditati } : aggiornamento;
}
