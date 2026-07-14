import { Link } from "react-router-dom";
import type { Slider, SiteSettings } from "../../types/api.types";
import { ButtonLink } from "../ui/Button";
import { DisplayTitle } from "../ui/DisplayTitle";
import { OLIVE, oliveMix } from "../../constants/olivePalette";
import { SITE_NAME } from "../../utils/siteMeta";

interface HeroCinematicContentProps {
  slider?: Slider;
  settings?: SiteSettings | null;
  variant?: "overlay" | "panel" | "glass" | "centered";
}

const DEFAULT_TITLE = SITE_NAME;
const DEFAULT_TAGLINE =
  "Design, installation, innovation and custom lighting for luxury residences across New Jersey.";

const centeredCtaClassName =
  "inline-flex min-h-11 items-center justify-center rounded-none bg-olive-gold px-10 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent-foreground transition-all duration-300 hover:brightness-105 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--theme-accent)_32%,transparent)] sm:min-h-12 sm:px-12 sm:text-[11px]";

const panelCtaClassName =
  "inline-flex min-h-10 w-full items-center justify-center rounded-none bg-olive-gold px-8 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent-foreground transition-all duration-300 hover:brightness-105 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--theme-accent)_32%,transparent)] sm:min-h-11 sm:px-9 sm:text-[11px]";

const glassCtaClassName =
  "inline-flex min-h-11 items-center justify-center rounded-none border border-olive-text/65 px-8 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-olive-text transition-all duration-300 hover:border-olive-gold hover:bg-olive-gold/10 hover:text-olive-gold sm:min-h-12 sm:px-10 sm:text-xs";

const ctaClassName =
  "inline-flex min-h-10 items-center justify-center rounded-none bg-gold px-9 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent-foreground transition-all duration-300 hover:brightness-105 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--theme-accent)_32%,transparent)] sm:min-h-11 sm:px-10 sm:text-[11px]";

export const HeroCinematicContent = ({
  slider,
  settings,
  variant = "panel",
}: HeroCinematicContentProps) => {
  const title =
    slider?.title?.trim() || settings?.siteName?.trim() || DEFAULT_TITLE;
  const eyebrow = "Bringing Ideas to Life";
  const tagline = slider?.subtitle?.trim() || DEFAULT_TAGLINE;

  const ctaLabel = slider?.buttonText || "Transform Your Space";
  const ctaUrl = slider?.buttonUrl || "/contact";

  const isGlass = variant === "glass";
  const isPanel = variant === "panel";
  const isCentered = variant === "centered";

  if (isCentered) {
    return (
      <div className="animate-fade-in text-center">
        <div className="mb-6 flex items-center justify-center gap-3 sm:mb-7 sm:gap-4">
          <span
            className="h-px w-10 sm:w-14"
            style={{
              background: `linear-gradient(to right, transparent, ${oliveMix(OLIVE.gold, 70)})`,
            }}
            aria-hidden
          />
          <p
            className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px]"
            style={{ color: OLIVE.gold }}
          >
            {eyebrow}
          </p>
          <span
            className="h-px w-10 sm:w-14"
            style={{
              background: `linear-gradient(to left, transparent, ${oliveMix(OLIVE.gold, 70)})`,
            }}
            aria-hidden
          />
        </div>

        <DisplayTitle
          as="h1"
          size="hero"
          layout="brand"
          title={title}
          light
          className="[&_span.text-gold-light]:text-olive-gold"
        />

        <div
          className="mx-auto mt-7 h-px w-20 sm:mt-8 sm:w-28"
          style={{
            background: `linear-gradient(to right, transparent, ${oliveMix(OLIVE.gold, 40)}, transparent)`,
          }}
          aria-hidden
        />

        <p
          className="mx-auto mt-6 max-w-xl font-sans text-sm font-medium leading-relaxed tracking-[0.02em] sm:mt-7 sm:text-base sm:leading-7"
          style={{ color: "rgba(240, 237, 228, 0.88)" }}
        >
          {tagline}
        </p>

        <div className="mt-8 flex justify-center sm:mt-10">
          {ctaUrl.startsWith("http") ? (
            <a href={ctaUrl} className={centeredCtaClassName}>
              {ctaLabel}
            </a>
          ) : (
            <Link to={ctaUrl} className={centeredCtaClassName}>
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (isGlass) {
    return (
      <div className="animate-fade-in text-left">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <span
            className="h-8 w-0.5 shrink-0"
            style={{ backgroundColor: OLIVE.gold }}
            aria-hidden
          />
          <p
            className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px]"
            style={{ color: OLIVE.gold }}
          >
            {eyebrow}
          </p>
        </div>

        <DisplayTitle
          as="h1"
          size="panel"
          layout="brand"
          title={title}
          light
          className="[&_span.text-gold-light]:text-olive-gold sm:[&_span]:text-[1.85rem] lg:[&_span]:text-[2.15rem] [&_span.text-gold-light]:sm:text-[1.65rem] [&_span.text-gold-light]:lg:text-[1.95rem]"
        />

        <p
          className="mt-5 max-w-lg font-sans text-sm font-medium leading-relaxed tracking-[0.02em] sm:mt-6 sm:text-base sm:leading-7"
          style={{ color: "rgba(240, 237, 228, 0.88)" }}
        >
          {tagline}
        </p>

        <div className="mt-7 sm:mt-8">
          {ctaUrl.startsWith("http") ? (
            <a href={ctaUrl} className={glassCtaClassName}>
              {ctaLabel}
            </a>
          ) : (
            <Link to={ctaUrl} className={glassCtaClassName}>
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`animate-fade-in ${
        isPanel ? "text-left" : "mx-auto max-w-4xl px-4 text-center"
      }`}
    >
      <div
        className={`flex items-center gap-2.5 ${
          isPanel ? "mb-3.5 sm:mb-4" : "mb-6 justify-center gap-3 sm:mb-7 sm:gap-5"
        }`}
      >
        {!isPanel ? (
          <span
            className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70 sm:w-14"
            aria-hidden
          />
        ) : (
          <span className="text-gold" aria-hidden>
            —
          </span>
        )}
        <p
          className={`font-sans font-semibold uppercase tracking-[0.3em] text-gold ${
            isPanel ? "text-[10px] sm:text-[11px]" : "eyebrow"
          }`}
        >
          {eyebrow}
        </p>
        {!isPanel ? (
          <span
            className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70 sm:w-14"
            aria-hidden
          />
        ) : null}
      </div>

      <DisplayTitle
        as="h1"
        size={isPanel ? "panel" : "hero"}
        layout={isPanel ? "brand" : "default"}
        title={title}
        light={!isPanel}
      />

      <div
        className={`h-px bg-gradient-to-r ${
          isPanel
            ? "mt-4 w-full max-w-[9rem] from-gold/70 via-gold/30 to-transparent sm:mt-5"
            : "mx-auto mt-7 w-20 from-transparent via-white/35 to-transparent sm:mt-8 sm:w-28"
        }`}
        aria-hidden
      />

      <p
        className={`mt-3.5 font-sans font-semibold uppercase leading-relaxed tracking-[0.18em] sm:mt-4 sm:tracking-[0.2em] ${
          isPanel
            ? "max-w-sm text-[9px] text-forest-dark/75 sm:text-[10px]"
            : "text-ui max-w-md !text-white"
        }`}
      >
        {tagline}
      </p>

      <div className={`${isPanel ? "mt-5 sm:mt-6" : "mt-8 flex justify-center sm:mt-9"}`}>
        {ctaUrl.startsWith("http") ? (
          <a href={ctaUrl} className={isPanel ? panelCtaClassName : ctaClassName}>
            {ctaLabel}
          </a>
        ) : (
          <ButtonLink to={ctaUrl} className={isPanel ? panelCtaClassName : ctaClassName}>
            {ctaLabel}
          </ButtonLink>
        )}
      </div>
    </div>
  );
};
