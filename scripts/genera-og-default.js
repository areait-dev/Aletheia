// Immagine di condivisione predefinita (Open Graph / Twitter): 1200x630, logo bianco + "Formazione e lavoro" su sfondo del brand
// (stesso gradiente delle sezioni scure del sito: #0F172A -> #0a4f54 -> #008C95). Si rigenera con: node scripts/genera-og-default.js
const sharp = require('sharp');
const path = require('path');

const L = 1200, A = 630;
const radice = path.resolve(__dirname, '..');

(async () => {
  const sfondo = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${A}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0F172A"/><stop offset="0.5" stop-color="#0a4f54"/><stop offset="1" stop-color="#008C95"/>
      </linearGradient></defs>
      <rect width="${L}" height="${A}" fill="url(#g)"/>
      <circle cx="1080" cy="80" r="210" fill="#ffffff" fill-opacity="0.05"/>
      <circle cx="1130" cy="600" r="150" fill="#ffffff" fill-opacity="0.05"/>
      <rect x="96" y="408" width="88" height="6" rx="3" fill="#5FC2C8"/>
      <text x="96" y="492" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#ffffff">Formazione e lavoro</text>
      <text x="96" y="548" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#ffffff" fill-opacity="0.85">Ente di formazione e Agenzia per il Lavoro · Sicilia</text>
    </svg>`
  );
  const logo = await sharp(path.join(radice, 'public', 'logo-white.png')).resize({ height: 300 }).toBuffer();
  await sharp(sfondo)
    .composite([{ input: logo, left: 60, top: 70 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(radice, 'public', 'images', 'og-default.png'));
  console.log('public/images/og-default.png', L + 'x' + A);
})();
