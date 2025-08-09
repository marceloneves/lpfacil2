'use client';

import { useState } from 'react';

export default function DemoLandingPage() {
  const [heroContent, setHeroContent] = useState({
    title: 'Transforme Visitantes em Clientes',
    subtitle: 'Crie landing pages profissionais que convertem mais com nosso editor visual intuitivo',
    buttonText: 'Começar Gratuitamente'
  });

  const [isEditingHero, setIsEditingHero] = useState(false);

  const handleHeroSave = () => {
    setIsEditingHero(false);
    // Aqui seria feito o save real
    console.log('Hero salvo:', heroContent);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Editável */}
      <div 
        className={`relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 ${
          isEditingHero ? 'border-4 border-dashed border-blue-400' : 'cursor-pointer hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 transition-all group'
        }`}
        onClick={() => !isEditingHero && setIsEditingHero(true)}
      >
        {!isEditingHero && (
          <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Clique para editar
              </div>
            </div>
          </div>
        )}

        {isEditingHero && (
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); handleHeroSave(); }}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditingHero(false); }}
              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {isEditingHero ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  className="w-full max-w-4xl mx-auto px-4 py-3 text-4xl font-bold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Título Principal"
                  onClick={(e) => e.stopPropagation()}
                />
                <textarea
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  className="w-full max-w-3xl mx-auto px-4 py-3 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Subtítulo"
                  rows={2}
                  onClick={(e) => e.stopPropagation()}
                />
                <input
                  type="text"
                  value={heroContent.buttonText}
                  onChange={(e) => setHeroContent({...heroContent, buttonText: e.target.value})}
                  className="w-full max-w-xs mx-auto px-4 py-3 text-lg font-semibold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Texto do Botão"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ) : (
              <>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  {heroContent.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  {heroContent.subtitle}
                </p>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                  {heroContent.buttonText}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section - Estática por enquanto */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Editor Visual', description: 'Edite diretamente clicando nas seções', icon: '🎨' },
              { title: 'Preview em Tempo Real', description: 'Veja as mudanças instantaneamente', icon: '👁️' },
              { title: 'Auto-Save', description: 'Suas alterações são salvas automaticamente', icon: '💾' }
            ].map((item, index) => (
              <div key={index} className="text-center">
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

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de clientes que já aumentaram suas conversões
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Criar Minha Landing Page
          </button>
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎯 Como Usar o Editor Visual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">1. Clique para Editar</h3>
              <p className="text-gray-600">Clique em qualquer seção (como a Hero acima) para editar diretamente</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">2. Edição Inline</h3>
              <p className="text-gray-600">Edite textos diretamente no preview, vendo as mudanças em tempo real</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">3. Salvamento Automático</h3>
              <p className="text-gray-600">Suas alterações são salvas automaticamente ou ao clicar em "Salvar"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">4. Preview Instantâneo</h3>
              <p className="text-gray-600">Não precisa sair da página para ver como ficará o resultado final</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
