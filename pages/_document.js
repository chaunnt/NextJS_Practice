import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {

  render() {
    return (
      <Html lang="vi">
        <Head>
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,300&display=swap"
            rel="stylesheet"
          />



          <script async src="/facebook.js" />
          <script async src="/zalo.js" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-H4WWEHYZQ5"></script>
          <script src="/googleAnatys.js" />
          {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-3903897554290828",
                   enable_page_level_ads: true
              });
                `,
            }}
          /> */}
          <script data-ad-client="ca-pub-3903897554290828" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


export default MyDocument