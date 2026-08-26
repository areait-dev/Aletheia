/** Placeholder animato con la stessa forma di una card annuncio, mostrato durante il caricamento. */
export default function JobSkeleton() {
  return (
    <div
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] animate-pulse"
      style={{ borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
      aria-hidden="true"
    >
      <div style={{ flex: 1 }}>
        <div className="h-4 w-3/5 bg-slate-200 dark:bg-gray-700 rounded-md mb-3" />
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div className="h-3 w-20 bg-slate-200 dark:bg-gray-700 rounded-md" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
      <div className="h-4 w-4 bg-slate-200 dark:bg-gray-700 rounded-full shrink-0" />
    </div>
  );
}
