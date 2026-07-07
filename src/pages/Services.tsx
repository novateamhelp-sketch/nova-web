import { useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import * as publicService from "../services/public.service";
import { DEFAULT_DESCRIPTION, PAGE_SEO, formatCategoryServiceTitle } from "../utils/siteMeta";
import { cloudinaryUrl } from "../utils/cloudinaryUrl";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { ServiceGrid } from "../components/services/ServiceGrid";
import { ServicesCategoryCatalog } from "../components/services/ServicesCategoryCatalog";
import { ServiceDetailBlock } from "../components/services/ServiceDetailBlock";
import { SubCategoryGrid } from "../components/services/SubCategoryGrid";
import { PageHeroBanner } from "../components/sections/PageHeroBanner";
import { PageHeroScrollStack } from "../components/sections/PageHeroScrollStack";
import { SERVICES_HERO_BANNER_KEY } from "../utils/styleAssetMedia";

const ServicesList = () => {
  const { hash } = useLocation();

  usePageMeta({
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
  });

  const fetchCategories = useCallback(async () => {
    const [categories, styleAssets] = await Promise.all([
      publicService.getCategories(),
      publicService.getStyleAssets().catch(() => []),
    ]);

    const subCategoryEntries = await Promise.all(
      categories.map(async (category) => {
        try {
          const { subCategories } = await publicService.getCategoryBySlug(category.slug);
          return [category.slug, subCategories] as const;
        } catch {
          return [category.slug, []] as const;
        }
      })
    );

    return {
      categories,
      styleAssets,
      subCategoriesBySlug: Object.fromEntries(subCategoryEntries),
    };
  }, []);
  const { data, isLoading, error, refetch } = usePublicData(
    "categories",
    fetchCategories
  );

  useEffect(() => {
    if (!hash || isLoading) return;

    const targetId = hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [hash, isLoading, data]);

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <>
      <PageHeroScrollStack>
        <PageHeroBanner
          imageKey={SERVICES_HERO_BANNER_KEY}
          styleAssets={data?.styleAssets}
          eyebrow="Services"
          title="Our Services"
          subtitle="Outdoor lighting, landscaping, and hardscaping services."
        />
        <Section tone="white" className="hero-scroll-over-panel">
          <ServiceGrid categories={data?.categories ?? []} />
        </Section>
      </PageHeroScrollStack>

      <ServicesCategoryCatalog
        categories={data?.categories ?? []}
        subCategoriesBySlug={data?.subCategoriesBySlug ?? {}}
      />
    </>
  );
};

const ServiceDetail = ({ slug }: { slug: string }) => {
  const fetchCategory = useCallback(
    () => publicService.getCategoryBySlug(slug),
    [slug]
  );
  const { data, isLoading, error, refetch } = usePublicData(
    `category-${slug}`,
    fetchCategory
  );

  const category = data?.category;

  usePageMeta({
    title: category ? formatCategoryServiceTitle(category.name) : undefined,
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
  if (!data) return null;

  const { subCategories } = data;

  return (
    <>
      <Section tone="dark" size="lg">
        <SectionTitle
          light
          eyebrow="Service"
          title={category!.name}
          subtitle={category!.shortDescription}
        />
      </Section>
      <Section tone="white">
        <ServiceDetailBlock category={category!} />
        <SubCategoryGrid items={subCategories} />
      </Section>
    </>
  );
};

export const Services = () => {
  const { categorySlug } = useParams();
  if (categorySlug) return <ServiceDetail slug={categorySlug} />;
  return <ServicesList />;
};
