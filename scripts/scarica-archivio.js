const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// slug: percorso usato per cartella PDF / pagina generata (può contenere '/' per le sottovoci).
// url: indirizzo reale della pagina sul vecchio sito da cui estrarre PDF e testo.
const PAGES = [
  { slug: 'avviso-29-2019', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-29-2019' },
  { slug: 'avviso-33-2019', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-33-2019' },
  { slug: 'corsi-settore-agricolo-e-agroalimentare', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/corsi-settore-agricolo-e-agroalimentare' },
  { slug: 'primo-soccorso-pediatrico', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/primo-soccorso-pediatrico' },
  { slug: 'feamp-misura-1-29', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/feamp-misura-1-29' },
  { slug: 'feamp-misura-1-29-2023', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/feamp-misura-1-29-2023' },
  { slug: 'inail-formazione-2022', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/inail-formazione-2022' },
  { slug: 'avviso-7-2023', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-7-2023' },
  // Famiglia MISURA PSR 1.1: pagina indice (senza PDF propri, gestita a parte
  // in pages/archivio/misura-psr-1-1.js) + 8 sottovoci corso/workshop.
  { slug: 'misura-psr-1-1/conduttore-impresa-agricola', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/conduttore-d-impresa-agricola-200-ore' },
  { slug: 'misura-psr-1-1/ammodernamento-aziende-agricole', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/ammodernamento-aziende-agricole-20-ore' },
  { slug: 'misura-psr-1-1/nuove-strategie-sviluppo-investimento', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/nuove-strategie-di-sviluppo-e-investimento-48-ore' },
  { slug: 'misura-psr-1-1/workshop-strategie-marketing', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-strategie-di-marketing-per-le-aziende-agricole-8-ore' },
  { slug: 'misura-psr-1-1/workshop-funzione-innovativa', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-la-funzione-innovativa-nelle-aziende-agricole-8-ore' },
  { slug: 'misura-psr-1-1/workshop-agricoltura-multifunzionalita', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-agricoltura-multifunzionalita-e-diversificazione-8-ore' },
  { slug: 'misura-psr-1-1/workshop-conduttore-impresa-agricola', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-il-conduttore-di-impresa-agricola-8-ore' },
  // Famiglia AVVISO 2/2018: pagina indice (senza PDF propri, gestita a parte
  // in pages/archivio/avviso-2-2018.js) + 3 sottovoci corso.
  { slug: 'avviso-2-2018/corso-di-cucina', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018/corso-di-cucina-500-ore' },
  { slug: 'avviso-2-2018/operatore-informatico-risorse-web', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018/operatore-informativo-di-risorse-web' },
  { slug: 'avviso-2-2018/addetto-panificatore-pasticciere', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018/addetto-panificatore-e-pasticciere' },
];

const ROOT = path.join(__dirname, '..', 'public', 'pdf', 'archivio');

function classify(titolo) {
  const t = titolo.toLowerCase();
  if (t.includes('docenti')) return 'bandi-docenti';
  if (t.includes('tutor')) return 'bandi-tutor';
  if (t.includes('allievi')) return 'bandi-allievi';
  return 'altri';
}

function sanitizeFileName(name) {
  return name.replace(/[/\\?%*:|"<>]/g, '-').trim();
}

const HEADING_LISTA_PDF = /^-?\s*bandi?\s+selezione\s+(docenti|tutor|allievi)\s*$/i;

function normalizzaTesto(s) {
  return s.toLowerCase().replace(/^[-\s]+/, '').trim();
}

function isDuplicatoListaPdf(paragrafo, pdfLinks) {
  const p = normalizzaTesto(paragrafo);
  if (!p) return false;
  if (HEADING_LISTA_PDF.test(paragrafo)) return true;
  return pdfLinks.some((link) => {
    const t = normalizzaTesto(link.titoloLink);
    if (!t) return false;
    return t === p || (t.length > 15 && (p.includes(t) || t.includes(p)));
  });
}

async function fetchPage(url) {
  const res = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ArchivioBot/1.0)' },
    timeout: 20000,
  });
  return res.data;
}

async function downloadPdf(url, destPath) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ArchivioBot/1.0)' },
    timeout: 30000,
  });
  fs.writeFileSync(destPath, res.data);
}

async function main() {
  if (process.argv.includes('--pages-only')) {
    const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'index.json'), 'utf-8'));
    generatePages(index);
    return;
  }

  const index = {};

  for (const { slug, url: pageUrl } of PAGES) {
    console.log(`\n=== Pagina: ${slug} ===`);
    index[slug] = {
      'bandi-docenti': [],
      'bandi-tutor': [],
      'bandi-allievi': [],
      altri: [],
    };

    let html;
    try {
      html = await fetchPage(pageUrl);
    } catch (err) {
      console.error(`Errore nel caricare ${pageUrl}: ${err.message}`);
      continue;
    }

    const $ = cheerio.load(html);
    const pdfLinks = [];

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;
      if (href.toLowerCase().endsWith('.pdf')) {
        const titoloLink = $(el).text().trim() || path.basename(href);
        const urlOriginale = new URL(href, pageUrl).toString();
        pdfLinks.push({ urlOriginale, titoloLink });
      }
    });

    console.log(`Trovati ${pdfLinks.length} PDF`);

    const titolo = $('.itemTitle').first().text().trim();
    const introParagrafi = $('.itemIntroText p')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .filter((p) => !isDuplicatoListaPdf(p, pdfLinks));
    const testoParagrafi = $('.itemFullText p')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .filter((p) => !isDuplicatoListaPdf(p, pdfLinks));

    index[slug].testo = { titolo, intro: introParagrafi, corpo: testoParagrafi };
    console.log(`Testo estratto: titolo="${titolo}", ${introParagrafi.length} paragrafi intro, ${testoParagrafi.length} paragrafi corpo`);

    for (const { urlOriginale, titoloLink } of pdfLinks) {
      const categoria = classify(titoloLink);
      const destDir = path.join(ROOT, slug, categoria);
      fs.mkdirSync(destDir, { recursive: true });

      const nomeFile = sanitizeFileName(decodeURIComponent(path.basename(new URL(urlOriginale).pathname)));
      const destPath = path.join(destDir, nomeFile);
      const percorsoLocale = `/pdf/archivio/${slug}/${categoria}/${nomeFile}`;

      try {
        console.log(`Scaricando: ${titoloLink} -> ${percorsoLocale}`);
        await downloadPdf(urlOriginale, destPath);
        console.log(`  OK (${fs.statSync(destPath).size} bytes)`);
        index[slug][categoria].push({ nomeFile, urlOriginale, percorsoLocale, titoloLink });
      } catch (err) {
        console.error(`  Errore scaricando ${urlOriginale}: ${err.message}`);
      }
    }
  }

  fs.mkdirSync(ROOT, { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'index.json'), JSON.stringify(index, null, 2), 'utf-8');
  console.log('\nindex.json creato in', path.join(ROOT, 'index.json'));

  generatePages(index);
}

function generatePages(index) {
  const pagesDir = path.join(__dirname, '..', 'pages', 'archivio');
  fs.mkdirSync(pagesDir, { recursive: true });

  for (const slug of Object.keys(index)) {
    const ultimoSegmento = slug.split('/').pop();
    const titolo = ultimoSegmento
      .split('-')
      .map((w) => (w.match(/^\d+$/) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join(' ');

    const filePath = path.join(pagesDir, `${slug}.js`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const content = generatePageContent(slug, titolo);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Pagina generata: pages/archivio/${slug}.js`);
  }
}

function generatePageContent(slug, titolo) {
  const profondita = slug.split('/').length; // 1 per top-level, 2 per sottovoce
  const su = '../'.repeat(profondita + 1);
  return `import Header from '${su}components/Header';
import ArchivioTesto from '${su}components/ArchivioTesto';
import archivioIndex from '${su}public/pdf/archivio/index.json';
import descrizioniArchivio from '${su}public/pdf/archivio/descrizioni.json';

const SEZIONI = [
  { key: 'bandi-docenti', label: 'Bandi Docenti' },
  { key: 'bandi-tutor', label: 'Bandi Tutor' },
  { key: 'bandi-allievi', label: 'Bandi Allievi' },
  { key: 'altri', label: 'Altri Documenti' },
];

export default function Avviso${toPascalCase(slug)}() {
  const dati = archivioIndex['${slug}'] || {};
  const descr = descrizioniArchivio['${slug}'] || {};

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-40 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            {descr.titolo || '${titolo}'}
          </h1>

          {descr.descrizione && (
            <ArchivioTesto testo={descr.descrizione} className="mb-8 text-gray-600 dark:text-gray-300" />
          )}

          {descr.destinatari && (
            <div className="mb-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Destinatari e requisiti
              </h2>
              <ArchivioTesto testo={descr.destinatari} className="text-gray-600 dark:text-gray-300" />
            </div>
          )}

          {SEZIONI.map(({ key, label }) => {
            const documenti = dati[key] || [];
            if (documenti.length === 0) return null;

            return (
              <section key={key} className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
                  {label}
                </h2>
                <ul className="space-y-3">
                  {documenti.map((doc, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3"
                    >
                      <span className="text-gray-600 dark:text-gray-300">
                        {doc.titoloLink}
                      </span>
                      <a
                        href={doc.percorsoLocale}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium"
                        style={{ backgroundColor: '#008C95' }}
                      >
                        <i className="fa-solid fa-download" />
                        Scarica PDF
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {Object.values(dati).every((arr) => !arr || arr.length === 0) && (
            <p className="text-gray-600 dark:text-gray-300">
              Nessun documento disponibile per questo avviso.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
`;
}

function toPascalCase(slug) {
  return slug
    .split(/[/-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

main().catch((err) => {
  console.error('Errore fatale:', err);
  process.exit(1);
});
