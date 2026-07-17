export const serviceAreaStateTitle = (stateName: string) =>
  `Professional Outdoor Lighting Services in ${stateName}`;

export const serviceAreaStateTitleParts = (stateName: string) => ({
  lead: "Professional Outdoor Lighting Services in",
  accent: stateName,
});

/** Split CMS or default title so the state name sits on the accent line. */
export const resolveServiceAreaTitleParts = (
  stateName: string,
  customTitle?: string
) => {
  const trimmed = customTitle?.trim();
  if (!trimmed) {
    return serviceAreaStateTitleParts(stateName);
  }

  if (trimmed.endsWith(stateName)) {
    const lead = trimmed.slice(0, -stateName.length).trim();
    return {
      lead: lead || trimmed,
      accent: stateName,
    };
  }

  return {
    lead: trimmed,
    accent: stateName,
  };
};

export const serviceAreaStateDescription = (stateName: string) =>
  `At LumiScape, we take pride in delivering high-quality, customized outdoor lighting solutions throughout ${stateName}. Whether you're looking to highlight your home's curb appeal, increase safety, or create a magical ambiance at night, our local team is ready to bring your vision to life.`;

export const serviceAreaStateBenefits = (stateName: string) =>
  [
    "Tailored lighting designs for front yards, backyards, walkways, and architectural accents.",
    "Energy-efficient LED technology built to last.",
    `Local experts familiar with the needs of homes across ${stateName}.`,
    "Fast installations and flexible scheduling to suit your lifestyle.",
  ] as const;

export const SERVICE_AREA_WHY_CHOOSE_US = [
  {
    title: "Commitment to Quality",
    text: "At LumiScape, we don't just install lights — we create atmosphere. We make sure every project is completed using the best materials and with the utmost care.",
  },
  {
    title: "Custom Projects for Every Client",
    text: "We know no two homes are alike, which is why every project is tailored to your needs, style, and budget. We ensure every corner of your space looks just right.",
  },
  {
    title: "Local Expert Team",
    text: "Our team is made up of experienced local professionals who understand the climate and specific needs of each area in New Jersey, New York, and Pennsylvania. This allows us to deliver highly effective and regionally adapted solutions.",
  },
  {
    title: "Fast and Efficient Service",
    text: "We value your time. Our projects are completed within the agreed timeframe without sacrificing quality, and always with minimal disruption to your routine.",
  },
  {
    title: "Satisfaction Guaranteed",
    text: "Your satisfaction is our top priority. If you're not completely happy with the results, we'll work with you to make the necessary adjustments until everything is just right.",
  },
] as const;

export const SERVICE_AREA_PRIMARY_CTA = "Request Your Free Consultation!";
export const SERVICE_AREA_CONTACT_CTA = "Contact Us";
export const SERVICE_AREA_CONTACT_BANNER_CTA = "Contact Us Today";

export const serviceAreaContactBannerMessage = (stateName: string) =>
  `Are you located in ${stateName} and ready to elevate your outdoor living?`;
