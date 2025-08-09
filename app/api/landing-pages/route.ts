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
        type: 'hero',
        visible: true,
        content: {
          title: 'Transforme Visitantes em Clientes',
          subtitle: 'Crie landing pages profissionais que convertem mais com nosso editor visual intuitivo',
          buttonText: 'Começar Gratuitamente'
        }
      },
      {
        type: 'features',
        visible: true,
        content: {
          title: 'Funcionalidades Principais',
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
              highlight: false
            },
            {
              name: 'Pro',
              price: 'R$ 79',
              period: '/mês',
              features: ['Landing Pages Ilimitadas', 'Analytics Avançado', 'A/B Testing', 'Suporte Prioritário'],
              highlight: true
            },
            {
              name: 'Enterprise',
              price: 'R$ 199',
              period: '/mês',
              features: ['Tudo do Pro', 'White Label', 'API Access', 'Suporte Dedicado'],
              highlight: false
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
          address: 'São Paulo, SP - Brasil'
        }
      }
    ];

    const landingPageData = {
      title,
      slug,
      userId: user!.id, // Usar ID do usuário autenticado
      template: template || 'default',
      sections: sections && sections.length > 0 ? sections : defaultSections,
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
