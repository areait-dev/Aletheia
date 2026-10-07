import { isAuthConfigured, verifyPreviewToken } from '../../lib/wp-auth';
import { safeInternalPath } from '../../lib/wp';

/**
 * Attiva il Preview Mode di Next dal link "Anteprima" di WordPress (e dall'iframe live dell'editor).
 * Contratto in wordpress/README.md §7: ?id=&exp=&token=&path=[&live=1]
 *
 * Il token è l'HMAC-SHA256 di "id|exp" firmato col secret condiviso: il secret non arriva mai al browser.
 */

const MAX_PREVIEW_SECONDS = 4 * 60 * 60;

export default function handler(req, res) {
  if (!isAuthConfigured()) {
    return res.status(503).json({ error: 'WP_SHARED_SECRET non configurato' });
  }

  const id = Number(req.query.id);
  const exp = Number(req.query.exp);
  const token = String(req.query.token || '');

  if (!verifyPreviewToken(id, exp, token)) {
    return res.status(401).json({ error: 'Token di anteprima non valido o scaduto' });
  }

  const secondsLeft = exp - Math.floor(Date.now() / 1000);
  res.setPreviewData({ id, exp, token }, { maxAge: Math.min(Math.max(secondsLeft, 60), MAX_PREVIEW_SECONDS) });

  const path = safeInternalPath(req.query.path);
  const destination = req.query.live === '1' ? `${path}${path.includes('?') ? '&' : '?'}live=1` : path;
  return res.redirect(307, destination);
}
