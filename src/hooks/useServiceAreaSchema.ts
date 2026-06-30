import { useEffect } from "react";
import type { ServiceArea } from "../types/api.types";
import { SERVICE_COUNTRY, SITE_NAME, getSiteUrl } from "../utils/siteMeta";
import { slugify } from "../utils/slugify";

const SCRIPT_ID = "nova-service-area-schema";

interface ServiceAreaSchemaOptions {
  area: ServiceArea;
  county?: string;
}

export const useServiceAreaSchema = ({
  area,
  county,
}: ServiceAreaSchemaOptions): void => {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    if (!siteUrl) return;

    const pageUrl = county
      ? `${siteUrl}/service-areas/${area.slug}/${slugify(county)}`
      : `${siteUrl}/service-areas/${area.slug}`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: county
        ? `Outdoor Lighting in ${county}, ${area.stateName}`
        : `Outdoor Lighting in ${area.stateName}`,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: SITE_NAME,
        url: siteUrl,
      },
      areaServed: county
        ? {
            "@type": "AdministrativeArea",
            name: county,
            containedInPlace: {
              "@type": "State",
              name: area.stateName,
              containedInPlace: {
                "@type": "Country",
                name: SERVICE_COUNTRY,
              },
            },
          }
        : {
            "@type": "State",
            name: area.stateName,
            containedInPlace: {
              "@type": "Country",
              name: SERVICE_COUNTRY,
            },
          },
      url: pageUrl,
      serviceType: "Outdoor lighting installation",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${siteUrl}/contact`,
        servicePhone: undefined,
      },
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
  }, [area, county]);
};
