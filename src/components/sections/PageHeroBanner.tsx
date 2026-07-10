import type { StyleAsset } from "../../types/api.types";
import { Container } from "../ui/Container";
import { ScrollReveal } from "../ui/ScrollReveal";
import { resolveStyleAssetImageByKey } from "../../utils/styleAssetMedia";
import { splitDisplayTitle } from "../../utils/titleDisplay";
import { renderSerifTitleText } from "../../utils/serifTitleText";

export interface PageHeroBannerProps {
  imageKey: string;
  styleAssets?: StyleAsset[] | null;
  eyebrow?: string;
  /** Full heading — last word renders as gold accent (e.g. "Our Projects") */
  title: string;
  subtitle?: string;
  imageAlt?: string;
  headingLevel?: "h1" | "h2";
}

export const PageHeroBanner = ({
  imageKey,
  styleAssets,
  eyebrow,
  title,
  subtitle,
  imageAlt,
  headingLevel = "h1",
}: PageHeroBannerProps) => {
  const imageUrl = resolveStyleAssetImageByKey(styleAssets, imageKey, {
    width: 1920,
  });
  const asset = styleAssets?.find(
    (item) =>
      item.isActive !== false && item.key === imageKey && item.images?.[0]
  );
  const split = splitDisplayTitle(title);
  const titlePrimary = split.mode === "default" ? split.primary : title;
  const titleAccent = split.mode === "default" ? split.accent : null;
  const resolvedAlt =
    imageAlt || asset?.images[0]?.alt || title;
  const HeadingTag = headingLevel;

  return (
    <section className="page-hero-banner hero-pin-on-scroll">
      {imageUrl ? (
        <div
          className="page-hero-parallax-bg"
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={resolvedAlt}
        />
      ) : null}
      <div className="page-hero-parallax-overlay" aria-hidden />

      <Container className="page-hero-banner__container">
        <ScrollReveal variant="fade-up">
          <div className="page-hero-banner__content">
            {eyebrow ? (
              <div className="page-hero-banner__eyebrow-row">
                <span className="page-hero-banner__eyebrow-line" aria-hidden />
                <p className="page-hero-banner__eyebrow">{eyebrow}</p>
                <span className="page-hero-banner__eyebrow-line" aria-hidden />
              </div>
            ) : null}

            <HeadingTag className="page-hero-banner__title">
              <span className="page-hero-banner__title-primary">
                {renderSerifTitleText(titlePrimary)}
              </span>
              {titleAccent ? (
                <>
                  {" "}
                  <span className="page-hero-banner__title-accent">
                    {renderSerifTitleText(titleAccent)}
                  </span>
                </>
              ) : null}
            </HeadingTag>

            {subtitle ? (
              <>
                <div className="page-hero-banner__divider" aria-hidden />
                <p className="page-hero-banner__subtitle">{subtitle}</p>
              </>
            ) : null}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
