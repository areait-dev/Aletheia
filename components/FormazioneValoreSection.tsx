interface Valore {
  icon: string;
  titolo: string;
  testo: string;
}

interface FormazioneValoreSectionProps {
  titolo?: string;
  valori?: Valore[];
}

const DEFAULT_VALORI: Valore[] = [
  { icon: 'fas fa-shield-halved', titolo: 'Conformità normativa garantita', testo: 'Percorsi progettati in aderenza alla normativa vigente, con attestato valido su tutto il territorio nazionale.' },
  { icon: 'fas fa-chalkboard-user', titolo: 'Docenti qualificati', testo: 'Formatori con esperienza diretta sul campo, in grado di calare la normativa nelle situazioni operative reali.' },
  { icon: 'fas fa-arrows-to-circle', titolo: 'Flessibilità di erogazione', testo: 'Corsi in aula o in videoconferenza, anche direttamente in azienda, per adattarsi alle esigenze organizzative di ogni realtà.' },
];

/**
 * Sezione indipendente, sfondo chiaro, subito sotto la hero scura di testa (mai dentro di essa):
 * 3 colonne minimali (icona verde petrolio, titolo, testo), 1 colonna su mobile. Stesso contenuto
 * di default su tutte le pagine corso, sovrascrivibile per famiglia tramite `titolo`/`valori`.
 */
export default function FormazioneValoreSection({ titolo = 'Formazione che crea valore, non solo attestati', valori = DEFAULT_VALORI }: FormazioneValoreSectionProps) {
  return (
    <section className="bg-slate-50 dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
      <div className="container">
        <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, textAlign: 'center', marginBottom: '2.5rem' }}>
          {titolo}
        </h2>
        <div className="cp-valore-grid">
          {valori.map((v) => (
            <div key={v.titolo} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(0,140,149,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={v.icon} style={{ color: '#008C95', fontSize: '1.4rem' }}></i>
              </div>
              <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>{v.titolo}</h3>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.65, margin: 0, maxWidth: '320px' }}>{v.testo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
