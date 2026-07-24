import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const corsi = [
  {
    slug: 'ecm-medici',
    subKey: 'ecm',
    title: 'ECM per Medici',
    icon: 'fas fa-user-md',
    duration: 'Variabile',
    modality: 'Aula / FAD',
    price: 'Su richiesta',
    priceColor: '#008C95',
    description: 'Corsi ECM accreditati per medici chirurghi e odontoiatri. Aggiornamento continuo in linea con gli obblighi formativi triennali.',
  },
  {
    slug: 'ecm-infermieri',
    subKey: 'ecm',
    title: 'ECM per Infermieri',
    icon: 'fas fa-procedures',
    duration: 'Variabile',
    modality: 'Aula / FAD',
    price: 'Su richiesta',
    priceColor: '#008C95',
    description: 'Percorsi ECM per infermieri e professionisti sanitari. Crediti formativi riconosciuti dal Ministero della Salute.',
  },
  {
    slug: 'ecm-fisioterapisti',
    subKey: 'ecm',
    title: 'ECM per Fisioterapisti',
    icon: 'fas fa-running',
    duration: 'Variabile',
    modality: 'Aula / FAD',
    price: 'Su richiesta',
    priceColor: '#008C95',
    description: 'Formazione continua in medicina per fisioterapisti e terapisti della riabilitazione con crediti ECM certificati.',
  },
  {
    slug: 'ecm-oss',
    subKey: 'ecm',
    title: 'ECM per OSS e Ausiliari',
    icon: 'fas fa-hands-helping',
    duration: 'Variabile',
    modality: 'Aula / FAD',
    price: 'Su richiesta',
    priceColor: '#008C95',
    description: 'Aggiornamento professionale per operatori sociosanitari e figure di supporto con percorsi ECM accreditati.',
  },
];

function CourseCard({ subKey, title, icon, duration, modality, price, priceColor, description }) {
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
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #008C95, #10B981)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }} />

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.09em',
            textTransform: 'uppercase', color: '#008C95',
            background: 'rgba(0,140,149,0.08)', padding: '0.22rem 0.6rem',
            borderRadius: '999px',
          }}>
            ECM
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

        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
          {title}
        </h3>

        <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.85rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
          {description}
        </p>

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

        <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid' }}>
          <span style={{
            fontSize: '0.78rem', fontWeight: 700, color: '#008C95',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            opacity: hovered ? 1 : 0.6, transition: 'opacity 0.2s',
          }}>
            Scopri il corso
          </span>
        </div>
      </div>
    </a>
  );
}

export default function FormazioneECM() {
  return (
    <>
      <Head>
        <title>ECM - Educazione Continua in Medicina - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corsi ECM accreditati per professionisti sanitari: medici, infermieri, fisioterapisti, OSS. Crediti formativi riconosciuti dal Ministero della Salute."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/" />

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .courses-grid { grid-template-columns: 1fr; }
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
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .breadcrumb a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover { color: #6EE7B7; }
        .breadcrumb span { color: rgba(255,255,255,0.3); }
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
          <nav className="breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/formazione/professionale-specialistica">Formazione Professionale e PA</a>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>ECM</span>
          </nav>

          <div className="hero-badge fade-up">
            Educazione Continua in Medicina
          </div>

          <h1 className="fade-up fade-up-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
            maxWidth: '700px',
          }}>
            Corsi{' '}
            <span style={{
              background: 'linear-gradient(90deg, #10B981, #008C95)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ECM
            </span>
            {' '}per Professionisti Sanitari
          </h1>

          <p className="fade-up fade-up-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '820px',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            Formazione continua accreditata per medici, infermieri, fisioterapisti e operatori sociosanitari. Crediti ECM riconosciuti dal Ministero della Salute su tutto il territorio nazionale.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#corsi" className="cta-btn-primary">Vedi i corsi</a>
            <a href="/contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-light dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#008C95', marginBottom: '0.5rem' }}>
                Accreditamento ECM
              </span>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
                Aggiornamento{' '}
                <span style={{ color: '#008C95' }}>professionale certificato</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
                Il sistema ECM (Educazione Continua in Medicina) garantisce l&apos;aggiornamento costante dei professionisti sanitari. Alètheia Srl eroga corsi ECM accreditati in modalità residenziale (aula) e a distanza (FAD), consentendo ai professionisti di acquisire i crediti formativi richiesti dal proprio ordine professionale nel rispetto degli obblighi triennali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORSI ── */}
      <section id="corsi" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#008C95', marginBottom: '0.6rem' }}>
              I nostri corsi
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Percorsi ECM disponibili
            </h2>
          </div>

          <div className="courses-grid">
            {corsi.map((corso) => (
              <CourseCard key={corso.slug} {...corso} />
            ))}
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40" style={{
            marginTop: '3rem',
            borderRadius: '1rem',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <p className="text-teal-900 dark:text-teal-200" style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.6 }}>
              I crediti ECM acquisiti con i nostri corsi sono riconosciuti dal Ministero della Salute e validi per tutti gli ordini professionali sanitari italiani.
            </p>
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
            Vuoi saperne di più sui corsi ECM?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Il nostro team è a disposizione per fornirti tutte le informazioni sui corsi ECM disponibili e sui crediti formativi acquisibili.
          </p>
          <a href="/contatti" className="cta-btn-primary">Contattaci</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
