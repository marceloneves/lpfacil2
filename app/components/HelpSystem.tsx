'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  readTime: number;
  popular: boolean;
}

interface HelpCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

interface HelpResponse {
  articles: HelpArticle[];
  categories: HelpCategory[];
  category?: HelpCategory;
  total: number;
  query?: string;
  showing?: string;
}

export default function HelpSystem() {
  const [helpData, setHelpData] = useState<HelpResponse | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadHelpData();
  }, []);

  const loadHelpData = async (category?: string, search?: string) => {
    setIsLoading(true);
    try {
      let url = '/api/help';
      const params = new URLSearchParams();
      
      if (category) {
        params.append('category', category);
      } else if (search) {
        params.append('search', search);
      } else {
        params.append('popular', 'true');
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setHelpData(data);
        setSelectedCategory(category || '');
        setSelectedArticle(null);
      }
    } catch (error) {
      console.error('Erro ao carregar dados de ajuda:', error);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === selectedCategory) {
      // Se clicou na categoria já selecionada, volta para popular
      setSelectedCategory('');
      loadHelpData();
    } else {
      loadHelpData(categoryId);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      await loadHelpData(undefined, query.trim());
    } else {
      loadHelpData();
    }
  };

  const loadArticle = async (articleId: string) => {
    try {
      const response = await fetch(`/api/help/${articleId}`);
      if (response.ok) {
        const article = await response.json();
        setSelectedArticle(article);
      }
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getDisplayTitle = () => {
    if (searchQuery && helpData?.query) {
      return `Resultados para "${helpData.query}"`;
    }
    if (helpData?.category) {
      return helpData.category.name;
    }
    return 'Artigos Populares';
  };

  // Visualização de artigo individual
  if (selectedArticle) {
    return (
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
        {/* Header do artigo */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 text-sm font-medium"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar à lista
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{selectedArticle.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>📅 Atualizado em {formatDate(selectedArticle.lastUpdated)}</span>
            <span>⏱️ {selectedArticle.readTime} min de leitura</span>
            {selectedArticle.popular && (
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                Popular
              </span>
            )}
          </div>
        </div>
        
        {/* Conteúdo do artigo */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
          </div>
          
          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedArticle.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Visualização principal da central de ajuda
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Central de Ajuda</h2>
        
        {/* Busca */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar na central de ajuda..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {isSearching && (
            <div className="absolute right-3 top-3.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      {/* Categorias */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-3">Categorias</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {helpData?.categories?.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`p-3 rounded-lg border text-left hover:bg-gray-50 transition-colors ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium text-gray-900 text-sm">{category.name}</span>
              </div>
              <p className="text-xs text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Carregando artigos...</p>
          </div>
        </div>
      )}

      {/* Artigos */}
      {!isLoading && helpData && (
        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-900">{getDisplayTitle()}</h3>
            <span className="text-sm text-gray-500">
              {helpData.total} {helpData.total === 1 ? 'artigo' : 'artigos'}
            </span>
          </div>

          <div className="space-y-3">
            {helpData.articles.map(article => (
              <div
                key={article.id}
                onClick={() => loadArticle(article.id)}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 hover:text-blue-600">
                    {article.title}
                  </h4>
                  {article.popular && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱️ {article.readTime} min</span>
                  <span>📅 {formatDate(article.lastUpdated)}</span>
                  <span>🏷️ {article.tags.length} tags</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {helpData.articles.length === 0 && (
            <div className="text-center py-8">
              <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Tente ajustar sua busca ou explorar as categorias.' : 'Não há artigos nesta categoria.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
