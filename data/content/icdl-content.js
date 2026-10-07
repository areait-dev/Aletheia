// Contenuti editoriali per le famiglie ICDL: 'icdl-base', 'icdl-standard', 'icdl-update' (family.id = slug raw).
// Varianti uniche (solo tipo 'corso'), un solo livello 'livello-1'.
// FONTE: voci 'icdl-base', 'icdl-standard', 'icdl-update' di coursesDetails in pages/all-courses/[slug].js
// (overview -> descrizione, target -> aChiERivolto, learningOutcomes -> cosaImparerai), spostate qui senza modifiche
// di contenuto perché quelle voci non vengono mostrate come descrizione dalla pagina.
// NON incluso (da confermare): il programma a moduli. Il curriculum in coursesDetails dà 40 ore per ICDL Base mentre
// la durata indicata è "circa 7 mesi (30 incontri da 2 ore)" = 60 ore: dati incoerenti, quindi tab Moduli omessa.
// Durata: omessa qui, la pagina usa la stringa già presente in coursesDetails ("Circa 7 mesi...", "Circa 9 mesi",
// "Singola sessione d'esame"). FAQ non presenti: da preparare da fonti ufficiali AICA.
// ICDL DigComp 2.2 non ha nessun testo nel progetto: resta in "Contenuto dettagliato in arrivo".

module.exports = {
  'icdl-base': {
    'livello-1': {
      titolo: 'ICDL Base',
      modalita: ['In sede'],
      attestato: 'Certificazione ICDL Base',

      descrizione: `La certificazione ICDL Base è la prima e più diffusa certificazione di competenze digitali riconosciuta a livello internazionale in 148 Paesi. Alètheia Srl è Test Center AICA accreditato n. AKHF0001.

Il percorso comprende 4 moduli fondamentali (Computer Essentials, Online Essentials, Word Processing, Spreadsheets) e si conclude con l'esame presso la nostra sede. La certificazione ICDL Base è riconosciuta nei concorsi pubblici e vale come credito formativo.`,

      aChiERivolto: [
        'Studenti, lavoratori e privati che desiderano certificare le competenze informatiche di base',
      ],

      cosaImparerai: [
        'Utilizzare il computer e i sistemi operativi',
        'Navigare in internet e usare la posta elettronica',
        'Creare documenti di testo con Word',
        'Ottenere la Certificazione ICDL Base riconosciuta internazionalmente',
      ],
    },
  },

  'icdl-standard': {
    'livello-1': {
      titolo: 'ICDL Standard',
      modalita: ['In sede'],
      attestato: 'Certificazione ICDL Standard',

      descrizione: `La certificazione ICDL Standard include i 4 moduli Base più un quinto modulo a scelta tra Presentation, IT Security, Online Collaboration e altri. È riconosciuta nei concorsi pubblici e dal mondo del lavoro come standard per la validazione delle competenze digitali.

Alètheia Srl è Test Center AICA accreditato n. AKHF0001 e segue i candidati in tutto il percorso, dagli esami al rilascio della Skills Card.`,

      aChiERivolto: [
        'Chi ha già la Base o vuole una certificazione più completa per il mercato del lavoro',
      ],

      cosaImparerai: [
        'Padroneggiare i principali strumenti Microsoft Office',
        'Acquisire competenze digitali avanzate',
        'Ottenere la certificazione riconosciuta nei concorsi pubblici',
        'Aumentare le opportunità nel mercato del lavoro',
      ],
    },
  },

  'icdl-update': {
    'livello-1': {
      titolo: 'ICDL Update',
      modalita: ['In sede'],
      attestato: 'Skills Card aggiornata',

      descrizione: `L'esame ICDL Update consente ai possessori di una vecchia certificazione ECDL o ICDL di aggiornare la propria qualifica allo standard attuale, senza dover ripetere tutti i moduli. Con un unico esame, la certificazione viene allineata alla versione corrente del Syllabus ICDL.

Alètheia Srl è Test Center AICA accreditato n. AKHF0001 e organizza sessioni d'esame periodiche presso la propria sede.`,

      aChiERivolto: [
        'Titolari di vecchia certificazione ECDL/ICDL che desiderano aggiornarla allo standard attuale',
      ],

      cosaImparerai: [
        'Aggiornare la certificazione ECDL/ICDL allo standard attuale',
        'Mantenere il riconoscimento della certificazione nei concorsi pubblici',
        "Completare l'aggiornamento con un unico esame",
        'Ricevere la nuova Skills Card aggiornata',
      ],
    },
  },
};
