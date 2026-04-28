<template>
    <div class="difficulty-selection">
        <div class="difficulty-modal">
            <h2 class="difficulty-title">SELECT DIFFICULTY</h2>
        </div>
        <div class="difficulty-options">
            <span class="difficulty-option" @click="emitter.emit('select-difficulty', 'easy')">EASY</span>
            <span class="difficulty-option" @click="emitter.emit('select-difficulty', 'medium')">MEDIUM</span>
            <span class="difficulty-option" @click="emitter.emit('select-difficulty', 'hard')">HARD</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import emitter from "../utils/emitter.ts";
</script>

<style lang="css" scoped>
    .difficulty-selection {
        margin-top: 2em;
    }

    .difficulty-title {
        font-size: 36px;
    }

    .difficulty-selection .difficulty-options {
        display: flex;
        justify-content: center;
        gap: 2em;
        margin-top: 1.5em;
    }

    .difficulty-option {
        background-color: var(--grid-bg);
        color: var(--grid-text);
        padding: 1em 2em;
        border: 2px solid var(--grid-text);
        border-radius: var(--radius);
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .difficulty-option:hover {
        background-color: var(--btn-hover-bg);
    }
</style>
