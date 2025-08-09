'use client';

import { useState, useEffect } from 'react';
import { LandingPageData, LandingPageSection, EditorState } from '@/lib/types/editor';
import { sectionTemplates, sectionCategories, createSectionFromTemplate } from '@/lib/sections/templates';
import SectionRenderer from '../sections/SectionRenderer';
import SectionLibrary from './SectionLibrary';
import SectionCustomizer from './SectionCustomizer';

interface ModernEditorProps {
  initialData?: LandingPageData;
  onSave: (data: LandingPageData) => Promise<void>;
  onPreview: () => void;
}

export default function ModernEditor({ initialData, onSave, onPreview }: ModernEditorProps) {
  const [landingPageData, setLandingPageData] = useState<LandingPageData>(
    initialData || {
      title: 'Nova Landing Page',
      template: 'custom',
      sections: [],
      settings: {},
      status: 'draft'
    }
  );

  const [editorState, setEditorState] = useState<EditorState>({
    selectedSectionId: null,
    previewMode: false,
    sidebarOpen: true,
    activeTab: 'sections',
    isDragging: false
  });

  const [isSaving, setIsSaving] = useState(false);

  // Adicionar seção
  const addSection = (templateId: string) => {
    const newSection = createSectionFromTemplate(templateId, landingPageData.sections.length);
    if (newSection) {
      setLandingPageData(prev => ({
        ...prev,
        sections: [...prev.sections, newSection]
      }));
    }
  };

  // Remover seção
  const removeSection = (sectionId: string) => {
    setLandingPageData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
    
    if (editorState.selectedSectionId === sectionId) {
      setEditorState(prev => ({ ...prev, selectedSectionId: null }));
    }
  };

  // Mover seção
  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    setLandingPageData(prev => {
      const sections = [...prev.sections];
      const currentIndex = sections.findIndex(s => s.id === sectionId);
      
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex < 0 || newIndex >= sections.length) return prev;
      
      // Trocar posições
      [sections[currentIndex], sections[newIndex]] = [sections[newIndex], sections[currentIndex]];
      
      // Atualizar orders
      sections.forEach((section, index) => {
        section.order = index;
      });
      
      return { ...prev, sections };
    });
  };

  // Atualizar seção
  const updateSection = (sectionId: string, updates: Partial<LandingPageSection>) => {
    setLandingPageData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  // Selecionar seção
  const selectSection = (sectionId: string | null) => {
    setEditorState(prev => ({ ...prev, selectedSectionId: sectionId }));
  };

  // Salvar
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(landingPageData);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle preview
  const togglePreview = () => {
    setEditorState(prev => ({ ...prev, previewMode: !prev.previewMode }));
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setEditorState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  const selectedSection = landingPageData.sections.find(s => s.id === editorState.selectedSectionId);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${editorState.sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-gray-200 overflow-hidden`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Editor</h2>
              <button
                onClick={toggleSidebar}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setEditorState(prev => ({ ...prev, activeTab: 'sections' }))}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  editorState.activeTab === 'sections'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Seções
              </button>
              <button
                onClick={() => setEditorState(prev => ({ ...prev, activeTab: 'design' }))}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  editorState.activeTab === 'design'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Design
              </button>
              <button
                onClick={() => setEditorState(prev => ({ ...prev, activeTab: 'settings' }))}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  editorState.activeTab === 'settings'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Config
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {editorState.activeTab === 'sections' && (
              <SectionLibrary onAddSection={addSection} />
            )}
            
            {editorState.activeTab === 'design' && selectedSection && (
              <SectionCustomizer
                section={selectedSection}
                onUpdate={(updates) => updateSection(selectedSection.id, updates)}
              />
            )}
            
            {editorState.activeTab === 'design' && !selectedSection && (
              <div className="p-4 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                </svg>
                <p>Selecione uma seção para customizar</p>
              </div>
            )}
            
            {editorState.activeTab === 'settings' && (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Página
                  </label>
                  <input
                    type="text"
                    value={landingPageData.title}
                    onChange={(e) => setLandingPageData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Título
                  </label>
                  <input
                    type="text"
                    value={landingPageData.settings.seoTitle || ''}
                    onChange={(e) => setLandingPageData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, seoTitle: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Descrição
                  </label>
                  <textarea
                    value={landingPageData.settings.seoDescription || ''}
                    onChange={(e) => setLandingPageData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, seoDescription: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {!editorState.sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Abrir sidebar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            <h1 className="text-lg font-semibold text-gray-900">
              {landingPageData.title}
            </h1>
            
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              {landingPageData.sections.length} seções
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={togglePreview}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                editorState.previewMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {editorState.previewMode ? 'Editar' : 'Preview'}
            </button>
            
            <button
              onClick={onPreview}
              className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Visualizar
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-none mx-auto bg-white min-h-full">
            {landingPageData.sections.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center py-20">
                <div className="space-y-4">
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900">Comece adicionando seções</h3>
                  <p className="text-gray-500">Use o painel lateral para adicionar hero, recursos, depoimentos e mais.</p>
                </div>
              </div>
            ) : (
              landingPageData.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <SectionRenderer
                    key={section.id}
                    section={section}
                    isEditing={!editorState.previewMode}
                    isSelected={editorState.selectedSectionId === section.id}
                    onSelect={() => selectSection(section.id)}
                    onEdit={() => {
                      selectSection(section.id);
                      setEditorState(prev => ({ ...prev, activeTab: 'design' }));
                    }}
                    onDelete={() => removeSection(section.id)}
                    onMoveUp={() => moveSection(section.id, 'up')}
                    onMoveDown={() => moveSection(section.id, 'down')}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
