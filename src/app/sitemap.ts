import { MetadataRoute } from 'next';
import { platforms } from '@/lib/platforms';
import { blogPosts } from '@/lib/blog';
import { SITE_URL, LOCALES } from '@/lib/seo/site';
import { getUseCases, getAudiences } from '@/lib/seo/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales = [...LOCALES];

  // Core marketing pages
  const core = locales.flatMap((locale) => [
    { url: `${SITE_URL}/${locale}`, lastModified: now, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${SITE_URL}/${locale}/what-is-zypio`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${SITE_URL}/${locale}/tools`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/${locale}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/${locale}/use-cases`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/${locale}/compare`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/${locale}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
  ]);

  // Platform tool pages (YouTube, TikTok, … — 12 variants)
  const platformRoutes = locales.flatMap((locale) =>
    Object.keys(platforms).map((platformId) => ({
      url: `${SITE_URL}/${locale}/platform/${platformId}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  );

  // Use-case pages (slugs are localized)
  const useCaseRoutes = locales.flatMap((locale) =>
    getUseCases(locale).map((uc) => ({
      url: `${SITE_URL}/${locale}/use-cases/${uc.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  // Audience pages (slugs are localized)
  const audienceRoutes = locales.flatMap((locale) =>
    getAudiences(locale).map((a) => ({
      url: `${SITE_URL}/${locale}/for/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  // Blog posts (shared slugs across locales)
  const blogRoutes = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  // Legal
  const legalRoutes = locales.flatMap((locale) =>
    ['privacy', 'terms', 'dmca'].map((doc) => ({
      url: `${SITE_URL}/${locale}/legal/${doc}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  );

  return [
    ...core,
    ...platformRoutes,
    ...useCaseRoutes,
    ...audienceRoutes,
    ...blogRoutes,
    ...legalRoutes,
  ];
}
