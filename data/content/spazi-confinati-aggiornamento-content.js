
// Contenuti editoriali per famiglia "Spazi Confinati" - variante AGGIORNAMENTO (4 ore).
// Chiave posizionale 'livello-1' (unico livello della famiglia) - vedi spazi-confinati-content.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Abilitante per Lavori in Spazi Confinati',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Da ripetere ogni 5 anni ai sensi del D.P.R. 177/2011',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 160,

    descrizione: `Questo è il corso di aggiornamento abilitante per lavori in ambienti sospetti di inquinamento e spazi confinati, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale di 12 ore e deve rinnovarlo prima della scadenza, ai sensi degli artt. 37, 66 e 121 del D.Lgs 81/2008, del D.P.R. 177/2011 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è obbligatorio perché operare in ambienti confinati comporta rischi che richiedono un costante allineamento a normative, procedure e strumentazione: la gestione delle emergenze in spazi ad accesso limitato richiede un richiamo pratico periodico.

Il corso è erogato in un modulo unico di 4 ore suddiviso in: 2 ore di teoria (richiamo normativo, check-list di ingresso, analisi rischi più frequenti come anossia e fumi) e 2 ore di pratica (esercitazioni con DPI, APVR, imbracature, tripode, gestione del soccorso con tecniche di primo soccorso e BLS).`,

    aChiERivolto: [
      'Lavoratori già formati (attestato di 12 ore) con formazione in scadenza o scaduta da poco',
      'Datori di lavoro e lavoratori autonomi già abilitati che devono rinnovare il certificato',
      'Aziende che devono garantire l\'aggiornamento periodico quinquennale del personale'
    ],

    cosaImparerai: [
      'Richiamare i principi generali della normativa di riferimento su spazi confinati',
      'Aggiornare l\'uso delle check list per l\'ingresso in spazi confinati e la valutazione della sicurezza della scena',
      'Consolidare le tecniche di gestione del soccorso e primo soccorso, incluso il BLS',
      'Aggiornare l\'utilizzo pratico di DPI, APVR, imbracature di sicurezza, tripode e rilevatori'
    ],

    faq: [
      { domanda: 'Ogni quanto va rinnovato l\'attestato spazi confinati?', risposta: 'L\'attestato per lavori in ambienti confinati e spazi sospetti di inquinamento va aggiornato ogni 5 anni.' },
      { domanda: 'L\'aggiornamento tratta anche le tecniche di primo soccorso?', risposta: 'Sì, il programma include la gestione del soccorso con tecniche di primo soccorso e manovre di BLS per il recupero dell\'operatore.' },
      { domanda: 'Posso fare l\'aggiornamento se il mio attestato è scaduto da tempo?', risposta: 'Se l\'attestato è scaduto da troppo tempo, l\'aggiornamento da solo potrebbe non bastare ed è necessario rifare il corso base di 12 ore.' }
    ],

    moduli: [
      { titolo: 'MODULO UNICO - TEORICO E PRATICO', durataOre: 4, argomenti: ['Richiamo normativo e check-list di ingresso (2 ore di teoria)', 'Analisi dei rischi più frequenti: anossia, fumi', 'Esercitazioni con DPI, APVR, imbracature e tripode (2 ore di pratica)', 'Gestione del soccorso con tecniche di primo soccorso e BLS'] }
    ],

    corsiCorrelati: [
      'spazi-confinati',
      'lavori-in-quota',
      'coordinatori-cantieri-cse-csp'
    ]
  }
};
