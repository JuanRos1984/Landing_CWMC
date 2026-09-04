// src/pages/api/contact.ts
import type { APIRoute } from "astro";
import { sendContactEmail, validateContactForm } from "../../lib/email";

export const prerender = false;

/** Tamano maximo del cuerpo aceptado, para no leer cargas enormes. */
const MAX_BODY_BYTES = 16 * 1024;

/** Limite por IP: ventana y numero de envios permitidos dentro de ella. */
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

function clientKey(request: Request, clientAddress: string | undefined): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return clientAddress ?? "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Limpieza ocasional para que el mapa no crezca sin control.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ error: "Unsupported content type" }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Payload too large" }, 413);
  }

  if (isRateLimited(clientKey(request, clientAddress))) {
    return json({ error: "Too many messages. Please try again later." }, 429);
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ error: "Payload too large" }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  // Campo trampa: es invisible para las personas, solo lo rellenan los bots.
  if (typeof (body as any)?.website === "string" && (body as any).website.trim() !== "") {
    // Se responde 200 a proposito, para no ensenarle al bot que fue detectado.
    return json({ success: true }, 200);
  }

  const validated = validateContactForm(body);
  if (!validated.ok) {
    return json({ error: validated.error }, 400);
  }

  const result = await sendContactEmail(validated.data);
  if (!result.success) {
    return json({ error: result.error }, 502);
  }

  return json({ success: true }, 200);
};

/** Cualquier otro metodo sobre esta ruta se rechaza explicitamente. */
export const ALL: APIRoute = () => json({ error: "Method not allowed" }, 405);
