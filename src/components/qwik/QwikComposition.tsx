/** @jsxImportSource @qwik.dev/core */
import { component$, useSignal, useVisibleTask$, type PropFunction } from '@qwik.dev/core';
import { sharedStore } from '../../lib/shared-store';

interface Props {
	count: number;
	message: string;
	// Callbacks crossing a component boundary must be QRLs, hence the `$` suffix.
	onInc$: PropFunction<() => void>;
}

const Grandchild = component$<Props>(({ count, message, onInc$ }) => (
	<div class="node">
		<span class="tag">Grandchild</span>
		count={count}, message="{message}"
		<button onClick$={onInc$}>+1</button>
	</div>
));

const Child = component$<Props>(({ count, message, onInc$ }) => (
	<div class="node">
		<span class="tag">Child</span>
		<Grandchild count={count} message={message} onInc$={onInc$} />
	</div>
));

const Parent = component$<Props>(({ count, message, onInc$ }) => (
	<div class="node">
		<span class="tag">Parent</span>
		<Child count={count} message={message} onInc$={onInc$} />
	</div>
));

/** Root: server-rendered, then a visible task connects it to the store in the browser. */
export default component$(() => {
	const state = useSignal(sharedStore.get());

	useVisibleTask$(({ cleanup }) => {
		state.value = sharedStore.get();
		cleanup(sharedStore.onChange((s) => (state.value = s)));
	});

	return (
		<Parent
			count={state.value.count}
			message={state.value.message}
			onInc$={() => sharedStore.set({ count: sharedStore.get().count + 1 })}
		/>
	);
});
