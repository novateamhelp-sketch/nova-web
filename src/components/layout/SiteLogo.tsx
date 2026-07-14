import { useSiteLogo } from "../../context/SiteLogoContext";
import { cloudinaryUrl } from "../../utils/cloudinaryUrl";
import { SITE_NAME } from "../../utils/siteMeta";

interface SiteLogoProps {
  showText?: boolean;
  alwaysShowText?: boolean;
  imageClassName?: string;
}

export const SiteLogo = ({
  showText = true,
  alwaysShowText = false,
  imageClassName = "h-12 w-auto max-w-[240px] object-contain sm:h-14 lg:h-16 lg:max-w-[300px]",
}: SiteLogoProps) => {
  const { logo, isLoading } = useSiteLogo();
  const imageUrl = cloudinaryUrl(logo?.image, { width: 560, height: 200 });

  if (isLoading) {
    return (
      <div
        className="h-12 w-32 animate-pulse-soft rounded-lg bg-white/10 sm:h-14 lg:h-16"
        aria-hidden
      />
    );
  }

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={logo?.image?.alt || logo?.name || SITE_NAME}
        className={imageClassName}
        width={300}
        height={64}
      />
    );
  }

  return (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold">
        <span className="text-lg font-bold text-forest-dark">L</span>
      </div>
      {showText ? (
        <div className={alwaysShowText ? "block" : "hidden sm:block"}>
          <p className="text-sm font-bold leading-tight text-gold">
            {SITE_NAME}
          </p>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/70">
            Outdoor Lighting
          </p>
        </div>
      ) : null}
    </>
  );
};
