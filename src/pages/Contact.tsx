import { useCallback } from "react";
import { usePublicData } from "../hooks/usePublicData";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_SEO } from "../utils/siteMeta";
import * as publicService from "../services/public.service";
import { Container } from "../components/ui/Container";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { ContactInfo } from "../components/sections/ContactInfo";
import { ContactForm } from "../components/sections/ContactForm";
import { PageHeroBanner } from "../components/sections/PageHeroBanner";
import { PageHeroScrollStack } from "../components/sections/PageHeroScrollStack";
import { CONTACT_HERO_BANNER_KEY } from "../utils/styleAssetMedia";

export const Contact = () => {
  usePageMeta({
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
  });

  const {
    data: settings,
    isLoading: settingsLoading,
    error,
    refetch,
  } = useSiteSettings();

  const fetchStyleAssets = useCallback(
    () => publicService.getStyleAssets().catch(() => []),
    []
  );
  const { data: styleAssets, isLoading: assetsLoading } = usePublicData(
    "style-assets",
    fetchStyleAssets
  );

  const isLoading = settingsLoading || assetsLoading;

  return (
    <PageHeroScrollStack>
      <PageHeroBanner
        imageKey={CONTACT_HERO_BANNER_KEY}
        styleAssets={styleAssets}
        eyebrow="Contact"
        title="Request a free consultation"
        subtitle="Tell us about your property and we'll get back to you shortly."
      />

      <section
        id="contact-page"
        className="hero-scroll-over-panel scroll-mt-14 w-full overflow-x-hidden bg-theme-warm py-12 text-forest-dark sm:py-16 lg:scroll-mt-16 lg:py-20"
      >
        <Container>
          {isLoading ? (
            <PageLoading label="Loading contact info..." />
          ) : error ? (
            <PageError message={error} onRetry={refetch} />
          ) : (
            <div className="grid min-w-0 items-start gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-12">
              <ContactInfo settings={settings} />
              <ContactForm />
            </div>
          )}
        </Container>
      </section>
    </PageHeroScrollStack>
  );
};
