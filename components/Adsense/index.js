import React, { useEffect } from "react";
// import AdSense from 'react-adsense';

const AdsenseComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});

      } catch (err) {
        console.log(err, 13131);
      }
    }
  }, [])

  return (
    // <AdSense.Google
    //   client='ca-pub-3903897554290828'
    //   slot='4541601772'
    //   style={{ display: 'block' }}
    //   format='auto'
    //   responsive='true'
    //   layoutKey='-gw-3+1f-3d+2z'
    //   format='fluid'

    // />
    <ins class="adsbygoogle"
      style={{ display: "block", marginTop: '20px' }}
      data-ad-format="fluid"
      data-ad-layout-key="-gw-3+1f-3d+2z"
      data-ad-client="ca-pub-3903897554290828"
      data-ad-slot="4541601772"></ins>
  )
};

export default AdsenseComponent;
