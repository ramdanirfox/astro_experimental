<script lang="ts">
	let { count, message, onInc }: { count: number; message: string; onInc: () => void } = $props();
</script>

<div class="node">
	<span class="tag">Grandchild</span>
	count={count}, message="{message}"
	<button onclick={onInc}>+1</button>
</div>
