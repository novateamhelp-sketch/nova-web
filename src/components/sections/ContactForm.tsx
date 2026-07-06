import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { OLIVE } from "../../constants/olivePalette";
import * as contactService from "../../services/contact.service";
import { getApiErrorMessage } from "../../utils/apiError";
import {
  showContactFormError,
  showContactFormSuccess,
} from "../../utils/contactFormAlert";
import {
  contactFormDefaultValues,
  contactFormSchema,
  formatPhoneInput,
  formatZipInput,
  type ContactFormValues,
} from "../../utils/contactValidation";

type ContactFormVariant = "page" | "estimate";

interface ContactFormProps {
  variant?: ContactFormVariant;
}

interface CardFieldProps {
  label: string;
  icon: LucideIcon;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardField = ({
  label,
  icon: Icon,
  registration,
  error,
  type = "text",
  autoComplete,
  placeholder,
  disabled,
  onChange,
}: CardFieldProps) => (
  <div>
    <label className="mb-2 block font-sans text-sm font-semibold text-forest-dark">
      {label}
    </label>
    <div className="relative">
      <Icon
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        strokeWidth={1.75}
        aria-hidden
      />
      <input
        {...registration}
        onChange={(event) => {
          registration.onChange(event);
          onChange?.(event);
        }}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-none border-0 bg-theme-input py-3.5 pr-4 pl-11 font-sans text-sm text-forest-dark placeholder:text-muted focus:ring-2 focus:ring-theme-accent/35 focus:outline-none disabled:opacity-60"
      />
    </div>
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error.message}</p>
    ) : null}
  </div>
);

interface CardTextAreaProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
}

const CardTextArea = ({
  label,
  registration,
  error,
  placeholder,
  disabled,
}: CardTextAreaProps) => (
  <div>
    <label className="mb-2 block font-sans text-sm font-semibold text-forest-dark">
      {label}
    </label>
    <div className="relative">
      <MessageSquare
        size={18}
        className="pointer-events-none absolute left-4 top-4 text-muted"
        strokeWidth={1.75}
        aria-hidden
      />
      <textarea
        {...registration}
        rows={5}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full resize-y rounded-none border-0 bg-theme-input py-3.5 pr-4 pl-11 font-sans text-sm text-forest-dark placeholder:text-muted focus:ring-2 focus:ring-theme-accent/35 focus:outline-none disabled:opacity-60"
      />
    </div>
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error.message}</p>
    ) : null}
  </div>
);

interface EstimateFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EstimateField = ({
  label,
  registration,
  error,
  type = "text",
  autoComplete,
  placeholder,
  disabled,
  onChange,
}: EstimateFieldProps) => (
  <div>
    <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">
      {label}
    </label>
    <input
      {...registration}
      onChange={(event) => {
        registration.onChange(event);
        onChange?.(event);
      }}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full border-0 border-b border-border bg-transparent py-2.5 font-sans text-sm text-forest-dark placeholder:text-muted focus:border-theme-accent focus:outline-none disabled:opacity-60"
    />
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error.message}</p>
    ) : null}
  </div>
);

interface EstimateTextAreaProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
}

const EstimateTextArea = ({
  label,
  registration,
  error,
  placeholder,
  disabled,
}: EstimateTextAreaProps) => (
  <div>
    <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">
      {label}
    </label>
    <textarea
      {...registration}
      rows={4}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full resize-y border-0 border-b border-border bg-transparent py-2.5 font-sans text-sm text-forest-dark placeholder:text-muted focus:border-theme-accent focus:outline-none disabled:opacity-60"
    />
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error.message}</p>
    ) : null}
  </div>
);

export const ContactForm = ({ variant = "page" }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaultValues,
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const result = await contactService.submitContact(values);
      reset(contactFormDefaultValues);
      await showContactFormSuccess(
        result.message || "Thank you. We will contact you soon."
      );
    } catch (err) {
      await showContactFormError(
        getApiErrorMessage(err, "Could not send your message")
      );
    }
  };

  if (variant === "estimate") {
    return (
      <div
        id="contact-form"
        className="bg-theme-elevated px-6 py-8 shadow-[var(--shadow-card)] sm:px-8 sm:py-10"
      >
        <h2 className="font-serif text-2xl font-bold text-forest-dark sm:text-[1.75rem]">
          Request Your{" "}
          <span className="italic text-theme-accent">Estimate</span>
        </h2>
        <p className="mt-2 font-sans text-sm text-muted">
          We&apos;ll respond within one business day.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <EstimateField
              label="Name"
              registration={register("firstName")}
              error={errors.firstName}
              autoComplete="given-name"
              placeholder="Enter a name"
              disabled={isSubmitting}
            />
            <EstimateField
              label="Last name"
              registration={register("lastName")}
              error={errors.lastName}
              autoComplete="family-name"
              placeholder="Enter a last name"
              disabled={isSubmitting}
            />
          </div>

          <EstimateField
            label="Email Address"
            type="email"
            registration={register("email")}
            error={errors.email}
            autoComplete="email"
            placeholder="Example@gmail.com"
            disabled={isSubmitting}
          />

          <EstimateField
            label="Phone"
            type="tel"
            registration={register("phone")}
            error={errors.phone}
            autoComplete="tel"
            placeholder="(___) ___-____"
            disabled={isSubmitting}
            onChange={(event) => {
              setValue("phone", formatPhoneInput(event.target.value), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />

          <EstimateField
            label="Street Address"
            registration={register("streetAddress")}
            error={errors.streetAddress}
            autoComplete="street-address"
            placeholder="Street Address"
            disabled={isSubmitting}
          />

          <div className="grid gap-5 sm:grid-cols-3">
            <EstimateField
              label="City/Town"
              registration={register("city")}
              error={errors.city}
              autoComplete="address-level2"
              placeholder="City/Town"
              disabled={isSubmitting}
            />
            <EstimateField
              label="State"
              registration={register("state")}
              error={errors.state}
              autoComplete="address-level1"
              placeholder="State"
              disabled={isSubmitting}
            />
            <EstimateField
              label="ZIP Code"
              registration={register("zipCode")}
              error={errors.zipCode}
              autoComplete="postal-code"
              placeholder="(_____)"
              disabled={isSubmitting}
              onChange={(event) => {
                setValue("zipCode", formatZipInput(event.target.value), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </div>

          <EstimateTextArea
            label="Tell us more about your project"
            registration={register("message")}
            error={errors.message}
            placeholder="Describe your property, goals, and timeline..."
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-theme-accent px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-theme-accent-foreground shadow-[0_10px_24px_color-mix(in_srgb,var(--theme-accent)_28%,transparent)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Submit Request"}
            <Send size={14} strokeWidth={2} aria-hidden />
          </button>

          <p className="text-center font-sans text-[11px] leading-relaxed text-muted">
            By submitting, you agree to be contacted about your outdoor lighting
            project. We never share your information.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <span
        className="inline-flex rounded-none px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{
          color: OLIVE.bgDeep,
          backgroundColor: "color-mix(in srgb, var(--olive-gold) 22%, white)",
        }}
      >
        Send us a message
      </span>

      <h2 className="mt-5 font-serif text-2xl font-bold text-forest-dark sm:text-3xl">
        How can we help you?
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <CardField
            label="Name *"
            icon={User}
            registration={register("firstName")}
            error={errors.firstName}
            autoComplete="given-name"
            placeholder="Enter a name"
            disabled={isSubmitting}
          />
          <CardField
            label="Last name *"
            icon={User}
            registration={register("lastName")}
            error={errors.lastName}
            autoComplete="family-name"
            placeholder="Enter a last name"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <CardField
            label="Email Address *"
            icon={Mail}
            type="email"
            registration={register("email")}
            error={errors.email}
            autoComplete="email"
            placeholder="Example@gmail.com"
            disabled={isSubmitting}
          />
          <CardField
            label="Phone *"
            icon={Phone}
            type="tel"
            registration={register("phone")}
            error={errors.phone}
            autoComplete="tel"
            placeholder="(___) ___-____"
            disabled={isSubmitting}
            onChange={(event) => {
              setValue("phone", formatPhoneInput(event.target.value), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </div>

        <CardField
          label="Street Address *"
          icon={MapPin}
          registration={register("streetAddress")}
          error={errors.streetAddress}
          autoComplete="street-address"
          placeholder="Street Address"
          disabled={isSubmitting}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <CardField
            label="City/Town *"
            icon={MapPin}
            registration={register("city")}
            error={errors.city}
            autoComplete="address-level2"
            placeholder="City/Town"
            disabled={isSubmitting}
          />
          <CardField
            label="State *"
            icon={MapPin}
            registration={register("state")}
            error={errors.state}
            autoComplete="address-level1"
            placeholder="State"
            disabled={isSubmitting}
          />
          <CardField
            label="ZIP Code *"
            icon={MapPin}
            registration={register("zipCode")}
            error={errors.zipCode}
            autoComplete="postal-code"
            placeholder="(_____)"
            disabled={isSubmitting}
            onChange={(event) => {
              setValue("zipCode", formatZipInput(event.target.value), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </div>

        <CardTextArea
          label="Tell us more about your project *"
          registration={register("message")}
          error={errors.message}
          placeholder="Describe your property, goals, and timeline..."
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-olive-gold px-6 py-3.5 font-sans text-sm font-bold text-theme-accent-foreground shadow-[0_10px_24px_color-mix(in_srgb,var(--olive-gold)_28%,transparent)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
        >
          {isSubmitting ? "Sending..." : "Send message"}
          <Send size={16} strokeWidth={2} aria-hidden />
        </button>
      </form>
    </div>
  );
};
