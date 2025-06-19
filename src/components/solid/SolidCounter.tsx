/** @jsxImportSource solid-js */

import { createSignal, onMount, type JSX } from 'solid-js';

/** A counter written with Solid */
export default function SolidCounter(props: { children?: JSX.Element }) {
	const [count, setCount] = createSignal(0);
	const add = () => setCount(count() + 1);
	const subtract = () => setCount(count() - 1);

	onMount(() => {
		console.log('Counter Solid Rendered');
	});

	return (
		<>
			<div id="solid" class="counter">
				<div>Solid</div>
				<button onClick={subtract}>-</button>
				<pre>{count()}</pre>
				<button onClick={add}>+</button>
			</div>
			<div class="counter-message">{props.children}</div>
		</>
	);
}