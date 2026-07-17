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
    stateName: "New Jersey",
    slug: "new-jersey",
    counties: [],
    customMessage:
      "Do you live in New Jersey and want to transform your outdoor space?",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193293.46202018746!2d-74.742937670068!3d40.058323764207104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c39fa05e6897b9%3A0x9fe00ec670c1e4ab!2sNew%20Jersey!5e0!3m2!1sen!2sus!4v1712688578840!5m2!1sen!2sus",
  },
  {
    stateName: "New York",
    slug: "new-york",
    counties: [],
    customMessage:
      "Are you located in New York and ready to elevate your outdoor living?",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241468.26701711362!2d-74.11808624087659!3d40.70531103698188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0x5b1b1e1c7a44c5d3!2sNew%20York!5e0!3m2!1sen!2sus!4v1712688654652!5m2!1sen!2sus",
  },
  {
    stateName: "Pennsylvania",
    slug: "pennsylvania",
    counties: [],
    customMessage:
      "Living in Pennsylvania? Let's bring your outdoor vision to life!",
    mapEmbedUrl: "https://www.google.com/maps?q=Pennsylvania&output=embed",
  },
];
