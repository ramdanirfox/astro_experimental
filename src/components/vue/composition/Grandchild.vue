<script setup lang="ts">
defineProps<{ count: number; message: string }>();
defineEmits<{ inc: [] }>();
</script>

<template>
	<div class="node">
		<span class="tag">Grandchild</span>
		count={{ count }}, message="{{ message }}"
		<button @click="$emit('inc')">+1</button>
	</div>
</template>
