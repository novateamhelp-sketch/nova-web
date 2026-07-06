import api from "./api";
import type {
  ApiResponse,
  Category,
  FooterContent,
  GalleryItem,
  HomeData,
  Logo,
  NewsItem,
  Project,
  ProjectImage,
  ServiceArea,
  SiteSettings,
  StyleAsset,
  SubCategory,
} from "../types/api.types";

export const getHome = async () => {
  const { data } = await api.get<ApiResponse<HomeData>>("/public/home");
  return data.data;
};

export const getCategories = async () => {
  const { data } = await api.get<ApiResponse<{ categories: Category[] }>>(
    "/public/categories"
  );
  return data.data.categories;
};

export const getCategoryBySlug = async (slug: string) => {
  const { data } = await api.get<
    ApiResponse<{ category: Category; subCategories: SubCategory[] }>
  >(`/public/categories/${slug}`);
  return data.data;
};

export const getProjects = async (categoryId?: string) => {
  const { data } = await api.get<ApiResponse<{ projects: Project[] }>>(
    "/public/projects",
    { params: categoryId ? { categoryId } : undefined }
  );
  return data.data.projects;
};

export const getProjectsByCategorySlug = async (categorySlug: string) => {
  const { data } = await api.get<ApiResponse<{ projects: Project[] }>>(
    `/public/projects/category/${categorySlug}`
  );
  return data.data.projects;
};

export const getProjectBySlug = async (slug: string) => {
  const { data } = await api.get<
    ApiResponse<{ project: Project; images: ProjectImage[] }>
  >(`/public/projects/${slug}`);
  return data.data;
};

export const getGallery = async (categoryId?: string) => {
  const { data } = await api.get<ApiResponse<{ gallery: GalleryItem[] }>>(
    "/public/gallery",
    { params: categoryId ? { categoryId } : undefined }
  );
  return data.data.gallery;
};

export const getNews = async () => {
  const { data } = await api.get<ApiResponse<{ news: NewsItem[] }>>(
    "/public/news"
  );
  return data.data.news;
};

export const getServiceAreas = async () => {
  const { data } = await api.get<ApiResponse<{ serviceAreas: ServiceArea[] }>>(
    "/public/service-areas"
  );
  return data.data.serviceAreas;
};

export const getActiveLogo = async () => {
  const { data } = await api.get<ApiResponse<{ logo: Logo | null }>>(
    "/public/logo"
  );
  return data.data.logo;
};

export const getStyleAssets = async () => {
  const { data } = await api.get<ApiResponse<{ styleAssets: StyleAsset[] }>>(
    "/public/style-assets"
  );
  return data.data.styleAssets;
};

export const getServiceAreaBySlug = async (slug: string) => {
  const { data } = await api.get<ApiResponse<{ serviceArea: ServiceArea }>>(
    `/public/service-areas/${slug}`
  );
  return data.data.serviceArea;
};

export type { SiteSettings, FooterContent };

export interface PublicThemePayload {
  tokens: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const getSiteTheme = async () => {
  const { data } = await api.get<ApiResponse<PublicThemePayload>>("/public/theme");
  return data.data;
};
