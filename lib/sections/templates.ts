import { SectionTemplate, SectionType } from '../types/editor';

// Biblioteca de seções pré-definidas
export const sectionTemplates: SectionTemplate[] = [
  // Hero Sections
  {
    id: 'hero-centered',
    type: 'hero',
    name: 'Hero Centralizado',
    description: 'Seção principal com título, subtítulo e CTA centralizados',
    category: 'Hero',
    thumbnail: '🎯',
    defaultContent: {
      title: 'Transforme Seus Visitantes em Clientes',
      subtitle: 'A solução completa para criar landing pages de alta conversão',
      description: 'Aumente suas vendas com landing pages otimizadas e profissionais. Sem complicação, sem código.',
      buttonText: 'Começar Agora',
      buttonLink: '#',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'
    },
    defaultStyles: {
      backgroundColor: '#1e40af',
      textColor: '#ffffff',
      padding: { top: 80, bottom: 80, left: 20, right: 20 },
      alignment: 'center',
      shadow: false
    }
  },
  {
    id: 'hero-split',
    type: 'hero',
    name: 'Hero Dividido',
    description: 'Hero com texto à esquerda e imagem à direita',
    category: 'Hero',
    thumbnail: '📱',
    defaultContent: {
      title: 'Crie Landing Pages Incríveis',
      subtitle: 'Sem conhecimento técnico',
      description: 'Editor visual intuitivo com componentes prontos para usar.',
      buttonText: 'Testar Grátis',
      buttonLink: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    defaultStyles: {
      backgroundColor: '#f8fafc',
      textColor: '#1f2937',
      padding: { top: 60, bottom: 60, left: 20, right: 20 },
      alignment: 'left',
      shadow: false
    }
  },

  // Features Sections
  {
    id: 'features-grid',
    type: 'features',
    name: 'Features em Grade',
    description: 'Grid de recursos com ícones e descrições',
    category: 'Recursos',
    thumbnail: '⚡',
    defaultContent: {
      title: 'Por Que Escolher Nossa Solução?',
      subtitle: 'Recursos que fazem a diferença',
      items: [
        {
          id: '1',
          title: 'Editor Visual',
          description: 'Crie suas páginas sem escrever código',
          icon: '🎨'
        },
        {
          id: '2',
          title: 'Templates Prontos',
          description: 'Dezenas de templates profissionais',
          icon: '📋'
        },
        {
          id: '3',
          title: 'Otimização Automática',
          description: 'SEO e velocidade otimizados automaticamente',
          icon: '🚀'
        },
        {
          id: '4',
          title: 'Analytics Integrado',
          description: 'Acompanhe suas conversões em tempo real',
          icon: '📊'
        }
      ]
    },
    defaultStyles: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 60, bottom: 60, left: 20, right: 20 },
      alignment: 'center',
      shadow: false
    }
  },
  {
    id: 'features-list',
    type: 'features',
    name: 'Lista de Features',
    description: 'Lista vertical de recursos com destaque',
    category: 'Recursos',
    thumbnail: '📝',
    defaultContent: {
      title: 'Tudo Que Você Precisa',
      subtitle: 'Uma plataforma completa',
      items: [
        {
          id: '1',
          title: 'Drag & Drop',
          description: 'Arraste e solte elementos facilmente',
          icon: '🎯'
        },
        {
          id: '2',
          title: 'Responsivo',
          description: 'Perfeito em todos os dispositivos',
          icon: '📱'
        },
        {
          id: '3',
          title: 'Integrações',
          description: 'Conecte com suas ferramentas favoritas',
          icon: '🔗'
        }
      ]
    },
    defaultStyles: {
      backgroundColor: '#f9fafb',
      textColor: '#111827',
      padding: { top: 60, bottom: 60, left: 20, right: 20 },
      alignment: 'left',
      shadow: false
    }
  },

  // Testimonials
  {
    id: 'testimonials-cards',
    type: 'testimonials',
    name: 'Depoimentos em Cards',
    description: 'Depoimentos de clientes em formato de cards',
    category: 'Social Proof',
    thumbnail: '💬',
    defaultContent: {
      title: 'O Que Nossos Clientes Dizem',
      subtitle: 'Histórias de sucesso reais',
      items: [
        {
          id: '1',
          title: 'João Silva',
          description: 'Aumentei minhas conversões em 300% usando esta plataforma. Simplesmente incrível!',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        },
        {
          id: '2',
          title: 'Maria Santos',
          description: 'O editor é super intuitivo. Consegui criar minha landing page em minutos.',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612c7e5?w=100&h=100&fit=crop&crop=face'
        },
        {
          id: '3',
          title: 'Pedro Costa',
          description: 'Excelente suporte e resultado acima das expectativas. Recomendo!',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        }
      ]
    },
    defaultStyles: {
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
      padding: { top: 60, bottom: 60, left: 20, right: 20 },
      alignment: 'center',
      shadow: true
    }
  },

  // Pricing
  {
    id: 'pricing-simple',
    type: 'pricing',
    name: 'Preços Simples',
    description: 'Tabela de preços limpa e clara',
    category: 'Vendas',
    thumbnail: '💰',
    defaultContent: {
      title: 'Planos Que Cabem No Seu Bolso',
      subtitle: 'Escolha o plano ideal para você',
      items: [
        {
          id: '1',
          title: 'Básico',
          description: 'R$ 29/mês\n• 3 Landing Pages\n• Templates Básicos\n• Suporte por Email',
          icon: '🚀'
        },
        {
          id: '2',
          title: 'Pro',
          description: 'R$ 59/mês\n• 10 Landing Pages\n• Todos os Templates\n• Suporte Prioritário\n• Analytics Avançado',
          icon: '⭐'
        },
        {
          id: '3',
          title: 'Empresa',
          description: 'R$ 99/mês\n• Landing Pages Ilimitadas\n• White Label\n• Suporte Dedicado\n• API Personalizada',
          icon: '👑'
        }
      ]
    },
    defaultStyles: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 60, bottom: 60, left: 20, right: 20 },
      alignment: 'center',
      shadow: false
    }
  },

  // CTA
  {
    id: 'cta-simple',
    type: 'cta',
    name: 'CTA Simples',
    description: 'Call-to-action direto e eficiente',
    category: 'Conversão',
    thumbnail: '🎯',
    defaultContent: {
      title: 'Pronto Para Começar?',
      subtitle: 'Junte-se a milhares de empresas que já transformaram seus resultados',
      buttonText: 'Começar Agora - Grátis',
      buttonLink: '#'
    },
    defaultStyles: {
      backgroundColor: '#059669',
      textColor: '#ffffff',
      padding: { top: 50, bottom: 50, left: 20, right: 20 },
      alignment: 'center',
      shadow: false
    }
  },

  // FAQ
  {
    id: 'faq-accordion',
    type: 'faq',
    name: 'FAQ Accordion',
    description: 'Perguntas frequentes em formato accordion',
    category: 'Suporte',
    thumbnail: '❓',
    defaultContent: {
      title: 'Perguntas Frequentes',
      subtitle: 'Tire suas dúvidas',
      items: [
        {
          id: '1',
          title: 'Como funciona o período de teste?',
          description: 'Você tem 14 dias para testar todas as funcionalidades sem compromisso.'
        },
        {
          id: '2',
          title: 'Posso cancelar a qualquer momento?',
          description: 'Sim, você pode cancelar sua assinatura a qualquer momento sem multas.'
        },
        {
          id: '3',
          title: 'Preciso ter conhecimento técnico?',
          description: 'Não! Nossa plataforma foi desenvolvida para ser simples e intuitiva.'
        }
      ]
    },
    defaultStyles: {
      backgroundColor: '#f9fafb',
      textColor: '#374151',
      padding: { top: 60, bottom: 60, left: 20, right: 20 },
      alignment: 'left',
      shadow: false
    }
  },

  // Contact
  {
    id: 'contact-form',
    type: 'contact',
    name: 'Formulário de Contato',
    description: 'Formulário simples para captura de leads',
    category: 'Contato',
    thumbnail: '📧',
    defaultContent: {
      title: 'Entre em Contato',
      subtitle: 'Vamos conversar sobre seu projeto',
      description: 'Preencha o formulário e nossa equipe entrará em contato em até 24 horas.'
    },
    defaultStyles: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      padding: { top: 60, bottom: 60, left: 20, right: 20 },
      alignment: 'center',
      shadow: true
    }
  }
];

// Organizar por categoria
export const sectionCategories = [
  'Hero',
  'Recursos', 
  'Social Proof',
  'Vendas',
  'Conversão',
  'Suporte',
  'Contato'
];

// Utilitários
export const getSectionsByCategory = (category: string) => {
  return sectionTemplates.filter(template => template.category === category);
};

export const getSectionTemplate = (id: string) => {
  return sectionTemplates.find(template => template.id === id);
};

export const createSectionFromTemplate = (templateId: string, order: number = 0) => {
  const template = getSectionTemplate(templateId);
  if (!template) return null;

  return {
    id: `${template.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: template.type,
    name: template.name,
    content: { ...template.defaultContent },
    styles: { ...template.defaultStyles },
    order,
    visible: true
  };
};
