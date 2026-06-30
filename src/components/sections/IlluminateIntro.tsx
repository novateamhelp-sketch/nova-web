import { Leaf, PencilRuler, Shield, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { OLIVE, oliveMix } from "../../constants/olivePalette";
import { Container } from "../ui/Container";
import { DisplayTitle } from "../ui/DisplayTitle";
import { ScrollReveal } from "../ui/ScrollReveal";

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

const SECTION_BG = `linear-gradient(180deg, #ffffff 0%, #fafafa 28%, #f3f3f3 52%, #ececec 78%, #e2e2e2 100%)`;

interface IlluminateIntroProps {
  /** Rounded panel that scrolls up over the pinned hero */
  scrollOver?: boolean;
}

export const IlluminateIntro = ({ scrollOver = false }: IlluminateIntroProps) => (
  <section
    className={`relative overflow-hidden ${scrollOver ? "hero-scroll-over-panel" : ""}`}
    style={{ background: SECTION_BG }}
  >
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(255,255,255,0.65) 0%, transparent 55%)",
      }}
      aria-hidden
    />

    <Container className="relative pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-24">
      <ScrollReveal variant="fade-up" className="mx-auto max-w-3xl text-center">
        <Leaf
          size={28}
          strokeWidth={2}
          className="mx-auto mb-5 text-olive-gold sm:mb-6"
          aria-hidden
        />
        <DisplayTitle title="Illuminate Your Outdoors" />
        <div
          className="mx-auto mt-5 h-1 w-16 rounded-full bg-gold sm:mt-6"
          aria-hidden
        />
        <p className="text-body mx-auto mt-8 max-w-2xl font-sans text-sm font-medium leading-relaxed tracking-[0.03em] sm:mt-10 sm:text-base sm:leading-7">
          At{" "}
          <strong className="font-semibold text-forest-dark">
            Nova Outdoor Lighting
          </strong>
          , we specialize in transforming ordinary landscape features into
          breathtaking, luxury environments. Our designs prioritize safety,
          elegant functionality, and high architectural harmony through custom,
          eco-friendly systems.
        </p>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {features.map(({ icon: Icon, title, description }, index) => (
          <ScrollReveal
            key={title}
            variant="fade-up"
            staggerIndex={index + 1}
            className="h-full"
          >
            <article className="group h-full rounded-2xl border border-border/80 bg-white p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-olive-gold hover:shadow-card-hover sm:p-8">
            <div
              className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-olive-gold/12"
              style={{ backgroundColor: oliveMix(OLIVE.gold, 12) }}
            >
              <Icon
                size={22}
                strokeWidth={1.75}
                className="text-olive-gold"
                aria-hidden
              />
            </div>
            <DisplayTitle as="h3" size="card" title={title} />
            <p className="text-body mt-3 font-sans text-sm font-medium leading-relaxed tracking-[0.03em]">
              {description}
            </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </section>
);
