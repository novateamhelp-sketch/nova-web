interface ParallaxBackgroundProps {
  imageUrl: string;
  /** CSS gradient layered above the image */
  overlay?: string;
  className?: string;
  opacity?: number;
}

export const ParallaxBackground = ({
  imageUrl,
  overlay = "linear-gradient(rgba(10, 14, 8, 0.55), rgba(10, 14, 8, 0.75))",
  className = "",
  opacity = 1,
}: ParallaxBackgroundProps) => (
  <div
    className={`parallax-bg pointer-events-none absolute inset-0 ${className}`}
    style={{
      opacity,
      backgroundImage: `${overlay}, url("${imageUrl}")`,
    }}
    aria-hidden
  />
);
