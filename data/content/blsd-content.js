// Contenuti editoriali per famiglia "BLSD - Basic Life Support and Defibrillation" (family.id
// 'blsd-basic-life-support-and-defibrillation'), variante unica (solo tipo 'corso'), un solo livello 'livello-1'.
// FONTE dei dati del corso: voce 'blsd-basic-life-support-defibrillation' di coursesDetails in
// pages/all-courses/[slug].js (durata, destinatari, descrizione, programma a 4 moduli, obiettivi) - spostati qui
// senza modifiche di contenuto, perché quella voce non viene mostrata come descrizione dalla pagina.
// FONTE delle FAQ (sintesi, nessun dato aggiunto sul corso Alètheia):
//  - Legge 4 agosto 2021 n. 116, art. 1 (chi può usare il DAE) e art. 3 c. 1 lett. a) (art. 54 c.p.):
//    https://www.certifico.com/sicurezza-lavoro/news-sicurezza/legge-4-agosto-2021-n-116
//  - Italian Resuscitation Council, corso BLSD per non sanitari (validità 24 mesi, retraining):
//    https://corsi.ircouncil.it/tipologie-di-corso/blsd-non-sanitari
// NON usato: la "cadenza biennale" attribuita da alcuni siti al DM 24/4/2013 - nel testo in Gazzetta Ufficiale
// riguarda i certificati medici sportivi, non il retraining DAE.
// DA CONFERMARE (non presenti nel progetto): ente che rilascia l'attestato Alètheia, validità e retraining del
// *vostro* attestato, partecipanti max. Per questo validità/retraining nelle FAQ sono attribuiti esplicitamente all'IRC.

module.exports = {
  'blsd-basic-life-support-and-defibrillation': {
    'livello-1': {
      titolo: 'BLSD - Basic Life Support and Defibrillation',
      durataOre: 5,
      modalita: ['Aula', 'Pratica su manichino'],
      attestato: 'Attestato di abilitazione',

      descrizione: `Il corso BLSD (Basic Life Support and Defibrillation), della durata di 5 ore, è rivolto al personale non sanitario e insegna a riconoscere un arresto cardiaco e a intervenire con le manovre di rianimazione cardiopolmonare e con l'uso del defibrillatore semiautomatico esterno (DAE).

Il percorso alterna teoria e ampie esercitazioni pratiche su manichino, e si conclude con la verifica delle competenze e il rilascio dell'attestato di abilitazione.`,

      aChiERivolto: [
        'Personale non sanitario',
        'Addetti al primo soccorso aziendale',
        'Istruttori sportivi',
        'Personale di scuole e strutture aperte al pubblico',
      ],

      cosaImparerai: [
        'Riconoscere tempestivamente un arresto cardiaco',
        'Eseguire correttamente la rianimazione cardiopolmonare su adulto e in età pediatrica',
        'Utilizzare in sicurezza il defibrillatore semiautomatico esterno (DAE)',
        "Ottenere l'attestato di abilitazione BLSD",
      ],

      faq: [
        {
          domanda: 'Chi può usare il defibrillatore (DAE)?',
          risposta: "Secondo la Legge 116/2021 (art. 1), l'uso del defibrillatore semiautomatico o automatico è consentito anche al personale sanitario non medico e al personale non sanitario che abbia ricevuto una formazione specifica nelle tecniche di rianimazione. In assenza di personale formato, in caso di sospetto arresto cardiaco l'uso è comunque consentito anche a chi non possiede questi requisiti.",
        },
        {
          domanda: 'Se non ho fatto il corso, rischio qualcosa usando un DAE in emergenza?',
          risposta: "La Legge 116/2021 (art. 3) prevede che a chi, senza avere i requisiti di formazione, usa il defibrillatore nel tentativo di prestare soccorso si applichi l'articolo 54 del codice penale (stato di necessità). Il corso resta comunque il modo per intervenire con sicurezza e con le manovre corrette.",
        },
        {
          domanda: 'A chi è rivolto il corso BLSD?',
          risposta: 'Al personale non sanitario: addetti al primo soccorso aziendale, istruttori sportivi, personale di scuole e strutture aperte al pubblico.',
        },
        {
          domanda: 'Quanto dura il corso e come si svolge?',
          risposta: 'Il corso dura 5 ore e alterna teoria e ampie esercitazioni pratiche su manichino: arresto cardiaco e catena della sopravvivenza (1 ora), rianimazione cardiopolmonare (2 ore), uso del defibrillatore (1 ora) e verifica finale con prova pratica e test (1 ora).',
        },
        {
          domanda: "Posso imparare a intervenire anche su bambini e lattanti?",
          risposta: 'Sì: il modulo di rianimazione cardiopolmonare comprende la RCP su adulto, bambino e lattante, oltre alle manovre di disostruzione delle vie aeree.',
        },
        {
          domanda: "L'attestato BLSD ha una scadenza?",
          risposta: "Per i corsi BLSD per non sanitari certificati dall'Italian Resuscitation Council (IRC) l'attestato ha validità di 24 mesi e il retraining, della durata di 4 ore da svolgere entro 6 mesi dalla scadenza, la estende per altri 24 mesi. Per conoscere ente certificatore e validità dell'attestato rilasciato da Alètheia contattaci.",
        },
      ],

      moduli: [
        {
          titolo: 'Arresto cardiaco e catena della sopravvivenza',
          durataOre: 1,
          argomenti: ['Riconoscere un arresto cardiaco', 'La catena della sopravvivenza', 'Chiamata al 112/118'],
        },
        {
          titolo: 'Rianimazione cardiopolmonare (RCP)',
          durataOre: 2,
          argomenti: ['Compressioni toraciche e ventilazioni', 'RCP su adulto, bambino e lattante', 'Manovre di disostruzione delle vie aeree'],
        },
        {
          titolo: 'Uso del defibrillatore (DAE)',
          durataOre: 1,
          argomenti: ['Come funziona un DAE', 'Applicazione delle piastre e sicurezza della scena', 'Sequenza BLSD completa'],
        },
        {
          titolo: 'Verifica finale',
          durataOre: 1,
          argomenti: ['Prova pratica su manichino', 'Test di valutazione', "Rilascio dell'attestato"],
        },
      ],
    },
  },
};
