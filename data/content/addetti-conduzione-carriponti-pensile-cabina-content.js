// Contenuti editoriali per famiglia "Addetti alla Conduzione di Carriponte Pensile/Cabina" (family.id
// 'addetti-alla-conduzione-di-carriponti-pensile-cabina') - variante CORSO (11 ore). Chiave posizionale 'livello-1' (unico livello).
// FONTE: documento Word "Corso Addetti alla Conduzione di Carroponte.docx" (cartella NUOVO SITO ALETHEIA / CONTENUTI DEF / corsi decreto
// attrezzature, 5 novembre 2026). Testi e scheda tecnica (11 ore, modalità, validità, attestato, partecipanti max 30) copiati SENZA modifiche.
// ABBINAMENTO (da confermare): il documento si intitola "Carroponte" ma dura 11 ore come "Addetti Alla Conduzione Di Carriponte Pensile/Cabina"
// (il corso "Carriponte" da 10 ore ha già i suoi testi, vedi addetti-alla-conduzione-di-carriponte-content.js) e cita "comando pensile,
// radiocomando e/o comando in cabina".
// NON usato: la riga "Luogo del corso (click che si apre la mappa)" del documento: il sito non ha ancora quel blocco in nessun corso.
// FORMATTAZIONE: nel documento il 1° punto di "A chi è rivolto" non ha il pallino (è dopo "Il corso carroponte è obbligatorio per:"):
// qui è il primo elemento della lista; l'introduzione "Il corso carroponte è obbligatorio per:" non è riportata.
// Nessuna lista di corsi correlati nel documento: la pagina usa quella automatica.

module.exports = {
  'addetti-alla-conduzione-di-carriponti-pensile-cabina': {
    'livello-1': {
      titolo: "Corso Addetti alla Conduzione di Carriponte Pensile/Cabina",
      durataOre: 11,
      modalita: ["Aula","Aula virtuale (solo parte teorica)"],
      validita: "Aggiornamento ogni 5 anni",
      attestato: "Attestato valido in tutta Italia",
      partecipantiMax: 25, partecipantiPraticaMax: 6, // Decreto Attrezzature: 25 teoria in aula, 6 pratica
      prezzo: null,

      descrizione: `Il corso è progettato in conformità con il D.Lgs. 81/08 e con le disposizioni del nuovo Accordo Stato-Regioni, garantendo agli operatori un'abilitazione riconosciuta e valida su tutto il territorio nazionale.

Il carroponte è la macchina destinata al sollevamento e allo spostamento di materiali e merci con movimenti ristretti e confinati. Non va confuso con la gru a portale, che scorre su binari posti diversi metri più in basso della struttura, sostenuta da quattro bracci: due macchine diverse, due modalità operative diverse, due percorsi formativi diversi.

Dal 24 maggio 2026 l'abilitazione carroponte è regolata dal nuovo Accordo Stato-Regioni: non è più sufficiente una formazione interna gestita dal datore di lavoro - serve un percorso strutturato con modulo teorico e prova pratica documentata, valido su tutto il territorio nazionale.

Il corso forma gli operatori a condurre in sicurezza il carroponte con comando pensile o radiocomando, riconoscere i rischi legati all'ambiente di lavoro e alla movimentazione dei carichi, e rispettare tutti i requisiti previsti dalla normativa vigente.

Il percorso formativo include tecniche operative per la movimentazione carichi in sicurezza, con particolare attenzione alla valutazione della portata, alla scelta delle imbracature e alla gestione delle manovre in spazi ristretti.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda (di norma per gruppi di circa 8 dipendenti, con valutazione caso per caso). La parte teorica è disponibile anche in aula virtuale. La prova pratica deve essere svolta obbligatoriamente in presenza.`,

      aChiERivolto: [
        "Lavoratori che utilizzano carriponte e gru a cavalletto con comando pensile o radiocomando",
        "Operatori addetti al sollevamento e alla movimentazione di materiali in ambito industriale e produttivo",
        "Lavoratori già in possesso di esperienza pregressa che devono regolarizzare la propria posizione con il nuovo Accordo Stato-Regioni 2026",
        "Datori di lavoro che ricoprono personalmente il ruolo di operatore carroponte",
      ],

      cosaImparerai: [
        "Identificare le caratteristiche costruttive del carroponte e distinguerlo dalla gru a portale",
        "Condurre in sicurezza il carroponte con comando pensile e con radiocomando",
        "Riconoscere e valutare i rischi specifici legati al sollevamento e alla movimentazione dei carichi",
        "Eseguire i controlli pre-operativi e verificare l'efficienza dell'attrezzatura prima dell'utilizzo",
        "Applicare le procedure operative di sicurezza durante le manovre di sollevamento",
        "Gestire correttamente imbracature, ganci e accessori di sollevamento",
        "Operare in sicurezza negli spazi ristretti e confinati tipici degli ambienti industriali",
        "Riconoscere e gestire le situazioni di emergenza durante la conduzione del carroponte",
      ],

      faq: [
        {
          domanda: "Il corso carroponte è obbligatorio?",
          risposta: "Sì. Dal 24 maggio 2026 il nuovo Accordo Stato-Regioni ha inserito il carroponte tra le attrezzature che richiedono un'abilitazione specifica standardizzata. Chi già opera su questi mezzi deve regolarizzare la propria posizione seguendo il percorso formativo previsto, che include modulo teorico-tecnico e prova pratica documentata.",
        },
        {
          domanda: "Qual è la differenza tra carroponte e gru a portale?",
          risposta: "Sono due macchine distinte con percorsi formativi diversi. Il carroponte scorre su binari posizionati in quota, all'interno di capannoni industriali, ed è comandato con pensile o radiocomando. La gru a portale scorre invece su binari a terra, sostenuta da quattro bracci. Chi utilizza entrambe le attrezzature deve frequentare entrambi i corsi.",
        },
        {
          domanda: "Ogni quanto va rinnovato il corso per Addetti alla Conduzione di Carriponte?",
          risposta: "L'aggiornamento è obbligatorio ogni 5 anni, della durata di 4 ore. La mancata frequenza entro i termini previsti comporta la decadenza dell'abilitazione e l'impossibilità di operare legalmente sull'attrezzatura.",
        },
        {
          domanda: "L'attestato è valido in tutta Italia?",
          risposta: "Sì. L'attestato rilasciato al termine del corso è valido su tutto il territorio nazionale, in conformità con il nuovo Accordo Stato-Regioni e il D.Lgs. 81/08.",
        },
        {
          domanda: "È possibile organizzare il corso direttamente in azienda?",
          risposta: "Sì. Di norma si considera un gruppo di circa 8 dipendenti, con valutazione caso per caso. Alètheia può organizzare il corso presso la sede aziendale, inclusa la parte pratica. Contattaci per ricevere un preventivo personalizzato.",
        },
      ],

      moduli: [
        { titolo: "MODULO TEORICO PRATICO", durataOre: 4, argomenti: [
          "Terminologia, tipologie di carriponte e gru a cavalletto, movimenti e dispositivi di sollevamento",
          "Nozioni di fisica per la valutazione della massa dei carichi e delle condizioni di equilibrio e stabilità",
          "Componenti principali: travi, carrello, argano, paranco, gancio, bozzello, funi, catene, vie di corsa e binari",
          "Dispositivi di comando, segnalazione e sicurezza: caratteristiche, funzionamento e controlli",
          "Differenze tra comando pensile, radiocomando e comando in cabina",
          "Principali rischi connessi all'utilizzo del carroponte e procedure per la movimentazione sicura dei carichi",
          "Installazione, documentazione tecnica, dispositivi di protezione individuale e segnaletica gestuale",
          "Procedure di imbracatura e movimentazione dei carichi",
          "Controlli, manutenzione e verifiche periodiche dell'attrezzatura e delle vie di corsa",
        ] },
        { titolo: "MODULO PRATICO", durataOre: 7, argomenti: [
          "Individuazione dei componenti strutturali del carroponte e della gru a cavalletto",
          "Identificazione e prove di funzionamento dei dispositivi di comando, sia con comando pensile/radiocomando sia con comando in cabina",
          "Individuazione e verifica dei dispositivi di segnalazione e sicurezza",
          "Esecuzione dei controlli visivi e funzionali prima dell'utilizzo",
          "Esercitazioni di movimentazione senza carico: sollevamento, scorrimento e traslazione",
          "Valutazione della massa dei carichi ed esecuzione delle manovre di movimentazione",
          "Tecniche per contrastare e limitare l'oscillazione dei carichi",
          "Imbracatura dei carichi e valutazione degli angoli di lavoro delle tratte",
          "Applicazione delle procedure operative, considerando i limiti dell'attrezzatura, le zone interdette e le possibili interferenze",
        ] },
      ],
    },
  },
};
