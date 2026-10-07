import { Fragment } from 'react';
import type { ReactNode } from 'react';

/**
 * Testo con grassetto e corsivo: "Corsi conformi al <strong>D.Lgs. 81/08</strong>." Solo `<strong>` ed `<em>`:
 * qualsiasi altro `<` resta testo (React ne fa l'escape), quindi non si può iniettare HTML. Serve ai testi
 * modificabili da WordPress (lib/wp-schede.ts li ripulisce a questi soli tag). `strongClassName` = classi del grassetto.
 */
const TAG_RE = /(<\/?(?:strong|em)>)/g;

export default function RichText({ html, strongClassName }: { html: string; strongClassName?: string }) {
  const out: ReactNode[] = [];
  // pila dei tag aperti: ogni pezzo di testo finisce dentro quelli ancora aperti
  const open: ('strong' | 'em')[] = [];
  html.split(TAG_RE).forEach((part, i) => {
    const m = /^<(\/?)(strong|em)>$/.exec(part);
    if (m) {
      if (m[1]) {
        const at = open.lastIndexOf(m[2] as 'strong' | 'em');
        if (at >= 0) open.splice(at, 1);
      } else open.push(m[2] as 'strong' | 'em');
      return;
    }
    if (!part) return;
    let node: ReactNode = part;
    for (let k = open.length - 1; k >= 0; k--) {
      node = open[k] === 'strong' ? <strong key={`${i}-${k}`} className={strongClassName}>{node}</strong> : <em key={`${i}-${k}`}>{node}</em>;
    }
    out.push(<Fragment key={i}>{node}</Fragment>); // Fragment: nessun elemento in più nell'HTML
  });
  return <>{out}</>;
}
