// src/lib/api.ts
//
// Esta capa solo corre al compilar. El sitio es estatico, asi que Strapi se
// consulta una vez por idioma durante la construccion y nunca cuando alguien
// visita la pagina. Si Strapi no responde, la compilacion falla a proposito:
// mas vale que no salga una version nueva a que salga una vacia. La version
// anterior del sitio sigue publicada mientras tanto.

import type { PageName, Locale, HomePage, ServiceCategory, ServiceItem } from "../types/pages";

const STRAPI_URL =
  import.meta.env.STRAPI_URL ??
  import.meta.env.PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

const API_URL = `${STRAPI_URL.replace(/\/$/, "")}/api`;

/** Cuanto esperamos a Strapi. Generoso: si esta dormido, tarda en despertar. */
const REQUEST_TIMEOUT_MS = Number(import.meta.env.STRAPI_TIMEOUT_MS ?? 90_000);

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

export async function getPage(page: PageName, locale: Locale): Promise<HomePage> {
  if (page !== "home") throw new Error("Pagina no soportada");

  const url = `${API_URL}/home?locale=${encodeURIComponent(
    locale
  )}&populate[service_categories][populate][services]=*`;

  let res: Response;

  try {
    res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new Error(
      `No se pudo contactar con Strapi en ${API_URL} para el locale ${locale}. ` +
        `Revisa que STRAPI_URL apunte al sitio correcto y que el servicio este despierto. ` +
        `Detalle: ${error instanceof Error ? error.message : error}`
    );
  }

  if (!res.ok) {
    throw new Error(
      `Strapi respondio ${res.status} ${res.statusText} en ${API_URL}/home (locale ${locale}). ` +
        `Un 403 aqui suele significar que al rol publico le falta el permiso de lectura sobre Home.`
    );
  }

  const json = (await res.json()) as StrapiResponse<StrapiHomeData>;

  if (!json?.data) {
    throw new Error(
      `Strapi no devolvio contenido para el locale ${locale}. ` +
        `Comprueba que la entrada Home este publicada en ese idioma.`
    );
  }

  return mapHomePage(json.data);
}
