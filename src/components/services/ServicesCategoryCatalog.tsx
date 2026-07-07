import type { Category, SubCategory } from "../../types/api.types";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ServiceCategoryDetailSection } from "./ServiceCategoryDetailSection";

interface ServicesCategoryCatalogProps {
  categories: Category[];
  subCategoriesBySlug: Record<string, SubCategory[]>;
}

export const ServicesCategoryCatalog = ({
  categories,
  subCategoriesBySlug,
}: ServicesCategoryCatalogProps) => {
  const activeCategories = [...categories]
    .filter((category) => category.isActive !== false)
    .sort((a, b) => a.order - b.order);

  if (activeCategories.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-theme-warm py-14 text-forest-dark sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
        }}
        aria-hidden
      />

      <Container className="relative">
        <ScrollReveal variant="fade-up">
          <SectionTitle
            eyebrow="Explore"
            title="Every service in detail"
            subtitle="Browse each category, its full description, and the specialized options we offer."
            className="mb-10 sm:mb-12"
          />
        </ScrollReveal>

        <div>
          {activeCategories.map((category, index) => (
            <ServiceCategoryDetailSection
              key={category._id}
              category={category}
              subCategories={subCategoriesBySlug[category.slug] ?? []}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
