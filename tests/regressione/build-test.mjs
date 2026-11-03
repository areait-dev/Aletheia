// Build di produzione per i test di regressione: cartella separata (.next-test) e data "di oggi" congelata,
// così il sito costruito è riproducibile (sezione "Corsi in partenza" della home).
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const radice = path.resolve(import.meta.dirname, '..', '..');
const r = spawnSync(process.execPath, [path.join(radice, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build', '--webpack'], {
  cwd: radice,
  stdio: 'inherit',
  env: { ...process.env, NEXT_DIST_DIR: '.next-test', DATA_FISSA_TEST: process.env.DATA_FISSA_TEST || '2026-08-10' },
});
process.exit(r.status ?? 1);
