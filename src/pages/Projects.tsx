import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import * as publicService from "../services/public.service";
import { DEFAULT_DESCRIPTION, PAGE_SEO, formatCategoryProjectsTitle } from "../utils/siteMeta";
import { Section } from "../components/ui/Section";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import { CategoryFilter } from "../components/projects/CategoryFilter";
import { SubCategoryGrid } from "../components/services/SubCategoryGrid";
import { PageHeroBanner } from "../components/sections/PageHeroBanner";
import { PageHeroScrollStack } from "../components/sections/PageHeroScrollStack";
import { cloudinaryUrl } from "../utils/cloudinaryUrl";
import { PROJECTS_HERO_BANNER_KEY } from "../utils/styleAssetMedia";

const ProjectsList = () => {
  usePageMeta({
    title: PAGE_SEO.projects.title,
    description: PAGE_SEO.projects.description,
  });

  const fetchData = useCallback(async () => {
    const [projects, categories, styleAssets] = await Promise.all([
      publicService.getProjects(),
      publicService.getCategories(),
      publicService.getStyleAssets().catch(() => []),
    ]);
    return { projects, categories, styleAssets };
  }, []);

  const { data, isLoading, error, refetch } = usePublicData(
    "projects-all",
    fetchData
  );

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <>
      <PageHeroScrollStack>
        <PageHeroBanner
          imageKey={PROJECTS_HERO_BANNER_KEY}
          styleAssets={data?.styleAssets}
          eyebrow="Portfolio"
          title="Our Projects"
        />
        <Section tone="white" className="hero-scroll-over-panel">
          <CategoryFilter categories={data?.categories ?? []} />
          <ProjectGrid projects={data?.projects ?? []} />
        </Section>
      </PageHeroScrollStack>
    </>
  );
};

const ProjectsByCategory = ({ categorySlug }: { categorySlug: string }) => {
  const fetchData = useCallback(async () => {
    const [categoryData, projects, categories, styleAssets] = await Promise.all([
      publicService.getCategoryBySlug(categorySlug),
      publicService.getProjectsByCategorySlug(categorySlug),
      publicService.getCategories(),
      publicService.getStyleAssets().catch(() => []),
    ]);
    return { ...categoryData, projects, categories, styleAssets };
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

  const { category: loadedCategory, subCategories, projects, categories, styleAssets } =
    data!;

  return (
    <>
      <PageHeroScrollStack>
        <PageHeroBanner
          imageKey={PROJECTS_HERO_BANNER_KEY}
          styleAssets={styleAssets}
          eyebrow="Portfolio"
          title={loadedCategory.name}
          subtitle={
            loadedCategory.shortDescription || loadedCategory.description || undefined
          }
          imageAlt={loadedCategory.image?.alt || loadedCategory.name}
        />
        <Section tone="white" className="hero-scroll-over-panel">
          <CategoryFilter categories={categories} activeSlug={categorySlug} />
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
      </PageHeroScrollStack>
    </>
  );
};

export const Projects = () => {
  const { categorySlug } = useParams();
  if (categorySlug) return <ProjectsByCategory categorySlug={categorySlug} />;
  return <ProjectsList />;
};
