import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { splitDisplayTitle } from "../../utils/titleDisplay";

interface CategoryCarouselCardProps {
  category: Category;
  variant?: "featured" | "compact";
  badge?: string;
}

export const CategoryCarouselCard = ({
  category,
  variant = "compact",
  badge,
}: CategoryCarouselCardProps) => {
  const isFeatured = variant === "featured";
  const imageUrl = cloudinaryUrl(category.image, { width: 900, height: 1100 });
  const blurb =
    category.shortDescription?.trim() ||
    category.description?.trim() ||
    "Explore our professional services tailored to your property.";
  const label =
    badge ??
    (category.isFeatured ? "Featured" : category.name.split(/\s+/)[0] ?? "Service");
  const split = splitDisplayTitle(category.name);
  const titlePrimary = split.mode === "default" ? split.primary : category.name;
  const titleAccent = split.mode === "default" ? split.accent : null;

  return (
    <Link
      to={`/services/${category.slug}`}
      className={`services-signature-card theme-card-border group flex h-full flex-col overflow-hidden bg-theme-card ${
        isFeatured ? "services-signature-card--featured" : "services-signature-card--compact"
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-forest/5 ${
          isFeatured
            ? "services-signature-card__image--featured"
            : "aspect-[4/3] shrink-0"
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.image?.alt || category.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : null}
        <span className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-forest-dark">
          {label}
        </span>
      </div>

      <div
        className={`flex min-h-0 flex-1 flex-col ${
          isFeatured ? "p-6 lg:p-8" : "p-5"
        }`}
      >
        <h3
          className={`shrink-0 font-serif leading-tight ${
            isFeatured ? "text-2xl lg:text-[1.75rem]" : "text-lg"
          }`}
        >
          <span className="text-forest-dark">{titlePrimary}</span>
          {titleAccent ? (
            <span className="italic text-theme-accent"> {titleAccent}</span>
          ) : null}
        </h3>
        <p
          className={`mt-3 shrink-0 font-sans font-light leading-[1.7] text-muted ${
            isFeatured
              ? "line-clamp-3 text-sm sm:text-[15px]"
              : "line-clamp-2 flex-1 text-[13px]"
          }`}
        >
          {blurb}
        </p>
        <div className={isFeatured ? "mt-auto shrink-0 pt-5" : "mt-5 shrink-0"}>
          <span className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-theme-accent transition-all duration-300 group-hover:gap-3">
            View Service
            <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden />
          </span>
          <div
            className="mt-4 h-px w-10 bg-theme-accent transition-all duration-500 group-hover:w-20"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
};
