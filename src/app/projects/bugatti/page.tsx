import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { generatePageMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/features/projects/components/ProjectTemplate";

const project = getProjectBySlug("bugatti");

export const metadata: Metadata = generatePageMetadata({
  title: project?.seo.metaTitle || "Bugatti Residences by Binghatti | Business Bay Dubai",
  description:
    project?.seo.metaDescription ||
    "Discover Bugatti Residences by Binghatti in Business Bay Dubai. Ultra-luxury sky mansions with private car lifts.",
  path: "/projects/bugatti",
  keywords: project?.seo.keywords,
  openGraphImage: project?.media.coverImage,
});

export default function BugattiPage() {
  if (!project) notFound();

  return <ProjectTemplate project={project} />;
}
