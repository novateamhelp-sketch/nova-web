import { Link } from "react-router-dom";
import type { Category } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";

interface ServiceDetailBlockProps {
  category: Category;
}

export const ServiceDetailBlock = ({ category }: ServiceDetailBlockProps) => {
  const imageUrl = cloudinaryUrl(category.image, { width: 1200 });

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={category.image?.alt || category.name}
          className="w-full rounded-xl object-cover shadow-[var(--shadow-card)] lg:aspect-[4/3]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className="aspect-[4/3] w-full rounded-xl bg-forest/5 lg:aspect-[4/3]"
          aria-hidden
        />
      )}
      <div>
        {category.shortDescription ? (
          <p className="text-body">{category.shortDescription}</p>
        ) : null}
        {category.description ? (
          <p className="mt-4 text-body">{category.description}</p>
        ) : null}
        <Link
          to={`/projects/category/${category.slug}`}
          className="mt-6 inline-block text-sm font-semibold text-gold hover:text-gold-dark"
        >
          View related projects →
        </Link>
      </div>
    </div>
  );
};
