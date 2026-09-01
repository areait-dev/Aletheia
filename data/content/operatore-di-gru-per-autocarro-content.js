
// Contenuti editoriali per famiglia "Operatore di Gru per Autocarro" (ex pagina isolata
// pages/all-courses/operatore-di-gru-per-autocarro.js). Famiglia a variante unica (livelloKey
// 'default'): un solo livello posizionale 'livello-1' condiviso da corso e aggiornamento.
//
// NOTA MIGRAZIONE: il raw title dell'aggiornamento in data/coursesRaw.js era "Aggiornamento Operatore Di
// Gru" (senza "Per Autocarro"), disallineato rispetto al corso base "Operatore Di Gru Per Autocarro":
// questo avrebbe fatto derivare a buildCourseFamilies due famiglie SEPARATE ("operatore-di-gru-per-
// autocarro" e "operatore-di-gru"), impedendo lo switch corso/aggiornamento sulla stessa pagina. Corretto
// il titolo raw in "Aggiornamento Operatore Di Gru Per Autocarro" (fix minimo, vedi commento in
// coursesRaw.js) in modo che le due varianti confluiscano nella stessa famiglia.

module.exports = {
  'operatore-di-gru-per-autocarro': {
    'livello-1': {
      titolo: 'Corso Addetti alla Conduzione di Gru per Autocarro',
      durataOre: 12,
      modalita: ['Aula'],
      validita: 'Aggiornamento periodico previsto dalla normativa vigente (4 ore, pagina dedicata)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 280,

      descrizione: `La formazione e l'addestramento degli operatori addetti alla conduzione di gru per autocarro sono obbligatori ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato-Regioni del 22 febbraio 2012, che disciplinano l'abilitazione all'uso delle attrezzature di lavoro che richiedono conoscenze e responsabilità particolari.

Il Corso Addetti alla Conduzione di Gru per Autocarro, della durata di 12 ore, fornisce le competenze necessarie per operare in sicurezza con bracci idraulici installati su veicoli industriali per la movimentazione e il carico/scarico di merci e materiali. Questa attività comporta rischi severi e specifici: il ribaltamento del mezzo per errato posizionamento degli stabilizzatori o superamento dei limiti di carico, lo schiacciamento durante le manovre, l'elettrocuzione per contatto o avvicinamento a linee elettriche aeree, e la caduta del carico per errata imbracatura o lettura scorretta delle tabelle di portata.

Il programma affronta l'ispezione visiva e i controlli pre-uso del mezzo, il corretto posizionamento e la stabilizzazione del veicolo in funzione della natura e della pendenza del terreno, la lettura e l'applicazione delle tabelle e dei diagrammi di carico per il calcolo di pesi e sbracci, e le manovre di precisione necessarie per movimentare i carichi in sicurezza in cantiere, in area di cantiere urbano o in contesti logistici.

Ampio spazio è dedicato ai dispositivi di sicurezza e di blocco della gru, alla prevenzione del ribaltamento e alle procedure di emergenza da adottare in caso di guasto, sovraccarico o condizioni operative critiche.

Al termine del corso è previsto il rilascio dell'attestato di abilitazione, valido su tutto il territorio nazionale, requisito necessario ai sensi dell'art. 73 del D.Lgs 81/2008 per essere adibiti alla conduzione di gru per autocarro.`,

      aChiERivolto: [
        'Autisti di mezzi pesanti dotati di gru idraulica per il carico e lo scarico di merci o materiali',
        'Operai edili, carpentieri e impiantisti che movimentano carichi in cantiere con camion cassonati a gru',
        'Addetti alla logistica e ai trasporti che operano con veicoli industriali attrezzati con braccio idraulico',
        'Operatori del settore forestale e agricolo che utilizzano gru per autocarro per la movimentazione di materiali',
        'Chiunque utilizzi professionalmente camion cassonati con gru idraulica per attività di carico e scarico'
      ],

      cosaImparerai: [
        'Le nozioni di base sulla stabilità dei mezzi, sul baricentro e sui fattori che influenzano il ribaltamento',
        'Il quadro normativo di riferimento sulle attrezzature di lavoro: art. 73 D.Lgs 81/2008 e Accordo Stato-Regioni',
        'I controlli pre-uso e la manutenzione giornaliera della gru per autocarro',
        'Le tecniche di piazzamento e stabilizzazione del veicolo in funzione del terreno',
        'Il calcolo dei pesi e degli sbracci tramite la lettura dei diagrammi e delle tabelle di carico',
        'I dispositivi di sicurezza e di blocco della gru e le relative verifiche di funzionamento',
        'Le manovre operative in cantiere e le procedure di emergenza in caso di guasto o condizioni critiche'
      ],

      faq: [
        { domanda: 'Qual è la differenza tra una gru per autocarro e una gru mobile edile?', risposta: 'La gru per autocarro è un braccio idraulico installato su un veicolo industriale, utilizzato principalmente per il carico e lo scarico di merci durante il trasporto; la gru mobile edile è invece un mezzo dedicato al sollevamento di carichi in cantiere, con caratteristiche costruttive e portate differenti e una propria abilitazione specifica ai sensi dell\'Accordo Stato-Regioni.' },
        { domanda: 'Il corso da 12 ore include prove d\'esame pratiche sul mezzo?', risposta: 'Sì, il percorso formativo prevede una parte pratica con esercitazioni di piazzamento, stabilizzazione e manovra su mezzo reale, seguita da una verifica di apprendimento teorico-pratica necessaria per il conseguimento dell\'attestato di abilitazione.' },
        { domanda: 'Quali sanzioni rischia l\'azienda se impiega operatori non abilitati alla conduzione?', risposta: 'Il datore di lavoro che adibisce alla conduzione di gru per autocarro personale privo della specifica abilitazione è soggetto alle sanzioni previste dal D.Lgs 81/2008 per la violazione degli obblighi formativi, oltre a esporre l\'operatore e terzi a un rischio grave e ingiustificato di infortunio.' },
        { domanda: 'Quanto dura il corso per condurre una gru per autocarro?', risposta: 'Il corso dura 12 ore complessive: 1 ora di modulo giuridico-normativo, 3 ore di modulo tecnico e 8 ore di modulo pratico con esercitazioni di guida.' },
        { domanda: 'Il corso include l\'uso della segnaletica gestuale?', risposta: 'Sì, il modulo tecnico include l\'interpretazione e l\'utilizzo della segnaletica gestuale, fondamentale per coordinare in sicurezza le operazioni.' }
      ],

      moduli: [
        { titolo: 'MODULO I - GIURIDICO-NORMATIVO', durataOre: 1, argomenti: ['Art. 73 del D.Lgs 81/2008 e Accordo Stato-Regioni del 22 febbraio 2012', 'Responsabilità dell\'operatore e obblighi del datore di lavoro'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 3, argomenti: ['Terminologia e caratteristiche tecniche della gru per autocarro', 'Condizioni di stabilità e fattori di ribaltamento', 'Lettura e applicazione delle tabelle e dei diagrammi di carico', 'Calcolo dei pesi e degli sbracci'] },
        { titolo: 'MODULO III - PRATICO', durataOre: 8, argomenti: ['Ispezione visiva e controlli pre-uso del mezzo', 'Piazzamento e stabilizzazione del veicolo su terreno', 'Esercitazioni di guida della gru su percorso di prova', 'Imbracatura e movimentazione dei carichi in sicurezza', 'Dispositivi di sicurezza e procedure di emergenza'] }
      ],

      corsiCorrelati: [
        'carrelli-elevatori-semoventi-conduttore-a-bordo',
        'ple-piattaforme-di-lavoro-mobili-elevabili'
      ]
    }
  }
};
