
// Contenuti editoriali per famiglia "RSPP/ASPP Esterno" - Modulo A, Modulo B, Modulo C (tipo 'corso').
// Famiglia già raggruppata automaticamente da buildCourseFamilies in 4 livelli a variante unica.
// ATTENZIONE alle chiavi posizionali: nell'array raw di data/coursesRaw.js la voce "Aggiornamento
// RSPP/ASPP Esterno" precede le voci dei 3 moduli, quindi l'ordine dei livelli è:
// 'livello-1' = Aggiornamento (in rspp-aspp-aggiornamento-content.js), 'livello-2' = Modulo A,
// 'livello-3' = Modulo B, 'livello-4' = Modulo C - vedi editorialLivelloKey in
// pages/all-courses/[slug].js.

module.exports = {
  'rspp-aspp': {
    'livello-2': {
      titolo: 'Corso RSPP/ASPP – Modulo A',
      durataOre: 28,
      modalita: ['FAD'],
      validita: 'Da mantenere con l\'aggiornamento periodico previsto per RSPP/ASPP (40 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 350,

      descrizione: `Il Modulo A, della durata di 28 ore, è il primo modulo del percorso di formazione per RSPP (Responsabile del Servizio di Prevenzione e Protezione) e ASPP (Addetto al Servizio di Prevenzione e Protezione) esterni, ai sensi dell'art. 32, comma 2 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il Modulo A è comune a entrambe le figure professionali ed è il punto di partenza obbligatorio: chi vuole diventare ASPP deve frequentare il Modulo A seguito dal Modulo B specialistico; chi vuole diventare RSPP deve invece completare anche il Modulo C, aggiuntivo e dedicato ad aspetti gestionali e relazionali. Senza il Modulo A non è possibile accedere né al Modulo B né al Modulo C.

Il programma affronta l'approccio alla prevenzione nel D.Lgs 81/08, l'evoluzione legislativa in materia di salute e sicurezza sul lavoro, il sistema istituzionale della prevenzione, il sistema di vigilanza e assistenza, i soggetti del sistema di prevenzione e protezione aziendale, i concetti fondamentali di pericolo, rischio, danno, prevenzione e protezione, il processo di valutazione dei rischi, il documento di valutazione dei rischi (DVR) e gli istituti relazionali previsti dalla normativa.

Il corso si svolge interamente in FAD (formazione a distanza asincrona), la modalità prevista per questo modulo secondo il listino Alètheia. Al termine del Modulo A è possibile proseguire con il Modulo B per diventare ASPP, o con Modulo B e Modulo C per diventare RSPP.`,

      aChiERivolto: [
        'Chi intende diventare ASPP esterno',
        'Chi intende diventare RSPP esterno',
        'Consulenti e professionisti della sicurezza sul lavoro che vogliono ampliare le proprie qualifiche',
        'Chi lavora nell\'ambito di società di consulenza o come libero professionista nel settore sicurezza'
      ],

      cosaImparerai: [
        'Comprendere l\'approccio gestionale-organizzativo alla prevenzione previsto dal D.Lgs 81/2008',
        'Ricostruire l\'evoluzione legislativa in materia di salute e sicurezza e il quadro giuridico europeo',
        'Riconoscere il sistema istituzionale della prevenzione e gli organismi di vigilanza e assistenza',
        'Identificare i soggetti del sistema di prevenzione aziendale e i relativi ruoli',
        'Applicare i concetti di pericolo, rischio, danno, prevenzione e protezione al processo di valutazione dei rischi',
        'Comprendere contenuti, struttura e organizzazione del DVR',
        'Valutare i rischi da interferenza nella gestione di appalti, contratti d\'opera o somministrazione',
        'Applicare gli istituti relazionali previsti: informazione, formazione, addestramento e consultazione aziendale'
      ],

      faq: [
        { domanda: 'Il Modulo A basta per diventare ASPP o RSPP?', risposta: 'No, è il primo passo. Per ASPP serve anche il Modulo B; per RSPP servono Modulo B e Modulo C.' },
        { domanda: 'Il Modulo A si può fare in aula?', risposta: 'No, secondo il listino Alètheia questo modulo è disponibile solo in modalità FAD.' },
        { domanda: 'Quanto dura il Modulo A?', risposta: '28 ore complessive, suddivise in diverse unità didattiche su quadro normativo, sistema di prevenzione e valutazione rischi.' },
        { domanda: 'Che differenza c\'è tra il Modulo A e il Modulo B?', risposta: 'Il Modulo A è la base comune giuridico-normativa e organizzativa generale; il Modulo B è specialistico e approfondisce i rischi tecnici specifici.' },
        { domanda: 'Dopo il Modulo A devo fare anche un aggiornamento periodico?', risposta: 'Sì, una volta completato l\'intero percorso RSPP o ASPP è previsto un aggiornamento periodico di 40 ore.' }
      ],

      moduli: [
        { titolo: 'QUADRO NORMATIVO E SISTEMA DI PREVENZIONE', durataOreTeoria: 16, durataOrePratica: 0, argomenti: ['Approccio alla prevenzione nel D.Lgs 81/08', 'Evoluzione legislativa in materia di salute e sicurezza', 'Sistema istituzionale della prevenzione e vigilanza', 'Soggetti del sistema di prevenzione e protezione aziendale'] },
        { titolo: 'VALUTAZIONE DEI RISCHI E DVR', durataOreTeoria: 12, durataOrePratica: 0, argomenti: ['Concetti di pericolo, rischio, danno, prevenzione e protezione', 'Processo di valutazione dei rischi', 'Documento di valutazione dei rischi (DVR)', 'Istituti relazionali previsti dalla normativa'] }
      ],

      corsiCorrelati: ['rspp-aspp-livello-3', 'rspp-aspp-livello-4', 'rspp-aspp-livello-1']
    },

    'livello-3': {
      titolo: 'Corso RSPP/ASPP – Modulo B',
      durataOre: 48,
      modalita: ['Videoconferenza'],
      validita: 'Da mantenere con l\'aggiornamento periodico previsto per RSPP/ASPP (40 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 600,

      descrizione: `Il Modulo B, della durata di 48 ore, è il modulo specialistico del percorso di formazione per RSPP e ASPP esterni, ai sensi dell'art. 32, comma 2 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025. Si frequenta dopo aver completato il Modulo A, che rappresenta il prerequisito comune per entrambe le figure professionali.

Mentre il Modulo A fornisce le basi giuridiche e organizzative del sistema di prevenzione, il Modulo B approfondisce in modo tecnico i rischi che un RSPP o un ASPP deve saper valutare e gestire nella pratica quotidiana: ambienti e luoghi di lavoro, rischio incendio e gestione delle emergenze, rischi infortunistici legati a macchine, impianti e attrezzature, cadute dall'alto, rischi ergonomici e organizzativi, rischi psicosociali, agenti fisici, chimici, cancerogeni e mutageni, agenti biologici e attività particolari come ambienti confinati e gestione dei rifiuti.

Il completamento del Modulo A e del Modulo B consente di conseguire la qualifica di ASPP. Chi invece intende diventare RSPP deve, dopo il Modulo B, completare anche il Modulo C, dedicato agli aspetti gestionali, relazionali e organizzativi specifici del ruolo di responsabile.

Il corso si svolge in videoconferenza sincrona con il docente, la modalità prevista per questo modulo secondo il listino Alètheia. Data l'ampiezza dei contenuti, il modulo è strutturato in dodici unità didattiche da 4 ore ciascuna, per un totale di 48 ore.`,

      aChiERivolto: [
        'Chi ha già completato il Modulo A e intende conseguire la qualifica di ASPP',
        'Chi ha già completato il Modulo A e sta completando il percorso per diventare RSPP',
        'Consulenti e professionisti che vogliono approfondire la valutazione tecnica dei rischi',
        'Operatori di società di consulenza o liberi professionisti'
      ],

      cosaImparerai: [
        'Applicare tecniche specifiche di valutazione dei rischi e di analisi degli incidenti',
        'Valutare rischi legati ad ambienti e luoghi di lavoro, rischio incendio, emergenze e ATEX',
        'Riconoscere rischi infortunistici legati a macchine, impianti, attrezzature, rischio elettrico e meccanico',
        'Gestire rischi legati a movimentazione merci, apparecchi di sollevamento e mezzi di trasporto',
        'Prevenire i rischi legati alle cadute dall\'alto',
        'Valutare rischi ergonomici, organizzativi e psicosociali, inclusi stress lavoro-correlato, mobbing e burn-out',
        'Gestire l\'esposizione ad agenti fisici, chimici, cancerogeni, mutageni e biologici, incluso amianto',
        'Valutare rischi in ambienti confinati, attività su strada e gestione dei rifiuti'
      ],

      faq: [
        { domanda: 'Posso fare il Modulo B senza aver fatto il Modulo A?', risposta: 'No, il Modulo A è il prerequisito obbligatorio per accedere al Modulo B.' },
        { domanda: 'Con Modulo A e Modulo B divento RSPP o ASPP?', risposta: 'Si consegue la qualifica di ASPP. Per diventare RSPP è necessario completare anche il Modulo C.' },
        { domanda: 'Il Modulo B si può fare in aula?', risposta: 'No, secondo il listino Alètheia questo modulo è disponibile solo in modalità videoconferenza.' },
        { domanda: 'Quanto dura il Modulo B?', risposta: '48 ore complessive, suddivise in dodici unità didattiche da 4 ore ciascuna.' },
        { domanda: 'Il Modulo B tratta anche i rischi psicosociali come lo stress lavoro-correlato?', risposta: 'Sì, include un\'unità didattica specifica su stress lavoro-correlato, mobbing e burn-out.' }
      ],

      moduli: [
        { titolo: 'RISCHI DA AMBIENTI, IMPIANTI E ATTREZZATURE', durataOreTeoria: 24, durataOrePratica: 0, argomenti: ['Ambienti e luoghi di lavoro', 'Rischio incendio e gestione delle emergenze (ATEX)', 'Rischi infortunistici da macchine, impianti, attrezzature, rischio elettrico e meccanico', 'Movimentazione merci, apparecchi di sollevamento, mezzi di trasporto', 'Cadute dall\'alto'] },
        { titolo: 'RISCHI ERGONOMICI, PSICOSOCIALI E AGENTI SPECIFICI', durataOreTeoria: 24, durataOrePratica: 0, argomenti: ['Rischi ergonomici e organizzativi', 'Stress lavoro-correlato, mobbing e burn-out', 'Agenti fisici, chimici, cancerogeni e mutageni', 'Agenti biologici e amianto', 'Ambienti confinati, attività su strada, gestione dei rifiuti'] }
      ],

      corsiCorrelati: ['rspp-aspp-livello-2', 'rspp-aspp-livello-4', 'rspp-aspp-livello-1']
    },

    'livello-4': {
      titolo: 'Corso RSPP – Modulo C',
      durataOre: 24,
      modalita: ['Videoconferenza'],
      validita: 'Da mantenere con l\'aggiornamento periodico previsto per RSPP/ASPP (40 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 400,

      descrizione: `Il Modulo C, della durata di 24 ore, è il modulo conclusivo del percorso di formazione per RSPP (Responsabile del Servizio di Prevenzione e Protezione) esterno, ai sensi dell'art. 32, comma 2 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025. A differenza del Modulo A e del Modulo B, il Modulo C non è richiesto per diventare ASPP: riguarda esclusivamente chi vuole assumere il ruolo di RSPP.

Se i primi due moduli forniscono le basi normative (Modulo A) e la capacità tecnica di valutare i rischi (Modulo B), il Modulo C sviluppa le competenze gestionali e relazionali necessarie a chi dovrà coordinare il sistema di prevenzione aziendale: pianificazione della formazione e dell'informazione dei lavoratori, sistemi di gestione della sicurezza, comunicazione e gestione delle relazioni aziendali, benessere organizzativo.

Il programma affronta il ruolo dell'informazione e della formazione in azienda, i sistemi di gestione della sicurezza (linee guida UNI-INAIL, integrazione con standard come OHSAS 18001 e ISO), la responsabilità amministrativa ai sensi del D.Lgs 231/2001, il sistema delle relazioni e della comunicazione aziendale, la gestione di riunioni e incontri di lavoro, e il benessere organizzativo, incluso il tema dello stress lavoro-correlato.

Il corso si svolge in videoconferenza sincrona con il docente, la modalità prevista per questo modulo secondo il listino Alètheia. Con il completamento di Modulo A, Modulo B e Modulo C si conclude il percorso di formazione per la qualifica di RSPP esterno.`,

      aChiERivolto: [
        'Chi ha completato Modulo A e B e intende conseguire la qualifica di RSPP',
        'ASPP già qualificati che vogliono estendere la qualifica',
        'Consulenti e professionisti che mirano a ruoli di coordinamento',
        'Operatori di società di consulenza o liberi professionisti'
      ],

      cosaImparerai: [
        'Predisporre piani di informazione e formazione a partire dalla valutazione dei rischi',
        'Applicare metodologie didattiche attive ed elementi di progettazione',
        'Gestire sistemi di sicurezza secondo linee guida UNI-INAIL e standard ISO',
        'Comprendere procedure semplificate per MOG e responsabilità amministrativa D.Lgs 231/2001',
        'Gestire il sistema di relazioni e comunicazione aziendale',
        'Pianificare e condurre riunioni gestendo obiezioni e conflitti',
        'Gestire relazioni sindacali sulla sicurezza',
        'Promuovere il benessere organizzativo e gestire stress, mobbing e burn-out'
      ],

      faq: [
        { domanda: 'Devo fare il Modulo C se voglio diventare ASPP?', risposta: 'No, il Modulo C è richiesto esclusivamente per chi vuole diventare RSPP.' },
        { domanda: 'Posso fare il Modulo C senza aver completato Modulo A e Modulo B?', risposta: 'No, Modulo A e Modulo B sono prerequisiti obbligatori.' },
        { domanda: 'Il Modulo C si può fare in aula?', risposta: 'No, secondo il listino Alètheia questo modulo è disponibile solo in modalità videoconferenza.' },
        { domanda: 'Quanto dura il Modulo C?', risposta: 'Dura 24 ore complessive, focalizzate su competenze gestionali, relazionali e organizzative.' },
        { domanda: 'Cosa distingue il Modulo C dagli altri due moduli?', risposta: 'Si concentra su comunicazione, formazione, sistemi di gestione e benessere organizzativo, anziché sulla valutazione tecnica o sul quadro normativo.' }
      ],

      moduli: [
        { titolo: 'INFORMAZIONE, FORMAZIONE E SISTEMI DI GESTIONE', durataOreTeoria: 12, durataOrePratica: 0, argomenti: ['Ruolo dell\'informazione e della formazione in azienda', 'Sistemi di gestione della sicurezza (UNI-INAIL, OHSAS 18001, ISO)', 'Responsabilità amministrativa D.Lgs 231/2001'] },
        { titolo: 'COMUNICAZIONE, RELAZIONI E BENESSERE ORGANIZZATIVO', durataOreTeoria: 12, durataOrePratica: 0, argomenti: ['Sistema delle relazioni e comunicazione aziendale', 'Gestione di riunioni e incontri di lavoro', 'Benessere organizzativo e stress lavoro-correlato'] }
      ],

      corsiCorrelati: ['rspp-aspp-livello-2', 'rspp-aspp-livello-3', 'rspp-aspp-livello-1']
    }
  }
};
