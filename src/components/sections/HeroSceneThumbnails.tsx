import { OLIVE, oliveMix } from "../../constants/olivePalette";
import type { HeroSlide } from "../../utils/heroMedia";

interface HeroSceneThumbnailsProps {
  slides: HeroSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
  align?: "center" | "end";
}

export const HeroSceneThumbnails = ({
  slides,
  activeIndex,
  onSelect,
  className = "",
  align = "end",
}: HeroSceneThumbnailsProps) => (
  <div
    className={`flex flex-col gap-1.5 ${align === "center" ? "items-center" : "items-end"} ${className}`}
  >
    <p
      className="font-sans text-[7px] font-semibold uppercase tracking-[0.22em] sm:text-[8px]"
      style={{ color: oliveMix(OLIVE.text, 80) }}
    >
      Explore Scenarios
    </p>

    <div
      className="flex gap-1.5 rounded-lg border p-1.5 sm:gap-2 sm:p-2"
      style={{
        borderColor: oliveMix(OLIVE.oliveMuted, 50),
        backgroundColor: oliveMix(OLIVE.bgDeep, 53),
      }}
    >
      {slides.map((slide, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`View scene ${index + 1}: ${slide.alt}`}
            aria-current={isActive ? "true" : undefined}
            className={`relative h-10 w-[3.5rem] shrink-0 overflow-hidden rounded-md transition-all duration-300 sm:h-11 sm:w-[4rem] lg:h-12 lg:w-[4.5rem] ${
              isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
            }`}
            style={
              isActive
                ? {
                    boxShadow: `0 0 0 2px ${OLIVE.gold}, 0 0 0 3px ${OLIVE.bg}`,
                  }
                : undefined
            }
          >
            <img
              src={slide.thumbSrc}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 py-0.5 font-sans text-[8px] font-bold leading-none sm:text-[9px]" style={{ color: OLIVE.text }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);
