/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { useStore } from '@nanostores/preact';
import { countStore, doubleStore } from '../../lib/nano-store';

export default function PreactNano({
	label,
	depth,
	children,
}: {
	label: string;
	depth: number;
	children?: ComponentChildren;
}) {
	// @nanostores/preact: same shape as the React adapter.
	const count = useStore(countStore);
	const double = useStore(doubleStore);
	const [clicks, setClicks] = useState(0);

	return (
		<div class="frame">
			<div class="frame-head">
				<b>Preact</b>
				<span>depth {depth}</span>
				<span>
					glue: <code>useStore(store)</code>
				</span>
				<span>
					count=<output>{count}</output>
				</span>
				<span>
					×2=<output>{double}</output>
				</span>
				<button type="button" onClick={() => setClicks(clicks + 1)}>
					local +1 ({clicks})
				</button>
				<button type="button" onClick={() => countStore.set(count + 1)}>
					store +1
				</button>
			</div>
			{children && <div class="frame-body">{children}</div>}
		</div>
	);
}
