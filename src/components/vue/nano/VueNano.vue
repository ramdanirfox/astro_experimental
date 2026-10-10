<script setup lang="ts">
import { ref } from 'vue';
// Aliased: the dev-time React/Preact refresh transforms treat any `use*` call as a hook,
// and they run on this file too.
import { useStore as fromStore } from '@nanostores/vue';
import { countStore, doubleStore } from '../../../lib/nano-store';

defineProps<{ label: string; depth: number }>();
// @nanostores/vue: returns a readonly ref.
const count = fromStore(countStore);
const double = fromStore(doubleStore);
const clicks = ref(0);
</script>

<template>
	<div class="frame">
		<div class="frame-head">
			<b>Vue</b>
			<span>depth {{ depth }}</span>
			<span>glue: <code>useStore(store)</code></span>
			<span>count=<output>{{ count }}</output></span>
			<span>×2=<output>{{ double }}</output></span>
			<button type="button" @click="clicks++">local +1 ({{ clicks }})</button>
			<button type="button" @click="countStore.set(count + 1)">store +1</button>
		</div>
		<div v-if="$slots.default" class="frame-body"><slot /></div>
	</div>
</template>
