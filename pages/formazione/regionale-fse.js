import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import Reveal from '../../components/Reveal';
import { getSchede } from '../../lib/wp-schede';
import { isrOptions } from '../../lib/wp';
import { getPagina } from '../../lib/wp-pagine';
import HeroTitle from '../../components/HeroTitle';
import { withSiteOptions } from '../../lib/wp-site';

function PercorsoCard({ badge, icon, title, bullets, cta, href, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        minHeight: '420px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.22)' : '0 4px 18px rgba(0,0,0,0.1)',
      }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s ease',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(4,15,20,0.92) 10%, rgba(4,15,20,0.6) 55%, rgba(4,15,20,0.12) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, justifyContent: 'flex-end' }}>
        <span className="badge-overlay">
          <span className="badge-overlay-dot" aria-hidden="true" />
          {badge}
        </span>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, lineHeight: 1.3, color: '#fff' }}>{title}</h3>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.83rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
              <i className="fas fa-check" style={{ color: '#6EE7B7', fontSize: '0.7rem', marginTop: '0.3rem', flexShrink: 0 }}></i>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
          {cta}
        </span>
      </div>
    </a>
  );
}

// Liste di card: WordPress (CPT scheda) se WP_URL è impostato, altrimenti data/schede.js (vedi lib/wp-schede.ts).
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('formazione/regionale-fse'), percorsi: await getSchede('percorsi-fse') }, ...isrOptions() };
}

export default function FormazioneFinanziataSicilia({ percorsi, pagina }) {
  const T = pagina.testi;
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Formazione Finanziata in Sicilia - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Corsi gratuiti in Sicilia finanziati da Regione Siciliana, Fondi Interprofessionali e Fondo Nuove Competenze. Alètheia: ente di formazione accreditato."}
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" solid />

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

        .percorsi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .percorsi-grid { grid-template-columns: 1fr; }
        }

        .calendario-orientamento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .calendario-orientamento-grid { grid-template-columns: 1fr; }
        }

      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="page-hero page-hero--dark page-hero--left">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-hero-badge fade-up">{T.hero_eyebrow}</div>

          <h1 className="fade-up fade-up-1" style={{ maxWidth: '760px' }}>
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{w}</span>} />
            </h1>

          <div className="page-hero-actions fade-up fade-up-3">
            <a href={T.hero_cta1.href} className="btn btn-lg btn-light">{T.hero_cta1.label}</a>
            <a href={T.hero_cta2.href} className="btn btn-lg btn-ghost-light">{T.hero_cta2.label}</a>
          </div>
        </div>
      </section>

      {/* ══════════════ OFFERTA FORMATIVA (3 MACRO-PERCORSI) ══════════════ */}
      <section id="offerta" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">{T.intro_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>{T.intro_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>{T.intro_testo[0]}</p>
          </div>

          <div className="percorsi-grid">
            {percorsi.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 90}>
                <PercorsoCard {...p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CALENDARIO & ORIENTAMENTO ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="calendario-orientamento-grid">
            <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1.25rem', padding: '2rem' }}>
              <span className="section-badge">Calendario corsi</span>
              <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.3 }}>
                I prossimi corsi in partenza
              </h3>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                Controlla le prossime aperture e prenota il tuo posto.
              </p>
              <a href="/calendario-corsi" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#008C95', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Scopri di più <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </a>
            </div>

            <div style={{
              borderRadius: '1.25rem',
              padding: '2rem',
              background: isDark ? '#1f2937' : 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderLeft: isDark ? '3px solid #018891' : 'none',
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.3, color: '#fff' }}>
                Non sai quale percorso scegliere?
              </h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.75, margin: '0 0 1.5rem', color: 'rgba(255,255,255,0.7)' }}>
                Il team di Alètheia analizza gratuitamente il tuo profilo o quello della tua azienda, verifica i bandi e i corsi disponibili e ti guida verso la soluzione più adatta ai tuoi obiettivi formativi. Un orientamento gratuito e senza impegno.
              </p>
              <a href="/contatti" className="btn btn-lg btn-light">Contattaci</a>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
