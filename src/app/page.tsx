
import type { Metadata } from 'next';
import CrypticCinemaGame from '@/components/game/CrypticCinemaGame';
import { JsonLdScript } from '@/components/seo/JsonLdScript';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const siteName = 'Cryptic Cinema'; // Defined for consistency
const pageTitle = `Play ${siteName} - The Ultimate AI Movie Guessing Game`;
const pageDescription = "Test your film knowledge by guessing movies from AI-generated cryptic clues. Play Cryptic Cinema now and see how many you can get right!";
const ogImageUrl = 'https://picsum.photos/1200/630?image=1062';

export async function generateMetadata(): Promise<Metadata> {
  return {
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Cryptic Cinema Game Teaser Image',
        },
      ],
      type: 'website',
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}

const gameJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame', // Changed from WebApplication
  name: pageTitle,
  description: pageDescription,
  url: siteUrl,
  image: ogImageUrl,
  applicationCategory: 'Game',
  genre: ['Puzzle Game', 'Trivia Game', 'Movie Quiz'],
  playMode: 'SinglePlayer',
  operatingSystem: 'Any (Web-based)',
  browserRequirements: 'Requires HTML5, CSS3, JavaScript. Modern browser recommended.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  publisher: { // Changed from author to publisher for VideoGame schema consistency
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: { // Added publisher logo placeholder
      '@type': 'ImageObject',
      url: `${siteUrl}/android-chrome-512x512.png`, // Needs an actual logo image
    }
  },
  potentialAction: {
     '@type': 'PlayAction',
     target: siteUrl,
  },
  keywords: "movie game, AI game, cryptic clue game, film trivia, cinema quiz, puzzle game, online game, guess the film, interactive game, movie puzzle, AI movie quiz",
  isAccessibleForFree: true,
  inLanguage: 'en-US',
  // Example of adding an aggregate rating if you implement a rating system
  // aggregateRating: {
  //   "@type": "AggregateRating",
  //   "ratingValue": "4.5", // Example value
  //   "reviewCount": "100"  // Example value
  // },
};

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={gameJsonLd} id="video-game-jsonld" />
      <CrypticCinemaGame />
    </>
  );
}
