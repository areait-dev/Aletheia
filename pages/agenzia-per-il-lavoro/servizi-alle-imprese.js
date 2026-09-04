import Head from 'next/head';
import Footer from '../../components/Footer';
import { useState } from 'react';
import Header from '../../components/Header';
import FormAzienda from '../../components/FormAzienda';

const SERVICES = [
  {
    icon: 'fas fa-handshake',
    title: 'Somministrazione di Lavoro',
    description:
      'Forniamo personale qualificato tramite contratti di somministrazione a tempo determinato e indeterminato. Una soluzione flessibile che garantisce piena conformità normativa e riduzione dei costi amministrativi per la tua azienda.',
    tag: 'Flessibilità',
    color: '#008C95',
  },
  {
    icon: 'fas fa-magnifying-glass-chart',
    title: 'Ricerca e Selezione del Personale',
    description:
      'Selezioniamo i profili più adatti alla tua organizzazione attraverso un processo strutturato: analisi del fabbisogno, screening dei candidati, colloqui approfonditi e valutazione delle competenze tecniche e trasversali.',
    tag: 'Headhunting',
    color: '#10B981',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Consulenza HR',
    description:
      'Offriamo consulenza strategica nella gestione delle Risorse Umane: analisi organizzativa, definizione dei profili, piani di sviluppo del personale e supporto nelle fasi di cambiamento aziendale.',
    tag: 'Strategia',
    color: '#008C95',
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Formazione Aziendale',
    description:
      'Progettiamo percorsi formativi su misura per sviluppare le competenze del tuo personale e adeguarle alle evoluzioni tecnologiche e organizzative del mercato. Gestiamo anche l\'accesso ai Fondi Interprofessionali.',
    tag: 'Upskilling',
    color: '#10B981',
  },
  {
    icon: 'fas fa-arrows-left-right',
    title: 'Intermediazione Lavoro',
    description:
      'Favoriamo l\'incontro tra domanda e offerta di lavoro nel territorio siciliano e nazionale. Gestiamo l\'intero processo di intermediazione nel pieno rispetto della normativa vigente.',
    tag: 'Matching',
    color: '#008C95',
  },
  {
    icon: 'fas fa-rotate',
    title: 'Riqualificazione e Upskilling',
    description:
      'Supportiamo le aziende nei processi di riorganizzazione con programmi di riqualificazione professionale finanziati, per valorizzare il capitale umano esistente e ridurre i costi di turnover.',
    tag: 'Finanziato',
    color: '#10B981',
  },
];

const WHY_US = [
  {
    icon: 'fas fa-certificate',
    title: 'Autorizzati ANPAL',
    description: 'Agenzia per il Lavoro autorizzata dal Ministero del Lavoro con decreto DDS Nr. 1.100/2019, iscritta all\'Albo Nazionale delle Agenzie per il Lavoro.',
    detail: 'DDS Nr. 1.100/2019',
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Operativi in Sicilia dal 2005',
    description: 'Vent\'anni di radicamento nel territorio siciliano, con una rete consolidata di relazioni con aziende, istituzioni ed enti di formazione locali.',
    detail: 'Dal 2005',
  },
  {
    icon: 'fas fa-network-wired',
    title: 'Parte del network PromoterGroup S.p.A.',
    description: 'Facciamo parte di un gruppo solido e strutturato, che ci permette di offrire competenze multidisciplinari e risorse ampliate a vantaggio dei nostri clienti.',
    detail: 'PromoterGroup S.p.A.',
  },
];

function ServiceCard({ icon, title, description, tag, color }) {
  const [hovered, setHovered] = useState(false);
  const accent = color === '#008C95' ? '#10B981' : '#008C95';

  return (
    <div
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
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${color}, ${accent})`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '52px', height: '52px',
            borderRadius: '14px',
            background: hovered ? color : `${color}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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
            fontSize: '0.63rem', fontWeight: 800,
            letterSpacing: '0.09em', textTransform: 'uppercase',
            color, background: `${color}12`,
            padding: '0.22rem 0.6rem', borderRadius: '999px',
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
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.8rem', fontWeight: 700, color,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        Scopri di più
      </div>
    </div>
  );
}

function WhyCard({ icon, title, description, detail, index }) {
  const [hovered, setHovered] = useState(false);
  const ordinal = String(index + 1).padStart(2, '0');

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: hovered ? '1px solid rgba(0,140,149,0.4)' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* decorative ordinal */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: '0.5rem', right: '1rem',
        fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.06)',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>
        {ordinal}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '48px', height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #008C95, #10B981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', color: '#fff', flexShrink: 0,
            boxShadow: '0 4px 16px rgba(0,140,149,0.35)',
          }}
        >
          <i className={icon}></i>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6EE7B7' }}>
            {detail}
          </p>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
            {title}
          </h3>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.75 }}>
        {description}
      </p>
    </div>
  );
}

export default function ServiziAlleImprese() {
  return (
    <>
      <Head>
        <title>Servizi alle Imprese - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Alètheia Srl - Consulenza HR integrata per le imprese: somministrazione, ricerca e selezione, formazione aziendale e intermediazione lavoro in Sicilia."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/agenzia-per-il-lavoro" />

      <main>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.55s ease-out forwards; }
        .delay-1   { animation-delay: 0.08s; opacity: 0; }
        .delay-2   { animation-delay: 0.18s; opacity: 0; }
        .delay-3   { animation-delay: 0.28s; opacity: 0; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid      { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .why-grid      { grid-template-columns: 1fr; }
        }

        .breadcrumb {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.78rem; color: rgba(255,255,255,0.5);
          margin-bottom: 1.5rem;
        }
        .breadcrumb a { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: #6EE7B7; }
        .breadcrumb span { color: rgba(255,255,255,0.3); }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          color: #6EE7B7; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25);
          padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1.25rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981);
          color: #fff; font-weight: 700; font-size: 0.95rem;
          text-decoration: none; font-family: inherit;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,140,149,0.5);
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #0F172A 100%)',
          paddingTop: '120px',
          paddingBottom: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,140,149,0.14) 0%, transparent 70%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div className="hero-badge fade-up">
            Per le Aziende
          </div>

          <h1
            className="fade-up delay-1"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.12, marginBottom: '1.25rem', maxWidth: '700px',
            }}
          >
            Servizi alle{' '}
            <span style={{
              background: 'linear-gradient(90deg, #008C95, #10B981)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Imprese
            </span>
          </h1>

          <p
            className="fade-up delay-2"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.68)',
              maxWidth: '820px', lineHeight: 1.75, marginBottom: '2.5rem',
            }}
          >
            Consulenza integrata nelle Risorse Umane: dalla ricerca del personale alla somministrazione, fino alla formazione aziendale.
          </p>

          <div className="fade-up delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contatti" className="cta-btn-primary">
              Richiedi una consulenza
            </a>
            <a
              href="tel:+390932862613"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.9rem 2rem', borderRadius: '999px',
                color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              <i className="fas fa-phone" style={{ fontSize: '0.85rem' }}></i>
              +39 0932 862613
            </a>
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────── */}
      <section className="bg-light dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <span style={{
                display: 'inline-block', fontSize: '0.68rem', fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#008C95', marginBottom: '0.5rem',
              }}>
                La nostra proposta
              </span>
              <h2 className="text-slate-900 dark:text-white" style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25,
              }}>
                Consulenza HR{' '}
                <span style={{ color: '#008C95' }}>integrata</span>{' '}
                per la tua azienda
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{
                fontSize: '1rem', lineHeight: 1.8,
                margin: 0, maxWidth: '700px',
              }}>
                Alètheia S.r.l. è in grado di offrire alle aziende una consulenza integrata nel campo delle Risorse
                Umane: anticipa le esigenze organizzative, forma e riqualifica le competenze necessarie, sviluppa un
                accurato processo di ricerca e selezione del personale e contribuisce all'incontro tra domanda e
                offerta di lavoro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIZI ───────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block', fontSize: '0.7rem', fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#008C95', marginBottom: '0.5rem',
            }}>
              Cosa offriamo
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 900, marginBottom: '0.75rem',
            }}>
              I nostri{' '}
              <span style={{ color: '#008C95' }}>servizi</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{
              fontSize: '1rem',
              maxWidth: '780px', margin: '0 auto', lineHeight: 1.7,
            }}>
              Soluzioni su misura per ogni esigenza organizzativa, dall'inserimento di risorse alla gestione strategica del capitale umano.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>

          <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{
            marginTop: '3rem', padding: '1.25rem 2rem',
            borderRadius: '1rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center',
          }}>
            <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
              <strong className="text-slate-900 dark:text-white">Agenzia per il Lavoro autorizzata</strong> dal Ministero del
              Lavoro (DDS Nr. 1.100/2019) - Ente di formazione accreditato alla Regione Siciliana (DDG n 78/2017).
            </p>
          </div>
        </div>
      </section>

      {/* ── PERCHÉ SCEGLIERCI ─────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
          padding: '5rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,140,149,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block', fontSize: '0.7rem', fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#6EE7B7', marginBottom: '0.5rem',
            }}>
              I nostri punti di forza
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 900, color: '#fff', marginBottom: '0.75rem',
            }}>
              Perché{' '}
              <span style={{
                background: 'linear-gradient(90deg, #008C95, #10B981)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                sceglierci
              </span>
            </h2>
            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.55)',
              maxWidth: '760px', margin: '0 auto', lineHeight: 1.7,
            }}>
              Vent'anni di esperienza, autorizzazioni ministeriali e un network solido al servizio della tua impresa.
            </p>
          </div>

          <div className="why-grid">
            {WHY_US.map((item, i) => (
              <WhyCard key={i} index={i} {...item} />
            ))}
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
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,140,149,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* 2-column: left CTA + right contact card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Left: CTA content */}
            <div>

              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.2,
              }}>
                Parliamo delle tue{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #10B981, #008C95)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  esigenze
                </span>
              </h2>

              <p style={{
                fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)',
                maxWidth: '760px', marginBottom: '2rem', lineHeight: 1.7,
              }}>
                Contattaci per una consulenza gratuita e scopri come possiamo supportare la crescita della tua azienda.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contatti" className="cta-btn-primary">
                  Richiedi una consulenza
                </a>
                <a
                  href="tel:+390932862613"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    padding: '0.9rem 2rem', borderRadius: '999px',
                    background: 'transparent', color: 'rgba(255,255,255,0.8)',
                    fontWeight: 700, fontSize: '0.95rem',
                    textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  <i className="fas fa-phone" style={{ fontSize: '0.85rem' }}></i>
                  +39 0932 862613
                </a>
              </div>
            </div>

            {/* Right: contact card */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1rem',
              padding: '1.5rem',
            }}>
              <p style={{ margin: '0 0 1.25rem', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7' }}>
                Contatti diretti
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i className="fas fa-phone" style={{ color: '#6EE7B7', width: '1rem', flexShrink: 0, textAlign: 'center' }}></i>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>+39 0932 862613</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i className="fas fa-envelope" style={{ color: '#6EE7B7', width: '1rem', flexShrink: 0, textAlign: 'center' }}></i>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>info@aletheiasrl.it</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-clock" style={{ color: '#6EE7B7', width: '1rem', flexShrink: 0, textAlign: 'center', marginTop: '0.15rem' }}></i>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>Lun - Ven: 9:00 - 13:00 / 15:00 - 18:00</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#6EE7B7', width: '1rem', flexShrink: 0, textAlign: 'center', marginTop: '0.15rem' }}></i>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>Via del Carrubo, snc<br />97019 Vittoria (RG)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FormAzienda />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      </main>
      <Footer />
    </>
  );
}
