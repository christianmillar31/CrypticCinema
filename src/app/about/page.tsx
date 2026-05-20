
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { Info, Film, Target, Brain } from 'lucide-react';

const siteName = 'Cryptic Cinema';
const pageTitle = `About ${siteName} - Our Story and Mission`;
const pageDescription = `Learn more about ${siteName}, the AI-powered movie guessing game. Discover our mission to provide cinephiles with a fun, challenging, and unique trivia experience.`;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/about`,
    siteName: siteName,
    type: 'website',
    images: [
      {
        url: 'https://picsum.photos/1200/630?image=1040', // Placeholder image for about page
        width: 1200,
        height: 630,
        alt: `About ${siteName}`,
        'data-ai-hint': 'library books',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['https://picsum.photos/1200/630?image=1040'],
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full p-3 mb-4 mx-auto">
              <Info className="h-10 w-10" />
            </div>
            <CardTitle className="text-4xl font-bold">About Cryptic Cinema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
                <Film className="mr-2 h-7 w-7" /> What is Cryptic Cinema?
              </h2>
              <p>
                Cryptic Cinema is an innovative movie guessing game designed for film enthusiasts and puzzle lovers alike. We leverage the power of Artificial Intelligence to generate unique and intriguing cryptic clues for a vast library of movies. Your challenge? To decipher these clues and guess the film title!
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
                <Target className="mr-2 h-7 w-7" /> Our Mission
              </h2>
              <p>
                Our mission is to provide a fun, engaging, and intellectually stimulating experience that celebrates the art of cinema. We aim to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2 pl-4">
                <li>Challenge your movie knowledge in a novel way.</li>
                <li>Offer a continuously fresh and evolving gameplay experience with AI-generated content.</li>
                <li>Foster a community of cinephiles who enjoy testing their wits.</li>
                <li>Provide a high-quality, accessible, and enjoyable game for everyone.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-3 flex items-center">
                <Brain className="mr-2 h-7 w-7" /> How It Works
              </h2>
              <p>
                The core of Cryptic Cinema lies in our sophisticated AI model, trained to understand the nuances of film plots, themes, characters, and even cinematic styles. When you start a new game or request a new clue, our AI crafts a cryptic description designed to be challenging yet solvable.
              </p>
              <p className="mt-2">
                Movie data, including titles, genres, and release years, is sourced from publicly available film databases. We strive to maintain an accurate and diverse selection of movies spanning various eras and genres.
              </p>
            </section>
            
            <section className="text-center">
              <p className="mb-4">Ready to test your movie mettle?</p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/">Play Cryptic Cinema Now</Link>
              </Button>
            </section>
          </CardContent>
        </Card>
      </main>
      <footer className="w-full py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        <nav className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-primary">Contact Us</Link>
        </nav>
      </footer>
    </div>
  );
}
