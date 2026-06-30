import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import type { Project } from "../../types/api.types";
import { formatDate } from "../../utils/formatDate";
import { getRefName, getRefSlug } from "../../utils/populate";

interface ProjectInfoProps {
  project: Project;
}

export const ProjectInfo = ({ project }: ProjectInfoProps) => {
  const categoryName = getRefName(project.category);
  const categorySlug = getRefSlug(project.category);
  const completed = formatDate(project.completedAt);

  return (
    <div className="flex flex-wrap gap-4 text-sm text-sage">
      {categoryName && categorySlug ? (
        <Link
          to={`/projects/category/${categorySlug}`}
          className="inline-flex items-center gap-1.5 font-medium text-gold hover:text-gold-dark"
        >
          {categoryName}
        </Link>
      ) : null}
      {project.location ? (
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={15} strokeWidth={1.75} />
          {project.location}
        </span>
      ) : null}
      {completed ? (
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={15} strokeWidth={1.75} />
          Completed {completed}
        </span>
      ) : null}
    </div>
  );
};
