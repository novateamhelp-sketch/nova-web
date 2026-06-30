import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import * as publicService from "../services/public.service";
import { DEFAULT_DESCRIPTION, PAGE_SEO, formatCategoryProjectsTitle } from "../utils/siteMeta";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import { CategoryFilter } from "../components/projects/CategoryFilter";
import { SubCategoryGrid } from "../components/services/SubCategoryGrid";
import { ContactCTA } from "../components/sections/ContactCTA";
import { cloudinaryUrl } from "../utils/cloudinaryUrl";

const ProjectsList = () => {
  usePageMeta({
    title: PAGE_SEO.projects.title,
    description: PAGE_SEO.projects.description,
  });

  const fetchData = useCallback(async () => {
    const [projects, categories] = await Promise.all([
      publicService.getProjects(),
      publicService.getCategories(),
    ]);
    return { projects, categories };
  }, []);

  const { data, isLoading, error, refetch } = usePublicData(
    "projects-all",
    fetchData
  );

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <>
      <Section tone="white">
        <SectionTitle
          eyebrow="Portfolio"
          title="Our Projects"
          subtitle="Completed outdoor lighting and landscaping work."
        />
        <CategoryFilter categories={data?.categories ?? []} />
        <ProjectGrid projects={data?.projects ?? []} />
      </Section>
      <Section tone="muted" size="sm">
        <ContactCTA />
      </Section>
    </>
  );
};

const ProjectsByCategory = ({ categorySlug }: { categorySlug: string }) => {
  const fetchData = useCallback(async () => {
    const [categoryData, projects, categories] = await Promise.all([
      publicService.getCategoryBySlug(categorySlug),
      publicService.getProjectsByCategorySlug(categorySlug),
      publicService.getCategories(),
    ]);
    return { ...categoryData, projects, categories };
  }, [categorySlug]);

  const { data, isLoading, error, refetch } = usePublicData(
    `projects-cat-${categorySlug}`,
    fetchData
  );

  const category = data?.category;

  usePageMeta({
    title: category ? formatCategoryProjectsTitle(category.name) : undefined,
    description:
      category?.shortDescription ||
      category?.description ||
      DEFAULT_DESCRIPTION,
    ogImage: category
      ? cloudinaryUrl(category.image, { width: 1200 })
      : undefined,
  });

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  const { category: loadedCategory, subCategories, projects, categories } = data!;
  const bannerUrl = cloudinaryUrl(loadedCategory.image, { width: 1400 });

  return (
    <>
      <Section
        tone="dark"
        size="lg"
        className={bannerUrl ? "relative overflow-hidden" : ""}
      >
        {bannerUrl ? (
          <>
            <img
              src={bannerUrl}
              alt={loadedCategory.image?.alt || loadedCategory.name}
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-forest-dark/75" />
          </>
        ) : null}
        <div className="relative">
          <SectionTitle
            light
            eyebrow="Category"
            title={loadedCategory.name}
            subtitle={loadedCategory.shortDescription || loadedCategory.description}
          />
        </div>
      </Section>

      <Section tone="white">
        <CategoryFilter
          categories={categories}
          activeSlug={categorySlug}
        />
        {subCategories.length > 0 ? (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-forest-dark">
              Related services
            </h3>
            <SubCategoryGrid items={subCategories} />
          </div>
        ) : null}
        <ProjectGrid
          projects={projects}
          emptyMessage={`No projects published under ${loadedCategory.name} yet.`}
        />
      </Section>

      <Section tone="muted" size="sm">
        <ContactCTA />
      </Section>
    </>
  );
};

export const Projects = () => {
  const { categorySlug } = useParams();
  if (categorySlug) return <ProjectsByCategory categorySlug={categorySlug} />;
  return <ProjectsList />;
};
