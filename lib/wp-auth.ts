import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Autenticazione con il plugin WordPress tramite secret condiviso (`WP_SHARED_SECRET` qui,
 * `ALETHEIA_SHARED_SECRET` in wp-config.php). SOLO lato server (API route / getStaticProps).
 *
 * Il secret non arriva mai al browser: WordPress firma i link di anteprima con HMAC-SHA256 di
 * "post_id|exp" e Next li verifica qui (stesso algoritmo di `aletheia_preview_token_for()` in helpers.php).
 */

function getSecret(): string {
  return process.env.WP_SHARED_SECRET || '';
}

export function isAuthConfigured(): boolean {
  return getSecret() !== '';
}

/** Confronto a tempo costante di due stringhe (anche di lunghezza diversa). */
export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Token di anteprima valido: firmato col secret, non scaduto, per quell'id. */
export function verifyPreviewToken(id: number, exp: number, token: string): boolean {
  const secret = getSecret();
  if (!secret || !Number.isInteger(id) || id <= 0 || !Number.isFinite(exp)) return false;
  if (exp <= Math.floor(Date.now() / 1000)) return false;
  const expected = createHmac('sha256', secret).update(`${id}|${exp}`).digest('hex');
  return typeof token === 'string' && safeEqual(expected, token);
}

/** Header `x-aletheia-secret` del webhook di revalidazione. */
export function verifyWebhookSecret(header: string | string[] | undefined): boolean {
  const secret = getSecret();
  const value = Array.isArray(header) ? header[0] : header;
  return !!secret && typeof value === 'string' && safeEqual(secret, value);
}

/** Solo per i test: firma un token come farebbe il plugin PHP. */
export function signPreviewToken(id: number, exp: number): string {
  return createHmac('sha256', getSecret()).update(`${id}|${exp}`).digest('hex');
}
