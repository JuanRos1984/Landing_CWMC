import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro } from '../chunks/astro/server_CNSPw4r1.mjs';
import 'piccolore';
import { g as getPage, $ as $$BaseLayout, a as $$Hero, b as $$About, c as $$Services, d as $$CTA, e as $$ContactForm } from '../chunks/api_B_nOwMmh.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [
    { params: { locale: "en" } },
    { params: { locale: "es" } },
    { params: { locale: "fr" } }
  ];
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { locale } = Astro2.params;
  const validLocales = ["en", "es", "fr"];
  const safeLocale = validLocales.includes(locale) ? locale : "en";
  const page = await getPage("home", safeLocale);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": page.hero.companyName }, { "contact-form": async ($$result2) => renderTemplate`${renderComponent($$result2, "ContactForm", $$ContactForm, { "slot": "contact-form", "email": page.cta.email })}`, "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "companyName": page.hero.companyName, "title": page.hero.headline, "description": page.hero.description, "buttonText": page.hero.buttonText, "buttonUrl": page.hero.buttonUrl })} ${renderComponent($$result2, "About", $$About, { "data": page.about })} ${renderComponent($$result2, "Services", $$Services, { "data": page.services })} ${renderComponent($$result2, "CTA", $$CTA, { "data": page.cta })} ` })}`;
}, "C:/PROYECTOS/Landing_CWMC/src/pages/[locale]/index.astro", void 0);

const $$file = "C:/PROYECTOS/Landing_CWMC/src/pages/[locale]/index.astro";
const $$url = "/[locale]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
