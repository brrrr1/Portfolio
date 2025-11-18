export type Language = 'es' | 'en' | 'de';

export interface LocalizedText {
  es: string;
  en: string;
  de: string;
}

export interface Education {
  id: number;
  institution: string;
  logoUrl?: string | null;
  yearRange: string;
  degree: LocalizedText;
  description: LocalizedText;
  orderIndex: number;
}

export interface EducationPayload {
  institution: string;
  logoUrl?: string;
  yearRange: string;
  degree: LocalizedText;
  description: LocalizedText;
  orderIndex: number;
}

export interface Experience {
  id: number;
  company: string;
  companyUrl?: string | null;
  logoUrl?: string | null;
  role: LocalizedText;
  description: LocalizedText;
  location: LocalizedText;
  dateRange: LocalizedText;
  workMode: LocalizedText;
  orderIndex: number;
}

export interface ExperiencePayload {
  company: string;
  companyUrl?: string;
  logoUrl?: string;
  role: LocalizedText;
  description: LocalizedText;
  location: LocalizedText;
  dateRange: LocalizedText;
  workMode: LocalizedText;
  orderIndex: number;
}

export interface Project {
  id: number;
  slug: string;
  category: string;
  featured: boolean;
  coverImageUrl: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  githubUrlFront?: string | null;
  githubUrlBack?: string | null;
  orderIndex: number;
  technologies: string[];
  galleryImages: string[];
  title: LocalizedText;
  shortDescription: LocalizedText;
  detailedDescription: LocalizedText;
}

export interface ProjectPayload {
  slug: string;
  category: string;
  featured: boolean;
  coverImageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  githubUrlFront?: string;
  githubUrlBack?: string;
  orderIndex: number;
  technologies: string[];
  galleryImages: string[];
  title: LocalizedText;
  shortDescription: LocalizedText;
  detailedDescription: LocalizedText;
}

export type BackendLanguage = 'ES' | 'EN' | 'DE';

export interface CvMetadata {
  language: BackendLanguage;
  fileName: string;
  updatedAt: string;
}

