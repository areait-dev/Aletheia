
// Contenuti editoriali per famiglia "RLS" - varianti AGGIORNAMENTO annuale:
// - Meno di 50 dipendenti (4 ore) -> 'livello-2'
// - Più di 50 dipendenti (8 ore)  -> 'livello-3'
// Chiavi posizionali (stesso ordine delle voci raw in data/coursesRaw.js) - vedi il commento in
// rls-content.js e editorialLivelloKey in pages/all-courses/[slug].js.

module.exports = {
  'livello-2': {
    titolo: 'Aggiornamento RLS – Aziende con Meno di 50 Dipendenti',
    durataOre: 4,
    modalita: ['Aula', 'FAD', 'Videoconferenza'],
    validita: 'Da ripetere ogni anno, ai sensi dell\'art. 37, commi 10 e 11, e dell\'art. 47 del D.Lgs 81/2008',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 60,

    descrizione: `Questo è il corso di aggiornamento annuale per l'RLS (Rappresentante dei Lavoratori per la Sicurezza) di aziende con meno di 50 dipendenti, della durata di 4 ore, non il corso di formazione iniziale: è rivolto a chi ha già conseguito l'attestato RLS di 32 ore e deve rinnovare la propria formazione ogni anno, ai sensi dell'art. 37, commi 10 e 11, e dell'art. 47 del D.Lgs 81/2008.

A differenza della maggior parte dei corsi di aggiornamento in materia di sicurezza, che seguono un ciclo quinquennale, l'aggiornamento RLS è annuale: la normativa richiede che il rappresentante dei lavoratori rimanga costantemente allineato ai cambiamenti normativi e alle nuove metodologie di gestione del rischio, dato il ruolo attivo e continuativo che svolge nel dialogo con il datore di lavoro sui temi della sicurezza. Il monte ore dell'aggiornamento varia in base alla dimensione dell'azienda: 4 ore per le aziende con meno di 50 dipendenti, come in questo corso, e 8 ore per le aziende con più di 50 dipendenti, per le quali è disponibile un percorso di aggiornamento dedicato.

Il programma 2025 di questo aggiornamento è particolarmente ricco di novità: affronta la valutazione dell'apprendimento a conclusione del percorso formativo secondo l'Accordo Stato Regioni del 17 aprile 2025, le novità introdotte dal D.L. 31 ottobre 2025 n. 159, l'evoluzione della patente a punti nel settore edile, la gestione dei near miss (classificazione, segnalazione, piano d'azione e registrazione), approfondimenti sul rischio elettrico e meccanico, e il registro dei controlli antincendio.

Il corso è disponibile in aula, in FAD e in videoconferenza; è possibile organizzarlo anche direttamente in azienda.`,

    aChiERivolto: [
      'RLS già formati (attestato di 32 ore) che operano in aziende con meno di 50 dipendenti',
      'Lavoratori eletti o designati come RLS che devono rinnovare annualmente la propria formazione',
      'Datori di lavoro che devono garantire l\'aggiornamento annuale dell\'RLS aziendale',
      'Attenzione: chi non ha mai conseguito l\'attestato RLS di 32 ore deve prima frequentare il corso di formazione iniziale, non l\'aggiornamento'
    ],

    cosaImparerai: [
      'Comprendere le modalità di valutazione dell\'apprendimento previste dall\'Accordo Stato Regioni del 17 aprile 2025',
      'Aggiornarsi sulle novità normative introdotte dal D.L. 31 ottobre 2025, n. 159',
      'Comprendere l\'evoluzione della patente a punti nel settore edile',
      'Gestire correttamente i near miss: classificazione, segnalazione, piano d\'azione e registrazione',
      'Approfondire la valutazione del rischio elettrico e del rischio meccanico',
      'Gestire correttamente il registro dei controlli antincendio in azienda'
    ],

    faq: [
      {
        domanda: 'Perché l\'aggiornamento RLS è annuale e non quinquennale come altri corsi?',
        risposta: 'La normativa prevede un aggiornamento annuale per l\'RLS, a differenza di molti altri corsi sulla sicurezza che seguono un ciclo quinquennale, per garantire che il rappresentante dei lavoratori rimanga costantemente aggiornato dato il suo ruolo attivo e continuativo.'
      },
      {
        domanda: 'Quanto dura l\'aggiornamento RLS per le aziende con meno di 50 dipendenti?',
        risposta: 'L\'aggiornamento dura 4 ore all\'anno; per le aziende con più di 50 dipendenti il monte ore annuale sale a 8 ore.'
      },
      {
        domanda: 'Cosa cambia nel programma 2025 di questo aggiornamento?',
        risposta: 'Il programma 2025 include le novità del D.L. 31 ottobre 2025 n. 159, l\'evoluzione della patente a punti in edilizia, la gestione dei near miss e approfondimenti su rischio elettrico, meccanico e controlli antincendio.'
      },
      {
        domanda: 'Posso fare l\'aggiornamento se non ho mai fatto il corso RLS di 32 ore?',
        risposta: 'No, l\'aggiornamento è riservato a chi ha già conseguito l\'attestato RLS iniziale. Senza formazione di base è necessario frequentare il corso completo di 32 ore.'
      },
      {
        domanda: 'Il corso si può fare in FAD o videoconferenza?',
        risposta: 'Sì, l\'aggiornamento è disponibile in aula, in FAD e in videoconferenza, in base alle esigenze organizzative dell\'azienda.'
      }
    ],

    moduli: [
      {
        titolo: 'MODULO UNICO - AGGIORNAMENTO ANNUALE (PROGRAMMA 2025)',
        durataOreTeoria: 4,
        durataOrePratica: 0,
        argomenti: [
          'Valutazione dell\'apprendimento (Accordo Stato Regioni 17/04/2025)',
          'Novità introdotte dal D.L. 31 ottobre 2025, n. 159',
          'Evoluzione della patente a punti nel settore edile',
          'Gestione dei near miss: classificazione, segnalazione, piano d\'azione e registrazione',
          'Rischio elettrico e rischio meccanico',
          'Registro dei controlli antincendio'
        ]
      }
    ],

    corsiCorrelati: [
      'rls',
      'rls-livello-3',
      'rspp-datore-di-lavoro',
      'formazione-dei-lavoratori'
    ]
  },

  'livello-3': {
    titolo: 'Aggiornamento RLS – Aziende con Più di 50 Dipendenti',
    durataOre: 8,
    modalita: ['Aula', 'FAD', 'Videoconferenza'],
    validita: 'Da ripetere ogni anno, ai sensi dell\'art. 37, commi 10 e 11, e dell\'art. 47 del D.Lgs 81/2008',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 90,

    descrizione: `Questo è il corso di aggiornamento annuale per l'RLS (Rappresentante dei Lavoratori per la Sicurezza) di aziende con più di 50 dipendenti, della durata di 8 ore, non il corso di formazione iniziale: è rivolto a chi ha già conseguito l'attestato RLS di 32 ore e deve rinnovare la propria formazione ogni anno, ai sensi dell'art. 37, commi 10 e 11, e dell'art. 47 del D.Lgs 81/2008.

Rispetto all'aggiornamento previsto per le aziende con meno di 50 dipendenti, che dura 4 ore, la normativa richiede un monte ore doppio per le realtà aziendali più grandi: la maggiore complessità organizzativa e il numero più alto di lavoratori rappresentati richiedono all'RLS competenze più approfondite di dialogo, comunicazione e gestione dei processi di sicurezza aziendale.

Il corso affronta le novità introdotte dai principi giuridici comunitari e nazionali in materia di salute e sicurezza sul lavoro, un approfondimento degli obblighi dei principali soggetti coinvolti nel sistema di prevenzione, le modalità per la definizione e l'individuazione dei fattori di rischio, il ruolo dell'RLS nella valutazione dei rischi e nella consultazione sul Documento di Valutazione dei Rischi (DVR), la partecipazione attiva alla riunione periodica sulla sicurezza, e competenze di comunicazione e gestione delle relazioni aziendali, incluse tecniche di gestione dei conflitti nell'ambito del confronto tra RLS, datore di lavoro e lavoratori.

Il corso è disponibile in aula, in FAD e in videoconferenza; è possibile organizzarlo anche direttamente in azienda per i rappresentanti dei lavoratori di gruppi aziendali con più sedi o stabilimenti.`,

    aChiERivolto: [
      'RLS già formati (attestato di 32 ore) che operano in aziende con più di 50 dipendenti',
      'Lavoratori eletti o designati come RLS che devono rinnovare annualmente la propria formazione in aziende di maggiori dimensioni',
      'Datori di lavoro che devono garantire l\'aggiornamento annuale dell\'RLS in aziende strutturate',
      'Attenzione: chi non ha mai conseguito l\'attestato RLS di 32 ore deve prima frequentare il corso di formazione iniziale, non l\'aggiornamento'
    ],

    cosaImparerai: [
      'Aggiornarsi sulle novità introdotte dai principi giuridici comunitari e nazionali in materia di sicurezza sul lavoro',
      'Approfondire gli obblighi dei principali soggetti coinvolti nel sistema di prevenzione aziendale',
      'Applicare le modalità aggiornate per la definizione e l\'individuazione dei fattori di rischio',
      'Consolidare il ruolo dell\'RLS nella valutazione dei rischi e nella consultazione sul DVR',
      'Partecipare attivamente e con maggiore consapevolezza alla riunione periodica sulla sicurezza',
      'Applicare tecniche di comunicazione efficace e di gestione dei conflitti nel confronto con datore di lavoro e lavoratori'
    ],

    faq: [
      {
        domanda: 'Perché l\'aggiornamento per aziende oltre 50 dipendenti dura il doppio rispetto alle aziende più piccole?',
        risposta: 'La normativa prevede un monte ore maggiore (8 ore anziché 4) per le aziende con più di 50 dipendenti, in ragione della maggiore complessità organizzativa e del numero più elevato di lavoratori rappresentati dall\'RLS.'
      },
      {
        domanda: 'Quanto dura l\'aggiornamento RLS per le aziende con più di 50 dipendenti?',
        risposta: 'L\'aggiornamento dura 8 ore all\'anno, da ripetere con cadenza annuale ai sensi dell\'art. 37 del D.Lgs 81/2008.'
      },
      {
        domanda: 'Il corso tratta anche la partecipazione alla riunione periodica sulla sicurezza?',
        risposta: 'Sì, il programma include un approfondimento sul ruolo dell\'RLS nella riunione periodica sulla sicurezza, uno dei momenti chiave del dialogo tra RLS, datore di lavoro e altre figure della prevenzione aziendale.'
      },
      {
        domanda: 'Posso fare l\'aggiornamento se non ho mai fatto il corso RLS di 32 ore?',
        risposta: 'No, l\'aggiornamento è riservato a chi ha già conseguito l\'attestato RLS iniziale. Senza formazione di base è necessario frequentare il corso completo di 32 ore.'
      },
      {
        domanda: 'Il corso si può fare in FAD o videoconferenza?',
        risposta: 'Sì, l\'aggiornamento è disponibile in aula, in FAD e in videoconferenza, in base alle esigenze organizzative dell\'azienda.'
      }
    ],

    moduli: [
      {
        titolo: 'MODULO UNICO - AGGIORNAMENTO ANNUALE',
        durataOreTeoria: 8,
        durataOrePratica: 0,
        argomenti: [
          'Novità dai principi giuridici comunitari e nazionali in materia di sicurezza',
          'Obblighi dei principali soggetti del sistema di prevenzione',
          'Definizione e individuazione dei fattori di rischio',
          'Ruolo dell\'RLS nella valutazione dei rischi e consultazione sul DVR',
          'Partecipazione alla riunione periodica sulla sicurezza',
          'Comunicazione e gestione dei conflitti tra RLS, datore di lavoro e lavoratori'
        ]
      }
    ],

    corsiCorrelati: [
      'rls',
      'rls-livello-2',
      'rspp-datore-di-lavoro',
      'formazione-dei-lavoratori'
    ]
  }
};
