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

// Dicitura usata esclusivamente nella sezione del programma/ore dei moduli tecnici, in attesa del
// programma corso ufficiale fornito da Alètheia, per tutte e 7 le opzioni.
// TODO: SPECIFICARE ORE MODULI CON PDF ALÈTHEIA
const NOTA_MODULI_IN_AGGIORNAMENTO = 'Dettaglio moduli in aggiornamento — La ripartizione delle ore e i moduli tecnici saranno disponibili a breve.';

const corsiCorrelatiSlugs = [
  'carrelli-elevatori-semoventi-conduttore-a-bordo',
  'ple-piattaforme-di-lavoro-mobili-elevabili',
  'operatore-di-gru-per-autocarro',
];

const ORDINE_SWITCH = ['escavatoriIdraulici', 'escavatoriFune', 'paleCaricatrici', 'terne', 'autoribaltabili', 'combinato', 'aggiornamento'];

const PILL_LABEL = {
  escavatoriIdraulici: 'Escavatori Idraulici · 10h',
  escavatoriFune: 'Escavatori a Fune · 10h',
  paleCaricatrici: 'Pale Caricatrici Frontali · 12h',
  terne: 'Terne · 10h',
  autoribaltabili: 'Autoribaltabili a Cingoli · 10h',
  combinato: 'Corso Combinato · 16h',
  aggiornamento: 'Aggiornamento · 4h',
};

// FAQ unica e trasversale: copre le domande comuni a tutte le varianti, senza duplicarle per tab
// (stessa lista mostrata in fondo alla Panoramica indipendentemente dalla macchina selezionata).
const FAQ_UNICA = [
  {
    domanda: 'Qual è la differenza tra le varie macchine movimento terra?',
    risposta: "Ogni macchina ha un ambito d'impiego specifico — scavo in profondità (escavatori idraulici e a fune), carico e movimentazione di materiali sciolti (caricatori frontali), lavori misti su cantieri piccoli e medi (terne) o trasporto su terreni difficili (autoribaltabili a cingoli). Trovi il dettaglio nella descrizione di ciascuna variante qui sopra.",
  },
  {
    domanda: 'Conviene il corso combinato o i corsi singoli?',
    risposta: "Se devi operare abitualmente con più di una tra escavatori idraulici, caricatori frontali e terne, il corso combinato da 16 ore conviene sia in termini di costo (300€ + IVA contro 200€ + IVA cadauno) sia di tempo, poiché accorpa i moduli teorici comuni alle tre macchine.",
  },
  {
    domanda: "Ogni quanto va rinnovata l'abilitazione?",
    risposta: "L'abilitazione va rinnovata periodicamente frequentando il corso di aggiornamento da 4 ore, valido per escavatori idraulici, caricatori frontali e terne già abilitati, ai sensi dell'art. 73 e dell'Allegato IX del D.Lgs 81/2008.",
  },
  {
    domanda: "L'abilitazione è valida su tutto il territorio nazionale?",
    risposta: 'Sì, l\'attestato rilasciato al termine del corso — sia esso per una singola macchina, per il percorso combinato o per l\'aggiornamento — è valido su tutto il territorio nazionale.',
  },
  {
    domanda: 'Il corso prevede una prova pratica sul mezzo?',
    risposta: 'Sì, tutte le varianti includono una parte di addestramento pratico e una verifica finale di apprendimento, che si svolgono in sicurezza presso il campo prove attrezzato di Alètheia S.r.l. a Vittoria (RG).',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UNICO OGGETTO DATI DI PAGINA — le 7 configurazioni (5 macchine singole + corso combinato +
// aggiornamento). Stessa struttura standard delle altre pagine corso: scheda tecnica in cima al tab
// Panoramica, poi Descrizione / A chi è rivolto / Cosa imparerai / FAQ sotto. La FAQ è condivisa
// (FAQ_UNICA sopra) per evitare la duplicazione delle stesse domande su 7 varianti.
// ─────────────────────────────────────────────────────────────────────────────
const CONTENUTO = {
  escavatoriIdraulici: {
    title: 'Corso Addetti alla Conduzione di Escavatori Idraulici',
    titleSuffix: '· 10 ore',
    breadcrumbLabel: 'Corso Escavatori Idraulici',
    titleSeo: 'Corso Escavatori Idraulici – 10 ore | Alètheia',
    metaDescription: "Corso conduzione escavatori idraulici, 10 ore, art. 73 e Allegato IX D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).",
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '10 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "La conduzione di escavatori idraulici richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Gli escavatori idraulici sono macchine cingolate o gommate dotate di braccio articolato a comando idraulico e struttura superiore girevole a 360°, tra le più diffuse nei cantieri edili, stradali e di urbanizzazione.",
      "Il corso, della durata di 10 ore, fornisce le competenze per lo scavo, la demolizione controllata e la movimentazione di materiali in profondità, con particolare attenzione alla valutazione della stabilità del mezzo, al corretto posizionamento su terreno e alla lettura dei diagrammi di carico.",
    ],
    aChiERivolto: [
      'Operai edili, movieri e addetti ai cantieri stradali o infrastrutturali',
      'Operatori del movimento terra e personale addetto allo scavo di fondazioni, trincee e sottoservizi',
      'Imprenditori, artigiani e lavoratori autonomi che utilizzano escavatori idraulici nel settore delle costruzioni',
    ],
    cosaImparerai: [
      "Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)",
      "Riconoscere i componenti strutturali e i dispositivi di sicurezza dell'escavatore idraulico",
      'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
      'Applicare le tecniche operative di scavo e movimentazione dei materiali in sicurezza',
      'Gestire la stabilità del mezzo tramite il corretto posizionamento dei piedi stabilizzatori',
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Escavatori Idraulici · 10 ore',
    moduli: [
      {
        titolo: 'MODULO I - GIURIDICO-NORMATIVO',
        durataOre: 1,
        argomenti: [
          "Presentazione del corso; cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)",
          'Responsabilità dell\'operatore',
        ],
      },
      {
        titolo: 'MODULO II - TECNICO',
        durataOre: 3,
        argomenti: [
          'Attrezzature con riferimento a escavatori, caricatori, terne e autoribaltabili a cingoli',
          'Componenti strutturali; dispositivi di comando e sicurezza',
          'Visibilità e identificazione zone cieche',
          'Controlli; uso in sicurezza, rischi e precauzioni',
          'Protezione da agenti fisici',
        ],
      },
      {
        titolo: 'MODULO III - PRATICO',
        durataOre: 6,
        argomenti: [
          'Componenti strutturali; individuazione dei dispositivi di comando e di sicurezza',
          'Controlli pre-utilizzo; pianificazione operazioni di campo',
          'Operazioni di movimentazione carichi, manovra di agganci rapidi per attrezzi',
          'Esercitazioni pratiche; guida dell\'escavatore su strada',
        ],
      },
    ],
    prezzo: [{ label: 'Aula', value: '€ 200,00 + IVA' }],
    prezzoNumerico: 200,
  },

  escavatoriFune: {
    title: 'Corso Addetti alla Conduzione di Escavatori a Fune',
    titleSuffix: '· 10 ore',
    breadcrumbLabel: 'Corso Escavatori a Fune',
    titleSeo: 'Corso Escavatori a Fune – 10 ore | Alètheia',
    metaDescription: 'Corso conduzione escavatori a fune, 10 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '10 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "La conduzione di escavatori a fune richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Gli escavatori a fune utilizzano un sistema di cavi e argani per il comando del braccio e della benna, anziché la trasmissione idraulica: una tecnologia più robusta, tipicamente impiegata per la gestione di carichi e volumi elevati.",
      "Il corso, della durata di 10 ore, trova applicazione tipica in cantieri di grande scavo, opere di movimento terra su larga scala e attività estrattive, dove trasmette le competenze per la valutazione della stabilità del mezzo, il posizionamento sul terreno e l'esecuzione di manovre operative complesse.",
    ],
    aChiERivolto: [
      'Operatori di cantieri di grande scavo e opere di movimento terra su larga scala',
      'Addetti a cave, attività estrattive e lavorazioni minerarie',
      'Imprenditori e lavoratori autonomi che utilizzano escavatori a fune in grandi opere infrastrutturali',
    ],
    cosaImparerai: [
      "Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)",
      "Riconoscere i componenti strutturali e i dispositivi di sicurezza dell'escavatore a fune",
      'Eseguire i controlli pre-uso e le manutenzioni giornaliere del sistema a cavi e argani',
      'Applicare le tecniche operative di scavo e movimentazione di grandi volumi in sicurezza',
      "Gestire la stabilità del mezzo e le procedure di emergenza in caso di guasto meccanico",
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Escavatori a Fune · 10 ore',
    prezzo: [{ label: 'Aula', value: '€ 200,00 + IVA' }],
    prezzoNumerico: 200,
  },

  paleCaricatrici: {
    title: 'Corso Addetti alla Conduzione di Pale Caricatrici Frontali e con Braccio Mobile (Ragno)',
    titleSuffix: '· 12 ore',
    breadcrumbLabel: 'Corso Pale Caricatrici Frontali',
    titleSeo: 'Corso Pale Caricatrici Frontali – 12 ore | Alètheia',
    metaDescription: 'Corso conduzione pale caricatrici frontali e con braccio mobile (ragno), 12 ore, artt. 37, 71 comma 7 e 73 comma 5 D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '12 ore (1 giuridico-normativo, 3 tecnico, 8 pratico)' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "La conduzione di pale caricatrici frontali e con braccio mobile (ragno) richiede una specifica abilitazione ai sensi degli artt. 37, 71 comma 7 e 73 comma 5 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 17 aprile 2025. Sono macchine gommate o cingolate dotate di benna frontale (o braccio mobile) per il carico, lo spostamento e l'accatastamento di materiali sciolti come inerti, terra e rifiuti da costruzione.",
      "Il corso, della durata di 12 ore, è la formazione di riferimento per chi opera nella logistica di cantiere, nei piazzali di stoccaggio e negli impianti di riciclaggio inerti, e trasmette le competenze per il carico in sicurezza, il calcolo dei pesi e la gestione della stabilità del mezzo.",
    ],
    aChiERivolto: [
      'Operatori della logistica di cantiere e addetti allo stoccaggio inerti',
      'Personale di impianti di riciclaggio inerti e materiali da costruzione',
      'Imprenditori e lavoratori autonomi che utilizzano pale caricatrici nella movimentazione materiali',
    ],
    cosaImparerai: [
      "Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)",
      'Riconoscere i componenti strutturali e i dispositivi di sicurezza del caricatore frontale',
      'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
      'Applicare le tecniche operative di carico, spostamento e accatastamento dei materiali sciolti',
      'Gestire la stabilità del mezzo durante le fasi di carico e trasporto',
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Pale Caricatrici Frontali e con Braccio Mobile (Ragno) · 12 ore',
    moduli: [
      {
        titolo: 'MODULO I - GIURIDICO-NORMATIVO',
        durataOre: 1,
        argomenti: [
          'Cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)',
          'Responsabilità dell\'operatore',
        ],
      },
      {
        titolo: 'MODULO II - TECNICO',
        durataOre: 3,
        argomenti: [
          'Categorie di attrezzature: escavatori, caricatori, terne',
          'Componenti strutturali e circuiti di comando',
          'Dispositivi di comando e di sicurezza; visibilità e zone cieche',
          'Controlli pre-utilizzo, modalità di utilizzo in sicurezza e rischi',
          'Avviamento, spostamento, azionamenti e manovre',
          'Protezione nei confronti degli agenti fisici: rumore e vibrazioni',
        ],
      },
      {
        titolo: 'MODULO III - PRATICO',
        durataOre: 8,
        argomenti: [
          'Individuazione dei componenti strutturali e dei dispositivi di comando e sicurezza',
          'Controlli pre-utilizzo del caricatore',
          'Pianificazione delle operazioni di caricamento',
          'Operazioni di movimentazione e sollevamento carichi, agganci rapidi per attrezzi',
          'Esercitazioni: predisposizione del mezzo, guida con attrezzature, trasferimento stradale',
          'Uso del caricatore in campo: manovra di caricamento, movimentazione carichi pesanti, uso con forche o pinza',
          'Messa a riposo e trasporto del caricatore',
        ],
      },
    ],
    prezzo: [{ label: 'Aula', value: '€ 200,00 + IVA' }],
    prezzoNumerico: 200,
  },

  terne: {
    title: 'Corso Addetti alla Conduzione di Terne',
    titleSuffix: '· 10 ore',
    breadcrumbLabel: 'Corso Terne',
    titleSeo: 'Corso Terne – 10 ore | Alètheia',
    metaDescription: 'Corso conduzione terne, 10 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '10 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "La conduzione di terne richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Le terne sono macchine combinate che uniscono nella stessa struttura una pala caricatrice anteriore e un braccio escavatore posteriore, offrendo grande versatilità operativa in un unico mezzo.",
      "Il corso, della durata di 10 ore, è particolarmente indicato per cantieri di piccole e medie dimensioni, interventi di manutenzione stradale e scavi localizzati dove non è economicamente conveniente impiegare due macchine distinte, e trasmette le competenze per l'uso sicuro di entrambi gli attrezzi della macchina.",
    ],
    aChiERivolto: [
      'Operai edili e addetti a cantieri di piccole e medie dimensioni',
      'Personale addetto alla manutenzione stradale e a scavi localizzati',
      'Imprenditori e lavoratori autonomi che necessitano di un mezzo versatile per pala e scavo',
    ],
    cosaImparerai: [
      "Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)",
      'Riconoscere i componenti strutturali e i dispositivi di sicurezza della terna',
      'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
      "Applicare le tecniche operative di scavo con il braccio posteriore e di carico con la pala anteriore",
      'Gestire la stabilità del mezzo nel passaggio tra le due modalità operative',
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Terne · 10 ore',
    moduli: [
      {
        titolo: 'MODULO I - GIURIDICO-NORMATIVO',
        durataOre: 1,
        argomenti: [
          "Presentazione del corso; cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)",
          'Responsabilità dell\'operatore',
        ],
      },
      {
        titolo: 'MODULO II - TECNICO',
        durataOre: 3,
        argomenti: [
          'Categorie di attrezzature: escavatori, caricatori, terne e autoribaltabili a cingoli',
          'Componenti strutturali e circuiti di comando',
          'Dispositivi di comando e di sicurezza; visibilità e zone cieche',
          'Controlli pre-utilizzo, modalità di utilizzo in sicurezza e rischi',
          'Protezione nei confronti degli agenti fisici: rumore e vibrazioni',
        ],
      },
      {
        titolo: 'MODULO III - PRATICO (I)',
        durataOre: 3,
        argomenti: [
          'Individuazione dei componenti strutturali e dei dispositivi di comando e sicurezza',
          'Controlli pre-utilizzo della terna',
          'Pianificazione delle operazioni di scavo e caricamento',
          'Operazioni di movimentazione carichi, agganci rapidi per attrezzi',
        ],
      },
      {
        titolo: 'MODULO IV - PRATICO (II)',
        durataOre: 3,
        argomenti: [
          'Guida della terna su strada',
          'Esecuzione di manovre di scavo e riempimento, accoppiamento attrezzature',
          'Manovre di livellamento e movimentazione carichi di precisione',
          'Aggancio di attrezzature speciali (martello demolitore, pinza idraulica, trivella)',
          'Messa a riposo e trasporto della terna',
        ],
      },
    ],
    prezzo: [{ label: 'Aula', value: '€ 200,00 + IVA' }],
    prezzoNumerico: 200,
  },

  autoribaltabili: {
    title: 'Corso Addetti alla Conduzione di Autoribaltabili a Cingoli',
    titleSuffix: '· 10 ore',
    breadcrumbLabel: 'Corso Autoribaltabili a Cingoli',
    titleSeo: 'Corso Autoribaltabili a Cingoli – 10 ore | Alètheia',
    metaDescription: 'Corso conduzione autoribaltabili a cingoli, 10 ore. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '10 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "La conduzione di autoribaltabili a cingoli richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Sono mezzi cingolati dotati di cassone ribaltabile, progettati per il trasporto di materiali sciolti su terreni difficili, sconnessi o in forte pendenza, dove i normali dumper su ruote non potrebbero operare in sicurezza.",
      "Il corso, della durata di 10 ore, è rivolto a chi opera soprattutto in cantieri di montagna, su sterrati e in aree con scarsa portanza del terreno, e trasmette le competenze per il trasporto e lo scarico in sicurezza su pendenze e fondi difficili.",
    ],
    aChiERivolto: [
      'Operatori di cantieri di montagna e in aree con accesso difficoltoso',
      'Addetti al trasporto di materiali su terreni sconnessi o in forte pendenza',
      'Imprenditori e lavoratori autonomi che operano in cantieri privi di viabilità carrabile ordinaria',
    ],
    cosaImparerai: [
      "Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)",
      "Riconoscere i componenti strutturali e i dispositivi di sicurezza dell'autoribaltabile a cingoli",
      'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
      'Applicare le tecniche di trasporto e scarico in sicurezza su terreni difficili e in pendenza',
      'Gestire la stabilità del mezzo e il rischio di ribaltamento su fondi sconnessi',
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Autoribaltabili a Cingoli · 10 ore',
    moduli: [
      {
        titolo: 'MODULO I - NORMATIVO-GIURIDICO',
        durataOre: 1,
        argomenti: [
          'Panorama normativo in materia di sicurezza e igiene nei luoghi di lavoro (D.Lgs 81/2008)',
          'Responsabilità dell\'operatore',
        ],
      },
      {
        titolo: 'MODULO II - TECNICO',
        durataOre: 3,
        argomenti: [
          'Categorie di attrezzature con riferimento agli escavatori',
          'Componenti strutturali e circuiti di comando',
          'Dispositivi di comando e di sicurezza; visibilità e zone cieche',
          'Controlli pre-utilizzo, modalità di utilizzo in sicurezza e rischi',
          'Protezione nei confronti degli agenti fisici: rumore e vibrazioni',
        ],
      },
      {
        titolo: 'MODULO III - PRATICO',
        durataOre: 6,
        argomenti: [
          'Predisposizione del mezzo e posizionamento organi di lavoro',
          'Guida a pieno carico e trasferimento stradale',
          'Uso dell\'autoribaltabile in campo: manovre di scaricamento e spargimento',
          'Messa a riposo dell\'autoribaltabile',
        ],
      },
    ],
    prezzo: [{ label: 'Aula', value: '€ 200,00 + IVA' }],
    prezzoNumerico: 200,
  },

  combinato: {
    title: 'Corso Addetti alla Conduzione di Escavatori Idraulici, Caricatori Frontali e Terne',
    titleSuffix: '· 16 ore',
    breadcrumbLabel: 'Corso Combinato',
    titleSeo: 'Corso Escavatori, Caricatori, Terne – 16h | Alètheia',
    metaDescription: 'Corso combinato escavatori idraulici, caricatori frontali e terne, 16 ore. Attestato valido in Italia. Alètheia S.r.l., Vittoria (RG).',
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '16 ore' },
      // TODO: VERIFICARE INDIRIZZO MAPPA E VALIDITÀ CON ALÈTHEIA
      { icon: 'fas fa-calendar-check', label: 'Validità', value: 'Da definire — aggiornamento disponibile (4 ore)' },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Il Corso Base Combinato per Macchine Movimento Terra (MMT) da 16 ore fornisce la formazione teorico-pratica obbligatoria ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni. Questo specifico percorso formativo \"all-in-one\" consente di ottenere contemporaneamente l'abilitazione alla conduzione di 3 distinte categorie di macchine pesanti: gli Escavatori Idraulici (macchine cingolate o gommate con struttura superiore girevole), i Caricatori Frontali (conosciuti comunemente come pale meccaniche) e le Terne (macchine combinate che uniscono la versatilità della pala anteriore e la precisione dell'escavatore posteriore).",
      "Il corso trasmette le competenze fondamentali per la valutazione della stabilità dei mezzi, il posizionamento degli stabilizzatori sui terreni di cantiere, la lettura dei diagrammi di carico e l'esecuzione di manovre operative complesse, garantendo l'incolumità dell'operatore e riducendo drasticamente il rischio di ribaltamento o schiacciamento.",
    ],
    aChiERivolto: [
      'Operai edili, carpentieri e addetti ai cantieri stradali o infrastrutturali',
      'Operatori del movimento terra e personale addetto alla logistica di cantiere o stoccaggio inerti',
      'Imprenditori, artigiani e lavoratori autonomi che utilizzano macchinari pesanti nel settore delle costruzioni',
      "Datori di lavoro che devono qualificare e abilitare il personale all'uso combinato di escavatori, pale e terne",
    ],
    cosaImparerai: [
      'Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)',
      'Riconoscere i componenti strutturali e i dispositivi di sicurezza di escavatori idraulici, caricatori frontali e terne',
      'Eseguire correttamente i controlli pre-uso, i test funzionali e le manutenzioni giornaliere dei mezzi',
      'Applicare le tecniche operative di scavo, livellamento del terreno, carico e trasporto dei materiali in sicurezza',
      'Gestire la stabilità dei mezzi tramite il corretto posizionamento dei piedi stabilizzatori e delle lame livellatrici',
      "Attuare le procedure di emergenza in caso di guasto meccanico, idraulico o instabilità del terreno",
    ],
    programmaTitle: 'Programma Corso Addetti alla Conduzione di Escavatori Idraulici, Caricatori Frontali e Terne · 16 ore',
    moduli: [
      {
        titolo: 'MODULO I - GIURIDICO-NORMATIVO',
        durataOre: 1,
        argomenti: [
          "Presentazione del corso; cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)",
          'Responsabilità dell\'operatore',
        ],
      },
      {
        titolo: 'MODULO II - TECNICO',
        durataOre: 3,
        argomenti: [
          'Attrezzature con riferimento a escavatori, caricatori, terne e autoribaltabili a cingoli',
          'Componenti strutturali; dispositivi di comando e sicurezza',
          'Visibilità e identificazione zone cieche',
          'Controlli; uso in sicurezza, rischi e precauzioni',
          'Protezione da agenti fisici',
        ],
      },
      {
        titolo: 'MODULO III - PRATICO (I)',
        durataOre: 6,
        argomenti: [
          'Individuazione dei componenti strutturali e dei dispositivi di comando e sicurezza',
          'Controlli pre-utilizzo',
          'Pianificazione delle operazioni di campo, scavo e caricamento',
          'Operazioni di movimentazione e sollevamento carichi, agganci rapidi per attrezzi',
        ],
      },
      {
        titolo: 'MODULO IV - PRATICO (II)',
        durataOre: 6,
        argomenti: [
          'Esercitazioni di pratiche operative',
          'Uso, messa a riposo e trasporto di escavatori idraulici, caricatori frontali e terne',
          'Salita sul carrellone di trasporto',
          'Individuazione dei punti di aggancio per il sollevamento',
        ],
      },
    ],
    prezzo: [{ label: 'Aula', value: '€ 300,00 + IVA' }],
    prezzoNumerico: 300,
  },

  aggiornamento: {
    title: 'Aggiornamento Addetti alla Conduzione di Macchine Movimento Terra',
    titleSuffix: '· 4 ore',
    breadcrumbLabel: 'Aggiornamento',
    titleSeo: 'Aggiornamento Macchine Movimento Terra – 4h | Alètheia',
    metaDescription: "Aggiornamento conduzione escavatori idraulici, caricatori frontali e terne, 4 ore, art. 73 e Allegato IX D.Lgs 81/2008. Attestato valido in tutta Italia. Alètheia S.r.l., Vittoria (RG).",
    schedaTecnica: [
      { icon: 'fas fa-clock', label: 'Durata', value: '4 ore (interamente pratiche)' },
      { icon: 'fas fa-calendar-check', label: 'Validità', value: "Da ripetere periodicamente ai sensi dell'art. 73 e dell'Allegato IX del D.Lgs 81/2008" },
      { icon: 'fas fa-certificate', label: 'Attestato', value: 'Valido in tutta Italia' },
      { icon: 'fas fa-users', label: 'Partecipanti', value: 'Max 30 persone' },
    ],
    descrizione: [
      "Questo è il corso di aggiornamento abilitante per addetti alla conduzione di escavatori idraulici, caricatori frontali e terne, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale e deve rinnovarlo prima della scadenza, ai sensi dell'art. 73 e dell'Allegato IX del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.",
      "Il corso, interamente pratico, richiama i contenuti principali del corso base sulla responsabilità dell'operatore e sulle modalità di uso in sicurezza, e prevede esercitazioni pratiche operative con simulazioni di movimentazione di escavatori idraulici, caricatori frontali e terne.",
    ],
    aChiERivolto: [
      'Operatori e conducenti di macchine movimento terra già formati, con attestato in scadenza',
      "Lavoratori edili e impiantisti in possesso del patentino MMT che devono rinnovare la propria idoneità",
      'Datori di lavoro che devono garantire l\'aggiornamento periodico degli operatori',
    ],
    cosaImparerai: [
      "Richiamare la normativa generale in materia di igiene e sicurezza sull'uso di attrezzature semoventi con operatore a bordo",
      'Riconoscere i fattori di rischio e pericolo e le modalità di uso in sicurezza',
      "Individuare i dispositivi di comando e sicurezza e il loro funzionamento",
      'Esercitarsi in simulazioni di movimentazione di escavatori idraulici, caricatori frontali e terne',
      'Applicare le procedure operative di sicurezza, di salvataggio e le manovre di emergenza',
    ],
    programmaTitle: 'Programma Aggiornamento Addetti alla Conduzione di Escavatori Idraulici, Caricatori Frontali e Terne · 4 ore',
    moduli: [
      {
        titolo: 'MODULO UNICO - MODULO PRATICO',
        durataOre: 4,
        argomenti: [
          "Cenni di normativa generale in materia di igiene e sicurezza del lavoro con riferimento all'uso di attrezzature semoventi con operatore a bordo",
          "Responsabilità dell'operatore, modalità di uso in sicurezza e individuazione dei fattori di rischio e pericolo",
          'Esercitazioni pratiche operative',
          'Individuazione dei dispositivi di comando e sicurezza e loro funzionamento',
          'Simulazioni di movimentazione di escavatori idraulici, caricatori frontali e terne',
          'Procedure operative di sicurezza, di salvataggio e manovre di emergenza',
          'Controlli pre-post utilizzo',
        ],
      },
    ],
    prezzo: [{ label: 'Aula', value: '€ 100,00 + IVA' }],
    prezzoNumerico: 100,
  },
};

export default function CorsoMacchineMovimentoTerra() {
  const [selectedTipo, setSelectedTipo] = useState('combinato');
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

            {/* ── AREA "top": breadcrumb + H1 + switch fra le 7 configurazioni ── */}
            <div className="cp-top-area">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Home</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/formazione/obbligatoria" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Formazione obbligatoria</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <Link href="/all-courses/macchine-movimento-terra" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Macchine Movimento Terra</Link>
                <span className="text-slate-300 dark:text-gray-600">/</span>
                <span className="text-slate-600 dark:text-gray-300">{c.breadcrumbLabel}</span>
              </nav>

              <h1 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {c.title} <span className="text-slate-400 dark:text-gray-500" style={{ fontWeight: 700 }}>{c.titleSuffix}</span>
              </h1>

              {/* SWITCH fra le 7 configurazioni MMT - stesso pattern a pillola delle altre pagine corso,
                  con flex-wrap per accogliere le 7 opzioni su più righe se necessario. */}
              <div role="tablist" aria-label="Tipologia macchina / aggiornamento" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', background: '#F1F5F9', borderRadius: '1.25rem', padding: '0.25rem' }}>
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
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {PILL_LABEL[tipo]}
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
                        Solo modalità Aula per tutte e 7 le opzioni: Videoconferenza e FAD non sono
                        attive/selezionabili né visibili per questo corso. */}
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
                      {FAQ_UNICA.map((item, i) => {
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
                      </>
                    )}
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
                whatsappHref="https://wa.me/?text=Informazioni%20corso%20Macchine%20Movimento%20Terra"
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
