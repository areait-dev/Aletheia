
// Contenuti editoriali per famiglia "Primo Soccorso Aziendale" - corsi base (Gruppo A / Gruppo B e C).
// Famiglia già raggruppata automaticamente da buildCourseFamilies in 2 livelli (Gruppo A, Gruppo B E C),
// ciascuno con switch nidificato Corso/Aggiornamento - stesso pattern di data/content/antincendio-content.js
// (che infatti ha 3 livelli anziché 2, ma la stessa struttura NOTA: contiene solo le varianti "corso
// nuovo"; per quelle "aggiornamento" vedi primo-soccorso-aggiornamento-content.js).

module.exports = {
  'primo-soccorso-aziendale': {
    'livello-1': {
      titolo: 'Corso Primo Soccorso Aziendale Gruppo A',
      durataOre: 16,
      modalita: ['Aula', 'FAD'],
      validita: 'Aggiornamento ogni 3 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 170,

      descrizione: `Il corso primo soccorso aziendale Gruppo A è il percorso formativo obbligatorio per i lavoratori designati come addetti al primo soccorso nelle aziende classificate nel Gruppo A secondo il D.M. 388/2003. Il D.Lgs. 81/08, all'art. 45, obbliga il datore di lavoro a designare uno o più lavoratori incaricati del primo soccorso e a garantire loro una formazione adeguata e periodicamente aggiornata.

Il D.M. 388/2003 definisce le caratteristiche dei corsi e suddivide le aziende in tre gruppi in base al settore di attività e al numero di dipendenti. Il Gruppo A è quello con il livello di rischio più elevato e prevede il percorso formativo più completo: 16 ore di formazione con moduli teorici e ampio spazio alle esercitazioni pratiche. Rientrano nel Gruppo A le aziende o unità produttive con attività che presentano rischi di infortuni o malattie con particolari caratteristiche di gravità, tra cui industrie estrattive, costruzioni, aziende con più di 5 dipendenti appartenenti ai gruppi B e C, e tutte le aziende o unità produttive con oltre 3 lavoratori che non rientrano nel Gruppo B e C.

Al termine del corso viene rilasciato un attestato di primo soccorso aziendale valido in tutta Italia, con obbligo di aggiornamento ogni 3 anni, diversamente dagli altri corsi di sicurezza che prevedono aggiornamento quinquennale.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti. La parte pratica deve essere svolta obbligatoriamente in presenza.`,

      aChiERivolto: [
        'Addetti in aziende Gruppo A (attività estrattive, edili, chimiche, alto rischio)',
        'Aziende con più di 5 dipendenti appartenenti ai Gruppi B e C',
        'Datori di lavoro del Gruppo A',
        'Addetti che devono rinnovare la designazione'
      ],

      cosaImparerai: [
        'Riconoscere un\'emergenza e attivare i soccorsi (112/118)',
        'Valutare coscienza, respirazione e circolazione',
        'Eseguire la rianimazione cardiopolmonare (RCP) e usare il defibrillatore (DAE)',
        'Gestire le ostruzioni delle vie aeree (adulti, bambini, lattanti)',
        'Prestare primo soccorso per emorragie, traumi, ustioni e fratture',
        'Riconoscere svenimenti, shock o crisi epilettiche',
        'Riconoscere e gestire le intossicazioni',
        'Utilizzare correttamente la cassetta di pronto soccorso'
      ],

      faq: [
        { domanda: 'Cos\'è il Gruppo A?', risposta: 'Sono le aziende ad alto rischio (costruzioni, chimica, industria estrattiva) o con oltre 5 dipendenti dei gruppi B/C.' },
        { domanda: 'Ogni quanto va rinnovato?', risposta: 'È obbligatorio un aggiornamento ogni 3 anni, della durata di 6 ore.' },
        { domanda: 'L\'attestato è valido in tutta Italia?', risposta: 'Sì.' },
        { domanda: 'La parte pratica si può fare in FAD?', risposta: 'No, RCP, DAE ed emorragie richiedono la presenza. Solo la parte teorica è disponibile in FAD.' },
        { domanda: 'È possibile organizzarlo in azienda?', risposta: 'Sì, con un minimo di 15 iscritti.' }
      ],

      moduli: [
        { titolo: 'MODULO C - PRATICA', durataOre: 6, argomenti: ['Capacità di intervento pratico', 'Rianimazione cardiopolmonare', 'Tecniche di sollevamento e trasporto del traumatizzato', 'Tamponamento emorragico'] },
        { titolo: 'MODULO A - TEORIA', durataOre: 6, argomenti: ['Allertare i soccorsi', 'Riconoscere le emergenze', 'Rischi specifici delle attività', 'Traumi e patologie sul lavoro'] },
        { titolo: 'MODULO B - TEORIA', durataOre: 4, argomenti: ['Anatomia dello scheletro', 'Lussazioni e fratture', 'Lesioni craniche e della colonna', 'Intossicazioni', 'Reazioni allergiche', 'Autoprotezione'] }
      ],

      corsiCorrelati: ['primo-soccorso-aziendale-livello-2', 'antincendio-livello-1', 'formazione-dei-lavoratori', 'rspp-datore-di-lavoro']
    },

    'livello-2': {
      titolo: 'Corso Primo Soccorso Aziendale Gruppo B e C',
      durataOre: 12,
      modalita: ['Aula', 'FAD', 'Videoconferenza'],
      validita: 'Aggiornamento ogni 3 anni',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 140,

      descrizione: `Il corso primo soccorso aziendale Gruppo B e C è il percorso formativo obbligatorio per i lavoratori designati come addetti al primo soccorso nelle aziende classificate nei Gruppi B e C secondo il D.M. 388/2003. Il D.Lgs. 81/08, all'art. 45, obbliga ogni datore di lavoro a designare uno o più lavoratori come addetti al primo soccorso e a garantire loro una formazione adeguata e periodicamente rinnovata.

Il D.M. 388/2003 stabilisce i contenuti minimi dei corsi e distingue tre gruppi aziendali in base al profilo di rischio. Per i Gruppi B e C il percorso prevede 12 ore di formazione, con moduli teorici e ampie esercitazioni pratiche su manichino e scenari simulati. Rientrano nel Gruppo B le aziende o unità produttive con tre o più lavoratori che non appartengono al Gruppo A. Rientrano nel Gruppo C le aziende o unità produttive con meno di tre lavoratori che non appartengono al Gruppo A. Entrambi i gruppi seguono lo stesso percorso formativo da 12 ore, a differenza del Gruppo A che prevede 16 ore per le attività ad alto rischio infortunistico.

Al termine del corso viene rilasciato un attestato di primo soccorso aziendale valido in tutta Italia. L'aggiornamento è obbligatorio ogni 3 anni, con un corso di 4 ore, diversamente dagli altri corsi di sicurezza che prevedono aggiornamento quinquennale.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti. La parte pratica deve essere svolta obbligatoriamente in presenza.`,

      aChiERivolto: [
        'Addetti in aziende del Gruppo B (3 o più lavoratori)',
        'Addetti in aziende del Gruppo C (meno di 3 lavoratori)',
        'Datori di lavoro con ruoli B/C',
        'Rinnovi di attestati scaduti',
        'Aziende di nuova costituzione'
      ],

      cosaImparerai: [
        'Riconoscere un\'emergenza e attivare il 118/112',
        'Valutare coscienza, respirazione e circolazione',
        'Eseguire la rianimazione cardiopolmonare (RCP) e usare il defibrillatore (DAE)',
        'Gestire l\'ostruzione delle vie aeree',
        'Prestare primo soccorso per emorragie, traumi e ustioni',
        'Applicare la posizione laterale di sicurezza',
        'Riconoscere svenimento e shock',
        'Utilizzare correttamente la cassetta di pronto soccorso'
      ],

      faq: [
        { domanda: 'Qual è la differenza con il Gruppo A?', risposta: 'Durata e approfondimento (16h contro 12h). RCP, DAE e traumi base sono identici.' },
        { domanda: 'Come si determina se sono Gruppo B o C?', risposta: 'Gruppo B con 3 o più lavoratori non appartenenti al Gruppo A, Gruppo C con meno di 3 lavoratori. Il corso da 12 ore è identico per entrambi.' },
        { domanda: 'Ogni quanto va rinnovato?', risposta: 'È obbligatorio un aggiornamento ogni 3 anni, della durata di 4 ore.' },
        { domanda: 'L\'attestato è valido in tutta Italia?', risposta: 'Sì.' },
        { domanda: 'È possibile organizzarlo in azienda?', risposta: 'Sì, con un minimo di 15 partecipanti.' }
      ],

      moduli: [
        { titolo: 'MODULO C - PRATICA', durataOre: 4, argomenti: ['Sistema Sanitario Nazionale (SSN)', 'Primo soccorso per sindromi cerebrali e insufficienza respiratoria acuta', 'Rianimazione cardiopolmonare (RCP)', 'Tamponamento emorragico', 'Sollevamento e trasporto del traumatizzato'] },
        { titolo: 'MODULO B - TEORIA', durataOre: 4, argomenti: ['Anatomia dello scheletro', 'Lussazioni e fratture', 'Traumi cranici, della colonna e toraco-addominali', 'Patologie specifiche', 'Intossicazioni', 'Ferite ed emorragie esterne'] },
        { titolo: 'MODULO A - TEORIA', durataOre: 4, argomenti: ['Allertare il sistema di soccorso', 'Riconoscere l\'emergenza', 'Attuare gli interventi', 'Rischi specifici delle attività'] }
      ],

      corsiCorrelati: ['primo-soccorso-aziendale-livello-1', 'antincendio-livello-1', 'formazione-dei-lavoratori', 'rspp-datore-di-lavoro']
    }
  }
};
