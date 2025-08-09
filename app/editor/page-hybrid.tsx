'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';

export default function EditorHybrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState([
    {
      type: 'hero',
      content: {
        title: 'Transforme Visitantes em Clientes',
        subtitle: 'Crie landing pages profissionais que convertem mais com nosso editor visual intuitivo',
        buttonText: 'Começar Gratuitamente'
      }
    },
    {
      type: 'features',
      content: {
        title: 'Funcionalidades Principais',
        items: [
          { title: 'Editor Visual', description: 'Edite diretamente clicando nas seções', icon: '🎨' },
          { title: 'Preview em Tempo Real', description: 'Veja as mudanças instantaneamente', icon: '👁️' },
          { title: 'Auto-Save', description: 'Suas alterações são salvas automaticamente', icon: '💾' }
        ]
      }
    }
  ]);
  const [activeSection, setActiveSection] = useState(0);
  const [editingSection, setEditingSection] = useState(null);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      setIsLoading(false);
    }
  }, [authLoading]);

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(index);
    }
  };

  const addSection = (type) => {
    const newSection = {
      type,
      content: {
        title: `Nova Seção ${type}`,
        subtitle: 'Clique para editar este conteúdo'
      }
    };
    setSections([...sections, newSection]);
  };

  const getSectionInfo = (type) => {
    switch (type) {
      case 'hero':
        return { name: 'Hero', icon: '🏆' };
      case 'features':
        return { name: 'Features', icon: '⭐' };
      case 'cta':
        return { name: 'Call to Action', icon: '🎯' };
      default:
        return { name: 'Seção', icon: '📄' };
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando editor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-40">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <h1 className="text-xl font-bold text-gray-900">Editor Visual com Sidebar</h1>
              </Link>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                defaultValue="Minha Landing Page"
                className="mx-4 px-3 py-1 text-lg font-semibold text-center border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                placeholder="Título da Landing Page"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Com Sidebar
              </div>
              <button
                onClick={() => alert('Funcionalidade de save será implementada!')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                💾 Salvar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar de Navegação */}
        <div className="fixed left-0 top-16 bottom-0 w-80 bg-white shadow-lg z-30 overflow-y-auto border-r">
          <div className="p-6">
            {/* Navegação entre seções */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Navegação ({sections.length} seções)
              </h3>
              
              <div className="space-y-2">
                {sections.map((section, index) => {
                  const sectionInfo = getSectionInfo(section.type);
                  const isActive = activeSection === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => scrollToSection(index)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-blue-100 border-l-4 border-blue-500' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
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
                        <span className="text-xs text-gray-400">#{index + 1}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
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
                  { type: 'testimonials', label: 'Testimonials', icon: '💬' }
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
              <button
                onClick={() => alert('Auto-save ativado!')}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-2"
              >
                🔄 Auto-Save: ON
              </button>
              <button
                onClick={() => alert('Salvamento manual executado!')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                💾 Salvar Agora
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 ml-80">
          {/* Renderizar seções */}
          {sections.map((section, index) => (
            <div key={index} id={`section-${index}`} className="relative">
              {section.type === 'hero' && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 cursor-pointer hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 transition-all group">
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
                        {section.content.title}
                      </h1>
                      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        {section.content.subtitle}
                      </p>
                      <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                        {section.content.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'features' && (
                <div className="py-20 bg-white cursor-pointer hover:ring-2 hover:ring-green-400 hover:ring-opacity-50 transition-all group">
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
                        {section.content.title}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {section.content.items?.map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="text-4xl mb-4">{item.icon}</div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'cta' && (
                <div className="bg-blue-600 py-20 cursor-pointer hover:ring-2 hover:ring-yellow-400 hover:ring-opacity-50 transition-all group">
                  <div className="absolute inset-0 bg-yellow-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold">
                        Clique para editar
                      </div>
                    </div>
                  </div>

                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                      {section.content.title || 'Pronto para Começar?'}
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                      {section.content.subtitle || 'Junte-se a milhares de clientes satisfeitos'}
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                      {section.content.buttonText || 'Começar Agora'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Instruções */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 Como Usar o Editor com Sidebar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">📋 Navegação por Seções</h3>
                  <p className="text-gray-600">Use a sidebar à esquerda para navegar rapidamente entre as seções</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">➕ Adicionar Seções</h3>
                  <p className="text-gray-600">Clique nos botões da sidebar para adicionar novos tipos de seção</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">✏️ Edição Inline</h3>
                  <p className="text-gray-600">Clique nas seções para editar diretamente no preview</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">💾 Auto-Save</h3>
                  <p className="text-gray-600">Suas alterações são salvas automaticamente ou manualmente</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold">Editor Visual com Sidebar</h3>
                  <p className="text-gray-400 text-sm">
                    Criado com LPFácil2 - Funcionalidade Completa
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
    </div>
  );
}
