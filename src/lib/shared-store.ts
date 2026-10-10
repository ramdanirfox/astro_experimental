/**
 * A deliberately tiny, framework-agnostic store.
 *
 * Every island is a separate bundle, so the singleton lives on globalThis: it is
 * the only thing all of them can see. `subscribe` follows the Svelte store contract
 * (called immediately, returns an unsubscribe); `onChange` is the same without the
 * immediate call, which suits hooks such as React's useSyncExternalStore.
 */
export interface SharedState {
	count: number;
	message: string;
}
type Listener = (state: SharedState) => void;

function create() {
	let state: SharedState = { count: 0, message: 'hello' };
	const listeners = new Set<Listener>();

	const onChange = (listener: Listener) => {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	};

	return {
		get: () => state,
		set: (patch: Partial<SharedState>) => {
			state = { ...state, ...patch };
			listeners.forEach((l) => l(state));
		},
		onChange,
		subscribe: (listener: Listener) => {
			listener(state);
			return onChange(listener);
		},
	};
}

type SharedStore = ReturnType<typeof create>;
const KEY = '__astroSharedStore';
const g = globalThis as unknown as Record<string, SharedStore | undefined>;

export const sharedStore: SharedStore = (g[KEY] ??= (() => {
	const store = create();
	// Lets plain-HTML consumers (Alpine) find the store without importing it.
	if (typeof window !== 'undefined') window.dispatchEvent(new Event('shared-store-ready'));
	return store;
})());
