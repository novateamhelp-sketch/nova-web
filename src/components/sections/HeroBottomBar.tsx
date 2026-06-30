import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { OLIVE } from "../../constants/olivePalette";

interface HeroBottomBarProps {
  onPrev: () => void;
  onNext: () => void;
  showNav?: boolean;
  className?: string;
}

export const HeroBottomBar = ({
  onPrev,
  onNext,
  showNav = true,
  className = "",
}: HeroBottomBarProps) => (
  <div
    className={`mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between ${className}`}
  >
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className="fill-[#d4b45c] text-[#d4b45c]"
            strokeWidth={0}
          />
        ))}
      </div>
      <p
        className="font-sans text-xs font-semibold sm:text-[13px]"
        style={{ color: OLIVE.text }}
      >
        5.0 Star Rating
        <span className="mx-2 opacity-40" aria-hidden>
          •
        </span>
        <span className="font-medium opacity-85">
          Proudly illuminating luxury residences across New Jersey.
        </span>
      </p>
    </div>

    {showNav ? (
      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous scenario"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-olive-muted/70 bg-olive-bg-deep/80 text-olive-text transition hover:border-olive-gold/50 hover:text-olive-gold"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next scenario"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-olive-muted/70 bg-olive-bg-deep/80 text-olive-text transition hover:border-olive-gold/50 hover:text-olive-gold"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    ) : null}
  </div>
);
