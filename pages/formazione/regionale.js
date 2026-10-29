import Head from 'next/head';
import Image from 'next/image';
import { useState, Fragment } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CtaFinale from '../../components/CtaFinale';
import Reveal from '../../components/Reveal';
import { getFaqs } from '../../lib/wp-faq';
import { getSchede } from '../../lib/wp-schede';
import { isrOptions } from '../../lib/wp';
import { getPagina } from '../../lib/wp-pagine';
import HeroTitle from '../../components/HeroTitle';
import { withSiteOptions } from '../../lib/wp-site';

function AvvisoCard({ badge, logo, title, text, durata, modalita, href, external, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  const clickable = Boolean(href);
  const Tag = clickable ? 'a' : 'div';
  return (
    <Tag
      href={clickable ? href : undefined}
      target={clickable && external ? '_blank' : undefined}
      rel={clickable && external ? 'noopener noreferrer' : undefined}
      onMouseEnter={clickable ? () => setHovered(true) : undefined}
      onMouseLeave={clickable ? () => setHovered(false) : undefined}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: clickable ? 'pointer' : 'default',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
        opacity: clickable ? 1 : 0.85,
      }}
    >
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }} />
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
        <span style={{ fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary-text)', background: 'rgba(1,136,145,0.1)', padding: '0.25rem 0.65rem', borderRadius: '999px', width: 'fit-content' }}>
          {badge}
        </span>

        <div style={{ borderRadius: '0.6rem', overflow: 'hidden', height: '140px', position: 'relative' }}>
          <Image src={image} alt={imageAlt || title} fill sizes="(max-width: 768px) 100vw, 340px" style={{ objectFit: 'cover' }} />
        </div>

        <span className="text-slate-600 dark:text-gray-500" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
          {logo}
        </span>

        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1rem', fontWeight: 800, margin: 0, lineHeight: 1.35 }}>{title}</h3>
        <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.85rem', lineHeight: 1.7, margin: 0, flex: 1 }}>{text}</p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {durata && (
            <span className="text-slate-600 dark:text-gray-300" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
              <i className="fas fa-clock" style={{ color: '#008C95', fontSize: '0.7rem' }}></i>
              {durata}
            </span>
          )}
          <span className="text-slate-600 dark:text-gray-300" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
            <i className="fas fa-laptop" style={{ color: '#008C95', fontSize: '0.7rem' }}></i>
            {modalita}
          </span>
        </div>

        <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid' }}>
          {clickable ? (
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: hovered ? 1 : 0.6, transition: 'opacity 0.2s' }}>
              Scopri {durata ? 'il corso' : 'i corsi'}
            </span>
          ) : (
            <span className="text-slate-600 dark:text-gray-500" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
              Prossimamente
            </span>
          )}
        </div>
      </div>
    </Tag>
  );
}

// FAQ: WordPress (CPT faq) se WP_URL è impostato, altrimenti data/faq.js (vedi lib/wp-faq.ts).
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('formazione/regionale'), faqs: await getFaqs('regionale'), avvisi: await getSchede('avvisi-regionali'), requisiti: await getSchede('req-regionale'), puntiDiForza: await getSchede('punti-regionale') }, ...isrOptions() };
}

export default function FormazioneRegionale({ faqs, avvisi, requisiti, puntiDiForza, pagina }) {
  const T = pagina.testi;
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Formazione Regionale - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Percorsi di formazione regionale finanziati dalla Regione Siciliana: FSE+, POC Sicilia, Garanzia Giovani e Programma G.O.L. Spesso gratuiti per i partecipanti."}
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

        .avvisi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1100px) {
          .avvisi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .avvisi-grid { grid-template-columns: 1fr; }
        }

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


      `}</style>

      {/* ── HERO ── */}
      <section className="page-hero page-hero--dark">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav aria-label="Breadcrumb" className="text-left justify-start" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
            <span aria-hidden="true">›</span>
            <a href="/formazione/regionale-fse" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Formazione Finanziata</a>
            <span aria-hidden="true">›</span>
            <span style={{ color: '#6EE7B7' }}>Formazione Regionale</span>
          </nav>

          {/* Contenuto principale centrato, sotto la breadcrumb allineata a sinistra */}
          <div className="text-center flex flex-col items-center justify-center w-full">
            <div className="page-hero-badge fade-up self-start">{T.hero_eyebrow}</div>

            <h1 className="fade-up fade-up-1 text-center justify-center mx-auto" style={{ maxWidth: '780px' }}>
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', }}>{w}</span>} />
            </h1>

            {/* TRUST BAR CON EFFETTO GLASSMORPHISM, CENTRATA, CON DIVISORI VERTICALI */}
            <div className="inline-flex flex-wrap md:flex-nowrap items-center justify-center gap-x-6 gap-y-3 mt-0 mb-5 p-3 px-6 text-center bg-white/5 border border-white/10 rounded-xl backdrop-blur-md mx-auto">
              {puntiDiForza.map((p, i) => (
                <Fragment key={p.text}>
                  <span className="text-white text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                    {p.text}
                  </span>
                  {i < puntiDiForza.length - 1 && (
                    <div className="hidden md:block text-white/20 font-light select-none text-xs" aria-hidden="true">
                      |
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            <div className="fade-up fade-up-3 justify-center mx-auto" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={T.hero_cta1.href} className="btn btn-lg btn-light">{T.hero_cta1.label}</a>
              <a href={T.hero_cta2.href} className="btn btn-lg btn-ghost-light">{T.hero_cta2.label}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ AVVISI DELLA REGIONE SICILIANA ══════════════ */}
      <section id="avvisi" className="bg-white dark:bg-dark-card" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="text-slate-900 dark:text-white md:whitespace-nowrap" style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Scegli il programma di finanziamento più adatto a te
            </h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Ogni avviso pubblico finanzia specifici percorsi di formazione destinati a categorie differenti di partecipanti. Seleziona il programma che ti interessa e consulta corsi disponibili, requisiti di accesso e modalità di iscrizione.
            </p>
          </div>

          <div className="avvisi-grid">
            {avvisi.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 90} className="h-full">
                <AvvisoCard {...a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ REQUISITI & VALORE ALÈTHEIA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 0 2.5rem', textAlign: 'left' }}>
            <span className="section-badge">{T.intro_badge}</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, margin: '0 0 0.75rem', lineHeight: 1.3 }}>{T.intro_titolo}</h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{T.intro_testo[0]}</p>
          </div>

          {/* Layout asimmetrico: elenco editoriale a sinistra (senza card/box né divisori),
              riepilogo scuro con CTA integrata a destra. */}
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: '2.5rem', alignItems: 'stretch' }}>
            {/* Colonna sinistra — elenco testuale, 7/12 */}
            <ul className="lg:col-span-7" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {requisiti.map((r, i) => (
                <Reveal key={r.text} delay={i * 45}>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.1rem',
                      padding: '0.9rem 0',
                    }}
                  >
                    <i className={r.icon} style={{ color: '#008C95', fontSize: '1.05rem', width: '1.4rem', textAlign: 'center', marginTop: '0.1rem', flexShrink: 0 }}></i>
                    <span className="text-slate-800 dark:text-gray-200" style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 }}>{r.text}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            {/* Colonna destra — card scura di riepilogo con CTA integrata, 5/12 */}
            <div className="lg:col-span-5" style={{
              borderRadius: '1.25rem',
              padding: '2.5rem 2rem',
              background: 'linear-gradient(160deg, #0F172A 0%, #134E4A 100%)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 90% 10%, rgba(16,185,129,0.18) 0%, transparent 70%)' }} />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(1,136,145,0.15)', border: '1px solid rgba(1,136,145,0.3)' }}>
                <i className="fas fa-clipboard-check" style={{ color: '#6EE7B7', fontSize: '1.4rem' }}></i>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '0 0 0.6rem', lineHeight: 1.4 }}>
                  Non sai se possiedi i requisiti?
                </p>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.75 }}>
                  Raccontaci la tua situazione: in pochi minuti verifichiamo insieme quali bandi puoi seguire e ti indichiamo il percorso più adatto.
                </p>
              </div>

              <a
                href="/contatti"
                className="hover:bg-[#006B73]"
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: '#008C95',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.5rem',
                  borderRadius: '999px',
                  boxShadow: '0 4px 14px rgba(0,140,149,0.35)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                  zIndex: 1,
                  marginTop: 'auto',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Verifica i tuoi requisiti <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge">Domande frequenti sulla formazione regionale in Sicilia</span>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              Hai dubbi? Leggi le risposte alle domande che riceviamo più spesso.
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

      {/* ── CTA ── */}
      <CtaFinale
        eyebrow="Hai domande?"
        title={T.cta_titolo}
        text={T.cta_testo}
        primary={{ label: T.cta_bottone1.label, href: T.cta_bottone1.href }}
      />

      </main>
      <Footer />
    </>
  );
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
