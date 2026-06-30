import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = "", hover = false }: CardProps) => (
  <div
    className={`card-surface p-6 ${hover ? "transition hover:shadow-[var(--shadow-card-hover)]" : ""} ${className}`}
  >
    {children}
  </div>
);
