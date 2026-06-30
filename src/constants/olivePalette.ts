/**
 * Olive palette — CSS variables defined in index.css :root
 *
 * Usage:
 *   CSS:  background: var(--olive-bg-deep);
 *   TW:   className="bg-olive-bg-deep text-olive-gold"
 *   TS:   style={{ color: OLIVE.bgDeep }}
 *   Alpha: oliveMix(OLIVE.bgDeep, 80)
 */
export const OLIVE = {
  bgDeep: "var(--olive-bg-deep)",
  bg: "var(--olive-bg)",
  oliveMuted: "var(--olive-muted)",
  oliveMid: "var(--olive-mid)",
  oliveVivid: "var(--olive-vivid)",
  gold: "var(--olive-gold)",
  text: "var(--olive-text)",
  glass: "var(--olive-glass)",
} as const;

/** Transparent mix — percent = opacity of the olive color (0–100). */
export const oliveMix = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

/** Labels for scenario panel — avoids raw filenames like banner3 */
export const HERO_SCENE_LABELS = [
  "Night Artistry",
  "Outdoor Elegance",
  "Architectural Glow",
] as const;

export const isAssetFilename = (value?: string | null): boolean => {
  if (!value?.trim()) return true;
  const v = value.trim();
  return (
    /^banner\d*$/i.test(v) ||
    /^image\d*$/i.test(v) ||
    /\.(jpg|jpeg|png|webp|gif)$/i.test(v)
  );
};
