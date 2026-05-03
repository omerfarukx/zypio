import { blogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <Link href="/blog" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">
        &larr; Blog'a Dön
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
    </div>
  );
}
