'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import Logo from '@/app/components/Logo';

interface SectionContent {
  title: string;
  subtitle?: string;
  buttonText?: string;
  items?: any[];
  plans?: any[];
  testimonials?: any[];
  faqs?: any[];
  email?: string;
  phone?: string;
  address?: string;
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
            highlighted: false
          },
          {
            name: 'Pro',
            price: 'R$ 79',
            period: '/mês',
            features: ['20 Landing Pages', 'Analytics Avançado', 'Suporte Prioritário', 'A/B Testing'],
            highlighted: true
          },
          {
            name: 'Enterprise',
            price: 'R$ 199',
            period: '/mês',
            features: ['Landing Pages Ilimitadas', 'Analytics Completo', 'Suporte 24/7', 'White Label'],
            highlighted: false
          }
        ]
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
    }
  ]);
  const [activeSection, setActiveSection] = useState(0);
  const [editingField, setEditingField] = useState<{sectionIndex: number, field: string, subIndex?: number, subField?: string} | null>(null);
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
        setSections(landingPage.sections || []);
        
        // Carregar configurações de cores se existirem
        if (landingPage.settings && landingPage.settings.sectionColors) {
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

  const updateSectionContent = (sectionIndex: number, field: string, value: any, subIndex?: number, subField?: string, subSubIndex?: number) => {
    const updatedSections = [...sections];
    
    if (subIndex !== undefined && subField) {
      // Para campos aninhados em arrays (como plans, testimonials, items)
      if (field === 'items' && updatedSections[sectionIndex].content.items) {
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
      updatedSections[sectionIndex].content = {
        ...updatedSections[sectionIndex].content,
        [field]: value
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
    placeholder = ""
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
  }) => {
    const isEditing = editingField?.sectionIndex === sectionIndex && 
                     editingField?.field === field && 
                     editingField?.subIndex === subIndex &&
                     editingField?.subField === subField;

    const handleClick = () => {
      if (!isEditing) {
        startInlineEdit(sectionIndex, field, subIndex, subField);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) {
        finishInlineEdit();
      }
      if (e.key === 'Escape') {
        finishInlineEdit();
      }
    };

    const handleBlur = () => {
      finishInlineEdit();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      if (subIndex !== undefined && subField) {
        // Para campos aninhados em arrays
        updateSectionContent(sectionIndex, field, newValue, subIndex, subField, subSubIndex);
      } else if (subIndex !== undefined) {
        // Para arrays simples
        updateSectionContent(sectionIndex, field, { [field]: newValue }, subIndex);
      } else {
        // Para campos diretos
        updateSectionContent(sectionIndex, field, newValue);
      }
    };

    if (isEditing) {
      if (multiline) {
        return (
          <textarea
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-blue-500 bg-white p-2 rounded resize-none`}
            placeholder={placeholder}
            autoFocus
            rows={3}
          />
        );
      } else {
        return (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-blue-500 bg-white p-2 rounded`}
            placeholder={placeholder}
            autoFocus
          />
        );
      }
    }

    return (
      <span 
        onClick={handleClick}
        className={`${className} cursor-text hover:bg-yellow-100 hover:outline hover:outline-2 hover:outline-yellow-400 hover:outline-dashed rounded px-1 transition-all`}
        title="Clique para editar"
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
        settings: {
          sectionColors: sectionColors
        },
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

  // Auto-save quando há mudanças (apenas após carregamento inicial)
  useEffect(() => {
    if (sections.length > 0 && saveStatus === 'idle' && !isLoading) {
      const timer = setTimeout(() => {
        saveLandingPage();
      }, 5000); // Auto-save após 5 segundos sem mudanças

      return () => clearTimeout(timer);
    }
  }, [sections, landingPageTitle, sectionColors, isLoading]);

  const getSectionInfo = (type: string) => {
    switch (type) {
      case 'hero':
        return { name: 'Apresentação', icon: '🏆' };
      case 'features':
        return { name: 'Funcionalidades', icon: '⭐' };
      case 'testimonials':
        return { name: 'Depoimentos', icon: '💬' };
      case 'pricing':
        return { name: 'Preços', icon: '💰' };
      case 'cta':
        return { name: 'Chamada para Ação', icon: '🎯' };
      case 'faq':
        return { name: 'Perguntas Frequentes', icon: '❓' };
      case 'contact':
        return { name: 'Contato', icon: '📞' };
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

  const getSectionColors = (sectionIndex: number) => {
    return sectionColors[sectionIndex] || {
      bg: '#ffffff',
      text: '#1f2937',
      accent: '#3b82f6'
    };
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
                        : 'bg-orange-600 text-white hover:bg-orange-700'
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
                            title="Editar cores da seção"
                          >
                            🎨
                          </button>
                          <span className="text-xs text-gray-400">#{index + 1}</span>
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Auto-Save</span>
                  <div className="text-sm text-green-600">
                    ✅ Ativado (5s)
                  </div>
                </div>
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
              
              <button
                onClick={saveLandingPage}
                disabled={isSaving}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isSaving 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSaving ? '⏳ Salvando...' : '💾 Salvar Agora'}
              </button>
              
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
                          value={section.content.title}
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
                          value={section.content.title}
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
                          <div className="text-4xl mb-4">
                            <EditableText
                              value={item.icon}
                              sectionIndex={originalIndex}
                              field="items"
                              subIndex={i}
                              subField="icon"
                              className="inline-block"
                              placeholder="🎯"
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
                          <blockquote className="text-gray-700 mb-4">
                            "<EditableText
                              value={testimonial.comment || 'Comentário do cliente'}
                              sectionIndex={originalIndex}
                              field="testimonials"
                              subIndex={i}
                              subField="comment"
                              className="inline-block"
                              multiline={true}
                              placeholder="Comentário do cliente"
                            />"
                          </blockquote>
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                                <EditableText
                                  value={testimonial.avatar || '👤'}
                                  sectionIndex={originalIndex}
                                  field="testimonials"
                                  subIndex={i}
                                  subField="avatar"
                                  className="inline-block"
                                  placeholder="👤"
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
                      ]).map((faq: any, i: number) => (
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
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
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
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
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
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
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

              {/* Outras seções serão implementadas com edição inline em breve */}
              {(section.type !== 'hero' && section.type !== 'features' && section.type !== 'cta' && section.type !== 'pricing' && section.type !== 'testimonials' && section.type !== 'faq' && section.type !== 'contact') && (
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

          {/* Instruções */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 Como Usar o Editor Visual
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">☑️ Controle de Seções</h3>
                  <p className="text-gray-600">Use os checkboxes na sidebar para mostrar/ocultar seções na landing page</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">🔄 Reordenar Seções</h3>
                  <p className="text-gray-600">Arraste e solte as seções na sidebar para reordenar sua posição</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">📋 Navegação Rápida</h3>
                  <p className="text-gray-600">Clique no nome da seção para navegar diretamente até ela</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">✏️ Edição Inline</h3>
                  <p className="text-gray-600">Clique diretamente em qualquer texto para editá-lo na própria página</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">💾 Auto-Save</h3>
                  <p className="text-gray-600">Suas alterações são salvas automaticamente a cada 5 segundos</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">🚀 Publicar</h3>
                  <p className="text-gray-600">Use o botão Publicar para tornar sua landing page acessível publicamente</p>
                </div>
              </div>
            </div>
          </div>



          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold">Editor Visual com Sidebar</h3>
                  <p className="text-gray-400 text-sm">
                    Criado com LPFácil2 - Funcionalidade Completa
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  © 2024 Todos os direitos reservados
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Modal de Edição de Cores */}
      {colorModalOpen && editingColorSection !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                🎨 Editar Cores - {getSectionInfo(sections[editingColorSection]?.type).name}
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
            />
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
  onClose 
}: {
  sectionIndex: number;
  colors: {bg: string, text: string, accent: string};
  onColorsChange: (sectionIndex: number, colors: {bg: string, text: string, accent: string}) => void;
  onClose: () => void;
}) {
  const [localColors, setLocalColors] = useState(colors);

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
          Aplicar Cores
        </button>
      </div>
    </div>
  );
}
