<script lang="ts">
	import { sharedStore } from '../../../lib/shared-store';
	import Parent from './Parent.svelte';

	const inc = () => sharedStore.set({ count: $sharedStore.count + 1 });
</script>

<!-- `$sharedStore` works because the store follows Svelte's store contract (subscribe). -->
<Parent count={$sharedStore.count} message={$sharedStore.message} onInc={inc} />
