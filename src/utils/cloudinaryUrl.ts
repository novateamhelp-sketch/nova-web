import type { ImageData } from "../types/api.types";

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number | "auto";
  format?: "auto" | "webp";
  crop?: "limit" | "fill";
  /** Trim solid-color letterboxing (e.g. black bars) before resize. */
  trim?: boolean;
}

export const cloudinaryUrl = (
  image: ImageData | null | undefined,
  options: CloudinaryOptions = {}
): string => {
  if (!image?.url) return "";

  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "limit",
    trim = false,
  } = options;

  if (!image.url.includes("res.cloudinary.com")) {
    return image.url;
  }

  const parts = image.url.split("/upload/");
  if (parts.length !== 2) return image.url;

  const transforms = [
    trim ? "e_trim" : "",
    format !== "auto" ? `f_${format}` : "f_auto",
    quality !== "auto" ? `q_${quality}` : "q_auto",
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
    crop === "fill" ? "c_fill" : "c_limit",
    crop === "fill" ? "g_auto" : "",
  ]
    .filter(Boolean)
    .join(",");

  return `${parts[0]}/upload/${transforms}/${parts[1]}`;
};
