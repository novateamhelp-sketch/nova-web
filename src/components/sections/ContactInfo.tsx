import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "../../types/api.types";
import { OLIVE, oliveMix } from "../../constants/olivePalette";

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

const contactRowClass =
  "flex items-center gap-4 rounded-2xl border p-4";
const iconBoxClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border";

export const ContactInfo = ({ settings }: ContactInfoProps) => {
  const phoneCalls = settings?.phoneCalls || FALLBACK.phoneCalls;
  const phoneMessages = settings?.phoneMessages || FALLBACK.phoneMessages;
  const email = settings?.email || FALLBACK.email;
  const location = settings?.location || FALLBACK.location;

  return (
    <div className="flex flex-col gap-5">
      <div className="contact-olive-card relative overflow-hidden rounded-3xl p-7 sm:p-8">
        <div
          className="pointer-events-none absolute -right-8 -bottom-10 h-40 w-40 rounded-full opacity-20"
          style={{ backgroundColor: "#95ae2e" }}
          aria-hidden
        />

        <div className="relative">
          <h2
            className="font-serif text-2xl font-bold leading-tight sm:text-[1.65rem]"
            style={{ color: OLIVE.text }}
          >
            Let&apos;s talk about your project
          </h2>
          <p
            className="mt-3 font-sans text-sm leading-relaxed sm:text-[15px]"
            style={{ color: oliveMix(OLIVE.text, 90) }}
          >
            Ready to illuminate your outdoors? Reach out by email or phone and
            our team will get back to you shortly.
          </p>

          <div className="mt-7 space-y-3">
            <div
              className={contactRowClass}
              style={{
                borderColor: oliveMix(OLIVE.text, 18),
                backgroundColor: oliveMix(OLIVE.bgDeep, 35),
              }}
            >
              <div
                className={iconBoxClass}
                style={{
                  borderColor: oliveMix(OLIVE.gold, 40),
                  backgroundColor: oliveMix(OLIVE.bg, 50),
                }}
              >
                <Phone size={18} className="text-olive-gold" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: oliveMix(OLIVE.text, 70) }}
                >
                  Calls only
                </p>
                <a
                  href={`tel:${phoneCalls.replace(/\D/g, "")}`}
                  className="mt-0.5 block font-sans text-sm font-semibold transition hover:opacity-90"
                  style={{ color: OLIVE.text }}
                >
                  {phoneCalls}
                </a>
              </div>
            </div>

            <div
              className={contactRowClass}
              style={{
                borderColor: oliveMix(OLIVE.text, 18),
                backgroundColor: oliveMix(OLIVE.bgDeep, 35),
              }}
            >
              <div
                className={iconBoxClass}
                style={{
                  borderColor: oliveMix(OLIVE.gold, 40),
                  backgroundColor: oliveMix(OLIVE.bg, 50),
                }}
              >
                <Phone size={18} className="text-olive-gold" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: oliveMix(OLIVE.text, 70) }}
                >
                  Messages only
                </p>
                <a
                  href={`tel:${phoneMessages.replace(/\D/g, "")}`}
                  className="mt-0.5 block font-sans text-sm font-semibold transition hover:opacity-90"
                  style={{ color: OLIVE.text }}
                >
                  {phoneMessages}
                </a>
              </div>
            </div>

            <div
              className={contactRowClass}
              style={{
                borderColor: oliveMix(OLIVE.text, 18),
                backgroundColor: oliveMix(OLIVE.bgDeep, 35),
              }}
            >
              <div
                className={iconBoxClass}
                style={{
                  borderColor: oliveMix(OLIVE.gold, 40),
                  backgroundColor: oliveMix(OLIVE.bg, 50),
                }}
              >
                <Mail size={18} className="text-olive-gold" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: oliveMix(OLIVE.text, 70) }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-0.5 block truncate font-sans text-sm font-semibold transition hover:opacity-90"
                  style={{ color: OLIVE.text }}
                >
                  {email}
                </a>
              </div>
            </div>

            <div
              className={contactRowClass}
              style={{
                borderColor: oliveMix(OLIVE.text, 18),
                backgroundColor: oliveMix(OLIVE.bgDeep, 35),
              }}
            >
              <div
                className={iconBoxClass}
                style={{
                  borderColor: oliveMix(OLIVE.gold, 40),
                  backgroundColor: oliveMix(OLIVE.bg, 50),
                }}
              >
                <MapPin size={18} className="text-olive-gold" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: oliveMix(OLIVE.text, 70) }}
                >
                  Location
                </p>
                <p
                  className="mt-0.5 font-sans text-sm font-semibold"
                  style={{ color: OLIVE.text }}
                >
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border/70 bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
          Social Media
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f3f4f6] px-4 py-3 font-sans text-sm font-semibold text-forest-dark transition hover:bg-[#e8eaee]"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f3f4f6] px-4 py-3 font-sans text-sm font-semibold text-forest-dark transition hover:bg-[#e8eaee]"
          >
            <FacebookIcon />
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};
