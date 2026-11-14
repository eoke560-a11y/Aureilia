import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, FileText, GraduationCap } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { UNIVERSITY_MEDIA } from '../lib/media';

const ADMISSION_TRACKS = [
  {
    id: 'undergraduate',
    label: 'Undergraduate (EU / CAO)',
    deadline: '01 February 2027 (Normal Closing) · 01 May 2027 (Late Entry)',
    steps: [
      'Select up to ten Level 8 Honours programmes via the Central Applications Office or Aurelia Direct Portal.',
      'Submit portfolio or music audition materials by 15 March where required (Architecture & Fine Arts).',
      'Receive Round 1 offers in mid-August and confirm your Belfield residence allocation.',
    ],
  },
  {
    id: 'international',
    label: 'International Direct Entry',
    deadline: 'Rolling Review · Priority Scholarship Cut-off: 31 March 2027',
    steps: [
      'Upload certified secondary transcripts, predicted grades, and English proficiency scores.',
      'Complete an optional Global Excellence Scholarship statement (awards up to 100% tuition).',
      'Receive an official offer within 15 working days alongside dedicated Irish visa guidance.',
    ],
  },
  {
    id: 'postgraduate',
    label: 'Postgraduate & Doctoral',
    deadline: '30 June 2027 (Autumn Intake) · PhD Fellowships Reviewed Quarterly',
    steps: [
      'Prepare an academic CV, official degree transcripts, two referee letters, and statement of purpose.',
      'For PhD applicants, attach a 1,500-word research proposal aligned with a School supervisor.',
      'Interviews are held online or in Dublin within three weeks of submission.',
    ],
  },
];

export const AdmissionsPage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState(ADMISSION_TRACKS[0].id);
  const activeTrack =
    ADMISSION_TRACKS.find((t) => t.id === selectedTrack) ?? ADMISSION_TRACKS[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Admissions' }]}
        kicker="2027 Academic Intake"
        title="Admissions & How to Apply"
        description="Step-by-step guidance for Irish, European Union, and international students applying to Aurelia University Dublin."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-6">
              Choose Your Application Pathway
            </h2>

            <div
              role="tablist"
              aria-label="Admission tracks"
              className="flex flex-wrap gap-2 bg-[#FCEEF3] p-1.5 rounded-xl border border-[#F8DCE8] mb-8"
            >
              {ADMISSION_TRACKS.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedTrack === track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedTrack === track.id
                      ? 'bg-[#B94D79] text-white'
                      : 'text-[#29212A] hover:bg-white/70'
                  }`}
                >
                  {track.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[#F8DCE8] p-7 space-y-6">
              <div className="flex items-start gap-3 pb-4 border-b border-[#FCEEF3]">
                <Calendar className="w-5 h-5 text-[#B94D79] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B94D79]">
                    Key Deadline
                  </p>
                  <p className="text-sm font-medium text-[#29212A] mt-0.5">
                    {activeTrack.deadline}
                  </p>
                </div>
              </div>

              <ol className="space-y-4">
                {activeTrack.steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-lg bg-[#FCEEF3] text-[#B94D79] text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
                      0{idx + 1}
                    </span>
                    <p className="text-sm sm:text-base text-[#29212A]/85 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
                >
                  <span>Start Application Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/entry-requirements"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-[#29212A] text-sm font-medium transition-colors"
                >
                  <span>Check Entry Requirements</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#F8DCE8] flex-1 min-h-[260px]">
              <UniversityImage
                src={UNIVERSITY_MEDIA.studentLifeQuad}
                alt="Aurelia University students on campus quad"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 rounded-2xl bg-[#FCEEF3] border border-[#F8DCE8]">
              <div className="flex items-center gap-2 text-[#B94D79] mb-2">
                <GraduationCap className="w-5 h-5" />
                <h3 className="font-serif text-xl font-semibold text-[#29212A]">
                  Scholarships & Financial Aid
                </h3>
              </div>
              <p className="text-sm text-[#29212A]/80 leading-relaxed mb-4">
                Over €4.5 million is awarded annually through Global Excellence Scholarships, Ad Astra Academic Fellowships, and Sports Bursaries.
              </p>
              <Link
                to="/student-support"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
              >
                <span>Explore Financial Support</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FCEEF3] border-t border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-8">
            Essential Applicant Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'Certified Transcripts',
                text: 'Official secondary school or bachelor’s academic transcripts translated into English where applicable.',
              },
              {
                icon: CheckCircle2,
                title: 'English Language Proof',
                text: 'IELTS Academic (6.5 overall), TOEFL iBT (90+), or Cambridge C1 Advanced accepted across programmes.',
              },
              {
                icon: GraduationCap,
                title: 'Programme Prerequisites',
                text: 'Verify mathematics, laboratory science, or portfolio requirements in the Course Catalogue.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-[#F8DCE8] p-6"
                >
                  <Icon className="w-5 h-5 text-[#B94D79] mb-3" />
                  <h3 className="font-serif text-xl font-semibold text-[#29212A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#29212A]/75 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
