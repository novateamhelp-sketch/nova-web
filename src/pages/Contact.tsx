import { useCallback } from "react";
import { usePublicData } from "../hooks/usePublicData";
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_SEO } from "../utils/siteMeta";
import * as publicService from "../services/public.service";
import { Container } from "../components/ui/Container";
import { PageLoading } from "../components/ui/Loading";
import { PageError } from "../components/ui/ErrorMessage";
import { SectionTitle } from "../components/ui/SectionTitle";
import { ContactInfo } from "../components/sections/ContactInfo";
import { ContactForm } from "../components/sections/ContactForm";

const PAGE_BG =
  "linear-gradient(180deg, #ffffff 0%, #fafafa 28%, #f3f3f3 52%, #ececec 78%, #e2e2e2 100%)";

export const Contact = () => {
  usePageMeta({
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
  });

  const fetchSettings = useCallback(async () => {
    const home = await publicService.getHome();
    return home.settings;
  }, []);

  const { data: settings, isLoading, error, refetch } = usePublicData(
    "contact-settings",
    fetchSettings
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20" style={{ background: PAGE_BG }}>
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Contact"
          title="Request a free consultation"
          subtitle="Tell us about your property and we'll get back to you shortly."
          className="mb-10 sm:mb-12"
        />

        {isLoading ? (
          <PageLoading label="Loading contact info..." />
        ) : error ? (
          <PageError message={error} onRetry={refetch} />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <ContactInfo settings={settings} />
            <ContactForm />
          </div>
        )}
      </Container>
    </section>
  );
};
