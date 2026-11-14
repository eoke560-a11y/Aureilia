import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { useUniversity } from '../context/UniversityContext';

export const EventsPage: React.FC = () => {
  const { events, loading, error, refreshData } = useUniversity();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(events.map((e) => e.category)));
    return ['All', ...unique];
  }, [events]);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [events, selectedCategory]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Events' }]}
        kicker="Campus Calendar 2026–2027"
        title="University Events & Open Days"
        description="Join public lectures, academic symposiums, postgraduate open evenings, and guided tours of Belfield Quarter."
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div
              role="tablist"
              aria-label="Filter events by category"
              className="inline-flex flex-wrap gap-1.5 bg-[#FCEEF3] p-1.5 rounded-xl border border-[#F8DCE8]"
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
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-44 rounded-2xl bg-[#FCEEF3]/60 border border-[#F8DCE8] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((ev) => (
                <article
                  key={ev.id}
                  className="bg-white rounded-2xl border border-[#F8DCE8] overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-xs"
                >
                  <div className="md:col-span-4 aspect-[4/3] md:aspect-auto bg-[#FCEEF3]">
                    <UniversityImage
                      src={ev.imageUrl}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#B94D79] mb-2">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {ev.eventDate}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{ev.category}</span>
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-[#29212A] mb-2.5">
                        {ev.title}
                      </h2>
                      <p className="text-sm sm:text-base text-[#29212A]/80 leading-relaxed mb-5">
                        {ev.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#FCEEF3] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-5 text-xs text-[#29212A]/75">
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                          <Clock className="w-4 h-4 text-[#B94D79]" />
                          {ev.startTime} – {ev.endTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#B94D79]" />
                          {ev.location}
                        </span>
                      </div>
                      <Link
                        to={`/contact?subject=${encodeURIComponent(`Event Registration: ${ev.title}`)}`}
                        className="px-4 py-2 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-xs sm:text-sm font-medium whitespace-nowrap transition-colors"
                      >
                        Register Attendance
                      </Link>
                    </div>
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
