
// Contenuti editoriali per famiglia "RSPP/ASPP Esterno" - variante AGGIORNAMENTO (40 ore).
// È la 1a voce raw in data/coursesRaw.js (precede i moduli A/B/C), quindi la chiave posizionale è
// 'livello-1' - vedi editorialLivelloKey in pages/all-courses/[slug].js e il commento in
// rspp-aspp-content.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento RSPP/ASPP Esterno',
    durataOre: 40,
    modalita: ['Aula', 'FAD'],
    validita: 'Da ripetere periodicamente ai sensi dell\'art. 32 D.Lgs 81/2008 e dell\'Accordo Stato Regioni del 17/04/2025',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 400,

    descrizione: `Questo è il corso di aggiornamento per chi ha già conseguito la qualifica di RSPP o ASPP esterno, non il percorso di formazione iniziale: è rivolto a chi possiede già l'attestato (Modulo A e B per gli ASPP, Moduli A, B e C per gli RSPP) e deve mantenere aggiornate le proprie competenze nel tempo, ai sensi dell'art. 32 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è previsto perché il quadro normativo, gli strumenti di gestione del rischio e le migliori pratiche organizzative evolvono nel tempo: chi ricopre un ruolo di RSPP o ASPP deve rimanere allineato ai cambiamenti legislativi e alle nuove metodologie di gestione della sicurezza per continuare a operare correttamente ed efficacemente in azienda.

Il corso, della durata di 40 ore, tratta aspetti giuridico-normativi e novità in materia di formazione, sistemi di gestione e processi organizzativi, gestione dei rischi secondo gli standard ISO, il rischio da stress lavoro-correlato, la gestione delle riunioni, la gestione delle sostanze pericolose, le novità normative sulla valutazione dei rischi, la prevenzione incendi e il benessere organizzativo.

Il corso è disponibile in aula presso la sede Alètheia di Vittoria (RG) o in FAD (formazione a distanza); la modalità videoconferenza non è prevista per l'aggiornamento. È possibile organizzare la formazione anche per gruppi di professionisti provenienti dalla stessa azienda o rete di consulenza.`,

    aChiERivolto: [
      'RSPP esterni già qualificati che devono mantenere aggiornata l\'abilitazione',
      'ASPP esterni già qualificati che devono mantenere aggiornata l\'abilitazione',
      'Consulenti e professionisti con qualifica in scadenza',
      'Attenzione: chi non è qualificato deve prima seguire il percorso iniziale Modulo A, B ed eventualmente C'
    ],

    cosaImparerai: [
      'Aggiornarsi sull\'evoluzione legislativa e sulle principali novità normative',
      'Applicare sistemi di gestione della sicurezza e monitorare i processi organizzativi',
      'Utilizzare gli standard ISO 31000 e ISO 19600 per rischio e compliance',
      'Valutare e gestire il rischio da stress lavoro-correlato e i fenomeni psicosociali',
      'Pianificare e gestire riunioni analizzando le dinamiche di gruppo',
      'Gestire correttamente le sostanze pericolose, incluso stoccaggio e trasporto ADR',
      'Aggiornarsi su novità di valutazione rischi, inclusi cancerogeni e mutageni',
      'Applicare novità legislative di prevenzione incendi e promuovere il benessere organizzativo'
    ],

    faq: [
      { domanda: 'Ogni quanto va rinnovata la qualifica di RSPP o ASPP?', risposta: 'La qualifica richiede un aggiornamento periodico per restare valida.' },
      { domanda: 'Quanto dura il corso di aggiornamento RSPP/ASPP?', risposta: 'L\'aggiornamento dura 40 ore complessive, suddivise in nove moduli su aspetti normativi, gestionali e tecnici.' },
      { domanda: 'Il corso di aggiornamento si può fare in FAD?', risposta: 'Sì, è disponibile sia in aula sia in FAD; la videoconferenza non è prevista.' },
      { domanda: 'Posso fare l\'aggiornamento se non ho ancora la qualifica di RSPP o ASPP?', risposta: 'No, l\'aggiornamento è riservato a chi ha già completato il percorso base. Chi non è qualificato deve frequentare prima i Moduli base.' },
      { domanda: 'L\'aggiornamento è uguale per RSPP e ASPP?', risposta: 'Il corso è proposto con un monte ore comune di 40 ore per entrambe le figure professionali.' }
    ],

    moduli: [
      {
        titolo: 'MODULO UNICO - AGGIORNAMENTO NORMATIVO, GESTIONALE E TECNICO',
        durataOreTeoria: 40,
        durataOrePratica: 0,
        argomenti: [
          'Aspetti giuridico-normativi e novità in materia di formazione',
          'Sistemi di gestione e processi organizzativi',
          'Gestione dei rischi secondo gli standard ISO',
          'Rischio da stress lavoro-correlato',
          'Gestione delle riunioni',
          'Gestione delle sostanze pericolose',
          'Novità normative sulla valutazione dei rischi',
          'Prevenzione incendi e benessere organizzativo'
        ]
      }
    ],

    corsiCorrelati: ['rspp-aspp-livello-2', 'rspp-aspp-livello-3', 'rspp-aspp-livello-4']
  }
};
