import { Link } from "react-router-dom";
import type { Category } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { Card } from "../ui/Card";

interface ServiceCardProps {
  category: Category;
}

export const ServiceCard = ({ category }: ServiceCardProps) => {
  const imageUrl = cloudinaryUrl(category.image, { width: 600 });

  return (
    <Link to={`/services/${category.slug}`}>
      <Card hover className="h-full overflow-hidden p-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.image?.alt || category.name}
            className="aspect-video w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="aspect-video w-full bg-forest/5"
            aria-hidden
          />
        )}
        <div className="p-5">
          <h3 className="text-forest-dark">{category.name}</h3>
          {category.shortDescription ? (
            <p className="mt-2 line-clamp-2 text-body">
              {category.shortDescription}
            </p>
          ) : null}
        </div>
      </Card>
    </Link>
  );
};
