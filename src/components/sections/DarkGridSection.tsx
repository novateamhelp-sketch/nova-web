import type { ReactNode } from "react";
import { Container } from "../ui/Container";

type DarkGridGlow = "showroom" | "centered";

interface DarkGridSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** showroom = glow on the right (news, interactive). centered = behind centered text */
  glow?: DarkGridGlow;
}

export const DarkGridSection = ({
  children,
  className = "",
  containerClassName = "",
  glow = "showroom",
}: DarkGridSectionProps) => (
  <section
    className={`home-flow-dark relative overflow-hidden border-t border-white/10 py-16 text-white sm:py-20 lg:py-24 ${className}`}
    style={{ backgroundColor: "var(--olive-bg-deep)" }}
  >
    <div
      className={`dark-grid-section__glow dark-grid-section__glow--${glow} pointer-events-none absolute inset-0`}
      aria-hidden
    />
    <div
      className={`dark-grid-section__vignette dark-grid-section__vignette--${glow} pointer-events-none absolute inset-0`}
      aria-hidden
    />
    <div
      className="interactive-lighting-grid-bg pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    />
    <Container className={`relative z-10 ${containerClassName}`}>
      {children}
    </Container>
  </section>
);
