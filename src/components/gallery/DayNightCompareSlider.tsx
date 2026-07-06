import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { GalleryItem } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";

interface DayNightCompareSliderProps {
  item: GalleryItem;
  className?: string;
}

export const DayNightCompareSlider = ({
  item,
  className = "",
}: DayNightCompareSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  const dayUrl = cloudinaryUrl(item.dayImage, { width: 1400 });
  const nightUrl = cloudinaryUrl(item.nightImage, { width: 1400 });
  const nightReveal = 100 - position;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateWidth = () => setTrackWidth(track.offsetWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={trackRef}
      className={`relative aspect-[16/10] w-full select-none overflow-hidden bg-olive-bg-deep ${
        dragging ? "cursor-ew-resize" : ""
      } ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-label="Compare day and night lighting"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {dayUrl ? (
        <img
          src={dayUrl}
          alt={item.dayImage.alt || `${item.title} — day`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : null}

      <div
        className="absolute inset-y-0 right-0 overflow-hidden"
        style={{ width: `${nightReveal}%` }}
      >
        {nightUrl ? (
          <img
            src={nightUrl}
            alt={item.nightImage.alt || `${item.title} — night`}
            className="absolute right-0 top-0 h-full max-w-none object-cover"
            style={{ width: trackWidth || "100%" }}
            draggable={false}
          />
        ) : null}
      </div>

      <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-olive-bg/92 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-olive-text sm:text-[11px]">
        Daytime Original
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-olive-gold/55 bg-olive-bg-deep/88 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-olive-gold sm:text-[11px]">
        Nova Night Artistry
      </span>

      <div
        className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-olive-gold shadow-[0_0_16px_color-mix(in_srgb,var(--olive-gold)_55%,transparent)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-olive-gold bg-olive-text text-olive-bg shadow-[0_4px_20px_rgba(0,0,0,0.38)]">
          <ChevronsLeftRight size={18} strokeWidth={2.25} aria-hidden />
        </div>
      </div>
    </div>
  );
};
