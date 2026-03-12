// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import solidJs from '@astrojs/solid-js';

import svelte from '@astrojs/svelte';

import vue from '@astrojs/vue';

import angular from '@analogjs/astro-angular';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  base: "/",
  output: "static",

  integrations: [
    react({ include: ['**/react/*'] }),
    solidJs({ include: ['**/solid/*'] }),
    svelte(),
    vue(),
    angular({
      vite: {
        supportedBrowsers: ['chrome', 'edge', 'firefox', 'safari'],
        include: ['src/components/angular/*'],
        additionalContentDirs: ['src/components/angular'],
        inlineStylesExtension: 'scss|sass|less',
        transformFilter: (_code, id) => {
          if (id.includes('src/components/angular')) console.log("AnalogJS: Transforming Angular file:", id);
          return id.includes('src/components/angular'); // <- only transform Angular TypeScript files
        },
      },
    }),
  ],

  vite: {
    ssr: {
      // transform these packages during SSR. Globs supported
      noExternal: ['@rx-angular/**', /@angular/, /@analogjs/, /zone.js/],
    },
    resolve: { // to ensure both Svelte and AnalogJS work together
      conditions: ['browser'],
    },
    define: {
      // Memaksa Angular mengetahui bahwa ini adalah lingkungan browser
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'global': 'globalThis', // Membantu Angular menemukan global context
    },
    build: {
      rollupOptions: {
        treeshake: false,
        output: {
          minifyInternalExports: false,
          // Paksa Rolldown menyatukan vendor Angular agar tidak terpisah-pisah
          manualChunks(id) {
            if (id.includes('@angular') || id.includes('@analogjs') || id.includes('zone.js')) {
              console.log("[Rolldown] Merging vendor Angular", id);
              return 'angular-vendor';
            }
          }
        }
      },
      sourcemap: true,
      modulePreload: false,
      minify: "terser",
      terserOptions: {
        mangle: false, // Matikan pengacakan nama (untuk Terser)
        keep_fnames: true,
        keep_classnames: true,
      },
      cssMinify: false,
      assetsInlineLimit: 0, // disable inlining of assets
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});