import { useCallback, useEffect, useRef, useState, ReactNode, Ref } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
  /** React 19: `ref` arriva come prop (es. da AnimatePresence popLayout di framer-motion). Va unito al ref interno, non sostituito. */
  ref?: Ref<HTMLElement>;
  [key: string]: any;
}

/**
 * Fade-in + slide-up quando l'elemento entra nel viewport.
 * Rispetta prefers-reduced-motion (nessuna animazione, contenuto sempre visibile).
 * Regola: un `ref` passato dal genitore si UNISCE a quello interno (vedi setRef). Prima `...rest` lo sovrascriveva: dentro un
 * AnimatePresence mode="popLayout" (offerte di lavoro) l'elemento restava invisibile per sempre.
 */
export default function Reveal({ children, className = '', delay = 0, as = 'div', ref: refEsterno, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const setRef = useCallback((node: HTMLDivElement | null) => {
    ref.current = node;
    if (typeof refEsterno === 'function') refEsterno(node);
    else if (refEsterno) (refEsterno as { current: HTMLElement | null }).current = node;
  }, [refEsterno]);
  const [visible, setVisible] = useState(false);
  const Tag = as as any;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={setRef}
      className={className}
      {...rest}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
