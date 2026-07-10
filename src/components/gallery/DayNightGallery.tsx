import { ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category, GalleryItem } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import {
  galleryCategoryName,
  galleryCategorySlug,
  galleryLocationBadge,
} from "../../utils/galleryDisplay";
import { splitDisplayTitle } from "../../utils/titleDisplay";
import { renderSerifTitleText } from "../../utils/serifTitleText";

interface DayNightGalleryProps {
  item: GalleryItem;
  categories?: Category[];
  className?: string;
  priority?: boolean;
}

export const DayNightGallery = ({
  item,
  categories = [],
  className = "",
  priority = false,
}: DayNightGalleryProps) => {
  const dayUrl = cloudinaryUrl(item.dayImage, { width: 900 });
  const nightUrl = cloudinaryUrl(item.nightImage, { width: 900 });
  const categoryName = galleryCategoryName(item, categories);
  const categorySlug = galleryCategorySlug(item, categories);
  const projectsLink = categorySlug
    ? `/projects/category/${categorySlug}`
    : "/projects";
  const titleSplit = splitDisplayTitle(item.title || "Untitled project");

  return (
    <article
      className={`gallery-card theme-card-border group flex h-full min-h-0 cursor-default flex-col overflow-hidden bg-theme-elevated shadow-[0_4px_22px_rgb(15_36_25/0.08)] transition-shadow duration-300 hover:shadow-[0_10px_36px_rgb(15_36_25/0.12)] ${className}`}
      aria-label={`${item.title || "Project"} — hover to preview night lighting`}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-olive-bg-deep">
        {dayUrl ? (
          <img
            src={dayUrl}
            alt={item.dayImage.alt || `${item.title} — day`}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-100 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
        ) : null}
        {nightUrl ? (
          <img
            src={nightUrl}
            alt={item.nightImage.alt || `${item.title} — night`}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        ) : null}
        {!dayUrl && !nightUrl ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-white/50">
            Image unavailable
          </div>
        ) : null}

        <span className="pointer-events-none absolute left-4 top-4 bg-theme-accent px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-theme-accent-foreground shadow-sm sm:text-[11px]">
          {galleryLocationBadge(item, categories)}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-theme-elevated px-6 pt-5">
        <h3 className="line-clamp-2 min-h-[3.25rem] font-serif text-xl font-bold leading-snug text-forest-dark sm:min-h-[3.5rem] sm:text-[1.35rem]">
          {titleSplit.mode === "default" && titleSplit.accent ? (
            <>
              {renderSerifTitleText(titleSplit.primary)}{" "}
              <span className="italic text-theme-accent">
                {renderSerifTitleText(titleSplit.accent)}
              </span>
            </>
          ) : (
            renderSerifTitleText(
              titleSplit.mode === "default"
                ? titleSplit.primary
                : item.title || "Untitled project"
            )
          )}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[2.75rem] font-sans text-sm leading-relaxed text-sage">
          {item.description ?? ""}
        </p>

        <div className="mt-4 flex items-start gap-2 font-sans text-sm text-sage">
          <MapPin
            size={16}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-theme-accent"
            aria-hidden
          />
          <span>New Jersey</span>
        </div>

        <p className="mt-3 font-serif text-sm italic text-theme-accent">
          {categoryName}
        </p>
      </div>

      <div className="mt-auto border-t border-border/50">
        <Link
          to={projectsLink}
          className="group/link flex w-full items-center justify-center gap-1 bg-theme-elevated px-4 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-forest-dark transition-colors duration-300 hover:text-theme-accent"
        >
          See more
          <ChevronRight
            size={16}
            strokeWidth={2.25}
            className="transition-colors group-hover/link:text-theme-accent"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
};
