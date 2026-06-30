import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  url: string;
  alt: string;
}

interface ImageModalProps {
  open: boolean;
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

const SWIPE_THRESHOLD = 50;

export const ImageModal = ({
  open,
  images,
  index,
  onClose,
  onChangeIndex,
}: ImageModalProps) => {
  const current = images[index];
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onChangeIndex(index - 1);
      if (e.key === "ArrowRight" && index < images.length - 1)
        onChangeIndex(index + 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, index, images.length, onClose, onChangeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) < SWIPE_THRESHOLD || Math.abs(diffX) < Math.abs(diffY)) {
      return;
    }
    if (diffX > 0 && index > 0) onChangeIndex(index - 1);
    if (diffX < 0 && index < images.length - 1) onChangeIndex(index + 1);
  };

  if (!open || !current) return null;

  const navBtnClass =
    "absolute z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close preview"
      />
      <button
        type="button"
        onClick={onClose}
        className={`${navBtnClass} right-3 top-3 sm:right-4 sm:top-4`}
        aria-label="Close"
      >
        <X size={22} strokeWidth={1.75} />
      </button>

      {index > 0 ? (
        <button
          type="button"
          onClick={() => onChangeIndex(index - 1)}
          className={`${navBtnClass} left-2 top-1/2 -translate-y-1/2 sm:left-4`}
          aria-label="Previous image"
        >
          <ChevronLeft size={26} strokeWidth={1.75} />
        </button>
      ) : null}

      {index < images.length - 1 ? (
        <button
          type="button"
          onClick={() => onChangeIndex(index + 1)}
          className={`${navBtnClass} right-2 top-1/2 -translate-y-1/2 sm:right-4`}
          aria-label="Next image"
        >
          <ChevronRight size={26} strokeWidth={1.75} />
        </button>
      ) : null}

      <img
        src={current.url}
        alt={current.alt}
        className="relative z-[1] max-h-[80vh] max-w-full select-none rounded-lg object-contain shadow-2xl sm:max-h-[85vh]"
        draggable={false}
      />

      {images.length > 1 ? (
        <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-sm text-white/80">
          {index + 1} / {images.length}
          <span className="ml-2 hidden text-xs text-white/50 sm:inline">
            · Swipe to navigate
          </span>
        </p>
      ) : null}
    </div>
  );
};
