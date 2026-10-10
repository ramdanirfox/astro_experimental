<script setup lang="ts">
import Grandchild from './Grandchild.vue';
defineProps<{ count: number; message: string }>();
defineEmits<{ inc: [] }>();
</script>

<template>
	<div class="node">
		<span class="tag">Child</span>
		<!-- Props go down; the event is re-emitted up (emit drilling). -->
		<Grandchild :count="count" :message="message" @inc="$emit('inc')" />
	</div>
</template>
