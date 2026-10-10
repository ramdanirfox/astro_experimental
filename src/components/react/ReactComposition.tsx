/** @jsxImportSource react */
import { useSyncExternalStore } from 'react';
import { sharedStore } from '../../lib/shared-store';

interface Props {
	count: number;
	message: string;
	onInc: () => void;
}

// Props are drilled by hand through every level.
const Grandchild = ({ count, message, onInc }: Props) => (
	<div className="node">
		<span className="tag">Grandchild</span>
		count={count}, message="{message}"
		<button onClick={onInc}>+1</button>
	</div>
);

const Child = (props: Props) => (
	<div className="node">
		<span className="tag">Child</span>
		<Grandchild {...props} />
	</div>
);

const Parent = (props: Props) => (
	<div className="node">
		<span className="tag">Parent</span>
		<Child {...props} />
	</div>
);

/** Root: subscribes to the shared store, then drills the values down as props. */
export default function ReactComposition() {
	const state = useSyncExternalStore(sharedStore.onChange, sharedStore.get, sharedStore.get);
	const inc = () => sharedStore.set({ count: sharedStore.get().count + 1 });

	return <Parent count={state.count} message={state.message} onInc={inc} />;
}
