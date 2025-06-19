// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import solidJs from '@astrojs/solid-js';

import svelte from '@astrojs/svelte';

import vue from '@astrojs/vue';

import angular from '@analogjs/astro-angular';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({ include: ['**/react/*'] }),
    solidJs({ include: ['**/solid/*'] }),
    svelte(),
    vue(),
    angular({
      vite: {
        additionalContentDirs: ['src/components/angular'],
        inlineStylesExtension: 'scss|sass|less',
        transformFilter: (_code, id) => {
          return id.includes('src/components/angular'); // <- only transform Angular TypeScript files
        },
      },
    }),
  ],
  vite: {
    ssr: {
      // transform these packages during SSR. Globs supported
      noExternal: ['@rx-angular/**'],
    },
    resolve: { // to ensure both Svelte and AnalogJS work together
      conditions: ['browser'],
    },
    build: {
      sourcemap: true,
      minify: false,
      cssMinify: false
    }
  }
});