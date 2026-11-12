// Contenuti editoriali per la famiglia "ASACOM - Assistente alla Comunicazione" (family.id 'asacom-assistente-alla-comunicazione'),
// variante unica (tipo 'corso'). Chiave posizionale 'livello-1'.
// FONTE: documento Word "Corso ASACOM.docx" (cartella NUOVO SITO ALETHEIA / CONTENUTI DEF / corsi qualificati, 5 novembre 2026).
// Testi copiati SENZA modifiche.
// DA CONFERMARE (NON nel documento, quindi non inseriti): la DURATA in ore (prima la pagina mostrava "Qualifica Riconosciuta"; nei dati di
// dettaglio del sito c'era "600 ore", ma il programma a 9 moduli del documento non ha ore) e le ORE di ogni modulo (nella tabella compare "-").
// PARTECIPANTI: "minimo 15" (non un massimo): campo partecipantiMin. LUOGO: "Vittoria (RG)", la sede di Via del Carrubo (mappa).
// ATTESTATO: ricavato dal testo ("conseguimento della qualifica professionale di Assistente all'Autonomia e alla Comunicazione delle
// Persone con Disabilità").
// Nessuna lista di corsi correlati nel documento: la pagina usa quella automatica.

module.exports = {
  'asacom-assistente-alla-comunicazione': {
    'livello-1': {
      titolo: "ASACOM - Assistente all'Autonomia e alla Comunicazione delle Persone con Disabilità",
      modalita: ["In presenza"],
      attestato: "Qualifica professionale di Assistente all'Autonomia e alla Comunicazione delle Persone con Disabilità",
      partecipantiMin: 15,
      luogoCorso: { testo: "Vittoria (RG)", indirizzo: "Via del Carrubo snc, 97019 Vittoria (RG)" },
      prezzo: null,

      descrizione: `Il corso ASACOM - Assistente all'Autonomia e alla Comunicazione delle Persone con Disabilità è un percorso di formazione professionale che prepara a svolgere attività di supporto all'autonomia personale, alla comunicazione e all'inclusione delle persone con disabilità, con particolare riferimento al contesto scolastico.

L'Assistente all'Autonomia e alla Comunicazione affianca la persona nelle attività quotidiane e nei percorsi educativi, favorendo la relazione con i compagni, la partecipazione alla vita scolastica e lo sviluppo delle capacità individuali. Il suo intervento è personalizzato in base ai bisogni e alle potenzialità della persona e si realizza in collaborazione con insegnanti, famiglie e altre figure professionali coinvolte nel progetto educativo.

Il corso ASACOM autofinanziato consente di acquisire conoscenze e competenze teoriche, relazionali e operative per intervenire in modo adeguato nelle diverse situazioni di disabilità. Il percorso approfondisce gli aspetti psicologici, educativi e comunicativi, le strategie di sostegno e gli strumenti utili a favorire l'autonomia e la partecipazione.

Al termine del percorso, previo superamento dell'esame finale, è previsto il conseguimento della qualifica professionale di Assistente all'Autonomia e alla Comunicazione delle Persone con Disabilità, secondo la normativa regionale vigente.`,

      aChiERivoltoIntro: `Il corso ASACOM è rivolto a chi desidera lavorare nell'ambito dell'assistenza educativa e dell'inclusione delle persone con disabilità, sviluppando competenze specifiche per supportarne l'autonomia e la comunicazione.

È indicato, in particolare, per:`,
      aChiERivolto: [
        "Persone interessate a intraprendere una professione nell'ambito dei servizi educativi e socio-assistenziali.",
        "Educatori e operatori che desiderano approfondire le proprie competenze nel supporto alle persone con disabilità.",
        "Professionisti interessati a lavorare nei servizi di assistenza specialistica e inclusione scolastica.",
      ],
      aChiERivoltoNota: "Per l'accesso al percorso è richiesto il diploma di scuola secondaria di secondo grado o un titolo equipollente, secondo i requisiti previsti dalla normativa regionale.",

      cosaImparaIntro: "Durante il corso acquisirai competenze per:",
      cosaImparerai: [
        "Individuare i bisogni della persona con disabilità, riconoscendone capacità, potenzialità e necessità di supporto.",
        "Favorire lo sviluppo dell'autonomia personale e sociale attraverso interventi individualizzati.",
        "Facilitare la comunicazione e la relazione, utilizzando strategie e strumenti adeguati alle caratteristiche della persona.",
        "Supportare la partecipazione alle attività scolastiche, educative, laboratoriali e sociali.",
        "Applicare tecniche di comunicazione e relazione nel rapporto con la persona assistita, la famiglia e il gruppo di riferimento.",
        "Collaborare alla definizione e alla realizzazione degli interventi previsti dal Piano Educativo Individualizzato (PEI).",
        "Riconoscere le principali caratteristiche delle diverse forme di disabilità e dei disturbi del neurosviluppo.",
        "Lavorare in équipe con insegnanti, educatori e altre figure professionali coinvolte nel percorso di sostegno.",
        "Monitorare i risultati degli interventi e contribuire alla valutazione del raggiungimento degli obiettivi.",
      ],

      faq: [
        {
          domanda: "L'ASACOM è un insegnante di sostegno?",
          risposta: "No. L'Assistente all'Autonomia e alla Comunicazione (ASACOM) è una figura professionale distinta dall'insegnante di sostegno. L'ASACOM favorisce l'autonomia personale, la comunicazione e la partecipazione dell'alunno con disabilità alla vita scolastica, collaborando con i docenti, la famiglia e le altre figure coinvolte nel progetto educativo individualizzato (PEI).",
        },
        {
          domanda: "Dove può lavorare un ASACOM?",
          risposta: "L'ASACOM opera principalmente nei contesti scolastici, affiancando gli alunni con disabilità nei percorsi di inclusione e partecipazione. Può inoltre trovare opportunità professionali presso cooperative sociali, enti e servizi che realizzano interventi di assistenza specialistica e supporto all'autonomia e alla comunicazione.",
        },
        {
          domanda: "Qual è la differenza tra ASACOM e OSS?",
          risposta: "L'ASACOM si occupa principalmente di favorire l'autonomia, la comunicazione e l'inclusione delle persone con disabilità, soprattutto in età scolastica. L'Operatore Socio Sanitario (OSS), invece, svolge attività di assistenza alla persona e supporto ai bisogni primari in ambito sanitario, socio-sanitario e assistenziale. Sono due profili professionali distinti, con competenze e ambiti di intervento differenti.",
        },
        {
          domanda: "Come si può lavorare come ASACOM nelle scuole pubbliche?",
          risposta: "L'inserimento lavorativo può avvenire attraverso procedure di selezione, avvisi e bandi pubblicati dagli enti competenti o tramite cooperative e soggetti affidatari dei servizi di assistenza specialistica. I requisiti richiesti, compreso il possesso della qualifica ASACOM, devono essere verificati in base all'avviso o alla procedura di selezione.",
        },
      ],

      moduli: [
        { titolo: "Modulo 1 - La relazione nel processo di aiuto", argomenti: [
          "Principi della relazione d'aiuto.",
          "Comunicazione interpersonale e ascolto attivo.",
          "Relazione con la persona con disabilità e con il suo contesto familiare e sociale.",
          "Gestione delle dinamiche relazionali e lavoro in équipe.",
        ] },
        { titolo: "Modulo 2 - Psicologia dello sviluppo, linguaggio, comunicazione e disabilità", argomenti: [
          "Elementi di psicologia dello sviluppo.",
          "Sviluppo del linguaggio e delle capacità comunicative.",
          "Principali tipologie di disabilità e bisogni specifici.",
          "Strategie e strumenti per favorire la comunicazione e l'autonomia.",
        ] },
        { titolo: "Modulo 3 - Legislazione socio-sanitaria, scolastica e della disabilità", argomenti: [
          "Normativa di riferimento in materia di disabilità e inclusione.",
          "Organizzazione dei servizi socio-assistenziali e scolastici.",
          "Diritti e tutela della persona con disabilità.",
          "Ruolo e responsabilità dell'Assistente all'Autonomia e alla Comunicazione.",
        ] },
        { titolo: "Modulo 4 - Comunità sorda e lingua dei segni", argomenti: [
          "Elementi di cultura e storia della comunità sorda.",
          "Introduzione alla Lingua dei Segni Italiana (LIS).",
          "Modalità e strumenti per facilitare la comunicazione con persone con disabilità uditiva.",
        ] },
        { titolo: "Modulo 5 - Disturbi dell'apprendimento e dell'attenzione", argomenti: [
          "Principali disturbi specifici dell'apprendimento (DSA).",
          "Disturbo da deficit di attenzione e iperattività (ADHD).",
          "Strategie di supporto e facilitazione nei contesti educativi.",
        ] },
        { titolo: "Modulo 6 - Introduzione ai disturbi dello spettro autistico", argomenti: [
          "Caratteristiche dei disturbi dello spettro autistico.",
          "Bisogni comunicativi, relazionali e comportamentali.",
          "Strategie per favorire l'interazione e la partecipazione.",
        ] },
        { titolo: "Modulo 7 - Progettazione del Piano Educativo Individualizzato (PEI)", argomenti: [
          "Finalità e struttura del PEI.",
          "Osservazione dei bisogni e delle potenzialità della persona.",
          "Definizione degli obiettivi individualizzati.",
          "Collaborazione con le figure educative e professionali coinvolte.",
        ] },
        { titolo: "Modulo 8 - Didattica speciale e inclusione scolastica", argomenti: [
          "Principi e strategie della didattica inclusiva.",
          "Adattamento delle attività e dei materiali educativi.",
          "Supporto alla partecipazione e alla socializzazione nel gruppo classe.",
          "Utilizzo di strumenti e ausili per l'apprendimento e la comunicazione.",
        ] },
        { titolo: "Modulo 9 - Stress e prevenzione del burnout nelle professioni di aiuto", argomenti: [
          "Riconoscimento delle situazioni di stress lavorativo.",
          "Gestione delle emozioni e delle relazioni professionali.",
          "Strategie di prevenzione del burnout.",
          "Benessere personale e qualità dell'intervento assistenziale.",
        ] },
      ],
    },
  },
};
