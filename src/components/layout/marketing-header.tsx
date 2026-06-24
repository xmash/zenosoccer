import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { headerNav, primaryCta } from '@/config/navigation';
import { site } from '@/config/site';

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center border-b bg-card/80 px-6 backdrop-blur-md lg:px-12">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-headline text-2xl font-bold uppercase tracking-tight">
          {site.name}
        </span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-8" aria-label="Main">
        {headerNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-base font-medium transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        <Link href={primaryCta.href}>
          <Button variant="default" size="sm" className="hidden sm:flex">
            {primaryCta.label}
          </Button>
        </Link>
      </nav>
    </header>
  );
}
