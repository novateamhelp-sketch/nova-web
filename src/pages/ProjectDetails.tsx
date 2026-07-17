import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import * as publicService from "../services/public.service";
import { formatProjectTitle, SERVICE_AREA_LABEL } from "../utils/siteMeta";
import { cloudinaryUrl } from "../utils/cloudinaryUrl";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { ProjectInfo } from "../components/projects/ProjectInfo";
import { ProjectGallery } from "../components/projects/ProjectGallery";

export const ProjectDetails = () => {
  const { slug } = useParams();

  const fetchProject = useCallback(
    () => publicService.getProjectBySlug(slug!),
    [slug]
  );

  const { data, isLoading, error, refetch } = usePublicData(
    `project-${slug}`,
    fetchProject
  );

  const project = data?.project;

  usePageMeta({
    title: project ? formatProjectTitle(project.name) : undefined,
    description:
      project?.description ||
      `Outdoor and landscape lighting project completed by LumiScape in ${SERVICE_AREA_LABEL}.`,
    ogImage: project
      ? cloudinaryUrl(project.mainImage, { width: 1200 })
      : undefined,
    ogType: "article",
  });

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;
  if (!data) return null;

  const { images } = data;

  return (
    <>
      <Section tone="dark" size="lg">
        <SectionTitle light eyebrow="Project" title={project!.name} />
        <div className="relative mt-4">
          <ProjectInfo project={project!} />
        </div>
      </Section>

      <Section tone="white">
        {project!.description ? (
          <p className="max-w-3xl text-body">{project!.description}</p>
        ) : null}

        <div className={project!.description ? "mt-10" : ""}>
          <h3 className="mb-4 text-lg font-semibold text-forest-dark">
            Project gallery
          </h3>
          <ProjectGallery
            mainImage={project!.mainImage}
            images={images}
            projectName={project!.name}
          />
        </div>
      </Section>
    </>
  );
};
