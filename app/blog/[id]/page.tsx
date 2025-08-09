'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useHydration } from '../../hooks/useHydration';
import LoadingSpinner from '../../components/LoadingSpinner';
import Logo from '../../components/Logo';

// Dados dos artigos (em uma aplicação real, viriam de uma API ou banco de dados)
const blogArticles = [
  {
    id: 1,
    title: 'Como Criar Landing Pages que Convertem: Guia Completo 2024',
    excerpt: 'Descubra as estratégias e técnicas mais eficazes para criar landing pages que realmente convertem visitantes em clientes. Um guia passo a passo.',
    content: `
    <p>Landing pages eficazes são a chave para o sucesso no marketing digital. Elas são páginas específicas criadas para converter visitantes em leads ou clientes, focando em uma única ação desejada.</p>

    <h2>1. Defina um Objetivo Claro</h2>
    <p>Antes de começar a criar sua landing page, você precisa ter um objetivo muito claro. Seja para:</p>
    <ul>
      <li>Capturar emails para sua newsletter</li>
      <li>Vender um produto específico</li>
      <li>Registrar usuários para um webinar</li>
      <li>Baixar um material gratuito</li>
    </ul>

    <h2>2. Crie um Headline Irresistível</h2>
    <p>Seu headline é a primeira coisa que os visitantes veem. Ele deve ser:</p>
    <ul>
      <li>Claro e direto</li>
      <li>Focado no benefício principal</li>
      <li>Criativo o suficiente para chamar atenção</li>
    </ul>

    <h2>3. Use Elementos Visuais Estratégicos</h2>
    <p>Imagens, vídeos e gráficos devem apoiar sua mensagem principal. Evite elementos que distraiam do seu objetivo principal.</p>

    <h2>4. Teste e Otimize Constantemente</h2>
    <p>Use ferramentas de A/B testing para testar diferentes versões da sua landing page e descobrir o que funciona melhor para seu público.</p>

    <h2>Conclusão</h2>
    <p>Criar landing pages que convertem é uma combinação de arte e ciência. Seguindo essas práticas e testando constantemente, você verá suas taxas de conversão melhorarem significativamente.</p>
    `,
    author: 'Ana Silva',
    date: '2024-01-15',
    category: 'Conversão',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    tags: ['landing pages', 'conversão', 'marketing digital']
  },
  {
    id: 2,
    title: '10 Elementos Essenciais de uma Landing Page de Alta Conversão',
    excerpt: 'Conheça os elementos fundamentais que toda landing page de sucesso deve ter para maximizar as conversões e gerar mais leads.',
    content: `
    <p>Uma landing page bem estruturada pode ser a diferença entre o sucesso e o fracasso de uma campanha de marketing. Aqui estão os 10 elementos essenciais:</p>

    <h2>1. Headline Principal</h2>
    <p>O título deve capturar a atenção imediatamente e comunicar o valor principal da sua oferta.</p>

    <h2>2. Subtítulo Explicativo</h2>
    <p>Use um subtítulo para explicar melhor sua proposta de valor e como ela beneficia o visitante.</p>

    <h2>3. Call-to-Action (CTA) Claro</h2>
    <p>Seu botão de ação deve ser visível, usar verbos de ação e criar urgência.</p>

    <h2>4. Formulário Otimizado</h2>
    <p>Mantenha os formulários simples - peça apenas as informações essenciais.</p>

    <h2>5. Prova Social</h2>
    <p>Inclua depoimentos, logos de clientes, números de usuários ou avaliações.</p>

    <h2>6. Imagens ou Vídeos Relevantes</h2>
    <p>Use elementos visuais que apoiem sua mensagem e mostrem seu produto em ação.</p>

    <h2>7. Benefícios Claros</h2>
    <p>Liste os principais benefícios que o visitante receberá ao aceitar sua oferta.</p>

    <h2>8. Design Responsivo</h2>
    <p>Certifique-se de que sua landing page funciona perfeitamente em todos os dispositivos.</p>

    <h2>9. Carregamento Rápido</h2>
    <p>Velocidade é crucial - páginas lentas afastam visitantes.</p>

    <h2>10. Remoção de Distrações</h2>
    <p>Remova menus de navegação, links externos e qualquer elemento que possa desviar a atenção do seu objetivo.</p>
    `,
    author: 'Carlos Santos',
    date: '2024-01-12',
    category: 'Design',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop',
    tags: ['design', 'ux', 'conversão']
  },
  {
    id: 3,
    title: 'A/B Testing para Landing Pages: Como Otimizar suas Conversões',
    excerpt: 'Aprenda como usar testes A/B para otimizar suas landing pages e aumentar significativamente suas taxas de conversão.',
    content: `
    <p>O A/B testing é uma das ferramentas mais poderosas para otimização de landing pages. Permite testar diferentes versões para descobrir qual converte melhor.</p>

    <h2>O que é A/B Testing?</h2>
    <p>A/B testing, também conhecido como split testing, é um método de comparar duas versões de uma página para determinar qual tem melhor performance.</p>

    <h2>Elementos Para Testar</h2>
    <ul>
      <li><strong>Headlines:</strong> Teste diferentes títulos para ver qual gera mais engajamento</li>
      <li><strong>CTAs:</strong> Experimente cores, textos e posicionamentos diferentes</li>
      <li><strong>Formulários:</strong> Teste quantidade de campos e tipos de informação</li>
      <li><strong>Imagens:</strong> Compare diferentes fotos ou gráficos</li>
      <li><strong>Layout:</strong> Teste disposições diferentes dos elementos</li>
    </ul>

    <h2>Como Configurar um Teste A/B</h2>
    <ol>
      <li>Defina uma hipótese clara</li>
      <li>Escolha uma métrica principal</li>
      <li>Determine o tamanho da amostra</li>
      <li>Execute o teste por tempo suficiente</li>
      <li>Analise os resultados estatisticamente</li>
    </ol>

    <h2>Ferramentas Recomendadas</h2>
    <ul>
      <li>Google Optimize (gratuito)</li>
      <li>Optimizely</li>
      <li>VWO</li>
      <li>Unbounce</li>
    </ul>

    <h2>Dicas Importantes</h2>
    <p>Teste apenas um elemento por vez para obter resultados claros. Tenha paciência - resultados confiáveis levam tempo para aparecer.</p>
    `,
    author: 'Maria Oliveira',
    date: '2024-01-10',
    category: 'Otimização',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    tags: ['a/b testing', 'otimização', 'dados']
  }
  // Adicione mais artigos conforme necessário...
];

export default function BlogArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHydrated = useHydration();

  useEffect(() => {
    if (params.id) {
      const foundArticle = blogArticles.find(a => a.id === parseInt(params.id as string));
      setArticle(foundArticle);

      // Buscar artigos relacionados (mesmo categoria, excluindo o atual)
      if (foundArticle) {
        const related = blogArticles
          .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
          .slice(0, 3);
        setRelatedArticles(related);
      }
    }
  }, [params.id]);

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            ← Voltar para o blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Logo size="md" />
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Início</Link>
              <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">Recursos</a>
              <a href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Preços</a>
              <a href="/#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Depoimentos</a>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors font-semibold">Blog</Link>
              <Link href="/contato" className="text-gray-600 hover:text-gray-900 transition-colors">Contato</Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Entrar
              </Link>
              <Link 
                href="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Início</Link>
              <a href="/#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Recursos</a>
              <a href="/#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Preços</a>
              <a href="/#testimonials" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Depoimentos</a>
              <Link href="/blog" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-semibold">Blog</Link>
              <Link href="/contato" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Contato</Link>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link href="/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Entrar</Link>
                <Link href="/signup" className="block px-3 py-2 bg-blue-600 text-white rounded-lg mx-3 text-center hover:bg-blue-700 transition-colors">
                  Começar Grátis
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-gray-700">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-900 font-medium">
                {article.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-gray-500">{article.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between border-b border-gray-200 pb-8">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {article.author.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{article.author}</p>
                  <p className="text-gray-500">{formatDate(article.date)}</p>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">Compartilhar:</span>
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Artigos Relacionados
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <article key={relatedArticle.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {relatedArticle.category}
                      </span>
                      <span className="text-sm text-gray-500">{relatedArticle.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${relatedArticle.id}`}>
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${relatedArticle.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                    >
                      Ler mais
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Ver todos os artigos
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Gostou do artigo?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Assine nossa newsletter e receba mais conteúdos como este direto no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Assinar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo size="sm" textColor="text-white" linkToHome={false} className="mb-4" />
              <p className="text-gray-400">
                A plataforma mais simples e eficaz para criar landing pages que convertem.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#features" className="hover:text-white transition-colors">Recursos</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Preços</Link></li>

                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LPFácil2. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
