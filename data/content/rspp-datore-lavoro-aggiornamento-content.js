
// Contenuti editoriali per famiglia "RSPP Datore di Lavoro" - variante AGGIORNAMENTO (8 ore).
// È la 6a voce raw in data/coursesRaw.js (livelloKey 'default'), quindi la chiave posizionale è
// 'livello-6' - vedi editorialLivelloKey in pages/all-courses/[slug].js e il commento in
// rspp-datore-lavoro-content.js.

module.exports = {
  'livello-6': {
    titolo: 'Aggiornamento RSPP Datore di Lavoro',
    durataOre: 8,
    modalita: ['Aula', 'FAD', 'Videoconferenza'],
    validita: 'Da ripetere periodicamente ai sensi dell\'art. 34, commi 2-3, D.Lgs 81/2008 e dell\'Accordo Stato Regioni del 17/04/2025',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 130,

    descrizione: `Questo è il corso di aggiornamento per il datore di lavoro che svolge già direttamente i compiti di RSPP nella propria azienda, non il percorso di formazione iniziale: è rivolto a chi ha già completato il Modulo Comune e il relativo modulo integrativo settoriale (Agricoltura, Pesca, Costruzioni o Chimico-Petrolchimico) e deve mantenere aggiornata la propria abilitazione, ai sensi dell'art. 34, commi 2 e 3, del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è previsto perché il quadro normativo e gli strumenti di gestione della sicurezza aziendale evolvono nel tempo: il datore di lavoro che svolge il ruolo di RSPP deve rimanere allineato ai cambiamenti legislativi, agli strumenti di valutazione dei rischi e alle tecniche di gestione delle relazioni aziendali per continuare a svolgere correttamente questo compito, senza dover ricorrere a un professionista esterno.

Il corso, della durata di 8 ore, è organizzato in quattro moduli: un modulo normativo-giuridico su responsabilità civile, penale e amministrativa e sul sistema istituzionale della prevenzione; un modulo gestionale su criteri di valutazione dei rischi, documento di valutazione dei rischi (DVR) e DUVRI; un modulo tecnico su fattori di rischio, stress lavoro-correlato e dispositivi di protezione individuale; e un modulo relazionale su informazione, formazione, comunicazione e rapporti con i rappresentanti dei lavoratori per la sicurezza.

A differenza dei moduli di formazione iniziale - che richiedono l'abbinamento obbligatorio tra Modulo Comune e modulo integrativo settoriale - l'aggiornamento è un corso unico di 8 ore, valido indipendentemente dal settore di appartenenza dell'azienda.

Il corso è disponibile in aula, in FAD e in videoconferenza; è possibile organizzarlo anche direttamente in azienda.`,

    aChiERivolto: [
      'Datori di lavoro che già svolgono i compiti di RSPP e devono rinnovare l\'abilitazione',
      'Datori di lavoro che hanno completato il Modulo Comune e un modulo settoriale con formazione in scadenza',
      'Titolari di PMI di qualsiasi settore già abilitati come RSPP'
    ],

    cosaImparerai: [
      'Aggiornarsi sul sistema legislativo e sulla responsabilità civile, penale e amministrativa',
      'Applicare criteri e strumenti per l\'individuazione e la valutazione dei rischi',
      'Aggiornare e gestire il DVR e il DUVRI',
      'Riconoscere i fattori di rischio e le relative misure preventive',
      'Valutare lo stress lavoro-correlato e i rischi legati a genere, età e provenienza',
      'Gestire informazione, formazione e addestramento',
      'Applicare tecniche di comunicazione efficace',
      'Gestire la consultazione e la partecipazione dell\'RLS'
    ],

    faq: [
      { domanda: 'Ogni quanto va rinnovata l\'abilitazione RSPP Datore di Lavoro?', risposta: 'L\'abilitazione richiede un aggiornamento periodico per restare valida.' },
      { domanda: 'Quanto dura l\'aggiornamento RSPP Datore di Lavoro?', risposta: '8 ore complessive, divise in quattro moduli da 2 ore ciascuno (normativo-giuridico, gestionale, tecnico, relazionale).' },
      { domanda: 'L\'aggiornamento è uguale per tutti i settori (agricoltura, pesca, costruzioni, chimico)?', risposta: 'Sì, è un corso unico di 8 ore valido per tutti i settori aziendali, a differenza della formazione iniziale.' },
      { domanda: 'Posso fare l\'aggiornamento se non ho ancora l\'abilitazione RSPP?', risposta: 'No, l\'aggiornamento è riservato a chi ha già completato il percorso base (Modulo Comune + modulo integrativo).' },
      { domanda: 'In quali modalità posso seguire l\'aggiornamento?', risposta: 'È disponibile in aula, in FAD (formazione a distanza) e in videoconferenza.' }
    ],

    moduli: [
      { titolo: 'MODULO NORMATIVO-GIURIDICO', durataOreTeoria: 2, durataOrePratica: 0, argomenti: ['Responsabilità civile, penale e amministrativa', 'Sistema istituzionale della prevenzione'] },
      { titolo: 'MODULO GESTIONALE', durataOreTeoria: 2, durataOrePratica: 0, argomenti: ['Criteri di valutazione dei rischi', 'Documento di valutazione dei rischi (DVR)', 'DUVRI'] },
      { titolo: 'MODULO TECNICO', durataOreTeoria: 2, durataOrePratica: 0, argomenti: ['Fattori di rischio', 'Stress lavoro-correlato', 'Dispositivi di protezione individuale'] },
      { titolo: 'MODULO RELAZIONALE', durataOreTeoria: 2, durataOrePratica: 0, argomenti: ['Informazione, formazione e comunicazione', 'Rapporti con i rappresentanti dei lavoratori per la sicurezza (RLS)'] }
    ],

    corsiCorrelati: [
      'rspp-datore-di-lavoro-livello-1',
      'rspp-datore-di-lavoro-livello-2',
      'rspp-datore-di-lavoro-livello-3',
      'rspp-datore-di-lavoro-livello-4',
      'rspp-datore-di-lavoro-livello-5'
    ]
  }
};
