import './number-tile.css';
import Note from '../Note/Note';
import Entry from '../Entry/Entry';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../store';
import { tileClicked } from '../../appSlice';

export type NumberTileProps = {
  value: number;
  row: number;
  col: number;
};

const NumberTile: React.FC<NumberTileProps> = ({ value, row, col }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeTile, noteMap } = useSelector((state: RootState) => state.app);

  const handleClick = () => {
    dispatch(tileClicked({col: col, row: row, value: value}));
  }

  let classList = 'number-tile';
  if (activeTile && activeTile.row === row && activeTile.col === col) {
    classList = 'number-tile isActive';
  } else if (value !== 0 && activeTile?.value === value) {
    classList = 'number-tile hasActiveRelative';
  }

  const notes: number[] = [0, 0, 0, 0, 0, 0, 0, 0,];
  const key = `${String(row)},${String(col)}`;
  if (noteMap && noteMap[key]) {
    noteMap[key].forEach((note, i) => {
      notes[i] = note;
    });
  }

  return (
    <>
      <div className={classList} onClick={handleClick}>
        {[0, 1, 2, 3].map((c) => <Note value={notes[c]} key={c} />)}
          <Entry value={value} />
        {[4, 5, 6, 7].map((c) => <Note value={notes[c]} key={c} />)}
      </div>
    </>
  )
}

export default NumberTile;