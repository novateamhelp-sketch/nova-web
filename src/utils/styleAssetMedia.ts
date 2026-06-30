import type { StyleAsset } from "../types/api.types";
import { cloudinaryUrl } from "./cloudinaryUrl";

export const DAY_NIGHT_SECTION_BANNER_KEY = "banner1";

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
