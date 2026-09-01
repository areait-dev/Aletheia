
// Contenuti editoriali per famiglia "Addetti alla Conduzione di Carriponte" (ex pagina isolata
// pages/all-courses/addetti-alla-conduzione-di-carriponte.js). Famiglia a variante unica (livelloKey
// 'default'): un solo livello posizionale 'livello-1' condiviso da corso e aggiornamento.

module.exports = {
  'addetti-alla-conduzione-di-carriponte': {
    'livello-1': {
      titolo: 'Corso Addetti alla Conduzione di Carriponte',
      durataOre: 10,
      modalita: ['Aula', 'Videoconferenza (solo parte teorica)'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      // NOTA: la pagina isolata originale non mostrava un prezzo fisso per questa variante (nessun
      // CoursePricingSidebar priceRows/prezzo in CONTENUTO.base) - lasciato a null, prezzo su richiesta.
      prezzo: null,

      descrizione: `Il Corso Addetti alla Conduzione di Carriponte/Gru a Cavalletto con Comando Pensile/Radiocomando, della durata di 10 ore, è obbligatorio ai sensi dell'art. 73 comma 5 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il carroponte è la macchina destinata al sollevamento e allo spostamento di materiali e merci con movimenti ristretti e confinati, tipica degli ambienti industriali. Non va confuso con la gru a portale, che scorre su binari a terra sostenuta da quattro bracci: due macchine diverse, due percorsi formativi diversi.

Il corso si articola in un modulo teorico-tecnico (4 ore), su terminologia, componenti, dispositivi di comando e sicurezza, rischi connessi e segnaletica gestuale e acustica; e in una parte pratica su pensile/radiocomando (6 ore), con controlli pre-utilizzo, manovre a vuoto e con carico e imbracatura dei carichi.`,

      aChiERivolto: [
        'Lavoratori che utilizzano carriponte e gru a cavalletto con comando pensile o radiocomando',
        'Operatori addetti al sollevamento e alla movimentazione di materiali in ambito industriale e produttivo',
        'Neoassunti privi di abilitazione',
        'Datori di lavoro che ricoprono personalmente il ruolo di operatore carroponte'
      ],

      cosaImparerai: [
        'Riconoscere terminologia, tipologie e componenti principali di carroponti e gru a cavalletto',
        'Identificare e utilizzare correttamente i dispositivi di comando (pensile, radiocomando, cabina) e di sicurezza',
        'Riconoscere i rischi connessi: oscillazione del carico, ribaltamento, urti, interferenze, uso improprio',
        'Interpretare targhette, tabelle tecniche e segnaletica gestuale e acustica',
        'Eseguire i controlli pre-utilizzo visivi e funzionali',
        'Eseguire manovre a vuoto e con carico e la corretta imbracatura dei carichi'
      ],

      faq: [
        { domanda: 'Qual è la differenza tra carroponte e gru a portale?', risposta: 'Sono due macchine distinte con percorsi formativi diversi. Il carroponte scorre su binari posizionati in quota, all\'interno di capannoni industriali, ed è comandato con pensile o radiocomando. La gru a portale scorre invece su binari a terra, sostenuta da quattro bracci.' },
        { domanda: 'Quanto dura il corso carroponte?', risposta: 'Il corso dura 10 ore complessive: 4 ore di modulo teorico-tecnico e 6 ore di parte pratica su pensile/radiocomando.' },
        { domanda: 'Ogni quanto va rinnovato il corso?', risposta: 'L\'aggiornamento è obbligatorio ogni 5 anni, della durata di 4 ore.' },
        { domanda: 'L\'attestato è valido in tutta Italia?', risposta: 'Sì, l\'attestato rilasciato al termine del corso è valido su tutto il territorio nazionale, in conformità con l\'Accordo Stato Regioni e il D.Lgs. 81/2008.' }
      ],

      moduli: [
        { titolo: 'MODULO TEORICO-TECNICO', durataOre: 4, argomenti: ['Terminologia, tipologie di carroponti e gru a cavalletto, movimenti e dispositivi di sollevamento', 'Nozioni di fisica per stimare la massa di un carico e le condizioni di equilibrio', 'Componenti principali: struttura metallica, meccanismi di traslazione e sollevamento, carrello, bozzello, gancio', 'Dispositivi di comando e sicurezza: pensile, radiocomando, cabina, anticollisione, limitatori, indicatori', 'Rischi connessi: oscillazione del carico, ribaltamento, urti, interferenze, uso improprio', 'DPI da utilizzare', 'Segnaletica gestuale e acustica; contenuti delle targhette e tabelle tecniche', 'Imbracatura dei carichi; controlli ordinari e straordinari, registro di controllo'] },
        { titolo: 'PARTE PRATICA - PENSILE/RADIOCOMANDO', durataOre: 6, argomenti: ['Identificazione dei componenti strutturali', 'Comandi pensile/radiocomando: prove e differenze', 'Verifica dei dispositivi di segnalazione e sicurezza', 'Controlli pre-utilizzo visivi e funzionali', 'Manovre a vuoto e con carico', 'Valutazione del carico e tecniche di sollevamento', 'Comandi da terra: sicurezza e corretto uso', 'Imbracatura dei carichi'] }
      ],

      corsiCorrelati: [
        'carrelli-elevatori-semoventi-conduttore-a-bordo',
        'operatore-di-gru-per-autocarro',
        'ple-piattaforme-di-lavoro-mobili-elevabili',
        'formazione-dei-lavoratori-rischio-medio'
      ]
    }
  }
};
