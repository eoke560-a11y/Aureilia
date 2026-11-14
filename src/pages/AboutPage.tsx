import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, Globe2, Library } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { UNIVERSITY_MEDIA } from '../lib/media';
import { useUniversity } from '../context/UniversityContext';

export const AboutPage: React.FC = () => {
  const { settings } = useUniversity();

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'About Us' }]}
        kicker="Est. 1908 · Belfield Quarter, Dublin"
        title="About Aurelia University Dublin"
        description="A modern European research university shaped by over a century of liberal inquiry, civic leadership, and architectural excellence in Ireland's capital."
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 space-y-5 flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-semibold text-[#29212A]">
              Heritage Meets Modern European Discovery
            </h2>
            <p className="text-base text-[#29212A]/80 leading-relaxed">
              Established in Dublin in 1908, Aurelia University grew from a modest classical college into one of Europe’s premier multidisciplinary institutions. Today, our 133-hectare parkland campus in Belfield Quarter brings together historic limestone colonnades and net-zero glass research pavilions.
            </p>
            <p className="text-base text-[#29212A]/80 leading-relaxed">
              With eight academic schools spanning Computer Science & Artificial Intelligence, Architecture, Medicine, Business, Law, Engineering, Psychology, and the Humanities, Aurelia fosters intellectual curiosity unconstrained by disciplinary silos.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/mission"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
              >
                <span>Mission & Vision 2030</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/departments"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-[#29212A] text-sm font-medium transition-colors"
              >
                <span>Academic Departments</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] rounded-2xl overflow-hidden border border-[#F8DCE8]">
              <UniversityImage
                src={UNIVERSITY_MEDIA.campusHero}
                alt="Aurelia University Dublin Main Quadrangle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FCEEF3] border-y border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-10">
            Institutional Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Top 1% Worldwide',
                body: 'Ranked among Europe’s leading research-intensive universities for graduate employability and citation impact.',
              },
              {
                icon: Library,
                title: '1.8M Archival Volumes',
                body: 'Five campus libraries housing medieval Irish manuscripts alongside 24-hour collaborative study rooms.',
              },
              {
                icon: Globe2,
                title: '94 Partner Nations',
                body: `Representing ${settings.stat_international_students || '34%'} international enrolment and active Erasmus+ exchanges across 210 partner faculties.`,
              },
              {
                icon: Building2,
                title: 'Sustainable Campus',
                body: 'Solar microgrids, biodiversity corridors, and mass-timber academic halls targeting full carbon neutrality.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-[#F8DCE8] p-6"
                >
                  <Icon className="w-6 h-6 text-[#B94D79] mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-[#29212A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#29212A]/75 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-8">
            University Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Prof. Siobhán Kavanagh',
                role: 'President of Aurelia University',
                bio: 'Former Chair of European Constitutional Studies and fellow of the Royal Irish Academy, leading Strategy 2030.',
              },
              {
                name: 'Prof. Eamonn Fitzgerald',
                role: 'Registrar & Deputy President',
                bio: 'Oversees academic quality assurance, curriculum innovation, and digital transformation across all eight schools.',
              },
              {
                name: 'Prof. Claire O’Sullivan',
                role: 'Vice-President for Research & Innovation',
                bio: 'Biomedical photonics investigator stewarding Horizon Europe consortia and university enterprise spin-outs.',
              },
            ].map((leader) => (
              <div
                key={leader.name}
                className="p-6 rounded-xl bg-[#FCEEF3]/55 border border-[#F8DCE8]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B94D79] mb-1">
                  {leader.role}
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#29212A] mb-2">
                  {leader.name}
                </h3>
                <p className="text-sm text-[#29212A]/80 leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
