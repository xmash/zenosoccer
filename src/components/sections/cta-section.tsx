import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CtaSectionProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaSection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaSectionProps) {
  return (
    <section className="section banner-surface">
      <div className="section-inner text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sidebar-foreground/80 md:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={primaryHref}>
            <Button size="lg" className="group h-14 gap-2 px-8 text-lg font-bold">
              {primaryLabel}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link href={secondaryHref}>
              <Button
                variant="outline"
                size="lg"
                className="h-14 border-white/20 bg-white/10 px-8 text-lg font-bold text-white hover:bg-white/20"
              >
                {secondaryLabel}
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
