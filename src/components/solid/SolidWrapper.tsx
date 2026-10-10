/** @jsxImportSource solid-js */
import { createSignal, onCleanup, Show, type JSX } from 'solid-js';
import { sharedStore } from '../../lib/shared-store';

export default function SolidWrapper(props: {
	label: string;
	depth: number;
	children?: JSX.Element;
}) {
	const [state, setState] = createSignal(sharedStore.get());
	const [clicks, setClicks] = createSignal(0);
	onCleanup(sharedStore.onChange(setState));

	return (
		<div class="frame">
			<div class="frame-head">
				<b>Solid wrapper</b>
				<span>depth {props.depth}</span>
				<span>prop label="{props.label}"</span>
				<span>
					store count=<output>{state().count}</output>
				</span>
				<button type="button" onClick={() => setClicks(clicks() + 1)}>
					local +1 ({clicks()})
				</button>
				<button type="button" onClick={() => sharedStore.set({ count: state().count + 1 })}>
					store +1
				</button>
			</div>
			<Show when={props.children}>
				<div class="frame-body">{props.children}</div>
			</Show>
		</div>
	);
}
