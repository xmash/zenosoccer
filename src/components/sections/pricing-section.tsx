import type { PricingTier } from '@/content/pricing';
import { PricingCard } from './pricing-card';
import { SectionHeading } from './section-heading';

type PricingSectionProps = {
  tiers: PricingTier[];
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
};

export function PricingSection({
  tiers,
  eyebrow,
  title,
  description,
  id,
}: PricingSectionProps) {
  return (
    <section className="section banner-surface-light bg-background" id={id}>
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
