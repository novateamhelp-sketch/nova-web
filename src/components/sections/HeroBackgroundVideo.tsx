import { HERO_VIDEO_SRC } from "../../utils/heroMedia";
import { OLIVE, oliveMix } from "../../constants/olivePalette";

interface HeroBackgroundVideoProps {
  poster?: string;
}

export const HeroBackgroundVideo = ({ poster }: HeroBackgroundVideoProps) => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
    <video
      className="absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.15] object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>

    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to bottom, ${oliveMix(OLIVE.bgDeep, 60)} 0%, ${oliveMix(OLIVE.bgDeep, 25)} 28%, ${oliveMix(OLIVE.bgDeep, 33)} 72%, ${oliveMix(OLIVE.bgDeep, 90)} 100%)`,
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse 70% 55% at 50% 42%, transparent 0%, ${oliveMix(OLIVE.bgDeep, 40)} 100%)`,
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse 55% 40% at 50% 55%, ${oliveMix(OLIVE.oliveMid, 9)} 0%, transparent 70%)`,
      }}
    />
  </div>
);
