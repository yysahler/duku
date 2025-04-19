import { createSlice } from "@reduxjs/toolkit";
import { Puzzle } from "./types/types";

const randomOneToNine = () => {
  const rand = Math.floor(Math.random() * 10) + 1;
  if (rand === 10) {
    return rand - 1;
  } else {
    return rand;
  }
};

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    puzzle: {},
  },
  reducers: {
    newPuzzle: (state) => {
      console.log("okay I'll make a new puzzle for you");

      let puzzle: Puzzle = {};

      const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
      const cols = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

      rows.forEach((row, rowIndex) => {
        cols.forEach((col, colIndex) => {
          const cellKey = row + col;

          let regionRow, regionColumn;
          if (rowIndex > -1 && rowIndex < 3) {
            regionRow = "A";
          } else if (rowIndex > 2 && rowIndex < 6) {
            regionRow = "B";
          } else {
            regionRow = "C";
          }

          if (colIndex > -1 && colIndex < 3) {
            regionColumn = "a";
          } else if (colIndex > 2 && colIndex < 6) {
            regionColumn = "b";
          } else {
            regionColumn = "c";
          }

          puzzle[cellKey] = {
            value: 0,
            region: regionRow + regionColumn,
          };
        });
      });

      Object.keys(puzzle).forEach((cellKey) => {
        const row = Object.keys(puzzle).filter((item) => {
          return item.substring(0, 1) === cellKey.substring(0, 1);
        });

        const column = Object.keys(puzzle).filter((item) => {
          return item.substring(1) === cellKey.substring(1);
        });

        const region = Object.entries(puzzle)
          .filter(([key, value]) => {
            return value.region === puzzle[cellKey].region;
          })
          .map((item) => {
            return item[0];
          });

        let values: number[] = [];

        row.concat(column, region)
        .forEach((item) => {
          values.push(puzzle[item].value);
        });

        let newNum = 0;
        let its = 0;
        //to do: figure out why this loop doesn't end 
        while (its < 100 && values.includes(newNum)) {
          newNum = randomOneToNine();
          its++;
        }
        if (its === 100) {
          
        console.log('its');
        console.log(its);
        console.log('values');
        console.log(values);
        console.log('newNum');
        console.log(newNum);
        }
        // console.log('its');
        // console.log(its);
        // console.log('done');

      ['Aa',
        'Ba',
        'Ca',
        'Ab',
        'Bb',
        'Cb',
        'Ac',
        'Bc',
        'Cc',]
        .forEach((region) => {
          console.log(Object.entries(temp1).filter(([key, item])=>{return item.region === region}).map((item)=>item[1].value).sort())
        })
        





        puzzle[cellKey].value = newNum;
      });

      state.puzzle = puzzle;

      console.log("okay all done. here's your puzzle:");
      console.log(state.puzzle);

    }
  }
});

export const { newPuzzle } = appSlice.actions;

export default appSlice.reducer;