import type { Metadata } from 'next';
import { CtaSection } from '@/components/sections/cta-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { PageHeader } from '@/components/sections/page-header';
import { features } from '@/content/features';

export const metadata: Metadata = {
  title: 'Features | Zenosoccer',
  description:
    'All 16 Zenosoccer modules — Dashboard, Players, Registration, Teams, Squad Selection, Training, Nets, Strategy, and more.',
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Every module, one calm system"
        description="Sixteen purpose-built modules for how academies actually run — from registration and batches to match center, video, and scouting."
      />
      <div className="page-body space-y-0">
      <FeatureGrid
        id="platform"
        eyebrow="Full platform"
        title="All 16 modules"
        description="Each module is built for coaches, directors, and analysts — designed to work together without friction."
        features={features}
        variant="detailed"
        columns={2}
      />
      <CtaSection
        title="See it in action"
        description="Jump into the live dashboard and experience how Zenosoccer brings clarity to club operations."
        primaryLabel="Launch Dashboard"
        primaryHref="/dashboard"
      />
      </div>
    </>
  );
}
