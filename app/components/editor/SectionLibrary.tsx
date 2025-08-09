'use client';

import { useState } from 'react';
import { sectionTemplates, sectionCategories } from '@/lib/sections/templates';

interface SectionLibraryProps {
  onAddSection: (templateId: string) => void;
}

export default function SectionLibrary({ onAddSection }: SectionLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('Hero');

  const filteredTemplates = sectionTemplates.filter(
    template => template.category === selectedCategory
  );

  return (
    <div className="h-full flex flex-col">
      {/* Categories */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categorias</h3>
        <div className="space-y-1">
          {sectionCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-900">
          {selectedCategory}
        </h3>
        
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
              onClick={() => onAddSection(template.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg group-hover:bg-blue-50 transition-colors">
                    {template.thumbnail}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>
              
              {/* Add button overlay */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full text-xs bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Adicionar Seção
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4M6 13h2m6 0h2" />
            </svg>
            <p className="text-sm">Nenhum template encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
