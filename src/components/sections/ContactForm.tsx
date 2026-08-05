import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
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

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as
  | string
  | undefined;

interface CardFieldProps {
  id: string;
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
  id,
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
    <label
      htmlFor={id}
      className="mb-2 block font-sans text-sm font-semibold text-forest-dark"
    >
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
        id={id}
        {...registration}
        onChange={(event) => {
          registration.onChange(event);
          onChange?.(event);
        }}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-none border-0 bg-theme-input py-3.5 pr-4 pl-11 font-sans text-sm text-forest-dark placeholder:text-muted focus:ring-2 focus:ring-theme-accent/35 focus:outline-none disabled:opacity-60"
      />
    </div>
    {error ? (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
        {error.message}
      </p>
    ) : null}
  </div>
);

interface CardTextAreaProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
}

const CardTextArea = ({
  id,
  label,
  registration,
  error,
  placeholder,
  disabled,
}: CardTextAreaProps) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block font-sans text-sm font-semibold text-forest-dark"
    >
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
        id={id}
        {...registration}
        rows={5}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full resize-y rounded-none border-0 bg-theme-input py-3.5 pr-4 pl-11 font-sans text-sm text-forest-dark placeholder:text-muted focus:ring-2 focus:ring-theme-accent/35 focus:outline-none disabled:opacity-60"
      />
    </div>
    {error ? (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
        {error.message}
      </p>
    ) : null}
  </div>
);

interface EstimateFieldProps {
  id: string;
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
  id,
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
    <label
      htmlFor={id}
      className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted"
    >
      {label}
    </label>
    <input
      id={id}
      {...registration}
      onChange={(event) => {
        registration.onChange(event);
        onChange?.(event);
      }}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className="w-full border-0 border-b border-border bg-transparent py-2.5 font-sans text-sm text-forest-dark placeholder:text-muted focus:border-theme-accent focus:outline-none disabled:opacity-60"
    />
    {error ? (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
        {error.message}
      </p>
    ) : null}
  </div>
);

interface EstimateTextAreaProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
}

const EstimateTextArea = ({
  id,
  label,
  registration,
  error,
  placeholder,
  disabled,
}: EstimateTextAreaProps) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted"
    >
      {label}
    </label>
    <textarea
      id={id}
      {...registration}
      rows={4}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className="w-full resize-y border-0 border-b border-border bg-transparent py-2.5 font-sans text-sm text-forest-dark placeholder:text-muted focus:border-theme-accent focus:outline-none disabled:opacity-60"
    />
    {error ? (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
        {error.message}
      </p>
    ) : null}
  </div>
);

interface LegalExtrasProps {
  idPrefix: string;
  register: ReturnType<typeof useForm<ContactFormValues>>["register"];
  setValue: ReturnType<typeof useForm<ContactFormValues>>["setValue"];
  errors: ReturnType<typeof useForm<ContactFormValues>>["formState"]["errors"];
  isSubmitting: boolean;
  turnstileRef: React.RefObject<TurnstileInstance | null>;
  captchaKey: number;
}

const LegalExtras = ({
  idPrefix,
  register,
  setValue,
  errors,
  isSubmitting,
  turnstileRef,
  captchaKey,
}: LegalExtrasProps) => (
  <div className="space-y-4">
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          id={`${idPrefix}-accepted-legal`}
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-border text-theme-accent focus:ring-theme-accent"
          disabled={isSubmitting}
          aria-invalid={errors.acceptedLegal ? true : undefined}
          aria-describedby={
            errors.acceptedLegal ? `${idPrefix}-accepted-legal-error` : undefined
          }
          {...register("acceptedLegal")}
        />
        <span className="font-sans text-sm leading-relaxed text-sage">
          I agree to the{" "}
          <Link
            to="/privacy"
            className="font-semibold text-theme-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/terms"
            className="font-semibold text-theme-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </Link>
          .
        </span>
      </label>
      {errors.acceptedLegal ? (
        <p
          id={`${idPrefix}-accepted-legal-error`}
          className="mt-1 text-xs text-red-600"
          role="alert"
        >
          {errors.acceptedLegal.message}
        </p>
      ) : null}
    </div>

    {TURNSTILE_SITE_KEY ? (
      <div>
        <Turnstile
          key={captchaKey}
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          options={{ theme: "auto" }}
          onSuccess={(token) => {
            setValue("turnstileToken", token, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          onExpire={() => {
            setValue("turnstileToken", "", { shouldValidate: true });
          }}
          onError={() => {
            setValue("turnstileToken", "", { shouldValidate: true });
          }}
        />
        {errors.turnstileToken ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.turnstileToken.message}
          </p>
        ) : null}
      </div>
    ) : (
      <p className="text-xs text-red-600" role="alert">
        Captcha is not configured. Please contact the site administrator.
      </p>
    )}

    <p className="font-sans text-[11px] leading-relaxed text-muted sm:text-xs">
      Project estimates are preliminary and may change after an onsite
      evaluation. Submitting this form does not create a contract.
    </p>
  </div>
);

export const ContactForm = ({ variant = "page" }: ContactFormProps) => {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const idPrefix = variant === "estimate" ? "estimate" : "contact";

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

  const resetFormAndCaptcha = () => {
    reset(contactFormDefaultValues);
    turnstileRef.current?.reset();
    setCaptchaKey((key) => key + 1);
  };

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const result = await contactService.submitContact({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        streetAddress: values.streetAddress,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        message: values.message,
        acceptedPrivacyPolicy: true,
        acceptedTermsOfService: true,
        turnstileToken: values.turnstileToken,
      });
      resetFormAndCaptcha();
      await showContactFormSuccess(
        result.message || "Thank you. We will contact you soon."
      );
    } catch (err) {
      turnstileRef.current?.reset();
      setValue("turnstileToken", "", { shouldValidate: false });
      setCaptchaKey((key) => key + 1);
      await showContactFormError(
        getApiErrorMessage(err, "Could not send your message")
      );
    }
  };

  if (variant === "estimate") {
    return (
      <div
        id="contact-form"
        className="bg-theme-elevated px-6 py-8 shadow-(--shadow-card) sm:px-8 sm:py-10"
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
              id={`${idPrefix}-first-name`}
              label="Name"
              registration={register("firstName")}
              error={errors.firstName}
              autoComplete="given-name"
              placeholder="Enter a name"
              disabled={isSubmitting}
            />
            <EstimateField
              id={`${idPrefix}-last-name`}
              label="Last name"
              registration={register("lastName")}
              error={errors.lastName}
              autoComplete="family-name"
              placeholder="Enter a last name"
              disabled={isSubmitting}
            />
          </div>

          <EstimateField
            id={`${idPrefix}-email`}
            label="Email Address"
            type="email"
            registration={register("email")}
            error={errors.email}
            autoComplete="email"
            placeholder="Example@gmail.com"
            disabled={isSubmitting}
          />

          <EstimateField
            id={`${idPrefix}-phone`}
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
            id={`${idPrefix}-street`}
            label="Street Address"
            registration={register("streetAddress")}
            error={errors.streetAddress}
            autoComplete="street-address"
            placeholder="Street Address"
            disabled={isSubmitting}
          />

          <div className="grid gap-5 sm:grid-cols-3">
            <EstimateField
              id={`${idPrefix}-city`}
              label="City/Town"
              registration={register("city")}
              error={errors.city}
              autoComplete="address-level2"
              placeholder="City/Town"
              disabled={isSubmitting}
            />
            <EstimateField
              id={`${idPrefix}-state`}
              label="State"
              registration={register("state")}
              error={errors.state}
              autoComplete="address-level1"
              placeholder="State"
              disabled={isSubmitting}
            />
            <EstimateField
              id={`${idPrefix}-zip`}
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
            id={`${idPrefix}-message`}
            label="Tell us more about your project"
            registration={register("message")}
            error={errors.message}
            placeholder="Describe your property, goals, and timeline..."
            disabled={isSubmitting}
          />

          <LegalExtras
            idPrefix={idPrefix}
            register={register}
            setValue={setValue}
            errors={errors}
            isSubmitting={isSubmitting}
            turnstileRef={turnstileRef}
            captchaKey={captchaKey}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-theme-accent px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-theme-accent-foreground shadow-[0_10px_24px_color-mix(in_srgb,var(--theme-accent)_28%,transparent)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Submit Request"}
            <Send size={14} strokeWidth={2} aria-hidden />
          </button>
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
            id={`${idPrefix}-first-name`}
            label="Name *"
            icon={User}
            registration={register("firstName")}
            error={errors.firstName}
            autoComplete="given-name"
            placeholder="Enter a name"
            disabled={isSubmitting}
          />
          <CardField
            id={`${idPrefix}-last-name`}
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
            id={`${idPrefix}-email`}
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
            id={`${idPrefix}-phone`}
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
          id={`${idPrefix}-street`}
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
            id={`${idPrefix}-city`}
            label="City/Town *"
            icon={MapPin}
            registration={register("city")}
            error={errors.city}
            autoComplete="address-level2"
            placeholder="City/Town"
            disabled={isSubmitting}
          />
          <CardField
            id={`${idPrefix}-state`}
            label="State *"
            icon={MapPin}
            registration={register("state")}
            error={errors.state}
            autoComplete="address-level1"
            placeholder="State"
            disabled={isSubmitting}
          />
          <CardField
            id={`${idPrefix}-zip`}
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
          id={`${idPrefix}-message`}
          label="Tell us more about your project *"
          registration={register("message")}
          error={errors.message}
          placeholder="Describe your property, goals, and timeline..."
          disabled={isSubmitting}
        />

        <LegalExtras
          idPrefix={idPrefix}
          register={register}
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          turnstileRef={turnstileRef}
          captchaKey={captchaKey}
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
