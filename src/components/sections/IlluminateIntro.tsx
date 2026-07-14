import { Link } from "react-router-dom";
import { PencilRuler, Shield, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { ScrollReveal } from "../ui/ScrollReveal";
import { splitDisplayTitle } from "../../utils/titleDisplay";
import { renderSerifTitleText } from "../../utils/serifTitleText";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: PencilRuler,
    title: "Custom Light Artistry",
    description:
      "We don't just place light fixtures. We strategically design shadows, focal highlights, and depth parameters that accentuate your architecture's best angles.",
  },
  {
    icon: Shield,
    title: "Security & Safe Passage",
    description:
      "Beautiful properties should also be secure. Our path and entry fixtures offer seamless navigation and eliminate cold, unlit blind spots.",
  },
  {
    icon: Sprout,
    title: "Eco-Friendly Systems",
    description:
      "Deploying ultra-efficient smart LEDs, astronomical timers, and zone control that minimizes power waste without sacrificing dynamic brightness.",
  },
];

interface IlluminateIntroProps {
  /** Rounded panel that scrolls up over the pinned hero */
  scrollOver?: boolean;
  imageUrl?: string | null;
  imageAlt?: string;
}

export const IlluminateIntro = ({
  scrollOver = false,
  imageUrl,
  imageAlt = "Luxury home with professional outdoor lighting",
}: IlluminateIntroProps) => (
  <section
    className={`illuminate-intro relative overflow-hidden bg-theme-warm ${
      scrollOver ? "hero-scroll-over-panel" : ""
    }`}
  >
    <Container className="relative pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <ScrollReveal variant="slide-left" className="max-w-xl lg:max-w-none">
          <div className="mb-8 flex items-center gap-3 sm:mb-10">
            <span className="h-px w-10 shrink-0 bg-theme-accent" aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent sm:text-xs">
              About LumiScape · Since 2025
            </p>
          </div>

          <h2 className="font-serif font-bold leading-[1.04] tracking-tight text-forest-dark">
            <span className="block text-[2.35rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
              {renderSerifTitleText("Illuminate Your")}
            </span>
            <span className="mt-2 block text-[2.5rem] italic theme-accent-gradient sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
              Outdoors.
            </span>
          </h2>

          <p className="mt-7 max-w-lg font-sans text-sm font-medium leading-relaxed tracking-[0.02em] text-sage sm:mt-9 sm:text-base sm:leading-8">
            At{" "}
            <strong className="font-semibold text-forest-dark">
              LumiScape
            </strong>
            , we specialize in transforming ordinary landscape features into
            breathtaking, luxury environments. Our designs prioritize safety,
            elegant functionality, and high architectural harmony through custom,
            eco-friendly systems.
          </p>

          <div className="mt-8 sm:mt-9">
            <Link
              to="/projects"
              className="inline-flex min-h-11 items-center justify-center rounded-none bg-[var(--theme-btn-solid-bg)] px-8 py-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--theme-btn-solid-text)] transition hover:brightness-110"
            >
              View Projects
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="slide-right" className="w-full lg:justify-self-end">
          <div className="relative w-full p-4">
            <div
              className="pointer-events-none absolute -left-4 -top-4 z-0 h-32 w-32 border border-theme-accent/50"
              aria-hidden
            />
            <div className="relative z-10 overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="h-[min(22rem,72vw)] w-full object-cover sm:h-[26rem] lg:h-[520px]"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className="h-[min(22rem,72vw)] w-full bg-forest sm:h-[26rem] lg:h-[520px]"
                  role="img"
                  aria-label="Outdoor lighting showcase — image coming soon"
                />
              )}
            </div>
            <div
              className="pointer-events-none absolute -bottom-4 -right-4 z-0 h-32 w-32 border border-theme-accent/50"
              aria-hidden
            />
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {features.map(({ icon: Icon, title, description }, index) => {
          const split = splitDisplayTitle(title);
          const primary = split.mode === "default" ? split.primary : title;
          const accent = split.mode === "default" ? split.accent : null;

          return (
            <ScrollReveal
              key={title}
              variant="fade-up"
              staggerIndex={index + 1}
              className="h-full"
            >
              <article className="theme-card-border group relative h-full bg-theme-card p-8">
                <div className="mb-7 flex h-12 w-12 items-center justify-center bg-theme-accent/12 transition-colors group-hover:bg-theme-accent/22">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className="text-theme-accent"
                    aria-hidden
                  />
                </div>

                <h3 className="font-serif text-[26px] leading-tight text-forest-dark">
                  {renderSerifTitleText(primary)}
                </h3>
                {accent ? (
                  <div className="font-serif text-[26px] italic leading-tight text-theme-accent">
                    {renderSerifTitleText(accent)}
                  </div>
                ) : null}

                <p className="mt-5 font-sans text-[14px] font-light leading-[1.75] text-muted">
                  {description}
                </p>

                <div
                  className="mt-7 h-px w-10 bg-theme-accent transition-all duration-500 group-hover:w-20"
                  aria-hidden
                />
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </Container>
  </section>
);
