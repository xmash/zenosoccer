export type NavLink = {
  label: string;
  href: string;
};

export const headerNav: NavLink[] = [
  { label: 'Features', href: '/features' },
  { label: 'Competitions', href: '/competitions' },
  { label: 'Pricing', href: '/pricing' },
];

export const primaryCta = {
  label: 'Sign In',
  href: '/dashboard',
} as const;

export const heroCta = {
  primary: { label: 'Find Your Zen', href: '/dashboard' },
  secondary: { label: 'View All Features', href: '/features' },
} as const;
