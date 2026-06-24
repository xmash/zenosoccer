import { CampaignHero } from '@/components/sections/campaign-hero';
import { CtaSection } from '@/components/sections/cta-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { LogoCloud } from '@/components/sections/logo-cloud';
import { highlightedFeatures } from '@/content/features';

export default function HomePage() {
  return (
    <>
      <CampaignHero />
      <div className="page-body space-y-0">
      <FeatureGrid
        id="capabilities"
        eyebrow="Core capabilities"
        title="Your six-pack command toolkit"
        description="The six modules elite academies open first — dashboard, players, teams, selection, strategy, and match day."
        features={highlightedFeatures}
        variant="compact"
        columns={3}
      />
      <LogoCloud />
      <CtaSection
        title="Ready to find your zen on the pitch?"
        description="Step into the full Zenosoccer platform and harmonize every part of your club operations."
        primaryLabel="Open Dashboard"
        primaryHref="/dashboard"
        secondaryLabel="Explore all features"
        secondaryHref="/features"
      />
      </div>
    </>
  );
}
