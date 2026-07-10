import {
  Calculator,
  Footprints,
  Hammer,
  Mail,
  MoonStar,
  PencilRuler,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { ScrollReveal } from "../ui/ScrollReveal";
import { splitDisplayTitle } from "../../utils/titleDisplay";
import { renderSerifTitleText } from "../../utils/serifTitleText";

interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    icon: Mail,
    title: "Contact Us",
    description: "Reach out via email, phone, or contact form.",
  },
  {
    icon: Footprints,
    title: "On-Site Walkthrough",
    description: "We visit your property and discuss ideas.",
  },
  {
    icon: PencilRuler,
    title: "Design Proposal",
    description: "We craft a custom design for your space.",
  },
  {
    icon: Calculator,
    title: "Estimate & Budget",
    description: "We provide a clear, detailed estimate.",
  },
  {
    icon: Hammer,
    title: "Installation",
    description: "Our team gets to work with precision.",
  },
  {
    icon: MoonStar,
    title: "Night Adjustment",
    description: "We fine-tune lighting for perfect ambiance.",
  },
];

export const ProcessTimeline = ({
  riseAfterDark = false,
}: {
  riseAfterDark?: boolean;
}) => (
  <section
    className={`relative overflow-hidden bg-theme-elevated py-16 text-forest-dark sm:py-20 lg:py-24 ${
      riseAfterDark ? "home-rise-after-dark" : ""
    }`}
  >
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
                Our Process
              </p>
            </div>

            <h2 className="font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-forest-dark sm:text-4xl lg:text-[2.75rem]">
              From consultation to{" "}
              <span className="italic text-theme-accent">completion</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-theme-kicker sm:text-xs sm:tracking-[0.2em] lg:justify-self-end lg:text-right">
            A straightforward process designed around your property and schedule.
          </p>
        </div>
      </ScrollReveal>

      <ol className="process-timeline-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const stepNum = String(index + 1).padStart(2, "0");
          const split = splitDisplayTitle(step.title);
          const titlePrimary =
            split.mode === "default" ? split.primary : step.title;
          const titleAccent = split.mode === "default" ? split.accent : null;

          return (
            <li key={step.title} className="min-w-0">
              <ScrollReveal
                variant="fade-up"
                staggerIndex={index + 1}
                className="h-full"
              >
                <article className="process-step-card theme-card-border group relative flex h-full flex-col bg-theme-card p-8">
                  <span className="process-step-card__number" aria-hidden>
                    {stepNum}
                  </span>

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
                    {renderSerifTitleText(titlePrimary)}
                  </h3>
                  {titleAccent ? (
                    <div className="relative font-serif text-[26px] italic leading-tight text-theme-accent">
                      {renderSerifTitleText(titleAccent)}
                    </div>
                  ) : null}

                  <p className="relative mt-5 font-sans text-[14px] font-light leading-[1.75] text-muted">
                    {step.description}
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
