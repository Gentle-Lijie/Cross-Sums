export const grid = [
    [-1, 8, 6, 8, 4, 6],
    [2, 7, 2, 1, 6, 2],
    [7, 2, 4, 1, 9, 7],
    [6, 4, 4, 6, 1, 9],
    [6, 4, 6, 6, 4, 2],
    [11, 6, 7, 1, 5, 4],
];
export const answer = [
    [-1, 8, 6, 8, 4, 6],
    [2, -1, 2, -1, -1, -1],
    [7, 2, 4, 1, -1, -1],
    [6, -1, -1, 6, -1, -1],
    [6, -1, -1, -1, 4, 2],
    [11, 6, -1, 1, -1, 4],
];
function generateGrid(row, col) {
    let grid = [];
    let answer = [];
    for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= col; j++) {
            grid[i][j] = Math.floor(Math.random() * 9) + 1;
            answer[i][j] = Math.random() < 0.5 ? -1 : grid[i][j];
        }
    }
    for (let i = 0; i <= row; i++) {
        grid[i][0] = grid[i].slice(1).reduce((a, b) => a + b, 0);
        answer[i][0] = answer[i].slice(1).reduce((a, b) => a + (b === -1 ? 0 : b), 0);
    }
    for (let j = 0; j <= col; j++) {
        grid[0][j] = grid.slice(1).reduce((a, b) => a + b[j], 0);
        answer[0][j] = answer.slice(1).reduce((a, b) => a + (b[j] === -1 ? 0 : b[j]), 0);
    }
    return {
        grid,
        answer,
    };
}
// print(generateGrid(5, 5));
print(generateGrid(5, 5).grid);
print(generateGrid(5, 5).answer);
