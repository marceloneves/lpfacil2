'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';

export default function EditorWorking() {
  const [landingPageData, setLandingPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const template = searchParams.get('template') || 'custom';
    const edit = searchParams.get('edit');
    const titleParam = searchParams.get('title');
    
    if (edit && titleParam) {
      setIsEditing(true);
      setEditingId(edit);
      setLandingPageData({
        title: decodeURIComponent(titleParam),
        template: template,
        sections: [
          {
            type: 'hero',
            content: {
              title: 'Bem-vindo ao Editor Visual',
              subtitle: 'Crie landing pages incríveis de forma visual e intuitiva',
              buttonText: 'Começar Agora',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500'
            }
          },
          {
            type: 'features',
            content: {
              title: 'Funcionalidades Principais',
              items: [
                {
                  title: 'Editor Visual',
                  description: 'Interface intuitiva para criar páginas sem código',
                  icon: '🎨'
                },
                {
                  title: 'Templates Prontos',
                  description: 'Diversos templates para diferentes segmentos',
                  icon: '📱'
                },
                {
                  title: 'Responsivo',
                  description: 'Suas páginas ficam perfeitas em qualquer dispositivo',
                  icon: '💻'
                }
              ]
            }
          }
        ]
      });
    } else {
      setLandingPageData({
        title: `Nova Landing Page - ${template.toUpperCase()}`,
        template: template,
        sections: [
          {
            type: 'hero',
            content: {
              title: 'Sua Nova Landing Page',
              subtitle: 'Comece editando este conteúdo',
              buttonText: 'Call to Action'
            }
          }
        ]
      });
    }
    
    setIsLoading(false);
  }, [searchParams]);

  const handleSave = async () => {
    if (!landingPageData) return;
    
    try {
      const url = isEditing 
        ? `/api/landing-pages/${editingId}`
        : '/api/landing-pages';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(landingPageData),
      });

      if (response.ok) {
        alert('Landing page salva com sucesso!');
        if (!isEditing) {
          router.push('/dashboard');
        }
      } else {
        alert('Erro ao salvar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão. Verifique sua internet.');
    }
  };

  const addSection = (type: string) => {
    if (!landingPageData) return;

    const newSection = {
      type,
      content: {
        title: `Nova Seção ${type}`,
        subtitle: 'Edite este conteúdo'
      }
    };

    setLandingPageData({
      ...landingPageData,
      sections: [...landingPageData.sections, newSection]
    });
  };

  const updateSection = (index: number, newContent: any) => {
    if (!landingPageData) return;

    const newSections = [...landingPageData.sections];
    newSections[index] = { ...newSections[index], content: newContent };
    
    setLandingPageData({
      ...landingPageData,
      sections: newSections
    });
  };

  const removeSection = (index: number) => {
    if (!landingPageData) return;

    const newSections = landingPageData.sections.filter((_, i) => i !== index);
    
    setLandingPageData({
      ...landingPageData,
      sections: newSections
    });
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <svg className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <h1 className="text-2xl font-bold text-gray-900">Editor Visual</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (editingId) {
                    window.open(`/preview/${editingId}`, '_blank');
                  } else {
                    alert('Salve a landing page primeiro para visualizar o preview');
                  }
                }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                disabled={!editingId}
              >
                Preview
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 h-screen overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Seções</h2>
            
            <div className="space-y-3">
              {[
                { type: 'hero', label: 'Hero Section', icon: '🏆' },
                { type: 'features', label: 'Features', icon: '⭐' },
                { type: 'testimonials', label: 'Testimonials', icon: '💬' },
                { type: 'pricing', label: 'Pricing', icon: '💰' },
                { type: 'cta', label: 'Call to Action', icon: '🎯' },
                { type: 'faq', label: 'FAQ', icon: '❓' },
                { type: 'contact', label: 'Contact', icon: '📞' }
              ].map((section) => (
                <button
                  key={section.type}
                  onClick={() => addSection(section.type)}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <span className="font-medium text-gray-900">{section.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-md font-medium text-gray-900 mb-3">Configurações</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Página
                  </label>
                  <input
                    type="text"
                    value={landingPageData?.title || ''}
                    onChange={(e) => setLandingPageData(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm min-h-[600px]">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {landingPageData?.title}
                </h2>
                <p className="text-gray-600">
                  {isEditing ? 'Editando landing page existente' : 'Criando nova landing page'}
                </p>
              </div>

              <div className="space-y-6">
                {landingPageData?.sections?.map((section: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {section.type} Section
                        </h3>
                        <p className="text-sm text-gray-600">
                          Seção {index + 1} de {landingPageData.sections.length}
                        </p>
                      </div>
                      <button
                        onClick={() => removeSection(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          value={section.content.title || ''}
                          onChange={(e) => updateSection(index, { ...section.content, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      {section.content.subtitle !== undefined && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subtítulo
                          </label>
                          <textarea
                            value={section.content.subtitle || ''}
                            onChange={(e) => updateSection(index, { ...section.content, subtitle: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                      )}
                      
                      {section.content.buttonText !== undefined && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Texto do Botão
                          </label>
                          <input
                            type="text"
                            value={section.content.buttonText || ''}
                            onChange={(e) => updateSection(index, { ...section.content, buttonText: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {(!landingPageData?.sections || landingPageData.sections.length === 0) && (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p>Adicione seções usando a barra lateral</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
