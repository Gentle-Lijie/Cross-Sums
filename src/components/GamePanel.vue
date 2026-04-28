<!-- A game panel, with grids that get from GameGenerator -->
<template>
    <Difficulty v-if="!showGame" />

    <div class="game-wrapper" v-if="showGame">
        <div class="game-board-container" v-if="generator.grid.length > 0">
            <div class="corner-empty"></div>

            <div class="top-headers">
                <div v-for="(_, colIndex) in generator.grid[0].slice(1)" :key="'top-' + colIndex" class="header-cell"
                    :id="'top-' + (colIndex + 1)">
                    {{ getValue(0, colIndex + 1) }}
                </div>
            </div>

            <!-- Left Headers -->
            <div class="left-headers" v-if="generator.grid.length > 1">
                <div v-for="(_, rowIndex) in generator.grid.slice(1)" :key="'left-' + rowIndex" class="header-cell"
                    :id="'left-' + (rowIndex + 1)">
                    {{ getValue(rowIndex + 1, 0) }}
                </div>
            </div>

            <!-- Main Inner Grid -->
            <div class="main-grid" v-if="generator.grid.length > 1" :style="{ '--cols': generator.grid[0].length - 1 }">
                <template v-for="(row, rowIndex) in generator.grid.slice(1)" :key="'main-row-' + rowIndex">
                    <div v-for="(value, colIndex) in row.slice(1)" :key="'main-cell-' + colIndex" class="game-cell"
                        :id="'main-cell-' + (rowIndex + 1) + '-' + (colIndex + 1)"
                        @click="handleClick({ row: rowIndex + 1, col: colIndex + 1 }, value)">
                        {{ getValue(rowIndex + 1, colIndex + 1) }}
                    </div>
                </template>
            </div>
        </div>


        <div class="mode-switch" :class="mode">
            <div class="mode-thumb"></div>
            <div class="mode-btn" @click="switchMode()" :class="{ active: mode === 'erasor' }">
                <span class="icon-wrapper" v-html="erasor"></span>
            </div>
            <div class="mode-btn" @click="switchMode()" :class="{ active: mode === 'pen' }">
                <span class="icon-wrapper" v-html="pen"></span>
            </div>
        </div>
    </div>
    <Respawn v-if="showRespawn" />
    <Victory v-if="showVictory" />
</template>

<script setup lang="ts">
    import "../styles/GamePanel.css";
    import { ref } from "vue";
    import emitter from "../utils/emitter.ts";

    import * as generator from "../utils/generator.ts";
    import { erasor, pen } from "../stores/icons.ts";
    import Respawn from "./Respawn.vue";
    import Victory from "./Victory.vue";
    import Difficulty from "./Difficulty.vue";

    const mode = ref<'erasor' | 'pen'>('erasor');
    const showRespawn = ref(false);
    const showVictory = ref(false);
    const showGame = ref(false);
    const verifiedCells = ref(0);

    function getValue(row: number, col: number): any {
        if (generator.grid[row][col] === -1) {
            return "";
        }
        return generator.grid[row][col];
    }

    function switchMode() {
        mode.value = mode.value === 'erasor' ? 'pen' : 'erasor';
    }

    function handleClick(position: { row: number; col: number }, value: any) {
        if (document.querySelector(`#main-cell-${position.row}-${position.col}`)!.classList.contains("clicked")) {
            console.log("Cell already cleared. No action taken.");
            return;
        }
        document.querySelector(`#main-cell-${position.row}-${position.col}`)!.classList.add("clicked");
        console.log("Activity at position:", position, "with value:", value);
        if (mode.value === 'erasor') {
            console.log("Erasor mode active. Clearing cell at:", position);
            console.log("Checking answer for position:", position, "Expected value:", generator.answer[position.row][position.col]);
            if (generator.answer[position.row][position.col] === -1) {
                console.log("Correct value! Clearing cell.");
                clearContent(position);
                document.querySelector(`#main-cell-${position.row}-${position.col}`)!.classList.add("correct-cleared");
            } else {
                mark(position);
                penality();
                makeIncorrect(position);
                console.log("Incorrect value. Penalty applied.");
            }
        } else {
            console.log("Pen mode active. Confirming cell at:", position);
            console.log("Checking answer for position:", position, "Expected value:", generator.answer[position.row][position.col]);
            if (generator.answer[position.row][position.col] === generator.grid[position.row][position.col]) {
                console.log("Correct value! Marking cell.");
                mark(position);
            }
            else {
                penality();
                clearContent(position);
                makeIncorrect(position);
                console.log("Incorrect value. Penalty applied.");
            }
        }
    }

    function mark(position: { row: number; col: number }) {
        document.querySelector(`#main-cell-${position.row}-${position.col}`)?.classList.add("marked");
        verify(position);
    }

    function penality() {
        emitter.emit("update-hp", { hp: -25, timeout: 500 });
    }

    function makeIncorrect(position: { row: number; col: number }) {
        document.querySelector(`#main-cell-${position.row}-${position.col}`)?.classList.add("incorrect");
    }

    function clearContent(position: { row: number; col: number }) {
        const cell = document.querySelector(`#main-cell-${position.row}-${position.col}`) as HTMLElement;
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                cell.style.opacity = `${1 - (i + 1) / 10}`;
            }, ((200) / 10) * (i + 1));
        }
        verify(position);
    }

    function verify(position: { row: number; col: number }) {
        // Check row:
        let sum = 0, clicked_cnt = 0;
        for (let column = 1; column < generator.grid[0].length; column++) {
            if (!document.querySelector(`#main-cell-${position.row}-${column}`)?.classList.contains("clicked")) {
                sum += generator.grid[position.row][column];
            }
            else {
                sum += generator.answer[position.row][column] === -1 ? 0 : generator.answer[position.row][column];
                clicked_cnt++;
            }
            console.log(`Row ${position.row} - Column ${column}:`, sum);
        }
        if (sum == generator.grid[position.row][0] && clicked_cnt === generator.grid[0].length - 1) {
            console.log(`Row ${position.row} is correct. Expected: ${generator.grid[position.row][0]}, Got: ${sum}`);
            updateSpan(position.row, 0);
        }
        // Check column:
        sum = 0, clicked_cnt = 0;
        for (let row = 1; row < generator.grid.length; row++) {
            // let sum = 0;
            if (!document.querySelector(`#main-cell-${row}-${position.col}`)?.classList.contains("clicked")) {
                sum += generator.grid[row][position.col];
            }
            else {
                clicked_cnt++;
                sum += generator.answer[row][position.col] === -1 ? 0 : generator.answer[row][position.col];
            }
            console.log(`Column ${position.col} - Row ${row}:`, sum);
            console.log(`Clicked count for column ${position.col}:`, clicked_cnt);
        }
        if (sum == generator.grid[0][position.col] && clicked_cnt === generator.grid.length - 1) {
            console.log(`Column ${position.col} is correct. Expected: ${generator.grid[0][position.col]}, Got: ${sum}`);
            updateSpan(0, position.col);
        }
    }

    function updateSpan(row: number, col: number) {
        const span = document.querySelector(`#${row === 0 ? "top" : "left"}-${row === 0 ? col : row}`) as HTMLElement;
        span.style.backgroundColor = "var(--cell-correct-bg)";
        verifiedCells.value++;
        console.log("Verified cells count:", verifiedCells.value);
        if (verifiedCells.value === (generator.grid.length - 1) + (generator.grid[0].length - 1)) {
            emitter.emit("victory");
        }
    }

    emitter.on("select-difficulty", (difficulty: string) => {
        console.log("Difficulty selected:", difficulty);
        switch (difficulty) {
            case 'easy':
                generator.generateGrid(4, 4);
                break;
            case 'medium':
                generator.generateGrid(6, 6);
                break;
            case 'hard':
                generator.generateGrid(8, 8);
                break;
            default:
                break;
        }
        showGame.value = true;
        console.log("Generated grid:", generator.grid);
        console.log("Answer Grid", generator.answer)
    });

    emitter.on("game-over", () => {
        console.log("Game over event received in GamePanel");
        showRespawn.value = true;
    });

    emitter.on("victory", () => {
        console.log("Victory event received in GamePanel");
        showVictory.value = true;
    });

    emitter.on("restart", () => {
        console.log("Restart event received in GamePanel");
        showRespawn.value = false;
        showVictory.value = false;
        verifiedCells.value = 0;
        for (let row = 1; row < generator.grid.length; row++) {
            for (let col = 1; col < generator.grid[0].length; col++) {
                const cell = document.querySelector(`#main-cell-${row}-${col}`) as HTMLElement;
                cell.classList.remove("clicked", "marked", "incorrect", "correct-cleared");
                cell.style.color = "";
                cell.style.opacity = "";
            }
        }
        for (let row = 1; row < generator.grid.length; row++) {
            const span = document.querySelector(`#left-${row}`) as HTMLElement;
            if (span) span.style.backgroundColor = "";
        }
        for (let col = 1; col < generator.grid[0].length; col++) {
            const span = document.querySelector(`#top-${col}`) as HTMLElement;
            if (span) span.style.backgroundColor = "";
        }
        // Reset the game state here if needed
    });

    //TODO: Add auto mode

</script>