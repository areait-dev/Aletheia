
// Contenuti editoriali per la variante "Aggiornamento" (6 ore) della famiglia formazione-dirigente.
// È la 2a voce raw in data/coursesRaw.js (livelloKey 'default'), quindi la chiave posizionale è
// 'livello-2' - vedi editorialLivelloKey in pages/all-courses/[slug].js e il commento in
// formazione-dirigente-content.js.

module.exports = {
  'livello-2': {
    titolo: 'Aggiornamento Formazione per Dirigenti',
    durataOre: 6,
    modalita: ['FAD'],
    validita: 'Da ripetere periodicamente ai sensi dell\'art. 37, comma 7, D.Lgs 81/2008 e dell\'Accordo Stato Regioni del 17/04/2025',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 100,

    descrizione: `Questo è il corso di aggiornamento per dirigenti, della durata di 6 ore, non il corso base: è rivolto a chi ha già completato la formazione iniziale di 12 ore e deve rinnovarla periodicamente, ai sensi dell'art. 2, comma 1, lettera d), e dell'art. 37, comma 7, del D.Lgs 81/2008, in relazione agli obblighi previsti dall'art. 18 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è obbligatorio perché il quadro normativo, le responsabilità del dirigente e gli strumenti di gestione della sicurezza aziendale evolvono nel tempo: chi ricopre un ruolo dirigenziale deve rimanere allineato ai cambiamenti legislativi per continuare a esercitare correttamente le proprie funzioni di organizzazione e vigilanza sui lavoratori.

Il corso, erogato in un modulo unico, richiama i temi principali della formazione iniziale in chiave aggiornata: cenni sul sistema legislativo in materia di sicurezza, soggetti del sistema di prevenzione aziendale, compiti, obblighi e responsabilità, responsabilità civile e penale, responsabilità amministrativa delle persone giuridiche (D.Lgs 231/2001), modelli di organizzazione e gestione della sicurezza, obblighi delle attività, PSC e DUVRI, ruolo del RSPP e degli addetti al servizio di prevenzione e protezione, valutazione dei rischi, dispositivi di protezione individuale e collettiva, sorveglianza sanitaria e comunicazione, formazione e informazione.

Il corso è pensato per chi ha già l'attestato di formazione dirigenti in scadenza. Chi invece non ha mai conseguito la formazione di base deve frequentare il corso completo di 12 ore, non l'aggiornamento.

Il corso si svolge interamente in FAD, la modalità prevista secondo il listino Alètheia.`,

    aChiERivolto: [
      'Dirigenti aziendali già formati (attestato di 12 ore) in scadenza',
      'Responsabili di funzione o reparto già abilitati',
      'Datori di lavoro che devono garantire il rinnovo formativo',
      'Nota bene: chi non ha mai conseguito l\'attestato da 12 ore deve frequentare prima il corso base'
    ],

    cosaImparerai: [
      'Aggiornare le conoscenze sul sistema legislativo e sui soggetti del sistema di prevenzione',
      'Richiamare compiti, obblighi e responsabilità civile, penale e amministrativa del dirigente',
      'Applicare i modelli di organizzazione e gestione (art. 30 D.Lgs 81/2008)',
      'Gestire obblighi delle attività, PSC e DUVRI',
      'Comprendere il ruolo del RSPP e degli addetti SPP',
      'Aggiornare le conoscenze su DPI/DPC e sorveglianza sanitaria',
      'Consolidare le competenze di comunicazione, informazione, formazione e addestramento'
    ],

    faq: [
      {
        domanda: 'Ogni quanto va rinnovata?',
        risposta: 'La formazione va aggiornata con periodicità costante secondo il D.Lgs 81/2008.'
      },
      {
        domanda: "Quanto dura l'aggiornamento?",
        risposta: '6 ore complessive, erogate in un modulo unico di richiamo tecnico-normativo.'
      },
      {
        domanda: 'Si può fare in aula?',
        risposta: 'No, secondo il listino Alètheia questo corso è disponibile solo in modalità FAD.'
      },
      {
        domanda: 'Posso farlo senza il corso base?',
        risposta: "No, l'aggiornamento è riservato a chi ha già l'attestato del corso base da 12 ore. Senza di esso serve il corso completo."
      },
      {
        domanda: 'Sono un dirigente in cantiere, questo aggiornamento basta?',
        risposta: "Il modulo aggiuntivo cantieri è un percorso a sé stante e distinto dall'aggiornamento generale."
      }
    ],

    moduli: [
      {
        titolo: 'MODULO UNICO - AGGIORNAMENTO TECNICO-NORMATIVO E GESTIONALE',
        durataOreTeoria: 6,
        durataOrePratica: 0,
        argomenti: [
          'Cenni sul sistema legislativo in materia di sicurezza',
          'Soggetti del sistema di prevenzione aziendale, compiti, obblighi e responsabilità',
          'Responsabilità civile, penale e amministrativa delle persone giuridiche (D.Lgs 231/2001)',
          'Modelli di organizzazione e gestione della sicurezza',
          'Obblighi delle attività, PSC e DUVRI',
          'Ruolo del RSPP e degli addetti al servizio di prevenzione e protezione',
          'Valutazione dei rischi, DPI e DPC, sorveglianza sanitaria',
          'Comunicazione, formazione e informazione'
        ]
      }
    ],

    // Il corso base (Modulo Comune) è uno switch sulla STESSA pagina, non una pagina separata: qui
    // vanno linkati solo corsi realmente esterni alla famiglia.
    corsiCorrelati: [
      'modulo-aggiuntivo-cantieri-per-datore-di-lavoro',
      'formazione-preposto',
      'rspp-datore-di-lavoro'
    ]
  }
};
