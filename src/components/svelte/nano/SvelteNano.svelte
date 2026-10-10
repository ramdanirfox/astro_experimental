<script lang="ts">
	import type { Snippet } from 'svelte';
	import { countStore, doubleStore } from '../../../lib/nano-store';

	let { label, depth, children }: { label: string; depth: number; children?: Snippet } = $props();
	let clicks = $state(0);
</script>

<div class="frame">
	<div class="frame-head">
		<b>Svelte</b>
		<span>depth {depth}</span>
		<!-- No adapter package: a nanostores atom already satisfies Svelte's store contract. -->
		<span>glue: <code>$store</code> (native)</span>
		<span>count=<output>{$countStore}</output></span>
		<span>×2=<output>{$doubleStore}</output></span>
		<button type="button" onclick={() => clicks++}>local +1 ({clicks})</button>
		<button type="button" onclick={() => countStore.set($countStore + 1)}>store +1</button>
	</div>
	{#if children}
		<div class="frame-body">{@render children()}</div>
	{/if}
</div>
