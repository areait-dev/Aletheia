const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'design-system-extracted.md');
const out = path.resolve(__dirname, '..', 'design-system-extracted.html');

const md = fs.readFileSync(src, 'utf8');
const lines = md.split(/\r?\n/);

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Inline formatting: input is RAW (not yet escaped) text.
function inline(text) {
  let s = escapeHtml(text);
  // inline code
  s = s.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
  // links [t](u)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // bold
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // italic
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return s;
}

function splitRow(line) {
  let t = line.trim();
  if (t.startsWith('|')) t = t.slice(1);
  if (t.endsWith('|')) t = t.slice(0, -1);
  return t.split('|').map((c) => c.trim());
}

const html = [];
let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();

  // blank
  if (trimmed === '') { i++; continue; }

  // table: current line has |, next line is separator of dashes
  if (trimmed.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].includes('-')) {
    const header = splitRow(line);
    i += 2; // skip header + separator
    const rows = [];
    while (i < lines.length && lines[i].trim().includes('|') && lines[i].trim() !== '') {
      rows.push(splitRow(lines[i]));
      i++;
    }
    let t = '<table><thead><tr>';
    t += header.map((h) => `<th>${inline(h)}</th>`).join('');
    t += '</tr></thead><tbody>';
    for (const r of rows) {
      t += '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>';
    }
    t += '</tbody></table>';
    html.push(t);
    continue;
  }

  // horizontal rule
  if (/^---+$/.test(trimmed)) { html.push('<hr>'); i++; continue; }

  // headings
  const h = trimmed.match(/^(#{1,6})\s+(.*)$/);
  if (h) {
    const level = h[1].length;
    html.push(`<h${level}>${inline(h[2])}</h${level}>`);
    i++;
    continue;
  }

  // blockquote (group consecutive >)
  if (trimmed.startsWith('>')) {
    const buf = [];
    while (i < lines.length && lines[i].trim().startsWith('>')) {
      buf.push(lines[i].trim().replace(/^>\s?/, ''));
      i++;
    }
    html.push(`<blockquote>${buf.map((b) => (b === '' ? '' : inline(b))).join('<br>')}</blockquote>`);
    continue;
  }

  // unordered list (group consecutive - )
  if (/^[-*]\s+/.test(trimmed)) {
    const items = [];
    while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
      items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
      i++;
    }
    html.push('<ul>' + items.map((it) => `<li>${inline(it)}</li>`).join('') + '</ul>');
    continue;
  }

  // paragraph (group consecutive non-special lines)
  const para = [];
  while (
    i < lines.length &&
    lines[i].trim() !== '' &&
    !/^---+$/.test(lines[i].trim()) &&
    !/^#{1,6}\s+/.test(lines[i].trim()) &&
    !lines[i].trim().startsWith('>') &&
    !/^[-*]\s+/.test(lines[i].trim()) &&
    !lines[i].trim().includes('|')
  ) {
    para.push(lines[i].trim());
    i++;
  }
  if (para.length) html.push(`<p>${inline(para.join(' '))}</p>`);
  else i++; // safety
}

const doc = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>Design System — Alètheia Srl</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    color: #1f2937;
    font-size: 10.5px;
    line-height: 1.55;
    margin: 0;
  }
  h1 { font-size: 26px; color: #003134; border-bottom: 4px solid #008C95; padding-bottom: 8px; margin: 0 0 14px; }
  h2 { font-size: 17px; color: #008C95; margin: 26px 0 8px; padding-top: 6px; border-top: 1px solid #E2E8F0; }
  h3 { font-size: 13px; color: #004d52; margin: 16px 0 6px; }
  h4 { font-size: 11.5px; color: #374151; margin: 12px 0 4px; }
  p { margin: 6px 0; }
  a { color: #008C95; text-decoration: none; }
  hr { border: none; border-top: 1px solid #E2E8F0; margin: 14px 0; }
  blockquote {
    background: #F0FDFA; border-left: 4px solid #10B981;
    margin: 10px 0; padding: 8px 12px; color: #334155; border-radius: 0 6px 6px 0;
  }
  ul { margin: 6px 0; padding-left: 20px; }
  li { margin: 2px 0; }
  code {
    font-family: "Consolas", "Courier New", monospace;
    background: #f1f5f9; color: #0f766e;
    padding: 1px 4px; border-radius: 4px; font-size: 9.5px; white-space: nowrap;
  }
  table {
    width: 100%; border-collapse: collapse; margin: 8px 0 14px;
    font-size: 9.3px; page-break-inside: auto;
  }
  tr { page-break-inside: avoid; }
  th {
    background: #008C95; color: #fff; text-align: left;
    padding: 5px 7px; border: 1px solid #007078; font-weight: 600;
  }
  td { padding: 4px 7px; border: 1px solid #E2E8F0; vertical-align: top; }
  tbody tr:nth-child(even) { background: #f8fafc; }
  th code { background: rgba(255,255,255,0.18); color: #fff; }
  strong { color: #003134; }
</style>
</head>
<body>
${html.join('\n')}
</body>
</html>`;

fs.writeFileSync(out, doc, 'utf8');
console.log('HTML written to', out);
