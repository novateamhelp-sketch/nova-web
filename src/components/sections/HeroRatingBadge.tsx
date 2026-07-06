import { Star } from "lucide-react";
import { OLIVE, oliveMix } from "../../constants/olivePalette";

export const HeroRatingBadge = ({ className = "" }: { className?: string }) => (
  <aside
    className={`w-full max-w-[16rem] shrink-0 rounded-xl border px-4 py-2.5 text-center shadow-md sm:max-w-[16.5rem] sm:px-5 sm:py-3 ${className}`}
    style={{
      borderColor: oliveMix(OLIVE.oliveMuted, 55),
      backgroundColor: oliveMix(OLIVE.bgDeep, 90),
    }}
  >
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={12}
            className="fill-olive-gold text-olive-gold"
            strokeWidth={0}
          />
        ))}
      </div>
      <p
        className="font-sans text-xs font-bold sm:text-[13px]"
        style={{ color: OLIVE.text }}
      >
        5.0 Star Rating
      </p>
    </div>
    <p
      className="mx-auto mt-1.5 max-w-[13rem] font-sans text-[10px] leading-snug sm:max-w-[14rem] sm:text-[11px]"
      style={{ color: oliveMix(OLIVE.text, 85) }}
    >
      Proudly illuminating luxury residences across New Jersey.
    </p>
  </aside>
);
