
// Contenuti editoriali per famiglia "Lavoratori Addetti all'attività di Apposizione Integrazione e
// Rimozione della Segnaletica Stradale" (ex pagina isolata pages/all-courses/
// lavoratori-addetti-all-attivita-di-apposizione-integrazione-e-rimozione-della-segnaletica-stradale.js).
// Nessun aggiornamento raw corrispondente in data/coursesRaw.js: famiglia a variante unica (solo tipo
// 'corso'), un solo livello posizionale 'livello-1'. family.id = slugify(titolo raw completo), che
// combacia esattamente con il nome del file pagina originale (qui abbreviato per leggibilità).

module.exports = {
  'lavoratori-addetti-all-attivita-di-apposizione-integrazione-e-rimozione-della-segnaletica-stradale': {
    'livello-1': {
      titolo: 'Corso Lavoratori Addetti all\'Attività di Apposizione, Integrazione e Rimozione della Segnaletica Stradale',
      durataOre: 14,
      modalita: ['Aula'],
      validita: 'Aggiornamento periodico previsto dalla normativa',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 150,

      descrizione: `Il Corso di Formazione per Preposti ai Lavori su Strada - Posizionamento della Segnaletica Stradale in Presenza di Traffico Veicolare, della durata di 14 ore, è rivolto ai preposti che coordinano l'esecuzione di lavori su strada, ai sensi del D.Lgs. 81/2008 s.m.i., del D.Lgs. 295 del 30/04/1992, del D.P.R. 495 del 16/12/1992 e del D.M. 22/01/2019 (Allegati I e II).

Il corso fornisce le competenze giuridico-normative sul Codice della Strada e sulla legislazione di sicurezza nei cantieri temporanei e mobili in presenza di traffico, e quelle tecniche sugli schemi segnaletici differenziati per categoria di strada, sui dispositivi di protezione individuale (indumenti ad alta visibilità) e sull'organizzazione del lavoro in squadra.

Il percorso si articola in un modulo giuridico-normativo (3 ore), un modulo tecnico (5 ore), una prova di verifica intermedia a risposta multipla (1 ora, da svolgere prima del modulo pratico), un modulo pratico (4 ore) con simulazioni di installazione e rimozione della segnaletica su diverse categorie di strada, e una prova di verifica finale pratica (1 ora).`,

      aChiERivolto: [
        'Lavoratori designati come preposti ai lavori su strada in presenza di traffico veicolare',
        'Addetti all\'apposizione, integrazione e rimozione della segnaletica stradale nei cantieri temporanei e mobili',
        'Datori di lavoro che devono garantire la formazione dei propri preposti ai sensi del D.M. 22/01/2019'
      ],

      cosaImparerai: [
        'Conoscere gli articoli del Codice della Strada relativi a opere, depositi e apertura di cantieri stradali',
        'Analizzare i rischi per i lavoratori e per gli utenti della strada in presenza di traffico',
        'Applicare gli schemi segnaletici differenziati per categoria di strada (A, B, C, D, E, F)',
        'Utilizzare correttamente i dispositivi di protezione individuale ad alta visibilità',
        'Organizzare il lavoro in squadra e gestire la comunicazione tra gli operatori',
        'Installare e rimuovere in sicurezza la segnaletica per cantieri fissi e cantieri mobili',
        'Gestire interventi in sicurezza in situazioni di emergenza',
        'Superare la prova di verifica intermedia e la prova pratica finale'
      ],

      faq: [
        { domanda: 'Chi deve seguire questo corso sulla segnaletica stradale?', risposta: 'Il corso è rivolto ai preposti ai lavori su strada e agli addetti all\'apposizione, integrazione e rimozione della segnaletica stradale nei cantieri in presenza di traffico veicolare, ai sensi del D.M. 22/01/2019.' },
        { domanda: 'Quanto dura il corso e come si articola?', risposta: 'Il corso dura 14 ore complessive: modulo giuridico-normativo (3 ore), modulo tecnico (5 ore), prova di verifica intermedia (1 ora), modulo pratico (4 ore) e prova di verifica finale pratica (1 ora).' },
        { domanda: 'Sono previste prove di verifica durante il corso?', risposta: 'Sì, il programma prevede una prova intermedia a questionario a risposta multipla prima del modulo pratico e una prova pratica di verifica finale.' }
      ],

      moduli: [
        { titolo: 'MODULO I - GIURIDICO NORMATIVO', durataOre: 3, argomenti: ['Articoli del Codice della Strada e del regolamento di attuazione su esecuzione di opere, depositi e apertura di cantieri', 'Legislazione generale di sicurezza nei cantieri temporanei e mobili in presenza di traffico', 'Analisi dei rischi per i lavoratori in presenza di traffico e per gli utenti della strada', 'Statistiche degli infortuni e delle violazioni delle norme nei cantieri stradali'] },
        { titolo: 'MODULO II - TECNICO', durataOre: 5, argomenti: ['Disciplinare tecnico sugli schemi segnaletici differenziati per categoria di strada', 'Dispositivi di protezione individuale: indumenti ad alta visibilità', 'Organizzazione del lavoro in squadra, compiti degli operatori e modalità di comunicazione', 'Norme operative e comportamentali per interventi programmati e di emergenza (Allegato I D.M. 22/01/2019)'] },
        { titolo: 'PROVA INTERMEDIA - QUESTIONARIO A RISPOSTA MULTIPLA', durataOre: 1, argomenti: ['Prova di verifica intermedia, da effettuarsi prima del modulo pratico'] },
        { titolo: 'MODULO III - PRATICO', durataOre: 4, argomenti: ['Tecniche di installazione e rimozione della segnaletica su strade di tipo A, B, D (autostrade, extraurbane principali, urbane di scorrimento)', 'Tecniche su strade di tipo C, F (extraurbane secondarie e locali extraurbane)', 'Tecniche su strade di tipo E, F (urbane di quartiere e locali urbane)', 'Tecniche di intervento mediante "cantieri mobili"', 'Tecniche di intervento in sicurezza per situazioni di emergenza'] },
        { titolo: 'PROVA DI VERIFICA FINALE - PROVA PRATICA', durataOre: 1, argomenti: ['Prova pratica di verifica finale'] }
      ],

      corsiCorrelati: [
        'coordinatori-cantieri-cse-csp',
        'lavori-in-quota',
        'formazione-dei-lavoratori-rischio-medio'
      ]
    }
  }
};
