// Contenuti editoriali per famiglia "Fondo Nuove Competenze" (family.id 'fondo-nuove-competenze'), variante unica
// (solo tipo 'corso'), un solo livello 'livello-1'.
// FONTE: testi già presenti in pages/formazione/fondo-nuove-competenze.js (hero, aree di intervento, servizi, FAQ).
// Non è un corso con ore/programma: durata, validità, attestato e moduli sono omessi e la pagina li nasconde
// (guardie opzionali in pages/all-courses/[slug].js).

module.exports = {
  'fondo-nuove-competenze': {
    'livello-1': {
      titolo: 'Fondo Nuove Competenze',

      descrizione: `Il Fondo Nuove Competenze permette alle imprese di destinare parte dell'orario di lavoro alla formazione, ottenendo il rimborso del costo delle ore. Alètheia ti accompagna in ogni fase.

I percorsi sono progettati sui reali fabbisogni della tua impresa e riguardano tre aree: transizione digitale (nuovi software gestionali, cybersecurity, e-commerce, automazione, competenze digitali di base e avanzate), transizione ecologica (sostenibilità, efficienza energetica, economia circolare, nuovi processi produttivi green) e innovazione organizzativa (riorganizzazione dei processi, nuove figure professionali, cambiamenti tecnologici interni).

Alètheia si occupa di: analisi dei fabbisogni aziendali, verifica dei requisiti di accesso, progettazione del piano formativo, supporto nella predisposizione degli accordi previsti dalla misura, gestione della domanda, coordinamento delle attività formative, monitoraggio e rendicontazione finale.

I vantaggi: nessun blocco della produzione, perché la rimodulazione dell'orario si progetta sulle esigenze reali dell'azienda; competenze allineate al mercato; personale più motivato e trattenuto; un investimento sostenibile, che fa crescere il capitale umano senza intaccare la liquidità aziendale.`,

      aChiERivolto: [
        'Aziende private di ogni settore e dimensione che abbiano necessità di aggiornare le competenze dei propri dipendenti, previo accordo con i lavoratori o le rappresentanze sindacali',
      ],

      faq: [
        {
          domanda: 'Chi può accedere al Fondo Nuove Competenze?',
          risposta: 'Possono accedere le aziende private di ogni settore e dimensione che abbiano necessità di aggiornare le competenze dei propri dipendenti, previo accordo con i lavoratori o le rappresentanze sindacali.',
        },
        {
          domanda: 'Quanto costa alla mia azienda?',
          risposta: "Le ore di lavoro destinate alla formazione sono coperte dal Fondo per la parte retributiva e contributiva. L'azienda non sostiene il costo del lavoro relativo a quelle ore.",
        },
        {
          domanda: 'Che tipo di formazione posso attivare?',
          risposta: 'Percorsi orientati a transizione digitale, transizione ecologica e innovazione organizzativa, progettati sui reali fabbisogni della tua impresa.',
        },
        {
          domanda: 'Il Fondo è sempre attivo?',
          risposta: 'La misura viene rifinanziata a edizioni successive, con requisiti e finestre di apertura che possono variare. Contattaci per sapere se è attualmente attivabile e quali sono le condizioni aggiornate.',
        },
      ],
    },
  },
};
