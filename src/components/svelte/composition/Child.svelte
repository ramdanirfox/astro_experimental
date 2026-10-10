<script lang="ts">
	import Grandchild from './Grandchild.svelte';
	let props: { count: number; message: string; onInc: () => void } = $props();
</script>

<div class="node">
	<span class="tag">Child</span>
	<Grandchild {...props} />
</div>
