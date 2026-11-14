import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { useUniversity } from '../context/UniversityContext';

export const NewsPage: React.FC = () => {
  const { news, loading, error, refreshData } = useUniversity();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(news.map((n) => n.category)));
    return ['All', ...unique];
  }, [news]);

  const filtered = useMemo(() => {
    return news.filter((article) => {
      const catMatch =
        selectedCategory === 'All' || article.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const qMatch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [news, selectedCategory, query]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'News' }]}
        kicker="University Dispatches"
        title="News & Institutional Stories"
        description="Read the latest research breakthroughs, campus openings, student achievements, and academic announcements from Dublin."
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#F8DCE8]">
            <div
              role="tablist"
              aria-label="Filter news by category"
              className="flex flex-wrap gap-1.5 bg-[#FCEEF3] p-1.5 rounded-xl border border-[#F8DCE8]"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#B94D79] text-white'
                      : 'text-[#29212A] hover:bg-white/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#B94D79] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <label htmlFor="news-search" className="sr-only">
                Search news
              </label>
              <input
                id="news-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D99BB5]/60 text-sm text-[#29212A] focus:outline-none focus:border-[#B94D79]"
              />
            </div>
          </div>

          {error && (
            <div className="bg-[#FCEEF3] rounded-xl border border-[#D99BB5] p-6 text-center mb-8">
              <p className="text-sm text-[#29212A] mb-3">{error}</p>
              <button
                type="button"
                onClick={refreshData}
                className="px-4 py-2 rounded-lg bg-[#B94D79] text-white text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-xl bg-[#FCEEF3]/60 border border-[#F8DCE8] animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-14 text-center bg-[#FCEEF3]/40 rounded-2xl border border-[#F8DCE8]">
              <p className="text-base text-[#29212A]/80">
                No news articles matched your filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article) => (
                <article
                  key={article.id}
                  className="group bg-white rounded-xl border border-[#F8DCE8] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                >
                  <Link
                    to={`/news/${article.slug}`}
                    className="block aspect-[4/3] overflow-hidden bg-[#FCEEF3]"
                  >
                    <UniversityImage
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#29212A]/65 mb-2.5">
                      <span className="font-semibold text-[#B94D79]">
                        {article.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-[#29212A] group-hover:text-[#B94D79] transition-colors leading-snug mb-2.5">
                      <Link to={`/news/${article.slug}`}>{article.title}</Link>
                    </h2>
                    <p className="text-sm text-[#29212A]/75 leading-relaxed line-clamp-3 flex-1 mb-5">
                      {article.summary}
                    </p>
                    <Link
                      to={`/news/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
