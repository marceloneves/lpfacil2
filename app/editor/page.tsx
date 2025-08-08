'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function EditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const editId = searchParams.get('edit');
  const editTitle = searchParams.get('title');
  const [pageTitle, setPageTitle] = useState(editTitle ? decodeURIComponent(editTitle) : '');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!templateId && !editId) {
      router.push('/templates');
    }
    
    // Se estamos editando, carregar dados da landing page
    if (editId) {
      setIsEditing(true);
      // Aqui você pode carregar dados adicionais da landing page se necessário
    }
  }, [templateId, editId, router]);

  const handleSavePage = async () => {
    if (!pageTitle.trim()) {
      alert('Por favor, insira um título para sua landing page');
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && editId) {
        // Atualizar landing page existente
        const response = await fetch(`/api/landing-pages/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: pageTitle,
            template: templateId,
            updatedAt: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          router.push(`/dashboard?success=page_updated&id=${editId}`);
        } else {
          console.error('Erro ao atualizar landing page');
        }
      } else {
        // Criar nova landing page
        const response = await fetch('/api/landing-pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: pageTitle,
            template: templateId,
          }),
        });

        if (response.ok) {
          const newPage = await response.json();
          router.push(`/dashboard?success=page_created&id=${newPage.id}`);
        } else {
          console.error('Erro ao criar landing page');
        }
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateInfo = () => {
    const templates = {
      'sales': { name: 'Vendas', description: 'Template focado em conversão de vendas' },
      'lead-generation': { name: 'Captura de Leads', description: 'Template para capturar emails' },
      'product-launch': { name: 'Lançamento de Produto', description: 'Template para lançamentos' },
      'webinar': { name: 'Webinar', description: 'Template para webinars' },
      'app-download': { name: 'Download de App', description: 'Template para apps' },
      'event': { name: 'Evento', description: 'Template para eventos' },
      'saas': { name: 'SaaS', description: 'Template para produtos SaaS' },
      'ecommerce': { name: 'E-commerce', description: 'Template para lojas online' }
    };
    return templates[templateId as keyof typeof templates] || { name: 'Template', description: 'Template personalizado' };
  };

  const templateInfo = getTemplateInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href={isEditing ? "/dashboard" : "/templates"} className="flex items-center mr-4">
                <svg className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-600">{isEditing ? 'Dashboard' : 'Templates'}</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Editar Landing Page' : 'Editor'}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
                              <button
                  onClick={handleSavePage}
                  disabled={isLoading || !pageTitle.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Salvando...' : (isEditing ? 'Atualizar Página' : 'Salvar Página')}
                </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Setup */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {isEditing ? 'Editar Landing Page' : 'Configurar Landing Page'}
            </h2>
            <p className="text-gray-600">
              Template selecionado: <span className="font-medium">{templateInfo.name}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">{templateInfo.description}</p>
            {isEditing && (
              <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Modo de edição:</strong> Você está editando uma landing page existente.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="page-title" className="block text-sm font-medium text-gray-700 mb-2">
                Título da Landing Page *
              </label>
              <input
                type="text"
                id="page-title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="Ex: Campanha de Verão 2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Editor Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Preview do Template
            </h3>
            <p className="text-sm text-gray-600">
              Esta é uma visualização do template selecionado. O editor completo estará disponível em breve.
            </p>
          </div>

          {/* Template Preview */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {templateInfo.name}
            </h4>
            <p className="text-gray-600 mb-4">
              {templateInfo.description}
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                <strong>Funcionalidades incluídas:</strong>
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Design responsivo</li>
                <li>• Otimizado para conversão</li>
                <li>• SEO otimizado</li>
                <li>• Analytics integrado</li>
              </ul>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-800">
                <strong>Editor em desenvolvimento:</strong> Em breve você poderá personalizar completamente sua landing page com nosso editor visual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
