import Head from 'next/head';
import Image from 'next/image';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import FormAzienda from '../../components/FormAzienda';
import { getLenis } from '../../lib/lenis';

const SERVICES = [
  {
    icon: 'fas fa-handshake',
    title: 'Somministrazione di Lavoro',
    description:
      'Forniamo personale qualificato tramite contratti di somministrazione a tempo determinato e indeterminato. Una soluzione flessibile che garantisce piena conformità normativa e riduzione dei costi amministrativi per la tua azienda.',
    tag: 'Flessibilità',
    color: '#008C95',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Colloquio tra consulente e azienda per la somministrazione di personale',
  },
  {
    icon: 'fas fa-magnifying-glass-chart',
    title: 'Ricerca e Selezione del Personale',
    description:
      'Selezioniamo i profili più adatti alla tua organizzazione attraverso un processo strutturato: analisi del fabbisogno, screening dei candidati, colloqui approfonditi e valutazione delle competenze tecniche e trasversali.',
    tag: 'Headhunting',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Colloquio di selezione del personale',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Consulenza HR',
    description:
      'Offriamo consulenza strategica nella gestione delle Risorse Umane: analisi organizzativa, definizione dei profili, piani di sviluppo del personale e supporto nelle fasi di cambiamento aziendale.',
    tag: 'Strategia',
    color: '#008C95',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Team di consulenza HR in riunione strategica',
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Formazione Aziendale',
    description:
      'Progettiamo percorsi di upskilling e reskilling su misura per sviluppare le competenze del tuo personale, attrarre nuovi talenti e mantenere la tua azienda competitiva. Gestiamo l\'accesso ai Fondi Interprofessionali e supportiamo i processi di riorganizzazione con programmi di riqualificazione finanziati, valorizzando il capitale umano e riducendo i costi di turnover.',
    tag: 'Upskilling',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Sessione di formazione aziendale per i dipendenti',
  },
  {
    icon: 'fas fa-arrows-left-right',
    title: 'Attivazione Tirocini',
    description:
      'Offriamo alle aziende un canale concreto per conoscere e inserire nuove risorse. Individuiamo i profili più adatti, curiamo l\'attivazione del tirocinio e seguiamo l\'intero percorso, trasformando un\'esperienza formativa in una possibile opportunità di inserimento.',
    tag: 'Matching',
    color: '#008C95',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Incontro tra domanda e offerta di lavoro',
  },
  {
    icon: 'fas fa-rotate',
    title: 'Politiche Attive per il Lavoro',
    description:
      'Mettiamo a disposizione delle imprese strumenti e misure per favorire l\'occupazione, facilitando l\'incontro con persone in cerca di lavoro, in fase di reinserimento o interessate a un nuovo percorso professionale. Individuiamo le opportunità più adatte e accompagniamo l\'azienda nella loro attivazione.',
    tag: 'Finanziato',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Percorso di riqualificazione professionale in azienda',
  },
];

const WHY_US = [
  {
    icon: 'fas fa-certificate',
    title: 'Autorizzati dal Ministero del Lavoro e delle Politiche Sociali',
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

function ServiceCard({ icon, title, description, tag, color, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '1.25rem',
        height: '320px',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,140,149,0.18), 0 0 0 2px ${color}`
          : '0 4px 20px rgba(0,0,0,0.1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* immagine a piena card, leggero zoom in hover */}
      <Image
        src={image}
        alt={imageAlt || title}
        fill
        sizes="(max-width: 768px) 100vw, 340px"
        style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* overlay scuro: leggero sempre (leggibilità badge), più marcato in hover (leggibilità testo) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.92) 100%)'
            : 'linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.15) 40%, rgba(15,23,42,0.55) 100%)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* badge + icona: sempre visibili, per incuriosire */}
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem', zIndex: 1 }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.05rem',
            color: '#fff',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
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
            color: '#fff',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(4px)',
            padding: '0.3rem 0.7rem',
            borderRadius: '999px',
          }}
        >
          {tag}
        </span>
      </div>

      {/* titolo + descrizione: appaiono in hover */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '1.5rem',
          zIndex: 1,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.5rem', lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
          {description}
        </p>
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
      className="bg-white dark:bg-white/5"
      style={{
        border: hovered ? '1px solid rgba(0,140,149,0.4)' : '1px solid rgba(0,0,0,0.08)',
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* decorative ordinal */}
      <span aria-hidden="true" className="text-slate-900/5 dark:text-white/5" style={{
        position: 'absolute', top: '0.5rem', right: '1rem',
        fontSize: '3rem', fontWeight: 900,
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
          <p style={{ margin: 0, fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#008C95' }}>
            {detail}
          </p>
          <h3 className="text-slate-900 dark:text-white" style={{ margin: 0, fontSize: '1rem', fontWeight: 800, lineHeight: 1.3 }}>
            {title}
          </h3>
        </div>
      </div>
      <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.75 }}>
        {description}
      </p>
    </div>
  );
}

// Scroll fluido (Lenis) verso il form aziendale, con fallback nativo se Lenis
// non è ancora inizializzato (retry limitato per non ciclare all'infinito).
function scrollToContattaAzienda() {
  const target = document.getElementById('contatta-azienda');
  if (!target) return;
  let attempts = 0;
  const tryScroll = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else if (attempts++ < 20) {
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(tryScroll, 150);
    }
  };
  tryScroll();
}

export default function ServiziAlleImprese() {
  // Al mount, se si arriva con #contatta-azienda nell'URL (es. da un'altra pagina):
  // Lenis riporta lo scroll a 0 all'inizializzazione, quindi il salto nativo del
  // browser all'anchor viene annullato se non lo rifacciamo qui dopo il mount.
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#contatta-azienda') return;
    const timer = setTimeout(scrollToContattaAzienda, 100);
    return () => clearTimeout(timer);
  }, []);

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
          background: 'linear-gradient(135deg, #0F172A 0%, #0a4f54 60%, #003134 100%)',
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
            Ricerca. Selezione. Somministrazione
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

          <div className="fade-up delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <a
              href="#contatta-azienda"
              className="cta-btn-primary"
              onClick={(e) => { e.preventDefault(); scrollToContattaAzienda(); }}
            >
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
      <section className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
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
                Le persone giuste. Le competenze che servono.{' '}
                <span style={{ color: '#008C95' }}>La crescita che cerchi.</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{
                fontSize: '1rem', lineHeight: 1.8,
                margin: '0 0 1rem',
              }}>
                Dalla <strong className="text-slate-900 dark:text-white">ricerca e selezione del personale</strong> alla{' '}
                <strong className="text-slate-900 dark:text-white">formazione e riqualificazione delle competenze</strong>,
                dall'analisi dei fabbisogni alla gestione dei percorsi professionali, lavoriamo per creare il
                giusto incontro tra ciò che l'impresa cerca e le professionalità disponibili.
              </p>
              <p className="text-slate-600 dark:text-gray-300" style={{
                fontSize: '1rem', lineHeight: 1.8,
                margin: '0 0 1.5rem',
              }}>
                Un unico partner per{' '}
                <strong className="text-slate-900 dark:text-white">attrarre, sviluppare e valorizzare le persone</strong>{' '}
                che fanno crescere la tua azienda.
              </p>
              <a
                href="/chi-siamo"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.95rem', fontWeight: 700, color: '#008C95', textDecoration: 'none',
                }}
              >
                Scopri chi siamo <span aria-hidden="true">→</span>
              </a>
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
        </div>
      </section>

      {/* ── PERCHÉ SCEGLIERCI ─────────────────────────────────── */}
      <section
        className="bg-slate-50 dark:bg-dark-bg"
        style={{
          padding: '5rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,140,149,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block', fontSize: '0.7rem', fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#008C95', marginBottom: '0.5rem',
            }}>
              I nostri punti di forza
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 900, marginBottom: '0.75rem',
            }}>
              Perché{' '}
              <span style={{
                background: 'linear-gradient(90deg, #008C95, #10B981)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                sceglierci
              </span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400" style={{
              fontSize: '1rem',
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

      <FormAzienda
        badge="Affidati a noi"
        title="Richiedi una consulenza gratuita"
        subtitle="Compila il form e scopri come possiamo supportare la crescita della tua azienda."
      />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      </main>
      <Footer />
    </>
  );
}
