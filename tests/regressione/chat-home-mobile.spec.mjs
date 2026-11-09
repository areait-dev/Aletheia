// Home a 390px: il bottone tondo della chat non copre "Cerca" della hero (con finestre alte tra 675 e 760px lo copriva).
// Resta nascosto finché la hero è in vista e compare dopo lo scorrimento; sulle altre pagine c'è sempre.
import { test, expect } from '@playwright/test';

const toggle = (page) => page.locator('.chatbot-toggle-size');

for (const altezza of [680, 720, 760, 844]) {
  test(`home 390x${altezza}: la chat non si sovrappone a "Cerca" @rapido`, async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
    await page.setViewportSize({ width: 390, height: altezza });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const cerca = page.getByRole('button', { name: 'Cerca', exact: true });
    await expect(cerca).toBeVisible();
    const b = await cerca.boundingBox();
    const t = await toggle(page).boundingBox();
    const sovrapposti = b && t && b.x < t.x + t.width && t.x < b.x + b.width && b.y < t.y + t.height && t.y < b.y + b.height;
    const visibile = await toggle(page).evaluate((e) => getComputedStyle(e.closest('.chatbot-root')).visibility === 'visible');
    expect(sovrapposti && visibile, `chat visibile sopra "Cerca" (${JSON.stringify({ b, t })})`).toBeFalsy();
  });
}

test('home 390px: la chat compare dopo la hero @rapido', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(toggle(page)).toBeHidden();
  const altezzaHero = await page.evaluate(() => document.querySelector('section.hero').getBoundingClientRect().bottom + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + 50), altezzaHero);
  await expect(toggle(page)).toBeVisible();
});

test('altre pagine e schermi larghi: la chat c\'è subito @rapido', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.setViewportSize({ width: 390, height: 720 });
  await page.goto('/chi-siamo', { waitUntil: 'networkidle' });
  await expect(toggle(page)).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(toggle(page)).toBeVisible();
});
