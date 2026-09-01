
// Contenuti editoriali per famiglia "Carrelli Elevatori Semoventi con Conduttore a Bordo" - corso base (12 ore)
// Chiave di primo livello = family.id derivato automaticamente da coursesData (slugify del titolo
// "Carrelli Elevatori Semoventi Con Conduttore A Bordo"), NON l'alias "carrelli-elevatori" usato in
// coursesDetails - stesso pattern di data/content/antincendio-content.js.

module.exports = {
  'carrelli-elevatori-semoventi-con-conduttore-a-bordo': {
    'livello-1': {
      titolo: 'Corso Addetti alla Conduzione di Carrelli Industriali Semoventi con Operatore a Bordo',
      durataOre: 12,
      modalita: ['Aula'],
      validita: 'Rinnovo ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 180,

      descrizione: `Il Corso per Addetti alla Conduzione di Carrelli Industriali Semoventi con Operatore a Bordo, della durata di 12 ore, è obbligatorio ai sensi dell'art. 73 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, che disciplina la formazione per l'uso delle attrezzature di lavoro che richiedono conoscenze e responsabilità particolari.

Chi guida un muletto senza questa abilitazione espone l'azienda a sanzioni pesanti e, soprattutto, mette a rischio la propria incolumità e quella dei colleghi. L'obbligo nasce dal fatto che i carrelli elevatori sono tra le attrezzature più diffuse - e più pericolose - negli ambienti di lavoro italiani: magazzini, cantieri edili, stabilimenti industriali, piattaforme logistiche, aziende agricole con movimentazione merci su pallet. Ribaltamenti, urti, cadute di carico e investimenti sono tra gli infortuni più frequenti legati all'uso scorretto di questi mezzi, ed è proprio per questo che il legislatore ha reso la formazione un requisito imprescindibile per chiunque debba condurli, indipendentemente dal settore o dalla dimensione dell'impresa.

Il corso carrelli elevatori di Alètheia è strutturato in tre moduli complementari: un modulo giuridico-normativo che inquadra responsabilità e obblighi dell'operatore; un modulo tecnico che approfondisce tipologie, componenti, stabilità, portata e segnaletica di sicurezza; un modulo pratico in cui i partecipanti guidano realmente il carrello su un percorso di prova, a vuoto e a carico, per apprendere le manovre corrette sotto la supervisione di un istruttore qualificato.

Il percorso formativo è pensato per magazzinieri, addetti alla logistica, operai di cantiere e chiunque, all'interno dell'organizzazione aziendale, debba movimentare merci con carrelli semoventi. Al termine del corso, il partecipante riceve un attestato di abilitazione alla conduzione di carrelli elevatori valido su tutto il territorio nazionale.

Il corso si svolge in aula presso la sede Alètheia di Vittoria (RG), con possibilità di organizzare la formazione anche direttamente in azienda, utilizzando i carrelli già in dotazione al cliente per rendere la parte pratica immediatamente calata sul contesto operativo reale. Contattaci per organizzare una sessione dedicata al tuo team.`,

      aChiERivolto: [
        'Magazzinieri e operatori logistici',
        'Addetti di cantiere',
        'Operai di stabilimenti industriali',
        'Lavoratori agricoli',
        'Neoassunti',
        'Datori di lavoro che devono adeguarsi al D.Lgs 81/2008'
      ],

      cosaImparerai: [
        'Conoscere le caratteristiche tecniche e i limiti operativi dei carrelli elevatori',
        'Calcolare bilanciamento e portata del mezzo',
        'Eseguire le procedure di verifica giornaliera e periodica',
        'Effettuare manovre di guida in sicurezza a vuoto e a carico',
        'Utilizzare correttamente i dispositivi di segnalazione e controllo',
        'Interpretare la segnaletica interna',
        'Adottare comportamenti corretti su pendenze e in condizioni di visibilità ridotta'
      ],

      faq: [
        {
          domanda: 'Quanto dura il corso?',
          risposta: '12 ore complessive: 1 ora di modulo giuridico-normativo, 7 ore di modulo tecnico e 4 ore di modulo pratico su percorso di prova.'
        },
        {
          domanda: 'Ha una scadenza?',
          risposta: "Sì, l'attestato va rinnovato tramite corso di aggiornamento periodico prima della scadenza per continuare a essere abilitati alla conduzione."
        },
        {
          domanda: 'Serve idoneità medica?',
          risposta: "Il datore di lavoro valuta l'idoneità alla mansione del lavoratore: si tratta di un adempimento che l'azienda deve garantire separatamente rispetto alla formazione."
        },
        {
          domanda: 'È possibile svolgere il corso in azienda?',
          risposta: 'Sì, sia la parte teorica che la parte pratica possono essere organizzate direttamente in azienda, utilizzando i vostri mezzi.'
        },
        {
          domanda: "Cosa rischia chi guida un carrello elevatore senza attestato?",
          risposta: "Espone l'azienda a pesanti sanzioni previste dal D.Lgs 81/2008 e sé stesso e i colleghi a un rischio elevato di infortuni."
        }
      ],

      moduli: [
        {
          titolo: 'MODULO GIURIDICO',
          durataOre: 1,
          argomenti: [
            "Presentazione del corso e obiettivi",
            "Cenni di legislazione generale in materia di sicurezza",
            "Responsabilità dell'operatore",
            "Statistiche degli infortuni sul lavoro dovuti all'utilizzo dei carrelli elevatori"
          ]
        },
        {
          titolo: 'MODULO TECNICO',
          durataOre: 7,
          argomenti: [
            'Tipologie e principali caratteristiche tecnico-funzionali dei carrelli semoventi',
            'Nozioni elementari di fisica: condizioni di equilibrio, bilanciamento e stabilità',
            'Tecnologia dei carrelli semoventi: pneumatici, sterzo, motori, impianti frenanti',
            'Dispositivi di comando e di sicurezza',
            'Verifiche e controlli da effettuare prima dell\'utilizzo del carrello',
            'Modalità di corretto utilizzo e principali rischi connessi'
          ]
        },
        {
          titolo: 'MODULO PRATICO',
          durataOre: 4,
          argomenti: [
            'Illustrazione dei componenti dei carrelli semoventi',
            "Esercitazione pratica sulle verifiche di rito e sui dispositivi di comando e di sicurezza",
            "Guida su percorso di prova a vuoto e a carico",
            "Manovre e posizionamento del carico"
          ]
        }
      ],

      // NOTA: "Corso Carriponte" richiesto nello spec non esiste in coursesData/coursesRaw.js -
      // nessuna pagina/famiglia corrispondente nel sito, quindi omesso per non generare un link rotto/silenzioso.
      corsiCorrelati: [
        'aggiornamento-carrelli-elevatori-semoventi-con-conduttore-a-bordo',
        'ple-piattaforme-di-lavoro-mobili-elevabili',
        'gru-su-autocarro',
        'formazione-lavoratori-rischio-alto'
      ]
    }
  }
};
