import { creaRotta } from '../../../lib/moduli-server';

// Il corpo è multipart (campi + allegato): lo legge lib/moduli-server.ts, quindi si disattiva il parser di Next.
export const config = { api: { bodyParser: false } };
export default creaRotta('reclami');
