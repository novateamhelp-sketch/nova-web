/** Static tri-state coverage — used for header nav and as reference for CMS seed data. */
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
    counties: ["Union", "Middlesex", "Monmouth"],
    customMessage:
      "Do you live in New Jersey and want to transform your outdoor space?",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193293.46202018746!2d-74.742937670068!3d40.058323764207104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c39fa05e6897b9%3A0x9fe00ec670c1e4ab!2sNew%20Jersey!5e0!3m2!1sen!2sus!4v1712688578840!5m2!1sen!2sus",
  },
  {
    stateName: "New York",
    slug: "new-york",
    counties: ["Kings", "Queens", "Bronx", "Richmond", "New York (Manhattan)"],
    customMessage:
      "Are you located in New York and ready to elevate your outdoor living?",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241468.26701711362!2d-74.11808624087659!3d40.70531103698188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0x5b1b1e1c7a44c5d3!2sNew%20York!5e0!3m2!1sen!2sus!4v1712688654652!5m2!1sen!2sus",
  },
  {
    stateName: "Connecticut",
    slug: "connecticut",
    counties: ["Fairfield", "Hartford", "New Haven", "New London"],
    customMessage:
      "Living in Connecticut? Let's bring your outdoor vision to life!",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489810.8092216306!2d-73.72748025744673!3d41.51737072190971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7b9b69f19166b%3A0x6e3f1e3f1b347728!2sConnecticut!5e0!3m2!1sen!2sus!4v1712688704064!5m2!1sen!2sus",
  },
];
