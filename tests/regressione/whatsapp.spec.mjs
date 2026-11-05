// Link WhatsApp dei corsi obbligatori (lib/whatsapp.ts): senza numero valido niente pulsante, mai href="#".
import { test, expect } from '@playwright/test';
import { whatsappLink, WHATSAPP_FORMAZIONE } from '../../lib/whatsapp.ts';

test('whatsapp: variabile vuota o non valida = nessun link, mai "#" @rapido', () => {
  for (const v of [undefined, null, '', '   ', '#', 'da definire', '333 1234567', '3331234567', '12345', 'http://wa.me/393331234567', 'https://', '+39 333 12']) {
    expect(whatsappLink(v), `valore ${JSON.stringify(v)}`).toBeNull();
  }
});

test('whatsapp: numero con prefisso o indirizzo https diventano un link @rapido', () => {
  expect(whatsappLink('+39 333 1234567')).toBe('https://wa.me/393331234567');
  expect(whatsappLink('0039 333 1234567')).toBe('https://wa.me/393331234567');
  expect(whatsappLink('393331234567')).toBe('https://wa.me/393331234567');
  expect(whatsappLink('  +39-0932-862613 ')).toBe('https://wa.me/390932862613');
  expect(whatsappLink('https://wa.me/393331234567')).toBe('https://wa.me/393331234567');
  expect(whatsappLink('https://wa.me/393331234567?text=Buongiorno')).toBe('https://wa.me/393331234567?text=Buongiorno');
});

test('whatsapp: il numero del reparto formazione è un link valido @rapido', () => {
  expect(whatsappLink(WHATSAPP_FORMAZIONE)).toBe('https://wa.me/393484072803');
});
