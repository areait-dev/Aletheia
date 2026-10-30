// Contenuti editoriali per le famiglie ICDL: 'icdl-base', 'icdl-standard', 'icdl-update' (family.id = slug raw).
// Varianti uniche (solo tipo 'corso'), un solo livello 'livello-1'.
// FONTE: voci 'icdl-base', 'icdl-standard', 'icdl-update' di coursesDetails in pages/all-courses/[slug].js
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
};
