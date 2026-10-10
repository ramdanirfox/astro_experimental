// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import solidJs from '@astrojs/solid-js';

import svelte from '@astrojs/svelte';

import vue from '@astrojs/vue';

import preact from '@astrojs/preact';

import qwik from '@qwik.dev/astro';

import alpinejs from '@astrojs/alpinejs';

import angular from '@analogjs/astro-angular';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  base: "/",
  output: "static",

  integrations: [
    react({ include: ['**/react/*'] }),
    preact({ include: ['**/preact/*'] }),
    solidJs({ include: ['**/solid/*'] }),
    qwik({ clientRouter: false, include: ['**/qwik/*', '**/@qwik.dev/core/**'] }),
    alpinejs(),
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
    plugins: [{
      // @analogjs/vite-plugin-angular derives ngServerMode from build.ssr, which Astro
      // evaluates once for every environment, so the client bundle ends up as "server".
      name: 'fix-ng-server-mode',
      enforce: 'post',
      configEnvironment(name) {
        if (name === 'client') return { define: { ngServerMode: 'false' } };
      },
    }],
    ssr: {
      // transform these packages during SSR. Globs supported
      noExternal: ['@rx-angular/**', '@qwik.dev/core', /@angular/, /@analogjs/, /zone.js/],
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