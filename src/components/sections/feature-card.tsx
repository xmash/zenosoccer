import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Feature } from '@/content/features';
import { cn } from '@/lib/utils';

type FeatureCardProps = {
  feature: Feature;
  variant?: 'compact' | 'detailed';
  className?: string;
};

export function FeatureCard({ feature, variant = 'compact', className }: FeatureCardProps) {
  const Icon = feature.icon;

  if (variant === 'detailed') {
    return (
      <article
        id={feature.id}
        className={cn('marketing-card flex h-full flex-col p-6 md:p-8 scroll-mt-24', className)}
      >
        <div className="feature-icon-wrap mb-5">
          <Icon className="feature-icon" aria-hidden />
        </div>
        <h3 className="mb-2 text-xl font-bold md:text-2xl">{feature.title}</h3>
        <p className="mb-6 text-muted-foreground">{feature.description}</p>
        <ul className="mb-8 flex-1 space-y-2 text-sm text-muted-foreground">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <Link
          href={feature.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Open in app
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </article>
    );
  }

  return (
    <article className={cn('marketing-card-muted flex flex-col space-y-4 p-6', className)}>
      <div className="feature-icon-wrap">
        <Icon className="feature-icon" aria-hidden />
      </div>
      <h3 className="text-xl font-bold md:text-2xl">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.shortDescription}</p>
      <Link
        href={feature.href}
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        Learn more
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}
