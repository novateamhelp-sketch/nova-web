import { useCallback, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Container } from "../ui/Container";
import { LightingControlsPanel, LightingMasterDimmer, LightingSectionHeader } from "../lighting/LightingControlsPanel";
import { LightingShowroomCanvas } from "../lighting/LightingShowroomCanvas";
import { useFixtureLayout } from "../../hooks/useFixtureLayout";
import {
  defaultColorState,
  defaultFixtureState,
  isZoneActive,
  LIGHT_FIXTURES,
  LIGHTING_PRESETS,
  type LightingPresetId,
  type LightingZoneId,
} from "../lighting/lightingZones.config";
import { DarkGridSection } from "./DarkGridSection";
import { ScrollReveal } from "../ui/ScrollReveal";

interface InteractiveLightingSectionProps {
  showroomImageUrl: string;
  /** Home page rhythm — keep dark block after light sections */
  forceDark?: boolean;
  /** Plain white surface (e.g. after gallery on home) */
  surface?: "dark-grid" | "plain";
}

const readLayoutEditFromUrl = () => {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("editLights");
};

export const InteractiveLightingSection = ({
  showroomImageUrl,
  forceDark = false,
  surface = "dark-grid",
}: InteractiveLightingSectionProps) => {
  const [fixtures, setFixtures] = useState(() => defaultFixtureState());
  const [colors, setColors] = useState(() => defaultColorState());
  const [brightness, setBrightness] = useState(100);
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
    setBrightness(100);
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
  const isPlain = surface === "plain";
  const isLight =
    isPlain || (surface !== "dark-grid" && !forceDark && theme === "light");

  const content = (
    <>
      <ScrollReveal variant="fade-up">
        <LightingSectionHeader isLight={isLight} onResetAll={resetAll} />
      </ScrollReveal>

      <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <ScrollReveal
          variant="slide-left"
          className="order-2 lg:order-1 lg:col-span-5 xl:col-span-4"
        >
          <LightingControlsPanel
            isLight={isLight}
            zoneActive={zoneActive}
            colors={colors}
            layoutEditMode={layoutEditMode}
            onLayoutEditModeChange={setLayoutEditMode}
            onResetLayout={resetLayout}
            onCopyLayout={copyLayout}
            onToggleZone={toggleZone}
            selectedScene={selectedScene}
            onScene={handleScene}
          />
        </ScrollReveal>

        <ScrollReveal
          variant="slide-right"
          className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-7 xl:col-span-8"
        >
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
          <LightingMasterDimmer
            isLight={isLight}
            brightness={brightness}
            onBrightnessChange={setBrightness}
          />
        </ScrollReveal>
      </div>
    </>
  );

  if (isPlain) {
    return (
      <section className="relative overflow-hidden bg-theme-elevated py-12 text-forest-dark sm:py-16 lg:py-20">
        <Container className="relative z-10">{content}</Container>
      </section>
    );
  }

  return (
    <DarkGridSection>
      {content}
    </DarkGridSection>
  );
};
