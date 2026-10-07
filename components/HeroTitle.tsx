import { Fragment } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const HIGHLIGHT_RE = /\*([^*]+)\*/g;

/**
 * Titolo con parole evidenziate: "Servizi alla *Persona*" → "Servizi alla <span style=…>Persona</span>".
 * È la convenzione dei titoli modificabili da WordPress (`*parola*` = evidenziata); lo stile (gradiente)
 * resta della pagina e arriva come `style`. Il testo è sempre escapato da React.
 */
export default function HeroTitle({
  text,
  style,
  renderHighlight,
}: {
  text: string;
  style?: CSSProperties;
  /**
   * Resa alternativa della parola evidenziata: serve quando lo stile è una regola styled-jsx della pagina
   * (la classe scoped si applica solo agli elementi scritti nel JSX della pagina, non a quelli di un componente).
   */
  renderHighlight?: (word: string) => ReactNode;
}) {
  const parts: (string | { evidenziato: string })[] = [];
  const re = new RegExp(HIGHLIGHT_RE.source, 'g');
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push({ evidenziato: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          p
        ) : renderHighlight ? (
          <Fragment key={i}>{renderHighlight(p.evidenziato)}</Fragment>
        ) : (
          <span key={i} style={style}>
            {p.evidenziato}
          </span>
        ),
      )}
    </>
  );
}
