import type { ReactNode } from "react";

interface PageHeroScrollStackProps {
  children: ReactNode;
}

export const PageHeroScrollStack = ({ children }: PageHeroScrollStackProps) => (
  <div className="hero-video-scroll-stack -mt-14 lg:-mt-16">{children}</div>
);
