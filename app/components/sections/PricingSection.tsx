'use client';

import { LandingPageSection } from '@/lib/types/editor';

interface PricingSectionProps {
  section: LandingPageSection;
}

export default function PricingSection({ section }: PricingSectionProps) {
  const { content } = section;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        {content.subtitle && (
          <p className="text-lg font-medium text-blue-600">
            {content.subtitle}
          </p>
        )}
        {content.title && (
          <h2 className="text-4xl lg:text-5xl font-bold">
            {content.title}
          </h2>
        )}
      </div>

      {/* Pricing Cards */}
      {content.items && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {content.items.map((item, index) => (
            <div
              key={item.id || index}
              className={`bg-white rounded-2xl p-8 space-y-6 shadow-lg hover:shadow-xl transition-shadow relative ${
                index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                {item.icon && (
                  <div className="text-4xl mb-4">
                    {item.icon}
                  </div>
                )}
                {item.title && (
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                )}
              </div>
              
              {item.description && (
                <div className="text-gray-600 whitespace-pre-line">
                  {item.description}
                </div>
              )}
              
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                index === 1 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Escolher Plano
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
