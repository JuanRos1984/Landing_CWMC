// src/types/pages.ts

export type Locale = "en" | "es" | "fr";
export type PageName = "home";

export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface ServiceCategory {
  id: number;
  categoryName: string;
  services: ServiceItem[];
}

export interface Hero {
  companyName: string;
  headline: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export interface About {
  title: string;
  content: string;
  image?: any;
}

export interface Services {
  title: string;
  description?: string | null;
  categories: ServiceCategory[];
}

export interface CTA {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  email: string;
}

export interface HomePage {
  hero: Hero;
  about: About;
  services: Services;
  cta: CTA;
}