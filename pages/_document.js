import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="true" />
        {/* Nunito (testo) e Viga (titoli) in un unico link sincrono con
            display=swap (il testo appare subito col font di ripiego). Il vecchio pattern media="print" + onLoad
            come stringa non funziona: React non emette l'handler nell'HTML server-side, quindi il foglio restava
            bloccato su media="print" per sempre e i font non si applicavano mai. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Viga&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome: link sincrono. Il precedente pattern preload+onLoad non
            attivava sempre lo swap a rel="stylesheet" (icone mancanti in alcuni
            browser), quindi si carica direttamente come stylesheet. */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
