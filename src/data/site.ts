/**
 * Bovaro Real Estate — Site & Brand Configuration
 *
 * Centralized brand metadata, contact details, operating regions,
 * and canonical URL configuration for technical SEO.
 */

const DEFAULT_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://bovarorealestate.vercel.app";

const RAW_CONFIGURED_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  DEFAULT_PRODUCTION_URL;

/**
 * Resolves the single canonical production base URL.
 * Uses NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_APP_URL when set, or falls back to
 * the active production deployment URL (https://bovarorealestate.vercel.app).
 */
function resolveCanonicalBaseUrl(rawUrl: string): string {
  const cleaned = rawUrl.trim().replace(/\/+$/, "");
  try {
    const parsed = new URL(cleaned);
    if (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1"
    ) {
      return DEFAULT_PRODUCTION_URL;
    }
    return cleaned;
  } catch {
    return DEFAULT_PRODUCTION_URL;
  }
}

/**
 * Determines whether search engine indexing should be permitted.
 * Allows indexing on production deployments while keeping branch preview
 * deployments (VERCEL_ENV === "preview") out of search indexing.
 */
export function isProductionIndexingEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_INDEXING_ENABLED === "false") {
    return false;
  }
  if (process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true") {
    return true;
  }
  const vercelEnv =
    process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (vercelEnv && vercelEnv !== "production") {
    return false;
  }
  return true;
}

export const siteConfig = {
  name: "Bovaro Real Estate",
  legalName: "Bovaro Real Estate LLC",
  shortName: "Bovaro",
  description:
    "Bovaro Real Estate is a luxury real estate agency and private property consultancy in Dubai, representing flagship developments, branded residences, and waterfront villas across Dubai, Abu Dhabi, and Ras Al Khaimah.",
  url: resolveCanonicalBaseUrl(RAW_CONFIGURED_URL),
  logo: "/branding/logo.png",
  defaultOgImage: "/branding/og-image.png",
  contact: {
    phone: "+971 56 721 2983", // Official Bovaro contact line
    whatsapp: "+971 56 721 2983", // Direct Bovaro WhatsApp consultation line
    email: "enquiries@bovarorealestate.com",
    address: {
      streetAddress: "Downtown Dubai",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
  },
  operatingEmirates: [
    {
      name: "Dubai",
      focus: "Luxury penthouses, branded residences, and lagoon estates",
      keyDistricts: ["Business Bay", "Downtown Dubai", "Dubailand", "Palm Jumeirah"],
    },
    {
      name: "Ras Al Khaimah",
      focus: "Waterfront residences and island investment properties",
      keyDistricts: ["Al Marjan Island"],
    },
    {
      name: "Abu Dhabi",
      focus: "Master-planned luxury residential communities",
      keyDistricts: ["Sobha City", "Saadiyat Island", "Yas Island"],
    },
  ],
  keywords: [
    "Bovaro Real Estate",
    "Best real estate in Dubai",
    "Best real estate company in Dubai",
    "Best real estate agency in Dubai",
    "Real estate agency in Dubai",
    "Luxury real estate in Dubai",
    "Dubai property consultants",
    "Luxury properties in Dubai",
  ],
  socials: {
    instagram: "https://instagram.com/bovarorealestate",
    linkedin: "https://linkedin.com/company/bovaro-real-estate",
  },
};
