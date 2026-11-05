// Contenuti editoriali per famiglia "Addetti Caricatori Movimentazione di Materiali CMM" - variante AGGIORNAMENTO (4 ore).
// Chiave posizionale 'livello-1' (unico livello della famiglia).
// FONTE: documento Word "aggiornamento-Addetti Caricatori Movimentazione Di Materiali CMM.docx" (cartella NUOVO SITO ALETHEIA /
// CONTENUTI DEF / corsi decreto attrezzature, 5 novembre 2026). Testi copiati SENZA modifiche.
// MODALITA': ["In presenza"] ricavata dal testo del documento ("si svolge esclusivamente in presenza"); la durata è nel documento.
// DA CONFERMARE (non presenti nel documento, quindi non inseriti): validità del nuovo attestato, dicitura dell'attestato, partecipanti max.
// Nessuna lista di corsi correlati nel documento: la pagina usa quella automatica.

module.exports = {
  'livello-1': {
    titolo: "Aggiornamento Addetti Caricatori Movimentazione di Materiali CMM",
    durataOre: 4,
    modalita: ["In presenza"],
    prezzo: null,

    descrizione: `Il corso di aggiornamento per lavoratori addetti alla conduzione di Caricatori per la Movimentazione di Materiali (CMM), della durata di 4 ore, è rivolto agli operatori già in possesso dell'abilitazione e ha l'obiettivo di mantenere aggiornate le competenze necessarie per utilizzare queste attrezzature in sicurezza, in conformità con l'art. 73 del D.Lgs. 81/2008 e con il nuovo Accordo Stato-Regioni del 17 aprile 2025.

Il percorso formativo è dedicato al consolidamento delle capacità operative degli addetti, attraverso esercitazioni pratiche sul funzionamento dei comandi, sui controlli dei dispositivi di segnalazione e sicurezza e sulle corrette procedure di movimentazione dei materiali.

Le attività comprendono l'ispezione dell'attrezzatura e dei suoi componenti, la preparazione del caricatore per il trasporto e lo spostamento, la pianificazione delle operazioni di sollevamento e il corretto posizionamento del mezzo in relazione al carico e alle condizioni del terreno. Vengono inoltre riprese le procedure di movimentazione in sicurezza, la gestione delle situazioni operative e le eventuali evoluzioni normative e tecniche.

Il corso di aggiornamento caricatori CMM si svolge esclusivamente in presenza e si conclude con almeno quattro prove pratiche e un colloquio finale, finalizzati a verificare il mantenimento delle competenze necessarie per la conduzione sicura dell'attrezzatura.`,

    aChiERivolto: [
      "Lavoratori già in possesso dell'abilitazione alla conduzione di caricatori per la movimentazione di materiali (CMM)",
      "Operatori addetti alla movimentazione e al sollevamento di materiali che devono effettuare l'aggiornamento periodico del patentino",
      "Datori di lavoro che devono garantire l'aggiornamento della formazione dei propri addetti alla conduzione di CMM",
    ],

    cosaImparerai: [
      "Consolidare le competenze relative al funzionamento dei comandi e dei dispositivi del caricatore",
      "Verificare l'efficienza dei dispositivi di segnalazione e di sicurezza",
      "Eseguire le ispezioni dell'attrezzatura, dei circuiti di alimentazione e dei principali componenti",
      "Preparare il caricatore per il trasporto e lo spostamento",
      "Pianificare le operazioni di sollevamento considerando il carico, la configurazione del braccio e le condizioni del sito di lavoro",
      "Posizionare correttamente il caricatore in relazione al baricentro del carico e alle caratteristiche del terreno",
      "Applicare le corrette procedure operative durante il sollevamento e la movimentazione dei materiali",
      "Superare le prove pratiche e il colloquio finale previsti per l'aggiornamento dell'abilitazione",
    ],

    faq: [
      {
        domanda: "Cosa succede se il patentino CMM è scaduto?",
        risposta: "Se è trascorso il termine previsto per l'aggiornamento quinquennale, il lavoratore deve regolarizzare la propria formazione prima di riprendere a utilizzare l'attrezzatura. Il datore di lavoro deve verificare che gli addetti siano in possesso di un'abilitazione valida e della formazione richiesta per svolgere le attività in sicurezza.",
      },
      {
        domanda: "Quali macchine rientrano nella categoria dei caricatori per la movimentazione di materiali CMM?",
        risposta: "La categoria CMM comprende le attrezzature individuate dall'Accordo Stato-Regioni del 17 aprile 2025. Per capire se una specifica macchina rientra in questa categoria è necessario verificarne le caratteristiche tecniche e la destinazione d'uso, facendo riferimento alla documentazione del costruttore e alla classificazione prevista dall'Accordo.",
      },
      {
        domanda: "Il patentino CMM è obbligatorio per utilizzare i caricatori per la movimentazione di materiali?",
        risposta: "Sì, quando l'attrezzatura rientra tra quelle per cui è richiesta una specifica abilitazione. L'art. 73 del D.Lgs. 81/2008 prevede che i lavoratori incaricati dell'utilizzo di attrezzature che richiedono conoscenze e responsabilità particolari ricevano una formazione e un addestramento adeguati.",
      },
      {
        domanda: "Come verificare se un attestato CMM conseguito prima del 2025 è ancora valido?",
        risposta: "Gli attestati conseguiti secondo la precedente normativa devono essere valutati alla luce delle disposizioni transitorie del nuovo Accordo Stato-Regioni del 17 aprile 2025. Per verificare la validità dell'abilitazione e le eventuali scadenze di aggiornamento occorre controllare la data di conseguimento, il percorso formativo svolto e la documentazione rilasciata.",
      },
    ],

    moduli: [
      { titolo: "MODULO PRATICO", durataOre: 4, argomenti: [
        "Funzionamento dei comandi per spostamento, posizionamento e operatività",
        "Test dei dispositivi di segnalazione e di sicurezza e ispezione del caricatore",
        "Pianificazione ed esercitazioni dell'operazione di sollevamento",
        "Posizionamento e messa a punto del caricatore per il sollevamento",
        "Manovre del caricatore con e senza carico, singole e combinate",
        "Movimentazione di carichi comuni, di forma particolare e con accessori speciali",
        "Manovre di precisione, imbracatura dei carichi e comunicazione via segnali/radio",
        "Uso sicuro, manutenzione e gestione delle situazioni di emergenza",
      ] },
    ],
  },
};
