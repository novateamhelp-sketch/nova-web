/** Static service-area coverage — used for header nav and as reference for CMS seed data. */
export interface ServiceAreaNavItem {
  stateName: string;
  slug: string;
  counties: string[];
  customMessage: string;
  mapEmbedUrl: string;
}

export const SERVICE_AREA_NAV_ITEMS: ServiceAreaNavItem[] = [
  {
    stateName: "Pennsylvania",
    slug: "pennsylvania",
    counties: [],
    customMessage:
      "Living in Pennsylvania? Let's bring your outdoor vision to life!",
    mapEmbedUrl: "https://www.google.com/maps?q=Pennsylvania&output=embed",
  },
];
