import React, { useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit3,
  Globe,
  Inbox,
  LogOut,
  Mail,
  Newspaper,
  Plus,
  Shield,
  Trash2,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useUniversity } from '../context/UniversityContext';
import { IMAGE_OPTIONS } from '../lib/media';
import {
  ContactSubmission,
  Course,
  NewsletterSubscriber,
} from '../types/university';

type AdminTab =
  | 'courses'
  | 'news'
  | 'events'
  | 'content'
  | 'submissions'
  | 'subscribers';

export const AdminDashboardPage: React.FC = () => {
  const {
    user,
    authLoading,
    signInWithGoogle,
    signOutUser,
    getIdToken,
    courses,
    departments,
    news,
    events,
    settings,
    refreshData,
  } = useUniversity();

  const [activeTab, setActiveTab] = useState<AdminTab>('courses');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminFeedback, setAdminFeedback] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Course Form State (Add / Edit)
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [courseForm, setCourseForm] = useState({
    code: '',
    title: '',
    departmentId: '',
    qualificationLevel: 'Undergraduate',
    duration: '4 Years',
    studyMode: 'Full-time',
    credits: '240 ECTS',
    summary: '',
    overview: '',
    entryRequirements: '',
    careerOpportunities: '',
    tuitionFee: '€7,950 / year',
    imageUrl: IMAGE_OPTIONS[2].value,
    featured: false,
  });

  // News Form State
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'University News',
    author: 'Communications Office',
    publishedDate: new Date().toLocaleDateString('en-IE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    readTime: '4 min read',
    summary: '',
    content: '',
    imageUrl: IMAGE_OPTIONS[0].value,
    featured: true,
  });

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Open Day',
    eventDate: '15 February 2027',
    startTime: '14:00',
    endTime: '17:00',
    location: 'O’Reilly Science Pavilion',
    description: '',
    imageUrl: IMAGE_OPTIONS[5].value,
    featured: true,
  });

  // Website Content Form State
  const [contentForm, setContentForm] = useState<Record<string, string>>({});

  useEffect(() => {
    setContentForm({ ...settings });
  }, [settings]);

  const authorizedFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = await getIdToken();
      if (!token) throw new Error('Authentication session expired. Please sign in.');
      const res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Administrative request failed.');
      }
      return data;
    },
    [getIdToken]
  );

  const loadAdminRecords = useCallback(async () => {
    if (!user) return;
    try {
      const [contactData, subscriberData] = await Promise.all([
        authorizedFetch('/api/admin/contacts'),
        authorizedFetch('/api/admin/subscribers'),
      ]);
      setContacts(contactData);
      setSubscribers(subscriberData);
    } catch (err: any) {
      setAdminError(err.message);
    }
  }, [user, authorizedFetch]);

  useEffect(() => {
    if (user) {
      loadAdminRecords();
    }
  }, [user, loadAdminRecords]);

  const notify = (msg: string) => {
    setAdminError(null);
    setAdminFeedback(msg);
    setTimeout(() => setAdminFeedback(null), 5000);
  };

  const resetCourseForm = () => {
    setEditingCourseId(null);
    setCourseForm({
      code: '',
      title: '',
      departmentId: '',
      qualificationLevel: 'Undergraduate',
      duration: '4 Years',
      studyMode: 'Full-time',
      credits: '240 ECTS',
      summary: '',
      overview: '',
      entryRequirements: '',
      careerOpportunities: '',
      tuitionFee: '€7,950 / year',
      imageUrl: IMAGE_OPTIONS[2].value,
      featured: false,
    });
  };

  const startEditCourse = (c: Course) => {
    setEditingCourseId(c.id);
    setCourseForm({
      code: c.code,
      title: c.title,
      departmentId: c.departmentId ? String(c.departmentId) : '',
      qualificationLevel: c.qualificationLevel,
      duration: c.duration,
      studyMode: c.studyMode,
      credits: c.credits,
      summary: c.summary,
      overview: c.overview,
      entryRequirements: c.entryRequirements,
      careerOpportunities: c.careerOpportunities,
      tuitionFee: c.tuitionFee,
      imageUrl: c.imageUrl,
      featured: c.featured,
    });
    window.scrollTo({ top: 240, behavior: 'smooth' });
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAdminError(null);
    try {
      if (editingCourseId) {
        await authorizedFetch(`/api/admin/courses/${editingCourseId}`, {
          method: 'PUT',
          body: JSON.stringify(courseForm),
        });
        notify('Course updated in database.');
      } else {
        await authorizedFetch('/api/admin/courses', {
          method: 'POST',
          body: JSON.stringify(courseForm),
        });
        notify('New course added to catalogue.');
      }
      resetCourseForm();
      await refreshData();
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    setBusy(true);
    setAdminError(null);
    try {
      await authorizedFetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      notify('Course removed from catalogue.');
      await refreshData();
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handlePublishNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAdminError(null);
    try {
      await authorizedFetch('/api/admin/news', {
        method: 'POST',
        body: JSON.stringify(newsForm),
      });
      setNewsForm((prev) => ({ ...prev, title: '', summary: '', content: '' }));
      notify('News article published.');
      await refreshData();
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    setBusy(true);
    try {
      await authorizedFetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      notify('Article deleted.');
      await refreshData();
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAdminError(null);
    try {
      await authorizedFetch('/api/admin/events', {
        method: 'POST',
        body: JSON.stringify(eventForm),
      });
      setEventForm((prev) => ({ ...prev, title: '', description: '' }));
      notify('Campus event scheduled.');
      await refreshData();
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    setBusy(true);
    try {
      await authorizedFetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      notify('Event removed.');
      await refreshData();
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAdminError(null);
    try {
      await authorizedFetch('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(contentForm),
      });
      notify('Homepage content and statistics updated.');
      await refreshData();
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await authorizedFetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      await loadAdminRecords();
      notify('Enquiry status updated.');
    } catch (err: any) {
      setAdminError(err.message);
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-sm text-[#29212A]/75">Checking administrator session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <PageHeader
          breadcrumbs={[{ label: 'Administrator Portal' }]}
          kicker="Authorised Staff Access"
          title="University Administrator Dashboard"
          description="Sign in with your verified Google institutional account to manage courses, publish news, schedule events, and review enquiries."
        />
        <section className="py-20 bg-white">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-[#FCEEF3] rounded-2xl border border-[#F8DCE8] p-8 text-center shadow-xs">
              <Shield className="w-10 h-10 text-[#B94D79] mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-semibold text-[#29212A] mb-2">
                Staff Authentication Required
              </h2>
              <p className="text-sm text-[#29212A]/75 mb-6 leading-relaxed">
                Access to course editing, news publication, and student enquiries is protected by Firebase Authentication and PostgreSQL role verification.
              </p>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                  } catch (err: any) {
                    setAdminError(err.message || 'Sign-in cancelled or failed.');
                  }
                }}
                className="w-full px-5 py-3.5 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold transition-colors"
              >
                Sign in with Google
              </button>
              {adminError && (
                <p className="mt-4 text-xs text-[#29212A] bg-white p-2.5 rounded-lg border border-[#D99BB5]">
                  {adminError}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Administrator Dashboard' }]}
        kicker={`Signed in as ${user.email}`}
        title="University Content & Records Management"
        description="Add or update courses, publish university news, manage campus events, customise homepage highlights, and respond to contact enquiries."
      />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Action & Tabs Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#F8DCE8]">
            <div
              role="tablist"
              aria-label="Admin sections"
              className="flex flex-wrap gap-1.5 bg-[#FCEEF3] p-1.5 rounded-xl border border-[#F8DCE8]"
            >
              {[
                { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
                { id: 'news', label: `News (${news.length})`, icon: Newspaper },
                { id: 'events', label: `Events (${events.length})`, icon: Calendar },
                { id: 'content', label: 'Website Content', icon: Globe },
                { id: 'submissions', label: `Enquiries (${contacts.length})`, icon: Inbox },
                { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Mail },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#B94D79] text-white'
                        : 'text-[#29212A] hover:bg-white/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={signOutUser}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-xs font-medium text-[#29212A] whitespace-nowrap self-start lg:self-auto"
            >
              <LogOut className="w-3.5 h-3.5 text-[#B94D79]" />
              <span>Sign Out</span>
            </button>
          </div>

          {adminFeedback && (
            <div
              role="status"
              className="mb-6 p-4 rounded-xl bg-[#FCEEF3] border border-[#B94D79] flex items-center gap-2.5 text-sm text-[#29212A]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#B94D79] shrink-0" />
              <span>{adminFeedback}</span>
            </div>
          )}

          {adminError && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-xl bg-[#29212A] text-white text-sm"
            >
              {adminError}
            </div>
          )}

          {/* TAB 1: COURSES */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form
                onSubmit={handleSaveCourse}
                className="lg:col-span-5 bg-[#FCEEF3]/60 rounded-2xl border border-[#F8DCE8] p-6 space-y-4 h-fit"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold text-[#29212A]">
                    {editingCourseId ? 'Edit Course' : 'Add New Course'}
                  </h2>
                  {editingCourseId && (
                    <button
                      type="button"
                      onClick={resetCourseForm}
                      className="text-xs font-medium text-[#B94D79] hover:underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Code *</label>
                    <input
                      required
                      value={courseForm.code}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, code: e.target.value })
                      }
                      placeholder="AU-CS204"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Level *</label>
                    <select
                      value={courseForm.qualificationLevel}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          qualificationLevel: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    >
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Doctoral">Doctoral</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Course Title *</label>
                  <input
                    required
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, title: e.target.value })
                    }
                    placeholder="BSc (Hons) Robotics & Autonomous Systems"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Department</label>
                  <select
                    value={courseForm.departmentId}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, departmentId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  >
                    <option value="">Select School</option>
                    {departments.map((d) => (
                      <option key={d.id} value={String(d.id)}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Duration</label>
                    <input
                      value={courseForm.duration}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, duration: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Mode</label>
                    <input
                      value={courseForm.studyMode}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, studyMode: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Credits</label>
                    <input
                      value={courseForm.credits}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, credits: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Campus Photograph</label>
                  <select
                    value={courseForm.imageUrl}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, imageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  >
                    {IMAGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Short Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={courseForm.summary}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, summary: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Entry Requirements</label>
                  <textarea
                    rows={2}
                    value={courseForm.entryRequirements}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        entryRequirements: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Career Opportunities</label>
                  <textarea
                    rows={2}
                    value={courseForm.careerOpportunities}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        careerOpportunities: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={courseForm.featured}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, featured: e.target.checked })
                    }
                    className="accent-[#B94D79]"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold disabled:opacity-60"
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingCourseId ? 'Update Course' : 'Add Course'}</span>
                </button>
              </form>

              <div className="lg:col-span-7 space-y-3">
                {courses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl border border-[#F8DCE8] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs text-[#B94D79] font-medium">
                        {c.code} · {c.qualificationLevel} · {c.duration}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-[#29212A]">
                        {c.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => startEditCourse(c)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-xs font-medium"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#B94D79]" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(c.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F8DCE8] hover:bg-[#29212A] hover:text-white text-xs font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: NEWS */}
          {activeTab === 'news' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form
                onSubmit={handlePublishNews}
                className="lg:col-span-5 bg-[#FCEEF3]/60 rounded-2xl border border-[#F8DCE8] p-6 space-y-4 h-fit"
              >
                <h2 className="font-serif text-xl font-semibold text-[#29212A]">
                  Publish News Article
                </h2>
                <div>
                  <label className="block text-xs font-medium mb-1">Headline *</label>
                  <input
                    required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Category</label>
                    <input
                      value={newsForm.category}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Author</label>
                    <input
                      value={newsForm.author}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, author: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Image</label>
                  <select
                    value={newsForm.imageUrl}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, imageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  >
                    {IMAGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={newsForm.summary}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, summary: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Full Article Body *</label>
                  <textarea
                    required
                    rows={5}
                    value={newsForm.content}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, content: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold"
                >
                  Publish Article
                </button>
              </form>

              <div className="lg:col-span-7 space-y-3">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-[#F8DCE8] p-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs text-[#B94D79] font-medium">
                        {item.category} · {item.publishedDate}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-[#29212A]">
                        {item.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteNews(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F8DCE8] hover:bg-[#29212A] hover:text-white text-xs font-medium shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form
                onSubmit={handleAddEvent}
                className="lg:col-span-5 bg-[#FCEEF3]/60 rounded-2xl border border-[#F8DCE8] p-6 space-y-4 h-fit"
              >
                <h2 className="font-serif text-xl font-semibold text-[#29212A]">
                  Schedule Campus Event
                </h2>
                <div>
                  <label className="block text-xs font-medium mb-1">Event Title *</label>
                  <input
                    required
                    value={eventForm.title}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Category</label>
                    <input
                      value={eventForm.category}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Date *</label>
                    <input
                      required
                      value={eventForm.eventDate}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, eventDate: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Start Time</label>
                    <input
                      value={eventForm.startTime}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, startTime: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">End Time</label>
                    <input
                      value={eventForm.endTime}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, endTime: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Location *</label>
                  <input
                    required
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, location: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={eventForm.description}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold"
                >
                  Create Event
                </button>
              </form>

              <div className="lg:col-span-7 space-y-3">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white rounded-xl border border-[#F8DCE8] p-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs text-[#B94D79] font-medium">
                        {ev.eventDate} · {ev.startTime}–{ev.endTime} · {ev.location}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-[#29212A]">
                        {ev.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F8DCE8] hover:bg-[#29212A] hover:text-white text-xs font-medium shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WEBSITE CONTENT */}
          {activeTab === 'content' && (
            <form
              onSubmit={handleSaveSettings}
              className="max-w-3xl bg-[#FCEEF3]/60 rounded-2xl border border-[#F8DCE8] p-7 space-y-5"
            >
              <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
                Update Homepage Copy & University Statistics
              </h2>

              <div>
                <label className="block text-xs font-medium mb-1">Hero Heading</label>
                <input
                  value={contentForm.hero_heading || ''}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, hero_heading: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Hero Supporting Text</label>
                <textarea
                  rows={2}
                  value={contentForm.hero_subtitle || ''}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, hero_subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Welcome Section Heading</label>
                <input
                  value={contentForm.welcome_heading || ''}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, welcome_heading: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Welcome Description</label>
                <textarea
                  rows={3}
                  value={contentForm.welcome_body || ''}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, welcome_body: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D99BB5]/60 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Total Students</label>
                  <input
                    value={contentForm.stat_total_students || ''}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        stat_total_students: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Number of Courses</label>
                  <input
                    value={contentForm.stat_total_courses || ''}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        stat_total_courses: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Departments</label>
                  <input
                    value={contentForm.stat_departments || ''}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        stat_departments: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">International %</label>
                  <input
                    value={contentForm.stat_international_students || ''}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        stat_international_students: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D99BB5]/60 text-sm tabular-nums"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="px-6 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold"
              >
                Save Website Content
              </button>
            </form>
          )}

          {/* TAB 5: CONTACT SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-[#FCEEF3]/50 border border-[#F8DCE8]">
                  <p className="text-sm text-[#29212A]/75">
                    No contact enquiries have been submitted yet.
                  </p>
                </div>
              ) : (
                contacts.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white rounded-xl border border-[#F8DCE8] p-6 flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <p className="text-xs text-[#B94D79] font-medium">
                        {sub.department} · {sub.status}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-[#29212A]">
                        {sub.subject}
                      </h3>
                      <p className="text-xs text-[#29212A]/70">
                        From: {sub.fullName} ({sub.email}
                        {sub.phone ? ` · ${sub.phone}` : ''})
                      </p>
                      <p className="text-sm text-[#29212A]/85 pt-2 leading-relaxed">
                        {sub.message}
                      </p>
                    </div>
                    <select
                      aria-label="Update enquiry status"
                      value={sub.status}
                      onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                      className="px-3 py-2 rounded-lg border border-[#D99BB5] text-xs font-medium bg-[#FCEEF3]/40 shrink-0"
                    >
                      <option value="New">New</option>
                      <option value="In Review">In Review</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 6: NEWSLETTER SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-2xl border border-[#F8DCE8] overflow-hidden">
              {subscribers.length === 0 ? (
                <p className="p-10 text-center text-sm text-[#29212A]/75">
                  No newsletter subscribers recorded yet.
                </p>
              ) : (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#F8DCE8] bg-[#FCEEF3]/60 text-xs uppercase tracking-wider text-[#B94D79]">
                      <th className="py-3.5 px-6 font-semibold">Email Address</th>
                      <th className="py-3.5 px-6 font-semibold">Subscribed On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FCEEF3]">
                    {subscribers.map((sub) => (
                      <tr key={sub.id}>
                        <td className="py-3.5 px-6 font-medium">{sub.email}</td>
                        <td className="py-3.5 px-6 text-[#29212A]/70 tabular-nums">
                          {new Date(sub.subscribedAt).toLocaleDateString('en-IE')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
