import { useCallback, useMemo, useState } from "react";
import {
  FIXTURE_LAYOUT_STORAGE_KEY,
  LIGHT_FIXTURES,
  type LightFixture,
} from "../components/lighting/lightingZones.config";

export type FixturePosition = { top: number; left: number };
export type FixtureLayout = Record<string, FixturePosition>;

const parsePercent = (value: string) => Number.parseFloat(value);

export const defaultFixtureLayout = (): FixtureLayout => {
  const layout: FixtureLayout = {};
  for (const fixture of LIGHT_FIXTURES) {
    layout[fixture.id] = {
      top: parsePercent(fixture.top),
      left: parsePercent(fixture.left),
    };
  }
  return layout;
};

const loadSavedLayout = (): FixtureLayout => {
  try {
    const raw = localStorage.getItem(FIXTURE_LAYOUT_STORAGE_KEY);
    if (!raw) return defaultFixtureLayout();
    const parsed = JSON.parse(raw) as FixtureLayout;
    return { ...defaultFixtureLayout(), ...parsed };
  } catch {
    return defaultFixtureLayout();
  }
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const applyLayoutToFixtures = (
  layout: FixtureLayout,
  base: LightFixture[] = LIGHT_FIXTURES
): LightFixture[] =>
  base.map((fixture) => {
    const pos = layout[fixture.id];
    if (!pos) return fixture;
    return {
      ...fixture,
      top: `${pos.top.toFixed(1)}%`,
      left: `${pos.left.toFixed(1)}%`,
    };
  });

export const useFixtureLayout = () => {
  const [layout, setLayout] = useState<FixtureLayout>(loadSavedLayout);

  const positionedFixtures = useMemo(
    () => applyLayoutToFixtures(layout),
    [layout]
  );

  const moveFixture = useCallback((id: string, top: number, left: number) => {
    setLayout((prev) => {
      const next = {
        ...prev,
        [id]: {
          top: clamp(top, 1, 99),
          left: clamp(left, 1, 99),
        },
      };
      localStorage.setItem(FIXTURE_LAYOUT_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetLayout = useCallback(() => {
    const defaults = defaultFixtureLayout();
    setLayout(defaults);
    localStorage.removeItem(FIXTURE_LAYOUT_STORAGE_KEY);
  }, []);

  const exportLayoutJson = useCallback(
    () => JSON.stringify(layout, null, 2),
    [layout]
  );

  return {
    positionedFixtures,
    layout,
    moveFixture,
    resetLayout,
    exportLayoutJson,
  };
};
