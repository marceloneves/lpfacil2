'use client';

import { useState } from 'react';
import { LandingPageSection } from '@/lib/types/editor';

interface EditableHeroSectionProps {
  section: LandingPageSection;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: any) => void;
  onCancel: () => void;
}

export default function EditableHeroSection({ 
  section, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}: EditableHeroSectionProps) {
  const [localContent, setLocalContent] = useState(section.content);

  const handleSave = () => {
    onSave(localContent);
  };

  const handleCancel = () => {
    setLocalContent(section.content);
    onCancel();
  };

  if (isEditing) {
    return (
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 border-4 border-dashed border-blue-400">
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Salvar
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Principal
              </label>
              <input
                type="text"
                value={localContent.title || ''}
                onChange={(e) => setLocalContent({ ...localContent, title: e.target.value })}
                className="w-full max-w-4xl mx-auto px-4 py-3 text-4xl font-bold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título da Hero Section"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <textarea
                value={localContent.subtitle || ''}
                onChange={(e) => setLocalContent({ ...localContent, subtitle: e.target.value })}
                className="w-full max-w-3xl mx-auto px-4 py-3 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subtítulo da Hero Section"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto do Botão
              </label>
              <input
                type="text"
                value={localContent.buttonText || ''}
                onChange={(e) => setLocalContent({ ...localContent, buttonText: e.target.value })}
                className="w-full max-w-xs mx-auto px-4 py-3 text-lg font-semibold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Texto do Botão"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL da Imagem (opcional)
              </label>
              <input
                type="url"
                value={localContent.image || ''}
                onChange={(e) => setLocalContent({ ...localContent, image: e.target.value })}
                className="w-full max-w-md mx-auto px-4 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 cursor-pointer hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 transition-all group"
      onClick={onEdit}
    >
      {/* Overlay de edição */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Clique para editar
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            {section.content.title || 'Título da Hero Section'}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {section.content.subtitle || 'Subtítulo da Hero Section'}
          </p>
          {section.content.buttonText && (
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              {section.content.buttonText}
            </button>
          )}
          {section.content.image && (
            <div className="mt-12">
              <img
                src={section.content.image}
                alt="Hero"
                className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
