import { createContext, useContext } from 'react';
import { SITE_OPTIONS } from '../data/site-options';
import { PARTNER } from '../data/partner';

// Opzioni globali (Header, Footer, identità). Valore predefinito = dati locali, quindi i componenti
// funzionano anche senza provider (es. pagine senza `siteOptions` nelle props).
const DEFAULT = { ...SITE_OPTIONS, footer: { ...SITE_OPTIONS.footer, certificazioni: PARTNER.certificazioni } };

const SiteOptionsContext = createContext(DEFAULT);

export function SiteOptionsProvider({ value, children }) {
  return <SiteOptionsContext.Provider value={value || DEFAULT}>{children}</SiteOptionsContext.Provider>;
}

export function useSiteOptions() {
  return useContext(SiteOptionsContext);
}
