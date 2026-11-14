import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { CourseCard } from '../components/CourseCard';
import { useUniversity } from '../context/UniversityContext';

const QUALIFICATION_LEVELS = [
  'All',
  'Undergraduate',
  'Postgraduate',
  'Doctoral',
];

export const CoursesPage: React.FC = () => {
  const { courses, departments, loading, error, refreshData } = useUniversity();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [selectedLevel, setSelectedLevel] = useState(
    () => searchParams.get('level') || 'All'
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    () => searchParams.get('department') || 'all'
  );

  useEffect(() => {
    const q = searchParams.get('q');
    const level = searchParams.get('level');
    const dept = searchParams.get('department');
    if (q !== null) setQuery(q);
    if (level) setSelectedLevel(level);
    if (dept) setSelectedDepartment(dept);
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesLevel =
        selectedLevel === 'All' ||
        course.qualificationLevel.toLowerCase() === selectedLevel.toLowerCase();

      const matchesDepartment =
        selectedDepartment === 'all' ||
        String(course.departmentId) === selectedDepartment;

      const trimmed = query.trim().toLowerCase();
      const matchesQuery =
        !trimmed ||
        course.title.toLowerCase().includes(trimmed) ||
        course.code.toLowerCase().includes(trimmed) ||
        course.summary.toLowerCase().includes(trimmed) ||
        course.department?.name.toLowerCase().includes(trimmed);

      return matchesLevel && matchesDepartment && matchesQuery;
    });
  }, [courses, selectedLevel, selectedDepartment, query]);

  const resetFilters = () => {
    setQuery('');
    setSelectedLevel('All');
    setSelectedDepartment('all');
    setSearchParams({});
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Course Catalogue' }]}
        kicker="2026–2027 Prospectus"
        title="Course Catalogue"
        description="Search and filter accredited undergraduate, postgraduate, and doctoral programmes across all eight Aurelia University schools."
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Controls Bar */}
          <div className="bg-[#FCEEF3] rounded-2xl border border-[#F8DCE8] p-5 sm:p-6 mb-10 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6 relative">
                <Search className="w-4 h-4 text-[#B94D79] absolute left-4 top-1/2 -translate-y-1/2" />
                <label htmlFor="course-search" className="sr-only">
                  Search courses
                </label>
                <input
                  id="course-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by course title, code (e.g. AU-CS101), or subject..."
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white border border-[#D99BB5]/60 text-sm text-[#29212A] placeholder:text-[#29212A]/50 focus:outline-none focus:border-[#B94D79]"
                />
              </div>

              <div className="lg:col-span-4">
                <label htmlFor="department-filter" className="sr-only">
                  Filter by academic department
                </label>
                <select
                  id="department-filter"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#D99BB5]/60 text-sm text-[#29212A] focus:outline-none focus:border-[#B94D79]"
                >
                  <option value="all">All Academic Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={String(dept.id)}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2 flex items-center">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white hover:bg-[#F8DCE8]/60 border border-[#D99BB5] text-sm font-medium text-[#29212A] transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-[#B94D79]" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#F8DCE8]">
              <div
                role="tablist"
                aria-label="Filter by qualification level"
                className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-lg border border-[#F8DCE8]"
              >
                {QUALIFICATION_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    role="tab"
                    aria-selected={selectedLevel === level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedLevel === level
                        ? 'bg-[#B94D79] text-white'
                        : 'text-[#29212A]/75 hover:bg-[#FCEEF3]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <p className="text-sm text-[#29212A]/75 tabular-nums">
                Showing <span className="font-semibold text-[#29212A]">{filteredCourses.length}</span>{' '}
                of {courses.length} programmes
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-[#FCEEF3] rounded-xl border border-[#D99BB5] p-6 text-center mb-8">
              <p className="text-sm text-[#29212A] mb-3">{error}</p>
              <button
                type="button"
                onClick={refreshData}
                className="px-4 py-2 rounded-lg bg-[#B94D79] text-white text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-xl bg-[#FCEEF3]/60 border border-[#F8DCE8] animate-pulse"
                />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-[#FCEEF3]/50 border border-[#F8DCE8]">
              <h2 className="font-serif text-2xl font-semibold text-[#29212A] mb-2">
                No Matching Programmes Found
              </h2>
              <p className="text-sm text-[#29212A]/75 max-w-md mx-auto mb-6">
                Try clearing one of your subject or qualification filters to view all available courses.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-lg bg-[#B94D79] hover:bg-[#9C3A62] text-white text-sm font-medium transition-colors"
              >
                Show All Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
