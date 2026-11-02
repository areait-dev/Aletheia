// Screenshot a pagina intera di ogni URL "visivo" a 390 / 768 / 1440 px, tema chiaro e scuro.
// Maschere (elementi che cambiano da soli): vedi MASCHERE.
import { test, expect } from '@playwright/test';
import { urls, LARGHEZZE, TEMI, nomeFile } from './util.mjs';
import { preparaPagina, caricaTutto, verificaRete } from './pagina.mjs';

// Nessuna maschera: la build di test congela "oggi" (DATA_FISSA_TEST), quindi la sezione "Corsi in partenza" è riproducibile.
const MASCHERE = [];

for (const { url, visivo } of urls.filter((u) => u.visivo)) {
  for (const larghezza of LARGHEZZE) {
    for (const tema of TEMI) {
      test(`${url} ${larghezza}px ${tema}`, async ({ page }) => {
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
