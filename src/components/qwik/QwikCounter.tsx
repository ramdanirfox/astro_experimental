/** @jsxImportSource @qwik.dev/core */
import { component$, useSignal } from '@qwik.dev/core';

/** A counter written with Qwik v2 */
export default component$(() => {
	const count = useSignal(0);

	return (
		<div class="counter">
			<button onClick$={() => count.value--}>-</button>
			<pre>{count.value}</pre>
			<button onClick$={() => count.value++}>+</button>
		</div>
	);
});
