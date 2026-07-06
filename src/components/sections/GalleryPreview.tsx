import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { Category, GalleryItem } from "../../types/api.types";
import { DayNightGallery } from "../gallery/DayNightGallery";
import { DisplayTitle } from "../ui/DisplayTitle";
import { ScrollReveal } from "../ui/ScrollReveal";
import {
  filterGalleryByCategory,
  galleryFilterOptions,
} from "../../utils/galleryDisplay";

import "swiper/css";
import "swiper/css/navigation";

interface GalleryPreviewProps {
  items: GalleryItem[];
  categories?: Category[];
}

const ALL_FILTER = "all";
const CAROUSEL_THRESHOLD = 3;

const navBtnClass =
  "gallery-nav-btn services-carousel-nav flex h-11 w-11 items-center justify-center border border-border bg-theme-elevated text-muted transition-colors duration-200 hover:border-theme-accent hover:text-theme-accent";

export const GalleryPreview = ({
  items,
  categories = [],
}: GalleryPreviewProps) => {
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const filterOptions = useMemo(
    () => galleryFilterOptions(items, categories),
    [items, categories]
  );

  const filteredItems = useMemo(
    () =>
      filterGalleryByCategory(
        items,
        activeFilter === ALL_FILTER ? null : activeFilter,
        categories
      ),
    [items, activeFilter, categories]
  );

  const useCarousel = filteredItems.length > CAROUSEL_THRESHOLD;

  const bindNavigation = (swiper: SwiperInstance) => {
    const navigation = swiper.params.navigation;
    if (!prevRef.current || !nextRef.current) return;
    if (!navigation || typeof navigation === "boolean") return;

    navigation.prevEl = prevRef.current;
    navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  };

  if (items.length === 0) return null;

  const filterButtonClass = (active: boolean) =>
    `px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 sm:px-5 sm:py-2.5 sm:text-xs ${
      active
        ? "bg-theme-accent text-theme-accent-foreground shadow-sm"
        : "gallery-filter-btn border border-border bg-theme-elevated text-forest-dark"
    }`;

  return (
    <>
      <ScrollReveal variant="fade-up">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
            Project Gallery
          </p>
        </div>
        <DisplayTitle title="Our Curated Project Gallery" />
      </ScrollReveal>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter(ALL_FILTER)}
            className={filterButtonClass(activeFilter === ALL_FILTER)}
          >
            All Estates
          </button>
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={filterButtonClass(activeFilter === filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {useCarousel ? (
          <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">
            <button
              ref={prevRef}
              type="button"
              className={navBtnClass}
              aria-label="Previous gallery projects"
            >
              <ChevronLeft size={22} strokeWidth={2.25} />
            </button>
            <button
              ref={nextRef}
              type="button"
              className={navBtnClass}
              aria-label="Next gallery projects"
            >
              <ChevronRight size={22} strokeWidth={2.25} />
            </button>
          </div>
        ) : null}
      </div>

      {filteredItems.length === 0 ? (
        <p className="mt-10 text-center text-body">
          No gallery projects in this category yet.
        </p>
      ) : useCarousel ? (
        <div className="gallery-carousel mt-10 overflow-hidden">
          <Swiper
            key={`${activeFilter}-${filteredItems.map((item) => item._id).join("-")}`}
            modules={[Navigation]}
            onBeforeInit={bindNavigation}
            onInit={bindNavigation}
            spaceBetween={24}
            slidesPerView={1.08}
            breakpoints={{
              640: { slidesPerView: 2.05 },
              1024: { slidesPerView: 3 },
            }}
            watchOverflow
          >
            {filteredItems.map((item, index) => (
              <SwiperSlide key={item._id} className="!flex !h-auto">
                <ScrollReveal
                  variant="zoom-in"
                  staggerIndex={(index % 3) + 1}
                  className="flex h-full w-full min-h-0"
                >
                  <DayNightGallery
                    item={item}
                    categories={categories}
                    priority={index === 0}
                    className="h-full w-full"
                  />
                </ScrollReveal>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <ScrollReveal
              key={item._id}
              variant="zoom-in"
              staggerIndex={index + 1}
              className="h-full"
            >
              <DayNightGallery
                item={item}
                categories={categories}
                priority={index === 0}
                className="h-full"
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
};
