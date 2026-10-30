
// Contenuti editoriali per la variante "Aggiornamento" (4 ore) della famiglia dpi-3-categoria.
// FONTE: Word "dpi 3categoria aggiornamento.docx" (CONTENUTI DEF / corsi obbligatori), testi invariati
// (sostituisce il testo precedente, tratto dal programma PDF). La famiglia ha una sola livelloKey ('default'),
// quindi la chiave posizionale è 'livello-1' (vedi editorialLivelloKey in pages/all-courses/[slug].js).
// Il Word non indica il numero massimo di partecipanti: partecipantiMax omesso, prezzo assente.
// Gli argomenti dei moduli nel Word sono una riga unica separata da " - " / ";": divisi in voci senza alterare le parole.
// CORREZIONE su richiesta: la FAQ 2 nel Word diceva "5 ore (3 teoria + 2 pratica)", allineata a scheda e moduli
// (4 ore: 3 + 1). Anche la FAQ 5 è stata riscritta su richiesta: il Word negava la periodicità quinquennale,
// ora conferma il rinnovo ogni 5 anni come da scheda.

module.exports = {
  'livello-1': {
    titolo: 'DPI 3° Categoria Aggiornamento',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Aggiornamento ogni 5 anni',
    attestato: 'Attestato valido su tutto il territorio nazionale',

    descrizione: `L'aggiornamento DPI di III categoria è rivolto ai lavoratori che hanno già frequentato la formazione iniziale e utilizzano dispositivi di protezione individuale destinati a proteggerli da rischi gravi o permanenti per la salute e la sicurezza.

Il percorso consente di consolidare le conoscenze acquisite e aggiornare le competenze relative alla scelta, al controllo e al corretto utilizzo dei DPI, con particolare attenzione ai dispositivi anticaduta impiegati nei lavori in quota.

Durante il corso vengono ripresi i principali obblighi normativi, le caratteristiche dei dispositivi e le procedure operative per verificarne l'integrità, utilizzarli correttamente e conservarli in condizioni adeguate.

Le esercitazioni pratiche permettono ai partecipanti di ripassare le procedure di vestizione, regolazione, collegamento e utilizzo dei dispositivi, rafforzando l'attenzione verso i comportamenti sicuri durante le attività lavorative.

L'aggiornamento si inserisce nell'ambito degli obblighi previsti dall'art. 77 del D.Lgs. 81/2008, che richiede una formazione adeguata e specifica e il relativo addestramento per i DPI di III categoria.`,

    aChiERivolto: [
      'Addetti a lavori in quota (edili, lattonieri, carpentieri, antennisti, spazzacamini, potatori)',
      'Addetti a sospensione su fune (lavavetri, disgaggi su parete rocciosa, posa reti)',
      'Operatori esposti a rischi chimici, termici o elettrici gravi',
    ],

    cosaImparerai: [
      'Richiamare gli obblighi normativi relativi all\'utilizzo dei DPI di III categoria',
      'Aggiornare le conoscenze sulle caratteristiche e sulle tipologie dei dispositivi',
      'Riconoscere eventuali anomalie e deterioramenti dei DPI',
      'Effettuare i controlli preliminari prima dell\'utilizzo',
      'Ripassare le corrette procedure di vestizione, regolazione e collegamento',
      'Consolidare le competenze pratiche per l\'impiego dei dispositivi anticaduta',
      'Applicare le corrette procedure di conservazione e gestione dei DPI',
    ],

    faq: [
      {
        domanda: 'Quando bisogna fare l\'aggiornamento DPI di III categoria?',
        risposta: 'L\'aggiornamento deve essere programmato in relazione ai rischi presenti, alle caratteristiche delle attività lavorative e alle eventuali modifiche dei dispositivi o delle procedure di utilizzo. L\'art. 77 del D.Lgs. 81/2008 prevede che la formazione e l\'addestramento siano ripetuti in caso di cambiamenti che possano incidere sulla sicurezza e quando se ne evidenzi la necessità.',
      },
      {
        domanda: 'Quanto dura il corso di aggiornamento DPI di III categoria?',
        risposta: 'Il corso di aggiornamento proposto da Alètheia ha una durata complessiva di 4 ore, suddivise in 3 ore di approfondimento teorico e 1 ora di esercitazioni pratiche.',
      },
      {
        domanda: 'Chi può partecipare al corso di aggiornamento DPI anticaduta?',
        risposta: 'Possono partecipare i lavoratori che hanno già frequentato la formazione iniziale per l\'utilizzo dei DPI di III categoria e che necessitano di consolidare e aggiornare le competenze relative all\'impiego dei dispositivi, in particolare quelli anticaduta.',
      },
      {
        domanda: 'L\'aggiornamento DPI di III categoria prevede una prova pratica?',
        risposta: 'Sì. Il percorso comprende esercitazioni pratiche per ripassare il controllo dei dispositivi, la vestizione e la regolazione dell\'imbracatura, il collegamento dei componenti e le procedure di utilizzo in sicurezza.',
      },
      {
        domanda: 'È obbligatorio aggiornare il corso DPI di III categoria ogni 5 anni?',
        risposta: 'Sì, il rinnovo è previsto ogni 5 anni con un aggiornamento di 4 ore (3 ore di teoria e 1 ora di pratica). La formazione e l\'addestramento vanno comunque ripetuti prima di tale scadenza in caso di cambiamenti dei rischi, delle condizioni di lavoro o dei dispositivi utilizzati, ai sensi dell\'art. 77 del D.Lgs. 81/2008. Il datore di lavoro deve assicurare che formazione e addestramento siano adeguati e aggiornati.',
      },
    ],

    moduli: [
      {
        titolo: 'MODULO 1 - TEORICO',
        durataOre: 3,
        argomenti: [
          'Cenni sulla normativa ed obblighi degli operatori',
          'Diversificazione dei DPI',
          'Scelta dei DPI in base alla tipologia di lavoro',
          'Verifica e manutenzione dei DPI',
        ],
      },
      {
        titolo: 'MODULO 2 - PRATICO',
        durataOre: 1,
        argomenti: [
          'Preparazione e verifica dei DPI',
          'Utilizzo e gestione dei DPI',
        ],
      },
    ],

    corsiCorrelati: [
      'lavori-in-quota',
      'pes-pav-lavori-elettrici',
    ],
  },
};
