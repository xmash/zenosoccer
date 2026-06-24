import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { footerColumns } from '@/config/footer';
import { site } from '@/config/site';

export function MarketingFooter() {
  return (
    <footer className="banner-surface w-full border-t border-sidebar-border px-6 py-12 lg:px-12">
      <div className="section-inner grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-headline text-lg font-bold uppercase tracking-tight">
              {site.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-sidebar-foreground/60">
            Advancing the beautiful game through technology, data, and human expertise.
            Find your zen on the pitch.
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">{column.title}</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/60">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-4">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">Stay Centered</h4>
          <div className="flex gap-2">
            <input
              placeholder="Email address"
              aria-label="Email address"
              className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Join
            </Button>
          </div>
        </div>
      </div>
      <div className="section-inner mt-12 border-t border-white/5 pt-8 text-center font-bold uppercase tracking-widest text-sidebar-foreground/40">
        {site.copyright}
      </div>
    </footer>
  );
}
