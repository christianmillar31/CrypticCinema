
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { JsonLdScript } from '@/components/seo/JsonLdScript';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const siteName = 'Cryptic Cinema';
const title = `${siteName}: AI Movie Guessing Game`;
const description = `Challenge your movie knowledge with ${siteName}, an AI-powered game that generates cryptic clues for famous films. Guess the movie, earn points, and become a cinephile master!`;
const ogImageUrl = 'https://picsum.photos/1200/630?image=1062'; // Cinema seats image

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description: description,
  keywords: ['movie guessing game', 'cryptic clues', 'AI game', 'film trivia', 'cinema quiz', 'movie puzzle', 'guess the movie', 'AI movie game', 'artificial intelligence game', 'movie riddle'],
  openGraph: {
    title: title,
    description: `Think you know movies? Try ${siteName} and guess films from AI-generated cryptic clues!`,
    url: '/',
    siteName: siteName,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteName} - AI Movie Guessing Game Og Image`,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: `Can you solve these AI-generated cryptic movie clues? Play ${siteName}!`,
    images: [ogImageUrl],
    // site: '@yourtwitterhandle', // Optional: Your Twitter handle
    // creator: '@creatorhandle', // Optional: Content creator's Twitter handle
  },
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest', // Placeholder, actual file not created in this step
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: { // Example if you add favicons
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: title,
  url: siteUrl,
  description: description,
  image: ogImageUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLdScript data={webSiteJsonLd} id="website-jsonld" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
