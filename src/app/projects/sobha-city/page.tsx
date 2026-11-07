import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { generatePageMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/features/projects/components/ProjectTemplate";

const project = getProjectBySlug("sobha-city");

export const metadata: Metadata = generatePageMetadata({
  title:
    project?.seo.metaTitle ||
    "Sobha City Abu Dhabi | Signature Villas & Luxury Apartments",
  description:
    project?.seo.metaDescription ||
    "Sobha City Abu Dhabi by Sobha Realty. Handcrafted luxury villas and apartments in a lush master-planned community.",
  path: "/projects/sobha-city",
  keywords: project?.seo.keywords,
  openGraphImage: project?.media.coverImage,
});

export default function SobhaCityPage() {
  if (!project) notFound();

  return <ProjectTemplate project={project} />;
}
