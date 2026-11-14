import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { resolveMedia } from '../lib/media';

interface UniversityImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export const UniversityImage: React.FC<UniversityImageProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  const resolved = resolveMedia(src);

  if (failed || !resolved) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FCEEF3] via-[#F8DCE8] to-[#F5F5F5] text-[#B94D79] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="w-8 h-8 mb-2 opacity-70" />
        <span className="text-xs font-medium text-[#29212A]/75 max-w-[20ch]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
