/** @jsxImportSource preact */
import { useEffect, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { sharedStore } from '../../lib/shared-store';

export default function PreactWrapper({
	label,
	depth,
	children,
}: {
	label: string;
	depth: number;
	children?: ComponentChildren;
}) {
	const [state, setState] = useState(sharedStore.get());
	const [clicks, setClicks] = useState(0);
	useEffect(() => sharedStore.onChange(setState), []);

	return (
		<div class="frame">
			<div class="frame-head">
				<b>Preact wrapper</b>
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
			{children && <div class="frame-body">{children}</div>}
		</div>
	);
}
