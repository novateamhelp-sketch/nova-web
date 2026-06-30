import type { Theme } from "../../context/ThemeContext";

type TransitionStep = 0 | 1 | 2;

interface ThemeTransitionOverlayProps {
  pendingTheme: Theme;
  step: TransitionStep;
}

export const ThemeTransitionOverlay = ({
  pendingTheme,
  step,
}: ThemeTransitionOverlayProps) => {
  const toLight = pendingTheme === "light";
  const bulbOn = toLight ? step >= 1 : step < 1;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-700 ${
        step === 2 ? "pointer-events-none opacity-0" : "opacity-100"
      } bg-black/60`}
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div
        className={`relative w-full max-w-sm overflow-visible rounded-[2.5rem] border p-8 text-center shadow-2xl transition-all duration-700 ${
          toLight
            ? "border-[#e8e4d3] bg-[#fbfaf7] text-[#061c14] shadow-amber-500/10"
            : "border-[#133528] bg-[#0b241b] text-[#f4f1ea] shadow-emerald-950/50"
        }`}
      >
        <div
          className={`absolute left-1/2 top-[-48px] h-12 w-[2px] -translate-x-1/2 animate-pulse rounded-full ${
            toLight ? "bg-[#cfa426]" : "bg-[#d4af37]"
          }`}
          aria-hidden
        />

        <div className="relative mb-8 mt-2 flex h-28 items-center justify-center animate-theme-bulb-float">
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[35px] transition-all duration-1000 ${
              bulbOn
                ? "h-44 w-44 scale-110 bg-amber-400/40"
                : toLight
                  ? "h-20 w-20 scale-95 bg-amber-500/10"
                  : "h-10 w-10 scale-50 bg-amber-900/5 opacity-0"
            }`}
            aria-hidden
          />

          <svg
            className={`relative z-10 h-24 w-24 transition-all duration-1000 ${
              bulbOn
                ? "scale-110 text-amber-500 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]"
                : toLight
                  ? "scale-95 text-gray-400 opacity-50"
                  : "scale-95 rotate-2 text-[#1c3f32]"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={bulbOn ? "rgba(251, 191, 36, 0.2)" : "none"}
              d="M12 3c-4.418 0-8 3.582-8 8 0 2.414 1.077 4.577 2.776 6.04C7.818 17.906 9 19.5 9 21h6c0-1.5 1.182-3.094 2.224-3.96C18.923 15.577 20 13.414 20 11c0-4.418-3.582-8-8-8z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 23h4" strokeWidth="1.5" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className={`transition-all duration-1000 ${
                bulbOn
                  ? "stroke-amber-300 opacity-100"
                  : toLight
                    ? "stroke-gray-500 opacity-30"
                    : "stroke-emerald-900 opacity-20"
              }`}
              d="M12 11v4M9 13h6M12 7c-1.5 0-2 1-2 2h4c0-1-.5-2-2-2z"
            />
            <g
              className={`transition-all duration-1000 ${
                bulbOn ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <line x1="12" y1="1" x2="12" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="4.93" y2="4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="2" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="4.93" y2="19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="19.78" y1="19.78" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="19.78" y1="4.22" x2="19.07" y2="4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>

          {step === 1 ? (
            <div
              className={`absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 ${
                toLight ? "border-amber-400" : "border-emerald-600"
              }`}
              style={{ animationDuration: "1.2s" }}
              aria-hidden
            />
          ) : null}
        </div>

        <div className="mx-auto max-w-xs">
          <h3 className="mb-1.5 font-serif text-xl font-light tracking-wide sm:text-2xl">
            {toLight ? "Illuminate" : "Dusk Mode"}
          </h3>
          <p
            className={`text-[11px] font-normal uppercase tracking-[0.2em] transition-colors duration-1000 ${
              toLight ? "text-gray-500" : "text-emerald-300/70"
            }`}
          >
            {toLight
              ? "Adjusting warm lighting..."
              : "Synchronizing evening ambiance..."}
          </p>

          <div
            className={`relative mx-auto mt-4 h-px w-24 overflow-hidden rounded-full ${
              toLight ? "bg-[#e2decb]" : "bg-[#1a382d]"
            }`}
          >
            <div
              className={`absolute left-0 top-0 h-full rounded-full ease-out ${
                toLight ? "bg-amber-500" : "bg-emerald-400"
              }`}
              style={{
                width: step === 0 ? "10%" : step === 1 ? "70%" : "100%",
                transitionDuration:
                  step === 0 ? "400ms" : step === 1 ? "1000ms" : "800ms",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
