/**
 * Bovaro Real Estate — Site & Brand Configuration
 *
 * Centralized brand metadata, contact details, operating regions,
 * and canonical URL configuration for technical SEO.
 */

const RAW_CONFIGURED_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://bovarorealestate.com";

/**
 * Resolves the single canonical production base URL.
 * Ensures staging, localhost, or Vercel preview URLs (*.vercel.app) are never
 * exposed as canonical URLs in metadata or sitemaps.
 */
function resolveCanonicalBaseUrl(rawUrl: string): string {
  const cleaned = rawUrl.trim().replace(/\/+$/, "");
  try {
    const parsed = new URL(cleaned);
    if (
      parsed.hostname.endsWith(".vercel.app") ||
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1"
    ) {
      return (
        process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN?.replace(/\/+$/, "") ||
        "https://bovarorealestate.com"
      );
    }
    return cleaned;
  } catch {
    return "https://bovarorealestate.com";
  }
}

/**
 * Determines whether search engine indexing should be permitted.
 * Automatically blocks indexing on Vercel preview/development deployments
 * or when NEXT_PUBLIC_INDEXING_ENABLED is explicitly set to "false".
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
  if (RAW_CONFIGURED_URL.includes(".vercel.app")) {
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
  defaultOgImage: "/branding/logo.png",
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
