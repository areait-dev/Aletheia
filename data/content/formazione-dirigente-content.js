
// Contenuti editoriali per la famiglia "formazione-dirigente" - corso base (Modulo Comune, 12 ore).
// Famiglia già raggruppata automaticamente da buildCourseFamilies: la variante corso ha livelloKey
// 'comune' (1a voce raw in data/coursesRaw.js) quindi la chiave posizionale qui è 'livello-1' - vedi
// editorialLivelloKey in pages/all-courses/[slug].js. L'aggiornamento (livelloKey 'default', 2a voce
// raw) vive in formazione-dirigente-aggiornamento-content.js sotto 'livello-2'.

module.exports = {
  'formazione-dirigente': {
    'livello-1': {
      titolo: 'Corso di Formazione per Dirigenti · Modulo Comune',
      durataOre: 12,
      modalita: ['FAD'],
      validita: 'Aggiornamento periodico previsto dalla normativa',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 150,

      descrizione: `Il Corso di Formazione per Dirigenti, della durata di 12 ore, è obbligatorio ai sensi dell'art. 2, comma 1, lettera d), e dell'art. 37, comma 7, del D.Lgs 81/2008, in relazione agli obblighi previsti dall'art. 18 e dell'Accordo Stato Regioni del 17 aprile 2025, per chiunque rivesta in azienda un ruolo dirigenziale con responsabilità in materia di salute e sicurezza sul lavoro.

Il dirigente, secondo la definizione del D.Lgs 81/2008, è la persona che attua le direttive del datore di lavoro organizzando l'attività lavorativa e vigilando su di essa: per questo la normativa gli attribuisce specifici obblighi e responsabilità, distinti da quelli del datore di lavoro e del preposto, e richiede una formazione dedicata che gli permetta di esercitare correttamente questo ruolo, anche sul piano della responsabilità civile, penale e amministrativa.

Il corso si articola in quattro moduli: il Modulo I giuridico-normativo (3 ore), su sistema legislativo, soggetti della prevenzione aziendale, delega di funzioni e responsabilità del dirigente; il Modulo II sulla gestione e organizzazione della sicurezza (3 ore), su modelli organizzativi e sistemi di gestione della sicurezza; il Modulo III sui compiti specifici del dirigente (3 ore), su misure di prevenzione, sorveglianza sanitaria, appalti e gestione delle emergenze; il Modulo IV sulla comunicazione (3 ore), su tecniche di comunicazione, obblighi formativi e gestione dei rapporti con i rappresentanti dei lavoratori.

Il corso si svolge interamente in FAD (formazione a distanza asincrona), la modalità prevista per questo corso secondo il listino Alètheia. È possibile completare la formazione con i moduli aggiuntivi settoriali previsti dalla normativa, come il modulo cantieri per i dirigenti che operano in questo contesto.`,

      aChiERivolto: [
        'Dirigenti aziendali',
        'Responsabili di funzione o reparto con poteri organizzativi e di vigilanza',
        'Neoassunti in ruoli dirigenziali',
        'Datori di lavoro (art. 37, comma 7, D.Lgs 81/2008)'
      ],

      cosaImparerai: [
        'Conoscere il sistema legislativo in materia di salute e sicurezza',
        'Individuare i soggetti della prevenzione aziendale, i loro compiti e responsabilità',
        'Comprendere la delega di funzioni e la responsabilità civile, penale e amministrativa',
        'Applicare i modelli di organizzazione e gestione (art. 30 D.Lgs 81/2008)',
        'Adottare misure tecniche, organizzative e procedurali',
        'Gestire appalti, contratti d\'opera e DUVRI',
        'Organizzare la gestione di antincendio, primo soccorso ed emergenze',
        'Applicare tecniche di comunicazione efficace e di consultazione dell\'RLS'
      ],

      faq: [
        {
          domanda: 'Chi deve fare il corso?',
          risposta: 'È obbligatorio per chi attua le direttive del datore di lavoro organizzando e vigilando sull\'attività lavorativa (art. 2 D.Lgs 81/2008).'
        },
        {
          domanda: 'Quanto dura il corso?',
          risposta: '12 ore complessive, suddivise in 4 moduli da 3 ore ciascuno.'
        },
        {
          domanda: 'Si può fare in aula?',
          risposta: 'No, secondo il listino Alètheia questo corso è disponibile solo in modalità FAD.'
        },
        {
          domanda: 'Serve un aggiornamento periodico?',
          risposta: 'Sì, è previsto un corso di aggiornamento dedicato di 6 ore.'
        },
        {
          domanda: 'Sono un dirigente in cantiere, questo corso basta?',
          risposta: 'È previsto un modulo aggiuntivo specifico di 6 ore per i rischi del contesto edile, distinto dal corso base.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO I - GIURIDICO-NORMATIVO',
          durataOre: 3,
          argomenti: [
            'Sistema legislativo in materia di sicurezza',
            'Soggetti della prevenzione aziendale',
            'Delega di funzioni',
            'Responsabilità del dirigente'
          ]
        },
        {
          titolo: 'MODULO II - GESTIONE E ORGANIZZAZIONE DELLA SICUREZZA',
          durataOre: 3,
          argomenti: [
            'Modelli organizzativi',
            'Sistemi di gestione della sicurezza'
          ]
        },
        {
          titolo: 'MODULO III - COMPITI SPECIFICI DEL DIRIGENTE',
          durataOre: 3,
          argomenti: [
            'Misure di prevenzione',
            'Sorveglianza sanitaria',
            'Contratti di appalto',
            'Gestione delle emergenze'
          ]
        },
        {
          titolo: 'MODULO IV - COMUNICAZIONE E FORMAZIONE',
          durataOre: 3,
          argomenti: [
            'Tecniche di comunicazione',
            'Obblighi formativi',
            'Gestione dei rapporti con l\'RLS'
          ]
        }
      ],

      corsiCorrelati: [
        'modulo-aggiuntivo-cantieri-per-datore-di-lavoro',
        'formazione-preposto',
        'rspp-datore-di-lavoro'
      ]
    }
  }
};
