// Articolo news: (1) badge, titolo e data dell'hero partono dallo stesso bordo sinistro del testo (prima l'hero era max-w-5xl centrato e il testo in .container);
// (2) la colonna laterale (correlate, tag, contatti) resta attaccata sotto l'header mentre il testo scorre (prima era alta quanto il suo contenuto e usciva dallo schermo).
import { test, expect } from '@playwright/test';

const ARTICOLO = '/news/bonus-giovani-under-35-aprile-2026';
const sinistra = (page, sel) => page.evaluate((s) => Math.round(document.querySelector(s).getBoundingClientRect().left), sel);

for (const [w, h] of [[1920, 1000], [1440, 900], [1280, 720], [1180, 800], [768, 1024], [390, 844]]) {
  test(`articolo news a ${w}px: badge e titolo dell'hero allineati a sinistra con il testo @rapido`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(ARTICOLO);
    const [badge, titolo, testo] = [await sinistra(page, '.page-hero-badge'), await sinistra(page, 'h1'), await sinistra(page, 'main')];
    expect({ badge, titolo }).toEqual({ badge: testo, titolo: testo });
  });
}

test('/news (elenco): badge, titolo e primo contenuto restano allineati a sinistra @rapido', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/news');
  const [badge, titolo] = [await sinistra(page, '.page-hero-badge'), await sinistra(page, 'h1')];
  expect(badge).toBe(titolo);
  expect(titolo).toBe(await page.evaluate(() => Math.round(document.querySelectorAll('section')[1].querySelector('.container').getBoundingClientRect().left + parseFloat(getComputedStyle(document.querySelectorAll('section')[1].querySelector('.container')).paddingLeft))));
});

for (const [w, h] of [[1920, 1000], [1440, 900], [1280, 720], [1180, 800]]) {
  test(`articolo news a ${w}x${h}: la colonna laterale con le correlate resta sticky @rapido`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(ARTICOLO);
    const m = await page.evaluate(() => {
      const aside = document.querySelector('.article-sidebar');
      return { asideAlt: aside.getBoundingClientRect().height, mainAlt: document.querySelector('main').getBoundingClientRect().height, header: document.querySelector('.site-header').getBoundingClientRect().height };
    });
    expect(m.asideAlt, 'la colonna è alta quanto il testo, non solo quanto il proprio contenuto').toBeGreaterThan(m.mainAlt - 2);
    const box = page.locator('.article-sidebar-sticky');
    for (const y of [800, 1300]) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(250);
      const r = await box.evaluate((e) => { const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), vh: innerHeight }; });
      expect(r.top, `attaccato sotto l'header (alto ${m.header}px) allo scroll ${y}`).toBeGreaterThanOrEqual(m.header);
      expect(r.top).toBeLessThanOrEqual(m.header + 24);
      expect(r.bottom, 'resta dentro lo schermo').toBeLessThanOrEqual(r.vh);
    }
    await expect(page.getByText('Altre notizie')).toBeVisible(); // le correlate sono visibili anche dopo lo scroll
  });
}

test('articolo news sotto i 1100px: niente colonna laterale (come prima) @rapido', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto(ARTICOLO);
  await expect(page.locator('.article-sidebar')).toBeHidden();
});
