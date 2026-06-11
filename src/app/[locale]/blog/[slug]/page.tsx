import { blogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/seo/StructuredData';
import { articleSchema } from '@/lib/seo/structured-data';
import { SITE_URL, alternates } from '@/lib/seo/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: alternates(locale, `/blog/${slug}`),
    openGraph: {
      title: `${post.title} | Zypio`,
      description: post.description,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <StructuredData
        data={articleSchema({
          title: post.title,
          description: post.description,
          url: `${SITE_URL}/${locale}/blog/${slug}`,
          datePublished: post.date,
          inLanguage: locale === 'tr' ? 'tr-TR' : 'en-US',
        })}
      />

      <Breadcrumbs
        items={[
          { name: 'Blog', url: `/${locale}/blog` },
          { name: post.title, url: `/${locale}/blog/${slug}` },
        ]}
      />

      <Link href="/blog" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">
        &larr; Blog&apos;a Dön
      </Link>

      <article className="bg-[#1C1C1E] border border-white/5 rounded-3xl p-8 md:p-12">
        <header className="mb-10">
          <div className="text-blue-400 mb-4 font-medium">
            {new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
        </header>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          {post.content.split('\n').map((paragraph, index) => {
            if (!paragraph.trim()) return null;
            return <p key={index} className="mb-6 leading-relaxed">{paragraph.trim()}</p>;
          })}
        </div>
      </article>

      {/* Internal links to keep blog posts connected to the product */}
      <nav className="mt-10 flex flex-wrap gap-2" aria-label="Related tools">
        <Link href="/tools" className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 hover:text-white hover:border-blue-500/30 transition-colors">
          {locale === 'tr' ? 'Tüm Araçlar' : 'All Tools'}
        </Link>
        <Link href="/what-is-zypio" className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 hover:text-white hover:border-blue-500/30 transition-colors">
          {locale === 'tr' ? 'Zypio Nedir?' : 'What is Zypio?'}
        </Link>
        <Link href="/faq" className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 hover:text-white hover:border-blue-500/30 transition-colors">
          {locale === 'tr' ? 'SSS' : 'FAQ'}
        </Link>
      </nav>
    </div>
  );
}
