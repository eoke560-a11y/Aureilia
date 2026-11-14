import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Course, Department, NewsArticle, UniversityEvent } from '../types/university';

interface MegaCategory {
  title: string;
  items: { label: string; to: string; description: string }[];
}

interface NavConfigItem {
  id: string;
  label: string;
  to: string;
  featuredTitle?: string;
  featuredText?: string;
  featuredCta?: { label: string; to: string };
  categories?: MegaCategory[];
}

const NAV_ITEMS: NavConfigItem[] = [
  { id: 'home', label: 'Home', to: '/' },
  {
    id: 'about',
    label: 'About Us',
    to: '/about',
    featuredTitle: 'Aurelia University Dublin',
    featuredText:
      'Founded in 1908 in Dublin, uniting classical academic rigour with forward-looking European research.',
    featuredCta: { label: 'Explore Our Heritage', to: '/about' },
    categories: [
      {
        title: 'University Profile',
        items: [
          {
            label: 'About the University',
            to: '/about',
            description: 'History, governance, campus architecture, and international standing.',
          },
          {
            label: 'Mission & Vision 2030',
            to: '/mission',
            description: 'Our strategic commitments to scholarship, equity, and climate leadership.',
          },
          {
            label: 'Academic Departments',
            to: '/departments',
            description: 'Explore our eight interdisciplinary schools and academic leadership.',
          },
        ],
      },
      {
        title: 'Governance & Portal',
        items: [
          {
            label: 'Frequently Asked Questions',
            to: '/faq',
            description: 'Answers on applications, tuition, visas, and campus residences.',
          },
          {
            label: 'Contact & Campus Directory',
            to: '/contact',
            description: 'Reach admissions, school offices, or Belfield Quarter reception.',
          },
          {
            label: 'Administrator Portal',
            to: '/admin',
            description: 'Authorised staff dashboard for courses, news, events, and enquiries.',
          },
        ],
      },
    ],
  },
  {
    id: 'study',
    label: 'Study With Us',
    to: '/admissions',
    featuredTitle: '2027 Admissions Open',
    featuredText:
      'Discover undergraduate, taught master’s, and doctoral pathways with €4.5M in merit scholarships.',
    featuredCta: { label: 'Admissions Guide', to: '/admissions' },
    categories: [
      {
        title: 'Prospective Students',
        items: [
          {
            label: 'Admissions & Application Dates',
            to: '/admissions',
            description: 'Key deadlines, CAO & direct entry timelines, and scholarship awards.',
          },
          {
            label: 'Entry Requirements',
            to: '/entry-requirements',
            description: 'Leaving Cert, A-Level, IB equivalencies, and English language standards.',
          },
          {
            label: 'Browse Course Catalogue',
            to: '/courses',
            description: 'Search and filter programmes by school, qualification, and duration.',
          },
        ],
      },
      {
        title: 'Living & Support',
        items: [
          {
            label: 'Campus Accommodation',
            to: '/accommodation',
            description: 'Modern Belfield residences with guaranteed first-year housing options.',
          },
          {
            label: 'Student Support Services',
            to: '/student-support',
            description: 'Academic advising, wellbeing counselling, disability & career services.',
          },
        ],
      },
    ],
  },
  {
    id: 'courses',
    label: 'Courses',
    to: '/courses',
    featuredTitle: '140+ Accredited Programmes',
    featuredText:
      'Filter honours bachelor’s degrees, master’s specialisations, and funded doctoral fellowships.',
    featuredCta: { label: 'Open Course Finder', to: '/courses' },
    categories: [
      {
        title: 'By Qualification Level',
        items: [
          {
            label: 'Undergraduate Degrees',
            to: '/courses?level=Undergraduate',
            description: 'Three- to five-year honours programmes across arts, sciences, and law.',
          },
          {
            label: 'Postgraduate Master’s',
            to: '/courses?level=Postgraduate',
            description: 'One- and two-year specialist MSc, MEng, and MBA degrees.',
          },
          {
            label: 'Doctoral & PhD Research',
            to: '/courses?level=Doctoral',
            description: 'Structured four-year research fellowships and ERC-funded cohorts.',
          },
        ],
      },
      {
        title: 'Academic Schools',
        items: [
          {
            label: 'All Eight Schools',
            to: '/departments',
            description: 'Computer Science, Architecture, Medicine, Business, Law, and Humanities.',
          },
          {
            label: 'Entry Requirements',
            to: '/entry-requirements',
            description: 'Check academic prerequisites and international diploma equivalencies.',
          },
        ],
      },
    ],
  },
  {
    id: 'student-life',
    label: 'Student Life',
    to: '/student-life',
    featuredTitle: 'Life in Belfield Quarter',
    featuredText:
      'Over 120 student societies, Olympic-grade sports facilities, and a vibrant international community.',
    featuredCta: { label: 'Explore Student Life', to: '/student-life' },
    categories: [
      {
        title: 'Campus Experience',
        items: [
          {
            label: 'Campus Life, Clubs & Sports',
            to: '/student-life',
            description: 'Societies, arts festivals, rowing, athletics, and global orientation.',
          },
          {
            label: 'Campus Accommodation',
            to: '/accommodation',
            description: 'Private study bedrooms, courtyard gardens, and dining plans.',
          },
        ],
      },
      {
        title: 'Wellbeing & Careers',
        items: [
          {
            label: 'Student Support & Careers',
            to: '/student-support',
            description: 'Dedicated academic tutors, healthcare, financial aid, and internships.',
          },
          {
            label: 'Student FAQ',
            to: '/faq',
            description: 'Practical guides for incoming Irish, EU, and international students.',
          },
        ],
      },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    to: '/research',
    featuredTitle: 'Discovery With European Impact',
    featuredText:
      'Advancing climate engineering, biomedical photonics, ethical AI, and European civic humanities.',
    featuredCta: { label: 'Research & Innovation', to: '/research' },
    categories: [
      {
        title: 'Research Ecosystem',
        items: [
          {
            label: 'Research & Innovation Hub',
            to: '/research',
            description: 'Institutes, Horizon Europe projects, and industry spin-outs.',
          },
          {
            label: 'Academic Departments',
            to: '/departments',
            description: 'Meet heads of school and faculty research clusters.',
          },
        ],
      },
      {
        title: 'Doctoral Pathways',
        items: [
          {
            label: 'PhD Programmes',
            to: '/courses?level=Doctoral',
            description: 'Explore funded doctoral vacancies and research scholarships.',
          },
          {
            label: 'Research News',
            to: '/news',
            description: 'Recent grants, publications, and laboratory breakthroughs.',
          },
        ],
      },
    ],
  },
  {
    id: 'news-events',
    label: 'News & Events',
    to: '/news',
    featuredTitle: 'Campus Dispatches & Calendar',
    featuredText:
      'Read institutional announcements and RSVP for open days, symposiums, and public lectures.',
    featuredCta: { label: 'All University News', to: '/news' },
    categories: [
      {
        title: 'Publications & Calendar',
        items: [
          {
            label: 'University News',
            to: '/news',
            description: 'Research milestones, campus openings, and student achievements.',
          },
          {
            label: 'Upcoming Events & Open Days',
            to: '/events',
            description: 'Lectures, campus tours, and postgraduate open evenings.',
          },
        ],
      },
      {
        title: 'Media & Enquiries',
        items: [
          {
            label: 'Contact Communications',
            to: '/contact',
            description: 'Press enquiries, speaker requests, and event accessibility.',
          },
        ],
      },
    ],
  },
  { id: 'contact', label: 'Contact', to: '/contact' },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMegaId, setActiveMegaId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    courses: Course[];
    departments: Department[];
    news: NewsArticle[];
    events: UniversityEvent[];
  } | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setActiveMegaId(null);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMegaId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchResults(null);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } finally {
        setSearching(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const activeMega = NAV_ITEMS.find(
    (item) => item.id === activeMegaId && item.categories
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setActiveMegaId(null)}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F8DCE8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 lg:h-[74px] flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B94D79] rounded-md"
          >
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 shrink-0"
              aria-hidden="true"
            >
              <path
                d="M5 6.5C5 5.67157 5.67157 5 6.5 5H29.5C30.3284 5 31 5.67157 31 6.5V18.5C31 25.8 24.5 30.8 18 32.5C11.5 30.8 5 25.8 5 18.5V6.5Z"
                fill="#FCEEF3"
                stroke="#B94D79"
                strokeWidth="1.75"
              />
              <path
                d="M18 10L23.5 23.5H20.8L19.5 20.2H16.5L15.2 23.5H12.5L18 10ZM18 13.7L17.1 17.8H18.9L18 13.7Z"
                fill="#B94D79"
              />
              <circle cx="18" cy="26.2" r="1.5" fill="#D99BB5" />
            </svg>
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#29212A] whitespace-nowrap">
              Aurelia University
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-5"
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent =
                item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.to);
              const hasMega = Boolean(item.categories);

              return (
                <div
                  key={item.id}
                  onMouseEnter={() =>
                    hasMega ? setActiveMegaId(item.id) : setActiveMegaId(null)
                  }
                  className="relative flex items-center"
                >
                  <Link
                    to={item.to}
                    onClick={(e) => {
                      if (hasMega && activeMegaId !== item.id) {
                        e.preventDefault();
                        setActiveMegaId(item.id);
                      }
                    }}
                    className={`inline-flex items-center gap-1 py-2 text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                      isCurrent || activeMegaId === item.id
                        ? 'text-[#B94D79] border-[#B94D79]'
                        : 'text-[#29212A] border-transparent hover:text-[#B94D79] hover:border-[#D99BB5]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasMega && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          activeMegaId === item.id ? 'rotate-180 text-[#B94D79]' : 'text-[#29212A]/60'
                        }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Actions: Search + Apply Now + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveMegaId(null);
                setSearchOpen((prev) => !prev);
              }}
              aria-label="Toggle site search"
              aria-expanded={searchOpen}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#29212A] hover:bg-[#FCEEF3] hover:text-[#B94D79] transition-colors focus-visible:outline-2 focus-visible:outline-[#B94D79]"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <Link
              to="/admissions"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B94D79]"
            >
              Apply Now
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile navigation"
              aria-expanded={mobileMenuOpen}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#29212A] hover:bg-[#FCEEF3] transition-colors focus-visible:outline-2 focus-visible:outline-[#B94D79]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Desktop Mega Menu */}
      <AnimatePresence>
        {activeMega && activeMega.categories && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:block absolute inset-x-0 top-full bg-white border-b border-[#F8DCE8] shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
              <div className="col-span-4 bg-[#FCEEF3] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium tracking-wider uppercase text-[#B94D79] mb-2">
                    {activeMega.label}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-[#29212A] mb-2">
                    {activeMega.featuredTitle}
                  </h3>
                  <p className="text-sm text-[#29212A]/80 leading-relaxed">
                    {activeMega.featuredText}
                  </p>
                </div>
                {activeMega.featuredCta && (
                  <Link
                    to={activeMega.featuredCta.to}
                    onClick={() => setActiveMegaId(null)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
                  >
                    <span>{activeMega.featuredCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

              <div className="col-span-8 grid grid-cols-2 gap-8 py-1">
                {activeMega.categories.map((cat) => (
                  <div key={cat.title}>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#29212A]/60 pb-2 mb-3 border-b border-[#F8DCE8]">
                      {cat.title}
                    </h4>
                    <ul className="space-y-3">
                      {cat.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            to={sub.to}
                            onClick={() => setActiveMegaId(null)}
                            className="group block rounded-lg p-2 -mx-2 hover:bg-[#FCEEF3]/70 transition-colors"
                          >
                            <span className="block text-sm font-semibold text-[#29212A] group-hover:text-[#B94D79]">
                              {sub.label}
                            </span>
                            <span className="block text-xs text-[#29212A]/70 mt-0.5 leading-relaxed">
                              {sub.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Search Panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full bg-white border-b border-[#F8DCE8] shadow-lg"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#B94D79] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, departments, news, or upcoming events..."
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#D99BB5]/60 bg-[#FCEEF3]/40 text-sm text-[#29212A] placeholder:text-[#29212A]/50 focus:outline-none focus:border-[#B94D79] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors"
                >
                  Search
                </button>
              </form>

              {searching && (
                <p className="text-xs text-[#29212A]/60 mt-3">
                  Searching Aurelia University directory...
                </p>
              )}

              {!searching && searchResults && searchQuery.trim() && (
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#F8DCE8] pt-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B94D79] mb-2">
                      Courses ({searchResults.courses.length})
                    </h4>
                    {searchResults.courses.length === 0 ? (
                      <p className="text-xs text-[#29212A]/60">No matching courses.</p>
                    ) : (
                      <ul className="space-y-2">
                        {searchResults.courses.map((c) => (
                          <li key={c.id}>
                            <Link
                              to={`/courses/${c.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="block text-sm font-medium text-[#29212A] hover:text-[#B94D79]"
                            >
                              {c.title}{' '}
                              <span className="text-xs text-[#29212A]/60">
                                · {c.qualificationLevel}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B94D79] mb-2">
                      Departments, News & Events
                    </h4>
                    <ul className="space-y-2">
                      {searchResults.departments.map((d) => (
                        <li key={`dept-${d.id}`}>
                          <Link
                            to="/departments"
                            onClick={() => setSearchOpen(false)}
                            className="block text-sm text-[#29212A] hover:text-[#B94D79]"
                          >
                            {d.name}{' '}
                            <span className="text-xs text-[#29212A]/60">· Department</span>
                          </Link>
                        </li>
                      ))}
                      {searchResults.news.map((n) => (
                        <li key={`news-${n.id}`}>
                          <Link
                            to={`/news/${n.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="block text-sm text-[#29212A] hover:text-[#B94D79]"
                          >
                            {n.title}{' '}
                            <span className="text-xs text-[#29212A]/60">· News</span>
                          </Link>
                        </li>
                      ))}
                      {searchResults.events.map((ev) => (
                        <li key={`evt-${ev.id}`}>
                          <Link
                            to="/events"
                            onClick={() => setSearchOpen(false)}
                            className="block text-sm text-[#29212A] hover:text-[#B94D79]"
                          >
                            {ev.title}{' '}
                            <span className="text-xs text-[#29212A]/60">· Event</span>
                          </Link>
                        </li>
                      ))}
                      {searchResults.departments.length === 0 &&
                        searchResults.news.length === 0 &&
                        searchResults.events.length === 0 && (
                          <li className="text-xs text-[#29212A]/60">
                            No matching articles or events.
                          </li>
                        )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Hamburger Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden bg-white border-b border-[#F8DCE8] max-h-[82vh] overflow-y-auto shadow-lg"
          >
            <div className="px-4 py-5 space-y-2">
              {NAV_ITEMS.map((item) => {
                const hasMega = Boolean(item.categories);
                const isExpanded = mobileExpanded === item.id;
                return (
                  <div key={item.id} className="border-b border-[#FCEEF3] pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 text-base font-medium text-[#29212A] hover:text-[#B94D79] flex-1"
                      >
                        {item.label}
                      </Link>
                      {hasMega && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : item.id)
                          }
                          aria-label={`Expand ${item.label}`}
                          className="w-11 h-11 flex items-center justify-center text-[#29212A]"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? 'rotate-180 text-[#B94D79]' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasMega && isExpanded && item.categories && (
                      <div className="pl-3 pb-2 space-y-3">
                        {item.categories.map((cat) => (
                          <div key={cat.title}>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B94D79] mb-1">
                              {cat.title}
                            </p>
                            <ul className="space-y-1">
                              {cat.items.map((sub) => (
                                <li key={sub.label}>
                                  <Link
                                    to={sub.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1.5 text-sm text-[#29212A]/85 hover:text-[#B94D79]"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-3 flex flex-col gap-3">
                <Link
                  to="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium"
                >
                  Apply Now
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-5 py-2.5 rounded-lg border border-[#D99BB5] text-sm font-medium text-[#29212A]"
                >
                  Administrator Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
