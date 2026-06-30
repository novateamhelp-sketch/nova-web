export type DisplayTitleSplit =
  | { mode: "default"; primary: string; accent: string | null }
  | { mode: "brand"; lead: string; linePrimary: string; accent: string };

export const splitDisplayTitle = (
  title: string,
  layout: "default" | "brand" = "default"
): DisplayTitleSplit => {
  const parts = title.trim().split(/\s+/);

  if (layout === "brand" && parts.length === 3) {
    return {
      mode: "brand",
      lead: parts[0],
      linePrimary: parts[1],
      accent: parts[2],
    };
  }

  if (parts.length < 2) {
    return { mode: "default", primary: title, accent: null };
  }

  const accent = parts.pop() ?? null;
  return { mode: "default", primary: parts.join(" "), accent };
};
