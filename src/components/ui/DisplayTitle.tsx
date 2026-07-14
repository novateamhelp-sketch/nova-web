import { splitDisplayTitle } from "../../utils/titleDisplay";
import { renderSerifTitleText } from "../../utils/serifTitleText";

type DisplayTitleAs = "h1" | "h2" | "h3";
type DisplayTitleSize = "hero" | "section" | "panel" | "card";

interface DisplayTitleProps {
  title: string;
  as?: DisplayTitleAs;
  size?: DisplayTitleSize;
  light?: boolean;
  layout?: "default" | "brand";
  className?: string;
}

const sizeClasses: Record<
  DisplayTitleSize,
  { primary: string; accent: string; wrapper?: string }
> = {
  hero: {
    primary:
      "text-[2.75rem] font-medium tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem] xl:text-[4.25rem]",
    accent:
      "text-[2.25rem] font-normal tracking-[0.01em] sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.5rem]",
    wrapper: "leading-[1.05]",
  },
  panel: {
    primary:
      "text-[1.5rem] font-medium tracking-[-0.01em] sm:text-[1.75rem] lg:text-[2rem]",
    accent:
      "text-[1.35rem] font-normal sm:text-[1.5rem] lg:text-[1.75rem]",
    wrapper: "leading-[1.06]",
  },
  section: {
    primary: "text-3xl sm:text-4xl lg:text-[2.75rem]",
    accent: "text-3xl sm:text-4xl lg:text-[2.75rem]",
  },
  card: {
    primary: "text-xl sm:text-[1.35rem]",
    accent: "text-xl sm:text-[1.35rem]",
  },
};

export const DisplayTitle = ({
  title,
  as: Tag = "h2",
  size = "section",
  light = false,
  layout = "default",
  className = "",
}: DisplayTitleProps) => {
  const split = splitDisplayTitle(title, layout);
  const textColor = light ? "text-white" : "text-forest-dark";
  const sizes = sizeClasses[size];

  if (split.mode === "brand") {
    const accentSize = split.compound ? sizes.primary : sizes.accent;
    const accentClass = `italic ${light ? "text-olive-gold" : "text-theme-accent"} ${accentSize}`;
    return (
      <Tag
        className={`font-serif font-bold tracking-tight ${sizes.wrapper ?? "leading-[1.08]"} ${textColor} ${className}`}
      >
        <span className={sizes.primary}>
          {renderSerifTitleText(split.lead)}
          {split.linePrimary ? (
            <> {renderSerifTitleText(split.linePrimary)}</>
          ) : null}
          {split.compound ? null : " "}
          <span className={accentClass}>
            {renderSerifTitleText(split.accent)}
          </span>
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      className={`font-serif font-bold tracking-tight ${sizes.wrapper ?? "leading-[1.08]"} ${textColor} ${className}`}
    >
      <span className={`block ${sizes.primary}`}>
        {renderSerifTitleText(split.primary)}
      </span>
      {split.accent ? (
        <span
          className={`mt-1.5 block italic ${light ? "text-olive-gold" : "text-theme-accent"} ${sizes.accent}`}
        >
          {renderSerifTitleText(split.accent)}
        </span>
      ) : null}
    </Tag>
  );
};
