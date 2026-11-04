// Invio dei moduli, lato BROWSER: i tre stati che vede chi compila (invio riuscito, errore, invio non attivo/senza chiave) su
// preventivo, contatti e candidatura con CV, più il controllo che gli altri moduli espongano il campo-trappola e la validazione.
//  - riuscito / errore: la rotta /api/moduli/* è simulata nel browser (page.route): non parte nessuna email, nemmeno verso Resend.
//  - senza chiave: si usa la rotta VERA del server di test, che non ha RESEND_API_KEY (come oggi in produzione). Per questo, con
//    URL_BASE (anteprima/produzione), quello scenario si salta: lì la chiave potrebbe esserci e l'invio sarebbe reale.
// CATTURE_MODULI=<cartella> salva uno screenshot per scenario (usato per la revisione visiva prima del merge).
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { CONSENSO } from './font-comune.mjs';

const CATTURE = process.env.CATTURE_MODULI;
const SALTA_SERVER_VERO = !!process.env.URL_BASE;
const ATTESA_ANTISPAM_MS = 3300; // il server rifiuta i moduli compilati in meno di 3 secondi
const PDF = Buffer.concat([Buffer.from('%PDF-1.4\n'), Buffer.from('curriculum di prova')]);

async function prepara(page, url, w = 1280, h = 1000) {
  await page.addInitScript(CONSENSO);
  await page.setViewportSize({ width: w, height: h });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
}

async function cattura(page, nome, selettore) {
  if (!CATTURE) return;
  fs.mkdirSync(CATTURE, { recursive: true });
  await page.locator(selettore).first().evaluate((e) => e.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(CATTURE, `${nome}.png`) });
}

const RISPOSTE = {
  riuscito: { status: 200, corpo: { stato: 'ok' } },
  errore: { status: 502, corpo: { stato: 'errore' } },
};

/** Esegue i tre scenari su un modulo. `compila` riempie il modulo, `invia` preme il pulsante. */
async function provaTreStati(page, { nome, url, rotta, compila, invia, titoloOk, oggetto, haFile = false, attesoNelCorpo = [], larghezza = 1280 }) {
  for (const scenario of ['riuscito', 'errore', 'senza-chiave']) {
    if (scenario === 'senza-chiave' && SALTA_SERVER_VERO) continue;
    await prepara(page, url, larghezza);
    await compila(page);
    await page.waitForTimeout(ATTESA_ANTISPAM_MS);
    let richiesta = null;
    if (scenario !== 'senza-chiave') {
      await page.route(`**/api/moduli/${rotta}`, async (route) => {
        richiesta = { corpo: route.request().postDataBuffer()?.toString('latin1') || '', tipo: route.request().headers()['content-type'] || '' };
        await route.fulfill({ status: RISPOSTE[scenario].status, contentType: 'application/json', body: JSON.stringify(RISPOSTE[scenario].corpo) });
      });
    }
    await invia(page);

    if (scenario === 'riuscito') {
      await expect(page.getByText(titoloOk).first(), `${nome}: conferma dopo risposta ok`).toBeVisible();
      await expect(page.locator('[data-esito]')).toHaveCount(0);
      expect(richiesta.tipo).toMatch(/^multipart\/form-data/);
      for (const s of ['name="tempo"', 'name="contatto_alternativo"', ...attesoNelCorpo]) expect(richiesta.corpo, `${nome}: manca ${s} nella richiesta`).toContain(s);
      await cattura(page, `${nome}-1-riuscito`, '[role="status"], h3:has-text("inviat"), h2:has-text("inviat")');
    } else if (scenario === 'errore') {
      const box = page.locator('[data-esito="errore"]');
      await expect(box, `${nome}: riquadro d'errore`).toBeVisible();
      await expect(box).toContainText('Non siamo riusciti a inviare la richiesta');
      await expect(box).toContainText('nessuno l\'ha ricevuta');
      await expect(box.locator('a[href^="tel:"]')).toHaveAttribute('href', 'tel:+390932862613');
      await expect(box.locator('a[href^="mailto:info@aletheiasrl.it"]')).toBeVisible();
      await expect(page.getByText(titoloOk), `${nome}: NON deve confermare l'invio`).toHaveCount(0);
      await cattura(page, `${nome}-2-errore`, '[data-esito]');
    } else {
      const box = page.locator('[data-esito="senza-chiave"]');
      await expect(box, `${nome}: riquadro "senza chiave"`).toBeVisible();
      await expect(box).toContainText('non è ancora attivo');
      await expect(box).toContainText('non è stata inviata');
      await expect(box.locator('a[href^="tel:"]')).toHaveAttribute('href', 'tel:+390932862613');
      const mail = box.getByRole('link', { name: /email già compilata/i });
      const href = await mail.getAttribute('href');
      expect(href.startsWith('mailto:info@aletheiasrl.it?subject=')).toBe(true);
      const u = new URL(href);
      expect(u.searchParams.get('subject')).toBe(oggetto);
      expect(u.searchParams.get('body')).toContain('@esempio.it');
      if (haFile) await expect(box).toContainText('cv-mario.pdf');
      await expect(page.getByText(titoloOk), `${nome}: NON deve confermare l'invio`).toHaveCount(0);
      await cattura(page, `${nome}-3-senza-chiave`, '[data-esito]');
    }
    await page.unroute(`**/api/moduli/${rotta}`).catch(() => {});
  }
}

test('preventivo: invio riuscito, errore e senza chiave @rapido', async ({ page }) => {
  await provaTreStati(page, {
    nome: 'preventivo', url: '/richiedi-preventivo?corso=Antincendio%20Livello%202', rotta: 'preventivo', titoloOk: 'Richiesta inviata!',
    oggetto: '[Sito] Preventivo: Antincendio Livello 2', attesoNelCorpo: ['Antincendio Livello 2', 'mario@esempio.it'],
    compila: async (p) => {
      await p.selectOption('#tipologia', 'Azienda'); await p.fill('#azienda', 'Azienda di prova S.r.l.');
      await p.fill('#nome', 'Mario'); await p.fill('#cognome', 'Rossi'); await p.fill('#email', 'mario@esempio.it');
      await p.fill('#telefono', '+39 333 1234567'); await p.fill('#partecipanti', '8'); await p.selectOption('#modalita', 'Presso la mia azienda');
      await p.check('#privacy');
    },
    invia: (p) => p.getByRole('button', { name: /Invia la richiesta/i }).click(),
  });
});

test('contatti: invio riuscito, errore e senza chiave @rapido', async ({ page }) => {
  await provaTreStati(page, {
    nome: 'contatti', url: '/contatti', rotta: 'contatti', titoloOk: 'Messaggio inviato!',
    oggetto: '[Sito] Contatto: Informazioni su un corso', attesoNelCorpo: ['Informazioni su un corso', 'mario@esempio.it'],
    compila: async (p) => {
      await p.fill('#nome', 'Mario'); await p.fill('#cognome', 'Rossi'); await p.fill('#email', 'mario@esempio.it');
      await p.selectOption('#motivo', 'Informazioni su un corso'); await p.fill('#messaggio', 'Buongiorno, vorrei informazioni sui corsi di sicurezza.');
      await p.check('#privacy');
    },
    invia: (p) => p.getByRole('button', { name: /Invia messaggio/i }).click(),
  });
});

test('candidatura con CV: invio riuscito (il file viaggia), errore e senza chiave @rapido', async ({ page }) => {
  await provaTreStati(page, {
    nome: 'candidatura', url: '/agenzia-per-il-lavoro/servizi-alla-persona', rotta: 'candidatura', titoloOk: /Candidatura inviata!/, haFile: true,
    oggetto: '[Sito] Candidatura: Candidatura Spontanea', attesoNelCorpo: ['cv-mario.pdf', '%PDF-1.4', 'mario@esempio.it', 'Candidatura Spontanea'],
    compila: async (p) => {
      const f = p.locator('#contatta-candidato');
      await f.getByPlaceholder('Mario', { exact: true }).fill('Mario'); await f.getByPlaceholder('Rossi', { exact: true }).fill('Rossi');
      await f.getByPlaceholder('mario@esempio.it').fill('mario@esempio.it'); await f.getByPlaceholder('Vittoria', { exact: true }).fill('Vittoria');
      await f.locator('select').selectOption('Candidatura Spontanea');
      await f.locator('input[type=file]').setInputFiles({ name: 'cv-mario.pdf', mimeType: 'application/pdf', buffer: PDF });
      await f.locator('input[type=checkbox]').check({ force: true });
    },
    invia: (p) => p.locator('#contatta-candidato').getByRole('button', { name: /Invia candidatura/i }).click(),
  });
});

test('candidatura: CV troppo grande o di formato sbagliato → messaggio sul campo, nessuna richiesta al server @rapido', async ({ page }) => {
  await prepara(page, '/agenzia-per-il-lavoro/servizi-alla-persona');
  const f = page.locator('#contatta-candidato');
  let chiamate = 0;
  await page.route('**/api/moduli/candidatura', async (r) => { chiamate++; await r.fulfill({ status: 200, contentType: 'application/json', body: '{"stato":"ok"}' }); });
  await f.locator('input[type=file]').setInputFiles({ name: 'grande.pdf', mimeType: 'application/pdf', buffer: Buffer.concat([Buffer.from('%PDF'), Buffer.alloc(4 * 1024 * 1024)]) });
  await expect(f.getByText(/supera il limite di 4 MB/)).toBeVisible();
  await expect(f.getByText(/info@aletheiasrl\.it/).first()).toBeVisible();
  await cattura(page, 'candidatura-4-cv-troppo-grande', '#contatta-candidato [role="alert"], #contatta-candidato span:has-text("4 MB")');
  await f.locator('input[type=file]').setInputFiles({ name: 'malware.exe', mimeType: 'application/octet-stream', buffer: Buffer.from('MZ') });
  await expect(f.getByText(/Formato non consentito/)).toBeVisible();
  await f.getByPlaceholder('Mario', { exact: true }).fill('Mario'); await f.getByPlaceholder('Rossi', { exact: true }).fill('Rossi');
  await f.getByPlaceholder('mario@esempio.it').fill('mario@esempio.it'); await f.getByPlaceholder('Vittoria', { exact: true }).fill('Vittoria');
  await f.locator('select').selectOption('Candidatura Spontanea'); await f.locator('input[type=checkbox]').check({ force: true });
  await page.waitForTimeout(ATTESA_ANTISPAM_MS);
  await f.getByRole('button', { name: /Invia candidatura/i }).click();
  await expect(f.getByText(/Formato non consentito/)).toBeVisible();
  expect(chiamate, 'con un allegato non valido non deve partire nessuna richiesta').toBe(0);
});

test('altri moduli: campo-trappola invisibile e validazione reale (obbligatoria, corsi PA, reclami, azienda) @rapido', async ({ page }) => {
  const casi = [
    { url: '/formazione/obbligatoria', pulsante: /Lascia i tuoi dati/i, minErrori: 5 },
    { url: '/formazione/corsi-pa', pulsante: /Richiedi una consulenza dedicata/i, minErrori: 3 },
    { url: '/reclami-proposte', pulsante: /Invia segnalazione/i, minErrori: 5 },
    { url: '/agenzia-per-il-lavoro/servizi-alle-imprese', pulsante: /Richiedi consulenza/i, minErrori: 5 },
  ];
  for (const c of casi) {
    await prepara(page, c.url);
    const trappola = page.locator('input[name="contatto_alternativo"]');
    await expect(trappola, `${c.url}: campo-trappola`).toHaveCount(1);
    expect(await trappola.evaluate((e) => ({ tab: e.tabIndex, nascostoAgliAT: !!e.closest('[aria-hidden="true"]'), x: e.getBoundingClientRect().x })), `${c.url}`).toMatchObject({ tab: -1, nascostoAgliAT: true });
    let chiamate = 0;
    await page.route('**/api/moduli/**', async (r) => { chiamate++; await r.fulfill({ status: 200, contentType: 'application/json', body: '{"stato":"ok"}' }); });
    await page.getByRole('button', { name: c.pulsante }).first().click();
    await expect.poll(() => page.locator('[role="alert"], .err-msg, form span:has(.fa-exclamation-circle)').count(), `${c.url}: errori con modulo vuoto`).toBeGreaterThanOrEqual(c.minErrori);
    expect(chiamate, `${c.url}: modulo vuoto non deve partire`).toBe(0);
    await page.unroute('**/api/moduli/**');
  }
});
