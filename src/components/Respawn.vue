<template>
    <div class="respawn-overlay">
        <div class="respawn-modal">
            <h2 class="game-over-title">OUT OF HP</h2>
            <p class="game-over-subtitle">Don't give up so easily!</p>
            <div class="respawn-btn" @click="handleRespawn">
                RESPAWN
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import emitter from "../utils/emitter.ts";

    function handleRespawn() {
        emitter.emit("restart");
    }
</script>

<style scoped>
    .respawn-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--overlay-bg);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }

    .respawn-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--modal-bg);
        /* 沿用主 Grid 的浅蓝粗边框和圆角风格 */
        border: 4px solid var(--grid-bg);
        border-radius: 8px;
        padding: 3rem 4rem;
        box-shadow: var(--shadow);
    }

    .game-over-title {
        font-family: var(--mono, monospace);
        font-size: 2.5rem;
        font-weight: 500;
        color: var(--grid-text);
        margin: 0 0 0.5rem 0;
        letter-spacing: 1px;
    }

    .game-over-subtitle {
        font-family: var(--sans, sans-serif);
        font-size: 1.1rem;
        color: var(--text);
        margin: 0 0 2.5rem 0;
    }

    /* 沿用 header-cell 和交互效果的设计语言 */
    .respawn-btn {
        background-color: var(--grid-bg);
        color: var(--grid-text);
        font-family: var(--mono, monospace);
        font-size: 1.5rem;
        font-weight: 500;
        padding: 1rem 3rem;
        border-radius: 6px;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
    }

    .respawn-btn:hover {
        background-color: var(--btn-hover-bg);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .respawn-btn:active {
        transform: translateY(0);
        box-shadow: none;
    }
</style>