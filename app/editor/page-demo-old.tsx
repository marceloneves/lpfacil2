'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import DemoLandingPage from '@/app/components/editor/DemoLandingPage';

export default function EditorDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!authLoading) {
      setIsLoading(false);
    }
  }, [authLoading]);

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
                <h1 className="text-xl font-bold text-gray-900">Editor Visual - DEMO</h1>
              </Link>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                defaultValue="Minha Landing Page Demo"
                className="mx-4 px-3 py-1 text-lg font-semibold text-center border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                placeholder="Título da Landing Page"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Funcional
              </div>
              <button
                onClick={() => alert('Demo funcional! A versão completa será implementada em breve.')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Salvar Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Painel de instruções flutuante */}
      <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs border-l-4 border-blue-500">
        <h3 className="font-semibold text-gray-900 mb-2">🎨 Editor Visual</h3>
        <p className="text-sm text-gray-600 mb-3">
          Clique na seção Hero (azul) para testar a edição inline!
        </p>
        <div className="space-y-1 text-xs text-gray-500">
          <div>✅ Edição ao clicar</div>
          <div>✅ Preview em tempo real</div>
          <div>✅ Interface intuitiva</div>
        </div>
      </div>

      {/* Conteúdo principal com padding para o header fixo */}
      <div className="pt-16">
        <DemoLandingPage />
      </div>
    </div>
  );
}
