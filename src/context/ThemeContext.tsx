import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ThemeTransitionOverlay } from "../components/ui/ThemeTransitionOverlay";
import { getSiteTheme } from "../services/public.service";
import { applySiteThemeTokens } from "../utils/applyThemeOverrides";

export type Theme = "light" | "dark";

type TransitionStep = 0 | 1 | 2;

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const STORAGE_KEY = "nova-theme";

const TRANSITION_MS = {
  bulbAction: 400,
  applyTheme: 1400,
  fadeOut: 2400,
  complete: 3000,
} as const;

const ThemeContext = createContext<ThemeContextValue | null>(null);

const readStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  const lightBg =
    getComputedStyle(document.documentElement).getPropertyValue("--theme-bg").trim() ||
    "#f8f6f0";
  const darkBg = "#09090b";
  meta?.setAttribute("content", theme === "dark" ? darkBg : lightBg);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState<TransitionStep>(0);
  const [pendingTheme, setPendingTheme] = useState<Theme | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    getSiteTheme()
      .then((payload) => {
        if (!cancelled) {
          applySiteThemeTokens(payload.tokens);
          applyTheme(readStoredTheme());
        }
      })
      .catch(() => {
        /* CSS file defaults remain active */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return;

    const next: Theme = theme === "light" ? "dark" : "light";
    clearTimeouts();

    setPendingTheme(next);
    setIsTransitioning(true);
    setTransitionStep(0);
    document.body.style.overflow = "hidden";

    timeoutsRef.current.push(
      window.setTimeout(() => setTransitionStep(1), TRANSITION_MS.bulbAction),
      window.setTimeout(() => {
        setTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
        document.documentElement.classList.add("theme-transition");
      }, TRANSITION_MS.applyTheme),
      window.setTimeout(() => setTransitionStep(2), TRANSITION_MS.fadeOut),
      window.setTimeout(() => {
        setIsTransitioning(false);
        setTransitionStep(0);
        setPendingTheme(null);
        document.body.style.overflow = "";
        document.documentElement.classList.remove("theme-transition");
      }, TRANSITION_MS.complete)
    );
  }, [theme, isTransitioning, clearTimeouts]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      {isTransitioning && pendingTheme ? (
        <ThemeTransitionOverlay
          pendingTheme={pendingTheme}
          step={transitionStep}
        />
      ) : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
