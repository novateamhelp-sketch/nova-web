import { useEffect } from "react";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  OG_LOCALE,
  SERVICE_COUNTRY_CODE,
  SERVICE_AREA_LONG,
  SITE_LOCALE,
  SITE_NAME,
  formatPageTitle,
  getSiteUrl,
  truncateDescription,
} from "../utils/siteMeta";

export interface PageMetaOptions {
  /** Page-specific segment, e.g. "Contact" → "Contact | LumiScape" */
  title?: string;
  /** Overrides the full document title (used for Home SEO defaults from API) */
  fullTitle?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const setMetaTag = (
  attr: "name" | "property",
  key: string,
  content: string
): void => {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLinkTag = (rel: string, href: string, hreflang?: string): void => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;

  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const usePageMeta = ({
  title,
  fullTitle,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage,
  ogType = "website",
  noIndex = false,
}: PageMetaOptions): void => {
  useEffect(() => {
    const pageTitle = fullTitle?.trim() || formatPageTitle(title) || DEFAULT_TITLE;
    const metaDescription = truncateDescription(description);

    document.documentElement.lang = SITE_LOCALE;
    document.title = pageTitle;

    setMetaTag("name", "description", metaDescription);
    setMetaTag("name", "keywords", keywords);
    setMetaTag(
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow"
    );

    // US geographic hints for crawlers that still read these tags
    setMetaTag("name", "geo.region", SERVICE_COUNTRY_CODE);
    setMetaTag("name", "geo.placename", SERVICE_AREA_LONG);
    setMetaTag("name", "ICBM", "40.7128, -74.0060");

    setMetaTag("property", "og:locale", OG_LOCALE);
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", metaDescription);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", SITE_NAME);

    const siteUrl = getSiteUrl();
    const canonicalUrl = siteUrl
      ? `${siteUrl}${window.location.pathname}`
      : window.location.href;

    setLinkTag("canonical", canonicalUrl);
    setLinkTag("alternate", canonicalUrl, SITE_LOCALE.toLowerCase());
    setLinkTag("alternate", canonicalUrl, "x-default");

    setMetaTag("property", "og:url", canonicalUrl);

    const image =
      ogImage || (siteUrl ? `${siteUrl}/og-default.svg` : "/og-default.svg");

    setMetaTag("property", "og:image", image);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag("name", "twitter:description", metaDescription);
    setMetaTag("name", "twitter:image", image);
  }, [title, fullTitle, description, keywords, ogImage, ogType, noIndex]);
};
