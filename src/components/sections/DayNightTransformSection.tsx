import type { GalleryItem } from "../../types/api.types";
import { OLIVE, oliveMix } from "../../constants/olivePalette";
import { Container } from "../ui/Container";
import { ParallaxBackground } from "../ui/ParallaxBackground";
import { ScrollReveal } from "../ui/ScrollReveal";
import { DayNightCompareSlider } from "../gallery/DayNightCompareSlider";

interface DayNightTransformSectionProps {
  item: GalleryItem;
  backgroundImageUrl?: string | null;
}

const STATS = [
  {
    value: "100%",
    label: "Weatherproof solid-brass fixtures",
  },
  {
    value: "Low-Voltage",
    label: "Safe 12V operation and smart transformers",
  },
] as const;

export const DayNightTransformSection = ({
  item,
  backgroundImageUrl,
}: DayNightTransformSectionProps) => (
  <section
    className="relative overflow-hidden border-t border-white/10 py-20 text-olive-text sm:py-24 lg:py-28 xl:py-32"
    style={{ backgroundColor: "var(--olive-bg-deep)" }}
  >
    <div
      className="day-night-section__glow pointer-events-none absolute inset-0"
      aria-hidden
    />

    {backgroundImageUrl ? (
      <ParallaxBackground
        imageUrl={backgroundImageUrl}
        overlay="var(--day-night-parallax-overlay)"
        opacity={0.5}
        className="mix-blend-screen"
      />
    ) : null}

    <div
      className="day-night-section__vignette pointer-events-none absolute inset-0"
      aria-hidden
    />

    <Container className="relative z-10">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <ScrollReveal variant="slide-left" className="max-w-xl lg:max-w-none">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="h-px w-10 shrink-0 bg-olive-gold" aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-olive-gold sm:text-xs">
              Day &amp; Night Transformations
            </p>
          </div>

          <h2 className="font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-olive-text sm:text-4xl lg:text-[2.75rem]">
            <span className="block">Witness the</span>
            <span className="mt-1.5 block">
              <span className="italic text-olive-gold">Dramatic</span> Transition
            </span>
          </h2>

          <p
            className="mt-5 font-sans text-sm font-medium leading-relaxed tracking-[0.03em] sm:text-[1.05rem] sm:leading-7"
            style={{ color: oliveMix(OLIVE.text, 88) }}
          >
            Use our interactive visual slider to drag left and right to reveal
            the astonishing difference between daytime landscape shadows and our
            exquisite architectural lighting designs.
          </p>

          <div
            className="mt-10 border-t pt-8"
            style={{ borderColor: oliveMix(OLIVE.gold, 27) }}
          >
            <div className="grid gap-8 sm:grid-cols-2">
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <p className="font-serif text-3xl font-bold leading-none text-olive-gold sm:text-4xl">
                    {stat.value}
                  </p>
                  <p
                    className="mt-3 font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.18em] sm:text-xs sm:tracking-[0.2em]"
                    style={{ color: oliveMix(OLIVE.text, 90) }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="slide-right" className="w-full">
          <DayNightCompareSlider
            item={item}
            className="shadow-[0_24px_56px_rgba(0,0,0,0.42)] ring-1 ring-olive-gold/28"
          />
        </ScrollReveal>
      </div>
    </Container>
  </section>
);
