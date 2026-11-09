import { useState, useEffect, useRef } from 'react';

interface NumberCounterProps {
  target: string | number;
  label: string;
  icon?: string;
  duration?: number;
  prefix?: string;
  valueClassName?: string;
  /** Label sotto il numero: sempre secondaria (piccola, maiuscola, attenuata); il protagonista può usare una taglia sopra. */
  labelClassName?: string;
  /** Suffisso (+ / %) più piccolo e rialzato rispetto alla cifra (stile .number-suffix in globals.css). */
  smallSuffix?: boolean;
}

export default function NumberCounter({
  target,
  label,
  icon,
  duration = 2000,
  prefix = '',
  valueClassName = 'text-5xl font-extrabold text-emerald-400 tracking-tight tabular-nums leading-none',
  labelClassName = 'text-xs', // WCAG AA: bianco 75% su sfondo scuro > 4.5:1
  smallSuffix = false,
}: NumberCounterProps) {
  const numericTarget = parseInt(target.toString().replace(/[^0-9]/g, ''));
  // Il valore FINALE è quello renderizzato dal server (HTML pre-renderizzato, crawler, schermi senza JavaScript, prefers-reduced-motion).
  // L'animazione parte solo nel browser, e solo se il contatore è ancora fuori dallo schermo e l'utente non ha chiesto meno movimento:
  // così non c'è nessun "0" visibile e nessun salto del numero già in vista.
  const [count, setCount] = useState(numericTarget);
  const [animabile, setAnimabile] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return undefined; // già in vista: resta il valore finale
    setCount(0); // fuori schermo: si può ripartire da zero senza che nessuno lo veda
    setAnimabile(true);
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animabile || !hasStarted) return undefined;
    let currentCount = 0;
    const increment = numericTarget / (duration / 50);
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= numericTarget) {
        setCount(numericTarget);
        clearInterval(interval);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [animabile, hasStarted, numericTarget, duration]);

  const suffix = target.toString().includes('+') ? '+' : target.toString().includes('%') ? '%' : '';
  const displayValue = prefix + count.toLocaleString('it-IT') + (smallSuffix ? '' : suffix);
  // Valore finale per gli screen reader: il contatore animato esporrebbe numeri intermedi (0, 340, ...)
  const finalValue = prefix + Number(target.toString().replace(/[^0-9]/g, '')).toLocaleString('it-IT') + suffix;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 px-4 py-6">
      <div className={valueClassName} aria-hidden="true">
        {displayValue}
        {smallSuffix && suffix && <span className="number-suffix">{suffix}</span>}
      </div>
      <span className="sr-only">{finalValue}</span>
      <div className={`text-white/75 font-semibold uppercase tracking-[0.12em] ${labelClassName}`}>
        {label}
      </div>
    </div>
  );
}
