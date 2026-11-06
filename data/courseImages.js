// Immagini dei corsi per famiglia (slug della famiglia -> file in public/images/corsi/).
// Le famiglie non elencate qui mantengono l'immagine della scheda in data/coursesRaw.js.
// I file sono ottimizzati (1200px di larghezza, JPEG) a partire dalle immagini fornite in "formazione obbligatoria".
const COURSE_IMAGES = {
  'spazi-confinati': '/images/corsi/spazi-confinati.jpg',
  'antincendio': '/images/corsi/antincendio.jpg',
  'modulo-aggiuntivo-cantieri-per-datore-di-lavoro': '/images/corsi/cantieri-datore-di-lavoro.jpg',
  'addetti-caricatori-movimentazione-di-materiali-cmm': '/images/corsi/caricatori-movimentazione.jpg',
  'carrelli-elevatori-semoventi-con-conduttore-a-bordo': '/images/corsi/carrelli-elevatori.jpg',
  'addetti-alla-conduzione-di-carriponte': '/images/corsi/carroponte.jpg',
  'addetti-alla-conduzione-di-carriponti-pensile-cabina': '/images/corsi/carroponte.jpg',
  'coordinatori-cantieri-cse-csp': '/images/corsi/coordinatori-cantieri.jpg',
  'datore-di-lavoro': '/images/corsi/datore-di-lavoro.jpg',
  'formazione-dirigente': '/images/corsi/dirigente-sicurezza.jpg',
  'dpi-3-categoria': '/images/corsi/dpi-3-categoria.jpg',
  'formazione-del-preposto': '/images/corsi/preposto.jpg',
  'formazione-per-formatore': '/images/corsi/formatori.jpg',
  'formazione-dei-lavoratori': '/images/corsi/formazione-lavoratori.jpg',
  'lavoratori-addetti-all-attivita-di-apposizione-integrazione-e-rimozione-della-segnaletica-stradale': '/images/corsi/segnaletica-stradale.jpg',
  'lavori-in-quota': '/images/corsi/lavori-in-quota.jpg',
  'macchine-movimento-terra': '/images/corsi/macchine-movimento-terra.jpg',
  'conduttore-d-impresa-agricola': '/images/corsi/impresa-agricola.jpg',
  'pes-pav-lavori-elettrici': '/images/corsi/pes-pav.jpg',
  'pimus-ponteggi': '/images/corsi/pimus-ponteggi.jpg',
  'primo-soccorso-aziendale': '/images/corsi/primo-soccorso.jpg',
  'rls': '/images/corsi/rls.jpg',
  'rspp-aspp': '/images/corsi/rspp-aspp.jpg',
  'rspp-datore-di-lavoro': '/images/corsi/rspp-datore-di-lavoro.jpg',
  'personale-alimentarista-osa': '/images/corsi/sicurezza-alimentare.jpg',
  'trattori-agricoli-o-forestali': '/images/corsi/trattori-agricoli.jpg',
  'operatore-di-gru-per-autocarro': '/images/corsi/gru-per-autocarro.jpg',
  'ple-piattaforme-di-lavoro-mobili-elevabili': '/images/corsi/ple.jpg',
  'pompe-per-calcestruzzo': '/images/corsi/pompe-calcestruzzo.jpg',
  'addetti-macchina-raccogli-frutta-crf': '/images/corsi/raccogli-frutta.jpg',
  'addetti-macchina-raccogli-frutta-aggiornamento': '/images/corsi/raccogli-frutta.jpg',
  'patentino-fitosanitario': '/images/formazione-obbligatoria/patentino-fitosanitario.jpg',
  // Immagini fornite dal cliente (cartella "corsi con qualifica" e "icdl"), WebP 1200px: sostituiscono le foto stock remote.
  'icdl-base': '/images/corsi/icdl-base.webp',
  'icdl-standard': '/images/corsi/icdl-standard.webp',
  'icdl-full-standard': '/images/corsi/icdl-full-standard.webp',
  'icdl-digcomp-2-2': '/images/corsi/icdl-digcomp-2-2.webp',
  'icdl-update': '/images/corsi/icdl-update.webp',
  'oss-operatore-socio-sanitario': '/images/corsi/oss.webp',
  'asacom-assistente-alla-comunicazione': '/images/corsi/asacom.webp',
  'blsd-basic-life-support-and-defibrillation': '/images/corsi/blsd.webp',
};

// Testo alternativo (alt) delle immagini aggiunte il 6 nov 2026, descrive la scena. Le altre famiglie usano il titolo del corso.
const COURSE_IMAGE_ALT = {
  'icdl-base': 'Giovane donna che lavora al computer portatile su una scrivania di legno, con quaderno e tazza accanto',
  'icdl-standard': 'Donna che scrive al computer portatile in un ambiente luminoso con piante',
  'icdl-full-standard': 'Uomo al computer portatile in un ufficio con grandi vetrate al tramonto',
  'icdl-digcomp-2-2': 'Studentessa seduta su una scalinata di biblioteca con computer portatile e smartphone',
  'icdl-update': 'Uomo che lavora al computer portatile vicino a una finestra, con tazza e quaderno sulla scrivania',
  'oss-operatore-socio-sanitario': 'Operatrice socio sanitaria in divisa verde petrolio, sorridente, in un corridoio luminoso',
  'asacom-assistente-alla-comunicazione': 'Educatrice che aiuta un bambino in un\'attività didattica in aula',
  'blsd-basic-life-support-and-defibrillation': 'Manovra di rianimazione su un manichino con defibrillatore durante un corso BLSD',
};

// Ripiego per un corso SENZA immagine (mai il gradiente): la più vicina per categoria (categoryKey di data/coursesRaw.js).
// Chiave sconosciuta -> FALLBACK_DEFAULT. Ogni voce ha il proprio alt.
const FALLBACK_DEFAULT = {
  src: '/images/corsi/qualificati-generica.webp',
  alt: 'Gruppo di corsisti sorridenti con quaderni e cartelline in un\'aula di formazione',
};
const IMAGE_FALLBACK_BY_CATEGORY = {
  digitali: { src: '/images/corsi/icdl-generica.webp', alt: 'Tre persone al lavoro con il computer portatile in un\'aula di formazione luminosa' },
  professionale: FALLBACK_DEFAULT,
  'sicurezza-lavoro': { src: '/images/formazione-obbligatoria/sicurezza-sul-lavoro.jpg', alt: 'Lavoratore con casco bianco e giubbotto ad alta visibilità durante un corso sulla sicurezza' },
  'decreto-attrezzature': { src: '/images/formazione-obbligatoria/decreto-attrezzature.jpg', alt: 'Operatore con camicia a quadri e casco arancione tenuto sotto braccio davanti a un mezzo da cantiere' },
  fitosanitario: { src: '/images/formazione-obbligatoria/patentino-fitosanitario.jpg', alt: 'Tecnico con mascherina e guanti che tratta le piante con un flacone nebulizzatore' },
  agricolo: { src: '/images/formazione-obbligatoria/patentino-fitosanitario.jpg', alt: 'Tecnico con mascherina e guanti che tratta le piante con un flacone nebulizzatore' },
  'sicurezza-alimentare': { src: '/images/formazione-obbligatoria/personale-alimentarista.jpg', alt: 'Mani con guanti monouso che tagliano verdure fresche in una cucina professionale' },
};

// Ripiego per le righe del calendario ("Corsi in partenza" in home e in /formazione/obbligatoria) quando il corso non ha una foto propria:
// la generica della sua categoria del calendario (data/calendario.ts: CategoriaCorso). Categoria sconosciuta -> FALLBACK_DEFAULT.
const CALENDAR_FALLBACK = {
  obbligatoria: IMAGE_FALLBACK_BY_CATEGORY['sicurezza-lavoro'],
  'regionale-fse': { src: '/images/formazione/regionale.webp', alt: 'Gruppo eterogeneo di corsisti che lavora insieme attorno a un tavolo in un\'aula luminosa' },
  professionale: FALLBACK_DEFAULT,
  ecm: { src: '/images/formazione/ecm.webp', alt: 'Medico sorridente con camice e stetoscopio che tiene un tablet in un corridoio d\'ospedale' },
};

module.exports = { COURSE_IMAGES, COURSE_IMAGE_ALT, IMAGE_FALLBACK_BY_CATEGORY, FALLBACK_DEFAULT, CALENDAR_FALLBACK };
