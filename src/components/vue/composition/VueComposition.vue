<script setup lang="ts">
import { onUnmounted, shallowRef } from 'vue';
import { sharedStore } from '../../../lib/shared-store';
import Parent from './Parent.vue';

// A shallowRef fed by the store: replacing .value triggers re-render.
const state = shallowRef(sharedStore.get());
onUnmounted(sharedStore.onChange((s) => (state.value = s)));
const inc = () => sharedStore.set({ count: state.value.count + 1 });
</script>

<template>
	<Parent :count="state.count" :message="state.message" @inc="inc" />
</template>
