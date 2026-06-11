/**
 * JSON-LD (schema.org) builders for Zypio.
 *
 * Every builder returns a plain object that can be serialized with
 * JSON.stringify and dropped into a <script type="application/ld+json">.
 * Use the <StructuredData> component to render them safely.
 *
 * Rules enforced here:
 *  - Only real data. No aggregateRating, no review, no fake author/address.
 *  - Consistent product name ("Zypio") and canonical domain.
 *  - Free product => Offer price "0".
 */

import { SITE_URL, BRAND, abs } from './site';

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** Organization — the brand entity behind every page. */
export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    email: BRAND.contactEmail,
    description:
      'Zypio is a free, no-account web tool to download and convert videos, photos and profile pictures from YouTube, Instagram, TikTok, Facebook and X.',
  };
}

/** WebSite — enables sitelinks search box and ties the brand together. */
export function websiteSchema(locale: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: BRAND.name,
    url: SITE_URL,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en-US',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/watch?v={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** WebApplication — the product itself (free, browser-based). */
export function webApplicationSchema(opts: {
  locale: string;
  name?: string;
  description: string;
  url: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name ?? BRAND.name,
    url: opts.url,
    description: opts.description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires a modern web browser. No installation needed.',
    inLanguage: opts.locale === 'tr' ? 'tr-TR' : 'en-US',
    isAccessibleForFree: true,
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: BRAND.price,
      priceCurrency: BRAND.priceCurrency,
    },
  };
}

/** FAQPage — for any page rendering a Q&A list. */
export function faqPageSchema(faqs: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/** BreadcrumbList — pass absolute or root-relative URLs. */
export function breadcrumbSchema(
  items: { name: string; url: string }[],
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : abs(item.url),
    })),
  };
}

/** BlogPosting / Article — for blog content. No fake author objects. */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  inLanguage?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: opts.inLanguage ?? 'tr-TR',
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
  };
}

/** HowTo — only use with genuine step-by-step instructions. */
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: string[];
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
  };
}

/**
 * Combine multiple schema objects into a single @graph document.
 * Strips the per-object @context so the wrapper owns it.
 */
export function graph(...nodes: Json[]): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map((node) => {
      const copy = { ...node };
      delete copy['@context'];
      return copy;
    }),
  };
}
