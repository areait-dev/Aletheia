
// Contenuti editoriali per famiglia "Carrelli Elevatori Semoventi con Conduttore a Bordo" - variante AGGIORNAMENTO (4 ore)
// Chiave piatta 'livello-1' perché la famiglia ha un'unica variante (nessun descrittore di livello/gruppo
// nel titolo) - stesso pattern di data/content/antincendio-aggiornamento-content.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Addetti alla Conduzione di Carrelli Elevatori con Operatore a Bordo',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Rinnovo ogni 5 anni',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 100,

    descrizione: `Questo è il corso di aggiornamento per addetti alla conduzione di carrelli elevatori con operatore a bordo, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di abilitazione e deve rinnovarlo prima della scadenza, ai sensi del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è obbligatorio perché le competenze per la conduzione sicura di un carrello elevatore non restano valide a tempo indeterminato: normative, buone prassi e dotazioni tecniche evolvono, e la formazione periodica serve a mantenere allineate le conoscenze dell'operatore ai rischi reali che si incontrano ogni giorno in magazzino, in cantiere o in stabilimento. Chi lascia scadere l'attestato senza rinnovarlo non può più essere adibito legalmente alla guida del carrello, esponendo sé stesso e l'azienda a responsabilità dirette in caso di controllo o di infortunio.

A differenza del corso base - che dura 12 ore e prevede un modulo giuridico-normativo esteso, un modulo tecnico approfondito e un modulo pratico - l'aggiornamento è più snello e mirato: un modulo tecnico-normativo che ripercorre riferimenti di legge, obblighi e caratteristiche tecniche dei carrelli, e un modulo pratico in cui l'operatore torna a manovrare il mezzo su percorso di prova, verificando che le competenze acquisite in precedenza siano ancora solide.

Il corso è pensato per chi ha già l'attestato base in scadenza o scaduto da poco. Chi invece ha un'abilitazione scaduta da troppo tempo, o non l'ha mai conseguita, deve necessariamente frequentare il corso base completo di 12 ore, non l'aggiornamento.

L'aggiornamento si svolge in aula presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda utilizzando i carrelli elevatori già in dotazione.`,

    aChiERivolto: [
      "Lavoratori già in possesso dell'attestato base in scadenza",
      'Magazzinieri e addetti alla logistica già abilitati',
      'Operai di cantiere o stabilimento già formati',
      'Datori di lavoro che devono rinnovare la propria abilitazione'
    ],

    cosaImparerai: [
      'Richiamare gli obblighi normativi aggiornati in materia di conduzione di carrelli elevatori',
      'Riconoscere le statistiche infortunistiche più recenti legate all\'uso dei carrelli',
      'Verificare bilanciamento e carico ideale del mezzo',
      'Applicare le procedure di manutenzione e controllo giornaliero',
      'Consolidare le manovre di guida su percorso di prova',
      'Eseguire i controlli di fine giornata'
    ],

    faq: [
      {
        domanda: 'Ogni quanto va rinnovato?',
        risposta: "L'attestato richiede un aggiornamento periodico per restare valido, con scadenza quinquennale di prassi."
      },
      {
        domanda: "Quanto dura l'aggiornamento?",
        risposta: "4 ore complessive: 3 ore di modulo pratico e 1 ora di modulo tecnico-normativo."
      },
      {
        domanda: "L'attestato è scaduto da molto tempo, posso comunque fare l'aggiornamento?",
        risposta: "Se l'abilitazione è scaduta da troppo tempo potrebbe essere necessario rifare il corso base da 12 ore. Contattaci per una verifica della tua situazione specifica."
      },
      {
        domanda: 'Prevede una parte pratica?',
        risposta: "Sì, 3 ore di guida su percorso di prova."
      },
      {
        domanda: 'È organizzabile per tutto il team aziendale?',
        risposta: "Sì, l'aggiornamento è organizzabile direttamente in sede aziendale, utilizzando i mezzi del cliente."
      }
    ],

    moduli: [
      {
        titolo: 'MODULO TECNICO-NORMATIVO',
        durataOreTeoria: 1,
        durataOrePratica: 0,
        argomenti: [
          'Richiamo dei riferimenti normativi (D.Lgs 81/2008, Accordo Stato Regioni)',
          'Obblighi del datore di lavoro e del lavoratore',
          'Richiamo delle caratteristiche tecniche dei carrelli semoventi',
          'Statistiche infortunistiche e casi di errore frequenti'
        ]
      },
      {
        titolo: 'MODULO PRATICO',
        durataOreTeoria: 0,
        durataOrePratica: 3,
        argomenti: [
          'Verifiche pre-utilizzo e controlli di sicurezza',
          'Guida su percorso di prova a vuoto e a carico',
          'Manovre di posizionamento del carico',
          'Controlli di fine giornata'
        ]
      }
    ],

    corsiCorrelati: [
      'carrelli-elevatori-semoventi-con-conduttore-a-bordo',
      'ple-piattaforme-di-lavoro-mobili-elevabili',
      'gru-su-autocarro',
    ]
  }
};
