// Test indipendenti dalla rete: ogni richiesta verso l'esterno è servita da una copia locale in tests/riferimenti/rete/.
//  - AGGIORNA_RETE=1  → scarica dal vivo e SALVA la copia (da fare solo quando si generano i riferimenti);
//  - altrimenti       → serve la copia; se manca, la richiesta fallisce e viene segnalata (mai rete reale).
// Sono coperti: font e icone (Google Fonts, cdnjs), immagini esterne (anche quelle che passano da /_next/image?url=https://…:
//   si salva l'ORIGINALE e lo si serve per qualsiasi larghezza/qualità richiesta, così il test non dipende dal formato scelto
//   dall'ottimizzatore di Next) e Google Maps (bloccato: l'iframe diventa una pagina vuota).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { radice } from './util.mjs';

const cartella = path.join(radice, 'tests', 'riferimenti', 'rete');
const registra = process.env.AGGIORNA_RETE === '1';
const hostLocale = `127.0.0.1:${process.env.PORTA_TEST || '3101'}`;
const GOOGLE_MAPS = /(^|\.)(google\.com|googleapis\.com|gstatic\.com)$/;
const FONT_GOOGLE = /^fonts\.(googleapis|gstatic)\.com$/;

const nomeCopia = (url) => crypto.createHash('sha1').update(url).digest('hex').slice(0, 20);

export async function preparaRete(page) {
  await page.route('**/*', async (route) => {
    const richiesta = route.request();
    const u = new URL(richiesta.url());
    if (u.protocol === 'data:' || u.protocol === 'blob:') return route.continue();

    let esterno = null;
    if (u.host === hostLocale) {
      const src = u.pathname === '/_next/image' ? u.searchParams.get('url') : null;
      if (src && /^https?:\/\//.test(src)) esterno = src; // immagine esterna passata dall'ottimizzatore
      else return route.continue();
    } else {
      esterno = richiesta.url();
    }

    const host = new URL(esterno).hostname;
    if (GOOGLE_MAPS.test(host) && !FONT_GOOGLE.test(host)) {
      if (richiesta.resourceType() === 'document') return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html><body style="margin:0;background:#e5e7eb"></body></html>' });
      return route.abort('blockedbyclient');
    }

    const base = path.join(cartella, nomeCopia(esterno));
    if (registra) {
      const risposta = await page.request.get(esterno, { timeout: 60_000 });
      const corpo = await risposta.body();
      fs.mkdirSync(cartella, { recursive: true });
      fs.writeFileSync(`${base}.bin`, corpo);
      fs.writeFileSync(`${base}.json`, JSON.stringify({ url: esterno, status: risposta.status(), contentType: risposta.headers()['content-type'] ?? 'application/octet-stream' }));
    }
    if (!fs.existsSync(`${base}.json`)) {
      (page.__retePerse ||= []).push(esterno);
      console.warn(`[rete] copia locale mancante: ${esterno}`);
      return route.abort('failed');
    }
    const meta = JSON.parse(fs.readFileSync(`${base}.json`, 'utf8'));
    return route.fulfill({ status: meta.status, contentType: meta.contentType, headers: { 'access-control-allow-origin': '*' }, body: fs.readFileSync(`${base}.bin`) });
  });
}
