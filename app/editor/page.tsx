'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import Logo from '@/app/components/Logo';

interface SectionContent {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showButton?: boolean;
  textSize?: string;
  items?: any[];
  plans?: any[];
  testimonials?: any[];
  faqs?: any[];
  benefits?: any[];
  keyBenefits?: any[];
  steps?: any[];
  videoUrl?: string;
  videoThumbnail?: string;
  footerText?: string;
  ctaText?: string;
  // Configurações de exibição para seção de contato
  showEmail?: boolean;
  showPhone?: boolean;
  showAddress?: boolean;
  // Configurações de exibição para seção FAQ
  maxQuestions?: number;
  // Impact Message fields
  highlightText?: string;
  motivationalText?: string;
  urgencyText?: string;
  impactStats?: any[];
  // Final CTA fields
  offerTitle?: string;
  offerFeatures?: string[];
  originalPrice?: string;
  currentPrice?: string;
  discount?: string;
  motivationalPhrase?: string;
  guaranteeText?: string;
  // Problem-Solution section fields
  showTransformation?: boolean;
  problemBoxColor?: string;
  solutionBoxColor?: string;
  transformationBoxColor?: string;
  transformationTitle?: string;
  problemIcon?: string;
  solutionIcon?: string;
  transformationBeforeIcon?: string;
  transformationAfterIcon?: string;
  problem?: {
    title: string;
    description: string;
    painPoints: string[];
  };
  solution?: {
    title: string;
    description: string;
    benefits: string[];
  };
  transformation?: {
    before: string;
    after: string;
  };
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
  ctaButton?: {
    text: string;
    href: string;
  };
  // Footer fields
  companyName?: string;
  description?: string;
  socialLinks?: any[];
  footerLinks?: any[];
  copyright?: string;
}

interface Section {
  type: string;
  visible: boolean;
  content: SectionContent;
}

export default function EditorHybrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [landingPageId, setLandingPageId] = useState<string | null>(null);
  const [landingPageTitle, setLandingPageTitle] = useState('Minha Landing Page');
  const [sections, setSections] = useState<Section[]>([
    {
      type: 'menu',
      visible: true,
      content: {
        logo: 'LPFácil',
        items: [
          { label: 'Início', href: '#hero' },
          { label: 'Funcionalidades', href: '#features' },
          { label: 'Depoimentos', href: '#testimonials' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Contato', href: '#contact' }
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
        ]
      }
    },
    {
      type: 'demo',
      visible: true,
      content: {
        title: 'Veja Como É Simples',
        subtitle: 'Em apenas 3 passos você já tem sua landing page convertendo',
        videoUrl: 'https://player.vimeo.com/video/example',
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
      type: 'pricing',
      visible: false,
      content: {
        title: 'Planos que cabem no seu bolso',
        subtitle: 'Escolha o plano ideal para seu negócio',
        plans: [
          {
            name: 'Básico',
            price: 'R$ 29',
            period: '/mês',
            features: ['5 Landing Pages', 'Analytics Básico', 'Suporte por Email'],
            highlighted: false,
            icon: '🌱'
          },
          {
            name: 'Pro',
            price: 'R$ 79',
            period: '/mês',
            features: ['20 Landing Pages', 'Analytics Avançado', 'Suporte Prioritário', 'A/B Testing'],
            highlighted: true,
            icon: '🚀'
          },
          {
            name: 'Enterprise',
            price: 'R$ 199',
            period: '/mês',
            features: ['Landing Pages Ilimitadas', 'Analytics Completo', 'Suporte 24/7', 'White Label'],
            highlighted: false,
            icon: '👑'
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
      visible: true,
      content: {
        title: 'Pronto para começar?',
        subtitle: 'Crie sua primeira landing page hoje mesmo e veja os resultados',
        buttonText: 'Começar Gratuitamente'
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
      type: 'contact',
      visible: false,
      content: {
        title: 'Entre em contato',
        subtitle: 'Estamos aqui para ajudar você a crescer seu negócio',
        email: 'contato@lpfacil.com',
        phone: '+55 (11) 99999-9999',
        address: 'São Paulo, SP - Brasil'
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
  ]);
  const [activeSection, setActiveSection] = useState(0);
  const [editingField, setEditingField] = useState<{sectionIndex: number, field: string, subIndex?: number, subField?: string} | null>(null);
  
  // Estado para edição de ícones
  const [iconEditingField, setIconEditingField] = useState<{
    sectionIndex: number;
    field: string;
    subIndex?: number;
    subField?: string;
  } | null>(null);
  
  // Estado para o modal de edição de URL do vídeo
  const [videoUrlModal, setVideoUrlModal] = useState<{
    isOpen: boolean;
    sectionIndex: number;
    currentUrl: string;
  }>({
    isOpen: false,
    sectionIndex: 0,
    currentUrl: ''
  });

  // Opções de ícones por categoria
  const iconOptions = {
    problemas: ['😰', '😩', '😤', '💔', '❌', '⚠️', '🚫', '💥', '😱', '🆘', '⛔', '🔥'],
    solucoes: ['✨', '🎯', '🚀', '💎', '⭐', '🏆', '💡', '🎉', '✅', '🌟', '💪', '🔝'],
    antes: ['😔', '😞', '😕', '😟', '😢', '💔', '📉', '⬇️', '❌', '😭', '🤯', '😫'],
    depois: ['🎉', '😃', '😊', '🤩', '🥳', '💫', '🌈', '📈', '⬆️', '✅', '🏅', '🎊'],
    beneficios: ['💎', '⚡', '🚀', '🎯', '💪', '🏆', '⭐', '🔥', '💡', '✨', '🌟', '⚗️'],
    negocios: ['💰', '📈', '🏢', '📊', '💼', '🔧', '⚙️', '📋', '💳', '🎨', '📱', '🖥️'],
    tempo: ['⏰', '⚡', '🕐', '⏳', '📅', '🔄', '💨', '🏃', '⏲️', '🎛️', '⚖️', '🎯'],
    suporte: ['👤', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🚀', '👩‍🚀', '🧑‍💼', '🧑‍💻', '👥', '🤝', '💬']
  };
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [editingColorSection, setEditingColorSection] = useState<number | null>(null);
  const [sectionColors, setSectionColors] = useState<{[key: number]: {bg: string, text: string, accent: string}}>({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'published' | 'error'>('idle');
  const [isPublished, setIsPublished] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();

  // Carregar landing page existente se houver ID na URL
  useEffect(() => {
    const editId = searchParams.get('edit');
    const urlTitle = searchParams.get('title');
    

    
    if (editId) {
      setLandingPageId(editId);
      if (urlTitle) {
        setLandingPageTitle(decodeURIComponent(urlTitle));
      }
      loadLandingPage(editId);
    }
  }, [searchParams]);

  useEffect(() => {

    if (!authLoading) {
      setIsLoading(false);
    }
  }, [authLoading]);

  // Função para carregar landing page existente
  const loadLandingPage = async (id: string) => {
    try {
      const response = await fetch(`/api/landing-pages/${id}`);
      if (response.ok) {
        const landingPage = await response.json();
        setLandingPageTitle(landingPage.title || 'Minha Landing Page');
        
        // Se não há seções ou array vazio, usar seções padrão
        if (!landingPage.sections || landingPage.sections.length === 0) {
          // Manter as seções padrão do estado inicial
        } else {
          // Verificar se tem seção footer, se não tiver, adicionar
          const hasFooter = landingPage.sections.some((section: any) => section.type === 'footer');
          let sectionsToSet = [...landingPage.sections];
          
          if (!hasFooter) {
            // Adicionar seção footer no final
            sectionsToSet.push({
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
            });
          }
          
          // Garantir que a seção menu sempre tenha o item "Início" obrigatório
          sectionsToSet = sectionsToSet.map(section => {
            if (section.type === 'menu') {
              const currentItems = section.content?.items || [];
              const hasInicio = currentItems.some((item: any) => item.label === 'Início');
              
              if (!hasInicio) {
                // Adicionar "Início" no início da lista
                const newItems = [{ label: 'Início', href: '#section-0' }, ...currentItems];
                return {
                  ...section,
                  content: {
                    ...section.content,
                    items: newItems
                  }
                };
              }
            }
            return section;
          });
          
          setSections(sectionsToSet);
          
          // Se uma nova seção foi adicionada (footer), force a re-inicialização das cores
          if (!hasFooter) {
            // Trigger para re-inicializar cores no próximo render
            setSectionColors({});
          }
        }
        
        // Carregar configurações de cores se existirem
        if (landingPage.sectionColors) {
          setSectionColors(landingPage.sectionColors);
        } else if (landingPage.settings && landingPage.settings.sectionColors) {
          // Compatibilidade com formato antigo
          setSectionColors(landingPage.settings.sectionColors);
        }
        
        // Carregar status de publicação
        setIsPublished(landingPage.status === 'published' || landingPage.published === true);
        if (landingPage.status === 'published' || landingPage.published === true) {
          setPublishStatus('published');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar landing page:', error);
    }
  };

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(index);
    }
  };

  const toggleSectionVisibility = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].visible = !updatedSections[sectionIndex].visible;
    setSections(updatedSections);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updatedSections = [...sections];
    const draggedSection = updatedSections[draggedIndex];
    
    // Remove a seção da posição original
    updatedSections.splice(draggedIndex, 1);
    
    // Insere na nova posição
    updatedSections.splice(dropIndex, 0, draggedSection);
    
    setSections(updatedSections);
    setDraggedIndex(null);
    setDragOverIndex(null);
    
    // Atualizar activeSection se necessário
    if (activeSection === draggedIndex) {
      setActiveSection(dropIndex);
    } else if (draggedIndex < activeSection && dropIndex >= activeSection) {
      setActiveSection(activeSection - 1);
    } else if (draggedIndex > activeSection && dropIndex <= activeSection) {
      setActiveSection(activeSection + 1);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const startInlineEdit = (sectionIndex: number, field: string, subIndex?: number, subField?: string) => {
    setEditingField({ sectionIndex, field, subIndex, subField });
  };

  const finishInlineEdit = () => {
    setEditingField(null);
  };

  // Função para selecionar ícone
  const selectIcon = (icon: string) => {
    if (iconEditingField) {
      const { sectionIndex, field, subIndex, subField } = iconEditingField;
      
      if (subIndex !== undefined && subField) {
        updateSectionContent(sectionIndex, field, icon, subIndex, subField);
      } else {
        updateSectionContent(sectionIndex, field, icon);
      }
      
      setIconEditingField(null);
    }
  };

  // Funções para o modal de URL do vídeo
  const openVideoUrlModal = (sectionIndex: number, currentUrl: string) => {
    setVideoUrlModal({
      isOpen: true,
      sectionIndex,
      currentUrl
    });
  };

  const closeVideoUrlModal = () => {
    setVideoUrlModal({
      isOpen: false,
      sectionIndex: 0,
      currentUrl: ''
    });
  };

  const handleVideoUrlSubmit = (newUrl: string) => {
    if (newUrl && newUrl !== videoUrlModal.currentUrl) {
      updateSectionContent(videoUrlModal.sectionIndex, 'videoUrl', newUrl);
    }
    closeVideoUrlModal();
  };

  // Função para obter categoria de ícone baseada no campo
  const getIconCategory = (field: string) => {
    if (field.includes('problem')) return 'problemas';
    if (field.includes('solution')) return 'solucoes';
    if (field.includes('Before')) return 'antes';
    if (field.includes('After')) return 'depois';
    if (field.includes('benefits')) return 'beneficios'; // Para value proposition
    if (field.includes('keyBenefits')) return 'beneficios'; // Para key-benefits
    if (field.includes('steps')) return 'negocios'; // Para demo steps
    if (field.includes('videoThumbnail')) return 'negocios'; // Para video thumbnail
    if (field.includes('items')) return 'negocios'; // Para features items
    if (field.includes('testimonials')) return 'suporte'; // Para avatares de depoimentos
    if (field.includes('plans')) return 'negocios'; // Para ícones de planos
    return 'beneficios'; // padrão para seções de valor
  };

  // Função para converter URLs de vídeo para formato embed
  const convertToEmbedUrl = (url: string): string => {
    if (!url || !url.includes('http')) return url;
    
    // YouTube - converter para embed
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    
    // YouTube - URL curta
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    
    // Vimeo - converter para embed
    if (url.includes('vimeo.com/') && !url.includes('/embed/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Se já é uma URL de embed ou outra plataforma, retorna como está
    return url;
  };

  const updateSectionContent = (sectionIndex: number, field: string, value: any, subIndex?: number, subField?: string, subSubIndex?: number) => {
    const updatedSections = [...sections];
    
    if (subIndex !== undefined && subField) {
      // Para campos aninhados em arrays (como plans, testimonials, items)
      if (field === 'items') {
        // Inicializar items se não existir
        if (!updatedSections[sectionIndex].content.items) {
          updatedSections[sectionIndex].content.items = [
            { label: 'Início', href: '#hero' },
            { label: 'Funcionalidades', href: '#features' },
            { label: 'Depoimentos', href: '#testimonials' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Contato', href: '#contact' }
          ];
        }
        const items = [...updatedSections[sectionIndex].content.items];
        items[subIndex] = { ...items[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.items = items;
      } else if (field === 'plans' && updatedSections[sectionIndex].content.plans) {
        const plans = [...updatedSections[sectionIndex].content.plans];
        if (subField === 'features' && subSubIndex !== undefined) {
          // Para features dentro de plans
          const features = [...(plans[subIndex].features || [])];
          features[subSubIndex] = value;
          plans[subIndex] = { ...plans[subIndex], features };
        } else {
          plans[subIndex] = { ...plans[subIndex], [subField]: value };
        }
        updatedSections[sectionIndex].content.plans = plans;
      } else if (field === 'testimonials') {
        // Inicializar testimonials se não existir
        if (!updatedSections[sectionIndex].content.testimonials) {
          updatedSections[sectionIndex].content.testimonials = [
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
          ];
        }
        const testimonials = [...updatedSections[sectionIndex].content.testimonials];
        testimonials[subIndex] = { ...testimonials[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.testimonials = testimonials;
      } else if (field === 'ctaButton') {
        // Inicializar ctaButton se não existir
        if (!updatedSections[sectionIndex].content.ctaButton) {
          updatedSections[sectionIndex].content.ctaButton = {
            text: 'Começar Grátis',
            href: '#hero'
          };
        }
        updatedSections[sectionIndex].content.ctaButton = {
          ...updatedSections[sectionIndex].content.ctaButton,
          [subField]: value
        };
      } else if (field === 'benefits') {
        // Inicializar benefits se não existir
        if (!updatedSections[sectionIndex].content.benefits) {
          updatedSections[sectionIndex].content.benefits = [
            { title: 'Economia de Tempo', description: 'Crie landing pages profissionais em minutos, não horas', icon: '⏰' },
            { title: 'Resultados Comprovados', description: 'Aumente suas conversões em até 300% com nossos templates', icon: '📈' },
            { title: 'Sem Conhecimento Técnico', description: 'Interface intuitiva que qualquer pessoa pode usar', icon: '🎯' },
            { title: 'Suporte Completo', description: 'Equipe especializada pronta para ajudar você', icon: '🤝' }
          ];
        }
        const benefits = [...updatedSections[sectionIndex].content.benefits];
        benefits[subIndex] = { ...benefits[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.benefits = benefits;
      } else if (field === 'problem' && updatedSections[sectionIndex].content.problem) {
        if (subField === 'painPoints') {
          const painPoints = [...(updatedSections[sectionIndex].content.problem.painPoints || [])];
          painPoints[subIndex] = value;
          updatedSections[sectionIndex].content.problem = {
            ...updatedSections[sectionIndex].content.problem,
            painPoints
          };
        } else {
          updatedSections[sectionIndex].content.problem = {
            ...updatedSections[sectionIndex].content.problem,
            [subField]: value
          };
        }
      } else if (field === 'solution' && updatedSections[sectionIndex].content.solution) {
        if (subField === 'benefits') {
          const benefits = [...(updatedSections[sectionIndex].content.solution.benefits || [])];
          benefits[subIndex] = value;
          updatedSections[sectionIndex].content.solution = {
            ...updatedSections[sectionIndex].content.solution,
            benefits
          };
        } else {
          updatedSections[sectionIndex].content.solution = {
            ...updatedSections[sectionIndex].content.solution,
            [subField]: value
          };
        }
      } else if (field === 'transformation' && updatedSections[sectionIndex].content.transformation) {
        updatedSections[sectionIndex].content.transformation = {
          ...updatedSections[sectionIndex].content.transformation,
          [subField]: value
        };
      } else if (field === 'keyBenefits') {
        // Inicializar keyBenefits se não existir
        if (!updatedSections[sectionIndex].content.keyBenefits) {
          updatedSections[sectionIndex].content.keyBenefits = [
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
          ];
        }
        const keyBenefits = [...updatedSections[sectionIndex].content.keyBenefits];
        keyBenefits[subIndex] = { ...keyBenefits[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.keyBenefits = keyBenefits;
      } else if (field === 'steps') {
        // Inicializar steps se não existir
        if (!updatedSections[sectionIndex].content.steps) {
          updatedSections[sectionIndex].content.steps = [
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
          ];
        }
        const steps = [...updatedSections[sectionIndex].content.steps];
        steps[subIndex] = { ...steps[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.steps = steps;
      } else if (field === 'impactStats') {
        // Inicializar impactStats se não existir
        if (!updatedSections[sectionIndex].content.impactStats) {
          updatedSections[sectionIndex].content.impactStats = [
            { label: 'Clientes perdidos hoje', value: '47', unit: 'leads' },
            { label: 'Faturamento perdido', value: 'R$ 12k', unit: 'hoje' },
            { label: 'Dias sem otimização', value: '∞', unit: 'prejuízo' }
          ];
        }
        const impactStats = [...updatedSections[sectionIndex].content.impactStats];
        impactStats[subIndex] = { ...impactStats[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.impactStats = impactStats;
      } else if (field === 'offerFeatures') {
        // Inicializar offerFeatures se não existir
        if (!updatedSections[sectionIndex].content.offerFeatures) {
          updatedSections[sectionIndex].content.offerFeatures = [
            'Templates profissionais otimizados',
            'Editor visual sem código',
            'Analytics e métricas detalhadas',
            'Suporte especializado',
            'Garantia de 30 dias'
          ];
        }
        const offerFeatures = [...updatedSections[sectionIndex].content.offerFeatures];
        offerFeatures[subIndex] = value;
        updatedSections[sectionIndex].content.offerFeatures = offerFeatures;
      } else if (field === 'faqs') {
        // Inicializar FAQs se não existir
        if (!updatedSections[sectionIndex].content.faqs) {
          updatedSections[sectionIndex].content.faqs = [
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
          ];
        }
        const faqs = [...updatedSections[sectionIndex].content.faqs];
        faqs[subIndex] = { ...faqs[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.faqs = faqs;
      } else if (field === 'socialLinks') {
        // Inicializar socialLinks se não existir
        if (!updatedSections[sectionIndex].content.socialLinks) {
          updatedSections[sectionIndex].content.socialLinks = [
            { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
            { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
            { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
            { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
          ];
        }
        const socialLinks = [...updatedSections[sectionIndex].content.socialLinks];
        socialLinks[subIndex] = { ...socialLinks[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.socialLinks = socialLinks;
      } else if (field === 'footerLinks') {
        // Inicializar footerLinks se não existir
        if (!updatedSections[sectionIndex].content.footerLinks) {
          updatedSections[sectionIndex].content.footerLinks = [
            { name: 'Política de Privacidade', url: '/privacidade' },
            { name: 'Termos de Uso', url: '/termos' },
            { name: 'Suporte', url: '/suporte' }
          ];
        }
        const footerLinks = [...updatedSections[sectionIndex].content.footerLinks];
        footerLinks[subIndex] = { ...footerLinks[subIndex], [subField]: value };
        updatedSections[sectionIndex].content.footerLinks = footerLinks;
      }
    } else if (subIndex !== undefined) {
      // Para arrays simples como items (sem subField)
      if (field === 'items' && updatedSections[sectionIndex].content.items) {
        const items = [...updatedSections[sectionIndex].content.items];
        items[subIndex] = { ...items[subIndex], ...value };
        updatedSections[sectionIndex].content.items = items;
      }
    } else {
      // Para campos diretos
      let finalValue = value;
      
      // Converter URLs de vídeo para formato embed
      if (field === 'videoUrl') {
        finalValue = convertToEmbedUrl(value);
      }
      
      updatedSections[sectionIndex].content = {
        ...updatedSections[sectionIndex].content,
        [field]: finalValue
      };
    }
    
    setSections(updatedSections);
  };

  // Componente para texto editável inline
  const EditableText = ({ 
    value, 
    sectionIndex, 
    field, 
    subIndex, 
    subField,
    subSubIndex,
    className = "",
    multiline = false,
    placeholder = "",
    style = {},
    isIcon = false
  }: {
    value: string;
    sectionIndex: number;
    field: string;
    subIndex?: number;
    subField?: string;
    subSubIndex?: number;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
    style?: React.CSSProperties;
    isIcon?: boolean;
  }) => {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [localValue, setLocalValue] = useState(value);
    
    const isEditing = editingField?.sectionIndex === sectionIndex && 
                     editingField?.field === field && 
                     editingField?.subIndex === subIndex &&
                     editingField?.subField === subField;

    // Sincronizar localValue com value quando não estiver editando
    useEffect(() => {
      if (!isEditing) {
        setLocalValue(value);
      }
    }, [value, isEditing]);

    const handleClick = () => {
      if (!isEditing) {
        if (isIcon) {
          setIconEditingField({ sectionIndex, field, subIndex, subField });
        } else {
          setLocalValue(value);
          startInlineEdit(sectionIndex, field, subIndex, subField);
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) {
        saveAndFinish();
      }
      if (e.key === 'Escape') {
        setLocalValue(value); // Restaurar valor original
        finishInlineEdit();
      }
    };

    const handleBlur = () => {
      saveAndFinish();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLocalValue(e.target.value);
    };

    const saveAndFinish = () => {
      if (subIndex !== undefined && subField) {
        // Para campos aninhados em arrays
        updateSectionContent(sectionIndex, field, localValue, subIndex, subField, subSubIndex);
      } else if (subIndex !== undefined) {
        // Para arrays simples
        updateSectionContent(sectionIndex, field, { [field]: localValue }, subIndex);
      } else {
        // Para campos diretos
        updateSectionContent(sectionIndex, field, localValue);
      }
      finishInlineEdit();
    };

    // Auto-focus quando entra em modo de edição
    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
        // Posicionar cursor no final do texto
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, [isEditing]);

    if (isEditing) {
      // Detectar se estamos em fundo escuro para melhor contraste
      const parentBg = style?.backgroundColor || '#ffffff';
      const isOnDarkBackground = parentBg.includes('#') && 
        (parentBg.toLowerCase().includes('60a5fa') || 
         parentBg.toLowerCase().includes('a3a3a3') || 
         parentBg.toLowerCase().includes('000') ||
         parentBg.toLowerCase().includes('333') ||
         parentBg.toLowerCase().includes('gray') ||
         parentBg.toLowerCase().includes('dark'));

      // Estilo com cores fixas para garantir contraste adequado
      const editStyle = {
        backgroundColor: '#ffffff',
        color: '#1f2937',
        border: '2px solid #3b82f6',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        zIndex: 10,
        position: 'relative' as const,
        fontSize: 'inherit',
        fontWeight: 'inherit',
        fontFamily: 'inherit'
      };

      if (multiline) {
        return (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="p-2 rounded resize-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
            style={editStyle}
            placeholder={placeholder}
            rows={3}
          />
        );
      } else {
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="p-2 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
            style={editStyle}
            placeholder={placeholder}
          />
        );
      }
    }

    return (
      <span 
        onClick={handleClick}
        className={`${className} ${isIcon ? 'cursor-pointer hover:bg-yellow-100 hover:text-gray-900' : 'cursor-text hover:bg-yellow-100 hover:text-gray-900'} hover:outline hover:outline-2 hover:outline-yellow-400 hover:outline-dashed rounded px-1 transition-all`}
        style={style}
        title={isIcon ? "Clique para escolher ícone" : "Clique para editar"}
      >
        {value || placeholder}
      </span>
    );
  };

  // Função para publicar landing page
  const publishLandingPage = async () => {
    if (!landingPageId) {
      // Se não tem ID, precisa salvar primeiro
      await saveLandingPage();
      if (!landingPageId) return;
    }

    setIsPublishing(true);
    setPublishStatus('idle');

    try {
      const response = await fetch(`/api/landing-pages/${landingPageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: landingPageTitle,
          sections: sections,
          settings: {
            sectionColors: sectionColors
          },
          status: 'published',
          published: true,
          publishedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setPublishStatus('published');
        setIsPublished(true);
        console.log('✅ Landing page publicada com sucesso!');
      } else {
        setPublishStatus('error');
        console.error('❌ Erro ao publicar landing page');
      }
    } catch (error) {
      setPublishStatus('error');
      console.error('❌ Erro ao publicar:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  // Função para salvar landing page
  const saveLandingPage = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      const landingPageData = {
        title: landingPageTitle,
        template: 'saas',
        sections: sections,
        sectionColors: sectionColors,
        settings: {},
        status: 'draft'
      };

      let response;
      
      if (landingPageId) {
        // Atualizar landing page existente
        response = await fetch(`/api/landing-pages/${landingPageId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(landingPageData),
        });
      } else {
        // Criar nova landing page
        response = await fetch('/api/landing-pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(landingPageData),
        });
      }

      if (!response.ok) {
        throw new Error('Erro ao salvar landing page');
      }

      const savedLandingPage = await response.json();
      
      if (!landingPageId) {
        setLandingPageId(savedLandingPage.id);
      }
      
      setSaveStatus('saved');
      
      // Reset status após 3 segundos
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setSaveStatus('error');
      
      // Reset status após 3 segundos
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Inicializar cores padrão quando seções são carregadas
  useEffect(() => {
    // Se não há cores configuradas e não estamos carregando, inicializar cores padrão
    if (Object.keys(sectionColors).length === 0 && !isLoading && sections.length > 0) {
      console.log('Inicializando cores padrão...');
      initializeDefaultColors();
    }
  }, [sections, isLoading]);

  // Auto-save quando há mudanças (apenas após carregamento inicial)
  useEffect(() => {
    if (sections.length > 0 && saveStatus === 'idle' && !isLoading) {
      const timer = setTimeout(() => {
        saveLandingPage();
      }, 5000); // Auto-save após 5 segundos sem mudanças

      return () => clearTimeout(timer);
    }
  }, [sections, landingPageTitle, sectionColors, isLoading]);

  // Atualizar seção ativa quando iniciar edição
  useEffect(() => {
    if (editingField) {
      setActiveSection(editingField.sectionIndex);
    }
  }, [editingField]);

  const getSectionInfo = (type: string) => {
    switch (type) {
      case 'menu':
        return { name: 'Menu de Navegação', icon: '🍃' };
      case 'hero':
        return { name: 'Apresentação', icon: '🏆' };
      case 'problem-solution':
        return { name: 'Problema + Solução', icon: '⚡' };
      case 'value-proposition':
        return { name: 'Proposta de Valor', icon: '💎' };
      case 'key-benefits':
        return { name: 'Principais Benefícios', icon: '🚀' };
      case 'demo':
        return { name: 'Como Funciona', icon: '🎬' };
      case 'features':
        return { name: 'Principais Funcionalidades', icon: '⭐' };
      case 'testimonials':
        return { name: 'Depoimentos', icon: '💬' };
      case 'pricing':
        return { name: 'Preços', icon: '💰' };
      case 'impact-message':
        return { name: 'Mensagem de Impacto', icon: '💥' };
      case 'final-cta':
        return { name: 'CTA Final', icon: '🔥' };
      case 'cta':
        return { name: 'Chamada para Ação', icon: '🎯' };
      case 'faq':
        return { name: 'Perguntas Frequentes', icon: '❓' };
      case 'contact':
        return { name: 'Contato', icon: '📞' };
      case 'footer':
        return { name: 'Rodapé', icon: '🦶' };
      default:
        return { name: 'Seção', icon: '📄' };
    }
  };

  const openColorModal = (sectionIndex: number) => {
    setEditingColorSection(sectionIndex);
    setColorModalOpen(true);
  };

  const closeColorModal = () => {
    setColorModalOpen(false);
    setEditingColorSection(null);
  };

  const updateSectionColors = (sectionIndex: number, colors: {bg: string, text: string, accent: string}) => {
    setSectionColors(prev => ({
      ...prev,
      [sectionIndex]: colors
    }));
  };

  // Paleta de cores padrão: preto para texto, azul para destaque, cinza/branco para fundo
  const getDefaultSectionColors = () => ({
    bg: '#ffffff',      // Branco para fundo
    text: '#000000',    // Preto para texto
    accent: '#3b82f6'   // Azul para destaque
  });

  const getSectionColors = (sectionIndex: number) => {
    return sectionColors[sectionIndex] || getDefaultSectionColors();
  };

  // Inicializar cores padrão para todas as seções
  const initializeDefaultColors = () => {
    const newColors: {[key: number]: {bg: string, text: string, accent: string}} = {};
    sections.forEach((section, index) => {
      // Seção footer deve ter fundo preto
      if (section.type === 'footer') {
        newColors[index] = {
          bg: '#000000',      // Preto para footer
          text: '#ffffff',    // Branco para texto no footer
          accent: '#f97316'   // Laranja para destaque no footer
        };
      } else if (index % 2 === 0) {
        // Seções pares: fundo branco
        newColors[index] = {
          bg: '#ffffff',      // Branco
          text: '#000000',    // Preto  
          accent: '#3b82f6'   // Azul
        };
      } else {
        // Seções ímpares: fundo cinza claro
        newColors[index] = {
          bg: '#f9fafb',      // Cinza muito claro
          text: '#000000',    // Preto
          accent: '#3b82f6'   // Azul
        };
      }
    });
    setSectionColors(newColors);
  };

  // Mostrar loading apenas se ainda estiver carregando a autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando editor...</p>
        </div>
      </div>
    );
  }

  // Se não há usuário autenticado, redirecionar para login
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Você precisa estar logado para acessar o editor.</p>
          <a href="/login" className="text-blue-600 hover:text-blue-800">Fazer login</a>
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
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Voltar</span>
              </Link>
              <Logo size="sm" linkToHome={false} />
              <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                value={landingPageTitle}
                onChange={(e) => setLandingPageTitle(e.target.value)}
                className="mx-4 px-3 py-1 text-lg font-semibold text-center border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                placeholder="Título da Landing Page"
              />
            </div>

            <div className="flex items-center space-x-3">
              {/* Status indicator */}
              <div className="flex space-x-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  saveStatus === 'saving' ? 'bg-yellow-100 text-yellow-800' :
                  saveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                  saveStatus === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {saveStatus === 'saving' && '⏳ Salvando...'}
                  {saveStatus === 'saved' && '✅ Salvo'}
                  {saveStatus === 'error' && '❌ Erro'}
                  {saveStatus === 'idle' && '📝 Pronto'}
                </div>

                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  publishStatus === 'published' ? 'bg-green-100 text-green-800' :
                  publishStatus === 'error' ? 'bg-red-100 text-red-800' :
                  isPublished ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {isPublished ? '🌐 Publicada' : '📄 Rascunho'}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={saveLandingPage}
                  disabled={isSaving}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    isSaving 
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSaving ? '💾 Salvando...' : '💾 Salvar Agora'}
                </button>

                <button
                  onClick={publishLandingPage}
                  disabled={isPublishing || !landingPageTitle.trim()}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    isPublishing || !landingPageTitle.trim()
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : isPublished
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isPublishing ? '🚀 Publicando...' : isPublished ? '✅ Publicada' : '🚀 Publicar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar de Navegação */}
        <div className="fixed left-0 top-16 bottom-0 w-80 bg-white shadow-lg z-30 overflow-y-auto border-r">
          <div className="p-6">
                      {/* Navegação entre seções */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Seções ({sections.filter(s => s.visible).length}/{sections.length} visíveis)
            </h3>
            
            <div className="space-y-2">
              {sections.map((section, index) => {
                const sectionInfo = getSectionInfo(section.type);
                const isActive = activeSection === index;
                const isEditing = editingField?.sectionIndex === index;
                const isVisible = section.visible;
                const isDragging = draggedIndex === index;
                const isDragOver = dragOverIndex === index;
                
                return (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`w-full px-3 py-3 rounded-lg transition-all border cursor-move ${
                      isDragging
                        ? 'opacity-50 transform scale-95'
                        : isDragOver
                          ? 'border-blue-500 bg-blue-50 transform scale-105'
                          : isEditing
                            ? 'bg-yellow-100 border-yellow-300'
                            : isActive && isVisible
                              ? 'bg-blue-100 border-blue-300' 
                              : isVisible
                                ? 'bg-white border-gray-200 hover:bg-gray-50'
                                : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        {/* Drag Handle */}
                        <div className="mr-2 text-gray-400 hover:text-gray-600 cursor-move">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <circle cx="4" cy="4" r="1"/>
                            <circle cx="4" cy="8" r="1"/>
                            <circle cx="4" cy="12" r="1"/>
                            <circle cx="8" cy="4" r="1"/>
                            <circle cx="8" cy="8" r="1"/>
                            <circle cx="8" cy="12" r="1"/>
                            <circle cx="12" cy="4" r="1"/>
                            <circle cx="12" cy="8" r="1"/>
                            <circle cx="12" cy="12" r="1"/>
                          </svg>
                        </div>

                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={() => toggleSectionVisibility(index)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                        
                        {/* Seção info */}
                        <span className="text-lg mr-2">{sectionInfo.icon}</span>
                        <div 
                          className="flex-1 cursor-pointer min-w-0"
                          onClick={() => isVisible && scrollToSection(index)}
                        >
                          <div className={`font-medium transition-colors break-words ${
                            isVisible 
                              ? 'text-blue-600 hover:text-blue-800' 
                              : 'text-gray-400'
                          }`}>
                            {sectionInfo.name}
                            {isEditing && <span className="ml-2 text-yellow-600">✏️</span>}
                          </div>
                          <div className="text-sm text-gray-500 break-words">
                            {section.content?.title || 'Sem título'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end ml-2">
                        <div className="flex items-center gap-1 mb-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openColorModal(index);
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                            title="Configurações da seção"
                          >
                            ⚙️
                          </button>
                        </div>
                        {isEditing && (
                          <span className="text-xs text-amber-600 font-medium">
                            Editando
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>



            {/* Controles */}
            <div className="border-t pt-4">
              <div className="mb-3">

                <div className={`text-xs p-2 rounded ${
                  saveStatus === 'saving' ? 'bg-yellow-50 text-yellow-700' :
                  saveStatus === 'saved' ? 'bg-green-50 text-green-700' :
                  saveStatus === 'error' ? 'bg-red-50 text-red-700' :
                  'bg-gray-50 text-gray-700'
                }`}>
                  {saveStatus === 'saving' && '⏳ Salvando alterações...'}
                  {saveStatus === 'saved' && '✅ Última alteração salva'}
                  {saveStatus === 'error' && '❌ Erro ao salvar'}
                  {saveStatus === 'idle' && '📝 Aguardando alterações'}
                </div>
              </div>
              

              
              {landingPageId && (
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  💡 ID: {landingPageId.substring(0, 8)}...
                  <br />
                  Seções: {sections.length}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 ml-80">
                  {/* Renderizar seções visíveis */}
        {sections.filter(section => section.visible).map((section, visibleIndex) => {
          const originalIndex = sections.findIndex(s => s === section);
          return (
            <div key={originalIndex} id={`section-${originalIndex}`} className="relative">
              {section.type === 'menu' && (
                <nav 
                  className="sticky top-0 z-50 bg-white shadow-sm"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        <EditableText
                          value={section.content.logo || 'LPFácil'}
                          sectionIndex={originalIndex}
                          field="logo"
                          className="text-xl font-bold cursor-pointer"
                          placeholder="Nome da sua marca"
                        />
                      </div>

                      {/* Menu Desktop */}
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                          {(section.content.items || [
                            { label: 'Início', href: '#hero' },
                            { label: 'Funcionalidades', href: '#features' },
                            { label: 'Depoimentos', href: '#testimonials' },
                            { label: 'FAQ', href: '#faq' },
                            { label: 'Contato', href: '#contact' }
                          ]).map((item: any, i: number) => (
                            <div key={i} className="group relative">
                              {/* Label do Item */}
                              <EditableText
                                value={item.label || 'Item Menu'}
                                sectionIndex={originalIndex}
                                field="items"
                                subIndex={i}
                                subField="label"
                                className={`px-3 py-2 rounded-md font-medium hover:bg-gray-100 cursor-pointer transition-colors ${
                                  section.content.textSize === 'small' ? 'text-xs' :
                                  section.content.textSize === 'large' ? 'text-base' : 'text-sm'
                                }`}
                                placeholder="Nome do item"
                              />
                              
                              {/* Link do Item (tooltip editável) */}
                              <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                <EditableText
                                  value={item.href || '#'}
                                  sectionIndex={originalIndex}
                                  field="items"
                                  subIndex={i}
                                  subField="href"
                                  className="text-xs text-gray-200"
                                  placeholder="#secao ou URL completa"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="hidden md:block">
                        <div className="group relative">
                          <EditableText
                            value={section.content.ctaButton?.text || 'Começar Grátis'}
                            sectionIndex={originalIndex}
                            field="ctaButton"
                            subField="text"
                            className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors cursor-pointer hover:opacity-90"
                            style={{
                              backgroundColor: getSectionColors(originalIndex).accent
                            }}
                            placeholder="Texto do botão"
                          />
                          
                          {/* Link do CTA (tooltip editável) */}
                          <div className="absolute top-full right-0 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                            <EditableText
                              value={section.content.ctaButton?.href || '#hero'}
                              sectionIndex={originalIndex}
                              field="ctaButton"
                              subField="href"
                              className="text-xs text-gray-200"
                              placeholder="#secao ou URL completa"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Menu Mobile Button */}
                      <div className="md:hidden">
                        <button 
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            // Funcionalidade mobile será implementada em breve
                            alert('Menu mobile - funcionalidade em desenvolvimento');
                          }}
                        >
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Menu Mobile Dropdown (será implementado) */}
                    <div className="md:hidden hidden">
                      <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t">
                        {(section.content.items || []).map((item: any, i: number) => (
                          <div key={i} className="block px-3 py-2 text-base font-medium">
                            <EditableText
                              value={item.label || 'Item Menu'}
                              sectionIndex={originalIndex}
                              field="items"
                              subIndex={i}
                              subField="label"
                              className="block w-full"
                              placeholder="Nome do item"
                            />
                          </div>
                        ))}
                        <div className="mt-4 px-3">
                          <EditableText
                            value={section.content.ctaButton?.text || 'Começar Grátis'}
                            sectionIndex={originalIndex}
                            field="ctaButton"
                            subField="text"
                            className="block w-full px-4 py-2 text-center rounded-md text-white font-medium"
                            style={{
                              backgroundColor: getSectionColors(originalIndex).accent
                            }}
                            placeholder="Texto do botão"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              )}

              {section.type === 'hero' && (
                <div 
                  className="py-20 relative"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                      <h1 
                        className="text-4xl lg:text-6xl font-bold mb-6"
                        style={{ color: getSectionColors(originalIndex).text }}
                      >
                        <EditableText
                          value={section.content.title || 'Título principal'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Título principal"
                        />
                      </h1>
                      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || ''}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Subtítulo descritivo"
                        />
                      </p>
                      {section.content.showButton !== false && (
                        <button 
                          className="px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
                          style={{
                            backgroundColor: getSectionColors(originalIndex).accent,
                            color: '#ffffff'
                          }}
                        >
                          <EditableText
                            value={section.content.buttonText || ''}
                            sectionIndex={originalIndex}
                            field="buttonText"
                            className="inline-block"
                            placeholder="Texto do botão"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'problem-solution' && (
                <div 
                  className="py-20 relative"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Cabeçalho */}
                    <div className="text-center mb-16">
                      <h2 
                        className="text-3xl lg:text-4xl font-bold mb-4"
                        style={{ color: getSectionColors(originalIndex).text }}
                      >
                        <EditableText
                          value={section.content.title || 'Você está cansado de perder vendas?'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Título do problema"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || ''}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Subtítulo empático"
                        />
                      </p>
                    </div>

                    {/* Problema vs Solução */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                      {/* Problema */}
                      <div 
                        className="rounded-2xl p-8 text-white"
                        style={{
                          backgroundColor: section.content.problemBoxColor || '#3b82f6'
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <div className="text-4xl mr-4 cursor-pointer hover:scale-110 transition-transform">
                            <EditableText
                              value={section.content.problemIcon || '😰'}
                              sectionIndex={originalIndex}
                              field="problemIcon"
                              className="inline-block"
                              placeholder="😰"
                              isIcon={true}
                            />
                          </div>
                          <h3 className="text-2xl font-bold">
                            <EditableText
                              value={section.content.problem?.title || 'O Problema'}
                              sectionIndex={originalIndex}
                              field="problem"
                              subField="title"
                              className="inline-block"
                              placeholder="Título do problema"
                            />
                          </h3>
                        </div>
                        <p className="text-white mb-6 leading-relaxed">
                          <EditableText
                            value={section.content.problem?.description || ''}
                            sectionIndex={originalIndex}
                            field="problem"
                            subField="description"
                            className="inline-block"
                            multiline={true}
                            placeholder="Descreva o problema..."
                          />
                        </p>
                        <ul className="space-y-3">
                          {(section.content.problem?.painPoints || [
                            'Perda de clientes potenciais todos os dias',
                            'Investimento em tráfego sem retorno',
                            'Frustração com baixas conversões',
                            'Concorrência capturando seus clientes'
                          ]).map((point: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="text-white mr-2 mt-1">❌</span>
                              <EditableText
                                value={point}
                                sectionIndex={originalIndex}
                                field="problem"
                                subField="painPoints"
                                subIndex={i}
                                className="inline-block text-white"
                                placeholder="Ponto de dor..."
                              />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solução */}
                      <div 
                        className="rounded-2xl p-8 text-white"
                        style={{
                          backgroundColor: section.content.solutionBoxColor || '#3b82f6'
                        }}
                      >
                        <div className="flex items-center mb-6">
                          <div className="text-4xl mr-4 cursor-pointer hover:scale-110 transition-transform">
                            <EditableText
                              value={section.content.solutionIcon || '✨'}
                              sectionIndex={originalIndex}
                              field="solutionIcon"
                              className="inline-block"
                              placeholder="✨"
                              isIcon={true}
                            />
                          </div>
                          <h3 className="text-2xl font-bold">
                            <EditableText
                              value={section.content.solution?.title || 'A Solução'}
                              sectionIndex={originalIndex}
                              field="solution"
                              subField="title"
                              className="inline-block"
                              placeholder="Título da solução"
                            />
                          </h3>
                        </div>
                        <p className="text-white mb-6 leading-relaxed">
                          <EditableText
                            value={section.content.solution?.description || ''}
                            sectionIndex={originalIndex}
                            field="solution"
                            subField="description"
                            className="inline-block"
                            multiline={true}
                            placeholder="Descreva a solução..."
                          />
                        </p>
                        <ul className="space-y-3">
                          {(section.content.solution?.benefits || [
                            'Aumento de 300% nas conversões',
                            'ROI positivo em 30 dias',
                            'Confiança nos seus resultados',
                            'Vantagem competitiva garantida'
                          ]).map((benefit: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="text-white mr-2 mt-1">✅</span>
                              <EditableText
                                value={benefit}
                                sectionIndex={originalIndex}
                                field="solution"
                                subField="benefits"
                                subIndex={i}
                                className="inline-block text-white"
                                placeholder="Benefício da solução..."
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Transformação - Antes e Depois */}
                    {section.content.showTransformation !== false && (
                    <div 
                      className="rounded-2xl p-8 text-white"
                      style={{ backgroundColor: section.content.transformationBoxColor || '#3b82f6' }}
                    >
                      <h3 className="text-2xl font-bold text-center mb-8 text-white">
                        <EditableText
                          value={section.content.transformationTitle || 'A Transformação'}
                          sectionIndex={originalIndex}
                          field="transformationTitle"
                          className="inline-block"
                          placeholder="Título da transformação"
                        />
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                          <div className="text-5xl mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                            <EditableText
                              value={section.content.transformationBeforeIcon || '😔'}
                              sectionIndex={originalIndex}
                              field="transformationBeforeIcon"
                              className="inline-block"
                              placeholder="😔"
                              isIcon={true}
                            />
                          </div>
                          <h4 className="text-xl font-semibold mb-3 text-white">ANTES</h4>
                          <p className="text-white leading-relaxed">
                            <EditableText
                              value={section.content.transformation?.before || ''}
                              sectionIndex={originalIndex}
                              field="transformation"
                              subField="before"
                              className="inline-block"
                              multiline={true}
                              placeholder="Como é antes da solução..."
                            />
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-5xl mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                            <EditableText
                              value={section.content.transformationAfterIcon || '🎉'}
                              sectionIndex={originalIndex}
                              field="transformationAfterIcon"
                              className="inline-block"
                              placeholder="🎉"
                              isIcon={true}
                            />
                          </div>
                          <h4 className="text-xl font-semibold mb-3 text-white">DEPOIS</h4>
                          <p className="text-white leading-relaxed">
                            <EditableText
                              value={section.content.transformation?.after || ''}
                              sectionIndex={originalIndex}
                              field="transformation"
                              subField="after"
                              className="inline-block"
                              multiline={true}
                              placeholder="Como fica depois da solução..."
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              )}

              {section.type === 'value-proposition' && (
                <div 
                  className="py-20 relative"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 
                        className="text-3xl lg:text-4xl font-bold mb-4"
                        style={{ color: getSectionColors(originalIndex).text }}
                      >
                        <EditableText
                          value={section.content.title || 'Por que escolher nossa solução?'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Título da proposta de valor"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || ''}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Subtítulo explicativo"
                        />
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {(section.content.benefits || [
                        { title: 'Economia de Tempo', description: 'Crie landing pages profissionais em minutos, não horas', icon: '⏰' },
                        { title: 'Resultados Comprovados', description: 'Aumente suas conversões em até 300% com nossos templates', icon: '📈' },
                        { title: 'Sem Conhecimento Técnico', description: 'Interface intuitiva que qualquer pessoa pode usar', icon: '🎯' },
                        { title: 'Suporte Completo', description: 'Equipe especializada pronta para ajudar você', icon: '🤝' }
                      ]).map((benefit: any, i: number) => (
                        <div key={i} className="text-center group">
                          <div className="text-5xl mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                            <EditableText
                              value={benefit.icon || '💎'}
                              sectionIndex={originalIndex}
                              field="benefits"
                              subIndex={i}
                              subField="icon"
                              className="inline-block"
                              placeholder="🎯"
                              isIcon={true}
                            />
                          </div>
                          <h3 className="text-xl font-semibold mb-3">
                            <EditableText
                              value={benefit.title || 'Benefício'}
                              sectionIndex={originalIndex}
                              field="benefits"
                              subIndex={i}
                              subField="title"
                              className="inline-block"
                              placeholder="Título do benefício"
                            />
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            <EditableText
                              value={benefit.description || 'Descrição do benefício'}
                              sectionIndex={originalIndex}
                              field="benefits"
                              subIndex={i}
                              subField="description"
                              className="inline-block"
                              multiline={true}
                              placeholder="Descreva o benefício"
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'key-benefits' && (
                <div 
                  className="py-20 relative bg-gradient-to-br from-blue-50 to-indigo-100"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 
                        className="text-3xl lg:text-4xl font-bold mb-4"
                        style={{ color: getSectionColors(originalIndex).text }}
                      >
                        <EditableText
                          value={section.content.title || 'Resultados que Realmente Importam'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Título dos benefícios"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || ''}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Subtítulo com dados reais"
                        />
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {(section.content.keyBenefits || [
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
                      ]).map((benefit: any, i: number) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                          {/* Ícone */}
                          <div className="text-center mb-4">
                            <div className="text-5xl mx-auto mb-3 cursor-pointer hover:scale-110 transition-transform">
                              <EditableText
                                value={benefit.icon || '🚀'}
                                sectionIndex={originalIndex}
                                field="keyBenefits"
                                subIndex={i}
                                subField="icon"
                                className="inline-block"
                                placeholder="📊"
                                isIcon={true}
                              />
                            </div>
                          </div>

                          {/* Métrica Principal */}
                          <div className="text-center mb-4">
                            <div 
                              className="text-4xl lg:text-5xl font-black mb-2"
                              style={{ color: getSectionColors(originalIndex).accent }}
                            >
                              <EditableText
                                value={benefit.metric || '100%'}
                                sectionIndex={originalIndex}
                                field="keyBenefits"
                                subIndex={i}
                                subField="metric"
                                className="inline-block"
                                placeholder="300%"
                              />
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                              <EditableText
                                value={benefit.timeframe || 'período'}
                                sectionIndex={originalIndex}
                                field="keyBenefits"
                                subIndex={i}
                                subField="timeframe"
                                className="inline-block"
                                placeholder="em 30 dias"
                              />
                            </div>
                          </div>

                          {/* Label do Benefício */}
                          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                            <EditableText
                              value={benefit.label || 'Benefício Principal'}
                              sectionIndex={originalIndex}
                              field="keyBenefits"
                              subIndex={i}
                              subField="label"
                              className="inline-block"
                              placeholder="Nome do benefício"
                            />
                          </h3>

                          {/* Descrição */}
                          <p className="text-gray-600 text-sm leading-relaxed text-center">
                            <EditableText
                              value={benefit.description || 'Descrição detalhada do benefício'}
                              sectionIndex={originalIndex}
                              field="keyBenefits"
                              subIndex={i}
                              subField="description"
                              className="inline-block"
                              multiline={true}
                              placeholder="Descreva o resultado concreto..."
                            />
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Footer com CTA */}
                    <div className="text-center mt-12">
                      <p className="text-lg text-gray-700 mb-6">
                        <EditableText
                          value={section.content.footerText || 'Estes são apenas alguns dos resultados que nossos clientes alcançaram.\nE você pode ser o próximo!'}
                          sectionIndex={originalIndex}
                          field="footerText"
                          className="inline-block"
                          multiline={true}
                          placeholder="Texto de conclusão da seção..."
                        />
                      </p>
                      <div 
                        className="inline-block px-8 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-all cursor-pointer"
                        style={{ backgroundColor: getSectionColors(originalIndex).accent }}
                      >
                        <EditableText
                          value={section.content.ctaText || 'Quero Estes Resultados Também'}
                          sectionIndex={originalIndex}
                          field="ctaText"
                          className="inline-block"
                          placeholder="Texto do botão..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'demo' && (
                <div 
                  className="py-20 relative bg-gray-50"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 
                        className="text-3xl lg:text-4xl font-bold mb-4"
                        style={{ color: getSectionColors(originalIndex).text }}
                      >
                        <EditableText
                          value={section.content.title || 'Veja Como É Simples'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Título da demonstração"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || ''}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Subtítulo explicativo"
                        />
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* Vídeo/Demo */}
                      <div className="order-2 lg:order-1">
                        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group">
                          <div className="aspect-video flex items-center justify-center">
                            {section.content.videoUrl && 
                             section.content.videoUrl !== 'https://player.vimeo.com/video/example' && 
                             section.content.videoUrl !== 'https://player.vimeo.com/video/seu-video' &&
                             section.content.videoUrl !== 'https://youtu.be/exemplo ou https://vimeo.com/exemplo' &&
                             section.content.videoUrl.includes('http') &&
                             (section.content.videoUrl.includes('youtube.com/embed/') || 
                              section.content.videoUrl.includes('player.vimeo.com/video/') ||
                              section.content.videoUrl.includes('embed')) ? (
                              <iframe
                                key={section.content.videoUrl} // Force re-render when URL changes
                                src={section.content.videoUrl}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title="Demonstração"
                              ></iframe>
                            ) : (
                              <div className="text-center text-white p-8">
                                <div className="text-6xl mb-4 cursor-pointer hover:scale-110 transition-transform">
                                  <EditableText
                                    value={section.content.videoThumbnail || '🎬'}
                                    sectionIndex={originalIndex}
                                    field="videoThumbnail"
                                    className="inline-block"
                                    placeholder="🎬"
                                    isIcon={true}
                                  />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Demo em Vídeo</h3>
                                <p className="text-gray-300 mb-4">Cole a URL normal do YouTube ou Vimeo</p>
                                <div className="bg-gray-800 rounded-lg p-4">
                                  <EditableText
                                    value={section.content.videoUrl || 'https://youtu.be/exemplo ou https://vimeo.com/exemplo'}
                                    sectionIndex={originalIndex}
                                    field="videoUrl"
                                    className="inline-block text-sm text-gray-300 font-mono"
                                    placeholder="Ex: https://youtu.be/ABC123 ou https://vimeo.com/123456"
                                  />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">✨ A URL será convertida automaticamente para o formato embed</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Overlay Button para Editar URL - só aparece quando há vídeo carregado */}
                          {section.content.videoUrl && 
                           section.content.videoUrl !== 'https://player.vimeo.com/video/example' && 
                           section.content.videoUrl !== 'https://player.vimeo.com/video/seu-video' &&
                           section.content.videoUrl !== 'https://youtu.be/exemplo ou https://vimeo.com/exemplo' &&
                           section.content.videoUrl.includes('http') &&
                           (section.content.videoUrl.includes('youtube.com/embed/') || 
                            section.content.videoUrl.includes('player.vimeo.com/video/') ||
                            section.content.videoUrl.includes('embed')) && (
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={() => openVideoUrlModal(originalIndex, section.content.videoUrl || '')}
                                className="bg-black/80 hover:bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm border border-white/20 flex items-center space-x-2 transition-all"
                              >
                                <span>✏️</span>
                                <span>Alterar URL</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Passos */}
                      <div className="order-1 lg:order-2">
                        <div className="space-y-8">
                          {(section.content.steps || [
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
                          ]).map((step: any, i: number) => (
                            <div key={i} className="flex items-start group">
                              {/* Número do Passo */}
                              <div className="flex-shrink-0 mr-6">
                                <div 
                                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  style={{ backgroundColor: getSectionColors(originalIndex).accent }}
                                >
                                  <EditableText
                                    value={step.step || (i + 1).toString()}
                                    sectionIndex={originalIndex}
                                    field="steps"
                                    subIndex={i}
                                    subField="step"
                                    className="inline-block"
                                    placeholder={(i + 1).toString()}
                                  />
                                </div>
                              </div>

                              {/* Conteúdo do Passo */}
                              <div className="flex-1">
                                <div className="flex items-center mb-3">
                                  <div className="text-2xl mr-3 cursor-pointer hover:scale-110 transition-transform">
                                    <EditableText
                                      value={step.icon || '🎯'}
                                      sectionIndex={originalIndex}
                                      field="steps"
                                      subIndex={i}
                                      subField="icon"
                                      className="inline-block"
                                      placeholder="🎯"
                                      isIcon={true}
                                    />
                                  </div>
                                  <h3 className="text-xl font-bold text-gray-900">
                                    <EditableText
                                      value={step.title || 'Título do Passo'}
                                      sectionIndex={originalIndex}
                                      field="steps"
                                      subIndex={i}
                                      subField="title"
                                      className="inline-block"
                                      placeholder="Título do passo"
                                    />
                                  </h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                  <EditableText
                                    value={step.description || 'Descrição do passo'}
                                    sectionIndex={originalIndex}
                                    field="steps"
                                    subIndex={i}
                                    subField="description"
                                    className="inline-block"
                                    multiline={true}
                                    placeholder="Descreva este passo..."
                                  />
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-10 text-center lg:text-left">
                          <div 
                            className="inline-block px-8 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-all cursor-pointer"
                            style={{ backgroundColor: getSectionColors(originalIndex).accent }}
                          >
                            <EditableText
                              value={section.content.buttonText || 'Começar Agora - É Simples Assim!'}
                              sectionIndex={originalIndex}
                              field="buttonText"
                              className="inline-block"
                              placeholder="Texto do botão CTA"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'features' && (
                <div 
                  className="py-20 relative"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                      <h2 
                        className="text-3xl lg:text-4xl font-bold mb-4"
                        style={{ color: getSectionColors(originalIndex).text }}
                      >
                        <EditableText
                          value={section.content.title || 'Título da seção'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Título da seção"
                        />
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {section.content.items?.map((item: any, i: number) => (
                        <div key={i} className="text-center">
                          <div className="text-5xl mb-4 cursor-pointer hover:scale-110 transition-transform">
                            <EditableText
                              value={item.icon}
                              sectionIndex={originalIndex}
                              field="items"
                              subIndex={i}
                              subField="icon"
                              className="inline-block"
                              placeholder="🎯"
                              isIcon={true}
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            <EditableText
                              value={item.title}
                              sectionIndex={originalIndex}
                              field="items"
                              subIndex={i}
                              subField="title"
                              className="inline-block"
                              placeholder="Título do recurso"
                            />
                          </h3>
                          <p className="text-gray-600">
                            <EditableText
                              value={item.description}
                              sectionIndex={originalIndex}
                              field="items"
                              subIndex={i}
                              subField="description"
                              className="inline-block"
                              multiline={true}
                              placeholder="Descrição do recurso"
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'cta' && (
                <div 
                  className="py-20 relative"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).accent,
                    color: '#ffffff'
                  }}
                >
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 
                      className="text-3xl lg:text-4xl font-bold mb-4"
                      style={{ color: '#ffffff' }}
                    >
                      <EditableText
                        value={section.content.title || 'Pronto para Começar?'}
                        sectionIndex={originalIndex}
                        field="title"
                        className="inline-block text-white"
                        placeholder="Pronto para Começar?"
                      />
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                      <EditableText
                        value={section.content.subtitle || 'Junte-se a milhares de clientes satisfeitos'}
                        sectionIndex={originalIndex}
                        field="subtitle"
                        className="inline-block text-blue-100"
                        multiline={true}
                        placeholder="Junte-se a milhares de clientes satisfeitos"
                      />
                    </p>
                    <button 
                      className="px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
                      style={{
                        backgroundColor: getSectionColors(originalIndex).bg,
                        color: getSectionColors(originalIndex).text
                      }}
                    >
                      <EditableText
                        value={section.content.buttonText || 'Começar Agora'}
                        sectionIndex={originalIndex}
                        field="buttonText"
                        className="inline-block"
                        placeholder="Começar Agora"
                      />
                    </button>
                  </div>
                </div>
              )}

              {section.type === 'pricing' && (
                <div className="py-20 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        <EditableText
                          value={section.content.title || 'Nossos Planos'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Nossos Planos"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || 'Escolha o plano ideal para seu negócio'}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Escolha o plano ideal para seu negócio"
                        />
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {section.content.plans?.map((plan: any, i: number) => (
                        <div key={i} className={`bg-white rounded-lg shadow-lg p-8 text-center ${
                          plan.featured ? 'border-2 border-blue-500 transform scale-105' : ''
                        }`}>
                          {plan.featured && (
                            <div className="bg-blue-500 text-white text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4">
                              <EditableText
                                value={plan.badge || 'Mais Popular'}
                                sectionIndex={originalIndex}
                                field="plans"
                                subIndex={i}
                                subField="badge"
                                className="inline-block text-white"
                                placeholder="Mais Popular"
                              />
                            </div>
                          )}
                          
                          {/* Ícone do Plano */}
                          <div className="text-5xl mb-4 cursor-pointer hover:scale-110 transition-transform">
                            <EditableText
                              value={plan.icon || '💎'}
                              sectionIndex={originalIndex}
                              field="plans"
                              subIndex={i}
                              subField="icon"
                              className="inline-block"
                              placeholder="💎"
                              isIcon={true}
                            />
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            <EditableText
                              value={plan.name || 'Plano'}
                              sectionIndex={originalIndex}
                              field="plans"
                              subIndex={i}
                              subField="name"
                              className="inline-block"
                              placeholder="Nome do Plano"
                            />
                          </h3>
                          <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">
                              <EditableText
                                value={plan.price || 'R$ 99'}
                                sectionIndex={originalIndex}
                                field="plans"
                                subIndex={i}
                                subField="price"
                                className="inline-block"
                                placeholder="R$ 99"
                              />
                            </span>
                            <span className="text-gray-600 ml-2">
                              <EditableText
                                value={plan.period || '/mês'}
                                sectionIndex={originalIndex}
                                field="plans"
                                subIndex={i}
                                subField="period"
                                className="inline-block"
                                placeholder="/mês"
                              />
                            </span>
                          </div>
                          <p className="text-gray-600 mb-6">
                            <EditableText
                              value={plan.description || 'Descrição do plano'}
                              sectionIndex={originalIndex}
                              field="plans"
                              subIndex={i}
                              subField="description"
                              className="inline-block"
                              multiline={true}
                              placeholder="Descrição do plano"
                            />
                          </p>
                          <ul className="text-left mb-8 space-y-2">
                            {plan.features?.map((feature: string, fi: number) => (
                              <li key={fi} className="flex items-center">
                                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <EditableText
                                  value={feature}
                                  sectionIndex={originalIndex}
                                  field="plans"
                                  subIndex={i}
                                  subField="features"
                                  subSubIndex={fi}
                                  className="inline-block"
                                  placeholder="Recurso do plano"
                                />
                              </li>
                            ))}
                          </ul>
                          <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                            plan.featured 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}>
                            <EditableText
                              value={plan.buttonText || 'Escolher Plano'}
                              sectionIndex={originalIndex}
                              field="plans"
                              subIndex={i}
                              subField="buttonText"
                              className="inline-block"
                              placeholder="Escolher Plano"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'testimonials' && (
                <div className="py-20 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        <EditableText
                          value={section.content.title || 'O que nossos clientes dizem'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="O que nossos clientes dizem"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || 'Depoimentos reais de quem já transformou seu negócio'}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Depoimentos reais de quem já transformou seu negócio"
                        />
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(section.content.testimonials || [
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
                      ]).map((testimonial: any, i: number) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, si) => (
                                <svg key={si} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <blockquote className="text-gray-700 mb-4 relative">
                            {/* Ícone de aspas SVG elegante */}
                            <div className="absolute -top-1 -left-2">
                              <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                              </svg>
                            </div>
                            <div className="pl-6 pt-2">
                              <EditableText
                                value={testimonial.comment || 'Comentário do cliente'}
                                sectionIndex={originalIndex}
                                field="testimonials"
                                subIndex={i}
                                subField="comment"
                                className="inline-block"
                                multiline={true}
                                placeholder="Comentário do cliente"
                              />
                            </div>
                          </blockquote>
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="text-3xl cursor-pointer hover:scale-110 transition-transform">
                                <EditableText
                                  value={testimonial.avatar || '👤'}
                                  sectionIndex={originalIndex}
                                  field="testimonials"
                                  subIndex={i}
                                  subField="avatar"
                                  className="inline-block"
                                  placeholder="👤"
                                  isIcon={true}
                                />
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                <EditableText
                                  value={testimonial.name || 'Nome do Cliente'}
                                  sectionIndex={originalIndex}
                                  field="testimonials"
                                  subIndex={i}
                                  subField="name"
                                  className="inline-block"
                                  placeholder="Nome do Cliente"
                                />
                              </p>
                              <p className="text-sm text-gray-500">
                                <EditableText
                                  value={testimonial.role || 'Cargo, Empresa'}
                                  sectionIndex={originalIndex}
                                  field="testimonials"
                                  subIndex={i}
                                  subField="role"
                                  className="inline-block"
                                  placeholder="Cargo, Empresa"
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'faq' && (
                <div className="py-20 bg-gray-50">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        <EditableText
                          value={section.content.title || 'Perguntas Frequentes'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Perguntas Frequentes"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || 'Tire suas dúvidas mais comuns'}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Tire suas dúvidas mais comuns"
                        />
                      </p>
                    </div>
                    <div className="space-y-4">
                      {(section.content.faqs || [
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
                      ]).slice(0, section.content.maxQuestions || 10).map((faq: any, i: number) => (
                        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200">
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                              <EditableText
                                value={faq.question || 'Pergunta'}
                                sectionIndex={originalIndex}
                                field="faqs"
                                subIndex={i}
                                subField="question"
                                className="inline-block"
                                placeholder="Digite a pergunta aqui"
                              />
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              <EditableText
                                value={faq.answer || 'Resposta'}
                                sectionIndex={originalIndex}
                                field="faqs"
                                subIndex={i}
                                subField="answer"
                                className="inline-block"
                                multiline={true}
                                placeholder="Digite a resposta aqui"
                              />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'contact' && (
                <div className="py-20 bg-white">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        <EditableText
                          value={section.content.title || 'Entre em Contato'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Entre em Contato"
                        />
                      </h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        <EditableText
                          value={section.content.subtitle || 'Estamos aqui para ajudar você'}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Estamos aqui para ajudar você"
                        />
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Informações de contato */}
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações de Contato</h3>
                          <div className="space-y-4">
                            {/* Email - Mostrar apenas se showEmail não for false */}
                            {section.content.showEmail !== false && (
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <div className="text-2xl">
                                    📧
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-500">Email</p>
                                  <p className="text-gray-900">
                                    <EditableText
                                      value={section.content.email || 'contato@empresa.com'}
                                      sectionIndex={originalIndex}
                                      field="email"
                                      className="inline-block"
                                      placeholder="contato@empresa.com"
                                    />
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            {/* Telefone - Mostrar apenas se showPhone não for false */}
                            {section.content.showPhone !== false && (
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <div className="text-2xl">
                                    📱
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-500">Telefone</p>
                                  <p className="text-gray-900">
                                    <EditableText
                                      value={section.content.phone || '(11) 99999-9999'}
                                      sectionIndex={originalIndex}
                                      field="phone"
                                      className="inline-block"
                                      placeholder="(11) 99999-9999"
                                    />
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            {/* Endereço - Mostrar apenas se showAddress não for false */}
                            {section.content.showAddress !== false && (
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <div className="text-2xl">
                                    📍
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-500">Endereço</p>
                                  <p className="text-gray-900">
                                    <EditableText
                                      value={section.content.address || 'São Paulo, SP'}
                                      sectionIndex={originalIndex}
                                      field="address"
                                      className="inline-block"
                                      multiline={true}
                                      placeholder="São Paulo, SP"
                                    />
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Formulário de contato */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Envie sua Mensagem</h3>
                        <form className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Nome
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Seu nome"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="seu@email.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                              Mensagem
                            </label>
                            <textarea
                              id="message"
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Sua mensagem"
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <EditableText
                              value={section.content.buttonText || 'Enviar Mensagem'}
                              sectionIndex={originalIndex}
                              field="buttonText"
                              className="inline-block text-white"
                              placeholder="Enviar Mensagem"
                            />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'impact-message' && (
                <div 
                  className="py-20 relative"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Título Principal */}
                    <h2 className="text-3xl lg:text-5xl font-black mb-6">
                      <EditableText
                        value={section.content.title || 'Não Deixe Suas Vendas Escaparem Por Mais Um Dia'}
                        sectionIndex={originalIndex}
                        field="title"
                        className="inline-block"
                        placeholder="Título de impacto"
                      />
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-xl lg:text-2xl mb-8 font-medium">
                      <EditableText
                        value={section.content.subtitle || ''}
                        sectionIndex={originalIndex}
                        field="subtitle"
                        className="inline-block"
                        multiline={true}
                        placeholder="Subtítulo de urgência"
                      />
                    </p>

                    {/* Texto de Destaque */}
                    <div 
                      className="rounded-2xl p-8 mb-8 max-w-4xl mx-auto border"
                      style={{ 
                        backgroundColor: getSectionColors(originalIndex).bg,
                        borderColor: getSectionColors(originalIndex).accent
                      }}
                    >
                      <p className="text-lg lg:text-xl mb-4 font-semibold">
                        <EditableText
                          value={section.content.highlightText || ''}
                          sectionIndex={originalIndex}
                          field="highlightText"
                          className="inline-block"
                          multiline={true}
                          placeholder="Texto de destaque sobre a concorrência"
                        />
                      </p>
                      <p 
                        className="text-2xl lg:text-3xl font-bold"
                        style={{ color: getSectionColors(originalIndex).accent }}
                      >
                        <EditableText
                          value={section.content.motivationalText || ''}
                          sectionIndex={originalIndex}
                          field="motivationalText"
                          className="inline-block"
                          placeholder="Frase motivacional forte"
                        />
                      </p>
                    </div>

                    {/* Estatísticas de Impacto */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {(section.content.impactStats || [
                        { label: 'Clientes perdidos hoje', value: '47', unit: 'leads' },
                        { label: 'Faturamento perdido', value: 'R$ 12k', unit: 'hoje' },
                        { label: 'Dias sem otimização', value: '∞', unit: 'prejuízo' }
                      ]).map((stat: any, i: number) => (
                        <div 
                          key={i} 
                          className="rounded-xl p-6 border"
                          style={{ 
                            backgroundColor: getSectionColors(originalIndex).bg,
                            borderColor: getSectionColors(originalIndex).accent
                          }}
                        >
                          <div 
                            className="text-4xl lg:text-5xl font-black mb-2"
                            style={{ color: getSectionColors(originalIndex).accent }}
                          >
                            <EditableText
                              value={stat.value || '0'}
                              sectionIndex={originalIndex}
                              field="impactStats"
                              subIndex={i}
                              subField="value"
                              className="inline-block"
                              placeholder="Número"
                            />
                          </div>
                          <div className="text-sm font-medium mb-1">
                            <EditableText
                              value={stat.unit || 'unidade'}
                              sectionIndex={originalIndex}
                              field="impactStats"
                              subIndex={i}
                              subField="unit"
                              className="inline-block"
                              placeholder="Unidade"
                            />
                          </div>
                          <div className="text-lg font-semibold">
                            <EditableText
                              value={stat.label || 'Métrica'}
                              sectionIndex={originalIndex}
                              field="impactStats"
                              subIndex={i}
                              subField="label"
                              className="inline-block"
                              multiline={true}
                              placeholder="Descrição da métrica"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Urgência */}
                    <div 
                      className="text-4xl lg:text-6xl font-black animate-pulse"
                      style={{ color: getSectionColors(originalIndex).accent }}
                    >
                      <EditableText
                        value={section.content.urgencyText || 'O momento é AGORA'}
                        sectionIndex={originalIndex}
                        field="urgencyText"
                        className="inline-block"
                        placeholder="Texto de urgência"
                      />
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'final-cta' && (
                <div 
                  className="py-20 relative"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Cabeçalho */}
                    <div className="text-center mb-12">
                      <h2 className="text-3xl lg:text-5xl font-black mb-4">
                        <EditableText
                          value={section.content.title || 'Garanta Sua Transformação Agora'}
                          sectionIndex={originalIndex}
                          field="title"
                          className="inline-block"
                          placeholder="Título do CTA final"
                        />
                      </h2>
                      <p className="text-xl lg:text-2xl">
                        <EditableText
                          value={section.content.subtitle || ''}
                          sectionIndex={originalIndex}
                          field="subtitle"
                          className="inline-block"
                          multiline={true}
                          placeholder="Subtítulo da oferta"
                        />
                      </p>
                    </div>

                    {/* Oferta Completa */}
                    <div 
                      className="rounded-3xl p-8 lg:p-12 mb-8 border"
                      style={{ 
                        backgroundColor: getSectionColors(originalIndex).bg,
                        borderColor: getSectionColors(originalIndex).accent
                      }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Detalhes da Oferta */}
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                            <EditableText
                              value={section.content.offerTitle || 'Oferta Completa'}
                              sectionIndex={originalIndex}
                              field="offerTitle"
                              className="inline-block"
                              placeholder="Título da oferta"
                            />
                          </h3>
                          
                          <ul className="space-y-3 mb-6">
                            {(section.content.offerFeatures || [
                              'Templates profissionais otimizados',
                              'Editor visual sem código',
                              'Analytics e métricas detalhadas',
                              'Suporte especializado',
                              'Garantia de 30 dias'
                            ]).map((feature: string, i: number) => (
                              <li key={i} className="flex items-center">
                                <span className="text-green-300 mr-3 text-xl">✅</span>
                                <EditableText
                                  value={feature}
                                  sectionIndex={originalIndex}
                                  field="offerFeatures"
                                  subIndex={i}
                                  className="inline-block"
                                  placeholder="Funcionalidade incluída"
                                />
                              </li>
                            ))}
                          </ul>

                          <div className="text-center lg:text-left">
                            <div 
                              className="text-sm font-medium mb-1"
                              style={{ color: getSectionColors(originalIndex).accent }}
                            >
                              <EditableText
                                value={section.content.urgencyText || 'Oferta por tempo limitado'}
                                sectionIndex={originalIndex}
                                field="urgencyText"
                                className="inline-block"
                                placeholder="Texto de urgência"
                              />
                            </div>
                            <div 
                              className="text-lg line-through mb-2"
                              style={{ color: getSectionColors(originalIndex).accent }}
                            >
                              De: <EditableText
                                value={section.content.originalPrice || 'R$ 297'}
                                sectionIndex={originalIndex}
                                field="originalPrice"
                                className="inline-block"
                                placeholder="Preço original"
                              />
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                              <span className="text-4xl lg:text-5xl font-black">
                                Por: <EditableText
                                  value={section.content.currentPrice || 'R$ 97'}
                                  sectionIndex={originalIndex}
                                  field="currentPrice"
                                  className="inline-block"
                                  placeholder="Preço atual"
                                />
                              </span>
                              <span 
                                className="px-3 py-1 rounded-full text-sm font-bold text-white"
                                style={{ backgroundColor: getSectionColors(originalIndex).accent }}
                              >
                                <EditableText
                                  value={section.content.discount || '67% OFF'}
                                  sectionIndex={originalIndex}
                                  field="discount"
                                  className="inline-block"
                                  placeholder="Desconto"
                                />
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botão e Garantias */}
                        <div className="text-center">
                          <button 
                            className="w-full text-white text-xl lg:text-2xl font-black py-6 px-8 rounded-2xl hover:opacity-90 transition-all transform hover:scale-105 shadow-2xl mb-6"
                            style={{ backgroundColor: getSectionColors(originalIndex).accent }}
                          >
                            <EditableText
                              value={section.content.buttonText || 'Começar Minha Transformação Agora'}
                              sectionIndex={originalIndex}
                              field="buttonText"
                              className="inline-block"
                              placeholder="Texto do botão principal"
                            />
                          </button>

                          <p className="text-lg font-semibold mb-4">
                            <EditableText
                              value={section.content.motivationalPhrase || 'Comece hoje e veja resultados em 24h'}
                              sectionIndex={originalIndex}
                              field="motivationalPhrase"
                              className="inline-block"
                              placeholder="Frase motivadora"
                            />
                          </p>

                          <div className="flex items-center justify-center">
                            <span 
                              className="mr-2"
                              style={{ color: getSectionColors(originalIndex).accent }}
                            >🛡️</span>
                            <EditableText
                              value={section.content.guaranteeText || '30 dias de garantia total'}
                              sectionIndex={originalIndex}
                              field="guaranteeText"
                              className="inline-block"
                              placeholder="Texto da garantia"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'footer' && (
                <footer 
                  className="py-12"
                  style={{
                    backgroundColor: getSectionColors(originalIndex).bg,
                    color: getSectionColors(originalIndex).text
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      {/* Coluna 1: Informações da Empresa */}
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">
                          <EditableText
                            value={section.content.companyName || 'LPFácil'}
                            sectionIndex={originalIndex}
                            field="companyName"
                            className="inline-block"
                            placeholder="Nome da empresa"
                          />
                        </h3>
                        <p className="mb-4 text-sm opacity-80">
                          <EditableText
                            value={section.content.description || 'Criando landing pages que realmente convertem'}
                            sectionIndex={originalIndex}
                            field="description"
                            className="inline-block"
                            multiline={true}
                            placeholder="Descrição da empresa"
                          />
                        </p>
                        <div className="space-y-2 text-sm">
                          <div>
                            📧 <EditableText
                              value={section.content.email || 'contato@lpfacil.com'}
                              sectionIndex={originalIndex}
                              field="email"
                              className="inline-block"
                              placeholder="email@empresa.com"
                            />
                          </div>
                          <div>
                            📞 <EditableText
                              value={section.content.phone || '+55 (11) 99999-9999'}
                              sectionIndex={originalIndex}
                              field="phone"
                              className="inline-block"
                              placeholder="Telefone"
                            />
                          </div>
                          <div>
                            📍 <EditableText
                              value={section.content.address || 'São Paulo, SP - Brasil'}
                              sectionIndex={originalIndex}
                              field="address"
                              className="inline-block"
                              placeholder="Endereço"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Coluna 2: Links do Footer */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
                        <div className="space-y-2">
                          {(section.content.footerLinks || [
                            { name: 'Política de Privacidade', url: '/privacidade' },
                            { name: 'Termos de Uso', url: '/termos' },
                            { name: 'Suporte', url: '/suporte' }
                          ]).map((link: any, i: number) => (
                            <div key={i} className="group">
                              <EditableText
                                value={link.name || 'Link'}
                                sectionIndex={originalIndex}
                                field="footerLinks"
                                subIndex={i}
                                subField="name"
                                className="inline-block text-sm hover:opacity-80 cursor-pointer"
                                placeholder="Nome do link"
                              />
                              <div className="text-xs opacity-60 group-hover:opacity-100">
                                <EditableText
                                  value={link.url || '/pagina'}
                                  sectionIndex={originalIndex}
                                  field="footerLinks"
                                  subIndex={i}
                                  subField="url"
                                  className="inline-block"
                                  placeholder="URL do link"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coluna 3: Redes Sociais */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
                        <div className="space-y-3">
                          {(section.content.socialLinks || [
                            { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
                            { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
                            { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
                            { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
                          ]).map((social: any, i: number) => (
                            <div key={i} className="flex items-center space-x-2 group">
                              <EditableText
                                value={social.icon || '🔗'}
                                sectionIndex={originalIndex}
                                field="socialLinks"
                                subIndex={i}
                                subField="icon"
                                className="inline-block text-lg"
                                placeholder="🔗"
                              />
                              <div>
                                <EditableText
                                  value={social.name || 'Rede Social'}
                                  sectionIndex={originalIndex}
                                  field="socialLinks"
                                  subIndex={i}
                                  subField="name"
                                  className="inline-block text-sm hover:opacity-80 cursor-pointer"
                                  placeholder="Nome da rede"
                                />
                                <div className="text-xs opacity-60 group-hover:opacity-100">
                                  <EditableText
                                    value={social.url || 'https://'}
                                    sectionIndex={originalIndex}
                                    field="socialLinks"
                                    subIndex={i}
                                    subField="url"
                                    className="inline-block"
                                    placeholder="URL da rede social"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-8 border-t border-opacity-20 text-center text-sm opacity-80">
                      <EditableText
                        value={section.content.copyright || '© 2024 LPFácil. Todos os direitos reservados.'}
                        sectionIndex={originalIndex}
                        field="copyright"
                        className="inline-block"
                        placeholder="© 2024 Sua Empresa. Todos os direitos reservados."
                      />
                    </div>
                  </div>
                </footer>
              )}

              {/* Outras seções serão implementadas com edição inline em breve */}
              {(section.type !== 'menu' && section.type !== 'hero' && section.type !== 'problem-solution' && section.type !== 'value-proposition' && section.type !== 'key-benefits' && section.type !== 'demo' && section.type !== 'features' && section.type !== 'cta' && section.type !== 'pricing' && section.type !== 'testimonials' && section.type !== 'faq' && section.type !== 'contact' && section.type !== 'impact-message' && section.type !== 'final-cta' && section.type !== 'footer') && (
                <div className="py-20 bg-gray-100 text-center">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">
                      Seção {section.type}: {section.content.title}
                    </h2>
                    <p className="text-gray-600">
                      Edição inline será implementada em breve para este tipo de seção.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}






        </div>
      </div>

      {/* Modal de Seleção de Ícones */}
      {iconEditingField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                🎨 Escolher Ícone
              </h3>
              <button
                onClick={() => setIconEditingField(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Categoria sugerida */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Sugestões para {iconEditingField.field.includes('problem') ? 'Problema' : 
                                   iconEditingField.field.includes('solution') ? 'Solução' :
                                   iconEditingField.field.includes('Before') ? 'Antes' : 
                                   iconEditingField.field.includes('After') ? 'Depois' :
                                   iconEditingField.field.includes('benefits') ? 'Benefícios' :
                                   iconEditingField.field.includes('keyBenefits') ? 'Principais Benefícios' :
                                   iconEditingField.field.includes('steps') ? 'Como Funciona' :
                                   iconEditingField.field.includes('videoThumbnail') ? 'Vídeo' :
                                   iconEditingField.field.includes('items') ? 'Principais Funcionalidades' :
                                   iconEditingField.field.includes('testimonials') ? 'Depoimentos (Avatar)' :
                                   iconEditingField.field.includes('plans') ? 'Planos de Preços' : 'Ícones'}:
                </h4>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions[getIconCategory(iconEditingField.field) as keyof typeof iconOptions].map((icon, index) => (
                    <button
                      key={index}
                      onClick={() => selectIcon(icon)}
                      className="text-2xl p-2 rounded hover:bg-gray-100 transition-colors border"
                      title={`Usar ${icon}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Todas as categorias */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Outros ícones:</h4>
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {Object.entries(iconOptions).map(([category, icons]) => (
                    <div key={category}>
                      <h5 className="text-xs font-medium text-gray-500 mb-1 capitalize">
                        {category}:
                      </h5>
                      <div className="grid grid-cols-8 gap-1">
                        {icons.map((icon, index) => (
                          <button
                            key={index}
                            onClick={() => selectIcon(icon)}
                            className="text-lg p-1 rounded hover:bg-gray-100 transition-colors"
                            title={`Usar ${icon}`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campo de entrada personalizada */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Ou digite um emoji:</h4>
                <input
                  type="text"
                  placeholder="Digite um emoji..."
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      selectIcon(e.currentTarget.value.trim());
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configurações da Seção */}
      {colorModalOpen && editingColorSection !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg p-4 sm:p-6 lg:p-8 w-full max-h-[90vh] overflow-y-auto ${
            sections[editingColorSection]?.type === 'menu' ? 'max-w-2xl lg:max-w-4xl' : 
            sections[editingColorSection]?.type === 'problem-solution' ? 'max-w-3xl lg:max-w-5xl' :
            sections[editingColorSection]?.type === 'contact' ? 'max-w-4xl lg:max-w-6xl' :
            sections[editingColorSection]?.type === 'faq' ? 'max-w-5xl lg:max-w-7xl' : 'max-w-md lg:max-w-lg'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                ⚙️ Configurações - {getSectionInfo(sections[editingColorSection]?.type).name}
              </h3>
              <button
                onClick={closeColorModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <ColorEditor
              sectionIndex={editingColorSection}
              colors={getSectionColors(editingColorSection)}
              onColorsChange={updateSectionColors}
              onClose={closeColorModal}
              sections={sections}
              updateSectionContent={updateSectionContent}
            />
          </div>
        </div>
      )}

      {/* Modal de Edição de URL do Vídeo */}
      {videoUrlModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎬</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Alterar URL do Vídeo</h3>
                  <p className="text-sm text-gray-500">YouTube, Vimeo ou outras plataformas</p>
                </div>
              </div>
              <button
                onClick={closeVideoUrlModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const newUrl = formData.get('videoUrl') as string;
              handleVideoUrlSubmit(newUrl);
            }}>
              <div className="p-6">
                {/* Campo de URL */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                      Cole a URL do vídeo:
                    </label>
                    <input
                      type="url"
                      id="videoUrl"
                      name="videoUrl"
                      defaultValue={videoUrlModal.currentUrl}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                      placeholder="https://youtu.be/ABC123 ou https://vimeo.com/123456"
                      required
                    />
                  </div>

                  {/* Dicas de Uso */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">✨ Formatos Suportados:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>YouTube:</strong> https://youtu.be/ABC123</li>
                      <li>• <strong>YouTube:</strong> https://youtube.com/watch?v=ABC123</li>
                      <li>• <strong>Vimeo:</strong> https://vimeo.com/123456</li>
                    </ul>
                    <p className="text-xs text-blue-600 mt-3">
                      💡 A URL será convertida automaticamente para o formato correto de incorporação
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <button
                  type="button"
                  onClick={closeVideoUrlModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center space-x-2"
                >
                  <span>🎬</span>
                  <span>Aplicar Vídeo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


// Componente para edição de cores
function ColorEditor({ 
  sectionIndex, 
  colors, 
  onColorsChange, 
  onClose,
  sections,
  updateSectionContent
}: {
  sectionIndex: number;
  colors: {bg: string, text: string, accent: string};
  onColorsChange: (sectionIndex: number, colors: {bg: string, text: string, accent: string}) => void;
  onClose: () => void;
  sections?: any[];
  updateSectionContent?: (sectionIndex: number, field: string, value: any, subIndex?: number, subField?: string) => void;
}) {
  const [localColors, setLocalColors] = useState(colors);

  // Função para obter informações da seção (apenas quando necessário)
  const getSectionInfo = (type: string) => {
    switch (type) {
      case 'menu':
        return { name: 'Menu de Navegação', icon: '🍃' };
      case 'hero':
        return { name: 'Apresentação', icon: '🏆' };
      case 'problem-solution':
        return { name: 'Problema + Solução', icon: '⚡' };
      case 'value-proposition':
        return { name: 'Proposta de Valor', icon: '💎' };
      case 'key-benefits':
        return { name: 'Principais Benefícios', icon: '🚀' };
      case 'demo':
        return { name: 'Como Funciona', icon: '🎬' };
      case 'features':
        return { name: 'Principais Funcionalidades', icon: '⭐' };
      case 'testimonials':
        return { name: 'Depoimentos', icon: '💬' };
      case 'pricing':
        return { name: 'Preços', icon: '💰' };
      case 'impact-message':
        return { name: 'Mensagem de Impacto', icon: '💥' };
      case 'final-cta':
        return { name: 'CTA Final', icon: '🔥' };
      case 'cta':
        return { name: 'Chamada para Ação', icon: '🎯' };
      case 'faq':
        return { name: 'Perguntas Frequentes', icon: '❓' };
      case 'contact':
        return { name: 'Contato', icon: '📞' };
      case 'footer':
        return { name: 'Rodapé', icon: '🦶' };
      default:
        return { name: 'Seção', icon: '📄' };
    }
  };

  const presetColors = [
    { name: 'Azul', bg: '#f0f9ff', text: '#1e40af', accent: '#3b82f6' },
    { name: 'Verde', bg: '#f0fdf4', text: '#166534', accent: '#22c55e' },
    { name: 'Roxo', bg: '#faf5ff', text: '#7c2d12', accent: '#a855f7' },
    { name: 'Rosa', bg: '#fdf2f8', text: '#be185d', accent: '#ec4899' },
    { name: 'Laranja', bg: '#fff7ed', text: '#c2410c', accent: '#f97316' },
    { name: 'Cinza', bg: '#f9fafb', text: '#374151', accent: '#6b7280' },
  ];

  const handleColorChange = (type: 'bg' | 'text' | 'accent', value: string) => {
    setLocalColors(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const applyPreset = (preset: typeof presetColors[0]) => {
    setLocalColors(preset);
  };

  const handleSave = () => {
    onColorsChange(sectionIndex, localColors);
    onClose();
  };

  // Layout específico para seção problem-solution - LADO A LADO
  if (sections && updateSectionContent && sections[sectionIndex]?.type === 'problem-solution') {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          {/* COLUNA ESQUERDA: Configurações de Cores */}
          <div className="space-y-6">
            {/* Pré-visualização */}
            <div 
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: localColors.bg,
                color: localColors.text,
                borderColor: localColors.accent
              }}
            >
              <h4 className="font-semibold mb-2">Pré-visualização</h4>
              <p className="text-sm mb-2">Seção com as cores selecionadas.</p>
              <button 
                className="px-3 py-1 rounded text-sm"
                style={{
                  backgroundColor: localColors.accent,
                  color: '#ffffff'
                }}
              >
                Botão de Exemplo
              </button>
            </div>

            {/* Cores Preset */}
            <div>
              <h4 className="font-medium mb-3">Temas Pré-definidos</h4>
              <div className="grid grid-cols-2 gap-2">
                {presetColors.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="p-2 rounded border hover:border-gray-400 transition-colors"
                    title={preset.name}
                  >
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: preset.bg }}></div>
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: preset.text }}></div>
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: preset.accent }}></div>
                    </div>
                    <div className="text-xs mt-1">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cores Personalizadas */}
            <div>
              <h4 className="font-medium mb-3">Cores Personalizadas</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Fundo</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Texto</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Destaque</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Configurações Específicas da Seção */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">🎛️ Configurações da Seção</h4>
            
            {/* Checkbox para mostrar/ocultar transformação */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="show-transformation"
                  checked={sections[sectionIndex]?.content?.showTransformation !== false}
                  onChange={(e) => {
                    updateSectionContent(sectionIndex, 'showTransformation', e.target.checked);
                  }}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label 
                  htmlFor="show-transformation"
                  className="text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Mostrar seção "A Transformação"
                </label>
              </div>
            </div>

            {/* Configurações de cores das caixas */}
            <div className="space-y-5">
              <h5 className="text-base font-medium text-gray-700 border-b pb-2">🎨 Cores das Caixas</h5>
              
              {/* Cor da caixa do Problema */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium mb-3 text-gray-800">🔴 Cor da Caixa do Problema</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={sections[sectionIndex]?.content?.problemBoxColor || '#3b82f6'}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'problemBoxColor', e.target.value);
                    }}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={sections[sectionIndex]?.content?.problemBoxColor || '#3b82f6'}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'problemBoxColor', e.target.value);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              {/* Cor da caixa da Solução */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium mb-3 text-gray-800">🟢 Cor da Caixa da Solução</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={sections[sectionIndex]?.content?.solutionBoxColor || '#3b82f6'}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'solutionBoxColor', e.target.value);
                    }}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={sections[sectionIndex]?.content?.solutionBoxColor || '#3b82f6'}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'solutionBoxColor', e.target.value);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              {/* Cor da caixa da Transformação */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium mb-3 text-gray-800">🔵 Cor da Caixa da Transformação</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={sections[sectionIndex]?.content?.transformationBoxColor || '#3b82f6'}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'transformationBoxColor', e.target.value);
                    }}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={sections[sectionIndex]?.content?.transformationBoxColor || '#3b82f6'}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'transformationBoxColor', e.target.value);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>
    );
  }

  // Layout específico para seção menu - LADO A LADO
  if (sections && updateSectionContent && sections[sectionIndex]?.type === 'menu') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* COLUNA ESQUERDA: Configurações de Cores */}
          <div className="space-y-6">
            {/* Pré-visualização */}
            <div 
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: localColors.bg,
                color: localColors.text,
                borderColor: localColors.accent
              }}
            >
              <h4 className="font-semibold mb-2">Pré-visualização</h4>
              <p className="text-sm mb-2">Menu com as cores selecionadas.</p>
              <button 
                className="px-3 py-1 rounded text-sm"
                style={{
                  backgroundColor: localColors.accent,
                  color: '#ffffff'
                }}
              >
                Link Menu
              </button>
            </div>

            {/* Cores Preset */}
            <div>
              <h4 className="font-medium mb-3">Temas Pré-definidos</h4>
              <div className="grid grid-cols-2 gap-2">
                {presetColors.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="p-2 rounded border hover:border-gray-400 transition-colors"
                    title={preset.name}
                  >
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: preset.bg }}></div>
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: preset.text }}></div>
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: preset.accent }}></div>
                    </div>
                    <div className="text-xs mt-1">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cores Personalizadas */}
            <div>
              <h4 className="font-medium mb-3">Cores Personalizadas</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Fundo</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Texto</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Destaque</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-8 h-8 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Itens do Menu */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">📋 Itens do Menu</h4>
            <p className="text-xs text-gray-600 mb-3">
              Selecione quais seções devem aparecer no menu de navegação:
            </p>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {/* Item Início (obrigatório) */}
              <div className="flex items-center space-x-3 p-2 rounded border border-blue-200 bg-blue-50">
                <input
                  type="checkbox"
                  id="menu-item-inicio"
                  checked={true}
                  disabled={true}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded opacity-50 cursor-not-allowed"
                />
                <label 
                  htmlFor="menu-item-inicio"
                  className="flex-1 text-sm text-blue-900 font-medium"
                >
                  Início
                </label>
                <span className="text-xs text-blue-600 font-semibold">
                  OBRIGATÓRIO
                </span>
              </div>

              {/* Outras seções */}
              {sections
                .map((section, index) => {
                  if (!section.visible || section.type === 'menu') return null;
                  
                  const currentMenuItems = sections[sectionIndex]?.content?.items || [];
                  const sectionInfo = getSectionInfo(section.type);
                  const isEnabled = currentMenuItems.some((item: any) => item.href === `#section-${index}`);
                  
                  return (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded border border-gray-200">
                      <input
                        type="checkbox"
                        id={`menu-item-${index}`}
                        checked={isEnabled}
                        onChange={(e) => {
                          let newItems = [...currentMenuItems];
                          
                          // Sempre manter o item "Início" no início da lista
                          const inicioItem = newItems.find(item => item.label === 'Início') || { label: 'Início', href: '#section-0' };
                          newItems = newItems.filter(item => item.label !== 'Início');
                          
                          if (e.target.checked) {
                            // Adicionar item
                            newItems.push({
                              label: sectionInfo.name,
                              href: `#section-${index}`
                            });
                          } else {
                            // Remover item
                            newItems = newItems.filter((item: any) => item.href !== `#section-${index}`);
                          }
                          
                          // Garantir que "Início" esteja sempre primeiro
                          newItems.unshift(inicioItem);
                          
                          updateSectionContent(sectionIndex, 'items', newItems);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`menu-item-${index}`}
                        className="flex-1 text-sm text-gray-900 cursor-pointer"
                      >
                        {sectionInfo.name}
                      </label>
                      <span className="text-xs text-gray-500">
                        {section.type}
                      </span>
                    </div>
                  );
                })
                .filter(Boolean)
              }
              
              {sections.filter(s => s.visible && s.type !== 'menu').length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhuma seção visível encontrada
                </p>
              )}
            </div>
            
            {/* Configuração de Tamanho do Texto */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="text-sm font-medium text-gray-900 mb-2">📏 Tamanho do Texto</h5>
              <select
                value={sections[sectionIndex]?.content?.textSize || 'medium'}
                onChange={(e) => {
                  updateSectionContent(sectionIndex, 'textSize', e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="small">Pequeno</option>
                <option value="medium">Médio</option>
                <option value="large">Grande</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>
    );
  }

  // Layout específico para seção contact - LADO A LADO
  if (sections && updateSectionContent && sections[sectionIndex]?.type === 'contact') {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-12">
          {/* COLUNA ESQUERDA: Configurações de Cores */}
          <div className="space-y-8">
            {/* Pré-visualização */}
            <div 
              className="p-6 rounded-lg border-2"
              style={{
                backgroundColor: localColors.bg,
                color: localColors.text,
                borderColor: localColors.accent
              }}
            >
              <h4 className="font-semibold mb-3">Pré-visualização</h4>
              <p className="text-sm mb-3">Seção de contato com as cores selecionadas.</p>
              <button 
                className="px-4 py-2 rounded text-sm"
                style={{
                  backgroundColor: localColors.accent,
                  color: '#ffffff'
                }}
              >
                Enviar Mensagem
              </button>
            </div>

            {/* Cores Preset */}
            <div>
              <h4 className="font-medium mb-4">Temas Pré-definidos</h4>
              <div className="grid grid-cols-2 gap-3">
                {presetColors.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="p-3 rounded border hover:border-gray-400 transition-colors"
                    title={preset.name}
                  >
                    <div className="flex space-x-2 mb-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.bg }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.text }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }}></div>
                    </div>
                    <div className="text-xs">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cores Personalizadas */}
            <div>
              <h4 className="font-medium mb-4">Cores Personalizadas</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fundo</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="w-10 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Texto</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="w-10 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Destaque</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-10 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Configurações Específicas da Seção */}
          <div className="space-y-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">🎛️ Configurações da Seção</h4>
            
            {/* Configurações de exibição */}
            <div className="space-y-6">
              <h5 className="text-sm font-medium text-gray-700 border-b pb-3 mb-6">👁️ Exibir Informações</h5>
              
              {/* Mostrar Email */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="show-email"
                    checked={sections[sectionIndex]?.content?.showEmail !== false}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'showEmail', e.target.checked);
                    }}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label 
                    htmlFor="show-email"
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    📧 Mostrar Email
                  </label>
                </div>
              </div>

              {/* Mostrar Telefone */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="show-phone"
                    checked={sections[sectionIndex]?.content?.showPhone !== false}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'showPhone', e.target.checked);
                    }}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label 
                    htmlFor="show-phone"
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    📱 Mostrar Telefone
                  </label>
                </div>
              </div>

              {/* Mostrar Endereço */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="show-address"
                    checked={sections[sectionIndex]?.content?.showAddress !== false}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'showAddress', e.target.checked);
                    }}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label 
                    htmlFor="show-address"
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    📍 Mostrar Endereço
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>
    );
  }

  // Layout específico para seção faq - LADO A LADO
  if (sections && updateSectionContent && sections[sectionIndex]?.type === 'faq') {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-12">
          {/* COLUNA ESQUERDA: Configurações de Cores */}
          <div className="space-y-8">
            {/* Pré-visualização */}
            <div 
              className="p-6 rounded-lg border-2"
              style={{
                backgroundColor: localColors.bg,
                color: localColors.text,
                borderColor: localColors.accent
              }}
            >
              <h4 className="font-semibold mb-3">Pré-visualização</h4>
              <p className="text-sm mb-3">Seção FAQ com as cores selecionadas.</p>
              <button 
                className="px-4 py-2 rounded text-sm"
                style={{
                  backgroundColor: localColors.accent,
                  color: '#ffffff'
                }}
              >
                Ver Resposta
              </button>
            </div>

            {/* Cores Preset */}
            <div>
              <h4 className="font-medium mb-4">Temas Pré-definidos</h4>
              <div className="grid grid-cols-2 gap-3">
                {presetColors.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="p-3 rounded border hover:border-gray-400 transition-colors"
                    title={preset.name}
                  >
                    <div className="flex space-x-2 mb-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.bg }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.text }}></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }}></div>
                    </div>
                    <div className="text-xs">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cores Personalizadas */}
            <div>
              <h4 className="font-medium mb-4">Cores Personalizadas</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fundo</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="w-10 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.bg}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Texto</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="w-10 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Destaque</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-10 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={localColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded text-sm"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Configurações Específicas da Seção */}
          <div className="space-y-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">🎛️ Configurações da Seção</h4>
            
            {/* Configurações de exibição */}
            <div className="space-y-6">
              <h5 className="text-sm font-medium text-gray-700 border-b pb-3 mb-6">❓ Configurações do FAQ</h5>
              
              {/* Quantidade de perguntas */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  📊 Quantidade de Perguntas a Exibir
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={sections[sectionIndex]?.content?.maxQuestions || 10}
                    onChange={(e) => {
                      updateSectionContent(sectionIndex, 'maxQuestions', parseInt(e.target.value) || 10);
                    }}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    perguntas (máximo 20)
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Controla quantas perguntas aparecerão na landing page. Total disponível: {sections[sectionIndex]?.content?.faqs?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>
    );
  }

  // Layout padrão para outras seções
  return (
    <div className="space-y-6">
      {/* Pré-visualização */}
      <div 
        className="p-4 rounded-lg border-2"
        style={{
          backgroundColor: localColors.bg,
          color: localColors.text,
          borderColor: localColors.accent
        }}
      >
        <h4 className="font-semibold mb-2">Pré-visualização</h4>
        <p className="text-sm mb-2">Este é um exemplo de como as cores ficarão na seção.</p>
        <button 
          className="px-3 py-1 rounded text-sm"
          style={{
            backgroundColor: localColors.accent,
            color: '#ffffff'
          }}
        >
          Botão de Exemplo
        </button>
      </div>

      {/* Cores Preset */}
      <div>
        <h4 className="font-medium mb-3">Temas Pré-definidos</h4>
        <div className="grid grid-cols-3 gap-2">
          {presetColors.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="p-2 rounded border hover:border-gray-400 transition-colors"
              title={preset.name}
            >
              <div className="flex space-x-1">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.bg }}></div>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.text }}></div>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }}></div>
              </div>
              <div className="text-xs mt-1">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Cores Personalizadas */}
      <div>
        <h4 className="font-medium mb-3">Cores Personalizadas</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Fundo</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localColors.bg}
                onChange={(e) => handleColorChange('bg', e.target.value)}
                className="w-8 h-8 rounded border"
              />
              <input
                type="text"
                value={localColors.bg}
                onChange={(e) => handleColorChange('bg', e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Texto</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localColors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="w-8 h-8 rounded border"
              />
              <input
                type="text"
                value={localColors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm"
                placeholder="#1f2937"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Destaque</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localColors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-8 h-8 rounded border"
              />
              <input
                type="text"
                value={localColors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm"
                placeholder="#3b82f6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Configurações específicas da Apresentação (Hero) */}
      {sections && updateSectionContent && sections[sectionIndex]?.type === 'hero' && (
        <div className="pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">🎛️ Configurações da Seção</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hero-show-button"
                checked={sections[sectionIndex]?.content?.showButton !== false}
                onChange={(e) => {
                  updateSectionContent(sectionIndex, 'showButton', e.target.checked);
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="hero-show-button"
                className="text-sm text-gray-900 cursor-pointer"
              >
                Mostrar botão na seção
              </label>
            </div>
          </div>
        </div>
      )}



      {/* Botões de Ação */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
            Aplicar
          </button>
      </div>
    </div>
  );
}
