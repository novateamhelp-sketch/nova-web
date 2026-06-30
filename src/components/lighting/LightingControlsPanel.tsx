import { Leaf, Rainbow, Sun, Waves } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { DisplayTitle } from "../ui/DisplayTitle";
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
  brightness: number;
  layoutEditMode: boolean;
  onLayoutEditModeChange: (value: boolean) => void;
  onResetLayout: () => void;
  onCopyLayout: () => void;
  onToggleZone: (zoneId: LightingZoneId) => void;
  onColorChange: (zoneId: ColorableZoneId, color: string) => void;
  selectedScene: LightingPresetId | null;
  onScene: (preset: LightingPresetId) => void;
  onResetAll: () => void;
  onBrightnessChange: (value: number) => void;
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

const sectionTitleClass =
  "text-[10px] font-bold uppercase tracking-[0.2em] text-gold";

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
      active ? "bg-gold" : isLight ? "bg-[#c8c8c4]" : "bg-white/15"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
        active ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export const LightingControlsPanel = ({
  zoneActive,
  colors,
  brightness,
  layoutEditMode,
  onLayoutEditModeChange,
  onResetLayout,
  onCopyLayout,
  onToggleZone,
  onColorChange,
  selectedScene,
  onScene,
  onResetAll,
  onBrightnessChange,
}: LightingControlsPanelProps) => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const divider = isLight ? "border-[#d8d8d4]" : "border-white/10";
  const muted = isLight ? "text-[#6e6e6a]" : "text-white/45";
  const body = isLight ? "text-[#5e5e5a]" : "text-white/70";
  const label = isLight ? "text-[#2a2a28]" : "text-white/90";
  const resetBtn = isLight
    ? "text-[#6e6e6a] hover:text-gold"
    : "text-white/50 hover:text-gold";

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 lg:rounded-3xl ${
        isLight
          ? "border-[#d8d8d4] bg-[#f2f2f0] shadow-[0_8px_24px_rgba(42,42,40,0.08)]"
          : "border-white/15 bg-forest/35 shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm"
      }`}
    >
      <div className={`mb-6 flex items-center justify-between gap-4 border-b pb-5 ${divider}`}>
        <DisplayTitle
          as="h2"
          size="card"
          title="Control Panel"
          light={!isLight}
        />
        <button
          type="button"
          onClick={onResetAll}
          className={`text-[10px] font-bold uppercase tracking-[0.16em] transition ${resetBtn}`}
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className={sectionTitleClass}>Light Placement</h3>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${muted}`}>
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
          <p className={`text-xs leading-relaxed ${body}`}>
            {layoutEditMode
              ? "Drag each marker on the canvas to reposition fixtures. Positions save in this browser."
              : "Click on the visual canvas to drop custom fixtures — enable placement mode first."}
          </p>
          {layoutEditMode ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onResetLayout}
                className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition hover:border-gold/40 hover:text-gold ${
                  isLight
                    ? "border-[#d0d0cc] bg-[#f8f8f6] text-[#5e5e5a]"
                    : "border-white/15 bg-white/5 text-white/70"
                }`}
              >
                Reset positions
              </button>
              <button
                type="button"
                onClick={onCopyLayout}
                className="rounded-lg border border-gold/35 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold text-gold transition hover:bg-gold/20"
              >
                Copy coordinates
              </button>
            </div>
          ) : null}
        </div>

        <div className={`border-t pt-6 ${divider}`}>
          <h3 className={`${sectionTitleClass} mb-3`}>Preset Scenes</h3>
          <div className="grid grid-cols-2 gap-2">
            {SCENE_BUTTONS.map(({ id, label: sceneLabel, icon: Icon }) => {
              const selected = selectedScene === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onScene(id)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-[11px] font-semibold transition duration-200 ${
                    selected
                      ? "border-gold bg-gold text-forest-dark"
                      : isLight
                        ? "border-[#d0d0cc] bg-[#f8f8f6] text-[#5e5e5a] hover:border-gold/35 hover:text-[#2a2a28]"
                        : "border-white/12 bg-white/5 text-white/75 hover:border-gold/35 hover:text-white"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} />
                  {sceneLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`border-t pt-6 ${divider}`}>
          <h3 className={`${sectionTitleClass} mb-4`}>Lighting Zones</h3>
          <div className="space-y-3">
            {LIGHTING_ZONES.map((zone) => {
              const active = zoneActive(zone.id);
              const count = LIGHT_FIXTURES.filter((f) => f.zoneId === zone.id).length;
              const dotColor = zone.colorable
                ? zoneColor(zone.id, colors)
                : zone.defaultColor;

              return (
                <div
                  key={zone.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-3 ${
                    isLight
                      ? "border-[#d8d8d4] bg-[#f8f8f6]"
                      : "border-white/12 bg-white/6"
                  }`}
                >
                  <div className="min-w-0">
                    <span className={`block text-xs font-semibold ${label}`}>
                      {ZONE_PANEL_LABELS[zone.id]}
                    </span>
                    <span className={`block text-[10px] ${muted}`}>
                      {count} fixtures
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5">
                    {zone.colorable ? (
                      <input
                        type="color"
                        value={zoneColor(zone.id, colors)}
                        onChange={(e) =>
                          onColorChange(zone.id as ColorableZoneId, e.target.value)
                        }
                        className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                        title={`Change ${zone.label} color`}
                        aria-label={`Color for ${zone.label}`}
                      />
                    ) : (
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: dotColor }}
                        aria-hidden
                      />
                    )}
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

        <div className={`border-t pt-6 ${divider}`}>
          <label
            htmlFor="lighting-brightness"
            className={`${sectionTitleClass} mb-3 block`}
          >
            Master Dimmer
          </label>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold uppercase ${muted}`}>Low</span>
            <input
              id="lighting-brightness"
              type="range"
              min={20}
              max={100}
              value={brightness}
              onChange={(e) => onBrightnessChange(Number(e.target.value))}
              className={`h-1.5 flex-1 cursor-pointer appearance-none rounded-lg accent-gold ${
                isLight ? "bg-[#d8d8d4]" : "bg-white/10"
              }`}
            />
            <span className="text-[10px] font-bold uppercase text-gold">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
