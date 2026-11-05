// Ogni pagina nuova parte dall'ALTO, anche quando si clicca su una scheda mentre Lenis (scorrimento morbido) sta ancora animando lo scorrimento.
// Prima la scheda del corso restava a 2400-3000px per tutto il tempo perché window.scrollTo(0, 0) non azzerava il bersaglio di Lenis
// (vedi scrollToTopNow in lib/lenis.js). Il tasto Indietro, invece, deve continuare a ripristinare la posizione precedente.
import { test, expect } from '@playwright/test';

async function installaCampionatore(page) {
  await page.addInitScript(() => {
    window.__camp = []; const t0 = performance.now();
    const f = () => { window.__camp.push([Math.round(performance.now() - t0), location.pathname, Math.round(window.scrollY)]); requestAnimationFrame(f); };
    requestAnimationFrame(f);
  });
}
async function rotella(page, px) { await page.mouse.move(700, 500); for (let i = 0; i < Math.ceil(px / 250); i++) { await page.mouse.wheel(0, 250); await page.waitForTimeout(25); } }

for (const attesa of [0, 150, 500]) {
  test(`scorrimento: clic su un corso ${attesa}ms dopo la rotellina, la scheda parte dall'alto @rapido`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await installaCampionatore(page);
    await page.goto('/all-courses', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.evaluate(() => { window.__camp.length = 0; });
    await rotella(page, 3000);
    await page.waitForTimeout(attesa);
    const yAlClic = await page.evaluate(() => Math.round(window.scrollY));
    expect(yAlClic, 'la pagina deve essere scorsa (se no il test non prova nulla)').toBeGreaterThan(400);
    await page.evaluate(() => { const l = [...document.querySelectorAll('a[href^="/all-courses/"]')].find((a) => { const r = a.getBoundingClientRect(); return r.width > 50 && r.top > 0 && r.top < innerHeight; }) || document.querySelector('a[href^="/all-courses/"]'); l.click(); });
    await page.waitForURL(/\/all-courses\/[^?]+/);
    await page.waitForTimeout(3000);
    const campioni = await page.evaluate(() => window.__camp);
    const nuova = campioni.filter(([, u]) => u.startsWith('/all-courses/'));
    const sopra = nuova.filter(([, , y]) => y > 5);
    expect(nuova.length, 'fotogrammi sulla pagina nuova').toBeGreaterThan(50);
    expect(sopra.length, `fotogrammi della scheda con scorrimento > 0 (max y ${Math.max(0, ...sopra.map((x) => x[2]))}) su ${nuova.length}`).toBeLessThanOrEqual(4);
    expect(await page.evaluate(() => Math.round(window.scrollY)), 'scorrimento finale').toBe(0);
    // la rotellina sulla scheda parte da 0 (non dal bersaglio vecchio di Lenis)
    await rotella(page, 250); // un solo colpo di rotella da 250px
    await page.waitForTimeout(1800);
    const dopoRotella = await page.evaluate(() => Math.round(window.scrollY));
    expect(dopoRotella, 'dopo un colpo di rotella da 250px').toBeGreaterThan(150);
    expect(dopoRotella, 'dopo un colpo di rotella da 250px').toBeLessThan(350);
  });
}

test('scorrimento: dal corso correlato si riparte dall\'alto @rapido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/all-courses/antincendio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await rotella(page, 6000);
  await page.waitForTimeout(100);
  await page.evaluate(() => { document.querySelector('.cp-carousel-track a[href^="/all-courses/"]').click(); });
  await page.waitForTimeout(2500);
  expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(0);
});

test('scorrimento: il tasto Indietro ripristina la posizione del catalogo @rapido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/all-courses', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await rotella(page, 1500);
  await page.waitForTimeout(1800);
  const prima = await page.evaluate(() => Math.round(window.scrollY));
  expect(prima).toBeGreaterThan(800);
  await page.evaluate(() => { const l = [...document.querySelectorAll('a[href^="/all-courses/"]')].find((a) => { const r = a.getBoundingClientRect(); return r.width > 50 && r.top > 0 && r.top < innerHeight; }); l.click(); });
  await page.waitForURL(/\/all-courses\/[^?]+/);
  await page.waitForTimeout(1500);
  expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(0);
  await page.goBack();
  await page.waitForTimeout(1500);
  const dopo = await page.evaluate(() => Math.round(window.scrollY));
  expect(dopo, `posizione dopo Indietro (prima ${prima})`).toBeGreaterThan(prima * 0.6);
});
