import type { Slider } from "../../types/api.types";
import type { HeroSlide } from "../../utils/heroMedia";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import {
  HERO_SCENE_LABELS,
  isAssetFilename,
  OLIVE,
} from "../../constants/olivePalette";

interface HeroFeaturedSceneProps {
  slide?: HeroSlide;
  slider?: Slider;
  index: number;
}

const resolveSceneLabel = (
  slider: Slider | undefined,
  slide: HeroSlide | undefined,
  index: number
): string => {
  const candidates = [slider?.title, slider?.name, slide?.alt];
  for (const candidate of candidates) {
    if (candidate && !isAssetFilename(candidate)) return candidate;
  }
  return HERO_SCENE_LABELS[index % HERO_SCENE_LABELS.length] ?? "Night Artistry";
};

export const HeroFeaturedScene = ({
  slide,
  slider,
  index,
}: HeroFeaturedSceneProps) => {
  if (!slide) return null;

  const label = resolveSceneLabel(slider, slide, index);

  const imageSrc =
    cloudinaryUrl(slider?.image, {
      width: 960,
      height: 1200,
      crop: "fill",
      trim: true,
    }) || slide.src;

  return (
    <div
      className="relative h-full min-h-[13rem] overflow-hidden rounded-2xl sm:min-h-[15rem] lg:min-h-[18rem]"
      style={{ backgroundColor: OLIVE.bgDeep }}
    >
      <img
        src={imageSrc}
        alt={label}
        className="absolute inset-0 h-full w-full origin-center scale-[1.2] object-cover object-center"
        loading="lazy"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
        aria-hidden
      />
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5">
        <p
          className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] sm:text-[10px]"
          style={{ color: OLIVE.gold }}
        >
          Scenario {String(index + 1).padStart(2, "0")}
        </p>
        <p
          className="mt-1 font-sans text-lg font-bold leading-tight sm:text-xl"
          style={{ color: OLIVE.text }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};
