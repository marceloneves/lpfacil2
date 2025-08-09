'use client';

import { useState } from 'react';
import { LandingPageSection } from '@/lib/types/editor';

interface EditableCTASectionProps {
  section: LandingPageSection;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: any) => void;
  onCancel: () => void;
}

export default function EditableCTASection({ 
  section, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}: EditableCTASectionProps) {
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
      <div className="relative bg-blue-600 py-20 border-4 border-dashed border-yellow-400">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Título do CTA
            </label>
            <input
              type="text"
              value={localContent.title || ''}
              onChange={(e) => setLocalContent({ ...localContent, title: e.target.value })}
              className="w-full max-w-2xl mx-auto px-4 py-3 text-3xl font-bold text-center text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Título do Call to Action"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Subtítulo
            </label>
            <textarea
              value={localContent.subtitle || ''}
              onChange={(e) => setLocalContent({ ...localContent, subtitle: e.target.value })}
              className="w-full max-w-2xl mx-auto px-4 py-3 text-xl text-center text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Subtítulo do CTA"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Texto do Botão
            </label>
            <input
              type="text"
              value={localContent.buttonText || ''}
              onChange={(e) => setLocalContent({ ...localContent, buttonText: e.target.value })}
              className="w-full max-w-xs mx-auto px-4 py-3 text-lg font-semibold text-center text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Texto do Botão"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative bg-blue-600 py-20 cursor-pointer hover:ring-2 hover:ring-yellow-400 hover:ring-opacity-50 transition-all group"
      onClick={onEdit}
    >
      {/* Overlay de edição */}
      <div className="absolute inset-0 bg-yellow-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold">
            Clique para editar
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          {section.content.title || 'Call to Action'}
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          {section.content.subtitle || 'Subtítulo do CTA'}
        </p>
        {section.content.buttonText && (
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            {section.content.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
