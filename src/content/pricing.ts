export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  includes: string[];
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    tagline: 'Find your footing',
    description: 'Essential modules for a single squad getting organized.',
    idealFor: 'Grassroots clubs & single-team academies',
    includes: [
      'Dashboard, Players & Registration',
      'Batches / Teams & Training',
      'Calendar & Messages',
      'Up to 30 player profiles',
    ],
  },
  {
    id: 'academy',
    name: 'Academy Pack',
    tagline: 'Grow with clarity',
    description: 'Full core platform for multi-batch development programs.',
    idealFor: 'Growing academies with 2–6 teams',
    highlighted: true,
    includes: [
      'Everything in Starter',
      'Squad Selection, Nets & Strategy',
      'Match Center & Scorecards',
      'Scouting & Analytics',
      'Up to 150 player profiles',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    tagline: 'Operate at scale',
    description: 'Advanced workflows for performance-driven organizations.',
    idealFor: 'Multi-team clubs & regional academies',
    includes: [
      'Everything in Academy',
      'Video Room & Academy Pathway',
      'Advanced analytics & reporting',
      'Staff roles & permissions',
      'Unlimited player profiles',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    tagline: 'Built around you',
    description: 'Tailored deployment for leagues, federations, and elite clubs.',
    idealFor: 'Professional clubs, leagues & federations',
    includes: [
      'Everything in Pro',
      'All 16 modules configured to spec',
      'Custom integrations & API access',
      'Dedicated success manager & SLA support',
      'White-label & multi-club hierarchy',
    ],
  },
];

export const pricingFaqs = [
  {
    question: 'Why connect for pricing instead of fixed plans?',
    answer:
      'Every club runs differently — team count, age groups, and modules vary. We tailor each pack to your structure so you only pay for what you use.',
  },
  {
    question: 'Can we start on Starter and upgrade later?',
    answer:
      'Yes. Most academies begin on Starter or Academy and scale into Pro or Enterprise as their program grows. Your data moves with you.',
  },
  {
    question: 'Is there a demo before we commit?',
    answer:
      'Absolutely. Connect with our team for a walkthrough of the dashboard and the modules that matter most to your staff.',
  },
] as const;
