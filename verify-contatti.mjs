import { chromium } from 'playwright-core';
import { mkdirSync } from 'fs';

const EXE = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:3000/contatti';
const SHOT_DIR = 'test-screenshots/contatti';
mkdirSync(SHOT_DIR, { recursive: true });

let failures = 0;
function check(label, ok) {
  console.log(`[${label}] => ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) failures++;
}

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

await page.goto(BASE, { waitUntil: 'networkidle' });

// --- Head: nessun tag <title>/<meta description> duplicato ---
const titleCount = await page.locator('head title').count();
const descCount = await page.locator('head meta[name="description"]').count();
check('title unico in <head>', titleCount === 1);
check('meta description unica in <head>', descCount === 1);

// --- Validazione: submit vuoto deve mostrare errori inclusi telefono/motivo opzionali gestiti bene ---
await page.locator('button.submit-btn').click();
await page.waitForTimeout(150);
await page.screenshot({ path: `${SHOT_DIR}/01-validation-empty.png` });
check('errore nome mostrato', await page.locator('#nome-error').isVisible().catch(() => false));
check('errore motivo mostrato (reso obbligatorio)', await page.locator('#motivo-error').isVisible().catch(() => false));
check('input nome ha aria-invalid=true', (await page.locator('#nome').getAttribute('aria-invalid')) === 'true');
check('select motivo ha aria-invalid=true', (await page.locator('#motivo').getAttribute('aria-invalid')) === 'true');
check('textarea messaggio ha aria-invalid=true', (await page.locator('#messaggio').getAttribute('aria-invalid')) === 'true');
check('select motivo ha aria-describedby=motivo-error', (await page.locator('#motivo').getAttribute('aria-describedby')) === 'motivo-error');
check('textarea messaggio ha aria-describedby=messaggio-error', (await page.locator('#messaggio').getAttribute('aria-describedby')) === 'messaggio-error');

// --- Validazione telefono opzionale ma con formato errato ---
await page.locator('#telefono').fill('non-un-numero-abc');
await page.locator('button.submit-btn').click();
await page.waitForTimeout(150);
await page.screenshot({ path: `${SHOT_DIR}/02-validation-telefono.png` });
check('errore formato telefono mostrato', await page.locator('#telefono-error').isVisible().catch(() => false));

// telefono vuoto non deve generare errore (campo opzionale)
await page.locator('#telefono').fill('');
await page.locator('button.submit-btn').click();
await page.waitForTimeout(150);
check('telefono vuoto non genera errore', !(await page.locator('#telefono-error').isVisible().catch(() => false)));

// --- Compilazione corretta + verifica spinner "Invio in corso…" prima del messaggio finale ---
await page.locator('#nome').fill('Mario');
await page.locator('#cognome').fill('Rossi');
await page.locator('#email').fill('mario.rossi@esempio.it');
await page.locator('#telefono').fill('+39 333 1234567');
await page.locator('#motivo').selectOption('Informazioni su un corso');
await page.locator('#messaggio').fill('Vorrei informazioni sul corso RSPP.');
await page.locator('#privacy').check();
await page.screenshot({ path: `${SHOT_DIR}/03-form-compilato.png` });

await page.locator('button.submit-btn').click();
// Lo spinner/testo "Invio in corso…" deve comparire subito dopo il click, prima del messaggio finale
const spinningVisible = await page.locator('button.submit-btn', { hasText: 'Invio in corso' }).isVisible().catch(() => false);
await page.screenshot({ path: `${SHOT_DIR}/04-invio-in-corso.png` });
check('stato "Invio in corso…" mostrato dopo il click', spinningVisible);

const submitDisabledDuringInvio = await page.locator('button.submit-btn').isDisabled().catch(() => false);
check('bottone disabilitato durante l\'invio', submitDisabledDuringInvio);

await page.waitForSelector('text=Messaggio inviato!', { timeout: 2000 });
await page.screenshot({ path: `${SHOT_DIR}/05-messaggio-inviato.png` });
check('messaggio "Messaggio inviato!" mostrato dopo il delay', await page.locator('text=Messaggio inviato!').isVisible().catch(() => false));

console.log(`\n${failures === 0 ? 'TUTTI I CONTROLLI SUPERATI' : `${failures} CONTROLLO/I FALLITO/I`}`);

await browser.close();
process.exit(failures === 0 ? 0 : 1);
