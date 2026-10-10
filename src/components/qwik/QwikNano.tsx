/** @jsxImportSource @qwik.dev/core */
import { component$, Slot, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { countStore, doubleStore } from '../../lib/nano-store';

export default component$<{ label: string; depth: number }>(({ depth }) => {
	// No @nanostores adapter for Qwik: subscribe by hand once the component is visible.
	const count = useSignal(countStore.get());
	const double = useSignal(doubleStore.get());
	const clicks = useSignal(0);

	useVisibleTask$(({ cleanup }) => {
		// subscribe() calls back immediately, so this also syncs the initial value.
		cleanup(countStore.subscribe((v) => (count.value = v)));
		cleanup(doubleStore.subscribe((v) => (double.value = v)));
	});

	return (
		<div class="frame">
			<div class="frame-head">
				<b>Qwik</b>
				<span>depth {depth}</span>
				<span>
					glue: <code>store.subscribe</code> (manual)
				</span>
				<span>
					count=<output>{count.value}</output>
				</span>
				<span>
					×2=<output>{double.value}</output>
				</span>
				<button type="button" onClick$={() => clicks.value++}>
					local +1 ({clicks.value})
				</button>
				<button type="button" onClick$={() => countStore.set(countStore.get() + 1)}>
					store +1
				</button>
			</div>
			<div class="frame-body">
				<Slot />
			</div>
		</div>
	);
});
