import { Link } from "react-router-dom";

interface ServiceAreaBreadcrumbProps {
  items: { label: string; to?: string }[];
}

export const ServiceAreaBreadcrumb = ({ items }: ServiceAreaBreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className="mb-6 text-sm text-sage">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 ? <span aria-hidden>/</span> : null}
          {item.to ? (
            <Link to={item.to} className="font-medium text-gold hover:text-gold-dark">
              {item.label}
            </Link>
          ) : (
            <span className="text-forest-dark">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
