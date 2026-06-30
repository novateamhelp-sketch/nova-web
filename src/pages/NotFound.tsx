import { Section } from "../components/ui/Section";
import { ButtonLink } from "../components/ui/Button";
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_SEO } from "../utils/siteMeta";

export const NotFound = () => {
  usePageMeta({
    title: PAGE_SEO.notFound.title,
    description: PAGE_SEO.notFound.description,
    noIndex: true,
  });

  return (
  <Section tone="white" size="lg" containerClassName="text-center">
    <p className="eyebrow">404</p>
    <h1 className="mt-2">Page not found</h1>
    <p className="mx-auto mt-3 max-w-md text-body">
      The page you are looking for does not exist or has been moved.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <ButtonLink to="/">Back to Home</ButtonLink>
      <ButtonLink to="/contact" variant="outline">
        Contact Us
      </ButtonLink>
    </div>
  </Section>
  );
};
