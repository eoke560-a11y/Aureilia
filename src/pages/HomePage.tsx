import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Compass,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Home,
  MapPin,
  Microscope,
  Trophy,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useUniversity } from '../context/UniversityContext';
import { UNIVERSITY_MEDIA } from '../lib/media';
import { CourseCard } from '../components/CourseCard';
import { UniversityImage } from '../components/UniversityImage';

const RESEARCH_HIGHLIGHTS = [
  {
    id: 'ai',
    category: 'Artificial Intelligence',
    title: 'Trustworthy Foundation Models for Clinical Triage',
    school: 'School of Computer Science & AI',
    grant: '€3.8M Horizon Europe Grant',
    summary:
      'Developing transparent diagnostic verification tools in partnership with five European university teaching hospitals.',
  },
  {
    id: 'biomed',
    category: 'Biomedical Photonics',
    title: 'Non-Invasive Retinal Biomarkers for Early Neurology',
    school: 'Conway Biomedical Complex',
    grant: '€6.2M ERC Synergy Award',
    summary:
      'Femtosecond laser spectroscopy enabling early detection of neurodegenerative pathways years ahead of clinical onset.',
  },
  {
    id: 'climate',
    category: 'Climate & Architecture',
    title: 'Mass-Timber Urban Retrofits for Atlantic Climates',
    school: 'Richview Institute for Sustainable Urbanism',
    grant: '€2.9M European Climate Fund',
    summary:
      'Structural carbon-negative timber modules engineered for high-density European civic housing.',
  },
  {
    id: 'governance',
    category: 'European Governance',
    title: 'Algorithmic Accountability & Constitutional Rights',
    school: 'School of Law & European Governance',
    grant: '€1.7M Jean Monnet Chair',
    summary:
      'Comparative legal frameworks safeguarding procedural fairness across public-sector digital infrastructure.',
  },
];

const STUDENT_EXPERIENCE_ITEMS = [
  {
    title: 'Campus Life & Belfield Quarter',
    description:
      '133 hectares of wooded walkways, historic quads, coffee roasteries, and collaborative commons.',
    icon: Compass,
    to: '/student-life',
  },
  {
    title: '120+ Student Societies',
    description:
      'Literary debates, chamber orchestras, robotics collectives, and student-run theatrical premieres.',
    icon: Users,
    to: '/student-life',
  },
  {
    title: 'On-Campus Accommodation',
    description:
      'Private study bedrooms clustered around landscaped courtyards with guaranteed first-year places.',
    icon: Home,
    to: '/accommodation',
  },
  {
    title: 'High-Performance Sports',
    description:
      'Olympic-standard 50m pool, rowing boathouse on the Liffey, floodlit pitches, and 58 athletics clubs.',
    icon: Trophy,
    to: '/student-life',
  },
  {
    title: 'Dedicated Student Support',
    description:
      'Academic writing mentors, confidential counselling, disability access, and career coaching.',
    icon: HeartHandshake,
    to: '/student-support',
  },
  {
    title: 'International Community',
    description:
      'Scholars from 94 nations welcomed with dedicated visa advising, airport greets, and Global Lounge events.',
    icon: Globe2,
    to: '/student-life',
  },
];

export const HomePage: React.FC = () => {
  const { settings, courses, news, events, loading, error, refreshData } =
    useUniversity();
  const [researchFilter, setResearchFilter] = useState<string>('All');

  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);
  const displayedCourses =
    featuredCourses.length > 0 ? featuredCourses : courses.slice(0, 3);

  const latestNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 4);

  const researchCategories = [
    'All',
    'Artificial Intelligence',
    'Biomedical Photonics',
    'Climate & Architecture',
    'European Governance',
  ];

  const filteredResearch =
    researchFilter === 'All'
      ? RESEARCH_HIGHLIGHTS
      : RESEARCH_HIGHLIGHTS.filter((r) => r.category === researchFilter);

  return (
    <div>
      {/* A. HERO SECTION */}
      <section className="relative min-h-[540px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#29212A]">
        <img
          src={UNIVERSITY_MEDIA.campusHero}
          alt="Aurelia University Dublin historic limestone courtyard with cherry blossoms"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Measured contrast scrim with soft rose tint and charcoal depth for WCAG AA contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#29212A]/90 via-[#29212A]/65 to-[#B94D79]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#F8DCE8]/15 mix-blend-soft-light"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F8DCE8] mb-4">
              Aurelia University Dublin · Est. 1908
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight text-balance">
              {settings.hero_heading || 'Your Future Starts Here'}
            </h1>
            <p className="mt-5 text-base sm:text-xl text-white/90 leading-relaxed max-w-xl">
              {settings.hero_subtitle ||
                'Discover opportunities, develop your potential and achieve your ambitions.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold whitespace-nowrap transition-colors shadow-sm"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-[#FCEEF3] text-[#29212A] text-sm font-semibold whitespace-nowrap transition-colors"
              >
                <span>Apply Now</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* B. WELCOME SECTION (White Background) */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-3">
                Welcome to Aurelia University
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29212A] leading-tight text-balance">
                {settings.welcome_heading ||
                  'A Tradition of European Scholarship, Reimagined for Tomorrow'}
              </h2>
              <p className="mt-5 text-base text-[#29212A]/80 leading-relaxed">
                {settings.welcome_body ||
                  'Situated on 133 landscaped hectares in Dublin, Aurelia University unites 28,400 scholars, pioneering laboratories, and eight academic schools dedicated to intellectual discovery and global citizenship.'}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#F8DCE8]">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#29212A]">
                    Our Mission
                  </h3>
                  <p className="mt-1.5 text-sm text-[#29212A]/75 leading-relaxed">
                    To cultivate independent thinkers through research-led teaching, civic engagement, and open European inquiry.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#29212A]">
                    Our Vision 2030
                  </h3>
                  <p className="mt-1.5 text-sm text-[#29212A]/75 leading-relaxed">
                    To lead interdisciplinary breakthroughs in climate resilience, ethical technology, and human health.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium whitespace-nowrap transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/mission"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-[#29212A] text-sm font-medium whitespace-nowrap transition-colors"
                >
                  <span>Mission & Vision</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[340px] rounded-2xl overflow-hidden border border-[#F8DCE8] shadow-sm">
                <UniversityImage
                  src={UNIVERSITY_MEDIA.campusWelcomeLibrary}
                  alt="Students studying inside the sunlit Aurelia University Main Library"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. EXPLORE COURSES (Pale Pink Background) */}
      <section className="bg-[#FCEEF3] py-16 lg:py-24 border-y border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-2">
                Academic Programmes
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29212A] text-balance">
                Explore Featured Courses
              </h2>
              <p className="mt-3 text-base text-[#29212A]/80 max-w-2xl">
                Choose from internationally accredited undergraduate degrees, taught master’s programmes, and doctoral research fellowships.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors"
            >
              <span>Browse All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {error && (
            <div className="bg-white rounded-xl border border-[#D99BB5] p-6 text-center">
              <p className="text-sm text-[#29212A] mb-3">{error}</p>
              <button
                type="button"
                onClick={refreshData}
                className="px-4 py-2 rounded-lg bg-[#B94D79] text-white text-sm font-medium"
              >
                Retry Loading Courses
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-xl border border-[#F8DCE8] overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-[#F8DCE8]/50" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-1/2 bg-[#F8DCE8]" />
                    <div className="h-6 w-5/6 bg-[#FCEEF3]" />
                    <div className="h-4 w-full bg-[#F5F5F5]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* D. STUDENT EXPERIENCE (White Background) */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col">
              <div className="rounded-2xl overflow-hidden border border-[#F8DCE8] shadow-sm flex-1 min-h-[340px]">
                <UniversityImage
                  src={UNIVERSITY_MEDIA.studentLifeQuad}
                  alt="Students walking across the blossom-lined campus terrace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  to="/student-life"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium whitespace-nowrap transition-colors"
                >
                  <span>Explore Student Life</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/accommodation"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-[#29212A] text-sm font-medium whitespace-nowrap transition-colors"
                >
                  <span>View Residences</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-2">
                Life at Belfield Quarter
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29212A] mb-4 text-balance">
                A Connected, Supportive Campus Experience
              </h2>
              <p className="text-base text-[#29212A]/75 leading-relaxed mb-8">
                University education extends far beyond the lecture hall. At Aurelia University, residential communities, competitive sport, student-led arts, and dedicated wellbeing services shape lifelong friendships.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {STUDENT_EXPERIENCE_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.to}
                      className="group p-5 rounded-xl bg-[#FCEEF3]/55 hover:bg-[#FCEEF3] border border-[#F8DCE8] transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-[#B94D79] shrink-0" />
                        <h3 className="font-serif text-lg font-semibold text-[#29212A] group-hover:text-[#B94D79] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#29212A]/75 leading-relaxed">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. RESEARCH AND INNOVATION (Pale Pink Background) */}
      <section className="bg-[#FCEEF3] py-16 lg:py-24 border-t border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-2">
                Research & Innovation
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29212A] text-balance">
                Scholarship That Shapes European Society
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter research highlights by category"
              className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-[#F8DCE8]"
            >
              {researchCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={researchFilter === cat}
                  onClick={() => setResearchFilter(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    researchFilter === cat
                      ? 'bg-[#B94D79] text-white'
                      : 'text-[#29212A]/75 hover:bg-[#FCEEF3] hover:text-[#29212A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#F8DCE8] bg-white shadow-xs flex flex-col">
              <div className="aspect-[16/10] overflow-hidden">
                <UniversityImage
                  src={UNIVERSITY_MEDIA.researchInnovationHub}
                  alt="Aurelia University Research and Innovation Pavilion at dusk"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-xs font-medium text-[#B94D79] mb-2">
                    Research & Enterprise · Horizon Europe Partner
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-[#29212A] mb-3">
                    Conway & Quantum Innovation Precinct
                  </h3>
                  <p className="text-sm text-[#29212A]/80 leading-relaxed">
                    Over €148 million in active European research awards, supporting 42 spin-out ventures, open-science repositories, and 1,100 doctoral researchers.
                  </p>
                </div>
                <Link
                  to="/research"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
                >
                  <span>Explore Research Institutes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredResearch.map((project) => (
                <article
                  key={project.id}
                  className="bg-white rounded-xl border border-[#F8DCE8] p-6 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#B94D79] font-medium mb-2">
                      <Microscope className="w-4 h-4 shrink-0" />
                      <span>{project.category}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#29212A] leading-snug mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#29212A]/75 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#FCEEF3] text-xs text-[#29212A]/70 space-y-0.5">
                    <p className="font-semibold text-[#29212A]">{project.grant}</p>
                    <p>{project.school}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* F. UNIVERSITY STATISTICS (Soft Pink Section) */}
      <section className="bg-[#F8DCE8] py-14 lg:py-16 border-y border-[#D99BB5]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="px-3">
              <GraduationCap className="w-6 h-6 text-[#B94D79] mx-auto mb-2" />
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#29212A] tabular-nums">
                {settings.stat_total_students || '28,400+'}
              </p>
              <p className="mt-1.5 text-sm font-medium text-[#29212A]/80">
                Total Enrolled Students
              </p>
            </div>
            <div className="px-3">
              <BookOpen className="w-6 h-6 text-[#B94D79] mx-auto mb-2" />
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#29212A] tabular-nums">
                {settings.stat_total_courses || '140+'}
              </p>
              <p className="mt-1.5 text-sm font-medium text-[#29212A]/80">
                Accredited Degree Courses
              </p>
            </div>
            <div className="px-3">
              <Users className="w-6 h-6 text-[#B94D79] mx-auto mb-2" />
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#29212A] tabular-nums">
                {settings.stat_departments || '8 Schools'}
              </p>
              <p className="mt-1.5 text-sm font-medium text-[#29212A]/80">
                Academic Departments
              </p>
            </div>
            <div className="px-3">
              <Globe2 className="w-6 h-6 text-[#B94D79] mx-auto mb-2" />
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#29212A] tabular-nums">
                {settings.stat_international_students || '34%'}
              </p>
              <p className="mt-1.5 text-sm font-medium text-[#29212A]/80">
                International Student Body
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* G. NEWS AND EVENTS (White Background) */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Latest University News */}
            <div className="lg:col-span-7">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-2">
                    University Dispatches
                  </p>
                  <h2 className="font-serif text-3xl font-semibold text-[#29212A]">
                    Latest News
                  </h2>
                </div>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62] whitespace-nowrap"
                >
                  <span>All News</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-6">
                {latestNews.map((article) => (
                  <article
                    key={article.id}
                    className="group grid grid-cols-1 sm:grid-cols-12 gap-5 bg-white rounded-xl border border-[#F8DCE8] p-4 hover:shadow-sm transition-shadow"
                  >
                    <Link
                      to={`/news/${article.slug}`}
                      className="sm:col-span-4 aspect-[4/3] rounded-lg overflow-hidden bg-[#FCEEF3]"
                    >
                      <UniversityImage
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </Link>
                    <div className="sm:col-span-8 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#29212A]/65 mb-2">
                          <span className="font-medium text-[#B94D79]">
                            {article.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{article.publishedDate}</span>
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-[#29212A] group-hover:text-[#B94D79] transition-colors leading-snug mb-2">
                          <Link to={`/news/${article.slug}`}>{article.title}</Link>
                        </h3>
                        <p className="text-sm text-[#29212A]/75 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                      <Link
                        to={`/news/${article.slug}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#B94D79] hover:text-[#9C3A62]"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-5">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-2">
                    Campus Calendar
                  </p>
                  <h2 className="font-serif text-3xl font-semibold text-[#29212A]">
                    Upcoming Events
                  </h2>
                </div>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62] whitespace-nowrap"
                >
                  <span>Full Calendar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-[#FCEEF3]/65 rounded-2xl border border-[#F8DCE8] divide-y divide-[#F8DCE8]">
                {upcomingEvents.map((ev) => (
                  <div key={ev.id} className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#B94D79] mb-1.5">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{ev.eventDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ev.category}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#29212A] leading-snug mb-2">
                      {ev.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#29212A]/70">
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-[#B94D79]" />
                        {ev.startTime} – {ev.endTime}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B94D79]" />
                        {ev.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. CALL TO ACTION (Pale Pink & Soft Pink Section) */}
      <section className="bg-[#FCEEF3] py-16 lg:py-20 border-t border-[#F8DCE8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-3">
            Begin Your Journey in Dublin
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29212A] text-balance">
            Ready to Shape What Comes Next?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#29212A]/80 max-w-2xl mx-auto leading-relaxed">
            Explore our degree pathways, submit your undergraduate or postgraduate application, or speak directly with our Dublin admissions advisers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/courses"
              className="px-6 py-3.5 rounded-lg bg-white hover:bg-[#F8DCE8]/60 border border-[#D99BB5] text-[#29212A] text-sm font-semibold whitespace-nowrap transition-colors"
            >
              Explore Courses
            </Link>
            <Link
              to="/admissions"
              className="px-6 py-3.5 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold whitespace-nowrap transition-colors shadow-xs"
            >
              Apply to the University
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-lg bg-white hover:bg-[#F8DCE8]/60 border border-[#D99BB5] text-[#29212A] text-sm font-semibold whitespace-nowrap transition-colors"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
