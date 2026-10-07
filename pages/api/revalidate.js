import { isAuthConfigured, verifyWebhookSecret } from '../../lib/wp-auth';
import { isWpEnabled, wpGet } from '../../lib/wp';

/**
 * Webhook di pubblicazione istantanea (ISR on-demand), chiamato dal plugin WordPress al salvataggio.
 * Contratto in wordpress/README.md §7:
 *   POST /api/revalidate   header x-aletheia-secret: <WP_SHARED_SECRET>
 *   body { paths: string[] }  oppure  { scope: "all" }
 */

const MAX_PATHS = 300;
const CONCURRENCY = 5;
const PATH_RE = /^\/[A-Za-z0-9\-._~/]*$/;
/** Percorso interno ammesso: solo caratteri sicuri, niente "//" (protocol-relative) né segmenti "..". */
const isValidPath = (p) => typeof p === 'string' && p.length <= 200 && PATH_RE.test(p) && !p.includes('//') && !p.includes('..');

async function allPaths() {
  const paths = ['/'];
  if (isWpEnabled()) {
    const routes = await wpGet('/aletheia/v1/routes');
    for (const r of Array.isArray(routes) ? routes : []) paths.push(r.path);
  }
  return paths;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo non consentito' });
  }
  if (!isAuthConfigured()) {
    return res.status(503).json({ error: 'WP_SHARED_SECRET non configurato' });
  }
  if (!verifyWebhookSecret(req.headers['x-aletheia-secret'])) {
    return res.status(401).json({ error: 'Secret non valido' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  let requested;
  try {
    requested = body.scope === 'all' ? await allPaths() : body.paths;
  } catch (err) {
    return res.status(502).json({ error: `Elenco rotte non disponibile: ${err.message}` });
  }
  if (!Array.isArray(requested) || requested.length === 0) {
    return res.status(400).json({ error: 'Servono "paths" (array) oppure "scope": "all"' });
  }

  const paths = [...new Set(requested.filter(isValidPath))].slice(0, MAX_PATHS);
  const revalidated = [];
  const failed = [];

  for (let i = 0; i < paths.length; i += CONCURRENCY) {
    const chunk = paths.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(chunk.map((p) => res.revalidate(p)));
    results.forEach((r, j) => {
      if (r.status === 'fulfilled') revalidated.push(chunk[j]);
      else failed.push({ path: chunk[j], error: String(r.reason?.message || r.reason) });
    });
  }

  return res.status(200).json({ revalidated, failed });
}
