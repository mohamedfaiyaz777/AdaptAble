import React from 'react';

interface AdaptAbleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AdaptAbleLogo: React.FC<AdaptAbleLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem]',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 border border-indigo-400/40 flex items-center justify-center shadow-md shadow-indigo-600/20 text-white shrink-0 relative overflow-hidden group ${className}`}
    >
      {/* Decorative ambient sheen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none" />

      {/* Modern AdaptAble Bridge & Ribbon Icon */}
      <svg
        className={`${iconSizes[size]} text-white relative z-10 transition-transform group-hover:scale-105 duration-300`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Adaptive 'A' Arc */}
        <path
          d="M20 6L33 33H26.2L20 19.5L13.8 33H7L20 6Z"
          fill="currentColor"
        />
        {/* Connecting Inclusion Bridge */}
        <path
          d="M12.5 24C12.5 19.8579 15.8579 16.5 20 16.5C24.1421 16.5 27.5 19.8579 27.5 24H23.5C23.5 22.067 21.933 20.5 20 20.5C18.067 20.5 16.5 22.067 16.5 24H12.5Z"
          fill="#A5B4FC"
        />
        {/* Illuminating Pulse Core */}
        <circle cx="20" cy="11.5" r="2.5" fill="#E0E7FF" />
      </svg>
    </div>
  );
};
