/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

/** A counter written with Preact */
export default function PreactCounter() {
	const [count, setCount] = useState(0);

	return (
		<div class="counter">
			<button onClick={() => setCount(count - 1)}>-</button>
			<pre>{count}</pre>
			<button onClick={() => setCount(count + 1)}>+</button>
		</div>
	);
}
