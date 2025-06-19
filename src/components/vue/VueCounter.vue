<template>
	<!--
		Seeing type errors on the word `class`?
		This unfortunately happens because @types/react's JSX definitions leak into every file due to being declared globally.
		There's currently no way to prevent this when using both Vue and React with TypeScript in the same project.
		You can read more about this issue here: https://github.com/johnsoncodehk/volar/discussions/592
	-->
	<div class="counter">
        <div>Vue</div>
		<button @click="subtract()">-</button>
		<pre>{{ count }}</pre>
		<button @click="add()">+</button>
	</div>
	<div class="counter-message">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
const add = () => (count.value = count.value + 1);
const subtract = () => (count.value = count.value - 1);
/* export default {
	setup() {

		return {
			count,
			add,
			subtract,
		};
	},
}; */
</script>