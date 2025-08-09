'use client';

import { useState } from 'react';
import { LandingPageSection } from '@/lib/types/editor';

interface EditableFeaturesSectionProps {
  section: LandingPageSection;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (content: any) => void;
  onCancel: () => void;
}

export default function EditableFeaturesSection({ 
  section, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}: EditableFeaturesSectionProps) {
  const [localContent, setLocalContent] = useState(section.content);

  const handleSave = () => {
    onSave(localContent);
  };

  const handleCancel = () => {
    setLocalContent(section.content);
    onCancel();
  };

  const addFeature = () => {
    const newItems = [...(localContent.items || []), {
      title: 'Nova Feature',
      description: 'Descrição da feature',
      icon: '⭐'
    }];
    setLocalContent({ ...localContent, items: newItems });
  };

  const removeFeature = (index: number) => {
    const newItems = localContent.items?.filter((_: any, i: number) => i !== index) || [];
    setLocalContent({ ...localContent, items: newItems });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newItems = [...(localContent.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    setLocalContent({ ...localContent, items: newItems });
  };

  if (isEditing) {
    return (
      <div className="relative py-20 bg-white border-4 border-dashed border-green-400">
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
          <div className="text-center mb-12">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título da Seção
            </label>
            <input
              type="text"
              value={localContent.title || ''}
              onChange={(e) => setLocalContent({ ...localContent, title: e.target.value })}
              className="w-full max-w-2xl mx-auto px-4 py-3 text-3xl font-bold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Título das Features"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(localContent.items || []).map((item: any, index: number) => (
              <div key={index} className="text-center border border-gray-200 rounded-lg p-4">
                <button
                  onClick={() => removeFeature(index)}
                  className="float-right text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ícone (emoji)
                  </label>
                  <input
                    type="text"
                    value={item.icon || ''}
                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                    className="w-16 mx-auto text-center text-2xl border border-gray-300 rounded"
                    placeholder="⭐"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 text-center font-semibold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Título da Feature"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Descrição da feature"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={addFeature}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              + Adicionar Feature
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative py-20 bg-white cursor-pointer hover:ring-2 hover:ring-green-400 hover:ring-opacity-50 transition-all group"
      onClick={onEdit}
    >
      {/* Overlay de edição */}
      <div className="absolute inset-0 bg-green-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-green-600 text-white px-3 py-1 rounded text-sm">
            Clique para editar
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {section.content.title || 'Features'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(section.content.items || []).map((item: any, index: number) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{item.icon || '⭐'}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title || `Feature ${index + 1}`}
              </h3>
              <p className="text-gray-600">
                {item.description || 'Descrição da feature'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
