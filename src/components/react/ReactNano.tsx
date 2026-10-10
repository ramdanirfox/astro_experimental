/** @jsxImportSource react */
import { useState, type ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { countStore, doubleStore } from '../../lib/nano-store';

export default function ReactNano({
	label,
	depth,
	children,
}: {
	label: string;
	depth: number;
	children?: ReactNode;
}) {
	// @nanostores/react: one hook per store, returns the current value.
	const count = useStore(countStore);
	const double = useStore(doubleStore);
	const [clicks, setClicks] = useState(0);

	return (
		<div className="frame">
			<div className="frame-head">
				<b>React</b>
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
			{children && <div className="frame-body">{children}</div>}
		</div>
	);
}
