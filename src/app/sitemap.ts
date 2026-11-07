import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getCanonicalUrl } from "@/lib/seo";

const SITEMAP_LAST_MODIFIED = "2026-11-06";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static core routes using canonical URL generator for 100% consistency
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl("/"),
      lastModified: SITEMAP_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: getCanonicalUrl("/projects"),
      lastModified: SITEMAP_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getCanonicalUrl("/about"),
      lastModified: SITEMAP_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getCanonicalUrl("/contact"),
      lastModified: SITEMAP_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Canonical flagship project routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: getCanonicalUrl(`/projects/${project.slug}`),
    lastModified: SITEMAP_LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}
