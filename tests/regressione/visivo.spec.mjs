// Screenshot a pagina intera di ogni URL "visivo" a 390 / 768 / 1440 px, tema chiaro e scuro.
// Maschere (elementi che cambiano da soli): vedi MASCHERE.
import { test, expect } from '@playwright/test';
import { urls, LARGHEZZE, TEMI, nomeFile } from './util.mjs';
import { preparaPagina, caricaTutto, verificaRete } from './pagina.mjs';

// Nessuna maschera: la build di test congela "oggi" (DATA_FISSA_TEST), quindi la sezione "Corsi in partenza" è riproducibile.
const MASCHERE = [];

// Suite rapida (npm run test:rapido): solo queste 20 pagine, a 1440 px, tema chiaro (tag @rapido nel titolo).
const PAGINE_RAPIDE = new Set([
  '/', '/calendario-corsi', '/corsi', '/corsi/sicurezza-lavoro', '/corsi/antincendio', '/corsi/macchine-movimento-terra',
  '/news', '/news/bonus-giovani-under-35-aprile-2026', '/formazione/obbligatoria', '/formazione/ecm', '/formazione/avviso-1-2026-poc',
  '/chi-siamo', '/contatti', '/aiuti-di-stato/2023', '/archivio', '/archivio/avviso-7-2023', '/agenzia-per-il-lavoro',
  '/agenzia-per-il-lavoro/servizi-alla-persona', '/privacy-cookie', '/url-inesistente-404',
]);

for (const { url, visivo } of urls.filter((u) => u.visivo)) {
  for (const larghezza of LARGHEZZE) {
    for (const tema of TEMI) {
      test(`${url} ${larghezza}px ${tema}${PAGINE_RAPIDE.has(url) && larghezza === 1440 && tema === 'chiaro' ? ' @rapido' : ''}`, async ({ page }) => {
        await page.setViewportSize({ width: larghezza, height: 900 });
        await preparaPagina(page, tema);
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await caricaTutto(page);
        await expect(page).toHaveScreenshot(`${nomeFile(url)}-${larghezza}-${tema}.png`, {
          fullPage: true,
          mask: MASCHERE.map((s) => page.locator(s)),
        });
        verificaRete(page);
      });
    }
  }
}
