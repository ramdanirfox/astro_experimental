/** @jsxImportSource react */
import { useEffect, useState } from 'react';

/** A counter written with React */
export default function MyCounter() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log('Counter React Rendered');
	}, []);

	return (
		<div className="counter">
			<button onClick={() => setCount(count - 1)}>-</button>
			<pre>{count}</pre>
			<button onClick={() => setCount(count + 1)}>+</button>
		</div>
	);
}
