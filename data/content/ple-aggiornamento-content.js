
// Contenuti editoriali per la variante "Aggiornamento" (4 ore) della famiglia ple - generica, unica e
// valida indipendentemente dal corso base seguito (con stabilizzatori, senza stabilizzatori o combinato).
// È la 4a voce raw in data/coursesRaw.js, quindi la chiave posizionale è 'livello-4' (vedi
// editorialLivelloKey in pages/all-courses/[slug].js e il commento in ple-content.js).

module.exports = {
  'livello-4': {
    titolo: 'Aggiornamento PLE Con Stabilizzatori',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Aggiornamento ogni 5 anni',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 80,

    descrizione: `Questo è il corso di aggiornamento per operatori PLE (Piattaforme di Lavoro Mobili Elevabili), della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di abilitazione (con stabilizzatori, senza stabilizzatori o combinato) e deve rinnovarlo prima della scadenza, ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è obbligatorio perché le competenze per la conduzione sicura di una Piattaforma di Lavoro Mobile Elevabile non restano valide a tempo indeterminato: normative, buone prassi e dotazioni tecniche evolvono, e la formazione periodica serve a mantenere allineate le conoscenze dell'operatore ai rischi reali del lavoro in quota. Chi lascia scadere l'attestato senza rinnovarlo non può più essere adibito legalmente alla conduzione della PLE, esponendo sé stesso e l'azienda a responsabilità dirette in caso di controllo o di infortunio.

A differenza dei corsi base - che durano 8 o 10 ore e prevedono un modulo teorico esteso - l'aggiornamento è interamente pratico: 4 ore di esercitazioni su macchina in cui si ripercorrono manovre, livellamento e ancoraggio degli stabilizzatori, dispositivi di sicurezza e procedure di emergenza in quota.

Il corso è pensato per chi ha già l'attestato base in scadenza o scaduto da poco. Chi invece ha un'abilitazione scaduta da troppo tempo, o non l'ha mai conseguita, deve necessariamente frequentare uno dei corsi base (con stabilizzatori, senza stabilizzatori o combinato), non l'aggiornamento.

L'aggiornamento si svolge presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda utilizzando le PLE già in dotazione al cliente.`,

    aChiERivolto: [
      "Chi ha già l'attestato PLE con stabilizzatori in scadenza o scaduto",
      'Operatori già abilitati che devono rinnovare la qualifica',
      'Aziende che devono aggiornare i propri operatori PLE',
      'Datori di lavoro',
      "Nota bene: chi ha l'attestato scaduto da troppo tempo deve frequentare un corso base"
    ],

    cosaImparerai: [
      'Aggiornare le competenze pratiche su manovre e stabilizzazione',
      'Ripassare livellamento e ancoraggio degli stabilizzatori',
      'Rivedere le novità normative introdotte dall\'Accordo Stato-Regioni 2025',
      'Consolidare le procedure di sicurezza e gestione delle emergenze in quota',
      'Applicare correttamente i DPI anticaduta',
      'Ottenere il rinnovo dell\'attestato per ulteriori 5 anni'
    ],

    faq: [
      {
        domanda: 'Ogni quanto va rinnovato?',
        risposta: "L'attestato PLE richiede un aggiornamento periodico per restare in validità, con scadenza quinquennale."
      },
      {
        domanda: "Quanto dura l'aggiornamento?",
        risposta: "4 ore, interamente pratiche, conformi all'Accordo Stato-Regioni del 17 aprile 2025."
      },
      {
        domanda: 'Il corso prevede una parte teorica?',
        risposta: 'No, si tratta di un corso interamente pratico della durata di 4 ore.'
      },
      {
        domanda: "L'attestato è scaduto da molto tempo, posso fare comunque l'aggiornamento?",
        risposta: "Se l'abilitazione è scaduta da troppo tempo, l'aggiornamento non è sufficiente ed è necessario rifare un corso base. Contattaci per una verifica della tua situazione."
      },
      {
        domanda: 'È organizzabile in azienda?',
        risposta: "Sì, è organizzabile direttamente in sede aziendale, utilizzando le PLE del cliente."
      }
    ],

    moduli: [
      {
        titolo: 'MODULO PRATICO',
        durataOreTeoria: 0,
        durataOrePratica: 4,
        argomenti: [
          'Richiamo dei riferimenti normativi (D.Lgs 81/2008, Accordo Stato-Regioni 2025)',
          'Manovre con stabilizzatori: livellamento e ancoraggio',
          'Dispositivi di sicurezza e DPI anticaduta',
          'Gestione delle emergenze in quota'
        ]
      }
    ],

    // Con/Senza/Con e Senza Stabilizzatori sono switch sulla STESSA pagina (non pagine separate), quindi
    // qui va linkato solo un corso realmente esterno alla famiglia.
    corsiCorrelati: [
      'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
    ]
  }
};
