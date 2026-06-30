import { Lightbulb } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const TOOLTIP = "Press the bulb — watch the magic unfold";

export const ThemeToggle = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={isTransitioning}
      aria-label={isLight ? "Turn lights off (dark mode)" : "Turn lights on (light mode)"}
      aria-busy={isTransitioning}
      className="theme-toggle group relative flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-gold shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] transition-all duration-300 hover:border-gold/55 hover:bg-gold/25 hover:shadow-[0_0_18px_rgb(201_162_39/0.4)] disabled:pointer-events-none disabled:opacity-70"
    >
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-50 mt-2.5 w-max max-w-[13rem] translate-y-1 rounded-lg border border-gold/30 bg-forest-dark px-3 py-2 text-center text-[11px] font-medium leading-snug text-white/90 opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {TOOLTIP}
        <span
          className="absolute -top-1 right-3.5 h-2 w-2 rotate-45 border-l border-t border-gold/30 bg-forest-dark"
          aria-hidden
        />
      </span>
      <span
        className={`theme-toggle-glow pointer-events-none absolute inset-1 rounded-lg transition-opacity duration-300 ${
          isLight ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
      {!isLight && !isTransitioning ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
        </span>
      ) : null}
      <Lightbulb
        size={20}
        strokeWidth={1.75}
        className={`relative z-10 text-white/45 transition-all duration-300 group-hover:text-white/70 ${
          isTransitioning
            ? "animate-theme-bulb-wiggle text-gold"
            : "group-hover:scale-110 group-hover:-rotate-6"
        }`}
        aria-hidden
      />
    </button>
  );
};
