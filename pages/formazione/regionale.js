import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const avvisi = [
  {
    slug: 'avviso-20-2024-fse-plus',
    subKey: 'fse-plus',
    title: 'Avviso 20/2024 FSE+',
    icon: 'fas fa-euro-sign',
    duration: '300 ore',
    modality: 'Aula + Stage',
    price: '100% Finanziato',
    priceColor: '#10B981',
    badge: 'FSE+',
    description: "Percorso formativo finanziato dal Fondo Sociale Europeo Plus per l'inserimento lavorativo di giovani e adulti disoccupati. Include stage aziendale obbligatorio.",
  },
  {
    slug: 'poc-sicilia',
    subKey: 'poc-sicilia',
    title: 'POC Sicilia',
    icon: 'fas fa-map',
    duration: 'Variabile',
    modality: 'Aula / Online',
    price: '100% Finanziato',
    priceColor: '#10B981',
    badge: 'POC',
    description: 'Percorsi finanziati dal Programma Operativo Complementare della Regione Siciliana per lo sviluppo delle competenze e l\'occupabilità.',
  },
  {
    slug: 'garanzia-giovani',
    subKey: 'garanzia-giovani',
    title: 'Garanzia Giovani',
    icon: 'fas fa-user-graduate',
    duration: '150-300 ore',
    modality: 'Aula + Stage',
    price: '100% Finanziato',
    priceColor: '#10B981',
    badge: 'Under 30',
    description: 'Programma europeo rivolto ai giovani NEET under 30. Orientamento, formazione e tirocinio per favorire l\'inserimento nel mercato del lavoro.',
  },
  {
    slug: 'gol-percorso-formativo',
    subKey: 'gol',
    title: 'Programma G.O.L.',
    icon: 'fas fa-bullseye',
    duration: '150 ore',
    modality: 'Aula / Online',
    price: '100% Finanziato',
    priceColor: '#10B981',
    badge: 'G.O.L.',
    description: 'Garanzia di Occupabilità dei Lavoratori: percorsi di riqualificazione e aggiornamento professionale finanziati dal PNRR per lavoratori fragili e disoccupati.',
  },
];

function AvvisoCard({ subKey, badge, title, icon, duration, modality, price, priceColor, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/all-courses?categoria=${subKey}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Accent top bar */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #008C95, #10B981)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }} />

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        {/* Badge + Icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.09em',
            textTransform: 'uppercase', color: '#008C95',
            background: 'rgba(0,140,149,0.08)', padding: '0.22rem 0.6rem',
            borderRadius: '999px',
          }}>
            {badge}
          </span>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: hovered ? '#008C95' : 'rgba(0,140,149,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.25s ease',
          }}>
            <i className={icon} style={{ fontSize: '1.2rem', color: hovered ? '#fff' : '#008C95' }}></i>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.85rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
          {description}
        </p>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="text-slate-600 dark:text-gray-300" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
            <i className="fas fa-clock" style={{ color: '#008C95', fontSize: '0.7rem' }}></i>
            {duration}
          </span>
          <span className="text-slate-600 dark:text-gray-300" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
            <i className="fas fa-laptop" style={{ color: '#008C95', fontSize: '0.7rem' }}></i>
            {modality}
          </span>
        </div>

        {/* Footer */}
        <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10B981' }}>
            {price}
          </span>
          <span style={{
            fontSize: '0.78rem', fontWeight: 700, color: '#008C95',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            opacity: hovered ? 1 : 0.6, transition: 'opacity 0.2s',
          }}>
            Scopri i corsi
          </span>
        </div>
      </div>
    </a>
  );
}

export default function FormazioneRegionale() {
  return (
    <>
      <Head>
        <title>Formazione Regionale - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Percorsi di formazione regionale finanziati dalla Regione Siciliana: FSE+, POC Sicilia, Garanzia Giovani e Programma G.O.L. Spesso gratuiti per i partecipanti."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/" solid />

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        .avvisi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .avvisi-grid { grid-template-columns: 1fr; }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6EE7B7;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }
        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981);
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,140,149,0.5);
        }
        .cta-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          background: transparent;
          color: rgba(255,255,255,0.85);
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.22);
          transition: all 0.2s ease;
          font-family: inherit;
          cursor: pointer;
        }
        .cta-btn-outline:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.5);
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
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
            <span aria-hidden="true">›</span>
            <a href="/formazione/regionale-fse" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Formazione Finanziata</a>
            <span aria-hidden="true">›</span>
            <span style={{ color: '#6EE7B7' }}>Formazione Regionale</span>
          </nav>

          <div className="hero-badge fade-up">
            Formazione Finanziata
          </div>

          <h1 className="fade-up fade-up-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
            maxWidth: '700px',
          }}>
            Formazione{' '}
            <span style={{
              background: 'linear-gradient(90deg, #10B981, #008C95)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Regionale
            </span>
          </h1>

          <p className="fade-up fade-up-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '820px',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            Percorsi formativi finanziati dalla Regione Siciliana attraverso avvisi pubblici europei e nazionali. Spesso completamente gratuiti per i partecipanti.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#avvisi" className="cta-btn-primary">Vedi gli avvisi</a>
            <a href="/contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-light dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ flex: 1 }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#008C95', marginBottom: '0.5rem' }}>
              Fondi regionali per la formazione
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Avvisi pubblici della{' '}
              <span style={{ color: '#008C95' }}>Regione Siciliana</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
              La Formazione Regionale comprende tutti i percorsi attivati attraverso avvisi pubblici finanziati dalla Regione Siciliana, spesso in co-finanziamento con fondi europei (FSE+, FESR) o nazionali (PNRR). Alètheia Srl è ente accreditato dalla Regione Siciliana (DDG n. 78/2017) e gestisce questi percorsi dalla progettazione alla rendicontazione finale, garantendo la massima qualità e conformità normativa.
            </p>
          </div>
        </div>
      </section>

      {/* ── AVVISI ── */}
      <section id="avvisi" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#008C95', marginBottom: '0.6rem' }}>
              Avvisi attivi
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Percorsi disponibili
            </h2>
            <p className="text-slate-500 dark:text-gray-400" style={{ fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Seleziona un avviso per vedere i corsi disponibili e verificare i requisiti di accesso.
            </p>
          </div>

          <div className="avvisi-grid">
            {avvisi.map((avviso) => (
              <AvvisoCard key={avviso.slug} {...avviso} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7', marginBottom: '1rem' }}>
            Hai domande?
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Scopri se hai i requisiti
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Ogni avviso ha requisiti specifici di accesso. Contattaci per una consulenza gratuita: ti aiutiamo a individuare il percorso più adatto alla tua situazione.
          </p>
          <a href="/contatti" className="cta-btn-primary">Contattaci</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
