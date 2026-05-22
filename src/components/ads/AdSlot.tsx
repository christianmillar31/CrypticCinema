"use client";

import { useEffect, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { adsenseClientId } from "@/lib/site";
import { useAdConsent } from "@/components/ads/AdConsentProvider";

type AdSlotProps = {
  slot: string;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  style?: CSSProperties;
};

export default function AdSlot({
  slot,
  className,
  format = "auto",
  responsive = true,
  style,
}: AdSlotProps) {
  const { consent, isLoaded } = useAdConsent();

  useEffect(() => {
    if (!adsenseClientId || !slot || !isLoaded || consent === "unknown") return;
    try {
      const queue = (window.adsbygoogle = window.adsbygoogle || []);
      queue.requestNonPersonalizedAds = consent === "non_personalized" ? 1 : 0;
      queue.pauseAdRequests = 0;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      return;
    }
  }, [consent, isLoaded, slot]);

  if (!adsenseClientId || !slot || !isLoaded || consent === "unknown") return null;

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", ...style }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
