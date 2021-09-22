import React, { useContext, useEffect } from "react";

const AdsenseComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    }
  }, [])

  return (

    <ins class="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-layout-key="-gw-3+1f-3d+2z"
      data-ad-client="ca-pub-3903897554290828"
      data-ad-slot="4541601772"></ins>
  )
};

export default AdsenseComponent;
