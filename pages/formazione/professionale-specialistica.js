import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CtaFinale from '../../components/CtaFinale';
import Reveal from '../../components/Reveal';
import { getSchede } from '../../lib/wp-schede';
import { isrOptions } from '../../lib/wp';
import { getPagina } from '../../lib/wp-pagine';
import HeroTitle from '../../components/HeroTitle';
import { withSiteOptions } from '../../lib/wp-site';

const valori = [
  {
    title: 'Contenuti aggiornati',
    text: (
      <>Programmi progettati con <strong className="text-slate-900 dark:text-white font-bold">docenti professionisti</strong>: non teoria fine a sé stessa, ma <strong className="text-slate-900 dark:text-white font-bold">competenze pratiche</strong> spendibili sul lavoro.</>
    ),
  },
  {
    title: 'Certificazioni riconosciute',
    text: (
      <><strong className="text-slate-900 dark:text-white font-bold">ICDL, qualifiche regionali e crediti ECM</strong>. Titoli validi per il mercato privato, concorsi pubblici e graduatorie scolastiche.</>
    ),
  },
  {
    title: 'Percorsi su misura',
    text: (
      <>Soluzioni flessibili per <strong className="text-slate-900 dark:text-white font-bold">privati e Pubblica Amministrazione</strong>. Corsi in aula, online o direttamente presso il tuo ente.</>
    ),
  },
];

function ImgCourse({ src, alt }) {
  return (
    // object-fit: cover a piena tela, foto edge-to-edge: il "montaggio" con margine
    // e contain sembrava un ritaglio incollato, non una card fotografica vera.
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
    </div>
  );
}

// Card verticale unica: stesso stile per tutte e 4 le aree (niente più un colore diverso per
// categoria, niente più icona). Foto a piena tela in testa a ogni card, aspect-ratio fisso
// così il taglio resta coerente in qualunque larghezza di colonna.
function VerticaleCard({ sopratitolo, title, bullets, cta, href, image, imageAlt }) {
  return (
    <a
      href={href}
      className="group h-full no-underline flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
    >
      <div style={{ aspectRatio: '4 / 3', position: 'relative' }}>
        {image && <ImgCourse src={image} alt={imageAlt} />}
        {/* Sopratitolo come badge sovrapposto alla foto: stile unico .badge-overlay
           (pillola bianca, leggibile su qualsiasi foto). */}
        <span className="badge-overlay absolute left-4 bottom-4">
          <span className="badge-overlay-dot" aria-hidden="true" />
          {sopratitolo}
        </span>
      </div>
      <div className="px-7 pb-7 pt-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-extrabold leading-snug m-0 text-slate-900 dark:text-white">
          {title}
        </h3>

        <ul className="list-none m-0 p-0 space-y-2 flex-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-gray-300">
              <i className="fas fa-check text-xs mt-1 shrink-0 text-primary dark:text-primary-on-dark"></i>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold rounded-full border-2 px-5 py-2.5 transition-all duration-300 border-primary text-primary dark:border-primary-on-dark dark:text-primary-on-dark hover:bg-primary hover:text-white dark:hover:bg-primary-on-dark dark:hover:text-slate-900">
          {cta} <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
        </span>
      </div>
    </a>
  );
}

// Liste di card: WordPress (CPT scheda) se WP_URL è impostato, altrimenti data/schede.js (vedi lib/wp-schede.ts).
async function getPageStaticProps() {
  const [heroBadges, verticali] = await Promise.all([getSchede('prof-hero-badges'), getSchede('prof-verticali')]);
  return { props: { pagina: await getPagina('formazione/professionale-specialistica'), heroBadges, verticali }, ...isrOptions() };
}

export default function FormazioneProfessionaleSpecialistica({ heroBadges, verticali, pagina }) {
  const T = pagina.testi;
  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Formazione Professionale e Corsi per la Pubblica Amministrazione - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Corsi qualificati, certificazioni ICDL, corsi ECM e formazione per la Pubblica Amministrazione. Alètheia, ente accreditato Regione Siciliana, Test Center AICA e Provider ECM."}
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
        .fade-up-4 { animation-delay: 0.38s; opacity: 0; }


        .fps-badges-row { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.5rem; }

        /* Blocco "Formazione che crea valore": editoriale, senza box/bordi (per non
           somigliare alla griglia di card fotografiche delle aree sotto). Divisori
           verticali sottili tra le colonne, niente sfondo. */
        .valori-grid-fps {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
        }
        .valori-item-fps {
          padding: 0 2.25rem;
          border-left: 1px solid #E2E8F0;
        }
        .valori-item-fps:first-child { padding-left: 0; border-left: none; }
        :global(.dark) .valori-item-fps { border-color: rgba(255,255,255,0.1); }
        @media (max-width: 800px) {
          .valori-grid-fps { grid-template-columns: 1fr; gap: 2rem; }
          .valori-item-fps {
            padding: 0 0 0 1.5rem;
            border-left: 1px solid #E2E8F0;
          }
          :global(.dark) .valori-item-fps { border-color: rgba(255,255,255,0.1); }
        }

        /* Aree formative: le 4 aree hanno contenuto omogeneo (stesso numero di bullet,
           stesso peso informativo), quindi griglia simmetrica invece di pesi arbitrari.
           4 colonne su desktop (card compatte, una riga sola) evitano che con 2 colonne
           le card diventino enormi. */
        .aree-grid-fps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 1100px) {
          .aree-grid-fps { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .aree-grid-fps { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="page-hero page-hero--dark page-hero--left">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fps-badges-row fade-up">
            {heroBadges.map((b) => (
              <span key={b.label} className="page-hero-badge">
                <i className={b.icon} style={{ fontSize: '0.8rem' }}></i>
                {b.label}
              </span>
            ))}
          </div>

          <h1 className="fade-up fade-up-1" style={{ maxWidth: '900px' }}>
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{w}</span>} />
            </h1>

          <div className="page-hero-actions fade-up fade-up-3">
            <a href={T.hero_cta1.href} className="btn btn-lg btn-light">{T.hero_cta1.label}</a>
          </div>
        </div>
      </section>

      {/* ══════════════ FORMAZIONE CHE CREA VALORE ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center' }}>
            Formazione che crea valore, non solo attestati
          </h3>
          <div className="valori-grid-fps">
            {valori.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 80} className="valori-item-fps">
                <span className="text-primary dark:text-primary-on-dark font-black block mb-2" style={{ fontSize: '1.6rem', opacity: 0.35 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white text-lg block mb-2">
                  {v.title}
                </span>
                <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed m-0">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SMISTAMENTO / NAVIGAZIONE ══════════════ */}
      <section id="aree" className="bg-slate-50 dark:bg-dark-bg border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-text)', marginBottom: '0.6rem' }}>
              Le aree della formazione
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Trova il percorso formativo adatto a te
            </h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Che tu sia un professionista, un&apos;azienda o un ente pubblico, Alètheia ha il percorso giusto. Clicca sulla categoria che ti interessa e scopri di più.
            </p>
          </div>

          <div className="aree-grid-fps">
            {verticali.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="h-full">
                <VerticaleCard {...v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CHIUSURA ══════════════ */}
      <CtaFinale
        title={T.cta_titolo}
        primary={{ label: T.cta_bottone1.label, href: T.cta_bottone1.href }}
      />

      </main>
      <Footer />
    </>
  );
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
