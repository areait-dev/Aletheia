/**
 * Genera i field group ACF (versione FREE: solo campi semplici) in aletheia-headless/acf-json/.
 * Uso:  node wordpress/build-acf-json.mjs
 * Poi in WP: ACF -> Field Groups -> "Sync available" -> Sync tutti.
 * Dopo il primo import i gruppi si possono modificare dall'interfaccia ACF: il plugin salva le modifiche
 * nella stessa cartella (acf-json.php), da versionare nel repo.
 *
 * Convenzioni per le liste (niente repeater nel free): una voce per riga, colonne separate da "|".
 */
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('./aletheia-headless/acf-json/', import.meta.url));
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const MODIFIED = Math.floor(Date.now() / 1000);
let ctx = '';

// ── Costruttori di campo ────────────────────────────────────────────────
const F = (type, name, label, extra = {}) => ({
  key: `field_al_${ctx}_${name}`,
  label,
  name,
  'aria-label': '',
  type,
  instructions: '',
  required: 0,
  conditional_logic: 0,
  wrapper: { width: '', class: '', id: '' },
  ...extra,
});
const text = (n, l, x) => F('text', n, l, x);
const area = (n, l, x = {}) => F('textarea', n, l, { rows: 4, new_lines: '', ...x });
const list = (n, l, formato, x = {}) => area(n, l, { instructions: `Una voce per riga. Formato: ${formato}`, rows: 6, ...x });
const rich = (n, l, x) => F('wysiwyg', n, l, { tabs: 'all', toolbar: 'basic', media_upload: 0, delay: 0, ...x });
const img = (n, l, x) => F('image', n, l, { return_format: 'array', preview_size: 'medium', library: 'all', ...x });
const num = (n, l, x) => F('number', n, l, x);
const mail = (n, l, x) => F('email', n, l, x);
const url = (n, l, x) => F('url', n, l, x);
const bool = (n, l, x) => F('true_false', n, l, { ui: 1, default_value: 0, ...x });
const link = (n, l, x) => F('link', n, l, { return_format: 'array', ...x });
const sel = (n, l, choices, x) => F('select', n, l, { choices, return_format: 'value', allow_null: 1, ui: 0, ...x });
const chk = (n, l, choices, x) => F('checkbox', n, l, { choices, return_format: 'value', layout: 'horizontal', ...x });
const date = (n, l, ret, x) => F('date_picker', n, l, { display_format: 'd/m/Y', return_format: ret, first_day: 1, ...x });
const post = (n, l, pt, x) => F('post_object', n, l, { post_type: [pt], return_format: 'id', ui: 1, allow_null: 1, ...x });
const tab = (l) => F('tab', 'tab_' + l.toLowerCase().replace(/[^a-z0-9]+/g, '_'), l, { placement: 'top', endpoint: 0 });

// ── Location ────────────────────────────────────────────────────────────
const pt = (p) => [[{ param: 'post_type', operator: '==', value: p }]];
const pts = (list) => list.map((p) => [{ param: 'post_type', operator: '==', value: p }]);

// position: 'acf_after_title' = campi subito sotto il titolo (editor classico, vedi use_block_editor_for_post_type in acf-json.php).
function group(key, title, location, build, { position = 'acf_after_title', menu_order = 0 } = {}) {
  ctx = key;
  const g = {
    key: `group_al_${key}`,
    title,
    fields: build(),
    location,
    menu_order,
    position,
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: '',
    show_in_rest: 1, // espone i campi in /wp/v2/... sotto "acf"
    modified: MODIFIED,
  };
  writeFileSync(OUT + `group_al_${key}.json`, JSON.stringify(g, null, 2) + '\n');
}

// ═══ CPT ════════════════════════════════════════════════════════════════
// Titolo = titolo del corso, contenuto = descrizione, immagine in evidenza = immagine card.
group('corso', 'Corso - Scheda', pt('corso'), () => [
  sel('badge', 'Badge', { Obbligatoria: 'Obbligatoria', Finanziato: 'Finanziato', Professionale: 'Professionale', Agricolo: 'Agricolo', GOL: 'GOL', Digitale: 'Digitale', Regionale: 'Regionale', ECM: 'ECM', FSE: 'FSE' }),
  sel('tipo', 'Tipo', { corso: 'Corso base', aggiornamento: 'Aggiornamento' }),
  text('livello', 'Livello / variante', { instructions: 'Es. Livello 1, Rischio Medio, Meno di 50 dipendenti.' }),
  text('provider', 'Ambito / riferimento normativo', { instructions: 'Es. Sicurezza sui luoghi di lavoro - D.Lgs. 81/08' }),
  num('durata_ore', 'Durata (ore)'),
  num('prezzo', 'Prezzo (€)', { instructions: 'Vuoto = "su richiesta".' }),
  list('prezzi_variante', 'Prezzi per modalità', 'Etichetta|Importo (es. Aula|80)', { rows: 3 }),
  chk('modalita', 'Modalità', { Aula: 'Aula', FAD: 'FAD', Videoconferenza: 'Videoconferenza' }),
  text('validita', 'Validità / aggiornamento'),
  text('attestato', 'Attestato', { default_value: 'Attestato valido in tutta Italia' }),
  num('partecipanti_max', 'Partecipanti max'),
  text('icona', 'Icona meta (emoji o classe Font Awesome)'),
  list('meta_card', 'Dettagli sulla card', 'Icona|Testo (es. 🔥|4 ore oppure 💰|100% Finanziato)', { rows: 3 }),
  text('gradiente', 'Gradiente card (CSS)', { instructions: 'Fallback se manca l\'immagine in evidenza.' }),
  list('moduli', 'Programma / moduli', 'Titolo modulo|Ore teoria|Ore pratica|Argomenti separati da ; (ore pratica e argomenti facoltativi). Con una sola durata, mettila in "Ore teoria"', { rows: 8 }),
  list('destinatari', 'A chi è rivolto', 'una voce per riga', { rows: 5 }),
  list('cosa_imparerai', 'Cosa imparerai', 'una voce per riga', { rows: 5 }),
  F('relationship', 'corsi_correlati', 'Corsi correlati', { post_type: ['corso'], return_format: 'id', filters: ['search', 'taxonomy'], max: 6 }),
  text('target', 'Target in una riga', { instructions: 'Es. Lavoratori, RLS, RSPP (card e sidebar).' }),
  text('studenti', 'Numero formati (opzionale)', { placeholder: '150+' }),
  text('livello_difficolta', 'Livello (Base, Intermedio…)'),
  text('stato_card', 'Etichetta stato sulla card', { default_value: 'Attestato Valido Italia' }),
  text('immagine_alt', 'Testo alternativo immagine'),
]);

// Dati delle categorie di catalogo (le sotto-categorie sono termini figli: lo slug è il parametro ?categoria=).
// Nome = nome del termine, descrizione = descrizione nativa del termine.
group('categoria_corso', 'Categoria corso - Dati', [[{ param: 'taxonomy', operator: '==', value: 'categoria_corso' }]], () => [
  text('icona', 'Icona Font Awesome', { placeholder: 'fas fa-hard-hat' }),
  img('immagine', 'Immagine'),
  text('colore', 'Colore accento (#hex)', { instructions: 'Solo token del design system: #008C95, #10B981, #F59E0B, #6366F1.' }),
  text('pagina', 'Pagina di destinazione', { instructions: 'Es. /formazione/obbligatoria' }),
]);

// "Scheda" = card/elemento di una lista con più campi (avvisi regionali, misure GOL, servizi alla persona/imprese,
// aree, vantaggi, perché noi, verticali…). Si raggruppano con la tassonomia "lista_schede" (un termine per lista).
// Titolo = titolo della card, contenuto = testo, immagine in evidenza = immagine, ordine = "Attributi pagina".
group('scheda', 'Scheda - Dati', pt('scheda'), () => [
  text('icona', 'Icona', {
    placeholder: 'fas fa-redo-alt',
    instructions: 'Classe Font Awesome (es. fas fa-redo-alt). Nelle liste con icone disegnate (Fondo Nuove Competenze: vantaggi e servizi) si scrive invece il NOME: fulmine, bersaglio, cuore, moneta, lente, scudo, matita, ricevuta, busta, gruppo, grafico (elenco in data/icone-svg.js).',
  }),
  text('badge', 'Badge / etichetta'),
  text('sottotitolo', 'Sottotitolo / ente'),
  link('link', 'Link'),
  text('meta_1', 'Dato 1', { instructions: 'Es. Modalità, Misura. Certificati di Chi siamo: link extra nel formato Etichetta|URL (es. Politica Aziendale|/pdf/politica.pdf). Servizi del Fondo Nuove Competenze: scrivi "in evidenza" per la card in primo piano.' }),
  text('meta_2', 'Dato 2', { instructions: 'Es. Durata, Target. Certificati di Chi siamo: secondo link extra, formato Etichetta|URL.' }),
  text('immagine_alt', 'Testo alternativo immagine'),
], { position: 'side' });

group('edizione', 'Edizione - Dati', pt('edizione_corso'), () => [
  post('corso', 'Corso', 'corso'),
  date('data', 'Data', 'Y-m-d'),
  sel('categoria', 'Categoria calendario', { obbligatoria: 'Obbligatoria', 'regionale-fse': 'Regionale FSE', professionale: 'Professionale', ecm: 'ECM' }, { instructions: 'Se vuota si deduce dalla categoria del corso.' }),
  text('orario', 'Orario', { placeholder: '09:00 - 13:00' }),
  text('sede', 'Sede'),
  text('durata', 'Durata', { placeholder: '8 ore' }),
  num('posti', 'Posti totali'),
  num('posti_disponibili', 'Posti disponibili'),
  text('relatore', 'Relatore (solo ECM)'),
  num('crediti_ecm', 'Crediti ECM (solo ECM)'),
]);

group('news', 'News - Campi aggiuntivi', pt('news'), () => [
  text('fonte', 'Fonte'),
  num('tempo_lettura', 'Tempo di lettura (minuti)'),
], { position: 'side' });

group('offerta', 'Offerta di lavoro - Dati', pt('offerta_lavoro'), () => [
  text('citta', 'Città', { placeholder: 'Vittoria (RG)' }),
  sel('tipo_contratto', 'Tipo contratto', { 'Tempo determinato': 'Tempo determinato', 'Tempo indeterminato': 'Tempo indeterminato', Somministrazione: 'Somministrazione', Apprendistato: 'Apprendistato', Stage: 'Stage' }),
  text('icona', 'Icona Font Awesome', { placeholder: 'fas fa-store' }),
  list('responsabilita', 'Responsabilità', 'una voce per riga'),
  list('requisiti', 'Requisiti', 'una voce per riga'),
  list('offriamo', 'Offriamo', 'una voce per riga'),
  bool('attiva', 'Offerta attiva', { default_value: 1 }),
]);

// Una riga della tabella pubblica = un post (titolo = titolo dell'avviso). Il frontend raggruppa per anno e ente.
group('aiuto', 'Aiuto di Stato - Riga', pt('aiuto_stato'), () => [
  num('anno', 'Anno'),
  text('ente', 'Ente (denominazione e C.F.)'),
  date('data', 'Data', 'd/m/Y'),
  text('importo', 'Importo', { placeholder: '€ 500,00' }),
  text('cup', 'CUP'),
]);

group('faq', 'FAQ - Dati', pt('faq'), () => [
  sel('categoria', 'Categoria', { generale: 'Generale', corsi: 'Corsi', 'agenzia-lavoro': 'Agenzia per il lavoro', finanziata: 'Formazione finanziata' }),
  text('pagina', 'Pagina in cui compare', { instructions: 'Chiave della pagina (es. ecm, corsi-pa, obbligatoria). Per il chatbot: chatbot-formazione, chatbot-lavoro o chatbot-generale.' }),
  post('corso', 'Corso collegato', 'corso'),
], { position: 'side' });

group('partner', 'Partner - Dati', pt('partner'), () => [
  img('logo', 'Logo'),
  img('logo_scuro', 'Logo per tema scuro (facoltativo)'),
  url('url', 'Sito web'),
  sel('gruppo', 'Gruppo', { clienti: 'Clienti', ecosistema: 'Ecosistema / gruppo', certificazioni: 'Certificazioni e accreditamenti', enti: 'Enti finanziatori' }),
]);

group('sede', 'Sede - Dati', pt('sede'), () => [
  text('indirizzo', 'Indirizzo'),
  text('cap', 'CAP e località', { placeholder: '97019 Vittoria (RG)' }),
  text('citta', 'Città'),
  text('telefono', 'Telefono'),
  url('maps_href', 'Link Google Maps'),
  mail('email', 'Email'),
  area('orari', 'Orari', { rows: 3 }),
  url('mappa_embed', 'URL mappa (embed)'),
  bool('principale', 'Sede principale'),
]);

// ═══ Archivio dei bandi (/archivio, /archivio/<slug>, /archivio/<famiglia>/<slug>) ═══
// Il titolo del post è il titolo della pagina. Testi in formato semplice: paragrafi separati da una riga vuota,
// elenchi puntati con "- " a inizio riga. Per aggiungere un bando: Archivio bandi → Aggiungi voce.
group('archivio', 'Archivio - Dati', pt('archivio'), () => [
  sel('famiglia', 'Famiglia', { 'misura-psr-1-1': 'Misura PSR 1.1', 'avviso-2-2018': 'Avviso 2/2018' }, { instructions: 'Vuota = voce singola nell\'elenco dell\'archivio. Con una famiglia la voce compare nel suo accordion e nella sua panoramica (URL /archivio/<famiglia>/<slug>).' }),
  area('descrizione', 'Descrizione', { rows: 8, instructions: 'Paragrafi separati da una riga vuota; elenchi puntati con "- " a inizio riga.' }),
  area('destinatari', 'Destinatari e requisiti', { rows: 6, instructions: 'Stesso formato della descrizione. Vuoto = riquadro non mostrato.' }),
  list('documenti', 'Documenti (PDF)', 'sezione|Titolo del documento|URL del PDF', { rows: 10, instructions: 'Una riga per documento. Sezioni: bandi-docenti, bandi-tutor, bandi-allievi, altri. Carica il PDF in Media e incolla il suo URL (es. bandi-docenti|Bando docenti ed. 12|https://cms…/wp-content/uploads/2026/05/bando.pdf).' }),
  text('titolo_indice', 'Titolo nell\'elenco (facoltativo)', { instructions: 'Vuoto = titolo del post.' }),
  text('titolo_panoramica', 'Titolo nella panoramica della famiglia (facoltativo)', { instructions: 'Vuoto = titolo nell\'elenco.' }),
  bool('fuori_elenco', 'Non mostrare nell\'elenco di /archivio', { instructions: 'La pagina esiste comunque (si raggiunge dai link): utile per gli avvisi collegati da altre pagine.' }),
  text('meta_titolo', 'Titolo della pagina per i motori di ricerca (facoltativo)', { instructions: 'Vuoto = titolo del post (solo layout a scheda).' }),
  area('meta_descrizione', 'Descrizione per i motori di ricerca (facoltativa)', { rows: 3 }),

  tab('Layout a scheda'),
  sel('layout', 'Layout della pagina', { standard: 'Standard (descrizione, destinatari, documenti per sezione)', scheda: 'A scheda (hero, requisiti, documenti in un\'unica lista)' }, { instructions: 'Con "A scheda" si usano i campi di questa sezione; "Descrizione" diventa il testo "Di cosa si tratta" e i documenti compaiono in un\'unica lista.' }),
  text('scheda_titolo_breve', 'Voce nelle briciole di pane', { instructions: 'Es. Avviso 1/2026 POC. Vuoto = titolo del post.' }),
  text('scheda_badge', 'Etichetta sopra il titolo', { instructions: 'Es. Corsi con qualifica professionale.' }),
  area('scheda_sottotitolo', 'Sottotitolo', { rows: 3 }),
  text('scheda_requisiti_intro', 'Introduzione ai requisiti (facoltativa)'),
  list('scheda_requisiti', 'Requisiti di accesso', 'uno per riga', { rows: 6 }),
  text('scheda_extra_titolo', 'Titolo del blocco extra', { instructions: 'Es. Qualifiche disponibili (esempi) oppure Sedi del corso.' }),
  sel('scheda_extra_tipo', 'Tipo del blocco extra', { chips: 'Etichette (es. qualifiche)', sedi: 'Elenco con icona di luogo (es. sedi)', corsi: 'Elenco corsi con durata (una voce per riga: Nome | durata)' }),
  list('scheda_extra', 'Voci del blocco extra', 'una per riga', { rows: 8 }),
  area('scheda_avviso', 'Riquadro evidenziato (facoltativo)', { rows: 3, instructions: 'Es. una scadenza. I link si scrivono [etichetta](URL).' }),
  bool('scheda_contatti', 'Mostra email e telefono in fondo', { instructions: 'Usa i contatti delle Opzioni Globali.' }),
]);

// ═══ SEO (su tutti i contenuti; sulle pagine esclude "opzioni-globali" via acf-json.php) ═══
group('seo', 'SEO', [
  [{ param: 'post_type', operator: '==', value: 'page' }],
  ...pts(['corso', 'news', 'offerta_lavoro']),
], () => [
  text('seo_titolo', 'Titolo SEO', { maxlength: 70 }),
  area('seo_descrizione', 'Meta description', { maxlength: 160, rows: 3 }),
  img('seo_og_image', 'Immagine Open Graph'),
  bool('seo_noindex', 'Nascondi ai motori di ricerca'),
], { position: 'side', menu_order: 50 });

// ═══ PAGINE ═════════════════════════════════════════════════════════════
// Struttura comune a tutte le pagine (esclusa "opzioni-globali"): hero + intro + 8 sezioni + numeri + CTA finale.
// Sezioni non usate = lasciare vuote (il frontend le salta). Il mapping preciso sezione -> pagina si affina
// quando si scrivono i componenti Next.
const PAGE_LOC = pt('page');

group('pagina_hero', 'Pagina - Hero', PAGE_LOC, () => [
  text('hero_eyebrow', 'Badge sopra il titolo'),
  text('hero_titolo', 'Titolo (H1)', { instructions: 'Le parole tra asterischi sono evidenziate: Il ponte tra *formazione* e *lavoro*.' }),
  area('hero_sottotitolo', 'Sottotitolo', { rows: 3 }),
  // Niente immagine di sfondo né badge con icona nella hero: nessuna pagina li usa (le hero sono sfondi a gradiente;
  // i badge della hero di professionale-specialistica sono "Schede", lista `prof-hero-badges`).
  link('hero_cta1', 'Bottone primario'),
  link('hero_cta2', 'Bottone secondario'),
], { menu_order: 0 });

group('pagina_sezioni', 'Pagina - Sezioni', PAGE_LOC, () => {
  const out = [tab('Intro'), text('intro_badge', 'Badge'), text('intro_titolo', 'Titolo (H2)'), rich('intro_testo', 'Testo')];
  for (let i = 1; i <= 8; i++) {
    out.push(
      tab(`Sezione ${i}`),
      text(`s${i}_ancora`, 'Ancora (id) per i link interni', { instructions: 'Es. corsi, cosa-facciamo: serve ai link #corsi della pagina.' }),
      text(`s${i}_badge`, 'Badge'),
      text(`s${i}_titolo`, 'Titolo (H2)'),
      rich(`s${i}_testo`, 'Testo'),
      list(`s${i}_elenco`, 'Card / elenco', 'Icona (classe Font Awesome)|Titolo|Testo|URL — le colonne finali sono facoltative. Le immagini delle card si caricano nei campi "Immagine card N", nello stesso ordine. Liste ricche (testo lungo, immagine, più dati): usa i contenuti "Schede"'),
      img(`s${i}_immagine`, 'Immagine della sezione'),
      img(`s${i}_img_1`, 'Immagine card 1'),
      img(`s${i}_img_2`, 'Immagine card 2'),
      img(`s${i}_img_3`, 'Immagine card 3'),
      img(`s${i}_img_4`, 'Immagine card 4'),
      link(`s${i}_cta`, 'Pulsante'),
    );
  }
  out.push(
    tab('Numeri'),
    text('numeri_badge', 'Badge'),
    text('numeri_titolo', 'Titolo'),
    list('numeri', 'Numeri / statistiche', 'Valore|Suffisso|Etichetta (es. 20|+|Anni di esperienza). La prima riga è il numero protagonista'),
    tab('Modulo'),
    text('form_badge', 'Modulo: badge'),
    text('form_titolo', 'Modulo: titolo'),
    area('form_sottotitolo', 'Modulo: sottotitolo', { rows: 3 }),
    tab('CTA finale'),
    text('cta_titolo', 'Titolo'),
    area('cta_testo', 'Testo', { rows: 3 }),
    link('cta_bottone1', 'Bottone 1'),
    link('cta_bottone2', 'Bottone 2'),
  );
  return out;
}, { menu_order: 10 });

// Solo sulla pagina con slug "home" (la location viene impostata in acf-json.php).
group('pagina_home', 'Pagina - Extra Home', PAGE_LOC, () => [
  list('home_chips', 'Chip di ricerca nella hero', 'Etichetta|URL'),
  text('home_calendario_titolo', 'Corsi in partenza: titolo'),
  num('home_calendario_limite', 'Corsi in partenza: quanti', { default_value: 6 }),
  text('home_corsi_titolo', 'Corsi in evidenza: titolo'),
  area('home_corsi_intro', 'Corsi in evidenza: introduzione', { rows: 2 }),
  list('home_corsi_evidenza', 'Corsi in evidenza', 'slug del corso, uno per riga'),
  text('home_news_titolo', 'News: titolo'),
  num('home_news_limite', 'News: quante', { default_value: 3 }),
  text('home_clienti_titolo', 'Clienti: titolo'),
  text('home_gruppo_titolo', 'Gruppo: titolo'),
], { menu_order: 20 });

// ═══ OPZIONI GLOBALI (pagina "opzioni-globali", location impostata in acf-json.php) ═════
group('opt', 'Opzioni Globali Alètheia', PAGE_LOC, () => [
  tab('Identità'),
  img('logo', 'Logo'),
  img('logo_bianco', 'Logo bianco (sfondi scuri)'),
  text('nome', 'Ragione sociale'),
  text('telefono', 'Telefono'),
  mail('email', 'Email'),
  text('whatsapp', 'WhatsApp'),
  text('orari', 'Orari', { placeholder: 'Lun - Ven: 9:00-13:00 / 14:00-18:00' }),
  list('social', 'Social', 'Classe Font Awesome|URL|Nome per accessibilità (es. fa-brands fa-facebook|https://…|Facebook)', { rows: 4 }),

  tab('Menu'),
  list('menu_voci', 'Voci di menu principale', 'Etichetta|URL (vuoto URL = contenitore del dropdown)'),
  list('menu_formazione', 'Dropdown Formazione', 'Riga che inizia con "# " = gruppo: "# Titolo|URL". Le righe sotto = voci: "Etichetta|URL"', { rows: 14 }),

  link('header_cta_lavoro', 'Pulsante header "Offerte di lavoro"'),
  link('header_elearning', 'Link piattaforma e-learning'),
  text('mega_calendario_titolo', 'Mega-menu: titolo riquadro calendario'),
  area('mega_calendario_testo', 'Mega-menu: testo riquadro calendario', { rows: 3 }),
  link('mega_calendario_btn', 'Mega-menu: pulsante calendario'),
  link('mega_corsi_btn', 'Mega-menu: pulsante tutti i corsi'),

  tab('Footer'),
  text('footer_indirizzo', 'Indirizzo (colonna contatti)'),
  url('footer_indirizzo_link', 'Link mappa dell\'indirizzo'),
  list('footer_link_legali', 'Link legali', 'Etichetta|URL (Privacy e Cookie, Reclami, Aiuti di Stato…)', { rows: 5 }),
  list('footer_colonne', 'Link rapidi', 'Riga "# Titolo colonna", riga "## Sottotitolo" (facoltativa), poi righe "Etichetta|URL"', { rows: 14 }),
  F('file', 'footer_catalogo_pdf', 'Catalogo corsi (PDF)', { return_format: 'array', library: 'all', mime_types: 'pdf' }),
  list('footer_accreditamenti', 'Accreditamenti (testo)', 'una riga per accreditamento', { rows: 5 }),
  text('footer_copyright', 'Barra inferiore (©, P.IVA, PEC)'),
  text('footer_credits_testo', 'Credits: testo', { placeholder: 'Ente della rete di imprese' }),
  link('footer_credits_link', 'Credits: link'),

  tab('Contatti'),
  list('motivi_contatto', 'Motivi di contatto (select del modulo)', 'una voce per riga'),

  tab('Moduli'),
  list('form_servizi_candidato', 'Candidato: servizi richiesti (select)', 'una voce per riga'),
  list('form_settori_azienda', 'Azienda: settori (select)', 'una voce per riga'),
  list('form_dipendenti_azienda', 'Azienda: fasce dipendenti (select)', 'una voce per riga', { rows: 4 }),
  list('form_servizi_azienda', 'Azienda: servizi richiesti (select)', 'una voce per riga'),
  area('form_privacy_testo', 'Testo consenso privacy', { rows: 2, instructions: 'Un link si scrive [etichetta](URL). Es.: Ho letto e accetto la [Privacy Policy](/privacy-cookie) di Alètheia S.r.l.' }),
  area('form_successo_testo', 'Messaggio di invio riuscito', { instructions: 'Sei righe: 1) titolo e 2) testo del modulo candidato; 3) titolo e 4) testo del modulo azienda; 5) titolo e 6) testo del modulo reclami e proposte. Se mancano, si usano i testi predefiniti.' }),
  mail('form_email_candidati', 'Email destinatario candidature'),
  mail('form_email_aziende', 'Email destinatario richieste aziende'),

  tab('Chatbot'),
  bool('chatbot_attivo', 'Chatbot attivo', { default_value: 1 }),
  text('chatbot_nome', 'Nome assistente'),
  text('chatbot_placeholder', 'Testo del campo messaggio'),
  area('chatbot_fallback', 'Messaggio quando non sa rispondere', { rows: 3 }),
  area('chatbot_benvenuto', 'Messaggio di benvenuto'),
  // Domande rapide e risposte: non sono campi qui, ma voci FAQ con "Pagina in cui compare" = chatbot-formazione,
  // chatbot-lavoro o chatbot-generale (titolo = domanda, contenuto = risposta).
  mail('chatbot_email', 'Email per domande senza risposta'),

  tab('SEO globale'),
  text('sito_seo_template', 'Template titolo (non ancora usato dal frontend)', { default_value: '%s | Alètheia Srl' }),
  area('sito_seo_descrizione', 'Description predefinita (non ancora usata dal frontend)', { rows: 3 }),
  img('sito_seo_og', 'Immagine OG predefinita (non ancora usata dal frontend)'),
  text('sito_seo_gsv', 'Google site verification'),

  tab('Cookie e privacy'),
  area('legale_banner', 'Testo banner cookie', { instructions: 'Un link si scrive [etichetta](URL). Es.: Consulta la nostra [Privacy e Cookie Policy](/privacy-cookie).' }),
  text('legale_btn_accetta', 'Etichetta pulsante accetta'),
  text('legale_btn_rifiuta', 'Etichetta pulsante rifiuta'),
  rich('legale_privacy', 'Informativa privacy'),
  rich('legale_cookie', 'Cookie policy'),
]);

console.log('Generati gruppi in', OUT);
