/**
 * Bovaro Real Estate — SEO Utilities
 *
 * Reusable metadata generator compliant with Next.js App Router Metadata API.
 * Ensures consistent canonical URLs, Open Graph, Twitter cards, and indexing directives.
 */

import type { Metadata } from "next";
import { siteConfig, isProductionIndexingEnabled } from "@/data/site";
import { PageSeoProps } from "@/types/seo";

/**
 * Normalizes a relative path to an absolute canonical URL.
 */
export function getCanonicalUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const base = siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;

  return cleanPath === "/" ? base : `${base}${cleanPath}`;
}

/**
 * Builds a standardized Next.js Metadata object with distinct page-level
 * keywords, canonical URLs, social sharing metadata, and preview-safe indexing rules.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  keywords,
  openGraphImage,
  noIndex = false,
}: PageSeoProps): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = openGraphImage
    ? openGraphImage.startsWith("http")
      ? openGraphImage
      : `${siteConfig.url}${openGraphImage.startsWith("/") ? openGraphImage : `/${openGraphImage}`}`
    : `${siteConfig.url}${siteConfig.defaultOgImage}`;

  // Use page-specific keywords without polluting every route with all global keywords
  const pageKeywords =
    keywords && keywords.length > 0
      ? Array.from(new Set(keywords))
      : siteConfig.keywords;

  const shouldIndex = !noIndex && isProductionIndexingEnabled();
  const includesBrandName = title
    .toLowerCase()
    .includes(siteConfig.name.toLowerCase());
  const socialTitle = includesBrandName
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: includesBrandName ? { absolute: title } : title,
    description,
    keywords: pageKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
