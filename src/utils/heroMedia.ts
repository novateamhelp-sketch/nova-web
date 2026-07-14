import type { Slider } from "../types/api.types";
import { cloudinaryUrl } from "./cloudinaryUrl";

export const HERO_VIDEO_SRC = "/hero/videoprincipal.mp4";

export const resolveHeroVideoSrc = (
  heroVideo?: { video?: { url?: string }; isActive?: boolean } | null
): string => {
  if (heroVideo?.isActive !== false && heroVideo?.video?.url?.trim()) {
    return heroVideo.video.url.trim();
  }
  return HERO_VIDEO_SRC;
};

export const HERO_FALLBACK_IMAGES = [
  "/hero/banner-opt.jpg",
  "/hero/banner2-opt.jpg",
  "/hero/banner-opt.jpg",
] as const;

export interface HeroSlide {
  id: string;
  src: string;
  thumbSrc: string;
  alt: string;
}

const toHeroSlide = (slider: Slider): HeroSlide | null => {
  const src =
    cloudinaryUrl(slider.image, {
      width: 1920,
      height: 1080,
      crop: "fill",
      trim: true,
    }) || slider.image?.url || "";
  if (!src) return null;

  return {
    id: slider._id,
    src,
    thumbSrc: cloudinaryUrl(slider.image, { width: 400 }) || src,
    alt:
      slider.image?.alt ||
      slider.title ||
      slider.name ||
      "LumiScape",
  };
};

/** Active sliders from admin → hero carousel images (ordered). */
export const resolveHeroSlides = (sliders?: Slider[] | null): HeroSlide[] => {
  const fromSliders = (sliders ?? [])
    .filter((slider) => slider.isActive !== false)
    .sort((a, b) => a.order - b.order)
    .map(toHeroSlide)
    .filter((slide): slide is HeroSlide => slide !== null);

  if (fromSliders.length > 0) return fromSliders;

  return HERO_FALLBACK_IMAGES.map((src, index) => ({
    id: `fallback-${index}`,
    src,
    thumbSrc: src,
    alt: "Luxury home with professional outdoor landscape lighting",
  }));
};

/** @deprecated Use resolveHeroSlides */
export const resolveHeroMobileSlides = resolveHeroSlides;

export type HeroMobileSlide = HeroSlide;
