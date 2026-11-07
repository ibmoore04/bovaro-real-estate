import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { generatePageMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/features/projects/components/ProjectTemplate";

const project = getProjectBySlug("oystra");

export const metadata: Metadata = generatePageMetadata({
  title:
    project?.seo.metaTitle ||
    "Oystra by Richmind | Luxury Waterfront on Al Marjan Island RAK",
  description:
    project?.seo.metaDescription ||
    "Oystra by Richmind on Al Marjan Island, Ras Al Khaimah. Beachfront luxury residences near Wynn Resort.",
  path: "/projects/oystra",
  keywords: project?.seo.keywords,
  openGraphImage: project?.media.coverImage,
});

export default function OystraPage() {
  if (!project) notFound();

  return <ProjectTemplate project={project} />;
}
