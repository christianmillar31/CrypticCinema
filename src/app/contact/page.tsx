
"use client" 

import type { Metadata } from 'next';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import { Mail, MessageSquare, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


// Metadata is still valuable for SSR and SEO even if the page is client-rendered for form interactions.
// Next.js can render the initial shell with metadata on the server.
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted (simulated):', { name, email, message });
    toast({
      title: "Message Sent (Simulated)",
      description: "Thank you for your message! We'll get back to you if a response is needed.",
      className: "border-green-500 bg-green-500/10 text-foreground dark:text-green-300",
    });
    
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full p-3 mb-4 mx-auto">
              <Mail className="h-10 w-10" />
            </div>
            <CardTitle className="text-4xl font-bold">Contact Us</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Have questions, feedback, or just want to say hi? Drop us a line!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-base">
                  <User className="mr-2 h-5 w-5 text-primary" /> Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-base h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-base">
                  <Mail className="mr-2 h-5 w-5 text-primary" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-base h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center text-base">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" /> Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="text-base"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full text-lg py-3 h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground pt-6">
             <p>Alternatively, you can reach us at: <a href="mailto:contact@crypticcinema.com" className="text-primary hover:underline">contact@crypticcinema.com</a> (This is a placeholder email).</p>
          </CardFooter>
        </Card>
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
