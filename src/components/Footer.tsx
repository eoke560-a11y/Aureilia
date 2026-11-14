import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Share2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid university or personal email address.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Subscription failed.');
      }
      setStatusMessage({
        type: 'success',
        text: data.alreadySubscribed
          ? 'You are already subscribed to Aurelia University dispatches.'
          : 'Subscribed. You will receive our monthly academic newsletter.',
      });
      setEmail('');
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Unable to subscribe right now.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#B94D79] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/20">
          {/* University Identity & Contact */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M5 6.5C5 5.67157 5.67157 5 6.5 5H29.5C30.3284 5 31 5.67157 31 6.5V18.5C31 25.8 24.5 30.8 18 32.5C11.5 30.8 5 25.8 5 18.5V6.5Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M18 10L23.5 23.5H20.8L19.5 20.2H16.5L15.2 23.5H12.5L18 10ZM18 13.7L17.1 17.8H18.9L18 13.7Z"
                  fill="#B94D79"
                />
                <circle cx="18" cy="26.2" r="1.5" fill="#D99BB5" />
              </svg>
              <span className="font-serif text-xl font-semibold tracking-tight text-white">
                Aurelia University Dublin
              </span>
            </Link>

            <p className="text-sm text-white/90 leading-relaxed max-w-sm">
              A leading European research and teaching university committed to academic rigour, global collaboration, and sustainable discovery.
            </p>

            <ul className="space-y-2.5 text-sm text-white/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#F8DCE8]" />
                <span>Belfield Quarter, Stillorgan Road, Dublin 4, D04 V1W8, Ireland</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-[#F8DCE8]" />
                <span className="tabular-nums">+353 1 716 7777</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-[#F8DCE8]" />
                <span>admissions@aureliauniversity.ie</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="#newsletter-signup"
                aria-label="Aurelia University Global Portal"
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <Link
                to="/news"
                aria-label="University Dispatches"
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Useful Links Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8DCE8] mb-4 font-sans">
              Study & Courses
            </h3>
            <ul className="space-y-2.5 text-sm text-white/90">
              <li><Link to="/courses" className="hover:text-white hover:underline">Course Catalogue</Link></li>
              <li><Link to="/departments" className="hover:text-white hover:underline">Academic Departments</Link></li>
              <li><Link to="/admissions" className="hover:text-white hover:underline">Admissions</Link></li>
              <li><Link to="/entry-requirements" className="hover:text-white hover:underline">Entry Requirements</Link></li>
              <li><Link to="/faq" className="hover:text-white hover:underline">Admissions FAQ</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8DCE8] mb-4 font-sans">
              University Life
            </h3>
            <ul className="space-y-2.5 text-sm text-white/90">
              <li><Link to="/about" className="hover:text-white hover:underline">About Aurelia</Link></li>
              <li><Link to="/mission" className="hover:text-white hover:underline">Mission & Vision</Link></li>
              <li><Link to="/student-life" className="hover:text-white hover:underline">Student Life</Link></li>
              <li><Link to="/accommodation" className="hover:text-white hover:underline">Accommodation</Link></li>
              <li><Link to="/student-support" className="hover:text-white hover:underline">Student Support</Link></li>
              <li><Link to="/research" className="hover:text-white hover:underline">Research & Innovation</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription Interface */}
          <div id="newsletter-signup" className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8DCE8] mb-3 font-sans">
              University Newsletter
            </h3>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              Receive monthly research highlights, open day invitations, and admissions updates directly from Dublin.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5" noValidate>
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white text-[#29212A] text-sm placeholder:text-[#29212A]/50 focus:outline-none focus:ring-2 focus:ring-[#F8DCE8]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg bg-[#29212A] hover:bg-[#3B303C] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {statusMessage && (
                <div
                  role="status"
                  className={`flex items-start gap-2 text-xs rounded-lg p-2.5 ${
                    statusMessage.type === 'success'
                      ? 'bg-white/15 text-white'
                      : 'bg-[#29212A]/80 text-[#FCEEF3]'
                  }`}
                >
                  {statusMessage.type === 'success' && (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#F8DCE8]" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
            </form>

            <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/85">
              <Link to="/news" className="hover:text-white hover:underline">News</Link>
              <Link to="/events" className="hover:text-white hover:underline">Events</Link>
              <Link to="/contact" className="hover:text-white hover:underline">Contact Us</Link>
              <Link to="/admin" className="hover:text-white hover:underline">Admin Dashboard</Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/85">
          <p>© {new Date().getFullYear()} Aurelia University Dublin. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy" className="hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <Link to="/accessibility" className="hover:text-white hover:underline">
              Accessibility Statement
            </Link>
            <Link to="/contact" className="hover:text-white hover:underline">
              Freedom of Information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
