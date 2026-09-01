
// Contenuti editoriali per famiglia "Addetti Caricatori Movimentazione di Materiali (CMM)" (ex pagina
// isolata pages/all-courses/addetti-caricatori-movimentazione-di-materiali-cmm.js). Solo la variante
// "corso" (8 ore) ha contenuto editoriale completo: la variante "aggiornamento" (4 ore) nella pagina
// isolata originale non aveva descrizione/FAQ/moduli propri (solo scheda tecnica + placeholder
// "Dettaglio moduli in aggiornamento"), quindi NON viene registrata in EDITORIAL_CONTENT - il template
// [slug].js mostrerà il placeholder standard per quella combinazione livello/tipo, stesso pattern già
// usato per 'dpi-3-categoria' (solo aggiornamento) e 'addetti-macchina-raccogli-frutta-crf' (solo corso).

module.exports = {
  'addetti-caricatori-movimentazione-di-materiali-cmm': {
    'livello-1': {
      titolo: 'Corso Addetti Caricatori Movimentazione di Materiali (CMM)',
      durataOre: 8,
      modalita: ['Aula'],
      validita: 'Aggiornamento disponibile (4 ore, pagina dedicata)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 270,

      descrizione: `Il corso di Formazione Teorico-Pratico per Lavoratori Addetti alla Conduzione di Caricatori per la Movimentazione di Materiali (CMM), della durata di 8 ore, forma gli operatori sulle caratteristiche tecniche dei caricatori, sui loro dispositivi di sollevamento e sui principali rischi connessi al loro impiego.

Il percorso copre la terminologia e le tipologie di caricatori, le nozioni elementari di fisica per stimare la massa di un carico e le condizioni di equilibrio, i componenti principali (organi di presa, meccanismo di rotazione, stazione di comando) e i dispositivi di comando e di sicurezza, oltre alle condizioni di stabilità e all'utilizzo di diagrammi e tabelle di carico.

Il corso si articola in un Modulo I teorico-tecnico (4 ore), su rischi, componenti e dispositivi di sicurezza, e un Modulo II pratico (4 ore), con esercitazioni di posizionamento, manovre di sollevamento, movimentazione di carichi comuni e speciali, prove di comunicazione con segnali gestuali e via radio, ed esercitazioni sull'uso sicuro, la manutenzione e le situazioni di emergenza.`,

      aChiERivolto: [
        'Lavoratori addetti alla conduzione di caricatori per la movimentazione di materiali (CMM)',
        'Operatori che devono conseguire l\'abilitazione per l\'utilizzo di caricatori in sicurezza',
        'Datori di lavoro che devono garantire la formazione dei propri addetti alla conduzione di CMM'
      ],

      cosaImparerai: [
        'Riconoscere le diverse tipologie di caricatori e i relativi dispositivi di sollevamento',
        'Identificare i principali rischi connessi all\'impiego di caricatori (ribaltamento, urti, investimento)',
        'Valutare la massa di un carico e le condizioni di equilibrio statico e dinamico',
        'Identificare i dispositivi di comando e di sicurezza e la loro funzione',
        'Eseguire ispezioni e controlli pre-operativi sul caricatore',
        'Pianificare e svolgere in sicurezza le operazioni di sollevamento e movimentazione dei carichi',
        'Comunicare correttamente tramite segnaletica gestuale e via radio',
        'Applicare le procedure di emergenza e i controlli di manutenzione periodica'
      ],

      faq: [
        { domanda: 'Chi deve seguire il corso per addetti caricatori CMM?', risposta: 'Il corso è rivolto ai lavoratori addetti alla conduzione di caricatori per la movimentazione di materiali, per operare in sicurezza ed essere formati sui rischi specifici di questa attrezzatura.' },
        { domanda: 'Quanto dura il corso e come si articola?', risposta: 'Il corso dura 8 ore complessive, suddivise in un Modulo I teorico-tecnico (4 ore) e un Modulo II pratico (4 ore) con esercitazioni operative su caricatore.' },
        { domanda: 'È previsto un aggiornamento periodico?', risposta: 'Sì, è disponibile un corso di aggiornamento dedicato di 4 ore.' }
      ],

      moduli: [
        { titolo: 'MODULO I - TEORICO-TECNICO', durataOre: 4, argomenti: ['Terminologia, tipologie di caricatori e dispositivi di sollevamento', 'Principali rischi: caduta del carico, ribaltamento, urti, investimento', 'Nozioni elementari di fisica: massa del carico e condizioni di equilibrio', 'Componenti principali: organi di presa, meccanismo di rotazione, stazione di comando', 'Dispositivi di comando e di sicurezza e relativo funzionamento', 'Condizioni di stabilità del caricatore', 'Documentazione, targhe segnaletiche, diagrammi e tabelle di carico', 'Segnaletica gestuale'] },
        { titolo: 'MODULO II - PRATICO', durataOre: 4, argomenti: ['Funzionamento dei comandi per spostamento, posizionamento e operatività', 'Test dei dispositivi di segnalazione e di sicurezza e ispezione del caricatore', 'Pianificazione ed esercitazioni dell\'operazione di sollevamento', 'Posizionamento e messa a punto del caricatore per il sollevamento', 'Manovre del caricatore con e senza carico, singole e combinate', 'Movimentazione di carichi comuni, di forma particolare e con accessori speciali', 'Manovre di precisione, imbracatura dei carichi e comunicazione via segnali/radio', 'Uso sicuro, manutenzione e gestione delle situazioni di emergenza'] }
      ],

      corsiCorrelati: [
        'carrelli-elevatori-semoventi-conduttore-a-bordo',
        'macchine-movimento-terra'
      ]
    }
  }
};
