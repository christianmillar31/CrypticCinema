
"use client" 

import { useState, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CONTACT_EMAIL = 'christianmillar31@gmail.com';

export default function ContactClientForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real application, you would send this data to a backend API
    // which would then handle sending the email.
    // For example, using fetch:
    //
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, message, recipientEmail: CONTACT_EMAIL }),
    //   });
    //   if (response.ok) {
    //     toast({
    //       title: "Message Sent!",
    //       description: "Thank you for your message. We'll get back to you if a response is needed.",
    //       className: "border-green-500 bg-green-500/10 text-foreground dark:text-green-300",
    //     });
    //     setName('');
    //     setEmail('');
    //     setMessage('');
    //   } else {
    //     throw new Error('Failed to send message');
    //   }
    // } catch (error) {
    //   console.error("Error sending message:", error);
    //   toast({
    //     title: "Error Sending Message",
    //     description: "Something went wrong. Please try again or email us directly.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }

    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted (simulated). Intended recipient:', CONTACT_EMAIL, { name, email, message });
    toast({
      title: "Message Sent (Simulated)",
      description: `Your message has been prepared. In a live system, it would be sent to ${CONTACT_EMAIL}.`,
      className: "border-green-500 bg-green-500/10 text-foreground dark:text-green-300",
    });
    
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
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
          <p>Alternatively, you can reach us at: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
      </CardFooter>
    </Card>
  );
}

