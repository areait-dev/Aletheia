// Adattamento per iPad in modalità "sito desktop" (lib/ipad-desktop.js, regole in styles/globals.css: html.ipad-desktop).
// Si attiva SOLO per un iPad che si presenta come Mac (platform MacIntel, maxTouchPoints > 1) con pagina più larga dello schermo visibile.
// In WebKit non si può avere un vero iPad in modalità desktop: si simulano platform, maxTouchPoints e visualViewport (layout 1024, schermo 744).
import { test, expect } from '@playwright/test';

const falsifica = ({ platform, touch, visibile, scala }) => `
  Object.defineProperty(navigator,'platform',{get:()=>${JSON.stringify(platform)}});
  Object.defineProperty(navigator,'maxTouchPoints',{get:()=>${touch}});
  ${visibile ? `Object.defineProperty(window,'visualViewport',{configurable:true,value:Object.assign(new EventTarget(),{width:${visibile},height:1100,scale:${scala ?? 1}})});` : ''}
`;

async function stato(page) {
  return page.evaluate(() => ({
    classe: document.documentElement.classList.contains('ipad-desktop'),
    zoom: document.documentElement.style.getPropertyValue('--ipad-zoom'),
    zoomCss: getComputedStyle(document.documentElement).zoom,
    // fine del menu in punti reali dello schermo: posizione in unità zoomate × zoom
    destra: (() => { const e = document.querySelector('.header-right'); return Math.round((e.offsetLeft + e.offsetWidth) * (parseFloat(getComputedStyle(document.documentElement).zoom) || 1)); })(),
    larghezzaHtml: Math.round(document.documentElement.offsetWidth * (parseFloat(getComputedStyle(document.documentElement).zoom) || 1)),
  }));
}

const casi = [
  ['iPad desktop in verticale (layout 1024, visibile 744, scala 1) -> attivo', { platform: 'MacIntel', touch: 5, visibile: 744 }, 1024, true],
  ['iPad desktop con Safari che ha già rimpicciolito (scala 0,727, visibile 1024) -> invariato', { platform: 'MacIntel', touch: 5, visibile: 1024, scala: 0.727 }, 1024, false],
  ['iPad desktop in orizzontale (layout 1024, visibile 1024) -> invariato', { platform: 'MacIntel', touch: 5, visibile: 1024 }, 1024, false],
  ['iPad ingrandito con le dita (scala 2) -> invariato', { platform: 'MacIntel', touch: 5, visibile: 372, scala: 2 }, 1024, false],
  ['Mac vero (maxTouchPoints 0) -> invariato', { platform: 'MacIntel', touch: 0, visibile: 744 }, 1024, false],
  ['iPad in modalità mobile (platform iPad) -> invariato', { platform: 'iPad', touch: 5, visibile: 744 }, 768, false],
  ['telefono (platform iPhone) -> invariato', { platform: 'iPhone', touch: 5, visibile: 390 }, 390, false],
  ['computer Windows -> invariato', { platform: 'Win32', touch: 0 }, 1440, false],
];

for (const [nome, falso, larghezza, atteso] of casi) {
  test(`${nome} @rapido`, async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ viewport: { width: larghezza, height: 1100 }, baseURL });
    const page = await ctx.newPage();
    await page.addInitScript(falsifica(falso));
    await page.goto('/chi-siamo');
    const s = await stato(page);
    expect(s.classe, JSON.stringify(s)).toBe(atteso);
    if (atteso) {
      expect(Number(s.zoom)).toBeCloseTo(744 / 1024, 3);
      // il menu completo (che a 1024px finiva a ~1008) ora sta dentro i 744 punti visibili
      expect(s.destra).toBeLessThanOrEqual(744);
      expect(s.larghezzaHtml).toBeLessThanOrEqual(745);
    } else {
      expect(s.zoom).toBe('');
    }
    await ctx.close();
  });
}

test('rotazione: da verticale (744) a orizzontale (visibile 1024) la classe si toglie @rapido', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 1100 }, baseURL });
  const page = await ctx.newPage();
  await page.addInitScript(falsifica({ platform: 'MacIntel', touch: 5, visibile: 744 }));
  await page.goto('/chi-siamo');
  expect((await stato(page)).classe).toBe(true);
  await page.evaluate(() => { window.visualViewport.width = 1024; window.visualViewport.dispatchEvent(new Event('resize')); });
  await expect.poll(async () => (await stato(page)).classe).toBe(false);
  expect((await stato(page)).zoom).toBe('');
  await page.evaluate(() => { window.visualViewport.width = 744; window.visualViewport.dispatchEvent(new Event('resize')); });
  await expect.poll(async () => (await stato(page)).classe).toBe(true);
  await ctx.close();
});
