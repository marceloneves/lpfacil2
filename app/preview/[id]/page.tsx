import { notFound } from 'next/navigation';
import { db } from '@/lib/firebaseConfig';

interface Props {
  params: Promise<{ id: string }>;
}

// Fazer isso server-side para evitar problemas de hidratação
async function getLandingPage(id: string) {
  try {
    if (!db) {
      return null;
    }

    const doc = await db.collection('landing-pages').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Erro ao buscar landing page:', error);
    return null;
  }
}

// Função helper para converter URLs de vídeo para formato embed
function convertToEmbedUrl(url: string): string {
  if (!url) return '';
  
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  // Se já for um URL embed, retorna como está
  if (url.includes('/embed/')) {
    return url;
  }
  
  return url;
}

export default async function PreviewPageSimple({ params }: Props) {
  const { id } = await params;
  const landingPageData = await getLandingPage(id);

  if (!landingPageData) {
    notFound();
  }

  return (
    <>
      {/* Renderização completa de todas as seções */}
      <div className="min-h-screen bg-white">
        {landingPageData.sections && landingPageData.sections.length > 0 ? (
          <>
            {landingPageData.sections.filter((section: any) => section.visible).map((section: any, index: number) => (
              <div key={index} className="w-full">
                {/* Menu */}
                {section.type === 'menu' && (
                  <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-blue-600">
                            {section.content.logo || '🏆'}
                          </span>
                          <span className="ml-2 text-xl font-bold text-gray-900">
                            {section.content.title || 'Logo'}
                          </span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                          {(section.content.items || [
                            { text: 'Início', href: '#hero' },
                            { text: 'Benefícios', href: '#benefits' },
                            { text: 'Como Funciona', href: '#demo' },
                            { text: 'Preços', href: '#pricing' },
                            { text: 'Contato', href: '#contact' }
                          ]).map((item: any, i: number) => (
                            <a
                              key={i}
                              href={item.href || '#'}
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {item.text || `Item ${i + 1}`}
                            </a>
                          ))}
                        </div>
                        <div>
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            {section.content.ctaButton?.text || 'Começar Agora'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </nav>
                )}

                {/* Hero */}
                {section.type === 'hero' && (
                  <div 
                    className="py-20" 
                    style={{
                      background: section.colors?.bg || '#f0f9ff',
                      color: section.colors?.text || '#1e40af'
                    }}
                  >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                          {section.content.title || 'Transforme Sua Vida com Nossa Solução Revolucionária'}
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-80">
                          {section.content.subtitle || 'Descubra como milhares de pessoas já mudaram suas vidas com nossa metodologia única e comprovada'}
                        </p>
                        <button 
                          className="px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                          style={{
                            backgroundColor: section.colors?.accent || '#3b82f6',
                            color: '#ffffff'
                          }}
                        >
                          {section.content.buttonText || 'Começar Agora'}
                          </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Problem + Solution */}
                {section.type === 'problem-solution' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#ffffff', color: section.colors?.text || '#1f2937' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Do Problema à Solução'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Entenda como podemos resolver seus principais desafios'}
                        </p>
                      </div>
                      
                      <div className={`grid gap-8 mb-12 ${section.content.showTransformation !== false ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
                        {/* Problema */}
                        <div 
                          className="p-8 rounded-xl shadow-lg text-center"
                          style={{ backgroundColor: section.content.problemBoxColor || '#3b82f6' }}
                        >
                          <div className="text-5xl mb-6">
                            {section.content.problemIcon || '😰'}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4">
                            {section.content.problem?.title || 'O Problema'}
                          </h3>
                          <p className="text-white opacity-90 mb-6">
                            {section.content.problem?.description || 'Você está enfrentando dificuldades que impedem seu crescimento e sucesso.'}
                          </p>
                          <ul className="text-white space-y-2">
                            {(section.content.problem?.painPoints || [
                              'Falta de resultados',
                              'Perda de tempo',
                              'Frustração constante'
                            ]).map((point: string, i: number) => (
                              <li key={i} className="flex items-center opacity-90">
                                <span className="mr-2">❌</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Transformação (se habilitada) */}
                        {section.content.showTransformation !== false && (
                          <div 
                            className="p-8 rounded-xl shadow-lg text-center"
                            style={{ backgroundColor: section.content.transformationBoxColor || '#3b82f6' }}
                          >
                            <div className="text-5xl mb-6 flex items-center justify-center space-x-2">
                              <span>{section.content.transformationBeforeIcon || '😰'}</span>
                              <span className="text-3xl">→</span>
                              <span>{section.content.transformationAfterIcon || '😊'}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                              {section.content.transformationTitle || 'A Transformação'}
                            </h3>
                            <div className="text-white space-y-4">
                              <div>
                                <p className="font-semibold mb-2">Antes:</p>
                                <p className="opacity-90">{section.content.transformation?.before || 'Situação atual problemática'}</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-2">Depois:</p>
                                <p className="opacity-90">{section.content.transformation?.after || 'Situação ideal desejada'}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Solução */}
                        <div 
                          className="p-8 rounded-xl shadow-lg text-center"
                          style={{ backgroundColor: section.content.solutionBoxColor || '#3b82f6' }}
                        >
                          <div className="text-5xl mb-6">
                            {section.content.solutionIcon || '✨'}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4">
                            {section.content.solution?.title || 'Nossa Solução'}
                          </h3>
                          <p className="text-white opacity-90 mb-6">
                            {section.content.solution?.description || 'A solução completa que vai transformar sua realidade de forma definitiva.'}
                          </p>
                          <ul className="text-white space-y-2">
                            {(section.content.solution?.benefits || [
                              'Resultados garantidos',
                              'Processo otimizado',
                              'Satisfação total'
                            ]).map((benefit: string, i: number) => (
                              <li key={i} className="flex items-center opacity-90">
                                <span className="mr-2">✅</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Value Proposition */}
                {section.type === 'value-proposition' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#f9fafb', color: section.colors?.text || '#374151' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Nossa Proposta de Valor'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Veja por que somos a melhor escolha para você'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(section.content.benefits || [
                          { icon: '💡', title: 'Inovação', description: 'Soluções inovadoras e modernas' },
                          { icon: '🚀', title: 'Resultados', description: 'Resultados rápidos e eficazes' },
                          { icon: '🎯', title: 'Precisão', description: 'Foco total no seu objetivo' }
                        ]).map((benefit: any, i: number) => (
                          <div key={i} className="text-center p-6 bg-white rounded-lg shadow-sm">
                            <div className="text-5xl mx-auto mb-4">
                              {benefit.icon || '💎'}
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                              {benefit.title || `Benefício ${i + 1}`}
                            </h3>
                            <p className="opacity-80">
                              {benefit.description || 'Descrição do benefício'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Benefits */}
                {section.type === 'key-benefits' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#ffffff', color: section.colors?.text || '#1f2937' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Principais Benefícios'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Descubra todas as vantagens que você terá'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {(section.content.keyBenefits || [
                          { icon: '⚡', title: 'Velocidade', description: 'Resultados em tempo recorde' },
                          { icon: '🛡️', title: 'Segurança', description: 'Totalmente seguro e confiável' },
                          { icon: '💰', title: 'Economia', description: 'Economize tempo e dinheiro' },
                          { icon: '🎯', title: 'Eficiência', description: 'Máxima eficiência garantida' },
                          { icon: '🔧', title: 'Simplicidade', description: 'Fácil de usar e implementar' },
                          { icon: '📈', title: 'Crescimento', description: 'Acelere seu crescimento' }
                        ]).map((benefit: any, i: number) => (
                          <div key={i} className="text-center p-6">
                            <div className="text-5xl mx-auto mb-3">
                              {benefit.icon || '🌟'}
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                              {benefit.title || `Benefício ${i + 1}`}
                            </h3>
                            <p className="opacity-80">
                              {benefit.description || 'Descrição do benefício'}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg mb-6 opacity-80">
                          {section.content.footerText || 'Junte-se a milhares de pessoas que já transformaram suas vidas'}
                        </p>
                        <button 
                          className="px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                          style={{
                            backgroundColor: section.colors?.accent || '#3b82f6',
                            color: '#ffffff'
                          }}
                        >
                          {section.content.ctaText || 'Começar Agora'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Demo / How It Works */}
                {section.type === 'demo' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#f9fafb', color: section.colors?.text || '#374151' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Como Funciona'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Veja como é simples e rápido conseguir seus resultados'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Video */}
                        <div className="order-2 lg:order-1">
                          {section.content.videoUrl && convertToEmbedUrl(section.content.videoUrl) ? (
                            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                              <iframe
                                key={section.content.videoUrl}
                                src={convertToEmbedUrl(section.content.videoUrl)}
                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64">
                              <div className="text-center">
                                <div className="text-6xl mb-4">
                                  {section.content.videoThumbnail || '🎬'}
                                </div>
                                <p className="text-gray-600">
                                  Vídeo demonstrativo
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Steps */}
                        <div className="order-1 lg:order-2 space-y-6">
                          {(section.content.steps || [
                            { icon: '1️⃣', title: 'Primeiro Passo', description: 'Faça seu cadastro em menos de 2 minutos' },
                            { icon: '2️⃣', title: 'Segundo Passo', description: 'Configure tudo do seu jeito' },
                            { icon: '3️⃣', title: 'Terceiro Passo', description: 'Comece a ver os resultados imediatamente' }
                          ]).map((step: any, i: number) => (
                            <div key={i} className="flex items-start space-x-4">
                              <div className="text-3xl">
                                {step.icon || `${i + 1}️⃣`}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold mb-2">
                                  {step.title || `Passo ${i + 1}`}
                                </h3>
                                <p className="opacity-80">
                                  {step.description || 'Descrição do passo'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                {section.type === 'features' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#ffffff', color: section.colors?.text || '#1f2937' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Principais Funcionalidades'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Conheça todas as funcionalidades incríveis'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(section.content.items || [
                          { icon: '⚡', title: 'Super Rápido', description: 'Velocidade incomparável' },
                          { icon: '🛡️', title: 'Seguro', description: 'Segurança total dos dados' },
                          { icon: '🔧', title: 'Personalizável', description: 'Adapte do seu jeito' },
                          { icon: '📱', title: 'Mobile', description: 'Funciona em qualquer dispositivo' },
                          { icon: '🎯', title: 'Intuitivo', description: 'Interface amigável' },
                          { icon: '🚀', title: 'Inovador', description: 'Tecnologia de ponta' }
                        ]).map((item: any, i: number) => (
                          <div key={i} className="text-center p-6">
                            <div className="text-5xl mb-4">
                              {item.icon || '⭐'}
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                              {item.title || `Feature ${i + 1}`}
                            </h3>
                            <p className="opacity-80">
                              {item.description || 'Descrição da funcionalidade'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonials */}
                {section.type === 'testimonials' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#f9fafb', color: section.colors?.text || '#374151' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'O Que Nossos Clientes Dizem'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Veja os depoimentos de quem já transformou sua vida'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(section.content.testimonials || [
                          { name: 'Maria Silva', role: 'Empresária', comment: 'Resultado incrível! Recomendo para todos.', avatar: '👩‍💼', rating: 5 },
                          { name: 'João Santos', role: 'Freelancer', comment: 'Mudou completamente minha forma de trabalhar.', avatar: '👨‍💻', rating: 5 },
                          { name: 'Ana Costa', role: 'Consultora', comment: 'Melhor investimento que já fiz na vida!', avatar: '👩‍🚀', rating: 5 }
                        ]).map((testimonial: any, i: number) => (
                          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center mb-4">
                              <div className="text-3xl">
                                {testimonial.avatar || '👤'}
                              </div>
                              <div className="ml-4">
                                <h4 className="font-bold">
                                  {testimonial.name || `Cliente ${i + 1}`}
                                </h4>
                                <p className="text-sm opacity-70">
                                  {testimonial.role || 'Cliente Satisfeito'}
                                </p>
                              </div>
                            </div>
                            <blockquote className="relative pl-6 pt-2">
                              <svg className="absolute left-0 top-0 w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 32 32">
                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.112-5.472-5.088-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                              </svg>
                              <p className="italic">
                                {testimonial.comment || 'Depoimento do cliente'}
                              </p>
                            </blockquote>
                            <div className="flex text-yellow-400 mt-4">
                              {[...Array(testimonial.rating || 5)].map((_, j) => (
                                <span key={j}>⭐</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {section.type === 'pricing' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#ffffff', color: section.colors?.text || '#1f2937' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Escolha Seu Plano'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Planos flexíveis para todas as necessidades'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(section.content.plans || [
                          { icon: '🌱', name: 'Básico', price: 'R$ 97', period: '/mês', features: ['Acesso básico', 'Suporte por email', '1 usuário'], popular: false },
                          { icon: '🚀', name: 'Premium', price: 'R$ 197', period: '/mês', features: ['Acesso completo', 'Suporte prioritário', '5 usuários'], popular: true },
                          { icon: '👑', name: 'Enterprise', price: 'R$ 497', period: '/mês', features: ['Acesso ilimitado', 'Suporte 24/7', 'Usuários ilimitados'], popular: false }
                        ]).map((plan: any, i: number) => (
                          <div key={i} className={`relative bg-white rounded-xl shadow-lg p-8 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                            {plan.popular && (
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                  Mais Popular
                                </span>
                              </div>
                            )}
                            
                            <div className="text-center">
                              <div className="text-5xl mb-4">
                                {plan.icon || '💎'}
                              </div>
                              <h3 className="text-2xl font-bold mb-4">
                                {plan.name || `Plano ${i + 1}`}
                              </h3>
                              <div className="mb-6">
                                <span className="text-4xl font-bold">
                                  {plan.price || 'R$ 97'}
                                </span>
                                <span className="text-gray-500">
                                  {plan.period || '/mês'}
                                </span>
                              </div>
                              
                              <ul className="space-y-3 mb-8">
                                {(plan.features || ['Feature 1', 'Feature 2', 'Feature 3']).map((feature: string, j: number) => (
                                  <li key={j} className="flex items-center">
                                    <span className="text-green-500 mr-2">✅</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              
                              <button 
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                                  plan.popular 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                              >
                                Escolher Plano
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ */}
                {section.type === 'faq' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#f9fafb', color: section.colors?.text || '#374151' }}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Perguntas Frequentes'}
                        </h2>
                        <p className="text-xl opacity-80">
                          {section.content.subtitle || 'Tire suas dúvidas sobre nossa plataforma'}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {(section.content.faqs || [
                          { question: 'Como funciona o período de teste?', answer: 'Você tem 14 dias grátis para testar todas as funcionalidades.' },
                          { question: 'Posso cancelar a qualquer momento?', answer: 'Sim, você pode cancelar sua assinatura a qualquer momento.' },
                          { question: 'Vocês oferecem suporte técnico?', answer: 'Sim, oferecemos suporte por email, chat e telefone.' }
                        ]).slice(0, section.content.maxQuestions || 10).map((faq: any, i: number) => (
                          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6">
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                {faq.question || 'Pergunta'}
                              </h3>
                              <p className="text-gray-600">
                                {faq.answer || 'Resposta da pergunta'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact */}
                {section.type === 'contact' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#ffffff', color: section.colors?.text || '#1f2937' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.content.title || 'Entre em Contato'}
                        </h2>
                        <p className="text-xl opacity-80 max-w-3xl mx-auto">
                          {section.content.subtitle || 'Estamos aqui para ajudar você'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                          {section.content.showEmail !== false && (
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl">
                                📧
                              </div>
                              <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="opacity-80">
                                  {section.content.email || 'contato@exemplo.com'}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {section.content.showPhone !== false && (
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl">
                                📞
                              </div>
                              <div>
                                <h3 className="font-semibold">Telefone</h3>
                                <p className="opacity-80">
                                  {section.content.phone || '(11) 99999-9999'}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {section.content.showAddress !== false && (
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl">
                                📍
                              </div>
                              <div>
                                <h3 className="font-semibold">Endereço</h3>
                                <p className="opacity-80">
                                  {section.content.address || 'São Paulo, SP - Brasil'}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Contact Form */}
                        <div className="bg-gray-50 rounded-lg p-8">
                          <form className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">Nome</label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Seu nome completo"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Email</label>
                              <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="seu@email.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Mensagem</label>
                              <textarea
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Sua mensagem..."
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Enviar Mensagem
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                {section.type === 'cta' && (
                  <div className="py-20" style={{ background: section.colors?.bg || '#3b82f6', color: section.colors?.text || '#ffffff' }}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        {section.content.title || 'Pronto Para Começar?'}
                      </h2>
                      <p className="text-xl opacity-90 mb-8">
                        {section.content.subtitle || 'Não perca mais tempo, comece sua transformação hoje mesmo'}
                      </p>
                      <button 
                        className="bg-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:bg-gray-100"
                        style={{ color: section.colors?.bg || '#3b82f6' }}
                      >
                        {section.content.buttonText || 'Começar Agora'}
                        </button>
                    </div>
                  </div>
                )}

                {/* Footer */}
                {section.type === 'footer' && (
                  <footer className="bg-gray-900 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl mr-2">
                              {section.content.logo || '🏆'}
                            </span>
                            <span className="text-xl font-bold">
                              {section.content.companyName || 'Sua Empresa'}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-4">
                            {section.content.description || 'Transformando vidas através da tecnologia e inovação.'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-4">Links Úteis</h3>
                          <ul className="space-y-2">
                            {(section.content.footerLinks || [
                              { text: 'Sobre', href: '#' },
                              { text: 'Contato', href: '#' },
                              { text: 'Suporte', href: '#' }
                            ]).map((link: any, i: number) => (
                              <li key={i}>
                                <a href={link.href || '#'} className="text-gray-400 hover:text-white transition-colors">
                                  {link.text || `Link ${i + 1}`}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-4">Redes Sociais</h3>
                          <div className="flex space-x-4">
                            {(section.content.socialLinks || [
                              { icon: '📘', href: '#' },
                              { icon: '📷', href: '#' },
                              { icon: '🐦', href: '#' }
                            ]).map((social: any, i: number) => (
                              <a
                                key={i}
                                href={social.href || '#'}
                                className="text-2xl hover:scale-110 transition-transform"
                              >
                                {social.icon || '🔗'}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-700 pt-8 text-center">
                        <p className="text-gray-400">
                          {section.content.copyright || '© 2024 Todos os direitos reservados'}
                      </p>
                    </div>
                  </div>
                  </footer>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Landing Page Vazia
              </h2>
              <p className="text-gray-600">
                Esta landing page não possui seções para exibir.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
