// Contenuti editoriali per le famiglie PSR Sicilia 2014-2020 Misura 1.1 Formazione:
//  - 'psr' (famiglia generica "PSR", slug raw 'misura-psr-1-2')
//  - 'conduttore-d-impresa-agricola', 'ammodernamento-aziende-agricole',
//    'nuove-strategie-di-sviluppo-e-investimento' (corsi singoli). Tutte a variante unica (solo tipo 'corso'),
//    un solo livello 'livello-1'.
// FONTE: public/pdf/archivio/descrizioni.json, chiavi 'misura-psr-1-1' (titolo), 'misura-psr-1-1/conduttore-impresa-agricola',
// 'misura-psr-1-1/ammodernamento-aziende-agricole', 'misura-psr-1-1/nuove-strategie-sviluppo-investimento'.
// Dal testo sorgente sono stati tolti solo i recapiti telefonici e le etichette dei link (ALLEGATO BANDO, MODULO DI
// ISCRIZIONE, "NON DISPONIBILE"). I campi non presenti in fonte (validità, attestato, partecipanti max, programma a
// moduli, FAQ) sono omessi e la pagina li nasconde (guardie opzionali in pages/all-courses/[slug].js).
// NOTA: la famiglia generica ha slug raw 'misura-psr-1-2' ma l'archivio parla di Misura 1.1 - da verificare.
// FAQ: sintesi di fonti ufficiali + dati già nel progetto (nessun dato aggiunto sui corsi Alètheia):
//  - PSR Sicilia 2014-2020, Misura 1 e Sottomisura 1.1 (titoli, articolazione, destinatari "addetti dei settori
//    agricolo, agroalimentare e forestale", beneficiari = enti di formazione, modalità anche FaD):
//    https://www.psrsicilia.it/misure/misura-1/  https://www.psrsicilia.it/sottomisure/sottomisura-1-1/
// NON presenti nelle pagine ufficiali consultate e quindi NON inserite: gratuità per i partecipanti, requisiti di
// accesso dei singoli corsi, qualifica/codice EQF, ente che rilascia l'attestato.

module.exports = {
  psr: {
    'livello-1': {
      titolo: 'PSR Sicilia 2014-2020 - Misura 1.1 Formazione',

      descrizione: `Corsi di formazione specialistica e workshop di approfondimento rivolti agli operatori del settore agricolo e della filiera, finanziati nell'ambito del PSR Sicilia 2014-2020 Misura 1.1 Formazione.

Corsi: Conduttore d'impresa agricola (200 ore in FAD), Ammodernamento aziende agricole (20 ore), Nuove strategie di sviluppo e investimento (48 ore).

Workshop di approfondimento (8 ore ciascuno): Strategie di Marketing per le aziende agricole; La funzione innovativa nelle aziende agricole; Agricoltura, multifunzionalità e diversificazione.`,

      faq: [
        {
          domanda: 'Cos\'è la Sottomisura 1.1 del PSR Sicilia 2014-2020?',
          risposta: 'È il "Sostegno alla formazione professionale e azioni di acquisizione di competenze", una delle tre sottomisure della Misura 1 "Trasferimento di conoscenze e azioni di informazione" del Programma di Sviluppo Rurale della Sicilia 2014-2020 (le altre sono la 1.2, attività dimostrative e azioni di informazione, e la 1.3, scambi di breve durata e visite di aziende).',
        },
        {
          domanda: 'A chi sono rivolte le attività formative della Sottomisura 1.1?',
          risposta: 'Ai destinatari indicati dal PSR Sicilia: gli addetti dei settori agricolo, agroalimentare e forestale. Per ogni corso i requisiti specifici di partecipazione sono riportati nel relativo bando di selezione allievi.',
        },
        {
          domanda: 'Chi realizza i corsi?',
          risposta: 'I beneficiari della sottomisura sono gli enti di formazione che presentano la domanda di sostegno e gestiscono le attività formative. Alètheia Srl realizza i corsi di questo programma.',
        },
        {
          domanda: 'Quali corsi e workshop comprende il programma di Alètheia?',
          risposta: 'Tre corsi: Conduttore d\'impresa agricola (200 ore in FAD), Ammodernamento aziende agricole (20 ore) e Nuove strategie di sviluppo e investimento (48 ore). In più tre workshop di approfondimento da 8 ore ciascuno: Strategie di marketing per le aziende agricole, La funzione innovativa nelle aziende agricole, Agricoltura, multifunzionalità e diversificazione.',
        },
        {
          domanda: 'I corsi si possono seguire a distanza?',
          risposta: 'Il PSR Sicilia prevede anche interventi in modalità FaD (formazione a distanza). Tra i corsi di questo programma, Conduttore d\'impresa agricola si svolge interamente in FAD (200 ore).',
        },
      ],
    },
  },

  'conduttore-d-impresa-agricola': {
    'livello-1': {
      titolo: "Conduttore d'impresa agricola (ex Capo Azienda)",
      durataOre: 200,
      modalita: ['FAD'],

      descrizione: `Il Conduttore d'Impresa Agricola gestisce i processi aziendali gestionali e produttivi in riferimento al contesto produttivo e territoriale di riferimento.

Svolge le attività di direzione dell'azienda agricola con competenze funzionali alla scelta degli indirizzi produttivi e coordina i processi di gestione attraverso il corretto uso delle risorse disponibili.

Ha competenze in materia di legislazione fiscale tributaria, amministrazione, sicurezza del lavoro, organizzazione d'impresa, gestione sostenibile delle risorse e sulla commercializzazione e promozione delle attività connesse all'agricoltura.

Corso finanziato nell'ambito del PSR Sicilia 2014-2020 Misura 1.1 Formazione, della durata di 200 ore in FAD (Formazione A Distanza).`,

      aChiERivolto: ['Occupati del settore agricolo'],

      faq: [
        {
          domanda: 'Cosa fa un Conduttore d\'impresa agricola?',
          risposta: 'Gestisce i processi aziendali gestionali e produttivi in riferimento al contesto produttivo e territoriale. Svolge le attività di direzione dell\'azienda agricola, con competenze funzionali alla scelta degli indirizzi produttivi, e coordina i processi di gestione attraverso il corretto uso delle risorse disponibili.',
        },
        {
          domanda: 'È lo stesso corso che si chiamava "Capo Azienda"?',
          risposta: 'Il corso è indicato come "Conduttore d\'impresa agricola (ex Capo Azienda)": la denominazione "Capo Azienda" è quella precedente.',
        },
        {
          domanda: 'A chi è riservato il corso?',
          risposta: 'Il corso è riservato agli occupati del settore agricolo. I requisiti completi di partecipazione sono indicati nel bando di selezione allievi del corso.',
        },
        {
          domanda: 'Quanto dura e come si svolge?',
          risposta: 'Il corso dura 200 ore e si svolge interamente in FAD (Formazione A Distanza).',
        },
        {
          domanda: 'Da quale programma è finanziato?',
          risposta: 'Dal PSR Sicilia 2014-2020, Misura 1.1 "Formazione" (sostegno alla formazione professionale e azioni di acquisizione di competenze), rivolta agli operatori del settore agricolo e della filiera.',
        },
      ],
    },
  },

  'ammodernamento-aziende-agricole': {
    'livello-1': {
      titolo: "L'ammodernamento delle aziende agricole attraverso l'introduzione di sistemi automatizzati",
      durataOre: 20,

      descrizione: `Il percorso formativo fa specifico riferimento all'utilizzo di tecnologie, tecniche e metodiche di lavoro in agricoltura che consentono la coerente e non ambigua possibilità di trattare in modo differenziato singole aree e processi produttivi delle quali si conoscono le reali proprietà, fabbisogni e caratteristiche, in maniera del tutto automatizzata attraverso forme innovative di TIC.

Corso finanziato nell'ambito del PSR Sicilia 2014-2020 Misura 1.1 Formazione, della durata di 20 ore.`,

      faq: [
        {
          domanda: 'Di cosa tratta il corso?',
          risposta: 'Del modo in cui tecnologie, tecniche e metodiche di lavoro in agricoltura permettono di trattare in modo differenziato singole aree e processi produttivi, di cui si conoscono proprietà, fabbisogni e caratteristiche, in maniera automatizzata attraverso forme innovative di TIC.',
        },
        {
          domanda: 'Quanto dura il corso?',
          risposta: 'Il corso dura 20 ore.',
        },
        {
          domanda: 'Da quale programma è finanziato?',
          risposta: 'Dal PSR Sicilia 2014-2020, Misura 1.1 "Formazione" (sostegno alla formazione professionale e azioni di acquisizione di competenze), rivolta agli operatori del settore agricolo e della filiera.',
        },
        {
          domanda: 'Come mi iscrivo e quali sono i requisiti?',
          risposta: 'I requisiti e le modalità di selezione sono riportati nel bando di selezione allievi del corso. Per assistenza contatta Alètheia.',
        },
      ],
    },
  },

  'nuove-strategie-di-sviluppo-e-investimento': {
    'livello-1': {
      titolo: 'Nuove strategie di sviluppo e investimento: scouting di mercato, collocazione sui mercati dei prodotti aziendali, internazionalizzazione e capacità di esportazione',
      durataOre: 48,

      descrizione: `Il percorso formativo si propone di sensibilizzare gli imprenditori agricoli a considerare il digitale come nuova opportunità di sbocco per la propria azienda verso i mercati, e non solo per i prodotti e servizi ma anche per promuovere il territorio dal punto di vista delle peculiarità enogastronomiche oltre che agrituristiche, in un'ottica di diversificazione delle attività agricole.

Corso finanziato nell'ambito del PSR Sicilia 2014-2020 Misura 1.1 Formazione, della durata di 48 ore.`,

      aChiERivolto: ['Imprenditori agricoli'],

      faq: [
        {
          domanda: 'Quali argomenti affronta il corso?',
          risposta: 'Scouting di mercato, collocazione sui mercati dei prodotti aziendali, internazionalizzazione e capacità di esportazione, con particolare attenzione alle opportunità offerte dal digitale.',
        },
        {
          domanda: 'Qual è l\'obiettivo del percorso?',
          risposta: 'Sensibilizzare gli imprenditori agricoli a considerare il digitale come nuova opportunità di sbocco verso i mercati, non solo per i prodotti e servizi ma anche per promuovere il territorio dal punto di vista delle peculiarità enogastronomiche e agrituristiche, in un\'ottica di diversificazione delle attività agricole.',
        },
        {
          domanda: 'Quanto dura il corso?',
          risposta: 'Il corso dura 48 ore.',
        },
        {
          domanda: 'Da quale programma è finanziato?',
          risposta: 'Dal PSR Sicilia 2014-2020, Misura 1.1 "Formazione" (sostegno alla formazione professionale e azioni di acquisizione di competenze), rivolta agli operatori del settore agricolo e della filiera.',
        },
      ],
    },
  },
};
