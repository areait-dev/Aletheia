
// Contenuti editoriali per l'unica famiglia "Trattoristi" (trattori-agricoli-o-forestali), che raccoglie
// in una sola pagina con switch i 3 corsi base:
// - Ruote (8 ore) -> 'livello-1'
// - Cingoli (8 ore) -> 'livello-2'
// - Ruote e Cingoli / combinato (13 ore) -> 'livello-3'
// La 4a variante (Aggiornamento, tipo 'aggiornamento') vive in trattori-agricoli-aggiornamento-content.js
// sotto la chiave 'livello-4' - le chiavi sono posizionali (stesso ordine delle 4 voci raw in
// data/coursesRaw.js), non semantiche, esattamente come editorialLivelloKey in pages/all-courses/[slug].js.

module.exports = {
  'trattori-agricoli-o-forestali': {
    'livello-1': {
      titolo: 'Corso Addetti alla Conduzione di Trattori Agricoli o Forestali a Ruote',
      durataOre: 8,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 180,

      descrizione: `Il Corso per Addetti alla Conduzione di Trattori Agricoli o Forestali a Ruote, della durata di 8 ore, è obbligatorio ai sensi dell'art. 73 e dell'allegato VIII del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, che disciplina la formazione per la conduzione in sicurezza delle attrezzature semoventi con operatore a bordo.

Il trattore a ruote è il mezzo più diffuso nelle aziende agricole italiane: viene impiegato per l'aratura, la semina, il trasporto di attrezzature agricole e la movimentazione di carichi in campo aperto. Proprio per la sua diffusione e per i rischi legati al ribaltamento, agli agganci con macchine operatrici e alla circolazione su terreni irregolari, la normativa impone una formazione specifica a chiunque debba condurlo nell'ambito della propria attività lavorativa.

Il corso si differenzia da quello per trattori a cingoli per il tipo di mezzo e di terreno trattato: qui l'attenzione è rivolta alla guida su terreni pianeggianti e in campo aperto, alla gestione della viabilità agricola e al collegamento con le macchine operatrici trainate. Per chi opera anche con trattori a cingoli, o su terreni collinari e forestali, è disponibile il corso dedicato ai trattori a cingoli oppure il corso combinato di 13 ore che copre entrambe le categorie.

Il percorso formativo prevede un modulo giuridico-normativo che inquadra responsabilità e obblighi dell'operatore, un modulo tecnico su categorie di trattori, componenti, dispositivi di comando e sicurezza, e un modulo pratico con esercitazioni di guida reale su terreno e in campo.

Il corso si svolge in aula e in campo presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda utilizzando i mezzi già in dotazione al cliente.`,

      aChiERivolto: [
        'Addetti agricoli su ruote',
        'Operatori di aziende agricole e cooperative che utilizzano macchine trainate',
        'Lavoratori forestali',
        'Neoassunti',
        'Datori di lavoro agricoli che devono adeguarsi al D.Lgs 81/2008'
      ],

      cosaImparerai: [
        'Conoscere categorie e componenti dei trattori a ruote',
        'Utilizzare correttamente i dispositivi di comando e sicurezza',
        'Eseguire i controlli pre-utilizzo',
        'Pianificare le operazioni in campo',
        'Utilizzare correttamente i DPI',
        'Avviare, spostare e collegare macchine trainate',
        'Guidare in sicurezza su terreno pianeggiante',
        'Eseguire la messa a riposo del mezzo'
      ],

      faq: [
        {
          domanda: 'Quanto dura il corso?',
          risposta: '8 ore complessive, suddivise tra modulo giuridico, modulo tecnico e modulo pratico.'
        },
        {
          domanda: 'Qual è la differenza con il corso a cingoli?',
          risposta: 'La durata è identica (8 ore), ma il corso a ruote si concentra sulla guida in terreno pianeggiante e in campo aperto, mentre quello a cingoli è mirato a pendenze e stabilità su terreni irregolari.'
        },
        {
          domanda: 'Conduco entrambi i tipi di mezzo, cosa mi conviene fare?',
          risposta: 'In questo caso è consigliabile valutare il corso combinato di 13 ore, che rilascia l\'abilitazione su entrambe le categorie in un unico percorso.'
        },
        {
          domanda: 'Ha una scadenza?',
          risposta: "Sì, l'attestato richiede un rinnovo tramite corso di aggiornamento periodico."
        },
        {
          domanda: 'È possibile svolgere il corso in azienda?',
          risposta: 'Sì, la parte teorica può essere svolta in sede e la parte pratica con i mezzi del cliente.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO GIURIDICO-NORMATIVO',
          durataOre: 1,
          argomenti: [
            'Presentazione del corso e obiettivi',
            'Normativa di riferimento e responsabilità dell\'operatore',
            'Statistiche degli infortuni sul lavoro legati all\'uso dei trattori'
          ]
        },
        {
          titolo: 'MODULO TECNICO',
          durataOre: 3,
          argomenti: [
            'Categorie e componenti dei trattori a ruote',
            'Dispositivi di comando e sicurezza',
            'Verifiche e controlli pre-utilizzo',
            'Rischi specifici e misure di prevenzione'
          ]
        },
        {
          titolo: 'MODULO PRATICO',
          durataOre: 4,
          argomenti: [
            'Esercitazioni reali di guida su percorso di prova',
            'Spostamento e manovre in campo aperto',
            'Aggancio e collegamento di macchine trainate',
            'Messa a riposo del mezzo'
          ]
        }
      ],

      // Ruote/Cingoli/Combinato/Aggiornamento sono switch sulla STESSA pagina (non pagine separate),
      // quindi qui va linkato solo un corso realmente esterno alla famiglia.
      corsiCorrelati: [
        'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
      ]
    },

    'livello-2': {
      titolo: 'Corso Addetti alla Conduzione di Trattori Agricoli o Forestali a Cingoli',
      durataOre: 8,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 180,

      descrizione: `Il Corso per Addetti alla Conduzione di Trattori Agricoli o Forestali a Cingoli, della durata di 8 ore, è obbligatorio ai sensi dell'art. 73 e dell'allegato VIII del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, che disciplina la formazione per la conduzione in sicurezza delle attrezzature semoventi con operatore a bordo.

Il trattore a cingoli viene impiegato prevalentemente in contesti forestali, collinari o montani, dove la maggiore aderenza al terreno e la stabilità su pendenze lo rendono più adatto rispetto al trattore a ruote. Proprio per l'utilizzo su terreni più impegnativi, i rischi di ribaltamento, scivolamento e perdita di controllo richiedono una preparazione specifica, distinta da quella prevista per i mezzi a ruote.

Il corso si differenzia da quello per trattori a ruote soprattutto nella parte pratica: qui le esercitazioni riguardano la guida su terreni in pendenza, la gestione della stabilità del mezzo su fondi irregolari e le manovre tipiche del lavoro forestale o su terreni collinari. Per chi opera anche con trattori a ruote, o su terreni misti, è disponibile il corso dedicato ai trattori a ruote oppure il corso combinato di 13 ore che copre entrambe le categorie.

Il percorso formativo prevede un modulo giuridico-normativo che inquadra responsabilità e obblighi dell'operatore, un modulo tecnico su categorie di trattori, componenti, dispositivi di comando e sicurezza, e un modulo pratico con esercitazioni di guida reale su terreno e in campo.

Il corso si svolge in aula e in campo presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda utilizzando i mezzi già in dotazione al cliente.`,

      aChiERivolto: [
        'Addetti agricoli e forestali che operano su pendenze o terreni collinari',
        'Operatori di aziende forestali',
        'Lavoratori agricoli che devono operare su terreni con stabilità specifica',
        'Neoassunti',
        'Datori di lavoro agricoli e forestali'
      ],

      cosaImparerai: [
        'Conoscere categorie e componenti strutturali dei trattori a cingoli',
        'Utilizzare correttamente i dispositivi di comando e sicurezza',
        'Eseguire i controlli pre-utilizzo',
        'Pianificare le operazioni su pendenze e terreni irregolari',
        'Gestire la stabilità del mezzo in guida collinare o forestale',
        'Eseguire manovre in sicurezza su piano',
        'Adottare precauzioni contro l\'uso non autorizzato',
        'Eseguire la messa a riposo del mezzo'
      ],

      faq: [
        {
          domanda: 'Quanto dura il corso?',
          risposta: '8 ore totali, suddivise tra modulo giuridico, modulo tecnico e modulo pratico.'
        },
        {
          domanda: 'Qual è la differenza con il corso a ruote?',
          risposta: 'La durata è identica (8 ore), ma il focus pratico è su pendenze, stabilità e contesti forestali anziché su campo aperto.'
        },
        {
          domanda: 'Conduco sia trattori a ruote sia a cingoli, cosa mi conviene fare?',
          risposta: 'È consigliabile optare per il corso combinato di 13 ore, che rilascia l\'abilitazione su entrambe le categorie in un unico percorso.'
        },
        {
          domanda: 'Ha una scadenza?',
          risposta: 'Sì, ha validità limitata con obbligo di rinnovo tramite corso di aggiornamento periodico.'
        },
        {
          domanda: 'È possibile svolgere il corso in azienda?',
          risposta: 'Sì, la parte teorica è personalizzabile e la parte pratica si svolge con i mezzi del cliente.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO GIURIDICO-NORMATIVO',
          durataOre: 1,
          argomenti: [
            'Presentazione del corso e obiettivi',
            'Normativa di riferimento e responsabilità dell\'operatore',
            'Statistiche degli infortuni sul lavoro legati all\'uso dei trattori'
          ]
        },
        {
          titolo: 'MODULO TECNICO',
          durataOre: 3,
          argomenti: [
            'Struttura e componenti dei trattori a cingoli',
            'Dispositivi di comando e sicurezza',
            'Verifiche e controlli pre-utilizzo',
            'Rischi specifici su terreni in pendenza'
          ]
        },
        {
          titolo: 'MODULO PRATICO',
          durataOre: 4,
          argomenti: [
            'Guida reale su pendenze',
            'Gestione della stabilità su fondi irregolari',
            'Manovre tipiche del lavoro forestale',
            'Messa a riposo del mezzo'
          ]
        }
      ],

      corsiCorrelati: [
        'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
      ]
    },

    'livello-3': {
      titolo: 'Corso Addetti alla Conduzione di Trattori Agricoli o Forestali a Ruote e a Cingoli',
      durataOre: 13,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 250,

      descrizione: `Il Corso per Addetti alla Conduzione di Trattori Agricoli o Forestali a Ruote e a Cingoli, della durata di 13 ore, è obbligatorio ai sensi dell'art. 73 e dell'allegato VIII del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, ed è pensato per chi deve conseguire l'abilitazione su entrambe le categorie di trattori in un unico percorso formativo.

Molte aziende agricole e forestali dispongono contemporaneamente di trattori a ruote, più adatti al lavoro in campo aperto, e di trattori a cingoli, impiegati su terreni in pendenza o su fondi irregolari tipici del contesto forestale e collinare. Per gli operatori che devono essere abilitati a condurre entrambi i mezzi, il corso combinato di 13 ore evita la necessità di frequentare due corsi separati da 8 ore ciascuno, offrendo un percorso più efficiente sia in termini di tempo sia di costo.

Rispetto ai corsi singoli, questo percorso dedica un modulo tecnico più esteso - 2 ore anziché le 3 ore suddivise nei corsi singoli - e due moduli pratici distinti: uno specifico per i trattori a cingoli, con esercitazioni su terreno in pendenza e gestione della stabilità, e uno specifico per i trattori a ruote, con esercitazioni di guida in campo aperto e collegamento a macchine operatrici. In questo modo l'operatore acquisisce competenze pratiche mirate su ciascuna tipologia di mezzo, senza sovrapposizioni superficiali.

Il corso si svolge in aula e in campo presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda utilizzando i trattori a ruote e a cingoli già in dotazione al cliente, per una formazione pratica calata sui mezzi realmente utilizzati.`,

      aChiERivolto: [
        'Addetti agricoli e forestali con parco macchine misto',
        'Operatori che lavorano su terreni misti (campo aperto e pendenze)',
        'Neoassunti versatili',
        'Datori di lavoro che vogliono ottimizzare la formazione del personale con un unico percorso'
      ],

      cosaImparerai: [
        'Conoscere componenti e categorie dei trattori a ruote e a cingoli',
        'Utilizzare i dispositivi di comando e sicurezza di entrambe le tipologie',
        'Eseguire i controlli pre-utilizzo su ruote e cingoli',
        'Avviare, spostare e collegare macchine operatrici',
        'Guidare in sicurezza in piano, in campo e su pendenza',
        'Gestire la stabilità dei trattori a cingoli',
        'Eseguire la messa a riposo del mezzo a fine utilizzo'
      ],

      faq: [
        {
          domanda: 'Perché scegliere il corso combinato?',
          risposta: 'Perché consente di ottenere l\'abilitazione su entrambe le categorie in un unico percorso, ottimizzando i tempi rispetto a due corsi separati da 8 ore.'
        },
        {
          domanda: 'Quanto dura?',
          risposta: '13 ore: 1 ora di modulo giuridico, 2 ore di modulo tecnico, 5 ore di pratica cingoli, 5 ore di pratica ruote.'
        },
        {
          domanda: 'Costa meno rispetto ai due corsi singoli?',
          risposta: 'Sì, il prezzo unico è di 250 euro + IVA, contro i 180 euro + IVA di ciascun corso singolo se frequentati separatamente.'
        },
        {
          domanda: 'Ha una scadenza?',
          risposta: 'Sì, ha validità limitata con aggiornamento obbligatorio periodico.'
        },
        {
          domanda: 'È possibile svolgere il corso in azienda?',
          risposta: 'Sì, sia il modulo teorico sia i moduli pratici possono essere svolti con i mezzi a ruote e a cingoli del cliente.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO GIURIDICO-NORMATIVO',
          durataOre: 1,
          argomenti: [
            'Normativa di riferimento e responsabilità dell\'operatore',
            'Obblighi del datore di lavoro'
          ]
        },
        {
          titolo: 'MODULO TECNICO ESTESO',
          durataOre: 2,
          argomenti: [
            'Categorie e componenti dei trattori a ruote e a cingoli',
            'Dispositivi di comando e sicurezza di entrambe le tipologie',
            'Verifiche e controlli pre-utilizzo'
          ]
        },
        {
          titolo: 'MODULO PRATICO CINGOLI',
          durataOre: 5,
          argomenti: [
            'Guida su pendenze',
            'Gestione della stabilità su fondi irregolari',
            'Manovre forestali'
          ]
        },
        {
          titolo: 'MODULO PRATICO RUOTE',
          durataOre: 5,
          argomenti: [
            'Guida in campo aperto',
            'Collegamento a macchine operatrici trainate',
            'Test pratico finale'
          ]
        }
      ],

      corsiCorrelati: [
        'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
      ]
    }
  }
};
