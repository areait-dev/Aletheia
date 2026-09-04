import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SeoHead from '../components/SeoHead';
import { ALL_NEWS, formatDate } from '../lib/newsData';
import JobSkeleton from '../components/JobSkeleton';
import Reveal from '../components/Reveal';

const GRID_SPRING = { type: 'spring', stiffness: 500, damping: 40 };

// Solo le news rilevanti per l'Agenzia per il Lavoro (tag 'apl')
const aplNews = ALL_NEWS.filter((n) => n.tags?.includes('apl'));

// Card news riutilizzata dalla pagina /news (pages/news/index.js)
function NewsCard({ news }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1rem',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 32px rgba(0,0,0,0.1)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Immagine */}
      <div style={{ position: 'relative', paddingTop: '56.25%', background: '#F0FDFA', overflow: 'hidden' }}>
        {!imgError ? (
          <img
            src={news.image}
            alt={news.title}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#F0FDFA',
          }}>
          </div>
        )}
      </div>

      {/* Contenuto */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#008C95' }}>
          {formatDate(news.date)}
        </span>

        <h3 className="text-slate-900 dark:text-white" style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: 800,
          lineHeight: 1.4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {news.title}
        </h3>

        <p className="text-slate-600 dark:text-gray-300" style={{
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: 1.65,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          flex: 1,
        }}>
          {news.excerpt}
        </p>

        <Link
          href={`/news/${news.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.25rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#008C95',
            textDecoration: 'none',
          }}
        >
          Leggi l&#39;articolo
        </Link>
      </div>
    </div>
  );
}

export default function AgenziaPerIlLavoro({ jobs = [] }) {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  // Skeleton di cortesia durante l'inizializzazione della pagina (evita reflow al mount).
  const [jobsLoading, setJobsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setJobsLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const [locationFilter, setLocationFilter] = useState(null);
  const jobLocations = [...new Set(jobs.map((j) => j.location).filter(Boolean))];
  const filteredJobs = locationFilter ? jobs.filter((j) => j.location === locationFilter) : jobs;

  const candidatiExtra = [
    'Migliaia di offerte di lavoro aggiornate',
    'Supporto CV e colloquio incluso',
    'Percorsi di riqualificazione professionale',
  ];
  const aziendeExtra = [
    'Selezione rapida e profili verificati',
    'Flessibilità contrattuale garantita',
    'Consulenza HR continuativa',
  ];

  const panelFlex = (name) => {
    if (!hoveredPanel) return '1 1 0%';
    return hoveredPanel === name ? '1.18 1 0%' : '0.82 1 0%';
  };

  return (
    <>
      <Head>
        <title>Agenzia per il Lavoro - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <SeoHead
          title="Agenzia per il Lavoro - Alètheia Srl"
          description="Alètheia Srl - Agenzia per il Lavoro autorizzata. Servizi di somministrazione, ricerca e selezione, outplacement e formazione professionale in Sicilia."
          url="/agenzia-per-il-lavoro"
        />
      </Head>

      <Header active="/agenzia-per-il-lavoro" />

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fadeUp { animation: fadeUp 0.5s ease-out forwards; }
        .anim-fadeUp-d1 { animation-delay: 0.1s; opacity: 0; }
        .anim-fadeUp-d2 { animation-delay: 0.2s; opacity: 0; }
        .anim-fadeUp-d3 { animation-delay: 0.3s; opacity: 0; }

        .hero-wrap {
          display: flex;
          min-height: calc(100vh - 80px);
        }
        .hero-panel {
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: flex 0.55s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6rem 4rem;
          text-align: center;
        }
        .panel-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          display: block;
          pointer-events: none;
          transition: transform 0.6s ease;
        }
        .hero-panel:hover .panel-bg {
          transform: scale(1.05);
        }
        .panel-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          transition: background 0.4s ease;
        }
        .hero-panel:hover .panel-overlay {
          background: rgba(0,0,0,0.12);
        }
        .panel-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .panel-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.75rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
          border: 2px solid;
          cursor: pointer;
          background: none;
          font-family: inherit;
        }
        .btn-candidati {
          color: #fff;
          border-color: rgba(255,255,255,0.45);
        }
        .btn-candidati:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.75);
        }
        .btn-aziende {
          color: #10B981;
          border-color: rgba(16,185,129,0.5);
        }
        .btn-aziende:hover {
          background: rgba(16,185,129,0.12);
          border-color: #10B981;
        }

        @media (max-width: 768px) {
          .hero-wrap { flex-direction: column; }
          .hero-panel { padding: 3.5rem 2rem; flex: none !important; }
        }

        .trust-bar-wrap {
          background: linear-gradient(135deg, #0F172A 0%, #134E4A 100%);
        }
        .trust-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .trust-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0 2.5rem;
          border-left: 1px solid rgba(255,255,255,0.12);
        }
        .trust-card:first-child {
          border-left: none;
          padding-left: 0;
        }
        .trust-icon-glow {
          font-size: 1.5rem;
          color: #10B981;
          filter: drop-shadow(0 0 6px rgba(16,185,129,0.3));
          flex-shrink: 0;
        }
        .trust-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .trust-label {
          font-size: 0.9rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
          white-space: nowrap;
        }
        .trust-sub {
          font-size: 0.72rem;
          font-weight: 400;
          color: #94A3B8;
        }
        @media (max-width: 900px) {
          .trust-card { border-left: none; padding: 0 1.25rem; }
        }
        @media (max-width: 640px) {
          .trust-label { white-space: normal; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ background: '#0F172A', paddingTop: '80px' }}>
        <div className="hero-wrap">

          {/* ─── PANNELLO CANDIDATI ─── */}
          <div
            className="hero-panel"
            style={{ flex: panelFlex('candidati'), background: '#0F172A' }}
            onMouseEnter={() => setHoveredPanel('candidati')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <Image
              className="panel-bg"
              src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=1200&q=80"
              alt=""
              aria-hidden="true"
              fill
              sizes="50vw"
            />
            <div
              className="panel-overlay"
              style={{
                background:
                  'linear-gradient(135deg, rgba(15,23,42,0.55) 0%, rgba(10,79,84,0.45) 60%, rgba(0,140,149,0.5) 100%)',
              }}
            />

            <div className="panel-content">
              {/* Badge */}
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#7DD3FC',
                  background: 'rgba(125,211,252,0.12)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(125,211,252,0.25)',
                }}
              >
                Candidati
              </span>

              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Cerchi lavoro?
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.65)',
                  maxWidth: '360px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Trova opportunità di lavoro in Sicilia e in tutta Italia. Ti affianchiamo in ogni fase: dalla ricerca al colloquio, fino all'inserimento.
              </p>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0.25rem 0 0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {candidatiExtra.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }}></i>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="/agenzia-per-il-lavoro/servizi-alla-persona" className="panel-cta-btn btn-candidati">
                <i className="fas fa-user-check" style={{ fontSize: '0.75rem' }}></i>
                Servizi alla Persona
              </a>
            </div>
          </div>

          {/* ─── PANNELLO AZIENDE ─── */}
          <div
            className="hero-panel"
            style={{ flex: panelFlex('aziende'), background: '#0F172A' }}
            onMouseEnter={() => setHoveredPanel('aziende')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <Image
              className="panel-bg"
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
              alt=""
              aria-hidden="true"
              fill
              sizes="50vw"
            />
            <div
              className="panel-overlay"
              style={{
                background:
                  'linear-gradient(135deg, rgba(15,23,42,0.55) 0%, rgba(10,79,84,0.45) 60%, rgba(0,140,149,0.5) 100%)',
              }}
            />

            <div className="panel-content">
              {/* Badge */}
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6EE7B7',
                  background: 'rgba(16,185,129,0.12)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(16,185,129,0.3)',
                }}
              >
                Aziende
              </span>

              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Cerchi personale?
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.65)',
                  maxWidth: '360px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Gestiamo per te la ricerca, selezione e somministrazione del personale. Soluzioni flessibili e conformi alla normativa vigente.
              </p>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0.25rem 0 0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {aziendeExtra.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '0.75rem' }}></i>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="/agenzia-per-il-lavoro/servizi-alle-imprese" className="panel-cta-btn btn-aziende">
                <i className="fas fa-building" style={{ fontSize: '0.75rem' }}></i>
                Servizi alle Imprese
              </a>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="trust-bar-wrap">
          <div className="trust-bar">
            {[
              { icon: 'fas fa-certificate', label: 'Autorizzata ANPAL', sub: 'DDS Nr 1.100/2019' },
              { icon: 'fas fa-map-marker-alt', label: 'Radicata in Sicilia', sub: 'Dal 2005' },
              { icon: 'fas fa-users', label: 'Migliaia di candidati', sub: 'Inseriti con successo' },
              { icon: 'fas fa-shield-alt', label: 'Contratti garantiti', sub: 'Conformità normativa' },
            ].map((item, i) => (
              <div key={i} className="trust-card">
                <i className={`${item.icon} trust-icon-glow`}></i>
                <div className="trust-text">
                  <span className="trust-label">{item.label}</span>
                  <span className="trust-sub">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHI SIAMO ────────────────────────────────────────── */}
      <section className="bg-light dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Colonna testo (60%) */}
            <Reveal className="flex-[3_1_300px]">
              <span style={{
                display: 'inline-block', fontSize: '0.68rem', fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#008C95', marginBottom: '0.6rem',
              }}>
                Chi siamo
              </span>
              <h2 className="text-slate-900 dark:text-white" style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900,
                marginBottom: '1rem', lineHeight: 1.25,
              }}>
                Alètheia APL -{' '}
                <span style={{ color: '#008C95' }}>Autorizzata ANPAL</span>
              </h2>

              {/* badge accrediti — spostati subito sotto il titolo */}
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {[
                  { icon: 'fas fa-certificate', label: 'DDS Nr. 1.100/2019' },
                  { icon: 'fas fa-map-marker-alt', label: 'Operativa dal 2005' },
                  { icon: 'fas fa-network-wired', label: 'PromoterGroup S.p.A.' },
                ].map((b, i) => (
                  <span
                    key={i}
                    className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      fontSize: '0.7rem', fontWeight: 600,
                      padding: '0.3rem 0.7rem', borderRadius: '999px',
                    }}
                  >
                    <i className={b.icon} style={{ fontSize: '0.65rem', color: '#008C95' }}></i>
                    {b.label}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p className="text-slate-900 dark:text-gray-100" style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.65, margin: 0 }}>
                  Alethèia S.r.l. offre un servizio attento e preciso: ricerca e seleziona personale qualificato
                  per l'inserimento in azienda e aiuta le persone nella ricerca del lavoro. Compito dell'agenzia
                  per il lavoro è agevolare l'incontro tra persone in cerca di lavoro e imprese in cerca di lavoratori.
                </p>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.9, margin: 0 }}>
                  In un mercato sempre più veloce e competitivo, Alethèia S.r.l., Agenzia per il Lavoro è in grado
                  di offrire una consulenza integrata nel campo delle Risorse Umane e di anticipare le esigenze
                  organizzative, formare e riqualificare le competenze necessarie per determinati ruoli e posizioni,
                  sviluppare un accurato processo di ricerca e selezione del personale e contribuire all'incontro
                  tra domanda e offerta di lavoro.
                </p>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.9, margin: 0 }}>
                  Alethèia S.r.l. desidera ampliare e potenziare il proprio ruolo di leva del sistema economico e
                  sociale, ed essere riconosciuta e apprezzata come agenzia di sviluppo ed intermediazione
                  domanda-offerta di lavoro: l'impresa che <em>"è"</em> in termini di competenze ed esperienze, e
                  l'impresa <em>"che fa"</em> ovvero che è capace di tradurre i progetti d'impresa e di lavoro in
                  realizzazioni concrete e solide, a beneficio della collettività.
                </p>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.9, margin: 0 }}>
                  Attraverso Alethèia S.r.l., ente accreditato quale Agenzia per il Lavoro,{' '}
                  <strong className="text-slate-900 dark:text-white">PromoterGroup S.p.A.</strong> desidera ampliare il proprio
                  ruolo di leva del sistema economico e sociale. Alethèia S.r.l., Agenzia per il Lavoro, mette la
                  professionalità dei propri consulenti al servizio di candidati e aziende.
                </p>
              </div>
            </Reveal>

            {/* Colonna immagine */}
            <Reveal delay={100} className="flex-[2_1_260px] pt-8">
              <div style={{ position: 'relative', paddingBottom: '2.5rem', paddingRight: '2rem' }}>
                <div
                  className="shadow-xl shadow-slate-300/50 dark:shadow-none"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                  }}
                >
                  <Image
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Team Alètheia al lavoro"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Immagine secondaria sfalsata, sborda dall'angolo in basso a destra */}
                <div
                  className="shadow-xl shadow-slate-300/50 dark:shadow-none border-4 border-white dark:border-dark-card"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '55%',
                    aspectRatio: '4/3',
                    borderRadius: '1.1rem',
                    overflow: 'hidden',
                    zIndex: 2,
                  }}
                >
                  <Image
                    src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Colloquio di lavoro Alètheia"
                    fill
                    sizes="(min-width: 768px) 22vw, 55vw"
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── OFFERTE DI LAVORO ────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-dark-bg border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            {/* Left: header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <span style={{
                  display: 'inline-block', fontSize: '0.68rem', fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#008C95',
                }}>
                  Posizioni aperte
                </span>
                {!jobsLoading && jobs.length > 0 && (
                  <span
                    className="bg-[#008C95]/10 dark:bg-[#10B981]/10 text-[#006066] dark:text-[#10B981]"
                    style={{
                      fontSize: '0.68rem', fontWeight: 800,
                      padding: '0.15rem 0.55rem', borderRadius: '999px',
                    }}
                  >
                    {jobs.length}
                  </span>
                )}
              </div>
              <h2 className="text-slate-900 dark:text-white" style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900,
                marginBottom: '0.75rem', lineHeight: 1.2,
              }}>
                Offerte di lavoro
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '360px', marginBottom: '1.25rem' }}>
                Consulta le nostre offerte di lavoro attive e candidati direttamente online.
              </p>

              {!jobsLoading && jobLocations.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <button
                    onClick={() => setLocationFilter(null)}
                    className={locationFilter === null
                      ? 'bg-[#008C95] text-white'
                      : 'bg-white dark:bg-dark-card text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-[rgba(255,255,255,0.08)]'}
                    style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.9rem', borderRadius: '999px', cursor: 'pointer' }}
                  >
                    Tutte
                  </button>
                  {jobLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={locationFilter === loc
                        ? 'bg-[#008C95] text-white'
                        : 'bg-white dark:bg-dark-card text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-[rgba(255,255,255,0.08)]'}
                      style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.9rem', borderRadius: '999px', cursor: 'pointer' }}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
              <a
                href="https://aletheia4job.it/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  padding: '0.8rem 1.75rem', borderRadius: '999px',
                  background: 'linear-gradient(90deg, #008C95, #10B981)',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(0,140,149,0.35)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,140,149,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,140,149,0.35)';
                }}
              >
                Vedi tutte le offerte
              </a>
            </div>

            {/* Right: offerte live da aletheia4job.it */}
            {jobsLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Array.from({ length: 3 }).map((_, i) => <JobSkeleton key={i} />)}
              </div>
            ) : filteredJobs.length > 0 ? (
              <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <AnimatePresence mode="popLayout">
                  {filteredJobs.map((job, i) => (
                    <Reveal key={job.id} delay={i * 80}>
                    <motion.a
                      layout
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
                      exit={{ opacity: 0 }}
                      transition={{ layout: GRID_SPRING }}
                      style={{
                        borderRadius: '1rem',
                        padding: '1.25rem 1.5rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '1rem',
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                      whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(0,0,0,0.09)' }}
                    >
                      <div>
                        <p className="text-slate-900 dark:text-white" style={{ margin: '0 0 0.35rem', fontWeight: 800, fontSize: '0.95rem' }}>{job.title}</p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          {job.location && (
                            <span className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <i className="fas fa-map-marker-alt" style={{ color: '#008C95', fontSize: '0.65rem' }}></i>
                              {job.location}
                            </span>
                          )}
                          {job.contractType && (
                            <span className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <i className="fas fa-clock" style={{ color: '#008C95', fontSize: '0.65rem' }}></i>
                              {job.contractType}
                            </span>
                          )}
                        </div>
                      </div>
                      <i className="fas fa-arrow-right" style={{ color: '#008C95', fontSize: '0.85rem', flexShrink: 0 }}></i>
                    </motion.a>
                    </Reveal>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : jobs.length > 0 ? (
              <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.9rem' }}>
                Nessuna offerta trovata per questo filtro.
              </p>
            ) : (
              <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.9rem' }}>
                Nessuna offerta disponibile al momento. Consulta tutte le posizioni su{' '}
                <a
                  href="https://aletheia4job.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#008C95', fontWeight: 700, textDecoration: 'none' }}
                >
                  aletheia4job.it
                </a>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── NEWS APL ─────────────────────────────────────────── */}
      {aplNews.length > 0 && (
        <section className="bg-light dark:bg-dark-bg border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <h2 className="text-slate-900 dark:text-white" style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900,
                  margin: 0, lineHeight: 1.2,
                }}>
                  News dal mondo del lavoro
                </h2>
              </div>
              <Link
                href="/news"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontSize: '0.875rem', fontWeight: 700,
                  color: '#008C95', textDecoration: 'none',
                }}
              >
                Tutte le news
                <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}>
              {aplNews.slice(0, 3).map((news, i) => (
                <Reveal key={news.id} delay={i * 100} className="h-full">
                  <NewsCard news={news} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINALE ───────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
          padding: '5rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,140,149,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
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
              color: '#10B981',
              marginBottom: '1rem',
            }}
          >
            Inizia oggi
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
            Inizia oggi il tuo{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #008C95, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              percorso
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '480px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Che tu stia cercando lavoro o il candidato giusto per la tua azienda, siamo pronti ad aiutarti.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://aletheia4job.it/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.85rem 2.25rem',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #008C95, #10B981)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(0,140,149,0.4)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,140,149,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,140,149,0.4)';
              }}
            >
              Candidati ora
            </a>

            <a
              href="#contatti"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.85rem 2rem',
                borderRadius: '999px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.2)',
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
              Contatta un consulente
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  let jobs = [];

  try {
    const res = await fetch('https://aletheia4job.it/api/public/jobs?limit=3');
    if (res.ok) {
      const data = await res.json();
      jobs = data.jobs || [];
    }
  } catch (err) {
    // Fonte esterna non raggiungibile in fase di build: la sezione mostra il fallback statico
  }

  return {
    props: { jobs },
    revalidate: 300, // 5 minuti, coerente con la cache lato aletheia4job.it (s-maxage=300)
  };
}
