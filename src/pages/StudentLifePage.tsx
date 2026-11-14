import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, Music, Trophy, Users } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { UNIVERSITY_MEDIA } from '../lib/media';

export const StudentLifePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Student Life' }]}
        kicker="Belfield Quarter Campus"
        title="Student Life, Societies & Sport"
        description="Discover a vibrant residential campus of 120+ student societies, Olympic-standard sports complexes, performing arts venues, and global cultural networks."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 space-y-5 flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-semibold text-[#29212A]">
              Community at the Heart of Dublin
            </h2>
            <p className="text-base text-[#29212A]/80 leading-relaxed">
              Just 20 minutes south of Dublin city centre by express bus and coastal rail, Belfield Quarter offers wooded parkland trails, independent student cafés, an art-house cinema, and 24-hour collaborative studios.
            </p>
            <p className="text-base text-[#29212A]/80 leading-relaxed">
              Whether you join the Literary & Historical Society for Thursday evening debates, row at dawn on the River Liffey, or volunteer with Aurelia Community Action, your voice shapes campus culture from week one.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <Link
                to="/accommodation"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
              >
                <span>Campus Accommodation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/student-support"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-[#29212A] text-sm font-medium transition-colors"
              >
                <span>Student Support</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] rounded-2xl overflow-hidden border border-[#F8DCE8]">
              <UniversityImage
                src={UNIVERSITY_MEDIA.studentLifeQuad}
                alt="Students walking together across Belfield courtyard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FCEEF3] border-t border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Users,
              title: '120+ Clubs & Societies',
              body: 'From Robotics, Law Review, and Architectural Photography to Alpine Mountaineering and Choral Scholars—every student receives subsidised membership during Orientation Week.',
            },
            {
              icon: Trophy,
              title: 'Sport & Athletic Excellence',
              body: 'Train at the Belfield Aquatics & Fitness Pavilion featuring a 50-metre Olympic pool, rowing ergometer suite, indoor climbing wall, and floodlit rugby and hockey pitches.',
            },
            {
              icon: Music,
              title: 'Arts, Cinema & Theatre',
              body: 'Our 320-seat Dramsoc Theatre and Astra Cultural Gallery host student film festivals, chamber recitals, and visiting European playwright residencies throughout term.',
            },
            {
              icon: Globe2,
              title: 'International Student Experience',
              body: 'The Global Lounge hosts weekly language cafés, cultural dinners, career visa clinics, and peer-buddy pairings welcoming scholars from 94 countries.',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-[#F8DCE8] p-7"
              >
                <Icon className="w-6 h-6 text-[#B94D79] mb-3" />
                <h3 className="font-serif text-2xl font-semibold text-[#29212A] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#29212A]/80 leading-relaxed">
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
