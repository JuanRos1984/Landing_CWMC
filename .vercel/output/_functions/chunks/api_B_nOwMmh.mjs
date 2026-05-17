import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, l as renderSlot, k as renderComponent, n as renderHead } from './astro/server_CNSPw4r1.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

const $$Astro$6 = createAstro();
const $$LanguageSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$LanguageSelector;
  const { currentLocale } = Astro2.props;
  const languages = [
    { code: "en", label: "English", flag: "us" },
    { code: "es", label: "Espa\xF1ol", flag: "\u{1F1EA}\u{1F1F8}" },
    { code: "fr", label: "Fran\xE7ais", flag: "\u{1F1EB}\u{1F1F7}" }
  ];
  const { pathname } = Astro2.url;
  const basePath = pathname.replace(/^\/(en|es|fr)/, "") || "/";
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-4 right-4 z-50"> <div class="relative" x-data="{ open: false }"> <!-- Botón del idioma actual --> <button @click="open = !open" @keydown.escape="open = false" class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"> <span class="text-lg"> ${languages.find((lang) => lang.code === currentLocale)?.flag} </span> <span class="font-medium text-gray-700 hidden sm:inline"> ${languages.find((lang) => lang.code === currentLocale)?.label} </span> <svg class="w-4 h-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <!-- Dropdown --> <div x-show="open" @click.away="open = false" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-95" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50" style="display: none;"> ${languages.map((lang) => renderTemplate`<a${addAttribute(lang.code, "key")}${addAttribute(`/${lang.code}${basePath}`, "href")}${addAttribute(`
            flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition
            ${lang.code === currentLocale ? "bg-blue-50 text-blue-600" : "text-gray-700"}
            ${lang.code === languages[0].code ? "rounded-t-lg" : ""}
            ${lang.code === languages[languages.length - 1].code ? "rounded-b-lg" : ""}
          `, "class")}> <span class="text-lg">${lang.flag}</span> <span class="font-medium">${lang.label}</span> ${lang.code === currentLocale && renderTemplate`<svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>`} </a>`)} </div> </div> </nav>`;
}, "C:/PROYECTOS/Landing_CWMC/src/components/LanguageSelector.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$5 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "Landing" } = Astro2.props;
  const { pathname } = Astro2.url;
  const currentLocale = pathname.split("/")[1] || "en";
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><!-- Alpine.js CDN --><script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"><\/script>', '</head> <!-- Color del logo --> <!-- <body style="background-color: #0f1f41;" class="text-gray-100 antialiased" x-data="{ showContactForm: false }"></body> --> <!-- Color recomendado --> <body class="bg-gradient-to-b from-blue-200 to-white" x-data="{ showContactForm: false }"> <!--0f1f41 el azul del fondo--> ', " ", " <main> ", " </main> </body></html>"])), addAttribute(currentLocale, "lang"), title, renderHead(), renderComponent($$result, "LanguageSelector", $$LanguageSelector, { "currentLocale": currentLocale }), renderSlot($$result, $$slots["contact-form"]), renderSlot($$result, $$slots["default"]));
}, "C:/PROYECTOS/Landing_CWMC/src/layouts/BaseLayout.astro", void 0);

const $$Astro$4 = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Hero;
  const { companyName, title, description, buttonText, buttonUrl, backgroundImage } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"> <!-- Video de fondo con overlay más suave --> <div class="absolute inset-0 z-0"> <video autoplay muted loop playsinline class="w-full h-full object-cover"> <source src="/images/hero/hero-video-5.mp4" type="video/mp4">
Tu navegador no soporta videos.
</video> <!-- Overlay más suave (Opción 4) --> <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div> </div> <!-- Contenido --> <div class="relative z-10 text-center max-w-3xl mx-auto text-white"> <!-- Logo con efecto glassmorphism (Opción 1) --> <div class="mb-6 inline-block  bg-white/10 rounded-2xl p-4 md:p-6"> <img src="/images/logo.png" alt="Connecting Words MC" class="h-50 sm:h-54 md:h-58 mx-auto object-contain" loading="eager"> </div> <!-- Título --> <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-6"> ${title} </h1> <!-- Descripción --> <p class="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-8"> ${description} </p> <!-- Botón --> <div class="mt-6"> <a${addAttribute(buttonUrl, "href")} class="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl"> ${buttonText} </a> </div> </div> </section>`;
}, "C:/PROYECTOS/Landing_CWMC/src/components/Hero.astro", void 0);

const $$Astro$3 = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$About;
  const { data, imageUrl } = Astro2.props;
  const defaultImage = "/images/about/virtual-meeting.jpg";
  return renderTemplate`${maybeRenderHead()}<section id="about" class="py-16 sm:py-20 lg:py-24 bg-transparent"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-6xl mx-auto"> <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 text-center"> ${data.title} </h2> <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"> <!-- Texto --> <div class="prose prose-base sm:prose-lg max-w-none text-gray-600 order-2 md:order-1"> ${data.content.split("\n").map((paragraph) => renderTemplate`<p class="mb-3 sm:mb-4 last:mb-0">${paragraph}</p>`)} </div> <!-- Imagen --> <div class="order-1 md:order-2 mb-6 md:mb-0"> <img${addAttribute(imageUrl || defaultImage, "src")}${addAttribute(data.title, "alt")} class="w-full h-auto rounded-xl shadow-lg object-cover" loading="lazy"> </div> </div> </div> </div> </section>`;
}, "C:/PROYECTOS/Landing_CWMC/src/components/About.astro", void 0);

const $$Astro$2 = createAstro();
const $$Services = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Services;
  const { data, serviceIcons = {} } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="services" class="py-16 sm:py-20 lg:py-24 bg-transparent"> <div class="container mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"> <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"> ${data.title} </h2> ${data.description && renderTemplate`<p class="text-base sm:text-lg lg:text-xl text-gray-600"> ${data.description} </p>`} </div> <div class="space-y-12 sm:space-y-16 lg:space-y-20"> ${data.categories.map((category) => renderTemplate`<div${addAttribute(category.id, "key")} class="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-10"> <h3 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6 pb-2 border-b"> ${category.categoryName} </h3> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"> ${category.services.map((service) => renderTemplate`<div${addAttribute(service.id, "key")} class="p-4 sm:p-5 lg:p-6 border rounded-lg hover:shadow-md transition">  ${serviceIcons[service.name] && renderTemplate`<div class="mb-3 sm:mb-4"> <img${addAttribute(serviceIcons[service.name], "src")} alt="" class="w-12 h-12 object-contain" loading="lazy"> </div>`} <h4 class="font-semibold text-gray-900 mb-2 text-base sm:text-lg"> ${service.name} </h4> <p class="text-sm sm:text-base text-gray-600 leading-relaxed"> ${service.description} </p> </div>`)} </div> </div>`)} </div> </div> </section>`;
}, "C:/PROYECTOS/Landing_CWMC/src/components/Services.astro", void 0);

const $$Astro$1 = createAstro();
const $$CTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CTA;
  const { data, backgroundImage } = Astro2.props;
  const bgImage = backgroundImage || "/images/cta/hiring-2.jpg";
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="relative py-16 sm:py-20 lg:py-24 overflow-hidden"> <!-- Imagen de fondo --> <div class="absolute inset-0 z-0"> <img${addAttribute(bgImage, "src")} alt="" class="w-full h-full object-cover" loading="lazy"> <div class="absolute inset-0 bg-blue-900/80"></div> </div> <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-3xl mx-auto text-center text-white"> <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"> ${data.title} </h2> <p class="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed"> ${data.description} </p> <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"> <!-- Botón --> <button @click="showContactForm = true" class="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-center text-sm sm:text-base shadow-md hover:shadow-lg cursor-pointer"> ${data.buttonText} </button> </div> </div> </div> </section>`;
}, "C:/PROYECTOS/Landing_CWMC/src/components/CTA.astro", void 0);

const $$Astro = createAstro();
const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContactForm;
  const { email } = Astro2.props;
  return renderTemplate`<!-- Modal overlay -->${maybeRenderHead()}<div x-show="showContactForm" @click.away="showContactForm = false" @keydown.escape="showContactForm = false" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" style="display: none;" x-cloak${addAttribute(email, "data-email")} data-astro-cid-svshx33u> <!-- Modal content --> <div class="bg-white rounded-xl shadow-2xl max-w-md w-full" @click.stop data-astro-cid-svshx33u> <!-- Header --> <div class="flex items-center justify-between p-6 border-b" data-astro-cid-svshx33u> <h3 class="text-2xl font-bold text-gray-900" data-astro-cid-svshx33u>Contact Us</h3> <button @click="showContactForm = false" class="text-gray-400 hover:text-gray-600 transition text-2xl" data-astro-cid-svshx33u>
×
</button> </div> <!-- Form --> <div class="p-6" data-astro-cid-svshx33u> <form x-data="{
          formName: '',
          formEmail: '',
          formMessage: '',
          isSending: false,
          messageSent: false,
          errorMessage: '',
          
         
          get destinationEmail() {
            return this.$el.closest('[data-email]').dataset.email;
          },
          
          async enviarFormulario() {
           
 
            
            this.isSending = true;
            this.messageSent = false;
            this.errorMessage = '';
            
            try {
              const datos = {
                name: this.formName,
                email: this.formEmail,
                message: this.formMessage,
                to: this.destinationEmail
              };
              
              
              
              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
              });
              
             
              
              const responseText = await response.text();
            
              
              let data;
              try {
                data = JSON.parse(responseText);
              } catch (e) {
                console.error('Error parseando respuesta:', responseText);
                throw new Error('Respuesta inválida del servidor');
              }
              
              if (!response.ok) {
                throw new Error(data.error || 'Error al enviar mensaje');
              }
              
              this.messageSent = true;
              this.formName = '';
              this.formEmail = '';
              this.formMessage = '';
              
              setTimeout(() => {
                showContactForm = false;
                this.messageSent = false;
              }, 2000);
              
            } catch (error) {
              
              this.errorMessage = error.message || 'Error al enviar. Intenta de nuevo.';
            } finally {
              this.isSending = false;
            }
          }
        }" @submit.prevent="enviarFormulario" data-astro-cid-svshx33u> <div class="space-y-4" data-astro-cid-svshx33u> <!-- Name --> <div data-astro-cid-svshx33u> <label class="block text-sm font-medium text-gray-700 mb-1" data-astro-cid-svshx33u>Name *</label> <input type="text" x-model="formName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Your name" data-astro-cid-svshx33u> </div> <!-- Email --> <div data-astro-cid-svshx33u> <label class="block text-sm font-medium text-gray-700 mb-1" data-astro-cid-svshx33u>Email *</label> <input type="email" x-model="formEmail" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" data-astro-cid-svshx33u> </div> <!-- Message --> <div data-astro-cid-svshx33u> <label class="block text-sm font-medium text-gray-700 mb-1" data-astro-cid-svshx33u>Message *</label> <textarea x-model="formMessage" required rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="How can we help you?" data-astro-cid-svshx33u></textarea> </div> <!-- Submit button --> <button type="submit" :disabled="isSending" class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50" data-astro-cid-svshx33u> <span x-show="!isSending" data-astro-cid-svshx33u>Send Message</span> <span x-show="isSending" class="flex items-center justify-center gap-2" data-astro-cid-svshx33u> <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" data-astro-cid-svshx33u> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" data-astro-cid-svshx33u></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-astro-cid-svshx33u></path> </svg>
Sending...
</span> </button> <div x-show="messageSent" class="p-3 bg-green-100 text-green-700 rounded-lg text-center" data-astro-cid-svshx33u>
¡Message sended successfully!
</div> <div x-show="errorMessage" class="p-3 bg-red-100 text-red-700 rounded-lg text-center" data-astro-cid-svshx33u> <p x-text="errorMessage" data-astro-cid-svshx33u></p> </div> </div> </form> </div> </div> </div> `;
}, "C:/PROYECTOS/Landing_CWMC/src/components/ContactForm.astro", void 0);

const STRAPI_URL = "https://strapi-cwmc.onrender.com";
const API_URL = `${STRAPI_URL.replace(/\/$/, "")}/api`;
async function getPage(page, locale) {
  const url = `${API_URL}/home?locale=${locale}&populate[service_categories][populate][services]=*`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json?.data) {
    throw new Error(`Home no encontrado en Strapi para locale: ${locale}`);
  }
  const data = json.data;
  let categories = [];
  const extractText = (richText) => {
    if (!richText) return "";
    if (typeof richText === "string") return richText;
    if (Array.isArray(richText)) {
      return richText.map((block) => {
        if (block.children) {
          return block.children.map((child) => child.text || "").join("");
        }
        return "";
      }).join("\n");
    }
    return "";
  };
  if (data.service_categories && Array.isArray(data.service_categories)) {
    categories = data.service_categories.map((cat) => {
      let services = [];
      if (cat.services && Array.isArray(cat.services)) {
        services = cat.services.map((svc) => ({
          id: svc.id,
          name: svc.name,
          description: svc.description ? extractText(svc.description) : "",
          icon: svc.icon || void 0
        }));
      }
      return {
        id: cat.id,
        categoryName: cat.categoryName,
        services
      };
    });
  }
  const homePage = {
    hero: {
      companyName: data.hero_companyName,
      headline: data.hero_headline,
      description: extractText(data.hero_description),
      buttonText: data.hero_buttonText,
      buttonUrl: data.hero_buttonUrl
    },
    about: {
      title: data.about_title,
      content: extractText(data.about_content),
      image: null
    },
    services: {
      title: data.services_title,
      description: data.services_description ? extractText(data.services_description) : void 0,
      categories
    },
    cta: {
      title: data.cta_title,
      description: extractText(data.cta_description),
      buttonText: data.cta_buttonText,
      buttonUrl: data.cta_buttonUrl,
      email: data.cta_email
    }
  };
  return homePage;
}

export { $$BaseLayout as $, $$Hero as a, $$About as b, $$Services as c, $$CTA as d, $$ContactForm as e, getPage as g };
