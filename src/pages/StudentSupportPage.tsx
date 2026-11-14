import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  HeartHandshake,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const SUPPORT_SERVICES = [
  {
    icon: BookOpen,
    title: 'Academic Advising & Writing Centre',
    description:
      'One-to-one peer tutoring, statistical drop-in clinics, and essay coaching to help every student thrive across modules.',
    hours: 'Mon–Fri · 09:00–18:00 · James Joyce Library Wing',
  },
  {
    icon: HeartHandshake,
    title: 'Student Health & Counselling Service',
    description:
      'Free, confidential GP consultations, mental health counselling, and mindfulness workshops located centrally on campus.',
    hours: 'Mon–Fri · 08:30–17:30 · Student Centre Level 2',
  },
  {
    icon: ShieldCheck,
    title: 'Access & Lifelong Learning Centre',
    description:
      'Tailored learning accommodations, assistive technology loans, extra exam time, and sensory study rooms.',
    hours: 'Mon–Fri · 09:00–17:00 · Tierney Building',
  },
  {
    icon: Briefcase,
    title: 'Careers Network & Placements',
    description:
      'Employer recruitment fairs, CV reviews, mock interviews, and paid European summer internship placements.',
    hours: 'Mon–Fri · 09:30–17:00 · Student Centre Level 1',
  },
  {
    icon: Wallet,
    title: 'Student Financial Aid & Hardship Fund',
    description:
      'Confidential financial advising, emergency living grants, childcare support, and laptop lending schemes.',
    hours: 'Mon–Fri · 09:00–16:30 · Registry Hall',
  },
];

export const StudentSupportPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Student Life', to: '/student-life' },
          { label: 'Student Support' },
        ]}
        kicker="Wellbeing & Advising"
        title="Student Support Services"
        description="Comprehensive academic, health, financial, and career support designed to empower every student throughout their time at Aurelia University."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SUPPORT_SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <article
                key={svc.title}
                className="bg-white rounded-2xl border border-[#F8DCE8] p-7 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <Icon className="w-6 h-6 text-[#B94D79] mb-4" />
                  <h2 className="font-serif text-xl font-semibold text-[#29212A] mb-2.5">
                    {svc.title}
                  </h2>
                  <p className="text-sm text-[#29212A]/80 leading-relaxed mb-4">
                    {svc.description}
                  </p>
                </div>
                <p className="pt-4 border-t border-[#FCEEF3] text-xs font-medium text-[#B94D79]">
                  {svc.hours}
                </p>
              </article>
            );
          })}

          <div className="bg-[#FCEEF3] rounded-2xl border border-[#F8DCE8] p-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B94D79] mb-2">
                Direct Assistance
              </p>
              <h2 className="font-serif text-2xl font-semibold text-[#29212A] mb-3">
                Need to Book an Appointment?
              </h2>
              <p className="text-sm text-[#29212A]/80 leading-relaxed">
                Reach out confidentially to our Student Desk and a dedicated advisor will reply within one working day.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
            >
              <span>Contact Student Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
