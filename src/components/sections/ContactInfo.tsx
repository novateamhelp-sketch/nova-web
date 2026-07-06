import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { SiteSettings } from "../../types/api.types";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M14 8.5V7.2c0-.66.55-1.2 1.22-1.2H17V4h-2.5C12.57 4 11 5.57 11 7.5V8.5H9v3h2V20h3v-8.5h2.4l.6-3H14z" />
  </svg>
);

const FALLBACK = {
  phoneCalls: "908-397-0275",
  phoneMessages: "908-370-2842",
  email: "novasales@novainc.com",
  location: "Somerset County, New Jersey",
};

interface ContactInfoProps {
  settings?: SiteSettings | null;
}

interface ContactRowProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

const ContactRow = ({ icon: Icon, label, children }: ContactRowProps) => (
  <div className="theme-card-border flex items-center gap-4 bg-theme-card p-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-theme-accent/12">
      <Icon size={18} className="text-theme-accent" strokeWidth={1.75} aria-hidden />
    </div>
    <div className="min-w-0">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-theme-kicker">
        {label}
      </p>
      <div className="mt-0.5 font-sans text-sm font-semibold text-forest-dark">
        {children}
      </div>
    </div>
  </div>
);

export const ContactInfo = ({ settings }: ContactInfoProps) => {
  const phoneCalls = settings?.phoneCalls || FALLBACK.phoneCalls;
  const phoneMessages = settings?.phoneMessages || FALLBACK.phoneMessages;
  const email = settings?.email || FALLBACK.email;
  const location = settings?.location || FALLBACK.location;

  return (
    <div className="flex flex-col gap-5">
      <article className="theme-card-border relative overflow-hidden bg-theme-elevated p-7 shadow-card transition-[border-color,box-shadow] duration-500 ease-out hover:border-theme-accent hover:shadow-card-hover sm:p-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
          }}
          aria-hidden
        />

        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent">
              Reach us
            </p>
          </div>

          <h2 className="font-serif font-bold leading-[1.04] tracking-tight text-forest-dark">
            <span className="block text-2xl sm:text-[1.75rem]">
              Let&apos;s talk about
            </span>
            <span className="mt-1 block text-2xl italic theme-accent-gradient sm:text-[1.75rem]">
              your project
            </span>
          </h2>

          <p className="mt-4 font-sans text-sm leading-relaxed text-body sm:text-[15px]">
            Ready to illuminate your outdoors? Reach out by email or phone and
            our team will get back to you shortly.
          </p>

          <div className="mt-7 space-y-3">
            <ContactRow icon={Phone} label="Calls only">
              <a
                href={`tel:${phoneCalls.replace(/\D/g, "")}`}
                className="transition hover:text-theme-accent"
              >
                {phoneCalls}
              </a>
            </ContactRow>

            <ContactRow icon={MessageCircle} label="Messages only">
              <a
                href={`tel:${phoneMessages.replace(/\D/g, "")}`}
                className="transition hover:text-theme-accent"
              >
                {phoneMessages}
              </a>
            </ContactRow>

            <ContactRow icon={Mail} label="Email">
              <a
                href={`mailto:${email}`}
                className="block truncate transition hover:text-theme-accent"
              >
                {email}
              </a>
            </ContactRow>

            <ContactRow icon={MapPin} label="Location">
              <span>{location}</span>
            </ContactRow>
          </div>
        </div>
      </article>

      <article className="theme-card-border bg-theme-elevated p-6 shadow-card transition-[border-color,box-shadow] duration-500 ease-out hover:border-theme-accent hover:shadow-card-hover sm:p-7">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-theme-kicker">
          Social Media
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-card-border inline-flex items-center justify-center gap-2 bg-theme-input px-4 py-3 font-sans text-sm font-semibold text-forest-dark transition hover:border-theme-accent/50 hover:text-theme-accent"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-card-border inline-flex items-center justify-center gap-2 bg-theme-input px-4 py-3 font-sans text-sm font-semibold text-forest-dark transition hover:border-theme-accent/50 hover:text-theme-accent"
          >
            <FacebookIcon />
            Facebook
          </a>
        </div>
      </article>
    </div>
  );
};
