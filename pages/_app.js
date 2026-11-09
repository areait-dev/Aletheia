import { nunito, viga } from '../lib/fonts';
import '../styles/globals.css';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../context/ThemeContext';
import { initLenis, destroyLenis, scrollToTopNow } from '../lib/lenis';
import SeoCentrale from '../components/SeoCentrale';
import CookieConsent from '../components/CookieConsent';
import { SITE_OPTIONS } from '../data/site-options';
import { SiteOptionsProvider } from '../context/SiteOptionsContext';

// Istante dell'ultimo Indietro/Avanti del browser (vedi il gestore dei cambi di pagina in MyApp).
let ultimoRitornoCronologia = 0;

// Chatbot non contribuisce al first paint: caricato lato client dopo l'idratazione
// per non bloccare il rendering iniziale della pagina.
const Chatbot = dynamic(() => import('../components/Chatbot'), { ssr: false });

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

  // Ogni pagina nuova parte dall'ALTO, anche se si è cliccato mentre Lenis stava ancora animando lo scorrimento (altrimenti la pagina
  // nuova veniva portata a metà dall'animazione della precedente). Non vale per: cambi di sola query (shallow: filtri, livelli),
  // link con # (ancore) e tasto Indietro/Avanti (lì il ripristino della posizione lo fa Next).
  const router = useRouter();
  useEffect(() => {
    router.beforePopState(() => { ultimoRitornoCronologia = Date.now(); return true; });
    const alCambio = (url, { shallow } = {}) => {
      // Indietro/Avanti: niente reset (la posizione la ripristina il browser). La marca è a livello di MODULO: dentro l'effetto si perdeva,
      // perché useRouter() cambia a ogni navigazione e l'effetto si riesegue. Scade dopo 3s se la navigazione non si completa.
      if (Date.now() - ultimoRitornoCronologia < 3000) { ultimoRitornoCronologia = 0; return; }
      if (shallow || String(url).includes('#')) return;
      scrollToTopNow();
    };
    router.events.on('routeChangeComplete', alCambio);
    return () => router.events.off('routeChangeComplete', alCambio);
  }, [router]);

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
          {/* Nunito e Viga: next/font (lib/fonts.js); il CSS dei font entra nel bundle solo se importato qui (non basta _document). Le stesse classi stanno anche su <html> (_document.js) perché il body usa Nunito */}
          <div className={`${nunito.variable} ${viga.variable}`} style={{ display: 'contents' }}>
            <SiteOptionsProvider value={siteOptions}>
              <Component {...restProps} />
              {/* SEO di ogni pagina (title, description, canonical, Open Graph, JSON-LD): DOPO la pagina, così i suoi valori prevalgono. Vedi components/SeoCentrale.tsx */}
              <SeoCentrale
                asPath={router.asPath}
                pathname={router.pathname}
                seo={restProps.seoPagina}
                paginaSeo={restProps.pagina?.seo}
                ogImageGlobale={seo.ogImage}
                descrizioneGlobale={seo.descrizione}
                identita={identita}
              />
              <Chatbot />
              <CookieConsent />
            </SiteOptionsProvider>
          </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;