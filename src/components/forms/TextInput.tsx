import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-forest-dark placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:bg-cream-dark disabled:opacity-60";

export const TextInput = ({
  label,
  registration,
  error,
  className = "",
  ...props
}: TextInputProps) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-forest-dark">
      {label}
    </label>
    <input
      {...registration}
      {...props}
      className={`${inputClass} ${className}`}
    />
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error.message}</p>
    ) : null}
  </div>
);
