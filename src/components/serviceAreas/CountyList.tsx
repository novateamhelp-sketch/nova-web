import { Link } from "react-router-dom";
import type { ServiceArea } from "../../types/api.types";
import { slugify } from "../../utils/slugify";

interface CountyListProps {
  area: ServiceArea;
  activeCountySlug?: string;
}

export const CountyList = ({ area, activeCountySlug }: CountyListProps) => {
  if (area.counties.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-forest-dark">Counties</h3>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {area.counties.map((county) => {
          const countySlug = slugify(county);
          const isActive = activeCountySlug === countySlug;

          return (
            <li key={county}>
              <Link
                to={`/service-areas/${area.slug}/${countySlug}`}
                className={`block border px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-gold bg-gold/10 text-forest-dark"
                    : "border-border bg-white text-forest-dark hover:border-gold/40 hover:bg-cream"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {county}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
