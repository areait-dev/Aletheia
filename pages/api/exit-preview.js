import { safeInternalPath } from '../../lib/wp';

/** Esce dal Preview Mode e torna alla pagina pubblica (?path=/news/slug, altrimenti home). */
export default function handler(req, res) {
  res.clearPreviewData();
  return res.redirect(307, safeInternalPath(req.query.path));
}
