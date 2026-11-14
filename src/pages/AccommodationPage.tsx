import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { UNIVERSITY_MEDIA } from '../lib/media';

const RESIDENCES = [
  {
    name: 'Rosewood Village (First-Year Undergraduate)',
    roomType: 'Private Single Bedroom · Shared Apartment Kitchen (4–6 students)',
    semesterFee: '€3,450 / semester',
    annualFee: '€6,900 / academic year',
  },
  {
    name: 'Ashfield Courtyard Suites',
    roomType: 'En-suite Study Bedroom · Meal Plan Option Available',
    semesterFee: '€4,120 / semester',
    annualFee: '€8,240 / academic year',
  },
  {
    name: 'Belgrove Postgraduate Studios',
    roomType: 'Self-Contained Private Studio · Quiet Research Wing',
    semesterFee: '€4,680 / semester',
    annualFee: '€9,360 / academic year',
  },
];

export const AccommodationPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Student Life', to: '/student-life' },
          { label: 'Accommodation' },
        ]}
        kicker="On-Campus Residences"
        title="Campus Accommodation"
        description="Safe, walkable, landscaped student villages right on campus—housing over 4,200 undergraduate and postgraduate scholars."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] rounded-2xl overflow-hidden border border-[#F8DCE8]">
              <UniversityImage
                src={UNIVERSITY_MEDIA.campusAccommodation}
                alt="Aurelia University modern brick and stone student residences"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <h2 className="font-serif text-3xl font-semibold text-[#29212A]">
              Guaranteed First-Year Housing Pathway
            </h2>
            <p className="text-base text-[#29212A]/80 leading-relaxed">
              Every incoming first-year undergraduate and non-EU postgraduate student who applies by the priority deadline is guaranteed an offer in our on-campus residences.
            </p>
            <ul className="space-y-3 text-sm text-[#29212A]/85">
              {[
                'High-speed eduroam fibre Wi-Fi, utilities, and 24/7 residential warden support included.',
                'Dedicated quiet study lounges, music practice rooms, and secure indoor bicycle hubs.',
                'Accessible step-free apartments and sensory-friendly residential blocks available.',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B94D79] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
              >
                <span>Enquire About Housing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FCEEF3] border-t border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-6">
            2026–2027 Residence Options & Rates
          </h2>

          <div className="bg-white rounded-2xl border border-[#F8DCE8] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F8DCE8] bg-[#FCEEF3]/60 text-xs uppercase tracking-wider text-[#B94D79]">
                  <th className="py-4 px-6 font-semibold">Residence Village</th>
                  <th className="py-4 px-6 font-semibold">Configuration</th>
                  <th className="py-4 px-6 font-semibold">Per Semester</th>
                  <th className="py-4 px-6 font-semibold">Academic Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FCEEF3] text-sm text-[#29212A]">
                {RESIDENCES.map((res) => (
                  <tr key={res.name}>
                    <td className="py-4 px-6 font-semibold">{res.name}</td>
                    <td className="py-4 px-6 text-[#29212A]/80">{res.roomType}</td>
                    <td className="py-4 px-6 tabular-nums">{res.semesterFee}</td>
                    <td className="py-4 px-6 tabular-nums font-medium text-[#B94D79]">
                      {res.annualFee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
