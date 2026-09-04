// src/lib/api.ts
import type { PageName, Locale, HomePage, ServiceCategory, ServiceItem } from "../types/pages";

const STRAPI_URL =
  import.meta.env.STRAPI_URL ??
  import.meta.env.PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

const API_URL = `${STRAPI_URL.replace(/\/$/, "")}/api`;

/** Cuanto tarda una peticion a Strapi antes de darla por perdida. */
const REQUEST_TIMEOUT_MS = Number(import.meta.env.STRAPI_TIMEOUT_MS ?? 8000);

/** Cuanto tiempo se sirve una respuesta cacheada sin volver a preguntar. */
const CACHE_TTL_MS = Number(import.meta.env.STRAPI_CACHE_TTL_MS ?? 60_000);

/**
 * Cache en memoria por locale. Cumple dos funciones:
 *  1. Evita golpear Strapi en cada visita.
 *  2. Guarda la ultima version buena, para seguir sirviendo la pagina si
 *     Strapi esta reiniciando, dormido o caido.
 */
type CacheEntry = { page: HomePage; fetchedAt: number };
const cache = new Map<string, CacheEntry>();

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

const extractText = (richText: any): string => {
  if (!richText) return "";
  if (typeof richText === "string") return richText;

  if (Array.isArray(richText)) {
    return richText
      .map((block) => {
        if (block?.children) {
          return block.children.map((child: any) => child?.text ?? "").join("");
        }
        return "";
      })
      .join("\n");
  }
  return "";
};

function mapHomePage(data: StrapiHomeData): HomePage {
  let categories: ServiceCategory[] = [];

  if (Array.isArray(data.service_categories)) {
    categories = data.service_categories.map((cat) => {
      let services: ServiceItem[] = [];

      if (Array.isArray(cat.services)) {
        services = cat.services.map((svc) => ({
          id: svc.id,
          name: svc.name,
          description: svc.description ? extractText(svc.description) : "",
          icon: svc.icon || undefined,
        }));
      }

      return { id: cat.id, categoryName: cat.categoryName, services };
    });
  }

  return {
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
      description: data.services_description
        ? extractText(data.services_description)
        : undefined,
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
}

async function fetchHome(locale: Locale): Promise<HomePage> {
  const url = `${API_URL}/home?locale=${encodeURIComponent(
    locale
  )}&populate[service_categories][populate][services]=*`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(
      `Strapi respondio ${res.status} ${res.statusText} en ${API_URL}/home (locale ${locale})`
    );
  }

  const json = (await res.json()) as StrapiResponse<StrapiHomeData>;

  if (!json?.data) {
    throw new Error(`Home sin datos en Strapi para el locale ${locale}`);
  }

  return mapHomePage(json.data);
}

export async function getPage(page: PageName, locale: Locale): Promise<HomePage> {
  if (page !== "home") throw new Error("Pagina no soportada");

  const cached = cache.get(locale);

  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.page;
  }

  try {
    const fresh = await fetchHome(locale);
    cache.set(locale, { page: fresh, fetchedAt: Date.now() });
    return fresh;
  } catch (error) {
    // Strapi fallo. Si tenemos una version anterior la servimos igual:
    // una pagina con contenido de hace un rato es mejor que un error 500.
    if (cached) {
      console.error(
        `[strapi] fallo la recarga del locale ${locale}, se sirve la copia en cache:`,
        error instanceof Error ? error.message : error
      );
      return cached.page;
    }

    console.error(
      `[strapi] sin datos ni cache para el locale ${locale}:`,
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}
