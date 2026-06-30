import type { SubCategory } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { Card } from "../ui/Card";

interface SubCategoryGridProps {
  items: SubCategory[];
}

export const SubCategoryGrid = ({ items }: SubCategoryGridProps) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {items.map((sub) => {
        const imageUrl = cloudinaryUrl(sub.image, { width: 500 });
        return (
          <Card key={sub._id} className="overflow-hidden p-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={sub.image?.alt || sub.title}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
            ) : null}
            <div className="p-5">
              <h3 className="text-forest-dark">{sub.title}</h3>
              {sub.description ? (
                <p className="mt-2 text-body">{sub.description}</p>
              ) : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
