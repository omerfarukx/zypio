import { MetadataRoute } from 'next';
import { platforms } from '@/lib/platforms';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zypio.online';

  const locales = ['tr', 'en'];

  // Ana sayfalar
  const routes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${locale}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]);

  // Platform sayfaları (YouTube, TikTok vb.)
  const platformRoutes = locales.flatMap((locale) =>
    Object.keys(platforms).map((platformId) => ({
      url: `${baseUrl}/${locale}/platform/${platformId}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...routes, ...platformRoutes];
}
