
// Contenuti editoriali per famiglia "Primo Soccorso Aziendale" - varianti AGGIORNAMENTO
// (Gruppo A 6 ore / Gruppo B e C 4 ore). Chiave piatta 'livello-1'/'livello-2' perché condivide gli
// stessi 2 livelli del corso base - stesso pattern di data/content/antincendio-aggiornamento-content.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Corso Primo Soccorso Aziendale Gruppo A',
    durataOre: 6,
    modalita: ['Aula', 'FAD'],
    validita: 'Aggiornamento ogni 3 anni',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 100,

    descrizione: `Il corso di aggiornamento primo soccorso Gruppo A è il percorso obbligatorio per tutti i lavoratori che hanno già conseguito l'attestato base da 16 ore e devono rinnovare la propria abilitazione entro i termini previsti dalla normativa. Il D.M. 388/2003, in combinato con il D.Lgs. 81/08, stabilisce che gli addetti al primo soccorso aziendale devono aggiornarsi obbligatoriamente ogni 3 anni.

Per il Gruppo A l'aggiornamento ha una durata di 6 ore e deve includere una parte pratica con esercitazioni su manichino - non è sufficiente la sola formazione teorica o in FAD. La scadenza dell'attestato di primo soccorso decorre dalla data di conclusione del corso base o dell'ultimo aggiornamento effettuato. Il mancato rinnovo nei termini previsti comporta la decadenza della designazione e l'obbligo di ripetere l'intero corso base da 16 ore, non il solo aggiornamento.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti. Le esercitazioni pratiche devono essere svolte obbligatoriamente in presenza.`,

    aChiERivolto: [
      'Addetti Gruppo A con attestato in scadenza o scaduto da meno di 3 anni',
      'Datori di lavoro del Gruppo A',
      'Addetti che mantengono l\'abilitazione attiva',
      'Nota bene: chi ha l\'attestato scaduto da oltre 3 anni deve ripetere il corso base completo da 16 ore'
    ],

    cosaImparerai: [
      'Aggiornare la RCP secondo le linee guida più recenti',
      'Utilizzare il DAE',
      'Gestire l\'ostruzione delle vie aeree nell\'adulto e nel bambino',
      'Prestare primo soccorso per emergenze sanitarie aziendali',
      'Utilizzare correttamente la cassetta di pronto soccorso',
      'Conoscere le novità normative'
    ],

    faq: [
      { domanda: 'Cosa succede se è scaduto da oltre 3 anni?', risposta: 'L\'attestato decade: serve rifare il corso base da 16 ore, l\'aggiornamento non è sufficiente.' },
      { domanda: 'Qual è la differenza con il corso base?', risposta: 'Il corso base (16h) è completo per neodesignati o per chi ha l\'attestato scaduto da oltre 3 anni. L\'aggiornamento (6h) è per i rinnovi triennali.' },
      { domanda: 'È possibile organizzarlo in azienda?', risposta: 'Sì, con un minimo di 15 iscritti.' },
      { domanda: 'L\'attestato è valido in tutta Italia?', risposta: 'Sì.' },
      { domanda: 'Si può fare interamente in FAD?', risposta: 'No, la parte pratica con manichino richiede la presenza.' }
    ],

    moduli: [
      {
        titolo: 'PRATICA I',
        durataOreTeoria: 0,
        durataOrePratica: 3,
        argomenti: ['Allertare il sistema di soccorso', 'Riconoscere l\'emergenza', 'Attuare gli interventi', 'Rischi specifici delle attività', 'Capacità di intervento pratico', 'Tecniche di comunicazione con il SSN']
      },
      {
        titolo: 'PRATICA II',
        durataOreTeoria: 0,
        durataOrePratica: 3,
        argomenti: ['Primo soccorso per sindromi cerebrali e insufficienza respiratoria acuta', 'Rianimazione cardiopolmonare (RCP)', 'Tamponamento emorragico', 'Sollevamento e trasporto', 'Esposizione ad agenti chimici e biologici']
      }
    ],

    corsiCorrelati: ['primo-soccorso-aziendale-livello-1', 'antincendio-livello-1', 'formazione-dei-lavoratori', 'rls']
  },

  'livello-2': {
    titolo: 'Aggiornamento Corso Primo Soccorso Aziendale Gruppo B e C',
    durataOre: 4,
    modalita: ['Aula', 'FAD'],
    validita: 'Aggiornamento ogni 3 anni',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 80,

    descrizione: `Il corso di aggiornamento primo soccorso Gruppo B e C è il percorso obbligatorio per i lavoratori designati come addetti al primo soccorso nelle aziende dei Gruppi B e C che devono rinnovare la propria abilitazione entro i termini previsti dalla normativa. Con una durata di 4 ore, più snello rispetto alle 6 ore previste per il Gruppo A, il corso mantiene un equilibrio efficace tra rapidità di esecuzione e solidità dei contenuti. Include obbligatoriamente una parte pratica con esercitazioni su manichino che non può essere sostituita dalla formazione a distanza.

Il D.M. 388/2003 stabilisce che la scadenza dell'attestato di primo soccorso è fissata a 3 anni dalla data del corso base o dell'ultimo aggiornamento. Superata questa scadenza senza aver effettuato il rinnovo, il lavoratore decade dalla designazione e deve ripetere l'intero corso base da 12 ore.

Il corso è erogabile in aula presso la sede Alètheia di Vittoria (RG) o direttamente in azienda con un minimo di 15 partecipanti.`,

    aChiERivolto: [
      'Addetti Gruppo B o C con attestato in scadenza o scaduto da meno di 3 anni',
      'Datori di lavoro del Gruppo B/C',
      'Aziende che mantengono la copertura minima degli addetti',
      'Nota bene: se scaduto da oltre 3 anni, occorre ripetere il corso base da 12 ore'
    ],

    cosaImparerai: [
      'Aggiornare la RCP',
      'Utilizzare il DAE',
      'Gestire l\'ostruzione delle vie aeree (adulto/bambino)',
      'Prestare primo soccorso per emorragie, traumi e shock',
      'Allertare correttamente il 118/112',
      'Utilizzare correttamente la cassetta di pronto soccorso'
    ],

    faq: [
      { domanda: 'Cosa succede se è scaduto da tempo?', risposta: 'Se scaduto da meno di 3 anni si può fare l\'aggiornamento da 4 ore. Se scaduto da oltre 3 anni, serve il corso base da 12 ore.' },
      { domanda: 'Qual è la differenza con l\'aggiornamento Gruppo A?', risposta: 'La durata: 6 ore per il Gruppo A, 4 ore per B/C. RCP, DAE ed emergenze base sono in comune.' },
      { domanda: 'Ogni quanto va rinnovato?', risposta: 'Ogni 3 anni.' },
      { domanda: 'Vale anche per aziende molto piccole?', risposta: 'Sì, l\'obbligo vale anche con un solo dipendente (Gruppo C).' },
      { domanda: 'L\'attestato è valido in tutta Italia?', risposta: 'Sì.' }
    ],

    moduli: [
      {
        titolo: 'MODULO 1 - PRATICA',
        durataOreTeoria: 0,
        durataOrePratica: 4,
        argomenti: ['Allertare il sistema di soccorso', 'Riconoscere un\'emergenza sanitaria', 'Attuare gli interventi di primo soccorso', 'Rischi specifici delle attività svolte', 'Capacità di intervento pratico']
      }
    ],

    corsiCorrelati: ['primo-soccorso-aziendale-livello-2', 'antincendio-livello-1', 'formazione-dei-lavoratori', 'rls']
  }
};
