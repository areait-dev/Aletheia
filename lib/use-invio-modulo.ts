// Invio dei moduli dal browser: costruisce il multipart, chiama pages/api/moduli/<tipo> e traduce la risposta in uno stato.
// Gli stati sono quattro e il sito non ne inventa altri:
//   ok            → il server ha ricevuto l'ok da Resend (solo allora si mostra "inviato")
//   errori        → validazione fallita (campo → messaggio)
//   errore        → invio non riuscito (Resend, rete, configurazione): niente è partito
//   senza-chiave  → l'invio dal sito non è attivo (manca RESEND_API_KEY): niente è partito, si offre il mailto
//   limite        → antispam (troppo veloce / troppi invii): messaggio dal server
import { useCallback, useEffect, useRef, useState } from 'react';
import { CAMPO_TRAPPOLA, MSG_ALLEGATO_GRANDE } from './moduli';
import type { TipoModulo, Valori } from './moduli';

export type EsitoInvio =
  | { stato: 'ok' }
  | { stato: 'errori'; errori: Record<string, string> }
  | { stato: 'errore' }
  | { stato: 'senza-chiave' }
  | { stato: 'limite'; messaggio: string };

export async function inviaModulo(tipo: TipoModulo, valori: Valori, file: File | null, tempoMs: number, trappola: string, emailInfo?: string): Promise<EsitoInvio> {
  const corpo = new FormData();
  const sorgente = valori as Record<string, unknown>;
  Object.keys(sorgente).forEach((k) => {
    const v = sorgente[k];
    corpo.append(k, typeof v === 'string' ? v : v == null ? '' : String(v));
  });
  if (file) corpo.append('allegato', file, file.name);
  corpo.append('tempo', String(Math.round(tempoMs)));
  corpo.append(CAMPO_TRAPPOLA, trappola);
  try {
    const r = await fetch(`/api/moduli/${tipo}`, { method: 'POST', body: corpo });
    let json: { stato?: string; errori?: Record<string, string>; messaggio?: string } | null = null;
    try { json = await r.json(); } catch { /* risposta non JSON (es. 413 della piattaforma) */ }
    if (r.status === 413) return { stato: 'errori', errori: { allegato: MSG_ALLEGATO_GRANDE(emailInfo || 'info@aletheiasrl.it') } };
    if (r.ok && json?.stato === 'ok') return { stato: 'ok' };
    if (json?.stato === 'errori' && json.errori) return { stato: 'errori', errori: json.errori };
    if (json?.stato === 'senza-chiave') return { stato: 'senza-chiave' };
    if (json?.stato === 'limite') return { stato: 'limite', messaggio: json.messaggio || 'Riprova tra qualche minuto.' };
    return { stato: 'errore' };
  } catch {
    return { stato: 'errore' };
  }
}

/** Stato di invio di un modulo. `invia` legge anche il campo-trappola dal <form> e misura il tempo di compilazione. */
export function useInvioModulo(tipo: TipoModulo, emailInfo?: string) {
  const inizio = useRef(0);
  const [inviando, setInviando] = useState(false);
  const [esito, setEsito] = useState<EsitoInvio | null>(null);
  useEffect(() => { inizio.current = Date.now(); }, []);

  const invia = useCallback(async (form: HTMLFormElement, valori: Valori, file: File | null = null): Promise<EsitoInvio> => {
    const campo = form.elements.namedItem(CAMPO_TRAPPOLA) as HTMLInputElement | null;
    setInviando(true);
    setEsito(null);
    const r = await inviaModulo(tipo, valori, file, Date.now() - inizio.current, campo?.value || '', emailInfo);
    setInviando(false);
    setEsito(r);
    return r;
  }, [tipo, emailInfo]);

  /** Torna al modulo vuoto (es. "Nuova richiesta"): riparte anche il conteggio del tempo di compilazione */
  const azzera = useCallback(() => { setEsito(null); inizio.current = Date.now(); }, []);
  const pulisci = useCallback(() => setEsito(null), []);
  return { inviando, esito, invia, azzera, pulisci };
}
