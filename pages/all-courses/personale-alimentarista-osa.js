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

// Contenuto switchabile Corso Base (12h) / Aggiornamento (6h) - stesso meccanismo di switch a
// pillola usato in tutte le altre pagine corso (patentino-fitosanitario.js, pes-pav-lavori-elettrici.js,
// formazione-del-preposto.js): cambia scheda tecnica, testi, FAQ e box prezzo nella sidebar in base
// alla variante selezionata. Entrambe le varianti gestiscono Aula e FAD (prezzi distinti in listino),
// mentre la Videoconferenza è disattivata/nascosta per questo corso.
const CONTENUTO = {
  base: {
    title: 'Corso Personale Alimentarista – OSA',
    titleSuffix: '· 12 ore',
    breadcrumbLabel: 'Corso Alimentarista OSA',
    titleSeo: 'Corso Alimentarista OSA – 12 ore | Alètheia',
    metaDescription: 'Corso personale alimentarista OSA, 12 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '12 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (6 ore, pagina dedicata)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "La formazione degli Operatori del Settore Alimentare (OSA) è un obbligo di legge previsto dal Regolamento CE 852/2004 sull'igiene dei prodotti alimentari, che impone a chiunque manipoli, prepari, confezioni, trasporti o venda sostanze alimentari di possedere adeguate competenze in materia di igiene e sicurezza alimentare, commisurate all'attività lavorativa svolta.",
      "Il Corso Personale Alimentarista – OSA, della durata di 12 ore, fornisce le conoscenze necessarie per operare in sicurezza lungo tutta la filiera alimentare, con l'obiettivo di prevenire le contaminazioni chimiche, fisiche e biologiche che possono compromettere la salubrità degli alimenti e la salute dei consumatori.",
      "Il programma affronta la corretta gestione dell'igiene personale e delle strutture di lavorazione, le buone pratiche di manipolazione e conservazione dei cibi, il rispetto della catena del freddo e del caldo, e l'applicazione pratica dei principi del sistema HACCP (Hazard Analysis and Critical Control Points), lo strumento di autocontrollo obbligatorio per l'individuazione e la gestione dei punti critici del processo produttivo.",
      "Un focus specifico è dedicato alla corretta gestione degli allergeni alimentari, in conformità al Regolamento UE 1169/2011 sull'informazione ai consumatori, e alla prevenzione delle contaminazioni crociate nelle fasi di preparazione, conservazione e somministrazione degli alimenti.",
      "Al termine del corso è previsto il rilascio dell'attestato di frequenza, valido su tutto il territorio nazionale, che sostituisce il precedente libretto sanitario abolito dalla normativa vigente.",
    ],
    aChiERivolto: [
      'Titolari di imprese alimentari e responsabili del sistema di autocontrollo HACCP',
      'Cuochi, aiuto cuochi e personale di cucina',
      'Camerieri, baristi e personale di sala a contatto con gli alimenti',
      'Pasticceri, panificatori e macellai',
      'Addetti alla manipolazione, al confezionamento, al trasporto e alla vendita di sostanze alimentari',
    ],
    cosaImparerai: [
      "Il quadro normativo di riferimento sull'igiene alimentare: Regolamento CE 852/2004 e normativa collegata",
      'I principali pericoli alimentari: contaminazioni chimiche, fisiche e biologiche',
      "L'igiene del personale e la corretta gestione delle strutture, delle attrezzature e degli ambienti di lavorazione",
      'Le buone pratiche di lavorazione e le procedure di sanificazione degli ambienti e delle attrezzature',
      "I principi dell'autocontrollo e del sistema HACCP per l'individuazione dei punti critici di controllo",
      'La corretta conservazione degli alimenti, il rispetto della catena del freddo e del caldo e la gestione degli allergeni',
    ],
    faqs: [
      {
        domanda: "Chi è l'OSA e chi ha l'obbligo di frequentare questo corso?",
        risposta: "L'OSA (Operatore del Settore Alimentare) è chiunque, nell'ambito della propria attività, manipoli, prepari, confezioni, trasporti, distribuisca o venda sostanze alimentari. Il Regolamento CE 852/2004 impone a tutti questi soggetti un adeguato livello di formazione in materia di igiene alimentare, commisurato al ruolo svolto.",
      },
      {
        domanda: 'Questo corso sostituisce il vecchio libretto sanitario?',
        risposta: "Sì. Il libretto sanitario è stato abolito e sostituito dall'obbligo di formazione specifica in materia di igiene alimentare: l'attestato rilasciato al termine del corso rappresenta il documento oggi riconosciuto e richiesto per operare nel settore alimentare.",
      },
      {
        domanda: 'Il corso include la gestione degli allergeni?',
        risposta: 'Sì, il programma dedica una parte specifica alla corretta gestione e comunicazione degli allergeni alimentari ai sensi del Regolamento UE 1169/2011, oltre alla prevenzione delle contaminazioni crociate.',
      },
    ],
    programmaTitle: 'Programma Corso Personale Alimentarista – OSA · 12 ore',
    prezzoAula: 80,
    prezzoFad: 70,
    prezzoRowsBuilder: (aula, fad) => [
      { key: 'aula', label: 'Aula', value: `€ ${aula},00 + IVA` },
      { key: 'fad', label: 'FAD', value: `€ ${fad},00 + IVA` },
    ],
  },

  aggiornamento: {
    title: 'Aggiornamento Personale Alimentarista – OSA',
    titleSuffix: '· 6 ore',
    breadcrumbLabel: 'Aggiornamento Alimentarista OSA',
    titleSeo: 'Aggiornamento Alimentarista OSA – 6h | Alètheia',
    metaDescription: 'Aggiornamento personale alimentarista OSA, 6 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '6 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da ripetere periodicamente — da definire' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA - confermare la periodicità esatta di rinnovo
      "L'aggiornamento della formazione OSA è finalizzato al rinnovo periodico delle competenze in materia di igiene alimentare per gli operatori già formati, secondo la periodicità prevista dalla normativa e dalle linee guida regionali. Il corso di Aggiornamento Personale Alimentarista – OSA, della durata di 6 ore, è riservato a chi ha già frequentato il corso base da 12 ore e deve mantenere valida la propria formazione.",
      "Il percorso è incentrato sul ripasso delle corrette prassi igieniche apprese nel corso base, sull'analisi degli eventuali aggiornamenti normativi e delle linee guida locali intervenuti in materia di sicurezza alimentare, e sul consolidamento delle procedure di registrazione e gestione dell'autocontrollo aziendale.",
      "Particolare attenzione è dedicata al richiamo dei punti critici di controllo (CCP) del sistema HACCP, alla prevenzione dei rischi emergenti in ambito alimentare, alla tracciabilità e rintracciabilità dei prodotti lungo la filiera, e alla corretta gestione documentale del manuale di autocontrollo aziendale.",
      "Al termine delle 6 ore di formazione viene rilasciato l'attestato di frequenza, che consente il mantenimento della validità della formazione OSA su tutto il territorio nazionale.",
    ],
    aChiERivolto: [
      'Personale alimentarista e OSA già in possesso dell\'attestato base da 12 ore che deve adempiere all\'obbligo di aggiornamento periodico',
      'Titolari, responsabili dell\'autocontrollo e addetti alla manipolazione di alimenti già formati con il corso base',
    ],
    cosaImparerai: [
      'Il richiamo sui punti critici di controllo (CCP) del sistema HACCP',
      "Gli aggiornamenti normativi intervenuti in materia di igiene alimentare e le linee guida locali",
      'La prevenzione dei rischi emergenti in ambito alimentare',
      'La tracciabilità e la rintracciabilità dei prodotti lungo la filiera alimentare',
      'La corretta gestione documentale del manuale di autocontrollo HACCP',
    ],
    faqs: [
      {
        domanda: 'Ogni quanti anni va aggiornato il corso alimentarista OSA?',
        // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA - confermare la periodicità esatta di rinnovo
        risposta: "La formazione OSA ha una validità periodica prevista dalla normativa e dalle linee guida regionali: allo scadere del periodo previsto è necessario frequentare il corso di aggiornamento da 6 ore per mantenere valida la propria formazione.",
      },
      {
        domanda: 'Posso fare l\'aggiornamento se non ho mai frequentato il corso base da 12 ore?',
        risposta: 'No, il corso di aggiornamento da 6 ore è riservato a chi ha già completato il corso base da 12 ore: chi non è ancora in possesso della formazione iniziale deve prima frequentare il corso Personale Alimentarista – OSA da 12 ore.',
      },
      {
        domanda: "L'attestato rilasciato è valido fuori dalla Sicilia?",
        risposta: "Sì, l'attestato di formazione OSA rilasciato al termine del corso, così come quello di aggiornamento, è valido su tutto il territorio nazionale e non solo in Sicilia.",
      },
    ],
    programmaTitle: 'Programma Aggiornamento Personale Alimentarista – OSA · 6 ore',
    prezzoAula: 60,
    prezzoFad: 50,
    prezzoRowsBuilder: (aula, fad) => [
      { key: 'aula', label: 'Aula', value: `€ ${aula},00 + IVA` },
      { key: 'fad', label: 'FAD', value: `€ ${fad},00 + IVA` },
    ],
  },
};

const corsiCorrelatiSlugs = [
  'formazione-dei-lavoratori-rischio-basso',
  'formazione-dei-lavoratori-rischio-medio',
];

export default function CorsoPersonaleAlimentaristaOsa() {
  const [selectedTipo, setSelectedTipo] = useState('base');
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

            {/* ── AREA "top": breadcrumb + H1 + switch Corso Base / Aggiornamento ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/personale-alimentarista-osa" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Personale Alimentarista - OSA</Link>
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
                    {tipo === 'base' ? 'Corso Alimentarista OSA · 12 ore' : 'Aggiornamento · 6 ore'}
                  </button>
                ))}
              </div>
            </div>

            {/* ── AREA "scheda": scheda tecnica scura, riga propria allineata alla sidebar prezzo, cambia con la variante selezionata.
                Modalità Aula/FAD selezionabili, Videoconferenza disattivata/nascosta per questo corso. ── */}
            <div className="cp-scheda-area">
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
                      {/* TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA */}
                      <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#6EE7B7' }}>
                        Sede Alètheia S.r.l., Vittoria (RG) <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.68rem' }}></i>
                      </a>
                    </div>
                  </div>
                )}

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

            {/* SIDEBAR PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet.
                Il customContent (suggerimento per passare all'altra variante) sostituisce i children di prima. */}
            <aside className="cp-info-area">
              <CoursePricingSidebar
                primaryHref={`/contatti?corso=${encodeURIComponent(c.title)}&tipo=preventivo`}
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Personale%20Alimentarista%20OSA"
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
                      <span>Devi solo <strong>rinnovare</strong> l'attestato già in tuo possesso?</span>
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
                      <span>Devi conseguire l'attestato <strong>per la prima volta</strong>?</span>
                      <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Corso OSA · 12 ore</span>
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
                    <div
                      className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)' }}
                    >
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
