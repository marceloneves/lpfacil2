'use client';

import { LandingPageSection } from '@/lib/types/editor';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import CTASection from './CTASection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';

interface SectionRendererProps {
  section: LandingPageSection;
  isEditing?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function SectionRenderer({
  section,
  isEditing = false,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}: SectionRendererProps) {
  
  const handleSectionClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.preventDefault();
      e.stopPropagation();
      onSelect?.();
    }
  };

  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero':
        return <HeroSection section={section} />;
      case 'features':
        return <FeaturesSection section={section} />;
      case 'testimonials':
        return <TestimonialsSection section={section} />;
      case 'pricing':
        return <PricingSection section={section} />;
      case 'cta':
        return <CTASection section={section} />;
      case 'faq':
        return <FAQSection section={section} />;
      case 'contact':
        return <ContactSection section={section} />;
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Seção não implementada: {section.type}
          </div>
        );
    }
  };

  const sectionStyles = {
    backgroundColor: section.styles.backgroundColor,
    color: section.styles.textColor,
    paddingTop: `${section.styles.padding.top}px`,
    paddingBottom: `${section.styles.padding.bottom}px`,
    paddingLeft: `${section.styles.padding.left}px`,
    paddingRight: `${section.styles.padding.right}px`,
    textAlign: section.styles.alignment as 'left' | 'center' | 'right',
    backgroundImage: section.styles.backgroundImage ? `url(${section.styles.backgroundImage})` : undefined,
    borderRadius: section.styles.borderRadius ? `${section.styles.borderRadius}px` : undefined,
    boxShadow: section.styles.shadow ? '0 10px 25px rgba(0, 0, 0, 0.1)' : undefined,
  };

  if (!section.visible) {
    return null;
  }

  return (
    <div
      className={`relative transition-all duration-200 ${
        isEditing ? 'cursor-pointer' : ''
      } ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={sectionStyles}
      onClick={handleSectionClick}
    >
      {/* Editing Controls */}
      {isEditing && isSelected && (
        <div className="absolute top-2 right-2 z-10 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp?.();
            }}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            title="Mover para cima"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown?.();
            }}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            title="Mover para baixo"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            title="Editar seção"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors"
            title="Remover seção"
          >
            <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Section Name Badge (only when editing) */}
      {isEditing && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {section.name}
          </span>
        </div>
      )}

      {/* Section Content */}
      <div className="max-w-7xl mx-auto">
        {renderSectionContent()}
      </div>
    </div>
  );
}
