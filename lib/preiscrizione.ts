// Regola della scadenza della pre-iscrizione di un avviso (components/ArchivioScheda.js).
// La scadenza è una data `AAAA-MM-GG` ed è INCLUSA: il giorno stesso si può ancora pre-iscriversi, dal giorno dopo è chiusa.
// "Oggi" si calcola in ora italiana, non in UTC: a mezzanotte italiana la regola cambia con il calendario di chi legge.
// Senza scadenza (o con una data non valida) la pre-iscrizione resta aperta: meglio un pulsante in più di uno in meno
// per un errore di battitura nel campo.

export const FUSO_ORARIO = 'Europe/Rome';

/** Data di oggi in ora italiana, nel formato `AAAA-MM-GG`. */
export function oggiIT(adesso: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: FUSO_ORARIO, year: 'numeric', month: '2-digit', day: '2-digit' }).format(adesso);
}

/** true se la scadenza (`AAAA-MM-GG`) è già passata rispetto a `adesso`. */
export function preiscrizioneChiusa(scadenza: string | null | undefined, adesso: Date = new Date()): boolean {
  const s = (scadenza || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  return s < oggiIT(adesso);
}
