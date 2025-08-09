'use client';

import { useState, useEffect } from 'react';
import { LandingPageData, LandingPageSection } from '@/lib/types/editor';
import EditableHeroSection from './EditableSections/EditableHeroSection';
import EditableFeaturesSection from './EditableSections/EditableFeaturesSection';
import EditableCTASection from './EditableSections/EditableCTASection';

interface VisualEditorProps {
  landingPageData: LandingPageData;
  onDataChange: (data: LandingPageData) => void;
  onSave: () => void;
}

export default function VisualEditor({ landingPageData, onDataChange, onSave }: VisualEditorProps) {
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [autoSave, setAutoSave] = useState(true);
  const [activeSection, setActiveSection] = useState<number>(0);

  // Função para scroll suave para uma seção
  const scrollToSection = (index: number) => {
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      setActiveSection(index);
    }
  };

  // Detectar seção ativa baseada no scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = landingPageData.sections;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionElement = document.getElementById(`section-${i}`);
        if (sectionElement && sectionElement.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [landingPageData.sections]);

  useEffect(() => {
    // Auto-save após mudanças
    if (autoSave) {
      const timer = setTimeout(() => {
        onSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [landingPageData, autoSave, onSave]);

  const handleSectionEdit = (index: number) => {
    setEditingSection(index);
  };

  const handleSectionSave = (index: number, newContent: any) => {
    const newSections = [...landingPageData.sections];
    newSections[index] = { ...newSections[index], content: newContent };
    
    onDataChange({
      ...landingPageData,
      sections: newSections
    });
    
    setEditingSection(null);
  };

  const handleSectionCancel = () => {
    setEditingSection(null);
  };

  const addSection = (type: string) => {
    const newSection: LandingPageSection = {
      type,
      content: getDefaultContentForType(type)
    };

    onDataChange({
      ...landingPageData,
      sections: [...landingPageData.sections, newSection]
    });
  };

  const removeSection = (index: number) => {
    const newSections = landingPageData.sections.filter((_, i) => i !== index);
    onDataChange({
      ...landingPageData,
      sections: newSections
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...landingPageData.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newSections.length) {
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      onDataChange({
        ...landingPageData,
        sections: newSections
      });
    }
  };

  const getSectionInfo = (type: string) => {
    switch (type) {
      case 'hero':
        return { name: 'Hero', icon: '🏆', color: 'blue' };
      case 'features':
        return { name: 'Features', icon: '⭐', color: 'green' };
      case 'cta':
        return { name: 'Call to Action', icon: '🎯', color: 'yellow' };
      case 'testimonials':
        return { name: 'Testimonials', icon: '💬', color: 'purple' };
      case 'pricing':
        return { name: 'Pricing', icon: '💰', color: 'orange' };
      case 'faq':
        return { name: 'FAQ', icon: '❓', color: 'indigo' };
      case 'contact':
        return { name: 'Contact', icon: '📞', color: 'pink' };
      default:
        return { name: 'Seção', icon: '📄', color: 'gray' };
    }
  };

  const getDefaultContentForType = (type: string) => {
    switch (type) {
      case 'hero':
        return {
          title: 'Novo Título Principal',
          subtitle: 'Subtítulo descritivo que explica sua proposta de valor',
          buttonText: 'Começar Agora'
        };
      case 'features':
        return {
          title: 'Nossas Features',
          items: [
            { title: 'Feature 1', description: 'Descrição da feature 1', icon: '🚀' },
            { title: 'Feature 2', description: 'Descrição da feature 2', icon: '⭐' },
            { title: 'Feature 3', description: 'Descrição da feature 3', icon: '💡' }
          ]
        };
      case 'cta':
        return {
          title: 'Pronto para Começar?',
          subtitle: 'Junte-se a milhares de clientes satisfeitos',
          buttonText: 'Começar Gratuitamente'
        };
      default:
        return { title: 'Nova Seção', subtitle: 'Conteúdo da seção' };
    }
  };

  const renderEditableSection = (section: LandingPageSection, index: number) => {
    const isEditing = editingSection === index;

    switch (section.type) {
      case 'hero':
        return (
          <EditableHeroSection
            key={index}
            section={section}
            isEditing={isEditing}
            onEdit={() => handleSectionEdit(index)}
            onSave={(content) => handleSectionSave(index, content)}
            onCancel={handleSectionCancel}
          />
        );
      case 'features':
        return (
          <EditableFeaturesSection
            key={index}
            section={section}
            isEditing={isEditing}
            onEdit={() => handleSectionEdit(index)}
            onSave={(content) => handleSectionSave(index, content)}
            onCancel={handleSectionCancel}
          />
        );
      case 'cta':
        return (
          <EditableCTASection
            key={index}
            section={section}
            isEditing={isEditing}
            onEdit={() => handleSectionEdit(index)}
            onSave={(content) => handleSectionSave(index, content)}
            onCancel={handleSectionCancel}
          />
        );
      default:
        return (
          <div key={index} className="py-16 bg-gray-100 border-2 border-dashed border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Seção {section.type} (Não Implementada)
              </h2>
              <p className="text-gray-600 mb-4">
                Este tipo de seção ainda não tem editor visual implementado.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar de Navegação */}
      <div className="fixed left-0 top-16 bottom-0 w-80 bg-white shadow-lg z-40 overflow-y-auto">
        <div className="p-6">
          {/* Navegação entre seções */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Navegação ({landingPageData.sections.length} seções)
            </h3>
            
            {landingPageData.sections.length > 0 ? (
              <div className="space-y-2">
                {landingPageData.sections.map((section, index) => {
                  const sectionInfo = getSectionInfo(section.type);
                  const isActive = activeSection === index;
                  const isEditing = editingSection === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => scrollToSection(index)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-blue-100 border-l-4 border-blue-500' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      } ${isEditing ? 'ring-2 ring-blue-400' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{sectionInfo.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {sectionInfo.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {section.content?.title || 'Sem título'}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-400">#{index + 1}</span>
                          {isEditing && (
                            <span className="text-xs text-blue-600 font-medium">Editando</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <span className="text-2xl mb-2 block">📄</span>
                <p className="text-sm">Nenhuma seção criada ainda</p>
              </div>
            )}
          </div>

          {/* Adicionar seções */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">➕</span>
              Adicionar Seção
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'hero', label: 'Hero', icon: '🏆' },
                { type: 'features', label: 'Features', icon: '⭐' },
                { type: 'cta', label: 'CTA', icon: '🎯' },
                { type: 'testimonials', label: 'Testimonials', icon: '💬' },
                { type: 'pricing', label: 'Pricing', icon: '💰' },
                { type: 'faq', label: 'FAQ', icon: '❓' },
                { type: 'contact', label: 'Contact', icon: '📞' }
              ].map((sectionType) => (
                <button
                  key={sectionType.type}
                  onClick={() => addSection(sectionType.type)}
                  className="text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-base mr-1">{sectionType.icon}</span>
                  <span className="text-xs">{sectionType.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Controles */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Auto-save</span>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoSave ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <button
              onClick={onSave}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              💾 Salvar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 ml-80">

        {/* Renderização das seções */}
        {landingPageData.sections.map((section, index) => (
          <div key={index} id={`section-${index}`} className="relative group">
            {/* Controles de posição */}
            {editingSection !== index && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white rounded-lg shadow-lg p-2 space-y-1">
                  <button
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className="block p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    title="Mover para cima"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === landingPageData.sections.length - 1}
                    className="block p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    title="Mover para baixo"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeSection(index)}
                    className="block p-1 text-red-600 hover:text-red-900"
                    title="Remover seção"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {renderEditableSection(section, index)}
          </div>
        ))}

        {/* Estado vazio */}
        {landingPageData.sections.length === 0 && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comece criando sua primeira seção
              </h2>
              <p className="text-gray-600 mb-8">
                Use o painel à esquerda para adicionar seções à sua landing page
              </p>
              <button
                onClick={() => addSection('hero')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Adicionar Hero Section
              </button>
            </div>
          </div>
        )}

        {/* Footer sempre presente */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">{landingPageData.title}</h3>
                <p className="text-gray-400 text-sm">
                  Criado com LPFácil2 - Editor Visual
                </p>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 Todos os direitos reservados
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
