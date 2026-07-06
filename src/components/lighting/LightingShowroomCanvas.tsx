import { useRef, useState } from "react";
import { Move } from "lucide-react";
import {
  BRIGHTNESS_LIFT_PER_LIGHT,
  colorWithAlpha,
  hexToRgb,
  LIGHTING_ZONES,
  type ColorableZoneId,
  type LightFixture,
  zoneColor,
} from "./lightingZones.config";

interface LightingShowroomCanvasProps {
  showroomImageUrl: string;
  positionedFixtures: LightFixture[];
  fixtures: Record<string, boolean>;
  colors: Record<ColorableZoneId, string>;
  brightness: number;
  layoutEditMode: boolean;
  onToggleFixture: (fixtureId: string) => void;
  onMoveFixture: (fixtureId: string, top: number, left: number) => void;
}

const FixtureGlow = ({
  fixture,
  color,
  active,
  intensity,
  isDragging,
}: {
  fixture: LightFixture;
  color: string;
  active: boolean;
  intensity: number;
  isDragging: boolean;
}) => {
  const { r, g, b } = hexToRgb(color);
  const size = `${fixture.spread * 1.8}%`;
  const blur = fixture.spread * 1.2;

  return (
    <div
      className={`pointer-events-none absolute ${isDragging ? "" : "transition-opacity duration-[900ms] ease-in-out"}`}
      style={{
        top: fixture.top,
        left: fixture.left,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        opacity: active || isDragging ? intensity * 0.42 : 0,
        background: `radial-gradient(circle, rgba(${r},${g},${b},0.32) 0%, rgba(${r},${g},${b},0.12) 42%, rgba(${r},${g},${b},0.02) 68%, transparent 82%)`,
        filter: `blur(${blur}px)`,
        mixBlendMode: "screen",
      }}
      aria-hidden
    />
  );
};

const FixtureSurfaceLight = ({
  imageUrl,
  fixture,
  active,
  intensity,
  isDragging,
}: {
  imageUrl: string;
  fixture: LightFixture;
  active: boolean;
  intensity: number;
  isDragging: boolean;
}) => {
  const maskPos = `${fixture.left} ${fixture.top}`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${isDragging ? "" : "transition-opacity duration-[900ms] ease-in-out"}`}
      style={{
        opacity: active || isDragging ? intensity * 0.38 : 0,
        WebkitMaskImage: `radial-gradient(circle at ${maskPos}, black 0%, transparent 58%)`,
        maskImage: `radial-gradient(circle at ${maskPos}, black 0%, transparent 58%)`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
      aria-hidden
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: "brightness(1.45) contrast(1.02) saturate(1.05)",
        }}
        draggable={false}
      />
    </div>
  );
};

export const LightingShowroomCanvas = ({
  showroomImageUrl,
  positionedFixtures,
  fixtures,
  colors,
  brightness,
  layoutEditMode,
  onToggleFixture,
  onMoveFixture,
}: LightingShowroomCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const intensity = brightness / 100;
  const activeCount = positionedFixtures.filter((f) => fixtures[f.id]).length;
  const lightLift = activeCount * BRIGHTNESS_LIFT_PER_LIGHT;
  const dimmerLift = intensity * 0.04;
  const imageBrightness = 0.24 + lightLift + dimmerLift;
  const imageSaturation = 0.42 + activeCount * 0.018 + intensity * 0.03;
  const nightVeil = Math.max(0.05, 0.3 - activeCount * 0.022 - intensity * 0.04);

  const updatePositionFromPointer = (
    fixtureId: string,
    clientX: number,
    clientY: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const left = ((clientX - rect.left) / rect.width) * 100;
    const top = ((clientY - rect.top) / rect.height) * 100;
    onMoveFixture(fixtureId, top, left);
  };

  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#0f100c]/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <div
        ref={canvasRef}
        className={`relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] ${
          layoutEditMode ? "cursor-crosshair" : "select-none"
        }`}
      >
        <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 border border-white/10 bg-olive-bg-deep/90 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
            Real-time Preview
          </span>
        </div>

        {layoutEditMode ? (
          <div className="pointer-events-none absolute inset-x-4 top-14 z-20 border border-olive-gold/30 bg-olive-gold/10 px-4 py-2.5 text-center backdrop-blur-sm">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-olive-gold sm:text-[11px]">
              Tap anywhere on the canvas to place a solid-brass uplight
            </p>
          </div>
        ) : null}
        <img
          src={showroomImageUrl}
          alt="Luxury home exterior at dusk — interactive lighting demo"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-[filter] duration-[900ms] ease-in-out"
          style={{
            filter: `brightness(${imageBrightness}) contrast(1.04) saturate(${imageSaturation})`,
          }}
          draggable={false}
        />

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{
            opacity: nightVeil,
            background:
              "linear-gradient(to bottom, rgba(15,36,25,0.45) 0%, rgba(15,36,25,0.12) 42%, rgba(15,36,25,0.32) 100%)",
          }}
          aria-hidden
        />

        {layoutEditMode ? (
          <div
            className="pointer-events-none absolute inset-0 z-[5] border-2 border-dashed border-gold/40 bg-gold/5"
            aria-hidden
          />
        ) : null}

        {positionedFixtures.map((fixture) => {
          const isDragging = draggingId === fixture.id;
          const showLight = fixtures[fixture.id] || isDragging;
          return showLight ? (
            <FixtureSurfaceLight
              key={`surface-${fixture.id}`}
              imageUrl={showroomImageUrl}
              fixture={fixture}
              active={showLight}
              intensity={intensity}
              isDragging={isDragging}
            />
          ) : null;
        })}

        {positionedFixtures.map((fixture) => {
          const color = zoneColor(fixture.zoneId, colors);
          const isDragging = draggingId === fixture.id;
          return (
            <FixtureGlow
              key={`glow-${fixture.id}`}
              fixture={fixture}
              color={color}
              active={fixtures[fixture.id] || isDragging}
              intensity={intensity}
              isDragging={isDragging}
            />
          );
        })}

        {positionedFixtures.map((fixture) => {
          const active = fixtures[fixture.id];
          const color = zoneColor(fixture.zoneId, colors);
          const zone = LIGHTING_ZONES.find((z) => z.id === fixture.zoneId);
          const isDragging = draggingId === fixture.id;

          return (
            <button
              key={`hotspot-${fixture.id}`}
              type="button"
              onPointerDown={(e) => {
                if (!layoutEditMode) return;
                e.preventDefault();
                e.stopPropagation();
                setDraggingId(fixture.id);
                (e.currentTarget as HTMLButtonElement).setPointerCapture(
                  e.pointerId
                );
              }}
              onPointerMove={(e) => {
                if (draggingId !== fixture.id) return;
                updatePositionFromPointer(fixture.id, e.clientX, e.clientY);
              }}
              onPointerUp={(e) => {
                if (draggingId === fixture.id) {
                  setDraggingId(null);
                  (e.currentTarget as HTMLButtonElement).releasePointerCapture(
                    e.pointerId
                  );
                }
              }}
              onPointerCancel={(e) => {
                if (draggingId === fixture.id) {
                  setDraggingId(null);
                  (e.currentTarget as HTMLButtonElement).releasePointerCapture(
                    e.pointerId
                  );
                }
              }}
              onClick={() => {
                if (!layoutEditMode) onToggleFixture(fixture.id);
              }}
              className={`absolute z-10 group flex -translate-x-1/2 -translate-y-1/2 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                layoutEditMode
                  ? "h-8 w-8 cursor-grab touch-none active:cursor-grabbing"
                  : "h-8 w-8 cursor-pointer"
              }`}
              style={{ top: fixture.top, left: fixture.left }}
              aria-label={
                layoutEditMode
                  ? `Drag to reposition ${fixture.id}`
                  : `${active ? "Turn off" : "Turn on"} ${zone?.label ?? "light"}`
              }
              aria-pressed={active}
            >
              {layoutEditMode ? (
                <>
                  <span
                    className="absolute inset-0 rounded-full border-2 border-dashed border-white/70"
                    style={{ backgroundColor: colorWithAlpha(color, 0.35) }}
                  />
                  <Move size={12} className="relative text-white" strokeWidth={2.5} />
                  {isDragging ? (
                    <span className="absolute -bottom-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-olive-bg-deep/95 px-1.5 py-0.5 text-[9px] font-mono text-gold">
                      {fixture.top} · {fixture.left}
                    </span>
                  ) : null}
                </>
              ) : (
                <span className="relative flex h-6 w-6 items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {!active ? (
                    <span
                      className="absolute h-3 w-3 animate-light-hotspot rounded-full"
                      style={{ backgroundColor: colorWithAlpha(color, 0.35) }}
                    />
                  ) : null}
                  <span
                    className="relative h-2.5 w-2.5 rounded-full border border-white/80 transition-all duration-500 group-hover:scale-125"
                    style={{
                      backgroundColor: active
                        ? color
                        : colorWithAlpha(color, 0.85),
                      boxShadow: active
                        ? `0 0 10px 3px ${colorWithAlpha(color, 0.45)}`
                        : `0 0 5px 1px ${colorWithAlpha(color, 0.3)}`,
                      opacity: active ? 1 : 0.75,
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-olive-bg-deep px-4 py-2.5 font-sans text-[11px] text-olive-text/55">
        <span>
          {layoutEditMode ? (
            <>
              Edit mode ·{" "}
              <strong className="text-olive-gold">{draggingId ?? "drag a light"}</strong>
            </>
          ) : (
            <>
              Lights on:{" "}
              <strong className="text-olive-text/90">
                {activeCount}/{positionedFixtures.length}
              </strong>
            </>
          )}
        </span>
        <span>
          Scene brightness: {Math.round(imageBrightness * 100)}%
        </span>
      </div>
    </div>
  );
};
