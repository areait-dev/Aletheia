
// Contenuti editoriali per l'unica famiglia "PLE" (ple), che raccoglie in una sola pagina con switch
// i 3 corsi base:
// - Con Stabilizzatori (8 ore) -> 'livello-1'
// - Senza Stabilizzatori (8 ore) -> 'livello-2'
// - Con e Senza Stabilizzatori / combinato (10 ore) -> 'livello-3'
// La 4a variante (Aggiornamento, tipo 'aggiornamento') vive in ple-aggiornamento-content.js sotto la
// chiave 'livello-4' - le chiavi sono posizionali (stesso ordine delle 4 voci raw in data/coursesRaw.js),
// non semantiche, esattamente come editorialLivelloKey in pages/all-courses/[slug].js.

module.exports = {
  ple: {
    'livello-1': {
      titolo: 'Corso PLE Con Stabilizzatori',
      durataOre: 8,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Corso PLE Con Stabilizzatori, della durata di 8 ore, è obbligatorio ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, per gli operatori che devono condurre Piattaforme di Lavoro Mobili Elevabili (PLE) dotate di stabilizzatori.

Le PLE con stabilizzatori vengono impiegate quando è necessario operare su terreni irregolari o raggiungere altezze elevate, condizioni in cui la stabilità della macchina dipende dal corretto posizionamento e ancoraggio degli stabilizzatori stessi. Un errore in questa fase espone l'operatore e chi si trova nell'area di lavoro a un rischio concreto di ribaltamento.

Il corso si concentra proprio su questo aspetto tecnico: livellamento del mezzo, verifica della portanza del terreno, ancoraggio corretto degli stabilizzatori e gestione delle situazioni in cui il terreno non garantisce un appoggio uniforme. Per chi utilizza anche PLE senza stabilizzatori, o entrambe le tipologie nello stesso parco macchine, sono disponibili il corso dedicato senza stabilizzatori oppure il corso combinato di 10 ore.

Il percorso formativo prevede un modulo teorico su normativa, tipologie di macchine e dispositivi di sicurezza, e un modulo pratico di 6 ore con esercitazioni reali su macchina.

Il corso si svolge in aula e con prove pratiche presso la sede Alètheia di Vittoria (RG).`,

      aChiERivolto: [
        'Operatori di PLE con stabilizzatori',
        'Lavoratori edili e industriali che operano su terreni irregolari',
        'Personale addetto a interventi in quota su grandi altezze',
        'Neoassunti privi di abilitazione',
        'Datori di lavoro che devono adeguarsi al D.Lgs 81/2008'
      ],

      cosaImparerai: [
        'Riconoscere le diverse tipologie di PLE con stabilizzatori',
        'Eseguire correttamente il livellamento e l\'ancoraggio degli stabilizzatori',
        'Valutare la portanza del terreno prima del posizionamento',
        'Utilizzare correttamente i dispositivi di comando e sicurezza',
        'Applicare i DPI anticaduta',
        'Operare in sicurezza a grandi altezze',
        'Gestire le situazioni di emergenza in quota',
        'Eseguire la messa a riposo del mezzo'
      ],

      faq: [
        {
          domanda: 'Quanto dura il corso?',
          risposta: '8 ore complessive, suddivise tra modulo teorico e modulo pratico.'
        },
        {
          domanda: 'Qual è la differenza con il corso senza stabilizzatori?',
          risposta: 'Questo corso approfondisce le procedure di livellamento e ancoraggio, necessarie per le macchine dotate di stabilizzatori su terreni irregolari o a grandi altezze.'
        },
        {
          domanda: 'Uso sia PLE con che senza stabilizzatori, cosa mi conviene fare?',
          risposta: 'In questo caso è consigliabile valutare il corso combinato di 10 ore, che rilascia l\'abilitazione su entrambe le tipologie in un unico percorso.'
        },
        {
          domanda: 'Ha una scadenza?',
          risposta: 'Sì, l\'attestato richiede un rinnovo tramite corso di aggiornamento periodico.'
        },
        {
          domanda: 'Il corso è valido su tutto il territorio nazionale?',
          risposta: 'Sì, l\'attestato rilasciato è conforme all\'Accordo Stato-Regioni e valido su tutto il territorio italiano.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO TEORICO',
          durataOre: 2,
          argomenti: [
            'Normativa di riferimento e responsabilità dell\'operatore',
            'Tipologie di PLE e dispositivi di sicurezza',
            'Controlli pre-utilizzo'
          ]
        },
        {
          titolo: 'MODULO PRATICO',
          durataOre: 6,
          argomenti: [
            'Livellamento e ancoraggio degli stabilizzatori',
            'Verifica della portanza del terreno',
            'Manovre in sicurezza a grandi altezze',
            'Gestione delle emergenze in quota'
          ]
        }
      ],

      // Con/Senza/Con e Senza Stabilizzatori/Aggiornamento sono switch sulla STESSA pagina (non pagine
      // separate), quindi qui va linkato solo un corso realmente esterno alla famiglia.
      corsiCorrelati: [
        'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
      ]
    },

    'livello-2': {
      titolo: 'Corso PLE Senza Stabilizzatori',
      durataOre: 8,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Corso PLE Senza Stabilizzatori, della durata di 8 ore, è obbligatorio ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, per gli operatori che devono condurre Piattaforme di Lavoro Mobili Elevabili (PLE) prive di stabilizzatori.

Le PLE senza stabilizzatori sfruttano la stabilità intrinseca della macchina e sono impiegate prevalentemente su superfici pianeggianti e compatte, tipiche di ambienti industriali e commerciali, come magazzini, capannoni e aree di logistica. Proprio perché la stabilità dipende dalla struttura stessa del mezzo, è fondamentale conoscere i limiti di pendenza ammissibili e le condizioni del terreno in cui è sicuro operare.

Il corso si differenzia da quello con stabilizzatori per il focus pratico, qui orientato alla valutazione della stabilità intrinseca della macchina, al rispetto delle pendenze ammesse dal costruttore e alla gestione di contesti pianeggianti industriali o commerciali. Per chi utilizza anche PLE con stabilizzatori, o entrambe le tipologie nello stesso parco macchine, sono disponibili il corso dedicato con stabilizzatori oppure il corso combinato di 10 ore.

Il percorso formativo prevede un modulo teorico su normativa, tipologie di macchine e dispositivi di sicurezza, e un modulo pratico di 6 ore con esercitazioni reali su macchina.

Il corso si svolge in aula e con prove pratiche presso la sede Alètheia di Vittoria (RG).`,

      aChiERivolto: [
        'Operatori di PLE senza stabilizzatori',
        'Personale di magazzino e logistica',
        'Manutentori in ambienti industriali e commerciali',
        'Neoassunti privi di abilitazione',
        'Datori di lavoro che devono adeguarsi al D.Lgs 81/2008'
      ],

      cosaImparerai: [
        'Riconoscere le diverse tipologie di PLE senza stabilizzatori',
        'Valutare la stabilità intrinseca della macchina in relazione al terreno',
        'Rispettare i limiti di pendenza ammissibili durante le manovre',
        'Utilizzare correttamente i dispositivi di comando e sicurezza',
        'Applicare i DPI anticaduta',
        'Operare in sicurezza in contesti pianeggianti industriali e commerciali',
        'Gestire le situazioni di emergenza in quota',
        'Eseguire la messa a riposo del mezzo'
      ],

      faq: [
        {
          domanda: 'Quanto dura il corso?',
          risposta: '8 ore complessive, suddivise tra modulo teorico e modulo pratico.'
        },
        {
          domanda: 'Su quali terreni si può utilizzare una PLE senza stabilizzatori?',
          risposta: 'Prevalentemente su superfici pianeggianti e compatte, tipiche di ambienti industriali e commerciali, nel rispetto dei limiti di pendenza indicati dal costruttore.'
        },
        {
          domanda: 'Uso sia PLE con che senza stabilizzatori, cosa mi conviene fare?',
          risposta: 'In questo caso è consigliabile valutare il corso combinato di 10 ore, che rilascia l\'abilitazione su entrambe le tipologie in un unico percorso.'
        },
        {
          domanda: 'Ha una scadenza?',
          risposta: 'Sì, l\'attestato richiede un rinnovo tramite corso di aggiornamento periodico.'
        },
        {
          domanda: 'Posso convertire questo attestato in quello con stabilizzatori?',
          risposta: 'No, per operare anche su macchine con stabilizzatori è necessario frequentare il corso specifico o il corso combinato di 10 ore.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO TEORICO',
          durataOre: 2,
          argomenti: [
            'Normativa di riferimento e responsabilità dell\'operatore',
            'Tipologie di PLE e dispositivi di sicurezza',
            'Controlli pre-utilizzo'
          ]
        },
        {
          titolo: 'MODULO PRATICO',
          durataOre: 6,
          argomenti: [
            'Valutazione della stabilità intrinseca della macchina',
            'Rispetto dei limiti di pendenza',
            'Manovre in sicurezza in ambienti industriali e commerciali',
            'Gestione delle emergenze in quota'
          ]
        }
      ],

      corsiCorrelati: [
        'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
      ]
    },

    'livello-3': {
      titolo: 'Corso PLE Con e Senza Stabilizzatori',
      durataOre: 10,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Corso PLE Con e Senza Stabilizzatori, della durata di 10 ore, è obbligatorio ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, ed è pensato per chi deve conseguire l'abilitazione su entrambe le tipologie di Piattaforme di Lavoro Mobili Elevabili (PLE) in un unico percorso formativo.

Molte aziende dispongono contemporaneamente di PLE con stabilizzatori, adatte a terreni irregolari o grandi altezze, e di PLE senza stabilizzatori, impiegate su superfici pianeggianti e compatte tipiche di ambienti industriali e commerciali. Per gli operatori che devono essere abilitati a condurre entrambe le tipologie, il corso combinato di 10 ore evita la necessità di frequentare due corsi separati da 8 ore ciascuno, offrendo un percorso più efficiente sia in termini di tempo sia di costo.

Rispetto ai corsi singoli, questo percorso dedica 6 ore di modulo pratico in cui l'operatore si esercita su entrambe le tipologie di macchina: livellamento e ancoraggio degli stabilizzatori da un lato, valutazione della stabilità intrinseca e rispetto delle pendenze dall'altro.

Il corso si svolge in aula e con prove pratiche presso la sede Alètheia di Vittoria (RG).`,

      aChiERivolto: [
        'Aziende con parco macchine misto (con e senza stabilizzatori)',
        'Operatori che utilizzano entrambe le tipologie di PLE',
        'Responsabili di cantiere e manutentori in quota',
        'Neoassunti privi di abilitazione',
        'Datori di lavoro che vogliono ottimizzare la formazione del personale con un unico percorso'
      ],

      cosaImparerai: [
        'Riconoscere le diverse tipologie di PLE e le relative modalità di stabilizzazione',
        'Eseguire correttamente il livellamento e l\'ancoraggio degli stabilizzatori',
        'Valutare la stabilità intrinseca della macchina in relazione al terreno',
        'Rispettare i limiti di pendenza ammissibili durante le manovre',
        'Applicare le procedure di sicurezza e i DPI anticaduta',
        'Operare in sicurezza a grandi altezze e in contesti pianeggianti',
        'Gestire le situazioni di emergenza in quota',
        'Eseguire la messa a riposo del mezzo'
      ],

      faq: [
        {
          domanda: 'Perché scegliere il corso combinato?',
          risposta: 'Perché consente di ottenere l\'abilitazione su entrambe le tipologie in un unico percorso, ottimizzando i tempi rispetto a due corsi separati da 8 ore.'
        },
        {
          domanda: 'Quanto dura?',
          risposta: '10 ore: 4 ore di modulo teorico e 6 ore di modulo pratico su entrambe le tipologie di macchina.'
        },
        {
          domanda: 'Il corso è valido su tutto il territorio nazionale?',
          risposta: 'Sì, l\'attestato rilasciato è conforme all\'Accordo Stato-Regioni e valido su tutto il territorio italiano.'
        },
        {
          domanda: 'Quanto dura la validità dell\'abilitazione?',
          risposta: 'L\'abilitazione ha validità 5 anni, dopo i quali è necessario frequentare il corso di aggiornamento.'
        },
        {
          domanda: 'È organizzabile in azienda?',
          risposta: 'Sì, la parte teorica può essere svolta in sede e la parte pratica con i mezzi del cliente, se disponibili.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO TEORICO',
          durataOre: 4,
          argomenti: [
            'Normativa di riferimento e responsabilità dell\'operatore',
            'Tipologie di PLE e dispositivi di sicurezza',
            'Controlli pre-utilizzo su entrambe le tipologie'
          ]
        },
        {
          titolo: 'MODULO PRATICO',
          durataOre: 6,
          argomenti: [
            'Livellamento e ancoraggio degli stabilizzatori',
            'Valutazione della stabilità intrinseca della macchina',
            'Manovre in sicurezza a grandi altezze e su terreni pianeggianti',
            'Gestione delle emergenze in quota'
          ]
        }
      ],

      corsiCorrelati: [
        'carrelli-elevatori-semoventi-con-conduttore-a-bordo'
      ]
    }
  }
};
