import type { MouseEventHandler, ReactNode } from 'react';

interface PriceRow {
  label: string;
  value: ReactNode;
}

interface PricingSidebarProps {
  className?: string;
  title?: string;
  priceRows?: PriceRow[];
  customContent?: ReactNode;
  children?: ReactNode;
  buyLabel?: string;
  buyHref?: string;
  onBuyClick?: MouseEventHandler<HTMLAnchorElement>;
  addToCartLabel?: string;
  onAddToCartClick?: () => void;
  quoteLabel?: string;
  quoteHref?: string;
  whatsappHref?: string;
}

/**
 * Sidebar prezzo riutilizzabile per le pagine corso (pages/all-courses/[slug].js e
 * pages/all-courses/addetti-alla-conduzione-di-carriponte.js).
 *
 * Sticky a destra su desktop, full-width in flusso su mobile (il comportamento sticky/stacking
 * è gestito dal genitore tramite la classe "cp-price-area" già presente in entrambe le pagine).
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
  addToCartLabel = 'Aggiungi al carrello',
  onAddToCartClick,
  quoteLabel = 'Richiedi preventivo',
  quoteHref,
  whatsappHref,
}: PricingSidebarProps) {
  return (
    <div
      className={`bg-white dark:bg-dark-card rounded-xl shadow-md border border-gray-200 dark:border-[rgba(255,255,255,0.08)] ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <div className="p-6 md:p-7" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 className="text-gray-900 dark:text-white" style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
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

        {/* Gruppo bottoni compatto: gap-2 + azzeramento esplicito di margin su ogni bottone, per
            blindare la spaziatura da qualunque regola margin di provenienza globale. */}
        <div className="flex flex-col gap-2 !mt-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(buyHref || onBuyClick) && (
            <a
              href={buyHref || '#'}
              onClick={onBuyClick}
              className="w-full text-center text-white rounded-xl py-3 px-6 no-underline transition-transform !m-0 !mb-0 !mt-0"
              style={{
                background: 'linear-gradient(90deg, #0d9488, #10b981)', fontWeight: 700, fontSize: '0.95rem',
                boxShadow: '0 2px 6px rgba(13,148,136,0.25)', boxSizing: 'border-box',
                margin: 0, marginBottom: 0, marginTop: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <i className="fas fa-cart-shopping" style={{ marginRight: '0.5rem' }}></i>
              {buyLabel}
            </a>
          )}

          {onAddToCartClick && (
            <button
              type="button"
              onClick={onAddToCartClick}
              className="w-full text-center rounded-xl py-2.5 px-6 border border-gray-300 dark:border-[rgba(255,255,255,0.15)] text-gray-600 dark:text-gray-300 !m-0 !mb-0 !mt-0"
              style={{
                fontWeight: 600, fontSize: '0.85rem', background: 'transparent', boxSizing: 'border-box',
                cursor: 'pointer', fontFamily: 'inherit', paddingTop: '10px', paddingBottom: '10px',
                margin: 0, marginBottom: 0, marginTop: 0,
              }}
            >
              <i className="fas fa-cart-plus" style={{ marginRight: '0.5rem' }}></i>
              {addToCartLabel}
            </button>
          )}

          {quoteHref && (
            <a
              href={quoteHref}
              className="w-full text-center rounded-xl py-2.5 px-6 no-underline border border-teal-600/60 text-teal-700 dark:border-[#10B981]/50 dark:text-[#6EE7B7] !m-0 !mb-0 !mt-0"
              style={{
                fontWeight: 600, fontSize: '0.95rem', background: 'transparent', boxSizing: 'border-box',
                paddingTop: '10px', paddingBottom: '10px', margin: 0, marginBottom: 0, marginTop: 0,
              }}
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
              className="w-full text-center rounded-xl py-2.5 px-6 no-underline border border-emerald-600/60 text-emerald-600 dark:border-emerald-400/50 dark:text-emerald-400 !m-0 !mb-0 !mt-0"
              style={{
                fontWeight: 600, fontSize: '0.95rem', background: 'transparent', boxSizing: 'border-box',
                paddingTop: '10px', paddingBottom: '10px', margin: 0, marginBottom: 0, marginTop: 0,
              }}
            >
              <i className="fab fa-whatsapp" style={{ marginRight: '0.5rem' }}></i>
              Contattaci su WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
