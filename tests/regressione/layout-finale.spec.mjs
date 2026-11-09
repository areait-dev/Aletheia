// Verifica finale del layout: nessuno scorrimento orizzontale a 390 e 1440px su home, /corsi, una pagina di categoria, una scheda corso,
// Contatti e Calendario. (La chat sopra "Cerca" della home è in chat-home-mobile.spec.mjs: un bottone fisso in un angolo copre sempre qualcosa a qualche
// altezza di finestra, quindi si controlla solo il caso segnalato.)
import { test, expect } from '@playwright/test';

const PAGINE = ['/', '/corsi', '/corsi/sicurezza-lavoro', '/corsi/antincendio', '/contatti', '/calendario-corsi', '/richiedi-preventivo', '/url-inesistente-404'];

for (const larghezza of [390, 1440]) {
  for (const url of PAGINE) {
    test(`${url} a ${larghezza}px: nessuno scorrimento orizzontale @rapido`, async ({ page }) => {
      await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
      await page.setViewportSize({ width: larghezza, height: 844 });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const m = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(m.scroll, `scrollWidth ${m.scroll} > ${m.client}`).toBeLessThanOrEqual(m.client);
      expect(m.body, `body ${m.body} > ${m.client}`).toBeLessThanOrEqual(m.client);
    });
  }
}
