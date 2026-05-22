import type { Metadata } from 'next';
import CrypticCinemaGame from '@/components/game/CrypticCinemaGame';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { absoluteUrl, ogImageAlt, ogImagePath, siteConfig, siteUrl } from '@/lib/site';

const siteName = siteConfig.name;
const pageTitle = `Play ${siteName}`;
const pageDescription =
  'Guess the movie from a cryptic clue. Filter by difficulty, genre, and decade, then solve each round before you run out of lives.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/',
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImagePath],
  },
};

const gameJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: pageTitle,
  description: pageDescription,
  url: siteUrl,
  image: absoluteUrl(ogImagePath),
  applicationCategory: 'Game',
  genre: ['Puzzle Game', 'Trivia Game', 'Movie Quiz'],
  playMode: 'SinglePlayer',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript and a modern browser.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  publisher: {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
  },
  potentialAction: {
    '@type': 'PlayAction',
    target: siteUrl,
  },
  keywords: siteConfig.defaultKeywords.join(', '),
  isAccessibleForFree: true,
  inLanguage: 'en-US',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you play Cryptic Cinema?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose filters, read the cryptic clue, and submit your best movie title guess.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is difficulty determined?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Difficulty is mapped from the dataset: easy for widely known films, medium for moderately known films, and hard for less widely watched films.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account to play?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account is required for core gameplay.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={gameJsonLd} id="video-game-jsonld" />
      <JsonLdScript data={faqJsonLd} id="faq-jsonld" />
      <CrypticCinemaGame />
    </>
  );
}
