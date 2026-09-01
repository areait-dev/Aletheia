
// Contenuti editoriali per famiglia "Patentino Fitosanitario" - variante AGGIORNAMENTO (12 ore).
// Chiave posizionale 'livello-1' (unico livello della famiglia) - vedi patentino-fitosanitario-content.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Patentino Fitosanitario',
    durataOre: 12,
    modalita: ['Aula'],
    validita: 'Da ripetere periodicamente — da definire',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 100,

    descrizione: `Il certificato di abilitazione all'acquisto e all'utilizzo dei prodotti fitosanitari ha validità periodica: trascorso il periodo previsto dalla normativa dal rilascio, l'utilizzatore professionale è tenuto a frequentare un corso di aggiornamento per mantenere la propria abilitazione. Il corso di Aggiornamento del Patentino Fitosanitario, della durata di 12 ore, è riservato a chi è già in possesso del certificato e deve rinnovarlo prima della scadenza.

Il percorso formativo, in linea con quanto previsto dal Piano di Azione Nazionale (PAN), consente di aggiornare le conoscenze acquisite nel corso base alla luce delle novità normative intervenute, delle nuove etichettature dei prodotti fitosanitari e delle tecniche più recenti di riduzione del rischio per l'operatore, per i consumatori e per l'ambiente.

Particolare attenzione è dedicata all'evoluzione della difesa integrata, alle nuove misure di sicurezza nella manipolazione e distribuzione dei prodotti e alla corretta tenuta del registro dei trattamenti, strumento obbligatorio di tracciabilità per ogni azienda agricola.

Al termine delle 12 ore di formazione viene rilasciato l'attestato di frequenza, che consente il rinnovo del certificato di abilitazione presso la Regione competente, mantenendo la validità su tutto il territorio nazionale.`,

    aChiERivolto: [
      'Utilizzatori professionali già in possesso del certificato di abilitazione con scadenza in prossimità',
      'Agricoltori, coltivatori diretti e contoterzisti che devono rinnovare il patentino già conseguito',
      'Giardinieri e manutentori del verde titolari di certificato di abilitazione in scadenza'
    ],

    cosaImparerai: [
      'Gli aggiornamenti normativi intervenuti sul Piano di Azione Nazionale (PAN) e sulla normativa fitosanitaria',
      'L\'evoluzione dei principi della difesa integrata e delle tecniche a basso impatto ambientale',
      'Le nuove misure di sicurezza nella manipolazione, distribuzione e stoccaggio dei prodotti fitosanitari',
      'La corretta gestione e tenuta del registro dei trattamenti fitosanitari aziendale'
    ],

    faq: [
      { domanda: 'Ogni quanto tempo scade il patentino fitosanitario?', risposta: 'Il certificato di abilitazione ha una validità periodica prevista dalla normativa vigente: alla scadenza deve essere rinnovato attraverso la frequenza di un corso di aggiornamento e, dove previsto dalla Regione, il superamento della relativa verifica finale.' },
      { domanda: 'Cosa succede se il patentino scade?', risposta: 'Alla scadenza del certificato l\'utilizzatore professionale non può più acquistare né utilizzare prodotti fitosanitari ad uso professionale, fino al completamento del corso di aggiornamento e al rinnovo dell\'abilitazione presso la Regione competente.' },
      { domanda: 'È possibile fare l\'aggiornamento se il patentino è scaduto da tempo?', risposta: 'Sì, il corso di aggiornamento consente il rinnovo anche in caso di certificato scaduto; è comunque consigliabile non lasciar trascorrere troppo tempo dalla scadenza per evitare interruzioni nell\'attività professionale che richiede l\'abilitazione.' }
    ],

    // NOTA: come per il corso base, la pagina isolata originale non forniva un programma moduli
    // dettagliato per questa variante (placeholder in attesa del PDF ufficiale). Modulo unico
    // riepilogativo fornito per compatibilità con il template [slug].js.
    moduli: [
      { titolo: 'PROGRAMMA AGGIORNAMENTO PATENTINO FITOSANITARIO', durataOre: 12, argomenti: ['Aggiornamenti normativi sul PAN e sulla normativa fitosanitaria', 'Evoluzione della difesa integrata e tecniche a basso impatto ambientale', 'Nuove misure di sicurezza nella manipolazione e distribuzione', 'Gestione e tenuta del registro dei trattamenti fitosanitari'] }
    ],

    corsiCorrelati: [
      'patentino-fitosanitario',
      'trattori-agricoli-forestali-a-ruote'
    ]
  }
};
