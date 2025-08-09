export const MODES = {
  veryEasy: { key: 'veryEasy', name: 'Very Easy', value: [15, 25], mistakes: 5, hints: 6 },
  easy: { key: 'easy', name: 'Easy', value: [25, 40], mistakes: 4, hints: 5 },
  medium: { key: 'medium', name: 'Medium', value: [40, 60], mistakes: 3, hints: 4 },
  hard: { key: 'hard', name: 'Hard', value: [60, 70], mistakes: 2, hints: 3 },
  extreme: { key: 'extreme', name: 'Extreme', value: [70, 80], mistakes: 2, hints: 2 }
};

// random number generator
export function generateRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// implement rules - where numbers can be placed
export function isSafe(board, row, col, num) {
  // 9x9
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }

  const miniRow = Math.floor(row / 3) * 3;
  const miniCol = Math.floor(col / 3) * 3;

  // 3x3
  for (let x = miniRow; x < miniRow + 3; x++) {
    for (let y = miniCol; y < miniCol + 3; y++) {
      if (board[x][y] === num) {
        return false;
      }
    }
  }
  return true;
}

// backtracking sudoku generator
export function generateSudoku(board, randomArray) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num of randomArray) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (generateSudoku(board, randomArray)) {
              return true;
            }
          }
          board[row][col] = 0;
        }
        return false;
      }
    }
  }
  return true;
}

// removes 'num' cells from the board
export function removeCells(board, num) {
  for (let x = 0; x < num; x++) {
    const row = generateRandom(1, 9) - 1;
    const col = generateRandom(1, 9) - 1;
    board[row][col] = 0;
  }
}

export function sudoku(mode) {
  const numCells = generateRandom(MODES[mode].value[0], MODES[mode].value[1]);
  let solvedBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
  let randomArray = [];

  while (randomArray.length < 9) {
    const num = generateRandom(1, 9);
    // add numbers 1-9
    if (!randomArray.includes(num)) {
      randomArray.push(num);
    }
  }

  generateSudoku(solvedBoard, randomArray);

  // create editable copy
  let unsolvedBoard = solvedBoard.map((row) => row.map((num) => num));
  removeCells(unsolvedBoard, numCells);

  unsolvedBoard = unsolvedBoard.map((row) =>
    row.map((num) => {
      if (num !== 0) {
        return { value: num, default: true, pencilValue: [] };
      }
      return { value: 0, default: false, pencilValue: [] };
    })
  );
  return { solvedBoard, unsolvedBoard };
}