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
  // Corsi con qualifica ("corsi con qualifica/qualificati_*.png", 2545x1697, ottimizzate a 1200px come le altre).
  // Attenzione: lo slug di famiglia del BLSD è "...-and-defibrillation", diverso dallo slug in coursesRaw.js.
  'oss-operatore-socio-sanitario': '/images/corsi/oss.jpg',
  'asacom-assistente-alla-comunicazione': '/images/corsi/asacom.jpg',
  'blsd-basic-life-support-and-defibrillation': '/images/corsi/blsd.jpg',
  // ICDL ("immagini/icdl/icdl_*.png"). Update NON collegata: icdl_Update.png ha una scritta "Update" con glifo rotto
  // impressa nell'immagine (a sinistra, vicino alla finestra); resta la foto della scheda finché non arriva il file corretto.
  // icdl_Full Standard.png e icdl_generica.png non hanno un corso corrispondente (nel catalogo: Base, Standard, DigComp 2.2, Update).
  'icdl-base': '/images/corsi/icdl-base.jpg',
  'icdl-standard': '/images/corsi/icdl-standard.jpg',
  'icdl-digcomp-2-2': '/images/corsi/icdl-digcomp-2-2.jpg',
};

module.exports = { COURSE_IMAGES };
