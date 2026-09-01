import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

const MAPS_HREF = 'https://maps.google.com/?q=Via+del+Carrubo+Vittoria+RG';

// Stesso pattern a pillola già usato in formazione-del-preposto.js, operatore-di-gru-per-autocarro.js,
// spazi-confinati.js: cambia scheda tecnica, testi, FAQ, moduli e box prezzo nella sidebar in base alla
// variante selezionata (Corso Base 10h / Aggiornamento 4h).
const CONTENUTO = {
  base: {
    title: 'Corso Addetti alla Conduzione di Carriponte',
    titleSuffix: '· 10 ore',
    breadcrumbLabel: 'Corso Carriponte',
    titleSeo: 'Corso Addetti alla Conduzione di Carriponte – 10 ore | Alètheia',
    metaDescription: "Corso addetti alla conduzione di carroponte/gru a cavalletto con comando pensile/radiocomando, 10 ore, art. 73 comma 5 D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).",
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '10 ore (4 ore teorico-tecnico, 6 ore pratica)' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento ogni 5 anni' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il Corso Addetti alla Conduzione di Carriponte/Gru a Cavalletto con Comando Pensile/Radiocomando, della durata di 10 ore, è obbligatorio ai sensi dell'art. 73 comma 5 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.",
      "Il carroponte è la macchina destinata al sollevamento e allo spostamento di materiali e merci con movimenti ristretti e confinati, tipica degli ambienti industriali. Non va confuso con la gru a portale, che scorre su binari a terra sostenuta da quattro bracci: due macchine diverse, due percorsi formativi diversi.",
      "Il corso si articola in un modulo teorico-tecnico (4 ore), su terminologia, componenti, dispositivi di comando e sicurezza, rischi connessi e segnaletica gestuale e acustica; e in una parte pratica su pensile/radiocomando (6 ore), con controlli pre-utilizzo, manovre a vuoto e con carico e imbracatura dei carichi.",
    ],
    aChiERivolto: [
      'Lavoratori che utilizzano carriponte e gru a cavalletto con comando pensile o radiocomando',
      'Operatori addetti al sollevamento e alla movimentazione di materiali in ambito industriale e produttivo',
      'Neoassunti privi di abilitazione',
      'Datori di lavoro che ricoprono personalmente il ruolo di operatore carroponte',
    ],
    cosaImparerai: [
      'Riconoscere terminologia, tipologie e componenti principali di carroponti e gru a cavalletto',
      'Identificare e utilizzare correttamente i dispositivi di comando (pensile, radiocomando, cabina) e di sicurezza',
      'Riconoscere i rischi connessi: oscillazione del carico, ribaltamento, urti, interferenze, uso improprio',
      'Interpretare targhette, tabelle tecniche e segnaletica gestuale e acustica',
      'Eseguire i controlli pre-utilizzo visivi e funzionali',
      'Eseguire manovre a vuoto e con carico e la corretta imbracatura dei carichi',
    ],
    faqs: [
      {
        domanda: 'Qual è la differenza tra carroponte e gru a portale?',
        risposta: "Sono due macchine distinte con percorsi formativi diversi. Il carroponte scorre su binari posizionati in quota, all'interno di capannoni industriali, ed è comandato con pensile o radiocomando. La gru a portale scorre invece su binari a terra, sostenuta da quattro bracci.",
      },
      {
        domanda: 'Quanto dura il corso carroponte?',
        risposta: 'Il corso dura 10 ore complessive: 4 ore di modulo teorico-tecnico e 6 ore di parte pratica su pensile/radiocomando.',
      },
      {
        domanda: 'Ogni quanto va rinnovato il corso?',
        risposta: "L'aggiornamento è obbligatorio ogni 5 anni, della durata di 4 ore.",
      },
      {
        domanda: "L'attestato è valido in tutta Italia?",
        risposta: "Sì, l'attestato rilasciato al termine del corso è valido su tutto il territorio nazionale, in conformità con l'Accordo Stato Regioni e il D.Lgs. 81/2008.",
      },
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Carriponte · 10 ore',
    moduli: [
      {
        titolo: 'MODULO TEORICO-TECNICO',
        durataOre: 4,
        argomenti: [
          'Terminologia, tipologie di carroponti e gru a cavalletto, movimenti e dispositivi di sollevamento',
          "Nozioni di fisica per stimare la massa di un carico e le condizioni di equilibrio",
          'Componenti principali: struttura metallica, meccanismi di traslazione e sollevamento, carrello, bozzello, gancio',
          'Dispositivi di comando e sicurezza: pensile, radiocomando, cabina, anticollisione, limitatori, indicatori',
          'Rischi connessi: oscillazione del carico, ribaltamento, urti, interferenze, uso improprio',
          'DPI da utilizzare',
          'Segnaletica gestuale e acustica; contenuti delle targhette e tabelle tecniche',
          'Imbracatura dei carichi; controlli ordinari e straordinari, registro di controllo',
        ],
      },
      {
        titolo: 'PARTE PRATICA - PENSILE/RADIOCOMANDO',
        durataOre: 6,
        argomenti: [
          'Identificazione dei componenti strutturali',
          'Comandi pensile/radiocomando: prove e differenze',
          'Verifica dei dispositivi di segnalazione e sicurezza',
          'Controlli pre-utilizzo visivi e funzionali',
          'Manovre a vuoto e con carico',
          'Valutazione del carico e tecniche di sollevamento',
          'Comandi da terra: sicurezza e corretto uso',
          'Imbracatura dei carichi',
        ],
      },
    ],
  },

  aggiornamento: {
    title: 'Aggiornamento Addetti alla Conduzione di Carriponte',
    titleSuffix: '· 4 ore',
    breadcrumbLabel: 'Aggiornamento Carriponte',
    titleSeo: 'Aggiornamento Carriponte – 4 ore | Alètheia',
    metaDescription: "Aggiornamento abilitante addetti all'uso del carroponte/gru a cavalletto con comando pensile/radiocomando, 4 ore, artt. 37 comma 7, 71 e 73 D.Lgs 81/2008. Attestato valido in Italia. Alètheia S.r.l., Vittoria (RG).",
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '4 ore (2 ore teoria, 2 ore pratica)' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da ripetere ogni 5 anni' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Questo è il corso di aggiornamento abilitante per addetti all'uso del carroponte/gru a cavalletto con comando pensile/radiocomando, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale e deve rinnovarlo prima della scadenza, ai sensi degli artt. 37 comma 7, 71 e 73 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.",
      "Il corso richiama i contenuti principali del corso base: definizioni e parametri dei componenti e degli accessori di sollevamento e imbracatura, rischi nell'uso degli apparecchi di sollevamento e relative misure di prevenzione, norme di sicurezza per l'imbracatura dei carichi e segnaletica di sicurezza.",
      "Il corso si articola in un modulo giuridico-normativo e tecnico (2 ore) e in un modulo pratico (2 ore), con individuazione dei componenti strutturali e dei dispositivi di comando, controlli pre-utilizzo e movimentazione del carico.",
    ],
    aChiERivolto: [
      'Lavoratori già formati con attestato in scadenza o scaduto da poco',
      'Operatori addetti al sollevamento e alla movimentazione di materiali già abilitati',
      'Datori di lavoro che devono garantire l\'aggiornamento periodico degli operatori',
    ],
    cosaImparerai: [
      'Richiamare le definizioni dei componenti delle gru a portale e degli accessori di sollevamento e imbracatura',
      "Consolidare la conoscenza dei rischi nell'uso degli apparecchi di sollevamento e le relative misure di prevenzione",
      'Aggiornare le norme di sicurezza per l\'imbracatura dei carichi',
      'Esercitarsi nei controlli pre-utilizzo e nella movimentazione del carico',
    ],
    faqs: [
      {
        domanda: 'Ogni quanti anni va effettuato l\'aggiornamento per il carroponte?',
        risposta: "L'aggiornamento è obbligatorio ogni 5 anni, della durata di 4 ore.",
      },
      {
        domanda: "L'aggiornamento include anche una parte pratica?",
        risposta: 'Sì, il corso è suddiviso in 2 ore di modulo giuridico-normativo e tecnico e 2 ore di modulo pratico, con controlli pre-utilizzo e movimentazione del carico.',
      },
      {
        domanda: 'Posso fare l\'aggiornamento se non ho mai fatto il corso base?',
        risposta: "No, l'aggiornamento è riservato a chi ha già conseguito l'attestato di formazione iniziale di 10 ore. Senza formazione di base è necessario frequentare il corso completo.",
      },
    ],
    programmaTitle: 'Programma Aggiornamento Addetti alla Conduzione di Carriponte · 4 ore',
    moduli: [
      {
        titolo: 'MODULO I - GIURIDICO-NORMATIVO E TECNICO',
        durataOre: 2,
        argomenti: [
          "Cenni normativi: D.Lgs 81/2008, obblighi del datore di lavoro e dei lavoratori",
          'Definizioni dei componenti delle gru a portale, tipologie di materiali e carichi consentiti',
          'Definizioni e parametri degli accessori di sollevamento e di imbracatura',
          "Rischi nell'uso degli apparecchi di sollevamento e misure di prevenzione",
          'Brache di funi, catene e fibre sintetiche: coefficienti di sicurezza, marcatura e periodicità delle verifiche',
          "Norme di sicurezza per l'imbracatura dei carichi; stabilità del carico",
          'Dispositivi di protezione individuale e segnaletica di sicurezza',
        ],
      },
      {
        titolo: 'MODULO II - PRATICO',
        durataOre: 2,
        argomenti: [
          'Individuazione dei componenti strutturali e dei dispositivi di comando',
          'Controlli pre-utilizzo del mezzo e degli intermediari di sollevamento',
          'Utilizzo del carroponte con movimentazione del carico',
          'Operazioni di fine utilizzo',
        ],
      },
    ],
  },
};

const corsiCorrelatiSlugs = [
  'carrelli-elevatori-semoventi-con-conduttore-a-bordo',
  'operatore-di-gru-per-autocarro',
  'ple-piattaforme-di-lavoro-mobili-elevabili',
  'formazione-dei-lavoratori-rischio-medio',
];

export default function CorsoCarriponte() {
  const [selectedTipo, setSelectedTipo] = useState('base');
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [modalitaSelezionata, setModalitaSelezionata] = useState('aula');
  const carouselRef = useRef(null);

  const c = CONTENUTO[selectedTipo];

  const selectTipo = (tipo) => {
    setSelectedTipo(tipo);
    setActiveTab('overview');
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
                <Link href="/all-courses/addetti-alla-conduzione-di-carriponte" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Carriponte</Link>
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
                    {tipo === 'base' ? 'Corso Carriponte · 10 ore' : 'Aggiornamento · 4 ore'}
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
                    {/* SCHEDA TECNICA: apre sempre il tab Panoramica, cambia con la variante selezionata */}
                    <CourseSchedaTecnica items={c.schedaTecnica}>
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
                      Il corso è strutturato in {c.moduli.length} moduli per un totale di {c.moduli.reduce((tot, m) => tot + m.durataOre, 0)} ore
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
                              <td style={{ padding: '1rem 1.25rem', color: '#008C95', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{modulo.durataOre} ore</td>
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
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Addetti%20alla%20Conduzione%20di%20Carriponte"
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
                    {cc.meta || 'Decreto Attrezzature'}
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
