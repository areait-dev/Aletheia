
// Contenuti editoriali per famiglia "Coordinatori Cantieri CSE/CSP" (ex pagina isolata
// pages/all-courses/coordinatori-cantieri-cse-csp.js). Famiglia a variante unica (livelloKey 'default'):
// un solo livello posizionale 'livello-1' condiviso da corso e aggiornamento (vedi
// coordinatori-cantieri-cse-csp-aggiornamento-content.js).

module.exports = {
  'coordinatori-cantieri-cse-csp': {
    'livello-1': {
      titolo: 'Corso di Formazione per Coordinatori della Sicurezza CSP-CSE',
      durataOre: 120,
      modalita: ['Videoconferenza'],
      validita: 'Da mantenere con l\'aggiornamento periodico (40 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 500,

      descrizione: `Il Corso di Formazione per Coordinatori della Sicurezza nelle Fasi di Progettazione ed Esecuzione dei Lavori (CSP-CSE), della durata di 120 ore, è obbligatorio ai sensi dell'art. 98 e dell'Allegato XIV del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, per chi intende assumere l'incarico di coordinatore della sicurezza nei cantieri temporanei o mobili.

Il Coordinatore per la Progettazione (CSP) e il Coordinatore per l'Esecuzione dei Lavori (CSE) sono le figure che, nei cantieri con presenza di più imprese, hanno il compito di redigere il Piano di Sicurezza e Coordinamento (PSC), coordinare le attività delle diverse imprese esecutrici e vigilare sull'applicazione delle misure di sicurezza durante l'esecuzione dell'opera. Si tratta di un ruolo di elevata responsabilità, che richiede competenze giuridiche, tecniche, metodologiche e relazionali approfondite.

Il corso, tra i più estesi previsti dalla normativa sulla sicurezza, si articola in otto moduli: due moduli giuridici (28 ore complessive) su normativa generale e specifica dei cantieri; due moduli tecnici (52 ore complessive) su rischi di caduta dall'alto, ponteggi, organizzazione del cantiere, rischi da macchine, attrezzature, sostanze chimiche, amianto e agenti fisici e biologici; due moduli metodologico-organizzativi (16 ore complessive) sull'elaborazione del PSC, del POS e del fascicolo, e su tecniche di comunicazione e gestione dei rapporti con committenza e progettisti; due moduli pratici (24 ore complessive) con stesura reale di Piani di Sicurezza e Coordinamento e simulazioni sul ruolo del coordinatore in fase di esecuzione.

Il corso si svolge interamente in videoconferenza sincrona con il docente, la modalità prevista per questo corso secondo il listino Alètheia. Data l'ampiezza dei contenuti e la centralità della parte pratica di stesura dei documenti di cantiere, il percorso è pensato per fornire competenze immediatamente spendibili nel ruolo di coordinatore.`,

      aChiERivolto: [
        'Chi intende svolgere il ruolo di Coordinatore per la Progettazione (CSP)',
        'Tecnici che intendono svolgere il ruolo di Coordinatore per l\'Esecuzione dei Lavori (CSE) nei cantieri temporanei o mobili',
        'Professionisti che operano nel settore delle costruzioni e vogliono ampliare le proprie competenze in materia di sicurezza nei cantieri',
        'Datori di lavoro e imprese edili che vogliono formare internamente una figura qualificata come coordinatore della sicurezza'
      ],

      cosaImparerai: [
        'Applicare la legislazione di base e specifica in materia di sicurezza nei cantieri temporanei e mobili e nei lavori in quota',
        'Riconoscere i rischi di caduta dall\'alto e gestire correttamente ponteggi e opere provvisionali',
        'Organizzare in sicurezza il cantiere e predisporre il cronoprogramma dei lavori',
        'Valutare i rischi legati a macchine, attrezzature, sostanze chimiche, amianto, agenti fisici e biologici in cantiere',
        'Elaborare contenuti e criteri metodologici del Piano di Sicurezza e Coordinamento (PSC), del Piano Sostitutivo di Sicurezza e del Piano Operativo di Sicurezza (POS)',
        'Elaborare il fascicolo dell\'opera e il PIMUS, e stimare i costi della sicurezza',
        'Applicare tecniche di comunicazione, gestione dei gruppi e leadership nei rapporti con committenza, progettisti, direzione lavori e RLS',
        'Redigere concretamente un Piano di Sicurezza e Coordinamento e simulare il ruolo di coordinatore in fase di esecuzione'
      ],

      faq: [
        { domanda: 'Che differenza c\'è tra CSP e CSE?', risposta: 'Il CSP opera nella fase di progettazione dell\'opera; il CSE opera durante l\'esecuzione dei lavori vigilando sulla sicurezza in cantiere. Questo corso abilita a entrambi i ruoli.' },
        { domanda: 'Quanto dura il corso Coordinatori CSE-CSP?', risposta: 'Il corso dura 120 ore complessive, suddivise in moduli teorici, tecnici e pratici.' },
        { domanda: 'Il corso si può fare in aula?', risposta: 'No, secondo il listino Alètheia questo modulo da 120 ore è disponibile solo in videoconferenza sincrona.' },
        { domanda: 'Il corso include la stesura pratica di un Piano di Sicurezza e Coordinamento?', risposta: 'Sì, gli ultimi moduli pratici (24 ore totali) prevedono la stesura reale di PSC e simulazioni operative.' },
        { domanda: 'Dopo il corso CSE-CSP serve un aggiornamento periodico?', risposta: 'Sì, è obbligatorio un corso di aggiornamento dedicato di 40 ore.' }
      ],

      moduli: [
        { titolo: 'MODULI GIURIDICI (I-II)', durataOre: 28, argomenti: ['Normativa generale sulla sicurezza nei cantieri', 'Normativa specifica di settore (Titolo IV D.Lgs 81/08)'] },
        { titolo: 'MODULI TECNICI (III-IV)', durataOre: 52, argomenti: ['Rischi di caduta dall\'alto e ponteggi', 'Organizzazione del cantiere', 'Rischi da macchine, attrezzature e sostanze chimiche', 'Amianto, agenti fisici e biologici'] },
        { titolo: 'MODULI METODOLOGICO-ORGANIZZATIVI (V-VI)', durataOre: 16, argomenti: ['Elaborazione del PSC, del POS e del fascicolo dell\'opera', 'Tecniche di comunicazione e gestione dei rapporti con committenza e progettisti'] },
        { titolo: 'MODULI PRATICI (VII-VIII)', durataOre: 24, argomenti: ['Stesura reale di un Piano di Sicurezza e Coordinamento', 'Simulazioni sul ruolo del coordinatore in fase di esecuzione'] }
      ],

      corsiCorrelati: [
        'pimus-ponteggi',
        'lavori-in-quota',
        'rspp-datore-di-lavoro-modulo-3-costruzioni'
      ]
    }
  }
};
