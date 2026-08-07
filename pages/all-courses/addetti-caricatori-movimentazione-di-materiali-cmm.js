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

// TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
const MAPS_HREF = 'https://maps.google.com/?q=Vittoria+RG+Aletheia+Srl';

// Dicitura usata esclusivamente nel tab Moduli/programma didattico dettagliato (teoria/pratica), in
// attesa del programma corso ufficiale (ripartizione ore) fornito da Alètheia, per entrambi gli stati.
// TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA
const NOTA_MODULI_IN_AGGIORNAMENTO = 'Dettaglio moduli in aggiornamento — La ripartizione delle ore e i moduli tecnici saranno disponibili a breve.';

// Stesso pattern a pillola già usato in pompe-per-calcestruzzo.js, spazi-confinati.js,
// operatore-di-gru-per-autocarro.js: cambia scheda tecnica, testi e box prezzo nella sidebar in base
// alla variante selezionata (Corso Base 8h / Aggiornamento 4h). Solo modalità Aula: Videoconferenza
// e FAD sono disattivate/nascoste per questo corso. In attesa del programma corso ufficiale fornito
// da Alètheia, i testi di Panoramica sono scheletri strutturali con placeholder puliti (nessun Lorem
// Ipsum) — vedi i TODO nel corpo del componente.
const CONTENUTO = {
  base: {
    title: 'Corso Addetti Caricatori Movimentazione di Materiali (CMM)',
    titleSuffix: '· 8 ore',
    breadcrumbLabel: 'Corso Addetti CMM',
    titleSeo: 'Corso Addetti Caricatori CMM – 8 ore | Alètheia',
    metaDescription: 'Corso addetti caricatori movimentazione di materiali (CMM), 8 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '8 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore, pagina dedicata)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    faqPlaceholderCount: 3,
    programmaTitle: 'Programma Corso Addetti Caricatori Movimentazione di Materiali (CMM) · 8 ore',
    prezzo: [
      { label: 'Aula', value: '€ 270,00 + IVA' },
    ],
    prezzoNumerico: 270,
  },

  aggiornamento: {
    title: 'Aggiornamento Addetti Caricatori Movimentazione di Materiali (CMM)',
    titleSuffix: '· 4 ore',
    breadcrumbLabel: 'Aggiornamento Addetti CMM',
    titleSeo: 'Aggiornamento Addetti Caricatori CMM – 4h',
    metaDescription: 'Aggiornamento addetti caricatori movimentazione di materiali (CMM), 4 ore. Attestato valido in Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '4 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da ripetere periodicamente — da definire' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    faqPlaceholderCount: 3,
    programmaTitle: 'Programma Aggiornamento Addetti Caricatori Movimentazione di Materiali (CMM) · 4 ore',
    prezzo: [
      { label: 'Aula', value: '€ 150,00 + IVA' },
    ],
    prezzoNumerico: 150,
  },
};

const corsiCorrelatiSlugs = [
  'carrelli-elevatori-semoventi-conduttore-a-bordo',
];

export default function CorsoAddettiCaricatoriCmm() {
  const { addToCart, setCartOpen } = useCart();
  const [selectedTipo, setSelectedTipo] = useState('base');
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const carouselRef = useRef(null);

  const c = CONTENUTO[selectedTipo];

  const selectTipo = (tipo) => {
    setSelectedTipo(tipo);
    setOpenFaqIndex(null);
  };

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
        <title>{c.titleSeo}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={c.metaDescription} />
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

        .cp-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid; flex-wrap: wrap; }

        .cp-placeholder-block {
          border: 1px dashed; border-radius: 0.75rem; padding: 1rem 1.25rem;
          font-size: 0.85rem; font-style: italic;
        }

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

      {/* ══════════════ TAB (colonna sinistra) & BOX PREZZO STICKY (colonna destra) ══════════════ */}
      <section className="bg-white dark:bg-dark-bg" style={{ paddingTop: '120px', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="cp-page-grid">

            {/* ── AREA "top": breadcrumb + H1 + switch Corso Base / Aggiornamento ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/addetti-caricatori-movimentazione-di-materiali-cmm" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Addetti Caricatori Movimentazione Materiali</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">{c.breadcrumbLabel}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {c.title} <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {/* SWITCH Corso Base / Aggiornamento - stesso pattern a pillola delle altre pagine corso */}
              <div role="tablist" aria-label="Variante del corso" style={{ display: 'inline-flex', gap: '0.25rem', background: '#F1F5F9', borderRadius: '9999px', padding: '0.25rem' }}>
                {['base', 'aggiornamento'].map((tipo) => (
                  <button
                    key={tipo}
                    role="tab"
                    type="button"
                    aria-selected={selectedTipo === tipo}
                    onClick={() => selectTipo(tipo)}
                    style={{
                      padding: '0.5rem 1.1rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: selectedTipo === tipo ? '#008C95' : 'transparent',
                      color: selectedTipo === tipo ? '#fff' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {tipo === 'base' ? 'Corso Base · 8 ore' : 'Aggiornamento · 4 ore'}
                  </button>
                ))}
              </div>
            </div>

            {/* ── AREA "tabs": sistema Panoramica / Moduli, allineata alla riga della sidebar prezzo ── */}
            <div className="cp-tabs-area">
              <div className="cp-tabs border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
                {[
                  { id: 'overview', label: 'Panoramica' },
                  { id: 'moduli', label: 'Moduli' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    style={{
                      background: 'none', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem',
                      fontWeight: activeTab === id ? 700 : 500,
                      color: activeTab === id ? '#008C95' : '#6B7280',
                      cursor: 'pointer',
                      borderBottom: activeTab === id ? '3px solid #008C95' : '3px solid transparent',
                      marginBottom: '-2px', transition: 'all 0.2s ease', fontFamily: 'inherit',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ paddingTop: '2rem' }}>
                {activeTab === 'overview' && (
                  <div>
                    {/* SCHEDA TECNICA: apre sempre il tab Panoramica, cambia con la variante selezionata.
                        Solo modalità Aula: Videoconferenza e FAD non sono attive/selezionabili per questo corso. */}
                    <CourseSchedaTecnica items={c.schedaTecnica}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-chalkboard-user" style={{ color: '#6EE7B7', fontSize: '0.9rem' }}></i>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Modalità</span>
                          <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#6EE7B7', marginTop: '0.15rem' }}>Aula</span>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>Videoconferenza e FAD non attive per questo corso</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-location-dot" style={{ color: '#6EE7B7', fontSize: '0.9rem' }}></i>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Luogo del corso</span>
                          {/* TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA */}
                          <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#6EE7B7' }}>
                            Sede Alètheia S.r.l., Vittoria (RG) <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.68rem' }}></i>
                          </a>
                        </div>
                      </div>
                    </CourseSchedaTecnica>

                    {/* <!-- TODO: COMPLETARE COPYWRITING PANORAMICA CON PDF ALÈTHEIA --> */}
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Descrizione del corso</h2>
                    <p className="cp-placeholder-block text-slate-500 dark:text-gray-400 border-slate-200 dark:border-[rgba(255,255,255,0.15)]" style={{ marginBottom: '2rem' }}>
                      [DA COMPLETARE quando disponibile il programma corso — descrizione 300-400 parole basata sui contenuti reali dei moduli]
                    </p>

                    {/* <!-- TODO: COMPLETARE COPYWRITING PANORAMICA CON PDF ALÈTHEIA --> */}
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>A chi è rivolto</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <i className="fas fa-user-check" style={{ color: '#008C95', marginTop: '0.2rem', opacity: 0.4 }}></i>
                        <span className="text-slate-400 dark:text-gray-500" style={{ fontStyle: 'italic' }}>[DA COMPLETARE quando disponibile il programma corso — elenco preciso delle figure obbligate, in base ai moduli forniti]</span>
                      </li>
                    </ul>

                    {/* <!-- TODO: COMPLETARE COPYWRITING PANORAMICA CON PDF ALÈTHEIA --> */}
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Cosa imparerai</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <i className="fas fa-check-circle" style={{ color: '#008C95', marginTop: '0.2rem', opacity: 0.4 }}></i>
                        <span className="text-slate-400 dark:text-gray-500" style={{ fontStyle: 'italic' }}>[DA COMPLETARE quando disponibile il programma corso — competenze operative reali desunte dal programma]</span>
                      </li>
                    </ul>

                    {/* <!-- TODO: COMPLETARE COPYWRITING PANORAMICA CON PDF ALÈTHEIA --> */}
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Domande frequenti</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {Array.from({ length: c.faqPlaceholderCount }).map((_, i) => {
                        const isOpen = openFaqIndex === i;
                        return (
                          <div key={i} className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                              className="text-slate-400 dark:text-gray-500"
                              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'inherit', fontStyle: 'italic' }}
                            >
                              <span>Domanda in fase di redazione</span>
                              <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#008C95', flexShrink: 0, opacity: 0.4 }}></i>
                            </button>
                            {isOpen && (
                              <p className="text-slate-400 dark:text-gray-500" style={{ margin: 0, padding: '0 1.25rem 1.25rem', lineHeight: 1.75, fontSize: '0.9rem', fontStyle: 'italic' }}>
                                [DA COMPLETARE quando disponibile il programma corso — domande specifiche basate sui contenuti tecnici del corso]
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'moduli' && (
                  <div>
                    {/* <!-- TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA --> */}
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>
                      {c.programmaTitle}
                    </h2>
                    <div className="cp-placeholder-block text-slate-500 dark:text-gray-400 border-slate-200 dark:border-[rgba(255,255,255,0.15)]">
                      {NOTA_MODULI_IN_AGGIORNAMENTO}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet.
                Cambia riga prezzo/label in base alla variante selezionata nello switch qui sopra. */}
            <aside className="cp-price-area">
              <PricingSidebar
                priceRows={c.prezzo}
                onBuyClick={() => { addToCart({ id: `addetti-caricatori-movimentazione-di-materiali-cmm-${selectedTipo}`, slug: 'addetti-caricatori-movimentazione-di-materiali-cmm', title: c.title, variant: c.titleSuffix, price: c.prezzoNumerico }); setCartOpen(true); }}
                buyLabel="Acquista ora"
                onAddToCartClick={() => addToCart({ id: `addetti-caricatori-movimentazione-di-materiali-cmm-${selectedTipo}`, slug: 'addetti-caricatori-movimentazione-di-materiali-cmm', title: c.title, variant: c.titleSuffix, price: c.prezzoNumerico })}
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Addetti%20Caricatori%20Movimentazione%20Materiali"
              >
                {selectedTipo === 'base' && (
                  <button
                    type="button"
                    onClick={() => selectTipo('aggiornamento')}
                    className="text-slate-600 dark:text-gray-300 border-slate-200 dark:border-[rgba(255,255,255,0.1)]"
                    style={{
                      width: '100%', textAlign: 'left', background: 'transparent', border: '1px dashed',
                      borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.8rem', cursor: 'pointer',
                      fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                    }}
                  >
                    <span>Devi solo <strong>rinnovare</strong> l'attestato già in tuo possesso?</span>
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Aggiornamento 150€</span>
                  </button>
                )}
                {selectedTipo === 'aggiornamento' && (
                  <button
                    type="button"
                    onClick={() => selectTipo('base')}
                    className="text-slate-600 dark:text-gray-300 border-slate-200 dark:border-[rgba(255,255,255,0.1)]"
                    style={{
                      width: '100%', textAlign: 'left', background: 'transparent', border: '1px dashed',
                      borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.8rem', cursor: 'pointer',
                      fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                    }}
                  >
                    <span>Devi conseguire l'attestato <strong>per la prima volta</strong>?</span>
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Corso Base · 8 ore, 270€</span>
                  </button>
                )}
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
            <Link
              href="/all-courses/macchine-movimento-terra"
              className="corso-correlato-card group bg-white dark:bg-dark-card"
              style={{
                flex: '0 0 260px', borderRadius: '1.25rem', overflow: 'hidden', textDecoration: 'none',
                scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.85rem', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Formazione Obbligatoria
                </span>
              </div>
              <div style={{ padding: '1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3 }}>Corso Macchine Movimento Terra</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
                  Scopri di più <i className="fas fa-arrow-right" style={{ fontSize: '0.65rem' }}></i>
                </span>
              </div>
            </Link>
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
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} />
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
