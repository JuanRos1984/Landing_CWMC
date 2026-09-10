import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://connectingwordsmc.com',
  // Sitio estatico: las paginas se generan al compilar, leyendo el contenido
  // de Strapi una sola vez. Render las sirve desde su red de distribucion,
  // sin servidor propio y sin arranque en frio.
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
