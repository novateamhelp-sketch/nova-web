import { useCallback } from "react";
import type { SiteSettings } from "../types/api.types";
import * as publicService from "../services/public.service";
import { usePublicData } from "./usePublicData";

export const SITE_SETTINGS_CACHE_KEY = "site-settings";

/** Contact defaults when settings are still loading or missing. */
export const CONTACT_FALLBACK = {
  phoneCalls: "908-397-4060",
  phoneMessages: "908-370-2842",
  email: "info@lumiscapeservices.com",
  location: "Somerset County, New Jersey",
} as const;

export const useSiteSettings = () => {
  const fetchSettings = useCallback(async (): Promise<SiteSettings | null> => {
    const home = await publicService.getHome();
    return home.settings;
  }, []);

  return usePublicData(SITE_SETTINGS_CACHE_KEY, fetchSettings);
};
