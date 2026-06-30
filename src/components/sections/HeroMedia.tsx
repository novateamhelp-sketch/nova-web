import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HERO_VIDEO = "/hero/videoprincipal.mp4";
const HERO_POSTER = "/hero/banner.jpg";

const MOBILE_BANNERS = [
  {
    src: "/hero/banner.jpg",
    alt: "Luxury home with professional outdoor landscape lighting at night",
  },
  {
    src: "/hero/banner2.jpg",
    alt: "Modern residence illuminated with custom outdoor lighting design",
  },
] as const;

export const HeroMedia = () => (
  <>
    <div className="absolute inset-0 hidden lg:block" aria-hidden>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
        preload="metadata"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
    </div>

    <div className="absolute inset-0 lg:hidden" aria-hidden>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-mobile-swiper h-full"
      >
        {MOBILE_BANNERS.map((banner) => (
          <SwiperSlide key={banner.src}>
            <img
              src={banner.src}
              alt={banner.alt}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/75 via-forest-dark/55 to-forest-dark/80" />
  </>
);
