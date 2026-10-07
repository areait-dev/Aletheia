import '../styles/globals.css';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeContext';
import { initLenis, destroyLenis } from '../lib/lenis';
import { SITE_NAME, SITE_URL } from '../components/SeoHead';
import CookieConsent from '../components/CookieConsent';
import { SITE_OPTIONS } from '../data/site-options';
import { SiteOptionsProvider } from '../context/SiteOptionsContext';

// Chatbot non contribuisce al first paint: caricato lato client dopo l'idratazione
// per non bloccare il rendering iniziale della pagina.
const Chatbot = dynamic(() => import('../components/Chatbot'), { ssr: false });

// Dati strutturati Organization: telefono, email e social seguono le opzioni globali (WordPress o data/site-options.js).
function organizationJsonLd(identita) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via del Carrubo, snc',
      addressLocality: 'Vittoria',
      addressRegion: 'RG',
      postalCode: '97019',
      addressCountry: 'IT',
    },
    telephone: identita.telefono,
    email: identita.email,
    sameAs: identita.social.map((s) => s.href),
  };
}

function MyApp({ Component, pageProps }) {
  // `siteOptions` arriva da getStaticProps (lib/wp-site.ts → withSiteOptions); se manca, il contesto usa i dati locali.
  const { siteOptions, ...restProps } = pageProps;
  const { identita, seo } = siteOptions || SITE_OPTIONS;
  // "Nascondi ai motori di ricerca" (campo SEO della pagina WordPress): le pagine collegate ricevono `pagina.seo.noindex`
  // tra le props. In locale è sempre false: nessun tag in più.
  const noindex = pageProps?.pagina?.seo?.noindex === true;
  // Avvia lo smooth scrolling Lenis lato client.
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <>
      {/* Verifica proprietà Google Search Console (opzioni globali → SEO) */}
      {seo.verificaGoogle && (
        <Head>
          <meta name="google-site-verification" content={seo.verificaGoogle} />
        </Head>
      )}
      {noindex && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      {/* Descrizione predefinita (opzioni globali → SEO): vale per le pagine che non ne hanno una propria,
          perché next/head tiene l'ultimo meta description (quello della pagina, se c'è). Vuota in locale. */}
      {seo.descrizione && (
        <Head>
          <meta name="description" content={seo.descrizione} />
        </Head>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(identita)) }}
      />
      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          try {
            // Default light al primo accesso: dark solo se l'utente l'ha scelto in precedenza.
            const stored = localStorage.getItem('theme');
            if (stored === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (e) {}
        })()
      `}} />
      <ThemeProvider>
          {/* Font Awesome caricato non-bloccante via _document.js (preload+swap):
              qui in _app.js sarebbe HTML statico ma un <link> in mezzo al JSX del body
              resta comunque render-blocking per il browser, oltre a finire fuori posto. */}
          {/* Viga caricato via _document.js (evita il fetch a build-time di next/font) */}
          {/* La variabile --font-viga viene resa disponibile a tutta l'app */}
          <div style={{ '--font-viga': "'Viga', sans-serif", display: 'contents' }}>
            <SiteOptionsProvider value={siteOptions}>
              <Component {...restProps} />
              <Chatbot />
              <CookieConsent />
            </SiteOptionsProvider>
          </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;