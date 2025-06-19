import { d as delegate, f as from_html, a as first_child, s as state, b as sibling, e as snippet, t as template_effect, g as append, i as set, j as get, k as child, r as reset, n as noop, l as set_text } from './index-client.B-8OYcxY.js';

// generated during release, do not modify

const PUBLIC_VERSION = '5';

if (typeof window !== 'undefined') {
	// @ts-expect-error
	((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
}

function add(_, count) {
	set(count, get(count) + 1);
}

function subtract(__1, count) {
	set(count, get(count) - 1);
}

var root = from_html(`<div class="counter"><div>Svelte</div> <button>-</button> <pre> </pre> <button>+</button></div> <div class="counter-message"><!></div>`, 1);

function SvelteCounter($$anchor, $$props) {
	let count = state(0);
	var fragment = root();
	var div = first_child(fragment);
	var button = sibling(child(div), 2);

	button.__click = [subtract, count];

	var pre = sibling(button, 2);
	var text = child(pre, true);

	reset(pre);

	var button_1 = sibling(pre, 2);

	button_1.__click = [add, count];
	reset(div);

	var div_1 = sibling(div, 2);
	var node = child(div_1);

	snippet(node, () => $$props.children ?? noop);
	reset(div_1);
	template_effect(() => set_text(text, get(count)));
	append($$anchor, fragment);
}

delegate(['click']);

export { SvelteCounter as default };
//# sourceMappingURL=SvelteCounter.wnCppz6Z.js.map
