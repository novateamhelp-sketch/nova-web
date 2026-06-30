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
import { DisplayTitle } from "../ui/DisplayTitle";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionTitle } from "../ui/SectionTitle";

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
    className={`relative overflow-hidden bg-surface py-16 text-forest-dark sm:py-20 lg:py-24 ${
      riseAfterDark ? "home-rise-after-dark" : ""
    }`}
  >
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,162,39,0.05) 0%, transparent 58%)",
      }}
      aria-hidden
    />

    <Container className="relative">
      <ScrollReveal variant="fade-up">
        <SectionTitle
          align="center"
          eyebrow="Our Process"
          title="From consultation to completion"
          subtitle="A straightforward process designed around your property and schedule."
          className="[&_.eyebrow]:text-gold"
        />
      </ScrollReveal>

      <ol className="process-timeline-grid mt-12 sm:mt-14 lg:mt-16">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const stepNum = String(index + 1).padStart(2, "0");

          return (
            <li key={step.title} className="min-w-0">
              <ScrollReveal
                variant="fade-up"
                staggerIndex={index + 1}
                className="h-full"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-card-hover sm:p-7">
                  <div
                    className="pointer-events-none absolute -right-3 -top-4 font-serif text-7xl font-bold leading-none text-forest-dark/4 transition-colors duration-300 group-hover:text-gold/10 sm:text-8xl"
                    aria-hidden
                  >
                    {stepNum}
                  </div>

                  <div className="relative mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/20 transition-colors duration-300 group-hover:bg-gold/15">
                      <Icon
                        size={22}
                        strokeWidth={1.75}
                        className="text-gold-dark"
                        aria-hidden
                      />
                    </div>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">
                      Step {stepNum}
                    </span>
                  </div>

                  <DisplayTitle as="h3" size="card" title={step.title} />

                  <p className="text-body relative mt-3 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  <div
                    className="mt-6 h-0.5 w-10 rounded-full bg-gold/40 transition-all duration-300 group-hover:w-14 group-hover:bg-gold"
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
