export const grid: number[][] = [
    [-1, 8, 6, 8, 4, 6],
    [2, 7, 2, 1, 6, 2],
    [7, 2, 4, 1, 9, 7],
    [6, 4, 4, 6, 1, 9],
    [6, 4, 6, 6, 4, 2],
    [11, 6, 7, 1, 5, 4],
];

export const answer: number[][] = [
    [-1, 8, 6, 8, 4, 6],
    [2, -1, 2, -1, -1, -1],
    [7, 2, 4, 1, -1, -1],
    [6, -1, -1, 6, -1, -1],
    [6, -1, -1, -1, 4, 2],
    [11, 6, -1, 1, -1, 4],
];

export function generateGrid(rows: number, cols: number): void {
    const newGrid: number[][] = [];
    const newAnswer: number[][] = [];

    // Initialize arrays
    for (let i = 0; i <= rows; i++) {
        newGrid[i] = [];
        newAnswer[i] = [];
    }

    // Generate random values for inner cells
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            newGrid[i][j] = Math.floor(Math.random() * 9) + 1;
            newAnswer[i][j] = Math.random() < 0.5 ? -1 : newGrid[i][j];
        }
    }

    // Top-left is always empty (-1)
    newGrid[0][0] = -1;
    newAnswer[0][0] = -1;

    // Calculate row sums (stored in column 0)
    for (let i = 1; i <= rows; i++) {
        let rGridSum = 0;
        let rAnswerSum = 0;
        for (let j = 1; j <= cols; j++) {
            rGridSum += newGrid[i][j];
            rAnswerSum += newAnswer[i][j] === -1 ? 0 : newAnswer[i][j];
        }
        newGrid[i][0] = rGridSum;
        newAnswer[i][0] = rAnswerSum;
    }

    // Calculate column sums (stored in row 0)
    for (let j = 1; j <= cols; j++) {
        let cGridSum = 0;
        let cAnswerSum = 0;
        for (let i = 1; i <= rows; i++) {
            cGridSum += newGrid[i][j];
            cAnswerSum += newAnswer[i][j] === -1 ? 0 : newAnswer[i][j];
        }
        newGrid[0][j] = cGridSum;
        newAnswer[0][j] = cAnswerSum;
    }

    // Mutate the reactive array items in place to trigger Vue UI updates
    grid.splice(0, grid.length, ...newGrid);
    answer.splice(0, answer.length, ...newAnswer);
}
