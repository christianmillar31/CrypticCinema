
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import ContactClientForm from '@/components/contact/ContactClientForm';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Cryptic Cinema - We\'d Love to Hear From You!',
  description: 'Get in touch with the Cryptic Cinema team. Send us your questions, feedback, suggestions, or just say hello. We are here to help and listen.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Cryptic Cinema',
    description: 'Have feedback or questions about Cryptic Cinema? Contact us here.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/contact`,
    siteName: 'Cryptic Cinema',
    type: 'website',
    images: [
      {
        url: 'https://picsum.photos/1200/630?image=1005', // Placeholder image for contact
        width: 1200,
        height: 630,
        alt: 'Contact Cryptic Cinema',
        'data-ai-hint': 'mail letter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Cryptic Cinema',
    description: 'Reach out to the Cryptic Cinema team with your thoughts.',
    images: ['https://picsum.photos/1200/630?image=1005'],
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
        <p>&copy; {new Date().getFullYear()} Cryptic Cinema. All rights reserved.</p>
        <nav className="mt-2 space-x-4">
          <Link href="/about" className="hover:text-primary">About Us</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  );
}
