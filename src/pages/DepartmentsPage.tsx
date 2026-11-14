import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Users } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { UniversityImage } from '../components/UniversityImage';
import { useUniversity } from '../context/UniversityContext';

export const DepartmentsPage: React.FC = () => {
  const { departments, courses, loading, error, refreshData } = useUniversity();

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Academic Departments' }]}
        kicker="Eight Interdisciplinary Schools"
        title="Academic Departments & Schools"
        description="Explore the academic schools that shape teaching, research, and professional accreditation at Aurelia University Dublin."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-72 rounded-2xl bg-[#FCEEF3]/60 border border-[#F8DCE8] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.map((dept) => {
                const deptCourseCount = courses.filter(
                  (c) => c.departmentId === dept.id
                ).length;

                return (
                  <article
                    key={dept.id}
                    className="bg-white rounded-2xl border border-[#F8DCE8] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto bg-[#FCEEF3]">
                      <UniversityImage
                        src={dept.imageUrl}
                        alt={dept.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[#B94D79] mb-1.5">
                          School Code: {dept.facultyCode} ·{' '}
                          <span className="tabular-nums">{deptCourseCount}</span>{' '}
                          {deptCourseCount === 1 ? 'Course' : 'Courses'}
                        </p>
                        <h2 className="font-serif text-xl font-semibold text-[#29212A] leading-snug mb-2">
                          {dept.name}
                        </h2>
                        <p className="text-sm text-[#29212A]/75 leading-relaxed mb-4">
                          {dept.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-4 border-t border-[#FCEEF3] text-xs text-[#29212A]/75">
                        <p className="font-medium text-[#29212A]">
                          Head of School: {dept.headOfDepartment}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#B94D79] shrink-0" />
                          <span className="tabular-nums">{dept.facultyCount} Faculty Members</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B94D79] shrink-0" />
                          <span>{dept.location}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#B94D79] shrink-0" />
                          <span>{dept.email}</span>
                        </p>
                        <div className="pt-2">
                          <Link
                            to={`/courses?department=${dept.id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62]"
                          >
                            <span>View School Courses</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
