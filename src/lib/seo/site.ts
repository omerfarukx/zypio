/**
 * Central site/SEO configuration — single source of truth for the canonical
 * domain, brand identity, locales and shared marketing facts.
 *
 * Only real, verifiable data lives here. No invented metrics, prices, awards,
 * reviews, ratings or app-store links.
 */

export const SITE_URL = 'https://zypio.online';

export const BRAND = {
  name: 'Zypio',
  legalName: 'Zypio Convert',
  contactEmail: 'contact@zypio.online',
  // Free, ad-supported. No paid tier exists in the product.
  price: '0',
  priceCurrency: 'USD',
} as const;

export const LOCALES = ['tr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'tr';

/** OpenGraph locale tag for a given UI locale. */
export function ogLocale(locale: string): string {
  return locale === 'tr' ? 'tr_TR' : 'en_US';
}

/** Absolute URL helper, e.g. abs('/tr/faq') -> https://zypio.online/tr/faq */
export function abs(path: string): string {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${SITE_URL}${path}`;
}

/**
 * Build the `alternates` object (canonical + hreflang) for a localized path.
 * `pathAfterLocale` must start with '' or '/...', e.g. '' for home or '/faq'.
 */
export function alternates(locale: string, pathAfterLocale = '') {
  return {
    canonical: abs(`/${locale}${pathAfterLocale}`),
    languages: {
      'tr-TR': abs(`/tr${pathAfterLocale}`),
      'en-US': abs(`/en${pathAfterLocale}`),
      'x-default': abs(`/tr${pathAfterLocale}`),
    },
  };
}

/** The five social networks Zypio supports, for copy/schema reuse. */
export const SUPPORTED_NETWORKS = [
  'YouTube',
  'Instagram',
  'TikTok',
  'Facebook',
  'X (Twitter)',
] as const;
