<script lang="ts">
	import type { Snippet } from 'svelte';
	import { sharedStore } from '../../../lib/shared-store';

	let { label, depth, children }: { label: string; depth: number; children?: Snippet } = $props();
	let clicks = $state(0);
</script>

<div class="frame">
	<div class="frame-head">
		<b>Svelte wrapper</b>
		<span>depth {depth}</span>
		<span>prop label="{label}"</span>
		<span>store count=<output>{$sharedStore.count}</output></span>
		<button type="button" onclick={() => clicks++}>local +1 ({clicks})</button>
		<button type="button" onclick={() => sharedStore.set({ count: $sharedStore.count + 1 })}>
			store +1
		</button>
	</div>
	{#if children}
		<div class="frame-body">{@render children()}</div>
	{/if}
</div>
