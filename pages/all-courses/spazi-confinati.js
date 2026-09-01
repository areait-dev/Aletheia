import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

// TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
const MAPS_HREF = 'https://maps.google.com/?q=Vittoria+RG+Aletheia+Srl';

// Stesso pattern a pillola già usato in patentino-fitosanitario.js, pes-pav-lavori-elettrici.js,
// formazione-del-preposto.js: cambia scheda tecnica, testi, FAQ e box prezzo nella sidebar in base
// alla variante selezionata (Corso Base 12h / Aggiornamento 4h). Solo modalità Aula: Videoconferenza
// e FAD sono disattivate/nascoste per questo corso.
const CONTENUTO = {
  base: {
    title: 'Corso Spazi Confinati o Sospetti di Inquinamento',
    titleSuffix: '· 12 ore',
    breadcrumbLabel: 'Corso Spazi Confinati',
    titleSeo: 'Corso Spazi Confinati – 12 ore | Alètheia',
    metaDescription: 'Corso ambienti sospetti di inquinamento e spazi confinati, 12 ore, D.P.R. 177/2011. Attestato valido in Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '12 ore' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento ogni 5 anni ai sensi del D.P.R. 177/2011' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il Corso di Formazione per Lavoratori, Datori di Lavoro e Lavoratori Autonomi che Operano in Ambienti Sospetti di Inquinamento o Confinati, della durata di 12 ore, è obbligatorio ai sensi degli artt. 37, 66 e 121 del D.Lgs 81/2008, dell'art. 2, lett. d), del D.P.R. n. 177 del 14 settembre 2011 e dell'Accordo Stato Regioni del 17 aprile 2025.",
      "Gli ambienti confinati o sospetti di inquinamento — come cisterne, silos, pozzi, fogne, vasche, serbatoi e vani interrati — sono tra i contesti di lavoro più pericolosi in assoluto: atmosfere con difetto o eccesso di ossigeno, presenza di agenti chimici pericolosi per asfissia o intossicazione, rischio di esplosione e incendio, seppellimento e cadute dall'alto rendono necessaria una formazione approfondita.",
      "Il corso si articola in due moduli: il Modulo I teorico (4 ore), focalizzato su normativa, identificazione dei rischi e procedure di ingresso; il Modulo II pratico (8 ore), con simulazioni reali su dispositivi e strumentazione (DPI, APVR, imbracature, tripode, rilevatori di gas, misuratori di esplosività) e procedure di recupero infortunato.",
    ],
    aChiERivolto: [
      'Lavoratori che accedono a cisterne, silos, pozzi, fogne, vasche o serbatoi',
      'Datori di lavoro che operano personalmente in ambienti sospetti di inquinamento o confinati',
      'Lavoratori autonomi che svolgono attività in spazi confinati',
      'Addetti di aziende agricole, industriali, edili e di manutenzione',
    ],
    cosaImparerai: [
      'Applicare la normativa di riferimento in materia di ambienti confinati (D.P.R. 177/2011)',
      'Identificare correttamente i rischi specifici (atmosfere pericolose, anossia, esplosioni)',
      'Utilizzare correttamente DPI specifici, APVR, imbracature di sicurezza e tripode di recupero',
      'Utilizzare rilevatori di gas e misuratori di esplosività per il monitoraggio ambientale statico e dinamico',
    ],
    faqs: [
      {
        domanda: 'Cosa si intende per ambiente confinato o sospetto di inquinamento?',
        risposta: 'Sono spazi con aperture limitate di accesso e uscita, ventilazione naturale sfavorevole, non progettati per la permanenza continuativa (es. cisterne, silos, pozzi, fogne).',
      },
      {
        domanda: 'Quanto dura il corso spazi confinati?',
        risposta: 'Il corso dura 12 ore complessive: 4 ore di modulo teorico sulla normativa e sui rischi specifici, e 8 ore di modulo pratico con simulazioni.',
      },
    ],
    programmaTitle: 'Programma Corso Spazi Confinati o Sospetti di Inquinamento · 12 ore',
    moduli: [
      {
        titolo: 'MODULO I - TEORICO',
        durataOre: 4,
        argomenti: [
          'Normativa di riferimento (D.P.R. 177/2011, artt. 37, 66 e 121 D.Lgs 81/2008)',
          'Identificazione e classificazione dei rischi negli ambienti confinati',
          'Procedure di ingresso e permessi di lavoro',
        ],
      },
      {
        titolo: 'MODULO II - PRATICO',
        durataOre: 8,
        argomenti: [
          'Simulazioni con DPI, APVR, imbracature e tripode di recupero',
          'Utilizzo di rilevatori di gas e misuratori di esplosività',
          'Monitoraggio ambientale statico e dinamico',
          'Procedure di recupero infortunato',
        ],
      },
    ],
    prezzo: [
      { label: 'Aula', value: '€ 280,00 + IVA' },
    ],
    prezzoNumerico: 280,
  },

  aggiornamento: {
    title: 'Aggiornamento Abilitante per Lavori in Spazi Confinati',
    titleSuffix: '· 4 ore',
    breadcrumbLabel: 'Aggiornamento Spazi Confinati',
    titleSeo: 'Aggiornamento Spazi Confinati – 4 ore | Alètheia',
    metaDescription: 'Aggiornamento ambienti sospetti di inquinamento e spazi confinati, 4 ore, D.P.R. 177/2011. Attestato valido in Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '4 ore (2 ore teoria + 2 ore pratica)' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da ripetere ogni 5 anni ai sensi del D.P.R. 177/2011' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Questo è il corso di aggiornamento abilitante per lavori in ambienti sospetti di inquinamento e spazi confinati, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale di 12 ore e deve rinnovarlo prima della scadenza, ai sensi degli artt. 37, 66 e 121 del D.Lgs 81/2008, del D.P.R. 177/2011 e dell'Accordo Stato Regioni del 17 aprile 2025.",
      "L'aggiornamento periodico è obbligatorio perché operare in ambienti confinati comporta rischi che richiedono un costante allineamento a normative, procedure e strumentazione: la gestione delle emergenze in spazi ad accesso limitato richiede un richiamo pratico periodico.",
      "Il corso è erogato in un modulo unico di 4 ore suddiviso in: 2 ore di teoria (richiamo normativo, check-list di ingresso, analisi rischi più frequenti come anossia e fumi) e 2 ore di pratica (esercitazioni con DPI, APVR, imbracature, tripode, gestione del soccorso con tecniche di primo soccorso e BLS).",
    ],
    aChiERivolto: [
      'Lavoratori già formati (attestato di 12 ore) con formazione in scadenza o scaduta da poco',
      'Datori di lavoro e lavoratori autonomi già abilitati che devono rinnovare il certificato',
      "Aziende che devono garantire l'aggiornamento periodico quinquennale del personale",
    ],
    cosaImparerai: [
      'Richiamare i principi generali della normativa di riferimento su spazi confinati',
      "Aggiornare l'uso delle check list per l'ingresso in spazi confinati e la valutazione della sicurezza della scena",
      'Consolidare le tecniche di gestione del soccorso e primo soccorso, incluso il BLS',
      "Aggiornare l'utilizzo pratico di DPI, APVR, imbracature di sicurezza, tripode e rilevatori",
    ],
    faqs: [
      {
        domanda: "Ogni quanto va rinnovato l'attestato spazi confinati?",
        risposta: "L'attestato per lavori in ambienti confinati e spazi sospetti di inquinamento va aggiornato ogni 5 anni.",
      },
      {
        domanda: "L'aggiornamento tratta anche le tecniche di primo soccorso?",
        risposta: 'Sì, il programma include la gestione del soccorso con tecniche di primo soccorso e manovre di BLS per il recupero dell\'operatore.',
      },
      {
        domanda: "Posso fare l'aggiornamento se il mio attestato è scaduto da tempo?",
        risposta: "Se l'attestato è scaduto da troppo tempo, l'aggiornamento da solo potrebbe non bastare ed è necessario rifare il corso base di 12 ore.",
      },
    ],
    programmaTitle: 'Programma Aggiornamento Abilitante per Lavori in Spazi Confinati · 4 ore',
    moduli: [
      {
        titolo: 'MODULO UNICO - TEORICO E PRATICO',
        durataOre: 4,
        argomenti: [
          'Richiamo normativo e check-list di ingresso (2 ore di teoria)',
          'Analisi dei rischi più frequenti: anossia, fumi',
          'Esercitazioni con DPI, APVR, imbracature e tripode (2 ore di pratica)',
          'Gestione del soccorso con tecniche di primo soccorso e BLS',
        ],
      },
    ],
    prezzo: [
      { label: 'Aula', value: '€ 160,00 + IVA' },
    ],
    prezzoNumerico: 160,
  },
};

const corsiCorrelatiSlugs = [
  'lavori-in-quota',
  'formazione-dei-lavoratori-rischio-alto',
  'coordinatori-cantieri-cse-csp',
];

export default function CorsoSpaziConfinati() {
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
    .map((c2) => {
      const slug = c2.href.split('/').pop();
      const fam = families.find((f) => f.slug === slug);
      return { ...c2, image: fam?.image || null };
    });

  const corsiCorrelati = corsiCorrelatiResolti;

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
                <Link href="/all-courses/spazi-confinati" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Spazi Confinati</Link>
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
                    {tipo === 'base' ? 'Corso Spazi Confinati · 12 ore' : 'Aggiornamento · 4 ore'}
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
                    <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>
                      {c.programmaTitle}
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400" style={{ marginBottom: '1.5rem' }}>
                      Il corso è strutturato in {c.moduli.length} {c.moduli.length === 1 ? 'modulo' : 'moduli'} per un totale di {c.moduli.reduce((tot, m) => tot + m.durataOre, 0)} ore
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
                          {c.moduli.map((modulo, i) => (
                            <tr key={i} className="border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
                              <td className="text-slate-900 dark:text-white" style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.9rem', verticalAlign: 'top' }}>{modulo.titolo}</td>
                              <td style={{ padding: '1rem 1.25rem', color: '#008C95', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                                {modulo.durataOre} {modulo.durataOre === 1 ? 'ora' : 'ore'}
                              </td>
                              <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                  {modulo.argomenti.map((arg, j) => (
                                    <li key={j} className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.85rem' }}>{arg}</li>
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

            {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet.
                Cambia riga prezzo/label in base alla variante selezionata nello switch qui sopra. */}
            <aside className="cp-price-area">
              <PricingSidebar
                buyHref={`/contatti?corso=${encodeURIComponent(c.title)}&tipo=preventivo`}
                buyLabel="Richiedi preventivo"
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Ambiente%20e%20Spazi%20Confinati"
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
            {corsiCorrelati.map((cc) => (
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
