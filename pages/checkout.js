import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

// Individua il circuito dalla prima cifra/prefisso, per evidenziare il logo corrispondente
// mentre l'utente digita: stessa logica UX (non funzionale) usata dai form di pagamento reali.
function detectCardBrand(number) {
  const n = number.replace(/\s+/g, '');
  if (/^4/.test(n)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'mastercard';
  if (/^3[47]/.test(n)) return 'amex';
  return null;
}

// Formattazione "a blocchi" del numero carta (xxxx xxxx xxxx xxxx) man mano che si digita
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

// Formattazione scadenza MM/AA con slash automatico
function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function luhnCheck(number) {
  const digits = number.replace(/\s+/g, '');
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return digits.length >= 13 && sum % 10 === 0;
}

export default function Checkout() {
  const router = useRouter();
  const { cart, total, updateQty, removeFromCart, clearCart } = useCart();
  const [form, setForm] = useState({ nome: '', cognome: '', email: '', telefono: '', note: '' });
  const [card, setCard] = useState({ numero: '', nome: '', scadenza: '', cvv: '' });
  const [cardErrors, setCardErrors] = useState({});
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    if (name === 'numero') next = formatCardNumber(value);
    if (name === 'scadenza') next = formatExpiry(value);
    if (name === 'cvv') next = value.replace(/\D/g, '').slice(0, 4);
    setCard((prev) => ({ ...prev, [name]: next }));
  };

  const validateCard = () => {
    const errors = {};
    if (!luhnCheck(card.numero)) errors.numero = 'Numero carta non valido';
    if (!card.nome.trim()) errors.nome = 'Inserisci il nome sulla carta';
    const [mm, yy] = card.scadenza.split('/');
    const now = new Date();
    const validExpiry =
      mm && yy && yy.length === 2 && Number(mm) >= 1 && Number(mm) <= 12 &&
      (2000 + Number(yy) > now.getFullYear() || (2000 + Number(yy) === now.getFullYear() && Number(mm) >= now.getMonth() + 1));
    if (!validExpiry) errors.scadenza = 'Scadenza non valida';
    if (!/^\d{3,4}$/.test(card.cvv)) errors.cvv = 'CVV non valido';
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCard()) return;

    // Nessun addebito reale: simula solo il tempo di elaborazione di un vero
    // gateway di pagamento (es. Stripe) per mostrare la logica del flusso d'acquisto.
    setStep('processing');
    setTimeout(() => {
      setOrderId(`AL-${Date.now().toString().slice(-8)}`);
      setStep('success');
      clearCart();

      // TODO: integrare un vero gateway di pagamento (es. Stripe Checkout / Payment
      // Intents). In produzione, al posto del setTimeout qui sopra, si creerà una
      // Checkout Session lato server (es. /api/create-checkout-session) e si
      // processerà il pagamento reale prima di mostrare la conferma.
    }, 1400);
  };

  const cardBrand = detectCardBrand(card.numero);

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

      <Header active="/checkout" solid />

      <main>

      {/* Banner modalità demo: questa pagina è raggiungibile pubblicamente e non ha
          alcun gateway di pagamento reale collegato — lo segnaliamo esplicitamente
          all'utente prima che inserisca dati di una carta. */}
      <div
        className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200"
        /* paddingTop copre l'header fisso (site-header: 2 * 0.75rem di padding + 80px di logo = 6.5rem)
           più un piccolo margine di respiro, altrimenti la prima riga di testo finisce dietro l'header. */
        style={{ paddingTop: '6.75rem', paddingBottom: '0.85rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', textAlign: 'center' }}
      >
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <i className="fas fa-triangle-exclamation" aria-hidden="true"></i>
          Modalità dimostrativa — nessun pagamento reale verrà elaborato
        </p>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0a4f54 60%, #008C95 100%)', color: 'white', paddingTop: '2.5rem', paddingBottom: '2.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
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

          {step === 'success' ? (
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1rem', padding: '3rem 2rem', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '9999px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <i className="fas fa-check" style={{ color: '#16A34A', fontSize: '1.75rem' }}></i>
              </div>
              <h2 className="text-gray-900 dark:text-gray-50" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Pagamento completato</h2>
              <p className="text-gray-600 dark:text-gray-300" style={{ marginBottom: '0.25rem' }}>
                Grazie {form.nome}, il tuo ordine è stato ricevuto.
              </p>
              <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: '0.85rem', marginBottom: '1.75rem' }}>
                Numero ordine <strong>{orderId}</strong> — conferma inviata a {form.email}
              </p>
              <Link
                href="/all-courses"
                className="no-underline"
                style={{ display: 'inline-block', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 700 }}
              >
                Torna ai corsi
              </Link>
            </div>
          ) : cart.length === 0 ? (
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
                    <div style={{ width: '64px', height: '64px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, background: '#F0FDFA', position: 'relative' }}>
                      {item.image ? (
                        <Image src={item.image} alt={item.title} fill sizes="64px" style={{ objectFit: 'cover' }} />
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
                        <button onClick={() => removeFromCart(item.id)} aria-label={`Rimuovi ${item.title} dal carrello`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '0.85rem', flexShrink: 0, padding: '0 0 0 0.5rem' }}>✕</button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label={`Diminuisci quantità di ${item.title}`} style={{ width: '24px', height: '24px', borderRadius: '9999px', border: '1px solid #E5E7EB', background: '#F9FAFB', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>−</button>
                          <span style={{ fontWeight: 600, minWidth: '18px', textAlign: 'center', fontSize: '0.875rem' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label={`Aumenta quantità di ${item.title}`} style={{ width: '24px', height: '24px', borderRadius: '9999px', border: '1px solid #E5E7EB', background: '#F9FAFB', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>+</button>
                        </div>
                        <p style={{ fontWeight: 700, color: '#008C95', margin: 0, fontSize: '0.95rem' }}>
                          € {(item.price * item.qty).toLocaleString('it-IT')}
                          {item.qty > 1 && <span style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 400, marginLeft: '0.3rem' }}>(€ {item.price} × {item.qty})</span>}
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

                {/* Sezione pagamento: form carta finto (nessun addebito reale, nessun dato inviato
                    a un gateway) che replica la UX dei form di pagamento reali (Stripe/PayPal ecc.)
                    per mostrare la logica del flusso d'acquisto end-to-end. */}
                <div style={{ borderRadius: '0.75rem', padding: '1.25rem', marginTop: '1.25rem', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 700, margin: 0 }}>
                      <i className="fas fa-lock" style={{ color: '#9CA3AF', marginRight: '0.4rem' }}></i>
                      Dati di pagamento
                    </p>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <span style={{ ...payTile, minWidth: 0, height: '24px', opacity: cardBrand && cardBrand !== 'visa' ? 0.3 : 1 }} title="Visa">
                        <svg width="32" height="11" viewBox="0 0 40 14" role="img" aria-label="Visa">
                          <text x="20" y="12" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#1A1F71">VISA</text>
                        </svg>
                      </span>
                      <span style={{ ...payTile, minWidth: 0, height: '24px', opacity: cardBrand && cardBrand !== 'mastercard' ? 0.3 : 1 }} title="Mastercard">
                        <svg width="28" height="18" viewBox="0 0 36 24" role="img" aria-label="Mastercard">
                          <circle cx="14" cy="12" r="8" fill="#EB001B" />
                          <circle cx="22" cy="12" r="8" fill="#F79E1B" />
                          <path d="M18 5.8a8 8 0 0 0 0 12.4 8 8 0 0 0 0-12.4Z" fill="#FF5F00" />
                        </svg>
                      </span>
                      <span style={{ ...payTile, minWidth: 0, height: '24px', opacity: cardBrand && cardBrand !== 'amex' ? 0.3 : 1 }} title="American Express">
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2E77BC' }}>AMEX</span>
                      </span>
                      <span style={{ ...payTile, minWidth: 0, height: '24px' }} title="PayPal">
                        <svg width="42" height="11" viewBox="0 0 50 14" role="img" aria-label="PayPal">
                          <text x="0" y="12" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#003087">Pay</text>
                          <text x="24" y="12" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#009CDE">Pal</text>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <input
                        className={inputClass}
                        name="numero"
                        inputMode="numeric"
                        placeholder="Numero carta"
                        value={card.numero}
                        onChange={handleCardChange}
                        maxLength={19}
                        disabled={step === 'processing'}
                      />
                      {cardErrors.numero && <p style={{ color: '#DC2626', fontSize: '0.75rem', margin: '0.3rem 0 0' }}>{cardErrors.numero}</p>}
                    </div>

                    <div>
                      <input
                        className={inputClass}
                        name="nome"
                        placeholder="Nome sulla carta"
                        value={card.nome}
                        onChange={handleCardChange}
                        disabled={step === 'processing'}
                      />
                      {cardErrors.nome && <p style={{ color: '#DC2626', fontSize: '0.75rem', margin: '0.3rem 0 0' }}>{cardErrors.nome}</p>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <input
                          className={inputClass}
                          name="scadenza"
                          inputMode="numeric"
                          placeholder="MM/AA"
                          value={card.scadenza}
                          onChange={handleCardChange}
                          maxLength={5}
                          disabled={step === 'processing'}
                        />
                        {cardErrors.scadenza && <p style={{ color: '#DC2626', fontSize: '0.75rem', margin: '0.3rem 0 0' }}>{cardErrors.scadenza}</p>}
                      </div>
                      <div>
                        <input
                          className={inputClass}
                          name="cvv"
                          inputMode="numeric"
                          type="password"
                          placeholder="CVV"
                          value={card.cvv}
                          onChange={handleCardChange}
                          maxLength={4}
                          disabled={step === 'processing'}
                        />
                        {cardErrors.cvv && <p style={{ color: '#DC2626', fontSize: '0.75rem', margin: '0.3rem 0 0' }}>{cardErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '0.75rem', textAlign: 'center' }}>
                    <i className="fas fa-shield-halved" style={{ marginRight: '0.3rem' }}></i>
                    Connessione sicura — nessun dato viene addebitato in questa demo
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={step === 'processing'}
                  style={{
                    width: '100%', marginTop: '1.25rem', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff',
                    padding: '0.9rem', borderRadius: '9999px', fontWeight: 700, border: 'none',
                    cursor: step === 'processing' ? 'default' : 'pointer', opacity: step === 'processing' ? 0.75 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                >
                  {step === 'processing' ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin"></i>
                      Elaborazione pagamento...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock"></i>
                      Paga € {(total * 1.22).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </>
                  )}
                </button>
                <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: '0.8rem', marginTop: '0.75rem', textAlign: 'center' }}>
                  Pagamento simulato a scopo dimostrativo — nessun addebito reale.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      </main>
      <Footer />
    </>
  );
}
