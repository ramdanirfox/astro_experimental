/** @jsxImportSource solid-js */
import { createSignal, Show, type JSX } from 'solid-js';
// Aliased: the dev-time React/Preact refresh transforms treat any `use*` call as a hook.
import { useStore as fromStore } from '@nanostores/solid';
import { countStore, doubleStore } from '../../lib/nano-store';

export default function SolidNano(props: { label: string; depth: number; children?: JSX.Element }) {
	// @nanostores/solid: returns an accessor, so reads stay fine-grained.
	const count = fromStore(countStore);
	const double = fromStore(doubleStore);
	const [clicks, setClicks] = createSignal(0);

	return (
		<div class="frame">
			<div class="frame-head">
				<b>Solid</b>
				<span>depth {props.depth}</span>
				<span>
					glue: <code>useStore(store)</code>
				</span>
				<span>
					count=<output>{count()}</output>
				</span>
				<span>
					×2=<output>{double()}</output>
				</span>
				<button type="button" onClick={() => setClicks(clicks() + 1)}>
					local +1 ({clicks()})
				</button>
				<button type="button" onClick={() => countStore.set(count() + 1)}>
					store +1
				</button>
			</div>
			<Show when={props.children}>
				<div class="frame-body">{props.children}</div>
			</Show>
		</div>
	);
}
