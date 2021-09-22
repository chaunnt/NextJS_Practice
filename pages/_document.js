import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const bodyClassName = getBodyClassName(ctx.pathname, ctx.asPath)
    return { ...initialProps, bodyClassName }
  }

  render() {
    return (
      <Html lang="vi">
        <Head>
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,300,500&display=swap"
            rel="stylesheet"
          />


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
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7640694255863173" crossOrigin="anonymous"></script>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        </Head>
        <body className={this.props.bodyClassName}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


export default MyDocument


const getBodyClassName = (pathName, asPath) => {
  const parts = pathName.split('/').splice(1)
  if (parts.length === 1 && parts[0] === '') return 'page-home'
  let generalClassName = 'page'
  let detailClassName = 'page'
  parts.map(name => {
    if (name.startsWith('[')) {
      const detail = asPath.split('/').pop()
      detailClassName += `-${detail}`
    } else {
      generalClassName += `-${name}`
      detailClassName += `-${name}`
    }
  })
  return generalClassName + ' ' + detailClassName
}
