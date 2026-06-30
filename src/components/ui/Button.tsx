import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-forest-dark hover:bg-gold-dark",
  outline:
    "border border-gold bg-transparent text-gold hover:bg-gold hover:text-forest-dark",
  ghost: "bg-transparent text-forest hover:bg-forest/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const base =
  "inline-flex items-center justify-center rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

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
