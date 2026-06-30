import type { Category } from "../../types/api.types";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  categories: Category[];
}

export const ServiceGrid = ({ categories }: ServiceGridProps) => (
  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {categories.map((category) => (
      <ServiceCard key={category._id} category={category} />
    ))}
  </div>
);
