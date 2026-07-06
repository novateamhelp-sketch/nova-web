import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import { useServiceAreaSchema } from "../hooks/useServiceAreaSchema";
import * as publicService from "../services/public.service";
import {
  SERVICE_AREA_LONG,
  serviceAreaCountyIntro,
  serviceAreaCountySeo,
  serviceAreaIndexSeo,
  serviceAreaStateSeo,
} from "../utils/siteMeta";
import { findCountyBySlug } from "../utils/slugify";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { ServiceAreaBreadcrumb } from "../components/serviceAreas/ServiceAreaBreadcrumb";
import { ServiceAreaCard } from "../components/serviceAreas/ServiceAreaCard";
import { CountyList } from "../components/serviceAreas/CountyList";
import { ServiceAreaMap } from "../components/serviceAreas/ServiceAreaMap";
import { ServiceAreaWhyChooseUs } from "../components/serviceAreas/ServiceAreaWhyChooseUs";
import { ServiceAreaStateIntro } from "../components/serviceAreas/ServiceAreaStateIntro";
import { ServiceAreaCountiesSection } from "../components/serviceAreas/ServiceAreaCountiesSection";
import type { ServiceArea as ServiceAreaType } from "../types/api.types";

const ServiceAreaList = () => {
  usePageMeta({
    title: serviceAreaIndexSeo.title,
    description: serviceAreaIndexSeo.description,
    keywords: serviceAreaIndexSeo.keywords,
  });

  const fetchAreas = useCallback(() => publicService.getServiceAreas(), []);
  const { data, isLoading, error, refetch } = usePublicData(
    "service-areas",
    fetchAreas
  );

  if (isLoading) return <PageLoading label="Loading service areas..." />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  const areas = data ?? [];

  return (
    <>
      <Section tone="dark" size="lg">
        <SectionTitle
          light
          eyebrow="Coverage"
          title="Service Areas"
          subtitle={`Outdoor lighting across ${SERVICE_AREA_LONG} and beyond.`}
        />
      </Section>

      <Section tone="white">
        {areas.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <ServiceAreaCard key={area._id} area={area} />
            ))}
          </div>
        ) : (
          <p className="text-body">
            Service area details are being updated. Please{" "}
            <Link to="/contact" className="font-semibold text-gold hover:text-gold-dark">
              contact us
            </Link>{" "}
            to confirm coverage in your area.
          </p>
        )}
      </Section>
    </>
  );
};

const ServiceAreaStateView = ({ slug }: { slug: string }) => {
  const fetchArea = useCallback(
    () => publicService.getServiceAreaBySlug(slug),
    [slug]
  );
  const { data: area, isLoading, error, refetch } = usePublicData(
    `service-area-${slug}`,
    fetchArea
  );

  const seo = area ? serviceAreaStateSeo(area) : null;

  usePageMeta({
    title: seo?.title,
    description: seo?.description ?? serviceAreaIndexSeo.description,
    keywords: seo?.keywords,
  });

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;
  if (!area) return null;

  return <ServiceAreaStateContent area={area} />;
};

const ServiceAreaCountyView = ({
  slug,
  countySlug,
}: {
  slug: string;
  countySlug: string;
}) => {
  const fetchArea = useCallback(
    () => publicService.getServiceAreaBySlug(slug),
    [slug]
  );
  const { data: area, isLoading, error, refetch } = usePublicData(
    `service-area-${slug}`,
    fetchArea
  );

  const county = area ? findCountyBySlug(area.counties, countySlug) : undefined;
  const seo = area && county ? serviceAreaCountySeo(county, area) : null;

  usePageMeta({
    title: seo?.title,
    description: seo?.description ?? serviceAreaIndexSeo.description,
    keywords: seo?.keywords,
  });

  if (isLoading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={refetch} />;
  if (!area) return null;

  if (!county) {
    return (
      <PageError
        message={`County not found in ${area.stateName}.`}
        onRetry={refetch}
      />
    );
  }

  return (
    <ServiceAreaCountyContent area={area} county={county} countySlug={countySlug} />
  );
};

const ServiceAreaStateContent = ({ area }: { area: ServiceAreaType }) => {
  useServiceAreaSchema({ area });

  return (
    <>
      <ServiceAreaStateIntro area={area} />

      <ServiceAreaWhyChooseUs />

      <ServiceAreaCountiesSection area={area} />
    </>
  );
};

const ServiceAreaCountyContent = ({
  area,
  county,
  countySlug,
}: {
  area: ServiceAreaType;
  county: string;
  countySlug: string;
}) => {
  useServiceAreaSchema({ area, county });

  return (
    <>
      <Section tone="dark" size="lg">
        <ServiceAreaBreadcrumb
          items={[
            { label: "Service Areas", to: "/service-areas" },
            { label: area.stateName, to: `/service-areas/${area.slug}` },
            { label: county },
          ]}
        />
        <SectionTitle
          light
          eyebrow={`${area.stateName} County`}
          title={`Outdoor Lighting in ${county}`}
          subtitle={serviceAreaCountyIntro(county, area)}
        />
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <p className="text-body">
              Looking for a trusted outdoor lighting company in {county},{" "}
              {area.stateName}? Nova Outdoor Lighting designs and installs
              landscape lighting, path lighting, and architectural lighting for
              residential properties throughout the area.
            </p>
            <CountyList area={area} activeCountySlug={countySlug} />
          </div>
          <ServiceAreaMap
            mapEmbedUrl={area.mapEmbedUrl}
            title={`${county}, ${area.stateName}`}
          />
        </div>
      </Section>
    </>
  );
};

export const ServiceArea = () => {
  const { slug, countySlug } = useParams();

  if (!slug) return <ServiceAreaList />;
  if (countySlug) {
    return <ServiceAreaCountyView slug={slug} countySlug={countySlug} />;
  }
  return <ServiceAreaStateView slug={slug} />;
};
