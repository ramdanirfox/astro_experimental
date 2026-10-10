import type { APIRoute } from 'astro';

// Rendered per request, so it needs the Node server (`node dist/server/index.js`),
// not a plain static file host.
export const prerender = false;

export const GET: APIRoute = () =>
	new Response(`<p class="fact">Server time: <time>${new Date().toISOString()}</time></p>`, {
		headers: { 'Content-Type': 'text/html; charset=utf-8' },
	});
