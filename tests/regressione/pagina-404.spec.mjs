// Pagina 404: stato HTTP 404 reale, noindex e link a corsi, calendario e contatti.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';

for (const url of ['/url-inesistente-404', '/corsi/corso-che-non-esiste', '/news/articolo-che-non-esiste', '/formazione/non-esiste']) {
  test(`${url}: 404 reale, noindex, link utili e un solo H1 @rapido`, async ({ request }) => {
    const r = await request.get(url);
    expect(r.status()).toBe(404);
    const $ = cheerio.load(await r.text());
    expect($('meta[name="robots"]').attr('content')).toMatch(/noindex/);
    expect($('h1')).toHaveLength(1);
    for (const href of ['/corsi', '/calendario-corsi', '/contatti']) expect($(`main a[href="${href}"]`).length, href).toBeGreaterThan(0);
  });
}
