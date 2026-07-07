import type { StyleAsset } from "../types/api.types";
import { cloudinaryUrl } from "./cloudinaryUrl";

export const DAY_NIGHT_SECTION_BANNER_KEY = "banner1";
export const ILLUMINATE_INTRO_IMAGE_KEY = "image1";
export const CONTACT_SECTION_BG_KEY = "image1";
export const CONTACT_HERO_BANNER_KEY = "image4";
export const ABOUT_HERO_BANNER_KEY = "image2";
export const PROJECTS_HERO_BANNER_KEY = "image3";
export const SERVICES_HERO_BANNER_KEY = "image6";
export const SERVICE_AREAS_HERO_BANNER_KEY = "image3";

export const resolveStyleAssetImageByKey = (
  styleAssets: StyleAsset[] | null | undefined,
  key: string,
  options: { width?: number; height?: number } = {}
): string | null => {
  const asset = styleAssets?.find(
    (item) =>
      item.isActive !== false && item.key === key && item.images?.[0]
  );
  const image = asset?.images[0];
  if (!image) return null;

  return (
    cloudinaryUrl(image, {
      width: options.width ?? 1920,
      height: options.height ?? 1080,
    }) || null
  );
};
