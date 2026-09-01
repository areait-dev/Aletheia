
// Contenuti editoriali per famiglia "Addetti alla Conduzione di Carriponte" - variante AGGIORNAMENTO (4 ore).
// Chiave posizionale 'livello-1' (unico livello della famiglia).

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Addetti alla Conduzione di Carriponte',
    durataOre: 4,
    modalita: ['Aula', 'Videoconferenza (solo parte teorica)'],
    validita: 'Da ripetere ogni 5 anni',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: null,

    descrizione: `Questo è il corso di aggiornamento abilitante per addetti all'uso del carroponte/gru a cavalletto con comando pensile/radiocomando, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale e deve rinnovarlo prima della scadenza, ai sensi degli artt. 37 comma 7, 71 e 73 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il corso richiama i contenuti principali del corso base: definizioni e parametri dei componenti e degli accessori di sollevamento e imbracatura, rischi nell'uso degli apparecchi di sollevamento e relative misure di prevenzione, norme di sicurezza per l'imbracatura dei carichi e segnaletica di sicurezza.

Il corso si articola in un modulo giuridico-normativo e tecnico (2 ore) e in un modulo pratico (2 ore), con individuazione dei componenti strutturali e dei dispositivi di comando, controlli pre-utilizzo e movimentazione del carico.`,

    aChiERivolto: [
      'Lavoratori già formati con attestato in scadenza o scaduto da poco',
      'Operatori addetti al sollevamento e alla movimentazione di materiali già abilitati',
      'Datori di lavoro che devono garantire l\'aggiornamento periodico degli operatori'
    ],

    cosaImparerai: [
      'Richiamare le definizioni dei componenti delle gru a portale e degli accessori di sollevamento e imbracatura',
      'Consolidare la conoscenza dei rischi nell\'uso degli apparecchi di sollevamento e le relative misure di prevenzione',
      'Aggiornare le norme di sicurezza per l\'imbracatura dei carichi',
      'Esercitarsi nei controlli pre-utilizzo e nella movimentazione del carico'
    ],

    faq: [
      { domanda: 'Ogni quanti anni va effettuato l\'aggiornamento per il carroponte?', risposta: 'L\'aggiornamento è obbligatorio ogni 5 anni, della durata di 4 ore.' },
      { domanda: 'L\'aggiornamento include anche una parte pratica?', risposta: 'Sì, il corso è suddiviso in 2 ore di modulo giuridico-normativo e tecnico e 2 ore di modulo pratico, con controlli pre-utilizzo e movimentazione del carico.' },
      { domanda: 'Posso fare l\'aggiornamento se non ho mai fatto il corso base?', risposta: 'No, l\'aggiornamento è riservato a chi ha già conseguito l\'attestato di formazione iniziale di 10 ore. Senza formazione di base è necessario frequentare il corso completo.' }
    ],

    moduli: [
      { titolo: 'MODULO I - GIURIDICO-NORMATIVO E TECNICO', durataOre: 2, argomenti: ['Cenni normativi: D.Lgs 81/2008, obblighi del datore di lavoro e dei lavoratori', 'Definizioni dei componenti delle gru a portale, tipologie di materiali e carichi consentiti', 'Definizioni e parametri degli accessori di sollevamento e di imbracatura', 'Rischi nell\'uso degli apparecchi di sollevamento e misure di prevenzione', 'Brache di funi, catene e fibre sintetiche: coefficienti di sicurezza, marcatura e periodicità delle verifiche', 'Norme di sicurezza per l\'imbracatura dei carichi; stabilità del carico', 'Dispositivi di protezione individuale e segnaletica di sicurezza'] },
      { titolo: 'MODULO II - PRATICO', durataOre: 2, argomenti: ['Individuazione dei componenti strutturali e dei dispositivi di comando', 'Controlli pre-utilizzo del mezzo e degli intermediari di sollevamento', 'Utilizzo del carroponte con movimentazione del carico', 'Operazioni di fine utilizzo'] }
    ],

    corsiCorrelati: [
      'addetti-alla-conduzione-di-carriponte',
      'operatore-di-gru-per-autocarro',
      'ple-piattaforme-di-lavoro-mobili-elevabili'
    ]
  }
};
