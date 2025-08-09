'use client';

import { LandingPageData, LandingPageSection } from '@/lib/types/editor';

// Componentes de seção importados
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import PricingSection from '../sections/PricingSection';
import CTASection from '../sections/CTASection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';

interface PreviewRendererProps {
  landingPageData: LandingPageData;
}

export default function PreviewRenderer({ landingPageData }: PreviewRendererProps) {
  const renderSection = (section: LandingPageSection, index: number) => {
    const baseClass = "w-full";
    
    switch (section.type) {
      case 'hero':
        return (
          <div key={index} className={baseClass}>
            <HeroSection section={section} />
          </div>
        );
        
      case 'features':
        return (
          <div key={index} className={baseClass}>
            <FeaturesSection section={section} />
          </div>
        );
        
      case 'testimonials':
        return (
          <div key={index} className={baseClass}>
            <TestimonialsSection section={section} />
          </div>
        );
        
      case 'pricing':
        return (
          <div key={index} className={baseClass}>
            <PricingSection section={section} />
          </div>
        );
        
      case 'cta':
        return (
          <div key={index} className={baseClass}>
            <CTASection section={section} />
          </div>
        );
        
      case 'faq':
        return (
          <div key={index} className={baseClass}>
            <FAQSection section={section} />
          </div>
        );
        
      case 'contact':
        return (
          <div key={index} className={baseClass}>
            <ContactSection section={section} />
          </div>
        );
        
      default:
        return (
          <div key={index} className={`${baseClass} py-16 bg-gray-100`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Seção Desconhecida: {section.type}
              </h2>
              <p className="text-gray-600">
                Este tipo de seção ainda não está implementado no preview.
              </p>
            </div>
          </div>
        );
    }
  };

  if (!landingPageData || !landingPageData.sections) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Meta tags dinâmicas seriam inseridas aqui via next/head */}
      
      {/* Renderizar todas as seções */}
      {landingPageData.sections.map((section, index) => 
        renderSection(section, index)
      )}
      
      {/* Footer fixo para preview */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">{landingPageData.title}</h3>
              <p className="text-gray-400 text-sm">
                Criado com LPFácil2 - Editor de Landing Pages
              </p>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 Todos os direitos reservados
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
