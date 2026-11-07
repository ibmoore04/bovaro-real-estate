/**
 * Real Estate Development Project Data Models
 */

import { FaqItem } from "./seo";

export type Emirate = "Dubai" | "Abu Dhabi" | "Ras Al Khaimah";

export interface ProjectLocation {
  emirate: Emirate;
  district: string;
  country: string;
}

export interface ProjectSpecs {
  beds: string;
  baths: string;
  area: string;
  parking?: string;
  matchScore?: string;
  propertyTypeBadge: string;
}

export interface ProjectMedia {
  coverImage: string;
  gallery: string[];
  heroVideo?: string;
  videoPoster?: string;
  pdfBrochure?: string;
  pdfTitle?: string;
  altText: string;
}

export interface ProjectSeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  developerProfile: string;
  tagline: string;
  overview: string;
  location: ProjectLocation;
  nearbyAttractions: string[];
  propertyTypes: string[];
  startingPrice: string;
  priceDisplay: string;
  paymentPlanNote: string;
  handoverYear: string;
  enquiryProcess: string;
  specs: ProjectSpecs;
  architecturalHighlights: string[];
  keyAmenities: string[];
  media: ProjectMedia;
  faqs: FaqItem[];
  seo: ProjectSeo;
}
