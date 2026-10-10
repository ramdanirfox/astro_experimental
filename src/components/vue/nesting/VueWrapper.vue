<script setup lang="ts">
import { onUnmounted, ref, shallowRef } from 'vue';
import { sharedStore } from '../../../lib/shared-store';

defineProps<{ label: string; depth: number }>();
const state = shallowRef(sharedStore.get());
onUnmounted(sharedStore.onChange((s) => (state.value = s)));
const clicks = ref(0);
</script>

<template>
	<div class="frame">
		<div class="frame-head">
			<b>Vue wrapper</b>
			<span>depth {{ depth }}</span>
			<span>prop label="{{ label }}"</span>
			<span>store count=<output>{{ state.count }}</output></span>
			<button type="button" @click="clicks++">local +1 ({{ clicks }})</button>
			<button type="button" @click="sharedStore.set({ count: state.count + 1 })">store +1</button>
		</div>
		<!-- $slots rather than useSlots(): React/Preact refresh transforms mistake use* calls for hooks -->
		<div v-if="$slots.default" class="frame-body"><slot /></div>
	</div>
</template>
