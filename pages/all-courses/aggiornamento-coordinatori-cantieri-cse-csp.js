import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

const CSE_IMAGE = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80';

const schedaTecnica = [
  { icon: 'fas fa-clock', label: 'Durata', value: '40 ore' },
  { icon: 'fas fa-laptop', label: 'Modalità', value: 'FAD (aula e videoconferenza non disponibili)' },
  { icon: 'fas fa-calendar-check', label: 'Validità', value: "Da ripetere periodicamente ai sensi dell'art. 98 e dell'Allegato XIV del D.Lgs 81/2008" },
  { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
  { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
  { icon: 'fas fa-location-dot', label: 'Luogo del corso', value: 'Non applicabile — corso interamente in FAD' },
];

const aChiERivolto = [
  'Coordinatori della Sicurezza (CSP e CSE) già formati (attestato di 120 ore) con formazione in scadenza',
  'Ingegneri, architetti, geometri e altri tecnici già abilitati come coordinatori della sicurezza nei cantieri',
  'Professionisti che devono mantenere aggiornata la propria abilitazione per continuare a operare come coordinatori della sicurezza',
  "Attenzione: chi non ha mai conseguito l'attestato di formazione iniziale di 120 ore deve prima frequentare il corso base, non l'aggiornamento",
];

const cosaImparerai = [
  "Aggiornarsi sull'art. 100 e sull'allegato XV del D.Lgs 81/08 relativi ai contenuti minimi del PSC",
  "Approfondire il Piano Sostitutivo di Sicurezza e l'apparato sanzionatorio previsto dal D.Lgs 81/08",
  'Aggiornare le competenze su PIMUS, ponteggi, opere provvisionali e redazione del progetto esecutivo',
  'Analizzare casi reali di infortunio e malattia professionale alla luce della normativa INAIL',
  "Aggiornarsi sulle novità legislative in materia di organizzazione del cantiere e dispositivi di protezione individuale",
  'Gestire la protezione da agenti fisici, agenti cancerogeni, mutageni e sostanze pericolose',
  'Applicare la normativa aggiornata su attrezzature di lavoro e direttiva macchine',
  'Gestire spazi e ambienti confinati ai sensi del D.P.R. 177/2011 ed effettuare correttamente il sopralluogo in cantiere',
];

const faqs = [
  {
    domanda: "Ogni quanto va rinnovata l'abilitazione CSP-CSE?",
    risposta: "L'abilitazione richiede un aggiornamento periodico costante per mantenere la validità legale.",
  },
  {
    domanda: 'Quanto dura l\'aggiornamento Coordinatori CSE-CSP?',
    risposta: 'Dura 40 ore complessive, strutturate in moduli mirati su ponteggi, DVR, DPI, agenti fisici e spazi confinati.',
  },
  {
    domanda: 'Il corso si può fare in aula?',
    risposta: 'No, secondo il listino ufficiale Alètheia, questo aggiornamento da 40 ore è erogato esclusivamente in modalità FAD.',
  },
  {
    domanda: 'Il corso tratta anche gli spazi confinati?',
    risposta: 'Sì, include un modulo tecnico specifico focalizzato sugli spazi e ambienti confinati ai sensi del D.P.R. 177/2011.',
  },
  {
    domanda: "Posso fare l'aggiornamento se non ho mai fatto il corso base di 120 ore?",
    risposta: "No, l'aggiornamento è riservato a chi ha già completato il percorso iniziale completo.",
  },
];

const moduli = [
  { titolo: 'PIANO DI SICUREZZA E COORDINAMENTO', durataOre: 8, argomenti: ["Art. 100 e Allegato XV del D.Lgs 81/08", 'Apparato sanzionatorio'] },
  { titolo: 'PIMUS, PONTEGGI E OPERE PROVVISIONALI', durataOre: 5, argomenti: ['Redazione del progetto esecutivo', 'Aggiornamenti normativi'] },
  { titolo: 'INFORTUNIO E MALATTIA PROFESSIONALE', durataOre: 5, argomenti: ['Analisi di casi reali', 'Normativa INAIL'] },
  { titolo: 'NORME DI ORGANIZZAZIONE DEL CANTIERE E DPI', durataOre: 5, argomenti: ['Novità legislative', 'Dispositivi di protezione individuale'] },
  { titolo: 'PROTEZIONE DA AGENTI FISICI E SOSTANZE PERICOLOSE', durataOre: 5, argomenti: ['Agenti cancerogeni e mutageni', 'Sostanze pericolose'] },
  { titolo: 'ATTREZZATURE DI LAVORO', durataOre: 4, argomenti: ['Normativa aggiornata', 'Direttiva macchine'] },
  { titolo: 'SPAZI E AMBIENTI CONFINATI', durataOre: 4, argomenti: ['D.P.R. 177/2011'] },
  { titolo: 'SOPRALLUOGO IN CANTIERE', durataOre: 4, argomenti: ['Esempi di verbali'] },
];

const corsiCorrelatiSlugs = [
  'pimus-ponteggi',
  'lavori-in-quota',
  'rspp-datore-di-lavoro-modulo-3-costruzioni',
];

export default function AggiornamentoCoordinatoriCseCsp() {
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
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
    { titolo: 'Corso Coordinatori Cantieri CSE-CSP · 120 ore (corso base)', href: '/all-courses/coordinatori-cantieri-cse-csp', image: CSE_IMAGE, meta: '120 ore' },
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
        <title>Aggiornamento Coordinatori CSE-CSP – 40h | Alètheia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Aggiornamento Coordinatori Sicurezza Cantieri CSE-CSP, 40 ore in FAD, art. 98 D.Lgs 81/2008. Attestato valido in Italia. Alètheia, Vittoria (RG)."
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
          .cp-price-area { position: sticky; top: 6rem; align-self: start; margin-top: 1.5rem; } /* top-24 */
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

            {/* ── AREA "top": breadcrumb + H1, sola sulla prima riga ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/coordinatori-cantieri-cse-csp" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Coordinatori Cantieri CSE-CSP</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">Aggiornamento CSE-CSP</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
                Aggiornamento Coordinatori della Sicurezza nelle Fasi di Progettazione ed Esecuzione dei Lavori (CSP-CSE) <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>· 40 ore</span>
              </h1>
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
                    <CourseSchedaTecnica items={schedaTecnica} />

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Descrizione del corso</h2>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Questo è il corso di aggiornamento per Coordinatori della Sicurezza nelle Fasi di Progettazione ed Esecuzione dei Lavori (CSP-CSE), della durata di 40 ore, non il corso base: è rivolto a chi ha già conseguito l&apos;attestato di formazione iniziale di 120 ore e deve rinnovarlo periodicamente, ai sensi dell&apos;art. 98 e dell&apos;Allegato XIV del D.Lgs 81/2008.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      L&apos;aggiornamento periodico è obbligatorio perché il ruolo di coordinatore della sicurezza richiede un costante allineamento a normative tecniche, novità legislative e casistiche reali che evolvono nel tempo: chi coordina la sicurezza nei cantieri deve rimanere aggiornato su piani di sicurezza, gestione degli infortuni, attrezzature di lavoro e protezione da agenti fisici e sostanze pericolose, per continuare a esercitare correttamente questo ruolo di elevata responsabilità.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Il corso si articola in otto moduli: il Piano di Sicurezza e Coordinamento (8 ore), con analisi dell&apos;art. 100 e dell&apos;allegato XV del D.Lgs 81/08 e dell&apos;apparato sanzionatorio; PIMUS, ponteggi e opere provvisionali (5 ore); infortunio e malattia professionale (5 ore), con analisi di casi reali; norme di organizzazione del cantiere e DPI (5 ore); protezione da agenti fisici e sostanze pericolose (5 ore), inclusi agenti cancerogeni e mutageni; attrezzature di lavoro (4 ore); spazi e ambienti confinati (4 ore), ai sensi del D.P.R. 177/2011; e il sopralluogo in cantiere (4 ore), con esempi di verbali.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Il corso è pensato per chi ha già l&apos;attestato CSP-CSE in scadenza. Chi invece non ha mai conseguito la formazione di base di 120 ore deve frequentare il corso completo, non l&apos;aggiornamento. Il corso si svolge interamente in FAD, la modalità prevista per questo corso secondo il listino Alètheia.
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
                      Programma Aggiornamento Coordinatori CSE-CSP · 40 ore
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400" style={{ marginBottom: '1.5rem' }}>
                      Il corso è strutturato in {moduli.length} moduli.
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
                buyHref={`/contatti?corso=${encodeURIComponent('Aggiornamento Coordinatori Cantieri CSE-CSP')}&tipo=preventivo`}
                buyLabel="Richiedi preventivo"
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
