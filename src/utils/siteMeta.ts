import type { ServiceArea } from "../types/api.types";
import { getStateAbbrev } from "./slugify";

export const SITE_NAME = "Nova Outdoor Lighting";

/** BCP 47 locale — US English for crawlers and social previews */
export const SITE_LOCALE = "en-US";

/** Open Graph locale format */
export const OG_LOCALE = "en_US";

export const SERVICE_COUNTRY = "United States";
export const SERVICE_COUNTRY_CODE = "US";

/** Primary service region for titles and local SEO copy */
export const SERVICE_AREA_LABEL = "NJ, NY & CT";
export const SERVICE_AREA_LONG =
  "New Jersey, New York, and Connecticut";
export const SERVICE_AREA_TRI_STATE = "tri-state area";

export const DEFAULT_TITLE = `${SITE_NAME} | Landscape & Outdoor Lighting in ${SERVICE_AREA_LABEL}`;

export const DEFAULT_DESCRIPTION =
  "Professional outdoor lighting, landscape lighting, and hardscaping for homeowners across the NJ, NY, and CT tri-state area. Licensed & insured. Free on-site estimate.";

export const DEFAULT_KEYWORDS =
  "outdoor lighting, landscape lighting, hardscaping, outdoor lighting company, landscape lighting installation, NJ outdoor lighting, NY outdoor lighting, Connecticut landscape lighting, tri-state area";

/** Static page copy tuned for US local search */
export const PAGE_SEO = {
  services: {
    title: `Outdoor Lighting & Landscaping Services in ${SERVICE_AREA_LABEL}`,
    description: `Outdoor lighting, landscape lighting, and hardscaping services for residential properties in ${SERVICE_AREA_LONG}. Serving the ${SERVICE_AREA_TRI_STATE}.`,
  },
  projects: {
    title: `Outdoor Lighting Projects & Portfolio in ${SERVICE_AREA_LABEL}`,
    description: `Browse completed outdoor and landscape lighting projects across ${SERVICE_AREA_LONG}. Real homes, real results in the ${SERVICE_AREA_TRI_STATE}.`,
  },
  about: {
    title: "About Us | Nova Outdoor Lighting",
    description:
      "Nova Outdoor Lighting transforms outdoor spaces with landscape lighting, hardscaping, and architectural illumination in New Jersey. Mission, vision, and values driven by quality and innovation.",
  },
  contact: {
    title: `Free Outdoor Lighting Estimate in ${SERVICE_AREA_LABEL}`,
    description: `Request a free on-site estimate for outdoor or landscape lighting in ${SERVICE_AREA_LONG}. Call or message our US team today.`,
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist on Nova Outdoor Lighting.",
  },
} as const;

export const formatProjectTitle = (projectName: string): string =>
  `${projectName} | Outdoor Lighting Project in ${SERVICE_AREA_LABEL}`;

export const formatCategoryServiceTitle = (name: string): string =>
  `${name} | Outdoor Lighting in ${SERVICE_AREA_LABEL}`;

export const formatCategoryProjectsTitle = (name: string): string =>
  `${name} Projects in ${SERVICE_AREA_LABEL}`;

export const getSiteUrl = (): string => {
  const envUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (envUrl) return envUrl;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};

export const formatPageTitle = (title?: string): string => {
  if (!title?.trim()) return DEFAULT_TITLE;
  if (title.includes(SITE_NAME)) return title;
  return `${title.trim()} | ${SITE_NAME}`;
};

export const truncateDescription = (text: string, max = 160): string =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

export const serviceAreaIndexSeo = {
  title: `Service Areas — ${SERVICE_AREA_LABEL}`,
  description: `Nova Outdoor Lighting serves homeowners in ${SERVICE_AREA_LONG}, ${SERVICE_COUNTRY}. Browse outdoor lighting coverage by state and county across the ${SERVICE_AREA_TRI_STATE}.`,
  keywords: `${DEFAULT_KEYWORDS}, service area, counties served`,
};

export const serviceAreaStateSeo = (area: ServiceArea) => {
  const abbrev = getStateAbbrev(area.stateName);
  const countyPreview =
    area.counties.length > 0
      ? area.counties.slice(0, 4).join(", ") +
        (area.counties.length > 4 ? ", and more" : "")
      : "homeowners statewide";

  return {
    title:
      area.title.trim() ||
      `Professional Outdoor Lighting Services in ${area.stateName}`,
    description:
      area.description.trim() ||
      `Professional outdoor and landscape lighting throughout ${area.stateName} (${abbrev}). Serving ${countyPreview}. Licensed & insured. Free on-site estimates.`,
    keywords: `outdoor lighting ${area.stateName}, landscape lighting ${abbrev}, ${abbrev} outdoor lighting company, ${area.stateName} landscape lighting installation`,
  };
};

export const serviceAreaCountySeo = (county: string, area: ServiceArea) => {
  const abbrev = getStateAbbrev(area.stateName);

  return {
    title: `Outdoor Lighting in ${county}, ${abbrev}`,
    description: `Outdoor lighting and landscape lighting installation in ${county}, ${area.stateName}. Licensed & insured residential lighting design serving ${SERVICE_COUNTRY}. Free on-site estimates.`,
    keywords: `outdoor lighting ${county}, landscape lighting ${county} ${abbrev}, ${county} outdoor lighting company, ${county} ${area.stateName} landscape lighting`,
  };
};

export const serviceAreaCountyIntro = (
  county: string,
  area: ServiceArea
): string =>
  area.customMessage.trim() ||
  `Nova Outdoor Lighting provides outdoor lighting, landscape lighting, and hardscaping services to homeowners in ${county}, ${area.stateName}. Contact us for a free on-site estimate.`;
