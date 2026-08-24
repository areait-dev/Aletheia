import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

// TODO: sostituire con l'indirizzo esatto della sede e il link Google Maps ufficiale non appena confermati da Alètheia
const MAPS_HREF = 'https://maps.google.com/?q=Vittoria+RG+Aletheia+Srl';

// Contenuto switchabile Sotto Tensione (16h) / In Prossimità (12h) - stesso pattern a pillola già usato
// in formazione-del-preposto.js e datore-di-lavoro.js: cambia scheda tecnica, testi, moduli e box
// prezzo nella sidebar in base alla variante selezionata.
const CONTENUTO = {
  sottoTensione: {
    title: 'Corso PES, PAV, PEI per Addetti ai Lavori Elettrici Sotto Tensione',
    titleSuffix: '· 16 ore',
    breadcrumbLabel: 'Corso Lavori Elettrici Sotto Tensione',
    titleSeo: 'Corso PES PAV PEI Sotto Tensione – 16h | Alètheia',
    metaDescription: 'Corso PES PAV PEI lavori elettrici sotto tensione, 16 ore, CEI 11-27 ed. 2025. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '16 ore (4 ore teoria, 12 ore pratica)' },
      // TODO: confermare con Alètheia la periodicità esatta di rinnovo (es. "ogni 5 anni") non ancora comunicata
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento periodico previsto dalla normativa' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il Corso PES, PAV, PEI per Addetti ai Lavori Elettrici Sotto Tensione, della durata di 16 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e della nuova Norma CEI 11-27, VI edizione 2025, per chiunque debba conseguire o mantenere le qualifiche di PES (Persona Esperta), PAV (Persona Avvertita) e PEI (Persona Esperta lavori sotto tensione).",
      "Il corso affronta i rischi di folgorazione, arco elettrico e ustioni connessi ai lavori elettrici, allineandosi alle novità introdotte dalla VI edizione 2025 della norma su impianti in bassa, media e alta tensione. Vengono trattati la CEI EN 50110-1, gli effetti dell'elettricità sul corpo umano, la scelta e l'uso dei DPI, i ruoli di GL (Gestore Lavori), RI (Responsabile Impianto) e RLE (Referente Lavori Elettrici), il calcolo delle distanze di sicurezza, la redazione di piani di lavoro e piani di intervento, e le procedure operative per lavori fuori tensione, in prossimità e sotto tensione in bassa tensione (BT).",
      "Il programma prevede 4 ore di teoria e 12 ore di pratica: la parte pratica include esercitazioni sulla scelta dei DPI, sulla messa a terra e in cortocircuito, e sulla gestione delle terre di lavoro in cantiere e in impianto.",
      "Il corso è disponibile in aula o in FAD (formazione a distanza); la videoconferenza non è prevista per questa variante, dato il carattere pratico dell'addestramento sotto tensione. È possibile organizzare la formazione anche direttamente in azienda.",
    ],
    aChiERivolto: [
      'Lavoratori che devono conseguire o rinnovare la qualifica PES o PAV',
      'Addetti PEI destinati a operare sotto tensione in bassa tensione (BT)',
      'Manutentori e tecnici di impianti elettrici industriali, civili e di cantiere',
      'RI (Responsabile Impianto) e RLE (Referente Lavori Elettrici) da aggiornare alla Norma CEI 11-27 edizione 2025',
      "Datori di lavoro che devono garantire la formazione del personale addetto ai lavori elettrici ai sensi dell'art. 37 D.Lgs 81/2008",
    ],
    cosaImparerai: [
      "Applicare le disposizioni legislative del D.Lgs 81/2008 sui lavori elettrici",
      'Conoscere le prescrizioni della Norma CEI 11-27 edizione 2025 e della CEI EN 50110-1',
      "Riconoscere gli effetti dell'arco elettrico e intervenire con il primo soccorso",
      'Scegliere e utilizzare correttamente i DPI per lavori sotto tensione',
      'Comprendere i compiti di GL, RI e RLE',
      'Calcolare le distanze di sicurezza dalle parti attive',
      'Redigere ed applicare il piano di lavoro e il piano di intervento',
      'Applicare le procedure per lavori fuori tensione, in prossimità e sotto tensione in BT, inclusa la messa a terra e in cortocircuito',
    ],
    faqs: [
      {
        domanda: 'Cosa significano le sigle PES, PAV e PEI?',
        risposta: 'PES (Persona Esperta) e PAV (Persona Avvertita) sono le qualifiche previste dalla Norma CEI 11-27 per chi opera su impianti elettrici; PEI (Persona Esperta lavori sotto tensione) è la qualifica specifica per chi esegue lavori direttamente sotto tensione in bassa tensione.',
      },
      {
        domanda: 'Il corso segue la nuova edizione della CEI 11-27?',
        risposta: 'Sì, il programma è aggiornato alla Norma CEI 11-27, VI edizione 2025, che introduce novità sulla gestione dei lavori elettrici in bassa, media e alta tensione.',
      },
      {
        domanda: 'Quanto dura il corso e come è articolato?',
        risposta: 'Il corso dura 16 ore complessive: 4 ore di teoria sulla normativa e le procedure, e 12 ore di pratica con esercitazioni su DPI, messa a terra e in cortocircuito.',
      },
      {
        domanda: 'Il corso si può fare in FAD?',
        risposta: "Sì, secondo il listino Alètheia questo corso è disponibile in aula o in FAD; la videoconferenza non è prevista per questa variante.",
      },
      {
        domanda: 'Questo corso abilita anche ai lavori in prossimità?',
        risposta: 'Per i soli lavori in prossimità (senza operare sotto tensione) è disponibile il corso dedicato da 12 ore: puoi passare a quella variante con lo switch qui sopra.',
      },
    ],
    programmaTitle: 'Programma Corso PES, PAV, PEI Sotto Tensione · 16 ore',
    moduli: [
      {
        titolo: 'MODULO I - NORMATIVA E RISCHIO ELETTRICO',
        durataOre: 2,
        argomenti: ['D.Lgs 81/2008 e Norma CEI 11-27 ed. 2025', 'CEI EN 50110-1', 'Effetti dell\'elettricità e arco elettrico'],
      },
      {
        titolo: 'MODULO II - RUOLI, DPI E PIANIFICAZIONE',
        durataOre: 2,
        argomenti: ['Ruoli di GL, RI e RLE', 'Scelta e uso dei DPI', 'Calcolo delle distanze di sicurezza', 'Piano di lavoro e piano di intervento'],
      },
      {
        titolo: 'MODULO III - PRATICA: PROCEDURE OPERATIVE',
        durataOre: 8,
        argomenti: ['Procedure fuori tensione, in prossimità e sotto tensione in BT', 'Scelta pratica dei DPI', 'Messa a terra e in cortocircuito'],
      },
      {
        titolo: 'MODULO IV - PRATICA: ESERCITAZIONI E VERIFICA',
        durataOre: 4,
        argomenti: ['Terre di lavoro', 'Simulazioni operative', 'Verifica pratica finale'],
      },
    ],
    prezzo: [
      { label: 'Aula', value: '€ 250,00 + IVA' },
      { label: 'FAD', value: '€ 250,00 + IVA' },
    ],
    prezzoNumerico: 250,
  },

  inProssimita: {
    title: 'Corso PES, PAV per Addetti ai Lavori Elettrici in Prossimità',
    titleSuffix: '· 12 ore',
    breadcrumbLabel: 'Corso Lavori Elettrici in Prossimità',
    titleSeo: 'Corso PES PAV Lavori Elettrici in Prossimità – 12h | Alètheia',
    metaDescription: 'Corso PES PAV lavori elettrici in prossimità, 12 ore, CEI 11-27 ed. 2025. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '12 ore' },
      // TODO: confermare con Alètheia la periodicità esatta di rinnovo (es. "ogni 5 anni") non ancora comunicata
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento periodico previsto dalla normativa' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il Corso PES, PAV per Addetti ai Lavori Elettrici in Prossimità, della durata di 12 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e della Norma CEI 11-27, VI edizione 2025, per chi opera in prossimità di parti attive di impianti elettrici senza eseguire lavori sotto tensione.",
      "A differenza del corso Sotto Tensione, questa variante non prevede addestramento operativo su parti in tensione: si concentra sulla valutazione del rischio da prossimità, sul mantenimento delle distanze di sicurezza (DL4, DA, DV) e sulle misure organizzative e di segnalazione necessarie per lavorare in sicurezza vicino a impianti elettrici attivi.",
      "Il programma tratta la CEI EN 50110-1, i ruoli di GL (Gestore Lavori), RI (Responsabile Impianto) e RLE (Referente Lavori Elettrici), il calcolo e la delimitazione delle zone di rispetto e di lavoro, la scelta dei DPI idonei ai lavori in prossimità, e le procedure di segnalazione e delimitazione dell'area.",
      "Il corso è disponibile in aula o in FAD; la videoconferenza non è prevista. È possibile organizzare la formazione anche direttamente in azienda. Chi deve operare anche sotto tensione deve invece frequentare il corso da 16 ore.",
    ],
    aChiERivolto: [
      'Lavoratori che operano in prossimità di parti attive senza eseguire lavori sotto tensione',
      'Manutentori e tecnici che devono mantenere la qualifica PAV',
      'Addetti a lavori edili, di giardinaggio o di cantiere in prossimità di linee e impianti elettrici',
      'RI e RLE che devono aggiornare le procedure di gestione della prossimità alla Norma CEI 11-27 edizione 2025',
      "Datori di lavoro che devono garantire la formazione del personale che opera in prossimità di impianti elettrici ai sensi dell'art. 37 D.Lgs 81/2008",
    ],
    cosaImparerai: [
      "Applicare le disposizioni legislative del D.Lgs 81/2008 sui lavori in prossimità di impianti elettrici",
      'Conoscere le prescrizioni della Norma CEI 11-27 edizione 2025 e della CEI EN 50110-1 sulla prossimità',
      'Calcolare e delimitare le zone di rispetto e di lavoro',
      'Scegliere e utilizzare i DPI idonei ai lavori in prossimità',
      'Comprendere i compiti di GL, RI e RLE nella gestione della prossimità',
      'Applicare le procedure di segnalazione e delimitazione dell\'area di lavoro',
    ],
    faqs: [
      {
        domanda: 'In cosa si differenzia questo corso da quello Sotto Tensione (16 ore)?',
        risposta: "Questo corso abilita a operare in prossimità di parti attive senza eseguire lavori sotto tensione; per operare direttamente sotto tensione in bassa tensione è necessario il corso PEI da 16 ore, disponibile con lo switch qui sopra.",
      },
      {
        domanda: 'Il corso segue la nuova edizione della CEI 11-27?',
        risposta: 'Sì, il programma è aggiornato alla Norma CEI 11-27, VI edizione 2025.',
      },
      {
        domanda: 'Quanto dura il corso per lavori in prossimità?',
        risposta: 'Il corso dura 12 ore complessive, tra normativa, calcolo delle distanze di sicurezza e procedure operative di prossimità.',
      },
      {
        domanda: 'Il corso si può fare in FAD?',
        risposta: 'Sì, secondo il listino Alètheia questo corso è disponibile in aula o in FAD; la videoconferenza non è prevista.',
      },
    ],
    programmaTitle: 'Programma Corso PES, PAV in Prossimità · 12 ore',
    moduli: [
      {
        titolo: 'MODULO I - NORMATIVA E RISCHIO DA PROSSIMITÀ',
        durataOre: 4,
        argomenti: ['D.Lgs 81/2008 e Norma CEI 11-27 ed. 2025', 'CEI EN 50110-1', 'Effetti dell\'elettricità'],
      },
      {
        titolo: 'MODULO II - RUOLI E DISTANZE DI SICUREZZA',
        durataOre: 4,
        argomenti: ['Ruoli di GL, RI e RLE', 'Calcolo e delimitazione delle zone di rispetto e di lavoro', 'DPI per lavori in prossimità'],
      },
      {
        titolo: 'MODULO III - PROCEDURE OPERATIVE E VERIFICA',
        durataOre: 4,
        argomenti: ['Segnalazione e delimitazione dell\'area', 'Casi pratici', 'Verifica finale'],
      },
    ],
    // TODO: prezzo provvisorio basato sul listino generico esistente (coursesDetails['corso-pes-pav-pei']) -
    // confermare con Alètheia il prezzo ufficiale della variante "in prossimità" da 12 ore
    prezzo: [
      { label: 'Aula', value: '€ 200,00 + IVA' },
      { label: 'FAD', value: '€ 200,00 + IVA' },
    ],
    prezzoNumerico: 200,
  },
};

const corsiCorrelatiSlugs = [
  'formazione-dei-lavoratori-rischio-medio',
  'formazione-dei-lavoratori-rischio-alto',
  'lavori-in-quota',
];

export default function CorsoPesPav() {
  const [selectedTipo, setSelectedTipo] = useState('sottoTensione');
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [modalitaSelezionata, setModalitaSelezionata] = useState('aula');
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

            {/* ── AREA "top": breadcrumb + H1 + switch Sotto Tensione / In Prossimità ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/pes-pav-lavori-elettrici" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>PES / PAV</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">{c.breadcrumbLabel}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {c.title} <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {/* SWITCH Sotto Tensione / In Prossimità - stesso pattern a pillola delle altre pagine corso */}
              <div role="tablist" aria-label="Variante del corso" style={{ display: 'inline-flex', gap: '0.25rem', background: '#F1F5F9', borderRadius: '9999px', padding: '0.25rem' }}>
                {['sottoTensione', 'inProssimita'].map((tipo) => (
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
                    {tipo === 'sottoTensione' ? 'Sotto Tensione · 16 ore' : 'In Prossimità · 12 ore'}
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
                          <i className="fas fa-bolt" style={{ color: '#6EE7B7', fontSize: '0.9rem' }}></i>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Modalità</span>
                          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.15rem' }}>
                            {[
                              { key: 'aula', label: 'Aula' },
                              { key: 'fad', label: 'FAD' },
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
                                {m.label}{m.key !== 'fad' ? ' ·' : ''}
                              </button>
                            ))}
                          </div>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>Videoconferenza non disponibile per questo corso</span>
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
                      Il corso è strutturato in {c.moduli.length} {c.moduli.length === 1 ? 'modulo' : 'moduli'}.
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
                Cambia riga prezzo/label in base alla variante selezionata nello switch qui sopra. */}
            <aside className="cp-price-area">
              <PricingSidebar
                buyHref={`/contatti?corso=${encodeURIComponent(c.title)}&tipo=preventivo`}
                buyLabel="Richiedi preventivo"
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20PES%2FPAV"
              >
                {selectedTipo === 'sottoTensione' && (
                  <button
                    type="button"
                    onClick={() => selectTipo('inProssimita')}
                    className="text-slate-600 dark:text-gray-300 border-slate-200 dark:border-[rgba(255,255,255,0.1)]"
                    style={{
                      width: '100%', textAlign: 'left', background: 'transparent', border: '1px dashed',
                      borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.8rem', cursor: 'pointer',
                      fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                    }}
                  >
                    <span>Devi operare solo <strong>in prossimità</strong>, non sotto tensione?</span>
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Corso 12 ore</span>
                  </button>
                )}
                {selectedTipo === 'inProssimita' && (
                  <button
                    type="button"
                    onClick={() => selectTipo('sottoTensione')}
                    className="text-slate-600 dark:text-gray-300 border-slate-200 dark:border-[rgba(255,255,255,0.1)]"
                    style={{
                      width: '100%', textAlign: 'left', background: 'transparent', border: '1px dashed',
                      borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.8rem', cursor: 'pointer',
                      fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                    }}
                  >
                    <span>Devi operare anche <strong>sotto tensione</strong>?</span>
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Corso 16 ore</span>
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
