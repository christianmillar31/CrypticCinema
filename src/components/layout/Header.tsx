import { Film } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <Film className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300 transform group-hover:rotate-[-15deg]" />
          <h1 className="text-4xl font-extrabold tracking-tight text-primary group-hover:text-accent transition-colors duration-300">
            Cryptic <span className="text-secondary group-hover:text-primary transition-colors duration-300">Cinema</span>
          </h1>
        </Link>
      </div>
    </header>
  );
}
