import type { Category, GalleryItem } from "../types/api.types";
import { isRefDoc } from "./populate";

const resolveCategory = (
  item: GalleryItem,
  categories: Category[] = []
): Category | null => {
  if (!item.category) return null;
  if (isRefDoc(item.category)) {
    const ref = item.category;
    return (
      categories.find((cat) => cat._id === ref._id) ?? (ref as Category)
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

const getCategoryOrder = (
  item: GalleryItem,
  categories: Category[] = []
): number => resolveCategory(item, categories)?.order ?? Number.MAX_SAFE_INTEGER;

export const sortGalleryItems = (
  items: GalleryItem[],
  categories: Category[] = []
) =>
  [...items].sort((a, b) => {
    const categoryDiff =
      getCategoryOrder(a, categories) - getCategoryOrder(b, categories);
    if (categoryDiff !== 0) return categoryDiff;
    return a.order - b.order;
  });

export const filterGalleryByCategory = (
  items: GalleryItem[],
  categorySlug: string | null,
  categories: Category[] = []
) => {
  const filtered = categorySlug
    ? items.filter(
        (item) => galleryCategorySlug(item, categories) === categorySlug
      )
    : items;

  return sortGalleryItems(filtered, categories);
};

export const galleryFilterOptions = (
  items: GalleryItem[],
  categories: Category[] = []
) => {
  const slugsInGallery = new Set<string>();

  for (const item of items) {
    const slug = galleryCategorySlug(item, categories);
    if (slug) slugsInGallery.add(slug);
  }

  const options = categories
    .filter((cat) => slugsInGallery.has(cat.slug))
    .sort((a, b) => a.order - b.order)
    .map((cat) => ({
      id: cat.slug,
      label: cat.name.toUpperCase(),
    }));

  const covered = new Set(options.map((option) => option.id));

  for (const slug of slugsInGallery) {
    if (covered.has(slug)) continue;
    options.push({
      id: slug,
      label: slug.replace(/-/g, " ").toUpperCase(),
    });
  }

  return options;
};
