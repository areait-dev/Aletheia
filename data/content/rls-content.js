
// Contenuti editoriali per famiglia "RLS" - corso base di formazione (32 ore).
// Famiglia già raggruppata automaticamente da buildCourseFamilies in 3 livelli a variante unica:
// 'default' (corso, 32h) -> 'livello-1', 'meno-di-50-dipendenti' (aggiornamento, 4h) -> 'livello-2',
// 'piu-di-50-dipendenti' (aggiornamento, 8h) -> 'livello-3'. Il corso base è l'unico con tipo 'corso',
// quindi vive qui; i due aggiornamenti vivono in rls-aggiornamento-content.js - stesso pattern di
// data/content/primo-soccorso-content.js (livelli multipli, nessun nesting corso/aggiornamento).

module.exports = {
  rls: {
    'livello-1': {
      titolo: 'Corso di Formazione per Rappresentante dei Lavoratori per la Sicurezza (RLS)',
      durataOre: 32,
      modalita: ['Aula', 'FAD', 'Videoconferenza'],
      validita: 'Aggiornamento annuale obbligatorio: 4 ore per aziende con meno di 50 dipendenti, 8 ore per aziende con più di 50 dipendenti',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Corso di Formazione per Rappresentante dei Lavoratori per la Sicurezza (RLS), della durata di 32 ore, è obbligatorio ai sensi dell'art. 37, commi 10 e 11, e dell'art. 47 del D.Lgs 81/2008, che disciplinano la nomina, il ruolo e la formazione del rappresentante eletto o designato dai lavoratori per rappresentarli sui temi della salute e sicurezza sul lavoro.

L'RLS è la figura che i lavoratori eleggono o designano al proprio interno per essere rappresentati nelle questioni di sicurezza aziendale: consultato dal datore di lavoro sulla valutazione dei rischi, ha accesso al documento di valutazione dei rischi (DVR), può proporre misure di prevenzione e partecipa alle riunioni periodiche sulla sicurezza. Ogni azienda con lavoratori dipendenti deve garantire la possibilità di eleggere o designare un RLS, che deve obbligatoriamente essere formato per svolgere questo ruolo.

Il corso si articola in tre moduli: il Modulo A (16 ore) sul ruolo, i compiti e le caratteristiche dell'RLS, con approfondimento del quadro normativo, degli organismi di controllo e del sistema sanzionatorio; il Modulo B (8 ore) sulla definizione, individuazione e valutazione dei rischi, con analisi del ciclo produttivo e del sistema di gestione della sicurezza; il Modulo C (8 ore) sugli aspetti normativi legati alle misure di prevenzione e protezione e sulle tecniche di comunicazione applicate alla sicurezza sul lavoro.

Il corso è disponibile in aula, in FAD (formazione a distanza) e in videoconferenza, per adattarsi alle esigenze organizzative di aziende di ogni dimensione. È possibile organizzare la formazione anche direttamente in azienda per i lavoratori eletti o designati come RLS.`,

      aChiERivolto: [
        'Lavoratori eletti o designati dai propri colleghi come Rappresentante dei Lavoratori per la Sicurezza',
        'Lavoratori che intendono candidarsi al ruolo di RLS all\'interno della propria azienda',
        'Datori di lavoro che devono garantire la formazione del RLS eletto o designato in azienda',
        'RSU (Rappresentanze Sindacali Unitarie) che assumono anche il ruolo di RLS'
      ],

      cosaImparerai: [
        'Comprendere il ruolo, i compiti e le caratteristiche normative dell\'RLS ai sensi del D.Lgs 81/2008',
        'Riconoscere le misure di tutela, gli organismi di controllo e il sistema sanzionatorio in materia di sicurezza',
        'Analizzare il ciclo produttivo aziendale per individuare e valutare i rischi presenti',
        'Comprendere il sistema di gestione della sicurezza e la gestione di infortuni e incidenti',
        'Valutare le esigenze di sorveglianza sanitaria e le tutele per le categorie di lavoratori più deboli',
        'Riconoscere i rischi presenti in azienda e valutare l\'adeguatezza delle misure di prevenzione e protezione',
        'Applicare tecniche di comunicazione efficace nell\'ambito del sistema di sicurezza aziendale',
        'Interagire correttamente con datore di lavoro, RSPP, medico competente e lavoratori sui temi della sicurezza'
      ],

      faq: [
        {
          domanda: 'Chi elegge l\'RLS in azienda?',
          risposta: 'L\'RLS viene eletto direttamente dai lavoratori al proprio interno, oppure designato dalle rappresentanze sindacali, in base alla dimensione e all\'organizzazione dell\'azienda.'
        },
        {
          domanda: 'Quanto dura il corso RLS?',
          risposta: 'Il corso di formazione iniziale per RLS dura 32 ore, suddivise in tre moduli: 16 ore sul ruolo e i compiti dell\'RLS, 8 ore sulla valutazione dei rischi e 8 ore sugli aspetti normativi e la comunicazione.'
        },
        {
          domanda: 'Il corso RLS si può fare in FAD o videoconferenza?',
          risposta: 'Sì, il corso è disponibile in aula, in FAD e in videoconferenza, in base alle esigenze organizzative dell\'azienda.'
        },
        {
          domanda: 'L\'RLS deve fare un aggiornamento periodico?',
          risposta: 'Sì, l\'aggiornamento è annuale: 4 ore per le aziende con meno di 50 dipendenti, 8 ore per le aziende con più di 50 dipendenti.'
        },
        {
          domanda: 'Che differenza c\'è tra RLS e RLST?',
          risposta: 'L\'RLS opera all\'interno di una singola azienda; l\'RLST (Rappresentante dei Lavoratori per la Sicurezza Territoriale) rappresenta più aziende in un ambito territoriale o di comparto, tipicamente per le piccole imprese prive di RLS aziendale.'
        }
      ],

      moduli: [
        { titolo: 'MODULO A - RUOLO E COMPITI DELL\'RLS', durataOre: 16, argomenti: ['Quadro normativo di riferimento', 'Ruolo, compiti e caratteristiche dell\'RLS', 'Organismi di controllo', 'Sistema sanzionatorio'] },
        { titolo: 'MODULO B - VALUTAZIONE DEI RISCHI', durataOre: 8, argomenti: ['Definizione e individuazione dei rischi', 'Analisi del ciclo produttivo', 'Sistema di gestione della sicurezza'] },
        { titolo: 'MODULO C - NORMATIVA E COMUNICAZIONE', durataOre: 8, argomenti: ['Misure di prevenzione e protezione', 'Tecniche di comunicazione applicate alla sicurezza sul lavoro'] }
      ],

      corsiCorrelati: [
        'rls-livello-2',
        'rls-livello-3',
        'rspp-datore-di-lavoro',
        'formazione-dei-lavoratori'
      ]
    }
  }
};
