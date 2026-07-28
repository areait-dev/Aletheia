
// Contenuti editoriali per la variante "Aggiornamento" (6 ore) della famiglia formazione-dei-lavoratori.
// È la 5a voce raw in data/coursesRaw.js (livelloKey 'default'), quindi la chiave posizionale è
// 'livello-5' - vedi editorialLivelloKey in pages/all-courses/[slug].js e il commento in
// formazione-lavoratori-content.js.

module.exports = {
  'livello-5': {
    titolo: 'Aggiornamento Formazione Generale e Specifica dei Lavoratori',
    durataOre: 6,
    modalita: ['Aula', 'FAD'],
    validita: 'Da ripetere ogni 5 anni',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 80,

    descrizione: `Questo è il corso di aggiornamento della formazione dei lavoratori, non il corso base: è rivolto a chi ha già frequentato la formazione generale e specifica e deve rinnovarla prima della scadenza, ai sensi dell'art. 37 del D.Lgs 81/2008 e degli Accordi Stato Regioni del 17 aprile 2025.

Il corso è generico e valido per lavoratori di qualsiasi settore e livello di rischio, indipendentemente dal percorso formativo di base seguito (rischio basso, rischio medio o rischio alto). L'aggiornamento periodico è obbligatorio perché normative, organizzazione aziendale della sicurezza e rischi presenti sui luoghi di lavoro evolvono nel tempo: la formazione ricevuta all'assunzione, per quanto completa, va richiamata e attualizzata periodicamente. Chi lascia scadere l'attestato senza rinnovarlo espone sé stesso e il datore di lavoro a responsabilità dirette in caso di controllo o di infortunio.

Il corso, della durata di 6 ore interamente teoriche, riprende in chiave aggiornata il quadro giuridico-normativo del D.Lgs 81/08, l'organizzazione della sicurezza in azienda, le fonti di rischio e le misure di prevenzione attuabili: rischi legati a macchine e attrezzature, etichettatura e marchi di conformità, rischi fisici, microclima e illuminazione, videoterminale, stress lavoro-correlato, segnaletica di sicurezza, gestione delle emergenze e procedure organizzative di primo soccorso.

Il corso è pensato per chi ha già l'attestato di formazione generale e specifica in scadenza. Chi invece non ha mai conseguito la formazione di base, o ha un attestato scaduto da troppo tempo, deve frequentare il corso completo di formazione generale e specifica, non l'aggiornamento.

Il corso è disponibile in aula presso la sede Alètheia di Vittoria (RG) o in FAD; è possibile organizzarlo anche direttamente in azienda per gruppi numerosi di lavoratori.`,

    aChiERivolto: [
      'Lavoratori di qualsiasi settore con attestato base in scadenza',
      'Lavoratori formati su rischio basso, medio o alto',
      'Datori di lavoro',
      'Nota bene: chi non ha l\'attestato base o lo ha scaduto da troppo tempo deve fare un corso completo'
    ],

    cosaImparerai: [
      'Richiamare il quadro giuridico e le responsabilità in materia di sicurezza',
      'Aggiornare le conoscenze sulle fonti di rischio rilevanti e le misure di prevenzione',
      'Riconoscere rischi legati a macchine, attrezzature ed etichettatura',
      'Aggiornare le conoscenze su rischi fisici, microclima, illuminazione e videoterminale',
      'Gestire lo stress lavoro-correlato',
      'Applicare le procedure di esodo e di emergenza incendio',
      'Applicare le procedure di primo soccorso'
    ],

    faq: [
      { domanda: 'Ogni quanto va rinnovata?', risposta: 'Va ripetuta periodicamente a intervalli costanti previsti dalla normativa (quinquennale di prassi).' },
      { domanda: 'Quanto dura?', risposta: '6 ore interamente teoriche, in aula o in FAD.' },
      { domanda: 'Vale per tutti i livelli di rischio?', risposta: 'Sì, è generico e valido per tutti indipendentemente dal corso base seguito.' },
      { domanda: 'Posso farlo senza il corso base?', risposta: 'No, serve l\'attestato base: senza di esso va frequentato il percorso completo di formazione generale e specifica.' },
      { domanda: 'Si può fare in videoconferenza?', risposta: 'No, per questo corso le modalità disponibili sono solo aula o FAD.' }
    ],

    moduli: [
      {
        titolo: 'MODULO UNICO - AGGIORNAMENTO TEORICO',
        durataOreTeoria: 6,
        durataOrePratica: 0,
        argomenti: [
          'Quadro giuridico-normativo del D.Lgs 81/08',
          'Evoluzione delle fonti di rischio e misure di prevenzione',
          'Rischi legati a macchine e attrezzature, etichettatura e marchi di conformità',
          'Rischi fisici, microclima, illuminazione e videoterminale',
          'Stress lavoro-correlato',
          'Segnaletica di sicurezza e gestione delle emergenze',
          'Procedure organizzative di primo soccorso'
        ]
      }
    ],

    // Generale/Basso/Medio/Alto sono switch sulla STESSA pagina (non pagine separate): qui va
    // linkato solo un corso realmente esterno alla famiglia.
    corsiCorrelati: ['rls']
  }
};
