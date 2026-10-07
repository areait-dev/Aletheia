import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormAzienda from '../../components/FormAzienda';
import { useTheme } from '../../context/ThemeContext';
import { getFaqs } from '../../lib/wp-faq';
import { isrOptions } from '../../lib/wp';
import { getSchede } from '../../lib/wp-schede';
import { getPagina } from '../../lib/wp-pagine';
import HeroTitle from '../../components/HeroTitle';
import { ICONE_SVG } from '../../data/icone-svg';
import { withSiteOptions } from '../../lib/wp-site';

// Vantaggi e servizi: schede di WordPress (liste `fnc-vantaggi`, `fnc-servizi`) o data/schede.js; icone SVG per nome (data/icone-svg.js).

// FAQ: WordPress (CPT faq) se WP_URL è impostato, altrimenti data/faq.js (vedi lib/wp-faq.ts).
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('formazione/fondo-nuove-competenze'), faqs: await getFaqs('fondo-nuove-competenze'), target: await getSchede('fnc-target'), vantaggi: await getSchede('fnc-vantaggi'), servizi: await getSchede('fnc-servizi') }, ...isrOptions() };
}

export default function FondoNuoveCompetenze({ faqs, target, vantaggi, servizi, pagina }) {
  const T = pagina.testi;
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Fondo Nuove Competenze - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Il Fondo Nuove Competenze permette alle imprese di destinare parte dell'orario di lavoro alla formazione, ottenendo il rimborso del costo delle ore. Alètheia ti accompagna in ogni fase."}
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


        /* Griglia target (transizione digitale / ecologica / organizzativa) */
        .target-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) {
          .target-grid { grid-template-columns: 1fr; }
        }

        /* Vantaggi: layout minimale a 4 colonne, senza card/bordi/ombre */
        .vantaggi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          margin-top: 3rem;
          position: relative;
        }
        /* Linea sottile che collega le icone, come un "percorso" */
        .vantaggi-row::before {
          content: '';
          position: absolute;
          top: 1.375rem;
          left: calc(12.5% + 1.375rem);
          right: calc(12.5% + 1.375rem);
          height: 1px;
          background: #e2e8f0;
          z-index: 0;
        }
        .vantaggio-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.85rem;
          position: relative;
          z-index: 1;
        }
        .vantaggio-icon {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 140, 149, 0.1);
          color: #008C95;
          flex-shrink: 0;
        }
        .vantaggio-icon svg {
          width: 1.4rem;
          height: 1.4rem;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .vantaggio-item h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }
        .vantaggio-item p {
          font-size: 0.9rem;
          font-weight: 400;
          color: #64748b;
          margin: 0;
          line-height: 1.75;
        }
        :global(.dark) .vantaggi-row::before {
          background: rgba(255, 255, 255, 0.08);
        }
        :global(.dark) .vantaggio-item h3 {
          color: #F8FAFC;
        }
        :global(.dark) .vantaggio-item p {
          color: #CBD5E1;
        }
        @media (max-width: 900px) {
          .vantaggi-row { grid-template-columns: 1fr; gap: 2rem; }
          .vantaggi-row::before { display: none; }
        }

        /* Bento grid servizi */
        .bento-servizi {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 1fr;
          align-items: stretch;
          gap: 1.25rem;
          margin-top: 1.75rem;
        }
        .bento-card {
          --card-border: #e2e8f0;
          background: #ffffff;
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.03);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: flex-start;
          height: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          grid-column: span 1;
        }
        .bento-card:hover {
          transform: translateY(-4px);
          border-color: #018891;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
        }
        .bento-card.featured {
          grid-column: span 2;
          background: linear-gradient(135deg, #f0fdfa 0%, #ffffff 60%);
        }
        /* "Coordinamento" (6° card nel DOM) chiude la griglia a piena larghezza */
        .bento-card:nth-child(6) {
          order: 7;
          grid-column: span 4;
        }
        /* "Monitoraggio" (7° card, featured) si sposta prima, a chiudere la 2° riga */
        .bento-card:nth-child(7) {
          order: 6;
        }
        .bento-card .bento-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(1,136,145, 0.1);
          color: #018891;
          flex-shrink: 0;
        }
        .bento-card .bento-icon svg {
          width: 1.25rem;
          height: 1.25rem;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .bento-card p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.65;
          color: #475569;
        }
        .bento-card p b {
          color: #0f172a;
          font-weight: 800;
        }
        :global(.dark) .bento-card {
          --card-border: rgba(255,255,255,0.08);
          background: #1f2937;
        }
        :global(.dark) .bento-card.featured {
          background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, #1f2937 60%);
        }
        :global(.dark) .bento-card p {
          color: #CBD5E1;
        }
        :global(.dark) .bento-card p b {
          color: #F8FAFC;
        }
        @media (max-width: 900px) {
          .bento-servizi { grid-template-columns: repeat(2, 1fr); }
          .bento-card.featured,
          .bento-card:nth-child(6) { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .bento-servizi { grid-template-columns: 1fr; }
          .bento-card.featured,
          .bento-card:nth-child(6) { grid-column: span 1; order: initial; }
        }

        /* FAQ a 2 colonne indipendenti: ogni colonna impila le proprie card
           senza sincronizzare l'altezza di riga, così aprire una domanda
           non "spinge" o lascia buchi accanto alle altre */
        .faq-grid {
          column-count: 2;
          column-gap: 1.5rem;
        }
        .faq-item {
          break-inside: avoid;
          margin-bottom: 0.85rem;
        }
        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }
        .faq-answer-wrap.open {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          overflow: hidden;
          min-height: 0;
        }
        .faq-chevron {
          transition: transform 0.25s ease;
        }
        .faq-chevron.open {
          transform: rotate(180deg);
        }
        @media (max-width: 768px) {
          .faq-grid { column-count: 1; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="page-hero page-hero--dark page-hero--left">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
            <span aria-hidden="true">›</span>
            <a href="/formazione/regionale-fse" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Formazione Finanziata</a>
            <span aria-hidden="true">›</span>
            <span style={{ color: '#6EE7B7' }}>Fondo Nuove Competenze</span>
          </nav>

          <span className="fade-up" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#10B981', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
            Fondo Nuove Competenze
          </span>

          <div className="page-hero-badge fade-up fade-up-1">{T.hero_eyebrow}</div>

          <h1 className="fade-up fade-up-1">
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{w}</span>} />
            </h1>

          <div className="page-hero-actions fade-up fade-up-3">
            <a href={T.hero_cta1.href} className="btn btn-lg btn-light">{T.hero_cta1.label}<i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ A CHI SI RIVOLGE ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div>
            <span className="section-badge">{T.intro_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>{T.intro_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.85 }}>{T.intro_testo[0]}</p>
          </div>

          <div className="target-grid">
            {target.map((t) => (
              <div
                key={t.title}
                className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
                style={{ borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={t.icon} style={{ fontSize: '1.2rem', color: '#008C95' }}></i>
                </div>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{t.title}</h3>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{t.text}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, marginTop: '2rem', fontWeight: 600 }}>
            Se la tua impresa sta evolvendo, il Fondo Nuove Competenze può diventare uno strumento concreto per accompagnare il cambiamento.
          </p>
        </div>
      </section>

      {/* ══════════════ VANTAGGI (layout minimale, no card) ══════════════ */}
      <section className="dark:bg-dark-bg" style={{ padding: '5rem 0', background: isDark ? undefined : '#f4f6f9' }}>
        <div className="container">
          <div>
            <span className="section-badge">{T.s1_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>{T.s1_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.85 }}>{T.s1_testo[0]}</p>
          </div>

          <div className="vantaggi-row">
            {vantaggi.map((v) => (
              <div key={v.title} className="vantaggio-item">
                <span className="vantaggio-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{ICONE_SVG[v.icon] && <path d={ICONE_SVG[v.icon]} />}</svg>
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ VALORE ALÈTHEIA ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div>
            <span className="section-badge">{T.s2_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>{T.s2_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>{T.s2_testo[0]}</p>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <span className="page-hero-badge" style={{ color: '#04767D', background: 'rgba(1,136,145,0.1)', border: '1px solid rgba(1,136,145,0.25)' }}>Servizi</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', fontWeight: 900, margin: 0 }}>
              Ci occupiamo di
            </h2>

            <div className="bento-servizi">
              {servizi.map((s) => (
                <div key={s.bold} className={`bento-card${s.featured ? ' featured' : ''}`}>
                  <span className="bento-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">{ICONE_SVG[s.icon] && <path d={ICONE_SVG[s.icon]} />}</svg>
                  </span>
                  <p><b>{s.bold}</b>{s.rest}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge">{T.s3_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>{T.s3_titolo}</h2>
          </div>

          <div className="faq-grid">
            {faqs.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={item.domanda} className="faq-item bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="text-slate-900 dark:text-white"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    <span>{item.domanda}</span>
                    <i className={`fas fa-chevron-down faq-chevron${isOpen ? ' open' : ''}`} style={{ color: '#008C95', flexShrink: 0 }}></i>
                  </button>
                  <div className={`faq-answer-wrap${isOpen ? ' open' : ''}`}>
                    <div className="faq-answer-inner">
                      <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.4rem 1.4rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
                        {item.risposta}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FormAzienda
        title={<>Tu definisci gli obiettivi della tua impresa.<br />Noi trasformiamo il progetto in un&apos;opportunità di finanziamento.</>}
        subtitle="Compila il form e raccontaci il tuo progetto. Il nostro Team analizzerà gratuitamente la situazione della tua impresa."
      />

      </main>
      <Footer />
    </>
  );
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
