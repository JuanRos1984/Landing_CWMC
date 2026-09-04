import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://connectingwordsmc.com',
  output: 'server',
  // Render ejecuta el servidor de Node directamente: modo standalone.
  // El servidor lee HOST y PORT del entorno, que es lo que Render inyecta.
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
  },
});
