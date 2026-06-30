import type { TextareaHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export const TextArea = ({
  label,
  registration,
  error,
  className = "",
  ...props
}: TextAreaProps) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-forest-dark">
      {label}
    </label>
    <textarea
      {...registration}
      {...props}
      className={`w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-forest-dark placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:bg-cream-dark disabled:opacity-60 ${className}`}
    />
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error.message}</p>
    ) : null}
  </div>
);
