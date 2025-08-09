'use client';

import { LandingPageSection } from '@/lib/types/editor';
import { useState } from 'react';

interface FAQSectionProps {
  section: LandingPageSection;
}

export default function FAQSection({ section }: FAQSectionProps) {
  const { content } = section;
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
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

      {/* FAQ Items */}
      {content.items && (
        <div className="space-y-4">
          {content.items.map((item, index) => {
            const itemId = item.id || index.toString();
            const isOpen = openItems.has(itemId);
            
            return (
              <div
                key={itemId}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(itemId)}
                >
                  <span className="font-semibold text-gray-900">
                    {item.title}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {item.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
