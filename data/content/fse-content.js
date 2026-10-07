// Contenuti editoriali per famiglia "FSE+" (slug raw 'avviso-20-2024-fse', family.id 'fse'): Avviso n. 20/2024 FSE+,
// percorso per Assistente Familiare. Famiglia a variante unica (solo tipo 'corso'): un solo livello 'livello-1'.
// FONTE: testi già presenti in pages/formazione/regionale.js (card "Avviso n. 20/2024 FSE+", requisiti e FAQ).
// Nessun dato aggiunto: i campi non presenti in fonte (validità, partecipanti max, programma a moduli) sono omessi
// e la pagina li nasconde (vedi guardie opzionali in pages/all-courses/[slug].js).

module.exports = {
  fse: {
    'livello-1': {
      titolo: 'Avviso n. 20/2024 FSE+ - Assistente Familiare',
      durataOre: 300,
      modalita: ['Aula', 'Stage'],
      attestato: 'Qualifica professionale',

      descrizione: `Percorso finanziato dedicato alla formazione della figura professionale di Assistente Familiare, nell'ambito dell'Avviso n. 20/2024 FSE+ (Coesione Italia · Cofinanziato UE · Ministero).

Il corso, della durata di 300 ore in aula con stage, prevede formazione teorica, attività pratiche e rilascio della qualifica professionale.

I percorsi finanziati attraverso FSE+, POC Sicilia e gli altri programmi regionali sono completamente gratuiti per i partecipanti e, in molti casi, prevedono anche un'indennità di frequenza.`,

      faq: [
        {
          domanda: 'Come si accede ai corsi di formazione regionale gratuiti in Sicilia?',
          risposta: "Per accedere ai corsi di formazione regionale in Sicilia è necessario possedere i requisiti previsti dallo specifico bando o avviso pubblico (come lo stato di disoccupazione, la residenza in Sicilia o specifiche fasce d'età) e presentare la domanda di iscrizione direttamente presso il nostro ente Alètheia, che ti supporterà in tutta la fase di verifica e presentazione.",
        },
        {
          domanda: 'Quali requisiti servono per partecipare?',
          risposta: "I requisiti cambiano in base al bando, ma generalmente possono partecipare: residenti o domiciliati in Sicilia; persone tra i 18 e i 65 anni (salvo requisiti specifici); disoccupati, inoccupati, inattivi o beneficiari di misure di sostegno al reddito; utenti presi in carico dal Centro per l'Impiego quando previsto; cittadini extra UE con permesso di soggiorno valido; candidati in possesso del titolo di studio richiesto dal corso.",
        },
        {
          domanda: 'I corsi regionali sono davvero gratuiti?',
          risposta: "Sì, i percorsi finanziati attraverso FSE+, POC Sicilia e gli altri programmi regionali sono completamente gratuiti per i partecipanti. In molti casi è prevista anche un'indennità di frequenza.",
        },
        {
          domanda: 'Ottengo una qualifica riconosciuta al termine del corso?',
          risposta: 'Sì, la maggior parte degli avvisi regionali prevede il rilascio di una qualifica professionale o di un attestato riconosciuto a livello regionale e nazionale, spendibile nel mercato del lavoro.',
        },
        {
          domanda: 'Come faccio a sapere quale avviso è attivo per il mio profilo?',
          risposta: 'I requisiti cambiano da avviso ad avviso. Contattaci per una verifica gratuita: analizziamo la tua situazione e ti indichiamo subito se hai i requisiti per uno o più percorsi disponibili.',
        },
      ],
    },
  },
};
