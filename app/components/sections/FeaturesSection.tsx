'use client';

import { LandingPageSection } from '@/lib/types/editor';

interface FeaturesSectionProps {
  section: LandingPageSection;
}

export default function FeaturesSection({ section }: FeaturesSectionProps) {
  const { content } = section;
  const isGridLayout = section.id.includes('grid');

  if (isGridLayout) {
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

        {/* Features Grid */}
        {content.items && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.items.map((item, index) => (
              <div
                key={item.id || index}
                className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {item.icon && (
                  <div className="text-4xl mb-4">
                    {item.icon}
                  </div>
                )}
                {item.title && (
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Lista vertical
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center lg:text-left space-y-4">
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

      {/* Features List */}
      {content.items && (
        <div className="space-y-8">
          {content.items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-start space-x-6 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {item.icon && (
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                {item.title && (
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
