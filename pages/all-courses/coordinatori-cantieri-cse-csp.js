import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

// Contenuto switchabile Corso base (120h) / Aggiornamento (40h) - stesso pattern del pill "Corso base /
// Aggiornamento" usato nel template dinamico (pages/all-courses/[slug].js) e in formazione-del-preposto.js:
// cambia scheda tecnica, testi, moduli e box prezzo nella sidebar in base al tipo selezionato.
const CONTENUTO = {
  corso: {
    titleSuffix: '· 120 ore',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '120 ore' },
      { icon: 'fas fa-video', label: 'Modalità', value: 'Videoconferenza (aula e FAD non disponibili)' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: "Da mantenere con l'aggiornamento periodico (40 ore)" },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
      { icon: 'fas fa-location-dot', label: 'Luogo del corso', value: 'Non applicabile — corso in videoconferenza' },
    ],
    descrizione: [
      "Il Corso di Formazione per Coordinatori della Sicurezza nelle Fasi di Progettazione ed Esecuzione dei Lavori (CSP-CSE), della durata di 120 ore, è obbligatorio ai sensi dell'art. 98 e dell'Allegato XIV del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, per chi intende assumere l'incarico di coordinatore della sicurezza nei cantieri temporanei o mobili.",
      "Il Coordinatore per la Progettazione (CSP) e il Coordinatore per l'Esecuzione dei Lavori (CSE) sono le figure che, nei cantieri con presenza di più imprese, hanno il compito di redigere il Piano di Sicurezza e Coordinamento (PSC), coordinare le attività delle diverse imprese esecutrici e vigilare sull'applicazione delle misure di sicurezza durante l'esecuzione dell'opera. Si tratta di un ruolo di elevata responsabilità, che richiede competenze giuridiche, tecniche, metodologiche e relazionali approfondite.",
      "Il corso, tra i più estesi previsti dalla normativa sulla sicurezza, si articola in otto moduli: due moduli giuridici (28 ore complessive) su normativa generale e specifica dei cantieri; due moduli tecnici (52 ore complessive) su rischi di caduta dall'alto, ponteggi, organizzazione del cantiere, rischi da macchine, attrezzature, sostanze chimiche, amianto e agenti fisici e biologici; due moduli metodologico-organizzativi (16 ore complessive) sull'elaborazione del PSC, del POS e del fascicolo, e su tecniche di comunicazione e gestione dei rapporti con committenza e progettisti; due moduli pratici (24 ore complessive) con stesura reale di Piani di Sicurezza e Coordinamento e simulazioni sul ruolo del coordinatore in fase di esecuzione.",
      "Il corso si svolge interamente in videoconferenza sincrona con il docente, la modalità prevista per questo corso secondo il listino Alètheia. Data l'ampiezza dei contenuti e la centralità della parte pratica di stesura dei documenti di cantiere, il percorso è pensato per fornire competenze immediatamente spendibili nel ruolo di coordinatore.",
    ],
    aChiERivolto: [
      'Chi intende svolgere il ruolo di Coordinatore per la Progettazione (CSP)',
      "Tecnici che intendono svolgere il ruolo di Coordinatore per l'Esecuzione dei Lavori (CSE) nei cantieri temporanei o mobili",
      'Professionisti che operano nel settore delle costruzioni e vogliono ampliare le proprie competenze in materia di sicurezza nei cantieri',
      'Datori di lavoro e imprese edili che vogliono formare internamente una figura qualificata come coordinatore della sicurezza',
    ],
    cosaImparerai: [
      'Applicare la legislazione di base e specifica in materia di sicurezza nei cantieri temporanei e mobili e nei lavori in quota',
      "Riconoscere i rischi di caduta dall'alto e gestire correttamente ponteggi e opere provvisionali",
      'Organizzare in sicurezza il cantiere e predisporre il cronoprogramma dei lavori',
      'Valutare i rischi legati a macchine, attrezzature, sostanze chimiche, amianto, agenti fisici e biologici in cantiere',
      "Elaborare contenuti e criteri metodologici del Piano di Sicurezza e Coordinamento (PSC), del Piano Sostitutivo di Sicurezza e del Piano Operativo di Sicurezza (POS)",
      "Elaborare il fascicolo dell'opera e il PIMUS, e stimare i costi della sicurezza",
      'Applicare tecniche di comunicazione, gestione dei gruppi e leadership nei rapporti con committenza, progettisti, direzione lavori e RLS',
      'Redigere concretamente un Piano di Sicurezza e Coordinamento e simulare il ruolo di coordinatore in fase di esecuzione',
    ],
    faqs: [
      {
        domanda: 'Che differenza c\'è tra CSP e CSE?',
        risposta: 'Il CSP opera nella fase di progettazione dell\'opera; il CSE opera durante l\'esecuzione dei lavori vigilando sulla sicurezza in cantiere. Questo corso abilita a entrambi i ruoli.',
      },
      {
        domanda: 'Quanto dura il corso Coordinatori CSE-CSP?',
        risposta: 'Il corso dura 120 ore complessive, suddivise in moduli teorici, tecnici e pratici.',
      },
      {
        domanda: 'Il corso si può fare in aula?',
        risposta: 'No, secondo il listino Alètheia questo modulo da 120 ore è disponibile solo in videoconferenza sincrona.',
      },
      {
        domanda: 'Il corso include la stesura pratica di un Piano di Sicurezza e Coordinamento?',
        risposta: 'Sì, gli ultimi moduli pratici (24 ore totali) prevedono la stesura reale di PSC e simulazioni operative.',
      },
      {
        domanda: 'Dopo il corso CSE-CSP serve un aggiornamento periodico?',
        risposta: 'Sì, è obbligatorio un corso di aggiornamento dedicato di 40 ore.',
      },
    ],
    programmaTitle: 'Programma Corso Coordinatori CSE-CSP · 120 ore',
    moduli: [
      {
        titolo: 'MODULI GIURIDICI (I-II)',
        durataOre: 28,
        argomenti: ['Normativa generale sulla sicurezza nei cantieri', 'Normativa specifica di settore (Titolo IV D.Lgs 81/08)'],
      },
      {
        titolo: 'MODULI TECNICI (III-IV)',
        durataOre: 52,
        argomenti: [
          "Rischi di caduta dall'alto e ponteggi",
          'Organizzazione del cantiere',
          'Rischi da macchine, attrezzature e sostanze chimiche',
          'Amianto, agenti fisici e biologici',
        ],
      },
      {
        titolo: 'MODULI METODOLOGICO-ORGANIZZATIVI (V-VI)',
        durataOre: 16,
        argomenti: [
          "Elaborazione del PSC, del POS e del fascicolo dell'opera",
          'Tecniche di comunicazione e gestione dei rapporti con committenza e progettisti',
        ],
      },
      {
        titolo: 'MODULI PRATICI (VII-VIII)',
        durataOre: 24,
        argomenti: ['Stesura reale di un Piano di Sicurezza e Coordinamento', 'Simulazioni sul ruolo del coordinatore in fase di esecuzione'],
      },
    ],
    prezzo: [
      { label: 'Videoconferenza', value: '€ 500,00 + IVA' },
    ],
    prezzoNumerico: 500,
  },

  aggiornamento: {
    titleSuffix: '· 40 ore',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '40 ore' },
      { icon: 'fas fa-laptop', label: 'Modalità', value: 'FAD (aula e videoconferenza non disponibili)' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: "Da ripetere periodicamente ai sensi dell'art. 98 e dell'Allegato XIV del D.Lgs 81/2008" },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
      { icon: 'fas fa-location-dot', label: 'Luogo del corso', value: 'Non applicabile — corso interamente in FAD' },
    ],
    descrizione: [
      "Questo è il corso di aggiornamento per Coordinatori della Sicurezza nelle Fasi di Progettazione ed Esecuzione dei Lavori (CSP-CSE), della durata di 40 ore, non il corso base: è rivolto a chi ha già conseguito l'attestato di formazione iniziale di 120 ore e deve rinnovarlo periodicamente, ai sensi dell'art. 98 e dell'Allegato XIV del D.Lgs 81/2008.",
      "L'aggiornamento periodico è obbligatorio perché il ruolo di coordinatore della sicurezza richiede un costante allineamento a normative tecniche, novità legislative e casistiche reali che evolvono nel tempo: chi coordina la sicurezza nei cantieri deve rimanere aggiornato su piani di sicurezza, gestione degli infortuni, attrezzature di lavoro e protezione da agenti fisici e sostanze pericolose, per continuare a esercitare correttamente questo ruolo di elevata responsabilità.",
      "Il corso si articola in otto moduli: il Piano di Sicurezza e Coordinamento (8 ore), con analisi dell'art. 100 e dell'allegato XV del D.Lgs 81/08 e dell'apparato sanzionatorio; PIMUS, ponteggi e opere provvisionali (5 ore); infortunio e malattia professionale (5 ore), con analisi di casi reali; norme di organizzazione del cantiere e DPI (5 ore); protezione da agenti fisici e sostanze pericolose (5 ore), inclusi agenti cancerogeni e mutageni; attrezzature di lavoro (4 ore); spazi e ambienti confinati (4 ore), ai sensi del D.P.R. 177/2011; e il sopralluogo in cantiere (4 ore), con esempi di verbali.",
      "Il corso è pensato per chi ha già l'attestato CSP-CSE in scadenza. Chi invece non ha mai conseguito la formazione di base di 120 ore deve frequentare il corso completo, non l'aggiornamento. Il corso si svolge interamente in FAD, la modalità prevista per questo corso secondo il listino Alètheia.",
    ],
    aChiERivolto: [
      'Coordinatori della Sicurezza (CSP e CSE) già formati (attestato di 120 ore) con formazione in scadenza',
      'Ingegneri, architetti, geometri e altri tecnici già abilitati come coordinatori della sicurezza nei cantieri',
      'Professionisti che devono mantenere aggiornata la propria abilitazione per continuare a operare come coordinatori della sicurezza',
      "Attenzione: chi non ha mai conseguito l'attestato di formazione iniziale di 120 ore deve prima frequentare il corso base, non l'aggiornamento",
    ],
    cosaImparerai: [
      "Aggiornarsi sull'art. 100 e sull'allegato XV del D.Lgs 81/08 relativi ai contenuti minimi del PSC",
      "Approfondire il Piano Sostitutivo di Sicurezza e l'apparato sanzionatorio previsto dal D.Lgs 81/08",
      'Aggiornare le competenze su PIMUS, ponteggi, opere provvisionali e redazione del progetto esecutivo',
      'Analizzare casi reali di infortunio e malattia professionale alla luce della normativa INAIL',
      'Aggiornarsi sulle novità legislative in materia di organizzazione del cantiere e dispositivi di protezione individuale',
      'Gestire la protezione da agenti fisici, agenti cancerogeni, mutageni e sostanze pericolose',
      'Applicare la normativa aggiornata su attrezzature di lavoro e direttiva macchine',
      'Gestire spazi e ambienti confinati ai sensi del D.P.R. 177/2011 ed effettuare correttamente il sopralluogo in cantiere',
    ],
    faqs: [
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
    ],
    programmaTitle: 'Programma Aggiornamento Coordinatori CSE-CSP · 40 ore',
    moduli: [
      { titolo: 'PIANO DI SICUREZZA E COORDINAMENTO', durataOre: 8, argomenti: ["Art. 100 e Allegato XV del D.Lgs 81/08", 'Apparato sanzionatorio'] },
      { titolo: 'PIMUS, PONTEGGI E OPERE PROVVISIONALI', durataOre: 5, argomenti: ['Redazione del progetto esecutivo', 'Aggiornamenti normativi'] },
      { titolo: 'INFORTUNIO E MALATTIA PROFESSIONALE', durataOre: 5, argomenti: ['Analisi di casi reali', 'Normativa INAIL'] },
      { titolo: 'NORME DI ORGANIZZAZIONE DEL CANTIERE E DPI', durataOre: 5, argomenti: ['Novità legislative', 'Dispositivi di protezione individuale'] },
      { titolo: 'PROTEZIONE DA AGENTI FISICI E SOSTANZE PERICOLOSE', durataOre: 5, argomenti: ['Agenti cancerogeni e mutageni', 'Sostanze pericolose'] },
      { titolo: 'ATTREZZATURE DI LAVORO', durataOre: 4, argomenti: ['Normativa aggiornata', 'Direttiva macchine'] },
      { titolo: 'SPAZI E AMBIENTI CONFINATI', durataOre: 4, argomenti: ['D.P.R. 177/2011'] },
      { titolo: 'SOPRALLUOGO IN CANTIERE', durataOre: 4, argomenti: ['Esempi di verbali'] },
    ],
    prezzo: [
      { label: 'FAD', value: '€ 240,00 + IVA' },
    ],
    prezzoNumerico: 240,
  },
};

const corsiCorrelatiSlugs = [
  'pimus-ponteggi',
  'lavori-in-quota',
  'rspp-datore-di-lavoro-modulo-3-costruzioni',
];

export default function CorsoCoordinatoriCseCsp() {
  const [selectedTipo, setSelectedTipo] = useState('corso');
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const carouselRef = useRef(null);

  const c = CONTENUTO[selectedTipo];

  const selectTipo = (tipo) => {
    setSelectedTipo(tipo);
    setOpenFaqIndex(null);
  };

  const families = buildCourseFamilies(coursesData, {}, { quiet: true });
  const corsiCorrelati = corsiCorrelatiSlugs
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
        <title>Corso Coordinatori Sicurezza CSE-CSP – 120h | Alètheia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corso Coordinatori Sicurezza Cantieri CSE-CSP, 120 ore in videoconferenza, art. 98 D.Lgs 81/2008. Attestato valido in Italia. Alètheia, Vittoria (RG)."
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
                <span className="text-slate-600 dark:text-gray-300">{selectedTipo === 'corso' ? 'Corso CSE-CSP' : 'Aggiornamento CSE-CSP'}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {selectedTipo === 'corso' ? 'Corso di Formazione per ' : 'Aggiornamento '}Coordinatori della Sicurezza nelle Fasi di Progettazione ed Esecuzione dei Lavori (CSP-CSE) <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {/* SWITCH Corso base / Aggiornamento - stesso pattern a pillola del template dinamico corsi */}
              <div role="tablist" aria-label="Corso o aggiornamento" style={{ display: 'inline-flex', gap: '0.25rem', background: '#F1F5F9', borderRadius: '9999px', padding: '0.25rem' }}>
                {['corso', 'aggiornamento'].map((tipo) => (
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
                    {tipo === 'corso' ? 'Corso base · 120 ore' : 'Aggiornamento · 40 ore'}
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
                    {/* SCHEDA TECNICA: apre sempre il tab Panoramica, cambia con il tipo selezionato */}
                    <CourseSchedaTecnica items={c.schedaTecnica} />

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
                      Il corso è strutturato in {c.moduli.length} moduli.
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

            {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet.
                Cambia riga prezzo/label in base al tipo selezionato nello switch qui sopra. */}
            <aside className="cp-price-area">
              <PricingSidebar
                buyHref={`/contatti?corso=${encodeURIComponent('Coordinatori Cantieri CSE-CSP')}&tipo=preventivo`}
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
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                  <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.85rem', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {cc.meta || 'Sicurezza sul Lavoro'}
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
