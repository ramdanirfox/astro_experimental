import { atom, computed, type ReadableAtom, type WritableAtom } from 'nanostores';

/**
 * Shared state, nanostores edition.
 *
 * Named countStore (not $count) because a `$` prefix means "auto-subscribe" in Svelte.
 *
 * The stores are anchored on globalThis. Tried first as plain module exports, this worked for
 * every island except Qwik: its code comes from a separate standalone build, which bundles its
 * own copy of this module and therefore its own atom, so its level silently went out of sync.
 * Whichever copy runs first creates the stores; the others reuse them.
 */
interface NanoStores {
	countStore: WritableAtom<number>;
	doubleStore: ReadableAtom<number>;
}

const KEY = '__nanoStores';
const g = globalThis as unknown as Record<string, NanoStores | undefined>;

const stores = (g[KEY] ??= (() => {
	const countStore = atom(0);
	// Derived state is a first-class idea: recomputed only when countStore changes.
	return { countStore, doubleStore: computed(countStore, (count) => count * 2) };
})());

export const { countStore, doubleStore } = stores;

// Plain-HTML consumers (Alpine) cannot import modules, so they get a global handle.
if (typeof window !== 'undefined') {
	(window as unknown as Record<string, unknown>).__nano = stores;
	window.dispatchEvent(new Event('nano-store-ready'));
}
