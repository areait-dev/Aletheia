import { useSiteOptions } from '../context/SiteOptionsContext';
import { useTheme } from '../context/ThemeContext';
import { costruisciMailto } from '../lib/moduli';
import type { TipoModulo, Valori } from '../lib/moduli';
import type { EsitoInvio } from '../lib/use-invio-modulo';

// Riquadro mostrato sopra il pulsante di invio quando la richiesta NON è partita: errore, antispam, oppure invio non attivo
// (manca RESEND_API_KEY). Non simula mai un invio: dice la verità e offre sempre un'altra strada (telefono, email, mailto già compilato).
// Colori: testi ≥ 4,5:1 sullo sfondo del riquadro (errore chiaro #7F1D1D su #FEF2F2 ≈ 9:1; scuro #FECACA su ~#2b2020 ≈ 10:1;
// avviso chiaro #78350F su #FFFBEB ≈ 9:1; scuro #FDE68A su ~#2b2618 ≈ 11:1). Link in turchese di testo (#04767D chiaro / #5FC2C8 scuro).
type Variante = 'auto' | 'chiara' | 'scura';

const PALETTE = {
  chiara: {
    errore: { bg: '#FEF2F2', bordo: '#FCA5A5', testo: '#7F1D1D', link: '#04767D', icona: '#B91C1C' },
    avviso: { bg: '#FFFBEB', bordo: '#FCD34D', testo: '#78350F', link: '#04767D', icona: '#B45309' },
  },
  scura: {
    errore: { bg: 'rgba(248,113,113,0.12)', bordo: 'rgba(248,113,113,0.55)', testo: '#FECACA', link: '#5FC2C8', icona: '#FCA5A5' },
    avviso: { bg: 'rgba(251,191,36,0.10)', bordo: 'rgba(251,191,36,0.5)', testo: '#FDE68A', link: '#5FC2C8', icona: '#FCD34D' },
  },
} as const;

interface Props {
  esito: EsitoInvio | null;
  tipo: TipoModulo;
  /** Valori correnti del modulo: servono a precompilare il mailto */
  valori: Valori;
  variante?: Variante;
  /** Nome del file scelto (se c'è): il mailto non può allegarlo, lo si ricorda a chi scrive */
  allegato?: string;
}

export default function EsitoModulo({ esito, tipo, valori, variante = 'auto', allegato }: Props) {
  const { identita } = useSiteOptions();
  const { theme } = useTheme() || { theme: 'light' };
  if (!esito || (esito.stato !== 'errore' && esito.stato !== 'senza-chiave' && esito.stato !== 'limite')) return null;

  const scuro = variante === 'scura' || (variante === 'auto' && theme === 'dark');
  const c = PALETTE[scuro ? 'scura' : 'chiara'][esito.stato === 'senza-chiave' ? 'avviso' : 'errore'];
  const tel = identita.telefono;
  const linkStile = { color: c.link, fontWeight: 700, textDecoration: 'underline', wordBreak: 'break-word' as const };
  // Il numero di telefono non va mai spezzato su due righe
  const telStile = { ...linkStile, whiteSpace: 'nowrap' as const };
  const contatti = (
    <span>
      <a href={`tel:${tel.replace(/[^+\d]/g, '')}`} style={telStile}>{tel}</a>
      {' · '}
      <a href={`mailto:${identita.email}`} style={linkStile}>{identita.email}</a>
    </span>
  );

  let titolo = '';
  let corpo: React.ReactNode = null;
  if (esito.stato === 'errore') {
    titolo = 'Non siamo riusciti a inviare la richiesta';
    corpo = <>La richiesta non è partita e nessuno l&apos;ha ricevuta. Riprova tra qualche istante con il pulsante qui sotto; se il problema continua, contattaci direttamente: {contatti}</>;
  } else if (esito.stato === 'limite') {
    titolo = 'Invio non possibile in questo momento';
    corpo = <>{esito.messaggio} Se hai urgenza, contattaci direttamente: {contatti}</>;
  } else {
    titolo = "L'invio dal sito non è ancora attivo";
    corpo = (
      <>
        La tua richiesta <strong>non è stata inviata</strong>. Per non perderla, apri l&apos;email già compilata con i tuoi dati e inviala dal tuo programma di posta, oppure chiamaci al{' '}
        <a href={`tel:${tel.replace(/[^+\d]/g, '')}`} style={telStile}>{tel}</a>.
        {allegato ? <> Il file «{allegato}» non viene incluso: ricordati di allegarlo tu all&apos;email.</> : null}
      </>
    );
  }

  return (
    <div
      role={esito.stato === 'senza-chiave' ? 'status' : 'alert'}
      data-esito={esito.stato}
      style={{ background: c.bg, border: `1.5px solid ${c.bordo}`, color: c.testo, borderRadius: '12px', padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}
    >
      <p style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', display: 'flex', gap: '0.55rem', alignItems: 'flex-start' }}>
        <i className={esito.stato === 'senza-chiave' ? 'fas fa-circle-info' : 'fas fa-triangle-exclamation'} aria-hidden="true" style={{ color: c.icona, marginTop: '0.2rem' }} />
        <span>{titolo}</span>
      </p>
      <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>{corpo}</p>
      {esito.stato === 'senza-chiave' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          <a href={costruisciMailto(tipo, valori, identita.email)} className={`btn ${scuro ? 'btn-light' : 'btn-primary'} btn-md`}>
            <i className="fas fa-envelope" aria-hidden="true" /> Apri l&apos;email già compilata
          </a>
        </div>
      )}
    </div>
  );
}
