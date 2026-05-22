"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { adsenseClientId } from "@/lib/site";
import { useAdConsent } from "@/components/ads/AdConsentProvider";

export default function AdConsentBanner() {
  const { consent, isLoaded, setConsent } = useAdConsent();

  if (!adsenseClientId || !isLoaded || consent !== "unknown") return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur">
      <p className="text-sm text-foreground">
        We use Google AdSense to keep Cryptic Cinema free. Choose ad preferences:
        personalized ads or privacy-safe non-personalized ads.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button onClick={() => setConsent("personalized")} className="sm:w-auto">
          Allow personalized ads
        </Button>
        <Button variant="outline" onClick={() => setConsent("non_personalized")} className="sm:w-auto">
          Use non-personalized ads
        </Button>
        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground sm:ml-auto">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
