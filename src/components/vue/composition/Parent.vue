<script setup lang="ts">
import Child from './Child.vue';
defineProps<{ count: number; message: string }>();
defineEmits<{ inc: [] }>();
</script>

<template>
	<div class="node">
		<span class="tag">Parent</span>
		<Child :count="count" :message="message" @inc="$emit('inc')" />
	</div>
</template>
