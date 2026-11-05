// Card della pagina /news: l'INTERA card è un solo link verso l'articolo (nessun link annidato, il testo "Leggi l'articolo" sta dentro il link).
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';

test('news: ogni card è un unico link verso /news/<slug> @rapido', async ({ request }) => {
  const $ = cheerio.load(await (await request.get('/news')).text());
  const card = $('a.news-card-link');
  expect(card.length, 'card-link nella pagina').toBeGreaterThanOrEqual(10);
  card.each((_, a) => {
    const href = $(a).attr('href') || '';
    expect(href, 'indirizzo della card').toMatch(/^\/news\/[a-z0-9-]+$/);
    expect($(a).find('a').length, `${href}: link annidati`).toBe(0);
    expect($(a).find('h3').length, `${href}: titolo dentro il link`).toBe(1);
    expect($(a).text(), `${href}: etichetta`).toContain("Leggi l'articolo");
  });
  // nessuna card "vecchia" con il solo link in fondo: ogni h3 delle card sta in un link
  expect($('.news-grid h3').length, 'titoli nella griglia').toBe(card.length);
});

test('news: un clic in qualsiasi punto della card apre l\'articolo @rapido', async ({ page }) => {
  await page.goto('/news', { waitUntil: 'networkidle' });
  const prima = page.locator('a.news-card-link').first();
  const href = await prima.getAttribute('href');
  const box = await prima.boundingBox();
  // clic sull'immagine (in alto a sinistra), non sul titolo né su "Leggi l'articolo"
  await page.mouse.click(box.x + 20, box.y + 20);
  await expect(page).toHaveURL(new RegExp(href.replace(/[/-]/g, '\$&') + '$'));
});
