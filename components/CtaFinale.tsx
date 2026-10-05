import type { CSSProperties, ReactNode } from 'react';
import Reveal from './Reveal';

interface CtaAction {
  label: string;
  href: string;
  /** Classe Font Awesome opzionale (es. "fas fa-paper-plane"). Se assente, il primario mostra la freccia. */
  icon?: string;
  /** Link esterno: apre in nuova scheda. */
  external?: boolean;
}

const externalProps = (a: CtaAction) =>
  a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

interface CtaFinaleProps {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  primary: CtaAction;
  secondary?: CtaAction;
  /** Sfondo della sezione (CSS `background`), per mantenere il gradiente originale della pagina. */
  background?: string;
}

/**
 * CTA di chiusura pagina. Solo presentazione: eyebrow, titolo, testo e label
 * arrivano dalla pagina, nessun copy è definito qui. Stili in globals.css (.cta-final*).
 */
export default function CtaFinale({ eyebrow, title, text, primary, secondary, background }: CtaFinaleProps) {
  return (
    <section className="cta-final" style={background ? ({ ['--cta-final-bg']: background } as CSSProperties) : undefined}>
      <div className="cta-final-glow cta-final-glow--a" aria-hidden="true" />
      <div className="cta-final-glow cta-final-glow--b" aria-hidden="true" />
      <div className="container">
        <Reveal className="cta-final-inner">
          {eyebrow && <span className="cta-final-eyebrow">{eyebrow}</span>}
          <h2 className="cta-final-title">{title}</h2>
          {text && <p className="cta-final-text">{text}</p>}
          <div className="cta-final-actions">
            <a href={primary.href} {...externalProps(primary)} className="btn btn-lg btn-light">
              {primary.icon && <i className={primary.icon} aria-hidden="true" />}
              {primary.label}
              {!primary.icon && <i className="fas fa-arrow-right btn-arrow" aria-hidden="true" />}
            </a>
            {secondary && (
              <a href={secondary.href} {...externalProps(secondary)} className="btn btn-lg btn-ghost-light">
                {secondary.label}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
