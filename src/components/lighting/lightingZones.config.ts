export type LightingZoneId = "house" | "walkway" | "pool" | "garden";

export type ColorableZoneId = "walkway" | "pool";

export interface LightFixture {
  id: string;
  zoneId: LightingZoneId;
  top: string;
  left: string;
  /** Glow radius as % of container width */
  spread: number;
  direction?: "up" | "down";
}

export interface LightingZoneConfig {
  id: LightingZoneId;
  label: string;
  subtitle: string;
  defaultColor: string;
  colorable: boolean;
  watts: number;
}

export const SHOWROOM_IMAGE_FALLBACK = "/showroom/house-showroom.webp";

export const FIXTURE_LAYOUT_STORAGE_KEY = "nova-interactive-light-layout";

/** Base image lift per individual light turned on */
export const BRIGHTNESS_LIFT_PER_LIGHT = 0.016;

/** Pasillos — rosado / fuchsia */
export const WALKWAY_LIGHT_COLOR = "#e879f9";
/** Piscina — celeste / cyan */
export const POOL_LIGHT_COLOR = "#22d3ee";

/**
 * Positions mapped from the user's reference markup on the house photo.
 * Yellow ×5 · Green ×2 · Pink ×2 · Cyan ×3
 */
export const LIGHT_FIXTURES: LightFixture[] = [
  // Yellow — bajo aleros / fachada (referencia usuario)
  { id: "house-1", zoneId: "house", top: "23%", left: "7%", spread: 11, direction: "down" },
  { id: "house-2", zoneId: "house", top: "20%", left: "16%", spread: 10, direction: "down" },
  { id: "house-3", zoneId: "house", top: "19%", left: "28%", spread: 10, direction: "down" },
  { id: "house-4", zoneId: "house", top: "20%", left: "53%", spread: 10, direction: "down" },
  { id: "house-5", zoneId: "house", top: "31%", left: "69%", spread: 9, direction: "down" },
  // Green — arbustos delanteros
  { id: "garden-1", zoneId: "garden", top: "79%", left: "9%", spread: 13, direction: "up" },
  { id: "garden-2", zoneId: "garden", top: "77%", left: "26%", spread: 12, direction: "up" },
  // Rosado — escalones y pasillo
  { id: "walkway-1", zoneId: "walkway", top: "71%", left: "37%", spread: 10, direction: "up" },
  { id: "walkway-2", zoneId: "walkway", top: "83%", left: "48%", spread: 11, direction: "up" },
  // Celeste — dentro de la piscina
  { id: "pool-1", zoneId: "pool", top: "70%", left: "58%", spread: 13 },
  { id: "pool-2", zoneId: "pool", top: "78%", left: "66%", spread: 14 },
  { id: "pool-3", zoneId: "pool", top: "87%", left: "74%", spread: 13 },
];

export const LIGHTING_ZONES: LightingZoneConfig[] = [
  {
    id: "house",
    label: "House accent lights",
    subtitle: "5 warm fixtures on the facade",
    defaultColor: "#fef08a",
    colorable: false,
    watts: 45,
  },
  {
    id: "walkway",
    label: "Walkways & steps",
    subtitle: "Path and step lighting",
    defaultColor: WALKWAY_LIGHT_COLOR,
    colorable: true,
    watts: 30,
  },
  {
    id: "pool",
    label: "Pool & water",
    subtitle: "Submersible RGBW LEDs",
    defaultColor: POOL_LIGHT_COLOR,
    colorable: true,
    watts: 60,
  },
  {
    id: "garden",
    label: "Garden & shrubs",
    subtitle: "Landscape accent lights",
    defaultColor: "#4ade80",
    colorable: false,
    watts: 40,
  },
];

export type LightingPresetId = "pool" | "eco" | "party" | "full";

const presetFixtures = (zoneFlags: Record<LightingZoneId, boolean>) => {
  const state: Record<string, boolean> = {};
  for (const fixture of LIGHT_FIXTURES) {
    state[fixture.id] = zoneFlags[fixture.zoneId];
  }
  return state;
};

export const LIGHTING_PRESETS: Record<
  LightingPresetId,
  {
    fixtures: Record<string, boolean>;
    colors?: Partial<Record<ColorableZoneId, string>>;
  }
> = {
  pool: {
    fixtures: presetFixtures({
      house: false,
      walkway: false,
      pool: true,
      garden: false,
    }),
    colors: { walkway: WALKWAY_LIGHT_COLOR, pool: POOL_LIGHT_COLOR },
  },
  eco: {
    fixtures: presetFixtures({
      house: false,
      walkway: true,
      pool: false,
      garden: true,
    }),
    colors: { walkway: "#fbbf24", pool: POOL_LIGHT_COLOR },
  },
  party: {
    fixtures: presetFixtures({
      house: true,
      walkway: true,
      pool: true,
      garden: true,
    }),
    colors: { walkway: WALKWAY_LIGHT_COLOR, pool: POOL_LIGHT_COLOR },
  },
  full: {
    fixtures: presetFixtures({
      house: true,
      walkway: true,
      pool: true,
      garden: true,
    }),
    colors: { walkway: WALKWAY_LIGHT_COLOR, pool: POOL_LIGHT_COLOR },
  },
};

export const defaultFixtureState = (): Record<string, boolean> => {
  const state: Record<string, boolean> = {};
  for (const fixture of LIGHT_FIXTURES) {
    state[fixture.id] = false;
  }
  return state;
};

export const defaultColorState = (): Record<ColorableZoneId, string> => ({
  walkway: WALKWAY_LIGHT_COLOR,
  pool: POOL_LIGHT_COLOR,
});

export const zoneFixtures = (zoneId: LightingZoneId) =>
  LIGHT_FIXTURES.filter((f) => f.zoneId === zoneId);

export const isZoneActive = (
  zoneId: LightingZoneId,
  fixtures: Record<string, boolean>
) => zoneFixtures(zoneId).some((f) => fixtures[f.id]);

export const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const num = Number.parseInt(value, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

export const colorWithAlpha = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const zoneColor = (
  zoneId: LightingZoneId,
  colors: Record<ColorableZoneId, string>
) => {
  const zone = LIGHTING_ZONES.find((z) => z.id === zoneId);
  if (!zone) return "#ffffff";
  if (zone.colorable) return colors[zone.id as ColorableZoneId];
  return zone.defaultColor;
};
