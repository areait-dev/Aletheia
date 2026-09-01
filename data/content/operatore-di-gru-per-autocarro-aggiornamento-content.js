
// Contenuti editoriali per famiglia "Operatore di Gru per Autocarro" - variante AGGIORNAMENTO (4 ore).
// Chiave posizionale 'livello-1' (unico livello della famiglia) - vedi operatore-di-gru-per-autocarro-content.js
// e la nota sul fix del titolo raw in data/coursesRaw.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Addetti alla Conduzione di Gru per Autocarro',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Da ripetere periodicamente ai sensi dell\'art. 37, 73 e allegato IV del D.Lgs 81/2008',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 100,

    descrizione: `Questo è il corso di aggiornamento abilitante per conducenti di gru per autocarro, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale di 12 ore e deve rinnovarlo prima della scadenza.

L'aggiornamento periodico è obbligatorio perché il datore di lavoro deve garantire che i lavoratori incaricati dell'uso di ogni attrezzatura dispongano di un'informazione e formazione costantemente adeguate.

Il corso, interamente pratico, richiama i contenuti principali del corso base: tecnologia e componenti della gru, dispositivi di comando e di sicurezza, condizioni di equilibrio, controlli, manutenzioni e guida della gru su percorso di prova.`,

    aChiERivolto: [
      'Conducenti di gru per autocarro già formati (attestato di 12 ore), con formazione in scadenza',
      'Addetti di cantiere e operatori della logistica già abilitati che devono rinnovare il patentino',
      'Datori di lavoro che devono garantire l\'aggiornamento periodico degli operatori'
    ],

    cosaImparerai: [
      'Richiamare le tipologie e le caratteristiche dei veicoli dotati di gru per autocarro',
      'Consolidare la conoscenza dei rischi connessi all\'impiego di gru su autocarro',
      'Esercitarsi nella guida della gru su percorso di prova: posizione, presa del carico, trasporto e sosta in sicurezza'
    ],

    faq: [
      { domanda: 'L\'aggiornamento include anche una parte teorica?', risposta: 'No, il corso è interamente pratico e si concentra sulla guida della gru su percorso di prova e sulla gestione dei rischi più frequenti.' },
      { domanda: 'Posso fare l\'aggiornamento se il mio attestato è scaduto da tempo?', risposta: 'Se l\'attestato è scaduto da troppo tempo, l\'aggiornamento da solo potrebbe non essere sufficiente ed è necessario rifare il corso base di 12 ore.' }
    ],

    moduli: [
      { titolo: 'MODULO UNICO - AGGIORNAMENTO PRATICO', durataOre: 4, argomenti: ['Tecnologia e componenti della gru per autocarro', 'Dispositivi di comando e di sicurezza', 'Condizioni di equilibrio, controlli e manutenzioni', 'Guida della gru su percorso di prova: posizione, presa del carico, trasporto e sosta in sicurezza'] }
    ],

    corsiCorrelati: [
      'operatore-di-gru-per-autocarro',
      'carrelli-elevatori-semoventi-conduttore-a-bordo'
    ]
  }
};
