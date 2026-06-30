import {
  Box,
  Droplets,
  Hammer,
  Layers,
  Lightbulb,
  Paintbrush,
  Sparkles,
  Trees,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "../types/api.types";

const SLUG_ICON_MAP: { match: string; icon: LucideIcon }[] = [
  { match: "lighting", icon: Lightbulb },
  { match: "paint", icon: Paintbrush },
  { match: "wash", icon: Droplets },
  { match: "hardscap", icon: Hammer },
  { match: "landscap", icon: Trees },
  { match: "floor", icon: Layers },
  { match: "3d", icon: Box },
  { match: "artistic", icon: Box },
];

export const getCategoryIcon = (category: Category): LucideIcon => {
  const key = `${category.slug} ${category.name}`.toLowerCase();
  const found = SLUG_ICON_MAP.find(({ match }) => key.includes(match));
  return found?.icon ?? Sparkles;
};

export const isEmojiIcon = (value: string): boolean =>
  /\p{Extended_Pictographic}/u.test(value);

export const isSvgIcon = (value: string): boolean =>
  /<svg[\s>/]/i.test(value.trim());

/** Strip unsafe markup from admin-pasted SVG icons */
export const sanitizeSvgIcon = (svg: string): string =>
  svg
    .trim()
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
