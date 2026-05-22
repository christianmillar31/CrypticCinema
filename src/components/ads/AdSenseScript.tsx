"use client";

import Script from "next/script";
import { adsenseClientId } from "@/lib/site";
import { useAdConsent } from "@/components/ads/AdConsentProvider";

export function AdSenseScript() {
  const { consent, isLoaded } = useAdConsent();

  if (!adsenseClientId || !isLoaded || consent === "unknown") return null;
  const requestNonPersonalizedAds = consent === "non_personalized" ? 1 : 0;

  return (
    <>
      <Script id={`adsense-pref-${consent}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = ${requestNonPersonalizedAds}; (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 0;`}
      </Script>
      <Script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
