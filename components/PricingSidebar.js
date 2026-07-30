/**
 * Sidebar prezzo riutilizzabile per le pagine corso (pages/all-courses/[slug].js e
 * pages/all-courses/addetti-alla-conduzione-di-carriponte.js).
 *
 * Sticky a destra su desktop, full-width in flusso su mobile (il comportamento sticky/stacking
 * è gestito dal genitore tramite la classe "cp-price-area" già presente in entrambe le pagine -
 * qui viene solo passata attraverso `className`).
 *
 * Contenuto (in ordine): title -> customContent (se presente, sostituisce priceRows per i casi non
 * riducibili a righe prezzo: corso finanziato, selezione varianti, ecc.) oppure priceRows (una o più
 * righe label/valore) -> children (contenuto extra facoltativo, es. notice informativa) -> bottoni.
 */
export default function PricingSidebar({
  className = '',
  title = 'Prezzi e iscrizione',
  priceRows,
  customContent,
  children,
  buyLabel = 'Acquista ora',
  buyHref,
  onBuyClick,
  quoteLabel = 'Richiedi preventivo',
  quoteHref,
  whatsappHref,
}) {
  return (
    <div
      className={`bg-white dark:bg-dark-card rounded-xl shadow-md border border-gray-200 dark:border-[rgba(255,255,255,0.08)] ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #0d9488, #10b981)' }} />

      <div className="p-6 md:p-8" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h2 className="text-gray-900 dark:text-white" style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </h2>

        {customContent ? (
          customContent
        ) : priceRows ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {priceRows.map((row, i) => (
              <div
                key={row.label}
                className={i < priceRows.length - 1 ? 'border-b border-gray-100 dark:border-[rgba(255,255,255,0.08)]' : ''}
                style={{ paddingBottom: i < priceRows.length - 1 ? '0.85rem' : 0 }}
              >
                <span className="text-gray-500 dark:text-gray-400" style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                  {row.label}
                </span>
                <span
                  className="text-teal-600 dark:text-[#10B981]"
                  style={{ fontSize: i === 0 ? '1.85rem' : '1.15rem', fontWeight: 800, lineHeight: 1 }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {children}

        {(buyHref || onBuyClick) && (
          <a
            href={buyHref || '#'}
            onClick={onBuyClick}
            className="w-full text-center text-white rounded-xl py-3 px-6 no-underline transition-transform"
            style={{
              background: 'linear-gradient(90deg, #0d9488, #10b981)', fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 4px 16px rgba(13,148,136,0.3)', boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <i className="fas fa-cart-shopping" style={{ marginRight: '0.5rem' }}></i>
            {buyLabel}
          </a>
        )}

        {quoteHref && (
          <a
            href={quoteHref}
            className="w-full text-center rounded-xl py-3 px-6 no-underline border border-teal-600/60 text-teal-700 dark:border-[#10B981]/50 dark:text-[#6EE7B7]"
            style={{ fontWeight: 600, fontSize: '0.95rem', background: 'transparent', boxSizing: 'border-box' }}
          >
            <i className="fas fa-file-invoice" style={{ marginRight: '0.5rem' }}></i>
            {quoteLabel}
          </a>
        )}

        {whatsappHref && (
          <a
            href={whatsappHref}
            target={whatsappHref !== '#' ? '_blank' : undefined}
            rel={whatsappHref !== '#' ? 'noopener noreferrer' : undefined}
            className="w-full text-center rounded-xl py-3 px-6 no-underline border border-emerald-600/60 text-emerald-600 dark:border-emerald-400/50 dark:text-emerald-400"
            style={{ fontWeight: 600, fontSize: '0.95rem', background: 'transparent', boxSizing: 'border-box' }}
          >
            <i className="fab fa-whatsapp" style={{ marginRight: '0.5rem' }}></i>
            Contattaci su WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
