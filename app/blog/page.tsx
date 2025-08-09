'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useHydration } from '../hooks/useHydration';
import LoadingSpinner from '../components/LoadingSpinner';
import Logo from '../components/Logo';

// Dados dos artigos do blog
const blogArticles = [
  {
    id: 1,
    title: 'Como Criar Landing Pages que Convertem: Guia Completo 2024',
    excerpt: 'Descubra as estratégias e técnicas mais eficazes para criar landing pages que realmente convertem visitantes em clientes. Um guia passo a passo.',
    content: 'Landing pages eficazes são a chave para o sucesso no marketing digital...',
    author: 'Ana Silva',
    date: '2024-01-15',
    category: 'Conversão',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    tags: ['landing pages', 'conversão', 'marketing digital']
  },
  {
    id: 2,
    title: '10 Elementos Essenciais de uma Landing Page de Alta Conversão',
    excerpt: 'Conheça os elementos fundamentais que toda landing page de sucesso deve ter para maximizar as conversões e gerar mais leads.',
    content: 'Uma landing page bem estruturada pode ser a diferença entre o sucesso e o fracasso...',
    author: 'Carlos Santos',
    date: '2024-01-12',
    category: 'Design',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
    tags: ['design', 'ux', 'conversão']
  },
  {
    id: 3,
    title: 'A/B Testing para Landing Pages: Como Otimizar suas Conversões',
    excerpt: 'Aprenda como usar testes A/B para otimizar suas landing pages e aumentar significativamente suas taxas de conversão.',
    content: 'O A/B testing é uma das ferramentas mais poderosas para otimização...',
    author: 'Maria Oliveira',
    date: '2024-01-10',
    category: 'Otimização',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tags: ['a/b testing', 'otimização', 'dados']
  },
  {
    id: 4,
    title: 'Psicologia das Cores em Landing Pages: Como Influenciar Decisões',
    excerpt: 'Entenda como as cores podem impactar psicologicamente seus visitantes e como usar isso para aumentar suas conversões.',
    content: 'As cores têm um impacto profundo na psicologia humana...',
    author: 'João Ferreira',
    date: '2024-01-08',
    category: 'Psicologia',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=400&fit=crop',
    tags: ['psicologia', 'cores', 'design']
  },
  {
    id: 5,
    title: 'Mobile-First: Criando Landing Pages Responsivas que Convertem',
    excerpt: 'Com mais de 60% do tráfego vindo de dispositivos móveis, aprenda como criar landing pages que convertem em qualquer tela.',
    content: 'O design mobile-first não é mais uma opção, é uma necessidade...',
    author: 'Patricia Lima',
    date: '2024-01-05',
    category: 'Mobile',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    tags: ['mobile', 'responsivo', 'ux']
  },
  {
    id: 6,
    title: 'Copywriting para Landing Pages: Palavras que Vendem',
    excerpt: 'Descubra as técnicas de copywriting mais eficazes para criar textos que persuadem e convertem visitantes em clientes.',
    content: 'O copywriting é a arte de escrever textos que vendem...',
    author: 'Roberto Costa',
    date: '2024-01-03',
    category: 'Copywriting',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
    tags: ['copywriting', 'persuasão', 'vendas']
  },
  {
    id: 7,
    title: 'Formulários de Landing Page: Como Aumentar as Conversões',
    excerpt: 'Aprenda as melhores práticas para criar formulários que não assustam os visitantes e maximizam as taxas de preenchimento.',
    content: 'Formulários são pontos críticos em qualquer landing page...',
    author: 'Amanda Silva',
    date: '2024-01-01',
    category: 'Formulários',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop',
    tags: ['formulários', 'ux', 'conversão']
  },
  {
    id: 8,
    title: 'Landing Page vs Página de Vendas: Quando Usar Cada Uma',
    excerpt: 'Entenda as diferenças fundamentais entre landing pages e páginas de vendas e quando cada uma é mais eficaz.',
    content: 'Embora sejam frequentemente confundidas, landing pages e páginas de vendas...',
    author: 'Lucas Mendes',
    date: '2023-12-28',
    category: 'Estratégia',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
    tags: ['estratégia', 'vendas', 'marketing']
  },
  {
    id: 9,
    title: 'SEO para Landing Pages: Como Rankear e Converter',
    excerpt: 'Descubra como otimizar suas landing pages para os mecanismos de busca sem comprometer as conversões.',
    content: 'SEO e conversão podem parecer objetivos conflitantes...',
    author: 'Fernanda Rocha',
    date: '2023-12-25',
    category: 'SEO',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=400&fit=crop',
    tags: ['seo', 'tráfego orgânico', 'otimização']
  },
  {
    id: 10,
    title: 'Ferramentas Essenciais para Criar Landing Pages Profissionais',
    excerpt: 'Conheça as melhores ferramentas disponíveis no mercado para criar, testar e otimizar suas landing pages como um profissional.',
    content: 'Ter as ferramentas certas pode fazer toda a diferença...',
    author: 'Diego Santos',
    date: '2023-12-22',
    category: 'Ferramentas',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop',
    tags: ['ferramentas', 'produtividade', 'tecnologia']
  }
];

const categories = ['Todos', 'Conversão', 'Design', 'Otimização', 'Psicologia', 'Mobile', 'Copywriting', 'Formulários', 'Estratégia', 'SEO', 'Ferramentas'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHydrated = useHydration();

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  // Filtrar artigos por categoria e termo de busca
  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog LPFácil2
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Aprenda as melhores estratégias para criar landing pages que convertem, 
            dicas de otimização e insights do mundo do marketing digital.
          </p>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Busca */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Categorias */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Artigos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.185-5.5-3M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
              <p className="text-gray-600">Tente ajustar sua busca ou selecionar uma categoria diferente.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${article.id}`}>
                        {article.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">
                            {article.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{article.author}</p>
                          <p className="text-xs text-gray-500">{formatDate(article.date)}</p>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/blog/${article.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                      >
                        Ler mais
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Resultados */}
          {filteredArticles.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Mostrando {filteredArticles.length} de {blogArticles.length} artigos
                {selectedCategory !== 'Todos' && ` na categoria "${selectedCategory}"`}
                {searchTerm && ` para "${searchTerm}"`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não perca nenhuma novidade!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Assine nossa newsletter e receba as melhores dicas de marketing digital direto no seu email.
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
