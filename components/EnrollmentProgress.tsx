interface EnrollmentProgressProps {
  courseTitle: string;
}

/**
 * Iscrizione ai corsi del catalogo a partenza differita (OSS, ASACOM, Conduttore d'Impresa Agricola, BLSD...).
 * Il pulsante porta al modulo vero /iscrizione?corso=<titolo>, che arriva a info@ via Resend
 * (pages/api/moduli/iscrizione). Sono ISCRIZIONI: la PRE-iscrizione (/pre-iscrizione) è solo per gli avvisi
 * pubblici (components/ArchivioScheda.js). Prima era un contatore in localStorage che non avvisava nessuno:
 * è stato tolto perché non esiste un dato reale da cui leggere il numero di iscritti. Si potrà
 * reintrodurre leggendolo dal foglio Google dei corsi (vedi MIGRAZIONE.md).
 */
export default function EnrollmentProgress({ courseTitle }: EnrollmentProgressProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <a
        href={`/iscrizione?corso=${encodeURIComponent(courseTitle)}`}
        className="w-full text-center text-white rounded-full min-h-[44px] flex items-center justify-center px-6 no-underline transition-transform !m-0 whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg, #0d9488, #10b981)',
          fontWeight: 700, fontSize: '0.95rem', border: 'none',
          boxShadow: '0 2px 6px rgba(13,148,136,0.25)',
          boxSizing: 'border-box', fontFamily: 'inherit',
        }}
      >
        <i className="fas fa-user-plus" style={{ marginRight: '0.5rem' }} aria-hidden="true"></i>
        Iscriviti
      </a>
      <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.78rem', margin: 0 }}>
        Nessun pagamento anticipato: lasci i tuoi dati e ti contattiamo noi.
      </p>
    </div>
  );
}
