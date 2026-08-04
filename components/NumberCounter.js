import { useState, useEffect, useRef } from 'react';

export default function NumberCounter({ target, label, icon, duration = 2000, prefix = '', valueClassName = 'text-5xl font-extrabold text-emerald-400 tracking-tight tabular-nums leading-none' }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasStarted) setHasStarted(true);
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const numericTarget = parseInt(target.toString().replace(/[^0-9]/g, ''));
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
  }, [hasStarted, target, duration]);

  const suffix = target.toString().includes('+') ? '+' : target.toString().includes('%') ? '%' : '';
  const displayValue = prefix + count.toLocaleString('it-IT') + suffix;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 px-4 py-6">
      <div className={valueClassName}>
        {displayValue}
      </div>
      <div className="text-white/75 font-semibold text-xs uppercase tracking-[0.12em]">
        {label}
      </div>
    </div>
  );
}
