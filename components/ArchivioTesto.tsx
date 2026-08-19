interface ArchivioTestoProps {
  testo?: string;
  className?: string;
}

// Renderizza il testo estratto dall'archivio (public/pdf/archivio/descrizioni.json):
// i blocchi separati da riga vuota in cui ogni riga inizia con "- " diventano
// una lista con pallino brand, gli altri restano paragrafi semplici.
export default function ArchivioTesto({ testo, className = '' }: ArchivioTestoProps) {
  if (!testo) return null;

  const blocchi = testo.split(/\n\n+/).filter((b) => b.trim());

  return (
    <div className={`font-sans ${className}`}>
      {blocchi.map((blocco, i) => {
        const righe = blocco.split('\n').filter((r) => r.trim());
        const eLista = righe.length > 0 && righe.every((r) => r.trim().startsWith('- '));

        if (eLista) {
          return (
            <ul key={i} className="space-y-2 mb-4 last:mb-0">
              {righe.map((riga, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#008C95' }} />
                  <span>{riga.replace(/^-\s*/, '')}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="mb-4 last:mb-0">
            {blocco}
          </p>
        );
      })}
    </div>
  );
}
