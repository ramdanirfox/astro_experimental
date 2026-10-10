export const frameworks = [
	{ id: 'react', name: 'React', about: 'Virtual DOM, huge ecosystem. Here it is client-only: no HTML is rendered at build time.' },
	{ id: 'preact', name: 'Preact', about: '3 kB React-compatible runtime. Rendered to HTML at build time, then hydrated on load.' },
	{ id: 'solid', name: 'Solid', about: 'Fine-grained signals, no virtual DOM. Client-only island in this demo.' },
	{ id: 'svelte', name: 'Svelte', about: 'A compiler: components become small imperative code. Client-only island here.' },
	{ id: 'vue', name: 'Vue', about: 'Reactive refs plus single-file components. Client-only island here.' },
	{ id: 'angular', name: 'Angular', about: 'Full framework (AnalogJS). Server-rendered at build time, hydrated when scrolled into view.' },
	{ id: 'qwik', name: 'Qwik', about: 'Resumable: the server serializes app state into the HTML, and the browser loads code only when you interact.' },
	{ id: 'lit', name: 'Lit', about: 'Small base class over native custom elements with Shadow DOM. Works anywhere, since it is a web standard.' },
	{ id: 'alpine', name: 'Alpine.js', about: 'Behavior declared in HTML attributes. No components, no build step needed for the logic.' },
] as const;

export const aboutById: Record<string, string> = Object.fromEntries(
	frameworks.map((f) => [f.id, f.about]),
);
