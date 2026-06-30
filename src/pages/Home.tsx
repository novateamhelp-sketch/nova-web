import { useCallback } from "react";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import { useLocalBusinessSchema } from "../hooks/useLocalBusinessSchema";
import * as publicService from "../services/public.service";
import { DEFAULT_DESCRIPTION } from "../utils/siteMeta";
import { resolveInteractiveShowroomImage } from "../utils/interactiveLightingMedia";
import {
  DAY_NIGHT_SECTION_BANNER_KEY,
  resolveStyleAssetImageByKey,
} from "../utils/styleAssetMedia";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { Section } from "../components/ui/Section";
import { Hero } from "../components/sections/Hero";
import { IlluminateIntro } from "../components/sections/IlluminateIntro";
import { DayNightTransformSection } from "../components/sections/DayNightTransformSection";
import { ServicesPreview } from "../components/sections/ServicesPreview";
import { NewsSection } from "../components/sections/NewsSection";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { GalleryPreview } from "../components/sections/GalleryPreview";
import { InteractiveLightingSection } from "../components/sections/InteractiveLightingSection";
import { ContactCTA } from "../components/sections/ContactCTA";

export const Home = () => {
  const fetchHome = useCallback(async () => {
    const [home, styleAssets] = await Promise.all([
      publicService.getHome(),
      publicService.getStyleAssets().catch(() => []),
    ]);
    return { ...home, styleAssets };
  }, []);
  const { data, isLoading, error, refetch } = usePublicData("home", fetchHome);

  usePageMeta({
    fullTitle: data?.settings?.seoDefaults?.title,
    description: data?.settings?.seoDefaults?.description ?? DEFAULT_DESCRIPTION,
    ogImage: data?.settings?.seoDefaults?.ogImage,
  });

  useLocalBusinessSchema(data?.settings);

  if (isLoading) return <PageLoading label="Loading home..." />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  const gallery = (data?.gallery ?? [])
    .filter(
      (item) =>
        item.isActive !== false &&
        !item.isHomeDayNight &&
        item.dayImage?.url &&
        item.nightImage?.url
    )
    .sort((a, b) => a.order - b.order);
  const dayNightSlider = (data?.gallery ?? []).find(
    (item) =>
      item.isActive !== false &&
      item.isHomeDayNight &&
      item.dayImage &&
      item.nightImage
  );
  const interactiveShowroomImage = resolveInteractiveShowroomImage(
    data?.styleAssets
  );
  const dayNightBackgroundImage = resolveStyleAssetImageByKey(
    data?.styleAssets,
    DAY_NIGHT_SECTION_BANNER_KEY
  );
  const newsItems = data?.news?.slice(0, 3) ?? [];
  const hasDayNight = Boolean(dayNightSlider);

  return (
    <>
      {/* 1–2. Hero + Illuminate (pinned video → light panel) */}
      <div className="hero-video-scroll-stack">
        <Hero
          sliders={data?.sliders}
          settings={data?.settings}
          pinOnScroll
        />
        <IlluminateIntro scrollOver />
      </div>

      <div id="home-content" className="home-page-flow">
        {/* 3. Services — warm light */}
        <ServicesPreview />

        {/* 4. Day & Night — dark parallax proof */}
        {hasDayNight ? (
          <DayNightTransformSection
            item={dayNightSlider!}
            backgroundImageUrl={dayNightBackgroundImage}
          />
        ) : null}

        {/* 5. Process — white lift after dark */}
        <ProcessTimeline riseAfterDark={hasDayNight} />

        {/* 6. Interactive showroom — dark experience */}
        <InteractiveLightingSection
          showroomImageUrl={interactiveShowroomImage}
          forceDark
        />

        {/* 7. Gallery — muted portfolio */}
        {gallery.length > 0 ? (
          <Section tone="white" size="lg">
            <GalleryPreview items={gallery} categories={data?.categories} />
          </Section>
        ) : null}

        {/* 8. News — muted (secondary) */}
        <NewsSection items={newsItems} />

        {/* 9. Contact — dark closing */}
        <Section tone="dark" size="lg">
          <ContactCTA settings={data?.settings} embedded />
        </Section>
      </div>
    </>
  );
};
