// Contenuti editoriali per le 3 famiglie dell'Offerta formativa professionale - Avviso 2/2018:
// 'cucina-professionale', 'addetto-panificatore-e-pasticciere', 'operatore-informativo-di-risorse-web'
// (family.id derivato dal titolo raw). Tutte a variante unica (solo tipo 'corso'), un solo livello 'livello-1'.
// FONTE: public/pdf/archivio/descrizioni.json, chiavi 'avviso-2-2018/corso-di-cucina',
// 'avviso-2-2018/addetto-panificatore-pasticciere', 'avviso-2-2018/operatore-informatico-risorse-web'
// (qualifica, codici CIP/CUP/CS/ED ed elenco moduli con ore). Titoli dei moduli normalizzati in sentence case;
// corretti solo due refusi evidenti del sorgente ("LAVOR" -> "lavoro", "DOWNOLAD" -> "download").
//
// DURATA TOTALE VOLUTAMENTE OMESSA: i dati del progetto sono incoerenti. Somma ore dei moduli elencati: cucina 376,
// panificatore 404, web 344; titolo in descrizioni.json: cucina 500, panificatore 644, web 544; coursesRaw.js:
// cucina 576, panificatore 644, web 544. L'elenco moduli non comprende quindi tutte le ore (probabile stage/altre
// attività non riportate): da confermare prima di mostrare una durata totale.
//
// FAQ: sintesi della pagina ufficiale dell'Avviso 2/2018 (PO FSE Sicilia 2014-2020) - titolo, finalità, destinatari,
// dotazione finanziaria, qualifica in coerenza con il repertorio regionale:
//   https://www.sicilia-fse.it/avvisi-e-bandi/po-fse-2014-2020/avviso-2-2018
// NON presenti nella pagina ufficiale consultata e quindi NON inserite (alcuni siti di terzi le citano): gratuità per i
// partecipanti, importo dell'indennità di frequenza, durata dei percorsi, stage.

// FAQ comuni ai 3 percorsi (stesso Avviso); ogni corso aggiunge in coda le FAQ sulla propria figura professionale e sul programma.
const faqAvviso = [
  {
    domanda: 'Cos\'è l\'Avviso 2/2018?',
    risposta: 'L\'Avviso 2/2018 del PO FSE Sicilia 2014-2020 è intitolato "Realizzazione di percorsi di qualificazione mirati al rafforzamento dell\'occupabilità": ha la finalità di rafforzare l\'occupabilità dei cittadini in cerca di prima occupazione, dei disoccupati e delle persone in esecuzione di pena attraverso attività formative e stage.',
  },
  {
    domanda: 'A chi si rivolge l\'Avviso 2/2018?',
    risposta: 'Tra i destinatari indicati dall\'Avviso ci sono i disoccupati (da oltre 6, 12 o 24 mesi) e i soggetti in esecuzione di pena, oltre ai cittadini in cerca di prima occupazione. I requisiti dello specifico percorso sono riportati nel bando di selezione allievi: per una verifica contatta Alètheia.',
  },
  {
    domanda: 'Con quali fondi è finanziato l\'Avviso?',
    risposta: 'L\'Avviso ha una dotazione finanziaria di 125.000.000 di euro (FSE 53%, altri fondi 47%).',
  },
  {
    domanda: 'Che qualifica si ottiene?',
    risposta: 'L\'Avviso prevede l\'acquisizione di una qualifica e/o specializzazione in coerenza con il repertorio delle qualificazioni della Regione Siciliana.',
  },
];

module.exports = {
  'cucina-professionale': {
    'livello-1': {
      titolo: 'Corso di Cucina Professionale - Collaboratore di cucina',

      descrizione: `Percorso di formazione professionale per Collaboratore di cucina, realizzato da Alètheia Srl a Ragusa nell'ambito dell'Offerta formativa professionale - Avviso 2/2018 (CIP 2018SIXXXPAC00/10003/PG/5003/FG/COF/0304, CUP G55B18003130001, CS 4066 ED 7399).

Il programma comprende moduli su conoscenza e manutenzione delle attrezzature, pianificazione delle fasi di lavoro, gastronomia, menù e gestione dei costi, tecniche di preparazione e cottura, trattamento delle materie prime, cucina internazionale, abbinamento enogastronomico, dietetica, intolleranze e allergeni, conservazione e stoccaggio, igiene e sicurezza sul lavoro, inglese di base, alfabetizzazione informatica, comunicazione organizzativa, gestione del magazzino e visual merchandising.`,

      faq: [
        ...faqAvviso,
        {
          domanda: 'Quale figura professionale forma il corso?',
          risposta: 'Il percorso forma la figura di Collaboratore di cucina (CIP 2018SIXXXPAC00/10003/PG/5003/FG/COF/0304).',
        },
        {
          domanda: 'Quali sono gli argomenti del programma?',
          risposta: 'Il programma è articolato in 19 moduli: tra gli altri attrezzature, pianificazione delle fasi di lavoro, gastronomia, menù e gestione dei costi, tecniche di preparazione e cottura, cucina internazionale, abbinamento enogastronomico, dietetica, intolleranze e allergeni, igiene e sicurezza sul lavoro, inglese di base e alfabetizzazione informatica. L\'elenco completo con le ore è nella scheda Moduli.',
        },
      ],

      moduli: [
        { titolo: 'Conoscenza e manutenzione delle attrezzature', durataOre: 16 },
        { titolo: 'Pianificazione delle fasi di lavoro', durataOre: 20 },
        { titolo: 'Elementi di gastronomia', durataOre: 20 },
        { titolo: 'Il menù e la gestione dei costi', durataOre: 24 },
        { titolo: 'Tecniche e preparazione e cottura dei cibi', durataOre: 20 },
        { titolo: 'Trattamento delle materie prime e dei semilavorati', durataOre: 24 },
        { titolo: 'La cucina internazionale', durataOre: 16 },
        { titolo: 'Principi di abbinamento enogastronomico', durataOre: 26 },
        { titolo: 'Elementi di dietetica relativi a principi nutritivi e malattie metaboliche', durataOre: 18 },
        { titolo: 'Lingua straniera - Inglese livello base', durataOre: 32 },
        { titolo: 'Conoscenza delle materie prime', durataOre: 22 },
        { titolo: 'Caratteristiche merceologiche e nutrizionali degli alimenti', durataOre: 16 },
        { titolo: 'Le intolleranze alimentari e gli allergeni', durataOre: 18 },
        { titolo: 'Conservazione e stoccaggio dei prodotti alimentari', durataOre: 16 },
        { titolo: 'Igiene e sicurezza sul luogo di lavoro', durataOre: 12 },
        { titolo: 'Alfabetizzazione informatica', durataOre: 32 },
        { titolo: 'Tecniche di comunicazione organizzativa', durataOre: 20 },
        { titolo: 'Gestione del magazzino', durataOre: 12 },
        { titolo: 'Visual merchandising', durataOre: 12 },
      ],
    },
  },

  'addetto-panificatore-e-pasticciere': {
    'livello-1': {
      titolo: 'Addetto Panificatore e Pasticciere',

      descrizione: `Percorso di formazione professionale per Addetto panificatore pasticciere, realizzato da Alètheia Srl nell'ambito dell'Offerta formativa professionale - Avviso 2/2018 (CIP 2018SIXXXPAC00/10003/PG/5003/FG/COF/0304, CUP G55B18003130001, CS 4066 ED 7399).

Il programma comprende moduli su attrezzature, pianificazione delle fasi di lavoro, produzione e trasformazione degli impasti, lievitazione e prodotti lievitati, biscotteria, lievito madre e biga, preparazioni fredde e gelato, composizione e decorazione dei prodotti di pasticceria e gelateria, prodotti da forno, pasticceria per intolleranze alimentari, dietetica, conservazione e stoccaggio, igiene e sicurezza sul lavoro, alfabetizzazione informatica e comunicazione organizzativa.`,

      faq: [
        ...faqAvviso,
        {
          domanda: 'Quale figura professionale forma il corso?',
          risposta: 'Il percorso forma la figura di Addetto panificatore pasticciere (CIP 2018SIXXXPAC00/10003/PG/5003/FG/COF/0304).',
        },
        {
          domanda: 'Quali sono gli argomenti del programma?',
          risposta: 'Il programma è articolato in 18 moduli: tra gli altri impasti e lievitazione, biscotteria, lievito madre e biga, preparazioni fredde e gelato, decorazione dei prodotti di pasticceria, prodotti da forno, pasticceria per intolleranze alimentari, dietetica, igiene e sicurezza sul lavoro e alfabetizzazione informatica. L\'elenco completo con le ore è nella scheda Moduli.',
        },
      ],

      moduli: [
        { titolo: 'Conoscenza e manutenzione delle attrezzature', durataOre: 24 },
        { titolo: 'Pianificazione delle fasi di lavoro', durataOre: 20 },
        { titolo: 'Tecnica e produzione degli impasti, loro trasformazione e conservazione', durataOre: 24 },
        { titolo: 'Tecnica di lievitazione e prodotti lievitati', durataOre: 24 },
        { titolo: 'La biscotteria', durataOre: 28 },
        { titolo: 'Tecniche di preparazione del lievito madre, della biga e delle tecniche di panificazione', durataOre: 20 },
        { titolo: 'Le preparazioni fredde e il gelato in pasticceria', durataOre: 16 },
        { titolo: 'Tecniche di composizione, farcitura, decorazione e guarnizione dei prodotti di pasticceria e gelateria', durataOre: 20 },
        { titolo: 'Produzione di prodotti da forno', durataOre: 30 },
        { titolo: 'La pasticceria per intolleranze alimentari', durataOre: 26 },
        { titolo: 'Elementi di dietetica relativi a principi nutritivi e malattie metaboliche', durataOre: 28 },
        { titolo: 'Tecniche di comunicazione organizzativa', durataOre: 20 },
        { titolo: 'Conoscenza delle materie prime', durataOre: 22 },
        { titolo: 'Conservazione e stoccaggio dei prodotti alimentari', durataOre: 20 },
        { titolo: 'Caratteristiche merceologiche e nutrizionali degli alimenti', durataOre: 26 },
        { titolo: 'Gestione del magazzino', durataOre: 12 },
        { titolo: 'Igiene e sicurezza sul luogo di lavoro', durataOre: 12 },
        { titolo: 'Alfabetizzazione informatica', durataOre: 32 },
      ],
    },
  },

  'operatore-informativo-di-risorse-web': {
    'livello-1': {
      titolo: 'Operatore Informatico di risorse Web',

      descrizione: `Percorso di formazione professionale per Operatore informatico di risorse web, realizzato da Alètheia Srl nell'ambito dell'Offerta formativa professionale - Avviso 2/2018 (CIP 2018SIXXXPAC00/10003/PG/5003/FG/COF/0306, CUP G55B18003350001, CS 4074 ED 7410).

Il programma comprende moduli su ambiente operativo (architettura e componenti hardware, software di sistema), reti informatiche, trattamento testi per il web, web application, social network, servizi cloud, personalizzazione dei dispositivi, software per il trattamento dati, comunicazione mediale, ricerca di risorse e informazioni, tutela e sicurezza dei dati in rete, principi orizzontali (pari opportunità ed ecosostenibilità ambientale), igiene e sicurezza sul luogo di lavoro e alfabetizzazione informatica.`,

      faq: [
        ...faqAvviso,
        {
          domanda: 'Quale figura professionale forma il corso?',
          risposta: 'Il percorso forma la figura di Operatore informatico di risorse web (CIP 2018SIXXXPAC00/10003/PG/5003/FG/COF/0306).',
        },
        {
          domanda: 'Quali sono gli argomenti del programma?',
          risposta: 'Il programma è articolato in 18 moduli: tra gli altri hardware e software di sistema, reti informatiche, trattamento testi per il web, web application, social network, servizi cloud, tutela e sicurezza dei dati in rete, igiene e sicurezza sul lavoro e alfabetizzazione informatica. L\'elenco completo con le ore è nella scheda Moduli.',
        },
      ],

      moduli: [
        { titolo: 'Presentazione del corso', durataOre: 4 },
        { titolo: "L'ambiente operativo: architettura e componenti hardware", durataOre: 20 },
        { titolo: "L'ambiente operativo: i software di sistema", durataOre: 20 },
        { titolo: 'Le reti informatiche: caratteristiche e dispositivi di rete', durataOre: 24 },
        { titolo: 'Trattamento testi per il web', durataOre: 24 },
        { titolo: 'Web application: come utilizzarle per produrre documenti e risolvere problemi pratici', durataOre: 16 },
        { titolo: 'I social network', durataOre: 20 },
        { titolo: 'I servizi cloud storage e tecniche di cloud application', durataOre: 20 },
        { titolo: 'I principi orizzontali: pari opportunità ed ecosostenibilità ambientale', durataOre: 16 },
        { titolo: 'Igiene e sicurezza sul luogo di lavoro', durataOre: 12 },
        { titolo: 'Alfabetizzazione informatica', durataOre: 32 },
        { titolo: 'Personalizzazione dei dispositivi', durataOre: 18 },
        { titolo: 'Software per il trattamento dati', durataOre: 24 },
        { titolo: 'La comunicazione mediale', durataOre: 18 },
        { titolo: 'Ricerca di risorse e informazioni: download e upload di risorse e dati', durataOre: 16 },
        { titolo: "Integrare con plugin e app la funzionalità dell'ambiente operativo", durataOre: 20 },
        { titolo: 'Tutela e sicurezza dei dati in rete', durataOre: 24 },
        { titolo: 'Utilizzo consapevole di risorse e dati condivisi', durataOre: 16 },
      ],
    },
  },
};
