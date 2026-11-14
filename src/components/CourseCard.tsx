import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Course } from '../types/university';
import { UniversityImage } from './UniversityImage';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <article className="group bg-white rounded-xl border border-[#F8DCE8] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
      <Link to={`/courses/${course.slug}`} className="block aspect-[4/3] overflow-hidden bg-[#FCEEF3]">
        <UniversityImage
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#B94D79] font-medium mb-2.5">
          <span>{course.qualificationLevel}</span>
          <span aria-hidden="true">·</span>
          <span>{course.duration}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums text-[#29212A]/65">{course.code}</span>
        </div>

        <h3 className="font-serif text-xl font-semibold text-[#29212A] leading-snug mb-2.5 group-hover:text-[#B94D79] transition-colors">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>

        <p className="text-sm text-[#29212A]/75 leading-relaxed line-clamp-3 mb-5 flex-1">
          {course.summary}
        </p>

        <div className="pt-4 border-t border-[#FCEEF3] flex items-center justify-between gap-3">
          <span className="text-xs text-[#29212A]/60 truncate">
            {course.department?.name || 'Aurelia Academic School'}
          </span>
          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B94D79] hover:text-[#9C3A62] whitespace-nowrap shrink-0"
          >
            <span>View Course</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
