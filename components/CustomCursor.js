import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label[for], .cursor-pointer';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    document.body.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const handleOver = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        dot.classList.add('is-hover');
        ring.classList.add('is-hover');
        document.body.classList.add('cursor-hover');
      }
    };

    const handleOut = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        dot.classList.remove('is-hover');
        ring.classList.remove('is-hover');
        document.body.classList.remove('cursor-hover');
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.body.classList.remove('cursor-hover');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
