// La chat è un widget del sito (components/Chatbot.tsx) che negli screenshot di pagina è nascosto:
// qui si verifica solo che il pulsante sia presente, visibile e cliccabile, e che apra e chiuda la finestra.
import { test, expect } from '@playwright/test';
import { preparaPagina, verificaRete } from './pagina.mjs';

for (const [larghezza, nome] of [[390, 'mobile'], [1440, 'desktop']]) {
  test(`chatbot: pulsante presente e cliccabile (${nome}) @rapido`, async ({ page }) => {
    await page.setViewportSize({ width: larghezza, height: 800 });
    await preparaPagina(page, 'chiaro');
    await page.goto('/chi-siamo', { waitUntil: 'domcontentloaded' });
    const pulsante = page.getByRole('button', { name: 'Apri assistente FAQ' });
    await expect(pulsante).toBeVisible({ timeout: 30_000 });
    await expect(pulsante).toBeEnabled();
    // posizione: in basso a destra della viewport (sempre raggiungibile)
    const box = await pulsante.boundingBox();
    expect(box.x + box.width).toBeGreaterThan(larghezza - 120);
    expect(box.y + box.height).toBeGreaterThan(800 - 140);
    await pulsante.click();
    await expect(page.getByRole('button', { name: 'Chiudi assistente' })).toBeVisible();
    await expect(page.locator('.chatbot-window')).toBeVisible();
    await page.getByRole('button', { name: 'Chiudi assistente' }).click();
    await expect(page.getByRole('button', { name: 'Apri assistente FAQ' })).toBeVisible();
    verificaRete(page);
  });
}
