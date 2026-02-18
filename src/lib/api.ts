// src/lib/api.ts
import type { PageName, Locale, HomePage, ServiceCategory, ServiceItem } from "../types/pages";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

interface StrapiResponse<T> {
  data: T;
  meta: any;
}


interface StrapiHomeData {
  id: number;
  documentId: string;
  hero_companyName: string;
  hero_headline: string;
  hero_description: any; // Rich text blocks
  hero_buttonText: string;
  hero_buttonUrl: string;
  
  about_title: string;
  about_content: any; // Rich text blocks
  
  services_title: string;
  services_description: any | null;
  service_categories?: Array<{
    id: number;
    categoryName: string;
    services: Array<{
      id: number;
      name: string;
      description: any; // Rich text blocks
      icon: string | null;
    }>;
  }>;
  
  cta_title: string;
  cta_description: any;
  cta_buttonText: string;
  cta_buttonUrl: string;
  cta_email: string;
  
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export async function getPage(page: PageName, locale: Locale): Promise<HomePage> {
  if (page !== "home") throw new Error("Página no soportada");

  const url = `${API_URL}/home?locale=${locale}&populate[service_categories][populate][services]=*`;
  

  
  const res = await fetch(url);
  const json: StrapiResponse<StrapiHomeData> = await res.json();

  if (!json?.data) {
    throw new Error(`Home no encontrado en Strapi para locale: ${locale}`);
  }

  const data = json.data;


  let categories: ServiceCategory[] = [];

    
  const extractText = (richText: any): string => {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    
    if (Array.isArray(richText)) {
      return richText.map(block => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      }).join('\n');
    }
    return '';
  };
  
  if (data.service_categories && Array.isArray(data.service_categories)) {
    categories = data.service_categories.map((cat) => {
      let services: ServiceItem[] = [];
      
      if (cat.services && Array.isArray(cat.services)) {
        services = cat.services.map((svc) => ({
          id: svc.id,
          name: svc.name,
          description: svc.description ? extractText(svc.description) : '',
          icon: svc.icon || undefined,
        }));
      }
      
      return {
        id: cat.id,
        categoryName: cat.categoryName,
        services,
      };
    });
  }



  
  const homePage: HomePage = {
    hero: {
      companyName: data.hero_companyName,
      headline: data.hero_headline,
      description: extractText(data.hero_description),
      buttonText: data.hero_buttonText,
      buttonUrl: data.hero_buttonUrl,
    },
    about: {
      title: data.about_title,
      content: extractText(data.about_content),
      image: null,
    },
    services: {
      title: data.services_title,
      description: data.services_description ? extractText(data.services_description) : undefined,
      categories,
    },
    cta: {
      title: data.cta_title,
      description: extractText(data.cta_description),
      buttonText: data.cta_buttonText,
      buttonUrl: data.cta_buttonUrl,
      email: data.cta_email,
    },
  };

  return homePage;
}
