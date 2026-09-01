import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CoursePricingSidebar from '../../components/CoursePricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';

// Contenuto switchabile Corso Datore di Lavoro (16h) / Modulo Aggiuntivo Cantieri (6h) - stesso
// meccanismo di switch a pillola usato in tutte le altre pagine corso (formazione-del-preposto.js,
// coordinatori-cantieri-cse-csp.js, template dinamico [slug].js): cambia scheda tecnica, testi,
// FAQ e box prezzo nella sidebar in base alla variante selezionata.
const CONTENUTO = {
  datore: {
    titleSuffix: '· 16 ore',
    title: 'Corso di Formazione per Datore di Lavoro',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '16 ore (4 ore modulo normativo, 12 ore organizzazione e gestione)' },
      { icon: 'fas fa-laptop', label: 'Modalità', value: 'Solo FAD (formazione a distanza asincrona) — aula e videoconferenza non disponibili' },
      // TODO: confermare con Alètheia la periodicità esatta di rinnovo (es. "ogni 5 anni") non ancora comunicata
      { icon: 'fas fa-calendar-check', label: 'Validità', value: "Da mantenere con l'aggiornamento periodico dedicato (6 ore)" },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
      { icon: 'fas fa-location-dot', label: 'Luogo del corso', value: 'Non applicabile — corso interamente in FAD' },
    ],
    descrizione: [
      "Il Corso di Formazione per Datore di Lavoro, della durata di 16 ore, è obbligatorio ai sensi dell'art. 18 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, e riguarda gli obblighi generali di formazione che gravano su chiunque rivesta il ruolo di datore di lavoro in azienda.",
      "Questo corso è distinto dal percorso RSPP Datore di Lavoro (Modulo Comune 8 ore + modulo integrativo settoriale), che riguarda specificamente il datore di lavoro che intende svolgere direttamente anche i compiti di RSPP: qui invece si tratta della formazione generale obbligatoria per il ruolo di datore di lavoro in sé, indipendentemente dalla scelta di autodesignarsi RSPP.",
      "Il corso si articola in due moduli: il Modulo I normativo (4 ore), sul sistema legislativo in materia di sicurezza, l'identificazione del ruolo del datore di lavoro, la delega di funzioni, la responsabilità civile, penale e amministrativa (D.Lgs 231/2001), e i rapporti con gli organi di vigilanza; il Modulo II sull'organizzazione e gestione della sicurezza sul lavoro (12 ore), su misure organizzative e gestionali ai sensi degli artt. 15 e 30 del D.Lgs 81/2008, valutazione dei rischi, gestione del rischio interferenziale e DUVRI, gestione delle emergenze, sorveglianza sanitaria, informazione e formazione dei lavoratori, e vigilanza sull'applicazione delle procedure di sicurezza.",
      "Il corso si svolge interamente in FAD (formazione a distanza asincrona), la modalità prevista per questo corso secondo il listino Alètheia. Per i datori di lavoro che operano in cantieri temporanei o mobili è disponibile un modulo aggiuntivo specifico dedicato a questo contesto.",
    ],
    aChiERivolto: [
      "Datori di lavoro di qualsiasi settore che devono adempiere all'obbligo formativo previsto dall'art. 18 del D.Lgs 81/2008",
      'Titolari di piccole e medie imprese che assumono direttamente il ruolo di datore di lavoro',
      'Neoassunti destinati a ruoli di datore di lavoro o a chi riceve delega di funzioni in tal senso',
      'Datori di lavoro che operano in cantieri e devono completare la formazione con il modulo aggiuntivo specifico',
    ],
    cosaImparerai: [
      'Comprendere il sistema legislativo in materia di salute e sicurezza dei lavoratori e il ruolo del datore di lavoro',
      'Comprendere condizioni e limiti della delega di funzioni',
      'Riconoscere la responsabilità civile, penale e amministrativa del datore di lavoro (D.Lgs 231/2001)',
      'Applicare le misure organizzative e gestionali di tutela previste dagli artt. 15 e 30 del D.Lgs 81/2008',
      'Gestire la valutazione dei rischi e la predisposizione delle misure di prevenzione e protezione',
      'Gestire il rischio interferenziale tramite il DUVRI e organizzare la gestione delle emergenze e del primo soccorso',
      'Organizzare la sorveglianza sanitaria e i processi di informazione, formazione e consultazione dei lavoratori',
      "Vigilare sul rispetto delle procedure di sicurezza e sull'efficacia delle misure adottate",
    ],
    faqs: [
      {
        domanda: 'Che differenza c\'è tra questo corso e il Modulo Comune RSPP Datore di Lavoro?',
        risposta: 'Questo corso riguarda la formazione generale obbligatoria per il ruolo di datore di lavoro; il Modulo Comune RSPP (8 ore) serve solo se si intende svolgere direttamente anche i compiti di RSPP in azienda.',
      },
      {
        domanda: 'Quanto dura il corso Formazione Datore di Lavoro?',
        risposta: 'Il corso dura 16 ore complessive (4 ore modulo normativo e 12 ore organizzazione e gestione).',
      },
      {
        domanda: 'Il corso si può fare in aula?',
        risposta: 'No, secondo il listino Alètheia questo corso è disponibile solo in modalità FAD.',
      },
      {
        domanda: 'Se opero in un cantiere devo fare formazione aggiuntiva?',
        risposta: 'Sì, per i datori di lavoro che operano in cantieri temporanei o mobili è disponibile un modulo aggiuntivo specifico di 6 ore.',
      },
      {
        domanda: 'Dopo questo corso serve un aggiornamento periodico?',
        risposta: 'Sì, è previsto un corso di aggiornamento dedicato di 6 ore.',
      },
    ],
    programmaTitle: 'Programma Corso di Formazione per Datore di Lavoro · 16 ore',
    moduli: [
      {
        titolo: 'MODULO I - MODULO NORMATIVO',
        durataOre: 4,
        argomenti: [
          'Il sistema legislativo in materia di salute e sicurezza dei lavoratori',
          "L'identificazione e il ruolo del datore di lavoro in relazione al contesto organizzativo",
          'I soggetti del sistema di prevenzione aziendale (D.Lgs 81/2008): compiti, obblighi, responsabilità e tutela assicurativa',
          'La delega di funzioni: condizioni e limiti',
          'La responsabilità civile e penale del datore di lavoro',
          "La responsabilità amministrativa ai sensi del D.Lgs 231/2001 nel settore privato",
          'Prevenzione della violenza e delle molestie sul luogo di lavoro (Convenzione ILO C190)',
          'Inserimento di lavoratori disabili (D.Lgs 213/2003, DL 76/2013 conv. L. 99/2013)',
          'I ruoli di ASL, INL, VVF e INAIL; organi di vigilanza e procedure ispettive',
        ],
      },
      {
        titolo: 'MODULO II - ORGANIZZAZIONE E GESTIONE DELLA SSL',
        durataOre: 12,
        argomenti: [
          'Standard tecnico-strutturali (attrezzature, impianti, luoghi di lavoro, agenti chimici/fisici/biologici) e documentazione obbligatoria',
          'Valutazione dei rischi e misure di prevenzione e protezione, inclusi stress lavoro-correlato, gravidanza, differenze di genere ed età',
          'Gestione del rischio interferenziale e DUVRI',
          'Organizzazione e gestione di emergenze, primo soccorso, appalti, riunioni periodiche di sicurezza',
          'Sorveglianza sanitaria',
          'Informazione, formazione, partecipazione e consultazione dei lavoratori',
          'Vigilanza sul rispetto di procedure e istruzioni di lavoro in sicurezza',
          'Modelli di organizzazione e gestione volontari; costi della mancata sicurezza; tecniche di comunicazione',
        ],
      },
    ],
    prezzo: [
      { label: 'FAD', value: '€ 160,00 + IVA' },
    ],
    prezzoNumerico: 160,
  },

  cantieri: {
    titleSuffix: '· 6 ore',
    title: 'Formazione Aggiuntiva "Cantieri" per Datore di Lavoro e Dirigente',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '6 ore (modulo unico)' },
      { icon: 'fas fa-laptop', label: 'Modalità', value: 'Solo FAD (formazione a distanza asincrona) — aula e videoconferenza non disponibili' },
      // TODO: confermare con Alètheia la periodicità esatta di rinnovo/validità del modulo cantieri, non ancora comunicata
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da mantenere in abbinamento al corso base (Datore di Lavoro o Dirigente) di riferimento' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
      { icon: 'fas fa-location-dot', label: 'Luogo del corso', value: 'Non applicabile — corso interamente in FAD' },
    ],
    descrizione: [
      "La Formazione Aggiuntiva \"Cantieri\", della durata di 6 ore, è un modulo integrativo ai sensi dell'art. 18 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, condiviso tra due percorsi base: chi ha già completato la Formazione per Datore di Lavoro (16 ore) e chi ha già completato la Formazione Dirigente (12 ore), qualora l'uno o l'altro operino in cantieri temporanei o mobili.",
      "A differenza dei moduli settoriali del percorso RSPP Datore di Lavoro (Agricoltura, Pesca, Costruzioni, Chimico-Petrolchimico), che sono alternativi tra loro in base al settore ATECO dell'azienda, questo modulo cantieri è un'integrazione specifica pensata per chi, indipendentemente dal proprio ruolo di datore di lavoro o dirigente, si trova a operare in un cantiere temporaneo o mobile disciplinato dal Titolo IV, Capo I, del D.Lgs 81/2008.",
      "Il corso, erogato in un modulo unico, tratta i soggetti definiti dal Titolo IV, Capo I, e i relativi obblighi e responsabilità; la redazione dei piani di sicurezza, con finalità, tempi e contenuti; le misure generali di tutela previste dall'art. 95 del D.Lgs 81/2008; gli obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell'art. 96; il cronoprogramma dei lavori; ed esempi pratici di analisi di un Piano di Sicurezza e Coordinamento (PSC) e di un Piano Operativo di Sicurezza (POS).",
      "Il corso si svolge interamente in FAD, la modalità prevista secondo il listino Alètheia. Va frequentato dopo aver completato uno dei due corsi base di riferimento (Datore di Lavoro o Dirigente), a seconda del ruolo ricoperto in azienda.",
    ],
    aChiERivolto: [
      'Datori di lavoro già formati (Formazione Datore di Lavoro, 16 ore) che operano in cantieri temporanei o mobili',
      'Dirigenti già formati (Formazione Dirigente, 12 ore) che operano in cantieri temporanei o mobili',
      'Imprese edili e datori di lavoro o dirigenti di aziende che eseguono lavori in cantiere',
      'Attenzione: questo modulo è integrativo e va frequentato dopo aver completato il corso base (Datore di Lavoro o Dirigente) pertinente al proprio ruolo',
    ],
    cosaImparerai: [
      'Riconoscere i soggetti definiti dal Titolo IV, Capo I, del D.Lgs 81/2008 e i relativi obblighi e responsabilità',
      'Comprendere finalità, tempi e contenuti della redazione dei piani di sicurezza in cantiere',
      "Applicare le misure generali di tutela previste dall'art. 95 del D.Lgs 81/2008",
      "Riconoscere gli obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell'art. 96 del D.Lgs 81/2008",
      'Predisporre correttamente il cronoprogramma dei lavori',
      'Analizzare esempi pratici di Piano di Sicurezza e Coordinamento (PSC) e di Piano Operativo di Sicurezza (POS)',
    ],
    faqs: [
      {
        domanda: 'Questo modulo è per il Datore di Lavoro o per il Dirigente?',
        risposta: 'È un modulo condiviso: si abbina sia al percorso Formazione Datore di Lavoro (16 ore) sia al percorso Formazione Dirigente (12 ore).',
      },
      {
        domanda: 'Devo fare questo modulo se non opero in cantieri?',
        risposta: 'No, è necessario solo per chi opera effettivamente in cantieri temporanei o mobili disciplinati dal Titolo IV del D.Lgs 81/2008.',
      },
      {
        domanda: 'Posso fare questo modulo senza aver completato il corso base?',
        risposta: 'No, essendo un modulo integrativo va frequentato dopo aver completato la formazione base specifica per il proprio ruolo.',
      },
      {
        domanda: 'Quanto dura il modulo cantieri?',
        risposta: 'Il modulo dura 6 ore, erogate interamente in FAD.',
      },
      {
        domanda: 'Il modulo tratta anche il Piano Operativo di Sicurezza (POS)?',
        risposta: 'Sì, il programma include esempi e analisi pratica sia di PSC sia di POS.',
      },
    ],
    programmaTitle: 'Programma Formazione Aggiuntiva "Cantieri" · 6 ore',
    moduli: [
      {
        titolo: 'MODULO UNICO - CANTIERI',
        durataOre: 6,
        argomenti: [
          'Soggetti definiti dal Titolo IV, Capo I, del D.Lgs 81/2008 e relativi obblighi e responsabilità',
          'Redazione dei piani di sicurezza: finalità, tempi e contenuti',
          "Misure generali di tutela previste dall'art. 95 del D.Lgs 81/2008",
          "Obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell'art. 96",
          'Cronoprogramma dei lavori',
          'Esempi e analisi di un Piano di Sicurezza e Coordinamento (PSC)',
          'Esempi e analisi di un Piano Operativo di Sicurezza (POS)',
        ],
      },
    ],
    prezzo: [
      { label: 'FAD', value: '€ 90,00 + IVA' },
    ],
    prezzoNumerico: 90,
  },

  aggiornamento: {
    titleSuffix: '· 6 ore',
    title: 'Aggiornamento Formazione per Datore di Lavoro',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '6 ore (modulo unico)' },
      // TODO: confermare con Alètheia se la modalità è solo FAD come il corso base
      { icon: 'fas fa-laptop', label: 'Modalità', value: 'Solo FAD (formazione a distanza asincrona) — aula e videoconferenza non disponibili' },
      // TODO: confermare con Alètheia la periodicità esatta di rinnovo (es. "ogni 5 anni") non ancora comunicata
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Aggiornamento periodico previsto dalla normativa' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
      { icon: 'fas fa-location-dot', label: 'Luogo del corso', value: 'Non applicabile — corso interamente in FAD' },
    ],
    descrizione: [
      "Questo è il corso di aggiornamento per Datore di Lavoro, della durata di 6 ore, non il corso base: è rivolto a chi ha già completato la Formazione per Datore di Lavoro (16 ore) e deve rinnovarla periodicamente, ai sensi dell'art. 18 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.",
      "L'aggiornamento periodico è obbligatorio perché il ruolo di datore di lavoro comporta responsabilità dirette in materia di salute e sicurezza che richiedono un allineamento costante alle novità normative, organizzative e di gestione del rischio introdotte nel tempo.",
      "Il corso è pensato per chi ha già l'attestato di Formazione Datore di Lavoro in scadenza. Chi invece non ha mai conseguito la formazione di base deve frequentare il corso completo di 16 ore, non l'aggiornamento.",
    ],
    aChiERivolto: [
      "Datori di lavoro già in possesso dell'attestato di Formazione Datore di Lavoro (16 ore) con formazione in scadenza",
      "Titolari di piccole e medie imprese che devono rinnovare la propria formazione periodica",
      "Attenzione: chi non ha mai conseguito la formazione di base deve prima frequentare il corso completo di 16 ore, non l'aggiornamento",
    ],
    cosaImparerai: [
      'Aggiornare le conoscenze sul sistema legislativo in materia di salute e sicurezza dei lavoratori',
      "Rivedere le responsabilità del datore di lavoro e le condizioni della delega di funzioni",
      'Aggiornare le misure organizzative e gestionali di tutela previste dagli artt. 15 e 30 del D.Lgs 81/2008',
      "Consolidare la gestione della valutazione dei rischi, del DUVRI e delle emergenze",
    ],
    faqs: [
      {
        domanda: 'Chi può fare l\'aggiornamento Datore di Lavoro?',
        risposta: "L'aggiornamento è riservato a chi ha già conseguito l'attestato di Formazione Datore di Lavoro di 16 ore. Senza formazione di base è necessario frequentare il corso completo.",
      },
      {
        domanda: 'Quanto dura l\'aggiornamento e come si articola?',
        risposta: "L'aggiornamento dura 6 ore, erogate in un modulo unico in FAD.",
      },
      {
        domanda: 'Devo fare anche il modulo cantieri se opero in cantiere?',
        risposta: 'Sì, il modulo aggiuntivo "Cantieri" (6 ore) resta un percorso separato e integrativo, da abbinare al corso base o all\'aggiornamento in base alla propria situazione formativa.',
      },
    ],
    programmaTitle: 'Programma Aggiornamento Formazione per Datore di Lavoro · 6 ore',
    // Programma corso ufficiale non ancora fornito da Alètheia: niente moduli/i, il tab "Moduli" mostra
    // il placeholder (stesso pattern di macchine-movimento-terra.js per le varianti senza PDF).
    moduli: null,
    prezzo: [
      { label: 'FAD', value: 'Prezzo su richiesta' },
    ],
    prezzoNumerico: null,
  },
};

// Dicitura placeholder per il tab Moduli quando la variante non ha ancora un programma corso
// ufficiale (vedi CONTENUTO.aggiornamento.moduli sopra).
const NOTA_MODULI_IN_AGGIORNAMENTO = 'Dettaglio moduli in aggiornamento — La ripartizione delle ore e i moduli tecnici saranno disponibili a breve.';

export default function CorsoDatoreDiLavoro() {
  const [variante, setVariante] = useState('datore');
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const carouselRef = useRef(null);

  const c = CONTENUTO[variante];

  const selectVariante = (v) => {
    setVariante(v);
    setOpenFaqIndex(null);
    setActiveTab('overview');
  };

  const families = buildCourseFamilies(coursesData, {}, { quiet: true });
  const resolveLink = (slug) => {
    const r = resolveRelatedCourse(slug, families);
    if (!r) return null;
    const famSlug = r.href.split('/').pop();
    const fam = families.find((f) => f.slug === famSlug);
    return { ...r, image: fam?.image || null };
  };

  // Corsi correlati per variante: "switchTo" attiva lo switch in-pagina invece di navigare altrove,
  // per le tre varianti che coesistono su questa stessa pagina (Datore di Lavoro <-> Cantieri <->
  // Aggiornamento) - la famiglia "datore-di-lavoro" (vedi buildCourseFamilies) raggruppa il modulo
  // comune (16h) e l'aggiornamento (6h) sotto lo stesso slug canonico, quindi l'aggiornamento non ha
  // un suo slug/pagina esterna risolvibile con resolveLink ed è raggiungibile solo con lo switch qui.
  const corsiCorrelati = variante === 'datore'
    ? [
        { titolo: 'Aggiornamento Formazione per Datore di Lavoro · 6 ore', switchTo: 'aggiornamento', meta: '6 ore' },
        { titolo: 'Formazione Aggiuntiva Cantieri per Datore di Lavoro e Dirigente · 6 ore', switchTo: 'cantieri', meta: '6 ore' },
        resolveLink('formazione-dirigente'),
        resolveLink('rspp-datore-di-lavoro-modulo-comune'),
      ].filter(Boolean)
    : variante === 'aggiornamento'
    ? [
        { titolo: 'Corso di Formazione per Datore di Lavoro · 16 ore', switchTo: 'datore', meta: '16 ore' },
        { titolo: 'Formazione Aggiuntiva Cantieri per Datore di Lavoro e Dirigente · 6 ore', switchTo: 'cantieri', meta: '6 ore' },
        resolveLink('formazione-dirigente'),
      ].filter(Boolean)
    : [
        { titolo: 'Corso di Formazione per Datore di Lavoro · 16 ore', switchTo: 'datore', meta: '16 ore' },
        resolveLink('formazione-dirigente'),
        resolveLink('coordinatori-cantieri-cse-csp'),
        resolveLink('pimus-ponteggi'),
      ].filter(Boolean);

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
        <title>{variante === 'datore' ? 'Corso Formazione Datore di Lavoro – 16h' : variante === 'cantieri' ? 'Modulo Cantieri Datore Lavoro/Dirigente – 6h' : 'Aggiornamento Formazione Datore di Lavoro – 6h'} | Alètheia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={variante === 'datore'
            ? 'Corso formazione datore di lavoro, 16 ore in FAD, art. 18 D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).'
            : variante === 'cantieri'
            ? 'Modulo aggiuntivo Cantieri per Datore di Lavoro e Dirigente, 6 ore in FAD, art. 18 D.Lgs 81/2008. Attestato valido in Italia. Alètheia, Vittoria (RG).'
            : 'Aggiornamento formazione datore di lavoro, 6 ore in FAD, art. 18 D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).'}
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

            {/* ── AREA "top": breadcrumb + H1, sola sulla prima riga ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/datore-di-lavoro" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione Datore di Lavoro</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">{variante === 'datore' ? 'Corso Datore di Lavoro' : variante === 'cantieri' ? 'Modulo Aggiuntivo Cantieri' : 'Aggiornamento Datore di Lavoro'}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {c.title} <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {/* SWITCH Datore di Lavoro / Modulo Cantieri / Aggiornamento - stesso pattern a pillola delle altre pagine corso */}
              <div role="tablist" aria-label="Variante del corso" style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25rem', background: '#F1F5F9', borderRadius: '9999px', padding: '0.25rem' }}>
                {['datore', 'cantieri', 'aggiornamento'].map((v) => (
                  <button
                    key={v}
                    role="tab"
                    type="button"
                    aria-selected={variante === v}
                    onClick={() => selectVariante(v)}
                    style={{
                      padding: '0.5rem 1.1rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: variante === v ? '#008C95' : 'transparent',
                      color: variante === v ? '#fff' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {v === 'datore' ? 'Datore di Lavoro · 16 ore' : v === 'cantieri' ? 'Modulo Cantieri · 6 ore' : 'Aggiornamento · 6 ore'}
                  </button>
                ))}
              </div>
            </div>

            {/* SCHEDA TECNICA: riga propria nella colonna sinistra, allineata alla sidebar prezzo a
                destra, sotto breadcrumb/switch e prima delle tab. Cambia con la variante selezionata. */}
            <div className="cp-scheda-area">
              <CourseSchedaTecnica items={c.schedaTecnica} />
            </div>

            {/* ── AREA "tabs": tab Panoramica, allineata alla riga della sidebar prezzo ── */}
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

                  {/* Link ipertestuale incrociato: il modulo cantieri si abbina anche al corso base Dirigente,
                      non solo al Datore di Lavoro - richiamo esplicito nel testo oltre che nei correlati sotto. */}
                  {variante === 'cantieri' && (
                    <p className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)] text-slate-600 dark:text-gray-300" style={{ borderRadius: '0.75rem', padding: '1rem 1.25rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                      <i className="fas fa-circle-info" style={{ color: '#008C95', marginRight: '0.5rem' }}></i>
                      Non hai ancora completato la formazione base? Questo modulo si abbina sia al{' '}
                      <Link href="/all-courses/datore-di-lavoro" className="text-primary dark:text-[#6EE7B7]" style={{ fontWeight: 700 }}>Corso di Formazione per Datore di Lavoro (16 ore)</Link>
                      {' '}sia al{' '}
                      <Link href="/all-courses/formazione-dirigente" className="text-primary dark:text-[#6EE7B7]" style={{ fontWeight: 700 }}>Corso di Formazione Dirigente (12 ore)</Link>.
                    </p>
                  )}

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
                    {!c.moduli ? (
                      <div className="cp-placeholder-block text-slate-500 dark:text-gray-400 border-slate-200 dark:border-[rgba(255,255,255,0.15)]">
                        {NOTA_MODULI_IN_AGGIORNAMENTO}
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet.
                Cambia riga prezzo/label in base alla variante selezionata nello switch qui sopra. */}
            <aside className="cp-info-area">
              <CoursePricingSidebar
                priceRows={c.prezzo}
                primaryHref={`/contatti?corso=${encodeURIComponent(c.title)}&tipo=preventivo`}
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Formazione%20Datore%20di%20Lavoro"
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
            {corsiCorrelati.map((cc) => {
              const cardClassName = 'corso-correlato-card group bg-white dark:bg-dark-card rounded-3xl overflow-hidden no-underline flex flex-col transition-all duration-300 hover:-translate-y-1';
              const cardStyle = { boxShadow: '0 4px 16px rgba(15,23,42,0.06)' };
              const inner = (
                <>
                  <div className="relative w-full overflow-hidden" style={{ height: '150px' }}>
                    {cc.image ? (
                      <img
                        src={cc.image}
                        alt={cc.titolo}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)' }}>
                        <i className="fas fa-graduation-cap" style={{ fontSize: '2rem', color: 'rgba(110,231,183,0.5)' }}></i>
                      </div>
                    )}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                    <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.85rem', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {cc.meta || 'Sicurezza sul Lavoro'}
                    </span>
                  </div>
                  <div style={{ padding: '1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3 }}>{cc.titolo}</span>
                    <span className="text-teal-600 dark:text-[#6EE7B7] flex items-center gap-1.5 mt-auto font-bold" style={{ fontSize: '0.8rem' }}>
                      Scopri di più
                      <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </span>
                  </div>
                </>
              );
              return cc.switchTo ? (
                <button
                  key={cc.switchTo}
                  type="button"
                  onClick={() => selectVariante(cc.switchTo)}
                  className={cardClassName}
                  style={{ ...cardStyle, cursor: 'pointer', border: 'none', padding: 0, textAlign: 'left', fontFamily: 'inherit' }}
                >
                  {inner}
                </button>
              ) : (
                <Link
                  key={cc.href}
                  href={cc.href}
                  className={cardClassName}
                  style={cardStyle}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
