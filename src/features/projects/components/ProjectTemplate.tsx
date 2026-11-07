import { Project } from "@/types/project";
import { ProjectDetailView } from "./ProjectDetailView";

interface ProjectTemplateProps {
  project: Project;
}

export function ProjectTemplate({ project }: ProjectTemplateProps) {
  return <ProjectDetailView project={project} />;
}
