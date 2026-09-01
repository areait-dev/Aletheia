
// Contenuti editoriali per famiglia "Formazione del Preposto" (ex pagina isolata
// pages/all-courses/formazione-del-preposto.js). Famiglia a variante unica (livelloKey 'default'): un
// solo livello posizionale 'livello-1' condiviso da corso e aggiornamento (vedi
// formazione-del-preposto-aggiornamento-content.js), stesso pattern di carrelli-elevatori-content.js.

module.exports = {
  'formazione-del-preposto': {
    'livello-1': {
      titolo: 'Corso di Formazione per Preposti',
      durataOre: 12,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Aggiornamento periodico previsto dalla normativa',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 160,

      descrizione: `Il Corso di Formazione per Preposti, della durata di 12 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, per chiunque svolga in azienda funzioni di sovrintendenza e vigilanza sull'attività lavorativa di altri lavoratori.

Il preposto, secondo la definizione del D.Lgs 81/2008, è la persona che sovrintende all'attività lavorativa e garantisce l'attuazione delle direttive ricevute, controllandone la corretta esecuzione da parte dei lavoratori ed esercitando un funzionale potere di iniziativa: un ruolo che può essere formalmente designato dal datore di lavoro, ma che la normativa riconosce anche quando esercitato di fatto, indipendentemente dalla qualifica formale ricoperta. Per questo la formazione è obbligatoria per chiunque svolga concretamente questa funzione, anche senza una nomina esplicita.

Il corso si articola in quattro moduli: il Modulo I giuridico-normativo (3 ore), sull'individuazione del preposto, il preposto di fatto e i suoi compiti e obblighi; il Modulo II sulla gestione e organizzazione della sicurezza (3 ore), sulle modalità di esercizio della funzione di controllo ai sensi dell'art. 19 del D.Lgs 81/2008; il Modulo III sulla valutazione delle situazioni di rischio (3 ore), su misure di prevenzione, appalti, DUVRI e segnalazione di incidenti e infortuni mancati; il Modulo IV sulla comunicazione e informazione (3 ore), su tecniche di comunicazione e sensibilizzazione dei lavoratori, in particolare neoassunti, somministrati e stranieri.

Il corso è disponibile in aula o in videoconferenza sincrona con il docente; la modalità FAD non è prevista per questo corso, dato il carattere pratico e relazionale del ruolo del preposto. È possibile organizzare la formazione anche direttamente in azienda per i preposti designati o che svolgono di fatto questa funzione.`,

      aChiERivolto: [
        'Lavoratori designati dal datore di lavoro come preposti in azienda',
        'Lavoratori che di fatto sovrintendono e vigilano sull\'attività di altri colleghi, anche senza una nomina formale',
        'Capisquadra, capireparto e responsabili di linea con potere di controllo sull\'esecuzione del lavoro altrui',
        'Neoassunti destinati a ruoli con funzioni di sovrintendenza e vigilanza sui lavoratori',
        'Datori di lavoro che devono garantire la formazione dei propri preposti ai sensi dell\'art. 37 D.Lgs 81/2008'
      ],

      cosaImparerai: [
        'Riconoscere i criteri di individuazione del preposto, compreso il preposto di fatto',
        'Comprendere i compiti e gli obblighi specifici del ruolo di preposto',
        'Esercitare correttamente la funzione di controllo sull\'osservanza delle norme da parte dei lavoratori (art. 19 D.Lgs 81/2008)',
        'Valutare le situazioni di rischio e controllare la corretta esecuzione delle attività da parte dei lavoratori',
        'Gestire gli obblighi connessi a contratti di appalto, d\'opera e di somministrazione, incluso il DUVRI',
        'Sovraintendere e vigilare sulle attività lavorative garantendo l\'attuazione delle direttive ricevute',
        'Individuare e segnalare correttamente incidenti e infortuni mancati',
        'Applicare tecniche di comunicazione efficace verso lavoratori neoassunti, somministrati e stranieri'
      ],

      faq: [
        { domanda: 'Chi è il preposto e chi deve fare questo corso?', risposta: 'Il preposto è chi sovrintende all\'attività lavorativa di altri lavoratori e ne garantisce l\'attuazione delle direttive, anche solo di fatto e senza una nomina formale: la formazione è obbligatoria per chiunque svolga concretamente questo ruolo.' },
        { domanda: 'Quanto dura il corso di formazione per preposti?', risposta: 'Il corso dura 12 ore complessive, suddivise in quattro moduli da 3 ore ciascuno: giuridico-normativo, gestione e organizzazione della sicurezza, valutazione dei rischi e comunicazione.' },
        { domanda: 'Cos\'è il preposto di fatto?', risposta: 'È chi esercita concretamente funzioni di sovrintendenza e vigilanza sui lavoratori, anche senza una designazione formale da parte del datore di lavoro: la normativa gli attribuisce gli stessi obblighi formativi di un preposto formalmente nominato.' },
        { domanda: 'Il corso si può fare in FAD?', risposta: 'No, secondo il listino Alètheia questo corso è disponibile in aula o in videoconferenza; la modalità FAD non è prevista.' },
        { domanda: 'Dopo il corso preposti serve un aggiornamento periodico?', risposta: 'Sì, è previsto un corso di aggiornamento dedicato di 6 ore.' }
      ],

      moduli: [
        { titolo: 'MODULO I - GIURIDICO-NORMATIVO', durataOre: 3, argomenti: ['Individuazione del preposto', 'Il preposto di fatto', 'Compiti e obblighi del preposto'] },
        { titolo: 'MODULO II - GESTIONE E ORGANIZZAZIONE DELLA SICUREZZA', durataOre: 3, argomenti: ['Modalità di esercizio della funzione di controllo (art. 19 D.Lgs 81/2008)'] },
        { titolo: 'MODULO III - VALUTAZIONE DELLE SITUAZIONI DI RISCHIO', durataOre: 3, argomenti: ['Misure di prevenzione', 'Appalti e DUVRI', 'Segnalazione di incidenti e infortuni mancati'] },
        { titolo: 'MODULO IV - COMUNICAZIONE E INFORMAZIONE', durataOre: 3, argomenti: ['Tecniche di comunicazione', 'Sensibilizzazione dei lavoratori neoassunti, somministrati e stranieri'] }
      ],

      corsiCorrelati: [
        'formazione-dirigente-modulo-comune',
        'formazione-dei-lavoratori-rischio-medio',
        'rspp-datore-di-lavoro-modulo-comune'
      ]
    }
  }
};
