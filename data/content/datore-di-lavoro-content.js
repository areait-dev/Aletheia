
// Contenuti editoriali per famiglia "Datore di Lavoro" (ex pagina isolata pages/all-courses/datore-di-lavoro.js).
// Il raw title "Datore Di Lavoro Modulo Comune" contiene il descrittore "Modulo Comune" (LEVEL_PATTERNS in
// data/courseFamilies.js), quindi la variante "corso" (16 ore) occupa la chiave posizionale 'livello-1'
// (primo livelloKey incontrato per questa famiglia). La variante "aggiornamento" (6 ore) NON condivide lo
// stesso descrittore di livello (il suo raw title "Aggiornamento Datore Di Lavoro" non contiene "Modulo
// Comune"), quindi genera un secondo livelloKey 'default' distinto -> chiave posizionale 'livello-2', vedi
// datore-di-lavoro-aggiornamento-content.js. Nell'interfaccia [slug].js questo produce uno switch a 2
// "livelli" (non un pill corso/aggiornamento annidato in un solo livello): il livello 'default', essendo
// l'unico "solo aggiornamento" della famiglia, viene comunque rietichettato automaticamente "Aggiornamento"
// (vedi soloAggiornamentoKeys in [slug].js), quindi il risultato visivo resta equivalente.
//
// NOTA: il modulo "Formazione Aggiuntiva Cantieri per Datore di Lavoro e Dirigente" (6h), presente come
// terza variante nella pagina isolata originale, NON fa parte di questa famiglia: il suo raw title
// "Modulo Aggiuntivo Cantieri per Datore di Lavoro" non contiene "Modulo Comune" né alcun altro
// LEVEL_PATTERNS, quindi buildCourseFamilies lo isola in una famiglia a sé "modulo-aggiuntivo-cantieri-
// per-datore-di-lavoro" - vedi modulo-aggiuntivo-cantieri-per-datore-di-lavoro-content.js.

module.exports = {
  'datore-di-lavoro': {
    'livello-1': {
      titolo: 'Corso di Formazione per Datore di Lavoro',
      durataOre: 16,
      modalita: ['FAD'],
      validita: 'Da mantenere con l\'aggiornamento periodico dedicato (6 ore)',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 160,

      descrizione: `Il Corso di Formazione per Datore di Lavoro, della durata di 16 ore, è obbligatorio ai sensi dell'art. 18 del D.Lgs 81/2008 e dell'Accordo Stato Regioni del 17 aprile 2025, e riguarda gli obblighi generali di formazione che gravano su chiunque rivesta il ruolo di datore di lavoro in azienda.

Questo corso è distinto dal percorso RSPP Datore di Lavoro (Modulo Comune 8 ore + modulo integrativo settoriale), che riguarda specificamente il datore di lavoro che intende svolgere direttamente anche i compiti di RSPP: qui invece si tratta della formazione generale obbligatoria per il ruolo di datore di lavoro in sé, indipendentemente dalla scelta di autodesignarsi RSPP.

Il corso si articola in due moduli: il Modulo I normativo (4 ore), sul sistema legislativo in materia di sicurezza, l'identificazione del ruolo del datore di lavoro, la delega di funzioni, la responsabilità civile, penale e amministrativa (D.Lgs 231/2001), e i rapporti con gli organi di vigilanza; il Modulo II sull'organizzazione e gestione della sicurezza sul lavoro (12 ore), su misure organizzative e gestionali ai sensi degli artt. 15 e 30 del D.Lgs 81/2008, valutazione dei rischi, gestione del rischio interferenziale e DUVRI, gestione delle emergenze, sorveglianza sanitaria, informazione e formazione dei lavoratori, e vigilanza sull'applicazione delle procedure di sicurezza.

Il corso si svolge interamente in FAD (formazione a distanza asincrona), la modalità prevista per questo corso secondo il listino Alètheia. Per i datori di lavoro che operano in cantieri temporanei o mobili è disponibile un modulo aggiuntivo specifico dedicato a questo contesto.`,

      aChiERivolto: [
        'Datori di lavoro di qualsiasi settore che devono adempiere all\'obbligo formativo previsto dall\'art. 18 del D.Lgs 81/2008',
        'Titolari di piccole e medie imprese che assumono direttamente il ruolo di datore di lavoro',
        'Neoassunti destinati a ruoli di datore di lavoro o a chi riceve delega di funzioni in tal senso',
        'Datori di lavoro che operano in cantieri e devono completare la formazione con il modulo aggiuntivo specifico'
      ],

      cosaImparerai: [
        'Comprendere il sistema legislativo in materia di salute e sicurezza dei lavoratori e il ruolo del datore di lavoro',
        'Comprendere condizioni e limiti della delega di funzioni',
        'Riconoscere la responsabilità civile, penale e amministrativa del datore di lavoro (D.Lgs 231/2001)',
        'Applicare le misure organizzative e gestionali di tutela previste dagli artt. 15 e 30 del D.Lgs 81/2008',
        'Gestire la valutazione dei rischi e la predisposizione delle misure di prevenzione e protezione',
        'Gestire il rischio interferenziale tramite il DUVRI e organizzare la gestione delle emergenze e del primo soccorso',
        'Organizzare la sorveglianza sanitaria e i processi di informazione, formazione e consultazione dei lavoratori',
        'Vigilare sul rispetto delle procedure di sicurezza e sull\'efficacia delle misure adottate'
      ],

      faq: [
        { domanda: 'Che differenza c\'è tra questo corso e il Modulo Comune RSPP Datore di Lavoro?', risposta: 'Questo corso riguarda la formazione generale obbligatoria per il ruolo di datore di lavoro; il Modulo Comune RSPP (8 ore) serve solo se si intende svolgere direttamente anche i compiti di RSPP in azienda.' },
        { domanda: 'Quanto dura il corso Formazione Datore di Lavoro?', risposta: 'Il corso dura 16 ore complessive (4 ore modulo normativo e 12 ore organizzazione e gestione).' },
        { domanda: 'Il corso si può fare in aula?', risposta: 'No, secondo il listino Alètheia questo corso è disponibile solo in modalità FAD.' },
        { domanda: 'Se opero in un cantiere devo fare formazione aggiuntiva?', risposta: 'Sì, per i datori di lavoro che operano in cantieri temporanei o mobili è disponibile un modulo aggiuntivo specifico di 6 ore.' },
        { domanda: 'Dopo questo corso serve un aggiornamento periodico?', risposta: 'Sì, è previsto un corso di aggiornamento dedicato di 6 ore.' }
      ],

      moduli: [
        { titolo: 'MODULO I - MODULO NORMATIVO', durataOre: 4, argomenti: ['Il sistema legislativo in materia di salute e sicurezza dei lavoratori', 'L\'identificazione e il ruolo del datore di lavoro in relazione al contesto organizzativo', 'I soggetti del sistema di prevenzione aziendale (D.Lgs 81/2008): compiti, obblighi, responsabilità e tutela assicurativa', 'La delega di funzioni: condizioni e limiti', 'La responsabilità civile e penale del datore di lavoro', 'La responsabilità amministrativa ai sensi del D.Lgs 231/2001 nel settore privato', 'Prevenzione della violenza e delle molestie sul luogo di lavoro (Convenzione ILO C190)', 'Inserimento di lavoratori disabili (D.Lgs 213/2003, DL 76/2013 conv. L. 99/2013)', 'I ruoli di ASL, INL, VVF e INAIL; organi di vigilanza e procedure ispettive'] },
        { titolo: 'MODULO II - ORGANIZZAZIONE E GESTIONE DELLA SSL', durataOre: 12, argomenti: ['Standard tecnico-strutturali (attrezzature, impianti, luoghi di lavoro, agenti chimici/fisici/biologici) e documentazione obbligatoria', 'Valutazione dei rischi e misure di prevenzione e protezione, inclusi stress lavoro-correlato, gravidanza, differenze di genere ed età', 'Gestione del rischio interferenziale e DUVRI', 'Organizzazione e gestione di emergenze, primo soccorso, appalti, riunioni periodiche di sicurezza', 'Sorveglianza sanitaria', 'Informazione, formazione, partecipazione e consultazione dei lavoratori', 'Vigilanza sul rispetto di procedure e istruzioni di lavoro in sicurezza', 'Modelli di organizzazione e gestione volontari; costi della mancata sicurezza; tecniche di comunicazione'] }
      ],

      corsiCorrelati: [
        'formazione-dirigente-modulo-comune',
        'modulo-aggiuntivo-cantieri-per-datore-di-lavoro',
        'rspp-datore-di-lavoro-modulo-comune'
      ]
    }
  }
};
