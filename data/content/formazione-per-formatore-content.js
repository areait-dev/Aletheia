// Contenuti editoriali per famiglia "Formazione per Formatore" (slug 'formazione-per-formatore'), variante unica
// (solo tipo 'corso'), un solo livello 'livello-1'. FONTE: Word "formazione per formatore.docx" (CONTENUTI DEF /
// corsi obbligatori), testi invariati.
// Il Word non indica né le ore dei singoli moduli né il numero massimo di partecipanti: non inventati, la
// tabella moduli mostra "—" per la durata e partecipantiMax è omesso. Aggiornamento ogni 3 anni dalla scheda tecnica.

module.exports = {
  'formazione-per-formatore': {
    'livello-1': {
      titolo: 'Corso Formazione per formatori della sicurezza',
      durataOre: 24,
      modalita: ['FAD'],
      validita: 'Aggiornamento ogni 3 anni',
      attestato: 'Attestato valido su tutto il territorio nazionale',

      descrizione: `Ai sensi del D.Lgs. 81/08 e del Decreto Interministeriale del 6 marzo 2013, per diventare Formatore della Sicurezza sul Lavoro è necessario possedere specifici requisiti di qualificazione.

Il corso di formazione per Formatori della Sicurezza è rivolto a professionisti che desiderano sviluppare competenze e metodologie didattiche per progettare, organizzare e gestire interventi formativi in materia di salute e sicurezza sul lavoro.

Il percorso approfondisce i principi della comunicazione efficace, le tecniche di apprendimento degli adulti e gli strumenti per strutturare attività formative coinvolgenti, favorendo il trasferimento delle conoscenze e la partecipazione dei discenti.

La formazione fornisce strumenti teorici e metodologici per migliorare la qualità degli interventi didattici e sviluppare le capacità necessarie a gestire un'aula, anche in contesti formativi rivolti ai lavoratori.

Il corso è erogabile in FAD.`,

      aChiERivolto: [
        'Consulenti in materia di salute e sicurezza sul lavoro',
        'RSPP e ASPP',
        'Professionisti e tecnici del settore',
        'Docenti e aspiranti formatori',
        'Responsabili e operatori della formazione aziendale',
      ],

      cosaImparerai: [
        'Comprendere il ruolo e le responsabilità del formatore in materia di salute e sicurezza sul lavoro',
        'Progettare un intervento formativo definendo obiettivi, contenuti e metodologie didattiche',
        'Applicare tecniche di comunicazione efficace e gestione del gruppo',
        "Utilizzare strumenti e metodologie per favorire l'apprendimento degli adulti",
        "Gestire le dinamiche d'aula e coinvolgere attivamente i partecipanti",
        "Valutare l'efficacia dell'attività formativa e l'apprendimento dei discenti",
      ],

      faq: [
        {
          domanda: 'Come diventare formatore per la sicurezza sul lavoro?',
          risposta: 'Per diventare formatore-docente in materia di salute e sicurezza sul lavoro è necessario possedere i requisiti previsti dal Decreto Interministeriale 6 marzo 2013. La normativa stabilisce un prerequisito di istruzione e diversi criteri alternativi che combinano conoscenze, esperienza professionale e competenze didattiche. Il corso di Formazione per Formatori della Sicurezza di 24 ore permette di acquisire la preparazione didattica prevista da uno dei percorsi contemplati dalla normativa.',
        },
        {
          domanda: 'Quali sono i requisiti per diventare formatore della sicurezza?',
          risposta: "Il Decreto Interministeriale 6 marzo 2013 individua diversi criteri per la qualificazione dei formatori in materia di salute e sicurezza sul lavoro. In generale, è richiesto il diploma di scuola secondaria di secondo grado e il possesso di almeno uno dei criteri previsti, che possono comprendere esperienza professionale nel settore, attività di docenza, titoli di studio coerenti e specifica formazione didattica. I requisiti devono essere verificati in relazione al criterio applicabile e all'area tematica di insegnamento.",
        },
        {
          domanda: 'A cosa serve il corso formatore della sicurezza di 24 ore?',
          risposta: 'Il corso di Formazione per Formatori della Sicurezza di 24 ore consente di sviluppare competenze nella progettazione e nella gestione degli interventi formativi. Approfondisce metodologie didattiche, tecniche di comunicazione, apprendimento degli adulti, gestione dell\'aula e valutazione dei risultati. Il percorso formativo di almeno 24 ore in didattica è contemplato dal D.I. 6 marzo 2013 tra gli elementi utili per soddisfare specifici criteri di qualificazione del formatore-docente.',
        },
        {
          domanda: 'Il corso per formatore della sicurezza di 24 ore online è valido?',
          risposta: "La formazione a distanza può essere una modalità di fruizione del percorso formativo. Perché il corso sia utilizzabile ai fini del criterio normativo pertinente, è importante che rispetti i requisiti previsti, comprese le eventuali condizioni relative alla verifica finale dell'apprendimento e alla documentazione del percorso. Prima dell'iscrizione è quindi opportuno verificare le caratteristiche didattiche e organizzative del corso.",
        },
        {
          domanda: 'Il corso di formazione per formatori della sicurezza abilita automaticamente a insegnare nei corsi sulla sicurezza sul lavoro?',
          risposta: 'No. Il completamento del corso di 24 ore non comporta automaticamente la qualificazione come formatore-docente. Il percorso fornisce la componente didattica prevista da uno dei criteri del D.I. 6 marzo 2013, ma il professionista deve possedere anche gli altri requisiti richiesti dal criterio applicabile, tra cui il prerequisito di istruzione e l\'esperienza professionale o didattica prevista.',
        },
      ],

      moduli: [
        {
          titolo: "MODULO 1 - La comunicazione e l'apprendimento",
          argomenti: [
            'Principi della comunicazione efficace',
            'Apprendimento degli adulti e processi formativi',
            'Tecniche di coinvolgimento e partecipazione',
            'Gestione delle dinamiche e delle criticità del gruppo',
            "La stesura del Programma formativo e dei test di verifica dell'apprendimento",
          ],
        },
        {
          titolo: "MODULO 2 - Progettazione, metodologie e gestione d'aula",
          argomenti: ['Ciclo della formazione', 'La micro-progettazione', 'Le metodologie attive'],
        },
        {
          titolo: 'MODULO 3 - Lezione attiva, valutazione della formazione, simulazioni',
          argomenti: [
            'Lezione attiva',
            'Strumenti e materiali di supporto alla formazione',
            'La valutazione della formazione',
            'Esercitazioni',
          ],
        },
      ],

      corsiCorrelati: [
        'rspp-datore-di-lavoro',
        'rls',
        'coordinatori-cantieri-cse-csp',
      ],
    },
  },
};
