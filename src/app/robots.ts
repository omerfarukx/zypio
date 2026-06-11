import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/site';

/**
 * robots.txt — allows general search crawlers and the major AI-search bots,
 * blocks only API + internal redirect routes, and points to the sitemap.
 *
 * Public marketing/content pages must stay crawlable so AI answer engines
 * (ChatGPT Search, Claude, Gemini, Perplexity, AI Overviews, Copilot) can
 * read, cite and summarize the product.
 */
export default function robots(): MetadataRoute.Robots {
  // Routes that should never be indexed: server APIs and the bare /watch
  // deep-link redirector (no standalone content; redirects to home).
  const disallow = ['/api/', '/watch'];

  const aiAndSearchBots = [
    '*',
    // OpenAI
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    // Anthropic
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'anthropic-ai',
    // Perplexity
    'PerplexityBot',
    'Perplexity-User',
    // Google (Gemini / AI Overviews) & Bing (Copilot)
    'Google-Extended',
    'Googlebot',
    'Bingbot',
    // Others
    'Applebot-Extended',
    'CCBot',
  ];

  return {
    rules: aiAndSearchBots.map((userAgent) => ({
      userAgent,
      allow: '/',
      disallow,
    })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
