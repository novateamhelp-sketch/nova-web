import type { SubCategory } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { ScrollReveal } from "../ui/ScrollReveal";

interface ServiceSubCategoryShowcaseProps {
  items: SubCategory[];
  categoryName: string;
}

export const ServiceSubCategoryShowcase = ({
  items,
  categoryName,
}: ServiceSubCategoryShowcaseProps) => {
  const activeItems = items
    .filter((item) => item.isActive !== false)
    .sort((a, b) => a.order - b.order);

  if (activeItems.length === 0) return null;

  return (
    <div className="service-subcategory-showcase">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
          Subcategories
        </p>
      </div>

      <ul className="space-y-8 lg:space-y-10">
        {activeItems.map((item, index) => {
          const imageUrl = cloudinaryUrl(item.image, { width: 900, height: 700 });
          const imageFirst = index % 2 === 0;

          return (
            <li key={item._id}>
              <ScrollReveal variant="fade-up" staggerIndex={index % 4}>
                <article className="grid items-center gap-5 lg:grid-cols-2 lg:gap-8">
                  <div
                    className={`overflow-hidden ${imageFirst ? "" : "lg:order-2"}`}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.image?.alt || item.title}
                        className="theme-card-border aspect-[4/3] w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="theme-card-border aspect-[4/3] w-full bg-forest/5"
                        aria-hidden
                      />
                    )}
                  </div>

                  <div
                    className={`theme-card-border bg-theme-card p-6 sm:p-8 ${
                      imageFirst ? "" : "lg:order-1"
                    }`}
                  >
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-theme-kicker">
                      {categoryName}
                    </p>
                    <h4 className="mt-3 font-serif text-2xl font-bold leading-tight text-forest-dark">
                      {item.title}
                    </h4>
                    {item.description ? (
                      <p className="mt-4 font-sans text-sm leading-relaxed text-body sm:text-base sm:leading-7">
                        {item.description}
                      </p>
                    ) : null}
                    <div
                      className="mt-6 h-px w-10 bg-theme-accent transition-all duration-500"
                      aria-hidden
                    />
                  </div>
                </article>
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
