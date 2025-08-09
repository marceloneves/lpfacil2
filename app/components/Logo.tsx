'use client';

import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  linkToHome?: boolean;
  textColor?: string;
}

const Logo = ({ 
  className = '', 
  size = 'md', 
  linkToHome = true,
  textColor = 'text-gray-900'
}: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const logoElement = (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo SVG */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#logoGradient)"
            className="drop-shadow-lg"
          />
          
          {/* LP Letter Design */}
          <g transform="translate(8, 10)">
            {/* Letter L */}
            <path
              d="M2 2 L2 18 L8 18 L8 15 L5 15 L5 2 Z"
              fill="white"
              className="drop-shadow-sm"
            />
            
            {/* Letter P */}
            <path
              d="M12 2 L12 18 L15 18 L15 11 L18 11 C20.2 11 22 9.2 22 7 L22 6 C22 3.8 20.2 2 18 2 L12 2 Z M15 5 L18 5 C18.6 5 19 5.4 19 6 L19 7 C19 7.6 18.6 8 18 8 L15 8 L15 5 Z"
              fill="white"
              className="drop-shadow-sm"
            />
          </g>
          
          {/* Modern Accent Elements */}
          <circle cx="32" cy="8" r="2" fill="url(#secondaryGradient)" opacity="0.8" />
          <circle cx="8" cy="32" r="1.5" fill="url(#secondaryGradient)" opacity="0.6" />
          
          {/* Subtle Highlight */}
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizeClasses[size]} ${textColor} leading-none`}>
          LPFácil
        </span>
        <span className={`text-xs ${textColor === 'text-white' ? 'text-blue-100' : 'text-gray-500'} font-medium leading-none tracking-wide`}>
          LANDING PAGES
        </span>
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="group transition-transform hover:scale-105">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
};

export default Logo;
