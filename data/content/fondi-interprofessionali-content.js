// Contenuti editoriali per famiglia "Fondi Interprofessionali" (family.id 'fondi-interprofessionali'), variante unica
// (solo tipo 'corso'), un solo livello 'livello-1'.
// FONTE: testi già presenti in pages/formazione/fondi-interprofessionali.js (paragrafi introduttivi, vantaggi,
// elenco fondi partner, FAQ). Non è un corso con ore/programma: durata, validità, attestato e moduli sono omessi
// e la pagina li nasconde (guardie opzionali in pages/all-courses/[slug].js).

module.exports = {
  'fondi-interprofessionali': {
    'livello-1': {
      titolo: 'Fondi Interprofessionali per le aziende',

      descrizione: `L'adesione a un Fondo Interprofessionale è gratuita e non comporta costi aggiuntivi per l'azienda. Una volta individuato il Fondo più adatto al tuo settore, le risorse accantonate (lo 0,30% dei contributi INPS già versati) possono finanziare percorsi di formazione costruiti sulle reali esigenze della tua impresa. Alètheia gestisce l'intero processo, dalla verifica delle opportunità disponibili alla progettazione dei corsi, fino alla gestione documentale e alla rendicontazione.

I vantaggi per le aziende che aderiscono ai Fondi Interprofessionali: formazione a costo zero (o quasi), perché i corsi sono finanziati dal Fondo e non dal bilancio aziendale; percorsi su misura, progettati sui reali fabbisogni della tua azienda e non corsi standard; dipendenti più competenti e aggiornati, senza dover trovare budget extra; più produttività e competitività, con un investimento che non pesa sui costi correnti; valorizzazione di risorse che altrimenti resterebbero inutilizzate.

La vera difficoltà non è trovare i finanziamenti, ma gestire correttamente tutto il percorso: scelta del fondo, analisi dei fabbisogni, progettazione, gestione amministrativa e rendicontazione. Alètheia affianca le imprese in ogni fase, dalla prima analisi fino alla rendicontazione finale: non è necessario avere già un progetto definito, bastano poche informazioni per trasformarle in un piano formativo finanziato e pronto per essere realizzato.

Fondi con cui operiamo: Fondimpresa, Fon.Ter, For.Agri, Fon.Ar.Com., Fondoforte, Fondartigianato, Fondoconoscenze, Formazienda, For.Te.`,

      aChiERivolto: [
        "Aziende con dipendenti, di qualsiasi settore e dimensione, che versano già il contributo obbligatorio dello 0,30% all'INPS",
      ],

      faq: [
        {
          domanda: 'Chi può accedere ai Fondi Interprofessionali?',
          risposta: "Tutte le aziende con dipendenti, di qualsiasi settore e dimensione, che versano già il contributo obbligatorio dello 0,30% all'INPS. Basta aderire al Fondo scelto: l'adesione è gratuita e non comporta costi aggiuntivi.",
        },
        {
          domanda: 'Quanto costa alla mia azienda?',
          risposta: "Nulla di aggiuntivo: i corsi sono finanziati dal Fondo con le risorse che l'azienda versa già per legge tramite i contributi INPS. Non è un incentivo da richiedere, ma un contributo già dovuto da attivare.",
        },
        {
          domanda: 'Quale Fondo devo scegliere per la mia azienda?',
          risposta: "Dipende dal settore e dal CCNL applicato (es. Fon.Ter, For.Agri, Fondimpresa e altri). Il nostro team verifica gratuitamente qual è il Fondo più adatto e ti segue nell'attivazione.",
        },
        {
          domanda: 'Quanto tempo serve per attivare un percorso formativo?',
          risposta: "I tempi variano in base al Fondo e all'avviso di riferimento. Alètheia segue l'intero iter, dall'analisi dei fabbisogni alla progettazione, per rendere il processo il più rapido possibile.",
        },
      ],
    },
  },
};
