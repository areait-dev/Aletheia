// Contenuti editoriali per famiglia "Addetti Macchina Raccogli Frutta Aggiornamento" (family.id
// 'addetti-macchina-raccogli-frutta-aggiornamento'): famiglia SEPARATA da "Addetti Macchina Raccogli Frutta CRF" (8 ore), a variante
// unica (4 ore). Chiave posizionale 'livello-1'.
// FONTE: documento Word "aggiornamento-Addetti Macchina Raccogli Frutta CRF.docx" (cartella NUOVO SITO ALETHEIA / CONTENUTI DEF /
// corsi decreto attrezzature, 5 novembre 2026). Testi copiati SENZA modifiche.
// MODALITA': ["In presenza"] ricavata dalla FAQ del documento ("deve svolgersi in presenza").
// DA CONFERMARE (non presenti nel documento, quindi non inseriti): validità del nuovo attestato, dicitura dell'attestato, partecipanti max.
// DA VERIFICARE nel testo: il 2° punto di "A chi è rivolto" parla di "conseguire l'abilitazione" in un corso di AGGIORNAMENTO
// (per chi è già abilitato): lasciato come nel documento.

module.exports = {
  'addetti-macchina-raccogli-frutta-aggiornamento': {
    'livello-1': {
      titolo: "Addetti Macchina Raccogli Frutta CRF - Aggiornamento",
      durataOre: 4,
      modalita: ["In presenza"],
      prezzo: null,

      descrizione: `Il corso di aggiornamento per lavoratori addetti alla conduzione di Macchine Agricole Raccoglifrutta (CRF), della durata di 4 ore, è rivolto agli operatori già in possesso dell'abilitazione e consente di aggiornare le competenze necessarie per l'utilizzo in sicurezza di questa tipologia di attrezzatura agricola, ai sensi dell'art. 73 del D.Lgs. 81/2008 e dell'Accordo Stato-Regioni del 17 aprile 2025.

Il percorso approfondisce le principali novità normative e tecniche, i rischi connessi all'utilizzo delle CRF e le procedure di sicurezza da adottare durante le attività di conduzione, movimentazione e stazionamento. Vengono inoltre richiamati i controlli e le verifiche da effettuare prima dell'utilizzo, le condizioni che possono compromettere la stabilità del mezzo e le corrette modalità operative in situazioni di emergenza.

Il corso prevede un aggiornamento teorico e pratico finalizzato a consolidare le conoscenze degli operatori e a promuovere comportamenti sicuri nell'utilizzo quotidiano delle macchine raccoglifrutta.`,

      aChiERivolto: [
        "Lavoratori addetti alla conduzione di macchine agricole raccoglifrutta (CRF)",
        "Operatori agricoli che devono conseguire l'abilitazione ai sensi dell'art. 73 del D.Lgs. 81/2008",
        "Datori di lavoro che devono garantire la formazione dei propri addetti alla conduzione di CRF",
      ],

      cosaImparerai: [
        "Aggiornare le conoscenze sulle caratteristiche e sui componenti delle macchine raccoglifrutta",
        "Riconoscere i principali rischi connessi alla conduzione e alla movimentazione del mezzo",
        "Applicare le procedure di sicurezza durante l'utilizzo e lo stazionamento",
        "Effettuare i controlli preliminari e riconoscere eventuali anomalie",
        "Valutare le condizioni del terreno, le pendenze e gli ostacoli che possono influire sulla stabilità",
        "Consolidare le corrette procedure operative e le manovre di emergenza",
        "Mantenere valida l'abilitazione alla conduzione di macchine agricole raccoglifrutta",
      ],

      faq: [
        {
          domanda: "Il patentino per la macchina raccoglifrutta è valido anche per altri macchinari agricoli?",
          risposta: "No. L'abilitazione alla conduzione della macchina agricola raccoglifrutta è specifica per questa attrezzatura e non sostituisce le abilitazioni richieste per altri macchinari, come trattori agricoli o piattaforme di lavoro elevabili.",
        },
        {
          domanda: "Si può frequentare il corso di aggiornamento macchina raccoglifrutta online?",
          risposta: "No. L'aggiornamento previsto dall'Accordo Stato-Regioni del 17 aprile 2025 deve svolgersi in presenza, poiché comprende attività pratiche e una verifica finale.",
        },
        {
          domanda: "Cosa succede se il patentino macchina raccoglifrutta è scaduto?",
          risposta: "L'operatore deve effettuare l'aggiornamento previsto prima di riprendere la conduzione dell'attrezzatura. La formazione pregressa non viene automaticamente annullata, ma occorre verificare la situazione dell'abilitazione e gli eventuali obblighi di aggiornamento.",
        },
      ],

      moduli: [
        { titolo: "MODULO PRATICO + VERIFICA PRATICA", durataOre: 4, argomenti: [
          "Esercitazioni di controllo dei componenti strutturali e dei dispositivi di comando e sicurezza",
          "Verifica delle condizioni di stabilità del mezzo e valutazione delle condizioni del terreno",
          "Esercitazioni di movimentazione, posizionamento e conduzione in sicurezza",
          "Applicazione delle procedure operative e delle manovre di emergenza",
        ] },
      ],
    },
  },
};
