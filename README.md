# Astro multi-framework experiment

An [Astro](https://astro.build) 6 project that mixes many UI frameworks on one page and
explores how they render, hydrate, nest inside each other and share state.

| Approach | Integration | Notes |
|---|---|---|
| React | `@astrojs/react` | scoped to `**/react/*` |
| Preact | `@astrojs/preact` | scoped to `**/preact/*` |
| Solid | `@astrojs/solid-js` | scoped to `**/solid/*` |
| Svelte 5 | `@astrojs/svelte` | |
| Vue 3 | `@astrojs/vue` | |
| Angular 21 | `@analogjs/astro-angular` | zoneless, signals |
| Qwik 2 (rc) | `@qwik.dev/astro` | **patched**, see below |
| Lit | none | plain custom elements, no SSR |
| Alpine.js | `@astrojs/alpinejs` | |
| htmx | none | one script import; not a framework |

## Run it

```sh
pnpm install
pnpm dev        # dev server
pnpm build      # builds dist/client (static files) and dist/server (Node adapter)
node dist/server/index.js   # serves the build, including the one per-request endpoint
```

The project uses `output: 'static'` with the Node adapter. Everything is prerendered except
`/fragments/server-time`, which is rendered per request. On a plain static file host that URL
returns 404 (the page then shows a visible error instead of doing nothing). Use the Node server
to see it work.

## Pages (tabs)

1. **Frameworks** (`/`): one card per framework with the same counter, the hydration directive
   used and what the initial HTML contains. Each card has a plain `<details>` About toggle. A
   separate section shows htmx as a layer fetching HTML fragments.
2. **Composition & shared state** (`/composition/`): inside each framework, a value is drilled
   Parent → Child → Grandchild as props with a callback going back up, in that framework's own
   idiom. Across frameworks, all nine subscribe to one hand-written store. A sticky plain-JS bar
   changes it.
3. **Cross-framework nesting** (`/nesting/`): wrappers nested through slots. Chain A is
   Svelte → Qwik → React. Chain B nests all ten (Svelte → Qwik → React → Preact → Solid → Vue →
   Lit → Alpine → htmx → Angular), each level with "local +1" and "store +1" buttons.
4. **Nanostores** (`/nanostores/`): the all-ten chain again on [nanostores](https://github.com/nanostores/nanostores)
   (an `atom` plus a `computed` store), using each framework's adapter where one exists.

## How state is shared

Islands do not share state by default. Sharing needs (1) one store instance every island can
reach and (2) a small binding per framework that turns "the store changed" into that framework's
re-render. The engine only changes how thin the binding is.

- `src/lib/shared-store.ts`: ~40-line hand-written store (`get`, `set`, `onChange`, `subscribe`
  following Svelte's store contract).
- `src/lib/nano-store.ts`: the nanostores version.

Both are anchored on `globalThis`. A plain module export worked for every island **except Qwik**,
whose code comes from a separate standalone build that bundles its own copy of the module (and so
its own atom). The anchor fixes it.

Nanostores adapter availability (checked at the time of writing):

| Level | Glue |
|---|---|
| React / Preact / Solid / Vue | `@nanostores/react` / `preact` / `solid` / `vue` (`useStore`) |
| Lit | `@nanostores/lit` (`StoreController`) |
| Svelte | none needed, an atom satisfies the store contract (`$store`) |
| Angular | `@nanostores/angular` is pinned to nanostores 0.7, so it is not used; `subscribe()` feeding a signal |
| Qwik | no adapter; `subscribe()` inside `useVisibleTask$` |
| Alpine | `subscribe()` through `window.__nano` |
| htmx | stateless; plain page JavaScript updates it (see caveats) |

Zustand's vanilla core would work too, but its only official hook is for React, so the other
frameworks would need hand-written glue like the store here. Untested in this repo.

## Configuration notes

- **Per-folder JSX scoping.** React, Preact, Solid and Qwik all use JSX, so each integration is
  limited with `include` (for example `react({ include: ['**/react/*'] })`) and each file has
  its own `@jsxImportSource` pragma.
- **Qwik include must also match Qwik core.** `qwik({ include: ['**/qwik/*', '**/@qwik.dev/core/**'] })`.
  Qwik's plugin rewrites placeholders inside `@qwik.dev/core` itself, and the integration's file
  filter skips anything not matching `include`. Leaving core out gives
  `__EXPERIMENTAL__ is not defined` or "Client manifest is not available".
- **`ngServerMode` plugin** (inline in `astro.config.mjs`). `@analogjs/vite-plugin-angular`
  derives `ngServerMode` from `build.ssr`, which Astro 6 evaluates once for every environment,
  so the client bundle was compiled as if it ran on the server and Angular failed with `NG0401`.
  The plugin forces `ngServerMode: 'false'` for the `client` environment.
- **`tsconfig.json`**: `experimentalDecorators: true` and `useDefineForClassFields: false`, needed
  for Lit's decorators.
- **Vite 8 beta override.** `package.json` forces `vite@^8.0.0-beta` through `pnpm.overrides`.
  The Qwik failure that this version caused was not Vite-specific (it failed identically on
  Vite 7), but the override is the likeliest source of future friction.
- **Pinned pre-release.** `@qwik.dev/astro` `1.0.2` and `@qwik.dev/core` `2.0.0-rc.2` are pinned
  exactly. Newer `@qwik.dev/astro` releases (1.1, 1.2) target Astro 7.
- **Patch**: `patches/@qwik.dev__astro@1.0.2.patch` (see Windows caveat below).

## Findings and caveats

### Angular (AnalogJS)

- **Angular can only be a leaf in a nested chain.** `@analogjs/astro-angular` ignores the
  children Astro passes, on the server (`renderToStaticMarkup(Component, props, _children)`) and
  in the browser. It probably isn't a hard limit (the browser side could pass `projectableNodes`
  to `createComponent`), but nobody has implemented it. Untested.
- **Standalone components need explicit imports.** `*ngIf` with `imports: []` fails with `NG0303`
  in dev *and* in the static build, and the element simply never toggles. Use `@if` (Angular 17+
  control flow), or import `NgIf`.
- **Each island is its own Angular application**, created with `createApplication()`. A
  `providedIn: 'root'` service is a singleton per island, not across islands, and an HTTP
  interceptor only sees that island's `HttpClient` (provide it through
  `static clientProviders` / `renderProviders`). To share across islands, back the service with
  the shared store. Untested here.
- Importing `zone.js` next to `provideZonelessChangeDetection()` logs `NG0914` in dev.

### Qwik

- **Windows: the integration's component scan fails.** `@qwik.dev/astro` 1.0.2 runs `grep` with
  `config.root.pathname` as its working directory. On Windows that is `/C:/...`, which is not a
  valid directory; the error is swallowed, no Qwik client build runs, and the build fails with
  "Client manifest is not available". The patch switches to `fileURLToPath(config.root)`. It
  also needs `grep` on `PATH`. Worth reporting upstream.
- **The legacy package does not work with Astro 6.** `@qwikdev/astro` (no dot) 0.8.3 targets
  Astro 4/5: dev crashes with `document is not defined` and the build fails in the prerender step.
- **Qwik wrappers block islands nested inside them.** Astro hydrates islands outside-in: a child
  waits until its parent island loses its `ssr` attribute and fires `astro:hydrate`. Qwik islands
  have no Astro client renderer (no `renderer-url`; they resume through qwikloader), so Astro
  never does either and everything nested inside stays frozen with no error. The nesting pages
  include a small script that clears `ssr` and dispatches `astro:hydrate` for islands without a
  `renderer-url`. It is a workaround for a gap in the integration.

### Nesting and hydration

- Nesting works only through `.astro` composition (slots). You cannot import one framework's
  component inside another's file. Props at each level come from Astro and are static; a wrapper
  cannot pass props to its slotted child, which arrives as finished HTML.
- **A hydrating wrapper re-creates the HTML slotted into it.** Plain DOM inside a wrapper (the
  htmx level) is replaced with fresh, unwired nodes: listeners are lost and htmx no longer knows
  its attributes. Alpine survived because it watches the DOM. The fix on the nesting pages is
  event delegation from `document`, looking elements up on every update, and calling
  `htmx.process()` when nodes are added. Nested *islands* are fine: a tagged leaf DOM node
  survived every wrapper re-render in both dev and the static build.
- Wrappers need to render their children: `{@render children()}` (Svelte), `<Slot />` (Qwik),
  `{children}` (React/Preact), `props.children` (Solid), `<slot />` (Vue), native `<slot>` (Lit),
  plain HTML (Alpine, htmx).
- Lit wrappers are plain custom elements, not islands. Children stay in the light DOM and are
  projected by the native `<slot>`. Shadow DOM means the page's global CSS does not reach inside,
  so the frame styles are repeated in the element.

### htmx

- **The ES build does not define `window.htmx`.** It initialises itself on import. Import it where
  you need `htmx.process()`.
- **htmx silently ignores 4xx/5xx responses and network failures.** A button hitting a missing
  endpoint looked dead. `Layout.astro` listens for `htmx:responseError` and `htmx:sendError` and
  writes the failure into the target.
- htmx holds no client state. The "store +1" button on the htmx levels is handled by the page's
  own JavaScript. To make htmx itself write to a store, use `hx-on:click` or an htmx event such
  as `hx-on::after-swap`. Not built here.

### Tooling hazard

- **Don't name calls `use*` in non-React files.** The dev-time React/Preact refresh transforms
  mistake any `use*` call for a hook, even in `.vue` files, and inject `$RefreshSig$`, which then
  throws during SSR (`$RefreshSig$ is not defined`). Seen with `useSlots()` (use `$slots` in the
  template) and `useStore` from `@nanostores/vue` and `@nanostores/solid` (imported as
  `useStore as fromStore`).

### Dependencies and environment

- Unmet peer warning remains: something wants `preact@^10`, the project has 11. Preact works in
  the tests above.
- Svelte cannot use a store named `$count`: the `$` prefix means auto-subscribe. The nanostores
  are `countStore` and `doubleStore`.
- Something on the author's machine held `dist/client` open, so `rm -rf dist` failed and builds
  overwrote files instead of replacing the folder. Delete `dist` before deploying so stale files
  do not ship.
- `docs/` is an old build output kept for GitHub Pages. It is out of date (it predates the
  fixes above) and has not been rebuilt, and `base` has not been adjusted for Pages.
- **React in a static build.** An older `docs/` build contained the dev JSX runtime
  (`jsxDEV is not a function`). A fresh build uses the production runtime and works. If it
  returns, check the `'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)` define in
  `astro.config.mjs`: it is `undefined` when `NODE_ENV` is unset.

## What was verified, and how

Behaviour was checked in headless Edge (puppeteer-core), against both the static build served by
the Node server and the dev server, after a warm-up load. For the ten-level chains: all levels
found (including inside Lit's shadow root), the control bar and every level's "store +1" updating
all counts, every wrapper's "local +1" re-rendering without replacing the deepest island, the
htmx fetch swapping a fragment, and zero console errors. Dev shows a single
`504 Outdated Optimize Dep` on first load, which is Vite re-optimising dependencies.

Not verified: GitHub Pages deployment, other operating systems (the Qwik patch is Windows-driven),
other browsers, the zustand alternative, a custom Angular service or interceptor, and
`client:visible` or `client:only` mixed into the nested chains (everything there uses `client:load`).

## VS Code

Install the extensions:

- https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode
- https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode

## References

- https://github.com/kathirr007/astro-multi-framework/blob/main/astro.config.mjs
- https://github.com/QwikDev/astro
- https://docs.astro.build/en/recipes/sharing-state-islands/
