import { site } from './site';

export function connectForPricingHref(tierName?: string) {
  const subject = tierName
    ? `Zenosoccer pricing — ${tierName}`
    : 'Zenosoccer pricing inquiry';
  return `mailto:${site.salesEmail}?subject=${encodeURIComponent(subject)}`;
}

export const connectCta = {
  label: 'Connect for pricing',
  href: connectForPricingHref(),
} as const;
