import Head from 'next/head';
import Image from 'next/image';
import Footer from '../../components/Footer';
import { Fragment, useEffect, useState } from 'react';
import Header from '../../components/Header';
import FormCandidato from '../../components/FormCandidato';
import { getLenis } from '../../lib/lenis';

// Scroll fluido (Lenis) verso il form candidato, con fallback nativo se Lenis
// non è ancora inizializzato (retry limitato per non ciclare all'infinito).
function scrollToContattaCandidato() {
  const target = document.getElementById('contatta-candidato');
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

const SERVICES = [
  {
    icon: 'fas fa-search',
    title: 'Ricerca Attiva del Lavoro',
    description:
      'Ti supportiamo nella ricerca di opportunità lavorative in linea con il tuo profilo, le tue competenze e le tue aspirazioni. Analizziamo il mercato e ti mettiamo in contatto con le aziende giuste.',
    tag: 'Placement',
    color: '#008C95',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Persona che consulta offerte di lavoro al computer',
  },
  {
    icon: 'fas fa-compass',
    title: 'Orientamento Professionale',
    description:
      'Offriamo sessioni di orientamento individuale per aiutarti a definire il tuo percorso professionale, valorizzare le tue competenze e affrontare con sicurezza il mercato del lavoro.',
    tag: 'Orientamento',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Consulente in sessione di orientamento professionale',
  },
  {
    icon: 'fas fa-comments',
    title: 'Supporto al Colloquio',
    description:
      'Ti prepariamo al colloquio di lavoro con simulazioni pratiche, consigli personalizzati e tecniche per valorizzare al meglio le tue esperienze e competenze.',
    tag: 'Coaching',
    color: '#008C95',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Simulazione di colloquio di lavoro',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Programma G.O.L.',
    description:
      'Siamo operatori accreditati del Programma Garanzia Occupabilità Lavoratori (G.O.L.), il piano nazionale per il reinserimento lavorativo. Percorsi personalizzati di formazione e riqualificazione professionale finanziati.',
    tag: 'Piano Nazionale',
    color: '#10B981',
    href: '/programma-gol',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Percorso di reinserimento lavorativo finanziato',
  },
  {
    icon: 'fas fa-star',
    title: 'Garanzia Giovani',
    description:
      'Supportiamo i giovani NEET (under 30 non occupati e non in formazione) con percorsi di orientamento, formazione e tirocinio finanziati dalla Regione Siciliana.',
    tag: 'Under 30',
    color: '#008C95',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Giovani professionisti in formazione',
  },
  {
    icon: 'fas fa-road',
    title: 'Outplacement',
    description:
      'Accompagniamo le persone in transizione professionale con coaching individuale, aggiornamento del CV e strategie efficaci di ricerca attiva del lavoro.',
    tag: 'Transizione',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Coaching per la transizione professionale',
  },
];

function ServiceCard({ icon, title, description, tag, color, index, href, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      href={href || undefined}
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
        cursor: href ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'block',
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

      {/* titolo: sempre visibile; descrizione: appare in hover */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '1.5rem',
          zIndex: 1,
        }}
      >
        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 900, margin: 0, lineHeight: 1.3, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          {title}
        </h3>
        <p
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.85rem',
            lineHeight: 1.65,
            margin: 0,
            maxHeight: hovered ? '160px' : '0px',
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? '0.5rem' : 0,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease',
          }}
        >
          {description}
        </p>
      </div>
    </Wrapper>
  );
}

export default function ServiziAllaPersona() {
  // Al mount, se si arriva con #contatta-candidato nell'URL (es. da un'altra pagina):
  // Lenis riporta lo scroll a 0 all'inizializzazione, quindi il salto nativo del
  // browser all'anchor viene annullato se non lo rifacciamo qui dopo il mount.
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#contatta-candidato') return;
    const timer = setTimeout(scrollToContattaCandidato, 100);
    return () => clearTimeout(timer);
  }, []);

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
      </Head>

      <Header active="/agenzia-per-il-lavoro" />

      <main>

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

        /* Il bottone chat flottante (fixed, angolo in basso a destra) su mobile si
           sovrappone alle ultime righe del paragrafo "Chi siamo": stesso breakpoint
           (1024px) usato da .chatbot-root per restringersi in quell'angolo. */
        @media (max-width: 1024px) {
          .chi-siamo-section { padding-bottom: 5.5rem !important; }
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
            <a href="https://aletheia4job.it/" target="_blank" rel="noopener noreferrer" className="cta-btn-primary">Vedi le offerte</a>
            <a
              href="#contatta-candidato"
              className="cta-btn-outline"
              onClick={(e) => { e.preventDefault(); scrollToContattaCandidato(); }}
            >
              Contattaci
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      {/* Fascia di transizione full-width tra hero (scura) e "Chi siamo" (chiara):
          niente più box arrotondato "sospeso" a fondo sezione, ma una striscia
          a contatto diretto con l'hero, con un bordo inferiore sottile a fare
          da cerniera visiva con la sezione successiva. */}
      <div
        className="bg-[#6EE7B7]/20 dark:bg-[#6EE7B7]/10 border-b border-[#10B981]/25 dark:border-[#6EE7B7]/20"
        style={{ padding: '1.1rem 0' }}
      >
        <div
          className="container"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}
        >
          {[
            { icon: 'fas fa-compass', label: 'Orientamento gratuito' },
            { icon: 'fas fa-star', label: 'Garanzia Giovani under 30' },
          ].map((stat, i, arr) => (
            <Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className={stat.icon} style={{ color: '#059669', fontSize: '1rem' }}></i>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#059669' }}>{stat.label}</span>
              </div>
              {i < arr.length - 1 && (
                <span aria-hidden="true" style={{ width: '1px', height: '1.1rem', background: 'rgba(5,150,105,0.35)' }} />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* ── INTRO ─────────────────────────────────────────────── */}
      <section className="chi-siamo-section bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
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

      <FormCandidato />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      </main>
      <Footer />
    </>
  );
}
