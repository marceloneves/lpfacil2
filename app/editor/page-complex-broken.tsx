'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { LandingPageData } from '@/lib/types/editor';
import VisualEditor from '@/app/components/editor/VisualEditor';

export default function VisualEditorPage() {
  const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadLandingPage = async () => {
      const template = searchParams.get('template') || 'custom';
      const edit = searchParams.get('edit');
      const titleParam = searchParams.get('title');
      
      if (edit && titleParam) {
        // Carregar landing page existente
        setIsEditing(true);
        setEditingId(edit);
        
        try {
          const response = await fetch(`/api/landing-pages/${edit}`);
          if (response.ok) {
            const data = await response.json();
            setLandingPageData(data);
          } else {
            // Fallback se não conseguir carregar
            setLandingPageData({
              title: decodeURIComponent(titleParam),
              template: template,
              sections: []
            });
          }
        } catch (error) {
          console.error('Erro ao carregar landing page:', error);
          setLandingPageData({
            title: decodeURIComponent(titleParam),
            template: template,
            sections: []
          });
        }
      } else {
        // Nova landing page
        setLandingPageData({
          title: `Nova Landing Page - ${template.toUpperCase()}`,
          template: template,
          sections: []
        });
      }
      
      setIsLoading(false);
    };

    if (!authLoading) {
      loadLandingPage();
    }
  }, [searchParams, authLoading]);

  const handleSave = async () => {
    if (!landingPageData || isSaving) return;
    
    setIsSaving(true);
    
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
        const savedData = await response.json();
        
        if (!isEditing) {
          // Se era uma nova página, agora estamos editando
          setIsEditing(true);
          setEditingId(savedData.id);
          // Atualizar URL sem recarregar
          window.history.replaceState(
            null, 
            '', 
            `/editor?template=${landingPageData.template}&edit=${savedData.id}&title=${encodeURIComponent(landingPageData.title)}`
          );
        }
        
        setLandingPageData(savedData);
        
        // Feedback visual discreto
        document.body.style.background = '#10b981';
        setTimeout(() => {
          document.body.style.background = '';
        }, 200);
      } else {
        alert('Erro ao salvar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (editingId) {
      window.open(`/preview/${editingId}`, '_blank');
    } else {
      alert('Salve a landing page primeiro para visualizar o preview');
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

  if (!landingPageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Erro ao carregar dados
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível carregar os dados da landing page.
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
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
                <h1 className="text-xl font-bold text-gray-900">Editor Visual</h1>
              </Link>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                value={landingPageData.title}
                onChange={(e) => setLandingPageData(prev => prev ? {...prev, title: e.target.value} : null)}
                className="mx-4 px-3 py-1 text-lg font-semibold text-center border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                placeholder="Título da Landing Page"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePreview}
                disabled={!editingId}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Preview
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal com padding para o header fixo */}
      <div className="pt-16">
        <VisualEditor
          landingPageData={landingPageData}
          onDataChange={setLandingPageData}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
