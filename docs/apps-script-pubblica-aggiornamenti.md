# Pulsante "Sito → Pubblica aggiornamenti" nel foglio del calendario

Il sito legge il foglio ogni volta che una pagina viene rigenerata (al massimo una volta ogni poche decine di secondi). Il pulsante dice al sito
di rigenerare subito le pagine che mostrano le date: home, calendario, Formazione obbligatoria e tutte le schede corso.

Prima di pubblicare, lo script controlla la scheda **Corsi** e avvisa di eventuali errori (date non valide, corso mancante, data_fine prima di
data_inizio) sulle righe "pubblicato"; chi preme può comunque continuare.

## 1. Lato sito (una volta sola, lo fa chi gestisce Vercel)

Su Vercel (Production e Preview) deve esistere la variabile **`WP_SHARED_SECRET`** con una stringa lunga e casuale (almeno 32 caratteri).
È lo stesso segreto che il sito già usa per la rotta `/api/revalidate`. Se è vuota, la rotta risponde 503 e il pulsante lo segnala.
Dopo averla impostata serve un nuovo deploy (anche solo "Redeploy").

## 2. Installare lo script nel foglio

1. Apri il foglio **Aletheia_calendario_corsi**.
2. Menu **Estensioni → Apps Script**.
3. Cancella il codice di esempio (`function myFunction() {}`) e incolla tutto il codice qui sotto.
4. Clic su **Salva** (icona del dischetto). Chiama il progetto, per esempio, "Pubblica sito".
5. Chiudi la scheda di Apps Script e **ricarica il foglio**: in alto compare il menu **Sito**.

## 3. Impostare il segreto (Script Properties)

Il segreto non va scritto nel codice.

1. In Apps Script clic sull'ingranaggio **Impostazioni progetto** (colonna a sinistra).
2. Scorri fino a **Proprietà script** e clic su **Aggiungi proprietà script**.
3. Prima proprietà: nome `SITO_SEGRETO`, valore = lo stesso valore di `WP_SHARED_SECRET` su Vercel. **Salva proprietà script**.
4. (Facoltativa) Seconda proprietà: nome `SITO_URL`, valore l'indirizzo del sito senza `/` finale. Senza questa proprietà lo script usa
   `https://aletheiasrl.vercel.app`; quando il sito passa al dominio definitivo aggiorna questa proprietà, senza toccare il codice.

## 4. Primo utilizzo

1. Menu **Sito → Pubblica aggiornamenti**.
2. Google chiede l'autorizzazione (una volta, per chi la usa): scegli l'account, **Avanzate → Vai a Pubblica sito (non sicuro) → Consenti**.
   L'avviso è normale per gli script personali. Lo script chiede solo di leggere questo foglio e di contattare il sito.
3. Ripremi **Sito → Pubblica aggiornamenti**: compare "Aggiornamenti pubblicati" con il numero di pagine rigenerate.

Facoltativo, per avere un vero pulsante nel foglio: **Inserisci → Disegno**, disegna un rettangolo con scritto "Pubblica aggiornamenti",
**Salva e chiudi**, poi sui tre puntini del disegno **Assegna script** e scrivi `pubblicaAggiornamenti`.

## 5. Se qualcosa non va

| Messaggio | Cosa significa |
|---|---|
| "Manca il segreto" | Non è stata creata la proprietà `SITO_SEGRETO` (punto 3). |
| "Segreto non valido (401)" | `SITO_SEGRETO` è diverso da `WP_SHARED_SECRET` su Vercel. |
| "Il sito non ha il segreto configurato (503)" | Manca `WP_SHARED_SECRET` su Vercel, o manca il redeploy dopo averla messa. |
| "Pagine non aggiornate: …" | Alcune pagine non si sono rigenerate; riprova dopo un minuto. Se ripete, avvisa chi gestisce il sito. |
| Le date non cambiano dopo la pubblicazione | Controlla che `stato` sia "pubblicato", `tipologia` "Multiaziendale" e `data_fine` da oggi in poi. Aspetta 1 minuto e ricarica la pagina. |

## Codice

```javascript
/**
 * Pulsante "Sito → Pubblica aggiornamenti" del foglio Aletheia_calendario_corsi.
 * Dice al sito di rigenerare subito le pagine con le date dei corsi (home, calendario, Formazione obbligatoria, schede corso).
 *
 * Script Properties (Impostazioni progetto → Proprietà script):
 *   SITO_SEGRETO  obbligatoria: lo stesso valore di WP_SHARED_SECRET su Vercel
 *   SITO_URL      facoltativa: indirizzo del sito senza "/" finale (predefinito qui sotto)
 */
var SITO_URL_PREDEFINITO = 'https://aletheiasrl.vercel.app';
var SCHEDA_CORSI = 'Corsi';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Sito')
    .addItem('Pubblica aggiornamenti', 'pubblicaAggiornamenti')
    .addToUi();
}

function pubblicaAggiornamenti() {
  var ui = SpreadsheetApp.getUi();
  var props = PropertiesService.getScriptProperties();
  var segreto = props.getProperty('SITO_SEGRETO');
  var sito = (props.getProperty('SITO_URL') || SITO_URL_PREDEFINITO).replace(/\/+$/, '');

  if (!segreto) {
    ui.alert('Manca il segreto',
      'Nelle impostazioni di Apps Script (Proprietà script) manca SITO_SEGRETO.\nVedi le istruzioni di installazione.', ui.ButtonSet.OK);
    return;
  }

  // 1. Controllo preventivo delle righe "pubblicato"
  var problemi = controllaFoglio_();
  if (problemi.length > 0) {
    var elenco = problemi.slice(0, 10).join('\n') + (problemi.length > 10 ? '\n… e altri ' + (problemi.length - 10) : '');
    var risposta = ui.alert('Attenzione: righe da controllare',
      'Queste righe "pubblicato" hanno un problema e il sito NON le mostrerà:\n\n' + elenco + '\n\nPubblico comunque gli aggiornamenti?',
      ui.ButtonSet.YES_NO);
    if (risposta !== ui.Button.YES) return;
  }

  // 2. Chiamata al sito
  var esito;
  try {
    esito = UrlFetchApp.fetch(sito + '/api/revalidate', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'x-aletheia-secret': segreto },
      payload: JSON.stringify({ scope: 'calendario' }),
      muteHttpExceptions: true,
    });
  } catch (err) {
    ui.alert('Sito non raggiungibile', 'Non riesco a contattare ' + sito + '.\nControlla la connessione o SITO_URL e riprova.', ui.ButtonSet.OK);
    return;
  }

  var codice = esito.getResponseCode();
  if (codice === 401) {
    ui.alert('Segreto non valido (401)', 'SITO_SEGRETO è diverso dal segreto configurato sul sito.', ui.ButtonSet.OK);
    return;
  }
  if (codice === 503) {
    ui.alert('Il sito non ha il segreto configurato (503)', 'Manca WP_SHARED_SECRET su Vercel, o manca il redeploy dopo averlo impostato.', ui.ButtonSet.OK);
    return;
  }
  if (codice !== 200) {
    ui.alert('Errore del sito (' + codice + ')', 'Riprova tra un minuto. Se si ripete, avvisa chi gestisce il sito.', ui.ButtonSet.OK);
    return;
  }

  var dati = {};
  try { dati = JSON.parse(esito.getContentText()); } catch (e) {}
  var ok = (dati.revalidated || []).length;
  var ko = (dati.failed || []).length;
  if (ko > 0) {
    ui.alert('Pagine non aggiornate', ok + ' pagine aggiornate, ' + ko + ' no.\nRiprova dopo un minuto; se si ripete, avvisa chi gestisce il sito.', ui.ButtonSet.OK);
  } else {
    ui.alert('Aggiornamenti pubblicati', ok + ' pagine aggiornate. Le nuove date compaiono sul sito entro un minuto.', ui.ButtonSet.OK);
  }
}

/** Righe "pubblicato" che il sito scarterebbe: date non valide, corso vuoto, data_fine prima di data_inizio. */
function controllaFoglio_() {
  var scheda = SpreadsheetApp.getActive().getSheetByName(SCHEDA_CORSI);
  if (!scheda) return ['Non trovo la scheda "' + SCHEDA_CORSI + '".'];
  var righe = scheda.getDataRange().getDisplayValues(); // testo come si vede nel foglio (le date restano gg/mm/aaaa)
  var intestazione = righe[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var col = function (nome) { return intestazione.indexOf(nome); };
  var obbligatorie = ['corso', 'data_inizio', 'data_fine', 'tipologia', 'stato'];
  var mancanti = obbligatorie.filter(function (c) { return col(c) < 0; });
  if (mancanti.length > 0) return ['Intestazione cambiata: mancano le colonne ' + mancanti.join(', ') + ' (non rinominare la riga 1).'];

  var problemi = [];
  for (var i = 1; i < righe.length; i++) {
    var r = righe[i];
    var v = function (nome) { return String(r[col(nome)] || '').trim(); };
    if (v('stato').toLowerCase() !== 'pubblicato') continue;
    if (v('tipologia').toLowerCase() !== 'multiaziendale') continue;
    var n = i + 1;
    var inizio = dataIt_(v('data_inizio'));
    var fine = v('data_fine') === '' ? inizio : dataIt_(v('data_fine'));
    if (!v('corso')) problemi.push('Riga ' + n + ': corso vuoto.');
    else if (!inizio) problemi.push('Riga ' + n + ' (' + v('corso') + '): data_inizio "' + v('data_inizio') + '" non valida (serve gg/mm/aaaa).');
    else if (!fine) problemi.push('Riga ' + n + ' (' + v('corso') + '): data_fine "' + v('data_fine') + '" non valida (serve gg/mm/aaaa).');
    else if (fine < inizio) problemi.push('Riga ' + n + ' (' + v('corso') + '): data_fine prima di data_inizio.');
  }
  return problemi;
}

/** gg/mm/aaaa → numero confrontabile (aaaammgg); null se non è una data vera (es. 17/11/206 o 31/02/2026). */
function dataIt_(testo) {
  var m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(testo).trim());
  if (!m) return null;
  var g = Number(m[1]), me = Number(m[2]), a = Number(m[3]);
  var d = new Date(a, me - 1, g);
  if (d.getFullYear() !== a || d.getMonth() !== me - 1 || d.getDate() !== g) return null;
  return a * 10000 + me * 100 + g;
}
```
