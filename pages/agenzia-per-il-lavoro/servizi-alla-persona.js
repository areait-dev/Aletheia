import Head from 'next/head';
import Footer from '../../components/Footer';
import { useState } from 'react';
import Header from '../../components/Header';
import FormCandidato from '../../components/FormCandidato';

const SERVICES = [
  {
    icon: 'fas fa-search',
    title: 'Ricerca Attiva del Lavoro',
    description:
      'Ti supportiamo nella ricerca di opportunità lavorative in linea con il tuo profilo, le tue competenze e le tue aspirazioni. Analizziamo il mercato e ti mettiamo in contatto con le aziende giuste.',
    tag: 'Placement',
    color: '#008C95',
  },
  {
    icon: 'fas fa-compass',
    title: 'Orientamento Professionale',
    description:
      'Offriamo sessioni di orientamento individuale per aiutarti a definire il tuo percorso professionale, valorizzare le tue competenze e affrontare con sicurezza il mercato del lavoro.',
    tag: 'Orientamento',
    color: '#10B981',
  },
  {
    icon: 'fas fa-comments',
    title: 'Supporto al Colloquio',
    description:
      'Ti prepariamo al colloquio di lavoro con simulazioni pratiche, consigli personalizzati e tecniche per valorizzare al meglio le tue esperienze e competenze.',
    tag: 'Coaching',
    color: '#008C95',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Programma G.O.L.',
    description:
      'Siamo operatori accreditati del Programma Garanzia Occupabilità Lavoratori (G.O.L.), il piano nazionale per il reinserimento lavorativo. Percorsi personalizzati di formazione e riqualificazione professionale finanziati.',
    tag: 'Piano Nazionale',
    color: '#10B981',
    href: '/programma-gol',
  },
  {
    icon: 'fas fa-star',
    title: 'Garanzia Giovani',
    description:
      'Supportiamo i giovani NEET (under 30 non occupati e non in formazione) con percorsi di orientamento, formazione e tirocinio finanziati dalla Regione Siciliana.',
    tag: 'Under 30',
    color: '#008C95',
  },
  {
    icon: 'fas fa-road',
    title: 'Outplacement',
    description:
      'Accompagniamo le persone in transizione professionale con coaching individuale, aggiornamento del CV e strategie efficaci di ricerca attiva del lavoro.',
    tag: 'Transizione',
    color: '#10B981',
  },
];

function ServiceCard({ icon, title, description, tag, color, index, href }) {
  const [hovered, setHovered] = useState(false);
  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      href={href || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card"
      style={{
        borderRadius: '1.25rem',
        padding: '2rem',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,140,149,0.13), 0 0 0 2px ${color}`
          : '0 4px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        cursor: href ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
    >
      {/* top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${color}, ${color === '#008C95' ? '#10B981' : '#008C95'})`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: hovered ? color : `${color}12`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            color: hovered ? '#fff' : color,
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
        >
          <i className={icon}></i>
        </div>
        <span
          style={{
            fontSize: '0.63rem',
            fontWeight: 800,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color,
            background: `${color}12`,
            padding: '0.22rem 0.6rem',
            borderRadius: '999px',
          }}
        >
          {tag}
        </span>
      </div>

      <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
        {title}
      </h3>
      <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0, flexGrow: 1 }}>
        {description}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          color,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        Scopri di più <span aria-hidden="true">→</span>
      </div>
    </Wrapper>
  );
}

export default function ServiziAllaPersona() {
  return (
    <>
      <Head>
        <title>Servizi alla Persona - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Alètheia Srl - Servizi alla persona: ricerca del lavoro, orientamento professionale, Programma G.O.L., Garanzia Giovani e outplacement in Sicilia."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </Head>

      <Header active="/agenzia-per-il-lavoro" />

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
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
          font-family: inherit;
          border: none;
          cursor: pointer;
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

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 1.5rem;
        }
        .breadcrumb a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover { color: #6EE7B7; }
        .breadcrumb span { color: rgba(255,255,255,0.3); }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 60%, #0F172A 100%)',
          paddingTop: '120px',
          paddingBottom: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative blobs */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div className="hero-badge fade-up">
            Per i Candidati
          </div>

          <h1
            className="fade-up fade-up-1"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.12,
              marginBottom: '1.25rem',
              maxWidth: '700px',
            }}
          >
            Servizi alla{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #10B981, #008C95)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Persona
            </span>
          </h1>

          <p
            className="fade-up fade-up-2"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.68)',
              maxWidth: '820px',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
            }}
          >
            Ti affianchiamo in ogni fase del tuo percorso professionale: dalla ricerca del lavoro all'inserimento in azienda.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/agenzia-per-il-lavoro/offerte-di-lavoro" className="cta-btn-primary">Vedi le offerte</a>
            <a href="#contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────── */}
      <section className="bg-light dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: '260px' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#008C95',
                  marginBottom: '0.5rem',
                }}
              >
                Chi siamo
              </span>
              <h2
                className="text-slate-900 dark:text-white"
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                  fontWeight: 900,
                  marginBottom: '1rem',
                  lineHeight: 1.25,
                }}
              >
                Al tuo fianco nel{' '}
                <span style={{ color: '#008C95' }}>mercato del lavoro</span>
              </h2>
              <p
                className="text-slate-600 dark:text-gray-300"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  margin: 0,
                  maxWidth: '700px',
                }}
              >
                Alètheia S.r.l., Agenzia per il Lavoro autorizzata dal Ministero del Lavoro{' '}
                <strong className="text-slate-900 dark:text-white">(DDS Nr. 1.100/2019)</strong>, mette la professionalità dei
                propri consulenti al servizio dei candidati. In un mercato sempre più veloce e competitivo, ti
                aiutiamo a trovare l'opportunità giusta e a costruire il tuo futuro professionale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MICRO-STATS ──────────────────────────────────────── */}
      <div className="bg-white dark:bg-dark-card">
        <div className="container" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40" style={{
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
          }}>
            {[
              { icon: 'fas fa-compass', label: 'Orientamento gratuito' },
              { icon: 'fas fa-check-circle', label: 'Programma G.O.L. attivo' },
              { icon: 'fas fa-star', label: 'Garanzia Giovani under 30' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className={stat.icon} style={{ color: '#008C95', fontSize: '1rem' }}></i>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#008C95' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVIZI ───────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#008C95',
                marginBottom: '0.5rem',
              }}
            >
              Cosa offriamo
            </span>
            <h2
              className="text-slate-900 dark:text-white"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 900,
                marginBottom: '0.75rem',
              }}
            >
              I nostri{' '}
              <span style={{ color: '#008C95' }}>servizi</span>
            </h2>
            <p
              className="text-slate-600 dark:text-gray-300"
              style={{
                fontSize: '1rem',
                maxWidth: '780px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Percorsi personalizzati per accompagnarti dalla ricerca del lavoro all'inserimento, con strumenti concreti e supporto dedicato.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} index={i} {...s} />
            ))}
          </div>

          {/* accreditation strip */}
          <div
            className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
            style={{
              marginTop: '3rem',
              padding: '1.25rem 2rem',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
              <strong className="text-slate-900 dark:text-white">Agenzia per il Lavoro autorizzata</strong> dal Ministero del
              Lavoro (DDS Nr. 1.100/2019) - Operatore accreditato{' '}
              <strong className="text-slate-900 dark:text-white">Programma G.O.L.</strong> e{' '}
              <strong className="text-slate-900 dark:text-white">Garanzia Giovani</strong> Regione Siciliana.
            </p>
            {/* second badge: Garanzia Giovani */}
            <div className="bg-slate-200 dark:bg-gray-700" style={{ width: '1px', height: '2rem', flexShrink: 0 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
                <strong className="text-slate-900 dark:text-white">Operatore Garanzia Giovani</strong> - Regione Siciliana
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
          padding: '5rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,140,149,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6EE7B7',
              marginBottom: '1rem',
            }}
          >
            Inizia ora
          </span>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#fff',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            Pronto a{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #10B981, #008C95)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              iniziare?
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '760px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Consulta le nostre offerte di lavoro attive o contattaci per una consulenza gratuita.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/agenzia-per-il-lavoro/offerte-di-lavoro" className="cta-btn-primary">Vedi le offerte</a>
            <a href="#contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      <FormCandidato />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
