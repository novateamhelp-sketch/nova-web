import { Link } from "react-router-dom";
import type { Project } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { getRefName } from "../../utils/populate";
import { Card } from "../ui/Card";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageUrl = cloudinaryUrl(project.mainImage, { width: 1000 });
  const categoryName = getRefName(project.category);

  return (
    <Link to={`/projects/${project.slug}`}>
      <Card hover className="h-full overflow-hidden p-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.mainImage?.alt || project.name}
            className="aspect-video w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="aspect-video bg-forest/5" />
        )}
        <div className="p-5">
          {categoryName ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {categoryName}
            </p>
          ) : null}
          <h3 className="mt-1 text-forest-dark">{project.name}</h3>
          {project.location ? (
            <p className="mt-1 text-sm text-sage">{project.location}</p>
          ) : null}
        </div>
      </Card>
    </Link>
  );
};
