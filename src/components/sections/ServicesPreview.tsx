import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { useCategoriesNav } from "../../context/CategoriesNavContext";
import { Container } from "../ui/Container";
import { CategoryCarouselCard } from "../services/CategoryCarouselCard";
import { DisplayTitle } from "../ui/DisplayTitle";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SkeletonGrid } from "../ui/Loading";

import "swiper/css";
import "swiper/css/navigation";

const navBtnClass =
  "services-carousel-nav flex h-11 w-11 items-center justify-center rounded-xl border border-cream-dark bg-cream text-slate-400 transition-colors duration-200 hover:border-gold hover:text-forest-dark";

export const ServicesPreview = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const { categories, isLoading } = useCategoriesNav();

  const activeCategories = [...categories]
    .filter((c) => c.isActive !== false)
    .sort((a, b) => a.order - b.order);

  const carouselSlides =
    activeCategories.length > 0 && activeCategories.length <= 8
      ? [...activeCategories, ...activeCategories]
      : activeCategories;

  const canLoop = carouselSlides.length >= 2;

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

  return (
    <section className="home-flow-cream overflow-hidden py-16 text-forest-dark sm:py-20 lg:py-24">
      <Container className="overflow-hidden">
        <ScrollReveal variant="fade-up">
          <p className="eyebrow mb-3">What We Do Best</p>

          <div className="mb-10 flex items-end justify-between gap-6">
            <DisplayTitle title="Our Signature Services" />

            {!isLoading && activeCategories.length > 0 ? (
              <div className="ml-auto flex shrink-0 items-center gap-3">
                <button
                  ref={prevRef}
                  type="button"
                  className={`${navBtnClass} services-carousel-prev`}
                  aria-label="Previous services"
                >
                  <ChevronLeft size={22} strokeWidth={2.25} />
                </button>
                <button
                  ref={nextRef}
                  type="button"
                  className={`${navBtnClass} services-carousel-next`}
                  aria-label="Next services"
                >
                  <ChevronRight size={22} strokeWidth={2.25} />
                </button>
              </div>
            ) : null}
          </div>
        </ScrollReveal>

        {isLoading ? (
          <SkeletonGrid count={3} columns={3} />
        ) : activeCategories.length > 0 ? (
          <ScrollReveal variant="fade-up" staggerIndex={2}>
            <div className="overflow-hidden">
            <Swiper
              key={activeCategories.map((c) => c._id).join("-")}
              modules={[Navigation]}
              onBeforeInit={bindNavigation}
              onInit={bindNavigation}
              loop={canLoop}
              loopAdditionalSlides={activeCategories.length}
              loopPreventsSliding={false}
              watchOverflow={false}
              observer
              observeParents
              spaceBetween={24}
              slidesPerView="auto"
              className="services-carousel overflow-hidden"
            >
              {carouselSlides.map((category, index) => (
                <SwiperSlide
                  key={`${category._id}-${index}`}
                  className="!h-auto !w-[85vw] max-w-[340px] sm:!w-[320px] lg:!w-[340px]"
                >
                  <CategoryCarouselCard category={category} />
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
          </ScrollReveal>
        ) : (
          <p className="text-center text-body">
            Service categories will appear here once added in the admin panel.
          </p>
        )}
      </Container>
    </section>
  );
};
