import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

export type ScrollRevealVariant = "fade-up" | "slide-left" | "slide-right" | "zoom-in";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  /** Stagger delay in steps of 0.1s — great for card grids */
  staggerIndex?: number;
  className?: string;
  style?: CSSProperties;
}

const variantClass: Record<ScrollRevealVariant, string> = {
  "fade-up": "scroll-reveal--fade-up",
  "slide-left": "scroll-reveal--slide-left",
  "slide-right": "scroll-reveal--slide-right",
  "zoom-in": "scroll-reveal--zoom-in",
};

export const ScrollReveal = ({
  children,
  variant = "fade-up",
  staggerIndex = 0,
  className = "",
  style,
}: ScrollRevealProps) => {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${variantClass[variant]} ${inView ? "is-visible" : ""} ${className}`}
      style={{
        ...style,
        ...(staggerIndex > 0
          ? { transitionDelay: `${staggerIndex * 0.1}s` }
          : undefined),
      }}
    >
      {children}
    </div>
  );
};
