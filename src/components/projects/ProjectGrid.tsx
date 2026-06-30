import type { Project } from "../../types/api.types";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
}

export const ProjectGrid = ({
  projects,
  emptyMessage = "No projects published yet.",
}: ProjectGridProps) => {
  if (projects.length === 0) {
    return <p className="mt-8 text-body">{emptyMessage}</p>;
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};
