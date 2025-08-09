import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';
import { getCurrentUser, requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    // Verificar autenticação do usuário
    const user = await getCurrentUser(request);
    const authCheck = requireAuth(user);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: 401 }
      );
    }

    // Buscar apenas landing pages do usuário atual
    const snapshot = await db.collection('landing-pages')
      .where('userId', '==', user!.id)
      .get();

    const landingPages = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(landingPages);
  } catch (error) {
    console.error('Erro ao buscar landing pages:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase não configurado' },
        { status: 500 }
      );
    }

    // Verificar autenticação do usuário
    const user = await getCurrentUser(request);
    const authCheck = requireAuth(user);
    
    if (!authCheck.success) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, slug, template, sections, settings, status } = body;

    // Validação básica
    if (!title) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: 'Nome da página (slug) é obrigatório' },
        { status: 400 }
      );
    }

    // Validar formato do slug
    if (!/^[a-z0-9-]+$/.test(slug) || slug.length < 3 || slug.length > 50) {
      return NextResponse.json(
        { error: 'Nome da página deve conter apenas letras minúsculas, números e hífens (3-50 caracteres)' },
        { status: 400 }
      );
    }

    // Verificar se slug já existe
    const existingSlug = await db.collection('landing-pages')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (!existingSlug.empty) {
      return NextResponse.json(
        { error: 'Este nome de página já está em uso, escolha outro' },
        { status: 409 }
      );
    }

    // Seções padrão para uma nova landing page
    const defaultSections = [
      {
        type: 'menu',
        visible: true,
        content: {
          logo: 'LPFácil',
          items: [
            { label: 'Início', href: '#section-0' }
          ],
          ctaButton: {
            text: 'Começar Grátis',
            href: '#hero'
          }
        }
      },
      {
        type: 'hero',
        visible: true,
        content: {
          title: 'Transforme Visitantes em Clientes',
          subtitle: 'Crie landing pages profissionais que convertem mais com nosso editor visual intuitivo',
          buttonText: 'Começar Gratuitamente'
        }
      },
      {
        type: 'problem-solution',
        visible: true,
        content: {
          title: 'Você está cansado de perder vendas?',
          subtitle: 'Sabemos exatamente como você se sente',
          showTransformation: true,
          problemBoxColor: '#3b82f6',
          solutionBoxColor: '#3b82f6',
          transformationBoxColor: '#3b82f6',
          transformationTitle: 'A Transformação',
          problemIcon: '😰',
          solutionIcon: '✨',
          transformationBeforeIcon: '😔',
          transformationAfterIcon: '🎉',
          problem: {
            title: 'O Problema',
            description: 'Você trabalha duro criando conteúdo e produtos incríveis, mas suas landing pages não convertem. Visitantes chegam, olham rapidamente e vão embora sem comprar.',
            painPoints: [
              'Perda de clientes potenciais todos os dias',
              'Investimento em tráfego sem retorno',
              'Frustração com baixas conversões',
              'Concorrência capturando seus clientes'
            ]
          },
          solution: {
            title: 'A Solução',
            description: 'Nossa plataforma transforma visitantes em clientes com landing pages otimizadas e testadas. Templates profissionais que realmente convertem.',
            benefits: [
              'Aumento de 300% nas conversões',
              'ROI positivo em 30 dias',
              'Confiança nos seus resultados',
              'Vantagem competitiva garantida'
            ]
          },
          transformation: {
            before: 'Sem nossa solução: Baixas conversões, dinheiro desperdiçado, frustração constante',
            after: 'Com nossa solução: Altas conversões, ROI positivo, crescimento sustentável'
          }
        }
      },
      {
        type: 'value-proposition',
        visible: true,
        content: {
          title: 'Por que escolher nossa solução?',
          subtitle: 'Principais benefícios que fazem a diferença',
          benefits: [
            { title: 'Economia de Tempo', description: 'Crie landing pages profissionais em minutos, não horas', icon: '⏰' },
            { title: 'Resultados Comprovados', description: 'Aumente suas conversões em até 300% com nossos templates', icon: '📈' },
            { title: 'Sem Conhecimento Técnico', description: 'Interface intuitiva que qualquer pessoa pode usar', icon: '🎯' },
            { title: 'Suporte Completo', description: 'Equipe especializada pronta para ajudar você', icon: '🤝' }
          ]
        }
      },
      {
        type: 'key-benefits',
        visible: true,
        content: {
          title: 'Resultados que Realmente Importam',
          subtitle: 'Dados reais de quem já transformou seu negócio',
          keyBenefits: [
            {
              metric: '300%',
              label: 'Aumento nas Conversões',
              description: 'Clientes relatam aumento médio de 300% nas vendas após usar nossa plataforma',
              icon: '📈',
              timeframe: 'em 30 dias'
            },
            {
              metric: 'R$ 50k',
              label: 'Faturamento Extra por Mês',
              description: 'Receita adicional média gerada pelos nossos clientes mensalmente',
              icon: '💰',
              timeframe: 'por mês'
            },
            {
              metric: '89%',
              label: 'Redução no CAC',
              description: 'Diminuição no custo de aquisição de clientes com páginas otimizadas',
              icon: '🎯',
              timeframe: 'imediato'
            },
            {
              metric: '24h',
              label: 'Implementação Completa',
              description: 'Tempo médio para ter sua primeira landing page convertendo clientes',
              icon: '⚡',
              timeframe: 'setup inicial'
            }
          ],
          footerText: 'Estes são apenas alguns dos resultados que nossos clientes alcançaram.\nE você pode ser o próximo!',
          ctaText: 'Quero Estes Resultados Também'
        }
      },
              {
          type: 'demo',
          visible: true,
          content: {
            title: 'Veja Como É Simples',
            subtitle: 'Em apenas 3 passos você já tem sua landing page convertendo',
            videoUrl: 'https://youtu.be/exemplo ou https://vimeo.com/exemplo',
            videoThumbnail: '🎬',
            buttonText: 'Começar Agora - É Simples Assim!',
            steps: [
              {
                step: '1',
                title: 'Escolha seu Template',
                description: 'Selecione um dos nossos templates otimizados e personalize com suas cores e textos',
                icon: '🎨'
              },
              {
                step: '2',
                title: 'Edite Visualmente',
                description: 'Clique diretamente no que quer alterar. Sem código, sem complicação',
                icon: '✏️'
              },
              {
                step: '3',
                title: 'Publique e Converta',
                description: 'Com um clique sua página está no ar, pronta para gerar vendas',
                icon: '🚀'
              }
            ]
          }
        },
      {
        type: 'features',
        visible: true,
        content: {
          title: 'Principais Funcionalidades',
          items: [
            { title: 'Editor Visual', description: 'Edite diretamente clicando nas seções', icon: '🎨' },
            { title: 'Preview em Tempo Real', description: 'Veja as mudanças instantaneamente', icon: '👁️' },
            { title: 'Auto-Save', description: 'Suas alterações são salvas automaticamente', icon: '💾' }
          ]
        }
      },
      {
        type: 'pricing',
        visible: false,
        content: {
          title: 'Escolha seu plano',
          subtitle: 'Planos flexíveis para todas as necessidades',
          plans: [
            {
              name: 'Básico',
              price: 'R$ 29',
              period: '/mês',
              features: ['5 Landing Pages', 'Analytics Básico', 'Suporte por Email'],
              highlight: false,
              icon: '🌱'
            },
            {
              name: 'Pro',
              price: 'R$ 79',
              period: '/mês',
              features: ['Landing Pages Ilimitadas', 'Analytics Avançado', 'A/B Testing', 'Suporte Prioritário'],
              highlight: true,
              icon: '🚀'
            },
            {
              name: 'Enterprise',
              price: 'R$ 199',
              period: '/mês',
              features: ['Tudo do Pro', 'White Label', 'API Access', 'Suporte Dedicado'],
              highlight: false,
              icon: '👑'
            }
          ]
        }
      },
      {
        type: 'testimonials',
        visible: true,
        content: {
          title: 'O que nossos clientes dizem',
          subtitle: 'Depoimentos reais de quem já usa nossa plataforma',
          testimonials: [
            {
              name: 'Maria Silva',
              role: 'CEO, Tech Startup',
              comment: 'Conseguimos aumentar nossa conversão em 300% usando esta plataforma. Ferramenta incrível!',
              avatar: '👩‍💼'
            },
            {
              name: 'João Santos',
              role: 'Marketing Manager',
              comment: 'Interface intuitiva e resultados impressionantes. Recomendo para todas as empresas!',
              avatar: '👨‍💻'
            },
            {
              name: 'Ana Costa',
              role: 'Diretora Comercial',
              comment: 'Em apenas 30 dias triplicamos nossos leads. Investimento que se paga sozinho!',
              avatar: '👩‍🚀'
            }
          ]
        }
      },
      {
        type: 'faq',
        visible: true,
        content: {
          title: 'Perguntas Frequentes',
          subtitle: 'Tire suas dúvidas sobre nossa plataforma',
          maxQuestions: 10,
          faqs: [
            {
              question: 'Como funciona o período de teste?',
              answer: 'Você tem 14 dias grátis para testar todas as funcionalidades da plataforma sem compromisso.'
            },
            {
              question: 'Posso cancelar a qualquer momento?',
              answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.'
            },
            {
              question: 'Vocês oferecem suporte técnico?',
              answer: 'Sim, oferecemos suporte por email, chat e telefone dependendo do seu plano.'
            },
            {
              question: 'Quais são os métodos de pagamento aceitos?',
              answer: 'Aceitamos cartão de crédito, débito, PIX, boleto bancário e transferência bancária.'
            },
            {
              question: 'Posso personalizar minha landing page?',
              answer: 'Sim! Nossa plataforma oferece total personalização de cores, textos, imagens e layout.'
            },
            {
              question: 'A plataforma é responsiva para mobile?',
              answer: 'Absolutamente! Todas as landing pages são 100% responsivas e otimizadas para dispositivos móveis.'
            },
            {
              question: 'Vocês oferecem analytics e relatórios?',
              answer: 'Sim, fornecemos dashboard completo com métricas de conversão, visitantes e performance.'
            },
            {
              question: 'Posso integrar com outras ferramentas?',
              answer: 'Oferecemos integrações com CRM, email marketing, analytics e diversas outras ferramentas populares.'
            },
            {
              question: 'Há limite de páginas que posso criar?',
              answer: 'Depende do seu plano. O plano básico permite até 5 páginas, os demais são ilimitados.'
            },
            {
              question: 'Como funciona o backup dos meus dados?',
              answer: 'Fazemos backup automático diário de todos os seus dados e mantemos histórico de 30 dias.'
            }
          ]
        }
      },
      {
        type: 'impact-message',
        visible: true,
        content: {
          title: 'Não Deixe Suas Vendas Escaparem Por Mais Um Dia',
          subtitle: 'Cada minuto que você espera, são clientes indo para a concorrência',
          highlightText: 'Sua concorrência já está usando landing pages profissionais',
          motivationalText: 'Enquanto você pensa, eles faturam',
          urgencyText: 'O momento é AGORA',
          impactStats: [
            { label: 'Clientes perdidos hoje', value: '47', unit: 'leads' },
            { label: 'Faturamento perdido', value: 'R$ 12k', unit: 'hoje' },
            { label: 'Dias sem otimização', value: '∞', unit: 'prejuízo' }
          ]
        }
      },
      {
        type: 'final-cta',
        visible: true,
        content: {
          title: 'Garanta Sua Transformação Agora',
          subtitle: 'Tudo que você precisa para ter landing pages que realmente convertem',
          offerTitle: 'Oferta Completa - LPFácil Pro',
          offerFeatures: [
            'Templates profissionais otimizados',
            'Editor visual sem código',
            'Analytics e métricas detalhadas',
            'Suporte especializado',
            'Garantia de 30 dias'
          ],
          originalPrice: 'R$ 297',
          currentPrice: 'R$ 97',
          discount: '67% OFF',
          buttonText: 'Começar Minha Transformação Agora',
          motivationalPhrase: 'Comece hoje e veja resultados em 24h',
          urgencyText: 'Oferta por tempo limitado',
          guaranteeText: '30 dias de garantia total'
        }
      },
      {
        type: 'cta',
        visible: false,
        content: {
          title: 'Pronto para começar?',
          subtitle: 'Crie sua primeira landing page hoje mesmo e veja os resultados',
          buttonText: 'Começar Gratuitamente'
        }
      },
      {
        type: 'contact',
        visible: false,
        content: {
          title: 'Entre em contato',
          subtitle: 'Fale conosco e tire suas dúvidas',
          email: 'contato@lpfacil.com',
          phone: '+55 (11) 99999-9999',
          address: 'São Paulo, SP - Brasil',
          showEmail: true,
          showPhone: true,
          showAddress: true
        }
      },
      {
        type: 'footer',
        visible: true,
        content: {
          companyName: 'LPFácil',
          description: 'Criando landing pages que realmente convertem',
          email: 'contato@lpfacil.com',
          phone: '+55 (11) 99999-9999',
          address: 'São Paulo, SP - Brasil',
          socialLinks: [
            { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
            { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
            { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
            { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
          ],
          footerLinks: [
            { name: 'Política de Privacidade', url: '/privacidade' },
            { name: 'Termos de Uso', url: '/termos' },
            { name: 'Suporte', url: '/suporte' }
          ],
          copyright: '© 2024 LPFácil. Todos os direitos reservados.'
        }
      }
    ];

    // Inicializar cores padrão: preto para texto, azul para destaque, cinza/branco para fundo
    const sectionsToUse = sections && sections.length > 0 ? sections : defaultSections;
    const defaultSectionColors: {[key: number]: {bg: string, text: string, accent: string}} = {};
    
    sectionsToUse.forEach((section, index) => {
      // Seção footer deve ter fundo preto
      if (section.type === 'footer') {
        defaultSectionColors[index] = {
          bg: '#000000',      // Preto para footer
          text: '#ffffff',    // Branco para texto no footer
          accent: '#f97316'   // Laranja para destaque no footer
        };
      } else if (index % 2 === 0) {
        // Seções pares: fundo branco
        defaultSectionColors[index] = {
          bg: '#ffffff',      // Branco
          text: '#000000',    // Preto  
          accent: '#3b82f6'   // Azul
        };
      } else {
        // Seções ímpares: fundo cinza claro
        defaultSectionColors[index] = {
          bg: '#f9fafb',      // Cinza muito claro
          text: '#000000',    // Preto
          accent: '#3b82f6'   // Azul
        };
      }
    });

    const landingPageData = {
      title,
      slug,
      userId: user!.id, // Usar ID do usuário autenticado
      template: template || 'default',
      sections: sectionsToUse,
      sectionColors: defaultSectionColors,
      settings: settings || {},
      status: status || 'draft',
      views: 0,
      conversions: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection('landing-pages').add(landingPageData);
    
    const newLandingPage = {
      id: docRef.id,
      ...landingPageData,
    };

    return NextResponse.json(newLandingPage, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar landing page:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
