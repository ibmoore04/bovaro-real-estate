import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { generatePageMetadata } from "@/lib/seo";
import { ProjectTemplate } from "@/features/projects/components/ProjectTemplate";

const project = getProjectBySlug("emaar-oasis");

export const metadata: Metadata = generatePageMetadata({
  title:
    project?.seo.metaTitle ||
    "The Oasis by Emaar | Luxury Waterfront Mansions & Villas Dubailand",
  description:
    project?.seo.metaDescription ||
    "The Oasis by Emaar presents ultra-luxury 4 to 6-bedroom villas and waterfront mansions in Dubailand.",
  path: "/projects/emaar-oasis",
  keywords: project?.seo.keywords,
  openGraphImage: project?.media.coverImage,
});

export default function EmaarOasisPage() {
  if (!project) notFound();

  return <ProjectTemplate project={project} />;
}
