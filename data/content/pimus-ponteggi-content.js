
// Contenuti editoriali per famiglia "PIMUS / Ponteggi" - corso base (28 ore).
// Entrambe le varianti (corso/aggiornamento) condividono livelloKey 'default' (nessun descrittore nel
// titolo raw), quindi la chiave interna è sempre 'livello-1' - stesso pattern di
// data/content/lavori-in-quota-content.js e data/content/carrelli-elevatori-content.js.

module.exports = {
  'pimus-ponteggi': {
    'livello-1': {
      titolo: 'Corso Addetti/Preposti al Montaggio, Smontaggio e Trasformazione di Ponteggi (PIMUS)',
      durataOre: 28,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 4 anni ai sensi dell\'allegato XXI del D.Lgs 81/2008',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 400,

      descrizione: `Il Corso di Formazione Teorico-Pratica Abilitante per Addetti e Preposti al Montaggio, Smontaggio e Trasformazione di Ponteggi, della durata di 28 ore, è obbligatorio ai sensi dell'art. 136 e dell'allegato XXI del D.Lgs 81/2008, che disciplinano la formazione necessaria per operare in sicurezza sui ponteggi nei cantieri edili.

Il ponteggio è una delle opere provvisionali più diffuse e più rischiose nei cantieri: errori di montaggio, smontaggio o trasformazione possono causare cadute dall'alto, crolli strutturali e infortuni gravi, sia per chi lavora sul ponteggio sia per chi opera nelle vicinanze. Per questo la normativa richiede un percorso formativo teorico-pratico abilitante specifico per chiunque debba montare, smontare o trasformare ponteggi, indipendentemente dal tipo di cantiere o azienda.

Il corso si articola in tre moduli: il Modulo I giuridico-normativo (4 ore), dedicato alla legislazione in materia di prevenzione infortuni e all'analisi dei rischi nei cantieri; il Modulo II tecnico (10 ore), sul Piano di Montaggio, Uso e Smontaggio in Sicurezza (PIMUS), sui DPI anticaduta e sulle tecniche di ancoraggio; il Modulo III pratico (14 ore), con esercitazioni reali di montaggio, smontaggio e trasformazione di ponteggio a tubi e giunti (PTG), a telai prefabbricati (PTP) e a montanti e traversi prefabbricati (PMTP), oltre alla gestione della prima emergenza e del salvataggio.

La parte pratica, che occupa la metà del monte ore complessivo, rende questo corso particolarmente operativo: i partecipanti montano e smontano realmente le diverse tipologie di ponteggio sotto la supervisione di un istruttore qualificato.

Il corso si svolge in aula e in area pratica presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda o in cantiere utilizzando le attrezzature già in dotazione al cliente.`,

      aChiERivolto: [
        'Lavoratori addetti al montaggio, smontaggio e trasformazione di ponteggi',
        'Preposti che coordinano squadre di montaggio',
        'Imprese edili',
        'Neoassunti in cantiere',
        'Datori di lavoro di imprese che utilizzano ponteggi PTG, PTP o PMTP'
      ],

      cosaImparerai: [
        'Applicare la normativa nei cantieri e nei lavori in quota',
        'Analizzare i rischi legati ai ponteggi',
        'Interpretare e applicare il Piano di Montaggio, Uso e Smontaggio in Sicurezza (PIMUS)',
        'Utilizzare i DPI anticaduta',
        'Applicare tecniche e tipologie di ancoraggio',
        'Eseguire le verifiche di sicurezza sul ponteggio prima, durante e dopo il montaggio',
        'Montare, smontare e trasformare ponteggi PTG, PTP e PMTP',
        'Gestire la prima emergenza e le operazioni di salvataggio'
      ],

      faq: [
        {
          domanda: 'Cos\'è il PIMUS e perché serve un corso?',
          risposta: 'Il PIMUS è il documento tecnico obbligatorio per ogni ponteggio; il corso forma gli addetti a operare in conformità al PIMUS e alla normativa sulla sicurezza nei cantieri.'
        },
        {
          domanda: 'Quanto dura il corso PIMUS/Ponteggi?',
          risposta: '28 ore complessive: 4 ore di modulo giuridico-normativo, 10 ore di modulo tecnico e 14 ore di modulo pratico con esercitazioni reali.'
        },
        {
          domanda: 'È abilitante per tutti i tipi di ponteggio?',
          risposta: 'Il corso copre le tre tipologie principali: a tubi e giunti (PTG), a telai prefabbricati (PTP) e a montanti e traversi prefabbricati (PMTP).'
        },
        {
          domanda: 'L\'attestato ha una scadenza?',
          risposta: 'Sì, l\'abilitazione va rinnovata tramite un corso di aggiornamento specifico prima della scadenza.'
        },
        {
          domanda: 'È organizzabile in cantiere o in azienda?',
          risposta: 'Sì, il corso può essere organizzato in sede utilizzando le attrezzature già in dotazione al cliente per una formazione realistica.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULO I - GIURIDICO-NORMATIVO',
          durataOre: 4,
          argomenti: [
            'Legislazione in materia di prevenzione infortuni',
            'Analisi dei rischi nei cantieri edili'
          ]
        },
        {
          titolo: 'MODULO II - TECNICO',
          durataOre: 10,
          argomenti: [
            'Piano di Montaggio, Uso e Smontaggio in Sicurezza (PIMUS)',
            'DPI anticaduta',
            'Tecniche avanzate di ancoraggio'
          ]
        },
        {
          titolo: 'MODULO III - PRATICO',
          durataOre: 14,
          argomenti: [
            'Montaggio, smontaggio e trasformazione di ponteggi a tubi e giunti (PTG)',
            'Ponteggi a telai prefabbricati (PTP)',
            'Ponteggi a montanti e traversi prefabbricati (PMTP)',
            'Gestione delle emergenze e tecniche operative di salvataggio dell\'operatore'
          ]
        }
      ],

      corsiCorrelati: [
        'lavori-in-quota',
        'coordinatori-cantieri-cse-csp',
        'antincendio-livello-2'
      ]
    }
  }
};
