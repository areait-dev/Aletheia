/**
 * Banner scuro / card verde petrolio con la scheda tecnica del corso (durata, validità, attestato,
 * partecipanti, modalità, luogo del corso). Va renderizzato come PRIMO elemento dentro il tab
 * "Panoramica" di ogni pagina corso (standard architetturale approvato) - non più nella hero di testa.
 *
 * `items` è l'elenco base (icona/label/valore in sola lettura); `children`, se presente, viene
 * accodato come cella extra della stessa griglia (usato per lo switch Aula/Videoconferenza + link
 * mappa "Luogo del corso", che nelle pagine chiamanti restano stateful e quindi non sono riducibili
 * a un item statico).
 */
export default function CourseSchedaTecnica({ items = [], children }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', borderRadius: '1.5rem', padding: 'clamp(1.5rem, 3.5vw, 2rem)', position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.14) 0%, transparent 70%)' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 1.25rem' }}>
          Scheda tecnica
        </h2>
        <div className="cp-scheda-grid">
          {items.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={s.icon} style={{ color: '#6EE7B7', fontSize: '0.9rem' }}></i>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{s.label}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{s.value}</span>
              </div>
            </div>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
}
