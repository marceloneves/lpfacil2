'use client';

import { LandingPageSection } from '@/lib/types/editor';
// import Image from 'next/image';

interface HeroSectionProps {
  section: LandingPageSection;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const { content } = section;
  
  // Determinar se é hero dividido baseado no ID do template
  const isSplitHero = section.id.includes('split');

  if (isSplitHero) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px]">
        {/* Conteúdo de texto */}
        <div className="space-y-6">
          {content.subtitle && (
            <p className="text-lg font-medium opacity-90">
              {content.subtitle}
            </p>
          )}
          {content.title && (
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {content.title}
            </h1>
          )}
          {content.description && (
            <p className="text-xl opacity-80 leading-relaxed">
              {content.description}
            </p>
          )}
          {content.buttonText && (
            <div className="pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2">
                <span>{content.buttonText}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Imagem */}
        <div className="relative">
          {content.image && (
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={content.image}
                alt={content.title || 'Hero image'}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Hero centralizado
  return (
    <div className="text-center max-w-4xl mx-auto space-y-8 min-h-[600px] flex flex-col justify-center">
      {content.subtitle && (
        <p className="text-xl font-medium opacity-90">
          {content.subtitle}
        </p>
      )}
      
      {content.title && (
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
          {content.title}
        </h1>
      )}
      
      {content.description && (
        <p className="text-xl lg:text-2xl opacity-80 leading-relaxed max-w-3xl mx-auto">
          {content.description}
        </p>
      )}
      
      {content.buttonText && (
        <div className="pt-6">
          <button className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-5 rounded-lg text-xl font-bold transition-colors inline-flex items-center space-x-3 shadow-lg">
            <span>{content.buttonText}</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      )}

      {content.image && (
        <div className="pt-8">
          <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-2xl">
            <img
              src={content.image}
              alt={content.title || 'Hero image'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
