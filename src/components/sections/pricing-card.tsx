import Link from 'next/link';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { connectForPricingHref } from '@/config/ctas';
import type { PricingTier } from '@/content/pricing';
import { cn } from '@/lib/utils';

type PricingCardProps = {
  tier: PricingTier;
};

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <article
      id={tier.id}
      className={cn(
        'marketing-card flex h-full flex-col p-6 md:p-8 scroll-mt-24',
        tier.highlighted && 'ring-2 ring-primary shadow-md'
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold md:text-2xl">{tier.name}</h3>
          <p className="mt-1 text-sm font-medium text-primary">{tier.tagline}</p>
        </div>
        {tier.highlighted ? <Badge>Most popular</Badge> : null}
      </div>

      <p className="text-muted-foreground">{tier.description}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Ideal for:</span> {tier.idealFor}
      </p>

      <div className="my-6 border-t border-border pt-6">
        <p className="text-3xl font-headline font-bold tracking-tight">Custom pricing</p>
        <p className="mt-1 text-sm text-muted-foreground">Connect with us for a tailored quote</p>
      </div>

      <ul className="mb-8 flex-1 space-y-3 text-sm text-muted-foreground">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link href={connectForPricingHref(tier.name)} className="mt-auto">
        <Button
          className="w-full"
          variant={tier.highlighted ? 'default' : 'outline'}
          size="lg"
        >
          Connect for pricing
        </Button>
      </Link>
    </article>
  );
}
