import { useCallback, useMemo, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { resolveHeroSlides, resolveHeroVideoSrc } from "../../utils/heroMedia";
import type { HeroVideo, Slider, SiteSettings } from "../../types/api.types";
import { OLIVE, oliveMix } from "../../constants/olivePalette";
import { Container } from "../ui/Container";
import { HeroBackgroundSlider } from "./HeroBackgroundSlider";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";
import { HeroCinematicContent } from "./HeroCinematicContent";

interface HeroProps {
  sliders?: Slider[];
  settings?: SiteSettings | null;
  heroVideo?: HeroVideo | null;
  /** Hero video/image stays pinned while the next section scrolls over it */
  pinOnScroll?: boolean;
}

export const Hero = ({
  sliders = [],
  settings,
  heroVideo,
  pinOnScroll = false,
}: HeroProps) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSliders = useMemo(
    () =>
      [...(sliders ?? [])]
        .filter((slider) => slider.isActive !== false && slider.image?.url)
        .sort((a, b) => a.order - b.order),
    [sliders]
  );

  const heroSlides = useMemo(() => resolveHeroSlides(sliders), [sliders]);

  const activeSlider =
    activeSliders[activeIndex] ?? activeSliders[0] ?? sliders[0];

  /** Desktop brand copy: prefer first slide that has a title (order alone can be empty). */
  const desktopSlider = useMemo(() => {
    const withTitle = activeSliders.find((slider) => slider.title?.trim());
    return withTitle ?? activeSliders[0] ?? sliders[0];
  }, [activeSliders, sliders]);

  const videoPoster = heroSlides[0]?.src;
  const videoSrc = resolveHeroVideoSrc(heroVideo);

  const handleMobileSlideChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      className={`relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden ${
        pinOnScroll ? "hero-pin-on-scroll" : ""
      }`}
      style={{ backgroundColor: OLIVE.bgDeep }}
    >
      {/* Mobile — slider images from admin */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <HeroBackgroundSlider
          slides={heroSlides}
          tone="olive"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onActiveChange={handleMobileSlideChange}
        />
      </div>

      {/* Desktop — video background */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <HeroBackgroundVideo poster={videoPoster} videoSrc={videoSrc} />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48"
        style={{
          background: `linear-gradient(to top, ${OLIVE.bgDeep} 0%, ${oliveMix(OLIVE.bgDeep, 80)} 45%, transparent 100%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center px-[10%] pt-20 pb-6 sm:pt-24 lg:pt-28">
          <div className="mx-auto w-full max-w-3xl text-center">
            {/* Mobile — content syncs with carousel */}
            <div className="lg:hidden">
              <HeroCinematicContent
                key={activeSlider?._id ?? activeIndex}
                slider={activeSlider}
                settings={settings}
                variant="centered"
              />
            </div>

            {/* Desktop — static content from first slider */}
            <div className="hidden lg:block">
              <HeroCinematicContent
                key={desktopSlider?._id ?? "desktop"}
                slider={desktopSlider}
                settings={settings}
                variant="centered"
              />
            </div>
          </div>
        </div>

        <Container className="shrink-0 pb-8 pt-2 sm:pb-10">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            <div className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className="fill-olive-gold text-olive-gold"
                  strokeWidth={0}
                />
              ))}
            </div>
            <p
              className="font-sans text-xs font-semibold sm:text-[13px]"
              style={{ color: OLIVE.text }}
            >
              5.0 Star Rating
              <span className="mx-2 opacity-40" aria-hidden>
                •
              </span>
              <span className="font-medium opacity-85">
                Home Improvement Contractor License Certification: 13VH09395800, Policy number:10143566941
              </span>
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
};
