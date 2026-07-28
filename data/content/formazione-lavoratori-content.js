
// Contenuti editoriali per l'unica famiglia "Formazione dei Lavoratori" (formazione-dei-lavoratori),
// già raggruppata automaticamente da buildCourseFamilies in 5 varianti/switch:
// - Parte Generale (4 ore)    -> 'livello-1'
// - Rischio Basso (8 ore)     -> 'livello-2'
// - Rischio Medio (12 ore)    -> 'livello-3'
// - Rischio Alto (16 ore)     -> 'livello-4'
// La 5a variante (Aggiornamento, tipo 'aggiornamento', 6 ore) vive in
// formazione-lavoratori-aggiornamento-content.js sotto 'livello-5'. Le chiavi sono posizionali
// (stesso ordine delle 5 voci raw in data/coursesRaw.js), non semantiche - vedi editorialLivelloKey
// in pages/all-courses/[slug].js. Stesso pattern di trattori-agricoli-content.js.

module.exports = {
  'formazione-dei-lavoratori': {
    'livello-1': {
      titolo: 'Corso Formazione Generale dei Lavoratori',
      durataOre: 4,
      modalita: ['Aula', 'FAD'],
      validita: 'Non ha scadenza',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 50,

      descrizione: `Il Corso di Formazione Generale dei Lavoratori, della durata di 4 ore, è la parte comune e obbligatoria per tutti i lavoratori ai sensi dell'art. 37 del D.Lgs 81/2008 e degli Accordi Stato Regioni del 17 aprile 2025, indipendentemente dal settore di attività o dal livello di rischio dell'azienda.

A differenza dei percorsi completi rischio basso, medio o alto - che abbinano sempre questa parte generale a una formazione specifica di durata variabile in base alla classificazione ATECO dell'azienda - questo corso copre esclusivamente il modulo generale: i concetti di base di rischio, danno, prevenzione e protezione, l'organizzazione della prevenzione aziendale, i diritti, doveri e sanzioni dei vari soggetti aziendali e gli organi di vigilanza, controllo e assistenza.

Questo corso è utile principalmente in due casi: quando un lavoratore ha già completato altrove la formazione specifica per il proprio livello di rischio ed è necessario integrare solo la parte generale mancante, oppure quando un'azienda organizza la formazione in due fasi separate, erogando prima il modulo generale a tutto il personale e poi il modulo specifico differenziato per mansione o reparto.

Il corso è disponibile in aula o in FAD (formazione a distanza); la modalità videoconferenza non è prevista per questo modulo. È possibile organizzarlo anche direttamente in azienda per gruppi numerosi di lavoratori.`,

      aChiERivolto: [
        'Lavoratori che devono completare la parte generale',
        'Lavoratori che hanno già la specifica e devono integrare il modulo generale',
        'Aziende che organizzano la formazione in due fasi',
        'Datori di lavoro'
      ],

      cosaImparerai: [
        'Distinguere i concetti di rischio, danno, prevenzione e protezione',
        'Conoscere l\'organizzazione della prevenzione aziendale',
        'Individuare diritti, doveri e sanzioni dei soggetti aziendali',
        'Riconoscere gli organi di vigilanza e controllo'
      ],

      faq: [
        { domanda: 'Cos\'è e a chi serve questo corso?', risposta: 'È il modulo comune di 4 ore obbligatorio per tutti i lavoratori, sui concetti base di rischio, danno, prevenzione e protezione.' },
        { domanda: 'Basta questo corso per essere in regola?', risposta: 'No, va sempre abbinato a un modulo specifico (rischio basso, medio o alto) in base alla classificazione ATECO dell\'azienda.' },
        { domanda: 'Quanto dura?', risposta: '4 ore, suddivise in 2 moduli da 2 ore ciascuno.' },
        { domanda: 'Si può fare in FAD?', risposta: 'Sì, è disponibile in aula o in FAD. La videoconferenza non è prevista per questo modulo.' },
        { domanda: 'Ha una scadenza?', risposta: 'No, la parte generale non ha scadenza.' }
      ],

      moduli: [
        { titolo: 'MODULO 1 - CONCETTI DI BASE', durataOre: 2, argomenti: ['Concetto di rischio', 'Concetto di danno', 'Prevenzione', 'Protezione'] },
        { titolo: 'MODULO 2 - SOGGETTI E ORGANIZZAZIONE AZIENDALE', durataOre: 2, argomenti: ['Soggetti del sistema di prevenzione aziendale', 'Funzioni, diritti e doveri', 'Sanzioni', 'Organi di vigilanza, controllo e assistenza'] }
      ],

      // Basso/Medio/Alto/Aggiornamento sono switch sulla STESSA pagina (non pagine separate): nessun
      // corso realmente esterno alla famiglia da linkare per questa variante.
      corsiCorrelati: []
    },

    'livello-2': {
      titolo: 'Corso Formazione Generale e Specifica dei Lavoratori – Rischio Basso',
      durataOre: 8,
      modalita: ['Aula', 'FAD', 'Videoconferenza'],
      validita: 'Generale permanente, specifica con aggiornamento ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 100,

      descrizione: `Il Corso di Formazione Generale e Specifica dei Lavoratori per il rischio basso, della durata di 8 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e dell'Accordo Stato Regioni, che impone a ogni datore di lavoro di formare adeguatamente il proprio personale sui temi della salute e sicurezza sul lavoro fin dal momento dell'assunzione.

Il livello di rischio basso riguarda le aziende classificate secondo il codice ATECO come a basso rischio infortunistico: uffici, attività commerciali, studi professionali, agenzie di servizi e in generale contesti dove l'esposizione a rischi fisici, chimici o meccanici è ridotta. Anche in questi ambienti, però, la normativa impone una formazione specifica, perché rischi come quelli legati all'uso prolungato del videoterminale, al microclima o alla movimentazione occasionale di carichi restano presenti e vanno gestiti correttamente.

Il corso si divide in due moduli: la formazione generale di 4 ore, comune a tutti i settori, che introduce i concetti di rischio, danno, prevenzione e protezione e illustra i soggetti del sistema di prevenzione aziendale; e la formazione specifica di 4 ore, dedicata ai rischi propri del rischio basso, dall'uso di attrezzature e videoterminali alla gestione delle emergenze e all'utilizzo dei dispositivi di protezione individuale.

Il corso è disponibile in tre modalità: in aula, in videoconferenza sincrona con il docente e in FAD (formazione a distanza asincrona), per adattarsi alle esigenze organizzative di aziende con personale distribuito su più sedi. È possibile organizzare la formazione anche direttamente in azienda per gruppi numerosi di lavoratori.`,

      aChiERivolto: [
        'Lavoratori di uffici, negozi e studi professionali',
        'Neoassunti in attività a rischio basso',
        'Personale amministrativo e videoterminalisti',
        'Lavoratori stagionali o part-time'
      ],

      cosaImparerai: [
        'Distinguere rischio, danno e prevenzione',
        'Conoscere ruoli e responsabilità dei soggetti aziendali',
        'Usare correttamente attrezzature e videoterminali (rischi posturali e visivi)',
        'Adottare comportamenti corretti in caso di emergenza ed evacuazione',
        'Utilizzare i DPI previsti',
        'Segnalare correttamente i near miss'
      ],

      faq: [
        { domanda: 'Cos\'è e chi deve farlo?', risposta: 'È il corso completo per lavoratori di aziende classificate a basso rischio (uffici, commercio, studi professionali).' },
        { domanda: 'Quanto dura?', risposta: '8 ore totali: 4 ore di formazione generale e 4 ore di formazione specifica per il rischio basso.' },
        { domanda: 'È disponibile in FAD o videoconferenza?', risposta: 'Sì, è disponibile in tutte e tre le modalità: aula, FAD e videoconferenza.' },
        { domanda: 'Serve l\'aggiornamento?', risposta: 'Sì, la parte specifica va aggiornata periodicamente con un corso di aggiornamento di 6 ore.' },
        { domanda: 'Che differenza c\'è tra i livelli di rischio?', risposta: 'La classificazione ATECO dell\'azienda determina la durata della formazione specifica: 4 ore per il rischio basso, 8 ore per il medio, 12 ore per l\'alto.' }
      ],

      moduli: [
        { titolo: 'MODULO GENERALE', durataOre: 4, argomenti: ['Concetto di rischio, danno, prevenzione e protezione', 'Organizzazione della prevenzione aziendale'] },
        { titolo: 'MODULO SPECIFICO - RISCHIO BASSO', durataOre: 4, argomenti: ['Uso di videoterminali e attrezzature d\'ufficio', 'Ergonomia della postazione di lavoro', 'Gestione delle emergenze', 'Dispositivi di protezione individuale'] }
      ],

      corsiCorrelati: ['rls']
    },

    'livello-3': {
      titolo: 'Corso Formazione Generale e Specifica dei Lavoratori – Rischio Medio',
      durataOre: 12,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Generale permanente, specifica con rinnovo ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 130,

      descrizione: `Il Corso di Formazione Generale e Specifica dei Lavoratori per il rischio medio, della durata di 12 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e dell'Accordo Stato Regioni per tutti i lavoratori impiegati in aziende classificate a rischio medio secondo il codice ATECO.

Il rischio medio riguarda tipicamente aziende manifatturiere, officine, magazzini di media complessità e attività che prevedono l'uso quotidiano di macchine e attrezzature, movimentazione di carichi e presenza di rischi elettrici. Rispetto al rischio basso, in questi contesti l'esposizione a pericoli concreti per la sicurezza fisica dei lavoratori è più marcata, ed è per questo che la normativa richiede il doppio delle ore di formazione specifica: 8 ore contro le 4 previste per il rischio basso.

Il corso si articola in due moduli: la formazione generale di 4 ore, identica per tutti i livelli di rischio e comune a ogni settore, e la formazione specifica di 8 ore dedicata ai rischi propri del livello medio, che include movimentazione manuale dei carichi, rischi da attrezzature e macchine, rischio elettrico, rischio incendio, stress lavoro-correlato e procedure di sicurezza aziendali.

Il corso è disponibile in aula e in videoconferenza sincrona con il docente; la modalità FAD non è prevista per questo livello di rischio, data la maggiore complessità dei contenuti tecnici da trattare. È possibile organizzare la formazione direttamente in azienda per gruppi numerosi di lavoratori, calibrando gli esempi pratici sulle macchine e attrezzature realmente in uso.`,

      aChiERivolto: [
        'Operai e addetti di aziende manifatturiere e officine',
        'Magazzinieri e addetti alla logistica',
        'Lavoratori esposti a rischio elettrico o movimentazione carichi',
        'Neoassunti in attività a rischio medio'
      ],

      cosaImparerai: [
        'Distinguere rischi per la sicurezza, per la salute e rischi trasversali',
        'Applicare le procedure di movimentazione manuale dei carichi',
        'Utilizzare in sicurezza macchine e attrezzature',
        'Riconoscere i pericoli del rischio elettrico',
        'Applicare le procedure di prevenzione incendi ed evacuazione',
        'Interpretare la cartellonistica di sicurezza',
        'Utilizzare i DPI previsti per la mansione',
        'Riconoscere e gestire lo stress lavoro-correlato'
      ],

      faq: [
        { domanda: 'Cos\'è e chi deve farlo?', risposta: 'È obbligatorio per i lavoratori di aziende classificate a rischio medio (manifattura, officine, logistica).' },
        { domanda: 'Quanto dura?', risposta: '12 ore totali: 4 ore di formazione generale e 8 ore di formazione specifica per il rischio medio.' },
        { domanda: 'Si può fare in FAD?', risposta: 'No, per la complessità dei contenuti è disponibile solo in aula o in videoconferenza.' },
        { domanda: 'Che differenza c\'è con il rischio basso?', risposta: 'Richiede il doppio delle ore di formazione specifica (8 ore contro 4) per la maggiore esposizione a macchine e movimentazione carichi.' },
        { domanda: 'Serve l\'aggiornamento?', risposta: 'Sì, è previsto un rinnovo periodico con un corso di aggiornamento di 6 ore.' }
      ],

      moduli: [
        { titolo: 'MODULO GENERALE', durataOre: 4, argomenti: ['Concetto di rischio, danno, prevenzione e protezione', 'Organizzazione della prevenzione aziendale'] },
        { titolo: 'MODULO SPECIFICO - RISCHIO MEDIO', durataOre: 8, argomenti: ['Rischio meccanico ed elettrico', 'Movimentazione manuale dei carichi', 'Sostanze pericolose', 'Rischio incendio', 'Stress lavoro-correlato'] }
      ],

      corsiCorrelati: ['rls']
    },

    'livello-4': {
      titolo: 'Corso Formazione Generale e Specifica dei Lavoratori – Rischio Alto',
      durataOre: 16,
      modalita: ['Aula', 'Videoconferenza'],
      validita: 'Generale permanente, specifica con rinnovo ogni 5 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 180,

      descrizione: `Il Corso di Formazione Generale e Specifica dei Lavoratori per il rischio alto, della durata di 16 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e dell'Accordo Stato Regioni per tutti i lavoratori impiegati in aziende classificate a rischio alto secondo il codice ATECO.

Il rischio alto riguarda i settori con la maggiore esposizione a pericoli concreti per la sicurezza e la salute dei lavoratori: cantieri edili, industrie pesanti, attività con uso di sostanze chimiche pericolose, agenti cancerogeni o amianto, e contesti dove sono presenti contemporaneamente più fattori di rischio - meccanici, elettrici, chimici, fisici ed ergonomici. Per questo la normativa richiede il monte ore di formazione specifica più esteso tra i tre livelli: 12 ore, contro le 8 ore del rischio medio e le 4 ore del rischio basso.

Il corso si articola in due moduli: la formazione generale di 4 ore, identica per tutti i livelli di rischio e comune a ogni settore, e la formazione specifica di 12 ore dedicata ai rischi propri del livello alto, organizzata in sei unità didattiche: rischi infortunistici (cadute dall'alto, rischi meccanici ed elettrici, rischio incendio), rischi fisici (rumore, vibrazioni, campi elettromagnetici, radiazioni), rischi chimici e biologici (agenti cancerogeni, amianto, agenti biologici), ergonomia e organizzazione del lavoro, misure di prevenzione e protezione, e rischi specifici della mansione.

Il corso è disponibile in aula e in videoconferenza sincrona con il docente; la modalità FAD non è prevista per questo livello di rischio, data l'elevata complessità e specificità dei contenuti tecnici da trattare. È possibile organizzare la formazione direttamente in azienda per gruppi numerosi di lavoratori, calibrando gli esempi pratici sui rischi realmente presenti in azienda.`,

      aChiERivolto: [
        'Lavoratori di cantieri edili e industrie pesanti',
        'Lavoratori esposti ad agenti chimici, cancerogeni o amianto',
        'Lavoratori esposti a rischi multipli simultanei',
        'Neoassunti in attività a rischio alto'
      ],

      cosaImparerai: [
        'Riconoscere rischi infortunistici e cadute dall\'alto',
        'Identificare rischi fisici (rumore, vibrazioni, campi elettromagnetici, radiazioni)',
        'Gestire sostanze pericolose, etichettatura e schede di sicurezza',
        'Applicare le corrette procedure di movimentazione carichi e movimenti ripetitivi',
        'Riconoscere e gestire lo stress lavoro-correlato',
        'Utilizzare DPI avanzati e procedure operative'
      ],

      faq: [
        { domanda: 'Cos\'è e chi deve farlo?', risposta: 'È il corso per lavoratori di aziende classificate ad alto rischio (edilizia, chimica, industria pesante).' },
        { domanda: 'Quanto dura?', risposta: '16 ore totali: 4 ore di formazione generale e 12 ore di formazione specifica per il rischio alto.' },
        { domanda: 'Si può fare in FAD?', risposta: 'No, a causa della complessità tecnica dei contenuti è disponibile solo in aula o videoconferenza.' },
        { domanda: 'Che differenza c\'è con il rischio medio?', risposta: 'Richiede 12 ore di formazione specifica (contro le 8 del rischio medio) e affronta rischi complessi come cancerogeni e amianto.' },
        { domanda: 'Serve l\'aggiornamento?', risposta: 'Sì, è previsto un rinnovo periodico con un corso di aggiornamento di 6 ore.' }
      ],

      moduli: [
        { titolo: 'MODULO GENERALE', durataOre: 4, argomenti: ['Concetto di rischio, danno, prevenzione e protezione', 'Organizzazione della prevenzione aziendale'] },
        { titolo: 'MODULO SPECIFICO - RISCHIO ALTO', durataOre: 12, argomenti: ['Rischi infortunistici e cadute dall\'alto', 'Rischi fisici (rumore, vibrazioni, campi, radiazioni)', 'Rischi chimici e biologici (cancerogeni, amianto, agenti biologici)', 'Ergonomia e organizzazione del lavoro', 'Misure di prevenzione e protezione', 'Rischi specifici della mansione'] }
      ],

      corsiCorrelati: ['rls']
    }
  }
};
