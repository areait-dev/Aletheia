
// Contenuti editoriali per famiglia "Antincendio" - varianti AGGIORNAMENTO (Livello 1/2/3)
//
// GAP NOTO: questi PDF contengono SOLO il programma moduli (teoria/pratica).
// Mancano ancora: descrizione, aChiERivolto, cosaImparerai, faq.
// Vedi commento in fondo al file per come gestire questo caso parziale
// nell'integrazione (diverso dal caso "nessun contenuto" già gestito).

module.exports = {
  'livello-1': {
    durataOre: 2, // 0 teoria + 2 pratica - coerente con priceVariants "Livello 1 Aggiornamento 2H"
    moduli: [
      {
        titolo: 'MODULO UNICO - ESERCITAZIONI PRATICHE',
        durataOreTeoria: 0,
        durataOrePratica: 2,
        argomenti: [
          'Presa visione delle misure di sorveglianza su impianti, attrezzature e sistemi di sicurezza antincendio',
          'Chiarimenti sugli estintori portatili',
          "Esercitazioni sull'uso degli estintori portatili, presa visione del registro antincendio e delle misure di sorveglianza su impianti, attrezzature e sistemi di sicurezza antincendio",
          "Esercitazione riguardante l'attività di sorveglianza"
        ]
      }
    ],

    descrizione: `L'Aggiornamento Antincendio Livello 1 è obbligatorio ogni 5 anni per i lavoratori già designati come addetti antincendio in attività a rischio basso, ai sensi del D.Lgs. 81/08 e del D.M. 02/09/2021.

Della durata di 2 ore, interamente pratiche, il corso permette di mantenere valida la designazione e di rinfrescare le competenze operative acquisite con il corso iniziale: uso degli estintori portatili, verifica del registro antincendio e attività di sorveglianza sugli impianti e sistemi di sicurezza.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti.`,

    aChiERivolto: [
      "Lavoratori già in possesso dell'attestato Addetto Antincendio Livello 1 in scadenza",
      'Addetti antincendio designati in attività classificate a rischio basso che devono rinnovare la designazione'
    ],

    cosaImparerai: [
      'Ripassare e consolidare le procedure di utilizzo degli estintori portatili',
      "Verificare correttamente il registro antincendio e lo stato di impianti e presidi",
      "Aggiornare le proprie competenze sull'attività di sorveglianza antincendio"
    ],

    faq: [
      {
        domanda: "Cosa succede se non frequento l'aggiornamento entro i 5 anni?",
        risposta: "La designazione come addetto antincendio decade e il lavoratore non può più svolgere questo ruolo fino a un nuovo aggiornamento o alla ripetizione del corso completo."
      },
      {
        domanda: "L'aggiornamento Livello 1 include anche una parte teorica?",
        risposta: 'No. Per il Livello 1 il corso di aggiornamento è interamente pratico, con una durata di 2 ore dedicate a esercitazioni sugli estintori e verifica del registro antincendio.'
      }
    ]
  },

  'livello-2': {
    durataOre: 5, // 2 teoria + 3 pratica - coerente con priceVariants "Livello 2 Aggiornamento 5H"
    moduli: [
      {
        titolo: 'MODULO I - MODULO TEORICO',
        durataOreTeoria: 2,
        durataOrePratica: 0,
        argomenti: [
          "Principi sulla combustione e l'incendio",
          'Misure antincendio',
          'Gestione della sicurezza antincendio in esercizio ed in emergenza, con approfondimenti su controlli e manutenzione e sulla pianificazione di emergenza'
        ]
      },
      {
        titolo: 'MODULO II - ESERCITAZIONI PRATICHE',
        durataOreTeoria: 0,
        durataOrePratica: 3,
        argomenti: [
          "Presa visione del registro antincendio e delle misure di sorveglianza su impianti, attrezzature e sistemi di sicurezza antincendio",
          "Esercitazione riguardante l'attività di sorveglianza",
          'Chiarimenti sugli estintori portatili',
          "Esercitazioni sull'uso degli estintori portatili e modalità di utilizzo di naspi e idranti"
        ]
      }
    ],
    descrizione: `L'Aggiornamento Antincendio Livello 2 è obbligatorio ogni 5 anni per i lavoratori già designati come addetti antincendio in attività a rischio medio, ai sensi del D.Lgs. 81/08 e del D.M. 02/09/2021.

Della durata di 5 ore, il corso ripercorre i principi sulla combustione e le misure antincendio già affrontate nel corso iniziale, con particolare attenzione alla gestione della sicurezza in esercizio e in emergenza, e dedica una parte consistente alle esercitazioni pratiche su estintori, naspi e idranti.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti.`,

    aChiERivolto: [
      "Lavoratori già in possesso dell'attestato Addetto Antincendio Livello 2 in scadenza",
      'Addetti antincendio designati in attività classificate a rischio medio che devono rinnovare la designazione'
    ],

    cosaImparerai: [
      'Ripassare i principi sulla combustione e le principali misure antincendio',
      "Consolidare la gestione della sicurezza antincendio in esercizio e in emergenza",
      "Aggiornare le competenze pratiche sull'uso di estintori, naspi e idranti"
    ],

    faq: [
      {
        domanda: "Cosa succede se non frequento l'aggiornamento entro i 5 anni?",
        risposta: "La designazione come addetto antincendio decade e il lavoratore non può più svolgere questo ruolo fino a un nuovo aggiornamento o alla ripetizione del corso completo."
      },
      {
        domanda: 'Quante ore dura la parte teorica rispetto a quella pratica?',
        risposta: "L'aggiornamento Livello 2 prevede 2 ore di teoria e 3 ore di esercitazioni pratiche, per un totale di 5 ore."
      }
    ]
  },

  'livello-3': {
    durataOre: 8, // 5 teoria + 3 pratica - coerente con la FAQ del corso base ("aggiornamento Livello 3 dura 8 ore")
    moduli: [
      {
        titolo: 'MODULO I - PARTE TEORICA',
        durataOreTeoria: 5,
        durataOrePratica: 0,
        argomenti: [
          'I contenuti del corso di aggiornamento sono selezionati tra gli argomenti del corso di formazione iniziale',
          "Riguardano sia l'incendio e la prevenzione sia la protezione antincendio e le procedure da adottare in caso di incendio"
        ]
      },
      {
        titolo: 'MODULO II - ESERCITAZIONI PRATICHE',
        durataOreTeoria: 0,
        durataOrePratica: 3,
        argomenti: [
          "Presa visione del registro antincendio e delle misure di sorveglianza su impianti, attrezzature e sistemi di sicurezza antincendio",
          "Esercitazione riguardante l'attività di sorveglianza",
          'Chiarimenti sui mezzi di estinzione più diffusi',
          'Presa visione e chiarimenti sui dispositivi di protezione individuale',
          "Esercitazioni sull'uso degli estintori portatili e modalità di utilizzo di naspi e idranti"
        ]
      }
    ],
    descrizione: `L'Aggiornamento Antincendio Livello 3 è obbligatorio ogni 5 anni per i lavoratori già designati come addetti antincendio in attività a rischio alto, ai sensi del D.Lgs. 81/08 s.m.i. e del D.M. 02/09/2021.

Della durata di 8 ore, il corso riprende in forma sintetica i contenuti del corso di formazione iniziale - sia gli aspetti legati all'incendio e alla prevenzione, sia la protezione antincendio e le procedure da adottare in caso di emergenza - e dedica un'ampia parte alle esercitazioni pratiche su mezzi di estinzione, dispositivi di protezione individuale ed estintori portatili.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti.`,

    aChiERivolto: [
      "Lavoratori già in possesso dell'attestato Addetto Antincendio Livello 3 in scadenza",
      'Addetti antincendio designati in attività classificate a rischio alto che devono rinnovare la designazione'
    ],

    cosaImparerai: [
      'Ripassare i contenuti chiave del corso iniziale su incendio, prevenzione e protezione antincendio',
      'Aggiornare le procedure da adottare in caso di incendio in attività ad alto rischio',
      "Consolidare l'uso pratico dei mezzi di estinzione e dei dispositivi di protezione individuale"
    ],

    faq: [
      {
        domanda: "Cosa succede se non frequento l'aggiornamento entro i 5 anni?",
        risposta: "La designazione come addetto antincendio decade e il lavoratore non può più svolgere questo ruolo fino a un nuovo aggiornamento o alla ripetizione del corso completo."
      },
      {
        domanda: "L'aggiornamento Livello 3 richiede di rifare tutte le 16 ore del corso iniziale?",
        risposta: "No. L'aggiornamento ha una durata ridotta di 8 ore (5 di teoria e 3 di pratica) e riprende in forma sintetica i contenuti principali del corso di formazione iniziale."
      }
    ]
  }
};

// NOTA SULLA FONTE DEI TESTI:
// I moduli (programma, ore teoria/pratica, argomenti) vengono dai 3 PDF
// ufficiali forniti (AGG_ANTINCENDIO_LIV_1/2/3.pdf) - dati verificati.
// descrizione, aChiERivolto, cosaImparerai, faq sono testo ORIGINALE scritto
// per coerenza con lo stile e i fatti normativi già usati nei corsi base
// (D.Lgs. 81/08 art. 37 comma 9, D.M. 02/09/2021, rinnovo quinquennale),
// NON estratti da fonti esterne. Vanno riletti e validati editorialmente
// prima della pubblicazione, come qualunque testo di prima stesura.
