// Metadata, HTML pre-renderizzato (senza JavaScript), status HTTP e redirect: devono restare identici.
import { test, expect } from '@playwright/test';
import { urls, redirect, nomeFile, confronta, estraiMetadata } from './util.mjs';

for (const { url, atteso } of urls) {
  test(`metadata ${url} @rapido`, async ({ request }) => {
    const r = await request.get(url, { maxRedirects: 0, headers: { 'accept-language': 'it-IT' } });
    if (atteso) expect(r.status()).toBe(atteso);
    confronta(`metadata/${nomeFile(url)}`, estraiMetadata(await r.text(), r.status()));
  });
}

test('robots.txt @rapido', async ({ request }) => {
  const r = await request.get('/robots.txt');
  confronta('metadata/robots-txt', { status: r.status(), testo: await r.text() });
});

test('redirect di next.config.js @rapido', async ({ request }) => {
  const risultato = [];
  for (const r of redirect) {
    const res = await request.get(r.da, { maxRedirects: 0 });
    risultato.push({ da: r.da, status: res.status(), location: res.headers()['location'] ?? null });
  }
  confronta('metadata/redirect', risultato);
});
