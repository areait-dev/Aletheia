import Head from 'next/head';
import Image from 'next/image';
import Footer from '../../components/Footer';
import { Fragment, useEffect, useState } from 'react';
import Header from '../../components/Header';
import FormCandidato from '../../components/FormCandidato';
import { getLenis } from '../../lib/lenis';
import { getSchede } from '../../lib/wp-schede';
import { isrOptions } from '../../lib/wp';
import { getPagina } from '../../lib/wp-pagine';
import HeroTitle from '../../components/HeroTitle';
import { withSiteOptions } from '../../lib/wp-site';

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

function ServiceCard({ title, description, tag, color, index, href, image, imageAlt }) {
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
            // fondo 0.72 (era 0.55): foto molto chiare (es. Outplacement) lasciavano il titolo bianco sotto il contrasto minimo
            : 'linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.15) 40%, rgba(15,23,42,0.72) 100%)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* badge: sempre visibile, per incuriosire (niente icona nelle card dei servizi) */}
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem', zIndex: 1 }}>
        <span className="badge-overlay">
          <span className="badge-overlay-dot" style={{ "--badge-dot": color }} aria-hidden="true" />
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

// Liste di card: WordPress (CPT scheda) se WP_URL è impostato, altrimenti data/schede.js (vedi lib/wp-schede.ts).
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('agenzia-per-il-lavoro/servizi-alla-persona'), servizi: await getSchede('servizi-persona') }, ...isrOptions() };
}

export default function ServiziAllaPersona({ servizi: SERVICES, pagina }) {
  const T = pagina.testi;
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
        <title>{pagina.seo.titolo || "Servizi alla Persona - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Alètheia Srl - Servizi alla persona: ricerca del lavoro, orientamento professionale, Programma G.O.L., Garanzia Giovani e outplacement in Sicilia."}
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
      <section className="page-hero page-hero--dark page-hero--left">
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

          <div className="page-hero-badge fade-up">{T.hero_eyebrow}</div>

          <h1 className="fade-up fade-up-1" style={{ maxWidth: '700px' }}>
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', }}>{w}</span>} />
            </h1>

          {/* Nessun sottotitolo: l'hero è speculare a quella di Servizi alle imprese (badge, titolo, bottoni).
              Il campo `hero_sottotitolo` di questa pagina (data/pagine.js / WordPress) non viene più mostrato. */}

          <div className="page-hero-actions fade-up fade-up-3">
            <a href={T.hero_cta1.href} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-light">{T.hero_cta1.label}</a>
            <a
              href="#contatta-candidato"
              className="btn btn-lg btn-ghost-light"
              onClick={(e) => { e.preventDefault(); scrollToContattaCandidato(); }}
            >{T.hero_cta2.label}</a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      {/* Fascia di transizione full-width tra hero (scura) e "Chi siamo" (chiara):
          niente più box arrotondato "sospeso" a fondo sezione, ma una striscia
          a contatto diretto con l'hero, con un bordo inferiore sottile a fare
          da cerniera visiva con la sezione successiva. */}
      <div
        className="bg-[#5FC2C8]/20 dark:bg-[#5FC2C8]/10 border-b border-[#018891]/25 dark:border-[#5FC2C8]/20"
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
                <i className={stat.icon} style={{ color: '#04767D', fontSize: '1rem' }}></i>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#04767D' }}>{stat.label}</span>
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
                  color: 'var(--primary-text)',
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
                color: 'var(--primary-text)',
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
        </div>
      </section>

      <FormCandidato />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      </main>
      <Footer />
    </>
  );
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
