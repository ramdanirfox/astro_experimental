import type { APIRoute, GetStaticPaths } from 'astro';
import { aboutById, frameworks } from '../../data/frameworks';

// htmx is not one of the framework cards, but the nesting demo fetches a fragment for it too.
const about: Record<string, string> = {
	...aboutById,
	htmx: 'Fetched by htmx from a prerendered route and swapped in as plain HTML.',
};

export const getStaticPaths = (() =>
	[...frameworks.map((f) => f.id), 'htmx'].map((name) => ({
		params: { name },
	}))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
	new Response(`<span class="fact">${about[params.name!]}</span>`, {
		headers: { 'Content-Type': 'text/html; charset=utf-8' },
	});
