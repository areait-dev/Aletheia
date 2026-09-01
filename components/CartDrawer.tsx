import { useCart } from '../context/CartContext';
import Link from 'next/link';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart = [], removeFromCart, updateQty, total, clearCart } = useCart() || {};

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9998 }}
        />
      )}

      {/* Drawer */}
      <div
        className="bg-white dark:bg-dark-card"
        style={{
          position: 'fixed', top: 0, right: 0, height: '100%', width: '400px', maxWidth: '95vw',
          zIndex: 9999, transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-gray-900 dark:text-gray-50" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Il tuo carrello {cart.length > 0 && `(${cart.reduce((s: number, i: any) => s + i.qty, 0)})`}
          </h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400" style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {cart.length === 0 ? (
            <div className="text-gray-400 dark:text-gray-400" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒</p>
              <p>Il carrello è vuoto</p>
            </div>
          ) : cart.map((item: any) => (
            <div key={item.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #F3F4F6' }}>

              {/* Riga 1: titolo + pulsante rimuovi */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <p className="text-sm font-semibold text-slate-900 dark:text-white" style={{ margin: 0, flex: 1 }}>
                  {item.title}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, fontSize: '0.85rem', padding: 0 }}
                >
                  ✕
                </button>
              </div>

              {/* Riga 2: variante */}
              {item.variant && (
                <p className="text-xs text-slate-500 dark:text-gray-400" style={{ margin: '0 0 0.5rem 0' }}>
                  {item.variant}
                </p>
              )}

              {/* Riga 3: prezzo totale riga + controlli quantità */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="font-bold text-primary dark:text-[#10B981]" style={{ margin: 0, fontSize: '0.95rem' }}>
                  € {(item.price * item.qty).toLocaleString('it-IT')}
                  {item.qty > 1 && (
                    <span className="text-slate-400 dark:text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 400, marginLeft: '0.35rem' }}>
                      (€ {item.price} × {item.qty})
                    </span>
                  )}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="text-slate-700 dark:text-gray-200 bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-gray-600"
                    style={{ width: '26px', height: '26px', borderRadius: '9999px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    −
                  </button>
                  <span className="font-semibold text-slate-900 dark:text-white" style={{ minWidth: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="text-slate-700 dark:text-gray-200 bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-gray-600"
                    style={{ width: '26px', height: '26px', borderRadius: '9999px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="text-gray-900 dark:text-gray-50" style={{ fontWeight: 600 }}>Totale</span>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#008C95' }}>€ {total.toLocaleString('it-IT')}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              style={{ display: 'block', width: '100%', textAlign: 'center', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff', padding: '0.85rem', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none', marginBottom: '0.75rem' }}
            >
              Procedi all&apos;ordine
            </Link>
            <button
              onClick={clearCart}
              className="border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
              style={{ width: '100%', background: 'none', borderRadius: '9999px', padding: '0.75rem', cursor: 'pointer', fontWeight: 500 }}
            >
              Svuota carrello
            </button>
          </div>
        )}
      </div>
    </>
  );
}
