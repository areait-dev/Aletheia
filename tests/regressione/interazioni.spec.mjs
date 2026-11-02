// Interazioni: menu mobile, sottomenu Formazione, filtri del calendario, filtri di /all-courses via query string,
// 404 e form (senza inviare). Ogni test registra una "traccia" confrontata con il riferimento.
import { test, expect } from '@playwright/test';
import { confronta } from './util.mjs';
import { preparaPagina, caricaTutto, verificaRete, STILE_SCREENSHOT } from './pagina.mjs';

const nascondiChat = (page) => page.addStyleTag({ content: STILE_SCREENSHOT });

const CHIAVI_CATEGORIA = ['fse-plus', 'fondi-interprofessionali', 'fondo-nuove-competenze', 'sicurezza-lavoro', 'decreto-attrezzature', 'fitosanitario', 'sicurezza-alimentare', 'icdl', 'certificazioni-informatiche', 'ecm', 'certificazione', 'corsi-pa'];

const testiLink = (loc) => loc.evaluateAll((els) => els.map((e) => `${e.textContent.replace(/\s+/g, ' ').trim()} -> ${e.getAttribute('href')}`));

test('menu mobile: apri e chiudi', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await preparaPagina(page, 'chiaro');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  const burger = page.locator('button.hamburger');
  const traccia = { prima: await burger.getAttribute('aria-expanded') };
  await burger.click();
  await page.waitForTimeout(500);
  traccia.aperto = { expanded: await burger.getAttribute('aria-expanded'), navbarAperta: await page.locator('nav.navbar').evaluate((e) => e.classList.contains('navbar-open')), voci: await testiLink(page.locator('nav.navbar a')) };
  await nascondiChat(page);
  await expect(page).toHaveScreenshot('interazione-menu-mobile-aperto.png');
  await burger.click();
  await page.waitForTimeout(500);
  traccia.dopo = { expanded: await burger.getAttribute('aria-expanded'), navbarAperta: await page.locator('nav.navbar').evaluate((e) => e.classList.contains('navbar-open')) };
  confronta('interazioni/menu-mobile', traccia);
});

test('sottomenu Formazione: desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparaPagina(page, 'chiaro');
  await page.goto('/chi-siamo', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  const trigger = page.locator('nav.navbar a[aria-haspopup="true"]').first();
  const traccia = { prima: await trigger.getAttribute('aria-expanded') };
  await trigger.click();
  await page.waitForTimeout(500);
  traccia.dopo = { expanded: await trigger.getAttribute('aria-expanded'), voci: await testiLink(page.locator('.mega-menu-dropdown a')) };
  await nascondiChat(page);
  await expect(page).toHaveScreenshot('interazione-sottomenu-desktop.png', { clip: { x: 0, y: 0, width: 1440, height: 700 } });
  confronta('interazioni/sottomenu-desktop', traccia);
});

test('sottomenu Formazione: mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await preparaPagina(page, 'chiaro');
  await page.goto('/chi-siamo', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  await page.locator('button.hamburger').click();
  await page.waitForTimeout(400);
  await page.locator('nav.navbar a[aria-haspopup="true"]').first().click();
  await page.waitForTimeout(500);
  const traccia = { voci: await testiLink(page.locator('nav.navbar a')) };
  const sub = page.locator('nav.navbar button[aria-label^="Espandi sottomenu"]').first();
  if (await sub.count()) {
    await sub.click();
    await page.waitForTimeout(400);
    traccia.sottomenuAperto = await sub.getAttribute('aria-expanded');
  }
  await nascondiChat(page);
  await expect(page).toHaveScreenshot('interazione-sottomenu-mobile.png');
  confronta('interazioni/sottomenu-mobile', traccia);
});

test('filtri di /calendario-corsi: categoria, reset e contatore', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparaPagina(page, 'chiaro');
  await page.goto('/calendario-corsi', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  const contatore = async () => (await page.locator('main p', { hasText: /corso in programma|corsi in programma/ }).first().innerText()).replace(/\s+/g, ' ').trim();
  const reset = page.getByRole('button', { name: /Reset filtri/ });
  const traccia = { iniziale: { contatore: await contatore(), resetAbilitato: await reset.isEnabled() }, categorie: {} };
  const bottoni = page.locator('aside button').filter({ hasNotText: /Reset filtri/ });
  const n = await bottoni.count();
  for (let i = 0; i < n; i++) {
    const b = bottoni.nth(i);
    const nome = (await b.innerText()).replace(/\s+/g, ' ').trim();
    await b.click();
    traccia.categorie[nome] = { contatore: await contatore(), resetAbilitato: await reset.isEnabled(), mesi: await page.locator('main button[aria-expanded]').count() };
  }
  await reset.click();
  traccia.dopoReset = { contatore: await contatore(), resetAbilitato: await reset.isEnabled() };
  confronta('interazioni/calendario-filtri', traccia);
});

test('filtri di /all-courses: query string, selezione e reset', async ({ page }) => {
  test.setTimeout(300_000);
  page.setDefaultTimeout(20_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparaPagina(page, 'chiaro');
  const schede = async () => (await page.locator('main a[href^="/all-courses/"]').evaluateAll((els) => Array.from(new Set(els.map((e) => e.getAttribute('href'))))).catch(() => []));
  const traccia = {};
  await page.goto('/all-courses', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  traccia.tutti = (await schede()).length;
  for (const k of CHIAVI_CATEGORIA) {
    await page.goto(`/all-courses?categoria=${k}`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(400);
    traccia[k] = { url: new URL(page.url()).search, schede: await schede() };
  }
  // reset: il parametro sparisce dall'indirizzo senza ricaricare
  await page.goto('/all-courses?categoria=icdl', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  await page.getByRole('button', { name: /Rimuovi filtri/ }).first().click({ timeout: 10_000 }); // il bottone compare solo con un filtro attivo
  await page.waitForTimeout(400);
  traccia.dopoReset = { url: new URL(page.url()).search, schede: (await schede()).length };
  // livelli di un corso con ?livello=
  await page.goto('/all-courses/antincendio?livello=2', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  traccia.livello2 = { url: new URL(page.url()).search, h1: await page.locator('h1').first().innerText() };
  confronta('interazioni/all-courses-query', traccia);
});

test('pagina 404 inesistente', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparaPagina(page, 'chiaro');
  const r = await page.goto('/url-inesistente-404', { waitUntil: 'domcontentloaded' });
  expect(r.status()).toBe(404);
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  confronta('interazioni/404', { status: r.status(), testo: (await page.locator('body').innerText()).replace(/\s+/g, ' ').trim() });
});

test('form contatti e candidatura: campi (senza inviare)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparaPagina(page, 'chiaro');
  const traccia = {};
  for (const url of ['/contatti', '/agenzia-per-il-lavoro/servizi-alla-persona', '/agenzia-per-il-lavoro/servizi-alle-imprese']) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    traccia[url] = await page.locator('form').evaluateAll((forms) =>
      forms.map((f) => Array.from(f.querySelectorAll('input, textarea, select, button[type="submit"]')).map((e) => `${e.tagName.toLowerCase()}:${e.getAttribute('type') ?? ''}:${e.getAttribute('name') ?? ''}:${e.required ? 'req' : ''}`)));
    const primo = page.locator('form input[type="text"], form input[type="email"]').first();
    if (await primo.count()) {
      await primo.fill('Prova');
      traccia[url + ' valore'] = await primo.inputValue();
    }
  }
  confronta('interazioni/form', traccia);
});

test('home: "Corsi in partenza" (data congelata)', async ({ page }) => {
  for (const larghezza of [390, 768, 1440]) {
    await page.setViewportSize({ width: larghezza, height: 900 });
    await preparaPagina(page, 'chiaro');
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await caricaTutto(page);
    const sezione = page.locator('[aria-labelledby="calendario-heading"]');
    await nascondiChat(page);
    await expect(sezione).toHaveScreenshot(`home-corsi-in-partenza-${larghezza}.png`);
  }
  // tab dei giorni: etichette e contenuto di ogni tab
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  const sezione = page.locator('[aria-labelledby="calendario-heading"]');
  const tab = sezione.locator('button[aria-pressed]');
  const traccia = { giorni: [] };
  const n = await tab.count();
  for (let i = 0; i < n; i++) {
    await tab.nth(i).click();
    traccia.giorni.push({ tab: (await tab.nth(i).innerText()).replace(/\s+/g, ' ').trim(), contenuto: (await sezione.innerText()).replace(/\s+/g, ' ').trim() });
  }
  confronta('interazioni/home-corsi-in-partenza', traccia);
});

test.afterEach(async ({ page }) => verificaRete(page));
