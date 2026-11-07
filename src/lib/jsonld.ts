/**
 * Bovaro Real Estate — JSON-LD Structured Data Generators
 *
 * Provides Schema.org compliant structured data for search engine rich snippets.
 * Uses verified facts only (no fabricated ratings, reviews, awards, or unverified addresses).
 */

import { siteConfig } from "@/data/site";
import { Project } from "@/types/project";
import { BreadcrumbItem, FaqItem } from "@/types/seo";
import { getCanonicalUrl } from "./seo";

/**
 * Generates Schema.org RealEstateAgent & Organization schema.
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "Organization"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.defaultOgImage}`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    areaServed: siteConfig.operatingEmirates.map((emirate) => ({
      "@type": "AdministrativeArea",
      name: `${emirate.name}, United Arab Emirates`,
    })),
    knowsAbout: [
      "Luxury real estate in Dubai",
      "Branded residences in Dubai",
      "Waterfront properties in Ras Al Khaimah",
      "Properties on Al Marjan Island",
      "Luxury properties in Abu Dhabi",
    ],
    sameAs: Object.values(siteConfig.socials),
  };
}

/**
 * Generates Schema.org WebSite schema.
 */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-AE",
  };
}

/**
 * Generates Schema.org BreadcrumbList schema.
 */
export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.url),
    })),
  };
}

/**
 * Generates Schema.org CollectionPage & ItemList schema for the Projects Index route.
 */
export function getProjectsCollectionJsonLd(projectList: Project[]) {
  const collectionUrl = getCanonicalUrl("/projects");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${collectionUrl}/#collection`,
    name: "Flagship Luxury Real Estate Developments in Dubai, Abu Dhabi & Ras Al Khaimah",
    description:
      "Curated portfolio of ultra-luxury branded residences, lagoon mansions, and beachfront developments across Dubai, Al Marjan Island (Ras Al Khaimah), and Abu Dhabi.",
    url: collectionUrl,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projectList.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: getCanonicalUrl(`/projects/${project.slug}`),
      })),
    },
  };
}

/**
 * Generates Schema.org RealEstateListing / Residence / Place schema for a development.
 * Includes only verified specifications and starting prices.
 */
export function getProjectJsonLd(project: Project) {
  const projectUrl = getCanonicalUrl(`/projects/${project.slug}`);
  const numericStartingPrice = Number(
    project.startingPrice.replace(/[^0-9]/g, "")
  );

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${projectUrl}/#listing`,
    name: project.name,
    description: project.overview,
    url: projectUrl,
    image: project.media.gallery.map(
      (img) => `${siteConfig.url}${img.startsWith("/") ? img : `/${img}`}`
    ),
    offeredBy: {
      "@id": `${siteConfig.url}/#organization`,
    },
    ...(numericStartingPrice > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: numericStartingPrice,
            url: projectUrl,
            seller: {
              "@id": `${siteConfig.url}/#organization`,
            },
          },
        }
      : {}),
    itemOffered: {
      "@type": ["Residence", "Place"],
      name: project.name,
      description: project.overview,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location.district,
        addressRegion: project.location.emirate,
        addressCountry: "AE",
      },
      amenityFeature: project.keyAmenities.map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        name: amenity,
        value: true,
      })),
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Developer",
          value: project.developer,
        },
        {
          "@type": "PropertyValue",
          name: "Estimated Handover",
          value: project.handoverYear,
        },
        {
          "@type": "PropertyValue",
          name: "Bedroom Configurations",
          value: project.specs.beds,
        },
        {
          "@type": "PropertyValue",
          name: "Residence Area Range",
          value: project.specs.area,
        },
        {
          "@type": "PropertyValue",
          name: "Available Property Categories",
          value: project.propertyTypes.join("; "),
        },
      ],
    },
  };
}

/**
 * Generates Schema.org FAQPage schema.
 */
export function getFaqJsonLd(faqs: FaqItem[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
