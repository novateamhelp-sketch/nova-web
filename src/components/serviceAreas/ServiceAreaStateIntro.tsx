import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ServiceAreaBreadcrumb } from "./ServiceAreaBreadcrumb";
import {
  SERVICE_AREA_PRIMARY_CTA,
  serviceAreaStateBenefits,
  serviceAreaStateDescription,
  resolveServiceAreaTitleParts,
} from "../../config/serviceAreaContent.config";
import type { ServiceArea } from "../../types/api.types";

interface ServiceAreaStateIntroProps {
  area: ServiceArea;
}

export const ServiceAreaStateIntro = ({ area }: ServiceAreaStateIntroProps) => {
  const { lead, accent } = resolveServiceAreaTitleParts(
    area.stateName,
    area.title
  );
  const description =
    area.description.trim() || serviceAreaStateDescription(area.stateName);
  const benefits = serviceAreaStateBenefits(area.stateName);

  return (
    <section className="relative overflow-hidden bg-theme-warm py-12 text-forest-dark sm:py-14 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
        }}
        aria-hidden
      />

      <Container className="relative">
        <ServiceAreaBreadcrumb
          items={[
            { label: "Service Areas", to: "/service-areas" },
            { label: area.stateName },
          ]}
        />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <ScrollReveal variant="slide-left" className="max-w-xl lg:max-w-none">
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
                Service Areas
              </p>
            </div>

            <h1 className="font-serif font-bold leading-[1.04] tracking-tight text-forest-dark">
              <span className="block text-[2.35rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                {lead}
              </span>
              <span className="mt-2 block text-[2.5rem] italic theme-accent-gradient sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
                {accent}
              </span>
            </h1>

            <p className="mt-7 max-w-lg font-sans text-sm font-medium leading-relaxed tracking-[0.02em] text-body sm:mt-9 sm:text-base sm:leading-8">
              {description}
            </p>

            <div className="mt-8 sm:mt-9">
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-none bg-[var(--theme-btn-solid-bg)] px-8 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-btn-solid-text)] transition hover:brightness-110"
              >
                {SERVICE_AREA_PRIMARY_CTA}
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" className="w-full lg:justify-self-end">
            <div className="relative w-full p-4">
              <div
                className="pointer-events-none absolute -left-4 -top-4 z-0 h-32 w-32 border border-theme-accent/50"
                aria-hidden
              />
              <div className="service-area-benefits-panel relative z-10 p-8 shadow-[var(--theme-shadow-card)] sm:p-10 lg:min-h-[320px] lg:p-11">
                <ul className="space-y-4 sm:space-y-5">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-3 font-sans text-sm font-medium leading-relaxed tracking-[0.02em] text-body sm:text-base sm:leading-7"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-theme-accent"
                        aria-hidden
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="pointer-events-none absolute -bottom-4 -right-4 z-0 h-32 w-32 border border-theme-accent/50"
                aria-hidden
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
