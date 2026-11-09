// Testo del campo "Partecipanti" della scheda tecnica di un corso (pages/corsi/[slug].js).
// Regole del reparto formazione (9 novembre 2026):
// - il limite massimo vale per aula e aula virtuale; in FAD non c'è nessun limite di partecipanti;
// - Decreto Attrezzature: max 25 per la teoria in aula, max 6 per la parte pratica (campo `partecipantiPraticaMax`).
type Contenuto = Record<string, unknown>;

const èFad = (m: unknown) => typeof m === 'string' && m.trim().toUpperCase().startsWith('FAD');

export function testoPartecipanti(c: Contenuto | null | undefined): string | null {
  if (!c) return null;
  const max = c.partecipantiMax as number | null | undefined;
  const min = c.partecipantiMin as number | null | undefined;
  const pratica = c.partecipantiPraticaMax as number | null | undefined;
  const modalita = Array.isArray(c.modalita) ? (c.modalita as unknown[]) : c.modalita ? [c.modalita] : [];
  const soloFad = modalita.length > 0 && modalita.every(èFad);
  const conFad = modalita.some(èFad);

  if (soloFad) return 'Nessun limite (FAD)';
  if (max != null) {
    let testo = pratica != null ? `Max ${max} per la teoria in aula · Max ${pratica} per la pratica` : `Max ${max} persone`;
    if (conFad) testo += ' (in aula e aula virtuale); nessun limite in FAD';
    return testo;
  }
  if (min != null) return `Minimo ${min} persone`;
  return null;
}
