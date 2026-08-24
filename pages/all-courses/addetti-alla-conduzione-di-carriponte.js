import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

const COURSE_TITLE = 'Corso Addetti alla Conduzione di Carriponte';
const AGGIORNAMENTO_TITLE = 'Aggiornamento Addetti alla Conduzione di Carriponte';
const CARRIPONTE_IMAGE = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80';
const MAPS_HREF = 'https://maps.google.com/?q=Via+del+Carrubo+Vittoria+RG';

const schedaTecnica = [
  { icon: 'fas fa-clock', label: 'Durata', value: '11 ore' },
  { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento ogni 5 anni' },
  { icon: 'fas fa-certificate', label: 'Attestato', value: 'Attestato valido in tutta Italia' },
  { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
];

const aChiERivolto = [
  'Lavoratori che utilizzano carriponte e gru a cavalletto con comando pensile o radiocomando',
  'Operatori addetti al sollevamento e alla movimentazione di materiali in ambito industriale e produttivo',
  "Lavoratori già in possesso di esperienza pregressa che devono regolarizzare la propria posizione con il nuovo Accordo Stato-Regioni 2026",
  'Datori di lavoro che ricoprono personalmente il ruolo di operatore carroponte',
];

const cosaImparerai = [
  'Identificare le caratteristiche costruttive del carroponte e distinguerlo dalla gru a portale',
  'Condurre in sicurezza il carroponte con comando pensile e con radiocomando',
  'Riconoscere e valutare i rischi specifici legati al sollevamento e alla movimentazione dei carichi',
  "Eseguire i controlli pre-operativi e verificare l'efficienza dell'attrezzatura prima dell'utilizzo",
  'Applicare le procedure operative di sicurezza durante le manovre di sollevamento',
  'Gestire correttamente imbracature, ganci e accessori di sollevamento',
  'Operare in sicurezza negli spazi ristretti e confinati tipici degli ambienti industriali',
  'Riconoscere e gestire le situazioni di emergenza durante la conduzione del carroponte',
];

const faqs = [
  {
    domanda: 'Il corso carroponte è obbligatorio?',
    risposta: "Sì. Dal 24 maggio 2026 il nuovo Accordo Stato-Regioni ha inserito il carroponte tra le attrezzature che richiedono un'abilitazione specifica standardizzata. Chi già opera su questi mezzi deve regolarizzare la propria posizione seguendo il percorso formativo previsto, che include modulo teorico-tecnico e prova pratica documentata.",
  },
  {
    domanda: 'Qual è la differenza tra carroponte e gru a portale?',
    risposta: 'Sono due macchine distinte con percorsi formativi diversi. Il carroponte scorre su binari posizionati in quota, all\'interno di capannoni industriali, ed è comandato con pensile o radiocomando. La gru a portale scorre invece su binari a terra, sostenuta da quattro bracci. Chi utilizza entrambe le attrezzature deve frequentare entrambi i corsi.',
  },
  {
    domanda: 'Ogni quanto va rinnovato il corso per Addetti alla Conduzione di Carriponte?',
    risposta: "L'aggiornamento è obbligatorio ogni 5 anni, della durata di 4 ore. La mancata frequenza entro i termini previsti comporta la decadenza dell'abilitazione e l'impossibilità di operare legalmente sull'attrezzatura.",
  },
  {
    domanda: "L'attestato è valido in tutta Italia?",
    risposta: "Sì. L'attestato rilasciato al termine del corso è valido su tutto il territorio nazionale, in conformità con il nuovo Accordo Stato-Regioni e il D.Lgs. 81/08.",
  },
  {
    domanda: 'È possibile organizzare il corso direttamente in azienda?',
    risposta: 'Sì, con un minimo di 15 partecipanti. Alètheia può organizzare il corso presso la sede aziendale, inclusa la parte pratica. Contattaci per ricevere un preventivo personalizzato.',
  },
];

const moduli = [
  {
    titolo: "MODULO 1 - L'INCENDIO E LA PREVENZIONE INCENDI",
    durataOre: 1,
    argomenti: [
      'Principi della combustione',
      'Prodotti della combustione',
      "Le sostanze estinguenti in relazione al tipo di incendio",
      "Effetti dell'incendio sull'uomo",
      'Divieti e limitazioni di esercizio',
      'Misure comportamentali',
    ],
  },
  {
    titolo: 'MODULO 2 - PROTEZIONE ANTINCENDIO E PROCEDURE DA ADOTTARE IN CASO DI INCENDIO',
    durataOre: 1,
    argomenti: [
      'Principali misure di protezione antincendio',
      'Evacuazione in caso di incendio',
      'Chiamata dei soccorsi',
    ],
  },
  {
    titolo: 'MODULO 3 - ESERCITAZIONI PRATICHE',
    durataOre: 2,
    argomenti: [
      'Presa visione e chiarimenti sugli estintori portatili',
      "Esercitazioni sull'uso degli estintori portatili",
      "Presa visione del registro antincendio, chiarimenti ed esercitazione riguardante l'attività di sorveglianza",
    ],
  },
];

const corsiCorrelatiSlugs = [
  'carrelli-elevatori-semoventi-con-conduttore-a-bordo',
  'operatore-di-gru-per-autocarro',
  'p-l-e-con-e-senza-stabilizzatori',
  'formazione-dei-lavoratori-rischio-medio',
];

export default function CorsoCarriponte() {
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
    { titolo: 'Aggiornamento Carriponte', href: `/contatti?corso=${encodeURIComponent(AGGIORNAMENTO_TITLE)}`, image: CARRIPONTE_IMAGE, meta: '4 ore' },
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
        <title>{COURSE_TITLE} (11 ore) - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corso Addetti alla Conduzione di Carriponte, 11 ore, conforme al D.Lgs. 81/08 e al nuovo Accordo Stato-Regioni. Attestato valido in tutta Italia."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/all-courses" solid />

      <style jsx global>{`
        .cta-btn-primary-cp {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem;
          padding: 0.9rem 1.75rem; border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 800; font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-primary-cp:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }
        .cta-btn-whatsapp-cp {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem;
          padding: 0.9rem 1.75rem; border-radius: 999px; background: rgba(37,211,102,0.06);
          color: #25D366; font-weight: 700; font-size: 0.95rem; text-decoration: none;
          border: 1.5px solid rgba(37,211,102,0.5); transition: all 0.2s ease; font-family: inherit; cursor: pointer;
        }
        .cta-btn-whatsapp-cp:hover { background: rgba(37,211,102,0.1); }

        /* Standard architetturale unico per TUTTE le pagine corso: breadcrumb in cima alla colonna
           sinistra, due colonne 7fr/3fr con sidebar prezzo sticky (top-24) staccata di gap-16 dal
           contenuto. Su mobile/tablet colonna singola con il box prezzo prima delle tab. */
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
                <span className="text-slate-600 dark:text-gray-300">{COURSE_TITLE}</span>
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
                              { key: 'videoconferenza', label: 'Videoconferenza (solo parte teorica)' },
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
                              Vedi mappa <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.68rem' }}></i>
                            </a>
                          </div>
                        </div>
                      )}
                    </CourseSchedaTecnica>

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Descrizione del corso</h2>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Il corso è progettato in conformità con il D.Lgs. 81/08 e con le disposizioni del nuovo Accordo Stato-Regioni, garantendo agli operatori un&apos;abilitazione riconosciuta e valida su tutto il territorio nazionale. Il carroponte è la macchina destinata al sollevamento e allo spostamento di materiali e merci con movimenti ristretti e confinati. Non va confuso con la gru a portale, che scorre su binari posti diversi metri più in basso della struttura, sostenuta da quattro bracci: due macchine diverse, due modalità operative diverse, due percorsi formativi diversi.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Dal 24 maggio 2026 l&apos;abilitazione carroponte è regolata dal nuovo Accordo Stato-Regioni: non è più sufficiente una formazione interna gestita dal datore di lavoro — serve un percorso strutturato con modulo teorico e prova pratica documentata, valido su tutto il territorio nazionale. Il corso forma gli operatori a condurre in sicurezza il carroponte con comando pensile o radiocomando, riconoscere i rischi legati all&apos;ambiente di lavoro e alla movimentazione dei carichi, e rispettare tutti i requisiti previsti dalla normativa vigente.
                    </p>
                    <p className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                      Il percorso formativo include tecniche operative per la movimentazione carichi in sicurezza, con particolare attenzione alla valutazione della portata, alla scelta delle imbracature e alla gestione delle manovre in spazi ristretti. Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti. La parte teorica è disponibile anche in videoconferenza. La prova pratica deve essere svolta obbligatoriamente in presenza.
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
                      Programma Corso Addetti alla Conduzione di Carriponte · 11 ore
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
                buyHref={`/contatti?corso=${encodeURIComponent(COURSE_TITLE)}&tipo=preventivo`}
                buyLabel="Richiedi preventivo"
              />
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════ CORSI CORRELATI - carosello con frecce ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
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
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                  <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.85rem', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {c.meta || 'Decreto Attrezzature'}
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
