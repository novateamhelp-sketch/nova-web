import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";

interface CategoryCarouselCardProps {
  category: Category;
}

export const CategoryCarouselCard = ({ category }: CategoryCarouselCardProps) => {
  const imageUrl = cloudinaryUrl(category.image, { width: 640, height: 400 });
  const blurb =
    category.shortDescription?.trim() ||
    category.description?.trim() ||
    "Explore our professional services tailored to your property.";

  return (
    <Link
      to={`/services/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-dark/60 bg-cream shadow-[var(--shadow-card)] transition hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.image?.alt || category.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : null}
        {category.isFeatured ? (
          <span className="absolute bottom-3 left-3 rounded-md bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-dark">
            Popular
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-forest-dark">
          {category.name}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-sage">
          {blurb}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold transition group-hover:gap-2.5">
          Request custom quote
          <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
        </span>
      </div>
    </Link>
  );
};
