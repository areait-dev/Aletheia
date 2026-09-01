
// Contenuti editoriali per famiglia "Personale Alimentarista OSA" (ex pagina isolata
// pages/all-courses/personale-alimentarista-osa.js). Famiglia a variante unica (livelloKey 'default'):
// un solo livello posizionale 'livello-1' condiviso da corso e aggiornamento.
//
// NOTA: la pagina isolata gestiva due prezzi (Aula/FAD) tramite prezzoAula/prezzoFad/prezzoRowsBuilder;
// il formato standard prevede un solo campo "prezzo" numerico - qui viene usato il prezzo Aula come
// prezzo principale (coerente con CourseSchedaTecnica/CoursePricingSidebar del template [slug].js che
// mostrano un unico prezzo), con nota del prezzo FAD nella descrizione/validita se rilevante.

module.exports = {
  'personale-alimentarista-osa': {
    'livello-1': {
      titolo: 'Corso Personale Alimentarista – OSA',
      durataOre: 12,
      modalita: ['Aula', 'FAD'],
      validita: 'Da definire — aggiornamento disponibile (6 ore, pagina dedicata)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 80,

      descrizione: `La formazione degli Operatori del Settore Alimentare (OSA) è un obbligo di legge previsto dal Regolamento CE 852/2004 sull'igiene dei prodotti alimentari, che impone a chiunque manipoli, prepari, confezioni, trasporti o venda sostanze alimentari di possedere adeguate competenze in materia di igiene e sicurezza alimentare, commisurate all'attività lavorativa svolta.

Il Corso Personale Alimentarista – OSA, della durata di 12 ore, fornisce le conoscenze necessarie per operare in sicurezza lungo tutta la filiera alimentare, con l'obiettivo di prevenire le contaminazioni chimiche, fisiche e biologiche che possono compromettere la salubrità degli alimenti e la salute dei consumatori.

Il programma affronta la corretta gestione dell'igiene personale e delle strutture di lavorazione, le buone pratiche di manipolazione e conservazione dei cibi, il rispetto della catena del freddo e del caldo, e l'applicazione pratica dei principi del sistema HACCP (Hazard Analysis and Critical Control Points), lo strumento di autocontrollo obbligatorio per l'individuazione e la gestione dei punti critici del processo produttivo.

Un focus specifico è dedicato alla corretta gestione degli allergeni alimentari, in conformità al Regolamento UE 1169/2011 sull'informazione ai consumatori, e alla prevenzione delle contaminazioni crociate nelle fasi di preparazione, conservazione e somministrazione degli alimenti.

Al termine del corso è previsto il rilascio dell'attestato di frequenza, valido su tutto il territorio nazionale, che sostituisce il precedente libretto sanitario abolito dalla normativa vigente. Il corso è disponibile in Aula (€ 80,00 + IVA) o in FAD (€ 70,00 + IVA).`,

      aChiERivolto: [
        'Titolari di imprese alimentari e responsabili del sistema di autocontrollo HACCP',
        'Cuochi, aiuto cuochi e personale di cucina',
        'Camerieri, baristi e personale di sala a contatto con gli alimenti',
        'Pasticceri, panificatori e macellai',
        'Addetti alla manipolazione, al confezionamento, al trasporto e alla vendita di sostanze alimentari'
      ],

      cosaImparerai: [
        'Il quadro normativo di riferimento sull\'igiene alimentare: Regolamento CE 852/2004 e normativa collegata',
        'I principali pericoli alimentari: contaminazioni chimiche, fisiche e biologiche',
        'L\'igiene del personale e la corretta gestione delle strutture, delle attrezzature e degli ambienti di lavorazione',
        'Le buone pratiche di lavorazione e le procedure di sanificazione degli ambienti e delle attrezzature',
        'I principi dell\'autocontrollo e del sistema HACCP per l\'individuazione dei punti critici di controllo',
        'La corretta conservazione degli alimenti, il rispetto della catena del freddo e del caldo e la gestione degli allergeni'
      ],

      faq: [
        { domanda: 'Chi è l\'OSA e chi ha l\'obbligo di frequentare questo corso?', risposta: 'L\'OSA (Operatore del Settore Alimentare) è chiunque, nell\'ambito della propria attività, manipoli, prepari, confezioni, trasporti, distribuisca o venda sostanze alimentari. Il Regolamento CE 852/2004 impone a tutti questi soggetti un adeguato livello di formazione in materia di igiene alimentare, commisurato al ruolo svolto.' },
        { domanda: 'Questo corso sostituisce il vecchio libretto sanitario?', risposta: 'Sì. Il libretto sanitario è stato abolito e sostituito dall\'obbligo di formazione specifica in materia di igiene alimentare: l\'attestato rilasciato al termine del corso rappresenta il documento oggi riconosciuto e richiesto per operare nel settore alimentare.' },
        { domanda: 'Il corso include la gestione degli allergeni?', risposta: 'Sì, il programma dedica una parte specifica alla corretta gestione e comunicazione degli allergeni alimentari ai sensi del Regolamento UE 1169/2011, oltre alla prevenzione delle contaminazioni crociate.' }
      ],

      // NOTA: nella pagina isolata originale questa variante non aveva un programma moduli dettagliato
      // (placeholder in attesa del PDF ufficiale). Modulo unico riepilogativo fornito per compatibilità
      // con il template [slug].js.
      moduli: [
        { titolo: 'PROGRAMMA CORSO PERSONALE ALIMENTARISTA - OSA', durataOre: 12, argomenti: ['Quadro normativo: Regolamento CE 852/2004', 'Pericoli alimentari: contaminazioni chimiche, fisiche e biologiche', 'Igiene del personale e delle strutture di lavorazione', 'Buone pratiche di lavorazione e sanificazione', 'Sistema HACCP e punti critici di controllo', 'Conservazione degli alimenti e gestione degli allergeni'] }
      ],

      corsiCorrelati: [
        'formazione-dei-lavoratori-rischio-basso',
        'formazione-dei-lavoratori-rischio-medio'
      ]
    }
  }
};
