import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* Non-blocking: il foglio Nunito viene applicato dopo il first paint per non ritardare LCP/FCP */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
            rel="stylesheet"
          />
        </noscript>

        {/* Viga (titoli): stesso trattamento non-bloccante di Nunito. Va qui in _document
            (HTML statico lato server) e non in _app.js: lì onLoad="..." come stringa JSX
            non viene eseguito come JS inline (React lo tratta come prop, non come markup
            HTML grezzo), quindi il link resta bloccato su media="print" per sempre e il
            font non si applica mai. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Viga&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Viga&display=swap" rel="stylesheet" />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
