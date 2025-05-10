
import type { Metadata } from 'next';
import CrypticCinemaGame from '@/components/game/CrypticCinemaGame';
import { JsonLdScript } from '@/components/seo/JsonLdScript';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const pageTitle = "Play Cryptic Cinema - The Ultimate AI Movie Guessing Game";
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
      type: 'website', // Can also be 'game' or 'article' depending on how you classify the page
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
  '@type': 'WebApplication',
  name: pageTitle,
  description: pageDescription,
  applicationCategory: 'Game',
  operatingSystem: 'Any (Web-based)',
  browserRequirements: 'Requires HTML5, CSS3, JavaScript. Modern browser recommended.',
  url: siteUrl,
  image: ogImageUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Cryptic Cinema',
    url: siteUrl,
  },
  potentialAction: {
     '@type': 'PlayAction',
     target: siteUrl,
  },
  keywords: "movie game, AI game, cryptic clue game, film trivia, cinema quiz, puzzle game, online game, guess the film",
};

export default function HomePage() {
  return (
    <>
      {/* This script will be rendered by Next.js, typically in the body. JSON-LD is fine in body or head. */}
      <JsonLdScript data={gameJsonLd} id="game-application-jsonld" />
      <CrypticCinemaGame />
    </>
  );
}
