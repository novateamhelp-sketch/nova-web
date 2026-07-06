import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategoriesNav } from "../../context/CategoriesNavContext";
import { Container } from "../ui/Container";
import { CategoryCarouselCard } from "../services/CategoryCarouselCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SkeletonGrid } from "../ui/Loading";
import type { Category } from "../../types/api.types";

const navBtnClass =
  "gallery-nav-btn services-carousel-nav flex h-11 w-11 items-center justify-center border border-border bg-theme-elevated text-muted transition-colors duration-200 hover:border-theme-accent hover:text-theme-accent";

const GRID_BADGES = ["Craft", "Living", "Vision", "Lifestyle"] as const;

const runCarouselTransition = (update: () => void) => {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    document.startViewTransition(update);
    return;
  }

  update();
};

const getCarouselSlots = (categories: Category[], activeIndex: number) => {
  const total = categories.length;
  if (total === 0) {
    return { featured: null as Category | null, grid: [] as Category[] };
  }

  const normalized = ((activeIndex % total) + total) % total;
  const featured = categories[normalized];
  const grid: Category[] = [];

  for (let step = 1; step <= Math.min(4, total - 1); step += 1) {
    grid.push(categories[(normalized + step) % total]);
  }

  return { featured, grid };
};

export const ServicesPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { categories, isLoading } = useCategoriesNav();

  const activeCategories = useMemo(
    () =>
      [...categories]
        .filter((c) => c.isActive !== false)
        .sort((a, b) => a.order - b.order),
    [categories]
  );

  const canNavigate = activeCategories.length > 1;
  const { featured, grid } = getCarouselSlots(activeCategories, activeIndex);

  const goPrev = () => {
    if (!canNavigate) return;
    runCarouselTransition(() => {
      setActiveIndex(
        (index) =>
          (index - 1 + activeCategories.length) % activeCategories.length
      );
    });
  };

  const goNext = () => {
    if (!canNavigate) return;
    runCarouselTransition(() => {
      setActiveIndex((index) => (index + 1) % activeCategories.length);
    });
  };

  return (
    <section className="overflow-hidden bg-theme-elevated py-16 text-forest-dark sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal variant="fade-up">
          <div className="mb-10 flex items-end justify-between gap-6 lg:mb-12">
            <div>
              <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <span
                  className="h-px w-10 shrink-0 bg-theme-accent"
                  aria-hidden
                />
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
                  What We Do Best
                </p>
              </div>

              <h2 className="font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-forest-dark sm:text-4xl lg:text-[2.75rem]">
                Our Signature{" "}
                <span className="italic text-theme-accent">Services</span>
              </h2>
            </div>

            {canNavigate ? (
              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  className={`${navBtnClass} services-carousel-prev`}
                  aria-label="Previous service"
                  onClick={goPrev}
                >
                  <ChevronLeft size={22} strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  className={`${navBtnClass} services-carousel-next`}
                  aria-label="Next service"
                  onClick={goNext}
                >
                  <ChevronRight size={22} strokeWidth={2.25} />
                </button>
              </div>
            ) : null}
          </div>
        </ScrollReveal>

        {isLoading ? (
          <SkeletonGrid count={3} columns={3} />
        ) : featured ? (
          <div className="services-signature-layout">
            <ScrollReveal variant="fade-up" staggerIndex={1} className="services-signature-featured">
              <CategoryCarouselCard
                key="signature-featured-slot"
                category={featured}
                variant="featured"
                badge={featured.isFeatured ? "Featured" : "Signature"}
              />
            </ScrollReveal>

            {grid.length > 0 ? (
              <div className="services-signature-grid">
                {grid.map((category, index) => (
                  <ScrollReveal
                    key={`signature-grid-slot-${index}`}
                    variant="fade-up"
                    staggerIndex={index + 2}
                    className="services-signature-grid-slot"
                  >
                    <CategoryCarouselCard
                      category={category}
                      variant="compact"
                      badge={GRID_BADGES[index % GRID_BADGES.length]}
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-center text-body">
            Service categories will appear here once added in the admin panel.
          </p>
        )}
      </Container>
    </section>
  );
};
