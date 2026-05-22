import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import ContactClientForm from '@/components/contact/ContactClientForm';
import { ogImageAlt, ogImagePath, siteConfig, siteUrl } from '@/lib/site';

const siteName = siteConfig.name;

export const metadata: Metadata = {
  title: `Contact ${siteName}`,
  description: `Get in touch with the ${siteName} team for questions, feedback, and support.`,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Contact ${siteName}`,
    description: `Have feedback or questions about ${siteName}? Contact us here.`,
    url: `${siteUrl}/contact`,
    siteName,
    type: 'website',
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact ${siteName}`,
    description: `Reach out to the ${siteName} team with your thoughts.`,
    images: [ogImagePath],
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <ContactClientForm />
      </main>
      <footer className="w-full py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        <nav className="mt-2 space-x-4">
          <Link href="/about" className="hover:text-primary">About Us</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  );
}
