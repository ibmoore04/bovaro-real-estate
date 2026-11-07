import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { generatePageMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/features/projects/components/ProjectTemplate";

const project = getProjectBySlug("mercedes-benz");

export const metadata: Metadata = generatePageMetadata({
  title:
    project?.seo.metaTitle ||
    "Mercedes-Benz Places Binghatti City | Downtown Dubai Luxury Residences",
  description:
    project?.seo.metaDescription ||
    "Explore Mercedes-Benz Places by Binghatti in Downtown Dubai. 65 storeys of sensual purity design with Burj Khalifa views.",
  path: "/projects/mercedes-benz",
  keywords: project?.seo.keywords,
  openGraphImage: project?.media.coverImage,
});

export default function MercedesBenzPage() {
  if (!project) notFound();

  return <ProjectTemplate project={project} />;
}
