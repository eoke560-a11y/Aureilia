import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  breadcrumbs: { label: string; to?: string }[];
  title: string;
  description: string;
  kicker?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  description,
  kicker,
}) => {
  return (
    <section className="bg-[#FCEEF3] border-b border-[#F8DCE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#29212A]/70 mb-5">
          <Link to="/" className="hover:text-[#B94D79] transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.label}>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99BB5]" />
              {crumb.to && index < breadcrumbs.length - 1 ? (
                <Link to={crumb.to} className="hover:text-[#B94D79] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#B94D79] font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {kicker && (
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B94D79] mb-2">
            {kicker}
          </p>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#29212A] tracking-tight max-w-3xl text-balance">
          {title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#29212A]/80 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};
