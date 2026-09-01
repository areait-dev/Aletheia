
// Contenuti editoriali per famiglia "Datore di Lavoro" - variante AGGIORNAMENTO (6 ore).
// Chiave posizionale 'livello-2' (secondo livelloKey della famiglia, 'default' - vedi il commento in
// datore-di-lavoro-content.js su come questa famiglia arriva ad avere 2 livelli anziché uno switch
// corso/aggiornamento su un solo livello).

module.exports = {
  'livello-2': {
    titolo: 'Aggiornamento Formazione per Datore di Lavoro',
    durataOre: 6,
    modalita: ['FAD'],
    validita: 'Aggiornamento periodico previsto dalla normativa',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: null,

    descrizione: `Questo è il corso di aggiornamento per Datore di Lavoro, della durata di 6 ore, non il corso base: è rivolto a chi ha già completato la Formazione per Datore di Lavoro (16 ore) e deve rinnovarla periodicamente, ai sensi dell'art. 18 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è obbligatorio perché il ruolo di datore di lavoro comporta responsabilità dirette in materia di salute e sicurezza che richiedono un allineamento costante alle novità normative, organizzative e di gestione del rischio introdotte nel tempo.

Il corso è pensato per chi ha già l'attestato di Formazione Datore di Lavoro in scadenza. Chi invece non ha mai conseguito la formazione di base deve frequentare il corso completo di 16 ore, non l'aggiornamento.`,

    aChiERivolto: [
      'Datori di lavoro già in possesso dell\'attestato di Formazione Datore di Lavoro (16 ore) con formazione in scadenza',
      'Titolari di piccole e medie imprese che devono rinnovare la propria formazione periodica',
      'Attenzione: chi non ha mai conseguito la formazione di base deve prima frequentare il corso completo di 16 ore, non l\'aggiornamento'
    ],

    cosaImparerai: [
      'Aggiornare le conoscenze sul sistema legislativo in materia di salute e sicurezza dei lavoratori',
      'Rivedere le responsabilità del datore di lavoro e le condizioni della delega di funzioni',
      'Aggiornare le misure organizzative e gestionali di tutela previste dagli artt. 15 e 30 del D.Lgs 81/2008',
      'Consolidare la gestione della valutazione dei rischi, del DUVRI e delle emergenze'
    ],

    faq: [
      { domanda: 'Chi può fare l\'aggiornamento Datore di Lavoro?', risposta: 'L\'aggiornamento è riservato a chi ha già conseguito l\'attestato di Formazione Datore di Lavoro di 16 ore. Senza formazione di base è necessario frequentare il corso completo.' },
      { domanda: 'Quanto dura l\'aggiornamento e come si articola?', risposta: 'L\'aggiornamento dura 6 ore, erogate in un modulo unico in FAD.' },
      { domanda: 'Devo fare anche il modulo cantieri se opero in cantiere?', risposta: 'Sì, il modulo aggiuntivo "Cantieri" (6 ore) resta un percorso separato e integrativo, da abbinare al corso base o all\'aggiornamento in base alla propria situazione formativa.' }
    ],

    // NOTA: nella pagina isolata originale questa variante non aveva un programma corso ufficiale
    // ("moduli: null", tab Moduli con placeholder "Dettaglio moduli in aggiornamento"). Il template
    // [slug].js non gestisce contenutoLivello.moduli assente (fa .map incondizionato), quindi qui viene
    // fornito un modulo unico riepilogativo basato sulla descrizione disponibile, invece di lasciare
    // il campo vuoto/null e rompere il render.
    moduli: [
      { titolo: 'MODULO UNICO - AGGIORNAMENTO', durataOre: 6, argomenti: ['Aggiornamento sul sistema legislativo in materia di salute e sicurezza', 'Responsabilità del datore di lavoro e delega di funzioni', 'Misure organizzative e gestionali (artt. 15 e 30 D.Lgs 81/2008)', 'Valutazione dei rischi, DUVRI e gestione delle emergenze'] }
    ],

    corsiCorrelati: [
      'datore-di-lavoro-modulo-comune',
      'formazione-dirigente-modulo-comune',
      'modulo-aggiuntivo-cantieri-per-datore-di-lavoro'
    ]
  }
};
