import type { NavLink } from './navigation';

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'All Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Academy Dashboard', href: '/dashboard' },
      { label: 'Squad Selection', href: '/selection' },
      { label: 'Match Center', href: '/matches' },
      { label: 'Scouting Network', href: '/scouting' },
      { label: 'Performance Analytics', href: '/analytics' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Philosophy', href: '#' },
      { label: 'Contact', href: '/pricing#plans' },
      { label: 'Support', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

export const trustPartners = [
  'PREMIER LEAGUE',
  'MLS NEXT PRO',
  'LA LIGA ELITE',
  'SERIE A YOUTH',
] as const;
