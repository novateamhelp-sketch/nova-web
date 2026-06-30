import type { Category } from "../../types/api.types";
import {
  getCategoryIcon,
  isEmojiIcon,
  isSvgIcon,
  sanitizeSvgIcon,
} from "../../utils/categoryIcons";

interface CategoryIconBoxProps {
  category: Category;
  className?: string;
  /** filled = gold background (cards). outline = dark bg + gold border/icon (mega menu) */
  variant?: "filled" | "outline";
}

const variantClass = {
  filled: "bg-gold/90 text-forest-dark",
  outline: "category-icon-box--outline border border-gold bg-transparent text-gold",
};

export const CategoryIconBox = ({
  category,
  className = "",
  variant = "filled",
}: CategoryIconBoxProps) => {
  const FallbackIcon = getCategoryIcon(category);
  const icon = category.icon?.trim() ?? "";

  return (
    <span
      className={`category-icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded ${variantClass[variant]} ${className}`}
    >
      {icon && isSvgIcon(icon) ? (
        <span
          className="flex h-5 w-5 items-center justify-center"
          dangerouslySetInnerHTML={{ __html: sanitizeSvgIcon(icon) }}
          aria-hidden
        />
      ) : icon && isEmojiIcon(icon) ? (
        <span className="text-lg leading-none">{icon}</span>
      ) : (
        <FallbackIcon size={18} strokeWidth={1.75} aria-hidden />
      )}
    </span>
  );
};
