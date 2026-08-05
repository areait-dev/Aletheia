import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';
import { useCart } from '../../context/CartContext';

const PREPOSTO_IMAGE = 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80';
const MAPS_HREF = 'https://maps.google.com/?q=Vittoria+RG+Aletheia+Srl';

const schedaTecnica = [
  { icon: 'fas fa-clock', label: 'Durata', value: '6 ore' },
  { icon: 'fas fa-calendar-check', label: 'Validità', value: "Da ripetere periodicamente ai sensi dell'art. 37 D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17/04/2025" },
  { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
  { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
];

const aChiERivolto = [
  'Preposti già formati (attestato di 12 ore) con formazione in scadenza',
  'Capisquadra, capireparto e responsabili di linea già formati come preposti che devono rinnovare la propria formazione',
  'Lavoratori che svolgono di fatto funzioni di preposto e devono mantenere aggiornata la propria formazione',
  'Datori di lavoro che devono garantire l\'aggiornamento periodico dei propri preposti',
  'Attenzione: chi non ha mai conseguito l\'attestato di formazione preposti di 12 ore deve prima frequentare il corso base, non l\'aggiornamento',
];

const cosaImparerai = [
  'Approfondire l\'individuazione del preposto di fatto, tra designazione ed effettività del ruolo',
  'Aggiornare le conoscenze sugli obblighi connessi a contratti di appalto, d\'opera e di somministrazione',
  'Consolidare la gestione del rischio interferenziale e del DUVRI',
  'Aggiornare le modalità per sovraintendere e vigilare sulle attività lavorative garantendo l\'attuazione delle direttive ricevute',
  'Consolidare le modalità di comunicazione e relazione con gli altri soggetti della prevenzione aziendale',
];

const faqs = [
  {
    domanda: 'Ogni quanto va rinnovata la formazione per preposti?',
    risposta: 'La formazione va aggiornata periodicamente.',
  },
  {
    domanda: 'Quanto dura l\'aggiornamento formazione preposti?',
    risposta: 'L\'aggiornamento dura 6 ore, erogate in un modulo unico che approfondisce temi come il preposto di fatto, gli appalti, il DUVRI e le tecniche di vigilanza e comunicazione.',
  },
  {
    domanda: 'Il corso si può fare in FAD?',
    risposta: 'No, secondo il listino Alètheia questo corso è disponibile in aula o in videoconferenza; la modalità FAD non è prevista.',
  },
  {
    domanda: 'Posso fare l\'aggiornamento se non ho mai fatto il corso base?',
    risposta: 'No, l\'aggiornamento è riservato a chi ha già conseguito l\'attestato di formazione preposti di 12 ore. Senza formazione di base è necessario frequentare il corso completo.',
  },
  {
    domanda: 'L\'aggiornamento tratta anche la gestione degli appalti e del DUVRI?',
    risposta: 'Sì, il programma include un approfondimento sugli obblighi connessi a contratti di appalto, d\'opera e di somministrazione, e sulla gestione del rischio interferenziale tramite il DUVRI.',
  },
];

const moduli = [
  {
    titolo: 'MODULO UNICO - AGGIORNAMENTO',
    durataOre: 6,
    argomenti: [
      'Il preposto di fatto: tra designazione ed effettività del ruolo',
      'Obblighi connessi a contratti di appalto, d\'opera e di somministrazione',
      'Gestione del rischio interferenziale e DUVRI',
      'Sovraintendere e vigilare sulle attività lavorative garantendo l\'attuazione delle direttive ricevute',
      'Comunicazione e relazione con gli altri soggetti della prevenzione aziendale',
    ],
  },
];

const corsiCorrelatiSlugs = [
  'formazione-dirigente',
  'formazione-dei-lavoratori-rischio-medio',
  'rspp-datore-di-lavoro',
];

export default function AggiornamentoFormazionePreposto() {
  const { addToCart, setCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [modalitaSelezionata, setModalitaSelezionata] = useState('aula');
  const carouselRef = useRef(null);

  const families = buildCourseFamilies(coursesData, {}, { quiet: true });
  const corsiCorrelatiResolti = corsiCorrelatiSlugs
    .map((s) => resolveRelatedCourse(s, families))
    .filter(Boolean)
    .map((c) => {
      const slug = c.href.split('/').pop();
      const fam = families.find((f) => f.slug === slug);
      return { ...c, image: fam?.image || null };
    });

  const corsiCorrelati = [
    { titolo: 'Corso di Formazione per Preposti · 12 ore (corso base)', href: '/all-courses/formazione-del-preposto', image: PREPOSTO_IMAGE, meta: '12 ore · € 160,00' },
    ...corsiCorrelatiResolti,
  ];

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
        <title>Aggiornamento Formazione Preposto – 6h | Alètheia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Aggiornamento formazione preposti, 6 ore, art. 37 D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG)."
        />
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
            column-gap: 4rem; /* gap-16: distacco netto tra contenuto e sidebar */
            row-gap: 1.25rem;
          }
        }
        .cp-top-area { grid-area: top; }
        .cp-tabs-area { grid-area: tabs; }
        .cp-price-area { grid-area: price; }
        @media (min-width: 992px) {
          .cp-price-area { position: sticky; top: 6rem; align-self: start; margin-top: 1.5rem; } /* top-24 - il margine allinea il bordo del box al testo Panoramica/Moduli, non al bordo invisibile del padding dei bottoni */
        }

        .cp-scheda-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (max-width: 560px) { .cp-scheda-grid { grid-template-columns: 1fr; } }

        .cp-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid; flex-wrap: wrap; }

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

            {/* ── AREA "top": breadcrumb da sola sulla prima riga ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', flexWrap: 'wrap' }}>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Tutti i corsi</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/formazione-del-preposto" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione del Preposto</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">Aggiornamento</span>
              </nav>
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
                    {/* SCHEDA TECNICA: apre sempre il tab Panoramica, come da standard comune a tutte le pagine corso */}
                    <CourseSchedaTecnica items={schedaTecnica}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-chalkboard-user" style={{ color: '#6EE7B7', fontSize: '0.9rem' }}></i>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Modalità</span>
                          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.15rem' }}>
                            {[
                              { key: 'aula', label: 'Aula' },
                              { key: 'videoconferenza', label: 'Videoconferenza' },
                            ].map((m) => (
                              <button
                                key={m.key}
                                type="button"
                                onClick={() => setModalitaSelezionata(m.key)}
                                style={{
                                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                  color: modalitaSelezionata === m.key ? '#6EE7B7' : 'rgba(255,255,255,0.5)',
                                  background: 'none', border: 'none', padding: 0,
                                  textDecoration: modalitaSelezionata === m.key ? 'underline' : 'none',
                                }}
                              >
                                {m.label}{m.key !== 'videoconferenza' ? ' ·' : ''}
                              </button>
                            ))}
                          </div>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>FAD non disponibile per questo corso</span>
                        </div>
                      </div>

                      {modalitaSelezionata === 'aula' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-location-dot" style={{ color: '#6EE7B7', fontSize: '0.9rem' }}></i>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Luogo del corso</span>
                            <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#6EE7B7' }}>
                              Sede Alètheia, Vittoria (RG) <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.68rem' }}></i>
                            </a>
                          </div>
                        </div>
                      )}
                    </CourseSchedaTecnica>

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Descrizione del corso</h2>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Questo è il corso di aggiornamento per preposti, della durata di 6 ore, non il corso base: è rivolto a chi ha già completato la formazione iniziale di 12 ore e deve rinnovarla periodicamente, ai sensi dell&apos;art. 37 del D.Lgs 81/2008 e dell&apos;Accordo Stato Regioni del 17 aprile 2025.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      L&apos;aggiornamento periodico è obbligatorio perché il ruolo del preposto, per sua natura operativo e relazionale, richiede un allineamento costante alle novità normative e alle prassi di gestione della sicurezza in azienda: chi sovrintende e vigila sull&apos;attività di altri lavoratori deve rimanere aggiornato per continuare a esercitare correttamente questa funzione, anche alla luce di eventuali cambiamenti nell&apos;organizzazione aziendale o nei contratti di appalto.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Il corso, erogato in un modulo unico, approfondisce l&apos;individuazione del preposto di fatto tra designazione ed effettività del ruolo, gli obblighi connessi a contratti di appalto, d&apos;opera e di somministrazione, la gestione del rischio interferenziale e il DUVRI, le modalità per sovraintendere e vigilare sulle attività lavorative garantendo l&apos;attuazione delle direttive ricevute, e le modalità di comunicazione e relazione con gli altri soggetti della prevenzione aziendale.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Il corso è pensato per chi ha già l&apos;attestato di formazione preposti in scadenza. Chi invece non ha mai conseguito la formazione di base deve frequentare il corso completo di 12 ore, non l&apos;aggiornamento. Il corso è disponibile in aula o in videoconferenza; la modalità FAD non è prevista.
                    </p>

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2rem 0 1rem' }}>A chi è rivolto</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {aChiERivolto.map((riga) => (
                        <li key={riga} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <i className="fas fa-user-check" style={{ color: '#008C95', marginTop: '0.2rem' }}></i>
                          <span className="text-slate-600 dark:text-gray-300">{riga}</span>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Cosa imparerai</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {cosaImparerai.map((riga) => (
                        <li key={riga} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <i className="fas fa-check-circle" style={{ color: '#008C95', marginTop: '0.2rem' }}></i>
                          <span className="text-slate-600 dark:text-gray-300">{riga}</span>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Domande frequenti</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {faqs.map((item, i) => {
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
                )}

                {activeTab === 'moduli' && (
                  <div>
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                      Programma Aggiornamento Formazione per Preposti · 6 ore
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400" style={{ marginBottom: '1.5rem' }}>
                      Il corso è erogato in un modulo unico.
                    </p>
                    <div className="border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr className="bg-slate-50 dark:bg-gray-700">
                            <th className="text-slate-900 dark:text-white" style={{ textAlign: 'left', padding: '0.85rem 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modulo</th>
                            <th className="text-slate-900 dark:text-white" style={{ textAlign: 'left', padding: '0.85rem 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Durata</th>
                            <th className="text-slate-900 dark:text-white" style={{ textAlign: 'left', padding: '0.85rem 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Argomenti</th>
                          </tr>
                        </thead>
                        <tbody>
                          {moduli.map((m) => (
                            <tr key={m.titolo} className="border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
                              <td className="text-slate-900 dark:text-white" style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.9rem', verticalAlign: 'top' }}>{m.titolo}</td>
                              <td style={{ padding: '1rem 1.25rem', color: '#008C95', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{m.durataOre} ore</td>
                              <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                  {m.argomenti.map((a) => (
                                    <li key={a} className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.85rem' }}>{a}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet */}
            <aside className="cp-price-area">
              <PricingSidebar
                priceRows={[
                  { label: 'Aula', value: '€ 90,00 + IVA' },
                  { label: 'Videoconferenza', value: '€ 90,00 + IVA' },
                ]}
                onBuyClick={() => { addToCart({ id: 'aggiornamento-formazione-del-preposto', slug: 'aggiornamento-formazione-del-preposto', title: 'Aggiornamento Formazione del Preposto', variant: 'Aula/Videoconferenza', price: 90 }); setCartOpen(true); }}
                buyLabel="Acquista ora"
                onAddToCartClick={() => addToCart({ id: 'aggiornamento-formazione-del-preposto', slug: 'aggiornamento-formazione-del-preposto', title: 'Aggiornamento Formazione del Preposto', variant: 'Aula/Videoconferenza', price: 90 })}
                whatsappHref={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
              />
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
            {corsiCorrelati.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="corso-correlato-card group bg-white dark:bg-dark-card"
                style={{
                  flex: '0 0 260px', borderRadius: '1.25rem', overflow: 'hidden', textDecoration: 'none',
                  scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.titolo}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
                      className="group-hover:scale-105"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                  <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.85rem', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {c.meta || 'Sicurezza sul Lavoro'}
                  </span>
                </div>
                <div style={{ padding: '1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3 }}>{c.titolo}</span>
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
