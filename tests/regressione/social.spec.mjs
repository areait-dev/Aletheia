// Icone social dei moduli Azienda e Candidato (FormAzienda, FormCandidato): devono usare gli stessi link del footer
// (Facebook, Instagram, LinkedIn, Telegram), mai href="#". Prima erano tre icone senza destinazione e con aria-label uguale al nome
// della classe (es. "fab fa-facebook-f").
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';

const PAGINE = [
  '/agenzia-per-il-lavoro/servizi-alla-persona',
  '/agenzia-per-il-lavoro/servizi-alle-imprese',
  '/formazione/fondi-interprofessionali',
  '/formazione/fondo-nuove-competenze',
];

test('social dei moduli: gli stessi link del footer, nessun "#" @rapido', async ({ request }) => {
  for (const u of PAGINE) {
    const $ = cheerio.load(await (await request.get(u)).text());
    expect($('a[href="#"]').length, `${u}: link a "#"`).toBe(0);
    const footer = $('footer a[href*="facebook.com"], footer a[href*="instagram.com"], footer a[href*="linkedin.com"], footer a[href*="t.me"]').map((_, a) => $(a).attr('href')).get();
    expect(footer.length, `${u}: link social nel footer`).toBe(4);
    const nelModulo = $('main a[href*="facebook.com"], main a[href*="instagram.com"], main a[href*="linkedin.com"], main a[href*="t.me"]');
    expect(nelModulo.map((_, a) => $(a).attr('href')).get().sort(), `${u}: i social del modulo coincidono con il footer`).toEqual([...footer].sort());
    nelModulo.each((_, a) => {
      expect($(a).attr('aria-label'), `${u}: nome accessibile dell'icona`).toMatch(/^(Facebook|Instagram|LinkedIn|Telegram)$/);
      expect($(a).attr('target'), `${u}: apre in una nuova scheda`).toBe('_blank');
      expect($(a).attr('rel') || '', `${u}: rel`).toContain('noopener');
    });
  }
});
