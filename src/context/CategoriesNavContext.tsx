import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { usePublicData } from "../hooks/usePublicData";
import * as publicService from "../services/public.service";
import type { Category } from "../types/api.types";

interface CategoriesNavContextValue {
  categories: Category[];
  menuCategories: Category[];
  isLoading: boolean;
}

const CategoriesNavContext = createContext<CategoriesNavContextValue>({
  categories: [],
  menuCategories: [],
  isLoading: true,
});

export const CategoriesNavProvider = ({ children }: { children: ReactNode }) => {
  const fetchCategories = useCallback(() => publicService.getCategories(), []);
  const { data, isLoading } = usePublicData("nav-categories", fetchCategories);

  const categories = data ?? [];
  const menuCategories = useMemo(
    () => categories.filter((c) => c.isActive !== false && c.isFeatured),
    [categories],
  );

  return (
    <CategoriesNavContext.Provider
      value={{ categories, menuCategories, isLoading }}
    >
      {children}
    </CategoriesNavContext.Provider>
  );
};

export const useCategoriesNav = (): CategoriesNavContextValue =>
  useContext(CategoriesNavContext);
