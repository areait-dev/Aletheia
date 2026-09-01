
// Contenuti editoriali per famiglia "Macchine Movimento Terra" - variante AGGIORNAMENTO (4 ore).
// È la 7a voce raw in data/coursesRaw.js (livelloKey 'default', nessun descrittore tra parentesi nel
// titolo "Aggiornamento Macchine Movimento Terra"), quindi la chiave posizionale è 'livello-7' - vedi
// il commento in macchine-movimento-terra-content.js.

module.exports = {
  'livello-7': {
    titolo: 'Aggiornamento Addetti alla Conduzione di Macchine Movimento Terra',
    durataOre: 4,
    modalita: ['Aula'],
    validita: "Da ripetere periodicamente ai sensi dell'art. 73 e dell'Allegato IX del D.Lgs 81/2008",
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 100,

    descrizione: `Questo è il corso di aggiornamento abilitante per addetti alla conduzione di escavatori idraulici, caricatori frontali e terne, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale e deve rinnovarlo prima della scadenza, ai sensi dell'art. 73 e dell'Allegato IX del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il corso, interamente pratico, richiama i contenuti principali del corso base sulla responsabilità dell'operatore e sulle modalità di uso in sicurezza, e prevede esercitazioni pratiche operative con simulazioni di movimentazione di escavatori idraulici, caricatori frontali e terne.`,

    aChiERivolto: [
      'Operatori e conducenti di macchine movimento terra già formati, con attestato in scadenza',
      'Lavoratori edili e impiantisti in possesso del patentino MMT che devono rinnovare la propria idoneità',
      'Datori di lavoro che devono garantire l\'aggiornamento periodico degli operatori'
    ],

    cosaImparerai: [
      'Richiamare la normativa generale in materia di igiene e sicurezza sull\'uso di attrezzature semoventi con operatore a bordo',
      'Riconoscere i fattori di rischio e pericolo e le modalità di uso in sicurezza',
      'Individuare i dispositivi di comando e sicurezza e il loro funzionamento',
      'Esercitarsi in simulazioni di movimentazione di escavatori idraulici, caricatori frontali e terne',
      'Applicare le procedure operative di sicurezza, di salvataggio e le manovre di emergenza'
    ],

    faq: [
      { domanda: "Ogni quanto va rinnovata l'abilitazione?", risposta: "L'abilitazione va rinnovata periodicamente frequentando il corso di aggiornamento da 4 ore, valido per escavatori idraulici, caricatori frontali e terne già abilitati, ai sensi dell'art. 73 e dell'Allegato IX del D.Lgs 81/2008." },
      { domanda: "L'aggiornamento è teorico o pratico?", risposta: 'È interamente pratico: comprende esercitazioni con simulazioni di movimentazione delle macchine e procedure di sicurezza ed emergenza.' }
    ],

    moduli: [
      { titolo: 'MODULO UNICO - MODULO PRATICO', durataOre: 4, argomenti: ["Cenni di normativa generale in materia di igiene e sicurezza del lavoro con riferimento all'uso di attrezzature semoventi con operatore a bordo", "Responsabilità dell'operatore, modalità di uso in sicurezza e individuazione dei fattori di rischio e pericolo", 'Esercitazioni pratiche operative', 'Individuazione dei dispositivi di comando e sicurezza e loro funzionamento', 'Simulazioni di movimentazione di escavatori idraulici, caricatori frontali e terne', 'Procedure operative di sicurezza, di salvataggio e manovre di emergenza', 'Controlli pre-post utilizzo'] }
    ],

    corsiCorrelati: [
      'macchine-movimento-terra-livello-6',
      'carrelli-elevatori-semoventi-conduttore-a-bordo',
      'operatore-di-gru-per-autocarro'
    ]
  }
};
