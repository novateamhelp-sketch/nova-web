import { useRef, type ReactNode, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { NewsItem } from "../../types/api.types";
import { Section } from "../ui/Section";
import { ScrollReveal } from "../ui/ScrollReveal";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { splitDisplayTitle } from "../../utils/titleDisplay";
import { renderSerifTitleText } from "../../utils/serifTitleText";
import { DarkGridSection } from "./DarkGridSection";

import "swiper/css";
import "swiper/css/navigation";

interface NewsSectionProps {
  items: NewsItem[];
  variant?: "default" | "dark-grid";
}

const lightNavBtnClass =
  "services-carousel-nav flex h-10 w-10 items-center justify-center border border-cream-dark bg-cream text-slate-400 transition-colors duration-200 hover:border-gold hover:text-forest-dark sm:h-11 sm:w-11";

const darkNavBtnClass =
  "flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 text-white/65 transition-colors duration-200 hover:border-olive-gold hover:text-olive-gold sm:h-11 sm:w-11";

const NewsPromoHeader = ({
  hasMultiple,
  prevRef,
  nextRef,
  isDark = false,
}: {
  hasMultiple: boolean;
  prevRef: RefObject<HTMLButtonElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
  isDark?: boolean;
}) => (
  <div
    className={
      isDark
        ? "mb-6 flex items-center justify-between gap-4 sm:mb-7"
        : "mb-5 flex items-center justify-between gap-4 border-b border-[#1f20171f] pb-5 sm:mb-6 sm:pb-6"
    }
  >
    <div className="flex items-center gap-3">
      <span className="h-px w-10 shrink-0 bg-olive-gold" aria-hidden />
      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-olive-gold sm:text-xs">
        News &amp; Promotions
      </p>
    </div>

    {hasMultiple ? (
      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
        <button
          ref={prevRef}
          type="button"
          className={`${isDark ? darkNavBtnClass : lightNavBtnClass} news-carousel-prev`}
          aria-label="Previous news"
        >
          <ChevronLeft size={22} strokeWidth={2.25} />
        </button>
        <button
          ref={nextRef}
          type="button"
          className={`${isDark ? darkNavBtnClass : lightNavBtnClass} news-carousel-next`}
          aria-label="Next news"
        >
          <ChevronRight size={22} strokeWidth={2.25} />
        </button>
      </div>
    ) : null}
  </div>
);

const NewsViewMore = ({ item }: { item: NewsItem }) => {
  const href = item.buttonUrl?.trim()
    ? item.buttonUrl.startsWith("/") || item.buttonUrl.startsWith("http")
      ? item.buttonUrl
      : "/contact"
    : "/contact";
  const label = item.buttonText?.trim() || "View More";

  return (
    <div className="group mt-6 sm:mt-7">
      {href.startsWith("http") ? (
        <a
          href={href}
          className={`inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-olive-gold transition-all duration-300 hover:gap-3`}
        >
          {label}
        </a>
      ) : (
        <Link
          to={href}
          className={`inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-olive-gold transition-all duration-300 hover:gap-3`}
        >
          {label}
        </Link>
      )}
      <div
        className="mt-3 h-px w-10 bg-olive-gold/30 transition-all duration-500 group-hover:w-20 group-hover:bg-olive-gold"
        aria-hidden
      />
    </div>
  );
};

const NewsSlideContent = ({
  item,
  isDark = false,
}: {
  item: NewsItem;
  isDark?: boolean;
}) => {
  const nameSplit = splitDisplayTitle(item.name || item.title);
  const namePrimary = nameSplit.mode === "default" ? nameSplit.primary : item.name;
  const nameAccent = nameSplit.mode === "default" ? nameSplit.accent : null;
  const blurb = item.description?.trim() || "";

  if (isDark) {
    return (
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-12">
        <div className="flex min-h-0 flex-col justify-center md:pr-4">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-olive-gold sm:text-sm">
            {item.title}
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold uppercase leading-[1.05] tracking-[0.04em] text-white sm:mt-4 sm:text-4xl lg:text-[2.75rem]">
            {renderSerifTitleText(namePrimary ?? "")}
            {nameAccent ? (
              <span className="italic text-olive-gold">
                {" "}
                {renderSerifTitleText(nameAccent)}
              </span>
            ) : null}
          </h2>

          {blurb ? (
            <p className="mt-4 line-clamp-3 max-w-xl font-sans text-base font-light leading-relaxed text-white/78 sm:mt-5 sm:text-lg sm:leading-8">
              {blurb}
            </p>
          ) : null}

          <NewsViewMore item={item} />
        </div>

        <div className="news-promo-panel__media mx-auto w-full max-w-[20rem] shrink-0 sm:max-w-[22rem] md:mx-0 md:justify-self-end lg:max-w-[24rem] xl:max-w-[26rem]">
          <div className="overflow-hidden border-2 border-olive-gold/60 p-1 sm:p-1.5">
            {item.image?.url ? (
              <img
                src={cloudinaryUrl(item.image, { width: 960, height: 600 })}
                alt={item.image.alt || item.name || item.title}
                className="aspect-[16/10] h-auto w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="aspect-[16/10] w-full bg-white/5"
                aria-hidden
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="flex min-h-0 flex-col justify-center lg:pr-4">
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-olive-gold sm:text-xs">
          {item.title}
        </p>

        <h2 className="mt-2.5 font-serif text-[1.625rem] font-bold uppercase leading-[1.1] tracking-[0.04em] text-forest-dark sm:mt-3 sm:text-3xl lg:text-[2rem]">
          {renderSerifTitleText(namePrimary ?? "")}
          {nameAccent ? (
            <span className="italic text-olive-gold">
              {" "}
              {renderSerifTitleText(nameAccent)}
            </span>
          ) : null}
        </h2>

        {blurb ? (
          <p className="text-body mt-3 max-w-lg font-sans text-sm font-light leading-relaxed sm:mt-4 sm:text-base sm:leading-7">
            {blurb}
          </p>
        ) : null}

        {item.buttonUrl ? <NewsViewMore item={item} /> : null}
      </div>

      <div className="news-promo-panel__media w-full lg:justify-self-end">
        <div className="overflow-hidden border-2 border-olive-gold/70 bg-theme-card p-1.5 shadow-[0_12px_40px_rgba(31,32,23,0.08)] sm:p-2">
          {item.image?.url ? (
            <img
              src={cloudinaryUrl(item.image, { width: 960, height: 600 })}
              alt={item.image.alt || item.name || item.title}
              className="aspect-[5/4] w-full object-cover sm:aspect-[16/11] lg:aspect-[5/4] lg:max-h-[18rem]"
              loading="lazy"
            />
          ) : (
            <div
              className="aspect-[5/4] w-full bg-forest/5 sm:aspect-[16/11] lg:max-h-[18rem]"
              aria-hidden
            />
          )}
        </div>
      </div>
    </div>
  );
};

const NewsPromoPanel = ({
  hasMultiple,
  prevRef,
  nextRef,
  children,
  isDark = false,
}: {
  hasMultiple: boolean;
  prevRef: RefObject<HTMLButtonElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
  isDark?: boolean;
}) => {
  if (isDark) {
    return (
      <div className="news-dark-grid relative z-10 w-full">
        <NewsPromoHeader
          hasMultiple={hasMultiple}
          prevRef={prevRef}
          nextRef={nextRef}
          isDark
        />
        {children}
      </div>
    );
  }

  return (
    <article className="news-promo-panel theme-card-border bg-theme-card p-5 sm:p-6 lg:p-8">
      <NewsPromoHeader
        hasMultiple={hasMultiple}
        prevRef={prevRef}
        nextRef={nextRef}
      />
      {children}
    </article>
  );
};

export const NewsSection = ({
  items,
  variant = "default",
}: NewsSectionProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (items.length === 0) return null;

  const hasMultiple = items.length > 1;
  const isDark = variant === "dark-grid";

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

  const carousel = hasMultiple ? (
    <Swiper
      key={items.map((item) => item._id).join("-")}
      modules={[Navigation, Autoplay]}
      onBeforeInit={bindNavigation}
      onInit={bindNavigation}
      loop
      spaceBetween={0}
      slidesPerView={1}
      speed={600}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="news-carousel w-full overflow-hidden"
    >
      {items.map((item) => (
        <SwiperSlide key={item._id} className="h-auto! w-full">
          <NewsSlideContent item={item} isDark={isDark} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <NewsSlideContent item={items[0]} isDark={isDark} />
  );

  const panel = (
    <NewsPromoPanel
      hasMultiple={hasMultiple}
      prevRef={prevRef}
      nextRef={nextRef}
      isDark={isDark}
    >
      {carousel}
    </NewsPromoPanel>
  );

  if (isDark) {
    return (
      <DarkGridSection className="news-dark-grid-section !py-10 sm:!py-12 lg:!py-14">
        <ScrollReveal variant="fade-up">{panel}</ScrollReveal>
      </DarkGridSection>
    );
  }

  return (
    <Section tone="white" className="py-0">
      <ScrollReveal variant="fade-up">{panel}</ScrollReveal>
    </Section>
  );
};
