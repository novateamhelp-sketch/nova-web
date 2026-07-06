const STYLE_ID = "nova-theme-overrides";

const tokensToCssBlock = (
  selector: string,
  tokens: Record<string, string>
): string => {
  const lines = Object.entries(tokens)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
  return `${selector} {\n${lines}\n}`;
};

export const applySiteThemeTokens = (payload: {
  light: Record<string, string>;
  dark: Record<string, string>;
}) => {
  if (typeof document === "undefined") return;

  const css = [
    tokensToCssBlock(":root, [data-theme=\"light\"]", payload.light),
    tokensToCssBlock("[data-theme=\"dark\"]", payload.dark),
  ].join("\n\n");

  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = css;
};

export const clearSiteThemeOverrides = () => {
  document.getElementById(STYLE_ID)?.remove();
};
