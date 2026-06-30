import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Site-wide horizontal inset: 10% each side → 80% content width, centered. */
export const Container = ({ children, className = "" }: ContainerProps) => (
  <div className={`layout-x mx-auto w-full ${className}`}>{children}</div>
);
