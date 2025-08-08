'use client';

import { useState } from 'react';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  DevicePhoneMobileIcon, 
  ComputerDesktopIcon,
  SwatchIcon,
  DocumentTextIcon,
  PhotoIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHydration } from '../hooks/useHydration';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('design');
  const [previewMode, setPreviewMode] = useState('desktop');
  const isHydrated = useHydration();

  // Evita renderização durante hidratação
  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  const templates = [
    {
      name: 'Lead Generation',
      category: 'Conversão',
      image: '/api/placeholder/400/300',
      popular: true
    },
    {
      name: 'E-commerce',
      category: 'Vendas',
      image: '/api/placeholder/400/300',
      popular: false
    },
    {
      name: 'Evento',
      category: 'Marketing',
      image: '/api/placeholder/400/300',
      popular: false
    },
    {
      name: 'SaaS',
      category: 'Tecnologia',
      image: '/api/placeholder/400/300',
      popular: true
    }
  ];

  const designElements = [
    { icon: SwatchIcon, name: 'Cores', description: 'Paleta personalizada' },
    { icon: DocumentTextIcon, name: 'Tipografia', description: 'Fontes profissionais' },
    { icon: PhotoIcon, name: 'Imagens', description: 'Biblioteca de assets' },
    { icon: CursorArrowRaysIcon, name: 'Elementos', description: 'Botões e formulários' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">LPFácil2</h1>
              <span className="text-sm text-gray-500">| Demonstração</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Voltar ao Site
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Editor de Landing Page</h2>
              
              {/* Tabs */}
              <div className="flex space-x-1 mb-6">
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'templates'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Templates
                </button>
                <button
                  onClick={() => setActiveTab('design')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'design'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Design
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'content'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Conteúdo
                </button>
              </div>

              {/* Templates Tab */}
              {activeTab === 'templates' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Escolha um Template</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <span className="text-xs text-gray-600">{template.name}</span>
                          </div>
                        </div>
                        {template.popular && (
                          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                        <p className="text-xs text-gray-600 mt-1">{template.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Design Tab */}
              {activeTab === 'design' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Personalizar Design</h3>
                  <div className="space-y-3">
                    {designElements.map((element, index) => (
                      <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <element.icon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{element.name}</p>
                          <p className="text-xs text-gray-500">{element.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Editar Conteúdo</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título Principal
                      </label>
                      <input
                        type="text"
                        defaultValue="Transforme visitantes em clientes"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subtítulo
                      </label>
                      <textarea
                        defaultValue="Crie landing pages profissionais que realmente convertem"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Texto do Botão
                      </label>
                      <input
                        type="text"
                        defaultValue="Começar Agora"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Visualização</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`p-2 rounded-md transition-colors ${
                      previewMode === 'desktop'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <ComputerDesktopIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-2 rounded-md transition-colors ${
                      previewMode === 'mobile'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <DevicePhoneMobileIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-8">
                <div className={`mx-auto ${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'}`}>
                  {/* Hero Section Preview */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">
                      Transforme visitantes em clientes
                    </h1>
                    <p className="text-xl mb-6 text-blue-100">
                      Crie landing pages profissionais que realmente convertem
                    </p>
                    <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                      Começar Agora
                    </button>
                  </div>

                  {/* Features Section Preview */}
                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CursorArrowRaysIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Fácil de Usar</h3>
                      <p className="text-gray-600 text-sm">
                        Interface intuitiva que permite criar landing pages em minutos
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PhotoIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Templates Profissionais</h3>
                      <p className="text-gray-600 text-sm">
                        Templates otimizados para conversão criados por especialistas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
