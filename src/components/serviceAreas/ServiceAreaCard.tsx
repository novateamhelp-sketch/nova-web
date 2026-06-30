import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import type { ServiceArea } from "../../types/api.types";
import { Card } from "../ui/Card";
import { getStateAbbrev } from "../../utils/slugify";

interface ServiceAreaCardProps {
  area: ServiceArea;
}

export const ServiceAreaCard = ({ area }: ServiceAreaCardProps) => {
  const abbrev = getStateAbbrev(area.stateName);
  const countyLabel =
    area.counties.length === 1
      ? "1 county"
      : `${area.counties.length} counties`;

  return (
    <Link to={`/service-areas/${area.slug}`}>
      <Card hover className="h-full">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-sm font-bold text-forest-dark">
            {abbrev}
          </span>
          <div>
            <h3 className="text-forest-dark">{area.stateName}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-sage">
              <MapPin size={14} strokeWidth={1.75} aria-hidden />
              {area.counties.length > 0 ? countyLabel : "Statewide coverage"}
            </p>
            {area.description ? (
              <p className="mt-3 line-clamp-2 text-body">{area.description}</p>
            ) : (
              <p className="mt-3 line-clamp-2 text-body">
                Outdoor and landscape lighting services across {area.stateName}.
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};
