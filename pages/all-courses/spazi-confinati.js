import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { useCart } from '../../context/CartContext';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

// TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
const MAPS_HREF = 'https://maps.google.com/?q=Vittoria+RG+Aletheia+Srl';

// Dicitura usata esclusivamente nel tab Moduli/Programma d'esame, in attesa del programma corso
// ufficiale (ripartizione ore/teoria-pratica) fornito da Alètheia.
// TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA
const NOTA_MODULI_IN_AGGIORNAMENTO = 'Dettaglio moduli in aggiornamento — La ripartizione delle ore e i moduli tecnici saranno disponibili a breve.';

// Stesso pattern a pillola già usato in patentino-fitosanitario.js, pes-pav-lavori-elettrici.js,
// formazione-del-preposto.js: cambia scheda tecnica, testi, FAQ e box prezzo nella sidebar in base
// alla variante selezionata (Corso Base 12h / Aggiornamento 4h). Solo modalità Aula: Videoconferenza
// e FAD sono disattivate/nascoste per questo corso.
const CONTENUTO = {
  base: {
    title: 'Corso Ambiente e Spazi Confinati',
    titleSuffix: '· 12 ore',
    breadcrumbLabel: 'Corso Spazi Confinati',
    titleSeo: 'Corso Spazi Confinati – 12 ore | Alètheia',
    metaDescription: 'Corso ambiente e spazi confinati, 12 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '12 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore, pagina dedicata)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il Corso Ambiente e Spazi Confinati da 12 ore fornisce la formazione e l'addestramento obbligatori ai sensi del D.P.R. 177/2011 per tutti i lavoratori e le imprese che operano in ambienti sospetti di inquinamento o confinati. Le attività all'interno di cisterne, silos, pozzi, reti fognarie e serbatoi presentano rischi critici di asfissia, presenza di gas tossici, incendi o esplosioni. Il percorso formativo mira a trasmettere le competenze necessarie per identificare i pericoli, applicare rigorose procedure di sicurezza pre-ingresso e gestire correttamente le strumentazioni di monitoraggio ambientale. Grande importanza viene data alle tecniche di soccorso e recupero rapido del lavoratore infortunato, garantendo la piena conformità ai requisiti di qualificazione previsti dalla legge per operare anche in regime di appalto o subappalto.",
    ],
    aChiERivolto: [
      'Operatori ecologici e addetti alla manutenzione delle reti fognarie e idriche',
      'Tecnici industriali incaricati della pulizia e manutenzione di cisterne, vasche e silos',
      'Manutentori, impiantisti e artigiani che operano in ambienti con ventilazione limitata o sospetti di inquinamento',
      'Preposti, datori di lavoro e responsabili della sicurezza che devono qualificare il personale ai sensi del D.P.R. 177/2011',
    ],
    cosaImparerai: [
      'Riconoscere e classificare gli spazi confinati e gli ambienti sospetti di inquinamento',
      'Applicare il quadro normativo di riferimento nazionale, con particolare focus sul D.P.R. 177/2011',
      "Utilizzare i dispositivi di rilevazione dell'atmosfera e analizzare i rischi tramite gas detector multigas",
      'Scegliere e indossare i DPI di terza categoria per le vie respiratorie (maschere, filtri, autorespiratori APVR)',
      'Gestire i dispositivi anticaduta, i sistemi di recupero a treppiede e i dispositivi di evacuazione rapida',
      'Attuare le procedure operative di emergenza, salvataggio e primo soccorso specifico per ambienti confinati',
    ],
    faqs: [
      {
        domanda: 'Quali ambienti vengono considerati spazi confinati secondo il D.P.R. 177/2011?',
        risposta: "Rientrano in questa categoria tutti gli ambienti limitati o non progettati per un'occupazione continua, in cui il pericolo di morte o di infortunio grave è molto elevato a causa della presenza di agenti chimici pericolosi o carenza di ossigeno, come silos, cisterne, pozzi e fogne.",
      },
      {
        domanda: 'Il corso da 12 ore prevede un addestramento pratico?',
        risposta: "Sì, il corso include una sezione dedicata alle esercitazioni pratiche sull'uso dei rilevatori di gas, sul corretto posizionamento dei sistemi di recupero e sull'indossamento dei DPI di terza categoria.",
      },
      {
        domanda: "Quali sanzioni rischia l'azienda se opera senza questa qualificazione?",
        risposta: 'Il D.P.R. 177/2011 impone la presenza di personale interamente formato e addestrato; la mancata qualificazione comporta l\'impossibilità di operare in questi ambienti e sanzioni penali e amministrative severe per il datore di lavoro.',
      },
    ],
    programmaTitle: 'Programma Corso Ambiente e Spazi Confinati · 12 ore',
    prezzo: [
      { label: 'Aula', value: '€ 280,00 + IVA' },
    ],
    prezzoNumerico: 280,
  },

  aggiornamento: {
    title: 'Aggiornamento Ambiente e Spazi Confinati',
    titleSuffix: '· 4 ore',
    breadcrumbLabel: 'Aggiornamento Spazi Confinati',
    titleSeo: 'Aggiornamento Spazi Confinati – 4h | Alètheia',
    metaDescription: 'Aggiornamento ambiente e spazi confinati, 4 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '4 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da ripetere periodicamente — da definire' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA - confermare la periodicità esatta di rinnovo
      "L'Aggiornamento per Ambiente e Spazi Confinati da 4 ore è il percorso obbligatorio dedicato al rinnovo periodico dell'abilitazione professionale per l'accesso e il lavoro in ambienti critici. Il corso si concentra sul ripasso e sul consolidamento delle procedure di sicurezza pre-ingresso e delle istruzioni operative aziendali. Attraverso l'analisi dei trend di infortunio più recenti e lo studio di casi reali, i partecipanti aggiornano la propria consapevolezza del rischio e verificano l'evoluzione tecnologica dei sistemi di rilevazione dell'atmosfera e dei dispositivi di protezione e salvataggio individuale.",
    ],
    aChiERivolto: [
      'Operatori, manutentori e tecnici che hanno già completato il corso base da 12 ore e devono rinnovare la propria qualifica prima della scadenza',
      'Preposti e datori di lavoro che supervisionano le attività in spazi confinati e devono mantenere aggiornate le competenze operative delle squadre',
    ],
    cosaImparerai: [
      'Analizzare le novità normative e le nuove linee guida nazionali ed europee sugli spazi confinati',
      'Ripassare le check-list operative pre-ingresso e la gestione dei permessi di lavoro elettrici o meccanici',
      "Verificare le procedure di evacuazione rapida e l'utilizzo dei sistemi di ventilazione forzata",
      'Simulare gli interventi di salvataggio e la cooperazione con i servizi di emergenza esterni',
    ],
    faqs: [
      {
        domanda: "Ogni quanti anni va effettuato l'aggiornamento per gli spazi confinati?",
        // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA - confermare la periodicità esatta di rinnovo
        risposta: 'La periodicità del rinnovo è legata alle scadenze normative della sicurezza sul lavoro e alla qualificazione dell\'impresa ai sensi del D.P.R. 177/2011, richiedendo un richiamo periodico costante.',
      },
      {
        domanda: "Si può frequentare l'aggiornamento se il vecchio attestato è scaduto da molto tempo?",
        risposta: 'In caso di scadenza prolungata, è necessario verificare la validità dei crediti pregressi con l\'ente formativo per confermare se sia sufficiente il modulo da 4 ore o se sia necessario ripetere il percorso base.',
      },
      {
        domanda: "L'aggiornamento può essere svolto interamente online in modalità e-learning?",
        risposta: "No, date le caratteristiche operative e la necessità di mantenere l'addestramento pratico sui sistemi di recupero e salvataggio, il corso Alètheia viene erogato in modalità d'aula.",
      },
    ],
    programmaTitle: 'Programma Aggiornamento Ambiente e Spazi Confinati · 4 ore',
    prezzo: [
      { label: 'Aula', value: '€ 160,00 + IVA' },
    ],
    prezzoNumerico: 160,
  },
};

const corsiCorrelatiSlugs = [
  'lavori-in-quota',
  'formazione-dei-lavoratori-rischio-alto',
];

export default function CorsoSpaziConfinati() {
  const { addToCart, setCartOpen } = useCart();
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

        .cp-placeholder-block {
          border: 1px dashed; border-radius: 0.75rem; padding: 1rem 1.25rem;
          font-size: 0.85rem; font-style: italic;
        }

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
                    {/* <!-- TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA --> */}
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

            {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet.
                Cambia riga prezzo/label in base alla variante selezionata nello switch qui sopra. */}
            <aside className="cp-price-area">
              <PricingSidebar
                priceRows={c.prezzo}
                onBuyClick={() => { addToCart({ id: `spazi-confinati-${selectedTipo}`, slug: 'spazi-confinati', title: c.title, variant: c.titleSuffix, price: c.prezzoNumerico }); setCartOpen(true); }}
                buyLabel="Acquista ora"
                onAddToCartClick={() => addToCart({ id: `spazi-confinati-${selectedTipo}`, slug: 'spazi-confinati', title: c.title, variant: c.titleSuffix, price: c.prezzoNumerico })}
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Ambiente%20e%20Spazi%20Confinati"
              >
                {selectedTipo === 'base' && (
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
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Aggiornamento 160€</span>
                  </button>
                )}
                {selectedTipo === 'aggiornamento' && (
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
                    <span style={{ fontWeight: 800, color: '#008C95', whiteSpace: 'nowrap' }}>Corso Spazi Confinati · 12 ore, 280€</span>
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
