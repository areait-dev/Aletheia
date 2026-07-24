import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { darkTokens } from '../lib/darkTokens';

const SEDI = [
  {
    città: 'Vittoria',
    indirizzo: 'Via del Carrubo, snc',
    cap: '97019 Vittoria (RG)',
    mapsHref: 'https://maps.google.com/?q=Via+del+Carrubo+Vittoria+RG',
    mapsEmbed: 'https://www.google.com/maps?q=Via+del+Carrubo+snc+Vittoria+RG&output=embed',
  },
  {
    città: 'Ragusa',
    indirizzo: 'Viale delle Americhe, 141',
    cap: 'Ragusa (RG)',
    mapsHref: 'https://maps.google.com/?q=Viale+delle+Americhe+141+Ragusa',
    mapsEmbed: 'https://www.google.com/maps?q=Viale+delle+Americhe+141+Ragusa&output=embed',
  },
  {
    città: 'Pozzallo',
    indirizzo: 'Via Ginevra, 9',
    cap: 'Pozzallo (RG)',
    mapsHref: 'https://maps.google.com/?q=Via+Ginevra+9+Pozzallo',
    mapsEmbed: 'https://www.google.com/maps?q=Via+Ginevra+9+Pozzallo+RG&output=embed',
  },
  {
    città: 'Acate',
    indirizzo: 'C.da Casazza, snc',
    cap: 'Acate (RG)',
    mapsHref: 'https://maps.google.com/?q=PROMOTERAGRI',
    mapsEmbed: 'https://www.google.com/maps?q=PROMOTERAGRI&output=embed',
  },
];

const INFO_ITEMS = [
  {
    icon: 'fas fa-phone',
    label: 'Telefono',
    value: '+39 0932 862613',
    href: 'tel:+390932862613',
    linkLabel: 'Chiama ora',
  },
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'info@aletheiasrl.it',
    href: 'mailto:info@aletheiasrl.it',
    linkLabel: 'Scrivi ora',
  },
  {
    icon: 'fas fa-clock',
    label: 'Orari',
    value: 'Lun - Ven: 9:00 - 18:00',
    href: null,
    linkLabel: null,
  },
];

const MOTIVI = [
  'Informazioni su un corso',
  'Candidatura / ricerca lavoro',
  'Servizi alle imprese',
  'Programma G.O.L.',
  'Richiesta preventivo',
  'Altro',
];

export default function Contatti() {
  const [activeSede, setActiveSede] = useState(0);
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    motivo: '',
    messaggio: '',
    privacy: false,
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Campo obbligatorio';
    if (!form.cognome.trim()) e.cognome = 'Campo obbligatorio';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email non valida';
    if (!form.messaggio.trim()) e.messaggio = 'Campo obbligatorio';
    if (!form.privacy) e.privacy = 'Devi accettare la privacy policy';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSent(true);
  };

  return (
    <>
      <Head>
        <title>Contatti - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Contatta Alètheia Srl: sede a Vittoria (RG), telefono +39 0932 862613, email info@aletheiasrl.it. Formazione professionale e agenzia per il lavoro in Sicilia." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/contatti" />

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        .contatti-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 3rem;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .contatti-layout { grid-template-columns: 1fr; }
        }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
        }

        .field label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .field input,
        .field select,
        .field textarea {
          width: 100%;
          padding: 0.7rem 1rem;
          border: 1.5px solid #E2E8F0;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #008C95;
          box-shadow: 0 0 0 3px rgba(0,140,149,0.12);
        }
        .field input.error,
        .field select.error,
        .field textarea.error {
          border-color: #EF4444;
        }
        .field .err-msg {
          font-size: 0.73rem;
          color: #EF4444;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .field textarea { resize: vertical; min-height: 130px; }
        .field select { appearance: none; cursor: pointer; }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.9rem 2.25rem;
          border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981);
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(0,140,149,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
          width: 100%;
          justify-content: center;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,140,149,0.5);
        }

        .sedi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .sede-card {
          padding: 1rem 1.1rem;
          border-radius: 1rem;
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          text-align: left;
          background: none;
          font-family: inherit;
          width: 100%;
        }
        .sede-card:hover {
          transform: translateY(-2px);
        }
        .sede-card.active {
          box-shadow: 0 4px 18px rgba(0,140,149,0.18);
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
        paddingTop: '120px',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge fade-up">
            Siamo qui per te
          </div>

          <h1 className="fade-up fade-up-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
            maxWidth: '650px',
          }}>
            Parliamo del tuo{' '}
            <span style={{
              background: 'linear-gradient(90deg, #10B981, #008C95)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              futuro
            </span>
          </h1>

          <p className="fade-up fade-up-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '800px',
            lineHeight: 1.75,
          }}>
            Hai domande su corsi, offerte di lavoro o servizi alle imprese? Scrivici o chiamaci: ti risponderemo entro 24 ore.
          </p>
        </div>
      </section>

      {/* ── CORPO ── */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          {/* Titolo FUORI dal flex container */}
          <div style={{ marginBottom: '2rem' }}>
            <span className="text-[#008C95] dark:text-[#10B981]" style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Dove siamo
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.25 }}>
              Vieni a trovarci
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
              Siamo presenti in quattro sedi in provincia di Ragusa. Puoi contattarci telefonicamente, via email o compilando il modulo.
            </p>
          </div>

          <div className="contatti-layout">

            {/* ── Colonna sinistra: info ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignSelf: 'stretch' }}>

              {/* Info cards: telefono, email, orari */}
              {INFO_ITEMS.map((item, i) => (
                <div key={i} className="info-card bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700">
                  <div className="bg-[#008C95]/10 dark:bg-[#10B981]/10" style={{
                    width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={`${item.icon} text-[#008C95] dark:text-[#10B981]`} style={{ fontSize: '1rem' }}></i>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-gray-500" style={{ margin: '0 0 0.2rem', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      {item.label}
                    </p>
                    <p className="text-slate-900 dark:text-white" style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4 }}>
                      {item.value}
                    </p>
                    {item.href && (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-[#008C95] dark:text-[#10B981] hover:text-[#006B73] dark:hover:text-[#059669]" style={{ fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', marginTop: '0.2rem', display: 'inline-block' }}>
                        {item.linkLabel} →
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Sedi - griglia 2×2 */}
              <div>
                <p className="text-slate-400 dark:text-gray-500" style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.65rem' }}>
                  Le nostre sedi
                </p>
                <div className="sedi-grid">
                  {SEDI.map((sede, i) => (
                    <button
                      key={sede.città}
                      onClick={() => setActiveSede(i)}
                      className={`sede-card ${activeSede === i ? 'active bg-[#008C95]/8 dark:bg-[#10B981]/10 border-[#008C95] dark:border-[#10B981]' : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 hover:border-[#008C95]/50 dark:hover:border-[#10B981]/50'}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <i
                          className="fas fa-map-marker-alt"
                          style={{ fontSize: '0.8rem', color: activeSede === i ? '#008C95' : '#94a3b8', flexShrink: 0, transition: 'color 0.2s' }}
                        ></i>
                        <span
                          className={activeSede === i ? 'text-[#008C95] dark:text-[#10B981]' : 'text-slate-900 dark:text-white'}
                          style={{ fontWeight: 800, fontSize: '0.88rem', transition: 'color 0.2s' }}
                        >
                          {sede.città}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-gray-400" style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.45, paddingLeft: '1.3rem' }}>
                        {sede.indirizzo}
                      </p>
                      {activeSede === i && (
                        <a
                          href={sede.mapsHref}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#008C95] dark:text-[#10B981]"
                          style={{ fontSize: '0.7rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block', marginTop: '0.4rem', paddingLeft: '1.3rem' }}
                        >
                          Apri in Maps →
                        </a>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mappa embed - aggiornata in base alla sede selezionata */}
              <div className="border border-slate-200 dark:border-gray-700" style={{ flex: 1, minHeight: '200px', borderRadius: '1.25rem', overflow: 'hidden' }}>
                <iframe
                  key={activeSede}
                  title={`Sede Alètheia Srl - ${SEDI[activeSede].città}`}
                  src={SEDI[activeSede].mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', minHeight: '200px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── Colonna destra: form ── */}
            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
              alignSelf: 'stretch',
            }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #008C95, #10B981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 24px rgba(0,140,149,0.3)',
                  }}>
                    <i className="fas fa-check" style={{ color: '#fff', fontSize: '1.75rem' }}></i>
                  </div>
                  <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                    Messaggio inviato!
                  </h3>
                  <p className="text-slate-500 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto 2rem' }}>
                    Grazie per averci contattato. Ti risponderemo entro 24 ore lavorative all&apos;indirizzo email indicato.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ nome: '', cognome: '', email: '', telefono: '', motivo: '', messaggio: '', privacy: false }); }}
                    className="text-[#008C95] dark:text-[#10B981] border border-[#008C95] dark:border-[#10B981]"
                    style={{ background: 'none', borderRadius: '999px', padding: '0.6rem 1.5rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.4rem' }}>
                    Inviaci un messaggio
                  </h2>
                  <p className="text-slate-500 dark:text-gray-300" style={{ fontSize: '0.85rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Compila il modulo e ti ricontatteremo al più presto.
                  </p>

                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="nome" className="text-slate-700 dark:text-gray-300">Nome <span style={{ color: '#EF4444' }}>*</span></label>
                        <input id="nome" name="nome" type="text" placeholder="Mario" value={form.nome} onChange={handleChange} className={`${errors.nome ? 'error' : ''} bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`} />
                        {errors.nome && <p className="err-msg"><i className="fas fa-exclamation-circle"></i>{errors.nome}</p>}
                      </div>
                      <div className="field">
                        <label htmlFor="cognome" className="text-slate-700 dark:text-gray-300">Cognome <span style={{ color: '#EF4444' }}>*</span></label>
                        <input id="cognome" name="cognome" type="text" placeholder="Rossi" value={form.cognome} onChange={handleChange} className={`${errors.cognome ? 'error' : ''} bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`} />
                        {errors.cognome && <p className="err-msg"><i className="fas fa-exclamation-circle"></i>{errors.cognome}</p>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="email" className="text-slate-700 dark:text-gray-300">Email <span style={{ color: '#EF4444' }}>*</span></label>
                        <input id="email" name="email" type="email" placeholder="mario@esempio.it" value={form.email} onChange={handleChange} className={`${errors.email ? 'error' : ''} bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`} />
                        {errors.email && <p className="err-msg"><i className="fas fa-exclamation-circle"></i>{errors.email}</p>}
                      </div>
                      <div className="field">
                        <label htmlFor="telefono" className="text-slate-700 dark:text-gray-300">Telefono</label>
                        <input id="telefono" name="telefono" type="tel" placeholder="+39 000 0000000" value={form.telefono} onChange={handleChange} className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400" />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="motivo" className="text-slate-700 dark:text-gray-300">Motivo del contatto</label>
                      <select id="motivo" name="motivo" value={form.motivo} onChange={handleChange} className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white">
                        <option value="">Seleziona un motivo…</option>
                        {MOTIVI.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="messaggio" className="text-slate-700 dark:text-gray-300">Messaggio <span style={{ color: '#EF4444' }}>*</span></label>
                      <textarea id="messaggio" name="messaggio" placeholder="Scrivi il tuo messaggio…" value={form.messaggio} onChange={handleChange} className={`${errors.messaggio ? 'error' : ''} bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`} />
                      {errors.messaggio && <p className="err-msg"><i className="fas fa-exclamation-circle"></i>{errors.messaggio}</p>}
                    </div>

                    {/* Privacy */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        checked={form.privacy}
                        onChange={handleChange}
                        style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: '#008C95', flexShrink: 0, cursor: 'pointer' }}
                      />
                      <label htmlFor="privacy" className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.8rem', lineHeight: 1.6, cursor: 'pointer' }}>
                        Ho letto e accetto la{' '}
                        <a href="/privacy-policy" className="text-[#008C95] dark:text-[#10B981]" style={{ fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a>
                        {' '}e acconsento al trattamento dei miei dati personali ai sensi del GDPR. <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                    </div>
                    {errors.privacy && <p style={{ margin: '-0.5rem 0 0', fontSize: '0.73rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><i className="fas fa-exclamation-circle"></i>{errors.privacy}</p>}

                    <button type="submit" className="submit-btn" onMouseEnter={() => setHoveredBtn(true)} onMouseLeave={() => setHoveredBtn(false)}>
                      Invia messaggio
                    </button>

                    <p className="text-slate-400 dark:text-gray-500" style={{ fontSize: '0.72rem', textAlign: 'center', margin: 0 }}>
                      I tuoi dati sono al sicuro e non verranno condivisi con terze parti.
                    </p>

                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
