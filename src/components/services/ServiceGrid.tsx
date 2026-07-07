import type { Category } from "../../types/api.types";
import { ServiceCategoryCollageCard } from "./ServiceCategoryCollageCard";

interface ServiceGridProps {
  categories: Category[];
}

export const ServiceGrid = ({ categories }: ServiceGridProps) => {
  const activeCategories = [...categories]
    .filter((category) => category.isActive !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="service-category-collage-grid">
      {activeCategories.map((category) => (
        <ServiceCategoryCollageCard key={category._id} category={category} />
      ))}
    </div>
  );
};
