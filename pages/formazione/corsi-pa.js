import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';

const aree = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Digitalizzazione della Pubblica Amministrazione',
    text: 'Transizione digitale, CAD, servizi online, gestione documentale, firme elettroniche, protocollo informatico e innovazione dei processi amministrativi.',
  },
  {
    icon: 'fas fa-balance-scale',
    title: 'Normativa e aggiornamento amministrativo',
    text: 'Aggiornamenti legislativi, trasparenza, anticorruzione, privacy (GDPR), contratti e appalti pubblici, procedimenti amministrativi.',
  },
  {
    icon: 'fas fa-users-cog',
    title: 'Competenze organizzative',
    text: 'Leadership, project management, comunicazione istituzionale, gestione del personale e sviluppo delle competenze trasversali.',
  },
  {
    icon: 'fas fa-hard-hat',
    title: 'Formazione obbligatoria',
    text: "Sicurezza sul lavoro, anticorruzione, privacy, etica pubblica e tutti gli adempimenti previsti dalla normativa.",
  },
];

const mepaElenco = [
  { icon: 'fas fa-file-contract', text: 'Iscrizione al MEPA' },
  { icon: 'fas fa-file-lines', text: 'Gestione completa della documentazione amministrativa' },
  { icon: 'fas fa-handshake', text: 'Supporto nelle procedure di acquisto' },
  { icon: 'fas fa-sliders', text: 'Progettazione di percorsi personalizzati' },
  { icon: 'fas fa-display', text: 'Formazione in presenza, online o in modalità blended' },
];

const entiLoghi = [
  { name: 'Comune di Vittoria', icon: 'fas fa-landmark' },
  { name: 'Comune di Ragusa', icon: 'fas fa-building-columns' },
  { name: 'Comune di Comiso', icon: 'fas fa-landmark' },
  { name: 'Comune di Modica', icon: 'fas fa-building-columns' },
  { name: 'Ente Regionale', icon: 'fas fa-landmark-dome' },
  { name: 'Azienda Partecipata', icon: 'fas fa-city' },
];

const faqs = [
  {
    domanda: 'Gli enti pubblici possono acquistare i servizi tramite MEPA?',
    risposta: 'Sì. Alètheia è presente sul Mercato Elettronico della Pubblica Amministrazione (MEPA), permettendo agli enti di acquisire servizi formativi attraverso la piattaforma.',
  },
  {
    domanda: 'La formazione può essere personalizzata?',
    risposta: 'Sì. Ogni percorso può essere progettato sulla base delle esigenze dell\'ente, delle figure coinvolte e degli obiettivi organizzativi.',
  },
  {
    domanda: 'Dove vengono svolti i corsi?',
    risposta: "Presso la sede dell'ente, nelle sedi Alètheia oppure online, in funzione delle esigenze organizzative.",
  },
  {
    domanda: 'Realizzate formazione anche per piccoli Comuni?',
    risposta: 'Sì. Collaboriamo con amministrazioni di diverse dimensioni, progettando percorsi proporzionati alle esigenze organizzative dell\'ente.',
  },
  {
    domanda: 'La formazione è valida ai fini degli obblighi normativi del personale pubblico?',
    risposta: 'Sì. I nostri percorsi coprono gli adempimenti formativi obbligatori della PA — sicurezza, anticorruzione, trasparenza, privacy — con attestati riconosciuti.',
  },
];

const EMPTY_FORM = {
  ente: '', referente: '', ruolo: '', email: '', telefono: '', area: '', messaggio: '', privacy: false,
};

function AreaCard({ icon, title, text }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }} />
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: hovered ? '#008C95' : 'rgba(0,140,149,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease' }}>
          <i className={icon} style={{ fontSize: '1.2rem', color: hovered ? '#fff' : '#008C95' }}></i>
        </div>
        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{title}</h3>
        <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.87rem', lineHeight: 1.75, margin: 0, flex: 1 }}>{text}</p>
      </div>
    </div>
  );
}

const getInputStyle = (isDark) => ({
  width: '100%', padding: '0.7rem 1rem', borderRadius: '10px',
  border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #CBD5E1',
  background: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
  color: isDark ? '#fff' : '#0F172A',
  fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
});
const focusOn = (e) => { e.target.style.borderColor = '#008C95'; };
const focusOff = (isDark) => (e) => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#CBD5E1'; };

function FormField({ label, required, children, isDark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.75)' : '#334155', letterSpacing: '0.02em' }}>
        {label}{required && <span style={{ color: '#008C95', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function ConsulenzaPAForm({ isDark }) {
  const [fields, setFields] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));
  const setCheck = (e) => setFields((p) => ({ ...p, privacy: e.target.checked }));
  const inputStyle = getInputStyle(isDark);
  const groupLabelColor = isDark ? '#6EE7B7' : '#008C95';

  function handleSubmit(e) {
    e.preventDefault();
    if (!fields.privacy) { setErrors({ privacy: 'Devi accettare la Privacy Policy' }); return; }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,140,149,0.15)', border: '2px solid #008C95', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', color: '#008C95' }}>
          <i className="fas fa-check"></i>
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: 0 }}>Richiesta inviata!</h3>
        <p style={{ fontSize: '0.9rem', color: isDark ? 'rgba(255,255,255,0.6)' : '#475569', maxWidth: '340px', lineHeight: 1.6, margin: 0 }}>
          Grazie per averci contattato. Il nostro team ti risponderà entro 24 ore lavorative per proporti un piano formativo su misura per il tuo ente.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFields(EMPTY_FORM); }}
          style={{ marginTop: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '999px', background: 'rgba(0,140,149,0.12)', border: '1.5px solid rgba(0,140,149,0.35)', color: '#008C95', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Invia una nuova richiesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Ente
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }} className="pa-form-row">
          <FormField label="Ente / Amministrazione" required isDark={isDark}>
            <input type="text" required value={fields.ente} onChange={set('ente')} placeholder="Comune di…" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Area formativa di interesse" isDark={isDark}>
            <input type="text" value={fields.area} onChange={set('area')} placeholder="Es. Digitalizzazione, Appalti…" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Referente
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }} className="pa-form-row">
          <FormField label="Referente (Nome e Cognome)" required isDark={isDark}>
            <input type="text" required value={fields.referente} onChange={set('referente')} placeholder="Mario Rossi" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Ruolo / Ufficio" isDark={isDark}>
            <input type="text" value={fields.ruolo} onChange={set('ruolo')} placeholder="Es. Responsabile ufficio personale" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }} className="pa-form-row">
          <FormField label="Email istituzionale" required isDark={isDark}>
            <input type="email" required value={fields.email} onChange={set('email')} placeholder="nome.cognome@ente.it" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Telefono" isDark={isDark}>
            <input type="tel" value={fields.telefono} onChange={set('telefono')} placeholder="+39 0932 000000" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Messaggio
        </span>
        <FormField label="Messaggio" isDark={isDark}>
          <textarea
            value={fields.messaggio}
            onChange={set('messaggio')}
            placeholder="Descrivi brevemente le esigenze formative del tuo ente…"
            rows={4}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
            onFocus={focusOn}
            onBlur={focusOff(isDark)}
          />
        </FormField>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <input
          id="pa-privacy"
          type="checkbox"
          checked={fields.privacy}
          onChange={setCheck}
          style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: '#008C95', flexShrink: 0, cursor: 'pointer' }}
        />
        <label htmlFor="pa-privacy" style={{ fontSize: '0.8rem', lineHeight: 1.6, cursor: 'pointer', color: isDark ? 'rgba(255,255,255,0.65)' : '#475569' }}>
          Ho letto e accetto la{' '}
          <a href="/privacy-cookie" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a>
          {' '}e acconsento al trattamento dei dati ai sensi del GDPR. <span style={{ color: '#008C95' }}>*</span>
        </label>
      </div>
      {errors.privacy && <p style={{ margin: '-0.85rem 0 0', fontSize: '0.75rem', color: '#EF4444' }}><i className="fas fa-exclamation-circle" style={{ marginRight: '4px' }}></i>{errors.privacy}</p>}

      <button
        type="submit"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
          width: '100%', padding: '0.95rem 2rem', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(90deg, #008C95, #10B981)',
          color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
          fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(0,140,149,0.35)',
          marginTop: '0.25rem', boxSizing: 'border-box',
        }}
      >
        <i className="fas fa-paper-plane" style={{ fontSize: '0.85rem' }}></i>
        Richiedi una consulenza dedicata
      </button>
    </form>
  );
}

export default function CorsiPA() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>Formazione per la Pubblica Amministrazione - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Formazione per Comuni, enti locali e aziende pubbliche, attivabile tramite MEPA. Alètheia, ente accreditato Regione Siciliana con 20+ anni di esperienza nella formazione della PA."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" solid />

      <main>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        .hero-badge-pa {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          color: #6EE7B7; background: rgba(0,140,149,0.14); border: 1px solid rgba(0,140,149,0.3);
          padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1.25rem;
        }
        .section-badge-pa {
          display: inline-block; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #008C95; margin-bottom: 0.6rem;
        }
        .dark .section-badge-pa { color: #6EE7B7; }

        .cta-btn-primary-pa {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-primary-pa:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }
        .cta-btn-outline-pa {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px; background: transparent;
          color: rgba(255,255,255,0.85); font-weight: 700; font-size: 0.95rem; text-decoration: none;
          border: 2px solid rgba(255,255,255,0.22); transition: all 0.2s ease;
          font-family: inherit; cursor: pointer;
        }
        .cta-btn-outline-pa:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }

        .partner-grid-pa { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: stretch; }
        @media (max-width: 900px) { .partner-grid-pa { grid-template-columns: 1fr; } }

        /* Punti di forza: vero bento grid (prima card a piena larghezza, le altre due affiancate) */
        .pa-strength-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem; margin-top: auto; padding-top: 1.75rem; }
        @media (max-width: 640px) { .pa-strength-grid { grid-template-columns: 1fr; } }
        .pa-strength-card {
          display: flex; flex-direction: column; gap: 0.65rem;
          padding: 1.25rem; border-radius: 1rem;
          background: #fff; border: 1px solid #E2E8F0;
          font-size: 0.85rem; font-weight: 600; line-height: 1.5; color: #334155;
        }
        .dark .pa-strength-card { background: #1f2937; border-color: rgba(255,255,255,0.08); color: #E2E8F0; }
        .pa-strength-card.featured {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          font-size: 0.95rem;
        }
        .pa-strength-card.featured i { font-size: 1.4rem; flex-shrink: 0; }
        @media (max-width: 640px) { .pa-strength-card.featured { grid-column: 1; } }

        /* Card MEPA istituzionale: nessun bordo verde, sfondo premium tenue, ombra impercettibile */
        .pa-mepa-card {
          background: #F8FAFC; border-radius: 24px; overflow: hidden;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
        }
        .dark .pa-mepa-card { background: #1f2937; box-shadow: none; }
        .pa-mepa-item {
          display: flex; align-items: flex-start; gap: 0.75rem;
        }
        .pa-mepa-item .pa-mepa-icon {
          width: 32px; height: 32px; min-width: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,140,149,0.08); color: #008C95;
        }
        .dark .pa-mepa-item .pa-mepa-icon { background: rgba(16,185,129,0.12); color: #6EE7B7; }
        .pa-mepa-item span { font-size: 0.87rem; line-height: 1.6; color: #334155; padding-top: 0.4rem; }
        .dark .pa-mepa-item span { color: #E2E8F0; }

        .cta-btn-mepa {
          display: flex; align-items: center; justify-content: center; gap: 0.55rem;
          width: 100%; padding: 0.9rem 2rem; border-radius: 12px; box-sizing: border-box;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          transition: filter 0.2s ease, transform 0.2s ease; border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-mepa:hover { filter: brightness(1.12); transform: translateY(-1px); }

        .aree-grid-pa { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 1100px) { .aree-grid-pa { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .aree-grid-pa { grid-template-columns: 1fr; } }

        .faq-grid-pa { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem 1.5rem; align-items: start; }
        @media (max-width: 800px) { .faq-grid-pa { grid-template-columns: 1fr; } }

        .pa-form-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 560px) { .pa-form-row { grid-template-columns: 1fr !important; } }

        /* Banner + form: due colonne affiancate su desktop (5/12 testo, 7/12 form), 1 colonna su mobile */
        .pa-contact-grid-2col { display: grid; grid-template-columns: 5fr 7fr; gap: 3rem; align-items: start; }
        @media (max-width: 900px) { .pa-contact-grid-2col { grid-template-columns: 1fr; gap: 2rem; } }

        /* Marquee loghi enti */
        .marquee-mask-pa {
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
        @keyframes marqueePA {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-pa { animation: marqueePA 32s linear infinite; }
        .animate-marquee-pa:hover { animation-play-state: paused; }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', paddingTop: '120px', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,140,149,0.14) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge-pa fade-up">Formazione per Enti Pubblici · Iscritti al MEPA</div>

          <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '820px' }}>
            Formazione per la{' '}
            <span style={{ background: 'linear-gradient(90deg, #6EE7B7, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Pubblica Amministrazione
            </span>
          </h1>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <a href="#contatti" className="cta-btn-primary-pa">Richiedi informazioni</a>
          </div>
        </div>
      </section>

      {/* ══════════════ ELEMENTI DISTINTIVI ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {/* Blocchi numerici: contatori dominanti */}
            <div className="col-span-1 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-3xl p-6 flex flex-col gap-2">
              <span className="text-4xl lg:text-5xl font-black text-[#008C95] leading-none">20+</span>
              <span className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wide">Anni</span>
              <span className="text-slate-600 dark:text-gray-300 text-xs leading-snug">di esperienza nella formazione</span>
            </div>

            <div className="col-span-1 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-3xl p-6 flex flex-col gap-2">
              <span className="text-4xl lg:text-5xl font-black text-[#008C95] leading-none">100+</span>
              <span className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wide">Progetti</span>
              <span className="text-slate-600 dark:text-gray-300 text-xs leading-snug">realizzati per enti e organizzazioni</span>
            </div>

            {/* Blocchi di completamento */}
            <div className="col-span-1 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-3xl p-6 flex flex-col justify-center gap-2">
              <span className="text-lg lg:text-xl font-black text-[#008C95] leading-tight uppercase">Ente accreditato</span>
              <span className="text-slate-600 dark:text-gray-300 text-sm leading-snug">Regione Siciliana</span>
            </div>

            <div className="col-span-1 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-3xl p-6 flex flex-col justify-center gap-2">
              <span className="text-lg lg:text-xl font-black text-[#008C95] leading-tight uppercase">Percorsi personalizzabili</span>
              <span className="text-slate-600 dark:text-gray-300 text-sm leading-snug">progettati sulle esigenze della PA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ IL PARTNER PER LE ISTITUZIONI & IL MEPA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="partner-grid-pa">
            {/* Blocco esperienza */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <span className="section-badge-pa">Esperienza al servizio delle Istituzioni</span>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
                Il partner che conosce le esigenze della PA
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.93rem', lineHeight: 1.85, margin: 0 }}>
                Da oltre vent&apos;anni Alètheia affianca enti pubblici, amministrazioni locali, aziende partecipate e organismi pubblici nella progettazione e realizzazione di percorsi formativi. La differenza sta nella conoscenza del contesto: comprendiamo i processi della Pubblica Amministrazione, le esigenze organizzative degli uffici, le modalità di affidamento e gli obblighi normativi che accompagnano la formazione del personale pubblico. Questo ci permette di proporre percorsi non solo qualificati, ma anche coerenti con le procedure e i vincoli dell&apos;ente. Svolgiamo attività di formazione, aggiornamento professionale, progettazione finanziata e sviluppo delle competenze.
              </p>

              <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: isDark ? '#6EE7B7' : '#008C95', margin: '1.5rem 0 0.85rem' }}>
                Il nostro curriculum comprende collaborazioni con
              </span>
              <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Amministrazioni comunali', 'Enti territoriali', 'Aziende pubbliche'].map((voce) => (
                  <li key={voce} className="text-slate-700 dark:text-gray-200" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.87rem', lineHeight: 1.6 }}>
                    <i className="fas fa-circle-check" style={{ color: '#008C95', fontSize: '0.85rem', marginTop: '0.2rem', flexShrink: 0 }}></i>
                    {voce}
                  </li>
                ))}
              </ul>

              <div className="pa-strength-grid">
                {[
                  { icon: 'fas fa-bullseye', text: 'Ogni percorso è costruito sulle reali esigenze dell\'ente', featured: true },
                  { icon: 'fas fa-graduation-cap', text: 'Docenti qualificati' },
                  { icon: 'fas fa-sliders', text: 'Modalità di erogazione flessibili' },
                ].map((item) => (
                  <div key={item.text} className={`pa-strength-card${item.featured ? ' featured' : ''}`}>
                    <i className={item.icon} style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '1.1rem' }}></i>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blocco MEPA */}
            <div className="pa-mepa-card">
              <div style={{ padding: '2rem' }}>
                <span className="section-badge-pa">Affidamento semplice e conforme</span>
                <h2 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', fontWeight: 900, color: isDark ? '#F8FAFC' : '#0f172a', marginBottom: '1rem', lineHeight: 1.25 }}>
                  Alètheia è iscritta al MEPA
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: isDark ? '#CBD5E1' : '#576574', marginBottom: '1.5rem' }}>
                  Alètheia è presente sul Mercato Elettronico della Pubblica Amministrazione (MEPA), la piattaforma ufficiale di acquisto della Pubblica Amministrazione. Gli enti possono così affidare i servizi formativi tramite una procedura ufficiale, riducendo i tempi amministrativi e semplificando l&apos;iter di acquisto, nel pieno rispetto della normativa sugli appalti.
                </p>

                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: isDark ? '#6EE7B7' : '#008C95', marginBottom: '0.85rem' }}>
                  Con Alètheia puoi contare su
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                  {mepaElenco.map((voce) => (
                    <div key={voce.text} className="pa-mepa-item">
                      <span className="pa-mepa-icon" aria-hidden="true">
                        <i className={voce.icon} style={{ fontSize: '0.85rem' }}></i>
                      </span>
                      <span>{voce.text}</span>
                    </div>
                  ))}
                </div>

                <a href="#contatti" className="cta-btn-mepa">
                  Contattaci per ricevere supporto
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ AREE FORMATIVE ══════════════ */}
      <section className="bg-white dark:bg-dark-card" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '820px' }}>
            <span className="section-badge-pa">Competenze per accompagnare il cambiamento</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Le nostre aree formative
            </h2>
          </div>

          <div className="aree-grid-pa">
            {aree.map((a) => (
              <AreaCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CAROSELLO PARTNER/LOGHI ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', fontWeight: 900, margin: 0 }}>
              Hanno scelto Alètheia
            </h3>
          </div>
        </div>

        <div className="relative overflow-hidden marquee-mask-pa">
          <div className="flex w-max animate-marquee-pa">
            {[...entiLoghi, ...entiLoghi, ...entiLoghi].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-12 px-10 shrink-0 text-slate-600 dark:text-white/70"
                aria-hidden={i >= entiLoghi.length}
              >
                <span className="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
                  <i className={`${logo.icon} text-2xl`} aria-hidden="true" />
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.25 }}>
            FAQ
          </h2>

          <div className="faq-grid-pa">
            {faqs.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={item.domanda} className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="text-slate-900 dark:text-white"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    <span>{item.domanda}</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: isDark ? '#6EE7B7' : '#008C95', flexShrink: 0 }}></i>
                  </button>
                  {isOpen && (
                    <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.4rem 1.4rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
                      {item.risposta}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ BANNER + FORM ISTITUZIONALE PA ══════════════ */}
      <section id="contatti" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="pa-contact-grid-2col">
            {/* Colonna sinistra: testo introduttivo */}
            <div>
              <span className="section-badge-pa">Parliamone</span>
              <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                Vuoi un piano formativo per il tuo ente?
              </h3>
              <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>
                Progettiamo insieme un percorso su misura, facilmente attivabile anche tramite MEPA, per accompagnare la crescita delle competenze e l&apos;innovazione della tua amministrazione.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-phone" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>Telefono</span>
                    <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.9rem', fontWeight: 700 }}>+39 0932 862613</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-envelope" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>Email</span>
                    <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.9rem', fontWeight: 700 }}>info@aletheiasrl.it</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0' }}>
                <i className="fas fa-landmark" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '0.9rem' }}></i>
                <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ente accreditato Regione Siciliana</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.75rem' }}>
                <i className="fas fa-clock" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '0.9rem' }}></i>
                <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Rispondiamo entro 24 ore lavorative</span>
              </div>
            </div>

            {/* Colonna destra: form */}
            <div
              className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
              style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)' }}
            >
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)' }} />
              <div style={{ padding: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
                  <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: 'rgba(0,140,149,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-paper-plane" style={{ color: '#008C95', fontSize: '1.1rem' }}></i>
                  </div>
                  <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                    Richiedi una consulenza dedicata
                  </h3>
                </div>
                <ConsulenzaPAForm isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
