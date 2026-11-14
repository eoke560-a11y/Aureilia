import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../types/university';
import { useUniversity } from '../context/UniversityContext';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { news } = useUniversity();
  const [article, setArticle] = useState<NewsArticle | null>(() =>
    news.find((n) => n.slug === slug) ?? null
  );
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const matched = news.find((n) => n.slug === slug);
    if (matched) {
      setArticle(matched);
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadArticle() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/news/${encodeURIComponent(slug || '')}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        if (!cancelled) setArticle(data);
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Unable to load article');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadArticle();
    return () => {
      cancelled = true;
    };
  }, [slug, news]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="h-10 w-3/4 bg-[#FCEEF3] rounded animate-pulse mb-6" />
        <div className="h-80 bg-[#FCEEF3]/60 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#29212A] mb-3">
          Article Not Found
        </h1>
        <p className="text-base text-[#29212A]/75 mb-6">{error}</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] text-white text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News</span>
        </Link>
      </div>
    );
  }

  const related = news.filter((n) => n.slug !== article.slug).slice(0, 3);
  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'News', to: '/news' },
          { label: article.title },
        ]}
        kicker={`${article.category} · ${article.publishedDate} · ${article.readTime}`}
        title={article.title}
        description={article.summary}
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 max-w-prose">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#F8DCE8] mb-3">
              <UniversityImage
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-serif italic text-[#29212A]/65 mb-8">
              By {article.author} · Published {article.publishedDate}
            </p>

            <div className="space-y-6 text-base sm:text-[17px] text-[#29212A]/85 leading-[1.8]">
              {paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:text-[#B94D79] first-letter:float-left first-letter:mr-3 first-letter:mt-1'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[#F8DCE8]">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All University News</span>
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#FCEEF3] rounded-2xl border border-[#F8DCE8] p-6">
              <h2 className="font-serif text-xl font-semibold text-[#29212A] pb-3 mb-4 border-b border-[#F8DCE8]">
                Related Stories
              </h2>
              <div className="space-y-5">
                {related.map((item) => (
                  <div key={item.id}>
                    <p className="text-xs text-[#B94D79] font-medium mb-1">
                      {item.category} · {item.publishedDate}
                    </p>
                    <Link
                      to={`/news/${item.slug}`}
                      className="font-serif text-base font-semibold text-[#29212A] hover:text-[#B94D79] leading-snug block"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
              <Link
                to="/events"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
              >
                <span>View Upcoming Campus Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
