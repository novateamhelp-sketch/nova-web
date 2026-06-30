import { useCallback, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Container } from "../ui/Container";
import { LightingControlsPanel } from "../lighting/LightingControlsPanel";
import { LightingShowroomCanvas } from "../lighting/LightingShowroomCanvas";
import { useFixtureLayout } from "../../hooks/useFixtureLayout";
import {
  defaultColorState,
  defaultFixtureState,
  isZoneActive,
  LIGHT_FIXTURES,
  LIGHTING_PRESETS,
  type ColorableZoneId,
  type LightingPresetId,
  type LightingZoneId,
} from "../lighting/lightingZones.config";

interface InteractiveLightingSectionProps {
  showroomImageUrl: string;
  /** Home page rhythm — keep dark block after light sections */
  forceDark?: boolean;
}

const readLayoutEditFromUrl = () => {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("editLights");
};

export const InteractiveLightingSection = ({
  showroomImageUrl,
  forceDark = false,
}: InteractiveLightingSectionProps) => {
  const [fixtures, setFixtures] = useState(() => defaultFixtureState());
  const [colors, setColors] = useState(() => defaultColorState());
  const [brightness, setBrightness] = useState(75);
  const [selectedScene, setSelectedScene] = useState<LightingPresetId | null>(
    null
  );
  const [layoutEditMode, setLayoutEditMode] = useState(readLayoutEditFromUrl);
  const { positionedFixtures, moveFixture, resetLayout, exportLayoutJson } =
    useFixtureLayout();

  const clearSceneSelection = useCallback(() => {
    setSelectedScene(null);
  }, []);

  const toggleFixture = useCallback((fixtureId: string) => {
    clearSceneSelection();
    setFixtures((prev) => ({ ...prev, [fixtureId]: !prev[fixtureId] }));
  }, [clearSceneSelection]);

  const toggleZone = useCallback((zoneId: LightingZoneId) => {
    clearSceneSelection();
    const zoneFixtureIds = LIGHT_FIXTURES.filter((f) => f.zoneId === zoneId).map(
      (f) => f.id
    );
    setFixtures((prev) => {
      const anyOn = zoneFixtureIds.some((id) => prev[id]);
      const next = !anyOn;
      const updated = { ...prev };
      zoneFixtureIds.forEach((id) => {
        updated[id] = next;
      });
      return updated;
    });
  }, [clearSceneSelection]);

  const setZoneColor = useCallback((zoneId: ColorableZoneId, color: string) => {
    setColors((prev) => ({ ...prev, [zoneId]: color }));
  }, []);

  const handleScene = useCallback((presetId: LightingPresetId) => {
    setSelectedScene((current) => {
      if (current === presetId) {
        setFixtures(defaultFixtureState());
        return null;
      }
      const preset = LIGHTING_PRESETS[presetId];
      setFixtures(preset.fixtures);
      setColors({ ...defaultColorState(), ...preset.colors });
      return presetId;
    });
  }, []);

  const resetAll = useCallback(() => {
    setFixtures(defaultFixtureState());
    setColors(defaultColorState());
    setSelectedScene(null);
    setBrightness(75);
    setLayoutEditMode(false);
  }, []);

  const copyLayout = useCallback(async () => {
    const json = exportLayoutJson();
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = json;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }, [exportLayoutJson]);

  const zoneActive = (zoneId: LightingZoneId) =>
    isZoneActive(zoneId, fixtures);
  const { theme } = useTheme();
  const isLight = !forceDark && theme === "light";

  return (
    <section
      className={`home-flow-dark overflow-hidden py-16 sm:py-20 lg:py-24 ${
        isLight
          ? "border-t border-[#d4d4d0] bg-gradient-to-b from-[#e4e4e2] via-[#ececea] to-[#e4e4e2] text-[#2a2a28]"
          : "border-t border-white/10 bg-gradient-to-b from-forest-dark via-[#122a20] to-forest-dark text-white"
      }`}
    >
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <LightingControlsPanel
              zoneActive={zoneActive}
              colors={colors}
              brightness={brightness}
              layoutEditMode={layoutEditMode}
              onLayoutEditModeChange={setLayoutEditMode}
              onResetLayout={resetLayout}
              onCopyLayout={copyLayout}
              onToggleZone={toggleZone}
              onColorChange={setZoneColor}
              selectedScene={selectedScene}
              onScene={handleScene}
              onResetAll={resetAll}
              onBrightnessChange={setBrightness}
            />
          </div>
          <div className="lg:col-span-8">
            <LightingShowroomCanvas
              showroomImageUrl={showroomImageUrl}
              positionedFixtures={positionedFixtures}
              fixtures={fixtures}
              colors={colors}
              brightness={brightness}
              layoutEditMode={layoutEditMode}
              onToggleFixture={toggleFixture}
              onMoveFixture={moveFixture}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
