'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  popular?: boolean;
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const templates: Template[] = [
    {
      id: 'sales',
      name: 'Vendas',
      description: 'Landing page focada em conversão de vendas',
      category: 'sales',
      image: '/api/placeholder/400/300',
      features: ['Formulário de contato', 'Call-to-action destacado', 'Testimonials'],
      popular: true
    },
    {
      id: 'lead-generation',
      name: 'Captura de Leads',
      description: 'Ideal para capturar emails e leads qualificados',
      category: 'leads',
      image: '/api/placeholder/400/300',
      features: ['Formulário de lead', 'Ebook gratuito', 'Newsletter signup']
    },
    {
      id: 'product-launch',
      name: 'Lançamento de Produto',
      description: 'Perfeita para lançar novos produtos ou serviços',
      category: 'launch',
      image: '/api/placeholder/400/300',
      features: ['Contador regressivo', 'Pre-order', 'Demo do produto']
    },
    {
      id: 'webinar',
      name: 'Webinar',
      description: 'Landing page para inscrição em webinars',
      category: 'webinar',
      image: '/api/placeholder/400/300',
      features: ['Calendário de eventos', 'Agenda detalhada', 'Inscrição simples']
    },
    {
      id: 'app-download',
      name: 'Download de App',
      description: 'Para promover downloads de aplicativos',
      category: 'app',
      image: '/api/placeholder/400/300',
      features: ['Screenshots do app', 'Reviews', 'Download direto']
    },
    {
      id: 'event',
      name: 'Evento',
      description: 'Landing page para eventos e conferências',
      category: 'event',
      image: '/api/placeholder/400/300',
      features: ['Programação', 'Palestrantes', 'Inscrição']
    },
    {
      id: 'saas',
      name: 'SaaS',
      description: 'Landing page para produtos SaaS',
      category: 'saas',
      image: '/api/placeholder/400/300',
      features: ['Planos de preço', 'Demo interativo', 'Trial gratuito']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Para lojas online e produtos físicos',
      category: 'ecommerce',
      image: '/api/placeholder/400/300',
      features: ['Catálogo de produtos', 'Carrinho', 'Checkout']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'sales', name: 'Vendas' },
    { id: 'leads', name: 'Leads' },
    { id: 'launch', name: 'Lançamentos' },
    { id: 'webinar', name: 'Webinars' },
    { id: 'app', name: 'Apps' },
    { id: 'event', name: 'Eventos' },
    { id: 'saas', name: 'SaaS' },
    { id: 'ecommerce', name: 'E-commerce' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (templateId: string) => {
    // Redirecionar para o editor com o template selecionado
    router.push(`/editor?template=${templateId}`);
  };

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
                <h1 className="text-2xl font-bold text-gray-900">LPFácil2</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Escolha um template</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Escolha seu Template
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecione um template que melhor se adapte ao seu objetivo. 
            Todos os templates são responsivos e otimizados para conversão.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="sm:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Template Image */}
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">{template.name}</p>
                  </div>
                </div>
                {template.popular && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {template.description}
                </p>

                {/* Features */}
                <div className="space-y-1">
                  {template.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-500">
                      <svg className="h-3 w-3 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                  {template.features.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{template.features.length - 2} mais recursos
                    </div>
                  )}
                </div>

                {/* Use Template Button */}
                <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Usar Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum template encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou termos de busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}
