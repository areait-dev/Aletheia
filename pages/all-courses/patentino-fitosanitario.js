import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CoursePricingSidebar from '../../components/CoursePricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

// TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
const MAPS_HREF = 'https://maps.google.com/?q=Vittoria+RG+Aletheia+Srl';

// Dicitura comune usata sia nella nota della scheda tecnica sia nel tab Moduli, in attesa del
// programma corso ufficiale (ripartizione ore/moduli tecnici) fornito da Alètheia.
// TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA
const NOTA_MODULI_IN_AGGIORNAMENTO = 'Dettaglio moduli in aggiornamento — La ripartizione delle ore e i moduli tecnici saranno disponibili a breve.';

// Stesso pattern a pillola già usato in pes-pav-lavori-elettrici.js, formazione-del-preposto.js e
// datore-di-lavoro.js: cambia scheda tecnica, testi e box prezzo nella sidebar in base alla
// variante selezionata (Corso Patentino Fitosanitario 20h / Aggiornamento 12h).
const CONTENUTO = {
  base: {
    title: 'Corso Patentino Fitosanitario',
    titleSuffix: '· 20 ore',
    breadcrumbLabel: 'Corso Patentino Fitosanitario',
    titleSeo: 'Corso Patentino Fitosanitario – 20 ore | Alètheia',
    metaDescription: 'Corso patentino fitosanitario, 20 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '20 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (12 ore, pagina dedicata)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il possesso del certificato di abilitazione all'acquisto e all'utilizzo di prodotti fitosanitari, comunemente detto \"patentino fitosanitario\", è un obbligo di legge previsto dal D.Lgs. 150/2012 e dal Piano di Azione Nazionale (PAN) per l'uso sostenibile dei prodotti fitosanitari, in attuazione della Direttiva 2009/128/CE. Nessun utilizzatore professionale può acquistare o impiegare prodotti fitosanitari destinati ad uso professionale senza aver conseguito questa abilitazione, rilasciata dalle Regioni al termine di un percorso formativo obbligatorio e di un esame finale.",
      "Il Corso Patentino Fitosanitario Base, della durata di 20 ore, fornisce agli utilizzatori professionali le competenze tecniche e normative necessarie per un impiego consapevole e sicuro dei prodotti fitosanitari, con l'obiettivo primario di ridurre i rischi e gli impatti sulla salute umana e sull'ambiente derivanti dal loro utilizzo.",
      "Il programma affronta in modo integrato tre livelli di tutela: la sicurezza dell'operatore, attraverso la corretta gestione dei prodotti, l'uso dei dispositivi di protezione individuale e le procedure di primo soccorso in caso di intossicazione; la tutela dei consumatori, tramite il rispetto dei tempi di carenza e delle buone pratiche agricole che garantiscono alimenti privi di residui superiori ai limiti di legge; la salvaguardia dell'ambiente, attraverso i principi della difesa integrata, la corretta gestione dello stoccaggio, del trasporto e dello smaltimento dei contenitori vuoti e delle rimanenze.",
      "Al termine del corso è previsto il rilascio dell'attestato di frequenza, propedeutico al sostenimento dell'esame regionale per il conseguimento del certificato di abilitazione, valido su tutto il territorio nazionale.",
    ],
    aChiERivolto: [
      'Agricoltori e imprenditori agricoli che acquistano o utilizzano prodotti fitosanitari ad uso professionale',
      'Coltivatori diretti e conduttori di aziende agricole',
      'Contoterzisti che effettuano trattamenti fitosanitari per conto di terzi',
      'Giardinieri e manutentori del verde pubblico e privato',
      'Utilizzatori professionali di prodotti fitosanitari in serre, vivai e colture protette',
    ],
    cosaImparerai: [
      'Il quadro normativo di riferimento sui prodotti fitosanitari: D.Lgs. 150/2012, Regolamento CE 1107/2009 e Piano di Azione Nazionale (PAN)',
      "I pericoli per la salute umana e per l'ambiente derivanti dall'uso non corretto dei prodotti fitosanitari",
      'Il riconoscimento dei sintomi di intossicazione e le procedure di primo soccorso',
      'I principi della difesa integrata obbligatoria e volontaria e le alternative a basso impatto ambientale',
      'Le corrette modalità di stoccaggio dei prodotti e di smaltimento dei contenitori vuoti e delle rimanenze',
      'La scelta e il corretto utilizzo dei dispositivi di protezione individuale (DPI) durante la manipolazione e la distribuzione',
    ],
    faqs: [
      {
        domanda: "Chi ha l'obbligo di possedere il patentino fitosanitario?",
        risposta: "Il certificato di abilitazione è obbligatorio per tutti gli utilizzatori professionali, i distributori e i consulenti che acquistano, immagazzinano o impiegano prodotti fitosanitari ad uso professionale, ai sensi del D.Lgs. 150/2012 e del Piano di Azione Nazionale.",
      },
      {
        domanda: 'Quanto dura il corso per il conseguimento iniziale del patentino?',
        risposta: 'Il corso di primo conseguimento ha una durata di 20 ore, articolate su più giornate, e tratta gli aspetti normativi, tossicologici, agronomici e ambientali previsti dal PAN.',
      },
      {
        domanda: 'È previsto un esame al termine del corso?',
        risposta: "Sì. Al termine delle 20 ore di formazione viene rilasciato l'attestato di frequenza, necessario per essere ammessi all'esame indetto dalla Regione competente, il cui superamento consente il rilascio del certificato di abilitazione valido in tutta Italia.",
      },
    ],
    programmaTitle: 'Programma Corso Patentino Fitosanitario · 20 ore',
    prezzo: [
      { label: 'Aula', value: '€ 130,00 + IVA' },
    ],
    prezzoNumerico: 130,
  },

  aggiornamento: {
    title: 'Aggiornamento Patentino Fitosanitario',
    titleSuffix: '· 12 ore',
    breadcrumbLabel: 'Aggiornamento Patentino Fitosanitario',
    titleSeo: 'Aggiornamento Patentino Fitosanitario – 12h',
    metaDescription: 'Aggiornamento patentino fitosanitario, 12 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '12 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da ripetere periodicamente — da definire' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA - confermare la periodicità esatta di rinnovo (5 anni)
      "Il certificato di abilitazione all'acquisto e all'utilizzo dei prodotti fitosanitari ha validità periodica: trascorso il periodo previsto dalla normativa dal rilascio, l'utilizzatore professionale è tenuto a frequentare un corso di aggiornamento per mantenere la propria abilitazione. Il corso di Aggiornamento del Patentino Fitosanitario, della durata di 12 ore, è riservato a chi è già in possesso del certificato e deve rinnovarlo prima della scadenza.",
      "Il percorso formativo, in linea con quanto previsto dal Piano di Azione Nazionale (PAN), consente di aggiornare le conoscenze acquisite nel corso base alla luce delle novità normative intervenute, delle nuove etichettature dei prodotti fitosanitari e delle tecniche più recenti di riduzione del rischio per l'operatore, per i consumatori e per l'ambiente.",
      "Particolare attenzione è dedicata all'evoluzione della difesa integrata, alle nuove misure di sicurezza nella manipolazione e distribuzione dei prodotti e alla corretta tenuta del registro dei trattamenti, strumento obbligatorio di tracciabilità per ogni azienda agricola.",
      "Al termine delle 12 ore di formazione viene rilasciato l'attestato di frequenza, che consente il rinnovo del certificato di abilitazione presso la Regione competente, mantenendo la validità su tutto il territorio nazionale.",
    ],
    aChiERivolto: [
      'Utilizzatori professionali già in possesso del certificato di abilitazione con scadenza in prossimità',
      'Agricoltori, coltivatori diretti e contoterzisti che devono rinnovare il patentino già conseguito',
      'Giardinieri e manutentori del verde titolari di certificato di abilitazione in scadenza',
    ],
    cosaImparerai: [
      'Gli aggiornamenti normativi intervenuti sul Piano di Azione Nazionale (PAN) e sulla normativa fitosanitaria',
      "L'evoluzione dei principi della difesa integrata e delle tecniche a basso impatto ambientale",
      'Le nuove misure di sicurezza nella manipolazione, distribuzione e stoccaggio dei prodotti fitosanitari',
      'La corretta gestione e tenuta del registro dei trattamenti fitosanitari aziendale',
    ],
    faqs: [
      {
        domanda: 'Ogni quanto tempo scade il patentino fitosanitario?',
        // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA - confermare la periodicità esatta di rinnovo (5 anni)
        risposta: 'Il certificato di abilitazione ha una validità periodica prevista dalla normativa vigente: alla scadenza deve essere rinnovato attraverso la frequenza di un corso di aggiornamento e, dove previsto dalla Regione, il superamento della relativa verifica finale.',
      },
      {
        domanda: 'Cosa succede se il patentino scade?',
        risposta: "Alla scadenza del certificato l'utilizzatore professionale non può più acquistare né utilizzare prodotti fitosanitari ad uso professionale, fino al completamento del corso di aggiornamento e al rinnovo dell'abilitazione presso la Regione competente.",
      },
      {
        domanda: "È possibile fare l'aggiornamento se il patentino è scaduto da tempo?",
        risposta: "Sì, il corso di aggiornamento consente il rinnovo anche in caso di certificato scaduto; è comunque consigliabile non lasciar trascorrere troppo tempo dalla scadenza per evitare interruzioni nell'attività professionale che richiede l'abilitazione.",
      },
    ],
    programmaTitle: 'Programma Aggiornamento Patentino Fitosanitario · 12 ore',
    prezzo: [
      { label: 'Aula', value: '€ 100,00 + IVA' },
    ],
    prezzoNumerico: 100,
  },
};

const corsiCorrelatiSlugs = [
  'trattori-agricoli-forestali-a-ruote',
  'formazione-dei-lavoratori-rischio-medio',
];

export default function CorsoPatentinoFitosanitario() {
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

            {/* ── AREA "top": breadcrumb + H1 + switch Corso Patentino / Aggiornamento ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/patentino-fitosanitario" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Patentino Fitosanitario</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">{c.breadcrumbLabel}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {c.title} <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {/* SWITCH Corso Patentino / Aggiornamento - stesso pattern a pillola delle altre pagine corso */}
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
                    {tipo === 'base' ? 'Corso Patentino · 20 ore' : 'Aggiornamento · 12 ore'}
                  </button>
                ))}
              </div>
            </div>

            {/* ── AREA "scheda": scheda tecnica scura, sotto il titolo/switch, allineata alla sidebar ── */}
            <div className="cp-scheda-area">
              {/* Cambia con la variante selezionata. Solo modalità Aula: Videoconferenza e FAD non sono
                  attive/selezionabili per questo corso. */}
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

                {/* Nota Moduli Tecnici nella scheda tecnica */}
                {/* TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', gridColumn: '1 / -1' }}>
                  <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-list-check" style={{ color: '#6EE7B7', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Nota moduli tecnici</span>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.15rem', fontStyle: 'italic' }}>{NOTA_MODULI_IN_AGGIORNAMENTO}</span>
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
                    {/* TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA */}
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

            {/* SIDEBAR PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su
                mobile/tablet, allineata alla scheda tecnica. Cambia label/CTA in base alla variante
                selezionata nello switch qui sopra. */}
            <aside className="cp-info-area">
              <CoursePricingSidebar
                primaryHref={`/contatti?corso=${encodeURIComponent(c.title)}&tipo=preventivo`}
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Patentino%20Fitosanitario"
                customContent={
                  selectedTipo === 'base' ? (
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
                      <span>Devi solo <strong>rinnovare</strong> il patentino già in tuo possesso?</span>
                      <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Aggiornamento</span>
                    </button>
                  ) : (
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
                      <span>Devi conseguire il patentino <strong>per la prima volta</strong>?</span>
                      <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Corso Patentino · 20 ore</span>
                    </button>
                  )
                }
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
