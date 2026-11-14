import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { UNIVERSITY_MEDIA } from '../lib/media';

const PROJECTS = [
  {
    title: 'European Biomedical Photonics Consortium',
    category: 'Health & Life Sciences',
    lead: 'Prof. Claire O’Sullivan',
    funding: '€6.2M European Research Council Synergy',
    summary:
      'Developing non-invasive femtosecond laser imaging for early neurological diagnosis across partner clinics in Dublin, Munich, and Leuven.',
  },
  {
    title: 'Fault-Tolerant Quantum Optical Processors',
    category: 'Computing & Quantum',
    lead: 'Prof. Aoife Gallagher',
    funding: '€4.4M Science Foundation Ireland',
    summary:
      'Designing photonic qubit error-correction architectures and cryogenic control firmware for European quantum testbeds.',
  },
  {
    title: 'Atlantic Mass-Timber Carbon Neutral Districts',
    category: 'Climate & Urbanism',
    lead: 'Prof. Henrik Lindqvist',
    funding: '€2.9M EU Green Deal Mission',
    summary:
      'Testing bio-based hygrothermal timber assemblies engineered to cut embodied carbon in mid-rise urban housing by 64%.',
  },
  {
    title: 'Algorithmic Accountability in Public Administration',
    category: 'Law & Humanities',
    lead: 'Prof. Camille Delacroix',
    funding: '€1.7M Jean Monnet Centre of Excellence',
    summary:
      'Auditing transparency standards, judicial review rights, and human-oversight obligations under the European AI Act.',
  },
];

export const ResearchPage: React.FC = () => {
  const [category, setCategory] = useState('All');
  const categories = [
    'All',
    'Health & Life Sciences',
    'Computing & Quantum',
    'Climate & Urbanism',
    'Law & Humanities',
  ];

  const visible =
    category === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === category);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Research & Innovation' }]}
        kicker="€148M Active Research Portfolio"
        title="Research & Innovation"
        description="Aurelia University institutes unite fundamental science, civic humanities, and enterprise incubation to solve global challenges."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7">
            <div className="h-full min-h-[340px] rounded-2xl overflow-hidden border border-[#F8DCE8]">
              <UniversityImage
                src={UNIVERSITY_MEDIA.researchInnovationHub}
                alt="Aurelia University Research and Innovation Hub"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
            <h2 className="font-serif text-3xl font-semibold text-[#29212A]">
              From Laboratory Bench to European Impact
            </h2>
            <p className="text-base text-[#29212A]/80 leading-relaxed">
              Our NovaBelfield Innovation Precinct supports 42 active university spin-outs, over 300 patent families, and collaborative partnerships with European research hospitals and clean-tech pioneers.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FCEEF3] border border-[#F8DCE8]">
                <p className="font-serif text-2xl font-bold text-[#B94D79] tabular-nums">
                  €148M
                </p>
                <p className="text-xs text-[#29212A]/75 mt-1">
                  Active Research Awards
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FCEEF3] border border-[#F8DCE8]">
                <p className="font-serif text-2xl font-bold text-[#B94D79] tabular-nums">
                  1,100+
                </p>
                <p className="text-xs text-[#29212A]/75 mt-1">
                  Doctoral & Postdoc Fellows
                </p>
              </div>
            </div>
            <Link
              to="/courses?level=Doctoral"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
            >
              <span>Explore Doctoral Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FCEEF3] border-t border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="font-serif text-3xl font-semibold text-[#29212A]">
              Flagship Research Programmes
            </h2>
            <div
              role="tablist"
              aria-label="Filter research themes"
              className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-xl border border-[#F8DCE8]"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    category === cat
                      ? 'bg-[#B94D79] text-white'
                      : 'text-[#29212A]/80 hover:bg-[#FCEEF3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((proj) => (
              <article
                key={proj.title}
                className="bg-white rounded-2xl border border-[#F8DCE8] p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#B94D79] mb-2">
                    <Microscope className="w-4 h-4" />
                    <span>{proj.category}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#29212A] mb-3">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[#29212A]/80 leading-relaxed mb-5">
                    {proj.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#FCEEF3] text-xs text-[#29212A]/75 flex flex-wrap justify-between gap-2">
                  <span className="font-semibold text-[#29212A]">{proj.lead}</span>
                  <span>{proj.funding}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
