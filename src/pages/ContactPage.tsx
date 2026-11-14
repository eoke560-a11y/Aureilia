import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useUniversity } from '../context/UniversityContext';

export const ContactPage: React.FC = () => {
  const { departments } = useUniversity();
  const [searchParams] = useSearchParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('General Admissions');
  const [subject, setSubject] = useState(() => searchParams.get('subject') || '');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const s = searchParams.get('subject');
    if (s) setSubject(s);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please complete all required fields before submitting.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          department,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed.');
      }
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Unable to submit enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Contact Us' }]}
        kicker="Dublin Campus Directory"
        title="Contact Aurelia University"
        description="Connect with our Admissions Office, International Desk, Academic Schools, or Campus Reception in Belfield Quarter."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl font-semibold text-[#29212A] mb-3">
              Send an Enquiry
            </h2>
            <p className="text-sm text-[#29212A]/75 mb-8">
              All submissions are logged directly with the selected university office and answered within two working days.
            </p>

            {submitted && (
              <div
                role="status"
                className="mb-6 p-5 rounded-xl bg-[#FCEEF3] border border-[#B94D79] flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#B94D79] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-[#29212A]">
                    Enquiry Received
                  </p>
                  <p className="text-sm text-[#29212A]/80 mt-0.5">
                    Thank you for contacting Aurelia University Dublin. An advisor will reply to your email shortly.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-[#29212A] text-white text-sm"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-[#29212A] mb-1.5"
                  >
                    Full Name <span className="text-[#B94D79]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aoife Murphy"
                    className="w-full px-4 py-3 rounded-lg border border-[#D99BB5]/70 text-sm focus:outline-none focus:border-[#B94D79]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-[#29212A] mb-1.5"
                  >
                    Email Address <span className="text-[#B94D79]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aoife@example.ie"
                    className="w-full px-4 py-3 rounded-lg border border-[#D99BB5]/70 text-sm focus:outline-none focus:border-[#B94D79]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-[#29212A] mb-1.5"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+353 1 555 0192"
                    className="w-full px-4 py-3 rounded-lg border border-[#D99BB5]/70 text-sm focus:outline-none focus:border-[#B94D79]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-department"
                    className="block text-sm font-medium text-[#29212A] mb-1.5"
                  >
                    Department / Office
                  </label>
                  <select
                    id="contact-department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#D99BB5]/70 text-sm bg-white focus:outline-none focus:border-[#B94D79]"
                  >
                    <option value="General Admissions">General Admissions</option>
                    <option value="International Student Office">International Student Office</option>
                    <option value="Campus Residences & Accommodation">Campus Residences & Accommodation</option>
                    <option value="Student Support & Scholarships">Student Support & Scholarships</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-[#29212A] mb-1.5"
                >
                  Subject <span className="text-[#B94D79]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Undergraduate entry enquiry for 2027"
                  className="w-full px-4 py-3 rounded-lg border border-[#D99BB5]/70 text-sm focus:outline-none focus:border-[#B94D79]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[#29212A] mb-1.5"
                >
                  Message <span className="text-[#B94D79]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please share details about the programme, entry year, or support query..."
                  className="w-full px-4 py-3 rounded-lg border border-[#D99BB5]/70 text-sm focus:outline-none focus:border-[#B94D79]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3.5 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {submitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>

          {/* Campus Contact Cards */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-[#FCEEF3] rounded-2xl border border-[#F8DCE8] p-7 space-y-5">
              <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
                Campus Address & Hours
              </h2>
              <div className="space-y-4 text-sm text-[#29212A]/85">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B94D79] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#29212A]">
                      Aurelia University Dublin
                    </p>
                    <p>Belfield Quarter, Stillorgan Road, Dublin 4, D04 V1W8, Ireland</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#B94D79] shrink-0" />
                  <span className="tabular-nums">+353 1 716 7777</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#B94D79] shrink-0" />
                  <span>admissions@aureliauniversity.ie</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F8DCE8] text-xs text-[#29212A]/75 space-y-1.5">
                <p className="font-semibold text-[#29212A]">Reception Hours</p>
                <p>Monday – Friday: 08:30 – 17:30 GMT/IST</p>
                <p>Campus Tours: Wednesdays & Saturdays at 11:00</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#F8DCE8] p-7">
              <h3 className="font-serif text-xl font-semibold text-[#29212A] mb-3">
                Public Transport Links
              </h3>
              <p className="text-sm text-[#29212A]/80 leading-relaxed">
                Accessible in 20 minutes from Dublin City Centre via Bus Routes 39A, 46A, and 145, or a 12-minute walk from Sydney Parade DART coastal station.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
