import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { getServiceCategoryAnchorId } from "../../utils/serviceCategoryAnchors";
import { splitDisplayTitle } from "../../utils/titleDisplay";

interface ServiceCategoryCollageCardProps {
  category: Category;
}

export const ServiceCategoryCollageCard = ({
  category,
}: ServiceCategoryCollageCardProps) => {
  const imageUrl = cloudinaryUrl(category.image, { width: 700, height: 700 });
  const split = splitDisplayTitle(category.name);
  const titlePrimary = split.mode === "default" ? split.primary : category.name;
  const titleAccent = split.mode === "default" ? split.accent : null;

  return (
    <Link
      to={`/services#${getServiceCategoryAnchorId(category.slug)}`}
      className="service-category-collage group block"
      aria-label={`View ${category.name} services`}
    >
      <div className="service-category-collage__media theme-card-border">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.image?.alt || category.name}
            className="service-category-collage__thumb"
            loading="lazy"
          />
        ) : (
          <div className="service-category-collage__thumb bg-forest/10" aria-hidden />
        )}

        <div className="service-category-collage__overlay" aria-hidden>
          <div className="service-category-collage__overlay-inner">
            <div className="service-category-collage__eyebrow-row">
              <span className="service-category-collage__eyebrow-line" />
              <span className="service-category-collage__eyebrow">Service</span>
              <span className="service-category-collage__eyebrow-line" />
            </div>

            <h3 className="service-category-collage__title">
              {titleAccent ? (
                <>
                  <span className="service-category-collage__title-primary">
                    {titlePrimary}
                  </span>{" "}
                  <span className="service-category-collage__title-accent">
                    {titleAccent}
                  </span>
                </>
              ) : (
                <span className="service-category-collage__title-accent">
                  {category.name}
                </span>
              )}
            </h3>

            <span className="service-category-collage__cta">
              View More
              <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden />
            </span>

            <span className="service-category-collage__cta-line" />
          </div>
        </div>
      </div>

      <p className="service-category-collage__label">{category.name}</p>
    </Link>
  );
};
