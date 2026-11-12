// Contenuti editoriali per la famiglia "OSS - Operatore Socio Sanitario" (family.id 'oss-operatore-socio-sanitario'), variante unica
// (tipo 'corso'). Chiave posizionale 'livello-1'.
// FONTE: documento Word "Corso OSS.docx" (cartella NUOVO SITO ALETHEIA / CONTENUTI DEF / corsi qualificati, 5 novembre 2026).
// Testi copiati SENZA modifiche. DURATA: 1000 ore dal documento (prima la pagina mostrava "Qualifica Riconosciuta").
// NON PUBBLICATE le ore dei moduli: il documento indica "4 ore" per l'area socioculturale e "7 ore" per quella tecnico-operativa e niente per
// quella relazionale, valori non compatibili con 1000 ore (sembrano residui di un altro modello): da chiedere al reparto formazione la
// ripartizione ufficiale. Nella tabella dei moduli compare "-".
// PARTECIPANTI: "minimo 15" (non un massimo): campo partecipantiMin. LUOGO: "Vittoria (RG)", la sede di Via del Carrubo (mappa).
// ATTESTATO: ricavato dal testo ("rilascio della qualifica professionale di Operatore Socio Sanitario").
// Nessuna lista di corsi correlati nel documento: la pagina usa quella automatica.

module.exports = {
  'oss-operatore-socio-sanitario': {
    'livello-1': {
      titolo: "OSS - Operatore Socio Sanitario",
      durataOre: 1000,
      modalita: ["In presenza"],
      attestato: "Qualifica professionale di Operatore Socio Sanitario (OSS)",
      partecipantiMin: 15,
      luogoCorso: { testo: "Vittoria (RG)", indirizzo: "Via del Carrubo snc, 97019 Vittoria (RG)" },
      prezzo: null,

      descrizione: `Il corso OSS - Operatore Socio Sanitario è un percorso di formazione professionale finalizzato al conseguimento della qualifica di Operatore Socio Sanitario, una figura che svolge attività di assistenza e supporto alle persone in condizioni di fragilità, parziale o totale perdita di autonomia.

Il corso forma professionisti in grado di rispondere ai bisogni primari della persona, promuoverne il benessere e favorirne l'autonomia, collaborando con le altre figure professionali presenti nei servizi sanitari, socio-sanitari e assistenziali.

Il percorso formativo combina lezioni teoriche, esercitazioni pratiche e tirocinio, consentendo ai partecipanti di acquisire conoscenze e competenze utili per operare in diversi contesti di assistenza.

Il corso OSS è autofinanziato: la partecipazione prevede il pagamento di una quota di iscrizione e frequenza. Al termine del percorso, previo superamento dell'esame finale, è previsto il rilascio della qualifica professionale di Operatore Socio Sanitario, secondo la disciplina regionale vigente.`,

      aChiERivoltoIntro: `Il corso è rivolto a chi desidera intraprendere una professione nell'ambito dell'assistenza alla persona e acquisire una qualifica professionale per lavorare nei servizi sanitari, socio-sanitari e assistenziali.

Per accedere al percorso sono richiesti:`,
      aChiERivolto: [
        "Aver compiuto 18 anni alla data di iscrizione",
        "Essere in possesso del diploma di scuola secondaria di primo grado (licenza media)",
      ],
      aChiERivoltoNota: "Per i titoli di studio conseguiti all'estero sono previste specifiche condizioni di riconoscimento e, nei casi richiesti, la certificazione della conoscenza della lingua italiana.",

      cosaImparaIntro: "Durante il corso acquisirai competenze per:",
      cosaImparerai: [
        "Riconoscere i bisogni assistenziali della persona e supportarla nelle attività quotidiane.",
        "Favorire l'igiene, il comfort e il benessere della persona assistita.",
        "Collaborare nella cura e nell'assistenza a persone anziane, con disabilità o in condizioni di fragilità.",
        "Applicare tecniche di mobilizzazione e supporto alla persona.",
        "Contribuire alla prevenzione dei rischi e alla gestione degli ambienti di assistenza.",
        "Comunicare efficacemente con utenti, familiari e altri professionisti.",
        "Collaborare con l'équipe sanitaria e socio-assistenziale nel rispetto dei ruoli e delle responsabilità professionali.",
      ],
      cosaImparaNota: "Al termine del corso, dopo aver completato le attività formative e superato l'esame finale previsto, sarà rilasciata la qualifica professionale di Operatore Socio Sanitario (OSS), secondo le disposizioni regionali vigenti.",

      faq: [
        {
          domanda: "Qual è la differenza tra OSS e OSA?",
          risposta: "L'Operatore Socio Sanitario (OSS) possiede una formazione che integra competenze di assistenza alla persona in ambito sociale e sanitario. L'Operatore Socio Assistenziale (OSA), invece, è una figura prevalentemente orientata al supporto nei bisogni quotidiani e relazionali. Si tratta di qualifiche differenti, con profili professionali e ambiti di intervento da non confondere.",
        },
        {
          domanda: "Dove può lavorare un Operatore Socio Sanitario?",
          risposta: "Un OSS può trovare opportunità professionali in diversi contesti pubblici e privati, tra cui ospedali, RSA, case di riposo, strutture residenziali e semiresidenziali, servizi di assistenza domiciliare e comunità socio-assistenziali. Le possibilità di inserimento dipendono dai requisiti richiesti dalle singole strutture e dalle procedure di selezione.",
        },
        {
          domanda: "Quali sono le mansioni di un OSS e quali attività non può svolgere autonomamente?",
          risposta: "L'Operatore Socio Sanitario si occupa dell'assistenza diretta alla persona, del supporto nelle attività quotidiane e della collaborazione con l'équipe sanitaria e socio-assistenziale. Opera nel rispetto delle proprie competenze e delle indicazioni dei professionisti responsabili: non sostituisce figure come l'infermiere e non svolge autonomamente attività riservate ad altre professioni sanitarie.",
        },
        {
          domanda: "Con la qualifica OSS è possibile lavorare anche nel settore pubblico?",
          risposta: "Sì, la qualifica di Operatore Socio Sanitario può consentire di partecipare alle selezioni e ai concorsi pubblici per il profilo OSS, quando si possiedono tutti i requisiti indicati nel relativo bando. È sempre necessario verificare che il titolo richiesto sia conforme a quello posseduto e alle disposizioni previste dalla selezione.",
        },
      ],

      moduli: [
        { titolo: "Area socioculturale, legislativa e istituzionale", argomenti: [
          "Organizzazione dei servizi sanitari, socio-sanitari e assistenziali.",
          "Aspetti etici, deontologici e normativi della professione.",
          "Diritti della persona assistita e principi di tutela.",
          "Ruolo e responsabilità dell'Operatore Socio Sanitario.",
        ] },
        { titolo: "Area tecnico-operativa", argomenti: [
          "Elementi di anatomia, fisiologia e igiene.",
          "Assistenza ai bisogni primari della persona.",
          "Igiene personale, alimentazione e mobilizzazione.",
          "Prevenzione dei rischi e sicurezza negli ambienti di assistenza.",
          "Supporto alle attività assistenziali e collaborazione con il personale sanitario.",
        ] },
        { titolo: "Area relazionale", argomenti: [
          "Comunicazione e relazione con la persona assistita.",
          "Ascolto e gestione delle relazioni con familiari e caregiver.",
          "Lavoro in équipe e collaborazione tra professionisti.",
          "Assistenza a persone con differenti bisogni e livelli di autonomia.",
        ] },
      ],
      moduliNota: { titolo: "Esercitazioni e tirocinio", testo: [
        "Attività di laboratorio per sviluppare le abilità tecnico-operative.",
        "Esperienze di tirocinio presso strutture e servizi convenzionati, secondo l'organizzazione del percorso formativo.",
      ] },
    },
  },
};
