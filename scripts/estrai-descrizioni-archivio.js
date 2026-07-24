const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// slug: nome cartella/pagina già usato in pages/archivio e index.json.
// url: indirizzo reale da cui estrarre il testo (a volte diverso dallo slug,
// es. misura-psr-1-1 è stato rinominato in "misura-psr" sul vecchio sito).
const PAGES = [
  { slug: 'avviso-29-2019', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-29-2019' },
  { slug: 'avviso-33-2019', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-33-2019' },
  { slug: 'corsi-settore-agricolo-e-agroalimentare', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/corsi-settore-agricolo-e-agroalimentare' },
  { slug: 'misura-psr-1-1', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr' },
  { slug: 'primo-soccorso-pediatrico', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/primo-soccorso-pediatrico' },
  { slug: 'feamp-misura-1-29', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/feamp-misura-1-29' },
  { slug: 'feamp-misura-1-29-2023', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/feamp-misura-1-29-2023' },
  { slug: 'inail-formazione-2022', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/inail-formazione-2022' },
  { slug: 'avviso-2-2018', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018' },
  { slug: 'avviso-7-2023', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-7-2023' },
  { slug: 'misura-psr-1-1/conduttore-impresa-agricola', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/conduttore-d-impresa-agricola-200-ore' },
  { slug: 'misura-psr-1-1/ammodernamento-aziende-agricole', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/ammodernamento-aziende-agricole-20-ore' },
  { slug: 'misura-psr-1-1/nuove-strategie-sviluppo-investimento', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/nuove-strategie-di-sviluppo-e-investimento-48-ore' },
  { slug: 'misura-psr-1-1/workshop-strategie-marketing', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-strategie-di-marketing-per-le-aziende-agricole-8-ore' },
  { slug: 'misura-psr-1-1/workshop-funzione-innovativa', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-la-funzione-innovativa-nelle-aziende-agricole-8-ore' },
  { slug: 'misura-psr-1-1/workshop-agricoltura-multifunzionalita', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-agricoltura-multifunzionalita-e-diversificazione-8-ore' },
  { slug: 'misura-psr-1-1/workshop-conduttore-impresa-agricola', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/misura-psr/workshop-il-conduttore-di-impresa-agricola-8-ore' },
  { slug: 'avviso-2-2018/corso-di-cucina', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018/corso-di-cucina-500-ore' },
  { slug: 'avviso-2-2018/operatore-informatico-risorse-web', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018/operatore-informativo-di-risorse-web' },
  { slug: 'avviso-2-2018/addetto-panificatore-pasticciere', url: 'https://www.aletheiasrl.it/index.php/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018/addetto-panificatore-e-pasticciere' },
];

const OUT_DIR = path.join(__dirname, '..', 'public', 'pdf', 'archivio');
const OUT_FILE = path.join(OUT_DIR, 'descrizioni.json');

async function fetchPage(url) {
  const res = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ArchivioBot/1.0)' },
    timeout: 20000,
  });
  return res.data;
}

// Un <p> il cui unico contenuto è <strong>TESTO</strong> viene trattato come
// un'intestazione di sezione (es. "DESTINATARI E REQUISITI"), pattern usato
// sistematicamente nelle pagine K2 del vecchio sito.
function isParagrafoIntestazione($, el) {
  const $el = $(el);
  const testo = $el.text().trim();
  if (!testo) return false;
  const soloStrong = $el.children().length === 1 && $el.children('strong').length === 1;
  return soloStrong && testo === testo.toUpperCase() && testo.length < 80;
}

// Intestazioni tipo "BANDI SELEZIONE DOCENTI/TUTOR/ALLIEVI/PERSONALE NON DOCENTE"
// che introducono liste di link PDF già mostrati nelle sezioni "Scarica PDF".
const HEADING_BANDI = /^-?\s*bandi?\s+selezione\s+\S.*$/i;

function isDuplicatoListaPdf(paragrafo, pdfLinks) {
  const normalizza = (s) => s.toLowerCase().replace(/^[-\s]+/, '').trim();
  const p = normalizza(paragrafo);
  if (!p) return false;
  if (HEADING_BANDI.test(paragrafo)) return true;
  return pdfLinks.some((link) => {
    const t = normalizza(link.titoloLink);
    if (!t) return false;
    return t === p || (t.length > 15 && (p.includes(t) || t.includes(p)));
  });
}

function estraiBlocchi($, container, pdfLinks) {
  const blocchi = [];
  container.children('p, ul, ol').each((_, el) => {
    if (el.tagName === 'p') {
      if (isParagrafoIntestazione($, el)) {
        blocchi.push({ tipo: 'intestazione', testo: $(el).text().trim() });
        return;
      }
      const testo = $(el).text().trim();
      if (testo && !isDuplicatoListaPdf(testo, pdfLinks)) {
        blocchi.push({ tipo: 'testo', testo });
      }
      return;
    }
    // ul / ol: scarta le voci che duplicano un link PDF già mostrato altrove.
    const voci = $(el)
      .find('> li')
      .map((__, li) => $(li).text().trim())
      .get()
      .filter(Boolean)
      .filter((voce) => !isDuplicatoListaPdf(voce, pdfLinks));
    if (voci.length > 0) {
      blocchi.push({ tipo: 'lista', voci });
    }
  });
  return blocchi;
}

function blocchiToTesto(blocchi) {
  return blocchi
    .map((b) => {
      if (b.tipo === 'lista') return b.voci.map((v) => `- ${v}`).join('\n');
      return b.testo;
    })
    .join('\n\n')
    .trim();
}

async function main() {
  const descrizioni = {};

  for (const { slug, url: pageUrl } of PAGES) {
    console.log(`\n=== Pagina: ${slug} ===`);

    let html;
    try {
      html = await fetchPage(pageUrl);
    } catch (err) {
      console.error(`Errore nel caricare ${pageUrl}: ${err.message}`);
      descrizioni[slug] = { titolo: '', descrizione: '', destinatari: '' };
      continue;
    }

    const $ = cheerio.load(html);

    const pdfLinks = [];
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.toLowerCase().endsWith('.pdf')) {
        pdfLinks.push({ titoloLink: $(el).text().trim() });
      }
    });

    let titolo = $('.itemTitle').first().text().trim();
    let blocchiIntro = estraiBlocchi($, $('.itemIntroText'), pdfLinks);
    let blocchiFull = estraiBlocchi($, $('.itemFullText'), pdfLinks);

    // Fallback: alcune pagine dell'archivio usano il template "articolo" Joomla
    // (section.article-content) invece del layout K2 item, senza .itemTitle/.itemFullText.
    if (!titolo && blocchiIntro.length === 0 && blocchiFull.length === 0) {
      const articolo = $('.article-content').first();
      titolo = articolo.find('h1').first().text().trim();
      blocchiFull = estraiBlocchi($, articolo, pdfLinks).filter(
        (b) => b.tipo !== 'testo' || b.testo !== titolo
      );
    }

    const blocchi = [...blocchiIntro, ...blocchiFull];

    // Divide i blocchi in sezioni usando le intestazioni come separatori.
    // La sezione la cui intestazione contiene "destinatari" o "requisiti"
    // finisce nel campo `destinatari`; tutto il resto confluisce in `descrizione`.
    const descrizioneBlocchi = [];
    const destinatariBlocchi = [];
    let sezioneCorrente = 'descrizione';

    for (const blocco of blocchi) {
      if (blocco.tipo === 'intestazione') {
        sezioneCorrente = /destinatari|requisiti/i.test(blocco.testo) ? 'destinatari' : 'descrizione';
        // Le intestazioni "BANDI SELEZIONE ..." introducono solo liste di PDF
        // già rimosse: l'intestazione stessa è a questo punto ridondante.
        if (sezioneCorrente === 'descrizione' && !HEADING_BANDI.test(blocco.testo)) {
          descrizioneBlocchi.push({ tipo: 'testo', testo: blocco.testo });
        }
        continue;
      }
      (sezioneCorrente === 'destinatari' ? destinatariBlocchi : descrizioneBlocchi).push(blocco);
    }

    const descrizione = blocchiToTesto(descrizioneBlocchi);
    const destinatari = blocchiToTesto(destinatariBlocchi);

    descrizioni[slug] = { titolo, descrizione, destinatari };
    console.log(`titolo="${titolo}" | descrizione: ${descrizione.length} caratteri | destinatari: ${destinatari.length} caratteri`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(descrizioni, null, 2), 'utf-8');
  console.log('\ndescrizioni.json creato in', OUT_FILE);
}

main().catch((err) => {
  console.error('Errore fatale:', err);
  process.exit(1);
});
