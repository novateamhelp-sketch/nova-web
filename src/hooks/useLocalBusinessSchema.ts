import { useEffect } from "react";
import type { SiteSettings } from "../types/api.types";
import {
  DEFAULT_DESCRIPTION,
  SERVICE_AREA_LONG,
  SERVICE_COUNTRY,
  SERVICE_COUNTRY_CODE,
  SITE_NAME,
  getSiteUrl,
} from "../utils/siteMeta";

const SCRIPT_ID = "nova-local-business-schema";

export const useLocalBusinessSchema = (
  settings?: SiteSettings | null
): void => {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    if (!siteUrl) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": `${siteUrl}/#organization`,
      name: settings?.siteName || SITE_NAME,
      description: settings?.seoDefaults?.description || DEFAULT_DESCRIPTION,
      url: siteUrl,
      telephone: settings?.phoneCalls || undefined,
      email: settings?.email || undefined,
      image: settings?.seoDefaults?.ogImage || `${siteUrl}/og-default.svg`,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: SERVICE_COUNTRY_CODE,
        addressRegion: settings?.location || SERVICE_AREA_LONG,
      },
      areaServed: [
        { "@type": "State", name: "New Jersey", containedInPlace: SERVICE_COUNTRY },
        { "@type": "State", name: "New York", containedInPlace: SERVICE_COUNTRY },
        { "@type": "State", name: "Connecticut", containedInPlace: SERVICE_COUNTRY },
      ],
      knowsAbout: [
        "Outdoor lighting",
        "Landscape lighting",
        "Hardscaping",
        "Landscape design",
      ],
    };

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [settings]);
};
