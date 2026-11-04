// Moduli del sito: definizione UNICA di campi, regole di validazione, oggetto dell'email e mailto di ripiego.
// Usata sia dal browser (controllo prima dell'invio, mailto) sia dal server (pages/api/moduli/*), così le regole non
// possono divergere: il server ripete SEMPRE tutti i controlli, quelli del browser servono solo a dare risposte rapide.
// Nessun segreto qui: il file finisce nel bundle del browser.

export type TipoModulo = 'preventivo' | 'preiscrizione' | 'contatti' | 'candidatura' | 'azienda' | 'obbligatoria' | 'corsi-pa' | 'reclami';

export const EMAIL_INFO = 'info@aletheiasrl.it';
export const TELEFONO_INFO = '+39 0932 862613';
/** Allegato: 4 MB (limite di progetto). Vercel taglia le richieste a 4,5 MB, quindi 4 MB + campi di testo ci stanno. */
export const MAX_ALLEGATO = 4 * 1024 * 1024;
/** Secondi minimi di compilazione: un modulo inviato prima è quasi certamente un bot. */
export const TEMPO_MINIMO_MS = 3000;
/** Nome del campo-trappola (honeypot): nascosto agli utenti, i bot lo compilano. Nome volutamente neutro per l'autofill. */
export const CAMPO_TRAPPOLA = 'contatto_alternativo';

export type Dati = Record<string, string>;
/** Valori di un modulo: un oggetto con stringhe, booleani (consenso) o null. `object` perché i moduli li tipizzano con interfacce. */
export type Valori = object;

interface CampoDef {
  nome: string;
  etichetta: string;
  tipo: 'testo' | 'email' | 'telefono' | 'intero' | 'data' | 'consenso';
  obbligatorio?: boolean | ((d: Dati) => boolean);
  /** Messaggio quando il campo è vuoto (o, per il consenso, non spuntato) */
  msgVuoto?: string;
  /** Lunghezza massima (testo) — 200 se omessa */
  max?: number;
  /** Intervallo (solo 'intero') */
  min?: number;
  maxValore?: number;
}

interface AllegatoDef {
  estensioni: string[];
  descrizione: string;
}

interface ModuloDef {
  tipo: TipoModulo;
  /** Nome mostrato nella prima riga dell'email */
  titolo: string;
  campi: CampoDef[];
  /** Oggetto dell'email: prefisso fisso "[Sito] …" concordato con il committente */
  oggetto: (d: Dati) => string;
  allegato?: AllegatoDef;
}

const PRIVACY_MIN = 'Devi accettare la privacy policy';
const PRIVACY_MAIUSC = 'Devi accettare la Privacy Policy';
const CV_TIPI: AllegatoDef = { estensioni: ['pdf', 'doc', 'docx'], descrizione: 'PDF, DOC o DOCX' };
const RECLAMI_TIPI: AllegatoDef = { estensioni: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'], descrizione: 'PDF, DOC, DOCX, JPG o PNG' };

export const DEFINIZIONI: Record<TipoModulo, ModuloDef> = {
  preventivo: {
    tipo: 'preventivo',
    titolo: 'Richiesta di preventivo',
    oggetto: (d) => `[Sito] Preventivo: ${d.corso}`,
    campi: [
      { nome: 'corso', etichetta: 'Corso', tipo: 'testo', obbligatorio: true, msgVuoto: 'Indica il corso di tuo interesse' },
      { nome: 'tipologia', etichetta: 'Tipologia', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona chi sei' },
      { nome: 'azienda', etichetta: 'Azienda / Ente', tipo: 'testo', obbligatorio: (d) => !!d.tipologia && d.tipologia !== 'Privato' },
      { nome: 'nome', etichetta: 'Nome', tipo: 'testo', obbligatorio: true },
      { nome: 'cognome', etichetta: 'Cognome', tipo: 'testo', obbligatorio: true },
      { nome: 'email', etichetta: 'Email', tipo: 'email', obbligatorio: true, msgVuoto: 'Email non valida' },
      { nome: 'telefono', etichetta: 'Telefono', tipo: 'telefono', obbligatorio: true },
      { nome: 'partecipanti', etichetta: 'Numero di partecipanti', tipo: 'intero', obbligatorio: true, min: 1, maxValore: 999, msgVuoto: 'Inserisci un numero da 1 a 999' },
      { nome: 'modalita', etichetta: 'Modalità preferita', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona la modalità' },
      { nome: 'messaggio', etichetta: 'Note', tipo: 'testo', max: 3000 },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MIN },
    ],
  },
  // Corsi a partenza differita (OSS, ASACOM, Conduttore d'Impresa Agricola): raccolta delle adesioni, nessun pagamento anticipato
  preiscrizione: {
    tipo: 'preiscrizione',
    titolo: 'Nuova pre-iscrizione dal sito',
    oggetto: (d) => `[Sito] Pre-iscrizione: ${d.corso}`,
    campi: [
      { nome: 'corso', etichetta: 'Corso', tipo: 'testo', obbligatorio: true, msgVuoto: 'Indica il corso a cui ti pre-iscrivi' },
      { nome: 'nome', etichetta: 'Nome e cognome', tipo: 'testo', obbligatorio: true },
      { nome: 'email', etichetta: 'Email', tipo: 'email', obbligatorio: true, msgVuoto: 'Email non valida' },
      { nome: 'telefono', etichetta: 'Telefono', tipo: 'telefono', obbligatorio: true },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MIN },
    ],
  },
  contatti: {
    tipo: 'contatti',
    titolo: 'Nuovo contatto dal sito',
    oggetto: (d) => `[Sito] Contatto: ${d.motivo}`,
    campi: [
      { nome: 'nome', etichetta: 'Nome', tipo: 'testo', obbligatorio: true },
      { nome: 'cognome', etichetta: 'Cognome', tipo: 'testo', obbligatorio: true },
      { nome: 'email', etichetta: 'Email', tipo: 'email', obbligatorio: true, msgVuoto: 'Email non valida' },
      { nome: 'telefono', etichetta: 'Telefono', tipo: 'telefono' },
      { nome: 'motivo', etichetta: 'Oggetto della richiesta', tipo: 'testo', obbligatorio: true, msgVuoto: "Seleziona l'oggetto della richiesta" },
      { nome: 'messaggio', etichetta: 'Messaggio', tipo: 'testo', obbligatorio: true, max: 5000 },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MIN },
    ],
  },
  candidatura: {
    tipo: 'candidatura',
    titolo: 'Nuova candidatura dal sito',
    oggetto: (d) => `[Sito] Candidatura: ${d.servizio}`,
    allegato: CV_TIPI,
    campi: [
      { nome: 'nome', etichetta: 'Nome', tipo: 'testo', obbligatorio: true },
      { nome: 'cognome', etichetta: 'Cognome', tipo: 'testo', obbligatorio: true },
      { nome: 'email', etichetta: 'Email', tipo: 'email', obbligatorio: true },
      { nome: 'telefono', etichetta: 'Telefono', tipo: 'telefono' },
      { nome: 'dataNascita', etichetta: 'Data di nascita', tipo: 'data' },
      { nome: 'comune', etichetta: 'Comune di residenza', tipo: 'testo', obbligatorio: true },
      { nome: 'servizio', etichetta: 'Servizio di interesse', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona un servizio' },
      { nome: 'messaggio', etichetta: 'Messaggio', tipo: 'testo', max: 5000 },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MAIUSC },
    ],
  },
  azienda: {
    tipo: 'azienda',
    titolo: 'Richiesta di consulenza da un\'azienda',
    oggetto: (d) => `[Sito] Azienda: ${d.ragioneSociale}`,
    campi: [
      { nome: 'ragioneSociale', etichetta: 'Ragione sociale', tipo: 'testo', obbligatorio: true },
      { nome: 'partitaIva', etichetta: 'Partita IVA', tipo: 'testo', max: 30 },
      { nome: 'nomeReferente', etichetta: 'Nome referente', tipo: 'testo', obbligatorio: true },
      { nome: 'cognomeReferente', etichetta: 'Cognome referente', tipo: 'testo', obbligatorio: true },
      { nome: 'email', etichetta: 'Email aziendale', tipo: 'email', obbligatorio: true },
      { nome: 'telefono', etichetta: 'Telefono', tipo: 'telefono', obbligatorio: true },
      { nome: 'settore', etichetta: 'Settore aziendale', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona un settore' },
      { nome: 'dipendenti', etichetta: 'N° dipendenti', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona una fascia' },
      { nome: 'servizio', etichetta: 'Servizio richiesto', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona un servizio' },
      { nome: 'descrizione', etichetta: 'Descrizione esigenza', tipo: 'testo', max: 5000 },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MAIUSC },
    ],
  },
  obbligatoria: {
    tipo: 'obbligatoria',
    titolo: 'Richiesta di formazione obbligatoria',
    oggetto: (d) => `[Sito] Formazione obbligatoria: ${d.ragioneSociale}`,
    campi: [
      { nome: 'ragioneSociale', etichetta: 'Ragione sociale', tipo: 'testo', obbligatorio: true },
      { nome: 'piva', etichetta: 'P.IVA / Codice Fiscale', tipo: 'testo', obbligatorio: true, max: 30 },
      { nome: 'ateco', etichetta: 'Codice ATECO', tipo: 'testo', max: 30 },
      { nome: 'nome', etichetta: 'Nome referente', tipo: 'testo', obbligatorio: true },
      { nome: 'cognome', etichetta: 'Cognome referente', tipo: 'testo', obbligatorio: true },
      { nome: 'telefono', etichetta: 'Telefono', tipo: 'telefono', obbligatorio: true },
      { nome: 'email', etichetta: 'Email', tipo: 'email', obbligatorio: true },
      { nome: 'categoriaCorso', etichetta: 'Categoria corso', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona una categoria' },
      { nome: 'sede', etichetta: 'Sede', tipo: 'testo', obbligatorio: true },
      { nome: 'partecipanti', etichetta: 'Numero partecipanti', tipo: 'intero', obbligatorio: true, min: 1, maxValore: 999, msgVuoto: 'Inserisci un numero da 1 a 999' },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MAIUSC },
    ],
  },
  'corsi-pa': {
    tipo: 'corsi-pa',
    titolo: 'Richiesta di consulenza da un ente pubblico',
    oggetto: (d) => `[Sito] Corsi PA: ${d.ente}`,
    campi: [
      { nome: 'ente', etichetta: 'Ente / Amministrazione', tipo: 'testo', obbligatorio: true },
      { nome: 'area', etichetta: 'Area formativa di interesse', tipo: 'testo' },
      { nome: 'referente', etichetta: 'Referente (nome e cognome)', tipo: 'testo', obbligatorio: true },
      { nome: 'ruolo', etichetta: 'Ruolo / Ufficio', tipo: 'testo' },
      { nome: 'email', etichetta: 'Email istituzionale', tipo: 'email', obbligatorio: true },
      { nome: 'telefono', etichetta: 'Telefono', tipo: 'telefono' },
      { nome: 'messaggio', etichetta: 'Messaggio', tipo: 'testo', max: 5000 },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MAIUSC },
    ],
  },
  reclami: {
    tipo: 'reclami',
    titolo: 'Nuovo reclamo o proposta dal sito',
    oggetto: (d) => `[Sito] Reclamo/Proposta: ${d.tipologia}`,
    allegato: RECLAMI_TIPI,
    campi: [
      // Nome ed email restano facoltativi: la segnalazione può essere anonima. Se l'email c'è, deve essere valida (e diventa il Reply-To).
      { nome: 'nome', etichetta: 'Nome e cognome', tipo: 'testo' },
      { nome: 'email', etichetta: 'Email', tipo: 'email' },
      { nome: 'tipologia', etichetta: 'Tipologia di comunicazione', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona la tipologia' },
      { nome: 'parti', etichetta: 'Parti interessate', tipo: 'testo', obbligatorio: true, msgVuoto: 'Seleziona le parti interessate' },
      { nome: 'oggetto', etichetta: 'Oggetto', tipo: 'testo', obbligatorio: true, max: 200 },
      { nome: 'messaggio', etichetta: 'Messaggio', tipo: 'testo', obbligatorio: true, max: 5000 },
      { nome: 'privacy', etichetta: 'Privacy Policy', tipo: 'consenso', obbligatorio: true, msgVuoto: PRIVACY_MAIUSC },
    ],
  },
};

export const TIPI_MODULO = Object.keys(DEFINIZIONI) as TipoModulo[];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Telefono: cifre, spazi, + - ( ) . / ; almeno 6 cifre
const TELEFONO_RE = /^[0-9\s+\-()./]{6,30}$/;

/** Porta i valori del modulo (stringhe, booleani, null) in stringhe pulite. Il consenso diventa 'true' o 'false'. */
export function normalizza(tipo: TipoModulo, valori: Valori): Dati {
  const dati: Dati = {};
  const sorgente = valori as Record<string, unknown>;
  DEFINIZIONI[tipo].campi.forEach((c) => {
    const v = sorgente[c.nome];
    if (c.tipo === 'consenso') dati[c.nome] = v === true || v === 'true' || v === 'on' ? 'true' : 'false';
    else dati[c.nome] = typeof v === 'string' ? v.trim() : v == null || v === false ? '' : String(v).trim();
  });
  return dati;
}

/** Controlla i valori di un modulo. Restituisce {campo: messaggio} (vuoto = tutto valido). */
export function validaModulo(tipo: TipoModulo, valori: Valori): Record<string, string> {
  const dati = normalizza(tipo, valori);
  const errori: Record<string, string> = {};
  DEFINIZIONI[tipo].campi.forEach((c) => {
    const v = dati[c.nome];
    if (c.tipo === 'consenso') {
      if (v !== 'true') errori[c.nome] = c.msgVuoto || PRIVACY_MAIUSC;
      return;
    }
    const obbligatorio = typeof c.obbligatorio === 'function' ? c.obbligatorio(dati) : !!c.obbligatorio;
    if (!v) {
      if (obbligatorio) errori[c.nome] = c.msgVuoto || 'Campo obbligatorio';
      return;
    }
    const max = c.tipo === 'email' ? 254 : c.max || 200;
    if (v.length > max) { errori[c.nome] = `Massimo ${max} caratteri`; return; }
    if (c.tipo === 'email' && !EMAIL_RE.test(v)) errori[c.nome] = 'Email non valida';
    else if (c.tipo === 'telefono' && (!TELEFONO_RE.test(v) || v.replace(/\D/g, '').length < 6)) errori[c.nome] = 'Numero di telefono non valido';
    else if (c.tipo === 'intero') {
      const n = Number(v);
      if (!/^\d+$/.test(v) || n < (c.min ?? 0) || n > (c.maxValore ?? 999999)) errori[c.nome] = c.msgVuoto || 'Numero non valido';
    } else if (c.tipo === 'data') {
      const d = new Date(`${v}T00:00:00Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v) errori[c.nome] = 'Data non valida';
    }
  });
  return errori;
}

/** Estensione in minuscolo (senza punto) di un nome di file */
export function estensione(nome: string): string {
  const i = nome.lastIndexOf('.');
  return i < 0 ? '' : nome.slice(i + 1).toLowerCase();
}

export const MSG_ALLEGATO_GRANDE = (email: string) =>
  `Il file supera il limite di 4 MB. Riducine il peso oppure scrivici a ${email} allegandolo alla tua email.`;

/** Controlla nome e dimensione dell'allegato (il server controlla anche il contenuto). null = va bene. */
export function validaAllegato(tipo: TipoModulo, file: { name: string; size: number }, email: string = EMAIL_INFO): string | null {
  const def = DEFINIZIONI[tipo].allegato;
  if (!def) return 'Questo modulo non accetta allegati';
  if (file.size > MAX_ALLEGATO) return MSG_ALLEGATO_GRANDE(email);
  if (file.size === 0) return 'Il file è vuoto';
  if (def.estensioni.indexOf(estensione(file.name)) < 0) return `Formato non consentito: usa ${def.descrizione}`;
  return null;
}

export function descrizioneAllegato(tipo: TipoModulo): string {
  return DEFINIZIONI[tipo].allegato?.descrizione || '';
}

/** Una sola riga, senza ritorni a capo (niente header injection), massimo 150 caratteri */
export function oggettoEmail(tipo: TipoModulo, valori: Valori): string {
  const s = DEFINIZIONI[tipo].oggetto(normalizza(tipo, valori)).replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  return s.length > 150 ? `${s.slice(0, 147)}…` : s;
}

/** Righe "etichetta: valore" dei soli campi compilati, nell'ordine del modulo */
export function riepilogo(tipo: TipoModulo, valori: Valori): { etichetta: string; valore: string }[] {
  const dati = normalizza(tipo, valori);
  const righe: { etichetta: string; valore: string }[] = [];
  DEFINIZIONI[tipo].campi.forEach((c) => {
    const v = dati[c.nome];
    if (c.tipo === 'consenso') righe.push({ etichetta: c.etichetta, valore: v === 'true' ? 'Accettata' : 'NON accettata' });
    else if (v) righe.push({ etichetta: c.etichetta, valore: v });
  });
  return righe;
}

/**
 * Indirizzo mailto con oggetto e campi già compilati: ripiego quando l'invio dal sito non è attivo.
 * I mailto hanno un limite pratico di lunghezza (circa 2000 caratteri): il testo viene accorciato.
 */
export function costruisciMailto(tipo: TipoModulo, valori: Valori, destinatario: string = EMAIL_INFO): string {
  const righe = riepilogo(tipo, valori).map((r) => `${r.etichetta}: ${r.valore}`);
  let corpo = `Buongiorno,\n\ninvio la mia richiesta tramite il sito.\n\n${righe.join('\n')}\n`;
  if (corpo.length > 1500) corpo = `${corpo.slice(0, 1497)}…`;
  return `mailto:${destinatario}?subject=${encodeURIComponent(oggettoEmail(tipo, valori))}&body=${encodeURIComponent(corpo)}`;
}
