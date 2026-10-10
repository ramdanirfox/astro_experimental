/** @jsxImportSource preact */
import { useEffect, useState } from 'preact/hooks';
import { sharedStore } from '../../lib/shared-store';

interface Props {
	count: number;
	message: string;
	onInc: () => void;
}

const Grandchild = ({ count, message, onInc }: Props) => (
	<div class="node">
		<span class="tag">Grandchild</span>
		count={count}, message="{message}"
		<button onClick={onInc}>+1</button>
	</div>
);

const Child = (props: Props) => (
	<div class="node">
		<span class="tag">Child</span>
		<Grandchild {...props} />
	</div>
);

const Parent = (props: Props) => (
	<div class="node">
		<span class="tag">Parent</span>
		<Child {...props} />
	</div>
);

/** Root: mirrors the shared store into local state with an effect. */
export default function PreactComposition() {
	const [state, setState] = useState(sharedStore.get());
	useEffect(() => sharedStore.onChange(setState), []);
	const inc = () => sharedStore.set({ count: sharedStore.get().count + 1 });

	return <Parent count={state.count} message={state.message} onInc={inc} />;
}
