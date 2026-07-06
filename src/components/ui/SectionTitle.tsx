import { DisplayTitle } from "./DisplayTitle";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  eyebrow,
  align = "left",
  light = false,
  className = "",
}: SectionTitleProps) => (
  <div
    className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
  >
    {eyebrow ? (
      <p className={`eyebrow ${align === "center" ? "mx-auto" : ""} mb-3`}>
        {eyebrow}
      </p>
    ) : null}
    <DisplayTitle as="h2" size="section" title={title} light={light} />
    {subtitle ? (
      <p
        className={`mt-4 max-w-2xl font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.18em] sm:text-xs sm:tracking-[0.2em] md:text-sm ${
          align === "center" ? "mx-auto" : ""
        } ${light ? "text-white/85" : "text-theme-kicker"}`}
      >
        {subtitle}
      </p>
    ) : null}
  </div>
);
