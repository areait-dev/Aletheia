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

// Contenuti reali tratti dai programmi corso ufficiali Alètheia:
// "TEORICO/PRATICO ABILITANTE PER ADDETTI ALLA CONDUZIONE DI AUTOPOMPE PER CALCESTRUZZO [h 14]" e
// "Aggiornamento quinquennale per addetti alla conduzione di pompe per calcestruzzo [4 ore]"
// (artt. 37 e 73 D.Lgs. 81/2008 e s.m.i., ASR 17/04/2025).
//
// Stesso pattern a pillola già usato in spazi-confinati.js, patentino-fitosanitario.js,
// operatore-di-gru-per-autocarro.js: cambia scheda tecnica, testi e box prezzo nella sidebar in base
// alla variante selezionata (Corso Nuovo 14h / Aggiornamento 4h). Solo modalità Aula: Videoconferenza
// e FAD sono disattivate/nascoste per questo corso.
const CONTENUTO = {
  base: {
    title: 'Corso Addetti alla Conduzione di Pompe per Calcestruzzo',
    titleSuffix: '· 14 ore',
    breadcrumbLabel: 'Corso Pompe per Calcestruzzo',
    titleSeo: 'Corso Pompe per Calcestruzzo – 14h | Alètheia',
    metaDescription: 'Corso conduzione pompe per calcestruzzo, 14 ore, artt. 37 e 73 D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '14 ore' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento quinquennale obbligatorio (4 ore)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il corso Teorico/Pratico Abilitante per Addetti alla Conduzione di Autopompe per Calcestruzzo, della durata di 14 ore, è obbligatorio ai sensi degli artt. 37 e 73 del D.Lgs. 81/2008 e s.m.i. e dell'Accordo Stato-Regioni del 17 aprile 2025, per chiunque conduca autopompe per calcestruzzo in cantiere.",
      "Il percorso forma l'operatore sulle categorie e le caratteristiche tecniche delle pompe, sui componenti strutturali (sistemi di stabilizzazione, livellamento, telaio) e sui dispositivi di comando e di sicurezza, oltre che sui controlli da effettuare prima dell'utilizzo e sulle modalità di utilizzo in sicurezza. Un focus specifico è dedicato all'analisi dei rischi più ricorrenti: elettrocuzione, rischi ambientali, urti e cadute a livello, schiacciamento.",
      "Il corso si articola in tre moduli: il Modulo I giuridico-normativo (1 ora), su normativa generale e responsabilità dell'operatore; il Modulo II tecnico (6 ore teoria), su categorie di pompe, dispositivi di comando/sicurezza, controlli pre-utilizzo e procedure di trasporto, accesso in cantiere, posizionamento, stabilizzazione e scarico del calcestruzzo; il Modulo III pratico (7 ore pratica), con esercitazioni operative su posizionamento, movimentazione del braccio tramite radiocomando e procedure di scarico in sicurezza, anche in presenza di linee elettriche o vie di traffico.",
    ],
    aChiERivolto: [
      'Lavoratori addetti alla conduzione di autopompe per calcestruzzo in cantiere',
      "Operatori che devono conseguire l'abilitazione ai sensi degli artt. 37 e 73 del D.Lgs. 81/2008",
      'Datori di lavoro che devono garantire la formazione dei propri addetti alla conduzione di pompe per calcestruzzo',
    ],
    cosaImparerai: [
      'Riconoscere categorie e caratteristiche generali delle pompe per calcestruzzo',
      'Identificare i dispositivi di comando e di sicurezza e la loro funzione',
      "Eseguire i controlli visivi e funzionali pre-utilizzo su pompa e dispositivi",
      'Posizionare e stabilizzare il mezzo in sicurezza mediante stabilizzatori laterali e bolla di livello',
      'Movimentare il braccio della pompa tramite radiocomando',
      'Gestire lo scarico del calcestruzzo in presenza di linee elettriche e vie di traffico',
      'Applicare le procedure di pulizia e manutenzione straordinaria della pompa',
      "Ottenere l'attestato di abilitazione valido ai sensi del D.Lgs. 81/2008",
    ],
    faqs: [
      {
        domanda: 'Chi deve seguire il corso per pompe per calcestruzzo?',
        risposta: "Il corso è obbligatorio per tutti i lavoratori addetti alla conduzione di autopompe per calcestruzzo in cantiere, ai sensi degli artt. 37 e 73 del D.Lgs. 81/2008.",
      },
      {
        domanda: 'Quanto dura il corso e come si articola?',
        risposta: 'Il corso dura 14 ore complessive, suddivise in tre moduli: giuridico-normativo (1 ora), tecnico (6 ore di teoria) e pratico (7 ore di esercitazioni operative).',
      },
      {
        domanda: "Ogni quanto va rinnovata l'abilitazione?",
        risposta: "È previsto un aggiornamento quinquennale obbligatorio di 4 ore, interamente pratico.",
      },
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Pompe per Calcestruzzo · 14 ore',
    moduli: [
      {
        titolo: 'MODULO I - GIURIDICO-NORMATIVO',
        durataOre: 1,
        argomenti: [
          'Cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs. 81/2008)',
          "Riferimento ai lavori in quota e all'uso di attrezzature di lavoro",
          "Responsabilità dell'operatore",
        ],
      },
      {
        titolo: 'MODULO II - TECNICO',
        durataOre: 6,
        argomenti: [
          'Categorie e caratteristiche generali/specifiche delle pompe per calcestruzzo',
          'Componenti strutturali: sistemi di stabilizzazione, livellamento, telaio',
          'Dispositivi di comando e di sicurezza',
          'Controlli pre-utilizzo e modalità di utilizzo in sicurezza',
          'Analisi dei rischi ricorrenti: elettrocuzione, ambientali, urti, cadute, schiacciamento',
          'Trasporto su strada, accesso al cantiere e norme di comportamento',
          'Posizionamento, stabilizzazione e operazioni preliminari allo scarico',
          'Scarico del calcestruzzo in presenza di linee elettriche e vie di traffico',
          'Pulizia del mezzo e manutenzione straordinaria della pompa',
        ],
      },
      {
        titolo: 'MODULO III - PRATICO',
        durataOre: 7,
        argomenti: [
          'Individuazione dei componenti strutturali e dei dispositivi di sicurezza',
          'Controlli pre-utilizzo e controlli preliminari alla partenza',
          'Pianificazione del percorso e verifica di idoneità del sito di scarico',
          'Posizionamento e stabilizzazione del mezzo in cantiere',
          'Esercitazioni di movimentazione del braccio della pompa mediante radiocomando',
          'Simulazioni di scarico in presenza di linee elettriche e vie di traffico',
          "Procedure di sblocco dell'intasamento e chiusura del braccio",
          'Pulizia ordinaria e manutenzione straordinaria a fine lavoro',
          'Messa a riposo della pompa a fine lavoro',
        ],
      },
    ],
    prezzo: [
      { label: 'Aula', value: '€ 250,00 + IVA' },
    ],
    prezzoNumerico: 250,
  },

  aggiornamento: {
    title: 'Aggiornamento Addetti alla Conduzione di Pompe per Calcestruzzo',
    titleSuffix: '· 4 ore',
    breadcrumbLabel: 'Aggiornamento Pompe per Calcestruzzo',
    titleSeo: 'Aggiornamento Pompe Calcestruzzo – 4h | Alètheia',
    metaDescription: 'Aggiornamento quinquennale conduzione pompe per calcestruzzo, 4 ore, art. 73 D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '4 ore' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento quinquennale ai sensi art. 73 D.Lgs. 81/08' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Questo è il corso di aggiornamento quinquennale per addetti alla conduzione di pompe per calcestruzzo, della durata di 4 ore, non il corso base: è rivolto a chi ha già conseguito l'abilitazione e deve rinnovarla periodicamente, ai sensi dell'art. 73 del D.Lgs. 81/08 s.m.i. e dell'Accordo Stato-Regioni del 17 aprile 2025.",
      "Il corso, interamente pratico (4 ore), aggiorna l'operatore sulla normativa in materia di igiene e sicurezza del lavoro e sull'uso di attrezzature di lavoro, sulle modalità di uso in sicurezza, sull'individuazione dei fattori di rischio e pericolo e sulle precauzioni contro l'utilizzo non autorizzato, oltre che su manutenzione e verifiche giornaliere e periodiche.",
      "Le esercitazioni pratiche coprono l'individuazione dei dispositivi di comando e di sicurezza e il loro funzionamento, simulazioni di movimentazione della pompa per calcestruzzo, procedure operative di salvataggio e manovre di emergenza, e controlli pre e post utilizzo.",
    ],
    aChiERivolto: [
      "Addetti già in possesso dell'abilitazione alla conduzione di pompe per calcestruzzo con formazione in scadenza",
      "Datori di lavoro che devono garantire l'aggiornamento periodico dei propri addetti",
      "Attenzione: chi non ha mai conseguito l'abilitazione deve prima frequentare il corso base di 14 ore, non l'aggiornamento",
    ],
    cosaImparerai: [
      "Aggiornare le conoscenze normative in materia di igiene e sicurezza del lavoro e uso delle attrezzature",
      "Individuare i fattori di rischio e di pericolo nell'utilizzo della pompa",
      "Applicare le precauzioni contro l'utilizzo non autorizzato",
      "Eseguire manutenzione e verifiche giornaliere e periodiche",
      "Gestire le procedure operative di salvataggio e le manovre di emergenza",
      "Eseguire correttamente i controlli pre e post utilizzo",
    ],
    faqs: [
      {
        domanda: 'Chi può fare l\'aggiornamento pompe per calcestruzzo?',
        risposta: "L'aggiornamento è riservato a chi ha già conseguito l'abilitazione di base di 14 ore. Senza formazione di base è necessario frequentare il corso completo.",
      },
      {
        domanda: "Quanto dura l'aggiornamento e ogni quanto va ripetuto?",
        risposta: "L'aggiornamento dura 4 ore ed è obbligatorio ogni 5 anni (quinquennale), ai sensi dell'art. 73 del D.Lgs. 81/08.",
      },
      {
        domanda: "L'aggiornamento è teorico o pratico?",
        risposta: 'È interamente pratico: le 4 ore comprendono esercitazioni su dispositivi di comando, simulazioni di movimentazione, procedure di emergenza e controlli pre/post utilizzo.',
      },
    ],
    programmaTitle: 'Programma Aggiornamento Addetti alla Conduzione di Pompe per Calcestruzzo · 4 ore',
    moduli: [
      {
        titolo: 'MODULO I - AGGIORNAMENTO TECNICO',
        durataOre: 4,
        argomenti: [
          'Aggiornamento normativo in materia di igiene e sicurezza del lavoro e uso di attrezzature (D.Lgs. 81/2008)',
          'Modalità di uso in sicurezza e individuazione dei fattori di rischio e pericolo',
          "Precauzioni contro l'utilizzo non autorizzato",
          'Manutenzione e verifiche giornaliere e periodiche',
          'Esercitazioni: dispositivi di comando e di sicurezza e loro funzionamento',
          'Esercitazioni di pratiche operative e simulazioni di movimentazione della pompa',
          'Procedure operative di salvataggio e manovre di emergenza',
          'Controlli pre e post utilizzo',
        ],
      },
    ],
    prezzo: [
      { label: 'Aula', value: '€ 100,00 + IVA' },
    ],
    prezzoNumerico: 100,
  },
};

const corsiCorrelatiSlugs = [
  'operatore-di-gru-per-autocarro',
  'coordinatori-cantieri-cse-csp',
];

export default function CorsoPompePerCalcestruzzo() {
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

            {/* ── AREA "top": breadcrumb + H1 + switch Corso Nuovo / Aggiornamento ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/pompe-per-calcestruzzo" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Pompe per Calcestruzzo</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">{c.breadcrumbLabel}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {c.title} <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {/* SWITCH Corso Nuovo / Aggiornamento - stesso pattern a pillola delle altre pagine corso */}
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
                    {tipo === 'base' ? 'Corso Nuovo · 14 ore' : 'Aggiornamento · 4 ore'}
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

            {/* SIDEBAR PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su
                mobile/tablet, allineata alla scheda tecnica. Cambia label/CTA in base alla variante
                selezionata nello switch qui sopra; nessun prezzo fisso in vetrina → solo preventivo. */}
            <aside className="cp-info-area">
              <CoursePricingSidebar
                primaryHref={`/contatti?corso=${encodeURIComponent(c.title)}&tipo=preventivo`}
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Pompe%20per%20Calcestruzzo"
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
                      <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Corso Nuovo · 14 ore</span>
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
