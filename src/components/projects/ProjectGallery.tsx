import { useState } from "react";
import type { ImageData, ProjectImage } from "../../types/api.types";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { ImageModal, type GalleryImage } from "../gallery/ImageModal";

interface ProjectGalleryProps {
  mainImage?: ImageData | null;
  images: ProjectImage[];
  projectName: string;
}

const toGalleryItem = (
  image: ImageData,
  alt: string,
  thumbWidth: number,
  fullWidth: number
) => ({
  thumb: cloudinaryUrl(image, { width: thumbWidth }),
  full: cloudinaryUrl(image, { width: fullWidth }),
  alt,
});

export const ProjectGallery = ({
  mainImage,
  images,
  projectName,
}: ProjectGalleryProps) => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const items = [
    ...(mainImage?.url
      ? [toGalleryItem(mainImage, mainImage.alt || projectName, 900, 2000)]
      : []),
    ...images.map((img) =>
      toGalleryItem(
        img.image,
        img.image.alt || img.title || projectName,
        900,
        2000
      )
    ),
  ];

  const modalImages: GalleryImage[] = items.map((item) => ({
    url: item.full,
    alt: item.alt,
  }));

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={`${item.thumb}-${index}`}
            type="button"
            onClick={() => setModalIndex(index)}
            className="group overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <img
              src={item.thumb}
              alt={item.alt}
              className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <ImageModal
        open={modalIndex !== null}
        images={modalImages}
        index={modalIndex ?? 0}
        onClose={() => setModalIndex(null)}
        onChangeIndex={setModalIndex}
      />
    </>
  );
};
