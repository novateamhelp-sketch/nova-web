import { useCallback } from "react";
import { useParams } from "react-router-dom";
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
import { ServiceDetailBlock } from "../components/services/ServiceDetailBlock";
import { SubCategoryGrid } from "../components/services/SubCategoryGrid";
import { ContactCTA } from "../components/sections/ContactCTA";

const ServicesList = () => {
  usePageMeta({
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
  });

  const fetchCategories = useCallback(() => publicService.getCategories(), []);
  const { data, isLoading, error, refetch } = usePublicData(
    "categories",
    fetchCategories
  );

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <>
      <Section tone="white">
        <SectionTitle
          eyebrow="Services"
          title="Our Services"
          subtitle="Outdoor lighting, landscaping, and hardscaping services."
        />
        <ServiceGrid categories={data ?? []} />
      </Section>
      <Section tone="muted" size="sm">
        <ContactCTA />
      </Section>
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
      <Section tone="muted" size="sm">
        <ContactCTA />
      </Section>
    </>
  );
};

export const Services = () => {
  const { categorySlug } = useParams();
  if (categorySlug) return <ServiceDetail slug={categorySlug} />;
  return <ServicesList />;
};
