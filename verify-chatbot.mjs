import { chromium } from 'playwright-core';
import { mkdirSync } from 'fs';

const EXE = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:3000/';
const SHOT_DIR = 'test-screenshots/chatbot';
mkdirSync(SHOT_DIR, { recursive: true });

let failures = 0;
function check(label, ok) {
  console.log(`[${label}] => ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) failures++;
}

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const toggleBtn = () => page.locator('button[aria-label="Apri assistente FAQ"], button[aria-label="Chiudi assistente"]');
const input = () => page.getByPlaceholder('Scrivi una domanda su corsi o lavoro...');
const submitBtn = () => page.locator('button[aria-label="Invia domanda"]');

// 1) Apri la homepage, apri il chatbot
await page.goto(BASE, { waitUntil: 'networkidle' });
await toggleBtn().click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${SHOT_DIR}/01-chatbot-open.png` });
check('01 chatbot aperto', await page.locator('button[aria-label="Invia domanda"]').isVisible());

// 2) Domanda che matcha una FAQ
await input().fill('come mi iscrivo a un corso');
await submitBtn().click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOT_DIR}/02-faq-match.png` });
const matchedAnswer = await page.locator('text=sezione \'Tutti i corsi\'').first().isVisible().catch(() => false);
check('02 risposta FAQ corretta mostrata', matchedAnswer);

// 3) Chiudi e riapri, domanda non pertinente
await page.locator('button[aria-label="Chiudi chat"]').click();
await page.waitForTimeout(200);
await toggleBtn().click();
await page.waitForTimeout(300);
await input().fill('che tempo fa oggi');
await submitBtn().click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${SHOT_DIR}/03-fallback-non-pertinente.png` });

const fallbackVisible = await page.locator('text=Non ho trovato una risposta precisa').isVisible().catch(() => false);
check('03a messaggio di fallback visibile', fallbackVisible);

// La pagina ha già un link tel/mailto nel footer: qui prendiamo l'ultima occorrenza,
// che è quella del chatbot (renderizzato dopo tutto il resto del contenuto pagina).
const telLink = page.locator('a[href="tel:+390932862613"]').last();
const mailLink = page.locator('a[href="mailto:info@aletheiasrl.it"]').last();
check('03b link tel presente', await telLink.isVisible().catch(() => false));
check('03c link mailto presente', await mailLink.isVisible().catch(() => false));

const suggestionChips = page.locator('text=Forse ti interessa anche');
check('03d etichetta chip suggerimenti presente', await suggestionChips.isVisible().catch(() => false));

// 4) Clicca un chip e verifica che mostri la risposta FAQ corrispondente
// I chip sono i bottoni figli diretti del div che contiene il paragrafo
// "Forse ti interessa anche:" (scoping preciso, non ambiguo con altri bottoni).
const chipButtons = page.locator('div:has(> p:text-is("Forse ti interessa anche:")) > button');
const chipCount = await chipButtons.count();
check('04a almeno un chip di suggerimento presente', chipCount > 0);

let chipText = '';
if (chipCount > 0) {
  chipText = (await chipButtons.first().textContent()) || '';
  await chipButtons.first().click();
  await page.waitForTimeout(300);
}
await page.screenshot({ path: `${SHOT_DIR}/04-chip-clicked.png` });

// Dopo il click, il fallback deve sparire e comparire la bolla di risposta FAQ
const fallbackGone = !(await page.locator('text=Non ho trovato una risposta precisa').isVisible().catch(() => false));
const questionEchoed = chipText ? await page.locator(`text=${chipText}`).first().isVisible().catch(() => false) : false;
check('04b fallback chiuso dopo click sul chip', fallbackGone);
check('04c risposta FAQ del chip mostrata', questionEchoed);

// 5) Chiudi il bot, riaprilo una seconda volta: l'animazione breathe/glow non deve più essere attiva
await page.locator('button[aria-label="Chiudi chat"]').click();
await page.waitForTimeout(200);
await toggleBtn().click(); // chiude il pannello (il bot era aperto)
await page.waitForTimeout(200);
await toggleBtn().click(); // riapre
await page.waitForTimeout(400);
await page.screenshot({ path: `${SHOT_DIR}/05-second-open-no-animation.png` });

// Verifica sullo stato computato: dopo la prima apertura in sessione, il pittogramma
// deve avere la classe no-breathe e l'animation-name deve essere "none".
const markAnimation = await page.evaluate(() => {
  const mark = document.querySelector('.chatbot-toggle-mark');
  if (!mark) return null;
  return {
    hasNoBreatheClass: mark.classList.contains('no-breathe'),
    animationName: getComputedStyle(mark).animationName,
  };
});
check('05a pittogramma ha classe no-breathe', !!markAnimation?.hasNoBreatheClass);
check('05b animation-name calcolata è "none"', markAnimation?.animationName === 'none');

const toggleHasBreatheClass = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Chiudi assistente"], button[aria-label="Apri assistente FAQ"]');
  return btn ? btn.classList.contains('chatbot-toggle-btn') : null;
});
check('05c pulsante toggle non ha più la classe glow', toggleHasBreatheClass === false);

console.log(`\n${failures === 0 ? 'TUTTI I CONTROLLI SUPERATI' : `${failures} CONTROLLO/I FALLITO/I`}`);

await browser.close();
process.exit(failures === 0 ? 0 : 1);
