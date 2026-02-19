//----------CONFIGURACION LOCAL
// import { defineConfig } from 'astro/config';
// import tailwindcss from '@tailwindcss/vite';
// import node from '@astrojs/node';

// // https://astro.build/config
// export default defineConfig({
//   output: 'static', 
//   vite: {
//     plugins: [tailwindcss()]
//   },
//   adapter: node({
//     mode: 'standalone'
//   })
// });


//----------CONFIGURACION PARA PRODUCCION
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: 'standalone'
  })
});
