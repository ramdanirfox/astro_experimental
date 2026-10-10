/** @jsxImportSource solid-js */
import { createSignal, onCleanup } from 'solid-js';
import { sharedStore } from '../../lib/shared-store';

interface Props {
	count: number;
	message: string;
	onInc: () => void;
}

// Props are reactive getters in Solid: reading props.count inside JSX stays live.
const Grandchild = (props: Props) => (
	<div class="node">
		<span class="tag">Grandchild</span>
		count={props.count}, message="{props.message}"
		<button onClick={props.onInc}>+1</button>
	</div>
);

const Child = (props: Props) => (
	<div class="node">
		<span class="tag">Child</span>
		<Grandchild count={props.count} message={props.message} onInc={props.onInc} />
	</div>
);

const Parent = (props: Props) => (
	<div class="node">
		<span class="tag">Parent</span>
		<Child count={props.count} message={props.message} onInc={props.onInc} />
	</div>
);

/** Root: a signal fed by the store; only the text nodes that read it update. */
export default function SolidComposition() {
	const [state, setState] = createSignal(sharedStore.get());
	onCleanup(sharedStore.onChange(setState));
	const inc = () => sharedStore.set({ count: sharedStore.get().count + 1 });

	return <Parent count={state().count} message={state().message} onInc={inc} />;
}
