import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { ScrollReveal } from "../ui/ScrollReveal";
import {
  SERVICE_AREA_CONTACT_BANNER_CTA,
  serviceAreaContactBannerMessage,
} from "../../config/serviceAreaContent.config";
import type { ServiceArea } from "../../types/api.types";
import { slugify } from "../../utils/slugify";

interface ServiceAreaCountiesSectionProps {
  area: ServiceArea;
}

export const ServiceAreaCountiesSection = ({
  area,
}: ServiceAreaCountiesSectionProps) => {
  const bannerMessage =
    area.customMessage.trim() || serviceAreaContactBannerMessage(area.stateName);
  const countyCount = area.counties.length;

  return (
    <section className="relative overflow-hidden bg-theme-warm py-16 text-forest-dark sm:py-20 lg:py-24">
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="flex flex-col">
            <ScrollReveal variant="slide-left">
              <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
                  Areas Served
                </p>
              </div>

              <h2 className="font-serif text-[2rem] font-bold leading-tight tracking-tight text-forest-dark sm:text-4xl lg:text-[2.75rem]">
                {countyCount > 0
                  ? `${area.stateName} Counties`
                  : `${area.stateName} Service Area`}
              </h2>
            </ScrollReveal>

            {countyCount > 0 ? (
              <ScrollReveal variant="fade-up" className="mt-8">
                <ul className="grid grid-cols-2 gap-3">
                  {area.counties.map((county, index) => {
                    const countySlug = slugify(county);
                    const isLastOdd =
                      countyCount % 2 === 1 && index === countyCount - 1;

                    return (
                      <li
                        key={county}
                        className={isLastOdd ? "col-span-2" : undefined}
                      >
                        <Link
                          to={`/service-areas/${area.slug}/${countySlug}`}
                          className="theme-card-border block bg-theme-elevated px-4 py-4 text-center font-sans text-sm font-semibold text-forest-dark transition hover:border-theme-accent/50 hover:shadow-[var(--theme-shadow-card)] sm:py-5 sm:text-base"
                        >
                          {county}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </ScrollReveal>
            ) : null}

            <ScrollReveal variant="fade-up" staggerIndex={2} className="mt-8">
              <div className="service-area-contact-banner border-l-4 border-theme-accent bg-theme-elevated p-6 shadow-[var(--theme-shadow-card)] sm:p-8">
                <p className="font-serif text-lg italic leading-relaxed text-forest-dark sm:text-xl sm:leading-snug">
                  {bannerMessage}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex min-h-11 items-center justify-center bg-olive-bg-deep px-8 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-olive-text transition hover:brightness-110"
                >
                  {SERVICE_AREA_CONTACT_BANNER_CTA}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal
            variant="slide-right"
            className="flex w-full self-stretch min-h-[min(22rem,72vw)] sm:min-h-[26rem] lg:min-h-0"
          >
            {area.mapEmbedUrl?.trim() ? (
              <div className="h-full w-full min-h-0 overflow-hidden border border-theme-border-subtle">
                <iframe
                  title={`${area.stateName} service area map`}
                  src={area.mapEmbedUrl}
                  className="block h-full w-full min-h-[min(22rem,72vw)] border-0 sm:min-h-[26rem] lg:min-h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : null}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
