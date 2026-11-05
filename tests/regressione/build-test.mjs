// Build di produzione per i test di regressione: cartella separata (.next-test) e data "di oggi" congelata,
// così il sito costruito è riproducibile (sezione "Corsi in partenza" della home).
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const radice = path.resolve(import.meta.dirname, '..', '..');
// Offerte di lavoro fisse per i test (data: URL, nessuna rete): senza, il testo di /agenzia-per-il-lavoro cambierebbe con le offerte del giorno.
const OFFERTE_DI_PROVA = 'data:application/json,' + encodeURIComponent(JSON.stringify({ jobs: [
  { id: 'prova-1', title: 'Offerta di prova uno', location: 'Vittoria (RG)', contractType: 'Full-time', url: 'https://aletheia4job.it/offerte-di-lavoro/prova-uno' },
  { id: 'prova-2', title: 'Offerta di prova due', location: 'Ragusa (RG)', contractType: 'Part-time', url: 'https://aletheia4job.it/offerte-di-lavoro/prova-due' },
] }));
const r = spawnSync(process.execPath, [path.join(radice, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build', '--webpack'], {
  cwd: radice,
  stdio: 'inherit',
  env: { ...process.env, NEXT_DIST_DIR: '.next-test', DATA_FISSA_TEST: process.env.DATA_FISSA_TEST || '2026-08-10', JOBS_API_URL: process.env.JOBS_API_URL || OFFERTE_DI_PROVA },
});
process.exit(r.status ?? 1);
