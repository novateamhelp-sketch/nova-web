import { createContext, useCallback, useContext, type ReactNode } from "react";
import { usePublicData } from "../hooks/usePublicData";
import * as publicService from "../services/public.service";
import type { Logo } from "../types/api.types";

interface SiteLogoContextValue {
  logo: Logo | null;
  isLoading: boolean;
}

const SiteLogoContext = createContext<SiteLogoContextValue>({
  logo: null,
  isLoading: true,
});

export const SiteLogoProvider = ({ children }: { children: ReactNode }) => {
  const fetchLogo = useCallback(() => publicService.getActiveLogo(), []);
  const { data, isLoading } = usePublicData("site-logo", fetchLogo);

  return (
    <SiteLogoContext.Provider value={{ logo: data, isLoading }}>
      {children}
    </SiteLogoContext.Provider>
  );
};

export const useSiteLogo = (): SiteLogoContextValue =>
  useContext(SiteLogoContext);
