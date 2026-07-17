import type { Slider, SiteSettings } from "../../types/api.types";
import { ButtonLink } from "../ui/Button";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";

interface HeroSlideContentProps {
  slider?: Slider;
  settings?: SiteSettings | null;
  fallback?: boolean;
}

export const HeroSlideContent = ({
  slider,
  settings,
  fallback = false,
}: HeroSlideContentProps) => (
  <div className="relative max-w-2xl animate-fade-in">
    <p className="eyebrow mb-3">
      {settings?.siteName || "LumiScape"}
    </p>
    <h1 className="text-white">
      {slider?.title ||
        (fallback
          ? "Transform your outdoor spaces with professional lighting"
          : "")}
    </h1>
    <p className="mt-5 text-body-light">
      {slider?.subtitle ||
        (fallback
          ? "Landscape lighting, hardscaping, and custom outdoor design across Pennsylvania."
          : "")}
    </p>
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
      {slider?.buttonUrl?.startsWith("http") ? (
        <a
          href={slider.buttonUrl}
          className="inline-flex min-h-11 items-center justify-center rounded-none bg-gold px-6 py-3 text-base font-semibold text-forest-dark transition hover:bg-gold-dark"
        >
          {slider.buttonText || "Free Consultation"}
        </a>
      ) : (
        <ButtonLink to={slider?.buttonUrl || "/contact"} size="lg" className="min-h-11">
          {slider?.buttonText || "Free Consultation"}
        </ButtonLink>
      )}
      <ButtonLink to="/projects" variant="outline" size="lg" className="min-h-11">
        View Projects
      </ButtonLink>
    </div>
  </div>
);

interface HeroBackgroundProps {
  imageUrl?: string;
  alt: string;
  priority?: boolean;
}

export const HeroBackground = ({
  imageUrl,
  alt,
  priority = false,
}: HeroBackgroundProps) =>
  imageUrl ? (
    <>
      <img
        src={imageUrl}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      <div className="absolute inset-0 bg-olive-bg-deep/70" />
    </>
  ) : null;

export const getHeroImage = (slider?: Slider) =>
  cloudinaryUrl(slider?.image, { width: 1600 });
