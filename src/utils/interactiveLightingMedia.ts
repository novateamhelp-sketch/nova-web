import type { StyleAsset } from "../types/api.types";
import { cloudinaryUrl } from "./cloudinaryUrl";
import { SHOWROOM_IMAGE_FALLBACK } from "../components/lighting/lightingZones.config";

export const resolveInteractiveShowroomImage = (
  styleAssets?: StyleAsset[] | null
): string => {
  const asset = styleAssets?.find(
    (item) =>
      item.isActive !== false &&
      item.isHomeInteractiveLights &&
      item.images?.[0]
  );
  const image = asset?.images[0];
  if (!image) return SHOWROOM_IMAGE_FALLBACK;
  return cloudinaryUrl(image, { width: 1600, height: 1000 }) || SHOWROOM_IMAGE_FALLBACK;
};
