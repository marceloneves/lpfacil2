'use client';

import { LandingPageSection } from '@/lib/types/editor';

interface CTASectionProps {
  section: LandingPageSection;
}

export default function CTASection({ section }: CTASectionProps) {
  const { content } = section;

  return (
    <div className="text-center space-y-8 max-w-4xl mx-auto">
      {content.title && (
        <h2 className="text-4xl lg:text-6xl font-bold">
          {content.title}
        </h2>
      )}
      
      {content.subtitle && (
        <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
          {content.subtitle}
        </p>
      )}
      
      {content.buttonText && (
        <div className="pt-4">
          <button className="bg-white text-green-600 hover:bg-gray-50 px-12 py-6 rounded-xl text-xl font-bold transition-colors inline-flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105">
            <span>{content.buttonText}</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
