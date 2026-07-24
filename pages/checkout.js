import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const router = useRouter();
  const { cart, total, updateQty, removeFromCart } = useCart();
  const [form, setForm] = useState({ nome: '', cognome: '', email: '', telefono: '', note: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Riepilogo testuale dei prodotti, passato a /contatti come query param.
    const riepilogo = cart
      .map((i) => `${i.title}${i.variant ? ` (${i.variant})` : ''} x${i.qty} - € ${i.price * i.qty}`)
      .join('; ');
    const params = new URLSearchParams({
      tipo: 'ordine',
      nome: `${form.nome} ${form.cognome}`.trim(),
      email: form.email,
      telefono: form.telefono,
      note: form.note,
      ordine: riepilogo,
      totale: String(total),
    });
    router.push(`/contatti?${params.toString()}`);

    // TODO: integrare Stripe Checkout
    // Qui, in produzione, si creerà una Checkout Session lato server
    // (es. /api/create-checkout-session) e si reindirizzerà l'utente a Stripe
    // con stripe.redirectToCheckout({ sessionId }).
  };

  const inputClass =
    'w-full rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 border border-gray-200 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500';

  // "Tile" bianca per i loghi dei metodi di pagamento
  const payTile = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    minWidth: '48px',
    padding: '0 0.5rem',
    background: '#fff',
    border: '1px solid #E5E7EB',
    borderRadius: '0.4rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };

  return (
    <>
      <Head>
        <title>Checkout - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header active="/checkout" />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0a4f54 60%, #008C95 100%)', color: 'white', paddingTop: '7rem', paddingBottom: '2.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/all-courses" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem' }}>
            ← Torna ai corsi
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>Riepilogo ordine</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem' }}>Verifica i tuoi corsi e completa la richiesta</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-dark-bg" style={{ minHeight: '60vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem 4rem 2rem' }}>

          {cart.length === 0 ? (
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1rem', padding: '3rem 2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</p>
              <p className="text-gray-600 dark:text-gray-300" style={{ marginBottom: '1.5rem' }}>Il tuo carrello è vuoto.</p>
              <Link
                href="/all-courses"
                className="no-underline"
                style={{ display: 'inline-block', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 700 }}
              >
                Scopri i corsi
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
              {/* Riepilogo prodotti */}
              <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
                <h2 className="text-gray-900 dark:text-gray-50" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                  I tuoi corsi
                </h2>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid #F3F4F6', alignItems: 'flex-start' }}>

                    {/* Thumbnail */}
                    <div style={{ width: '64px', height: '64px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, background: '#F0FDFA' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #008C95, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.25rem' }}>
                          📚
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: '0 0 0.2rem 0', color: '#0F172A' }}>{item.title}</p>
                          {item.variant && <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: '0 0 0.4rem 0' }}>{item.variant}</p>}
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '0.85rem', flexShrink: 0, padding: '0 0 0 0.5rem' }}>✕</button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: '24px', height: '24px', borderRadius: '9999px', border: '1px solid #E5E7EB', background: '#F9FAFB', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>−</button>
                          <span style={{ fontWeight: 600, minWidth: '18px', textAlign: 'center', fontSize: '0.875rem' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: '24px', height: '24px', borderRadius: '9999px', border: '1px solid #E5E7EB', background: '#F9FAFB', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>+</button>
                        </div>
                        <p style={{ fontWeight: 700, color: '#008C95', margin: 0, fontSize: '0.95rem' }}>
                          € {(item.price * item.qty).toLocaleString('it-IT')}
                          {item.qty > 1 && <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 400, marginLeft: '0.3rem' }}>(€ {item.price} × {item.qty})</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Subtotale</span>
                    <span style={{ fontSize: '0.875rem', color: '#0F172A', fontWeight: 500 }}>€ {total.toLocaleString('it-IT')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>IVA (22%)</span>
                    <span style={{ fontSize: '0.875rem', color: '#0F172A', fontWeight: 500 }}>€ {(total * 0.22).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '2px solid #E5E7EB' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Totale ordine</span>
                    <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#008C95' }}>€ {(total * 1.22).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Form contatto */}
              <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1rem', padding: '1.5rem' }}>
                <h2 className="text-gray-900 dark:text-gray-50" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                  I tuoi dati
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input className={inputClass} name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
                  <input className={inputClass} name="cognome" placeholder="Cognome" value={form.cognome} onChange={handleChange} required />
                  <input className={inputClass} type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                  <input className={inputClass} type="tel" name="telefono" placeholder="Telefono" value={form.telefono} onChange={handleChange} />
                  <textarea className={inputClass} name="note" placeholder="Note (opzionale)" rows="3" value={form.note} onChange={handleChange} style={{ resize: 'vertical' }} />
                </div>

                {/* TODO: integrare Stripe Checkout */}
                {/* In produzione il pulsante qui sotto avvierà una Stripe Checkout Session
                    al posto del reindirizzamento a /contatti. */}

                {/* Placeholder metodi di pagamento (solo visivo, non operativo) */}
                <div style={{ background: '#F9FAFB', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center', marginBottom: '1rem', marginTop: '1.25rem', border: '1px solid #E5E7EB' }}>
                  <p style={{ fontSize: '0.78rem', color: '#6B7280', marginBottom: '0.6rem', fontWeight: 600 }}>Metodi di pagamento accettati</p>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Ogni logo è una "tile" bianca con SVG inline (colori brand attuali) */}
                    <span style={payTile} title="Visa">
                      <svg width="40" height="14" viewBox="0 0 40 14" role="img" aria-label="Visa">
                        <text x="20" y="12" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#1A1F71">VISA</text>
                      </svg>
                    </span>

                    <span style={payTile} title="Mastercard">
                      <svg width="36" height="24" viewBox="0 0 36 24" role="img" aria-label="Mastercard">
                        <circle cx="14" cy="12" r="8" fill="#EB001B" />
                        <circle cx="22" cy="12" r="8" fill="#F79E1B" />
                        <path d="M18 5.8a8 8 0 0 0 0 12.4 8 8 0 0 0 0-12.4Z" fill="#FF5F00" />
                      </svg>
                    </span>

                    <span style={payTile} title="PayPal">
                      <svg width="50" height="14" viewBox="0 0 50 14" role="img" aria-label="PayPal">
                        <text x="0" y="12" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#003087">Pay</text>
                        <text x="24" y="12" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#009CDE">Pal</text>
                      </svg>
                    </span>

                    <span style={{ ...payTile, background: '#000' }} title="Apple Pay">
                      <i className="fab fa-apple" style={{ color: '#fff', fontSize: '0.95rem', marginRight: '0.2rem' }}></i>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem' }}>Pay</span>
                    </span>

                    <span style={payTile} title="Google Pay">
                      <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-label="Google">
                        <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7C21.8 18.9 23 15.9 23 12.3Z" />
                        <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.4 1.1-3.9 1.1-3 0-5.5-2-6.4-4.8H1.8v3C3.7 21.4 7.6 24 12 24Z" />
                        <path fill="#FBBC05" d="M5.6 14.6a7.2 7.2 0 0 1 0-4.6V7H1.8a12 12 0 0 0 0 10.6l3.8-3Z" />
                        <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.6 0 3.7 2.6 1.8 6.4l3.8 3C6.5 6.7 9 4.8 12 4.8Z" />
                      </svg>
                      <span style={{ color: '#5F6368', fontWeight: 600, fontSize: '0.8rem', marginLeft: '0.25rem' }}>Pay</span>
                    </span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '0.5rem' }}>Pagamento sicuro - in arrivo prossimamente</p>
                </div>

                <button
                  type="submit"
                  style={{ width: '100%', marginTop: '1.25rem', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff', padding: '0.9rem', borderRadius: '9999px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  Invia richiesta d&apos;ordine
                </button>
                <p className="text-gray-400 dark:text-gray-400" style={{ fontSize: '0.8rem', marginTop: '0.75rem', textAlign: 'center' }}>
                  Il nostro team ti contatterà per completare il pagamento.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
