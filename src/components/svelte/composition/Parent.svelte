<script lang="ts">
	import Child from './Child.svelte';
	let props: { count: number; message: string; onInc: () => void } = $props();
</script>

<div class="node">
	<span class="tag">Parent</span>
	<Child {...props} />
</div>
