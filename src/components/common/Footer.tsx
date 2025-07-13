import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <p className="font-headline text-lg font-semibold">SustainaLink</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SustainaLink Inc. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
