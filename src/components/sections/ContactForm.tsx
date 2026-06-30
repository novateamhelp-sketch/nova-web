import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Button } from "../ui/Button";
import { ErrorMessage } from "../ui/ErrorMessage";
import { OLIVE } from "../../constants/olivePalette";
import * as contactService from "../../services/contact.service";
import { getApiErrorMessage } from "../../utils/apiError";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(80),
  lastName: z.string().min(1, "Last name is required").max(80),
  email: z.string().email("Enter a valid email").max(120),
  phone: z.string().min(1, "Phone is required").max(30),
  streetAddress: z.string().min(1, "Street address is required").max(200),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "State is required").max(50),
  zipCode: z.string().min(1, "Zip code is required").max(20),
  message: z.string().min(1, "Message is required").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  message: "",
};

interface CardFieldProps {
  label: string;
  icon: LucideIcon;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
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
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-2xl border-0 bg-[#f0f2f5] py-3.5 pr-4 pl-11 font-sans text-sm text-forest-dark placeholder:text-muted focus:ring-2 focus:ring-olive-gold/35 focus:outline-none disabled:opacity-60"
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
        className="w-full resize-y rounded-2xl border-0 bg-[#f0f2f5] py-3.5 pr-4 pl-11 font-sans text-sm text-forest-dark placeholder:text-muted focus:ring-2 focus:ring-olive-gold/35 focus:outline-none disabled:opacity-60"
      />
    </div>
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error.message}</p>
    ) : null}
  </div>
);

export const ContactForm = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    setSuccessMessage(null);
    try {
      const result = await contactService.submitContact(values);
      setSuccessMessage(result.message);
      reset(defaultValues);
    } catch (err) {
      setSubmitError(getApiErrorMessage(err, "Could not send your message"));
    }
  };

  if (successMessage) {
    return (
      <div className="contact-form-card flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={28} strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-forest-dark">Message sent</h3>
          <p className="mt-2 text-body">{successMessage}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setSuccessMessage(null)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <span
        className="inline-flex rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em]"
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
        {submitError ? (
          <ErrorMessage message={submitError} title="Could not submit" />
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <CardField
            label="First name *"
            icon={User}
            registration={register("firstName")}
            error={errors.firstName}
            autoComplete="given-name"
            disabled={isSubmitting}
          />
          <CardField
            label="Last name *"
            icon={User}
            registration={register("lastName")}
            error={errors.lastName}
            autoComplete="family-name"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <CardField
            label="Email *"
            icon={Mail}
            type="email"
            registration={register("email")}
            error={errors.email}
            autoComplete="email"
            disabled={isSubmitting}
          />
          <CardField
            label="Phone *"
            icon={Phone}
            type="tel"
            registration={register("phone")}
            error={errors.phone}
            autoComplete="tel"
            disabled={isSubmitting}
          />
        </div>

        <CardField
          label="Street address *"
          icon={MapPin}
          registration={register("streetAddress")}
          error={errors.streetAddress}
          autoComplete="street-address"
          disabled={isSubmitting}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <CardField
            label="City *"
            icon={MapPin}
            registration={register("city")}
            error={errors.city}
            autoComplete="address-level2"
            disabled={isSubmitting}
          />
          <CardField
            label="State *"
            icon={MapPin}
            registration={register("state")}
            error={errors.state}
            autoComplete="address-level1"
            disabled={isSubmitting}
          />
          <CardField
            label="Zip code *"
            icon={MapPin}
            registration={register("zipCode")}
            error={errors.zipCode}
            autoComplete="postal-code"
            disabled={isSubmitting}
          />
        </div>

        <CardTextArea
          label="Message *"
          registration={register("message")}
          error={errors.message}
          placeholder="Tell us about your property and what you're looking for..."
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-sans text-sm font-bold text-[#1a1208] shadow-[0_10px_24px_rgba(212,180,92,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
          style={{ backgroundColor: "var(--olive-gold)" }}
        >
          {isSubmitting ? "Sending..." : "Send message"}
          <Send size={16} strokeWidth={2} aria-hidden />
        </button>
      </form>
    </div>
  );
};
