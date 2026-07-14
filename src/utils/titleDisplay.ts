export type DisplayTitleSplit =
  | { mode: "default"; primary: string; accent: string | null }
  | {
      mode: "brand";
      lead: string;
      linePrimary: string;
      accent: string;
      /** Glue lead+accent with no space (e.g. LumiScape) */
      compound?: boolean;
    };

const LUMISCAPE_COMPOUND = /^(Lumi)(Scape)$/i;

export const splitDisplayTitle = (
  title: string,
  layout: "default" | "brand" = "default"
): DisplayTitleSplit => {
  const trimmed = title.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);

  if (layout === "brand") {
    const compound = trimmed.match(LUMISCAPE_COMPOUND);
    if (compound) {
      return {
        mode: "brand",
        lead: compound[1],
        linePrimary: "",
        accent: compound[2],
        compound: true,
      };
    }

    if (parts.length === 3) {
      return {
        mode: "brand",
        lead: parts[0],
        linePrimary: parts[1],
        accent: parts[2],
      };
    }

    if (parts.length === 2) {
      return {
        mode: "brand",
        lead: parts[0],
        linePrimary: "",
        accent: parts[1],
      };
    }
  }

  if (parts.length < 2) {
    return { mode: "default", primary: trimmed, accent: null };
  }

  const accent = parts.pop() ?? null;
  return { mode: "default", primary: parts.join(" "), accent };
};
