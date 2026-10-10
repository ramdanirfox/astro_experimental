/** @jsxImportSource @qwik.dev/core */
import { component$, Slot, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { sharedStore } from '../../lib/shared-store';

export default component$<{ label: string; depth: number }>(({ label, depth }) => {
	const count = useSignal(sharedStore.get().count);
	const clicks = useSignal(0);

	useVisibleTask$(({ cleanup }) => {
		count.value = sharedStore.get().count;
		cleanup(sharedStore.onChange((s) => (count.value = s.count)));
	});

	return (
		<div class="frame">
			<div class="frame-head">
				<b>Qwik wrapper</b>
				<span>depth {depth}</span>
				<span>prop label="{label}"</span>
				<span>
					store count=<output>{count.value}</output>
				</span>
				<button type="button" onClick$={() => clicks.value++}>
					local +1 ({clicks.value})
				</button>
				<button
					type="button"
					onClick$={() => sharedStore.set({ count: sharedStore.get().count + 1 })}
				>
					store +1
				</button>
			</div>
			<div class="frame-body">
				<Slot />
			</div>
		</div>
	);
});
