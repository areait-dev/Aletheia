import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CoursePricingSidebar from '../../components/CoursePricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

// TODO: VERIFICARE CADENZA AGGIORNAMENTO E INDIRIZZO MAPPA CON ALÈTHEIA
const MAPS_HREF = 'https://maps.google.com/?q=Vittoria+RG+Aletheia+Srl';

// Contenuti reali tratti dal programma corso ufficiale Alètheia: "CORSO DI FORMAZIONE PER PREPOSTI AI
// LAVORI SU STRADA - POSIZIONAMENTO DELLA SEGNALETICA STRADALE IN PRESENZA DI TRAFFICO VEICOLARE
// [14 ore]" (D.Lgs. 81/2008 s.m.i., D.Lgs. 295 30/04/92, D.P.R. 495 16/12/92, D.M. 22/01/2019 -
// Allegati I e II).
//
// Stessa architettura a switch usata in pompe-per-calcestruzzo.js, spazi-confinati.js, ecc., ma
// attualmente popolata con la sola configurazione "base" (Corso Lavoratori Addetti · 14 ore): non
// risulta ad oggi in listino un corso di aggiornamento dedicato per questa categoria. L'oggetto
// CONTENUTO e il componente restano pronti ad accogliere un'eventuale seconda chiave (es.
// "aggiornamento") senza modifiche strutturali — lo switcher a pillola si attiva automaticamente
// non appena CONTENUTO ha più di una voce (vedi ORDINE_SWITCH più sotto).
const CONTENUTO = {
  base: {
    title: "Corso Lavoratori Addetti all'Attività di Apposizione, Integrazione e Rimozione della Segnaletica Stradale",
    titleSuffix: '· 14 ore',
    breadcrumbLabel: 'Corso Segnaletica Stradale',
    titleSeo: 'Corso Addetti Segnaletica Stradale – 14h | Alètheia',
    metaDescription: 'Corso lavoratori addetti apposizione e rimozione segnaletica stradale, 14 ore, D.M. 22/01/2019. Attestato valido in Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '14 ore' },
      // TODO: VERIFICARE CADENZA AGGIORNAMENTO CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento periodico previsto dalla normativa' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il Corso di Formazione per Preposti ai Lavori su Strada - Posizionamento della Segnaletica Stradale in Presenza di Traffico Veicolare, della durata di 14 ore, è rivolto ai preposti che coordinano l'esecuzione di lavori su strada, ai sensi del D.Lgs. 81/2008 s.m.i., del D.Lgs. 295 del 30/04/1992, del D.P.R. 495 del 16/12/1992 e del D.M. 22/01/2019 (Allegati I e II).",
      "Il corso fornisce le competenze giuridico-normative sul Codice della Strada e sulla legislazione di sicurezza nei cantieri temporanei e mobili in presenza di traffico, e quelle tecniche sugli schemi segnaletici differenziati per categoria di strada, sui dispositivi di protezione individuale (indumenti ad alta visibilità) e sull'organizzazione del lavoro in squadra.",
      "Il percorso si articola in un modulo giuridico-normativo (3 ore), un modulo tecnico (5 ore), una prova di verifica intermedia a risposta multipla (1 ora, da svolgere prima del modulo pratico), un modulo pratico (4 ore) con simulazioni di installazione e rimozione della segnaletica su diverse categorie di strada, e una prova di verifica finale pratica (1 ora).",
    ],
    aChiERivolto: [
      'Lavoratori designati come preposti ai lavori su strada in presenza di traffico veicolare',
      'Addetti all\'apposizione, integrazione e rimozione della segnaletica stradale nei cantieri temporanei e mobili',
      'Datori di lavoro che devono garantire la formazione dei propri preposti ai sensi del D.M. 22/01/2019',
    ],
    cosaImparerai: [
      'Conoscere gli articoli del Codice della Strada relativi a opere, depositi e apertura di cantieri stradali',
      'Analizzare i rischi per i lavoratori e per gli utenti della strada in presenza di traffico',
      'Applicare gli schemi segnaletici differenziati per categoria di strada (A, B, C, D, E, F)',
      'Utilizzare correttamente i dispositivi di protezione individuale ad alta visibilità',
      'Organizzare il lavoro in squadra e gestire la comunicazione tra gli operatori',
      'Installare e rimuovere in sicurezza la segnaletica per cantieri fissi e cantieri mobili',
      'Gestire interventi in sicurezza in situazioni di emergenza',
      'Superare la prova di verifica intermedia e la prova pratica finale',
    ],
    faqs: [
      {
        domanda: 'Chi deve seguire questo corso sulla segnaletica stradale?',
        risposta: "Il corso è rivolto ai preposti ai lavori su strada e agli addetti all'apposizione, integrazione e rimozione della segnaletica stradale nei cantieri in presenza di traffico veicolare, ai sensi del D.M. 22/01/2019.",
      },
      {
        domanda: 'Quanto dura il corso e come si articola?',
        risposta: 'Il corso dura 14 ore complessive: modulo giuridico-normativo (3 ore), modulo tecnico (5 ore), prova di verifica intermedia (1 ora), modulo pratico (4 ore) e prova di verifica finale pratica (1 ora).',
      },
      {
        domanda: 'Sono previste prove di verifica durante il corso?',
        risposta: 'Sì, il programma prevede una prova intermedia a questionario a risposta multipla prima del modulo pratico e una prova pratica di verifica finale.',
      },
    ],
    programmaTitle: "Programma Corso Lavoratori Addetti all'Attività di Apposizione, Integrazione e Rimozione della Segnaletica Stradale · 14 ore",
    moduli: [
      {
        titolo: 'MODULO I - GIURIDICO NORMATIVO',
        durataOre: 3,
        argomenti: [
          "Articoli del Codice della Strada e del regolamento di attuazione su esecuzione di opere, depositi e apertura di cantieri",
          'Legislazione generale di sicurezza nei cantieri temporanei e mobili in presenza di traffico',
          "Analisi dei rischi per i lavoratori in presenza di traffico e per gli utenti della strada",
          'Statistiche degli infortuni e delle violazioni delle norme nei cantieri stradali',
        ],
      },
      {
        titolo: 'MODULO II - TECNICO',
        durataOre: 5,
        argomenti: [
          'Disciplinare tecnico sugli schemi segnaletici differenziati per categoria di strada',
          'Dispositivi di protezione individuale: indumenti ad alta visibilità',
          'Organizzazione del lavoro in squadra, compiti degli operatori e modalità di comunicazione',
          'Norme operative e comportamentali per interventi programmati e di emergenza (Allegato I D.M. 22/01/2019)',
        ],
      },
      {
        titolo: 'PROVA INTERMEDIA - QUESTIONARIO A RISPOSTA MULTIPLA',
        durataOre: 1,
        argomenti: [
          'Prova di verifica intermedia, da effettuarsi prima del modulo pratico',
        ],
      },
      {
        titolo: 'MODULO III - PRATICO',
        durataOre: 4,
        argomenti: [
          'Tecniche di installazione e rimozione della segnaletica su strade di tipo A, B, D (autostrade, extraurbane principali, urbane di scorrimento)',
          'Tecniche su strade di tipo C, F (extraurbane secondarie e locali extraurbane)',
          'Tecniche su strade di tipo E, F (urbane di quartiere e locali urbane)',
          'Tecniche di intervento mediante "cantieri mobili"',
          'Tecniche di intervento in sicurezza per situazioni di emergenza',
        ],
      },
      {
        titolo: 'PROVA DI VERIFICA FINALE - PROVA PRATICA',
        durataOre: 1,
        argomenti: [
          'Prova pratica di verifica finale',
        ],
      },
    ],
    prezzo: [
      { label: 'Aula', value: '€ 150,00 + IVA' },
    ],
    prezzoNumerico: 150,
  },
};

// Etichette pillola per lo switcher; usata solo se/quando CONTENUTO avrà più di una chiave.
const PILL_LABEL = {
  base: 'Corso Lavoratori Addetti · 14 ore',
};
const ORDINE_SWITCH = Object.keys(CONTENUTO);

const corsiCorrelatiSlugs = [
  'coordinatori-cantieri-cse-csp',
  'lavori-in-quota',
  'formazione-dei-lavoratori-rischio-medio',
];

export default function CorsoSegnaleticaStradale() {
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
          grid-template-areas: "top" "scheda" "info" "tabs";
          gap: 1.5rem;
          align-items: start;
        }
        @media (min-width: 992px) {
          .cp-page-grid {
            grid-template-columns: minmax(0, 7fr) minmax(0, 3fr); /* 70% / 30% */
            grid-template-areas: "top ." "scheda info" "tabs info";
            column-gap: 3.5rem;
            row-gap: 1.25rem;
          }
        }
        .cp-top-area { grid-area: top; min-width: 0; }
        .cp-scheda-area { grid-area: scheda; min-width: 0; }
        .cp-tabs-area { grid-area: tabs; min-width: 0; }
        .cp-info-area { grid-area: info; min-width: 0; }
        @media (min-width: 992px) {
          .cp-info-area { position: sticky; top: 7rem; align-self: start; }
        }

        .cp-scheda-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (max-width: 560px) { .cp-scheda-grid { grid-template-columns: 1fr; } }

        .cp-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid; flex-wrap: wrap; }

        .cp-placeholder-block {
          border: 1px dashed; border-radius: 0.75rem; padding: 1rem 1.25rem;
          font-size: 0.85rem; font-style: italic;
        }

        .cp-carousel-track {
          display: flex; gap: 1.25rem; overflow-x: auto; scroll-snap-type: x mandatory;
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

        .corso-correlato-card { flex: 0 0 260px; scroll-snap-align: start; }
        @media (min-width: 1024px) { .corso-correlato-card { flex: 0 0 calc((100% - 3 * 1.25rem) / 4); } }
        .corso-correlato-card:hover { box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14); }
        .dark .corso-correlato-card:hover { box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45); }
      `}</style>

      {/* ══════════════ TAB (colonna sinistra) & BOX PREZZO STICKY (colonna destra) ══════════════ */}
      <section className="bg-white dark:bg-dark-bg" style={{ paddingTop: '120px', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="cp-page-grid">

            {/* ── AREA "top": breadcrumb + H1 (+ switch, visibile solo se in futuro CONTENUTO avrà
                più di una variante — es. un aggiornamento dedicato) ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/lavoratori-addetti-all-attivita-di-apposizione-integrazione-e-rimozione-della-segnaletica-stradale" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Segnaletica Stradale</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">{c.breadcrumbLabel}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {c.title} <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {ORDINE_SWITCH.length > 1 && (
                <div role="tablist" aria-label="Variante del corso" style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25rem', background: '#F1F5F9', borderRadius: '9999px', padding: '0.25rem' }}>
                  {ORDINE_SWITCH.map((tipo) => (
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
                      {PILL_LABEL[tipo]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── AREA "scheda": scheda tecnica scura, sotto il titolo/switch, allineata alla sidebar ── */}
            <div className="cp-scheda-area">
              {/* Solo modalità Aula: Videoconferenza e FAD non sono attive/selezionabili per questo corso. */}
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
                    {/* TODO: VERIFICARE AGGIORNAMENTO, CADENZA, INDIRIZZO MAPPA CON ALÈTHEIA */}
                    <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#6EE7B7' }}>
                      Sede Alètheia S.r.l., Vittoria (RG) <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.68rem' }}></i>
                    </a>
                  </div>
                </div>
              </CourseSchedaTecnica>
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
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Descrizione del corso</h2>
                    {c.descrizione.map((paragrafo, i) => (
                      <p key={i} className="text-slate-600 dark:text-gray-300" style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>{paragrafo}</p>
                    ))}

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2rem 0 1rem' }}>A chi è rivolto</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {c.aChiERivolto.map((riga) => (
                        <li key={riga} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <i className="fas fa-user-check" style={{ color: '#008C95', marginTop: '0.2rem' }}></i>
                          <span className="text-slate-600 dark:text-gray-300">{riga}</span>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Cosa imparerai</h2>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {c.cosaImparerai.map((riga) => (
                        <li key={riga} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <i className="fas fa-check-circle" style={{ color: '#008C95', marginTop: '0.2rem' }}></i>
                          <span className="text-slate-600 dark:text-gray-300">{riga}</span>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Domande frequenti</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {c.faqs.map((item, i) => {
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
                      {c.programmaTitle}
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400" style={{ marginBottom: '1.5rem' }}>
                      Il corso è strutturato in {c.moduli.length} moduli/prove.
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
                          {c.moduli.map((m) => (
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

            {/* SIDEBAR PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su
                mobile/tablet, allineata alla scheda tecnica. */}
            <aside className="cp-info-area">
              <CoursePricingSidebar
                primaryHref={`/contatti?corso=${encodeURIComponent(c.title)}&tipo=preventivo`}
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Segnaletica%20Stradale"
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
            {corsiCorrelatiResolti.map((cc) => (
              <Link
                key={cc.href}
                href={cc.href}
                className="corso-correlato-card group bg-white dark:bg-dark-card rounded-3xl overflow-hidden no-underline flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}
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
                    <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)' }}>
                      <i className="fas fa-graduation-cap" style={{ fontSize: '2rem', color: 'rgba(110,231,183,0.5)' }}></i>
                    </div>
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
