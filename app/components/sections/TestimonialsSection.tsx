'use client';

import { LandingPageSection } from '@/lib/types/editor';
// import Image from 'next/image';

interface TestimonialsSectionProps {
  section: LandingPageSection;
}

export default function TestimonialsSection({ section }: TestimonialsSectionProps) {
  const { content } = section;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        {content.subtitle && (
          <p className="text-lg font-medium opacity-80">
            {content.subtitle}
          </p>
        )}
        {content.title && (
          <h2 className="text-4xl lg:text-5xl font-bold">
            {content.title}
          </h2>
        )}
      </div>

      {/* Testimonials */}
      {content.items && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 space-y-4 hover:bg-opacity-20 transition-all"
            >
              {item.description && (
                <p className="text-lg leading-relaxed italic">
                  "{item.description}"
                </p>
              )}
              <div className="flex items-center space-x-3">
                {item.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title || 'Customer'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  {item.title && (
                    <p className="font-semibold">
                      {item.title}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
