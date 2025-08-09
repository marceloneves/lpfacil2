// Tipos para o editor de landing pages

export interface LandingPageSection {
  id: string;
  type: SectionType;
  name: string;
  content: SectionContent;
  styles: SectionStyles;
  order: number;
  visible: boolean;
}

export type SectionType = 
  | 'hero'
  | 'features' 
  | 'testimonials'
  | 'pricing'
  | 'cta'
  | 'contact'
  | 'about'
  | 'gallery'
  | 'faq'
  | 'newsletter';

export interface SectionContent {
  [key: string]: any;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
  items?: Array<{
    id: string;
    title?: string;
    description?: string;
    image?: string;
    icon?: string;
  }>;
}

export interface SectionStyles {
  backgroundColor: string;
  textColor: string;
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alignment: 'left' | 'center' | 'right';
  backgroundImage?: string;
  borderRadius?: number;
  shadow?: boolean;
}

export interface LandingPageData {
  id?: string;
  title: string;
  template: string;
  sections: LandingPageSection[];
  settings: {
    favicon?: string;
    customCSS?: string;
    analytics?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  status: 'draft' | 'published' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface SectionTemplate {
  id: string;
  type: SectionType;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  defaultContent: SectionContent;
  defaultStyles: SectionStyles;
}

export interface EditorState {
  selectedSectionId: string | null;
  previewMode: boolean;
  sidebarOpen: boolean;
  activeTab: 'sections' | 'design' | 'settings';
  isDragging: boolean;
}
