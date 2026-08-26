/** Placeholder animato con la stessa forma di CourseFamilyCard, mostrato durante il caricamento/cambio filtro. */
export default function CourseSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-slate-100 dark:border-[rgba(255,255,255,0.08)] shadow-sm w-full h-full min-h-[420px] flex flex-col animate-pulse" aria-hidden="true">
      <div className="h-[180px] bg-slate-200 dark:bg-gray-700 flex-shrink-0" />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="h-3 w-24 bg-slate-200 dark:bg-gray-700 rounded-full" />
        <div className="h-5 w-4/5 bg-slate-200 dark:bg-gray-700 rounded-md" />
        <div className="h-3 w-3/5 bg-slate-200 dark:bg-gray-700 rounded-md" />
        <div className="flex gap-2 mt-1">
          <div className="h-6 w-12 bg-slate-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-12 bg-slate-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-12 bg-slate-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-[rgba(255,255,255,0.08)]">
          <div className="h-3 w-32 bg-slate-200 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
