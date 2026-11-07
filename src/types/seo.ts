/**
 * SEO & Structured Data Types for Bovaro Real Estate
 */

export interface PageSeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  openGraphImage?: string;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RealEstateSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  developer: string;
  emirate: string;
  district: string;
  propertyTypes: string[];
  priceGuide?: string;
}
