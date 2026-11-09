/**
 * Pagine di categoria del catalogo: /corsi/<slug>. Sono SOLO queste quattro (elenco esplicito): ogni slug qui sotto ha il suo file in
 * pages/corsi/<slug>.js, che in Next ha la precedenza sulla route dinamica pages/corsi/[slug].js (le schede corso).
 * tests/regressione/categorie-corsi.spec.mjs controlla che nessuno slug di corso coincida con uno di questi.
 *
 *  - slug:        indirizzo della pagina;
 *  - subKey:      sotto-categoria dei corsi (campo subKey di data/coursesRaw.js) mostrata dalla pagina;
 *  - macroKey:    categoria "grande" della sidebar del catalogo che coincide con questa pagina (stessi corsi);
 *  - h1:          titolo della pagina, la parola tra *asterischi* è evidenziata come nelle altre hero;
 *  - title:       <title> della pagina (formato "Nome pagina - Alètheia Srl");
 *  - description: meta description, 140-160 caratteri (controllata dal test).
 */
const CATEGORIE_CORSI = {
  'sicurezza-lavoro': {
    slug: 'sicurezza-lavoro',
    subKey: 'sicurezza-lavoro',
    macroKey: 'sicurezza-lavoro',
    nome: 'Sicurezza sui luoghi di lavoro',
    eyebrow: 'Formazione obbligatoria',
    h1: 'Corsi di *sicurezza* sul lavoro',
    sottotitolo: 'Lavoratori, preposti, dirigenti, RSPP, antincendio e primo soccorso: i corsi obbligatori del D.Lgs. 81/08 con attestato valido in tutta Italia.',
    title: 'Corsi di sicurezza sul lavoro - Alètheia Srl',
    description: 'Corsi di sicurezza sul lavoro a Vittoria (RG): lavoratori, preposti, dirigenti, RSPP, antincendio e primo soccorso. Attestato valido in tutta Italia.',
  },
  'decreto-attrezzature': {
    slug: 'decreto-attrezzature',
    subKey: 'decreto-attrezzature',
    macroKey: 'decreto-attrezzature',
    nome: 'Decreto attrezzature',
    eyebrow: 'Formazione obbligatoria',
    h1: 'Corsi *Decreto Attrezzature*',
    sottotitolo: 'Abilitazione all’uso delle attrezzature di lavoro: carrelli elevatori, PLE, gru, macchine movimento terra, trattori e altre macchine, con teoria e prova pratica.',
    title: 'Corsi Decreto Attrezzature - Alètheia Srl',
    description: 'Corsi Decreto Attrezzature a Vittoria (RG): carrelli elevatori, PLE, gru, macchine movimento terra e trattori. Teoria in aula e prova pratica.',
  },
  'certificazioni-informatiche': {
    slug: 'certificazioni-informatiche',
    subKey: 'icdl',
    macroKey: 'digitali',
    nome: 'Certificazioni Informatiche',
    eyebrow: 'Competenze digitali',
    h1: 'Corsi per *certificazioni* informatiche',
    sottotitolo: 'I corsi ICDL: Base, Standard, Full Standard, DigComp 2.2 e Update, per certificare le tue competenze digitali.',
    title: 'Corsi certificazioni informatiche ICDL - Alètheia Srl',
    description: 'Corsi per le certificazioni informatiche ICDL a Vittoria (RG): Base, Standard, Full Standard, DigComp 2.2 e Update. Certifica le tue competenze digitali.',
  },
  'corsi-qualificati': {
    slug: 'corsi-qualificati',
    subKey: 'certificazione',
    macroKey: 'professionale',
    nome: 'Corsi Qualificati',
    eyebrow: 'Formazione professionale',
    h1: 'Corsi *qualificati*',
    sottotitolo: 'Operatore socio sanitario (OSS), ASACOM e BLSD: percorsi professionali con qualifica o attestato, con requisiti e iscrizioni dedicati.',
    title: 'Corsi qualificati - Alètheia Srl',
    description: 'Corsi qualificati a Vittoria (RG): operatore socio sanitario (OSS), ASACOM e BLSD. Percorsi professionali con qualifica o attestato: scopri requisiti e date.',
  },
};

/**
 * Vecchio filtro /corsi?categoria=<chiave> (e /all-courses?categoria=<chiave>) -> destinazione finale, usato da next.config.js (301).
 * Le categorie che hanno già una pagina in /formazione non diventano pagine di categoria del catalogo.
 */
const DESTINAZIONE_CATEGORIA = {
  'sicurezza-lavoro': '/corsi/sicurezza-lavoro',
  'decreto-attrezzature': '/corsi/decreto-attrezzature',
  fitosanitario: '/corsi/patentino-fitosanitario', // un solo corso: niente pagina di categoria, si va alla scheda
  'sicurezza-alimentare': '/corsi/personale-alimentarista-osa', // un solo corso: niente pagina di categoria, si va alla scheda
  icdl: '/corsi/certificazioni-informatiche',
  'certificazioni-informatiche': '/corsi/certificazioni-informatiche',
  certificazione: '/corsi/corsi-qualificati',
  'fse-plus': '/formazione/regionale-fse',
  'fondo-nuove-competenze': '/formazione/fondo-nuove-competenze',
  'fondi-interprofessionali': '/formazione/fondi-interprofessionali',
  ecm: '/formazione/ecm',
  'corsi-pa': '/formazione/corsi-pa',
};

/** Categorie "grandi" della sidebar con un solo corso: il link va direttamente alla scheda. */
const LINK_DIRETTI_MACRO = { fitosanitario: '/corsi/patentino-fitosanitario', 'sicurezza-alimentare': '/corsi/personale-alimentarista-osa' };

module.exports = { CATEGORIE_CORSI, DESTINAZIONE_CATEGORIA, LINK_DIRETTI_MACRO };
