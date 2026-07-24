import { useState } from 'react';

const SOCIAL = [
  { icon: 'fab fa-linkedin-in',    label: 'LinkedIn' },
  { icon: 'fab fa-facebook-f',     label: 'Facebook' },
  { icon: 'fab fa-instagram',      label: 'Instagram' },
  { icon: 'fab fa-telegram-plane', label: 'Telegram' },
];

const CONTRACT_COLORS = {
  'Tempo indeterminato': { bg: '#008C95', text: '#fff' },
  'Tempo determinato':   { bg: '#6366F1', text: '#fff' },
  'Somministrazione':    { bg: '#F59E0B', text: '#0F172A' },
};

export default function JobOfferCard({ offerta, onApply }) {
  const [hovered, setHovered] = useState(false);
  const contractColor = CONTRACT_COLORS[offerta.tipoContratto] || { bg: '#008C95', text: '#fff' };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${offerta.titolo} - ${offerta.città}. Clicca per candidarti`}
      onClick={() => onApply(offerta)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onApply(offerta)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '4 / 5',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 32px 64px rgba(0,0,0,0.4), 0 0 0 2px rgba(0,140,149,0.5)'
          : '0 8px 28px rgba(0,0,0,0.22)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        userSelect: 'none',
        outline: 'none',
      }}
    >
      {/* ── Background image ── */}
      <img
        src={offerta.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'; }}
      />

      {/* ── Gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(170deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.88) 100%)',
      }} />

      {/* ── Teal accent top-right ── */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '120px', height: '120px',
        background: 'radial-gradient(circle at top right, rgba(0,140,149,0.35) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Content layout ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '1.4rem',
      }}>

        {/* TOP - Logo + badge contratto */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'auto' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <img
              src="/logo.png"
              alt="Alètheia APL"
              style={{
                height: '36px',
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                opacity: 0.92,
              }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {/* Tipo contratto badge */}
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: contractColor.text,
            background: contractColor.bg,
            padding: '0.28rem 0.65rem',
            borderRadius: '999px',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            whiteSpace: 'nowrap',
          }}>
            {offerta.tipoContratto}
          </span>
        </div>

        {/* MIDDLE - RICERCA + ruolo + sede */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingBottom: '1rem' }}>
          {/* Label "RICERCA:" */}
          <p style={{
            margin: 0,
            color: '#10B981',
            fontSize: '0.62rem',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}>
            RICERCA:
          </p>

          {/* Titolo ruolo */}
          <h2 style={{
            margin: 0,
            color: '#ffffff',
            fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
          }}>
            {offerta.titolo}
          </h2>

          {/* Sede */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <i className="fas fa-map-marker-alt" style={{ color: '#10B981', fontSize: '0.8rem', flexShrink: 0 }}></i>
            <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, textShadow: '0 1px 4px rgba(0,0,0,0.6)', lineHeight: 1.3 }}>
              <span style={{ color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.58rem' }}>
                SEDE DI LAVORO:{' '}
              </span>
              <span style={{ color: '#ffffff' }}>{offerta.città}</span>
            </p>
          </div>
        </div>

        {/* Separatore */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.18)', marginBottom: '0.85rem' }} />

        {/* BOTTOM - Social + URL + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {SOCIAL.map(({ icon, label }) => (
                <div
                  key={label}
                  title={label}
                  style={{
                    width: '26px', height: '26px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className={icon} style={{ color: '#fff', fontSize: '0.65rem' }}></i>
                </div>
              ))}
            </div>
            {/* URL */}
            <span style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'lowercase',
            }}>
              www.aletheiasrl.it
            </span>
          </div>

          {/* CTA button */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            background: hovered
              ? 'linear-gradient(90deg, #008C95, #10B981)'
              : 'rgba(0,140,149,0.78)',
            backdropFilter: 'blur(4px)',
            borderRadius: '999px',
            padding: '0.6rem 1rem',
            transition: 'background 0.25s ease',
            border: '1px solid rgba(0,140,149,0.4)',
          }}>
            <i className="fas fa-paper-plane" style={{ color: '#fff', fontSize: '0.75rem' }}></i>
            <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.04em' }}>
              Candidati ora
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
