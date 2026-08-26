import { useEffect, useRef, ReactNode } from 'react';
import { getLenis } from '../lib/lenis';

interface HeroParallaxProps {
  children: ReactNode;
}

/**
 * Applica un parallasse asincrono all'interno della hero:
 * il testo (data-parallax-slow) si muove più lentamente dello scroll,
 * gli elementi decorativi di sfondo (data-parallax-fast) più velocemente.
 * Si aggancia al loop scroll di Lenis già inizializzato in _app.js.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slowEls = wrapper.querySelectorAll<HTMLElement>('[data-parallax-slow]');
    const fastEls = wrapper.querySelectorAll<HTMLElement>('[data-parallax-fast]');

    function update() {
      const rect = wrapper!.getBoundingClientRect();
      // Progresso di uscita della hero dal viewport (0 = in alto, negativo = scrollata via)
      const offset = rect.top;
      slowEls.forEach((el) => {
        el.style.transform = `translateY(${offset * -0.12}px)`;
      });
      fastEls.forEach((el) => {
        el.style.transform = `translateY(${offset * -0.28}px)`;
      });
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', update);
    } else {
      window.addEventListener('scroll', update, { passive: true });
    }
    update();

    return () => {
      if (lenis) {
        lenis.off('scroll', update);
      } else {
        window.removeEventListener('scroll', update);
      }
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
