
// Contenuti editoriali per famiglia "Macchine Movimento Terra" (ex pagina isolata standalone
// pages/all-courses/macchine-movimento-terra.js, switch a 7 opzioni). Le 7 varianti raw in
// data/coursesRaw.js condividono il famTitle "Macchine Movimento Terra" (descrittore tra parentesi
// isolato da LEVEL_PATTERNS in data/courseFamilies.js), quindi le chiavi 'livello-1'..'livello-6' qui
// sotto sono POSIZIONALI (stesso ordine delle 6 voci raw "corso" - escavatori idraulici, escavatori a
// fune, pale caricatrici, terne, autoribaltabili, combinato), non semantiche - il 'livello-7'
// (aggiornamento) vive in macchine-movimento-terra-aggiornamento-content.js, stesso pattern di
// rspp-datore-lavoro-content.js/-aggiornamento-content.js.
//
// NOTA: la pagina isolata originale usa una FAQ unica e trasversale (FAQ_UNICA) condivisa da tutte le 7
// varianti invece di ripetere le stesse domande per ciascuna. Qui viene riportata identica sotto la
// chiave 'faq' di ciascun livello, per restare fedele al contenuto originale e coerente con la struttura
// standard (che prevede 'faq' per singolo livello).

const FAQ_UNICA = [
  { domanda: 'Qual è la differenza tra le varie macchine movimento terra?', risposta: 'Ogni macchina ha un ambito d\'impiego specifico - scavo in profondità (escavatori idraulici e a fune), carico e movimentazione di materiali sciolti (caricatori frontali), lavori misti su cantieri piccoli e medi (terne) o trasporto su terreni difficili (autoribaltabili a cingoli). Trovi il dettaglio nella descrizione di ciascuna variante.' },
  { domanda: 'Conviene il corso combinato o i corsi singoli?', risposta: 'Se devi operare abitualmente con più di una tra escavatori idraulici, caricatori frontali e terne, il corso combinato da 16 ore conviene sia in termini di costo (300€ + IVA contro 200€ + IVA cadauno) sia di tempo, poiché accorpa i moduli teorici comuni alle tre macchine.' },
  { domanda: 'Ogni quanto va rinnovata l\'abilitazione?', risposta: 'L\'abilitazione va rinnovata periodicamente frequentando il corso di aggiornamento da 4 ore, valido per escavatori idraulici, caricatori frontali e terne già abilitati, ai sensi dell\'art. 73 e dell\'Allegato IX del D.Lgs 81/2008.' },
  { domanda: 'L\'abilitazione è valida su tutto il territorio nazionale?', risposta: 'Sì, l\'attestato rilasciato al termine del corso - sia esso per una singola macchina, per il percorso combinato o per l\'aggiornamento - è valido su tutto il territorio nazionale.' },
  { domanda: 'Il corso prevede una prova pratica sul mezzo?', risposta: 'Sì, tutte le varianti includono una parte di addestramento pratico e una verifica finale di apprendimento, che si svolgono in sicurezza presso il campo prove attrezzato di Alètheia S.r.l. a Vittoria (RG).' },
];

module.exports = {
  'macchine-movimento-terra': {
    'livello-1': {
      titolo: 'Corso Addetti alla Conduzione di Escavatori Idraulici',
      durataOre: 10,
      modalita: ['Aula'],
      validita: 'Da definire — aggiornamento disponibile (4 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,
      descrizione: `La conduzione di escavatori idraulici richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Gli escavatori idraulici sono macchine cingolate o gommate dotate di braccio articolato a comando idraulico e struttura superiore girevole a 360°, tra le più diffuse nei cantieri edili, stradali e di urbanizzazione.

Il corso, della durata di 10 ore, fornisce le competenze per lo scavo, la demolizione controllata e la movimentazione di materiali in profondità, con particolare attenzione alla valutazione della stabilità del mezzo, al corretto posizionamento su terreno e alla lettura dei diagrammi di carico.`,
      aChiERivolto: [
        'Operai edili, movieri e addetti ai cantieri stradali o infrastrutturali',
        'Operatori del movimento terra e personale addetto allo scavo di fondazioni, trincee e sottoservizi',
        'Imprenditori, artigiani e lavoratori autonomi che utilizzano escavatori idraulici nel settore delle costruzioni'
      ],
      cosaImparerai: [
        'Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)',
        'Riconoscere i componenti strutturali e i dispositivi di sicurezza dell\'escavatore idraulico',
        'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
        'Applicare le tecniche operative di scavo e movimentazione dei materiali in sicurezza',
        'Gestire la stabilità del mezzo tramite il corretto posizionamento dei piedi stabilizzatori'
      ],
      faq: FAQ_UNICA,
      moduli: [
        { titolo: 'MODULO I - GIURIDICO-NORMATIVO', durataOre: 1, argomenti: ['Presentazione del corso; cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)', 'Responsabilità dell\'operatore'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 3, argomenti: ['Attrezzature con riferimento a escavatori, caricatori, terne e autoribaltabili a cingoli', 'Componenti strutturali; dispositivi di comando e sicurezza', 'Visibilità e identificazione zone cieche', 'Controlli; uso in sicurezza, rischi e precauzioni', 'Protezione da agenti fisici'] },
        { titolo: 'MODULO III - PRATICO', durataOre: 6, argomenti: ['Componenti strutturali; individuazione dei dispositivi di comando e di sicurezza', 'Controlli pre-utilizzo; pianificazione operazioni di campo', 'Operazioni di movimentazione carichi, manovra di agganci rapidi per attrezzi', 'Esercitazioni pratiche; guida dell\'escavatore su strada'] }
      ],
      corsiCorrelati: ['macchine-movimento-terra-livello-6', 'carrelli-elevatori-semoventi-conduttore-a-bordo', 'operatore-di-gru-per-autocarro']
    },

    'livello-2': {
      titolo: 'Corso Addetti alla Conduzione di Escavatori a Fune',
      durataOre: 10,
      modalita: ['Aula'],
      validita: 'Da definire — aggiornamento disponibile (4 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,
      descrizione: `La conduzione di escavatori a fune richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Gli escavatori a fune utilizzano un sistema di cavi e argani per il comando del braccio e della benna, anziché la trasmissione idraulica: una tecnologia più robusta, tipicamente impiegata per la gestione di carichi e volumi elevati.

Il corso, della durata di 10 ore, trova applicazione tipica in cantieri di grande scavo, opere di movimento terra su larga scala e attività estrattive, dove trasmette le competenze per la valutazione della stabilità del mezzo, il posizionamento sul terreno e l'esecuzione di manovre operative complesse.`,
      aChiERivolto: [
        'Operatori di cantieri di grande scavo e opere di movimento terra su larga scala',
        'Addetti a cave, attività estrattive e lavorazioni minerarie',
        'Imprenditori e lavoratori autonomi che utilizzano escavatori a fune in grandi opere infrastrutturali'
      ],
      cosaImparerai: [
        'Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)',
        'Riconoscere i componenti strutturali e i dispositivi di sicurezza dell\'escavatore a fune',
        'Eseguire i controlli pre-uso e le manutenzioni giornaliere del sistema a cavi e argani',
        'Applicare le tecniche operative di scavo e movimentazione di grandi volumi in sicurezza',
        'Gestire la stabilità del mezzo e le procedure di emergenza in caso di guasto meccanico'
      ],
      faq: FAQ_UNICA,
      // NOTA: la pagina isolata originale non forniva un programma moduli dettagliato per questa
      // variante (nessuna chiave "moduli" in CONTENUTO.escavatoriFune) - qui viene fornito un modulo
      // riepilogativo equivalente a quello delle altre macchine da 10 ore (stessa struttura I/II/III),
      // per evitare che il template [slug].js (che fa .map incondizionato su moduli) vada in errore.
      moduli: [
        { titolo: 'MODULO I - GIURIDICO-NORMATIVO', durataOre: 1, argomenti: ['Cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)', 'Responsabilità dell\'operatore'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 3, argomenti: ['Componenti strutturali del sistema a cavi e argani', 'Dispositivi di comando e di sicurezza', 'Controlli e uso in sicurezza'] },
        { titolo: 'MODULO III - PRATICO', durataOre: 6, argomenti: ['Controlli pre-utilizzo del sistema a cavi e argani', 'Manovre operative complesse e gestione di grandi volumi', 'Procedure di emergenza in caso di guasto meccanico'] }
      ],
      corsiCorrelati: ['macchine-movimento-terra-livello-6', 'operatore-di-gru-per-autocarro']
    },

    'livello-3': {
      titolo: 'Corso Addetti alla Conduzione di Pale Caricatrici Frontali e con Braccio Mobile (Ragno)',
      durataOre: 12,
      modalita: ['Aula'],
      validita: 'Da definire — aggiornamento disponibile (4 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,
      descrizione: `La conduzione di pale caricatrici frontali e con braccio mobile (ragno) richiede una specifica abilitazione ai sensi degli artt. 37, 71 comma 7 e 73 comma 5 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 17 aprile 2025. Sono macchine gommate o cingolate dotate di benna frontale (o braccio mobile) per il carico, lo spostamento e l'accatastamento di materiali sciolti come inerti, terra e rifiuti da costruzione.

Il corso, della durata di 12 ore, è la formazione di riferimento per chi opera nella logistica di cantiere, nei piazzali di stoccaggio e negli impianti di riciclaggio inerti, e trasmette le competenze per il carico in sicurezza, il calcolo dei pesi e la gestione della stabilità del mezzo.`,
      aChiERivolto: [
        'Operatori della logistica di cantiere e addetti allo stoccaggio inerti',
        'Personale di impianti di riciclaggio inerti e materiali da costruzione',
        'Imprenditori e lavoratori autonomi che utilizzano pale caricatrici nella movimentazione materiali'
      ],
      cosaImparerai: [
        'Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)',
        'Riconoscere i componenti strutturali e i dispositivi di sicurezza del caricatore frontale',
        'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
        'Applicare le tecniche operative di carico, spostamento e accatastamento dei materiali sciolti',
        'Gestire la stabilità del mezzo durante le fasi di carico e trasporto'
      ],
      faq: FAQ_UNICA,
      moduli: [
        { titolo: 'MODULO I - GIURIDICO-NORMATIVO', durataOre: 1, argomenti: ['Cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)', 'Responsabilità dell\'operatore'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 3, argomenti: ['Categorie di attrezzature: escavatori, caricatori, terne', 'Componenti strutturali e circuiti di comando', 'Dispositivi di comando e di sicurezza; visibilità e zone cieche', 'Controlli pre-utilizzo, modalità di utilizzo in sicurezza e rischi', 'Avviamento, spostamento, azionamenti e manovre', 'Protezione nei confronti degli agenti fisici: rumore e vibrazioni'] },
        { titolo: 'MODULO III - PRATICO', durataOre: 8, argomenti: ['Individuazione dei componenti strutturali e dei dispositivi di comando e sicurezza', 'Controlli pre-utilizzo del caricatore', 'Pianificazione delle operazioni di caricamento', 'Operazioni di movimentazione e sollevamento carichi, agganci rapidi per attrezzi', 'Esercitazioni: predisposizione del mezzo, guida con attrezzature, trasferimento stradale', 'Uso del caricatore in campo: manovra di caricamento, movimentazione carichi pesanti, uso con forche o pinza', 'Messa a riposo e trasporto del caricatore'] }
      ],
      corsiCorrelati: ['macchine-movimento-terra-livello-6', 'carrelli-elevatori-semoventi-conduttore-a-bordo']
    },

    'livello-4': {
      titolo: 'Corso Addetti alla Conduzione di Terne',
      durataOre: 10,
      modalita: ['Aula'],
      validita: 'Da definire — aggiornamento disponibile (4 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,
      descrizione: `La conduzione di terne richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Le terne sono macchine combinate che uniscono nella stessa struttura una pala caricatrice anteriore e un braccio escavatore posteriore, offrendo grande versatilità operativa in un unico mezzo.

Il corso, della durata di 10 ore, è particolarmente indicato per cantieri di piccole e medie dimensioni, interventi di manutenzione stradale e scavi localizzati dove non è economicamente conveniente impiegare due macchine distinte, e trasmette le competenze per l'uso sicuro di entrambi gli attrezzi della macchina.`,
      aChiERivolto: [
        'Operai edili e addetti a cantieri di piccole e medie dimensioni',
        'Personale addetto alla manutenzione stradale e a scavi localizzati',
        'Imprenditori e lavoratori autonomi che necessitano di un mezzo versatile per pala e scavo'
      ],
      cosaImparerai: [
        'Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)',
        'Riconoscere i componenti strutturali e i dispositivi di sicurezza della terna',
        'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
        'Applicare le tecniche operative di scavo con il braccio posteriore e di carico con la pala anteriore',
        'Gestire la stabilità del mezzo nel passaggio tra le due modalità operative'
      ],
      faq: FAQ_UNICA,
      moduli: [
        { titolo: 'MODULO I - GIURIDICO-NORMATIVO', durataOre: 1, argomenti: ['Presentazione del corso; cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)', 'Responsabilità dell\'operatore'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 3, argomenti: ['Categorie di attrezzature: escavatori, caricatori, terne e autoribaltabili a cingoli', 'Componenti strutturali e circuiti di comando', 'Dispositivi di comando e di sicurezza; visibilità e zone cieche', 'Controlli pre-utilizzo, modalità di utilizzo in sicurezza e rischi', 'Protezione nei confronti degli agenti fisici: rumore e vibrazioni'] },
        { titolo: 'MODULO III - PRATICO (I)', durataOre: 3, argomenti: ['Individuazione dei componenti strutturali e dei dispositivi di comando e sicurezza', 'Controlli pre-utilizzo della terna', 'Pianificazione delle operazioni di scavo e caricamento', 'Operazioni di movimentazione carichi, agganci rapidi per attrezzi'] },
        { titolo: 'MODULO IV - PRATICO (II)', durataOre: 3, argomenti: ['Guida della terna su strada', 'Esecuzione di manovre di scavo e riempimento, accoppiamento attrezzature', 'Manovre di livellamento e movimentazione carichi di precisione', 'Aggancio di attrezzature speciali (martello demolitore, pinza idraulica, trivella)', 'Messa a riposo e trasporto della terna'] }
      ],
      corsiCorrelati: ['macchine-movimento-terra-livello-6', 'coordinatori-cantieri-cse-csp']
    },

    'livello-5': {
      titolo: 'Corso Addetti alla Conduzione di Autoribaltabili a Cingoli',
      durataOre: 10,
      modalita: ['Aula'],
      validita: 'Da definire — aggiornamento disponibile (4 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,
      descrizione: `La conduzione di autoribaltabili a cingoli richiede una specifica abilitazione ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012. Sono mezzi cingolati dotati di cassone ribaltabile, progettati per il trasporto di materiali sciolti su terreni difficili, sconnessi o in forte pendenza, dove i normali dumper su ruote non potrebbero operare in sicurezza.

Il corso, della durata di 10 ore, è rivolto a chi opera soprattutto in cantieri di montagna, su sterrati e in aree con scarsa portanza del terreno, e trasmette le competenze per il trasporto e lo scarico in sicurezza su pendenze e fondi difficili.`,
      aChiERivolto: [
        'Operatori di cantieri di montagna e in aree con accesso difficoltoso',
        'Addetti al trasporto di materiali su terreni sconnessi o in forte pendenza',
        'Imprenditori e lavoratori autonomi che operano in cantieri privi di viabilità carrabile ordinaria'
      ],
      cosaImparerai: [
        'Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)',
        'Riconoscere i componenti strutturali e i dispositivi di sicurezza dell\'autoribaltabile a cingoli',
        'Eseguire i controlli pre-uso e le manutenzioni giornaliere del mezzo',
        'Applicare le tecniche di trasporto e scarico in sicurezza su terreni difficili e in pendenza',
        'Gestire la stabilità del mezzo e il rischio di ribaltamento su fondi sconnessi'
      ],
      faq: FAQ_UNICA,
      moduli: [
        { titolo: 'MODULO I - NORMATIVO-GIURIDICO', durataOre: 1, argomenti: ['Panorama normativo in materia di sicurezza e igiene nei luoghi di lavoro (D.Lgs 81/2008)', 'Responsabilità dell\'operatore'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 3, argomenti: ['Categorie di attrezzature con riferimento agli escavatori', 'Componenti strutturali e circuiti di comando', 'Dispositivi di comando e di sicurezza; visibilità e zone cieche', 'Controlli pre-utilizzo, modalità di utilizzo in sicurezza e rischi', 'Protezione nei confronti degli agenti fisici: rumore e vibrazioni'] },
        { titolo: 'MODULO III - PRATICO', durataOre: 6, argomenti: ['Predisposizione del mezzo e posizionamento organi di lavoro', 'Guida a pieno carico e trasferimento stradale', 'Uso dell\'autoribaltabile in campo: manovre di scaricamento e spargimento', 'Messa a riposo dell\'autoribaltabile'] }
      ],
      corsiCorrelati: ['macchine-movimento-terra-livello-6']
    },

    'livello-6': {
      titolo: 'Corso Addetti alla Conduzione di Escavatori Idraulici, Caricatori Frontali e Terne',
      durataOre: 16,
      modalita: ['Aula'],
      validita: 'Da definire — aggiornamento disponibile (4 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 300,
      descrizione: `Il Corso Base Combinato per Macchine Movimento Terra (MMT) da 16 ore fornisce la formazione teorico-pratica obbligatoria ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni. Questo specifico percorso formativo "all-in-one" consente di ottenere contemporaneamente l'abilitazione alla conduzione di 3 distinte categorie di macchine pesanti: gli Escavatori Idraulici (macchine cingolate o gommate con struttura superiore girevole), i Caricatori Frontali (conosciuti comunemente come pale meccaniche) e le Terne (macchine combinate che uniscono la versatilità della pala anteriore e la precisione dell'escavatore posteriore).

Il corso trasmette le competenze fondamentali per la valutazione della stabilità dei mezzi, il posizionamento degli stabilizzatori sui terreni di cantiere, la lettura dei diagrammi di carico e l'esecuzione di manovre operative complesse, garantendo l'incolumità dell'operatore e riducendo drasticamente il rischio di ribaltamento o schiacciamento.`,
      aChiERivolto: [
        'Operai edili, carpentieri e addetti ai cantieri stradali o infrastrutturali',
        'Operatori del movimento terra e personale addetto alla logistica di cantiere o stoccaggio inerti',
        'Imprenditori, artigiani e lavoratori autonomi che utilizzano macchinari pesanti nel settore delle costruzioni',
        'Datori di lavoro che devono qualificare e abilitare il personale all\'uso combinato di escavatori, pale e terne'
      ],
      cosaImparerai: [
        'Comprendere il quadro normativo di riferimento sulle attrezzature di lavoro (D.Lgs 81/2008)',
        'Riconoscere i componenti strutturali e i dispositivi di sicurezza di escavatori idraulici, caricatori frontali e terne',
        'Eseguire correttamente i controlli pre-uso, i test funzionali e le manutenzioni giornaliere dei mezzi',
        'Applicare le tecniche operative di scavo, livellamento del terreno, carico e trasporto dei materiali in sicurezza',
        'Gestire la stabilità dei mezzi tramite il corretto posizionamento dei piedi stabilizzatori e delle lame livellatrici',
        'Attuare le procedure di emergenza in caso di guasto meccanico, idraulico o instabilità del terreno'
      ],
      faq: FAQ_UNICA,
      moduli: [
        { titolo: 'MODULO I - GIURIDICO-NORMATIVO', durataOre: 1, argomenti: ['Presentazione del corso; cenni di normativa generale in materia di igiene e sicurezza del lavoro (D.Lgs 81/2008)', 'Responsabilità dell\'operatore'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 3, argomenti: ['Attrezzature con riferimento a escavatori, caricatori, terne e autoribaltabili a cingoli', 'Componenti strutturali; dispositivi di comando e sicurezza', 'Visibilità e identificazione zone cieche', 'Controlli; uso in sicurezza, rischi e precauzioni', 'Protezione da agenti fisici'] },
        { titolo: 'MODULO III - PRATICO (I)', durataOre: 6, argomenti: ['Individuazione dei componenti strutturali e dei dispositivi di comando e sicurezza', 'Controlli pre-utilizzo', 'Pianificazione delle operazioni di campo, scavo e caricamento', 'Operazioni di movimentazione e sollevamento carichi, agganci rapidi per attrezzi'] },
        { titolo: 'MODULO IV - PRATICO (II)', durataOre: 6, argomenti: ['Esercitazioni di pratiche operative', 'Uso, messa a riposo e trasporto di escavatori idraulici, caricatori frontali e terne', 'Salita sul carrellone di trasporto', 'Individuazione dei punti di aggancio per il sollevamento'] }
      ],
      corsiCorrelati: ['macchine-movimento-terra-livello-1', 'macchine-movimento-terra-livello-3', 'macchine-movimento-terra-livello-4']
    }
  }
};
