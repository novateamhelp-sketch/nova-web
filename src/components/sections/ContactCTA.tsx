import { Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { ScrollReveal } from "../ui/ScrollReveal";
import type { SiteSettings } from "../../types/api.types";

interface ContactCTAProps {
  settings?: SiteSettings | null;
  backgroundImageUrl?: string | null;
}

export const ContactCTA = ({
  settings,
  backgroundImageUrl,
}: ContactCTAProps) => {
  const phone = settings?.phoneCalls || "908-397-4060";
  const email = settings?.email || "hello@novaoutdoor.com";
  const studio = settings?.location || "Princeton, NJ";
  const phoneHref = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <section
      className="contact-cta-section relative overflow-hidden"
      aria-labelledby="contact-estimate-heading"
    >
      <div
        className="contact-cta-section__fallback-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : undefined,
        }}
        aria-hidden
      />
      <div className="contact-cta-section__overlay absolute inset-0" aria-hidden />
      <div className="contact-cta-section__gradient absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-stretch lg:gap-16 xl:grid-cols-[minmax(0,1fr)_480px]">
          <ScrollReveal variant="slide-left" className="flex max-w-xl flex-col gap-10 lg:justify-between lg:pt-1">
            <div className="space-y-7 lg:space-y-8">
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-8 bg-olive-gold"
                  aria-hidden
                />
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-olive-gold">
                  Schedule a Consultation
                </p>
              </div>

              <h2
                id="contact-estimate-heading"
                className="font-serif text-3xl font-bold leading-[1.08] text-white sm:text-4xl lg:text-[2.85rem] xl:text-[3rem]"
              >
                Let&apos;s design the way your home{" "}
                <span className="italic text-olive-gold">arrives at night.</span>
              </h2>

              <p className="max-w-lg font-sans text-base leading-relaxed text-white/72 lg:text-[1.05rem] lg:leading-[1.75]">
                From architectural uplighting to path and accent lighting, our
                specialists create custom outdoor lighting plans for homes across
                NJ, NY, and PA.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-none bg-olive-gold px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-theme-accent-foreground transition hover:brightness-105"
                >
                  Get a Free Estimate →
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 rounded-none border border-white/70 px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white/10"
                >
                  <Phone size={15} strokeWidth={1.75} aria-hidden />
                  {phone}
                </a>
              </div>
            </div>

            <dl className="grid gap-6 border-t border-white/12 pt-8 sm:grid-cols-3 lg:pt-10">
              <div>
                <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href={phoneHref}
                    className="font-sans text-sm font-semibold text-white transition hover:text-olive-gold"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${email}`}
                    className="font-sans text-sm font-semibold text-white transition hover:text-olive-gold"
                  >
                    {email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Studio
                </dt>
                <dd className="mt-2 font-sans text-sm font-semibold text-white">
                  {studio}
                </dd>
              </div>
            </dl>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" className="lg:self-start">
            <ContactForm variant="estimate" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
