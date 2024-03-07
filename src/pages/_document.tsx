import Document, { Html, Head, Main, NextScript } from 'next/document';
import { JSX } from 'react';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&family=Roboto:wght@500&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcurt icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
