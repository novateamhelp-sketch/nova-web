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
        className={`text-ui mt-4 max-w-2xl ${
          align === "center" ? "mx-auto" : ""
        } ${light ? "!text-white/85" : ""}`}
      >
        {subtitle}
      </p>
    ) : null}
  </div>
);
