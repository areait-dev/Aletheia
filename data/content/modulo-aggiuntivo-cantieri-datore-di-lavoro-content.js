
// Contenuti editoriali per famiglia "Modulo Aggiuntivo Cantieri per Datore di Lavoro" (ex pagina isolata
// pages/all-courses/modulo-aggiuntivo-cantieri-per-datore-di-lavoro.js). Famiglia A SÉ STANTE, non
// annidata sotto "datore-di-lavoro": il raw title "Modulo Aggiuntivo Cantieri per Datore di Lavoro" (in
// data/coursesRaw.js) non contiene nessun descrittore riconosciuto da LEVEL_PATTERNS (in particolare non
// "Modulo Comune"), quindi buildCourseFamilies lo tratta come famiglia indipendente a variante unica
// (nessun aggiornamento raw corrispondente). family.id = slugify(title) =
// "modulo-aggiuntivo-cantieri-per-datore-di-lavoro" (combacia con il nome del file pagina originale).
//
// NOTA: questo stesso testo era duplicato anche come variante "cantieri" nella CONTENUTO di
// datore-di-lavoro.js (switch a 3 opzioni Datore/Cantieri/Aggiornamento) - la duplicazione non è stata
// portata nel nuovo sistema: qui il contenuto vive solo in questa famiglia indipendente.

module.exports = {
  'modulo-aggiuntivo-cantieri-per-datore-di-lavoro': {
    'livello-1': {
      titolo: 'Formazione Aggiuntiva "Cantieri" per Datore di Lavoro e Dirigente',
      durataOre: 6,
      modalita: ['FAD'],
      validita: 'Da mantenere in abbinamento al corso base (Datore di Lavoro o Dirigente) di riferimento',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 90,

      descrizione: `La Formazione Aggiuntiva "Cantieri", della durata di 6 ore, è un modulo integrativo ai sensi dell'art. 18 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, condiviso tra due percorsi base: chi ha già completato la Formazione per Datore di Lavoro (16 ore) e chi ha già completato la Formazione Dirigente (12 ore), qualora l'uno o l'altro operino in cantieri temporanei o mobili.

A differenza dei moduli settoriali del percorso RSPP Datore di Lavoro (Agricoltura, Pesca, Costruzioni, Chimico-Petrolchimico), che sono alternativi tra loro in base al settore ATECO dell'azienda, questo modulo cantieri è un'integrazione specifica pensata per chi, indipendentemente dal proprio ruolo di datore di lavoro o dirigente, si trova a operare in un cantiere temporaneo o mobile disciplinato dal Titolo IV, Capo I, del D.Lgs 81/2008.

Il corso, erogato in un modulo unico, tratta i soggetti definiti dal Titolo IV, Capo I, e i relativi obblighi e responsabilità; la redazione dei piani di sicurezza, con finalità, tempi e contenuti; le misure generali di tutela previste dall'art. 95 del D.Lgs 81/2008; gli obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell'art. 96; il cronoprogramma dei lavori; ed esempi pratici di analisi di un Piano di Sicurezza e Coordinamento (PSC) e di un Piano Operativo di Sicurezza (POS).

Il corso si svolge interamente in FAD, la modalità prevista secondo il listino Alètheia. Va frequentato dopo aver completato uno dei due corsi base di riferimento (Datore di Lavoro o Dirigente), a seconda del ruolo ricoperto in azienda.`,

      aChiERivolto: [
        'Datori di lavoro già formati (Formazione Datore di Lavoro, 16 ore) che operano in cantieri temporanei o mobili',
        'Dirigenti già formati (Formazione Dirigente, 12 ore) che operano in cantieri temporanei o mobili',
        'Imprese edili e datori di lavoro o dirigenti di aziende che eseguono lavori in cantiere',
        'Attenzione: questo modulo è integrativo e va frequentato dopo aver completato il corso base (Datore di Lavoro o Dirigente) pertinente al proprio ruolo'
      ],

      cosaImparerai: [
        'Riconoscere i soggetti definiti dal Titolo IV, Capo I, del D.Lgs 81/2008 e i relativi obblighi e responsabilità',
        'Comprendere finalità, tempi e contenuti della redazione dei piani di sicurezza in cantiere',
        'Applicare le misure generali di tutela previste dall\'art. 95 del D.Lgs 81/2008',
        'Riconoscere gli obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell\'art. 96 del D.Lgs 81/2008',
        'Predisporre correttamente il cronoprogramma dei lavori',
        'Analizzare esempi pratici di Piano di Sicurezza e Coordinamento (PSC) e di Piano Operativo di Sicurezza (POS)'
      ],

      faq: [
        { domanda: 'Questo modulo è per il Datore di Lavoro o per il Dirigente?', risposta: 'È un modulo condiviso: si abbina sia al percorso Formazione Datore di Lavoro (16 ore) sia al percorso Formazione Dirigente (12 ore), a seconda del ruolo ricoperto da chi opera in cantiere.' },
        { domanda: 'Devo fare questo modulo se non opero in cantieri?', risposta: 'No, questo modulo è necessario solo per datori di lavoro o dirigenti che operano effettivamente in cantieri temporanei o mobili disciplinati dal Titolo IV, Capo I, del D.Lgs 81/2008.' },
        { domanda: 'Posso fare questo modulo senza aver completato il corso base?', risposta: 'No, è un modulo integrativo: va frequentato dopo aver completato la Formazione Datore di Lavoro o la Formazione Dirigente, a seconda del proprio ruolo.' },
        { domanda: 'Quanto dura il modulo cantieri?', risposta: 'Il modulo dura 6 ore, erogate interamente in FAD.' },
        { domanda: 'Il modulo tratta anche il Piano Operativo di Sicurezza (POS)?', risposta: 'Sì, il programma include esempi e analisi pratica sia di un Piano di Sicurezza e Coordinamento (PSC) sia di un Piano Operativo di Sicurezza (POS).' }
      ],

      moduli: [
        { titolo: 'MODULO UNICO - CANTIERI', durataOre: 6, argomenti: ['Soggetti definiti dal Titolo IV, Capo I, del D.Lgs 81/2008 e relativi obblighi e responsabilità', 'Redazione dei piani di sicurezza: finalità, tempi e contenuti', 'Misure generali di tutela previste dall\'art. 95 del D.Lgs 81/2008', 'Obblighi del datore di lavoro, dei dirigenti e dei preposti ai sensi dell\'art. 96', 'Cronoprogramma dei lavori', 'Esempi e analisi di un Piano di Sicurezza e Coordinamento (PSC)', 'Esempi e analisi di un Piano Operativo di Sicurezza (POS)'] }
      ],

      corsiCorrelati: [
        'datore-di-lavoro-modulo-comune',
        'formazione-dirigente-modulo-comune',
        'coordinatori-cantieri-cse-csp',
        'pimus-ponteggi'
      ]
    }
  }
};
