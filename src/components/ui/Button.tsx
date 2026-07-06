import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "outline" | "ghost" | "solid";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-theme-accent text-theme-accent-foreground hover:brightness-105",
  solid:
    "bg-[var(--theme-btn-solid-bg)] text-[var(--theme-btn-solid-text)] hover:brightness-110",
  outline:
    "border border-theme-accent bg-transparent text-theme-accent hover:bg-theme-accent hover:text-theme-accent-foreground",
  ghost: "bg-transparent text-forest hover:bg-forest/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const base =
  "inline-flex items-center justify-center rounded-none font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => (
  <button
    className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

interface ButtonLinkProps {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const ButtonLink = ({
  to,
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
}: ButtonLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
  >
    {children}
  </Link>
);
