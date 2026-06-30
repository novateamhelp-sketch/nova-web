import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { HeroSlide } from "../../utils/heroMedia";
import { OLIVE, oliveMix } from "../../constants/olivePalette";

import "swiper/css";
import "swiper/css/effect-fade";

interface HeroBackgroundSliderProps {
  slides: HeroSlide[];
  onSwiper?: (swiper: SwiperInstance) => void;
  onActiveChange?: (index: number) => void;
  blurred?: boolean;
  /** Olive overlays — matches centered video hero */
  tone?: "default" | "olive";
}

export const HeroBackgroundSlider = ({
  slides,
  onSwiper,
  onActiveChange,
  blurred = false,
  tone = "default",
}: HeroBackgroundSliderProps) => {
  if (slides.length === 0) return null;

  const syncIndex = (swiper: SwiperInstance) => {
    onActiveChange?.(swiper.realIndex);
  };

  const imageClass = blurred
    ? "h-full w-full scale-[1.06] object-cover blur-[2px]"
    : "h-full w-full scale-[1.06] object-cover";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {slides.length === 1 ? (
        <img
          src={slides[0].src}
          alt=""
          className={imageClass}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={900}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            onSwiper?.(swiper);
            syncIndex(swiper);
          }}
          onSlideChange={syncIndex}
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.src}
                alt=""
                className={imageClass}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div
        className={`absolute inset-0 ${
          tone === "olive"
            ? ""
            : blurred
              ? "bg-olive-bg-deep/30"
              : "bg-gradient-to-b from-black/70 via-black/50 to-black/85"
        }`}
        style={
          tone === "olive"
            ? {
                background: `linear-gradient(to bottom, ${oliveMix(OLIVE.bgDeep, 60)} 0%, ${oliveMix(OLIVE.bgDeep, 25)} 28%, ${oliveMix(OLIVE.bgDeep, 33)} 72%, ${oliveMix(OLIVE.bgDeep, 90)} 100%)`,
              }
            : undefined
        }
      />
      {tone === "olive" ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 50% 42%, transparent 0%, ${oliveMix(OLIVE.bgDeep, 40)} 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 55% 40% at 50% 55%, ${oliveMix(OLIVE.oliveMid, 9)} 0%, transparent 70%)`,
            }}
          />
        </>
      ) : !blurred ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.2)_45%,transparent_72%)]" />
          <div className="absolute inset-0 bg-forest-dark/20 mix-blend-multiply" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(149,174,46,0.08)_0%,rgba(36,37,29,0.45)_55%,rgba(20,22,14,0.65)_100%)]" />
      )}
    </div>
  );
};
