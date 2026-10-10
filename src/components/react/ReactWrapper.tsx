/** @jsxImportSource react */
import { useState, useSyncExternalStore, type ReactNode } from 'react';
import { sharedStore } from '../../lib/shared-store';

export default function ReactWrapper({
	label,
	depth,
	children,
}: {
	label: string;
	depth: number;
	children?: ReactNode;
}) {
	const state = useSyncExternalStore(sharedStore.onChange, sharedStore.get, sharedStore.get);
	const [clicks, setClicks] = useState(0);

	return (
		<div className="frame">
			<div className="frame-head">
				<b>React wrapper</b>
				<span>depth {depth}</span>
				<span>prop label="{label}"</span>
				<span>
					store count=<output>{state.count}</output>
				</span>
				<button type="button" onClick={() => setClicks(clicks + 1)}>
					local +1 ({clicks})
				</button>
				<button type="button" onClick={() => sharedStore.set({ count: state.count + 1 })}>
					store +1
				</button>
			</div>
			{children && <div className="frame-body">{children}</div>}
		</div>
	);
}
