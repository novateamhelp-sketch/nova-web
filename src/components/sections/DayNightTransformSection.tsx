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

/** Vivid glow concentrated behind slider; dark on text side */
const SECTION_GRADIENT = `radial-gradient(ellipse 62% 92% at 74% 44%, ${OLIVE.oliveVivid} 0%, ${OLIVE.oliveMid} 14%, ${OLIVE.oliveMuted} 34%, ${OLIVE.bg} 58%, ${OLIVE.bgDeep} 100%)`;

const SECTION_VIGNETTE =
  "radial-gradient(ellipse 128% 112% at 50% 50%, transparent 30%, rgba(18,20,12,0.38) 100%)";

export const DayNightTransformSection = ({
  item,
  backgroundImageUrl,
}: DayNightTransformSectionProps) => (
  <section
    className="relative overflow-hidden py-16 sm:py-20 lg:py-24 xl:pb-28"
    style={{ backgroundColor: OLIVE.bgDeep }}
  >
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: SECTION_GRADIENT }}
      aria-hidden
    />

    {backgroundImageUrl ? (
      <ParallaxBackground
        imageUrl={backgroundImageUrl}
        overlay={`linear-gradient(rgba(10, 14, 8, 0.45), rgba(10, 14, 8, 0.72))`}
        opacity={0.5}
        className="mix-blend-screen"
      />
    ) : null}

    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: SECTION_VIGNETTE }}
      aria-hidden
    />

    <Container className="relative">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <ScrollReveal variant="slide-left" className="max-w-xl lg:max-w-none">
          <p
            className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.28em] sm:text-sm"
            style={{ color: OLIVE.gold }}
          >
            Day &amp; Night Transformations
          </p>

          <h2 className="font-serif text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="block" style={{ color: OLIVE.text }}>
              Witness the
            </span>
            <span className="mt-1.5 block">
              <span style={{ color: OLIVE.gold }}>Dramatic </span>
              <span style={{ color: OLIVE.text }}>Transition</span>
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
                  <p
                    className="font-serif text-3xl font-bold leading-none sm:text-4xl"
                    style={{ color: OLIVE.gold }}
                  >
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
