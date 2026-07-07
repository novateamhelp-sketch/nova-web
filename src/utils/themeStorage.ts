export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "nova-theme";

/** Per-browser preference — not shared with other visitors. */
export const readStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
};

export const writeStoredTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const applyDocumentTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;

  document.documentElement.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  const lightBg =
    getComputedStyle(document.documentElement).getPropertyValue("--theme-bg").trim() ||
    "#f8f6f0";
  const darkBg = "#09090b";
  meta?.setAttribute("content", theme === "dark" ? darkBg : lightBg);
};
