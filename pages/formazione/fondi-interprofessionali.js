import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormAzienda from '../../components/FormAzienda';
import { getFaqs } from '../../lib/wp-faq';
import { isrOptions } from '../../lib/wp';
import { getSchede } from '../../lib/wp-schede';
import { getPagina } from '../../lib/wp-pagine';
import HeroTitle from '../../components/HeroTitle';
import { withSiteOptions } from '../../lib/wp-site';

const partner = ['Fondimpresa', 'Fon.Ter', 'For.Agri', 'Fon.Ar.Com.', 'Fondoforte', 'Fondartigianato', 'Fondoconoscenze', 'Formazienda', 'For.Te.'];

// FAQ: WordPress (CPT faq) se WP_URL è impostato, altrimenti data/faq.js (vedi lib/wp-faq.ts).
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('formazione/fondi-interprofessionali'), faqs: await getFaqs('fondi-interprofessionali'), vantaggi: await getSchede('fondi-vantaggi') }, ...isrOptions() };
}

export default function FondiInterprofessionali({ faqs, vantaggi, pagina }) {
  const T = pagina.testi;
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Fondi Interprofessionali per Aziende - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Trasforma i contributi INPS che la tua azienda versa già in formazione gratuita per i dipendenti attraverso i Fondi Paritetici Interprofessionali. Alètheia gestisce tutto il processo."}
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


        /* FAQ a 2 colonne */
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-flow: column;
          grid-template-rows: repeat(2, auto);
          gap: 0.85rem 1.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr; grid-auto-flow: row; grid-template-rows: none; }
        }

        /* Loghi partner scorrevoli */
        .partner-row {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 640px) { .partner-row { grid-template-columns: repeat(3, 1fr); } }
        /* 5 colonne desktop: 9 fondi su due file (5 + 4) */
        @media (min-width: 1024px) { .partner-row { grid-template-columns: repeat(5, 1fr); } }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="page-hero page-hero--dark page-hero--left">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
            <span aria-hidden="true">›</span>
            <a href="/formazione/regionale-fse" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Formazione Finanziata</a>
            <span aria-hidden="true">›</span>
            <span style={{ color: '#6EE7B7' }}>Fondi Interprofessionali</span>
          </nav>

          <div className="page-hero-badge fade-up">{T.hero_eyebrow}</div>

          <h1 className="fade-up fade-up-1" style={{ maxWidth: '820px' }}>
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{w}</span>} />
            </h1>

          <div className="page-hero-actions fade-up fade-up-3">
            <a href={T.hero_cta1.href} className="btn btn-lg btn-light">{T.hero_cta1.label}</a>
          </div>
        </div>
      </section>

      {/* ══════════════ PROCESSO & VANTAGGI AZIENDALI ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          {/* Blocco attivazione */}
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="section-badge">{T.intro_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>{T.intro_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>{T.intro_testo[0]}</p>
          </div>

          {/* Blocco vantaggi */}
          <div>
            <span className="section-badge">{T.s1_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>{T.s1_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>{T.s1_testo[0]}</p>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem 2rem' }}>
              {vantaggi.map((v) => (
                <li key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <i className="fas fa-check text-primary dark:text-primary-on-dark" style={{ fontSize: '0.8rem', marginTop: '0.3rem', flexShrink: 0 }}></i>
                  <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════ IL VALORE DI ALÈTHEIA & PARTNER ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div>
            <span className="section-badge">{T.s2_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>{T.s2_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>{T.s2_testo[0]}</p>
          </div>

          {/* Loghi partner */}
          <div style={{ marginTop: '3rem' }}>
            <span className="section-badge">I nostri Fondi partner</span>
            <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.5rem', lineHeight: 1.3 }}>
              I fondi con cui operiamo
            </h3>

            <div className="partner-row">
              {partner.map((p) => (
                <div
                  key={p}
                  className="bg-white dark:bg-dark-card border-slate-200 dark:border-[rgba(255,255,255,0.1)] text-slate-600 dark:text-gray-500"
                  style={{
                                        height: '120px',
                    border: '1px dashed',
                    borderRadius: '1rem',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                  aria-label={`Logo ${p} (placeholder)`}
                >
                  <i className="far fa-image" style={{ fontSize: '1.5rem' }} aria-hidden="true"></i>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.25 }}>
              Domande frequenti
            </h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              FAQ sui Fondi Interprofessionali per le aziende
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={item.domanda} className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="text-slate-900 dark:text-white"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    <span>{item.domanda}</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#008C95', flexShrink: 0 }}></i>
                  </button>
                  {isOpen && (
                    <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.4rem 1.4rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
                      {item.risposta}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FormAzienda
        title="Non sai da dove iniziare?"
        subtitle="Non tutti i fondi sono uguali e non tutti i percorsi fanno per te. Compila il form il nostro team ti contatterà il prima possibile per una consulenza gratuita."
      />

      </main>
      <Footer />
    </>
  );
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
