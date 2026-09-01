
// Contenuti editoriali per famiglia "Patentino Fitosanitario" (ex pagina isolata
// pages/all-courses/patentino-fitosanitario.js). Famiglia a variante unica (livelloKey 'default'): un
// solo livello posizionale 'livello-1' condiviso da corso e aggiornamento.

module.exports = {
  'patentino-fitosanitario': {
    'livello-1': {
      titolo: 'Corso Patentino Fitosanitario',
      durataOre: 20,
      modalita: ['Aula'],
      validita: 'Da definire — aggiornamento disponibile (12 ore, pagina dedicata)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 130,

      descrizione: `Il possesso del certificato di abilitazione all'acquisto e all'utilizzo di prodotti fitosanitari, comunemente detto "patentino fitosanitario", è un obbligo di legge previsto dal D.Lgs. 150/2012 e dal Piano di Azione Nazionale (PAN) per l'uso sostenibile dei prodotti fitosanitari, in attuazione della Direttiva 2009/128/CE. Nessun utilizzatore professionale può acquistare o impiegare prodotti fitosanitari destinati ad uso professionale senza aver conseguito questa abilitazione, rilasciata dalle Regioni al termine di un percorso formativo obbligatorio e di un esame finale.

Il Corso Patentino Fitosanitario Base, della durata di 20 ore, fornisce agli utilizzatori professionali le competenze tecniche e normative necessarie per un impiego consapevole e sicuro dei prodotti fitosanitari, con l'obiettivo primario di ridurre i rischi e gli impatti sulla salute umana e sull'ambiente derivanti dal loro utilizzo.

Il programma affronta in modo integrato tre livelli di tutela: la sicurezza dell'operatore, attraverso la corretta gestione dei prodotti, l'uso dei dispositivi di protezione individuale e le procedure di primo soccorso in caso di intossicazione; la tutela dei consumatori, tramite il rispetto dei tempi di carenza e delle buone pratiche agricole che garantiscono alimenti privi di residui superiori ai limiti di legge; la salvaguardia dell'ambiente, attraverso i principi della difesa integrata, la corretta gestione dello stoccaggio, del trasporto e dello smaltimento dei contenitori vuoti e delle rimanenze.

Al termine del corso è previsto il rilascio dell'attestato di frequenza, propedeutico al sostenimento dell'esame regionale per il conseguimento del certificato di abilitazione, valido su tutto il territorio nazionale.`,

      aChiERivolto: [
        'Agricoltori e imprenditori agricoli che acquistano o utilizzano prodotti fitosanitari ad uso professionale',
        'Coltivatori diretti e conduttori di aziende agricole',
        'Contoterzisti che effettuano trattamenti fitosanitari per conto di terzi',
        'Giardinieri e manutentori del verde pubblico e privato',
        'Utilizzatori professionali di prodotti fitosanitari in serre, vivai e colture protette'
      ],

      cosaImparerai: [
        'Il quadro normativo di riferimento sui prodotti fitosanitari: D.Lgs. 150/2012, Regolamento CE 1107/2009 e Piano di Azione Nazionale (PAN)',
        'I pericoli per la salute umana e per l\'ambiente derivanti dall\'uso non corretto dei prodotti fitosanitari',
        'Il riconoscimento dei sintomi di intossicazione e le procedure di primo soccorso',
        'I principi della difesa integrata obbligatoria e volontaria e le alternative a basso impatto ambientale',
        'Le corrette modalità di stoccaggio dei prodotti e di smaltimento dei contenitori vuoti e delle rimanenze',
        'La scelta e il corretto utilizzo dei dispositivi di protezione individuale (DPI) durante la manipolazione e la distribuzione'
      ],

      faq: [
        { domanda: 'Chi ha l\'obbligo di possedere il patentino fitosanitario?', risposta: 'Il certificato di abilitazione è obbligatorio per tutti gli utilizzatori professionali, i distributori e i consulenti che acquistano, immagazzinano o impiegano prodotti fitosanitari ad uso professionale, ai sensi del D.Lgs. 150/2012 e del Piano di Azione Nazionale.' },
        { domanda: 'Quanto dura il corso per il conseguimento iniziale del patentino?', risposta: 'Il corso di primo conseguimento ha una durata di 20 ore, articolate su più giornate, e tratta gli aspetti normativi, tossicologici, agronomici e ambientali previsti dal PAN.' },
        { domanda: 'È previsto un esame al termine del corso?', risposta: 'Sì. Al termine delle 20 ore di formazione viene rilasciato l\'attestato di frequenza, necessario per essere ammessi all\'esame indetto dalla Regione competente, il cui superamento consente il rilascio del certificato di abilitazione valido in tutta Italia.' }
      ],

      // NOTA: la pagina isolata originale non forniva un programma moduli dettagliato (tab Moduli con
      // placeholder "Dettaglio moduli in aggiornamento", in attesa del PDF ufficiale Alètheia). Il
      // template [slug].js richiede però un array "moduli" (fa .map incondizionato) - qui viene fornito
      // un modulo unico riepilogativo basato sui contenuti di "cosaImparerai" sopra, per evitare che il
      // tab Moduli vada in errore, in attesa del programma corso dettagliato.
      moduli: [
        { titolo: 'PROGRAMMA CORSO PATENTINO FITOSANITARIO', durataOre: 20, argomenti: ['Quadro normativo: D.Lgs. 150/2012, Regolamento CE 1107/2009 e PAN', 'Pericoli per la salute umana e per l\'ambiente', 'Sintomi di intossicazione e procedure di primo soccorso', 'Difesa integrata obbligatoria e volontaria', 'Stoccaggio dei prodotti e smaltimento dei contenitori vuoti', 'Dispositivi di protezione individuale (DPI)'] }
      ],

      corsiCorrelati: [
        'trattori-agricoli-forestali-a-ruote',
        'formazione-dei-lavoratori-rischio-medio'
      ]
    }
  }
};
