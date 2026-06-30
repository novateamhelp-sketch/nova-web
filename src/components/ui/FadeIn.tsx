import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

export const FadeIn = ({ children, className = "" }: FadeInProps) => (
  <div className={`animate-fade-in ${className}`}>{children}</div>
);
