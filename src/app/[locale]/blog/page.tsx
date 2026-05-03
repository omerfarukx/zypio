import { Link } from '@/i18n/routing';
import { blogPosts } from '@/lib/blog';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Blog & Rehberler</h1>
        <p className="text-xl text-gray-400">Medya dönüştürme ve indirme hakkında pratik bilgiler.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 hover:border-blue-500/50 transition-colors group"
          >
            <div className="text-sm text-blue-400 mb-3">{new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h2>
            <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">{post.description}</p>
            <div className="text-blue-500 font-medium flex items-center gap-2">
              Devamını Oku &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
