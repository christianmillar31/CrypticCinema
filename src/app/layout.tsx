import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { AdSenseScript } from '@/components/ads/AdSenseScript';
import { AdConsentProvider } from '@/components/ads/AdConsentProvider';
import AdConsentBanner from '@/components/ads/AdConsentBanner';
import { ogImageAlt, ogImagePath, siteConfig, siteUrl } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteName = siteConfig.name;
const title = siteConfig.defaultTitle;
const description = siteConfig.defaultDescription;
const themeColorDark = '#3C3C8F';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  referrer: 'origin-when-cross-origin',
  category: 'games',
  keywords: siteConfig.defaultKeywords,
  openGraph: {
    title,
    description,
    url: '/',
    siteName,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
    type: 'website',
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImagePath],
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: themeColorDark },
  ],
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  description,
  inLanguage: 'en-US',
  image: `${siteUrl}${ogImagePath}`,
  isAccessibleForFree: true,
  publisher: {
    '@type': 'Organization',
    name: siteName
  },
  potentialAction: {
    '@type': 'PlayAction',
    target: `${siteUrl}/`,
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.webmanifest" />

        <JsonLdScript data={webSiteJsonLd} id="website-jsonld" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <AdConsentProvider>
          <AdSenseScript />
          {children}
          <AdConsentBanner />
          <Toaster />
        </AdConsentProvider>
      </body>
    </html>
  );
}
