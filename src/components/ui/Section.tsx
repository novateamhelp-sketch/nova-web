import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionTone = "default" | "dark" | "muted" | "white";
type SectionSize = "sm" | "md" | "lg";

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  size?: SectionSize;
  containerClassName?: string;
  as?: "section" | "div";
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-cream text-forest-dark",
  dark: "bg-forest-dark text-white",
  muted: "bg-cream-dark text-forest-dark",
  white: "bg-surface text-forest-dark",
};

const sizeClasses: Record<SectionSize, string> = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-28",
};

export const Section = ({
  children,
  className = "",
  tone = "default",
  size = "md",
  containerClassName = "",
  as: Tag = "section",
}: SectionProps) => (
  <Tag className={`${toneClasses[tone]} ${sizeClasses[size]} ${className}`}>
    <Container className={containerClassName}>{children}</Container>
  </Tag>
);
