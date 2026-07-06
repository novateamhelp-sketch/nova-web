import { Leaf, Rainbow, Sun, Waves } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import {
  LIGHT_FIXTURES,
  LIGHTING_ZONES,
  zoneColor,
  type ColorableZoneId,
  type LightingPresetId,
  type LightingZoneId,
} from "./lightingZones.config";

interface LightingControlsPanelProps {
  zoneActive: (zoneId: LightingZoneId) => boolean;
  colors: Record<ColorableZoneId, string>;
  layoutEditMode: boolean;
  onLayoutEditModeChange: (value: boolean) => void;
  onResetLayout: () => void;
  onCopyLayout: () => void;
  onToggleZone: (zoneId: LightingZoneId) => void;
  selectedScene: LightingPresetId | null;
  onScene: (preset: LightingPresetId) => void;
  isLight?: boolean;
}

const SCENE_BUTTONS: {
  id: LightingPresetId;
  label: string;
  icon: typeof Waves;
}[] = [
  { id: "eco", label: "Eco Smart", icon: Leaf },
  { id: "party", label: "Party Evening", icon: Rainbow },
  { id: "pool", label: "Pool Lights", icon: Waves },
  { id: "full", label: "Full Glow", icon: Sun },
];

const ZONE_PANEL_LABELS: Record<LightingZoneId, string> = {
  house: "Facade Uplights",
  walkway: "Walkway Pathway",
  pool: "Pool Submersibles",
  garden: "Landscape & Trees",
};

const usePanelTokens = (isLight: boolean) => ({
  divider: isLight ? "border-theme-border-strong" : "border-white/10",
  muted: isLight ? "text-muted" : "text-olive-text/45",
  body: isLight ? "text-sage" : "text-olive-text/70",
  label: isLight ? "text-forest-dark" : "text-olive-text/90",
  panel: isLight
    ? "border border-theme-border-strong bg-theme-elevated"
    : "",
  chip: isLight
    ? "border border-theme-border-subtle bg-theme-elevated"
    : "border-white/12 bg-white/3",
  accent: isLight ? "text-theme-accent" : "text-olive-gold",
  accentBg: isLight ? "bg-theme-accent" : "bg-olive-gold",
  accentBorder: isLight ? "border-theme-accent" : "border-olive-gold",
  sectionTitle: isLight
    ? "font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent"
    : "font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-olive-gold",
});

const ToggleSwitch = ({
  active,
  onClick,
  label,
  isLight,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  isLight: boolean;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={active}
    aria-label={label}
    onClick={onClick}
    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
      active
        ? isLight
          ? "bg-theme-accent"
          : "bg-olive-gold"
        : isLight
          ? "bg-theme-border-strong"
          : "bg-white/15"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
        active ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export const LightingMasterDimmer = ({
  brightness,
  onBrightnessChange,
  isLight: isLightProp,
}: {
  brightness: number;
  onBrightnessChange: (value: number) => void;
  isLight?: boolean;
}) => {
  const { theme } = useTheme();
  const isLight = isLightProp ?? theme === "light";
  const { sectionTitle, muted, divider, panel, accent } = usePanelTokens(isLight);

  return (
    <div
      className={
        isLight
          ? `${panel} p-5 sm:p-6`
          : `border-t pt-6 ${divider}`
      }
    >
      <label
        htmlFor="lighting-brightness"
        className={`${sectionTitle} mb-4 block`}
      >
        Master Dimmer
      </label>
      <div className="flex items-center gap-3">
        <span className={`font-sans text-[10px] font-bold uppercase ${muted}`}>
          Low
        </span>
        <input
          id="lighting-brightness"
          type="range"
          min={20}
          max={100}
          value={brightness}
          onChange={(e) => onBrightnessChange(Number(e.target.value))}
          className={`lighting-dimmer-range flex-1 ${
            isLight ? "lighting-dimmer-range--light" : "lighting-dimmer-range--dark"
          }`}
        />
        <span className={`font-sans text-[10px] font-bold uppercase ${accent}`}>
          High
        </span>
      </div>
    </div>
  );
};

interface LightingSectionHeaderProps {
  onResetAll: () => void;
  isLight?: boolean;
}

export const LightingSectionHeader = ({
  onResetAll,
  isLight: isLightProp,
}: LightingSectionHeaderProps) => {
  const { theme } = useTheme();
  const isLight = isLightProp ?? theme === "light";
  const { accent, accentBg } = usePanelTokens(isLight);
  const resetBtn = isLight
    ? "text-muted hover:text-theme-accent"
    : "text-olive-text/50 hover:text-olive-gold";

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 sm:mb-8">
        <span className={`h-px w-10 shrink-0 ${accentBg}`} aria-hidden />
        <p className={`font-sans text-[11px] font-bold uppercase tracking-[0.22em] sm:text-xs ${accent}`}>
          Interactive Showroom
        </p>
      </div>

      <div className="flex items-end justify-between gap-4">
        <h2
          className={`font-serif text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
            isLight ? "text-forest-dark" : "text-olive-text"
          }`}
        >
          Control <span className={`italic ${accent}`}>Panel</span>
        </h2>
        <button
          type="button"
          onClick={onResetAll}
          className={`shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.16em] transition ${resetBtn}`}
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export const LightingControlsPanel = ({
  zoneActive,
  colors,
  layoutEditMode,
  onLayoutEditModeChange,
  onResetLayout,
  onCopyLayout,
  onToggleZone,
  selectedScene,
  onScene,
  isLight: isLightProp,
}: LightingControlsPanelProps) => {
  const { theme } = useTheme();
  const isLight = isLightProp ?? theme === "light";
  const { divider, muted, body, label, sectionTitle, panel, chip } =
    usePanelTokens(isLight);

  return (
    <div
      className={
        isLight
          ? `${panel} p-5 shadow-[0_8px_24px_rgba(42,42,40,0.08)] sm:p-6`
          : ""
      }
    >
      <div className="space-y-8">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className={sectionTitle}>Light Placement</h3>
            <div className="flex items-center gap-2">
              <span className={`font-sans text-[10px] font-bold uppercase tracking-wider ${muted}`}>
                {layoutEditMode ? "On" : "Off"}
              </span>
              <ToggleSwitch
                active={layoutEditMode}
                onClick={() => onLayoutEditModeChange(!layoutEditMode)}
                label="Toggle layout edit mode"
                isLight={isLight}
              />
            </div>
          </div>
          <p className={`font-sans text-xs font-light leading-relaxed ${body}`}>
            {layoutEditMode
              ? "Drag each marker on the canvas to reposition fixtures. Positions save in this browser."
              : "Click on the visual canvas to drop custom fixtures — enable placement mode first."}
          </p>
          {layoutEditMode ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onResetLayout}
                className={`border px-3 py-1.5 font-sans text-[11px] font-semibold transition ${
                  isLight
                    ? `${chip} text-sage hover:border-theme-accent/40 hover:text-theme-accent`
                    : "border-white/12 bg-white/3 text-olive-text/75 hover:border-olive-gold/40 hover:text-olive-gold"
                }`}
              >
                Reset positions
              </button>
              <button
                type="button"
                onClick={onCopyLayout}
                className={`border px-3 py-1.5 font-sans text-[11px] font-semibold transition ${
                  isLight
                    ? "border-theme-accent/35 bg-theme-accent/10 text-theme-accent hover:bg-theme-accent/20"
                    : "border-olive-gold/35 bg-olive-gold/10 text-olive-gold hover:bg-olive-gold/20"
                }`}
              >
                Copy coordinates
              </button>
            </div>
          ) : null}
        </div>

        <div className={`border-t pt-8 ${divider}`}>
          <h3 className={`${sectionTitle} mb-4`}>Preset Scenes</h3>
          <div className="grid grid-cols-2 gap-2">
            {SCENE_BUTTONS.map(({ id, label: sceneLabel, icon: Icon }) => {
              const selected = selectedScene === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onScene(id)}
                  className={`flex items-center justify-center gap-1.5 border px-3 py-2.5 font-sans text-[11px] font-semibold transition duration-200 ${
                    selected
                      ? isLight
                        ? "border-theme-accent bg-theme-accent text-theme-btn-solid-text"
                        : "border-olive-gold bg-olive-gold text-[#1a1208]"
                      : isLight
                        ? `${chip} text-sage hover:border-theme-accent/40 hover:text-forest-dark`
                        : "border-white/12 bg-white/3 text-olive-text/80 hover:border-olive-gold/40 hover:text-olive-text"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} />
                  {sceneLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`border-t pt-8 ${divider}`}>
          <h3 className={`${sectionTitle} mb-4`}>Lighting Zones</h3>
          <div className="space-y-2">
            {LIGHTING_ZONES.map((zone) => {
              const active = zoneActive(zone.id);
              const count = LIGHT_FIXTURES.filter((f) => f.zoneId === zone.id).length;
              const dotColor = zoneColor(zone.id, colors);

              return (
                <div
                  key={zone.id}
                  className={`group flex items-center justify-between gap-3 border px-3 py-3 transition-colors duration-300 ${
                    isLight
                      ? `${chip} hover:border-theme-accent/35`
                      : "border-white/10 bg-white/3 hover:border-olive-gold/35"
                  }`}
                >
                  <div className="min-w-0">
                    <span
                      className={`block font-sans text-sm font-semibold leading-snug ${label}`}
                    >
                      {ZONE_PANEL_LABELS[zone.id]}
                    </span>
                    <span className={`block font-sans text-[10px] font-light ${muted}`}>
                      {count} fixtures
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/15"
                      style={{ backgroundColor: dotColor }}
                      aria-hidden
                    />
                    <ToggleSwitch
                      active={active}
                      onClick={() => onToggleZone(zone.id)}
                      label={`Toggle ${zone.label}`}
                      isLight={isLight}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
