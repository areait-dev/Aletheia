
// Contenuti editoriali per famiglia "PIMUS / Ponteggi" - variante AGGIORNAMENTO (4 ore).
// Stessa livelloKey 'default' del corso base, quindi chiave interna 'livello-1' - stesso pattern di
// data/content/lavori-in-quota-aggiornamento-content.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Addetti/Preposti al Montaggio, Smontaggio e Trasformazione di Ponteggi (PIMUS)',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Da ripetere ogni 4 anni ai sensi dell\'allegato XXI del D.Lgs 81/2008',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 140,

    descrizione: `Questo è il corso di aggiornamento per lavoratori e preposti addetti al montaggio, smontaggio e trasformazione di ponteggi, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato PIMUS di 28 ore e deve rinnovarlo prima della scadenza, ai sensi dell'art. 136 e dell'allegato XXI del D.Lgs 81/2008.

L'aggiornamento periodico è obbligatorio perché le tecniche di montaggio, le normative di riferimento e le caratteristiche dei dispositivi anticaduta evolvono nel tempo: chi monta, smonta o trasforma ponteggi deve rimanere aggiornato sulle procedure di sicurezza più recenti per continuare a operare correttamente, riducendo il rischio di infortuni gravi legati a errori di montaggio o utilizzo scorretto dei dispositivi di protezione.

A differenza del corso base, che dedica ampio spazio alla formazione teorica e a tutte e tre le tipologie di ponteggio in modo approfondito, l'aggiornamento è più snello: un modulo giuridico-tecnico di richiamo (1 ora) su normativa, DPI anticaduta, ancoraggi e verifiche di sicurezza, e un modulo pratico (3 ore) di consolidamento delle tecniche di montaggio, smontaggio e trasformazione di ponteggio a tubi e giunti (PTG), a telai prefabbricati (PTP) e a montanti e traversi prefabbricati (PMTP).

Il corso è pensato per chi ha già l'attestato PIMUS in scadenza o scaduto da poco. Chi invece ha un'abilitazione scaduta da troppo tempo, o non l'ha mai conseguita, deve necessariamente frequentare il corso base completo di 28 ore, non l'aggiornamento.

Il corso si svolge in aula e in area pratica presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda o in cantiere.`,

    aChiERivolto: [
      'Lavoratori addetti ai ponteggi già formati (28 ore) con abilitazione in scadenza',
      'Preposti che coordinano squadre di montaggio',
      'Imprese edili che devono adempiere al rinnovo del personale',
      'Nota bene: chi ha l\'attestato scaduto da troppo tempo deve rifare il corso base'
    ],

    cosaImparerai: [
      'Richiamare la normativa in materia di prevenzione infortuni',
      'Aggiornare le conoscenze su DPI anticaduta, ancoraggi e verifiche',
      'Consolidare le tecniche di montaggio/smontaggio su ponteggi a tubi e giunti (PTG)',
      'Consolidare le tecniche su ponteggi a telai prefabbricati (PTP) e montanti/traversi prefabbricati (PMTP)'
    ],

    faq: [
      {
        domanda: 'Ogni quanto va rinnovato l\'attestato PIMUS?',
        risposta: 'L\'attestato va aggiornato periodicamente ogni 4 anni per mantenere la validità di legge.'
      },
      {
        domanda: 'Quanto dura l\'aggiornamento?',
        risposta: '4 ore complessive: 1 ora di richiamo teorico-normativo e 3 ore di addestramento pratico guidato.'
      },
      {
        domanda: 'Copre tutte le tipologie di ponteggio?',
        risposta: 'Sì, il modulo pratico consolida le competenze su PTG (tubi e giunti), PTP (telai prefabbricati) e PMTP (montanti e traversi).'
      },
      {
        domanda: 'Cosa succede se l\'attestato PIMUS è scaduto da tempo?',
        risposta: 'L\'aggiornamento da solo potrebbe non essere sufficiente ed è richiesto il re-inserimento nel corso base da 28 ore. Contattaci per una verifica.'
      },
      {
        domanda: 'È organizzabile per l\'intera squadra?',
        risposta: 'Sì, organizziamo il corso in azienda o in cantiere ottimizzando i tempi operativi delle squadre di montaggio.'
      }
    ],

    moduli: [
      {
        titolo: 'MODULO UNICO - RICHIAMO GIURIDICO-TECNICO E ADDESTRAMENTO PRATICO',
        durataOreTeoria: 1,
        durataOrePratica: 3,
        argomenti: [
          'Richiamo normativo (art. 136 e allegato XXI D.Lgs 81/2008)',
          'DPI anticaduta e ancoraggi',
          'Verifiche di sicurezza',
          'Addestramento pratico di montaggio/smontaggio su strutture PTG, PTP e PMTP'
        ]
      }
    ],

    // Il corso base è uno switch sulla STESSA pagina (non una pagina separata): qui vanno linkati
    // solo corsi realmente esterni alla famiglia.
    corsiCorrelati: [
      'lavori-in-quota',
      'coordinatori-cantieri-cse-csp',
      'antincendio-livello-2'
    ]
  }
};
