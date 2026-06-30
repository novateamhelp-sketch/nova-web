import { NavLink } from "react-router-dom";
import type { Category } from "../../types/api.types";

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
}

export const CategoryFilter = ({
  categories,
  activeSlug,
}: CategoryFilterProps) => {
  if (categories.length === 0) return null;

  const linkClass = (isActive: boolean) =>
    `shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition active:scale-95 ${
      isActive
        ? "bg-forest text-white"
        : "bg-white text-sage ring-1 ring-border hover:text-forest-dark"
    }`;

  return (
    <div className="scrollbar-hide -mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible">
      <NavLink
        to="/projects"
        end
        className={({ isActive }) => linkClass(isActive && !activeSlug)}
      >
        All
      </NavLink>
      {categories.map((cat) => (
        <NavLink
          key={cat._id}
          to={`/projects/category/${cat.slug}`}
          className={({ isActive }) =>
            linkClass(isActive || activeSlug === cat.slug)
          }
        >
          {cat.name}
        </NavLink>
      ))}
    </div>
  );
};
