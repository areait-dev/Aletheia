// Contenuti editoriali per famiglia "Addetti alla Conduzione di Carriponte Pensile/Cabina" - variante AGGIORNAMENTO (4 ore).
// Chiave posizionale 'livello-1' (unico livello della famiglia).
// FONTE: documento Word "aggiornamento-Corso Addetti alla Conduzione di Carroponte.docx" (cartella NUOVO SITO ALETHEIA / CONTENUTI DEF /
// corsi decreto attrezzature, 5 novembre 2026). Testi copiati SENZA modifiche.
// ABBINAMENTO (da confermare): il documento si intitola "Carroponte" e cita "comando pensile, radiocomando e/o comando in cabina", e il
// corso base abbinato dura 11 ore come "Addetti Alla Conduzione Di Carriponte Pensile/Cabina" (il corso "Carriponte" da 10 ore ha già i suoi testi).
// MODALITA': ["In presenza"] ricavata dal testo ("si svolge esclusivamente in presenza presso la sede Alètheia di Vittoria (RG)").
// DA CONFERMARE (non presenti nel documento, quindi non inseriti): validità del nuovo attestato, dicitura dell'attestato, partecipanti max.

module.exports = {
  'livello-1': {
    titolo: "Aggiornamento Addetti alla Conduzione di Carriponte Pensile/Cabina",
    durataOre: 4,
    modalita: ["In presenza"],
    prezzo: null,

    descrizione: `Il corso di aggiornamento per lavoratori addetti alla conduzione di carriponte, della durata di 4 ore, è rivolto agli operatori già in possesso dell'abilitazione e ha l'obiettivo di mantenere aggiornate le competenze necessarie per utilizzare l'attrezzatura in sicurezza, in conformità con l'art. 73 del D.Lgs. 81/2008 e con il nuovo Accordo Stato-Regioni del 17 aprile 2025.

Il percorso si concentra sul consolidamento delle capacità operative dell'addetto, attraverso esercitazioni pratiche relative ai controlli preliminari, all'individuazione dei dispositivi di comando e sicurezza e alle corrette procedure di sollevamento e movimentazione dei carichi.

Durante le attività vengono riprese le tecniche di imbracatura, le manovre con e senza carico, la gestione dell'oscillazione e le procedure da adottare in relazione alle caratteristiche dell'ambiente di lavoro. Sono inoltre richiamate eventuali evoluzioni tecniche e modifiche normative.

Il corso si svolge esclusivamente in presenza presso la sede Alètheia di Vittoria (RG) e si conclude con una prova pratica e un colloquio per la verifica delle competenze acquisite.`,

    aChiERivolto: [
      "Lavoratori già in possesso dell'abilitazione alla conduzione di carriponte e gru a cavalletto con comando pensile, radiocomando e/o comando in cabina",
      "Operatori addetti al sollevamento e alla movimentazione di materiali in ambito industriale e produttivo che devono effettuare l'aggiornamento periodico",
      "Datori di lavoro che devono garantire l'aggiornamento della formazione dei propri addetti alla conduzione di carriponte",
    ],

    cosaImparerai: [
      "Consolidare le capacità di individuazione dei componenti strutturali e dei dispositivi di comando e sicurezza",
      "Eseguire i controlli preliminari prima dell'utilizzo dell'attrezzatura",
      "Effettuare manovre di movimentazione del carroponte senza carico e con carico",
      "Valutare la massa e le caratteristiche dei carichi da movimentare",
      "Applicare le corrette tecniche di imbracatura e utilizzo degli accessori di sollevamento",
      "Gestire l'oscillazione del carico durante le operazioni di movimentazione",
      "Riconoscere le condizioni di rischio e applicare le procedure operative di sicurezza",
      "Superare la verifica pratica finale e il colloquio previsti per l'aggiornamento dell'abilitazione",
    ],

    faq: [
      {
        domanda: "Come rinnovare il patentino del carroponte?",
        risposta: "Per rinnovare il patentino del carroponte è necessario frequentare un corso di aggiornamento della durata minima di 4 ore, ogni 5 anni. Il percorso prevede attività pratiche e si conclude con una prova pratica e un colloquio, secondo quanto stabilito dall'Accordo Stato-Regioni del 17 aprile 2025.",
      },
      {
        domanda: "Cosa succede se il patentino del carroponte è scaduto?",
        risposta: "Se è trascorso il periodo previsto per l'aggiornamento, l'abilitazione non può essere considerata regolarmente mantenuta. Prima di riprendere a utilizzare l'attrezzatura, è necessario verificare la propria posizione formativa e completare l'aggiornamento richiesto.",
      },
      {
        domanda: "Il corso di aggiornamento carroponte si può fare online?",
        risposta: "No. L'aggiornamento per addetti alla conduzione di carriponte prevede un modulo pratico di 4 ore da svolgere in presenza. Non è possibile frequentarlo interamente in aula virtuale o in e-learning.",
      },
      {
        domanda: "Come si svolge la prova pratica del corso di aggiornamento carroponte?",
        risposta: "La prova pratica verifica la capacità dell'operatore di utilizzare correttamente l'attrezzatura e applicare le procedure di sicurezza. Le esercitazioni riguardano, tra gli altri aspetti, i controlli pre-utilizzo, le manovre di movimentazione, la gestione dei carichi e l'impiego dei dispositivi di sicurezza. Il percorso si conclude anche con un colloquio.",
      },
    ],

    moduli: [
      { titolo: "MODULO PRATICO", durataOre: 4, argomenti: [
        "Individuazione dei componenti strutturali del carroponte e della gru a cavalletto",
        "Verifica del funzionamento dei dispositivi di comando, segnalazione e sicurezza",
        "Esecuzione dei controlli visivi e funzionali prima dell'utilizzo",
        "Esercitazioni di movimentazione senza carico: sollevamento, scorrimento e traslazione",
        "Valutazione della massa dei carichi e svolgimento delle manovre di sollevamento e movimentazione",
        "Tecniche di imbracatura dei carichi e valutazione degli angoli di lavoro delle tratte",
        "Esercitazioni per contrastare e limitare l'oscillazione dei carichi",
        "Richiamo delle procedure operative di sicurezza e delle corrette modalità di utilizzo dell'attrezzatura",
        "Illustrazione di eventuali modifiche normative ed evoluzioni tecniche",
      ] },
    ],
  },
};
