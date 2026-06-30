import type { Category, GalleryItem } from "../types/api.types";
import { getRefName, isRefDoc } from "./populate";

const resolveCategory = (
  item: GalleryItem,
  categories: Category[] = []
): Category | null => {
  if (!item.category) return null;
  if (isRefDoc(item.category)) {
    return (
      categories.find((cat) => cat._id === item.category._id) ??
      (item.category as Category)
    );
  }
  return categories.find((cat) => cat._id === item.category) ?? null;
};

export const galleryCategoryName = (
  item: GalleryItem,
  categories: Category[] = []
) => {
  const category = resolveCategory(item, categories);
  return category?.name || "Featured";
};

export const galleryCategorySlug = (
  item: GalleryItem,
  categories: Category[] = []
) => resolveCategory(item, categories)?.slug ?? "";

export const galleryTransformationLabel = (
  item: GalleryItem,
  categories: Category[] = []
) => {
  const name = galleryCategoryName(item, categories).toUpperCase();
  return `${name} TRANSFORMATION`;
};

/** Location-style badge until gallery items support a dedicated field. */
export const galleryLocationBadge = (
  item: GalleryItem,
  categories: Category[] = []
) => {
  const name = galleryCategoryName(item, categories);
  return `${name.toUpperCase()} · NJ`;
};

export const filterGalleryByCategory = (
  items: GalleryItem[],
  categorySlug: string | null,
  categories: Category[] = []
) => {
  if (!categorySlug) return items;
  return items.filter(
    (item) => galleryCategorySlug(item, categories) === categorySlug
  );
};

export const galleryFilterOptions = (
  items: GalleryItem[],
  categories: Category[] = []
) => {
  const seen = new Set<string>();
  const options: { id: string; label: string }[] = [];

  for (const item of items) {
    const slug = galleryCategorySlug(item, categories);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    options.push({
      id: slug,
      label: galleryCategoryName(item, categories).toUpperCase(),
    });
  }

  return options;
};
