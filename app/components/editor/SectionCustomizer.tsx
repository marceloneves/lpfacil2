'use client';

import { LandingPageSection } from '@/lib/types/editor';
import { useState } from 'react';

interface SectionCustomizerProps {
  section: LandingPageSection;
  onUpdate: (updates: Partial<LandingPageSection>) => void;
}

export default function SectionCustomizer({ section, onUpdate }: SectionCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: {
        ...section.content,
        [key]: value
      }
    });
  };

  const updateStyles = (key: string, value: any) => {
    onUpdate({
      styles: {
        ...section.styles,
        [key]: value
      }
    });
  };

  const updatePadding = (side: 'top' | 'bottom' | 'left' | 'right', value: number) => {
    onUpdate({
      styles: {
        ...section.styles,
        padding: {
          ...section.styles.padding,
          [side]: value
        }
      }
    });
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      title: 'Novo Item',
      description: 'Descrição do item'
    };

    onUpdate({
      content: {
        ...section.content,
        items: [...(section.content.items || []), newItem]
      }
    });
  };

  const updateItem = (itemId: string, updates: any) => {
    onUpdate({
      content: {
        ...section.content,
        items: section.content.items?.map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }
    });
  };

  const removeItem = (itemId: string) => {
    onUpdate({
      content: {
        ...section.content,
        items: section.content.items?.filter(item => item.id !== itemId)
      }
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">{section.name}</h3>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'content'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Conteúdo
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'style'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Estilo
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'content' && (
          <>
            {/* Basic Fields */}
            {section.content.title !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={section.content.title || ''}
                  onChange={(e) => updateContent('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {section.content.subtitle !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={section.content.subtitle || ''}
                  onChange={(e) => updateContent('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {section.content.description !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={section.content.description || ''}
                  onChange={(e) => updateContent('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {section.content.buttonText !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  value={section.content.buttonText || ''}
                  onChange={(e) => updateContent('buttonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {section.content.buttonLink !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link do Botão
                </label>
                <input
                  type="url"
                  value={section.content.buttonLink || ''}
                  onChange={(e) => updateContent('buttonLink', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://"
                />
              </div>
            )}

            {section.content.image !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={section.content.image || ''}
                  onChange={(e) => updateContent('image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://"
                />
              </div>
            )}

            {/* Items (for features, testimonials, etc.) */}
            {section.content.items && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Itens
                  </label>
                  <button
                    onClick={addItem}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    + Adicionar
                  </button>
                </div>
                
                <div className="space-y-4">
                  {section.content.items.map((item, index) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Item {index + 1}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                      
                      {item.title !== undefined && (
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => updateItem(item.id, { title: e.target.value })}
                          placeholder="Título do item"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      )}
                      
                      {item.description !== undefined && (
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => updateItem(item.id, { description: e.target.value })}
                          placeholder="Descrição do item"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      )}
                      
                      {item.icon !== undefined && (
                        <input
                          type="text"
                          value={item.icon || ''}
                          onChange={(e) => updateItem(item.id, { icon: e.target.value })}
                          placeholder="Ícone (emoji ou texto)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      )}
                      
                      {item.image !== undefined && (
                        <input
                          type="url"
                          value={item.image || ''}
                          onChange={(e) => updateItem(item.id, { image: e.target.value })}
                          placeholder="URL da imagem"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'style' && (
          <>
            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor de Fundo
              </label>
              <input
                type="color"
                value={section.styles.backgroundColor}
                onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor do Texto
              </label>
              <input
                type="color"
                value={section.styles.textColor}
                onChange={(e) => updateStyles('textColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alinhamento
              </label>
              <select
                value={section.styles.alignment}
                onChange={(e) => updateStyles('alignment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
              </select>
            </div>

            {/* Padding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Espaçamento (px)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Topo</label>
                  <input
                    type="number"
                    value={section.styles.padding.top}
                    onChange={(e) => updatePadding('top', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Base</label>
                  <input
                    type="number"
                    value={section.styles.padding.bottom}
                    onChange={(e) => updatePadding('bottom', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Esquerda</label>
                  <input
                    type="number"
                    value={section.styles.padding.left}
                    onChange={(e) => updatePadding('left', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Direita</label>
                  <input
                    type="number"
                    value={section.styles.padding.right}
                    onChange={(e) => updatePadding('right', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Shadow */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Sombra
              </label>
              <button
                onClick={() => updateStyles('shadow', !section.styles.shadow)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  section.styles.shadow ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    section.styles.shadow ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Visível
              </label>
              <button
                onClick={() => onUpdate({ visible: !section.visible })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  section.visible ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    section.visible ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
