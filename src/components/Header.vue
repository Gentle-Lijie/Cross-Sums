<!-- Header of the game

With Restart button, Game title, HP info-->
<template>
	<div class="header">
		<title>Cross-Sums</title>
		<div class="restart-btn" @click="emitter.emit('restart')">Restart</div>
		<div class="title">Cross-Sums</div>
		<div class="hp">
			<span class="hp" :class="{ red: currentHp >= threshold }" v-for="threshold in hpThresholds" :key="threshold"
				v-html="heart"></span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import "../styles/Header.css";
	import { ref } from "vue";
	import { MaxHP } from "../stores/games.ts";
	import emitter from "../utils/emitter.ts";
	import { heart } from "../stores/icons.ts";

	const props = defineProps({
		hp: {
			type: Number,
			required: false,
		},
	});

	export interface UpdateHP extends CustomEvent {
		detail: {
			hp: number;
			timeout?: number; // Defines the time the HP update should last, defaulting to 1000ms
		};
	}

	const MaxHPValue = MaxHP;
	const heartCount = 5;
	const hpPerHeart = MaxHPValue / heartCount;
	const hpThresholds = Array.from({ length: heartCount }, (_, i) => Math.round((heartCount - i) * hpPerHeart));

	emitter.on("load", () => {
		console.log("Header loaded");
	});


	const currentHp = ref(props.hp || MaxHPValue);
	const targetHp = ref(props.hp || MaxHPValue);
	~
	console.log("Initial HP in Header:", currentHp.value);

	emitter.on("update-hp", (data: { hp: number; timeout?: number }) => {
		console.log("Update HP event received in Header:", data);
		updateHP(data.hp + targetHp.value, data.timeout);
	});

	emitter.on("restart", () => {
		updateHP(MaxHPValue, 0); 
	});

	let isAnimating = false;

	async function updateHP(newHP: number, timeout: number = 500) {
		console.log(`Updating HP to ${newHP} with timeout ${timeout}`);
		targetHp.value = newHP;
		if (targetHp.value < 0) emitter.emit("game-over");
		if (isAnimating) return;
		isAnimating = true;

		const steps = 10;
		const stepTime = timeout / steps;

		while (currentHp.value !== targetHp.value) {
			const diff = targetHp.value - currentHp.value;
			// Move 20% of the remaining distance per step (min 1)
			const step = diff > 0 ? Math.ceil(diff / 5) : Math.floor(diff / 5);

			if (Math.abs(diff) <= Math.abs(step) || step === 0) {
				currentHp.value = targetHp.value;
			} else {
				currentHp.value += step;
			}

			await new Promise((resolve) => setTimeout(resolve, stepTime));
		}

		isAnimating = false;
	}
</script>
