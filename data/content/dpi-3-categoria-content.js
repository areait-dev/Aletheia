// Contenuti editoriali per la variante "Corso" (8 ore) della famiglia dpi-3-categoria (family.id
// 'dpi-3-categoria'), un solo livello 'livello-1'. L'aggiornamento vive in dpi-3-categoria-aggiornamento-content.js.
// FONTE: Word "dpi 3categoria.docx" (CONTENUTI DEF / corsi obbligatori), testi invariati.
// Il Word non indica il numero massimo di partecipanti: partecipantiMax omesso. Prezzo non mostrato (richiesta cliente).
// Corsi correlati: "Rischi elettrici" -> 'pes-pav-lavori-elettrici' (famiglia più vicina nel catalogo).

module.exports = {
  'dpi-3-categoria': {
    'livello-1': {
      titolo: 'DPI 3° Categoria',
      durataOre: 8,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni',
      attestato: 'Attestato valido su tutto il territorio nazionale',

      descrizione: `Il D.Lgs. 81/2008, all’art. 77, comma 4, lettera h) e comma 5, lettera a), impone al datore di lavoro di fornire ai lavoratori una formazione adeguata e specifica sull’utilizzo dei DPI di terza categoria, quelli destinati a proteggere da rischi gravi o letali, quali la caduta dall’alto, l’esposizione ad agenti chimici pericolosi o i rischi elettrici.

Durante il percorso vengono approfonditi i riferimenti normativi, le caratteristiche dei dispositivi, i criteri di scelta in funzione dei rischi presenti e le procedure per il loro corretto utilizzo, conservazione e manutenzione.

Una parte del corso è dedicata all'addestramento pratico, indispensabile per acquisire familiarità con i dispositivi e imparare a utilizzarli in condizioni operative sicure.

Il corso è organizzato in conformità agli obblighi di formazione e addestramento previsti dall'art. 77 del D.Lgs. 81/2008.

Formazione in aula con esercitazioni pratiche e addestramento all'utilizzo dei dispositivi.`,

      aChiERivolto: [
        'Addetti a lavori in quota (edili, lattonieri, carpentieri, antennisti, spazzacamini, potatori)',
        'Addetti a sospensione su fune (lavavetri, disgaggi su parete rocciosa, posa reti)',
        'Operatori esposti a rischi chimici, termici o elettrici gravi',
      ],

      cosaImparerai: [
        'Riconoscere le diverse tipologie di DPI e le relative categorie',
        'Comprendere gli obblighi normativi relativi all\'utilizzo dei dispositivi di protezione individuale',
        'Individuare i DPI più idonei in relazione ai rischi presenti nell\'attività lavorativa',
        'Effettuare i controlli preliminari sullo stato e sull\'integrità dei dispositivi',
        'Indossare e utilizzare correttamente i DPI di III categoria',
        'Conoscere le procedure di conservazione, manutenzione e gestione dei dispositivi',
        'Applicare le corrette procedure operative per lavorare in sicurezza',
      ],

      faq: [
        {
          domanda: 'Che cosa sono i DPI di III categoria?',
          risposta: 'I DPI di III categoria sono dispositivi di protezione individuale destinati a proteggere il lavoratore da rischi che possono causare conseguenze molto gravi, come morte o danni irreversibili alla salute. Rientrano in questa categoria, tra gli altri, i dispositivi di protezione contro le cadute dall\'alto e alcuni dispositivi di protezione delle vie respiratorie.',
        },
        {
          domanda: 'Chi deve frequentare il corso DPI di III categoria?',
          risposta: 'Devono ricevere formazione e addestramento specifici i lavoratori che utilizzano DPI di III categoria nello svolgimento delle proprie mansioni. Il corso è particolarmente indicato per chi esegue lavori in quota, manutenzioni, installazioni e attività che comportano il rischio di caduta dall\'alto.',
        },
        {
          domanda: 'Quanto dura il corso DPI anticaduta di III categoria?',
          risposta: 'Il corso proposto da Alètheia ha una durata complessiva di 8 ore, suddivise in 4 ore di formazione teorica e 4 ore dedicate all\'addestramento pratico.',
        },
        {
          domanda: 'Il corso DPI di III categoria comprende una prova pratica?',
          risposta: 'Sì. La formazione comprende una parte pratica durante la quale i partecipanti apprendono le corrette modalità di vestizione, regolazione, controllo e utilizzo dei dispositivi, con particolare riferimento ai sistemi di protezione contro le cadute dall\'alto.',
        },
        {
          domanda: 'Quando è necessario aggiornare la formazione sui DPI di III categoria?',
          risposta: 'La formazione e l\'addestramento devono essere ripetuti quando cambiano le condizioni di lavoro, i rischi, i dispositivi utilizzati o quando emergono nuove esigenze formative. È inoltre necessario verificare le indicazioni del fabbricante e le eventuali disposizioni applicabili al settore e alla specifica attività lavorativa.',
        },
      ],

      moduli: [
        {
          titolo: 'MODULO 1 - TEORICO',
          durataOre: 4,
          argomenti: [
            'La normativa di riferimento in materia di salute e sicurezza sul lavoro',
            'Il D.Lgs. 81/2008 e gli obblighi relativi all\'utilizzo dei DPI',
            'Classificazione dei dispositivi di protezione individuale: categorie I, II e III',
            'Caratteristiche e requisiti dei DPI di III categoria',
            'Criteri di scelta dei dispositivi in relazione alla valutazione dei rischi',
            'Tipologie di DPI anticaduta: imbracature, cordini, assorbitori di energia, connettori e sistemi di ancoraggio',
            'Rischi connessi ai lavori in quota e principali misure di prevenzione e protezione',
            'Controlli, verifiche, manutenzione e conservazione dei dispositivi',
            'Responsabilità del datore di lavoro e dei lavoratori',
          ],
        },
        {
          titolo: 'MODULO 2 - PRATICO',
          durataOre: 4,
          argomenti: [
            'Analisi dei dispositivi e delle relative caratteristiche',
            'Verifica preliminare dello stato di conservazione e integrità dei DPI',
            'Controllo dei componenti e riconoscimento di eventuali anomalie',
            'Corretta vestizione e regolazione dell\'imbracatura',
            'Collegamento dei dispositivi e utilizzo dei sistemi anticaduta',
            'Individuazione e utilizzo dei punti di ancoraggio, secondo le procedure previste',
            'Esercitazioni pratiche sulle corrette modalità di utilizzo',
            'Procedure di gestione e conservazione dei DPI dopo l\'impiego',
          ],
        },
      ],

      corsiCorrelati: [
        'lavori-in-quota',
        'pes-pav-lavori-elettrici',
      ],
    },
  },
};
