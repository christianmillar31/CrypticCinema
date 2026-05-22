"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AdConsentChoice = "unknown" | "personalized" | "non_personalized";

const AD_CONSENT_STORAGE_KEY = "crypticcinema_ad_consent_v1";

type AdsQueueItem = Record<string, unknown>;
type AdsQueue = AdsQueueItem[] & {
  requestNonPersonalizedAds?: 0 | 1;
  pauseAdRequests?: 0 | 1;
};

declare global {
  interface Window {
    adsbygoogle?: AdsQueue;
  }
}

type AdConsentContextValue = {
  consent: AdConsentChoice;
  isLoaded: boolean;
  setConsent: (next: Exclude<AdConsentChoice, "unknown">) => void;
};

const AdConsentContext = createContext<AdConsentContextValue | null>(null);

function getAdsQueue(): AdsQueue {
  if (typeof window === "undefined") return [] as AdsQueue;
  return (window.adsbygoogle = window.adsbygoogle || []);
}

function readStoredConsent(): AdConsentChoice {
  if (typeof window === "undefined") return "unknown";
  const saved = window.localStorage.getItem(AD_CONSENT_STORAGE_KEY);
  if (saved === "personalized" || saved === "non_personalized") return saved;
  return "unknown";
}

function applyAdsPreference(consent: AdConsentChoice) {
  if (typeof window === "undefined") return;
  const queue = getAdsQueue();

  if (consent === "unknown") {
    queue.pauseAdRequests = 1;
    return;
  }

  queue.requestNonPersonalizedAds = consent === "non_personalized" ? 1 : 0;
  queue.pauseAdRequests = 0;
}

export function AdConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<AdConsentChoice>("unknown");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedConsent = readStoredConsent();
    setConsentState(savedConsent);
    applyAdsPreference(savedConsent);
    setIsLoaded(true);
  }, []);

  const setConsent = (next: Exclude<AdConsentChoice, "unknown">) => {
    setConsentState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AD_CONSENT_STORAGE_KEY, next);
    }
    applyAdsPreference(next);
  };

  const value = useMemo<AdConsentContextValue>(
    () => ({
      consent,
      isLoaded,
      setConsent,
    }),
    [consent, isLoaded]
  );

  return <AdConsentContext.Provider value={value}>{children}</AdConsentContext.Provider>;
}

export function useAdConsent() {
  const context = useContext(AdConsentContext);
  if (!context) {
    throw new Error("useAdConsent must be used within an AdConsentProvider");
  }
  return context;
}
