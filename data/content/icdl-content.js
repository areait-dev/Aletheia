// Contenuti editoriali per le famiglie ICDL: 'icdl-base', 'icdl-standard', 'icdl-update' (family.id = slug raw).
// Varianti uniche (solo tipo 'corso'), un solo livello 'livello-1'.
// FONTE: voci 'icdl-base', 'icdl-standard', 'icdl-update' di coursesDetails in pages/corsi/[slug].js
// (overview -> descrizione, target -> aChiERivolto, learningOutcomes -> cosaImparerai), spostate qui senza modifiche
// di contenuto perché quelle voci non vengono mostrate come descrizione dalla pagina.
// ICDL Base: durata (60 ore = 30 incontri da 2 ore, circa 7 mesi), classi (10-12 allievi), moduli e titoli rilasciati
// ripresi da https://www.aletheiasrl.it/index.php/i-nostri-corsi/ecdl-icdl/ecdl-icdl. Tab Moduli omessa: la fonte non
// riporta le ore per modulo. Standard e Update: durata dalla stringa in coursesDetails ("Circa 9 mesi", "Singola sessione
// d'esame"). FAQ non presenti: da preparare da fonti ufficiali AICA.
// Standard, Update e DigComp 2.2: da https://www.aletheiasrl.it/index.php/i-nostri-corsi/ecdl-icdl/ (sottopagine ecdl-standard,
// ecdl-update, icdl-digcomp2-2). Durata di Update e DigComp: non indicata dalla fonte, quindi omessa.

module.exports = {
  'icdl-base': {
    'livello-1': {
      titolo: 'ICDL Base',
      durataOre: 60,
      modalita: ['In sede'],
      attestato: 'Diploma di Operatore di computer + Skills Card ICDL Base',
      partecipantiMax: 12,

      descrizione: `Il corso ICDL Base (ex ECDL) prepara al conseguimento della patente europea del computer, la prima e più diffusa certificazione di competenze digitali, riconosciuta a livello internazionale in 148 Paesi. Alètheia Srl è Test Center AICA accreditato n. AKHF0001.

Per ottenere la certificazione occorre superare 4 esami, uno per ciascun modulo: Computer Essentials (gestione di Windows), Online Essentials (Internet e le sue funzionalità), Word Processing (Microsoft Word) e Spreadsheets (Microsoft Excel). Ogni allievo riceve materiale didattico cartaceo e supporti multimediali.

Il corso si svolge nel comune di residenza dei corsisti, in classi da 10 a 12 allievi. Dura circa 7 mesi, con 30 incontri settimanali di 2 ore ciascuno, in un orario scelto dal gruppo in base alla disponibilità di tutti i partecipanti.

Al termine si ottengono il diploma di Operatore di computer e la Skills Card con ECDL Base (4 moduli), certificazione riconosciuta a livello europeo e internazionale. La certificazione vale come punteggio nei concorsi pubblici italiani.`,

      aChiERivolto: [
        'Studenti, lavoratori e privati che desiderano certificare le competenze informatiche di base',
      ],

      cosaImparerai: [
        'Gestire il computer e il sistema operativo Windows (Computer Essentials)',
        'Navigare in Internet e usare la posta elettronica (Online Essentials)',
        'Creare e formattare documenti di testo con Word (Word Processing)',
        'Usare i fogli di calcolo con Excel (Spreadsheets)',
        'Ottenere il diploma di Operatore di computer e la Skills Card ICDL Base, con punteggio nei concorsi pubblici',
      ],
    },
  },

  'icdl-standard': {
    'livello-1': {
      titolo: 'ICDL Standard',
      durataOre: 60,
      modalita: ['In sede'],
      attestato: 'Diploma di Operatore di computer + Skills Card ICDL Standard',
      partecipantiMax: 12,

      descrizione: `Il corso ICDL Standard (ex ECDL) prepara al conseguimento della patente europea del computer, riconosciuta a livello europeo e internazionale. Alètheia Srl è Test Center AICA accreditato n. AKHF0001.

La certificazione richiede il superamento di 7 esami: i 4 moduli obbligatori (Computer Essentials, Online Essentials, Word Processing e Spreadsheets) più 3 moduli a scelta tra IT Security, Presentation, Online Collaboration, Using Databases, Web Editing, Image Editing, Cad 2D, Health e Project Planning. Ogni allievo riceve materiale didattico cartaceo e supporti multimediali.

Il corso si svolge nel comune di residenza dei corsisti, in classi da 10 a 12 allievi. Dura circa 7 mesi, con 30 incontri settimanali di 2 ore ciascuno, in un orario scelto dal gruppo in base alla disponibilità di tutti i partecipanti.

Al termine si ottengono il diploma di Operatore di computer e la Skills Card con ECDL Standard (7 moduli). La certificazione vale come punteggio nei concorsi pubblici italiani.`,

      aChiERivolto: [
        'Chi ha già la Base o vuole una certificazione più completa per il mercato del lavoro',
      ],

      cosaImparerai: [
        'Gestire il computer e Windows, navigare in Internet e usare la posta elettronica',
        'Usare Word ed Excel per documenti di testo e fogli di calcolo',
        'Approfondire 3 moduli a scelta, tra cui IT Security, Presentation e Online Collaboration',
        'Ottenere il diploma di Operatore di computer e la Skills Card ICDL Standard, con punteggio nei concorsi pubblici',
      ],
    },
  },

  'icdl-update': {
    'livello-1': {
      titolo: 'ICDL Update',
      modalita: ['In sede'],
      attestato: 'Certificazione ECDL Update 5.0',

      descrizione: `L'esame ECDL Update 5.0 consente di aggiornare la propria ECDL tramite un esame dedicato, necessario per il passaggio dalla vecchia ECDL (Core) alla Nuova ECDL. L'esame dura 75 minuti e copre i sette moduli dell'ECDL Core: concetti di informatica generale, uso del computer e gestione dei file, elaborazione di testi, foglio elettronico, basi di dati, strumenti di presentazione e reti informatiche (Internet e posta elettronica). Può essere svolto in ambiente Windows o Open Source.

È destinato a chi possiede una licenza ECDL Core o ECDL Start, oppure a chi vuole convertire alla Nuova ECDL gli esami ECDL Core sostenuti con il Syllabus 5.0 o 4.0 (in questo caso occorre aver già superato almeno 4 moduli). Non serve acquistare una nuova Skills Card: l'iscrizione avviene con quella ECDL Core già in possesso.

Alètheia Srl è Test Center AICA accreditato n. AKHF0001.`,

      aChiERivolto: [
        'Chi possiede una licenza ECDL Core o ECDL Start e vuole passare alla Nuova ECDL',
        'Chi ha sostenuto esami ECDL Core (Syllabus 5.0 o 4.0), con almeno 4 moduli superati, e vuole convertirli alla Nuova ECDL',
      ],

      cosaImparerai: [
        'Aggiornare la propria ECDL Core con un unico esame da 75 minuti',
        'Passare dalla vecchia ECDL alla Nuova ECDL con la Skills Card già in possesso',
        'Ottenere la certificazione ECDL Update 5.0',
      ],
    },
  },

  'icdl-digcomp-2-2': {
    'livello-1': {
      titolo: 'ICDL DigComp 2.2',
      modalita: ['In sede'],
      attestato: 'Certificazione DigComp 2.2 + Diploma di Operatore Digitale Certificato',

      descrizione: `Il corso prepara alla certificazione ICDL DigComp 2.2, rilasciata da AICA e basata sul Digital Competence Framework for Citizens sviluppato dalla Commissione Europea. La certificazione è riconosciuta a livello europeo e internazionale e vale come punteggio nei concorsi pubblici italiani.

Le competenze certificate sono organizzate in 5 aree: alfabetizzazione su informazioni e dati; comunicazione e collaborazione digitale; creazione di contenuti digitali (compresi il diritto d'autore e le basi della programmazione); sicurezza digitale (protezione di dispositivi e dati personali e benessere digitale); risoluzione dei problemi digitali.

Per la certificazione è previsto un test di conformità, più breve, per chi possiede già una ICDL Full Standard in corso di validità, oppure l'esame DigComp 2.2 completo per chi non la possiede. Si ottengono la certificazione DigComp 2.2 e il diploma di Operatore Digitale Certificato.

Alètheia Srl è Test Center AICA accreditato n. AKHF0001.`,

      aChiERivolto: [
        'Chi possiede una ICDL Full Standard in corso di validità e vuole il test di conformità DigComp 2.2',
        "Chi non possiede la ICDL Full Standard e vuole certificare le proprie competenze digitali con l'esame completo",
      ],

      cosaImparerai: [
        'Cercare, valutare e gestire informazioni e dati digitali',
        "Comunicare e collaborare con gli strumenti digitali e gestire l'identità digitale",
        "Creare contenuti digitali nel rispetto del diritto d'autore",
        'Proteggere dispositivi e dati personali e risolvere i problemi digitali',
      ],
    },
  },
  // ICDL Full Standard (7 moduli, 60 ore). FONTE: documento Word "ICDL FULL STANDARD.docx" (cartella NUOVO SITO ALETHEIA / CONTENUTI DEF,
  // 5 novembre 2026). Testi copiati SENZA modifiche.
  // NOTE: durata 60 ore, validità 5 anni e certificazione dalle righe del documento; partecipanti "da 10 a 12 allievi" -> partecipantiMax 12
  // (come ICDL Base e Standard); modalità "In presenza" ricavata da "Sede: Comune di residenza"; il blocco "Modalità di svolgimento" è sotto
  // il programma (moduliNota). Le ore dei singoli moduli non sono nel documento (nella tabella compare "—").
  // DA CHIARIRE con il reparto formazione: il testo di "ICDL Standard" già presente (60 ore, 7 esami) parla della stessa certificazione:
  // le due schede si sovrappongono? Nessuna lista di corsi correlati nel documento (la pagina usa quella automatica).
  'icdl-full-standard': {
    'livello-1': {
      titolo: 'ICDL Full Standard',
      durataOre: 60,
      modalita: ['In presenza'],
      validita: '5 anni',
      attestato: 'ICDL Full Standard',
      partecipantiMax: 12,
      prezzo: null,

      descrizione: `Il corso ICDL Full Standard è un percorso di formazione informatica finalizzato allo sviluppo e alla certificazione delle competenze digitali necessarie per utilizzare il computer, navigare in Internet, gestire documenti e dati e collaborare attraverso gli strumenti digitali.

La certificazione ICDL Full Standard, conosciuta in passato come Patente Europea del Computer (ECDL), attesta competenze informatiche utili nella vita quotidiana, nello studio e nel mondo del lavoro. È accreditata da Accredia e riconosciuta a livello internazionale nell'ambito del programma ICDL.

Durante il corso i partecipanti acquisiranno competenze nell'utilizzo del computer, nella gestione dei file, nella navigazione online, nell'elaborazione di testi e nell'utilizzo dei fogli di calcolo. Il percorso comprende inoltre la sicurezza informatica, la creazione di presentazioni e l'utilizzo degli strumenti di collaborazione online.

Il corso prevede lezioni teoriche e attività pratiche, con esercitazioni finalizzate a preparare i partecipanti al superamento degli esami previsti per la certificazione.

La formazione ha una durata indicativa di circa 7 mesi, per un totale di 60 ore, distribuite in 30 incontri settimanali di 2 ore. A ogni partecipante viene fornito materiale didattico, composto da libri di testo e supporti multimediali.`,

      aChiERivoltoIntro: `Il corso ICDL Full Standard è rivolto a chi desidera acquisire o consolidare le proprie competenze informatiche e ottenere una certificazione riconosciuta in ambito nazionale e internazionale.

È indicato, in particolare, per:`,
      aChiERivolto: [
        "Persone che desiderano migliorare le proprie competenze digitali per esigenze personali o professionali.",
        "Studenti che vogliono acquisire una preparazione informatica strutturata.",
        "Lavoratori che intendono aggiornare le proprie competenze nell'utilizzo degli strumenti digitali.",
        "Persone in cerca di occupazione che desiderano arricchire il proprio curriculum con una certificazione informatica.",
        "Candidati a concorsi pubblici e procedure selettive che prevedono il riconoscimento di certificazioni informatiche, secondo i criteri stabiliti dai singoli bandi.",
      ],

      cosaImparaIntro: "Al termine del percorso sarai in grado di:",
      cosaImparerai: [
        "Utilizzare il computer e gestire file, cartelle e applicazioni.",
        "Navigare in Internet, effettuare ricerche e utilizzare la posta elettronica.",
        "Creare, modificare e formattare documenti con programmi di elaborazione testi.",
        "Organizzare dati, utilizzare formule e funzioni e creare grafici con i fogli di calcolo.",
        "Realizzare presentazioni digitali efficaci.",
        "Riconoscere i principali rischi informatici e adottare comportamenti sicuri nella gestione dei dati.",
        "Utilizzare strumenti digitali per comunicare, condividere informazioni e collaborare online.",
      ],
      cosaImparaNota: "Per conseguire la certificazione ICDL Full Standard è necessario superare i sette esami previsti, corrispondenti ai sette moduli formativi. La certificazione è accreditata da Accredia e ha validità di cinque anni, al termine dei quali è previsto un esame di aggiornamento per il rinnovo.",

      faq: [
        {
          domanda: "A cosa serve la certificazione ICDL Full Standard?",
          risposta: "La certificazione ICDL Full Standard attesta il possesso di competenze digitali relative all'utilizzo del computer, alla gestione delle informazioni, alla sicurezza informatica e alla collaborazione online. Può essere inserita nel curriculum per documentare le proprie capacità informatiche in ambito lavorativo e formativo.",
        },
        {
          domanda: "La certificazione ICDL Full Standard è riconosciuta nei concorsi pubblici?",
          risposta: "La certificazione ICDL Full Standard può essere valutata nell'ambito di concorsi pubblici e procedure selettive, ma il riconoscimento e l'eventuale punteggio dipendono dai requisiti indicati nel singolo bando. È quindi importante verificare quali certificazioni informatiche vengono ammesse e secondo quali criteri.",
        },
        {
          domanda: "Qual è la differenza tra ICDL Base e ICDL Full Standard?",
          risposta: "La certificazione ICDL Base comprende quattro moduli dedicati alle competenze informatiche fondamentali: Computer Essentials, Online Essentials, Word Processing e Spreadsheets. La ICDL Full Standard comprende sette moduli e aggiunge competenze relative alla sicurezza informatica, alle presentazioni digitali e alla collaborazione online.",
        },
        {
          domanda: "Quanto dura la certificazione ICDL Full Standard?",
          risposta: "La certificazione ICDL Full Standard ha una validità di cinque anni dalla data di emissione. Per mantenerla aggiornata è necessario sostenere l'esame di rinnovo previsto dal programma ICDL, secondo le modalità stabilite dall'ente certificatore.",
        },
      ],

      moduli: [
        { titolo: "Modulo 1 – Computer Essentials (Concetti di base del computer)", argomenti: [
          "Conoscenza delle componenti hardware e software.",
          "Utilizzo del sistema operativo.",
          "Gestione di file, cartelle e applicazioni.",
          "Organizzazione e archiviazione dei dati.",
        ] },
        { titolo: "Modulo 2 – Online Essentials (Concetti fondamentali della rete)", argomenti: [
          "Navigazione in Internet e utilizzo dei browser.",
          "Ricerca e gestione delle informazioni online.",
          "Utilizzo della posta elettronica.",
          "Gestione dei messaggi e degli strumenti di comunicazione online.",
        ] },
        { titolo: "Modulo 3 – Word Processing (Elaborazione testi)", argomenti: [
          "Creazione e modifica di documenti di testo.",
          "Formattazione di caratteri, paragrafi e pagine.",
          "Inserimento di tabelle, immagini e altri elementi.",
          "Impostazione e stampa dei documenti.",
        ] },
        { titolo: "Modulo 4 – Spreadsheets (Fogli elettronici)", argomenti: [
          "Creazione e gestione di fogli di calcolo.",
          "Inserimento e organizzazione dei dati.",
          "Utilizzo di formule e funzioni.",
          "Creazione di grafici e rappresentazioni dei dati.",
        ] },
        { titolo: "Modulo 5 – IT Security (Sicurezza informatica)", argomenti: [
          "Principi di sicurezza informatica.",
          "Protezione di dispositivi, dati e informazioni personali.",
          "Riconoscimento delle principali minacce informatiche.",
          "Navigazione e utilizzo sicuro delle tecnologie digitali.",
        ] },
        { titolo: "Modulo 6 – Presentation (Strumenti di presentazione)", argomenti: [
          "Creazione e gestione di presentazioni.",
          "Organizzazione delle diapositive.",
          "Inserimento e formattazione di testi, immagini e grafici.",
          "Preparazione e visualizzazione di presentazioni.",
        ] },
        { titolo: "Modulo 7 – Online Collaboration (Collaborazione online)", argomenti: [
          "Utilizzo degli strumenti di collaborazione in rete.",
          "Condivisione di documenti e informazioni.",
          "Gestione di calendari e strumenti di comunicazione.",
          "Utilizzo di piattaforme e servizi digitali per il lavoro collaborativo.",
        ] },
      ],
      moduliNota: { titolo: "Modalità di svolgimento", testo: [
        "Durata: circa 7 mesi, per un totale di 60 ore.",
        "Frequenza: un incontro a settimana della durata di 2 ore, per 30 incontri.",
        "Sede: Comune di residenza, secondo l'organizzazione del corso.",
        "Numero partecipanti: classi a numero limitato, da 10 a 12 allievi.",
        "Fascia oraria: da concordare in base alla disponibilità complessiva dei corsisti.",
      ] },
    },
  },
};
