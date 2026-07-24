
// Contenuti editoriali per famiglia "Antincendio" - corsi base (Livello 1/2/3)
// NOTA: contiene solo le varianti "corso nuovo", non le versioni "aggiornamento"
// (per quelle serve materiale editoriale a parte, vedi TODO in fondo al file)

module.exports = {
  antincendio: {
    'livello-1': {
      titolo: 'Corso Addetto Antincendio Livello 1 (Ex Rischio Basso)',
      durataOre: 4,
      modalita: ['Aula', 'FAD', 'Videoconferenza'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato Antincendio valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 90,

      descrizione: `Il Corso Addetto Antincendio Livello 1 è il percorso formativo obbligatorio per i lavoratori designati alla prevenzione incendi, lotta antincendio e gestione delle emergenze nelle attività classificate a rischio basso secondo il D.M. 02/09/2021.

Il D.Lgs. 81/08, all'art. 37 comma 9, obbliga il datore di lavoro a designare uno o più lavoratori incaricati della gestione delle emergenze e a garantire loro una formazione adeguata e specifica. Il corso di Livello 1, della durata di 4 ore, è riservato alle attività a rischio incendio basso e rappresenta il livello base del percorso antincendio previsto dalla normativa vigente.

I contenuti sono strutturati per essere applicabili in aziende di qualsiasi settore produttivo e coprono i principi fondamentali della combustione, le misure di prevenzione e le procedure di evacuazione in caso di pericolo grave e immediato. Al termine del corso viene rilasciato un attestato di partecipazione valido in tutta Italia, con obbligo di aggiornamento ogni 5 anni.

Il corso è erogabile in tre modalità: in aula presso la sede Alètheia di Vittoria (RG), in FAD per la parte teorica e di aggiornamento, in videoconferenza per la sola parte teorica. Raggiunto un minimo di 15 partecipanti, è possibile organizzare il corso direttamente presso la sede aziendale.`,

      aChiERivolto: [
        'Lavoratori designati dal datore di lavoro come addetti antincendio nelle attività a rischio basso',
        'Datori di lavoro che intendono ricoprire personalmente il ruolo di addetto antincendio',
        'Lavoratori che devono rinnovare la designazione in attività classificate a rischio basso'
      ],

      cosaImparerai: [
        'Riconoscere le principali cause di un incendio e i rischi per le persone',
        'Applicare i principi base della combustione e identificare le sostanze estinguenti adatte',
        'Utilizzare correttamente estintori portatili, naspi e idranti',
        "Gestire l'evacuazione del luogo di lavoro in caso di emergenza",
        'Contattare i soccorsi con le informazioni corrette',
        'Conoscere i principali accorgimenti per prevenire gli incendi in azienda'
      ],

      faq: [
        {
          domanda: 'Il corso antincendio Livello 1 è obbligatorio per tutte le aziende?',
          risposta: 'No. Il corso antincendio Livello 1 è obbligatorio per le attività classificate a rischio incendio basso secondo la valutazione dei rischi prevista dal D.M. 02/09/2021. Per attività a rischio medio o alto sono previsti rispettivamente il Livello 2 (8 ore) e il Livello 3 (16 ore).'
        },
        {
          domanda: 'Ogni quanto va rinnovato il corso antincendio?',
          risposta: "L'aggiornamento è obbligatorio ogni 5 anni. La mancata frequenza dell'aggiornamento comporta la decadenza della designazione del lavoratore come addetto antincendio."
        },
        {
          domanda: "L'attestato antincendio è valido in tutta Italia?",
          risposta: "Sì. L'attestato rilasciato al termine del corso è valido su tutto il territorio nazionale, in conformità con il D.M. 02/09/2021 e il D.Lgs. 81/08."
        },
        {
          domanda: 'È possibile svolgere il corso in azienda?',
          risposta: 'Sì. Raggiunto un numero minimo di 15 partecipanti, Alètheia può organizzare il corso direttamente presso la sede aziendale. Contattaci per un preventivo.'
        },
        {
          domanda: 'Il corso può essere svolto in modalità FAD o videoconferenza?',
          risposta: "Il corso in FAD è disponibile per la parte teorica e per l'aggiornamento. La videoconferenza è prevista solo per la parte teorica. La parte pratica deve essere svolta obbligatoriamente in presenza."
        }
      ],

      moduli: [
        {
          titolo: "MODULO 1 - L'INCENDIO E LA PREVENZIONE INCENDI",
          durataOre: 1,
          argomenti: [
            'Principi della combustione',
            'Prodotti della combustione',
            "Le sostanze estinguenti in relazione al tipo di incendio",
            "Effetti dell'incendio sull'uomo",
            'Divieti e limitazioni di esercizio',
            'Misure comportamentali'
          ]
        },
        {
          titolo: 'MODULO 2 - PROTEZIONE ANTINCENDIO E PROCEDURE DA ADOTTARE IN CASO DI INCENDIO',
          durataOre: 1,
          argomenti: [
            'Principali misure di protezione antincendio',
            'Evacuazione in caso di incendio',
            'Chiamata dei soccorsi'
          ]
        },
        {
          titolo: 'MODULO 3 ESERCITAZIONI PRATICHE',
          durataOre: 2,
          argomenti: [
            'Presa visione e chiarimenti sugli estintori portatili',
            "Esercitazioni sull'uso degli estintori portatili",
            "Presa visione del registro antincendio, chiarimenti ed esercitazione riguardante l'attività di sorveglianza"
          ]
        }
      ],

      corsiCorrelati: [
        'antincendio-livello-2',
        'antincendio-livello-3',
        'primo-soccorso-gruppo-b-c',
        'formazione-lavoratori',
        'rspp-datore-di-lavoro'
      ]
    },

    'livello-2': {
      titolo: 'Corso Addetto Antincendio Livello 2 (Ex Rischio Medio)',
      durataOre: 8,
      modalita: ['Aula', 'FAD', 'Videoconferenza'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato Antincendio valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 150,

      descrizione: `Il Corso Addetto Antincendio Livello 2 è il percorso formativo obbligatorio per i lavoratori designati alla prevenzione incendi, lotta antincendio e gestione delle emergenze nelle attività classificate a rischio medio secondo il D.M. 02/09/2021.

Rispetto al Corso Addetto Antincendio Livello 1, questo corso approfondisce in modo sostanziale le strategie antincendio previste dalla normativa vigente, dalla compartimentazione al controllo dei fumi, dalla rivelazione degli incendi alla gestione operativa delle emergenze complesse. Con una durata di 8 ore, il Corso Addetto Antincendio Livello 2 è progettato per formare addetti capaci di operare in contesti produttivi con un profilo di rischio medio, dove la padronanza delle procedure antincendio può fare la differenza.

Il corso è conforme al D.M. 02/09/2021 e al D.Lgs. 81/08, art. 37 comma 9. Al termine viene rilasciato un attestato valido in tutta Italia, con aggiornamento obbligatorio ogni 5 anni.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG), in FAD per la parte teorica e di aggiornamento, in videoconferenza per la sola parte teorica. Con un minimo di 15 partecipanti il corso può essere organizzato direttamente in azienda.`,

      aChiERivolto: [
        'Lavoratori designati come addetti antincendio in attività classificate a rischio medio',
        'Datori di lavoro che operano in contesti produttivi a rischio incendio medio',
        "Lavoratori in possesso dell'attestato Livello 1 che cambiano mansione o contesto lavorativo con rischio superiore",
        'Chi deve aggiornare una designazione precedente in attività ora classificate a rischio medio'
      ],

      cosaImparerai: [
        'Applicare le strategie antincendio previste dalla normativa per attività a rischio medio',
        "Gestire la compartimentazione, l'esodo e il controllo dei fumi in caso di incendio",
        'Utilizzare i sistemi di rivelazione, allarme e controllo degli incendi',
        'Operare con i sistemi di estinzione fissi e mobili presenti nelle attività a rischio medio',
        "Pianificare e coordinare la gestione dell'emergenza in esercizio e fuori esercizio",
        'Condurre attività di sorveglianza, controllo e manutenzione dei presidi antincendio'
      ],

      faq: [
        {
          domanda: 'Il corso antincendio Livello 1 è obbligatorio per tutte le aziende?',
          risposta: 'No. Il corso antincendio Livello 1 è obbligatorio per le attività classificate a rischio incendio basso secondo la valutazione dei rischi prevista dal D.M. 02/09/2021. Per attività a rischio medio o alto sono previsti rispettivamente il Livello 2 (8 ore) e il Livello 3 (16 ore).'
        },
        {
          domanda: 'Qual è la differenza tra il Livello 1 e il Livello 2?',
          risposta: "Il Livello 1 (4 ore) è riservato alle attività a rischio basso e copre i principi base della prevenzione incendi. Il Livello 2 (8 ore) è obbligatorio per le attività a rischio medio e approfondisce le strategie antincendio, la gestione operativa delle emergenze e l'uso dei sistemi di controllo e rivelazione."
        },
        {
          domanda: 'Come si determina se la mia azienda è a rischio medio?',
          risposta: "Il livello di rischio è determinato dalla valutazione dei rischi di incendio prevista dal D.M. 02/09/2021. In caso di dubbio, contattaci - il nostro team può supportarti nell'identificazione del corso corretto per la tua realtà aziendale."
        },
        {
          domanda: 'Chi ha già il Livello 1 deve rifare tutto il corso?',
          risposta: "Sì. Il Livello 2 è un corso autonomo e completo - non è un'integrazione del Livello 1. Chi opera in un'attività riclassificata a rischio medio deve frequentare l'intero percorso da 8 ore."
        },
        {
          domanda: "L'attestato è valido in tutta Italia?",
          risposta: "Sì. L'attestato rilasciato al termine del corso è valido su tutto il territorio nazionale, in conformità con il D.M. 02/09/2021 e il D.Lgs. 81/08."
        },
        {
          domanda: 'È possibile organizzare il corso in azienda?',
          risposta: "Sì, con un minimo di 15 partecipanti. Contattaci per organizzare un'aula direttamente presso la tua sede."
        }
      ],

      moduli: [
        {
          titolo: "MODULO 1 - L'INCENDIO E LA PREVENZIONE INCENDI",
          durataOre: 2,
          argomenti: [
            'Le sostanze estinguenti',
            'Il triangolo della combustione',
            'Le principali cause di un incendio',
            'I rischi per le persone in caso di incendio',
            'I principali accorgimenti e misure per prevenire gli incendi'
          ]
        },
        {
          titolo: 'MODULO 2 - STRATEGIA ANTINCENDIO (prima parte)',
          durataOre: 2,
          argomenti: [
            'Reazione al fuoco, resistenza al fuoco, compartimentazione, esodo',
            "Controllo dell'incendio",
            'Rivelazione ed allarme',
            'Controllo di fumi e calore',
            'Operatività antincendio',
            'Sicurezza degli impianti tecnologici e di servizio'
          ]
        },
        {
          titolo: 'MODULO 3 - STRATEGIA ANTINCENDIO (seconda parte)',
          durataOre: 1,
          argomenti: [
            "Gestione della sicurezza antincendio in esercizio ed in emergenza, con approfondimenti su controlli e manutenzione e sulla pianificazione di emergenza"
          ]
        },
        {
          titolo: 'ESERCITAZIONI PRATICHE',
          durataOre: 3,
          argomenti: [
            'Presa visione e chiarimenti sulle attrezzature ed impianti di controllo ed estinzione degli incendi più diffusi',
            'Presa visione e chiarimenti sui dispositivi di protezione individuale',
            "Esercitazioni sull'uso degli estintori portatili e modalità di utilizzo di naspi e idranti",
            "Presa visione del registro antincendio, chiarimenti ed esercitazione riguardante l'attività di sorveglianza"
          ]
        }
      ],

      corsiCorrelati: [
        'antincendio-livello-1',
        'antincendio-livello-3',
        'primo-soccorso-gruppo-b-c',
        'formazione-lavoratori',
        'rspp-datore-di-lavoro'
      ]
    },

    'livello-3': {
      titolo: 'Corso Addetto Antincendio Livello 3 (Ex Rischio Alto)',
      durataOre: 16, // CORRETTO: il docx originale riportava erroneamente "8 ore" nella scheda tecnica
      modalita: ['Aula', 'FAD', 'Videoconferenza'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato Antincendio valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Corso Addetto Antincendio Livello 3 è il percorso formativo obbligatorio per i lavoratori designati alla prevenzione incendi, lotta antincendio e gestione delle emergenze nelle attività classificate a rischio alto secondo il D.M. 02/09/2021.

È il livello più completo e articolato del percorso antincendio previsto dalla normativa, 16 ore di formazione che coprono in profondità teoria, strategie operative e simulazioni pratiche. Il Livello 3 è pensato per contesti produttivi ad alto rischio incendio, dove la competenza dell'addetto non è solo un obbligo di legge ma un presidio reale di sicurezza per le persone e per l'azienda.

Il corso è conforme al D.M. 02/09/2021 e al D.Lgs. 81/08, art. 37 comma 9. Forma addetti in grado di gestire autonomamente situazioni di emergenza complesse, coordinare l'evacuazione, operare con sistemi antincendio avanzati e interfacciarsi con i Vigili del Fuoco in caso di intervento.

Al termine viene rilasciato un attestato valido in tutta Italia. L'aggiornamento è obbligatorio ogni 5 anni.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti. La parte teorica è disponibile anche in videoconferenza. La parte pratica deve essere svolta obbligatoriamente in presenza.`,

      aChiERivolto: [
        'Lavoratori designati come addetti antincendio in attività classificate a rischio alto dal D.M. 02/09/2021',
        'Addetti che operano in contesti come depositi di materiali infiammabili, industrie chimiche, strutture ricettive di grandi dimensioni, ospedali, scuole e luoghi di pubblico spettacolo',
        'Datori di lavoro che ricoprono personalmente il ruolo di addetto antincendio in attività ad alto rischio',
        "Lavoratori in possesso dell'attestato Livello 2 che cambiano mansione o contesto lavorativo con rischio superiore"
      ],

      cosaImparerai: [
        'Analizzare i rischi specifici di incendio nelle attività ad alto rischio e applicare le contromisure appropriate',
        'Gestire le strategie antincendio complesse previste per attività classificate a rischio alto',
        'Operare con sistemi di rivelazione, allarme, controllo fumi e impianti fissi di estinzione',
        "Coordinare l'evacuazione in situazioni di emergenza complessa con più variabili",
        'Interfacciarsi correttamente con i Vigili del Fuoco durante un intervento',
        'Pianificare, aggiornare e gestire il piano di emergenza aziendale',
        'Condurre attività di sorveglianza, controllo e manutenzione dei presidi antincendio avanzati',
        "Gestire la comunicazione interna durante l'emergenza e il coordinamento dei colleghi"
      ],

      faq: [
        {
          domanda: 'Quali attività rientrano nella categoria rischio alto?',
          risposta: 'Secondo il D.M. 02/09/2021 rientrano nel rischio alto le attività che per natura, quantità di materiali infiammabili o numero di persone presenti presentano un rischio di incendio elevato. Esempi: depositi di liquidi infiammabili, industrie chimiche, strutture ricettive con oltre 25 posti letto, ospedali, scuole con oltre 100 persone, luoghi di pubblico spettacolo. In caso di dubbio è necessario verificare la propria valutazione del rischio incendio.'
        },
        {
          domanda: 'Chi ha il Livello 2 deve rifare il corso da zero?',
          risposta: "Sì. Il Livello 3 è un percorso autonomo e completo - non è un'integrazione del Livello 2. Chi opera in un'attività riclassificata a rischio alto deve frequentare l'intero corso da 16 ore."
        },
        {
          domanda: 'Ogni quanto va rinnovato il Corso Antincendio Livello 3?',
          risposta: "L'aggiornamento è obbligatorio ogni 5 anni. Per il Livello 3 la durata dell'aggiornamento è di 8 ore. La mancata frequenza comporta la decadenza della designazione."
        },
        {
          domanda: 'È possibile organizzare il corso direttamente in azienda?',
          risposta: "Sì, con un minimo di 15 partecipanti. Contattaci per organizzare l'aula presso la tua sede e ricevere un preventivo personalizzato."
        }
      ],

      moduli: [
        {
          titolo: "MODULO 1 - L'INCENDIO E LA PREVENZIONE INCENDI",
          durataOre: 4,
          argomenti: [
            'Le principali cause di incendio in relazione allo specifico ambiente di lavoro',
            'Le sostanze estinguenti',
            "I rischi alle persone ed all'ambiente",
            'Specifiche misure di prevenzione incendi',
            'Accorgimenti comportamentali per prevenire gli incendi',
            "L'importanza del controllo degli ambienti di lavoro",
            "L'importanza delle verifiche e delle manutenzioni sui presidi antincendio"
          ]
        },
        {
          titolo: 'MODULO 2 - STRATEGIA ANTINCENDIO (prima parte)',
          durataOre: 4,
          argomenti: [
            'Le aree a rischio specifico',
            'La protezione contro le esplosioni',
            'Reazione al fuoco',
            'Resistenza al fuoco',
            'Compartimentazione',
            'Esodo',
            'Rivelazione ed allarme',
            'Controllo di fumo e calore'
          ]
        },
        {
          titolo: 'MODULO 3 - STRATEGIA ANTINCENDIO (seconda parte)',
          durataOre: 4,
          argomenti: [
            "Controllo dell'incendio",
            'Operatività antincendio',
            'Gestione della sicurezza antincendio in esercizio ed in emergenza',
            'Controlli e manutenzione',
            'Il piano di emergenza: procedure di emergenza, di allarme, di evacuazione'
          ]
        },
        {
          titolo: 'MODULO 4 - ESERCITAZIONI PRATICHE',
          durataOre: 4,
          argomenti: [
            'Presa visione e chiarimenti sulle attrezzature ed impianti di controllo ed estinzione degli incendi più diffusi',
            'Presa visione sui dispositivi di protezione individuale (tra cui maschere, autoprotettore, tute)',
            "Esercitazioni sull'uso delle attrezzature di controllo ed estinzione degli incendi",
            "Presa visione del registro antincendio, chiarimenti ed esercitazione riguardante l'attività di sorveglianza"
          ]
        }
      ],

      corsiCorrelati: [
        'antincendio-livello-1',
        'antincendio-livello-2', // CORRETTO: il docx originale diceva "ex rischio alto", riferendosi erroneamente a sé stesso
        'primo-soccorso-gruppo-b-c',
        'formazione-lavoratori'
      ]
    }
  }
};

// TODO - gap di contenuto, da colmare separatamente:
// 1. Manca il contenuto editoriale per le varianti "aggiornamento" (Livello 1/2/3).
//    Il prezzo esiste già in coursesDetails.priceVariants, ma descrizione/FAQ/moduli
//    per l'aggiornamento non sono presenti in questi 3 docx.
// 2. Sezione "TAB 3 - Docente" presente nei docx solo come placeholder
//    ("Vuoi iscriverti o hai bisogno di informazioni? Contattaci su WhatsApp"),
//    non contiene dati reali sul docente - verificare se va popolata o rimossa.
// 3. "Luogo del corso" (mappa) menzionato nei docx ma non modellato qui:
//    serve un campo indirizzo/coordinate per i corsi "in aula".
