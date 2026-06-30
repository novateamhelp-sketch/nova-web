import { Phone } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { DisplayTitle } from "../ui/DisplayTitle";
import { ScrollReveal } from "../ui/ScrollReveal";
import type { SiteSettings } from "../../types/api.types";

interface ContactCTAProps {
  settings?: SiteSettings | null;
  /** Content sits directly on a dark section background */
  embedded?: boolean;
}

export const ContactCTA = ({
  settings,
  embedded = false,
}: ContactCTAProps) => {
  const phone = settings?.phoneCalls || "908-397-0275";

  return (
    <div
      className={
        embedded
          ? "relative mx-auto max-w-3xl text-center"
          : "relative overflow-hidden rounded-2xl bg-forest-dark px-6 py-12 text-center sm:px-10 sm:py-16"
      }
    >
      {!embedded ? (
        <div
          className="parallax-bg pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #c9a227 0%, transparent 50%), radial-gradient(circle at 80% 50%, #2d5a45 0%, transparent 50%)",
          }}
          aria-hidden
        />
      ) : null}
      <ScrollReveal variant="fade-up" className="relative">
        <p className="eyebrow mb-3 !text-gold-light">Free Consultation</p>
        <DisplayTitle
          light
          title="Ready to transform your outdoor space?"
        />
        <p className="mx-auto mt-4 max-w-xl text-body-light">
          Schedule a no-obligation consultation with our outdoor lighting
          specialists serving NJ, NY, and CT.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink to="/contact" size="lg">
            Request Consultation
          </ButtonLink>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-gold"
          >
            <Phone size={16} strokeWidth={1.75} />
            {phone}
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
};
