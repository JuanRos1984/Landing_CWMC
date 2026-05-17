import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_CNSPw4r1.mjs';
import 'piccolore';
import { g as getPage, $ as $$BaseLayout, e as $$ContactForm, a as $$Hero, b as $$About, c as $$Services, d as $$CTA } from '../chunks/api_B_nOwMmh.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const DEFAULT_LOCALE = "en";
  const page = await getPage("home", DEFAULT_LOCALE);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": page.hero.companyName }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ContactForm", $$ContactForm, { "email": page.cta.email })} ${renderComponent($$result2, "Hero", $$Hero, { "companyName": page.hero.companyName, "title": page.hero.headline, "description": page.hero.description, "buttonText": page.hero.buttonText, "buttonUrl": page.hero.buttonUrl })} ${renderComponent($$result2, "About", $$About, { "data": page.about })} ${renderComponent($$result2, "Services", $$Services, { "data": page.services })} ${renderComponent($$result2, "CTA", $$CTA, { "data": page.cta })} ` })}`;
}, "C:/PROYECTOS/Landing_CWMC/src/pages/index.astro", void 0);

const $$file = "C:/PROYECTOS/Landing_CWMC/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
