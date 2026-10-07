import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';
import CtaFinale from '../components/CtaFinale';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SeoHead from '../components/SeoHead';
import { formatDate } from '../lib/newsData';
import { getNewsList } from '../lib/wp-news';
import JobSkeleton from '../components/JobSkeleton';
import Reveal from '../components/Reveal';
import { withSiteOptions } from '../lib/wp-site';
import { getPagina } from '../lib/wp-pagine';
import { useSiteOptions } from '../context/SiteOptionsContext';

const GRID_SPRING = { type: 'spring', stiffness: 500, damping: 40 };

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
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            onError={() => setImgError(true)}
            style={{ objectFit: 'cover' }}
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

export default function AgenziaPerIlLavoro({ jobs = [], aplNews = [], pagina }) {
  const T = pagina.testi;
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const { seo } = useSiteOptions(); // immagine OG predefinita (opzioni globali)
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
    'Nuove offerte di lavoro pubblicate regolarmente',
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
          ogImage={seo.ogImage || undefined}
        />
      </Head>

      <Header active="/agenzia-per-il-lavoro" />

      <main>

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
        }
        /* Da md in su: altezza minima adattiva (era calc(100vh - 80px)) che lascia visibile la striscia
           credenziali sotto i pannelli. Su mobile i pannelli sono impilati e l'altezza la decide il contenuto.
           769px e non 768px: a 768px scatta già il layout in colonna (media query sotto). */
        @media (min-width: 769px) {
          .hero-wrap {
            min-height: clamp(460px, 70vh, 640px);
          }
          /* svh: ignora la barra indirizzi dinamica dei browser; dove supportato sostituisce vh */
          @supports (height: 1svh) {
            .hero-wrap { min-height: clamp(460px, 70svh, 640px); }
          }
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
          padding: 3.5rem 4rem;
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
          /* Titolo, punti elenco e bottone sullo stesso bordo sinistro: con center il titolo (più stretto) si
             centrava sopra il blocco dei punti, che sono allineati a sinistra. Il blocco resta centrato nel pannello. */
          align-items: flex-start;
          text-align: left;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .hero-wrap { flex-direction: column; }
          .hero-panel { padding: 2.5rem 2rem; flex: none !important; }
        }

        /* Striscia credenziali sotto lo split: una sola riga (~48px) con il dato ufficiale
           (le 4 voci originali). Sostituisce la barra a 4 blocchi alta ~155px. */
        .trust-strip {
          background: linear-gradient(135deg, #0F172A 0%, #134E4A 100%);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .trust-strip-inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem 1.5rem;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .trust-strip-item {
          display: flex;
          align-items: center;
          min-width: 0;
          padding: 0 1.5rem;
          border-left: 1px solid rgba(255,255,255,0.12); /* separatore verticale tra le voci */
        }
        .trust-strip-item:first-child {
          border-left: none;
          padding-left: 0;
        }
        .trust-strip-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 0;
        }
        .trust-strip-text strong {
          color: #fff; /* WCAG AA su #0F172A: 17:1 */
          font-size: 0.85rem;
          font-weight: 800;
          line-height: 1.25;
        }
        .trust-strip-sub {
          color: #94A3B8; /* WCAG AA su #0F172A: 6,9:1 */
          font-size: 0.72rem;
        }
        @media (max-width: 900px) {
          .trust-strip-inner { grid-template-columns: repeat(2, 1fr); }
          .trust-strip-item { border-left: none; padding: 0 1rem; }
          .trust-strip-item:first-child { padding-left: 1rem; }
        }
        @media (max-width: 520px) {
          .trust-strip-inner { grid-template-columns: 1fr; padding: 1rem 1.25rem; }
          .trust-strip-item, .trust-strip-item:first-child { padding: 0; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ background: '#0F172A', paddingTop: '80px' }}>
        {/* H1 semantico ma visivamente nascosto: i due pannelli (H2 "Cerchi lavoro?" / "Cerchi
            personale?") non lasciano spazio a un titolo unico senza alterare il design. */}
        <h1 className="sr-only">Agenzia per il Lavoro Alètheia: servizi per candidati e per imprese</h1>
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
              src={T.s1_img_1.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="50vw"
            />
            <div
              className="panel-overlay"
              style={{
                background:
                  'linear-gradient(180deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.64) 100%)',
              }}
            />

            <div className="panel-content">
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
                    <i className="fas fa-check-circle" style={{ color: '#018891', fontSize: '0.75rem' }}></i>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="/agenzia-per-il-lavoro/servizi-alla-persona" className="btn btn-md btn-ghost-light">
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
              src={T.s1_img_2.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="50vw"
            />
            <div
              className="panel-overlay"
              style={{
                background:
                  'linear-gradient(180deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.64) 100%)',
              }}
            />

            <div className="panel-content">
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
                    <i className="fas fa-check-circle" style={{ color: '#018891', fontSize: '0.75rem' }}></i>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="/agenzia-per-il-lavoro/servizi-alle-imprese" className="btn btn-md btn-ghost-light">
                <i className="fas fa-building" style={{ fontSize: '0.75rem' }}></i>
                Servizi alle Imprese
              </a>
            </div>
          </div>
        </div>

        {/* Striscia credenziali: le 4 voci originali, su una riga sola (~50px invece di ~155px) */}
        <div className="trust-strip">
          <div className="trust-strip-inner">
            {[
              { label: 'Autorizzata dal Ministero del Lavoro', sub: 'D.D.S. n. 1100/2019' },
              { label: 'Radicata in Sicilia', sub: 'Dal 2005' },
              { label: 'Migliaia di candidati', sub: 'Inseriti con successo' },
              { label: 'Contratti garantiti', sub: 'Conformità normativa' },
            ].map((item, i) => (
              <span key={i} className="trust-strip-item">
                <span className="trust-strip-text">
                  <strong>{item.label}</strong>
                  <span className="trust-strip-sub">{item.sub}</span>
                </span>
              </span>
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
                color: 'var(--primary-text)', marginBottom: '0.6rem',
              }}>
                Chi siamo
              </span>
              <h2 className="text-slate-900 dark:text-white" style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900,
                marginBottom: '1rem', lineHeight: 1.25,
              }}>
                Alètheia APL - Non solo un&apos;agenzia. Un{' '}
                {/* Colore solo sulla parola chiave; token con variante dark (#008C95 faceva 2,37:1 su dark-card) */}
                <span className="text-primary-text dark:text-primary-on-dark">ecosistema per il lavoro</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p className="text-slate-900 dark:text-gray-100" style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.65, margin: 0 }}>
                  Alètheia S.r.l. offre un servizio attento e preciso: ricerca e seleziona personale qualificato
                  per l'inserimento in azienda e aiuta le persone nella ricerca del lavoro. Compito dell'agenzia
                  per il lavoro è agevolare l'incontro tra persone in cerca di lavoro e imprese in cerca di lavoratori.
                </p>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.9, margin: 0 }}>
                  In un mercato sempre più veloce e competitivo, Alètheia S.r.l., Agenzia per il Lavoro è in grado
                  di offrire una consulenza integrata nel campo delle Risorse Umane e di anticipare le esigenze
                  organizzative, formare e riqualificare le competenze necessarie per determinati ruoli e posizioni,
                  sviluppare un accurato processo di ricerca e selezione del personale e contribuire all'incontro
                  tra domanda e offerta di lavoro.
                </p>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.9, margin: 0 }}>
                  Attraverso Alètheia S.r.l., ente accreditato quale Agenzia per il Lavoro,{' '}
                  <strong className="text-slate-900 dark:text-white">PromoterGroup S.p.A.</strong> amplia il proprio
                  ruolo di leva del sistema economico e sociale, mettendo la professionalità dei propri consulenti
                  al servizio di candidati e aziende.
                </p>
              </div>
            </Reveal>

            {/* Colonna immagine: una sola foto, più grande, niente doppia foto sfalsata
               (due stock generiche appesantivano la sezione senza aggiungere valore). */}
            <Reveal delay={100} className="flex-[2_1_260px] pt-8">
              <div
                className="shadow-xl shadow-slate-300/50 dark:shadow-none"
                style={{
                  position: 'relative',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                }}
              >
                <Image
                  src={T.s2_immagine.src}
                  alt={T.s2_immagine.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
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
                  color: 'var(--primary-text)',
                }}>
                  Posizioni aperte
                </span>
                {!jobsLoading && jobs.length > 0 && (
                  <span
                    className="bg-[#018891]/10 dark:bg-[#018891]/10 text-[#006066] dark:text-primary-on-dark"
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
                  background: '#008C95',
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
      <CtaFinale
        eyebrow="Inizia oggi"
        title={
          <>
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
          </>
        }
        text="Che tu stia cercando lavoro o il candidato giusto per la tua azienda, siamo pronti ad aiutarti."
        primary={{ label: 'Candidati ora', href: 'https://aletheia4job.it/', external: true }}
        secondary={{ label: 'Contatta un consulente', href: '#contatti' }}
      />

      {/* ── FOOTER ───────────────────────────────────────────── */}
      </main>
      <Footer />
    </>
  );
}

async function getPageStaticProps() {
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

  // Solo le news rilevanti per l'Agenzia per il Lavoro (tag 'apl'): WordPress se attivo, altrimenti dati locali.
  const aplNews = (await getNewsList()).filter((n) => n.tags?.includes('apl')).slice(0, 3);

  // Immagini della pagina (sfondi dello split, foto di "Chi siamo"): WordPress se attivo, altrimenti data/pagine.js.
  const pagina = await getPagina('agenzia-per-il-lavoro');

  return {
    props: { jobs, aplNews, pagina },
    revalidate: 300, // 5 minuti, coerente con la cache lato aletheia4job.it (s-maxage=300)
  };
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
