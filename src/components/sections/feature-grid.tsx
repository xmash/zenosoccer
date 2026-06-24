import type { Feature } from '@/content/features';
import { FeatureCard } from './feature-card';
import { SectionHeading } from './section-heading';

type FeatureGridProps = {
  features: Feature[];
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: 'compact' | 'detailed';
  id?: string;
  columns?: 2 | 3 | 4;
};

export function FeatureGrid({
  features,
  eyebrow,
  title,
  description,
  variant = 'compact',
  id,
  columns = 3,
}: FeatureGridProps) {
  const gridClass =
    columns === 2
      ? 'mt-12 grid gap-6 md:grid-cols-2'
      : columns === 4
        ? 'mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="section bg-card" id={id}>
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className={gridClass}>
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}
