import Image from 'next/image';
import Link from 'next/link';

/**
 * Riquadro "Corsi collegati" in fondo a una news (campo `corsiCollegati` dei dati: elenco di slug di corsi o di pagine di categoria, risolti in
 * pages/news/[slug].js). Stesse card dei "Corsi correlati" delle schede corso (foto con sfumatura, titolo, "Scopri di più"), in una griglia che va
 * a capo invece del carosello: gli elementi sono pochi e la colonna dell'articolo è stretta.
 * corsi: [{ titolo, href, image, imageAlt }]
 */
export default function CorsiCollegati({ corsi }) {
  if (!corsi?.length) return null;
  return (
    <section aria-labelledby="corsi-collegati-titolo" style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(100,116,139,0.25)' }}>
      <h2 id="corsi-collegati-titolo" className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, margin: '0 0 1.25rem' }}>
        Corsi collegati
      </h2>
      <div className="corsi-collegati-griglia">
        {corsi.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="corso-correlato-card group bg-white dark:bg-dark-card rounded-3xl overflow-hidden no-underline flex flex-col transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}
          >
            <div className="relative w-full overflow-hidden" style={{ height: '160px' }}>
              {c.image ? (
                <Image src={c.image} alt={c.imageAlt || c.titolo} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)' }}>
                  <i className="fas fa-graduation-cap" style={{ fontSize: '2rem', color: 'rgba(95,194,200,0.5)' }} aria-hidden="true"></i>
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
            </div>
            <div className="flex-1 flex flex-col gap-2" style={{ padding: '1.1rem 1.25rem' }}>
              <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3 }}>{c.titolo}</span>
              <span className="text-primary dark:text-[#5FC2C8] flex items-center gap-1.5 mt-auto font-bold" style={{ fontSize: '0.82rem' }}>
                Scopri di più
                <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"></i>
              </span>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .corsi-collegati-griglia { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
        :global(.corsi-collegati-griglia .corso-correlato-card:hover) { box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14); }
        :global(.dark .corsi-collegati-griglia .corso-correlato-card:hover) { box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45); }
      `}</style>
    </section>
  );
}
