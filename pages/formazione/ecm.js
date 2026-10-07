import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import { getFaqs } from '../../lib/wp-faq';
import { isrOptions } from '../../lib/wp';
import { getSchede } from '../../lib/wp-schede';
import { getPagina } from '../../lib/wp-pagine';
import HeroTitle from '../../components/HeroTitle';
import { withSiteOptions } from '../../lib/wp-site';

// FAQ: WordPress (CPT faq) se WP_URL è impostato, altrimenti data/faq.js (vedi lib/wp-faq.ts).
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('formazione/ecm'), faqs: await getFaqs('ecm'), modalita: await getSchede('ecm-modalita') }, ...isrOptions() };
}

export default function FormazioneECM({ faqs, modalita, pagina }) {
  const T = pagina.testi;
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeModalita, setActiveModalita] = useState(0);
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Corsi ECM per Professionisti Sanitari - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Corsi ECM accreditati per medici, infermieri, fisioterapisti e OSS. Alètheia, provider ECM accreditato dalla Regione Siciliana."}
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" solid />

      <main>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        

        /* Proposta formativa: tab selezionabili in riga, un solo blocco di testo
           visibile alla volta — non card ripetute (pattern già usato ovunque nel sito). */
        .modalita-tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid #E2E8F0; margin-bottom: 1.75rem; }
        :global(.dark) .modalita-tabs { border-color: rgba(255,255,255,0.1); }
        .modalita-tab {
          background: none; border: none; cursor: pointer; font-family: inherit;
          font-weight: 700; font-size: 0.95rem; padding: 0.85rem 0.25rem; margin-right: 1.75rem;
          color: var(--muted-text); border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        :global(.dark) .modalita-tab { color: rgba(255,255,255,0.4); }
        .modalita-tab.active { color: #008C95; border-color: #008C95; }
        :global(.dark) .modalita-tab.active { color: #018891; border-color: #018891; }

        .faq-grid-ecm { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem 1.5rem; align-items: start; }
        @media (max-width: 800px) { .faq-grid-ecm { grid-template-columns: 1fr; } }

        .ecm-contact-card-info { padding: 2.5rem; }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="page-hero page-hero--dark page-hero--left">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <div className="page-hero-badge fade-up">{T.hero_eyebrow}</div>

            <h1 className="fade-up fade-up-1">
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{w}</span>} />
            </h1>

            <div className="page-hero-actions fade-up fade-up-3">
              <a href={T.hero_cta1.href} className="btn btn-lg btn-ghost-light">{T.hero_cta1.label}</a>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ IL VALORE DEL PROVIDER ACCREDITATO ══════════════ */}
      <section id="corsi" className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge">{T.intro_badge}</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25, maxWidth: '960px' }}>{T.intro_titolo}</h2>
          <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, maxWidth: '960px', margin: '0 0 1.5rem' }}>{T.intro_testo[0]}</p>
          <p className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.7, maxWidth: '960px', margin: 0, borderLeft: '3px solid #008C95', paddingLeft: '1.25rem' }}>{T.intro_testo[1]}</p>
        </div>
      </section>

      {/* ══════════════ TARGET & PROPOSTA FORMATIVA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge">{T.s1_badge}</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>{T.s1_titolo}</h2>
          <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '760px', marginBottom: '2rem' }}>{T.s1_testo[0]}</p>

          <div className="modalita-tabs">
            {modalita.map((m, i) => (
              <button
                key={m.title}
                type="button"
                onClick={() => setActiveModalita(i)}
                className={`modalita-tab ${activeModalita === i ? 'active' : ''}`}
              >
                {m.title}
              </button>
            ))}
          </div>

          <p className="text-slate-700 dark:text-gray-300" style={{ fontSize: '1rem', lineHeight: 1.85, maxWidth: '760px', margin: 0 }}>
            {modalita[activeModalita].text}
          </p>

          <p className="text-slate-700 dark:text-gray-300" style={{ margin: '3rem 0 0', fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8, borderLeft: '3px solid #008C95', paddingLeft: '1.25rem', maxWidth: '860px' }}>
            Grazie all&apos;esperienza e alla rete di docenti qualificati di Promotergroup, Alètheia affianca aziende sanitarie e singoli professionisti nella pianificazione del proprio percorso di aggiornamento.
          </p>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge">{T.s2_badge}</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.25 }}>{T.s2_titolo}</h2>

          <div className="faq-grid-ecm">
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
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: isDark ? '#5FC2C8' : '#008C95', flexShrink: 0 }}></i>
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

      {/* ══════════════ CONTATTI & FORM ══════════════ */}
      <section id="contatti-ecm" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div
            className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
            style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)' }}
          >
            <div>
              <div className="ecm-contact-card-info">
                <span className="section-badge">Parliamone</span>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  Vuoi saperne di più sui corsi ECM?
                </h3>
                <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>
                  Il nostro team è a disposizione per fornirti tutte le informazioni sui corsi ECM disponibili e sui crediti formativi acquisibili.
                </p>

                <a href="tel:+390932862613" className="text-slate-900 dark:text-white" style={{ display: 'block', fontSize: '1.25rem', fontWeight: 800, textDecoration: 'none', marginBottom: '0.5rem' }}>
                  +39 0932 862613
                </a>
                <a href="mailto:info@aletheiasrl.it" className="text-[#018891] dark:text-primary-on-dark" style={{ display: 'block', fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
                  info@aletheiasrl.it
                </a>

                <a href="/contatti" className="btn btn-lg btn-primary" style={{ marginTop: '1.75rem' }}>Contattaci</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
