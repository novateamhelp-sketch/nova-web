import {
  Award,
  Clock,
  Palette,
  ThumbsUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { ScrollReveal } from "../ui/ScrollReveal";
import { splitDisplayTitle } from "../../utils/titleDisplay";
import { SERVICE_AREA_WHY_CHOOSE_US } from "../../config/serviceAreaContent.config";

const WHY_CHOOSE_ICONS: LucideIcon[] = [
  Award,
  Palette,
  Users,
  Clock,
  ThumbsUp,
];

export const ServiceAreaWhyChooseUs = () => (
  <section className="relative overflow-hidden bg-theme-elevated py-16 text-forest-dark sm:py-20 lg:py-24">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent) 0%, transparent 58%)",
      }}
      aria-hidden
    />

    <Container className="relative">
      <ScrollReveal variant="fade-up" className="mb-12 sm:mb-14 lg:mb-16">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
                Why Nova
              </p>
            </div>

            <h2 className="font-serif font-bold leading-[1.04] tracking-tight text-forest-dark">
              <span className="block text-[2rem] sm:text-4xl lg:text-[2.75rem]">
                Why Choose
              </span>
              <span className="mt-2 block text-[2rem] italic theme-accent-gradient sm:text-4xl lg:text-[2.75rem]">
                Us?
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-theme-kicker sm:text-xs sm:tracking-[0.2em] lg:justify-self-end lg:text-right">
            The same standards of design, installation, and care across every
            state we serve.
          </p>
        </div>
      </ScrollReveal>

      <ol className="process-timeline-grid">
        {SERVICE_AREA_WHY_CHOOSE_US.map((item, index) => {
          const Icon = WHY_CHOOSE_ICONS[index] ?? Award;
          const stepNum = String(index + 1).padStart(2, "0");
          const split = splitDisplayTitle(item.title);
          const titlePrimary =
            split.mode === "default" ? split.primary : item.title;
          const titleAccent = split.mode === "default" ? split.accent : null;

          return (
            <li key={item.title} className="min-w-0">
              <ScrollReveal
                variant="fade-up"
                staggerIndex={index + 1}
                className="h-full"
              >
                <article className="process-step-card theme-card-border group relative flex h-full flex-col bg-theme-card p-8">
                  <div
                    className="pointer-events-none absolute -right-3 -top-4 font-serif text-7xl font-bold leading-none text-forest-dark/4 transition-colors duration-1000 ease-in-out group-hover:text-theme-accent/10 sm:text-8xl"
                    aria-hidden
                  >
                    {stepNum}
                  </div>

                  <div className="relative mb-7 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-theme-accent/12 transition-colors duration-1000 ease-in-out group-hover:bg-theme-accent/22">
                      <Icon
                        size={22}
                        strokeWidth={1.75}
                        className="text-theme-accent"
                        aria-hidden
                      />
                    </div>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-theme-accent">
                      Step {stepNum}
                    </span>
                  </div>

                  <h3 className="relative font-serif text-[26px] leading-tight text-forest-dark">
                    {titlePrimary}
                  </h3>
                  {titleAccent ? (
                    <div className="relative font-serif text-[26px] italic leading-tight text-theme-accent">
                      {titleAccent}
                    </div>
                  ) : null}

                  <p className="relative mt-5 font-sans text-[14px] font-light leading-[1.75] text-muted">
                    {item.text}
                  </p>

                  <div
                    className="relative mt-7 h-px w-10 bg-theme-accent transition-[width] duration-1000 ease-in-out group-hover:w-20"
                    aria-hidden
                  />
                </article>
              </ScrollReveal>
            </li>
          );
        })}
      </ol>
    </Container>
  </section>
);
