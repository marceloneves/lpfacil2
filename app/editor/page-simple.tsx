'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';

export default function EditorPageSimple() {
  const [landingPageData, setLandingPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const template = searchParams.get('template');
    const edit = searchParams.get('edit');
    const titleParam = searchParams.get('title');
    
    if (edit && titleParam) {
      setIsEditing(true);
      setEditingId(edit);
      setLandingPageData({
        title: decodeURIComponent(titleParam),
        template: template || 'custom',
        sections: []
      });
    } else {
      setLandingPageData({
        title: `Nova Landing Page - ${template || 'Custom'}`,
        template: template || 'custom',
        sections: []
      });
    }
    
    setIsLoading(false);
  }, [searchParams]);

  const handleSave = async () => {
    console.log('Salvando:', landingPageData);
    alert('Funcionalidade em desenvolvimento! Os dados foram logados no console.');
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
                <h1 className="text-2xl font-bold text-gray-900">Editor Simples</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {isEditing ? 'Editando Landing Page' : 'Criando Nova Landing Page'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Landing Page
              </label>
              <input
                type="text"
                value={landingPageData?.title || ''}
                onChange={(e) => setLandingPageData(prev => prev ? {...prev, title: e.target.value} : null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <input
                type="text"
                value={landingPageData?.template || ''}
                onChange={(e) => setLandingPageData(prev => prev ? {...prev, template: e.target.value} : null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              🚧 Editor Visual em Desenvolvimento
            </h3>
            <p className="text-blue-700">
              O editor visual completo está sendo finalizado. Esta é uma versão simplificada para testar a funcionalidade básica.
            </p>
            <div className="mt-4">
              <h4 className="font-medium text-blue-900">Funcionalidades disponíveis no editor completo:</h4>
              <ul className="mt-2 text-blue-700 space-y-1">
                <li>• Arrastar e soltar seções</li>
                <li>• 8+ tipos de seções (Hero, Features, Testimonials, etc.)</li>
                <li>• Customização em tempo real</li>
                <li>• Preview instantâneo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
