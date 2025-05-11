
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { ShieldCheck, FileText, Mail } from 'lucide-react';

const siteName = 'Cryptic Cinema';
const pageTitle = `Privacy Policy - ${siteName}`;
const pageDescription = `Read the Privacy Policy for ${siteName}. Learn how we handle data, use cookies, and protect your privacy while you enjoy our AI movie guessing game.`;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/privacy`,
    siteName: siteName,
    type: 'website',
    images: [
      {
        url: 'https://picsum.photos/1200/630?image=1069', // Placeholder image for privacy policy
        width: 1200,
        height: 630,
        alt: `Privacy Policy for ${siteName}`,
        'data-ai-hint': 'legal document',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['https://picsum.photos/1200/630?image=1069'],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full p-3 mb-4 mx-auto">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <CardTitle className="text-4xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-base leading-relaxed prose dark:prose-invert max-w-none">
            <p>
              Welcome to {siteName}! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and play our game.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                <FileText className="mr-2 h-6 w-6" /> Information We Collect
              </h2>
              <p>
                Currently, {siteName} is designed to be played without requiring you to create an account or submit personal identification information to us directly for the core gameplay.
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 pl-4">
                <li>
                  <strong>Game Data:</strong> Information related to your game progress, such as score and lives remaining, is stored locally in your browser's storage (e.g., localStorage). This data is not transmitted to or stored on our servers.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect non-personally identifiable information automatically when you access the game, such as your IP address (anonymized where possible), browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site. This data is used for analytics and to improve our service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                <FileText className="mr-2 h-6 w-6" /> Cookies and Tracking Technologies
              </h2>
              <p>
                We use local browser storage to save your game state (score, lives, filter preferences). This is essential for the game's functionality and to provide a consistent experience.
              </p>
              <p>
                Our website may use third-party services, such as Google AdSense, for advertising purposes. These services may use cookies or similar tracking technologies to serve you advertisements based on your visit to our site and other sites on the Internet.
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 pl-4">
                <li>
                  Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.aboutads.info/choices</a>.
                </li>
              </ul>
              <p>
                Please review the privacy policies of these third-party services for more information on their data collection and use practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                <FileText className="mr-2 h-6 w-6" /> How We Use Your Information
              </h2>
              <p>We use the information we collect in the following ways:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 pl-4">
                <li>To provide, operate, and maintain our game.</li>
                <li>To improve, personalize, and expand our game.</li>
                <li>To understand and analyze how you use our game.</li>
                <li>To develop new products, services, features, and functionality.</li>
                <li>For advertising purposes, through services like Google AdSense.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                <FileText className="mr-2 h-6 w-6" /> Data Security
              </h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no electronic transmission or storage of information is completely secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                <FileText className="mr-2 h-6 w-6" /> Children's Privacy
              </h2>
              <p>
                Our game is not intended for children under the age of 13 (or a higher age threshold where applicable by local law). We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                <FileText className="mr-2 h-6 w-6" /> Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                <Mail className="mr-2 h-6 w-6" /> Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-accent hover:underline">contact us</Link>.
              </p>
            </section>
            <p className="text-sm text-muted-foreground">
              <em>Disclaimer: This is a template Privacy Policy and may not be sufficient for your specific needs or legal requirements. It is recommended to consult with a legal professional to ensure full compliance with all applicable laws and regulations, including those related to Google AdSense.</em>
            </p>
          </CardContent>
        </Card>
      </main>
      <footer className="w-full py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        <nav className="mt-2 space-x-4">
          <Link href="/about" className="hover:text-primary">About Us</Link>
          <Link href="/contact" className="hover:text-primary">Contact Us</Link>
        </nav>
      </footer>
    </div>
  );
}
