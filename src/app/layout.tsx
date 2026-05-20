
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
const themeColorDark = '#3C3C8F'; // HSL(231, 64%, 55%) --primary dark

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description: description,
  keywords: ['movie guessing game', 'cryptic clues', 'AI game', 'film trivia', 'cinema quiz', 'movie puzzle', 'guess the movie', 'AI movie game', 'artificial intelligence game', 'movie riddle', 'interactive movie game', 'film puzzle game', 'online movie quiz'],
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
  manifest: '/manifest.webmanifest',
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
  icons: {
    icon: '/favicon.ico', // Standard favicon
    shortcut: '/favicon.ico', // For older browsers
    apple: '/apple-touch-icon.png', // Apple touch icon
    // other: [ // For manifest and modern browsers
    //   { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    //   { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    //   { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/android-chrome-192x192.png' }, // For PWA
    //   { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/android-chrome-512x512.png' }, // For PWA
    // ],
  },
  themeColor: [ // For browser UI theming
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' }, // Placeholder for light theme primary or white
    { media: '(prefers-color-scheme: dark)', color: themeColorDark },
  ],
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: title,
  url: siteUrl,
  description: description,
  image: ogImageUrl,
  publisher: {
    '@type': 'Organization',
    name: siteName,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/android-chrome-512x512.png`, // Assuming a logo image exists
    }
  },
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        <meta name="application-name" content={siteName} />
        <meta name="msapplication-TileColor" content={themeColorDark} />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Favicon links - ensure these files exist in /public */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        <JsonLdScript data={webSiteJsonLd} id="website-jsonld" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
