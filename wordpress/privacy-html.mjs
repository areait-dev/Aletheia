/**
 * HTML della pagina "Privacy e Cookie Policy" per la migrazione (corpo della pagina WP `privacy-cookie`).
 * Stesso testo di pages/privacy-cookie.js; le tabelle arrivano da data/privacy.js. L'HTML è pulito (h2/h3/p/ul/table):
 * il frontend lo veste con `.legal-content` (styles/globals.css). Da qui in poi la fonte è l'editor di WordPress.
 */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const table = (head, rows) =>
  `<table><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

export function privacyHtml({ finalitaTrattamento, categorieCookie, censimentoCookie, cronologiaRevisioni }) {
  const titolare = [
    ['Titolare:', 'Alètheia S.r.l.'],
    ['P.IVA:', '01524530894'],
    ['Sede:', 'Via del Carrubo snc, 97019 Vittoria (RG)'],
    ['Tel.:', '+39 0932 862613'],
    ['E-mail:', 'info@aletheiasrl.it'],
    ['PEC:', 'aletheia.srl@legalmail.it'],
  ];
  const diritti = [
    'Accesso ai tuoi dati personali',
    'Rettifica dei dati inesatti o incompleti',
    'Cancellazione dei dati (diritto all’oblio)',
    'Limitazione del trattamento',
    'Opposizione al trattamento',
    'Portabilità dei dati',
    'Revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prima della revoca',
  ];

  return [
    '<h2>Dati del Titolare del trattamento</h2>',
    `<ul>${titolare.map(([k, v]) => `<li><strong>${esc(k)}</strong> ${esc(v)}</li>`).join('')}</ul>`,

    '<h2 id="privacy-policy">Privacy Policy</h2>',
    '<h3>1.1 Titolare del trattamento</h3>',
    '<p>Per l’esercizio dei diritti previsti dalla normativa privacy è possibile contattare il Titolare del trattamento ai recapiti indicati nella sezione “Dati del Titolare del trattamento” in cima a questa pagina.</p>',
    '<h3>1.2 Finalità del trattamento e basi giuridiche</h3>',
    table(['Finalità', 'Dati trattati', 'Base giuridica', 'Conservazione'], finalitaTrattamento.map((r) => [r.finalita, r.dati, r.base, r.conservazione])),
    '<h3>1.3 Destinatari e soggetti autorizzati</h3>',
    '<p>I dati possono essere trattati da personale autorizzato di Alètheia S.r.l. e da fornitori o consulenti esterni nominati responsabili del trattamento ai sensi dell’art. 28 GDPR. I dati possono essere comunicati a soggetti pubblici o autorità quando previsto dalla legge.</p>',
    '<h3>1.4 Trasferimenti extra UE</h3>',
    '<p>Eventuali trasferimenti verso Paesi extra UE avverranno solo in presenza di adeguate garanzie ai sensi del GDPR (decisioni di adeguatezza, clausole contrattuali standard, ecc.).</p>',
    '<h3>1.5 Diritti dell’interessato</h3>',
    '<p>In qualità di interessato, hai diritto a:</p>',
    `<ul>${diritti.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>`,
    '<p>Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali.</p>',

    '<h2 id="cookie-policy">Cookie Policy</h2>',
    '<h3>2.1 Premessa</h3>',
    '<p>Il sito utilizza cookie per garantire il funzionamento e raccogliere statistiche. La semplice prosecuzione della navigazione, lo scroll o la chiusura del banner non costituiscono consenso valido.</p>',
    '<h3>2.2 Categorie di cookie</h3>',
    `<ul>${categorieCookie.map((c) => `<li><strong>${esc(c.nome)}</strong> (${esc(c.nota)})</li>`).join('')}</ul>`,
    '<h3>2.3 Tabella di censimento dei cookie</h3>',
    table(['Categoria', 'Nome', 'Fornitore', 'Finalità', 'Durata', 'Base giuridica', 'Note'], censimentoCookie.map((c) => [c.categoria, c.nome, c.fornitore, c.finalita, c.durata, c.base, c.note || '—'])),
    '<h3>2.4 Gestione del consenso</h3>',
    '<p>Per impostazione predefinita sono attivi solo i cookie tecnici. L’utente può modificare o revocare il consenso in qualsiasi momento tramite il link o pulsante “Gestisci preferenze cookie”.</p>',

    '<h2>Testo per il banner cookie</h2>',
    '<p>Copia ufficiale di riferimento per il componente banner di consenso cookie del sito.</p>',
    '<blockquote>Questo sito utilizza cookie tecnici necessari al funzionamento e, previo consenso, cookie o strumenti di terze parti per statistiche, contenuti incorporati o altre finalità indicate nella Cookie Policy. Puoi accettare tutti i cookie, rifiutare quelli non necessari o personalizzare le tue preferenze. Puoi modificare o revocare il consenso in qualsiasi momento tramite il link “Gestisci preferenze cookie”.</blockquote>',

    '<h2>Cronologia revisioni</h2>',
    table(['Revisione', 'Data', 'Descrizione'], cronologiaRevisioni.map((r) => [r.rev, r.data, r.descrizione])),
  ].join('\n');
}
