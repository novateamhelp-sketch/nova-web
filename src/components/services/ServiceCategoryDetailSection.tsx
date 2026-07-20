import { Link } from "react-router-dom";
import type { Category, SubCategory } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { getServiceCategoryAnchorId } from "../../utils/serviceCategoryAnchors";
import { splitDisplayTitle } from "../../utils/titleDisplay";
import { renderSerifTitleText } from "../../utils/serifTitleText";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ServiceSubCategoryShowcase } from "./ServiceSubCategoryShowcase";

interface ServiceCategoryDetailSectionProps {
  category: Category;
  subCategories: SubCategory[];
  index: number;
}

export const ServiceCategoryDetailSection = ({
  category,
  subCategories,
  index,
}: ServiceCategoryDetailSectionProps) => {
  const imageUrl = cloudinaryUrl(category.image, { width: 1600, height: 1200 });
  const imageFirst = index % 2 === 0;
  const split = splitDisplayTitle(category.name);
  const titlePrimary = split.mode === "default" ? split.primary : category.name;
  const titleAccent = split.mode === "default" ? split.accent : null;
  const description =
    category.description?.trim() || category.shortDescription?.trim() || "";

  return (
    <section
      id={getServiceCategoryAnchorId(category.slug)}
      className="scroll-mt-24 border-t border-theme-border-subtle py-14 first:border-t-0 first:pt-0 sm:py-16 lg:scroll-mt-28 lg:py-20"
      aria-labelledby={`${getServiceCategoryAnchorId(category.slug)}-title`}
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <ScrollReveal
          variant={imageFirst ? "slide-left" : "slide-right"}
          className={imageFirst ? "" : "lg:order-2"}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={category.image?.alt || category.name}
              className="theme-card-border aspect-[4/3] w-full object-cover shadow-[var(--theme-shadow-card)]"
              loading="lazy"
            />
          ) : (
            <div
              className="theme-card-border aspect-[4/3] w-full bg-forest/5"
              aria-hidden
            />
          )}
        </ScrollReveal>

        <ScrollReveal
          variant={imageFirst ? "slide-right" : "slide-left"}
          className={`max-w-xl ${imageFirst ? "" : "lg:order-1"}`}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
              Service
            </p>
          </div>

          <h2
            id={`${getServiceCategoryAnchorId(category.slug)}-title`}
            className="font-serif text-3xl font-bold leading-[1.08] tracking-tight text-forest-dark sm:text-4xl lg:text-[2.75rem]"
          >
            {titleAccent ? (
              <>
                <span>{renderSerifTitleText(titlePrimary)}</span>{" "}
                <span className="italic text-theme-accent">
                  {renderSerifTitleText(titleAccent)}
                </span>
              </>
            ) : (
              renderSerifTitleText(category.name)
            )}
          </h2>

          {description ? (
            <p className="mt-6 font-sans text-sm leading-relaxed text-body sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}

          <Link
            to={`/projects/category/${category.slug}`}
            className="mt-7 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-theme-accent transition-all duration-300 hover:gap-3"
          >
            View related projects
            <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
      </div>

      <div className="mt-12 lg:mt-16">
        <ServiceSubCategoryShowcase
          items={subCategories}
          categoryName={category.name}
        />
      </div>
    </section>
  );
};
