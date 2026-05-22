const DEFAULT_SITE_URL = "https://crypticcinema.com";

function normalizeSiteUrl(rawUrl: string | undefined): string {
  if (!rawUrl) return DEFAULT_SITE_URL;
  const trimmed = rawUrl.trim();
  if (!trimmed) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withProtocol.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Cryptic Cinema",
  locale: "en_US",
  defaultTitle: "Cryptic Cinema: Cryptic Movie Guessing Game",
  defaultDescription:
    "Play Cryptic Cinema, a movie guessing game where each round gives you a cryptic clue and you guess the film title.",
  defaultKeywords: [
    "cryptic cinema",
    "movie guessing game",
    "movie clues",
    "film trivia game",
    "guess the movie",
    "cinema puzzle",
    "movie quiz online",
  ],
};

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const ogImagePath = "/og";
export const ogImageUrl = `${siteUrl}${ogImagePath}`;
export const ogImageAlt = "Cryptic Cinema movie clue game preview";

export const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "";
export const adsenseSlots = {
  gameTop: process.env.NEXT_PUBLIC_ADSENSE_GAME_TOP_SLOT?.trim() || "",
  gameBottom: process.env.NEXT_PUBLIC_ADSENSE_GAME_BOTTOM_SLOT?.trim() || "",
};

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) return `${siteUrl}/${path}`;
  return `${siteUrl}${path}`;
}
