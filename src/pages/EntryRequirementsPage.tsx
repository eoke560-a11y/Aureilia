import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const EQUIVALENCIES = [
  {
    region: 'Irish Leaving Certificate',
    general: 'Minimum 6 subjects including English, Irish (unless exempt), and Mathematics, with at least two H5 grades and four O6/H7 grades.',
    competitive: '490 – 585 CAO points for Honours STEM, Law, Architecture, and Biomedical programmes.',
    notes: 'Bonus 25 points awarded for H6 or above in Higher Level Mathematics.',
  },
  {
    region: 'UK GCE A-Levels',
    general: 'Minimum 3 A-Level subjects plus GCSE English and Mathematics at Grade C / 4 or higher.',
    competitive: 'AAA – AAB across relevant academic disciplines; AS levels accepted in 4th subject.',
    notes: 'Further Mathematics strongly welcomed for Computer Science & Quantum tracks.',
  },
  {
    region: 'International Baccalaureate (IB)',
    general: 'Full IB Diploma with minimum 32 points overall, including Standard Level 4 in English and Mathematics.',
    competitive: '36 – 40 points with Higher Level 6 in required faculty subjects.',
    notes: 'Extended Essay and Theory of Knowledge bonus points included in total score.',
  },
  {
    region: 'European Baccalaureate & Abitur',
    general: 'European Baccalaureate minimum 76%–84% overall; German Abitur average 1.3–2.0; French Baccalauréat 14.0–16.5/20.',
    competitive: 'Subject-specific written examination grades required in Mathematics or Sciences for STEM degrees.',
    notes: 'Certified English translations accepted alongside original diplomas.',
  },
];

export const EntryRequirementsPage: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = EQUIVALENCIES[selectedIdx];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Admissions', to: '/admissions' },
          { label: 'Entry Requirements' },
        ]}
        kicker="Academic Standards"
        title="Entry Requirements & International Equivalencies"
        description="Compare minimum matriculation standards, competitive faculty benchmarks, and English language proficiency guidelines."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-6">
            Qualification Equivalency Guide
          </h2>

          <div
            role="tablist"
            aria-label="Examination systems"
            className="flex flex-wrap gap-2 bg-[#FCEEF3] p-1.5 rounded-xl border border-[#F8DCE8] mb-8"
          >
            {EQUIVALENCIES.map((item, idx) => (
              <button
                key={item.region}
                type="button"
                role="tab"
                aria-selected={selectedIdx === idx}
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedIdx === idx
                    ? 'bg-[#B94D79] text-white'
                    : 'text-[#29212A] hover:bg-white/70'
                }`}
              >
                {item.region}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#F8DCE8] p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B94D79] mb-2">
                Minimum Matriculation
              </p>
              <p className="text-sm sm:text-base text-[#29212A]/85 leading-relaxed">
                {current.general}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B94D79] mb-2">
                Competitive Faculty Range
              </p>
              <p className="text-sm sm:text-base text-[#29212A]/85 leading-relaxed tabular-nums">
                {current.competitive}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B94D79] mb-2">
                Faculty Notes
              </p>
              <p className="text-sm sm:text-base text-[#29212A]/85 leading-relaxed">
                {current.notes}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FCEEF3] border-t border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-6">
            English Language Proficiency
          </h2>

          <div className="bg-white rounded-2xl border border-[#F8DCE8] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F8DCE8] bg-[#FCEEF3]/60 text-xs uppercase tracking-wider text-[#B94D79]">
                  <th className="py-4 px-6 font-semibold">Examination</th>
                  <th className="py-4 px-6 font-semibold">Standard Minimum</th>
                  <th className="py-4 px-6 font-semibold">Law, Medicine & Humanities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FCEEF3] text-sm text-[#29212A]">
                <tr>
                  <td className="py-4 px-6 font-medium">IELTS Academic</td>
                  <td className="py-4 px-6 tabular-nums">6.5 overall (no band below 6.0)</td>
                  <td className="py-4 px-6 tabular-nums">7.0 overall (no band below 6.5)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">TOEFL iBT</td>
                  <td className="py-4 px-6 tabular-nums">90 overall (min. 21 writing)</td>
                  <td className="py-4 px-6 tabular-nums">100 overall (min. 24 writing)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Cambridge C1 Advanced</td>
                  <td className="py-4 px-6 tabular-nums">176 overall (169 minimum component)</td>
                  <td className="py-4 px-6 tabular-nums">185 overall (176 minimum component)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Duolingo English Test</td>
                  <td className="py-4 px-6 tabular-nums">120 overall (min. 110 subscores)</td>
                  <td className="py-4 px-6 tabular-nums">130 overall (min. 120 subscores)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
            >
              <span>Check Specific Course Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#D99BB5] hover:bg-[#F8DCE8]/50 text-[#29212A] text-sm font-medium transition-colors"
            >
              <span>Ask Admissions Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
