import type { Metadata } from 'next';
import { CtaSection } from '@/components/sections/cta-section';
import { FaqSection } from '@/components/sections/faq-section';
import { PageHeader } from '@/components/sections/page-header';
import { PricingSection } from '@/components/sections/pricing-section';
import { connectCta } from '@/config/ctas';
import { site } from '@/config/site';
import { pricingFaqs, pricingTiers } from '@/content/pricing';

export const metadata: Metadata = {
  title: 'Pricing | Zenosoccer',
  description:
    'Starter through Enterprise packs for every academy size. Connect with Zenosoccer for custom pricing tailored to your club.',
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="From Starter to Enterprise"
        description="Every pack is shaped around your club — team count, age groups, and modules. No one-size-fits-all. Connect with us and we'll build the right plan."
      />
      <div className="page-body space-y-0">
      <PricingSection
        id="plans"
        eyebrow="Plans"
        title="Choose your pack"
        description="Four tiers designed for how academies actually grow — from a single squad to a full professional operation."
        tiers={pricingTiers}
      />
      <FaqSection
        eyebrow="FAQ"
        title="Common questions"
        description="Quick answers before you reach out."
        items={pricingFaqs}
      />
      <CtaSection
        title="Let's find the right pack for your club"
        description={`Tell us about your academy and we'll recommend a Starter, Academy, Pro, or Enterprise setup — and send a tailored quote to ${site.salesEmail}.`}
        primaryLabel={connectCta.label}
        primaryHref={connectCta.href}
        secondaryLabel="Explore features"
        secondaryHref="/features"
      />
      </div>
    </>
  );
}
