import { z } from "zod";

/** US phone: (555) 555-0199 */
export const US_PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

/** US ZIP: 12345 */
export const US_ZIP_REGEX = /^\d{5}$/;

export const formatPhoneInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const formatZipInput = (value: string) =>
  value.replace(/\D/g, "").slice(0, 5);

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "Name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(254),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(US_PHONE_REGEX, "Enter phone as (555) 555-0199"),
  streetAddress: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .max(300),
  city: z.string().trim().min(1, "City/Town is required").max(100),
  state: z.string().trim().min(1, "State is required").max(50),
  zipCode: z
    .string()
    .trim()
    .min(1, "ZIP code is required")
    .regex(US_ZIP_REGEX, "Enter a 5-digit ZIP code"),
  message: z
    .string()
    .trim()
    .min(1, "Tell us more about your project")
    .max(5000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
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
