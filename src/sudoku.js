const SIZE = 9;
const VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);


export const puzzle = async (cellsToShow = 17) => {
  const board = generateBoard();
  return {
    puzzle: makePuzzle(board, cellsToShow),
    solution: board,
  };
}

// The main backtracking solver with MRV, LCV, Forward Checking, and AC-3
const backtrackSolve = (grid, randomize = false, stopEarly = true, solutionCounter = null, limit = 2) => {
  const getNeighbors = (row, col) => {
    const peers = new Set();
    for (let i = 0; i < SIZE; i++) {
      peers.add(`${row},${i}`);
      peers.add(`${i},${col}`);
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        peers.add(`${startRow + r},${startCol + c}`);
      }
    }

    peers.delete(`${row},${col}`);
    return Array.from(peers).map((s) => s.split(',').map(Number));
  };

  // AC-3 algorithm
  const ac3 = (domains, grid) => {
    const queue = [];

    // Initialize with all arcs (cell ↔ neighbors)
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (grid[row][col] === 0) {
          for (const [nRow, nCol] of getNeighbors(row, col)) {
            queue.push([[row, col], [nRow, nCol]]);
          }
        }
      }
    }

    const revise = (xi, xj) => {
      let revised = false;
      const [i, j] = xi;
      const [x, y] = xj;

      if (grid[x][y] !== 0) return false;

      for (let val of domains[i][j]) {
        const hasSupport = [...domains[x][y]].some((otherVal) => otherVal !== val);
        if (!hasSupport) {
          domains[i][j].delete(val);
          revised = true;
        }
      }

      return revised;
    };

    while (queue.length > 0) {
      const [xi, xj] = queue.shift();
      if (revise(xi, xj)) {
        const [i, j] = xi;
        if (domains[i][j].size === 0) return false; // Empty domain, inconsistency
        for (const [nRow, nCol] of getNeighbors(i, j)) {
          if (nRow !== xj[0] || nCol !== xj[1]) {
            queue.push([[nRow, nCol], xi]);
          }
        }
      }
    }

    return true;
  };

  // Initialize domains (forward checking)
  const domains = Array.from({ length: SIZE }, (_, r) =>
    Array.from({ length: SIZE }, (_, c) =>
      grid[r][c] === 0 ? new Set(VALID_NUMBERS) : new Set()
    )
  );

  // Pre-prune domains (forward checking)
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const val = grid[row][col];
      if (val !== 0) {
        for (const [r, c] of getNeighbors(row, col)) {
          domains[r][c].delete(val);
        }
      }
    }
  }

  const findBestCell = () => {
    let minOptions = 10;
    let bestCell = null;
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (grid[row][col] === 0) {
          const options = [...domains[row][col]];
          if (options.length < minOptions) {
            minOptions = options.length;
            bestCell = { row, col, options };
          }
          if (minOptions === 1) return bestCell;
        }
      }
    }
    return bestCell;
  };

  const solve = () => {
    const cell = findBestCell();
    if (!cell) {
      if (solutionCounter) {
        solutionCounter.count++;
        return solutionCounter.count >= limit;
      }
      return true;
    }

    const { row, col, options } = cell;
    const nums = randomize ? shuffle(options) : options;

    for (let num of nums) {
      const affected = [];
      let valid = true;

      // Forward checking and AC-3
      for (const [r, c] of getNeighbors(row, col)) {
        if (grid[r][c] === 0 && domains[r][c].has(num)) {
          domains[r][c].delete(num);
          affected.push([r, c]);
          if (domains[r][c].size === 0) {
            valid = false;
            break;
          }
        }
      }

      if (!valid) {
        // Restore and continue
        for (const [r, c] of affected) domains[r][c].add(num);
        continue;
      }

      grid[row][col] = num;
      domains[row][col].clear();

      // Apply AC-3 after every placement
      if (!ac3(domains, grid)) {
        grid[row][col] = 0;
        domains[row][col] = new Set(options);
        for (const [r, c] of affected) domains[r][c].add(num);
        continue;
      }

      if (solve()) {
        if (stopEarly) return true;
      }

      grid[row][col] = 0;
      domains[row][col] = new Set(options);
      for (const [r, c] of affected) domains[r][c].add(num);
    }

    return false;
  };

  return solve();
};

// Generate a full solved board
const generateBoard = () => {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  backtrackSolve(grid, true);  // randomize = true
  return grid;
};

// Remove numbers and ensure unique solution
const makePuzzle = (board, cellsToShow) => {
  const puzzleHistory = [board];
  const solvePuzzle = (board, countSolutions = false) => {
    const clone = board.map((row) => row.slice());
    if (countSolutions) {
      const counter = { count: 0 };
      backtrackSolve(clone, false, false, counter);
      return counter.count;
    } else {
      return backtrackSolve(clone);
    }
  };
  const puzzle = board.map((row) => row.slice());  // Create a copy of the board
  const emptyCells = [];

  // Collect all cell positions
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] !== 0) {
        emptyCells.push([row, col]);
      }
    }
  }

  // Shuffle the empty cells to randomize removal
  shuffle(emptyCells);

  let cellsRemoved = 0;

  // Remove numbers one by one while ensuring the puzzle has a unique solution
  for (let [row, col] of emptyCells) {
    const originalValue = puzzle[row][col];
    puzzle[row][col] = 0;  // Remove the number

    // Check if the puzzle still has a unique solution
    const clone = puzzle.map((r) => r.slice());
    const solutionCount = solvePuzzle(clone, true);  // Count solutions

    if (solutionCount !== 1) {
      // If not a unique solution, restore the original value
      puzzle[row][col] = originalValue;
    } else {
      puzzleHistory.push(puzzle);
      cellsRemoved++;
    }

    // Stop once we have removed enough cells
    if (cellsRemoved === SIZE * SIZE - cellsToShow) {
      break;
    }
  }

  return puzzleHistory.reverse();
};