export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const STATE_ABBREVS: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  "new jersey": "NJ",
  "new york": "NY",
  "north carolina": "NC",
  pennsylvania: "PA",
  texas: "TX",
};

export const getStateAbbrev = (stateName: string): string => {
  const key = stateName.toLowerCase().trim();
  if (STATE_ABBREVS[key]) return STATE_ABBREVS[key];
  if (key.length === 2) return key.toUpperCase();
  return stateName;
};

export const findCountyBySlug = (
  counties: string[],
  countySlug: string
): string | undefined =>
  counties.find((county) => slugify(county) === countySlug);
