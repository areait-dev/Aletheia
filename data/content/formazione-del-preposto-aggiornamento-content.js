
// Contenuti editoriali per famiglia "Formazione del Preposto" - variante AGGIORNAMENTO (6 ore).
// Chiave posizionale 'livello-1' (unico livello della famiglia) - vedi formazione-del-preposto-content.js.
// Testo identico sia nella pagina isolata formazione-del-preposto.js (variante "aggiornamento" del suo
// CONTENUTO) sia nella pagina standalone duplicata aggiornamento-formazione-del-preposto.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Formazione per Preposti',
    durataOre: 6,
    modalita: ['Aula', 'Videoconferenza'],
    validita: 'Da ripetere periodicamente ai sensi dell\'art. 37 D.Lgs 81/2008 e dell\'Accordo Stato Regioni del 17/04/2025',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 90,

    descrizione: `Questo è il corso di aggiornamento per preposti, della durata di 6 ore, non il corso base: è rivolto a chi ha già completato la formazione iniziale di 12 ore e deve rinnovarla periodicamente, ai sensi dell'art. 37 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025.

L'aggiornamento periodico è obbligatorio perché il ruolo del preposto, per sua natura operativo e relazionale, richiede un allineamento costante alle novità normative e alle prassi di gestione della sicurezza in azienda: chi sovrintende e vigila sull'attività di altri lavoratori deve rimanere aggiornato per continuare a esercitare correttamente questa funzione, anche alla luce di eventuali cambiamenti nell'organizzazione aziendale o nei contratti di appalto.

Il corso, erogato in un modulo unico, approfondisce l'individuazione del preposto di fatto tra designazione ed effettività del ruolo, gli obblighi connessi a contratti di appalto, d'opera e di somministrazione, la gestione del rischio interferenziale e il DUVRI, le modalità per sovraintendere e vigilare sulle attività lavorative garantendo l'attuazione delle direttive ricevute, e le modalità di comunicazione e relazione con gli altri soggetti della prevenzione aziendale.

Il corso è pensato per chi ha già l'attestato di formazione preposti in scadenza. Chi invece non ha mai conseguito la formazione di base deve frequentare il corso completo di 12 ore, non l'aggiornamento. Il corso è disponibile in aula o in videoconferenza; la modalità FAD non è prevista.`,

    aChiERivolto: [
      'Preposti già formati (attestato di 12 ore) con formazione in scadenza',
      'Capisquadra, capireparto e responsabili di linea già formati come preposti che devono rinnovare la propria formazione',
      'Lavoratori che svolgono di fatto funzioni di preposto e devono mantenere aggiornata la propria formazione',
      'Datori di lavoro che devono garantire l\'aggiornamento periodico dei propri preposti',
      'Attenzione: chi non ha mai conseguito l\'attestato di formazione preposti di 12 ore deve prima frequentare il corso base, non l\'aggiornamento'
    ],

    cosaImparerai: [
      'Approfondire l\'individuazione del preposto di fatto, tra designazione ed effettività del ruolo',
      'Aggiornare le conoscenze sugli obblighi connessi a contratti di appalto, d\'opera e di somministrazione',
      'Consolidare la gestione del rischio interferenziale e del DUVRI',
      'Aggiornare le modalità per sovraintendere e vigilare sulle attività lavorative garantendo l\'attuazione delle direttive ricevute',
      'Consolidare le modalità di comunicazione e relazione con gli altri soggetti della prevenzione aziendale'
    ],

    faq: [
      { domanda: 'Ogni quanto va rinnovata la formazione per preposti?', risposta: 'La formazione va aggiornata periodicamente.' },
      { domanda: 'Quanto dura l\'aggiornamento formazione preposti?', risposta: 'L\'aggiornamento dura 6 ore, erogate in un modulo unico che approfondisce temi come il preposto di fatto, gli appalti, il DUVRI e le tecniche di vigilanza e comunicazione.' },
      { domanda: 'Il corso si può fare in FAD?', risposta: 'No, secondo il listino Alètheia questo corso è disponibile in aula o in videoconferenza; la modalità FAD non è prevista.' },
      { domanda: 'Posso fare l\'aggiornamento se non ho mai fatto il corso base?', risposta: 'No, l\'aggiornamento è riservato a chi ha già conseguito l\'attestato di formazione preposti di 12 ore. Senza formazione di base è necessario frequentare il corso completo.' },
      { domanda: 'L\'aggiornamento tratta anche la gestione degli appalti e del DUVRI?', risposta: 'Sì, il programma include un approfondimento sugli obblighi connessi a contratti di appalto, d\'opera e di somministrazione, e sulla gestione del rischio interferenziale tramite il DUVRI.' }
    ],

    moduli: [
      { titolo: 'MODULO UNICO - AGGIORNAMENTO', durataOre: 6, argomenti: ['Il preposto di fatto: tra designazione ed effettività del ruolo', 'Obblighi connessi a contratti di appalto, d\'opera e di somministrazione', 'Gestione del rischio interferenziale e DUVRI', 'Sovraintendere e vigilare sulle attività lavorative garantendo l\'attuazione delle direttive ricevute', 'Comunicazione e relazione con gli altri soggetti della prevenzione aziendale'] }
    ],

    corsiCorrelati: [
      'formazione-del-preposto',
      'formazione-dirigente-modulo-comune',
      'formazione-dei-lavoratori-rischio-medio'
    ]
  }
};
