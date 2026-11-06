/**
 * Messaggio unico quando non ci sono edizioni future pubblicate nel foglio del calendario (home, calendario, Formazione obbligatoria).
 * Il reparto formazione pubblica il calendario mese per mese: tra un mese e l'altro è normale non avere date.
 * Nessun titolo (h1/h2): sta dentro una sezione che ha già il suo.
 */
export default function NuoveDateInArrivo({ className = '' }: { className?: string }) {
  return (
    <div
      role="status"
      className={`nuove-date-in-arrivo bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl text-center ${className}`}
      style={{ padding: '2rem 1.25rem', maxWidth: '40rem', margin: '0 auto' }}
    >
      <i className="fas fa-calendar-days text-primary-text dark:text-primary-on-dark" aria-hidden="true" style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }} />
      <p className="text-slate-900 dark:text-gray-50" style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.35rem' }}>
        Nuove date in arrivo
      </p>
      <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
        Pubblichiamo il calendario mese per mese. Per un corso di cui hai bisogno, <a href="/contatti" className="text-primary-text dark:text-primary-on-dark" style={{ fontWeight: 700 }}>scrivici</a>: ti avvisiamo appena fissiamo la data.
      </p>
    </div>
  );
}
