'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LandingPageData } from '@/lib/types/editor';
import PreviewRenderer from '@/app/components/preview/PreviewRenderer';


export default function PreviewPage() {
  const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchLandingPage = async () => {
      if (!id) {
        setError('ID da landing page não encontrado');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/landing-pages/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Landing page não encontrada');
          } else {
            setError('Erro ao carregar landing page');
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setLandingPageData(data);
      } catch (error) {
        console.error('Erro ao buscar landing page:', error);
        setError('Erro de conexão');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLandingPage();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Voltar ao Dashboard
            </Link>
            <br />
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!landingPageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dados não encontrados
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível carregar os dados da landing page.
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Renderizar a landing page */}
      <PreviewRenderer landingPageData={landingPageData} />
    </>
  );
}
