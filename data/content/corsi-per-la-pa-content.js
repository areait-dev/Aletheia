// Contenuti editoriali per famiglia "Corsi per la PA" (family.id 'corsi-per-la-pa'), variante unica (solo tipo 'corso'),
// un solo livello 'livello-1'.
// FONTE: testi già presenti in pages/formazione/corsi-pa.js (aree formative, servizi MEPA, FAQ, meta description).
// Non è un corso con ore/programma: durata, validità, attestato e moduli sono omessi e la pagina li nasconde
// (guardie opzionali in pages/all-courses/[slug].js).

module.exports = {
  'corsi-per-la-pa': {
    'livello-1': {
      titolo: 'Corsi per la Pubblica Amministrazione',
      modalita: ['In presenza', 'Online', 'Blended'],

      descrizione: `Formazione per Comuni, enti locali e aziende pubbliche, attivabile tramite MEPA. Alètheia, ente accreditato Regione Siciliana con 20+ anni di esperienza nella formazione della PA, svolge attività di formazione, aggiornamento professionale, progettazione finanziata e sviluppo delle competenze per il personale della PA.

Le aree formative: digitalizzazione della Pubblica Amministrazione (transizione digitale, CAD, servizi online, gestione documentale, firme elettroniche, protocollo informatico e innovazione dei processi amministrativi); normativa e aggiornamento amministrativo (aggiornamenti legislativi, trasparenza, anticorruzione, privacy GDPR, contratti e appalti pubblici, procedimenti amministrativi); competenze organizzative (leadership, project management, comunicazione istituzionale, gestione del personale e sviluppo delle competenze trasversali); formazione obbligatoria (sicurezza sul lavoro, anticorruzione, privacy, etica pubblica e tutti gli adempimenti previsti dalla normativa).

Per gli enti: iscrizione al MEPA, gestione completa della documentazione amministrativa, supporto nelle procedure di acquisto, progettazione di percorsi personalizzati e formazione in presenza, online o in modalità blended.`,

      aChiERivolto: [
        'Comuni, enti locali e aziende pubbliche',
        'Personale della Pubblica Amministrazione',
      ],

      faq: [
        {
          domanda: 'Gli enti pubblici possono acquistare i servizi tramite MEPA?',
          risposta: 'Sì. Alètheia è presente sul Mercato Elettronico della Pubblica Amministrazione (MEPA), permettendo agli enti di acquisire servizi formativi attraverso la piattaforma.',
        },
        {
          domanda: 'La formazione può essere personalizzata?',
          risposta: "Sì. Ogni percorso può essere progettato sulla base delle esigenze dell'ente, delle figure coinvolte e degli obiettivi organizzativi.",
        },
        {
          domanda: 'Dove vengono svolti i corsi?',
          risposta: "Presso la sede dell'ente, nelle sedi Alètheia oppure online, in funzione delle esigenze organizzative.",
        },
        {
          domanda: 'Realizzate formazione anche per piccoli Comuni?',
          risposta: "Sì. Collaboriamo con amministrazioni di diverse dimensioni, progettando percorsi proporzionati alle esigenze organizzative dell'ente.",
        },
        {
          domanda: 'La formazione è valida ai fini degli obblighi normativi del personale pubblico?',
          risposta: 'Sì. I nostri percorsi coprono gli adempimenti formativi obbligatori della PA — sicurezza, anticorruzione, trasparenza, privacy — con attestati riconosciuti.',
        },
      ],
    },
  },
};
