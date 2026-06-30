export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface ImageData {
  url: string;
  publicId: string;
  alt: string;
}

export interface RefDoc {
  _id: string;
  name: string;
  slug: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image?: ImageData | null;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
}

export interface SubCategory {
  _id: string;
  category: string | RefDoc;
  title: string;
  slug: string;
  description: string;
  image?: ImageData | null;
  order: number;
  isActive: boolean;
}

export interface Project {
  _id: string;
  category: string | RefDoc;
  name: string;
  slug: string;
  description: string;
  location: string;
  mainImage?: ImageData | null;
  isFeatured: boolean;
  isActive: boolean;
  completedAt?: string | null;
}

export interface ProjectImage {
  _id: string;
  project: string;
  title: string;
  description: string;
  image: ImageData;
  order: number;
}

export interface GalleryItem {
  _id: string;
  category?: string | RefDoc | null;
  isHomeDayNight: boolean;
  title: string;
  description: string;
  dayImage: ImageData;
  nightImage: ImageData;
  order: number;
  isActive: boolean;
}

export interface NewsItem {
  _id: string;
  title: string;
  name: string;
  description: string;
  serviceDescription: string;
  image?: ImageData | null;
  buttonText: string;
  buttonUrl: string;
  order: number;
  isActive: boolean;
}

export interface Slider {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  image: ImageData;
  buttonText: string;
  buttonUrl: string;
  order: number;
  isActive: boolean;
}

export interface Logo {
  _id: string;
  name: string;
  image: ImageData;
  isActive: boolean;
  isAdminLogo?: boolean;
}

export interface StyleAsset {
  _id: string;
  name: string;
  key: string;
  isHomeInteractiveLights: boolean;
  images: ImageData[];
  isActive: boolean;
}

export interface FooterContactInfo {
  phoneCalls?: string;
  phoneMessages?: string;
  email?: string;
  location?: string;
}

export interface FooterSocialLink {
  platform: string;
  url: string;
}

export interface FooterContent {
  _id: string;
  companyDescription: string;
  openingHours: string;
  contactInfo: FooterContactInfo;
  socialLinks: FooterSocialLink[];
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  phoneCalls: string;
  phoneMessages: string;
  email: string;
  location: string;
  seoDefaults: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
}

export interface ServiceArea {
  _id: string;
  stateName: string;
  slug: string;
  counties: string[];
  mapEmbedUrl: string;
  title: string;
  description: string;
  customMessage: string;
  isActive: boolean;
}

export interface HomeData {
  sliders: Slider[];
  news: NewsItem[];
  logo: Logo | null;
  footer: FooterContent | null;
  settings: SiteSettings | null;
  categories: Category[];
  projects: Project[];
  gallery: GalleryItem[];
}

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  message: string;
}
