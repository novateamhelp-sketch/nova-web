import type { Slider, SiteSettings } from "../../types/api.types";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "../ui/Button";

interface HeroBannerContentProps {
  slider?: Slider;
  settings?: SiteSettings | null;
}

export const HeroBannerContent = ({
  slider,
  settings,
}: HeroBannerContentProps) => {
  const eyebrow = slider?.subtitle
    ? settings?.siteName || "Nova Outdoor Lighting"
    : "Bringing ideas to life";

  const titleLine = slider?.title || "Custom Outdoor";
  const accentLine = slider?.title ? null : "Hardscaping";

  const description =
    slider?.subtitle ||
    "With a passion for premium outdoor lighting, sophisticated hardscaping, and vibrant landscaping in New Jersey, New York, and Connecticut.";

  const ctaLabel = slider?.buttonText || "Transform Your Space";
  const ctaUrl = slider?.buttonUrl || "/contact";

  return (
    <div className="relative mx-auto max-w-4xl animate-fade-in text-center">
      <p className="eyebrow mb-4 tracking-[0.22em]">{eyebrow}</p>

      <div className="relative">
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          {titleLine}
        </h1>
        {accentLine ? (
          <p
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-5xl font-bold uppercase tracking-[0.08em] text-gold/35 sm:text-6xl lg:text-8xl"
            aria-hidden
          >
            {accentLine}
          </p>
        ) : null}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
        {description}
      </p>

      <div className="mt-10 flex justify-center">
        {ctaUrl.startsWith("http") ? (
          <a
            href={ctaUrl}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-8 py-3 text-sm font-bold uppercase tracking-wider text-forest-dark transition hover:bg-gold-dark sm:min-h-14 sm:px-10 sm:text-base"
          >
            {ctaLabel}
          </a>
        ) : (
          <ButtonLink
            to={ctaUrl}
            size="lg"
            className="min-h-12 rounded-md px-8 text-sm font-bold uppercase tracking-wider sm:min-h-14 sm:px-10 sm:text-base"
          >
            {ctaLabel}
          </ButtonLink>
        )}
      </div>

      <div className="mt-14 flex justify-center">
        <ChevronDown
          size={28}
          strokeWidth={1.5}
          className="animate-bounce text-white/70"
          aria-hidden
        />
      </div>
    </div>
  );
};
