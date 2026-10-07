import type { CSSProperties } from 'react';

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const SAFE_HREF = /^(\/(?!\/)|https?:\/\/|mailto:|tel:)/i;

/**
 * Testo con link in stile Markdown: "Consulta la [Privacy Policy](/privacy-cookie) per info".
 * Usato per i testi modificabili da WordPress (banner cookie, consenso privacy dei moduli): solo link,
 * nessun altro markup, e l'HTML non viene mai interpretato (React esegue l'escape del testo).
 */
export default function LinkText({ text, className, style, newTab }: { text: string; className?: string; style?: CSSProperties; newTab?: boolean }) {
  const parts: (string | { label: string; href: string })[] = [];
  let last = 0;
  const re = new RegExp(LINK_RE.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    // Solo URL interni o http(s)/mailto/tel: altri schemi (es. javascript:) restano testo semplice.
    if (SAFE_HREF.test(m[2])) parts.push({ label: m[1], href: m[2] });
    else parts.push(m[1]);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          p
        ) : (
          <a key={i} href={p.href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={className} style={style}>
            {p.label}
          </a>
        ),
      )}
    </>
  );
}
