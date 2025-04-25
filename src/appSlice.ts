import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { puzzle } from "./sudoku";
import { NumberTileProps } from "./components/NumberTile/NumberTile";

export interface PuzzleState {
  puzzle: number[][];
  puzzleOrigin: number[][][];
  solution: number[][];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  activeTile: NumberTileProps | undefined;
  entryMode: EntryMode;
  noteMap: NoteMap;
  tilesToShow: number;
  warningMode: boolean;
  fastFail: boolean;
  highlight: boolean;
};

interface NoteMap {
  [key: string]: number[];
}

export type EntryMode = 'pen' | 'pencil';

const initialState: PuzzleState = {
  puzzle: [],
  puzzleOrigin: [],
  solution: [],
  status: 'idle',
  activeTile: undefined,
  entryMode: 'pen',
  noteMap: {},
  tilesToShow: 60,
  warningMode: true,
  fastFail: false,
  highlight: true,
};

export const fetchNewPuzzle = createAsyncThunk(
  'puzzle/fetchNew',
  async (cellsToShow: number = 17) => {
    const result = await puzzle(cellsToShow);
    return result;
  }
);

const pruneNotes = (noteMap: NoteMap, activeTile: any): NoteMap => {
  const row = activeTile.row;
  const col = activeTile.col;
  const value = activeTile.value;

  const peers = Object.keys(noteMap)
  .filter((noteKey) => {
    return noteKey.substring(0,1) === String(row) || noteKey.substring(2) === String(col)
  });

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const noteKey = `${startRow + r},${startCol + c}`;
      if (noteMap[noteKey]) {
        peers.push(noteKey);
      }
    }
  }

  peers.forEach((noteKey) => {
    if (noteMap[noteKey].includes(value)) {
      noteMap[noteKey].splice(noteMap[noteKey].indexOf(value), 1);
    }
  });

  noteMap[`${row},${col}`] = [];

  return noteMap;
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    tileClicked: (state, action: PayloadAction<NumberTileProps>) => {
      state.activeTile = {
        row: action.payload.row,
        col: action.payload.col,
        value: action.payload.value,
      };
    },
    keyPadEntry: (state, action: PayloadAction<number>) => {
      if (state.activeTile && state.activeTile.value === 0) {
        if (state.entryMode === 'pen') {
          state.puzzle[state.activeTile.row][state.activeTile.col] = action.payload;
          state.activeTile.value = action.payload;
          if (state.noteMap) {
            state.noteMap = pruneNotes({ ...state.noteMap }, state.activeTile);
          }
          if (JSON.stringify(state.puzzle) === JSON.stringify(state.solution)) {
            alert('You Winnnnnnned!');
          }
        } else if (state.entryMode === 'pencil') {
          const key = `${String(state.activeTile.row)},${String(state.activeTile.col)}`;
          if (state.noteMap[key]) {
            if (state.noteMap[key].includes(action.payload)) {
              state.noteMap[key].splice(state.noteMap[key].indexOf(action.payload), 1);
            } else {
              state.noteMap[key].push(action.payload);
              state.noteMap[key].sort((a,b)=>{return a < b ? -1 : 0});
            }
          } else {
            state.noteMap[key] = [action.payload];
          }
        }
      }
    },
    entryModeChange: (state, action: PayloadAction<EntryMode>) => {
      state.entryMode = action.payload;
    },
    setTilesToShow: (state, action: PayloadAction<number>) => {
      state.tilesToShow = action.payload;
    },
    /**
     * disable numbers in number pad when all 9 are placed - only when highlight mode is on
     * toast celebrate when puzzle is complete
     * add show solution
     * add the other settings
     * load a board when the page is loaded
     * highlight hints
     * add hint button to reveal a tile
     */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewPuzzle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewPuzzle.fulfilled, (state, action) => {
        state.activeTile = undefined;
        state.entryMode = 'pen';
        state.noteMap = {};
        state.puzzle = action.payload.puzzle[0];
        state.puzzleOrigin = action.payload.puzzle;
        state.solution = action.payload.solution;
        state.status = 'succeeded';
      })
      .addCase(fetchNewPuzzle.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { tileClicked, keyPadEntry, entryModeChange, setTilesToShow } = appSlice.actions;

export default appSlice.reducer;