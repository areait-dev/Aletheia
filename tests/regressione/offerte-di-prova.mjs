// Offerte di lavoro FISSE per i test (data: URL, nessuna rete). Servono a due cose, con lo stesso valore:
//  - build-test.mjs: la build di test le usa come JOBS_API_URL, così il testo di /agenzia-per-il-lavoro non cambia con le offerte del giorno;
//  - playwright.config.mjs: il server `next start` dei test le usa come JOBS_API_URL. Serve perché la pagina si rigenera da sola ogni 5 minuti
//    (ISR, revalidate: 300): senza questa variabile nel server, dopo 5 minuti la pagina scaricava le offerte vere e i test diventavano instabili.
export const OFFERTE_DI_PROVA = 'data:application/json,' + encodeURIComponent(JSON.stringify({ jobs: [
  { id: 'prova-1', title: 'Offerta di prova uno', location: 'Vittoria (RG)', contractType: 'Full-time', url: 'https://aletheia4job.it/offerte-di-lavoro/prova-uno' },
  { id: 'prova-2', title: 'Offerta di prova due', location: 'Ragusa (RG)', contractType: 'Part-time', url: 'https://aletheia4job.it/offerte-di-lavoro/prova-due' },
] }));
