import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
} from 'lucide-react';
import { Course } from '../types/university';
import { useUniversity } from '../context/UniversityContext';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { courses } = useUniversity();
  const [course, setCourse] = useState<Course | null>(() =>
    courses.find((c) => c.slug === slug) ?? null
  );
  const [loading, setLoading] = useState(!course);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const matched = courses.find((c) => c.slug === slug);
    if (matched) {
      setCourse(matched);
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadCourse() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/courses/${encodeURIComponent(slug || '')}`);
        if (!res.ok) {
          throw new Error('Programme not found');
        }
        const data = await res.json();
        if (!cancelled) setCourse(data);
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Unable to load course');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadCourse();
    return () => {
      cancelled = true;
    };
  }, [slug, courses]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="h-10 w-2/3 bg-[#FCEEF3] rounded animate-pulse mb-6" />
        <div className="h-80 bg-[#FCEEF3]/60 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#29212A] mb-3">
          Course Not Found
        </h1>
        <p className="text-base text-[#29212A]/75 mb-6">
          {error || 'The requested academic programme could not be located.'}
        </p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B94D79] text-white text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Course Catalogue</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Courses', to: '/courses' },
          { label: course.title },
        ]}
        kicker={`${course.qualificationLevel} · ${course.code} · ${course.duration}`}
        title={course.title}
        description={course.summary}
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Curriculum Content */}
          <div className="lg:col-span-8 space-y-10">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#F8DCE8]">
              <UniversityImage
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29212A] mb-4">
                Programme Overview
              </h2>
              <p className="text-base text-[#29212A]/85 leading-relaxed whitespace-pre-line">
                {course.overview}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#FCEEF3] border border-[#F8DCE8]">
              <div className="flex items-center gap-2.5 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#B94D79]" />
                <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
                  Entry Requirements
                </h2>
              </div>
              <p className="text-base text-[#29212A]/85 leading-relaxed">
                {course.entryRequirements}
              </p>
              <Link
                to="/entry-requirements"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
              >
                <span>View Full International Equivalencies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <Briefcase className="w-5 h-5 text-[#B94D79]" />
                <h2 className="font-serif text-2xl font-semibold text-[#29212A]">
                  Career Opportunities
                </h2>
              </div>
              <p className="text-base text-[#29212A]/85 leading-relaxed">
                {course.careerOpportunities}
              </p>
            </div>
          </div>

          {/* Sticky Programme Key Facts Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#F8DCE8] p-6 shadow-xs">
              <h3 className="font-serif text-xl font-semibold text-[#29212A] pb-3 mb-4 border-b border-[#F8DCE8]">
                Programme Key Facts
              </h3>

              <dl className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#29212A]/65 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#B94D79]" />
                    <span>Qualification</span>
                  </dt>
                  <dd className="font-semibold text-[#29212A] text-right">
                    {course.qualificationLevel}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#29212A]/65 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B94D79]" />
                    <span>Duration</span>
                  </dt>
                  <dd className="font-semibold text-[#29212A] text-right tabular-nums">
                    {course.duration} ({course.studyMode})
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#29212A]/65 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#B94D79]" />
                    <span>Credits</span>
                  </dt>
                  <dd className="font-semibold text-[#29212A] text-right tabular-nums">
                    {course.credits}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#FCEEF3]">
                  <dt className="text-xs text-[#29212A]/65 mb-1">Academic School</dt>
                  <dd className="font-medium text-[#29212A]">
                    {course.department?.name || 'Aurelia University Faculty'}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#FCEEF3]">
                  <dt className="text-xs text-[#29212A]/65 mb-1">Annual Tuition</dt>
                  <dd className="font-medium text-[#29212A] tabular-nums">
                    {course.tuitionFee}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-3">
                <Link
                  to="/admissions"
                  className="block w-full text-center px-5 py-3 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-semibold transition-colors"
                >
                  Apply for This Programme
                </Link>
                <Link
                  to="/contact"
                  className="block w-full text-center px-5 py-3 rounded-lg border border-[#D99BB5] hover:bg-[#FCEEF3] text-[#29212A] text-sm font-medium transition-colors"
                >
                  Speak With Admissions
                </Link>
              </div>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#B94D79] hover:text-[#9C3A62]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Courses</span>
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
};
