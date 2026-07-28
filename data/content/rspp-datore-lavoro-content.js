
// Contenuti editoriali per famiglia "RSPP Datore di Lavoro" - Modulo Comune + 4 moduli integrativi
// settoriali (corso, tipo 'corso'). Famiglia già raggruppata automaticamente da buildCourseFamilies in
// 6 livelli a variante unica; l'Aggiornamento (tipo 'aggiornamento') vive in
// rspp-datore-lavoro-aggiornamento-content.js sotto 'livello-6' - chiavi posizionali (stesso ordine
// delle 6 voci raw in data/coursesRaw.js), stesso pattern di trattori-agricoli-content.js.

module.exports = {
  'rspp-datore-di-lavoro': {
    'livello-1': {
      titolo: 'Corso RSPP Datore di Lavoro – Modulo Comune',
      durataOre: 8,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Aggiornamento tramite il corso dedicato Aggiornamento RSPP Datore di Lavoro (8 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 100,

      descrizione: `Il Modulo Comune RSPP Datore di Lavoro, della durata di 8 ore, è il primo passo obbligatorio per i datori di lavoro che intendono svolgere direttamente i compiti di RSPP (Responsabile del Servizio di Prevenzione e Protezione) nella propria azienda, ai sensi dell'art. 34 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025. La normativa consente al datore di lavoro, in presenza di determinate condizioni legate al settore e alla classificazione di rischio dell'azienda, di autodesignarsi RSPP senza dover ricorrere a un professionista esterno, a patto di seguire un percorso formativo specifico.

Questo percorso si compone di due parti: il Modulo Comune, uguale per tutti i settori, e un Modulo integrativo settoriale, da scegliere in base al comparto di attività dell'azienda. Il Modulo Comune non basta da solo a completare il percorso: va necessariamente abbinato a uno dei quattro moduli integrativi disponibili - Agricoltura, Silvicoltura e Zootecnia (16 ore), Pesca (12 ore), Costruzioni (16 ore) oppure Chimico-Petrolchimico (16 ore) - scelto in base alla classificazione ATECO della propria attività. Solo la combinazione dei due moduli permette di conseguire l'abilitazione completa.

Il modulo tratta il processo di valutazione dei rischi: fattori di rischio legati a luoghi di lavoro, attrezzature, movimentazione manuale dei carichi, videoterminali, agenti fisici, sostanze pericolose, agenti biologici, atmosfere esplosive, stress lavoro-correlato e rischi legati a genere, età e provenienza; le misure tecniche, organizzative e procedurali di prevenzione; i dispositivi di protezione individuale e la segnaletica di sicurezza; i criteri per l'individuazione e la valutazione dei rischi e la struttura del documento di valutazione dei rischi (DVR).

Il corso è disponibile in aula o in videoconferenza; è possibile organizzarlo anche direttamente in azienda.`,

      aChiERivolto: [
        'Datori di lavoro che intendono svolgere direttamente i compiti di RSPP',
        'Titolari di PMI che vogliono gestire internamente la sicurezza',
        'Imprenditori dei settori agricoltura, pesca, costruzioni o chimico-petrolchimico che rientrano nei requisiti',
        'Datori di lavoro che devono completare o rinnovare la formazione prevista dall\'art. 34'
      ],

      cosaImparerai: [
        'Individuare i fattori di rischio legati a luoghi di lavoro, attrezzature, carichi e videoterminali',
        'Riconoscere i rischi da agenti fisici, sostanze pericolose, agenti biologici e atmosfere esplosive',
        'Valutare lo stress lavoro-correlato e i rischi psicosociali',
        'Considerare i rischi legati a genere, età e provenienza',
        'Applicare misure tecniche, organizzative e procedurali di prevenzione',
        'Selezionare i DPI e la segnaletica di sicurezza',
        'Utilizzare i criteri e gli strumenti di valutazione dei rischi',
        'Redigere e gestire il documento di valutazione dei rischi (DVR)'
      ],

      faq: [
        { domanda: 'Il Modulo Comune basta per diventare RSPP della propria azienda?', risposta: 'No, va abbinato a un modulo integrativo settoriale (Agricoltura, Pesca, Costruzioni o Chimico). Solo la combinazione completa il percorso.' },
        { domanda: 'Quale modulo integrativo devo scegliere dopo il Modulo Comune?', risposta: 'Dipende dal settore e dal rischio ATECO aziendale. Contattaci per verificarlo.' },
        { domanda: 'Quanto dura il Modulo Comune RSPP Datore di Lavoro?', risposta: '8 ore, suddivise in due parti da 4 ore ciascuna: rischi/prevenzione e valutazione/DVR.' },
        { domanda: 'Il corso si può fare in videoconferenza?', risposta: 'Sì, aula o videoconferenza sincrona. Non è disponibile la FAD.' },
        { domanda: 'Dopo aver conseguito l\'abilitazione, serve un aggiornamento periodico?', risposta: 'Sì, un corso di aggiornamento RSPP Datore di Lavoro di 8 ore, valido per tutti i settori.' }
      ],

      moduli: [
        { titolo: 'RISCHI E PREVENZIONE', durataOre: 4, argomenti: ['Fattori di rischio (luoghi, attrezzature, carichi, videoterminali)', 'Agenti fisici, sostanze pericolose, biologici, atmosfere esplosive', 'Stress lavoro-correlato', 'Rischi legati a genere, età e provenienza', 'Misure tecniche, organizzative e procedurali', 'DPI e segnaletica'] },
        { titolo: 'VALUTAZIONE DEI RISCHI E DVR', durataOre: 4, argomenti: ['Criteri e strumenti per l\'individuazione e la valutazione dei rischi', 'Struttura e redazione del documento di valutazione dei rischi (DVR)'] }
      ],

      corsiCorrelati: [
        'rspp-datore-di-lavoro-livello-2',
        'rspp-datore-di-lavoro-livello-3',
        'rspp-datore-di-lavoro-livello-4',
        'rspp-datore-di-lavoro-livello-5',
        'rspp-datore-di-lavoro-livello-6'
      ]
    },

    'livello-2': {
      titolo: 'Corso RSPP Datore di Lavoro – Modulo 1: Agricoltura, Silvicoltura e Zootecnia',
      durataOre: 16,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Aggiornamento tramite corso dedicato (8 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Modulo 1 - Agricoltura, Silvicoltura e Zootecnia, della durata di 16 ore, è il modulo integrativo settoriale che, abbinato al Modulo Comune di 8 ore, permette al datore di lavoro di un'azienda agricola, forestale o zootecnica di conseguire l'abilitazione a svolgere direttamente i compiti di RSPP, ai sensi dell'art. 34 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il comparto agricolo, silvicolo e zootecnico presenta rischi specifici legati all'ambiente di lavoro - serre, campi, boschi, allevamenti - e all'uso di macchine agricole e attrezzature che possono causare ribaltamenti o schiacciamenti. A questo si aggiungono l'esposizione a sostanze pericolose, agenti biologici, il rischio di caduta dall'alto e la movimentazione di carichi, tipici del lavoro agricolo e forestale.

Rispetto agli altri moduli integrativi - Pesca, Costruzioni, Chimico-Petrolchimico - questo modulo si concentra sull'analisi degli infortuni tipici del comparto agricolo e sulla normativa tecnica per strutture e impianti rurali, oltre che sulla gestione di ambienti confinati o sospetti di inquinamento presenti in stalle, silos e depositi agricoli.

Il modulo è disponibile in aula o in videoconferenza; è possibile organizzarlo anche direttamente in azienda. Per completare il percorso di abilitazione è necessario aver frequentato, o frequentare in abbinamento, anche il Modulo Comune di 8 ore.`,

      aChiERivolto: [
        'Datori di lavoro di aziende agricole che intendono ricoprire il ruolo di RSPP',
        'Titolari di aziende di silvicoltura e gestione forestale',
        'Datori di lavoro di allevamenti e aziende zootecniche',
        'Imprenditori agricoli che devono completare il percorso con il Modulo Comune'
      ],

      cosaImparerai: [
        'Analizzare gli infortuni e le malattie professionali del comparto',
        'Valutare l\'organizzazione in serre, campi e boschi',
        'Applicare la normativa tecnica per strutture e impianti agricoli',
        'Riconoscere i rischi legati a macchine e attrezzature agricole, ribaltamento e schiacciamento',
        'Gestire l\'esposizione a sostanze pericolose e agenti biologici',
        'Valutare i rischi da ambienti confinati',
        'Applicare misure di prevenzione incendio, emergenza e caduta dall\'alto',
        'Utilizzare tecniche di movimentazione dei carichi agricoli'
      ],

      faq: [
        { domanda: 'Basta il Modulo 1 Agricoltura per diventare RSPP della mia azienda agricola?', risposta: 'No, va sempre abbinato al Modulo Comune di 8 ore.' },
        { domanda: 'Quanto dura il Modulo 1 Agricoltura, Silvicoltura e Zootecnia?', risposta: '16 ore teoriche su rischi e prevenzione del comparto agricolo, forestale e zootecnico.' },
        { domanda: 'Questo modulo è adatto anche per aziende di allevamento?', risposta: 'Sì, copre agricoltura, silvicoltura e zootecnia nel suo complesso.' },
        { domanda: 'Il modulo si può fare in videoconferenza?', risposta: 'Sì, aula o videoconferenza sincrona. Non è disponibile la FAD.' },
        { domanda: 'Che differenza c\'è tra questo modulo e quello per Costruzioni o Chimico-Petrolchimico?', risposta: 'Questo si concentra su agricoltura, silvicoltura e zootecnia; gli altri su pesca, cantieri edili e industria chimica.' }
      ],

      moduli: [
        { titolo: 'ANALISI DEGLI INFORTUNI E ORGANIZZAZIONE DEL COMPARTO', durataOre: 8, argomenti: ['Infortuni e malattie professionali del settore', 'Organizzazione in serre, campi e boschi', 'Normativa tecnica per strutture e impianti rurali'] },
        { titolo: 'RISCHI SPECIFICI E PREVENZIONE', durataOre: 8, argomenti: ['Macchine e attrezzature agricole: ribaltamento e schiacciamento', 'Sostanze pericolose e agenti biologici', 'Ambienti confinati (stalle, silos, depositi)', 'Prevenzione incendio, emergenza e caduta dall\'alto', 'Movimentazione dei carichi'] }
      ],

      corsiCorrelati: [
        'rspp-datore-di-lavoro-livello-1',
        'rspp-datore-di-lavoro-livello-3',
        'rspp-datore-di-lavoro-livello-4',
        'rspp-datore-di-lavoro-livello-5',
        'rspp-datore-di-lavoro-livello-6'
      ]
    },

    'livello-3': {
      titolo: 'Corso RSPP Datore di Lavoro – Modulo 2: Pesca',
      durataOre: 12,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Aggiornamento tramite corso dedicato (8 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 180,

      descrizione: `Il Modulo 2 - Pesca, della durata di 12 ore, è il modulo integrativo settoriale che, abbinato al Modulo Comune di 8 ore, permette al datore di lavoro di un'impresa di pesca di conseguire l'abilitazione a svolgere direttamente i compiti di RSPP, ai sensi dell'art. 34 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il settore della pesca presenta rischi peculiari legati all'ambiente di lavoro a bordo delle imbarcazioni: cadute dall'alto, a bordo e fuori bordo, uso di macchine e attrezzature specifiche, esposizione a sostanze pericolose e agenti biologici, e in alcuni casi il rischio legato ad atmosfere iperbariche e attività subacquee. Sono rischi distinti da quelli tipici degli altri comparti coperti dagli altri moduli integrativi.

Rispetto al Modulo 1 (Agricoltura) o al Modulo 3 (Costruzioni), questo modulo dedica particolare attenzione alla legislazione specifica di riferimento per il settore ittico e alla gestione dell'emergenza in un contesto marittimo, dove le procedure di soccorso e le condizioni ambientali richiedono un approccio differente rispetto al lavoro su terraferma.

Il modulo è disponibile in aula o in videoconferenza; è possibile organizzarlo anche direttamente per gruppi di imprese del settore. Per completare il percorso di abilitazione è necessario aver frequentato, o frequentare in abbinamento, anche il Modulo Comune di 8 ore.`,

      aChiERivolto: [
        'Datori di lavoro di imprese di pesca che intendono ricoprire il ruolo di RSPP',
        'Armatori e titolari di imbarcazioni di pesca professionale',
        'Titolari di cooperative e consorzi ittici',
        'Imprenditori del settore pesca che devono completare il percorso con il Modulo Comune'
      ],

      cosaImparerai: [
        'Analizzare gli infortuni e le malattie del comparto ittico',
        'Applicare la legislazione specifica per le imprese ittiche',
        'Valutare l\'organizzazione e gli ambienti di lavoro a bordo',
        'Riconoscere i rischi legati a macchine e attrezzature della pesca professionale',
        'Gestire l\'esposizione a sostanze pericolose e agenti biologici del settore',
        'Valutare i rischi da ambienti confinati a bordo',
        'Prevenire le cadute dall\'alto, a bordo e fuori bordo',
        'Riconoscere i rischi legati ad atmosfere iperbariche e attività subacquee'
      ],

      faq: [
        { domanda: 'Basta il Modulo 2 Pesca per diventare RSPP della mia impresa?', risposta: 'No, va sempre abbinato al Modulo Comune di 8 ore.' },
        { domanda: 'Quanto dura il Modulo 2 Pesca?', risposta: '12 ore teoriche su rischi e prevenzione del settore pesca.' },
        { domanda: 'Questo modulo copre anche i rischi legati alle immersioni subacquee?', risposta: 'Sì, include cenni su atmosfere iperbariche e attività subacquee, oltre alla vita a bordo.' },
        { domanda: 'Il modulo si può fare in videoconferenza?', risposta: 'Sì, aula o videoconferenza sincrona. Non è disponibile la FAD.' },
        { domanda: 'Che differenza c\'è tra questo modulo e quello per Agricoltura o Costruzioni?', risposta: 'Questo si concentra sulla pesca professionale e i rischi a bordo; gli altri su agricoltura, cantieri e chimica.' }
      ],

      moduli: [
        { titolo: 'LEGISLAZIONE E ORGANIZZAZIONE DEL SETTORE ITTICO', durataOre: 6, argomenti: ['Infortuni e malattie del comparto ittico', 'Legislazione specifica per le imprese di pesca', 'Organizzazione e ambienti di lavoro a bordo'] },
        { titolo: 'RISCHI SPECIFICI E GESTIONE DELL\'EMERGENZA A BORDO', durataOre: 6, argomenti: ['Macchine e attrezzature della pesca professionale', 'Sostanze pericolose e agenti biologici', 'Ambienti confinati a bordo', 'Cadute dall\'alto, a bordo e fuori bordo', 'Atmosfere iperbariche e attività subacquee', 'Gestione dell\'emergenza in contesto marittimo'] }
      ],

      corsiCorrelati: [
        'rspp-datore-di-lavoro-livello-1',
        'rspp-datore-di-lavoro-livello-2',
        'rspp-datore-di-lavoro-livello-4',
        'rspp-datore-di-lavoro-livello-5',
        'rspp-datore-di-lavoro-livello-6'
      ]
    },

    'livello-4': {
      titolo: 'Corso RSPP Datore di Lavoro – Modulo 3: Costruzioni',
      durataOre: 16,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Aggiornamento tramite corso dedicato (8 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Modulo 3 - Costruzioni, della durata di 16 ore, è il modulo integrativo settoriale che, abbinato al Modulo Comune di 8 ore, permette al datore di lavoro di un'impresa edile di conseguire l'abilitazione a svolgere direttamente i compiti di RSPP, ai sensi dell'art. 34 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il settore delle costruzioni è tra i comparti a più alto rischio infortunistico, per la presenza di cantieri temporanei, opere provvisionali, lavori in quota, scavi e demolizioni. Il modulo affronta in modo approfondito i soggetti e gli obblighi previsti dal Titolo IV, Capo I del D.Lgs 81/2008, dedicato proprio ai cantieri temporanei o mobili, oltre alla redazione e all'analisi del Piano Operativo di Sicurezza (POS).

Rispetto agli altri moduli integrativi - Agricoltura, Pesca, Chimico-Petrolchimico - questo modulo dedica ampio spazio a temi specifici del cantiere: cadute dall'alto e opere provvisionali, lavori di demolizione e scavo, impianti elettrici e illuminazione di cantiere, attività su sedi stradali ed esempi pratici di analisi di un POS.

Il modulo è disponibile in aula o in videoconferenza; è possibile organizzarlo anche direttamente per gruppi di imprese edili. Per completare il percorso di abilitazione è necessario aver frequentato, o frequentare in abbinamento, anche il Modulo Comune di 8 ore.`,

      aChiERivolto: [
        'Datori di lavoro di imprese edili che intendono ricoprire il ruolo di RSPP',
        'Titolari di imprese di costruzioni e ristrutturazioni',
        'Piccoli imprenditori edili che operano come impresa affidataria o esecutrice',
        'Imprenditori del settore costruzioni che devono completare il percorso con il Modulo Comune'
      ],

      cosaImparerai: [
        'Riconoscere i soggetti del Titolo IV, Capo I del D.Lgs 81/2008, i loro obblighi e responsabilità',
        'Analizzare gli infortuni e le malattie del settore edile',
        'Organizzare tecniche, fasi e aree di cantiere',
        'Applicare le misure generali di tutela previste dall\'art. 95',
        'Redigere e analizzare un Piano Operativo di Sicurezza (POS)',
        'Prevenire i rischi di caduta dall\'alto e di opere provvisionali',
        'Gestire i rischi di demolizione, scavo e impianti elettrici di cantiere',
        'Selezionare DPC e DPI in cantiere'
      ],

      faq: [
        { domanda: 'Basta il Modulo 3 Costruzioni per diventare RSPP dell\'impresa edile?', risposta: 'No, va sempre abbinato al Modulo Comune di 8 ore.' },
        { domanda: 'Quanto dura il Modulo 3 Costruzioni?', risposta: '16 ore teoriche su rischi e prevenzione dei cantieri temporanei o mobili.' },
        { domanda: 'Il modulo tratta anche la redazione del POS?', risposta: 'Sì, include esempi pratici e analisi del Piano Operativo di Sicurezza (POS).' },
        { domanda: 'Il modulo si può fare in videoconferenza?', risposta: 'Sì, aula o videoconferenza sincrona. Non è disponibile la FAD.' },
        { domanda: 'Che differenza c\'è tra questo modulo e quello per Agricoltura o Chimico-Petrolchimico?', risposta: 'Questo si concentra sui cantieri edili e le opere provvisionali; gli altri su agricoltura, pesca e industria chimica.' }
      ],

      moduli: [
        { titolo: 'NORMATIVA CANTIERI E ORGANIZZAZIONE', durataOre: 8, argomenti: ['Soggetti Titolo IV Capo I D.Lgs 81/2008', 'Infortuni e malattie del settore edile', 'Tecniche, fasi e aree di cantiere', 'Misure generali di tutela (art. 95)'] },
        { titolo: 'RISCHI DI CANTIERE E POS', durataOre: 8, argomenti: ['Redazione e analisi del Piano Operativo di Sicurezza (POS)', 'Cadute dall\'alto e opere provvisionali', 'Demolizione e scavo', 'Impianti elettrici e illuminazione di cantiere', 'Attività su sedi stradali'] }
      ],

      corsiCorrelati: [
        'rspp-datore-di-lavoro-livello-1',
        'rspp-datore-di-lavoro-livello-2',
        'rspp-datore-di-lavoro-livello-3',
        'rspp-datore-di-lavoro-livello-5',
        'rspp-datore-di-lavoro-livello-6'
      ]
    },

    'livello-5': {
      titolo: 'Corso RSPP Datore di Lavoro – Modulo 4: Chimico-Petrolchimico',
      durataOre: 16,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Aggiornamento tramite corso dedicato (8 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Modulo 4 - Chimico-Petrolchimico, della durata di 16 ore, è il modulo integrativo settoriale che, abbinato al Modulo Comune di 8 ore, permette al datore di lavoro di un'azienda chimica o petrolchimica di conseguire l'abilitazione a svolgere direttamente i compiti di RSPP, ai sensi dell'art. 34 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

Il settore chimico e petrolchimico presenta rischi di elevata complessità, legati al processo produttivo, agli impianti e alla presenza di sostanze pericolose. Il modulo affronta anche cenni sulle attività a rischio di incidente rilevante e sulle industrie insalubri, temi che richiedono una preparazione specifica non coperta dagli altri moduli integrativi.

Rispetto al Modulo 1 (Agricoltura), al Modulo 2 (Pesca) o al Modulo 3 (Costruzioni), questo modulo si concentra sulla manutenzione degli impianti e sulla gestione dei fornitori, sui rischi di incendio ed esplosione tipici degli ambienti industriali chimici, sulla gestione di ambienti confinati o sospetti di inquinamento e sulla gestione dei rifiuti industriali.

Il modulo è disponibile in aula o in videoconferenza; è possibile organizzarlo anche direttamente per gruppi di imprese del settore. Per completare il percorso di abilitazione è necessario aver frequentato, o frequentare in abbinamento, anche il Modulo Comune di 8 ore.`,

      aChiERivolto: [
        'Datori di lavoro di aziende chimiche o petrolchimiche che intendono ricoprire il ruolo di RSPP',
        'Titolari di stabilimenti di produzione o trasformazione chimica',
        'Responsabili di impianti a rischio di incidente rilevante',
        'Imprenditori del settore che devono completare il percorso con il Modulo Comune'
      ],

      cosaImparerai: [
        'Analizzare gli infortuni e le malattie del comparto',
        'Valutare il processo, l\'organizzazione e gli ambienti industriali',
        'Applicare la normativa tecnica per gli impianti chimici',
        'Riconoscere le attività a rischio di incidente rilevante e le industrie insalubri',
        'Gestire i rischi legati a impianti, manutenzione e fornitori',
        'Gestire l\'esposizione a sostanze pericolose, incendi ed esplosioni',
        'Valutare i rischi da ambienti confinati',
        'Applicare le procedure per la gestione dei rifiuti industriali'
      ],

      faq: [
        { domanda: 'Basta il Modulo 4 Chimico-Petrolchimico per diventare RSPP?', risposta: 'No, va abbinato al Modulo Comune di 8 ore per completare l\'abilitazione.' },
        { domanda: 'Quanto dura il Modulo 4 Chimico-Petrolchimico?', risposta: '16 ore teoriche su rischi e prevenzione specifici del comparto.' },
        { domanda: 'Il modulo tratta anche il rischio di incidente rilevante?', risposta: 'Sì, include cenni su rischio di incidente rilevante e industrie insalubri.' },
        { domanda: 'Il modulo si può fare in videoconferenza?', risposta: 'Sì, aula o videoconferenza sincrona. Non è disponibile la FAD.' },
        { domanda: 'Che differenza c\'è tra questo modulo e quello per Costruzioni o Agricoltura?', risposta: 'Questo si concentra su impianti e processi chimico-industriali; gli altri su cantieri edili, agricoltura e pesca.' }
      ],

      moduli: [
        { titolo: 'PROCESSO PRODUTTIVO E NORMATIVA TECNICA', durataOre: 8, argomenti: ['Infortuni e malattie del comparto', 'Processo, organizzazione e ambienti industriali', 'Normativa tecnica impianti chimici', 'Attività a rischio di incidente rilevante e industrie insalubri'] },
        { titolo: 'RISCHI DI IMPIANTO E GESTIONE OPERATIVA', durataOre: 8, argomenti: ['Manutenzione degli impianti e gestione dei fornitori', 'Rischi di incendio ed esplosione', 'Ambienti confinati o sospetti di inquinamento', 'Gestione dei rifiuti industriali'] }
      ],

      corsiCorrelati: [
        'rspp-datore-di-lavoro-livello-1',
        'rspp-datore-di-lavoro-livello-2',
        'rspp-datore-di-lavoro-livello-3',
        'rspp-datore-di-lavoro-livello-4',
        'rspp-datore-di-lavoro-livello-6'
      ]
    }
  }
};
