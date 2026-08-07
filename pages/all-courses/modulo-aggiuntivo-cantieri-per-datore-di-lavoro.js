import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { useCart } from '../../context/CartContext';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

const TITLE_SEO = 'Modulo Cantieri Datore Lavoro/Dirigente – 6h';
const META_DESCRIPTION = 'Modulo aggiuntivo Cantieri per Datore di Lavoro e Dirigente, 6 ore in FAD, art. 18 D.Lgs 81/2008. Attestato valido in Italia. Alètheia, Vittoria (RG).';

const SCHEDA_TECNICA = [
  { icon: 'fas fa-clock', label: 'Durata', value: '6 ore' },
  { icon: 'fas fa-laptop', label: 'Modalità', value: 'FAD (formazione a distanza) — Aula e Videoconferenza non disponibili' },
  // TODO: verificare con Alètheia la periodicità esatta di rinnovo abbinata al corso base
  { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da mantenere in abbinamento al corso base (Datore di Lavoro o Dirigente) di riferimento' },
  { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
  { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
  { icon: 'fas fa-location-dot', label: 'Luogo del corso', value: 'Non applicabile — corso interamente in FAD' },
];

const DESCRIZIONE = [
  "La Formazione Aggiuntiva \"Cantieri\", della durata di 6 ore, è un modulo integrativo ai sensi dell'art. 18 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, condiviso tra due percorsi base: chi ha già completato la Formazione per Datore di Lavoro (16 ore) e chi ha già completato la Formazione Dirigente (12 ore), qualora l'uno o l'altro operino in cantieri temporanei o mobili.",
  "A differenza dei moduli settoriali del percorso RSPP Datore di Lavoro (Agricoltura, Pesca, Costruzioni, Chimico-Petrolchimico), che sono alternativi tra loro in base al settore ATECO dell'azienda, questo modulo cantieri è un'integrazione specifica pensata per chi, indipendentemente dal proprio ruolo di datore di lavoro o dirigente, si trova a operare in un contesto di cantiere temporaneo o mobile disciplinato dal Titolo IV, Capo I, del D.Lgs 81/2008.",
  "Il corso, erogato in un modulo unico, tratta i soggetti definiti dal Titolo IV, Capo I, e i relativi obblighi e responsabilità; la redazione dei piani di sicurezza, con finalità, tempi e contenuti; le misure generali di tutela previste dall'art. 95 del D.Lgs 81/2008; gli obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell'art. 96; il cronoprogramma dei lavori; ed esempi pratici di analisi di un Piano di Sicurezza e Coordinamento (PSC) e di un Piano Operativo di Sicurezza (POS).",
  "Il corso si svolge interamente in FAD, la modalità prevista secondo il listino Alètheia. Va frequentato dopo aver completato uno dei due corsi base di riferimento (Datore di Lavoro o Dirigente), a seconda del ruolo ricoperto in azienda.",
];

const A_CHI_E_RIVOLTO = [
  'Datori di lavoro già formati (Formazione Datore di Lavoro, 16 ore) che operano in cantieri temporanei o mobili',
  'Dirigenti già formati (Formazione Dirigente, 12 ore) che operano in cantieri temporanei o mobili',
  'Imprese edili e datori di lavoro o dirigenti di aziende che eseguono lavori in cantiere',
  'Attenzione: questo modulo è integrativo e va frequentato dopo aver completato il corso base (Datore di Lavoro o Dirigente) pertinente al proprio ruolo',
];

const COSA_IMPARERAI = [
  'Riconoscere i soggetti definiti dal Titolo IV, Capo I, del D.Lgs 81/2008 e i relativi obblighi e responsabilità',
  'Comprendere finalità, tempi e contenuti della redazione dei piani di sicurezza in cantiere',
  "Applicare le misure generali di tutela previste dall'art. 95 del D.Lgs 81/2008",
  "Riconoscere gli obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell'art. 96 del D.Lgs 81/2008",
  'Predisporre correttamente il cronoprogramma dei lavori',
  'Analizzare esempi pratici di Piano di Sicurezza e Coordinamento (PSC) e di Piano Operativo di Sicurezza (POS)',
];

const FAQS = [
  {
    domanda: 'Questo modulo è per il Datore di Lavoro o per il Dirigente?',
    risposta: 'È un modulo condiviso: si abbina sia al percorso Formazione Datore di Lavoro (16 ore) sia al percorso Formazione Dirigente (12 ore), a seconda del ruolo ricoperto da chi opera in cantiere.',
  },
  {
    domanda: 'Devo fare questo modulo se non opero in cantieri?',
    risposta: 'No, questo modulo è necessario solo per datori di lavoro o dirigenti che operano effettivamente in cantieri temporanei o mobili disciplinati dal Titolo IV, Capo I, del D.Lgs 81/2008.',
  },
  {
    domanda: 'Posso fare questo modulo senza aver completato il corso base?',
    risposta: 'No, è un modulo integrativo: va frequentato dopo aver completato la Formazione Datore di Lavoro o la Formazione Dirigente, a seconda del proprio ruolo.',
  },
  {
    domanda: 'Quanto dura il modulo cantieri?',
    risposta: 'Il modulo dura 6 ore, erogate interamente in FAD.',
  },
  {
    domanda: 'Il modulo tratta anche il Piano Operativo di Sicurezza (POS)?',
    risposta: 'Sì, il programma include esempi e analisi pratica sia di un Piano di Sicurezza e Coordinamento (PSC) sia di un Piano Operativo di Sicurezza (POS).',
  },
];

const corsiCorrelatiSlugs = [
  'datore-di-lavoro-modulo-comune',
  'formazione-dirigente-modulo-comune',
  'coordinatori-cantieri-cse-csp',
  'pimus-ponteggi',
];

export default function ModuloAggiuntivoCantieriDatoreLavoro() {
  const { addToCart, setCartOpen } = useCart();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const carouselRef = useRef(null);
  const prezzoNumerico = 90;

  const families = buildCourseFamilies(coursesData, {}, { quiet: true });
  const corsiCorrelatiResolti = corsiCorrelatiSlugs
    .map((s) => resolveRelatedCourse(s, families))
    .filter(Boolean)
    .map((cc) => {
      const slug = cc.href.split('/').pop();
      const fam = families.find((f) => f.slug === slug);
      return { ...cc, image: fam?.image || null };
    });

  const scrollCarousel = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector('.corso-correlato-card');
    const step = card ? card.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>{TITLE_SEO}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/all-courses" solid />

      <style jsx global>{`
        .cta-btn-whatsapp-cp {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem;
          padding: 0.9rem 1.75rem; border-radius: 999px; background: rgba(37,211,102,0.06);
          color: #25D366; font-weight: 700; font-size: 0.95rem; text-decoration: none;
          border: 1.5px solid rgba(37,211,102,0.5); transition: all 0.2s ease; font-family: inherit; cursor: pointer;
        }
        .cta-btn-whatsapp-cp:hover { background: rgba(37,211,102,0.1); }

        .cp-page-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: "top" "price" "tabs";
          gap: 1.25rem;
          align-items: start;
        }
        @media (min-width: 992px) {
          .cp-page-grid {
            grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
            grid-template-areas: "top ." "tabs price";
            column-gap: 4rem;
            row-gap: 1.25rem;
          }
        }
        .cp-top-area { grid-area: top; }
        .cp-tabs-area { grid-area: tabs; }
        .cp-price-area { grid-area: price; }
        @media (min-width: 992px) {
          .cp-price-area { position: sticky; top: 6rem; align-self: start; margin-top: 1.5rem; }
        }

        .cp-scheda-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (max-width: 560px) { .cp-scheda-grid { grid-template-columns: 1fr; } }

        .cp-carousel-track {
          display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch; padding-bottom: 0.5rem; scrollbar-width: none;
        }
        .cp-carousel-track::-webkit-scrollbar { display: none; }
        .cp-carousel-arrow {
          width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid #E2E8F0;
          background: #fff; color: #008C95; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.85rem; transition: all 0.2s ease;
        }
        .cp-carousel-arrow:hover { background: #008C95; border-color: #008C95; color: #fff; }
        :root[data-theme="dark"] .cp-carousel-arrow,
        .dark .cp-carousel-arrow { background: #1F2937; border-color: rgba(255,255,255,0.15); color: #6EE7B7; }
        .dark .cp-carousel-arrow:hover { background: #008C95; border-color: #008C95; color: #fff; }
      `}</style>

      {/* ══════════════ Contenuto (colonna sinistra) & BOX PREZZO STICKY (colonna destra) ══════════════ */}
      <section className="bg-white dark:bg-dark-bg" style={{ paddingTop: '120px', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="cp-page-grid">

            {/* ── AREA "top": breadcrumb + H1 ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/datore-di-lavoro" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione Datore di Lavoro</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">Modulo Aggiuntivo Cantieri</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                Formazione Aggiuntiva "Cantieri" per Datore di Lavoro e Dirigente <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>· 6 ore</span>
              </h1>
            </div>

            {/* ── AREA "tabs": contenuto Panoramica unico (nessuno switch: modulo singolo) ── */}
            <div className="cp-tabs-area">
              {/* SCHEDA TECNICA: solo modalità FAD per questo corso — Aula e Videoconferenza non
                  disponibili, coerentemente col listino Alètheia. */}
              <CourseSchedaTecnica items={SCHEDA_TECNICA} />

              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Descrizione del corso</h2>
              {DESCRIZIONE.map((paragrafo, i) => (
                <p key={i} className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>{paragrafo}</p>
              ))}

              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2rem 0 1rem' }}>A chi è rivolto</h2>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {A_CHI_E_RIVOLTO.map((riga) => (
                  <li key={riga} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <i className="fas fa-user-check" style={{ color: '#008C95', marginTop: '0.2rem' }}></i>
                    <span className="text-slate-600 dark:text-gray-300">{riga}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Cosa imparerai</h2>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {COSA_IMPARERAI.map((riga) => (
                  <li key={riga} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <i className="fas fa-check-circle" style={{ color: '#008C95', marginTop: '0.2rem' }}></i>
                    <span className="text-slate-600 dark:text-gray-300">{riga}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Domande frequenti</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {FAQS.map((item, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div key={item.domanda} className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="text-slate-900 dark:text-white"
                        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'inherit' }}
                      >
                        <span>{item.domanda}</span>
                        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#008C95', flexShrink: 0 }}></i>
                      </button>
                      {isOpen && (
                        <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.25rem 1.25rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
                          {item.risposta}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet.
                Unica riga FAD 90€ + IVA — nessuna opzione Aula/Videoconferenza per questo corso. */}
            <aside className="cp-price-area">
              <PricingSidebar
                priceRows={[{ label: 'FAD', value: '€ 90,00 + IVA' }]}
                onBuyClick={() => { addToCart({ id: 'modulo-aggiuntivo-cantieri-per-datore-di-lavoro', slug: 'modulo-aggiuntivo-cantieri-per-datore-di-lavoro', title: 'Formazione Aggiuntiva "Cantieri" per Datore di Lavoro e Dirigente', variant: '6 ore · FAD', price: prezzoNumerico }); setCartOpen(true); }}
                buyLabel="Acquista ora"
                onAddToCartClick={() => addToCart({ id: 'modulo-aggiuntivo-cantieri-per-datore-di-lavoro', slug: 'modulo-aggiuntivo-cantieri-per-datore-di-lavoro', title: 'Formazione Aggiuntiva "Cantieri" per Datore di Lavoro e Dirigente', variant: '6 ore · FAD', price: prezzoNumerico })}
                whatsappHref="https://wa.me/?text=Informazioni%20Modulo%20Aggiuntivo%20Cantieri%20Datore%20di%20Lavoro%2FDirigente"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    href="/all-courses/datore-di-lavoro"
                    className="text-slate-600 dark:text-gray-300 border-slate-200 dark:border-[rgba(255,255,255,0.1)]"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                      textDecoration: 'none', border: '1px dashed', borderRadius: '0.6rem',
                      padding: '0.65rem 0.85rem', fontSize: '0.8rem',
                    }}
                  >
                    <span>Non hai ancora il corso base <strong>Datore di Lavoro</strong>?</span>
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>16 ore</span>
                  </Link>
                  <Link
                    href="/all-courses/formazione-dirigente"
                    className="text-slate-600 dark:text-gray-300 border-slate-200 dark:border-[rgba(255,255,255,0.1)]"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                      textDecoration: 'none', border: '1px dashed', borderRadius: '0.6rem',
                      padding: '0.65rem 0.85rem', fontSize: '0.8rem',
                    }}
                  >
                    <span>Oppure ti serve il corso base <strong>Dirigente</strong>?</span>
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>12 ore</span>
                  </Link>
                </div>
              </PricingSidebar>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════ CORSI CORRELATI - carosello con frecce ══════════════ */}
      <section className="bg-white dark:bg-dark-bg border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, margin: 0 }}>
              Corsi correlati
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={() => scrollCarousel(-1)} aria-label="Corsi precedenti" className="cp-carousel-arrow">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button type="button" onClick={() => scrollCarousel(1)} aria-label="Corsi successivi" className="cp-carousel-arrow">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="cp-carousel-track">
            {corsiCorrelatiResolti.map((cc) => (
              <Link
                key={cc.href}
                href={cc.href}
                className="corso-correlato-card group bg-white dark:bg-dark-card"
                style={{
                  flex: '0 0 260px', borderRadius: '1.25rem', overflow: 'hidden', textDecoration: 'none',
                  scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
                  {cc.image ? (
                    <img
                      src={cc.image}
                      alt={cc.titolo}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
                      className="group-hover:scale-105"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                  <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.85rem', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {cc.meta || 'Formazione Obbligatoria'}
                  </span>
                </div>
                <div style={{ padding: '1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3 }}>{cc.titolo}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
                    Scopri di più <i className="fas fa-arrow-right" style={{ fontSize: '0.65rem' }}></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
