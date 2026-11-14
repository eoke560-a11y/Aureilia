import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const FAQ_ITEMS = [
  {
    category: 'Admissions',
    question: 'When do undergraduate and postgraduate applications open?',
    answer:
      'Undergraduate CAO and Direct International portals open on 5 November each year for the following September intake. Taught Master’s programmes review applications on a rolling basis from October through June.',
  },
  {
    category: 'Admissions',
    question: 'Can I apply to more than one course at Aurelia University?',
    answer:
      'Yes. EU/CAO applicants may list up to ten programmes in order of preference. Direct international and postgraduate applicants may submit up to three programme choices under a single application fee.',
  },
  {
    category: 'Fees & Scholarships',
    question: 'Are merit scholarships available for international students?',
    answer:
      'Yes. Our Global Excellence Scholarships award 50% to 100% tuition fee waivers across all eight schools. Applicants holding an academic offer before 31 March are automatically invited to submit a short scholarship essay.',
  },
  {
    category: 'Accommodation',
    question: 'Is on-campus accommodation guaranteed for first-year students?',
    answer:
      'Incoming first-year undergraduate and full-time non-EU postgraduate students who apply before 31 May receive a guaranteed room offer in Rosewood Village, Ashfield Suites, or Belgrove Studios.',
  },
  {
    category: 'Student Life',
    question: 'What support is provided for international arrivals in Dublin?',
    answer:
      'Our Global Engagement team provides Dublin Airport welcome shuttles during Orientation Week, Irish Residence Permit (IRP) registration clinics, and peer-mentor groups.',
  },
  {
    category: 'Academic',
    question: 'Do undergraduate courses include study abroad or industry internships?',
    answer:
      'Yes. Most four-year Honours programmes incorporate either a paid 6-month industry placement or an Erasmus+ exchange semester at one of our 210 partner universities across Europe, North America, and Asia.',
  },
];

export const FaqPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Frequently Asked Questions' }]}
        kicker="Admissions & Campus Guide"
        title="Frequently Asked Questions"
        description="Quick answers regarding applications, entry requirements, tuition fees, scholarships, and life in Dublin."
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10">
            <Search className="w-4 h-4 text-[#B94D79] absolute left-4 top-1/2 -translate-y-1/2" />
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter questions by topic (e.g. scholarship, accommodation, CAO)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FCEEF3]/50 border border-[#D99BB5]/60 text-sm text-[#29212A] focus:outline-none focus:border-[#B94D79] focus:bg-white"
            />
          </div>

          <div className="space-y-4">
            {filtered.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.question}
                  className="rounded-xl border border-[#F8DCE8] bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#FCEEF3]/50 transition-colors"
                  >
                    <div>
                      <span className="block text-xs font-medium text-[#B94D79] mb-1">
                        {item.category}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-semibold text-[#29212A]">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#B94D79] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#29212A]/80 leading-relaxed border-t border-[#FCEEF3]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-[#FCEEF3] border border-[#F8DCE8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
                Still Have a Question?
              </h2>
              <p className="text-sm text-[#29212A]/80 mt-1">
                Our Dublin admissions team is happy to help with individual enquiries.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
