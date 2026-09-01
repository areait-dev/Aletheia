
// Contenuti editoriali per famiglia "PES/PAV Lavori Elettrici" (ex pagina isolata
// pages/all-courses/pes-pav-lavori-elettrici.js). Le 2 varianti raw in data/coursesRaw.js ("Sotto
// Tensione" 16h e "In Prossimità" 12h) condividono il famTitle "PES/PAV Lavori Elettrici" (i descrittori
// "Sotto Tensione"/"In Prossimità" sono isolati da LEVEL_PATTERNS in data/courseFamilies.js), quindi
// 'livello-1'/'livello-2' sono posizionali (stesso ordine delle 2 voci raw). Nessun aggiornamento raw
// corrispondente: famiglia solo tipo 'corso' su entrambi i livelli.

module.exports = {
  'pes-pav-lavori-elettrici': {
    'livello-1': {
      titolo: 'Corso PES, PAV, PEI per Addetti ai Lavori Elettrici Sotto Tensione',
      durataOre: 16,
      modalita: ['Aula', 'FAD'],
      validita: 'Aggiornamento periodico previsto dalla normativa',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 250,

      descrizione: `Il Corso PES, PAV, PEI per Addetti ai Lavori Elettrici Sotto Tensione, della durata di 16 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e della nuova Norma CEI 11-27, VI edizione 2025, per chiunque debba conseguire o mantenere le qualifiche di PES (Persona Esperta), PAV (Persona Avvertita) e PEI (Persona Esperta lavori sotto tensione).

Il corso affronta i rischi di folgorazione, arco elettrico e ustioni connessi ai lavori elettrici, allineandosi alle novità introdotte dalla VI edizione 2025 della norma su impianti in bassa, media e alta tensione. Vengono trattati la CEI EN 50110-1, gli effetti dell'elettricità sul corpo umano, la scelta e l'uso dei DPI, i ruoli di GL (Gestore Lavori), RI (Responsabile Impianto) e RLE (Referente Lavori Elettrici), il calcolo delle distanze di sicurezza, la redazione di piani di lavoro e piani di intervento, e le procedure operative per lavori fuori tensione, in prossimità e sotto tensione in bassa tensione (BT).

Il programma prevede 4 ore di teoria e 12 ore di pratica: la parte pratica include esercitazioni sulla scelta dei DPI, sulla messa a terra e in cortocircuito, e sulla gestione delle terre di lavoro in cantiere e in impianto.

Il corso è disponibile in aula o in FAD (formazione a distanza); la videoconferenza non è prevista per questa variante, dato il carattere pratico dell'addestramento sotto tensione. È possibile organizzare la formazione anche direttamente in azienda.`,

      aChiERivolto: [
        'Lavoratori che devono conseguire o rinnovare la qualifica PES o PAV',
        'Addetti PEI destinati a operare sotto tensione in bassa tensione (BT)',
        'Manutentori e tecnici di impianti elettrici industriali, civili e di cantiere',
        'RI (Responsabile Impianto) e RLE (Referente Lavori Elettrici) da aggiornare alla Norma CEI 11-27 edizione 2025',
        'Datori di lavoro che devono garantire la formazione del personale addetto ai lavori elettrici ai sensi dell\'art. 37 D.Lgs 81/2008'
      ],

      cosaImparerai: [
        'Applicare le disposizioni legislative del D.Lgs 81/2008 sui lavori elettrici',
        'Conoscere le prescrizioni della Norma CEI 11-27 edizione 2025 e della CEI EN 50110-1',
        'Riconoscere gli effetti dell\'arco elettrico e intervenire con il primo soccorso',
        'Scegliere e utilizzare correttamente i DPI per lavori sotto tensione',
        'Comprendere i compiti di GL, RI e RLE',
        'Calcolare le distanze di sicurezza dalle parti attive',
        'Redigere ed applicare il piano di lavoro e il piano di intervento',
        'Applicare le procedure per lavori fuori tensione, in prossimità e sotto tensione in BT, inclusa la messa a terra e in cortocircuito'
      ],

      faq: [
        { domanda: 'Cosa significano le sigle PES, PAV e PEI?', risposta: 'PES (Persona Esperta) e PAV (Persona Avvertita) sono le qualifiche previste dalla Norma CEI 11-27 per chi opera su impianti elettrici; PEI (Persona Esperta lavori sotto tensione) è la qualifica specifica per chi esegue lavori direttamente sotto tensione in bassa tensione.' },
        { domanda: 'Il corso segue la nuova edizione della CEI 11-27?', risposta: 'Sì, il programma è aggiornato alla Norma CEI 11-27, VI edizione 2025, che introduce novità sulla gestione dei lavori elettrici in bassa, media e alta tensione.' },
        { domanda: 'Quanto dura il corso e come è articolato?', risposta: 'Il corso dura 16 ore complessive: 4 ore di teoria sulla normativa e le procedure, e 12 ore di pratica con esercitazioni su DPI, messa a terra e in cortocircuito.' },
        { domanda: 'Il corso si può fare in FAD?', risposta: 'Sì, secondo il listino Alètheia questo corso è disponibile in aula o in FAD; la videoconferenza non è prevista per questa variante.' },
        { domanda: 'Questo corso abilita anche ai lavori in prossimità?', risposta: 'Per i soli lavori in prossimità (senza operare sotto tensione) è disponibile il corso dedicato da 12 ore, secondo livello di questa stessa famiglia.' }
      ],

      moduli: [
        { titolo: 'MODULO I - NORMATIVA E RISCHIO ELETTRICO', durataOre: 2, argomenti: ['D.Lgs 81/2008 e Norma CEI 11-27 ed. 2025', 'CEI EN 50110-1', 'Effetti dell\'elettricità e arco elettrico'] },
        { titolo: 'MODULO II - RUOLI, DPI E PIANIFICAZIONE', durataOre: 2, argomenti: ['Ruoli di GL, RI e RLE', 'Scelta e uso dei DPI', 'Calcolo delle distanze di sicurezza', 'Piano di lavoro e piano di intervento'] },
        { titolo: 'MODULO III - PRATICA: PROCEDURE OPERATIVE', durataOre: 8, argomenti: ['Procedure fuori tensione, in prossimità e sotto tensione in BT', 'Scelta pratica dei DPI', 'Messa a terra e in cortocircuito'] },
        { titolo: 'MODULO IV - PRATICA: ESERCITAZIONI E VERIFICA', durataOre: 4, argomenti: ['Terre di lavoro', 'Simulazioni operative', 'Verifica pratica finale'] }
      ],

      corsiCorrelati: [
        'pes-pav-lavori-elettrici-livello-2',
        'formazione-dei-lavoratori-rischio-medio',
        'formazione-dei-lavoratori-rischio-alto'
      ]
    },

    'livello-2': {
      titolo: 'Corso PES, PAV per Addetti ai Lavori Elettrici in Prossimità',
      durataOre: 12,
      modalita: ['Aula', 'FAD'],
      validita: 'Aggiornamento periodico previsto dalla normativa',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 200,

      descrizione: `Il Corso PES, PAV per Addetti ai Lavori Elettrici in Prossimità, della durata di 12 ore, è obbligatorio ai sensi dell'art. 37 del D.Lgs 81/2008 e della Norma CEI 11-27, VI edizione 2025, per chi opera in prossimità di parti attive di impianti elettrici senza eseguire lavori sotto tensione.

A differenza del corso Sotto Tensione, questa variante non prevede addestramento operativo su parti in tensione: si concentra sulla valutazione del rischio da prossimità, sul mantenimento delle distanze di sicurezza (DL4, DA, DV) e sulle misure organizzative e di segnalazione necessarie per lavorare in sicurezza vicino a impianti elettrici attivi.

Il programma tratta la CEI EN 50110-1, i ruoli di GL (Gestore Lavori), RI (Responsabile Impianto) e RLE (Referente Lavori Elettrici), il calcolo e la delimitazione delle zone di rispetto e di lavoro, la scelta dei DPI idonei ai lavori in prossimità, e le procedure di segnalazione e delimitazione dell'area.

Il corso è disponibile in aula o in FAD; la videoconferenza non è prevista. È possibile organizzare la formazione anche direttamente in azienda. Chi deve operare anche sotto tensione deve invece frequentare il corso da 16 ore.`,

      aChiERivolto: [
        'Lavoratori che operano in prossimità di parti attive senza eseguire lavori sotto tensione',
        'Manutentori e tecnici che devono mantenere la qualifica PAV',
        'Addetti a lavori edili, di giardinaggio o di cantiere in prossimità di linee e impianti elettrici',
        'RI e RLE che devono aggiornare le procedure di gestione della prossimità alla Norma CEI 11-27 edizione 2025',
        'Datori di lavoro che devono garantire la formazione del personale che opera in prossimità di impianti elettrici ai sensi dell\'art. 37 D.Lgs 81/2008'
      ],

      cosaImparerai: [
        'Applicare le disposizioni legislative del D.Lgs 81/2008 sui lavori in prossimità di impianti elettrici',
        'Conoscere le prescrizioni della Norma CEI 11-27 edizione 2025 e della CEI EN 50110-1 sulla prossimità',
        'Calcolare e delimitare le zone di rispetto e di lavoro',
        'Scegliere e utilizzare i DPI idonei ai lavori in prossimità',
        'Comprendere i compiti di GL, RI e RLE nella gestione della prossimità',
        'Applicare le procedure di segnalazione e delimitazione dell\'area di lavoro'
      ],

      faq: [
        { domanda: 'In cosa si differenzia questo corso da quello Sotto Tensione (16 ore)?', risposta: 'Questo corso abilita a operare in prossimità di parti attive senza eseguire lavori sotto tensione; per operare direttamente sotto tensione in bassa tensione è necessario il corso PEI da 16 ore, primo livello di questa stessa famiglia.' },
        { domanda: 'Il corso segue la nuova edizione della CEI 11-27?', risposta: 'Sì, il programma è aggiornato alla Norma CEI 11-27, VI edizione 2025.' },
        { domanda: 'Quanto dura il corso per lavori in prossimità?', risposta: 'Il corso dura 12 ore complessive, tra normativa, calcolo delle distanze di sicurezza e procedure operative di prossimità.' },
        { domanda: 'Il corso si può fare in FAD?', risposta: 'Sì, secondo il listino Alètheia questo corso è disponibile in aula o in FAD; la videoconferenza non è prevista.' }
      ],

      moduli: [
        { titolo: 'MODULO I - NORMATIVA E RISCHIO DA PROSSIMITÀ', durataOre: 4, argomenti: ['D.Lgs 81/2008 e Norma CEI 11-27 ed. 2025', 'CEI EN 50110-1', 'Effetti dell\'elettricità'] },
        { titolo: 'MODULO II - RUOLI E DISTANZE DI SICUREZZA', durataOre: 4, argomenti: ['Ruoli di GL, RI e RLE', 'Calcolo e delimitazione delle zone di rispetto e di lavoro', 'DPI per lavori in prossimità'] },
        { titolo: 'MODULO III - PROCEDURE OPERATIVE E VERIFICA', durataOre: 4, argomenti: ['Segnalazione e delimitazione dell\'area', 'Casi pratici', 'Verifica finale'] }
      ],

      corsiCorrelati: [
        'pes-pav-lavori-elettrici-livello-1',
        'formazione-dei-lavoratori-rischio-medio',
        'lavori-in-quota'
      ]
    }
  }
};
