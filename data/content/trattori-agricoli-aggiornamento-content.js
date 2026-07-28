
// Contenuti editoriali per la variante "Aggiornamento" (4 ore) della famiglia trattori-agricoli-o-forestali -
// generica, unica e valida indipendentemente dal corso base seguito (ruote, cingoli o combinato). È la 4a
// voce raw in data/coursesRaw.js, quindi la chiave posizionale è 'livello-4' (vedi editorialLivelloKey in
// pages/all-courses/[slug].js e il commento in trattori-agricoli-content.js).

module.exports = {
  'livello-4': {
    titolo: 'Aggiornamento Addetti alla Conduzione di Trattori Agricoli o Forestali',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Aggiornamento ogni 5 anni',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 100,

    descrizione: `Questo è il corso di aggiornamento per addetti alla conduzione di trattori agricoli o forestali, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di abilitazione (a ruote, a cingoli o combinato) e deve rinnovarlo prima della scadenza, ai sensi dell'art. 73 e dell'allegato VIII del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025. Il corso è generico e valido per chi opera sia con trattori a ruote sia a cingoli, indipendentemente dal corso base seguito.

L'aggiornamento periodico è obbligatorio perché le competenze per la conduzione sicura di un trattore agricolo o forestale non restano valide a tempo indeterminato: normative, buone prassi e dotazioni tecniche evolvono, e la formazione periodica serve a mantenere allineate le conoscenze dell'operatore ai rischi reali che si incontrano in campo, su terreni in pendenza o in contesti forestali. Chi lascia scadere l'attestato senza rinnovarlo non può più essere adibito legalmente alla conduzione del trattore, esponendo sé stesso e l'azienda a responsabilità dirette in caso di controllo o di infortunio.

A differenza dei corsi base - che durano 8 o 13 ore e prevedono moduli tecnici e pratici estesi - l'aggiornamento è più snello e mirato: un modulo giuridico che richiama la normativa generale in materia di attrezzature semoventi con operatore a bordo e le responsabilità dell'operatore, e un modulo tecnico-normativo pratico in cui si ripercorrono categorie di trattori, componenti, dispositivi di comando e sicurezza, controlli pre-utilizzo e pianificazione delle operazioni in campo.

Il corso è pensato per chi ha già l'attestato base in scadenza o scaduto da poco. Chi invece ha un'abilitazione scaduta da troppo tempo, o non l'ha mai conseguita, deve necessariamente frequentare uno dei corsi base (a ruote, a cingoli o combinato), non l'aggiornamento.

L'aggiornamento si svolge in aula presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda utilizzando i trattori già in dotazione.`,

    aChiERivolto: [
      "Chi ha già l'attestato base (a ruote, a cingoli o combinato) in scadenza",
      'Addetti agricoli e forestali già abilitati',
      'Operatori con parco macchine misto',
      'Datori di lavoro',
      "Nota bene: chi ha l'attestato scaduto da troppo tempo deve frequentare un corso base"
    ],

    cosaImparerai: [
      'Richiamare la normativa generale sulle attrezzature semoventi',
      "Aggiornare le proprie conoscenze sulle responsabilità dell'operatore",
      'Ripassare categorie, componenti strutturali, comandi e sicurezza',
      'Eseguire i controlli pre-utilizzo visivi e funzionali',
      'Pianificare correttamente le operazioni in campo',
      'Applicare le procedure di messa a riposo a fine utilizzo'
    ],

    faq: [
      {
        domanda: 'Ogni quanto va rinnovato?',
        risposta: "L'attestato richiede un aggiornamento periodico per restare in validità, con scadenza quinquennale di prassi."
      },
      {
        domanda: "Quanto dura l'aggiornamento?",
        risposta: "4 ore totali: 1 ora di modulo giuridico e 3 ore di modulo tecnico-normativo con richiami pratici."
      },
      {
        domanda: 'Vale per tutte le categorie di trattori?',
        risposta: "Sì, il corso di aggiornamento è generico e valido per tutti, indipendentemente dal corso base seguito (ruote, cingoli o combinato)."
      },
      {
        domanda: "L'attestato è scaduto da molto tempo, posso fare comunque l'aggiornamento?",
        risposta: "Se l'abilitazione è scaduta da troppo tempo, l'aggiornamento non è sufficiente ed è necessario rifare un corso base. Contattaci per una verifica della tua situazione."
      },
      {
        domanda: 'È organizzabile in azienda?',
        risposta: "Sì, è organizzabile direttamente in sede aziendale, utilizzando i trattori del cliente."
      }
    ],

    moduli: [
      {
        titolo: 'MODULO GIURIDICO',
        durataOreTeoria: 1,
        durataOrePratica: 0,
        argomenti: [
          'Richiamo dei riferimenti normativi (D.Lgs 81/2008, Accordo Stato Regioni)',
          "Responsabilità dell'operatore"
        ]
      },
      {
        titolo: 'MODULO TECNICO-NORMATIVO CON RICHIAMI PRATICI',
        durataOreTeoria: 3,
        durataOrePratica: 0,
        argomenti: [
          'Categorie e componenti dei trattori',
          'Dispositivi di comando e sicurezza',
          'Controlli pre-utilizzo',
          'Pianificazione delle operazioni in campo'
        ]
      }
    ],

    // Ruote/Cingoli/Combinato sono switch sulla STESSA pagina (non pagine separate), quindi qui va
    // linkato solo un corso realmente esterno alla famiglia.
    corsiCorrelati: [
      'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
    ]
  }
};
