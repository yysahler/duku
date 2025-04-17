import BoxOfNine from "../../BoxOfNine";
import NumberBox from "../../NumberBox";
import Region from "../region/Region";
import './board.css';

const numberBoxes: any = [];
for (let i = 0; i < 9; i++) {
  numberBoxes.push(<NumberBox></NumberBox>);
}

const Board = () => {
  return (
    <>
      <div className="board">
      <Region></Region>
      <Region></Region>
      <Region></Region>
      <Region></Region>
      <Region></Region>
      <Region></Region>
      <Region></Region>
      <Region></Region>
      <Region></Region>
      </div>
    </>
  );
}

export default Board;