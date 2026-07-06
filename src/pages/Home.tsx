import { useCallback } from "react";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import { useLocalBusinessSchema } from "../hooks/useLocalBusinessSchema";
import * as publicService from "../services/public.service";
import { DEFAULT_DESCRIPTION } from "../utils/siteMeta";
import { resolveInteractiveShowroomImage } from "../utils/interactiveLightingMedia";
import {
  CONTACT_SECTION_BG_KEY,
  DAY_NIGHT_SECTION_BANNER_KEY,
  ILLUMINATE_INTRO_IMAGE_KEY,
  resolveStyleAssetImageByKey,
} from "../utils/styleAssetMedia";
import { sortGalleryItems } from "../utils/galleryDisplay";
import { Container } from "../components/ui/Container";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { Hero } from "../components/sections/Hero";
import { IlluminateIntro } from "../components/sections/IlluminateIntro";
import { DayNightTransformSection } from "../components/sections/DayNightTransformSection";
import { ServicesPreview } from "../components/sections/ServicesPreview";
import { NewsSection } from "../components/sections/NewsSection";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { IlluminateMissionBanner } from "../components/sections/IlluminateMissionBanner";
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

  const gallery = sortGalleryItems(
    (data?.gallery ?? [])
      .filter(
        (item) =>
          item.isActive !== false &&
          !item.isHomeDayNight &&
          item.dayImage?.url &&
          item.nightImage?.url
      ),
    data?.categories ?? []
  );
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
  const illuminateIntroImage = resolveStyleAssetImageByKey(
    data?.styleAssets,
    ILLUMINATE_INTRO_IMAGE_KEY,
    { width: 1600, height: 1040 }
  );
  const illuminateIntroAsset = data?.styleAssets?.find(
    (asset) =>
      asset.isActive !== false &&
      asset.key === ILLUMINATE_INTRO_IMAGE_KEY &&
      asset.images?.[0]
  );
  const illuminateIntroImageAlt =
    illuminateIntroAsset?.images[0]?.alt ||
    "Luxury home with professional outdoor lighting";
  const contactBackgroundImage = resolveStyleAssetImageByKey(
    data?.styleAssets,
    CONTACT_SECTION_BG_KEY,
    { width: 1920, height: 1080 }
  );
  const newsItems = (data?.news ?? [])
    .filter((item) => item.isActive !== false)
    .sort((a, b) => a.order - b.order);
  const hasDayNight = Boolean(dayNightSlider);

  return (
    <>
      {/* 1–2. Hero + Illuminate (pinned video → light panel) */}
      <div className="hero-video-scroll-stack">
        <Hero
          sliders={data?.sliders}
          settings={data?.settings}
          heroVideo={data?.heroVideo}
          pinOnScroll
        />
        <IlluminateIntro
          scrollOver
          imageUrl={illuminateIntroImage}
          imageAlt={illuminateIntroImageAlt}
        />
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

        {/* 5. Mission banner — split cream / white after Day & Night */}
        <IlluminateMissionBanner />

        {/* 6. Process — white lift */}
        <ProcessTimeline riseAfterDark={false} />

        {/* 6. News — dark grid block */}
        <NewsSection items={newsItems} variant="dark-grid" />

        {/* 7. Gallery — cream portfolio surface */}
        {gallery.length > 0 ? (
          <section className="home-flow-cream relative overflow-hidden py-16 text-forest-dark sm:py-20 lg:py-28">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
              }}
              aria-hidden
            />
            <Container className="relative z-10">
              <GalleryPreview items={gallery} categories={data?.categories} />
            </Container>
          </section>
        ) : null}

        {/* 8. Interactive showroom — light surface */}
        <InteractiveLightingSection
          showroomImageUrl={interactiveShowroomImage}
          surface="plain"
        />

        {/* 9. Contact — estimate section with background + form */}
        <ContactCTA
          settings={data?.settings}
          backgroundImageUrl={contactBackgroundImage}
        />
      </div>
    </>
  );
};
